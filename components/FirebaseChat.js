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
import { db, auth } from "@/config/firebase.config";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export default function FirebaseChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null); // logged in admin
  const messagesEndRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false)
  // Auto-scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch messages
  useEffect(() => {
    const q = query(
      collection(db, "chat-messages"),
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
    const unsub = onAuthStateChanged(auth, (user) => {
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
      await addDoc(collection(db, "chat-messages"), {
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
    await signOut(auth);
    setUserName("");
    setIsNameSet(false);
  };

  // Clear all messages (admin only)
  const handleClearAllMessages = async () => {
    if (!admin) return setShowPopup(true);
      const snapshot = await getDocs(collection(db, "chat-messages"));
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

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-slate-900 rounded-2xl shadow-2xl z-50 flex flex-col border border-purple-500/50">
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
            <img src="man.png" className="h-10 w-13" />
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
        <div className="flex-1 flex items-center justify-center p-6">
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
                    className={`flex flex-col ${
                      isOwnMessage ? "items-end" : "items-start"
                    }`}
                  >
                    <span
                      className={`text-xs mb-1 px-2 ${
                        isFromAdmin
                          ? "text-red-400 font-bold"
                          : "text-purple-400"
                      }`}
                    >
                      {msg.userName}
                    </span>
                    <div
                      className={`rounded-2xl px-4 py-2 max-w-[80%] ${
                        isFromAdmin
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
                placeholder={admin ? "Reply as Brown code..." : "Type a message..."}
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
            {showPopup && (
              <div
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "purple",
                  border: "1px solid #ccc",
                  padding: "20px",
                    backgroundColor: "purple",
                  borderRadius: "10px"
                }}
              >
                <p>
                  Only <span className="text-purple-400 font-bold">Brown Code</span> can delete this message. Relax and continue with your chat.
                </p>
                <button
                  className="mt-5 bg-gradient-to-r from-purple-600 to-pink-600 py-1 px-7"
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
}
