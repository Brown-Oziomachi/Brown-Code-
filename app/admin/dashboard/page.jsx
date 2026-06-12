"use client";
export const dynamic = "force-dynamic";
import React, { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  Send,
  Trash2,
  LogOut,
  Users,
  Clock,
  CheckCircle,
  Activity,
  Terminal,
  Cpu,
  Radio,
  Inbox,
  ShieldAlert,
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

// ── Read admin email from env ─────────────────────────────────────────────────
// Add to .env.local:  NEXT_PUBLIC_ADMIN_EMAIL=your@email.com
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [admin, setAdmin] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const router = useRouter();

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auth guard
  useEffect(() => {
    const unsub = onAuthStateChanged(auth1, (user) => {
      if (user && ADMIN_EMAIL && user.email === ADMIN_EMAIL) {
        setAdmin(user);
      } else {
        setAdmin(null);
        router.push("/admin");
      }
      setLoading(false);
    });
    return () => unsub();
  }, [router]);

  // Live message feed
  useEffect(() => {
    const q = query(
      collection(db1, "chat-messages"),
      orderBy("timestamp", "asc"),
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setMessages(list);

      // Group into conversations by userName
      const grouped = {};
      list.forEach((msg) => {
        if (!msg.isAdmin) {
          if (!grouped[msg.userName]) {
            grouped[msg.userName] = {
              userName: msg.userName,
              messages: [],
              lastMessage: msg.text,
              lastTimestamp: msg.userTimestamp,
            };
          }
          grouped[msg.userName].messages.push(msg);
          grouped[msg.userName].lastMessage = msg.text;
          grouped[msg.userName].lastTimestamp = msg.userTimestamp;
        }
      });
      setConversations(Object.values(grouped));

      // Notification on new inbound message
      const latest = list[list.length - 1];
      if (latest && !latest.isAdmin) {
        new Audio("/notify.mp3").play().catch(() => {});
        if (Notification.permission === "granted") {
          new Notification("New Payload", {
            body: `${latest.userName}: ${latest.text}`,
            icon: "/icon.png",
          });
        }
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
        timestamp: serverTimestamp(),
        userTimestamp: new Date().toISOString(),
      });
      setNewMessage("");
    } catch (err) {
      console.error("Send error:", err);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Delete this payload?")) return;
    try {
      await deleteDoc(doc(db1, "chat-messages", id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("PURGE ALL MESSAGES? This cannot be undone.")) return;
    const snap = await getDocs(collection(db1, "chat-messages"));
    await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
    setSelectedConversation(null);
  };

  const handleLogout = async () => {
    await signOut(auth1);
    router.push("/admin");
  };

  const relativeTime = (ts) => {
    if (!ts) return "";
    const diff = Date.now() - new Date(ts).getTime();
    const m = Math.floor(diff / 60000);
    const h = Math.floor(diff / 3600000);
    const d = Math.floor(diff / 86400000);
    if (m < 1) return "NOW";
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

  // ── Loading / auth guard screens ─────────────────────────────────────────
  if (loading)
    return (
      <div className="min-h-screen bg-[#050811] flex items-center justify-center font-mono">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border border-cyan-500/40 border-t-cyan-500 rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500 tracking-widest uppercase animate-pulse">
            AUTHENTICATING_SESSION…
          </p>
        </div>
      </div>
    );

  if (!admin) return null;

  // ── Stat tiles ────────────────────────────────────────────────────────────
  const stats = [
    {
      label: "ACTIVE_THREADS",
      value: conversations.length,
      icon: <Users size={14} className="text-cyan-500" />,
    },
    {
      label: "TOTAL_PAYLOADS",
      value: messages.length,
      icon: <MessageCircle size={14} className="text-cyan-500" />,
    },
    {
      label: "INBOUND_MSGS",
      value: messages.filter((m) => !m.isAdmin).length,
      icon: <Inbox size={14} className="text-cyan-500" />,
    },
    {
      label: "OUTBOUND_MSGS",
      value: messages.filter((m) => m.isAdmin).length,
      icon: <Radio size={14} className="text-cyan-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#050811] text-slate-400 font-mono antialiased selection:bg-cyan-500/20 selection:text-cyan-300 relative overflow-x-hidden">
      {/* Engineering grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0d_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0d_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0" />

      {/* ── Header bar ──────────────────────────────────────────────────────── */}
      <header className="relative z-20 border-b border-slate-900 bg-[#050811]/90 backdrop-blur-sm px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            </div>
            <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">
              // COMM_DASHBOARD
            </span>
            <span className="hidden sm:inline text-[10px] font-bold text-cyan-400 tracking-widest uppercase">
              Brown Code
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-emerald-950/20 border border-emerald-900/40 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-bold text-emerald-400 tracking-widest">
                SESSION_ACTIVE
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-red-500/30 hover:text-red-400 text-slate-400 text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm"
            >
              <LogOut size={11} /> DISCONNECT()
            </button>
          </div>
        </div>
      </header>

      {/* ── Stats strip ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 border-b border-slate-900 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[#0b132b]/20 border border-slate-800/60 p-4 rounded relative"
            >
              <div className="absolute top-0 left-4 -translate-y-1/2 bg-[#050811] px-1.5 text-[9px] font-bold text-cyan-400 tracking-widest uppercase">
                {s.label}
              </div>
              <div className="flex items-end justify-between mt-1">
                <span className="text-2xl font-black text-white">
                  {s.value}
                </span>
                {s.icon}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main grid ───────────────────────────────────────────────────────── */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">
          <Terminal size={13} className="text-cyan-500" /> LIVE_COMM_ROUTING //
          MESSAGE_THREADS
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-340px)] min-h-[480px]">
          {/* ── Conversation list ────────────────────────────────────────────── */}
          <div className="lg:col-span-4 bg-[#0b132b]/20 border border-slate-800/60 rounded relative flex flex-col overflow-hidden">
            {/* Panel label */}
            <div className="absolute top-0 left-5 -translate-y-1/2 bg-[#050811] px-2 text-[9px] font-bold text-cyan-400 tracking-widest uppercase z-10">
              01 // THREAD_INDEX
            </div>

            {/* Panel header */}
            <div className="flex items-center justify-between px-4 pt-5 pb-3 border-b border-slate-900">
              <div className="flex items-center gap-2">
                <Users size={12} className="text-cyan-500" />
                <span className="text-[10px] font-bold text-slate-300 tracking-wider uppercase">
                  {conversations.length} Thread
                  {conversations.length !== 1 ? "s" : ""}
                </span>
              </div>
              <button
                onClick={handleClearAll}
                title="Purge all messages"
                className="flex items-center gap-1.5 px-2 py-1 text-[9px] font-bold text-red-400/60 hover:text-red-400 hover:bg-red-400/5 border border-transparent hover:border-red-900/40 uppercase tracking-widest transition-all rounded-sm"
              >
                <Trash2 size={10} /> PURGE_ALL()
              </button>
            </div>

            {/* Thread list */}
            <div className="flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-4">
                  <Inbox size={28} className="text-slate-700" />
                  <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                    NO_ACTIVE_THREADS
                  </p>
                  <p className="text-[10px] text-slate-700">
                    Awaiting inbound payloads…
                  </p>
                </div>
              ) : (
                conversations.map((conv) => {
                  const isActive =
                    selectedConversation?.userName === conv.userName;
                  return (
                    <button
                      key={conv.userName}
                      onClick={() => setSelectedConversation(conv)}
                      className={`w-full px-4 py-3 border-b border-slate-900 text-left transition-all group ${
                        isActive
                          ? "bg-cyan-950/20 border-l-2 border-l-cyan-500"
                          : "hover:bg-slate-900/40 border-l-2 border-l-transparent"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <div className="w-8 h-8 bg-[#0b132b] border border-slate-800 flex items-center justify-center flex-shrink-0 rounded-sm">
                          <span
                            className={`text-xs font-black ${isActive ? "text-cyan-400" : "text-slate-400"}`}
                          >
                            {conv.userName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-0.5">
                            <span
                              className={`text-[11px] font-black uppercase tracking-tight ${isActive ? "text-cyan-400" : "text-slate-300"}`}
                            >
                              {conv.userName}
                            </span>
                            <span className="text-[9px] text-slate-600 font-bold tracking-widest">
                              {relativeTime(conv.lastTimestamp)}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 truncate">
                            {conv.lastMessage}
                          </p>
                          <div className="text-[9px] text-slate-700 mt-0.5 font-bold tracking-widest">
                            {conv.messages.length} MSG
                            {conv.messages.length !== 1 ? "S" : ""}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* ── Chat pane ───────────────────────────────────────────────────── */}
          <div className="lg:col-span-8 bg-[#0b132b]/20 border border-slate-800/60 rounded relative flex flex-col overflow-hidden">
            <div className="absolute top-0 left-5 -translate-y-1/2 bg-[#050811] px-2 text-[9px] font-bold text-cyan-400 tracking-widest uppercase z-10">
              02 // ACTIVE_STREAM
            </div>

            {selectedConversation ? (
              <>
                {/* Chat header */}
                <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#0b132b] border border-cyan-900/40 flex items-center justify-center rounded-sm">
                      <span className="text-sm font-black text-cyan-400">
                        {selectedConversation.userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-white uppercase tracking-tight">
                          {selectedConversation.userName}
                        </span>
                        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/20 border border-emerald-900/30 px-1.5 py-0.5 rounded-sm tracking-widest">
                          CONNECTED
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 tracking-widest">
                        {selectedConversation.messages.length} INBOUND_PAYLOAD
                        {selectedConversation.messages.length !== 1 ? "S" : ""}
                      </p>
                    </div>
                  </div>
                  <CheckCircle size={14} className="text-emerald-400" />
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  {convMessages().map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.isAdmin ? "items-end" : "items-start"}`}
                    >
                      {/* Meta row */}
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[9px] font-bold tracking-widest uppercase ${msg.isAdmin ? "text-cyan-400" : "text-slate-500"}`}
                        >
                          {msg.isAdmin
                            ? "// ADMIN_REPLY"
                            : `// ${msg.userName}`}
                        </span>
                        <span className="text-[9px] text-slate-700">
                          {relativeTime(msg.userTimestamp)}
                        </span>
                      </div>

                      {/* Bubble */}
                      <div className="flex items-start gap-2 group">
                        {!msg.isAdmin && (
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 text-slate-700 hover:text-red-400 transition-all mt-1"
                          >
                            <Trash2 size={11} />
                          </button>
                        )}
                        <div
                          className={`px-4 py-2.5 max-w-[75%] text-xs leading-relaxed font-sans border ${
                            msg.isAdmin
                              ? "bg-cyan-950/30 border-cyan-900/40 text-cyan-200 rounded-sm rounded-br-none"
                              : "bg-slate-900 border-slate-800 text-slate-300 rounded-sm rounded-bl-none"
                          }`}
                        >
                          {msg.text}
                        </div>
                        {msg.isAdmin && (
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 text-slate-700 hover:text-red-400 transition-all mt-1"
                          >
                            <Trash2 size={11} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form
                  onSubmit={handleSendMessage}
                  className="px-5 py-4 border-t border-slate-900"
                >
                  <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-2 rounded-sm focus-within:border-cyan-900/60 transition-colors">
                    <span className="text-[10px] font-bold text-cyan-500 tracking-widest flex-shrink-0">
                      ›_
                    </span>
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={`TRANSMIT_TO // ${selectedConversation.userName}…`}
                      className="flex-1 bg-transparent text-xs text-slate-300 placeholder-slate-700 outline-none font-mono"
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-black text-[9px] uppercase tracking-widest transition-all rounded-sm disabled:cursor-not-allowed"
                    >
                      <Send size={10} /> SEND()
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* Empty state */
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-4 px-8">
                  <div className="w-14 h-14 bg-[#0b132b]/40 border border-slate-800/60 flex items-center justify-center mx-auto rounded">
                    <MessageCircle size={22} className="text-slate-700" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      NO_STREAM_SELECTED
                    </p>
                    <p className="text-[10px] text-slate-700">
                      Select a thread from the index to open its payload stream.
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1 h-1 rounded-full bg-cyan-500/40 animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
