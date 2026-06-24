"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Send, X, Mail, CheckCircle, Loader2 } from "lucide-react";
import { collection, addDoc, query, where, orderBy, onSnapshot, getDocs, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { db1 } from "@/config/firebase.config1";
import { onAuthStateChanged } from "firebase/auth";
import { auth1 } from "@/config/firebase.config1";

const OWNER_EMAIL = "browncemmanuel@gmail.com";

export default function CommentsSection({ articleSlug }) {
    const [comments, setComments] = useState([]);
    const [name, setName] = useState("");
    const [commentText, setCommentText] = useState("");
    const [isOwner, setIsOwner] = useState(false);

    // Email modal state
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [email, setEmail] = useState("");
    const [pendingComment, setPendingComment] = useState(null);
    const [emailError, setEmailError] = useState("");
    const [emailSubmitting, setEmailSubmitting] = useState(false);
    const [justPosted, setJustPosted] = useState(false);
    const [showForm, setShowForm] = useState(false);

    // Check if the logged-in user is the owner (Brown)
    useEffect(() => {
        const unsub = onAuthStateChanged(auth1, (user) => {
            setIsOwner(!!user && user.email === OWNER_EMAIL);
        });
        return () => unsub();
    }, []);

    // Real-time comments sync
    useEffect(() => {
        if (!articleSlug) return;

        const commentsRef = collection(db1, "comments");
        const q = query(
            commentsRef,
            where("articleSlug", "==", articleSlug),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetched = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setComments(fetched);
        }, (err) => {
            console.error("Comments sync error:", err);
        });

        return () => unsubscribe();
    }, [articleSlug]);

    // Step 1: intercept submit — open email modal
    const handleInitialSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !commentText.trim()) return;
        setPendingComment({ name: name.trim(), text: commentText.trim() });
        setEmailError("");
        setEmail("");
        setShowEmailModal(true);
    };

    // Step 2: confirm email — dedupe check then commit
    const handleEmailConfirm = async () => {
        if (!email.trim() || !email.includes("@")) {
            setEmailError("INVALID_EMAIL_FORMAT // Please enter a valid address.");
            return;
        }

        setEmailSubmitting(true);
        setEmailError("");

        try {
            const commentsRef = collection(db1, "comments");
            const existingQuery = query(
                commentsRef,
                where("articleSlug", "==", articleSlug),
                where("authorEmail", "==", email.trim().toLowerCase())
            );
            const existingSnap = await getDocs(existingQuery);

            if (!existingSnap.empty) {
                setEmailError("EMAIL_ALREADY_REGISTERED // This address has already submitted a comment on this article.");
                setEmailSubmitting(false);
                return;
            }

            await addDoc(collection(db1, "comments"), {
                articleSlug,
                authorName: pendingComment.name,
                authorEmail: email.trim().toLowerCase(),
                text: pendingComment.text,
                createdAt: serverTimestamp(),
            });

            setName("");
            setCommentText("");
            setPendingComment(null);
            setEmail("");
            setShowEmailModal(false);
            setJustPosted(true);
            setShowForm(false);
            setTimeout(() => setJustPosted(false), 5000);
        } catch (err) {
            console.error("Comment commit error:", err);
            setEmailError("COMMIT_FAILED // Server error. Try again.");
        } finally {
            setEmailSubmitting(false);
        }
    };


    // Mark a comment as replied — called when owner clicks the reply link
    const handleMarkReplied = async (commentId) => {
        try {
            await updateDoc(doc(db1, "comments", commentId), {
                brownReplied: true,
            });
        } catch (err) {
            console.error("Failed to mark replied:", err);
        }
    };
    const handleModalClose = () => {
        setShowEmailModal(false);
        setPendingComment(null);
        setEmailError("");
        setEmail("");
    };

    return (
        <>
            {/* ─── Comment Section ─── */}
            <section className="mt-16 pt-12 border-t border-slate-900/60">

                {/* Header */}
                <div className="flex items-center gap-2.5 mb-8">
                    <MessageSquare size={16} className="text-cyan-400" />
                    <h3 className="text-sm font-mono tracking-widest uppercase text-slate-400 font-bold">
            // COM_STREAM_SYS ({comments.length})
                    </h3>
                </div>

                {/* Success flash */}
                {justPosted && (
                    <div className="flex items-center gap-2.5 mb-6 px-4 py-3 bg-emerald-950/30 border border-emerald-500/30 rounded text-xs font-mono text-emerald-400">
                        <CheckCircle size={14} />
                        <span>COMMIT_SUCCESS // Your comment has been logged to the stream.</span>
                    </div>
                )}

                {/* Toggle trigger */}
                {!showForm && !justPosted && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="w-full mb-8 flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-slate-800 text-slate-500 hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-cyan-950/10 rounded-lg text-xs font-mono uppercase tracking-wider transition-all"
                    >
                        <MessageSquare size={13} />
                        <span>Leave a comment</span>
                    </button>
                )}

                {/* Input Form — shown only when toggled */}
                {showForm && (
                    <form onSubmit={handleInitialSubmit} className="bg-slate-950/40 border border-slate-900 p-5 rounded-lg space-y-4 mb-8">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">// New comment</span>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="text-slate-600 hover:text-slate-300 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>
                        <div>
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                                Identity Token / Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Guest_User"
                                required
                                className="w-full bg-[#0b0b0f] border border-slate-800 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                                Transmission Data / Comment
                            </label>
                            <textarea
                                rows={3}
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Write your constructive critique or thoughts..."
                                required
                                className="w-full bg-[#0b0b0f] border border-slate-800 rounded px-3 py-2 text-xs font-sans text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500 text-cyan-400 bg-cyan-950/10 hover:bg-cyan-500 hover:text-black rounded text-xs font-bold font-mono uppercase transition-all tracking-wider"
                            >
                                <span>COMMIT_DATA()</span>
                                <Send size={12} />
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 border border-slate-800 text-slate-600 hover:text-slate-300 rounded text-xs font-mono uppercase tracking-wider transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                {/* Comments Feed */}
                <div className="space-y-4">
                    {comments.length === 0 ? (
                        <div className="text-center py-6 border border-dashed border-slate-900 rounded text-xs font-mono text-slate-600">
                            NO_ACTIVE_RECORDS_FOUND // Be the first to start the feed.
                        </div>
                    ) : (
                        comments.map((comment) => {
                            const replySubject = encodeURIComponent(`Brown Code Blog — Reply to your comment`);
                            const replyBody = encodeURIComponent(
                                `Hi ${comment.authorName},\n\nThank you for your comment on my article.\n\nYou wrote:\n"${comment.text}"\n\n[Type your reply here]\n\n— Sir Brown AD\nbrowncemmanuel@gmail.com`
                            );
                            const replyHref = `mailto:${comment.authorEmail}?subject=${replySubject}&body=${replyBody}`;

                            return (
                                <div
                                    key={comment.id}
                                    className="bg-slate-950/20 border border-slate-900 p-4 rounded space-y-2 transition-all hover:border-slate-800 group"
                                >
                                    <div className="flex items-center justify-between text-[11px] font-mono">
                                        <span className="text-cyan-400 font-bold">@{comment.authorName}</span>
                                        <span className="text-slate-600">
                                            {comment.createdAt?.toDate
                                                ? comment.createdAt.toDate().toLocaleDateString()
                                                : "Syncing..."}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 font-sans leading-relaxed font-light whitespace-pre-wrap">
                                        {comment.text}
                                    </p>

                                    <div className="pt-1 border-t border-slate-900/80 flex items-center justify-between">
                                        {/* Public badge — visible to everyone when Brown has replied */}
                                        {comment.brownReplied && (
                                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                                                <Mail size={9} />
                                               Sir Brown replied
                                            </span>
                                        )}
                                        {!comment.brownReplied && !isOwner && (
                                            <span className="text-[10px] font-mono text-slate-700">— awaiting reply</span>
                                        )}

                                        {/* Owner-only reply link — marks comment as replied on click */}
                                        {isOwner && (
                                            <a
                                                href={replyHref}
                                                onClick={() => handleMarkReplied(comment.id)}
                                                className="inline-flex items-center gap-1.5 text-[10px] font-mono text-slate-600 hover:text-cyan-400 transition-colors group/reply ml-auto"
                                            >
                                                <Mail size={10} className="group-hover/reply:text-cyan-400 transition-colors" />
                                                <span>{comment.brownReplied ? "Reply again" : "Brown replies via email"}</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </section>

            {/* ─── Email Verification Modal ─── */}
            {showEmailModal && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={handleModalClose}
                    />
                    <div className="relative w-full max-w-md bg-[#0b0b0f] border border-slate-800 rounded-xl shadow-2xl shadow-black/60 overflow-hidden">
                        <div className="h-[2px] w-full bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-cyan-500/0" />
                        <div className="p-6 space-y-5">
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Mail size={14} className="text-cyan-400" />
                                        <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 font-bold">
                                            IDENTITY_VERIFY()
                                        </span>
                                    </div>
                                    <h4 className="text-base font-bold text-white tracking-tight">
                                        Confirm your email
                                    </h4>
                                    <p className="text-xs text-slate-500 font-sans leading-relaxed">
                                        Your email is used to prevent duplicate submissions. It won't be displayed publicly.
                                    </p>
                                </div>
                                <button
                                    onClick={handleModalClose}
                                    className="p-1.5 text-slate-600 hover:text-slate-300 hover:bg-slate-900 rounded transition-all"
                                >
                                    <X size={15} />
                                </button>
                            </div>

                            {pendingComment && (
                                <div className="bg-slate-950/60 border border-slate-900 rounded p-3 space-y-1">
                                    <span className="text-[9px] font-mono uppercase tracking-widest text-slate-600">
                                        PENDING_PAYLOAD
                                    </span>
                                    <p className="text-[11px] font-mono text-cyan-400">@{pendingComment.name}</p>
                                    <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-2">
                                        {pendingComment.text}
                                    </p>
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setEmailError("");
                                    }}
                                    placeholder="you@example.com"
                                    autoFocus
                                    onKeyDown={(e) => e.key === "Enter" && handleEmailConfirm()}
                                    className="w-full bg-[#060608] border border-slate-800 rounded px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-500/50 transition-colors placeholder:text-slate-700"
                                />
                                {emailError && (
                                    <p className="text-[10px] font-mono text-rose-400 leading-relaxed pt-0.5">
                                        {emailError}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-3 pt-1">
                                <button
                                    onClick={handleEmailConfirm}
                                    disabled={emailSubmitting}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-cyan-500 text-cyan-400 bg-cyan-950/10 hover:bg-cyan-500 hover:text-black rounded text-xs font-bold font-mono uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    {emailSubmitting ? (
                                        <>
                                            <Loader2 size={12} className="animate-spin" />
                                            <span>VERIFYING...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>CONFIRM_AND_COMMIT()</span>
                                            <Send size={12} />
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={handleModalClose}
                                    className="px-4 py-2.5 border border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700 rounded text-xs font-mono uppercase tracking-wider transition-all"
                                >
                                    ABORT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}