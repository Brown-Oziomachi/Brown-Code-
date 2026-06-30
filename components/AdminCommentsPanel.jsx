"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Mail,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db1, auth1 } from "@/config/firebase.config1";

const formatDate = (ts) => {
  if (!ts?.toDate) return "—";
  return ts.toDate().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function AdminCommentsPanel() {
  const [comments, setComments] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [replyingId, setReplyingId] = useState(null);
  const [filter, setFilter] = useState("all"); // all | pending | replied

  useEffect(() => {
    const q = query(collection(db1, "comments"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setComments(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      },
      console.error,
    );
    return () => unsub();
  }, []);

  const handleReply = async (comment) => {
    setReplyingId(comment.id);
    try {
      const { currentUser } = auth1;
      if (!currentUser) return;
      const token = await currentUser.getIdToken();

      const res = await fetch("/api/comments/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId: comment.id, token }),
      });

      const { email: authorEmail } = await res.json();

      if (authorEmail) {
        const subject = encodeURIComponent(
          `Re: Your comment on "${comment.articleSlug}"`,
        );
        const body = encodeURIComponent(
          `Hi ${comment.authorName},\n\nThanks for your comment on my blog.\n\nYou wrote:\n"${comment.text}"\n\n[Your reply here]\n\n— Sir Brown AD\nhttps://browncode.name.ng`,
        );
        window.location.href = `mailto:${authorEmail}?subject=${subject}&body=${body}`;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setReplyingId(null);
    }
  };

  const filtered = comments.filter((c) => {
    if (filter === "pending") return !c.brownReplied;
    if (filter === "replied") return !!c.brownReplied;
    return true;
  });

  const pendingCount = comments.filter((c) => !c.brownReplied).length;

  return (
    <>
      <style>{`
                .acp-panel {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    height: 100%;
                }

                .acp-header {
                    padding: 12px 14px;
                    border-bottom: 1px solid var(--border);
                    background: var(--bg);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-shrink: 0;
                }

                .acp-header__left {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    font-family: var(--mono);
                    font-size: 9px;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: var(--text-3);
                }

                .acp-header__left svg { color: var(--accent); }

                .acp-badge {
                    font-family: var(--mono);
                    font-size: 8px;
                    padding: 1px 6px;
                    border-radius: 99px;
                    background: rgba(248,113,113,0.1);
                    border: 1px solid rgba(248,113,113,0.25);
                    color: #f87171;
                }

                .acp-badge--zero {
                    background: var(--accent-dim);
                    border-color: rgba(232,255,71,0.2);
                    color: var(--accent);
                }

                /* Filter tabs */
                .acp-filters {
                    display: flex;
                    border-bottom: 1px solid var(--border);
                    flex-shrink: 0;
                }

                .acp-filter {
                    flex: 1;
                    padding: 8px 4px;
                    background: none;
                    border: none;
                    border-bottom: 2px solid transparent;
                    font-family: var(--mono);
                    font-size: 9px;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: var(--text-3);
                    cursor: pointer;
                    transition: color 0.15s, border-color 0.15s;
                }

                .acp-filter:hover { color: var(--text-1); }

                .acp-filter--active {
                    color: var(--accent);
                    border-bottom-color: var(--accent);
                }

                /* List */
                .acp-list {
                    flex: 1;
                    overflow-y: auto;
                }

                .acp-empty {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    height: 100%;
                    padding: 32px;
                }

                .acp-empty svg { color: var(--border-hi); }

                .acp-empty p {
                    font-family: var(--mono);
                    font-size: 9px;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: var(--text-3);
                }

                /* Comment row */
                .acp-comment {
                    border-bottom: 1px solid var(--border);
                }

                .acp-comment:last-child { border-bottom: none; }

                .acp-comment__row {
                    width: 100%;
                    padding: 11px 14px;
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    text-align: left;
                    transition: background 0.12s;
                }

                .acp-comment__row:hover { background: var(--bg); }

                .acp-comment__avatar {
                    width: 28px;
                    height: 28px;
                    border-radius: var(--radius);
                    background: var(--accent-dim);
                    border: 1px solid rgba(232,255,71,0.15);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: var(--mono);
                    font-size: 10px;
                    color: var(--accent);
                    flex-shrink: 0;
                }

                .acp-comment__body { flex: 1; min-width: 0; }

                .acp-comment__top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 2px;
                }

                .acp-comment__name {
                    font-family: var(--mono);
                    font-size: 11px;
                    font-weight: 500;
                    color: var(--text-1);
                }

                .acp-comment__meta {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .acp-comment__date {
                    font-family: var(--mono);
                    font-size: 9px;
                    color: var(--text-3);
                }

                .acp-dot {
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: #f87171;
                    flex-shrink: 0;
                }

                .acp-dot--replied { background: #4ade80; }

                .acp-comment__slug {
                    font-family: var(--mono);
                    font-size: 9px;
                    color: var(--text-3);
                    margin-bottom: 4px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .acp-comment__preview {
                    font-size: 12px;
                    color: var(--text-2);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                /* Expanded */
                .acp-comment__expanded {
                    padding: 0 14px 14px 52px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .acp-comment__full {
                    font-size: 13px;
                    color: var(--text-2);
                    line-height: 1.6;
                    white-space: pre-wrap;
                    background: var(--bg);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    padding: 10px 12px;
                }

                .acp-comment__actions {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .acp-reply-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    font-family: var(--mono);
                    font-size: 10px;
                    letter-spacing: 0.06em;
                    padding: 6px 12px;
                    border-radius: var(--radius);
                    border: 1px solid rgba(232,255,71,0.3);
                    background: var(--accent-dim);
                    color: var(--accent);
                    cursor: pointer;
                    transition: background 0.15s, border-color 0.15s;
                }

                .acp-reply-btn:hover {
                    background: rgba(232,255,71,0.15);
                    border-color: rgba(232,255,71,0.5);
                }

                .acp-reply-btn:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }

                .acp-replied-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    font-family: var(--mono);
                    font-size: 10px;
                    color: #4ade80;
                    background: rgba(74,222,128,0.06);
                    border: 1px solid rgba(74,222,128,0.2);
                    padding: 4px 10px;
                    border-radius: 99px;
                }
            `}</style>

      <div className="acp-panel">
        {/* Header */}
        <div className="acp-header">
          <div className="acp-header__left">
            <MessageSquare size={11} />
            Blog comments
          </div>
          <span
            className={`acp-badge${pendingCount === 0 ? " acp-badge--zero" : ""}`}
          >
            {pendingCount === 0 ? "all clear" : `${pendingCount} pending`}
          </span>
        </div>

        {/* Filters */}
        <div className="acp-filters">
          {["all", "pending", "replied"].map((f) => (
            <button
              key={f}
              className={`acp-filter${filter === f ? " acp-filter--active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="acp-list">
          {filtered.length === 0 ? (
            <div className="acp-empty">
              <MessageSquare size={24} />
              <p>No comments</p>
            </div>
          ) : (
            filtered.map((comment) => {
              const isOpen = expanded === comment.id;
              const initials =
                comment.authorName?.slice(0, 2).toUpperCase() || "?";

              return (
                <div key={comment.id} className="acp-comment">
                  <button
                    className="acp-comment__row"
                    onClick={() => setExpanded(isOpen ? null : comment.id)}
                  >
                    <div className="acp-comment__avatar">{initials}</div>
                    <div className="acp-comment__body">
                      <div className="acp-comment__top">
                        <span className="acp-comment__name">
                          {comment.authorName}
                        </span>
                        <div className="acp-comment__meta">
                          <span className="acp-comment__date">
                            {formatDate(comment.createdAt)}
                          </span>
                          <span
                            className={`acp-dot${comment.brownReplied ? " acp-dot--replied" : ""}`}
                          />
                          {isOpen ? (
                            <ChevronUp size={11} color="var(--text-3)" />
                          ) : (
                            <ChevronDown size={11} color="var(--text-3)" />
                          )}
                        </div>
                      </div>
                      <div className="acp-comment__slug">
                        /{comment.articleSlug}
                      </div>
                      <div className="acp-comment__preview">{comment.text}</div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="acp-comment__expanded">
                      <div className="acp-comment__full">{comment.text}</div>
                      <div className="acp-comment__actions">
                        {comment.brownReplied ? (
                          <>
                            <span className="acp-replied-badge">
                              <CheckCircle size={10} /> Replied
                            </span>
                            <button
                              className="acp-reply-btn"
                              onClick={() => handleReply(comment)}
                              disabled={replyingId === comment.id}
                            >
                              {replyingId === comment.id ? (
                                <>
                                  <Loader2 size={10} /> Fetching…
                                </>
                              ) : (
                                <>
                                  <Mail size={10} /> Reply again
                                </>
                              )}
                            </button>
                          </>
                        ) : (
                          <button
                            className="acp-reply-btn"
                            onClick={() => handleReply(comment)}
                            disabled={replyingId === comment.id}
                          >
                            {replyingId === comment.id ? (
                              <>
                                <Loader2 size={10} /> Fetching…
                              </>
                            ) : (
                              <>
                                <Mail size={10} /> Reply via email
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
