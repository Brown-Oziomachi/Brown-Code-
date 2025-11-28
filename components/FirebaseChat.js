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
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
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
  const messagesEndRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const messageRef = useRef(null)

  // Auto-scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show welcome popup on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem("chatWelcomeShown");
    if (!hasVisited && !isOpen) {
      setTimeout(() => {
        setShowWelcome(true);
        setHasSeenWelcome(true);
        localStorage.setItem("chatWelcomeShown", "true");
      }, 2000); // Show after 2 seconds
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (messageRef.current && !messageRef.current.contains(event.target)) {
        setAdmin(false)
      }
    }
    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showPopup])

  // Auto-hide welcome popup after 10 seconds
  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  // Fetch messages
  useEffect(() => {
    const q = query(
      collection(db1, "chat-messages"),
      orderBy("timestamp", "asc"),
      limit(100)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messageList);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Watch Auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth1, (user) => {
      if (user && user.email === "browncemmanuel@gmail.com") {
        setAdmin(user);
        setUserName("Brown Code");
        setIsNameSet(true);
      } else {
        setAdmin(null);
        if (!user) {
          const savedName = localStorage.getItem("chatUserName");
          if (savedName) {
            setUserName(savedName);
            setIsNameSet(true);
          }
        }
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!admin) {
      const savedName = localStorage.getItem("chatUserName");
      if (savedName) {
        setUserName(savedName);
        setIsNameSet(true);
      }
    }
  }, [admin]);

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !userName) return;

    try {
      await addDoc(collection(db1, "chat-messages"), {
        text: newMessage.trim(),
        userName: userName,
        isAdmin: !!admin,
        timestamp: serverTimestamp(),
        userTimestamp: new Date().toISOString(),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };

  const handleSetName = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      localStorage.setItem("chatUserName", userName.trim());
      setIsNameSet(true);
    }
  };

  const handleAdminLogout = async () => {
    await signOut(auth1);
    setUserName("");
    setIsNameSet(false);
  };

  // Clear all messages (admin only)
  const handleClearAllMessages = async () => {
    if (!admin) return setShowPopup(true);
    const snapshot = await getDocs(collection(db1, "chat-messages"));
    await Promise.all(snapshot.docs.map((doc) => deleteDoc(doc.ref)));
    alert("Messages cleared!");
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return (
        date.toLocaleDateString([], { month: "short", day: "numeric" }) +
        " " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }
  };

  // Count unread messages (messages from admin that user hasn't seen)
  const unreadCount = messages.filter((msg) => msg.isAdmin && !isOpen).length;

  if (!isOpen) {
    return (
      <>
        {/* Welcome Popup */}
        {showWelcome && (
          <div
            ref={messageRef}
            className="fixed bottom-24 right-6 w-80 bg-gradient-to-br from-purple-900 via-slate-900 to-pink-900 rounded-2xl shadow-2xl z-50 border border-purple-500/50 animate-bounce">
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <img
                  src="/man.png"
                  alt="Brown Code"
                  className="h-12 w-12 rounded-full border-2 border-purple-400"
                />
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm">
                    Brown Code
                  </h4>
                  <p className="text-gray-300 text-xs mt-1">
                    Hello! 👋 I'm Brown Code. How may I help you today?
                  </p>
                </div>
                <button
                  onClick={() => setShowWelcome(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
              <button
                onClick={() => {
                  setShowWelcome(false);
                  // Open chat here if you have a function to open it
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Start Chat
              </button>
            </div>
            {/* Triangle pointer */}
            <div className="absolute bottom-[-8px] right-8 w-4 h-4 bg-purple-900 transform rotate-45 border-r border-b border-purple-500/50"></div>
          </div>
        )}

        {/* Message Count Badge (shows when there are unread messages) */}
        {unreadCount > 0 && (
          <div className="fixed bottom-20 right-12 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center z-50 animate-pulse">
            {unreadCount}
          </div>
        )}
      </>
    );
  }

  return (
    <div className="fixed bottom-24 right-6 w-cover max-w-[calc(100vw-4rem)] h-[600px] lg:h-100 mt-10 bg-slate-900 rounded-2xl shadow-2xl z-50 flex flex-col border border-purple-500/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Live Chat</h3>
            <p className="text-xs text-white/80">
              {messages.length} message{messages.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div>
            <img src="/man.png" alt="Brown Code" className="h-10 w-13" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {admin ? (
            <button
              onClick={handleAdminLogout}
              className="text-white hover:bg-white/20 rounded-full p-1"
            >
              <LogOut size={18} />
            </button>
          ) : (
            <a
              href="/admin"
              className="text-white hover:bg-white/20 rounded-full p-1"
            >
              <LogIn size={18} />
            </a>
          )}
          <button
            onClick={handleClearAllMessages}
            className="text-white hover:bg-white/20 rounded-full p-1"
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-1"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* If guest name not set */}
      {!isNameSet && !admin ? (
        <div
          ref={messageRef}
          className="flex-1 flex items-center justify-center p-6">
          <form onSubmit={handleSetName} className="w-full space-y-4">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your name..."
              className="w-full bg-slate-800 text-white rounded-lg px-4 py-3"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg py-3 font-semibold"
            >
              Start Chatting
            </button>
          </form>
        </div>
      ) : (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {loading ? (
              <p className="text-center text-gray-400">Loading...</p>
            ) : messages.length === 0 ? (
              <p className="text-center text-gray-400">No messages yet</p>
            ) : (
              messages.map((msg) => {
                const isOwnMessage = msg.userName === userName;
                const isFromAdmin = msg.isAdmin;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"
                      }`}
                  >
                    <span
                      className={`text-xs mb-1 px-2 ${isFromAdmin
                          ? "text-red-400 font-bold"
                          : "text-purple-400"
                        }`}
                    >
                      {msg.userName}
                    </span>
                    <div
                      className={`rounded-2xl px-4 py-2 max-w-[80%] ${isFromAdmin
                          ? "bg-red-600 text-white"
                          : isOwnMessage
                            ? "bg-purple-600 text-white"
                            : "bg-slate-800 text-gray-200"
                        }`}
                    >
                      <p className="text-sm break-words">{msg.text}</p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 px-2">
                      {formatTimestamp(msg.userTimestamp)}
                    </span>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-slate-700"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={
                  admin ? "Reply as Brown code..." : "Type a message..."
                }
                className="flex-1 bg-slate-800 text-white rounded-full px-4 py-2"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full p-2 disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </>
      )}

      {/* Delete Permission Popup */}
      {showPopup && (
        <div
          ref={messageRef}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border border-purple-500 p-6 rounded-xl max-w-sm mx-4">
            <p className="text-white text-center mb-4">
              Only <span className="text-purple-400 font-bold">Brown Code</span>{" "}
              can delete messages. Relax and continue with your chat.
            </p>
            <button
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-2 px-7 rounded-lg text-white font-semibold"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}