"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth1, db1 } from "@/config/firebase.config1";
import { Terminal, Mail, Lock, Loader2, AlertCircle, LogIn } from "lucide-react";

export default function AuthLoginClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTarget = searchParams.get("redirect");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [systemLog, setSystemLog] = useState({ type: "", message: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const executeLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSystemLog({ type: "", message: "" });

        const { email, password } = formData;

        if (!email.trim() || !password) {
            setSystemLog({ type: "error", message: "CRITICAL_ERROR: Verification strings cannot be empty." });
            setLoading(false);
            return;
        }

        try {
            // 1. Request Session Authentication from Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth1, email, password);
            const user = userCredential.user;

            // 2. Pull Client Authorization Profile from Firestore Node
            const userDocRef = doc(db1, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                await updateDoc(userDocRef, {
                    systemLogs: arrayUnion(`SESSION_OPENED_${new Date().toISOString()}`)
                });

                setSystemLog({
                    type: "success",
                    message: `ACCESS_GRANTED: Welcome back, node // ${userDocSnap.data().username || "client"}.`
                });
            } else {
                setSystemLog({
                    type: "warning",
                    message: "SYS_ALERT: Auth verified, but no database record node exists for this UID."
                });
            }

            // 3. EXECUTE ROUTING VECTOR HANDOFF
            setTimeout(() => {
                if (redirectTarget === "open-chat") {
                    router.push("/?autochat=true");
                } else {
                    router.push("/portfolio");
                }
            }, 1000);

        } catch (error) {
            console.error("Auth tunnel breach fault:", error);
            let cleanMessage = error.message;
            if (error.code === "auth/invalid-credential") {
                cleanMessage = "DENIED: Authentication signature invalid. Check credentials.";
            } else if (error.code === "auth/user-not-found") {
                cleanMessage = "DENIED: Target mail identifier not registered in cluster.";
            } else if (error.code === "auth/wrong-password") {
                cleanMessage = "DENIED: Security hash key mismatch.";
            }
            setSystemLog({ type: "error", message: `SECURITY_VIOLATION: ${cleanMessage}` });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030712] text-slate-300 font-mono flex items-center justify-center p-4 selection:bg-cyan-500/20 selection:text-cyan-300">
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

            <div className="w-full max-w-md bg-slate-950/80 border border-slate-900 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden z-10">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

                <div className="flex flex-col items-center text-center space-y-2 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-950/40">
                        <Terminal size={22} className="animate-pulse" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold tracking-widest text-slate-100 uppercase">ESTABLISH_TUNNEL_SESSION</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">Secure Cloud Gateway Access Matrix</p>
                    </div>
                </div>

                {systemLog.message && (
                    <div className={`mb-6 p-3.5 border rounded-lg text-xs flex items-start gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200 ${systemLog.type === "error" ? "bg-rose-950/20 border-rose-500/20 text-rose-400 font-bold" : systemLog.type === "warning" ? "bg-amber-950/20 border-amber-500/20 text-amber-400" : "bg-emerald-950/20 border-emerald-500/20 text-emerald-400 font-bold"
                        }`}>
                        {systemLog.type === "error" ? <AlertCircle size={16} className="shrink-0 mt-0.5" /> : <LogIn size={16} className="shrink-0 mt-0.5" />}
                        <span className="leading-relaxed">{systemLog.message}</span>
                    </div>
                )}

                <form onSubmit={executeLogin} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase text-slate-500 tracking-widest block font-bold">SMTP Account Mail</label>
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

                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase text-slate-500 tracking-widest block font-bold">Account Access Key</label>
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
                                autoComplete="current-password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 py-3 bg-cyan-950/40 hover:bg-cyan-950/80 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 hover:text-cyan-200 font-bold text-[10px] uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-md disabled:opacity-20 disabled:pointer-events-none"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={14} className="animate-spin text-cyan-500" />
                                VERIFYING_SECURITY_HASH...
                            </>
                        ) : (
                            "OPEN_TUNNEL_SESSION"
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center border-t border-slate-900/80 pt-4">
                    <p className="text-[10px] text-slate-600 uppercase tracking-wider">
                        New node cluster deployment required?{" "}
                        <a
                            href={`/signup${redirectTarget ? `?redirect=${redirectTarget}` : ""}`}
                            className="text-cyan-600 hover:text-cyan-400 underline transition-colors"
                        >
                            Provision_New_Identity
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}