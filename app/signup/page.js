"use client";

import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth1, db1 } from "@/config/firebase.config1";
import { Terminal, ShieldCheck, Mail, Lock, User, Loader2, AlertCircle } from "lucide-react";

export default function AuthSignup() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [systemLog, setSystemLog] = useState({ type: "", message: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const executeRegistration = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSystemLog({ type: "", message: "" });

        const { username, email, password, confirmPassword } = formData;

        // Client-side structural sanity checks
        if (!username.trim() || !email.trim() || !password || !confirmPassword) {
            setSystemLog({ type: "error", message: "CRITICAL_ERROR: Empty parameter strings detected." });
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setSystemLog({ type: "error", message: "CRITICAL_ERROR: Password validation mismatch." });
            setLoading(false);
            return;
        }

        try {
            // 1. Initialize Authentication Node Creation
            const userCredential = await createUserWithEmailAndPassword(auth1, email, password);
            const user = userCredential.user;

            // 2. Provision Metadata Node in Firestore
            const userDocRef = doc(db1, "users", user.uid);
            await setDoc(userDocRef, {
                uid: user.uid,
                username: username.trim(),
                email: email.toLowerCase().trim(),
                role: "client", // Default tier access mapping
                createdTimestamp: serverTimestamp(),
                systemLogs: ["NODE_INITIALIZED"],
            });

            setSystemLog({
                type: "success",
                message: "SUCCESS: Authentication established. System access authorized."
            });

            // Flush inputs on successful initialization
            setFormData({ username: "", email: "", password: "", confirmPassword: "" });

        } catch (error) {
            console.error("Auth pipeline breakdown:", error);
            // Parsing raw Firebase security codes into neat terminal syntax strings
            let cleanMessage = error.message;
            if (error.code === "auth/email-already-in-use") {
                cleanMessage = "DENIED: Email identifier already bound to active network node.";
            } else if (error.code === "auth/weak-password") {
                cleanMessage = "DENIED: Security hash length insufficient. Use 6+ characters.";
            } else if (error.code === "auth/invalid-email") {
                cleanMessage = "DENIED: Character array syntax mismatch on input string.";
            }
            setSystemLog({ type: "error", message: `SYS_FAULT: ${cleanMessage}` });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030712] text-slate-300 font-mono flex items-center justify-center p-4 selection:bg-cyan-500/20 selection:text-cyan-300">

            {/* BACKGROUND MATRIX GRID FLAIR */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

            {/* CORE FRAME CONTAINER */}
            <div className="w-full max-w-md bg-slate-950/80 border border-slate-900 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden z-10">

                {/* TOP STATUS GLOW BAR */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

                {/* TERMINAL HEADER BANNER */}
                <div className="flex flex-col items-center text-center space-y-2 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-950/40">
                        <Terminal size={22} className="animate-pulse" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold tracking-widest text-slate-100 uppercase">PROVISION_NEW_NODE</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">Secure Core Cluster Access Interface</p>
                    </div>
                </div>

                {/* COMPONENT LOG FEED FEEDBACK NOTIFICATIONS */}
                {systemLog.message && (
                    <div className={`mb-6 p-3.5 border rounded-lg text-xs flex items-start gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200 ${systemLog.type === "error"
                            ? "bg-rose-950/20 border-rose-500/20 text-rose-400 font-bold"
                            : "bg-emerald-950/20 border-emerald-500/20 text-emerald-400 font-bold"
                        }`}>
                        {systemLog.type === "error" ? <AlertCircle size={16} className="shrink-0 mt-0.5" /> : <ShieldCheck size={16} className="shrink-0 mt-0.5" />}
                        <span className="leading-relaxed">{systemLog.message}</span>
                    </div>
                )}

                {/* SIGNUP INTERFACE FORM */}
                <form onSubmit={executeRegistration} className="space-y-4">

                    {/* USERNAME FIELD STRING */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase text-slate-500 tracking-widest block font-bold">Client Identity Token</label>
                        <div className="relative">
                            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="w-full pl-9 pr-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-700 text-xs outline-none focus:border-cyan-500/40 transition-colors"
                                placeholder="ENTER_SIGNATURE_TAG..."
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    {/* EMAIL STRING LAYER */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase text-slate-500 tracking-widest block font-bold">SMTP Mail Address</label>
                        <div className="relative">
                            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="w-full pl-9 pr-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-700 text-xs outline-none focus:border-cyan-500/40 transition-colors"
                                placeholder="USER@NETWORK.COM..."
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    {/* PASSWORD HASH ENCRYPTION ENVELOPE */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase text-slate-500 tracking-widest block font-bold">Secure Access Key</label>
                        <div className="relative">
                            <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="w-full pl-9 pr-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-700 text-xs outline-none focus:border-cyan-500/40 transition-colors"
                                placeholder="••••••••••••"
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    {/* PASSWORD CONFIRMATION STRING */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase text-slate-500 tracking-widest block font-bold">Confirm Access Key</label>
                        <div className="relative">
                            <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="w-full pl-9 pr-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-700 text-xs outline-none focus:border-cyan-500/40 transition-colors"
                                placeholder="••••••••••••"
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    {/* TRANSITION FIRE BUTTON ENTRY */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 py-3 bg-cyan-950/40 hover:bg-cyan-950/80 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 hover:text-cyan-200 font-bold text-[10px] uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-md disabled:opacity-20 disabled:pointer-events-none"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={14} className="animate-spin text-cyan-500" />
                                SYNCHRONIZING_CORE...
                            </>
                        ) : (
                            "INITIALIZE_ACCOUNT_NODE"
                        )}
                    </button>
                </form>

                {/* OPTIONAL ENTRY NAVIGATION PANEL LINK */}
                <div className="mt-6 text-center border-t border-slate-900/80 pt-4">
                    <p className="text-[10px] text-slate-600 uppercase tracking-wider">
                        Identity already exists in network?{" "}
                        <a href="/signin" className="text-cyan-600 hover:text-cyan-400 underline transition-colors">
                            Request_Session_Tunnel
                        </a>
                    </p>
                </div>

            </div>
        </div>
    );
}