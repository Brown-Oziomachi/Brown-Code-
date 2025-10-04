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
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "@/config/firebase.config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

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
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check admin auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user && user.email === "browncemmanuel@gmail.com") {
        setAdmin(user);
        setLoading(false);
      } else {
        setAdmin(null);
        setLoading(false);
        router.push("/admin");
      }
    });
    return () => unsub();
  }, [router]);

  // Fetch all messages
  useEffect(() => {
    const q = query(
      collection(db, "chat-messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messageList);

      // Group messages by user
      const grouped = {};
      messageList.forEach((msg) => {
        if (!msg.isAdmin) {
          if (!grouped[msg.userName]) {
            grouped[msg.userName] = {
              userName: msg.userName,
              messages: [],
              lastMessage: msg.text,
              lastTimestamp: msg.userTimestamp,
              unread: !msg.read,
            };
          }
          grouped[msg.userName].messages.push(msg);
          grouped[msg.userName].lastMessage = msg.text;
          grouped[msg.userName].lastTimestamp = msg.userTimestamp;
        }
      });

      setConversations(Object.values(grouped));

      // 🔔 Detect the latest non-admin message
      const latest = messageList[messageList.length - 1];
      if (latest && !latest.isAdmin) {
        // Play notification sound
        const audio = new Audio("/notify.mp3"); // put notify.mp3 in /public
        audio.play().catch(() => { });

        // Show push notification if allowed
        if (Notification.permission === "granted") {
          new Notification("New Message", {
            body: `${latest.userName}: ${latest.text}`,
            icon: "/icon.png", // optional icon in /public
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);


  // Send admin reply
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      await addDoc(collection(db, "chat-messages"), {
        text: newMessage.trim(),
        userName: "Admin",
        isAdmin: true,
        replyTo: selectedConversation.userName,
        timestamp: serverTimestamp(),
        userTimestamp: new Date().toISOString(),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };

  // Delete specific message
  const handleDeleteMessage = async (messageId) => {
    if (window.confirm("Delete this message?")) {
      try {
        await deleteDoc(doc(db, "chat-messages", messageId));
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  // Clear all messages
  const handleClearAllMessages = async () => {
    if (window.confirm("Delete ALL messages? This cannot be undone.")) {
      const snapshot = await getDocs(collection(db, "chat-messages"));
      await Promise.all(snapshot.docs.map((doc) => deleteDoc(doc.ref)));
      alert("All messages cleared!");
      setSelectedConversation(null);
    }
  };

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin");
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const formatRelativeTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMins < 1) return "Just now";
    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${diffInDays}d ago`;
  };

  // Get messages for selected conversation
  const getConversationMessages = () => {
    if (!selectedConversation) return [];
    return messages.filter(
      (msg) =>
        msg.userName === selectedConversation.userName ||
        (msg.isAdmin && msg.replyTo === selectedConversation.userName)
    );
  };

  if (!admin) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">Brown Code Chat Dashboard</h1>
              <p className="text-sm text-white/80">
                Manage customer conversations
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold">{admin.email}</p>
              <p className="text-xs text-white/70">Administrator</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-slate-900 border-b border-slate-800 p-4">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-4 flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-2xl font-bold">{conversations.length}</p>
              <p className="text-sm text-gray-400">Active Users</p>
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-pink-400" />
            <div>
              <p className="text-2xl font-bold">{messages.length}</p>
              <p className="text-sm text-gray-400">Total Messages</p>
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-2xl font-bold">
                {messages.filter((m) => !m.isAdmin).length}
              </p>
              <p className="text-sm text-gray-400">Customer Messages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-3 gap-4 h-[calc(100vh-280px)]">
          {/* Conversations List */}
          <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h2 className="font-semibold text-lg">Conversations</h2>
              <button
                onClick={handleClearAllMessages}
                className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition"
                title="Clear all messages"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No conversations yet</p>
                </div>
              ) : (
                conversations.map((conv) => (
                  <button
                    key={conv.userName}
                    onClick={() => setSelectedConversation(conv)}
                    className={`w-full p-4 border-b border-slate-800 hover:bg-slate-800/50 transition text-left ${selectedConversation?.userName === conv.userName
                        ? "bg-purple-600/20 border-l-4 border-l-purple-600"
                        : ""
                      }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="font-bold">
                            {conv.userName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">{conv.userName}</p>
                          <p className="text-xs text-gray-400">
                            {conv.messages.length} messages
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatRelativeTime(conv.lastTimestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 truncate">
                      {conv.lastMessage}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-span-2 bg-slate-900 rounded-lg border border-slate-800 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold">
                        {selectedConversation.userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {selectedConversation.userName}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {selectedConversation.messages.length} messages
                      </p>
                    </div>
                  </div>
                  <CheckCircle className="text-green-400" size={20} />
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {getConversationMessages().map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.isAdmin ? "items-end" : "items-start"
                        }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs font-semibold ${msg.isAdmin ? "text-red-400" : "text-purple-400"
                            }`}
                        >
                          {msg.userName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatRelativeTime(msg.userTimestamp)}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div
                          className={`rounded-2xl px-4 py-2 max-w-[80%] ${msg.isAdmin
                              ? "bg-red-600 text-white rounded-br-sm"
                              : "bg-slate-800 text-gray-200 rounded-bl-sm"
                            }`}
                        >
                          <p className="text-sm break-words">{msg.text}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-1 text-gray-500 hover:text-red-400 transition opacity-0 hover:opacity-100"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-4 border-t border-slate-800"
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={`Reply to ${selectedConversation.userName}...`}
                      className="flex-1 bg-slate-800 text-white rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full p-3 hover:shadow-lg transition disabled:opacity-50"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Select a conversation to reply</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}