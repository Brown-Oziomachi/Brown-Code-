"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Send, X, Mail, CheckCircle, Loader2 } from "lucide-react";
import {
    collection, addDoc, query, where, orderBy,
    onSnapshot, serverTimestamp, updateDoc, doc, setDoc
} from "firebase/firestore";
import { db1 } from "@/config/firebase.config1";
import { onAuthStateChanged } from "firebase/auth";
import { auth1 } from "@/config/firebase.config1";

const OWNER_EMAIL = "browncemmanuel@gmail.com";
const PREVIEW_LIMIT = 6;

const formatDate = (ts) => {
    if (!ts?.toDate) return "—";
    return ts.toDate().toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric"
    });
};

function CommentItem({ comment, isOwner, handleMarkReplied }) {
    const initials = comment.authorName?.slice(0, 2).toUpperCase() || "?";

    return (
        <div className="cs-comment">
            <div className="cs-comment__head">
                <div className="cs-comment__author">
                    <div className="cs-comment__avatar">{initials}</div>
                    <span className="cs-comment__name">{comment.authorName}</span>
                </div>
                <span className="cs-comment__date">{formatDate(comment.createdAt)}</span>
            </div>
            <p className="cs-comment__text">{comment.text}</p>
            <div className="cs-comment__footer">
                {comment.brownReplied ? (
                    <span className="cs-comment__replied">
                        <Mail size={9} />
                        Replied
                    </span>
                ) : (
                    !isOwner && (
                        <span className="cs-comment__pending">Awaiting reply</span>
                    )
                )}
                {isOwner && (
                    <button
                        onClick={() => handleMarkReplied(comment.id)}
                        className="cs-comment__reply-link"
                    >
                        <Mail size={10} />
                        {comment.brownReplied ? "Reply again" : "Reply via email"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default function CommentsSection({ articleSlug }) {
    const [comments, setComments] = useState([]);
    const [name, setName] = useState("");
    const [commentText, setCommentText] = useState("");
    const [isOwner, setIsOwner] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [justPosted, setJustPosted] = useState(false);
    const [showAllModal, setShowAllModal] = useState(false);

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
            // Duplicate check via server route (email never exposed client-side)
            const checkRes = await fetch("/api/comments/check-duplicate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    articleSlug,
                    email: email.trim().toLowerCase()
                }),
            });
            const { isDuplicate } = await checkRes.json();
            if (isDuplicate) {
                setEmailError("This email has already submitted a comment on this article.");
                setEmailSubmitting(false);
                return;
            }

            // Write public comment (no email)
            const newRef = await addDoc(collection(db1, "comments"), {
                articleSlug,
                authorName: pendingComment.name,
                text: pendingComment.text,
                createdAt: serverTimestamp(),
                brownReplied: false,
            });

            // Write email to restricted subcollection only
            await setDoc(doc(db1, "comments", newRef.id, "private", "data"), {
                authorEmail: email.trim().toLowerCase(),
            });

            setName(""); setCommentText(""); setPendingComment(null);
            setEmail(""); setShowEmailModal(false); setShowForm(false);
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

            // Open mail client with the fetched email — never stored in browser
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

                .cs-header__left {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .cs-header__icon { color: var(--accent); }

                .cs-header__title {
                    font-family: var(--font-serif);
                    font-size: 20px;
                    color: var(--text-1);
                    font-weight: 400;
                }

                .cs-header__count {
                    font-family: var(--font-mono);
                    font-size: 11px;
                    color: var(--text-3);
                }

                /* ── Success banner ── */
                .cs-success {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 12px 16px;
                    background: rgba(74,222,128,0.06);
                    border: 1px solid rgba(74,222,128,0.2);
                    border-radius: var(--radius);
                    font-size: 13px;
                    color: #4ade80;
                    margin-bottom: 20px;
                }

                /* ── Toggle trigger ── */
                .cs-trigger {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 12px;
                    border: 1px dashed var(--border);
                    border-radius: var(--radius);
                    background: transparent;
                    color: var(--text-3);
                    font-family: var(--font-mono);
                    font-size: 11px;
                    letter-spacing: 0.06em;
                    cursor: pointer;
                    transition: color 0.15s, border-color 0.15s, background 0.15s;
                    margin-bottom: 24px;
                }

                .cs-trigger:hover {
                    color: var(--accent);
                    border-color: rgba(232,255,71,0.3);
                    background: var(--accent-dim);
                }

                /* ── Form ── */
                .cs-form {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    padding: 20px;
                    margin-bottom: 28px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .cs-form__top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .cs-form__label-group {
                    font-family: var(--font-mono);
                    font-size: 10px;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: var(--text-3);
                }

                .cs-form__close {
                    background: none;
                    border: none;
                    color: var(--text-3);
                    cursor: pointer;
                    padding: 4px;
                    transition: color 0.15s;
                    display: flex;
                }

                .cs-form__close:hover { color: var(--text-1); }

                .cs-field label {
                    display: block;
                    font-family: var(--font-mono);
                    font-size: 10px;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: var(--text-3);
                    margin-bottom: 6px;
                }

                .cs-field input,
                .cs-field textarea {
                    width: 100%;
                    background: var(--bg);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    padding: 10px 12px;
                    font-family: var(--font-sans);
                    font-size: 13px;
                    color: var(--text-1);
                    outline: none;
                    transition: border-color 0.15s;
                }

                .cs-field input::placeholder,
                .cs-field textarea::placeholder { color: var(--text-3); }

                .cs-field input:focus,
                .cs-field textarea:focus { border-color: var(--border-hi); }

                .cs-field textarea { resize: none; }

                .cs-form__actions {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                /* ── Shared button ── */
                .cs-btn {
                    font-family: var(--font-mono);
                    font-size: 11px;
                    letter-spacing: 0.06em;
                    padding: 8px 16px;
                    border-radius: var(--radius);
                    border: 1px solid var(--border);
                    background: transparent;
                    color: var(--text-2);
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    transition: color 0.15s, border-color 0.15s, background 0.15s;
                }

                .cs-btn:hover {
                    color: var(--text-1);
                    border-color: var(--border-hi);
                    background: var(--surface);
                }

                .cs-btn--accent {
                    background: var(--accent-dim);
                    border-color: rgba(232,255,71,0.3);
                    color: var(--accent);
                }

                .cs-btn--accent:hover {
                    background: rgba(232,255,71,0.15);
                    border-color: rgba(232,255,71,0.5);
                }

                .cs-btn:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }

                /* ── Comment list ── */
                .cs-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0;
                    border: 1px solid var(--border);
                    overflow: hidden;
                }

                .cs-empty {
                    padding: 40px 24px;
                    text-align: center;
                    font-family: var(--font-mono);
                    font-size: 11px;
                    color: var(--text-3);
                    letter-spacing: 0.06em;
                }

                /* ── Single comment ── */
                .cs-comment {
                    padding: 18px 20px;
                    background: var(--surface);
                    border-bottom: 1px solid var(--border);
                    transition: background 0.15s;
                }

                .cs-comment:last-child { border-bottom: none; }
                .cs-comment:hover { background: #141417; }

                .cs-comment__head {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 8px;
                }

                .cs-comment__author {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .cs-comment__avatar {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: var(--accent-dim);
                    border: 1px solid rgba(232,255,71,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: var(--font-mono);
                    font-size: 10px;
                    color: var(--accent);
                    flex-shrink: 0;
                }

                .cs-comment__name {
                    font-family: var(--font-mono);
                    font-size: 12px;
                    color: var(--text-1);
                    font-weight: 500;
                }

                .cs-comment__date {
                    font-family: var(--font-mono);
                    font-size: 10px;
                    color: var(--text-3);
                }

                .cs-comment__text {
                    font-size: 14px;
                    color: var(--text-2);
                    line-height: 1.65;
                    font-weight: 300;
                    white-space: pre-wrap;
                }

                .cs-comment__footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 12px;
                    padding-top: 10px;
                    border-top: 1px solid var(--border);
                }

                .cs-comment__replied {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    font-family: var(--font-mono);
                    font-size: 10px;
                    color: #4ade80;
                    background: rgba(74,222,128,0.06);
                    border: 1px solid rgba(74,222,128,0.2);
                    padding: 2px 8px;
                    border-radius: 99px;
                }

                .cs-comment__pending {
                    font-family: var(--font-mono);
                    font-size: 10px;
                    color: var(--text-3);
                }

                .cs-comment__reply-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    font-family: var(--font-mono);
                    font-size: 10px;
                    color: var(--text-3);
                    text-decoration: none;
                    transition: color 0.15s;
                    margin-left: auto;
                }

                .cs-comment__reply-link:hover { color: var(--accent); }

                /* ── View all button ── */
                .cs-view-all {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 12px;
                    border: 1px solid var(--border);
                    border-top: none;
                    background: var(--surface);
                    color: var(--text-3);
                    font-family: var(--font-mono);
                    font-size: 11px;
                    letter-spacing: 0.06em;
                    cursor: pointer;
                    transition: color 0.15s, background 0.15s;
                }

                .cs-view-all:hover {
                    color: var(--accent);
                    background: var(--accent-dim);
                }

                /* ── All comments modal ── */
                .cs-all-modal-backdrop {
                    position: fixed;
                    inset: 0;
                    z-index: 9998;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                }

                .cs-all-modal-bg {
                    position: absolute;
                    inset: 0;
                    background: rgba(0,0,0,0.75);
                    backdrop-filter: blur(8px);
                }

                .cs-all-modal {
                    position: relative;
                    width: 100%;
                    max-width: 600px;
                    max-height: 80vh;
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    overflow: hidden;
                    box-shadow: 0 32px 64px rgba(0,0,0,0.6);
                    display: flex;
                    flex-direction: column;
                }

                .cs-all-modal__accent-bar {
                    height: 2px;
                    background: linear-gradient(90deg, transparent, var(--accent), transparent);
                    flex-shrink: 0;
                }

                .cs-all-modal__head {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 20px 24px;
                    border-bottom: 1px solid var(--border);
                    flex-shrink: 0;
                }

                .cs-all-modal__title {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .cs-all-modal__title-text {
                    font-family: var(--font-serif);
                    font-size: 18px;
                    color: var(--text-1);
                    font-weight: 400;
                }

                .cs-all-modal__count {
                    font-family: var(--font-mono);
                    font-size: 10px;
                    color: var(--text-3);
                }

                .cs-all-modal__close {
                    background: none;
                    border: none;
                    color: var(--text-3);
                    cursor: pointer;
                    padding: 4px;
                    transition: color 0.15s;
                    display: flex;
                }

                .cs-all-modal__close:hover { color: var(--text-1); }

                .cs-all-modal__body {
                    overflow-y: auto;
                    flex: 1;
                }

                .cs-all-modal__body .cs-list {
                    border: none;
                }
                
                /* ── Email modal ── */
                .cs-modal-backdrop {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                }

                .cs-modal-bg {
                    position: absolute;
                    inset: 0;
                    background: rgba(0,0,0,0.75);
                    backdrop-filter: blur(8px);
                }

                .cs-modal {
                    position: relative;
                    width: 100%;
                    max-width: 440px;
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    overflow: hidden;
                    box-shadow: 0 32px 64px rgba(0,0,0,0.6);
                }

                .cs-modal__accent-bar {
                    height: 2px;
                    background: linear-gradient(90deg, transparent, var(--accent), transparent);
                }

                .cs-modal__body {
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .cs-modal__head {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    gap: 12px;
                }

                .cs-modal__eyebrow {
                    font-family: var(--font-mono);
                    font-size: 10px;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: var(--accent);
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-bottom: 6px;
                }

                .cs-modal__title {
                    font-family: var(--font-serif);
                    font-size: 20px;
                    color: var(--text-1);
                    font-weight: 400;
                }

                .cs-modal__sub {
                    font-size: 12px;
                    color: var(--text-3);
                    line-height: 1.6;
                    margin-top: 4px;
                }

                .cs-modal__close {
                    background: none;
                    border: none;
                    color: var(--text-3);
                    cursor: pointer;
                    padding: 4px;
                    transition: color 0.15s;
                    display: flex;
                    flex-shrink: 0;
                }

                .cs-modal__close:hover { color: var(--text-1); }

                .cs-modal__preview {
                    background: var(--bg);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    padding: 12px 14px;
                }

                .cs-modal__preview-label {
                    font-family: var(--font-mono);
                    font-size: 9px;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: var(--text-3);
                    display: block;
                    margin-bottom: 6px;
                }

                .cs-modal__preview-author {
                    font-family: var(--font-mono);
                    font-size: 11px;
                    color: var(--accent);
                    margin-bottom: 4px;
                }

                .cs-modal__preview-text {
                    font-size: 12px;
                    color: var(--text-2);
                    line-height: 1.55;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .cs-modal__error {
                    font-family: var(--font-mono);
                    font-size: 11px;
                    color: #f87171;
                    margin-top: 6px;
                }

                .cs-modal__actions {
                    display: flex;
                    gap: 10px;
                }

                .cs-modal__actions .cs-btn--accent { flex: 1; justify-content: center; }
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

                {/* Toggle */}
                {!showForm && !justPosted && (
                    <button className="cs-trigger" onClick={() => setShowForm(true)}>
                        <MessageSquare size={13} />
                        Leave a comment
                    </button>
                )}

                {/* Form */}
                {showForm && (
                    <form className="cs-form" onSubmit={handleInitialSubmit}>
                        <div className="cs-form__top">
                            <span className="cs-form__label-group">New comment</span>
                            <button type="button" className="cs-form__close" onClick={() => setShowForm(false)}>
                                <X size={14} />
                            </button>
                        </div>
                        <div className="cs-field">
                            <label>Name</label>
                            <input
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
                                rows={4}
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Share your thoughts…"
                                required
                            />
                        </div>
                        <div className="cs-form__actions">
                            <button type="submit" className="cs-btn cs-btn--accent">
                                Post comment
                                <Send size={12} />
                            </button>
                            <button type="button" className="cs-btn" onClick={() => setShowForm(false)}>
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                {/* Comments list — preview only */}
                <div className="cs-list">
                    {comments.length === 0 ? (
                        <div className="cs-empty">No comments yet — be the first.</div>
                    ) : (
                        visibleComments.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                isOwner={isOwner}
                                handleMarkReplied={handleMarkReplied}
                            />
                        ))
                    )}
                </div>

                {/* View all button */}
                {hasMore && (
                    <button className="cs-view-all" onClick={() => setShowAllModal(true)}>
                        <MessageSquare size={12} />
                        View all {comments.length} comments
                    </button>
                )}
            </section>

            {/* All comments modal */}
            {showAllModal && (
                <div className="cs-all-modal-backdrop">
                    <div className="cs-all-modal-bg" onClick={() => setShowAllModal(false)} />
                    <div className="cs-all-modal">
                        <div className="cs-all-modal__accent-bar" />
                        <div className="cs-all-modal__head">
                            <div className="cs-all-modal__title">
                                <MessageSquare size={15} style={{ color: "var(--accent)" }} />
                                <span className="cs-all-modal__title-text">All Comments</span>
                                <span className="cs-all-modal__count">{comments.length} total</span>
                            </div>
                            <button className="cs-all-modal__close" onClick={() => setShowAllModal(false)}>
                                <X size={15} />
                            </button>
                        </div>
                        <div className="cs-all-modal__body">
                            <div className="cs-list">
                                {comments.map((comment) => (
                                    <CommentItem
                                        key={comment.id}
                                        comment={comment}
                                        isOwner={isOwner}
                                        handleMarkReplied={handleMarkReplied}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Email verification modal */}
            {showEmailModal && (
                <div className="cs-modal-backdrop">
                    <div className="cs-modal-bg" onClick={handleModalClose} />
                    <div className="cs-modal">
                        <div className="cs-modal__accent-bar" />
                        <div className="cs-modal__body">
                            <div className="cs-modal__head">
                                <div>
                                    <div className="cs-modal__eyebrow">
                                        <Mail size={12} />
                                        Verify email
                                    </div>
                                    <h4 className="cs-modal__title">Confirm your address</h4>
                                    <p className="cs-modal__sub">
                                        Used to prevent duplicate submissions — not displayed publicly.
                                    </p>
                                </div>
                                <button className="cs-modal__close" onClick={handleModalClose}>
                                    <X size={15} />
                                </button>
                            </div>

                            {pendingComment && (
                                <div className="cs-modal__preview">
                                    <span className="cs-modal__preview-label">Your comment</span>
                                    <p className="cs-modal__preview-author">{pendingComment.name}</p>
                                    <p className="cs-modal__preview-text">{pendingComment.text}</p>
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
                                    <p className="cs-modal__error">{emailError}</p>
                                )}
                            </div>

                            <div className="cs-modal__actions">
                                <button
                                    className="cs-btn cs-btn--accent"
                                    onClick={handleEmailConfirm}
                                    disabled={emailSubmitting}
                                >
                                    {emailSubmitting ? (
                                        <><Loader2 size={12} className="animate-spin" /> Posting…</>
                                    ) : (
                                        <><Send size={12} /> Post comment</>
                                    )}
                                </button>
                                <button className="cs-btn" onClick={handleModalClose}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}