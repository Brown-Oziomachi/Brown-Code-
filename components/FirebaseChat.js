"use client";
import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X, Trash2 } from "lucide-react";
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
import { db } from "@/config/firebase.config";

export default function FirebaseChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch messages from Firestore in real-time
  useEffect(() => {
    const messagesRef = collection(db, "chat-messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"), limit(100));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const messageList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageList);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching messages:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Load username from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("chatUserName");
    if (savedName) {
      setUserName(savedName);
      setIsNameSet(true);
    }
  }, []);

  // Send message to Firestore
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (newMessage.trim() && userName) {
      const messagesRef = collection(db, "chat-messages");

      try {
        await addDoc(messagesRef, {
          text: newMessage.trim(),
          userName: userName,
          timestamp: serverTimestamp(),
          userTimestamp: new Date().toISOString(),
        });

        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Failed to send message. Please try again.");
      }
    }
  };

  // Set username
  const handleSetName = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      localStorage.setItem("chatUserName", userName.trim());
      setIsNameSet(true);
    }
  };

  // Clear all messages (admin function)
  const handleClearAllMessages = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete all messages? This cannot be undone."
      )
    ) {
      const messagesRef = collection(db, "chat-messages");
      try {
        const snapshot = await getDocs(messagesRef);
        const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
        alert("All messages cleared successfully!");
      } catch (error) {
        console.error("Error clearing messages:", error);
        alert("Failed to clear messages.");
      }
    }
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
      {/* Chat Header */}
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
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleClearAllMessages}
            className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            title="Clear all messages (admin)"
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Name Input (if not set) */}
      {!isNameSet ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full">
            <h3 className="text-xl font-semibold text-white mb-2 text-center">
              Hey! is me Brown
            </h3>
            <p className="text-gray-400 mb-6 text-center text-sm">
              Enter your name to start chatting
            </p>
            <form onSubmit={handleSetName} className="space-y-4">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your name..."
                className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg py-3 font-semibold hover:shadow-lg transition-all"
              >
                Start Chatting
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {loading ? (
              <div className="text-center text-gray-400 mt-20">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50 animate-pulse" />
                <p>Loading messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-gray-400 mt-20">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((msg) => {
                const isOwnMessage = msg.userName === userName;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      isOwnMessage ? "items-end" : "items-start"
                    }`}
                  >
                    {!isOwnMessage && (
                      <span className="text-xs text-purple-400 font-semibold mb-1 px-2">
                        {msg.userName}
                      </span>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-2 max-w-[80%] ${
                        isOwnMessage
                          ? "bg-purple-600 text-white rounded-br-sm"
                          : "bg-slate-800 text-gray-200 rounded-bl-sm"
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

          {/* Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-slate-700"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-400">
                Chatting as{" "}
                <span className="text-purple-400 font-semibold">
                  {userName}
                </span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsNameSet(false);
                  setUserName("");
                  localStorage.removeItem("chatUserName");
                }}
                className="text-xs text-gray-500 hover:text-gray-300 underline"
              >
                Change
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-slate-800 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full p-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </form>

          {/* Firestore Status */}
          <div className="px-4 pb-3 flex justify-center">
            <span className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Connected to Brown Code
            </span>
          </div>
        </>
      )}
    </div>
  );
}
