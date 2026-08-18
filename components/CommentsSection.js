"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, Mail, CheckCircle, Loader2, MessageCircle } from "lucide-react";
import {
    collection, addDoc, query, where, orderBy,
    onSnapshot, serverTimestamp, updateDoc, doc, setDoc
} from "firebase/firestore";
import { db1 } from "@/config/firebase.config1";
import { onAuthStateChanged } from "firebase/auth";
import { auth1 } from "@/config/firebase.config1";

const OWNER_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
const PREVIEW_LIMIT = 6;

const formatDate = (ts) => {
    if (!ts?.toDate) return "—";
    return ts.toDate().toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric"
    });
};

const AVATAR_COLORS = [
    "#e8ff47", "#4ade80", "#60a5fa", "#f472b6", "#fb923c", "#a78bfa", "#2dd4bf",
];
const avatarColorFor = (name) => {
    let hash = 0;
    for (let i = 0; i < (name?.length || 0); i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

function DrawerCommentItem({ comment, isOwner, handleMarkReplied }) {
    const initials = comment.authorName?.slice(0, 2).toUpperCase() || "?";
    const color = avatarColorFor(comment.authorName || "?");

    return (
        <div className="cs-drow">
            <div className="cs-drow__avatar" style={{ background: `${color}22`, borderColor: `${color}55`, color }}>
                {initials}
            </div>
            <div className="cs-drow__main">
                <div className="cs-drow__head">
                    <span className="cs-drow__name">{comment.authorName}</span>
                    <span className="cs-drow__date">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="cs-drow__text">{comment.text}</p>
                <div className="cs-drow__footer">
                    {comment.brownReplied ? (
                        <span className="cs-drow__replied">
                            <Mail size={9} />
                            Replied
                        </span>
                    ) : (
                        !isOwner && <span className="cs-drow__pending">Awaiting reply</span>
                    )}
                    {isOwner && (
                        <button
                            onClick={() => handleMarkReplied(comment.id)}
                            className="cs-drow__reply-link"
                        >
                            <Mail size={10} />
                            {comment.brownReplied ? "Reply again" : "Reply via email"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function CommentsSection({ articleSlug }) {
    const [comments, setComments] = useState([]);
    const [name, setName] = useState("");
    const [commentText, setCommentText] = useState("");
    const [isOwner, setIsOwner] = useState(false);
    const [justPosted, setJustPosted] = useState(false);

    // Bottom sheet drawer
    const [showDrawer, setShowDrawer] = useState(false);
    const [drawerIn, setDrawerIn] = useState(false);
    const [composerOpen, setComposerOpen] = useState(false);
    const composerInputRef = useRef(null);

    // Email modal
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [email, setEmail] = useState("");
    const [pendingComment, setPendingComment] = useState(null);
    const [emailError, setEmailError] = useState("");
    const [emailSubmitting, setEmailSubmitting] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth1, (user) => {
            setIsOwner(!!user && user.email === OWNER_EMAIL);
        });
        return () => unsub();
    }, []);

    useEffect(() => {
        if (!articleSlug) return;
        const q = query(
            collection(db1, "comments"),
            where("articleSlug", "==", articleSlug),
            orderBy("createdAt", "desc")
        );
        const unsub = onSnapshot(q, (snap) => {
            setComments(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        }, console.error);
        return () => unsub();
    }, [articleSlug]);

    // ── Drawer open/close (slide up from bottom) ──
    const openDrawer = () => {
        setShowDrawer(true);
        document.documentElement.style.overflow = "hidden";
        requestAnimationFrame(() => requestAnimationFrame(() => setDrawerIn(true)));
    };

    const closeDrawer = () => {
        setDrawerIn(false);
        setComposerOpen(false);
        document.documentElement.style.overflow = "";
        setTimeout(() => setShowDrawer(false), 320);
    };

    useEffect(() => {
        return () => { document.documentElement.style.overflow = ""; };
    }, []);

    const openComposer = () => {
        setComposerOpen(true);
        setTimeout(() => composerInputRef.current?.focus(), 50);
    };

    const handleInitialSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !commentText.trim()) return;
        setPendingComment({ name: name.trim(), text: commentText.trim() });
        setEmailError("");
        setEmail("");
        setShowEmailModal(true);
    };

    const handleEmailConfirm = async () => {
        if (!email.trim() || !email.includes("@")) {
            setEmailError("Please enter a valid email address.");
            return;
        }
        setEmailSubmitting(true);
        setEmailError("");
        try {
            const res = await fetch("/api/comments/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    articleSlug,
                    email: email.trim(),
                    authorName: pendingComment.name,
                    text: pendingComment.text,
                }),
            });
            const { isDuplicate } = await res.json();

            if (isDuplicate) {
                setEmailError("This email has already submitted a comment on this article.");
                setEmailSubmitting(false);
                return;
            }

            setName(""); setCommentText(""); setPendingComment(null);
            setEmail(""); setShowEmailModal(false); setComposerOpen(false);
            setJustPosted(true);
            setTimeout(() => setJustPosted(false), 5000);
        } catch (err) {
            console.error(err);
            setEmailError("Server error. Please try again.");
        } finally {
            setEmailSubmitting(false);
        }
    };

    const handleMarkReplied = async (commentId) => {
        try {
            const { currentUser } = auth1;
            if (!currentUser) return;
            const token = await currentUser.getIdToken();

            const res = await fetch("/api/comments/reply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ commentId, token }),
            });

            const { email: authorEmail } = await res.json();

            if (authorEmail) {
                const subject = encodeURIComponent("Re: Your comment on Brown's blog");
                const body = encodeURIComponent(
                    `Hi,\n\nThanks for your comment.\n\n[Your reply here]\n\n— Sir Brown AD`
                );
                window.location.href = `mailto:${authorEmail}?subject=${subject}&body=${body}`;
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleModalClose = () => {
        setShowEmailModal(false);
        setPendingComment(null);
        setEmailError("");
        setEmail("");
    };

    const visibleComments = comments.slice(0, PREVIEW_LIMIT);
    const hasMore = comments.length > PREVIEW_LIMIT;

    return (
        <>
            <style>{`
                .cs-section {
                    margin-top: 56px;
                    padding-top: 40px;
                    border-top: 1px solid var(--border);
                }

                /* ── Header ── */
                .cs-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 28px;
                }
                .cs-header__left { display: flex; align-items: center; gap: 10px; }
                .cs-header__icon { color: var(--accent); }
                .cs-header__title { font-family: var(--font-serif); font-size: 20px; color: var(--text-1); font-weight: 400; }
                .cs-header__count { font-family: var(--font-mono); font-size: 11px; color: var(--text-3); }

                /* ── Success banner ── */
                .cs-success {
                    display: flex; align-items: center; gap: 10px;
                    padding: 12px 16px;
                    background: rgba(74,222,128,0.06);
                    border: 1px solid rgba(74,222,128,0.2);
                    border-radius: var(--radius);
                    font-size: 13px; color: #4ade80; margin-bottom: 20px;
                }

                /* ── Toggle trigger ── */
                .cs-trigger {
                    width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;
                    padding: 12px; border: 1px dashed var(--border); border-radius: var(--radius);
                    background: transparent; color: var(--text-3);
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    cursor: pointer; transition: color 0.15s, border-color 0.15s, background 0.15s;
                    margin-bottom: 24px;
                }
                .cs-trigger:hover { color: var(--accent); border-color: rgba(232,255,71,0.3); background: var(--accent-dim); }

                .cs-field label {
                    display: block; font-family: var(--font-mono); font-size: 10px;
                    letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-3); margin-bottom: 6px;
                }
                .cs-field input, .cs-field textarea {
                    width: 100%; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius);
                    padding: 10px 12px; font-family: var(--font-sans); font-size: 13px; color: var(--text-1);
                    outline: none; transition: border-color 0.15s;
                }
                .cs-field input::placeholder, .cs-field textarea::placeholder { color: var(--text-3); }
                .cs-field input:focus, .cs-field textarea:focus { border-color: var(--border-hi); }
                .cs-field textarea { resize: none; }

                /* ── Shared button ── */
                .cs-btn {
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    padding: 8px 16px; border-radius: var(--radius); border: 1px solid var(--border);
                    background: transparent; color: var(--text-2); cursor: pointer;
                    display: inline-flex; align-items: center; gap: 6px;
                    transition: color 0.15s, border-color 0.15s, background 0.15s;
                }
                .cs-btn:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }
                .cs-btn--accent { background: var(--accent-dim); border-color: rgba(232,255,71,0.3); color: var(--accent); }
                .cs-btn--accent:hover { background: rgba(232,255,71,0.15); border-color: rgba(232,255,71,0.5); }
                .cs-btn:disabled { opacity: 0.4; cursor: not-allowed; }

                /* ── Comment list (page preview) ── */
                .cs-list { display: flex; flex-direction: column; border: 1px solid var(--border); overflow: hidden; }
                .cs-empty { padding: 40px 24px; text-align: center; font-family: var(--font-mono); font-size: 11px; color: var(--text-3); letter-spacing: 0.06em; }

                .cs-comment { padding: 18px 20px; background: var(--background); border-bottom: 1px solid var(--border); transition: background 0.15s; }
                .cs-comment:last-child { border-bottom: none; }
                .cs-comment:hover { background: #141417; }
                .cs-comment__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
                .cs-comment__author { display: flex; align-items: center; gap: 8px; }
                .cs-comment__avatar { width: 28px; height: 28px; border-radius: 50%; background: var(--accent-dim); border: 1px solid rgba(232,255,71,0.2); display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 10px; color: var(--accent); flex-shrink: 0; }
                .cs-comment__name { font-family: var(--font-mono); font-size: 12px; color: var(--text-1); font-weight: 500; }
                .cs-comment__date { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); }
                .cs-comment__text { font-size: 14px; color: var(--text-2); line-height: 1.65; font-weight: 300; white-space: pre-wrap; }
                .cs-comment__footer { display: flex; align-items: center; justify-content: space-between; margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--border); }
                .cs-comment__replied { display: inline-flex; align-items: center; gap: 5px; font-family: var(--font-mono); font-size: 10px; color: #4ade80; background: rgba(74,222,128,0.06); border: 1px solid rgba(74,222,128,0.2); padding: 2px 8px; border-radius: 99px; }
                .cs-comment__pending { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); }
                .cs-comment__reply-link { display: inline-flex; align-items: center; gap: 5px; font-family: var(--font-mono); font-size: 10px; color: var(--text-3); text-decoration: none; transition: color 0.15s; margin-left: auto; background: none; border: none; cursor: pointer; }
                .cs-comment__reply-link:hover { color: var(--accent); }

                .cs-view-all {
                    width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;
                    padding: 12px; border: 1px solid var(--border); border-top: none;
                    background: var(--surface); color: var(--text-3);
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    cursor: pointer; transition: color 0.15s, background 0.15s;
                }
                .cs-view-all:hover { color: var(--accent); background: var(--accent-dim); }

                /* ════════════════════════════════════
                   BOTTOM SHEET DRAWER
                ════════════════════════════════════ */
                .cs-drawer-backdrop {
                    position: fixed; inset: 0; z-index: 9990;
                    background: rgba(0,0,0,0);
                    transition: background 0.32s ease;
                }
                .cs-drawer-backdrop--in { background: rgba(0,0,0,0.6); }

                .cs-drawer {
                    position: fixed;
                    left: 0; right: 0; bottom: 0;
                    z-index: 9991;
                    height: 88vh;
                    max-width: 640px;
                    margin: 0 auto;
                    background: var(--bg);
                    border-top: 1px solid var(--border);
                    border-left: 1px solid var(--border);
                    border-right: 1px solid var(--border);
                    border-radius: 16px 16px 0 0;
                    display: flex; flex-direction: column;
                    transform: translateY(100%);
                    transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
                    box-shadow: 0 -20px 60px rgba(0,0,0,0.5);
                }
                .cs-drawer--in { transform: translateY(0); }

                .cs-drawer__handle-row {
                    display: flex; justify-content: center; padding: 10px 0 4px; flex-shrink: 0;
                }
                .cs-drawer__handle { width: 40px; height: 4px; border-radius: 99px; background: var(--border-hi); }

                .cs-drawer__head {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 8px 20px 14px; border-bottom: 1px solid var(--border); flex-shrink: 0;
                }
                .cs-drawer__title { display: flex; align-items: center; gap: 8px; font-family: var(--font-serif); font-size: 17px; color: var(--text-1); }
                .cs-drawer__sort { font-family: var(--font-mono); font-size: 11px; color: var(--text-3); }
                .cs-drawer__close { background: none; border: none; color: var(--text-3); cursor: pointer; padding: 4px; display: flex; transition: color 0.15s; }
                .cs-drawer__close:hover { color: var(--text-1); }

                .cs-drawer__body { flex: 1; overflow-y: auto; padding: 4px 0 12px; }

                .cs-drow { display: flex; gap: 12px; padding: 16px 20px; border-bottom: 1px solid var(--border); }
                .cs-drow__avatar {
                    width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
                    border: 1px solid; display: flex; align-items: center; justify-content: center;
                    font-family: var(--font-mono); font-size: 12px; font-weight: 600;
                }
                .cs-drow__main { flex: 1; min-width: 0; }
                .cs-drow__head { display: flex; align-items: baseline; gap: 8px; margin-bottom: 4px; }
                .cs-drow__name { font-family: var(--font-sans); font-weight: 600; font-size: 13.5px; color: var(--text-1); }
                .cs-drow__date { font-family: var(--font-mono); font-size: 10.5px; color: var(--text-3); margin-left: auto; }
                .cs-drow__text { font-size: 13.5px; color: var(--text-2); line-height: 1.55; white-space: pre-wrap; }
                .cs-drow__footer { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
                .cs-drow__replied { display: inline-flex; align-items: center; gap: 5px; font-family: var(--font-mono); font-size: 10px; color: #4ade80; background: rgba(74,222,128,0.06); border: 1px solid rgba(74,222,128,0.2); padding: 2px 8px; border-radius: 99px; }
                .cs-drow__pending { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); }
                .cs-drow__reply-link { display: inline-flex; align-items: center; gap: 5px; font-family: var(--font-mono); font-size: 10px; color: var(--text-3); background: none; border: none; cursor: pointer; transition: color 0.15s; }
                .cs-drow__reply-link:hover { color: var(--accent); }

                .cs-drawer__empty { padding: 60px 24px; text-align: center; font-family: var(--font-mono); font-size: 11px; color: var(--text-3); letter-spacing: 0.06em; }

                /* Sticky composer at bottom of drawer */
                .cs-composer {
                    flex-shrink: 0;
                    border-top: 1px solid var(--border);
                    background: var(--surface);
                    padding: 12px 16px;
                    padding-bottom: max(12px, env(safe-area-inset-bottom));
                }
                .cs-composer__bar {
                    display: flex; align-items: center; gap: 10px;
                }
                .cs-composer__avatar {
                    width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
                    background: var(--accent-dim); border: 1px solid rgba(232,255,71,0.25);
                    display: flex; align-items: center; justify-content: center; color: var(--accent);
                }
                .cs-composer__trigger {
                    flex: 1; text-align: left;
                    background: var(--bg); border: 1px solid var(--border); border-radius: 99px;
                    padding: 10px 16px; font-family: var(--font-sans); font-size: 13px; color: var(--text-3);
                    cursor: pointer; transition: border-color 0.15s;
                }
                .cs-composer__trigger:hover { border-color: var(--border-hi); }

                .cs-composer__form {
                    display: flex; flex-direction: column; gap: 12px; padding-top: 4px;
                }
                .cs-composer__form-top { display: flex; align-items: center; justify-content: space-between; }
                .cs-composer__label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); }
                .cs-composer__form-close { background: none; border: none; color: var(--text-3); cursor: pointer; padding: 2px; display: flex; }
                .cs-composer__form-close:hover { color: var(--text-1); }
                .cs-composer__actions { display: flex; gap: 10px; }

                @media (max-width: 700px) {
                    .cs-drawer { height: 92vh; border-radius: 14px 14px 0 0; }
                }
            `}</style>

            <section className="cs-section">
                {/* Header */}
                <div className="cs-header">
                    <div className="cs-header__left">
                        <MessageSquare size={16} className="cs-header__icon" />
                        <h3 className="cs-header__title">Discussion</h3>
                    </div>
                    <span className="cs-header__count">{comments.length} comment{comments.length !== 1 ? "s" : ""}</span>
                </div>

                {/* Success */}
                {justPosted && (
                    <div className="cs-success">
                        <CheckCircle size={14} />
                        Your comment has been posted.
                    </div>
                )}

                {/* Trigger */}
                {!justPosted && (
                    <button className="cs-trigger" onClick={openDrawer}>
                        <MessageSquare size={13} />
                        Leave a comment
                    </button>
                )}

                {/* Preview list */}
                <div className="cs-list">
                    {comments.length === 0 ? (
                        <div className="cs-empty">No comments yet — be the first.</div>
                    ) : (
                        visibleComments.map((comment) => (
                            <div key={comment.id} className="cs-comment">
                                <div className="cs-comment__head">
                                    <div className="cs-comment__author">
                                        <div className="cs-comment__avatar">
                                            {comment.authorName?.slice(0, 2).toUpperCase() || "?"}
                                        </div>
                                        <span className="cs-comment__name">{comment.authorName}</span>
                                    </div>
                                    <span className="cs-comment__date">{formatDate(comment.createdAt)}</span>
                                </div>
                                <p className="cs-comment__text">{comment.text}</p>
                                <div className="cs-comment__footer">
                                    {comment.brownReplied ? (
                                        <span className="cs-comment__replied"><Mail size={9} /> Replied</span>
                                    ) : (
                                        !isOwner && <span className="cs-comment__pending">Awaiting reply</span>
                                    )}
                                    {isOwner && (
                                        <button onClick={() => handleMarkReplied(comment.id)} className="cs-comment__reply-link">
                                            <Mail size={10} />
                                            {comment.brownReplied ? "Reply again" : "Reply via email"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {hasMore && (
                    <button className="cs-view-all" onClick={openDrawer}>
                        <MessageSquare size={12} />
                        View all {comments.length} comments
                    </button>
                )}
            </section>

            {/* ── Bottom sheet drawer ── */}
            {showDrawer && (
                <>
                    <div
                        className={`cs-drawer-backdrop ${drawerIn ? "cs-drawer-backdrop--in" : ""}`}
                        onClick={closeDrawer}
                    />
                    <div className={`cs-drawer ${drawerIn ? "cs-drawer--in" : ""}`}>
                        <div className="cs-drawer__handle-row">
                            <span className="cs-drawer__handle" />
                        </div>

                        <div className="cs-drawer__head">
                            <div className="cs-drawer__title">
                                <MessageCircle size={16} style={{ color: "var(--accent)" }} />
                                {comments.length} comment{comments.length !== 1 ? "s" : ""}
                            </div>
                            <button className="cs-drawer__close" onClick={closeDrawer}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="cs-drawer__body">
                            {comments.length === 0 ? (
                                <div className="cs-drawer__empty">No comments yet — be the first.</div>
                            ) : (
                                comments.map((comment) => (
                                    <DrawerCommentItem
                                        key={comment.id}
                                        comment={comment}
                                        isOwner={isOwner}
                                        handleMarkReplied={handleMarkReplied}
                                    />
                                ))
                            )}
                        </div>

                        {/* Sticky composer */}
                        <div className="cs-composer">
                            {!composerOpen ? (
                                <div className="cs-composer__bar">
                                    <div className="cs-composer__avatar">
                                        <MessageSquare size={14} />
                                    </div>
                                    <button className="cs-composer__trigger" onClick={openComposer}>
                                        Add a comment…
                                    </button>
                                </div>
                            ) : (
                                <form className="cs-composer__form" onSubmit={handleInitialSubmit}>
                                    <div className="cs-composer__form-top">
                                        <span className="cs-composer__label">New comment</span>
                                        <button
                                            type="button"
                                            className="cs-composer__form-close"
                                            onClick={() => setComposerOpen(false)}
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                    <div className="cs-field">
                                        <label>Name</label>
                                        <input
                                            ref={composerInputRef}
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>
                                    <div className="cs-field">
                                        <label>Comment</label>
                                        <textarea
                                            rows={3}
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            placeholder="Share your thoughts…"
                                            required
                                        />
                                    </div>
                                    <div className="cs-composer__actions">
                                        <button type="submit" className="cs-btn cs-btn--accent">
                                            Post comment
                                            <Send size={12} />
                                        </button>
                                        <button type="button" className="cs-btn" onClick={() => setComposerOpen(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* Email verification modal — sits above the drawer */}
            {showEmailModal && (
                <div className="cs-modal-backdrop" style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }} onClick={handleModalClose} />
                    <div style={{ position: "relative", width: "100%", maxWidth: 440, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden", boxShadow: "0 32px 64px rgba(0,0,0,0.6)" }}>
                        <div style={{ height: 2, background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />
                        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                                <div>
                                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                                        <Mail size={12} />
                                        Verify email
                                    </div>
                                    <h4 style={{ fontFamily: "var(--font-serif)", fontSize: 20, color: "var(--text-1)", fontWeight: 400 }}>Confirm your address</h4>
                                    <p style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.6, marginTop: 4 }}>
                                        Used to prevent duplicate submissions — not displayed publicly.
                                    </p>
                                </div>
                                <button style={{ background: "none", border: "none", color: "var(--text-3)", cursor: "pointer", padding: 4, display: "flex", flexShrink: 0 }} onClick={handleModalClose}>
                                    <X size={15} />
                                </button>
                            </div>

                            {pendingComment && (
                                <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "12px 14px" }}>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)", display: "block", marginBottom: 6 }}>Your comment</span>
                                    <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", marginBottom: 4 }}>{pendingComment.name}</p>
                                    <p style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{pendingComment.text}</p>
                                </div>
                            )}

                            <div className="cs-field">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                                    placeholder="you@example.com"
                                    autoFocus
                                    onKeyDown={(e) => e.key === "Enter" && handleEmailConfirm()}
                                />
                                {emailError && (
                                    <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#f87171", marginTop: 6 }}>{emailError}</p>
                                )}
                            </div>

                            <div style={{ display: "flex", gap: 10 }}>
                                <button className="cs-btn cs-btn--accent" style={{ flex: 1, justifyContent: "center" }} onClick={handleEmailConfirm} disabled={emailSubmitting}>
                                    {emailSubmitting ? (<><Loader2 size={12} className="animate-spin" /> Posting…</>) : (<><Send size={12} /> Post comment</>)}
                                </button>
                                <button className="cs-btn" onClick={handleModalClose}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}