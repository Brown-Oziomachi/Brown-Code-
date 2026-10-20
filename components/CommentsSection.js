"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, Mail, CheckCircle, Loader2, MessageCircle } from "lucide-react";
import {
    collection, query, where, orderBy, onSnapshot,
} from "firebase/firestore";
import { db1, auth1 } from "@/config/firebase.config1";
import { onAuthStateChanged } from "firebase/auth";

const OWNER_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
const PREVIEW_LIMIT = 6;

const formatDate = (ts) => {
    if (!ts?.toDate) return "";
    return ts.toDate().toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
    });
};

const AVATAR_COLORS = ["#e8ff47", "#86efac", "#93c5fd", "#f9a8d4", "#fdba74", "#c4b5fd", "#5eead4"];
const avatarColorFor = (name) => {
    let hash = 0;
    for (let i = 0; i < (name?.length || 0); i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

function CommentRow({ comment, isOwner, onReply, compact }) {
    const initials = comment.authorName?.slice(0, 2).toUpperCase() || "?";
    return (
        <div className={compact ? "cs-row cs-row--compact" : "cs-row"}>
            <div className="cs-avatar" style={{ background: avatarColorFor(comment.authorName || "?") }}>
                {initials}
            </div>
            <div className="cs-row__main">
                <div className="cs-row__head">
                    <span className="cs-row__name">{comment.authorName}</span>
                    <span className="cs-row__date">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="cs-row__text">{comment.text}</p>
                <div className="cs-row__foot">
                    {comment.brownReplied ? (
                        <span className="cs-replied"><Mail size={10} /> Replied</span>
                    ) : (
                        !isOwner && <span className="cs-pending">Awaiting reply</span>
                    )}
                    {isOwner && (
                        <button onClick={() => onReply(comment.id)} className="cs-link-btn">
                            <Mail size={11} />
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
    const count = `${comments.length} comment${comments.length !== 1 ? "s" : ""}`;

    return (
        <div className="cs-root">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

                .cs-root {
                    --cs-ink: #111111; --cs-ink-2: #3f3f3f; --cs-ink-3: #6f6f6f;
                    --cs-rule: #e4e2da; --cs-soft: #f6f5f0;
                    --cs-accent: #e8ff47; --cs-on: #0a0a0b; --cs-danger: #b91c1c; --cs-green: #15803d;
                    --cs-serif: 'Playfair Display', Georgia, serif;
                    --cs-sans: 'Inter', system-ui, sans-serif;
                    --cs-mono: 'JetBrains Mono', 'Fira Code', monospace;
                    font-family: var(--cs-sans); color: var(--cs-ink);
                }
                .cs-root *, .cs-root *::before, .cs-root *::after { box-sizing: border-box; }
                .cs-root h3, .cs-root h4, .cs-root p { margin: 0; }

                .cs-section { margin-top: 8px; }

                .cs-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 20px; }
                .cs-header__left { display: flex; align-items: center; gap: 10px; }
                .cs-header__icon { width: 30px; height: 30px; background: var(--cs-accent); border: 1.5px solid var(--cs-ink); display: flex; align-items: center; justify-content: center; color: var(--cs-on); }
                .cs-header__title { font-family: var(--cs-serif); font-weight: 800; font-size: 24px; }
                .cs-header__count { font-family: var(--cs-mono); font-size: 11px; color: var(--cs-ink-3); }

                .cs-success { display: flex; align-items: center; gap: 10px; padding: 12px 16px; background: #f0fdf4; border: 1px solid var(--cs-green); font-size: 13px; color: var(--cs-green); margin-bottom: 20px; }

                .cs-trigger { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 14px; border: 1.5px dashed var(--cs-ink); background: transparent; color: var(--cs-ink); font-family: var(--cs-mono); font-size: 11.5px; letter-spacing: 0.06em; cursor: pointer; transition: background 0.15s; margin-bottom: 22px; }
                .cs-trigger:hover { background: var(--cs-accent); }

                .cs-field label { display: block; font-family: var(--cs-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--cs-ink-3); margin-bottom: 6px; }
                .cs-field input, .cs-field textarea { width: 100%; background: #fff; border: 1.5px solid #c9c6bc; padding: 11px 12px; font-family: var(--cs-sans); font-size: 14px; color: var(--cs-ink); outline: none; transition: border-color 0.15s, box-shadow 0.15s; }
                .cs-field input::placeholder, .cs-field textarea::placeholder { color: #9a978f; }
                .cs-field input:focus, .cs-field textarea:focus { border-color: var(--cs-ink); box-shadow: 3px 3px 0 var(--cs-accent); }
                .cs-field textarea { resize: none; }

                .cs-btn { font-family: var(--cs-mono); font-size: 11px; letter-spacing: 0.06em; padding: 10px 16px; border: 1.5px solid var(--cs-ink); background: transparent; color: var(--cs-ink); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 7px; transition: background 0.15s, color 0.15s; }
                .cs-btn:hover { background: var(--cs-ink); color: #fff; }
                .cs-btn--accent { background: var(--cs-accent); color: var(--cs-on); font-weight: 600; }
                .cs-btn--accent:hover { background: var(--cs-ink); color: var(--cs-accent); }
                .cs-btn:disabled { opacity: 0.5; cursor: not-allowed; }
                .cs-spin { animation: cs-spin 0.8s linear infinite; }
                @keyframes cs-spin { to { transform: rotate(360deg); } }

                /* List */
                .cs-list { border: 1px solid var(--cs-ink); background: #fff; }
                .cs-empty { padding: 40px 24px; text-align: center; font-family: var(--cs-mono); font-size: 11.5px; color: var(--cs-ink-3); }

                .cs-row { display: flex; gap: 12px; padding: 18px 20px; border-bottom: 1px solid var(--cs-rule); }
                .cs-row:last-child { border-bottom: none; }
                .cs-row--compact { padding: 16px 20px; }
                .cs-avatar { width: 38px; height: 38px; flex-shrink: 0; border: 1.5px solid var(--cs-ink); display: flex; align-items: center; justify-content: center; font-family: var(--cs-mono); font-size: 12px; font-weight: 600; color: var(--cs-on); }
                .cs-row__main { flex: 1; min-width: 0; }
                .cs-row__head { display: flex; align-items: baseline; gap: 8px; margin-bottom: 4px; }
                .cs-row__name { font-weight: 600; font-size: 14px; }
                .cs-row__date { font-family: var(--cs-mono); font-size: 10.5px; color: var(--cs-ink-3); margin-left: auto; }
                .cs-row__text { font-size: 14.5px; color: var(--cs-ink-2); line-height: 1.65; white-space: pre-wrap; word-break: break-word; }
                .cs-row__foot { display: flex; align-items: center; gap: 10px; margin-top: 10px; }
                .cs-replied { display: inline-flex; align-items: center; gap: 5px; font-family: var(--cs-mono); font-size: 10px; color: var(--cs-green); border: 1px solid var(--cs-green); background: #f0fdf4; padding: 2px 8px; }
                .cs-pending { font-family: var(--cs-mono); font-size: 10px; color: var(--cs-ink-3); }
                .cs-link-btn { display: inline-flex; align-items: center; gap: 5px; font-family: var(--cs-mono); font-size: 10.5px; color: var(--cs-ink); background: none; border: none; border-bottom: 2px solid var(--cs-accent); cursor: pointer; padding: 0; margin-left: auto; }
                .cs-link-btn:hover { background: var(--cs-accent); }

                .cs-view-all { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 13px; border: 1px solid var(--cs-ink); border-top: none; background: var(--cs-soft); color: var(--cs-ink); font-family: var(--cs-mono); font-size: 11px; letter-spacing: 0.06em; cursor: pointer; transition: background 0.15s; }
                .cs-view-all:hover { background: var(--cs-accent); }

                /* Drawer */
                .cs-backdrop { position: fixed; inset: 0; z-index: 9990; background: rgba(0,0,0,0); transition: background 0.32s ease; }
                .cs-backdrop--in { background: rgba(0,0,0,0.45); }
                .cs-drawer { position: fixed; left: 0; right: 0; bottom: 0; z-index: 9991; height: 88vh; max-width: 640px; margin: 0 auto; background: #fff; border: 1.5px solid var(--cs-ink); border-bottom: none; border-top: 5px solid var(--cs-accent); display: flex; flex-direction: column; transform: translateY(100%); transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1); box-shadow: 0 -20px 60px rgba(0,0,0,0.25); }
                .cs-drawer--in { transform: translateY(0); }
                .cs-drawer__handle-row { display: flex; justify-content: center; padding: 10px 0 4px; flex-shrink: 0; }
                .cs-drawer__handle { width: 40px; height: 4px; border-radius: 99px; background: #c9c6bc; }
                .cs-drawer__head { display: flex; align-items: center; justify-content: space-between; padding: 8px 20px 14px; border-bottom: 1px solid var(--cs-rule); flex-shrink: 0; }
                .cs-drawer__title { display: flex; align-items: center; gap: 8px; font-family: var(--cs-serif); font-weight: 800; font-size: 19px; }
                .cs-drawer__close { background: none; border: 1px solid var(--cs-ink); color: var(--cs-ink); cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; }
                .cs-drawer__close:hover { background: var(--cs-ink); color: #fff; }
                .cs-drawer__body { flex: 1; overflow-y: auto; }
                .cs-drawer__empty { padding: 60px 24px; text-align: center; font-family: var(--cs-mono); font-size: 11.5px; color: var(--cs-ink-3); }

                .cs-composer { flex-shrink: 0; border-top: 1.5px solid var(--cs-ink); background: var(--cs-soft); padding: 12px 16px; padding-bottom: max(12px, env(safe-area-inset-bottom)); }
                .cs-composer__bar { display: flex; align-items: center; gap: 10px; }
                .cs-composer__avatar { width: 34px; height: 34px; flex-shrink: 0; background: var(--cs-accent); border: 1.5px solid var(--cs-ink); display: flex; align-items: center; justify-content: center; color: var(--cs-on); }
                .cs-composer__trigger { flex: 1; text-align: left; background: #fff; border: 1.5px solid #c9c6bc; padding: 11px 14px; font-family: var(--cs-sans); font-size: 14px; color: var(--cs-ink-3); cursor: pointer; }
                .cs-composer__trigger:hover { border-color: var(--cs-ink); }
                .cs-composer__form { display: flex; flex-direction: column; gap: 12px; }
                .cs-composer__top { display: flex; align-items: center; justify-content: space-between; }
                .cs-composer__label { font-family: var(--cs-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; background: var(--cs-accent); padding: 2px 7px; }
                .cs-composer__x { background: none; border: none; color: var(--cs-ink-3); cursor: pointer; display: flex; padding: 2px; }
                .cs-composer__x:hover { color: var(--cs-ink); }
                .cs-composer__actions { display: flex; gap: 10px; }

                /* Email modal */
                .cs-modal { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 24px; }
                .cs-modal__bg { position: absolute; inset: 0; background: rgba(0,0,0,0.55); backdrop-filter: blur(4px); }
                .cs-modal__card { position: relative; width: 100%; max-width: 440px; background: #fff; border: 1.5px solid var(--cs-ink); border-top: 5px solid var(--cs-accent); box-shadow: 8px 8px 0 var(--cs-accent); padding: 24px; display: flex; flex-direction: column; gap: 18px; }
                .cs-modal__top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
                .cs-modal__kicker { font-family: var(--cs-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; background: var(--cs-accent); padding: 2px 7px; display: inline-flex; align-items: center; gap: 6px; margin-bottom: 8px; }
                .cs-modal__title { font-family: var(--cs-serif); font-weight: 800; font-size: 22px; }
                .cs-modal__sub { font-size: 12.5px; color: var(--cs-ink-3); line-height: 1.6; margin-top: 4px; }
                .cs-modal__preview { background: var(--cs-soft); border: 1px solid var(--cs-rule); padding: 12px 14px; }
                .cs-modal__preview span { display: block; font-family: var(--cs-mono); font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--cs-ink-3); margin-bottom: 6px; }
                .cs-modal__preview b { display: block; font-size: 13px; margin-bottom: 3px; }
                .cs-modal__preview p { font-size: 13px; color: var(--cs-ink-2); line-height: 1.55; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
                .cs-modal__err { font-family: var(--cs-mono); font-size: 11px; color: var(--cs-danger); margin-top: 6px; }
                .cs-modal__actions { display: flex; gap: 10px; }

                .cs-root :focus-visible { outline: 2px solid var(--cs-ink); outline-offset: 2px; }
                @media (max-width: 700px) { .cs-drawer { height: 92vh; } }
                @media (prefers-reduced-motion: reduce) { .cs-root * { transition: none !important; } }
            `}</style>

            <section className="cs-section">
                <div className="cs-header">
                    <div className="cs-header__left">
                        <span className="cs-header__icon"><MessageSquare size={15} /></span>
                        <h3 className="cs-header__title">Discussion</h3>
                    </div>
                    <span className="cs-header__count">{count}</span>
                </div>

                {justPosted && (
                    <div className="cs-success">
                        <CheckCircle size={14} /> Your comment has been posted.
                    </div>
                )}

                {!justPosted && (
                    <button className="cs-trigger" onClick={openDrawer}>
                        <MessageSquare size={13} /> Leave a comment
                    </button>
                )}

                <div className="cs-list">
                    {comments.length === 0 ? (
                        <div className="cs-empty">No comments yet. Be the first.</div>
                    ) : (
                        visibleComments.map((c) => (
                            <CommentRow key={c.id} comment={c} isOwner={isOwner} onReply={handleMarkReplied} />
                        ))
                    )}
                </div>

                {hasMore && (
                    <button className="cs-view-all" onClick={openDrawer}>
                        <MessageSquare size={12} /> View all {comments.length} comments
                    </button>
                )}
            </section>

            {showDrawer && (
                <>
                    <div className={`cs-backdrop${drawerIn ? " cs-backdrop--in" : ""}`} onClick={closeDrawer} />
                    <div className={`cs-drawer${drawerIn ? " cs-drawer--in" : ""}`}>
                        <div className="cs-drawer__handle-row"><span className="cs-drawer__handle" /></div>

                        <div className="cs-drawer__head">
                            <div className="cs-drawer__title">
                                <MessageCircle size={17} /> {count}
                            </div>
                            <button className="cs-drawer__close" onClick={closeDrawer} aria-label="Close comments">
                                <X size={16} />
                            </button>
                        </div>

                        <div className="cs-drawer__body">
                            {comments.length === 0 ? (
                                <div className="cs-drawer__empty">No comments yet. Be the first.</div>
                            ) : (
                                comments.map((c) => (
                                    <CommentRow key={c.id} comment={c} isOwner={isOwner} onReply={handleMarkReplied} compact />
                                ))
                            )}
                        </div>

                        <div className="cs-composer">
                            {!composerOpen ? (
                                <div className="cs-composer__bar">
                                    <div className="cs-composer__avatar"><MessageSquare size={14} /></div>
                                    <button className="cs-composer__trigger" onClick={openComposer}>
                                        Add a comment…
                                    </button>
                                </div>
                            ) : (
                                <form className="cs-composer__form" onSubmit={handleInitialSubmit}>
                                    <div className="cs-composer__top">
                                        <span className="cs-composer__label">New comment</span>
                                        <button type="button" className="cs-composer__x" onClick={() => setComposerOpen(false)} aria-label="Cancel">
                                            <X size={14} />
                                        </button>
                                    </div>
                                    <div className="cs-field">
                                        <label htmlFor="cs-name">Name</label>
                                        <input
                                            id="cs-name"
                                            ref={composerInputRef}
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>
                                    <div className="cs-field">
                                        <label htmlFor="cs-text">Comment</label>
                                        <textarea
                                            id="cs-text"
                                            rows={3}
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            placeholder="Share your thoughts…"
                                            required
                                        />
                                    </div>
                                    <div className="cs-composer__actions">
                                        <button type="submit" className="cs-btn cs-btn--accent">
                                            Post comment <Send size={12} />
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

            {showEmailModal && (
                <div className="cs-modal">
                    <div className="cs-modal__bg" onClick={handleModalClose} />
                    <div className="cs-modal__card" role="dialog" aria-modal="true" aria-label="Confirm your email">
                        <div className="cs-modal__top">
                            <div>
                                <div className="cs-modal__kicker"><Mail size={11} /> Verify email</div>
                                <h4 className="cs-modal__title">Confirm your address</h4>
                                <p className="cs-modal__sub">
                                    Used to prevent duplicate submissions and so I can reply. It is not shown publicly.
                                </p>
                            </div>
                            <button className="cs-drawer__close" onClick={handleModalClose} aria-label="Close">
                                <X size={15} />
                            </button>
                        </div>

                        {pendingComment && (
                            <div className="cs-modal__preview">
                                <span>Your comment</span>
                                <b>{pendingComment.name}</b>
                                <p>{pendingComment.text}</p>
                            </div>
                        )}

                        <div className="cs-field">
                            <label htmlFor="cs-email">Email address</label>
                            <input
                                id="cs-email"
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                                placeholder="you@example.com"
                                autoFocus
                                onKeyDown={(e) => e.key === "Enter" && handleEmailConfirm()}
                            />
                            {emailError && <p className="cs-modal__err">{emailError}</p>}
                        </div>

                        <div className="cs-modal__actions">
                            <button className="cs-btn cs-btn--accent" style={{ flex: 1 }} onClick={handleEmailConfirm} disabled={emailSubmitting}>
                                {emailSubmitting ? (<><Loader2 size={12} className="cs-spin" /> Posting…</>) : (<><Send size={12} /> Post comment</>)}
                            </button>
                            <button className="cs-btn" onClick={handleModalClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}