"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth1, db1 } from "@/config/firebase.config1";
import { Mail, Lock, User, Loader2, AlertCircle, ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";

export default function AuthSignupClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTarget = searchParams.get("redirect");

    const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [loading, setLoading] = useState(false);
    const [log, setLog] = useState({ type: "", message: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLog({ type: "", message: "" });

        const { username, email, password, confirmPassword } = formData;

        if (!username.trim() || !email.trim() || !password || !confirmPassword) {
            setLog({ type: "error", message: "All fields are required." });
            setLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            setLog({ type: "error", message: "Passwords do not match." });
            setLoading(false);
            return;
        }

        try {
            const cred = await createUserWithEmailAndPassword(auth1, email, password);
            await setDoc(doc(db1, "users", cred.user.uid), {
                uid: cred.user.uid,
                username: username.trim(),
                email: email.toLowerCase().trim(),
                role: "client",
                createdTimestamp: serverTimestamp(),
                systemLogs: ["NODE_INITIALIZED"],
            }, { merge: true });

            setLog({ type: "success", message: "Account created. Redirecting…" });
            setFormData({ username: "", email: "", password: "", confirmPassword: "" });

            setTimeout(() => {
                router.push(redirectTarget === "open-chat" ? "/?autochat=true" : "/portfolio");
            }, 900);
        } catch (err) {
            const msgs = {
                "auth/email-already-in-use": "An account with that email already exists.",
                "auth/weak-password": "Password must be at least 6 characters.",
                "auth/invalid-email": "Invalid email address.",
                "permission-denied": "Permission denied. Check Firestore rules.",
            };
            setLog({ type: "error", message: msgs[err.code] || err.message });
        } finally {
            setLoading(false);
        }
    };

    // Reuse the same auth styles — add ShieldCheck icon variant
    return (
        <>
            <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #0a0a0b; --surface: #111113; --border: #1e1e22; --border-hi: #2e2e34;
          --text-1: #f4f4f5; --text-2: #a1a1aa; --text-3: #52525b;
          --accent: #e8ff47; --accent-dim: rgba(232,255,71,0.08);
          --radius: 6px;
          --serif: 'DM Serif Display', Georgia, serif;
          --sans: 'Inter', system-ui, sans-serif;
          --mono: 'JetBrains Mono', 'Fira Code', monospace;
        }
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .auth-page { min-height: 100vh; background: var(--bg); display: flex; align-items: center; justify-content: center; padding: 24px; font-family: var(--sans); }
        .auth-card { width: 100%; max-width: 420px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; border-top: 2px solid var(--accent); }
        .auth-card__header { padding: 28px 28px 24px; border-bottom: 1px solid var(--border); text-align: center; }
        .auth-card__icon { width: 44px; height: 44px; margin: 0 auto 14px; background: var(--accent-dim); border: 1px solid rgba(232,255,71,0.25); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: var(--accent); }
        .auth-card__title { font-family: var(--serif); font-size: 24px; color: var(--text-1); margin-bottom: 4px; }
        .auth-card__sub { font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); }
        .auth-card__body { padding: 24px 28px 28px; display: flex; flex-direction: column; gap: 16px; }
        .auth-alert { display: flex; align-items: flex-start; gap: 9px; padding: 11px 14px; border-radius: var(--radius); font-size: 12px; line-height: 1.55; }
        .auth-alert--error { background: rgba(248,113,113,0.07); border: 1px solid rgba(248,113,113,0.25); color: #f87171; }
        .auth-alert--success { background: rgba(74,222,128,0.07); border: 1px solid rgba(74,222,128,0.2); color: #4ade80; }
        .auth-alert svg { flex-shrink: 0; margin-top: 1px; }
        .auth-field { display: flex; flex-direction: column; gap: 6px; }
        .auth-label { font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); }
        .auth-input-wrap { position: relative; }
        .auth-input-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: var(--text-3); display: flex; pointer-events: none; }
        .auth-input { width: 100%; padding: 9px 12px 9px 34px; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); font-family: var(--mono); font-size: 12px; color: var(--text-1); outline: none; transition: border-color 0.15s; }
        .auth-input::placeholder { color: var(--text-3); }
        .auth-input:focus { border-color: rgba(232,255,71,0.4); }
        .auth-submit { width: 100%; padding: 11px; border-radius: var(--radius); border: none; cursor: pointer; background: var(--accent); color: #0a0a0b; font-family: var(--mono); font-size: 11px; font-weight: 600; letter-spacing: 0.08em; display: flex; align-items: center; justify-content: center; gap: 8px; transition: opacity 0.15s; }
        .auth-submit:hover:not(:disabled) { opacity: 0.88; }
        .auth-submit:disabled { opacity: 0.5; cursor: not-allowed; }
        .auth-footer { padding: 14px 28px 20px; border-top: 1px solid var(--border); text-align: center; font-family: var(--mono); font-size: 10px; color: var(--text-3); letter-spacing: 0.04em; }
        .auth-footer a { color: var(--accent); text-decoration: none; }
        .auth-footer a:hover { opacity: 0.75; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

            <div className="auth-page">
                <div className="auth-card">
                    <div className="auth-card__header">
                        <div className="auth-card__icon"><ShieldCheck size={20} /></div>
                        <div className="auth-card__title">Create account</div>
                        <div className="auth-card__sub">brown.dev · register</div>
                    </div>

                    <div className="auth-card__body">
                        {log.message && (
                            <div className={`auth-alert auth-alert--${log.type}`}>
                                {log.type === "error" ? <AlertCircle size={14} /> : <CheckCircle size={14} />}
                                {log.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {[
                                { label: "Username", name: "username", type: "text", icon: <User size={13} />, placeholder: "Your name", auto: "off" },
                                { label: "Email address", name: "email", type: "email", icon: <Mail size={13} />, placeholder: "you@email.com", auto: "email" },
                                { label: "Password", name: "password", type: "password", icon: <Lock size={13} />, placeholder: "••••••••••••", auto: "new-password" },
                                { label: "Confirm password", name: "confirmPassword", type: "password", icon: <Lock size={13} />, placeholder: "••••••••••••", auto: "new-password" },
                            ].map((f) => (
                                <div key={f.name} className="auth-field">
                                    <label className="auth-label">{f.label}</label>
                                    <div className="auth-input-wrap">
                                        <span className="auth-input-icon">{f.icon}</span>
                                        <input type={f.type} name={f.name} value={formData[f.name]}
                                            onChange={handleChange} disabled={loading}
                                            placeholder={f.placeholder} className="auth-input" autoComplete={f.auto} />
                                    </div>
                                </div>
                            ))}

                            <button type="submit" disabled={loading} className="auth-submit">
                                {loading
                                    ? <><Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> Creating account…</>
                                    : <>Create account <ArrowRight size={13} /></>
                                }
                            </button>
                        </form>
                    </div>

                    <div className="auth-footer">
                        Already have an account?{" "}
                        <a href={`/signin${redirectTarget ? `?redirect=${redirectTarget}` : ""}`}>Sign in</a>
                    </div>
                </div>
            </div>
        </>
    );
}