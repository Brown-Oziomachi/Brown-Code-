"use client";
export const dynamic = "force-dynamic";
import React, { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  Send,
  Trash2,
  LogOut,
  Users,
  CheckCircle,
  Radio,
  Inbox,
  Terminal,
  Database,
  UserCheck,
  ArrowLeft,
} from "lucide-react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  getDocs,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth1, db1 } from "@/config/firebase.config1";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function AdminDashboardClient() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [admin, setAdmin] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [identityLogs, setIdentityLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth1, (user) => {
      if (user && ADMIN_EMAIL && user.email === ADMIN_EMAIL) setAdmin(user);
      else {
        setAdmin(null);
        router.push("/admin_sys_node/console/dashboard");
      }
      setLoading(false);
    });
    return () => unsub();
  }, [router]);

  useEffect(() => {
    const q = query(
      collection(db1, "chat-messages"),
      orderBy("timestamp", "asc"),
    );
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setMessages(list);

      const grouped = {};
      const identities = [];
      list.forEach((msg) => {
        if (!msg.isAdmin) {
          if (msg.isIdentityInjection)
            identities.unshift({
              id: msg.id,
              name: msg.userName,
              timestamp: msg.userTimestamp,
            });
          if (!grouped[msg.userName])
            grouped[msg.userName] = {
              userName: msg.userName,
              userId: msg.userId,
              messages: [],
              lastMessage: msg.text,
              lastTimestamp: msg.userTimestamp,
            };
          grouped[msg.userName].messages.push(msg);
          grouped[msg.userName].lastMessage = msg.text;
          grouped[msg.userName].lastTimestamp = msg.userTimestamp;
          if (msg.isIdentityInjection)
            grouped[msg.userName].isIdentityVerified = true;
        }
      });
      setConversations(Object.values(grouped));
      setIdentityLogs(identities);

      const latest = list[list.length - 1];
      if (latest && !latest.isAdmin) {
        new Audio("/notify.mp3").play().catch(() => {});
        if (Notification.permission === "granted")
          new Notification("New message", {
            body: `${latest.userName}: ${latest.text}`,
            icon: "/icon.png",
          });
      }
    });
    return () => unsub();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;
    try {
      await addDoc(collection(db1, "chat-messages"), {
        text: newMessage.trim(),
        userName: "Admin",
        isAdmin: true,
        replyTo: selectedConversation.userName,
        targetUserId: selectedConversation.userId,
        timestamp: serverTimestamp(),
        userTimestamp: new Date().toISOString(),
      });
      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await deleteDoc(doc(db1, "chat-messages", id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("Purge ALL messages? This cannot be undone.")) return;
    const snap = await getDocs(collection(db1, "chat-messages"));
    await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
    setSelectedConversation(null);
  };

  const handleLogout = async () => {
    await signOut(auth1);
    router.push("/admin_sys_node");
  };

  const relativeTime = (ts) => {
    if (!ts) return "";
    const diff = Date.now() - new Date(ts).getTime();
    const m = Math.floor(diff / 60000),
      h = Math.floor(diff / 3600000),
      d = Math.floor(diff / 86400000);
    if (m < 1) return "now";
    if (m < 60) return `${m}m`;
    if (h < 24) return `${h}h`;
    return `${d}d`;
  };

  const convMessages = () => {
    if (!selectedConversation) return [];
    return messages.filter(
      (m) =>
        m.userName === selectedConversation.userName ||
        (m.isAdmin && m.replyTo === selectedConversation.userName),
    );
  };

  const stats = [
    {
      label: "Threads",
      value: conversations.length,
      icon: <Users size={14} />,
    },
    {
      label: "Identities",
      value: identityLogs.length,
      icon: <UserCheck size={14} />,
    },
    {
      label: "Inbound",
      value: messages.filter((m) => !m.isAdmin).length,
      icon: <Inbox size={14} />,
    },
    {
      label: "Outbound",
      value: messages.filter((m) => m.isAdmin).length,
      icon: <Radio size={14} />,
    },
  ];

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0a0a0b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            border: "2px solid #1e1e22",
            borderTopColor: "#e8ff47",
            borderRadius: "50%",
            animation: "ad-spin 0.8s linear infinite",
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#52525b",
          }}
        >
          Authenticating…
        </span>
        <style>{`@keyframes ad-spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );

  if (!admin) return null;

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #0a0a0b; --surface: #111113; --border: #1e1e22; --border-hi: #2e2e34;
          --text-1: #f4f4f5; --text-2: #a1a1aa; --text-3: #52525b;
          --accent: #e8ff47; --accent-dim: rgba(232,255,71,0.08);
          --radius: 6px;
          --serif: 'DM Serif Display', Georgia, serif;
          --sans: 'Inter', system-ui, sans-serif;
          --mono: 'JetBrains Mono', 'Fira Code', monospace;
        }
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes ad-spin { to { transform: rotate(360deg); } }
        @keyframes ad-pulse { 0%,100%{opacity:1}50%{opacity:0.3} }

        .ad-page { min-height: 100vh; background: var(--bg); color: var(--text-2); font-family: var(--sans); display: flex; flex-direction: column; }

        /* ── Header ── */
        .ad-header {
          position: sticky; top: 0; z-index: 50;
          background: rgba(10,10,11,0.95); backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          height: 56px; padding: 0 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .ad-header__brand { font-family: var(--mono); font-size: 12px; font-weight: 500; letter-spacing: 0.08em; color: var(--text-1); display: flex; align-items: center; gap: 8px; }
        .ad-header__brand-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); animation: ad-pulse 2s ease-out infinite; }
        .ad-header__actions { display: flex; align-items: center; gap: 8px; }
        .ad-logout {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.06em;
          padding: 6px 12px; border: 1px solid var(--border); border-radius: var(--radius);
          background: var(--surface); color: var(--text-2); cursor: pointer;
          transition: color 0.15s, border-color 0.15s;
        }
        .ad-logout:hover { color: #f87171; border-color: rgba(248,113,113,0.3); }

        /* ── Stats ── */
        .ad-stats { padding: 16px 24px; border-bottom: 1px solid var(--border); display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
        @media (max-width: 640px) { .ad-stats { grid-template-columns: 1fr 1fr; } }
        .ad-stat { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px 16px; display: flex; align-items: flex-end; justify-content: space-between; }
        .ad-stat__label { font-family: var(--mono); font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-bottom: 6px; }
        .ad-stat__val { font-family: var(--serif); font-size: 28px; color: var(--text-1); line-height: 1; }
        .ad-stat__icon { color: var(--accent); }

        /* ── Main ── */
        .ad-main { padding: 20px 24px; flex: 1; display: flex; flex-direction: column; gap: 16px; max-width: 1200px; width: 100%; margin: 0 auto; }

        /* Identity logs */
        .ad-identities { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px 18px; }
        .ad-identities__header { display: flex; align-items: center; gap: 7px; font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-bottom: 12px; }
        .ad-identities__header svg { color: var(--accent); }
        .ad-identities__chips { display: flex; flex-wrap: wrap; gap: 7px; }
        .ad-id-chip {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--bg); border: 1px solid rgba(232,255,71,0.2);
          border-radius: 3px; padding: 3px 10px;
          font-family: var(--mono); font-size: 10px; color: var(--accent);
        }
        .ad-id-chip__dot { width: 4px; height: 4px; border-radius: 50%; background: var(--accent); animation: ad-pulse 1.4s ease-out infinite; }
        .ad-id-chip__time { color: var(--text-3); font-size: 9px; }
        .ad-identities__empty { font-size: 11px; color: var(--text-3); font-style: italic; }

        /* Chat grid */
        .ad-chat-label { font-family: var(--mono); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-3); display: flex; align-items: center; gap: 7px; }
        .ad-chat-label svg { color: var(--accent); }
        .ad-chat-grid { display: grid; grid-template-columns: 280px 1fr; gap: 12px; height: calc(100vh - 380px); min-height: 400px; }
        @media (max-width: 768px) { .ad-chat-grid { grid-template-columns: 1fr; height: auto; } }

        /* Thread list */
        .ad-threads { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); display: flex; flex-direction: column; overflow: hidden; }
        .ad-threads__header { padding: 12px 14px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; background: var(--bg); }
        .ad-threads__count { font-family: var(--mono); font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-3); display: flex; align-items: center; gap: 6px; }
        .ad-threads__count svg { color: var(--accent); }
        .ad-purge { display: inline-flex; align-items: center; gap: 4px; font-family: var(--mono); font-size: 9px; letter-spacing: 0.06em; padding: 4px 8px; border: 1px solid var(--border); border-radius: 3px; background: none; color: var(--text-3); cursor: pointer; transition: color 0.15s, border-color 0.15s; }
        .ad-purge:hover { color: #f87171; border-color: rgba(248,113,113,0.3); }

        .ad-threads__list { flex: 1; overflow-y: auto; }
        .ad-thread-btn {
          width: 100%; padding: 12px 14px; border-bottom: 1px solid var(--border);
          text-align: left; background: none; border-left: 2px solid transparent; cursor: pointer;
          transition: background 0.12s, border-left-color 0.12s;
          display: flex; align-items: flex-start; gap: 10px;
        }
        .ad-thread-btn:hover { background: var(--bg); }
        .ad-thread-btn--active { background: var(--bg); border-left-color: var(--accent); }

        .ad-thread-avatar {
          width: 30px; height: 30px; border-radius: var(--radius);
          background: var(--surface); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--mono); font-size: 11px; font-weight: 600; color: var(--text-2);
          flex-shrink: 0;
        }
        .ad-thread-btn--active .ad-thread-avatar { border-color: rgba(232,255,71,0.3); color: var(--accent); }
        .ad-thread__body { flex: 1; min-width: 0; }
        .ad-thread__top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 3px; }
        .ad-thread__name { font-size: 12px; font-weight: 500; color: var(--text-1); }
        .ad-thread-btn--active .ad-thread__name { color: var(--accent); }
        .ad-thread__time { font-family: var(--mono); font-size: 9px; color: var(--text-3); }
        .ad-thread__preview { font-size: 11px; color: var(--text-3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .ad-verified { display: inline-block; font-family: var(--mono); font-size: 8px; letter-spacing: 0.06em; background: var(--accent-dim); border: 1px solid rgba(232,255,71,0.2); color: var(--accent); padding: 1px 5px; border-radius: 2px; margin-left: 5px; }

        .ad-threads__empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 32px; }
        .ad-threads__empty svg { color: var(--border-hi); }
        .ad-threads__empty p { font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); }

        /* Message panel */
        .ad-stream { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); display: flex; flex-direction: column; overflow: hidden; }
        .ad-stream__header { padding: 12px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; background: var(--bg); }
        .ad-stream__user { display: flex; align-items: center; gap: 10px; }
        .ad-stream__avatar { width: 32px; height: 32px; border-radius: var(--radius); background: var(--accent-dim); border: 1px solid rgba(232,255,71,0.25); display: flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 12px; font-weight: 600; color: var(--accent); }
        .ad-stream__name { font-size: 13px; font-weight: 500; color: var(--text-1); margin-bottom: 1px; }
        .ad-stream__badge { font-family: var(--mono); font-size: 8px; letter-spacing: 0.08em; text-transform: uppercase; color: #4ade80; background: rgba(74,222,128,0.07); border: 1px solid rgba(74,222,128,0.2); padding: 1px 6px; border-radius: 3px; display: inline-block; }

        .ad-stream__msgs { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 14px; }

        .ad-msg { display: flex; flex-direction: column; }
        .ad-msg--admin { align-items: flex-end; }
        .ad-msg--user { align-items: flex-start; }
        .ad-msg__meta { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; font-family: var(--mono); font-size: 9px; color: var(--text-3); }
        .ad-msg--admin .ad-msg__meta { color: var(--accent); }
        .ad-msg__bubble-wrap { display: flex; align-items: flex-start; gap: 6px; }
        .ad-msg__bubble {
          max-width: 72%; padding: 9px 13px; font-size: 13px; line-height: 1.55;
          border-radius: var(--radius); border: 1px solid var(--border);
        }
        .ad-msg--admin .ad-msg__bubble { background: var(--accent-dim); border-color: rgba(232,255,71,0.2); color: var(--text-1); border-bottom-right-radius: 2px; }
        .ad-msg--user .ad-msg__bubble { background: var(--bg); color: var(--text-2); border-bottom-left-radius: 2px; }
        .ad-msg__bubble--identity { background: rgba(251,191,36,0.07); border-color: rgba(251,191,36,0.2); color: #fbbf24; }
        .ad-del {
          background: none; border: none; cursor: pointer; color: var(--text-3); padding: 4px;
          opacity: 0; transition: color 0.15s, opacity 0.15s; display: flex; margin-top: 4px;
        }
        .ad-msg__bubble-wrap:hover .ad-del { opacity: 1; }
        .ad-del:hover { color: #f87171; }

        /* Input */
        .ad-stream__form { padding: 12px 14px; border-top: 1px solid var(--border); }
        .ad-stream__input-wrap {
          display: flex; align-items: center; gap: 8px;
          background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 8px 12px; transition: border-color 0.15s;
        }
        .ad-stream__input-wrap:focus-within { border-color: rgba(232,255,71,0.3); }
        .ad-stream__prefix { font-family: var(--mono); font-size: 11px; color: var(--accent); flex-shrink: 0; }
        .ad-stream__input { flex: 1; background: none; border: none; outline: none; font-family: var(--mono); font-size: 12px; color: var(--text-1); }
        .ad-stream__input::placeholder { color: var(--text-3); }
        .ad-send {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: var(--mono); font-size: 10px; font-weight: 600; letter-spacing: 0.06em;
          padding: 5px 12px; border-radius: 4px; border: none; cursor: pointer;
          background: var(--accent); color: #0a0a0b;
          transition: opacity 0.15s;
        }
        .ad-send:hover:not(:disabled) { opacity: 0.88; }
        .ad-send:disabled { opacity: 0.35; cursor: not-allowed; }

        /* Empty stream */
        .ad-stream__empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; }
        .ad-stream__empty svg { color: var(--border-hi); }
        .ad-stream__empty p { font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); }
      `}</style>

      <div className="ad-page">
        {/* Header */}
        <header className="ad-header">
          <div className="ad-header__brand">
            <span className="ad-header__brand-dot" />
            brown.dev · admin
          </div>
          <div className="ad-header__actions">
            <button className="ad-logout" onClick={handleLogout}>
              <LogOut size={12} /> Sign out
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="ad-stats">
          {stats.map((s) => (
            <div key={s.label} className="ad-stat">
              <div>
                <div className="ad-stat__label">{s.label}</div>
                <div className="ad-stat__val">{s.value}</div>
              </div>
              <div className="ad-stat__icon">{s.icon}</div>
            </div>
          ))}
        </div>

        <main className="ad-main">
          {/* Identity logs */}
          <div className="ad-identities">
            <div className="ad-identities__header">
              <Database size={11} /> Identity signatures
            </div>
            {identityLogs.length === 0 ? (
              <div className="ad-identities__empty">
                No identities declared yet.
              </div>
            ) : (
              <div className="ad-identities__chips">
                {identityLogs.map((log) => (
                  <div key={log.id} className="ad-id-chip">
                    <span className="ad-id-chip__dot" />
                    {log.name}
                    <span className="ad-id-chip__time">
                      {relativeTime(log.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="ad-chat-label">
            <Terminal size={12} /> Live message threads
          </div>

          {/* Chat grid */}
          <div className="ad-chat-grid">
            {/* Thread list */}
            <div className="ad-threads">
              <div className="ad-threads__header">
                <div className="ad-threads__count">
                  <Users size={11} /> {conversations.length} thread
                  {conversations.length !== 1 ? "s" : ""}
                </div>
                <button className="ad-purge" onClick={handleClearAll}>
                  <Trash2 size={10} /> Purge all
                </button>
              </div>
              <div className="ad-threads__list">
                {conversations.length === 0 ? (
                  <div className="ad-threads__empty">
                    <Inbox size={24} />
                    <p>No threads yet</p>
                  </div>
                ) : (
                  conversations.map((conv) => {
                    const active =
                      selectedConversation?.userName === conv.userName;
                    return (
                      <button
                        key={conv.userName}
                        className={`ad-thread-btn${active ? " ad-thread-btn--active" : ""}`}
                        onClick={() => setSelectedConversation(conv)}
                      >
                        <div className="ad-thread-avatar">
                          {conv.userName.charAt(0).toUpperCase()}
                        </div>
                        <div className="ad-thread__body">
                          <div className="ad-thread__top">
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <span className="ad-thread__name">
                                {conv.userName}
                              </span>
                              {conv.isIdentityVerified && (
                                <span className="ad-verified">verified</span>
                              )}
                            </div>
                            <span className="ad-thread__time">
                              {relativeTime(conv.lastTimestamp)}
                            </span>
                          </div>
                          <div className="ad-thread__preview">
                            {conv.lastMessage}
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Message stream */}
            <div className="ad-stream">
              {selectedConversation ? (
                <>
                  <div className="ad-stream__header">
                    <div className="ad-stream__user">
                      <div className="ad-stream__avatar">
                        {selectedConversation.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="ad-stream__name">
                          {selectedConversation.userName}
                        </div>
                        <span className="ad-stream__badge">connected</span>
                      </div>
                    </div>
                    <CheckCircle size={14} style={{ color: "#4ade80" }} />
                  </div>

                  <div className="ad-stream__msgs">
                    {convMessages().map((msg) => (
                      <div
                        key={msg.id}
                        className={`ad-msg ad-msg--${msg.isAdmin ? "admin" : "user"}`}
                      >
                        <div className="ad-msg__meta">
                          {msg.isAdmin ? "You" : msg.userName} ·{" "}
                          {relativeTime(msg.userTimestamp)}
                        </div>
                        <div className="ad-msg__bubble-wrap">
                          {!msg.isAdmin && (
                            <button
                              className="ad-del"
                              onClick={() => handleDeleteMessage(msg.id)}
                            >
                              <Trash2 size={11} />
                            </button>
                          )}
                          <div
                            className={`ad-msg__bubble${msg.isIdentityInjection ? " ad-msg__bubble--identity" : ""}`}
                          >
                            {msg.text}
                          </div>
                          {msg.isAdmin && (
                            <button
                              className="ad-del"
                              onClick={() => handleDeleteMessage(msg.id)}
                            >
                              <Trash2 size={11} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <form
                    className="ad-stream__form"
                    onSubmit={handleSendMessage}
                  >
                    <div className="ad-stream__input-wrap">
                      <span className="ad-stream__prefix">›_</span>
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={`Reply to ${selectedConversation.userName}…`}
                        className="ad-stream__input"
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="ad-send"
                      >
                        <Send size={11} /> Send
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="ad-stream__empty">
                  <MessageCircle size={28} />
                  <p>Select a thread</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
