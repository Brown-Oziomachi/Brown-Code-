"use client";
import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X, Trash2, LogIn, LogOut } from "lucide-react";
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
} from "firebase/firestore";
import {
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth1, db1 } from "@/config/firebase.config1";

export default function FirebaseChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const messageRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => scrollToBottom(), [messages]);

  // Visitor gets unique ID once
  let userId = null;
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("chatUserId");
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("chatUserId", userId);
    }
  }

  /* ---------------- FETCH MESSAGES: PRIVATE CHAT ---------------- */
  useEffect(() => {
    if (!userId) return;

    let q;

    if (admin) {
      // ADMIN sees all messages
      q = query(
        collection(db1, "chat-messages"),
        orderBy("timestamp", "asc"),
        limit(500)
      );
    } else {
      // USER sees only their own chat with admin
      q = query(
        collection(db1, "chat-messages"),
        where("userId", "==", userId),
        orderBy("timestamp", "asc"),
        limit(500)
      );
    }

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const fetched = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetched);
        setLoading(false);
      },
      (err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [admin, userId]);

  /* ---------------- WATCH AUTH ---------------- */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth1, (user) => {
      if (user && user.email === "browncemmanuel@gmail.com") {
        setAdmin(user);
        setUserName("Brown Code");
        setIsNameSet(true);
      } else {
        setAdmin(null);

        const savedName = localStorage.getItem("chatUserName");
        if (savedName) {
          setUserName(savedName);
          setIsNameSet(true);
        }
      }
    });
    return () => unsub();
  }, []);

  /* ---------------- SEND MESSAGE ---------------- */
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !userName) return;

    const text = newMessage.trim();
    setNewMessage("");

    const data = {
      text: text,
      userName: userName,
      isAdmin: !!admin,
      userId: admin ? "admin" : userId,
      timestamp: serverTimestamp(),
      userTimestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db1, "chat-messages"), data);
    } catch (error) {
      console.error(error);
      alert("Error sending message");
    }
  };

  /* ---------------- SET USER NAME ---------------- */
  const handleSetName = (e) => {
    e.preventDefault();
    if (!userName.trim()) return;

    localStorage.setItem("chatUserName", userName.trim());
    setIsNameSet(true);
  };

  /* ---------------- ADMIN CLEAR ALL ---------------- */
  const clearMessages = async () => {
    if (!admin) return;
    if (!confirm("Delete all messages?")) return;

    const snap = await getDocs(collection(db1, "chat-messages"));
    await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
  };

  /* ---------------- FORMAT TIME ---------------- */
  const formatTime = (t) => {
    if (!t) return "";
    return new Date(t).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* ---------------- UI ---------------- */
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-1 w-full max-w-sm h-[500px] lg:h-[700px] 
        bg-cyan-950 rounded-2xl shadow-2xl z-50 flex flex-col">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-800 p-4 rounded-t-2xl flex justify-between">
        <div className="flex gap-3 items-center">
          <MessageCircle className="text-white" />
          <h3 className="text-white font-semibold">Live Chat</h3>
        </div>

        <div className="flex gap-2">
          {admin ? (
            <button onClick={() => signOut(auth1)}>
              <LogOut className="text-white" />
            </button>
          ) : (
            <a href="/admin">
              <LogIn className="text-white" />
            </a>
          )}

          {admin && (
            <button onClick={clearMessages}>
              <Trash2 className="text-white" />
            </button>
          )}

          <button onClick={onClose}>
            <X className="text-white" />
          </button>
        </div>
      </div>

      {/* NAME INPUT */}
      {!isNameSet && !admin ? (
        <div className="flex-1 p-6 flex items-center justify-center">
          <form className="w-full" onSubmit={handleSetName}>
            <input
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white"
              placeholder="Your name..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button className="mt-4 w-full py-3 rounded-lg bg-cyan-700 text-white">
              Start Chatting
            </button>
          </form>
        </div>
      ) : (
        <>
          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {loading ? (
              <p className="text-gray-400 text-center">Loading…</p>
            ) : messages.length === 0 ? (
              <p className="text-gray-400 text-center">No messages yet</p>
            ) : (
              messages.map((msg) => {
                const isOwn = msg.userName === userName;
                const isAdminMsg = msg.isAdmin;

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      isOwn ? "items-end" : "items-start"
                    }`}
                  >
                    <span
                      className={`text-xs mb-1 ${
                        isAdminMsg ? "text-red-400" : "text-purple-300"
                      }`}
                    >
                      {msg.userName}
                    </span>

                    <div
                      className={`px-4 py-2 rounded-2xl max-w-[80%] ${
                        isAdminMsg
                          ? "bg-red-600 text-white"
                          : isOwn
                          ? "bg-purple-600 text-white"
                          : "bg-slate-800 text-gray-200"
                      }`}
                    >
                      {msg.text}
                    </div>

                    <span className="text-xs text-gray-500 mt-1">
                      {formatTime(msg.userTimestamp)}
                    </span>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-slate-700 bg-cyan-950"
          >
            <div className="flex gap-2">
              <input
                className="flex-1 px-4 py-3 rounded-full bg-slate-800 text-white"
                placeholder="Type a message…"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                disabled={!newMessage.trim()}
                className="p-3 bg-cyan-700 rounded-full text-white"
              >
                <Send />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
