"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { MessageCircle, Send, X, Trash2, Loader2, ShieldAlert, Terminal, Shield } from "lucide-react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  deleteDoc,
  getDocs,
  serverTimestamp,
  where,
  doc,
  getDoc
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 50);
    }
  }, [messages, isOpen]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let savedId = localStorage.getItem("chatUserId");
      if (!savedId) {
        savedId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
        localStorage.setItem("chatUserId", savedId);
      }
      setUserId(savedId);
    }
  }, []);

  /* ---------------- WATCH AUTH & PROFILE DATA ---------------- */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth1, async (user) => {
      if (user) {
        if (user.email === "browncemmanuel@gmail.com") {
          setAdmin(user);
          setUserId("admin");
          setUserName("Brown Code");
          setIsNameSet(true);
          setIsRegisteredUser(true);
        } else {
          setAdmin(null);
          setUserId(user.uid);
          setIsRegisteredUser(true);
          setMessages([]); // ✅ clear any leftover admin messages

          try {
            const userDocRef = doc(db1, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists() && userDocSnap.data().username) {
              setUserName(userDocSnap.data().username);
              setIsNameSet(true);
            } else {
              const savedName = localStorage.getItem("chatUserName");
              if (savedName) {
                setUserName(savedName);
                setIsNameSet(true);
              } else {
                setIsNameSet(false);
              }
            }
          } catch (err) {
            console.error("Failed parsing profile metadata sequence:", err);
          }
        }
      } else {
        setAdmin(null);
        setIsRegisteredUser(false);
        setIsNameSet(false);
        setUserName("");

        setMessages([]);
        let savedId = localStorage.getItem("chatUserId");
        if (savedId) setUserId(savedId);

        const savedName = localStorage.getItem("chatUserName");
        if (savedName) {
          setUserName(savedName);
          setIsNameSet(true);
        } else {
          setUserName("");
          setIsNameSet(false);
        }
      }
    });
    return () => unsub();
  }, []);

  /* ---------------- FETCH MESSAGES ---------------- */
  useEffect(() => {
    if (!userId || !isOpen) return;

    const q = query(
      collection(db1, "chat-messages"),
      orderBy("timestamp", "asc"),
      limit(200)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filtered = admin
        ? fetched
        : fetched.filter(msg =>
          msg.userId === userId ||                    
          (msg.isAdmin && msg.targetUserId === userId) 
        );

      setMessages(filtered);
      setLoading(false);
    }, (err) => {
      console.error("Pipeline telemetry sync block error:", err);
      setLoading(false);
    });

    return () => unsub();
  }, [admin, userId, isOpen]);

  /* ---------------- ACTIONS ---------------- */
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !userName) return;

    const text = newMessage.trim();
    setNewMessage("");

    const data = {
      text,
      userName,
      isAdmin: !!admin,
      userId: userId,
      timestamp: serverTimestamp(),
      userTimestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db1, "chat-messages"), data);
    } catch (error) {
      console.error("Data packet push breakdown error:", error);
    }
  };

  const handleSetName = (e) => {
    e.preventDefault();
    if (!userName.trim()) return;
    localStorage.setItem("chatUserName", userName.trim());
    setIsNameSet(true);
  };

  const clearMessages = async () => {
    if (!admin || !window.confirm("Purge absolute message datablocks? This cannot be rolled back.")) return;
    try {
      const snap = await getDocs(collection(db1, "chat-messages"));
      await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
    } catch (err) {
      console.error("System structural data clear error:", err);
    }
  };

  const formatTime = (t) => {
    if (!t) return "";
    return new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full sm:w-[420px] h-full sm:h-[640px] bg-[#030712] sm:rounded-2xl shadow-2xl z-[9999] flex flex-col overflow-hidden border border-slate-900 font-mono selection:bg-cyan-500/30 selection:text-cyan-200 animate-in fade-in slide-in-from-bottom-4 duration-200">

      {/* WINDOW HEADER PANEL */}
      <div className="bg-slate-950 px-4 py-4 flex items-center justify-between border-b border-slate-900 shrink-0">
        <div className="flex gap-3 items-center">
          <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${admin ? "bg-rose-950/20 border-rose-500/30 text-rose-400" : "bg-cyan-950/20 border-cyan-500/30 text-cyan-400"}`}>
            {admin ? <Shield size={18} /> : <Terminal size={18} />}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-slate-100 text-xs font-bold uppercase tracking-wider">
                {admin ? "CHAT_BROWN_CODE" : "COMMS_INTERFACE"}
              </h3>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <span className="text-[10px] text-slate-500 block font-mono lowercase tracking-tight">
              {admin ? "root@browncode.network" : isRegisteredUser ? `registered//node_${userId?.substring(0, 6)}` : `guest//node_${userId?.substring(5, 11)}`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          {admin && (
            <button
              onClick={clearMessages}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:text-rose-400 hover:bg-rose-950/20 transition-all"
              title="Purge Stream Logs"
            >
              <Trash2 size={16} />
            </button>
          )}

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:text-white hover:bg-slate-900 transition-all"
            title="Terminate Terminal Mode"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* CHAT VIEW LOGICAL CORE ENGINE */}
      {!isNameSet ? (
        <div className="flex-1 p-6 flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-md">
          <form className="w-full max-w-xs space-y-4" onSubmit={handleSetName}>
            <div className="text-center space-y-2 mb-2">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 rounded-xl mb-1">
                <ShieldAlert size={20} />
              </div>
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">IDENTITY_PARAM_REQUIRED</h4>
              <p className="text-[11px] text-slate-500 font-sans max-w-[240px] mx-auto leading-relaxed">
                Provide client configuration signature identifier to bind secure socket channel link.
              </p>
            </div>
            <input
              autoFocus
              className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-600 text-xs outline-none focus:border-cyan-500/50 transition-colors font-mono"
              placeholder="ENTER_SIGNATURE_ID..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button
              disabled={!userName.trim()}
              className="w-full py-3 rounded-lg bg-cyan-950/80 border border-cyan-500/40 hover:border-cyan-400 text-cyan-400 hover:text-cyan-200 font-bold text-[10px] uppercase tracking-widest transition-all disabled:opacity-20 disabled:pointer-events-none"
            >
              Initialize Feed Stream
            </button>

            <div className="text-center pt-2">
              <p className="text-[10px] text-slate-600 uppercase tracking-wider">
                Want a persistent network identity?{" "}
                <a href="/signin?redirect=open-chat" className="text-cyan-600 hover:text-cyan-400 underline transition-colors">
                  Authorize_Session
                </a>
              </p>
            </div>
          </form>
        </div>
      ) : (
        <>
          {/* SCROLLABLE LOG METRIC STREAM */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#050b14]">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-2">
                <Loader2 size={18} className="animate-spin text-cyan-500" />
                <span className="text-[10px] tracking-widest uppercase">Syncing datastreams...</span>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-[11px] text-slate-600 pt-16 font-sans">
                Stream matrix clear. Transmit log string packets below to start telemetry routing.
              </div>
            ) : (
              messages.map((msg) => {
               const isAdminMsg = msg.isAdmin;
                const isOwn = !isAdminMsg && (msg.userId === userId || msg.userName === userName);
                
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col w-full ${isOwn ? "items-end" : "items-start"}`}
                  >
                    <span className={`text-[9px] px-1 mb-1 font-mono tracking-wider ${isAdminMsg ? "text-rose-400 font-bold" : isOwn ? "text-slate-500" : "text-cyan-400"}`}>
                      {isAdminMsg ? `[BROWN CODE] ${msg.userName}` : msg.userName}
                    </span>

                    <div
                      className={`px-3.5 py-2.5 rounded-xl text-xs max-w-[85%] relative break-words whitespace-pre-wrap leading-relaxed border ${isAdminMsg
                          ? "bg-rose-950/20 border-rose-500/20 text-rose-200 rounded-tl-none shadow-md shadow-rose-950/5"
                          : isOwn
                            ? "bg-slate-900 border-slate-800 text-slate-200 rounded-tr-none"
                            : "bg-cyan-950/20 border-cyan-500/10 text-slate-200 rounded-tl-none"
                        }`}
                    >
                      <p className="pb-2 pr-6 text-[12.5px] font-sans text-slate-200">{msg.text}</p>
                      <span className="absolute bottom-1 right-2 text-[8px] text-slate-600 font-mono select-none">
                        {formatTime(msg.userTimestamp)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* CHAT INPUT COMMAND ENTRY CONTROL STRIP */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-slate-950 border-t border-slate-900 shrink-0"
          >
            <div className="flex items-center gap-2">
              <input
                className="flex-1 px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-600 text-xs outline-none focus:border-cyan-500/30 transition-colors font-mono"
                placeholder={admin ? "EXECUTE_ADMIN_MESSAGE_PACKET..." : "TRANSMIT_DATASTRING_BURST..."}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all shrink-0 border disabled:opacity-20 disabled:pointer-events-none ${admin
                    ? "bg-rose-950/40 border-rose-500/30 text-rose-400 hover:border-rose-400"
                    : "bg-cyan-950/40 border-cyan-500/30 text-cyan-400 hover:border-cyan-400"
                  }`}
              >
                <Send size={14} className="translate-x-[0.5px]" />
              </button>
            </div>
          </form>
        </>
      )}
    </div>,
    document.body
  );
}