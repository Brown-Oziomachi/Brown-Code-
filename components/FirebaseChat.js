"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Send, X, Trash2, Loader2, ShieldAlert, Terminal, Shield } from "lucide-react";
import {
  collection, addDoc, query, orderBy, limit,
  onSnapshot, deleteDoc, getDocs, serverTimestamp, doc, getDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth1, db1 } from "@/config/firebase.config1";

export default function FirebaseChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isRegisteredUser, setIsRegisteredUser] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => { if (isOpen) setTimeout(scrollToBottom, 50); }, [messages, isOpen]);
  useEffect(() => { setMounted(true); return () => setMounted(false); }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let saved = localStorage.getItem("chatUserId");
    if (!saved) {
      saved = `user_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      localStorage.setItem("chatUserId", saved);
    }
    setUserId(saved);
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth1, async (user) => {
      if (user) {
        if (user.email === "browncemmanuel@gmail.com") {
          setAdmin(user); setUserId("admin");
          setUserName("Brown Code"); setIsNameSet(true); setIsRegisteredUser(true);
        } else {
          setAdmin(null); setUserId(user.uid); setIsRegisteredUser(true); setMessages([]);
          try {
            const snap = await getDoc(doc(db1, "users", user.uid));
            if (snap.exists() && snap.data().username) {
              setUserName(snap.data().username); setIsNameSet(true);
            } else {
              const saved = localStorage.getItem("chatUserName");
              if (saved) { setUserName(saved); setIsNameSet(true); }
              else setIsNameSet(false);
            }
          } catch (err) { console.error("Profile fetch:", err); }
        }
      } else {
        setAdmin(null); setIsRegisteredUser(false); setMessages([]);
        const savedId = localStorage.getItem("chatUserId");
        const savedName = localStorage.getItem("chatUserName");
        if (savedId) setUserId(savedId);
        if (savedName) { setUserName(savedName); setIsNameSet(true); }
        else { setUserName(""); setIsNameSet(false); }
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!userId || !isOpen) return;
    const q = query(collection(db1, "chat-messages"), orderBy("timestamp", "asc"), limit(200));
    const unsub = onSnapshot(q, (snap) => {
      const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      const filtered = admin
        ? all
        : all.filter((m) => m.userId === userId || (m.isAdmin && m.targetUserId === userId));
      setMessages(filtered);
      setLoading(false);
    }, (err) => { console.error("Snapshot:", err); setLoading(false); });
    return () => unsub();
  }, [admin, userId, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !userName) return;
    const text = newMessage.trim();
    setNewMessage("");
    try {
      await addDoc(collection(db1, "chat-messages"), {
        text, userName, isAdmin: !!admin, userId,
        timestamp: serverTimestamp(),
        userTimestamp: new Date().toISOString(),
      });
    } catch (err) { console.error("Send:", err); }
  };

  const handleSetName = (e) => {
    e.preventDefault();
    if (!userName.trim()) return;
    localStorage.setItem("chatUserName", userName.trim());
    setIsNameSet(true);
  };

  const clearMessages = async () => {
    if (!admin || !window.confirm("Purge all messages? Cannot be undone.")) return;
    try {
      const snap = await getDocs(collection(db1, "chat-messages"));
      await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
    } catch (err) { console.error("Clear:", err); }
  };

  const formatTime = (t) =>
    t ? new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) : "";

  if (!isOpen || !mounted) return null;

  return createPortal(
    <>
      <style>{`
        :root {
          --bg:         #0a0a0b;
          --surface:    #111113;
          --surface-hi: #18181b;
          --border:     #1e1e22;
          --border-hi:  #2e2e34;
          --text-1:     #f4f4f5;
          --text-2:     #a1a1aa;
          --text-3:     #52525b;
          --accent:     #e8ff47;
          --accent-dim: rgba(232,255,71,0.08);
          --radius:     6px;
          --font-mono:  'JetBrains Mono', 'Fira Code', monospace;
          --font-sans:  'Inter', system-ui, sans-serif;
        }

        .fc-portal {
          position: fixed; bottom: 0; right: 0;
          width: 100%; height: 100%;
          z-index: 99999; display: flex; flex-direction: column;
          font-family: var(--font-mono);
          animation: fcChatUp 0.2s ease-out both;
        }
        @media (min-width: 640px) {
          .fc-portal {
            bottom: 24px; right: 24px;
            width: 400px; height: 620px;
            border-radius: 8px; overflow: hidden;
          }
        }
        @keyframes fcChatUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .fc-shell {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: inherit;
          display: flex; flex-direction: column;
          height: 100%; overflow: hidden;
        }

        /* Header */
        .fc-header {
          background: var(--surface);
          padding: 12px 16px;
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid var(--border); flex-shrink: 0;
        }
        .fc-header__left { display: flex; align-items: center; gap: 10px; }
        .fc-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: var(--accent-dim); border: 1px solid rgba(232,255,71,0.2);
          color: var(--accent);
        }
        .fc-avatar--admin { background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.2); color: #f87171; }
        .fc-header__name {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700; color: var(--text-1);
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        .fc-online {
          width: 6px; height: 6px; border-radius: 50%; background: #22c55e;
          animation: fcPulse 2s ease-in-out infinite;
        }
        @keyframes fcPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        .fc-header__sub { font-size: 10px; color: var(--text-3); display: block; margin-top: 2px; letter-spacing: 0.04em; }
        .fc-header__actions { display: flex; align-items: center; gap: 4px; }
        .fc-icon-btn {
          width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;
          background: none; border: none; color: var(--text-3); cursor: pointer;
          border-radius: var(--radius); transition: color 0.15s, background 0.15s;
        }
        .fc-icon-btn:hover { color: var(--text-1); background: var(--surface-hi); }
        .fc-icon-btn--danger:hover { color: #f87171; background: rgba(239,68,68,0.08); }

        /* Identity screen */
        .fc-identity {
          flex: 1; display: flex; align-items: center; justify-content: center;
          padding: 24px; background: var(--bg);
        }
        .fc-identity__form { width: 100%; max-width: 260px; display: flex; flex-direction: column; gap: 14px; }
        .fc-identity__icon-wrap {
          display: flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; margin: 0 auto 4px;
          border-radius: var(--radius);
          background: var(--accent-dim); border: 1px solid rgba(232,255,71,0.2); color: var(--accent);
        }
        .fc-identity__title {
          font-size: 11px; font-weight: 700; color: var(--text-2);
          letter-spacing: 0.12em; text-transform: uppercase; text-align: center;
        }
        .fc-identity__sub {
          font-family: var(--font-sans); font-size: 12px; color: var(--text-3);
          line-height: 1.6; text-align: center;
        }
        .fc-input {
          width: 100%; padding: 10px 14px;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); font-family: var(--font-mono); font-size: 12px;
          color: var(--text-1); outline: none; transition: border-color 0.15s;
        }
        .fc-input::placeholder { color: var(--text-3); }
        .fc-input:focus { border-color: rgba(232,255,71,0.3); }
        .fc-identity__btn {
          width: 100%; padding: 10px 0;
          background: var(--accent-dim); border: 1px solid rgba(232,255,71,0.25);
          border-radius: var(--radius); font-family: var(--font-mono); font-size: 10px;
          font-weight: 700; color: var(--accent); letter-spacing: 0.1em;
          text-transform: uppercase; cursor: pointer; transition: all 0.15s;
        }
        .fc-identity__btn:hover { background: rgba(232,255,71,0.14); border-color: rgba(232,255,71,0.45); }
        .fc-identity__btn:disabled { opacity: 0.25; pointer-events: none; }
        .fc-identity__link { font-size: 10px; color: var(--text-3); text-align: center; letter-spacing: 0.05em; }
        .fc-identity__link a { color: var(--accent); text-decoration: underline; }

        /* Messages */
        .fc-messages {
          flex: 1; overflow-y: auto; padding: 14px; display: flex;
          flex-direction: column; gap: 14px; background: #08080a;
        }
        .fc-messages::-webkit-scrollbar { width: 4px; }
        .fc-messages::-webkit-scrollbar-track { background: transparent; }
        .fc-messages::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

        .fc-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 8px; color: var(--text-3); }
        .fc-loading span { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; }
        .fc-empty { text-align: center; padding-top: 60px; font-family: var(--font-sans); font-size: 12px; color: var(--text-3); }
        @keyframes fcSpin { to { transform: rotate(360deg); } }
        .fc-spin { animation: fcSpin 1s linear infinite; color: var(--accent); }

        .fc-msg { display: flex; flex-direction: column; width: 100%; }
        .fc-msg--own { align-items: flex-end; }
        .fc-msg--other { align-items: flex-start; }

        .fc-msg__name {
          font-size: 9px; margin-bottom: 4px; letter-spacing: 0.08em;
          color: var(--text-3); font-weight: 400;
        }
        .fc-msg__name--admin { color: #f87171; font-weight: 700; }
        .fc-msg__name--other { color: var(--accent); }

        .fc-msg__bubble {
          padding: 9px 13px; max-width: 85%;
          position: relative; word-break: break-word; white-space: pre-wrap;
        }
        .fc-msg__bubble--own {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 10px 10px 2px 10px;
        }
        .fc-msg__bubble--other {
          background: var(--accent-dim); border: 1px solid rgba(232,255,71,0.12);
          border-radius: 10px 10px 10px 2px;
        }
        .fc-msg__bubble--admin {
          background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.15);
          border-radius: 10px 10px 10px 2px;
        }
        .fc-msg__text { font-family: var(--font-sans); font-size: 13px; color: var(--text-1); line-height: 1.55; padding-bottom: 12px; padding-right: 28px; }
        .fc-msg__time { position: absolute; bottom: 4px; right: 8px; font-size: 9px; color: var(--text-3); user-select: none; }

        /* Input */
        .fc-input-row {
          padding: 10px 12px; background: var(--surface);
          border-top: 1px solid var(--border); flex-shrink: 0;
          display: flex; align-items: center; gap: 8px;
        }
        .fc-send-btn {
          width: 36px; height: 36px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--accent-dim); border: 1px solid rgba(232,255,71,0.25);
          border-radius: var(--radius); color: var(--accent);
          cursor: pointer; transition: all 0.15s;
        }
        .fc-send-btn:hover { background: rgba(232,255,71,0.15); border-color: rgba(232,255,71,0.45); }
        .fc-send-btn:disabled { opacity: 0.25; pointer-events: none; }
        .fc-send-btn--admin { background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.2); color: #f87171; }
        .fc-send-btn--admin:hover { background: rgba(239,68,68,0.15); border-color: rgba(239,68,68,0.4); }
      `}</style>

      <div className="fc-portal">
        <div className="fc-shell">

          {/* Header */}
          <div className="fc-header">
            <div className="fc-header__left">
              <div className={`fc-avatar${admin ? " fc-avatar--admin" : ""}`}>
                {admin ? <Shield size={16} /> : <Terminal size={16} />}
              </div>
              <div>
                <div className="fc-header__name">
                  {admin ? "CHAT_BROWN_CODE" : "COMMS_INTERFACE"}
                  <span className="fc-online" />
                </div>
                <span className="fc-header__sub">
                  {admin
                    ? "root@browncode.network"
                    : isRegisteredUser
                      ? `registered//node_${userId?.substring(0, 6)}`
                      : `guest//node_${userId?.substring(5, 11)}`}
                </span>
              </div>
            </div>
            <div className="fc-header__actions">
              {admin && (
                <button className="fc-icon-btn fc-icon-btn--danger" onClick={clearMessages} title="Purge logs">
                  <Trash2 size={14} />
                </button>
              )}
              <button className="fc-icon-btn" onClick={onClose} title="Close">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Body */}
          {!isNameSet ? (
            <div className="fc-identity">
              <form className="fc-identity__form" onSubmit={handleSetName}>
                <div className="fc-identity__icon-wrap">
                  <ShieldAlert size={20} />
                </div>
                <p className="fc-identity__title">IDENTITY_PARAM_REQUIRED</p>
                <p className="fc-identity__sub">
                  Provide a signature identifier to bind your secure channel.
                </p>
                <input
                  autoFocus
                  className="fc-input"
                  placeholder="ENTER_SIGNATURE_ID..."
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <button type="submit" disabled={!userName.trim()} className="fc-identity__btn">
                  Initialize Feed Stream
                </button>
                <p className="fc-identity__link">
                  Want a persistent identity?{" "}
                  <a href="/signin?redirect=open-chat">Authorize_Session</a>
                </p>
              </form>
            </div>
          ) : (
            <>
              <div className="fc-messages">
                {loading ? (
                  <div className="fc-loading">
                    <Loader2 size={16} className="fc-spin" />
                    <span>Syncing datastreams...</span>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="fc-empty">
                    Stream clear. Transmit a message below to start.
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isAdminMsg = msg.isAdmin;
                    const isOwn = !isAdminMsg && (msg.userId === userId || msg.userName === userName);
                    return (
                      <div
                        key={msg.id}
                        className={`fc-msg${isOwn ? " fc-msg--own" : " fc-msg--other"}`}
                      >
                        <span className={`fc-msg__name${isAdminMsg ? " fc-msg__name--admin" : isOwn ? "" : " fc-msg__name--other"}`}>
                          {isAdminMsg ? `[BROWN CODE] ${msg.userName}` : msg.userName}
                        </span>
                        <div className={`fc-msg__bubble${isAdminMsg ? " fc-msg__bubble--admin" : isOwn ? " fc-msg__bubble--own" : " fc-msg__bubble--other"}`}>
                          <p className="fc-msg__text">{msg.text}</p>
                          <span className="fc-msg__time">{formatTime(msg.userTimestamp)}</span>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              <form className="fc-input-row" onSubmit={handleSendMessage}>
                <input
                  className="fc-input"
                  style={{ flex: 1 }}
                  placeholder={admin ? "EXECUTE_ADMIN_MESSAGE_PACKET..." : "TRANSMIT_DATASTRING..."}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className={`fc-send-btn${admin ? " fc-send-btn--admin" : ""}`}
                >
                  <Send size={13} style={{ transform: "translateX(0.5px)" }} />
                </button>
              </form>
            </>
          )}

        </div>
      </div>
    </>,
    document.body
  );
}