"use client";
import React, { useState, useEffect } from "react";
import { Lock, Mail, Eye, EyeOff, Terminal, ShieldAlert, ArrowLeft, AlertCircle } from "lucide-react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth1 } from "@/config/firebase.config1";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth1, (user) => {
            if (user && ADMIN_EMAIL && user.email === ADMIN_EMAIL)
                router.push("/admin_sys_node/console/dashboard");
        });
        return () => unsub();
    }, [router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); setLoading(true);
        try {
            const { user } = await signInWithEmailAndPassword(auth1, email, password);
            if (user.email === ADMIN_EMAIL) {
                router.push("/admin_sys_node/console/dashboard");
            } else {
                setError("Access denied. Unauthorized account.");
                await auth1.signOut();
            }
        } catch (err) {
            const msgs = {
                "auth/user-not-found": "No account found for this email.",
                "auth/wrong-password": "Incorrect password.",
            };
            setError(msgs[err.code] || "Access restricted to authorized operators.");
        } finally {
            setLoading(false);
        }
    };

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

        .al-page {
          min-height: 100vh; background: var(--bg);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 24px; font-family: var(--sans);
        }

        /* Status bar */
        .al-status {
          width: 100%; max-width: 400px; margin-bottom: 20px;
          display: flex; align-items: center; justify-content: space-between;
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--text-3);
        }
        .al-status__left { display: flex; align-items: center; gap: 7px; }
        .al-status__dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); animation: al-pulse 2s ease-out infinite; }
        @keyframes al-pulse { 0%,100%{opacity:1}50%{opacity:0.3} }
        .al-status__right { display: flex; align-items: center; gap: 5px; color: var(--accent); }

        /* Card */
        .al-card {
          width: 100%; max-width: 400px;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); overflow: hidden;
          border-top: 2px solid var(--accent);
        }
        .al-card__header { padding: 28px 28px 22px; border-bottom: 1px solid var(--border); }
        .al-card__icon {
          width: 40px; height: 40px; margin-bottom: 14px;
          background: var(--accent-dim); border: 1px solid rgba(232,255,71,0.25);
          border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: var(--accent);
        }
        .al-card__eyebrow {
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--accent); margin-bottom: 6px;
          display: flex; align-items: center; gap: 6px;
        }
        .al-card__title { font-family: var(--serif); font-size: 26px; color: var(--text-1); margin-bottom: 4px; }
        .al-card__sub { font-size: 12px; color: var(--text-3); font-weight: 300; line-height: 1.5; }

        .al-card__body { padding: 22px 28px 26px; display: flex; flex-direction: column; gap: 14px; }

        /* Error */
        .al-error {
          display: flex; align-items: flex-start; gap: 8px;
          padding: 10px 13px; border-radius: var(--radius);
          background: rgba(248,113,113,0.07); border: 1px solid rgba(248,113,113,0.25);
          color: #f87171; font-size: 11px; line-height: 1.5;
        }
        .al-error svg { flex-shrink: 0; margin-top: 1px; }

        /* Field */
        .al-field { display: flex; flex-direction: column; gap: 5px; }
        .al-label { font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); }
        .al-input-wrap { position: relative; display: flex; align-items: center; }
        .al-input-prefix {
          position: absolute; left: 10px;
          font-family: var(--mono); font-size: 10px; color: var(--accent); pointer-events: none;
          display: flex; align-items: center; gap: 5px;
        }
        .al-input {
          width: 100%; padding: 9px 12px 9px 48px;
          background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius);
          font-family: var(--mono); font-size: 12px; color: var(--text-1);
          outline: none; transition: border-color 0.15s;
        }
        .al-input::placeholder { color: var(--text-3); }
        .al-input:focus { border-color: rgba(232,255,71,0.4); }
        .al-eye {
          position: absolute; right: 10px; background: none; border: none;
          color: var(--text-3); cursor: pointer; display: flex; transition: color 0.15s;
        }
        .al-eye:hover { color: var(--text-1); }

        /* Submit */
        .al-submit {
          width: 100%; padding: 11px; border-radius: var(--radius); border: none; cursor: pointer;
          background: var(--accent); color: #0a0a0b;
          font-family: var(--mono); font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: opacity 0.15s;
        }
        .al-submit:hover:not(:disabled) { opacity: 0.88; }
        .al-submit:disabled { opacity: 0.45; cursor: not-allowed; }
        @keyframes al-spin { to { transform: rotate(360deg); } }
        .al-spinner { width: 12px; height: 12px; border: 2px solid rgba(10,10,11,0.3); border-top-color: #0a0a0b; border-radius: 50%; animation: al-spin 0.8s linear infinite; }

        /* Card footer */
        .al-card__footer {
          padding: 14px 28px 18px; border-top: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--text-3);
        }
        .al-card__footer a { color: var(--text-3); text-decoration: none; display: flex; align-items: center; gap: 5px; transition: color 0.15s; }
        .al-card__footer a:hover { color: var(--text-1); }

        /* Bottom strip */
        .al-bottom {
          width: 100%; max-width: 400px; margin-top: 14px;
          display: flex; align-items: center; justify-content: space-between;
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--text-3);
        }
        .al-bottom__live { display: flex; align-items: center; gap: 5px; }
        .al-bottom__live-dot { width: 4px; height: 4px; border-radius: 50%; background: #4ade80; animation: al-pulse 1.4s ease-out infinite; }
      `}</style>

            <div className="al-page">

                {/* Status bar */}
                <div className="al-status">
                    <div className="al-status__left">
                        <span className="al-status__dot" />
                        brown.dev · admin portal
                    </div>
                    <div className="al-status__right">
                        <Terminal size={10} /> system online
                    </div>
                </div>

                {/* Card */}
                <div className="al-card">
                    <div className="al-card__header">
                        <div className="al-card__icon"><ShieldAlert size={18} /></div>
                        <div className="al-card__eyebrow"><Lock size={10} /> Secure endpoint</div>
                        <div className="al-card__title">Admin access</div>
                        <div className="al-card__sub">Authorized operators only. Credentials are encrypted in transit.</div>
                    </div>

                    <div className="al-card__body">
                        {error && (
                            <div className="al-error">
                                <AlertCircle size={13} /> {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            <div className="al-field">
                                <label className="al-label">Email address</label>
                                <div className="al-input-wrap">
                                    <span className="al-input-prefix">›_ <Mail size={11} /></span>
                                    <input
                                        type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                        placeholder="operator@domain.com" required className="al-input"
                                    />
                                </div>
                            </div>

                            <div className="al-field">
                                <label className="al-label">Password</label>
                                <div className="al-input-wrap">
                                    <span className="al-input-prefix">›_ <Lock size={11} /></span>
                                    <input
                                        type={showPassword ? "text" : "password"} value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••••••" required className="al-input"
                                        style={{ paddingRight: 36 }}
                                    />
                                    <button type="button" className="al-eye" onClick={() => setShowPassword((v) => !v)}>
                                        {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" disabled={loading} className="al-submit">
                                {loading
                                    ? <><span className="al-spinner" /> Authenticating…</>
                                    : <><Terminal size={12} /> Sign in</>
                                }
                            </button>
                        </form>
                    </div>

                    <div className="al-card__footer">
                        <span>Authorized personnel only</span>
                        <a href="/portfolio"><ArrowLeft size={10} /> Return home</a>
                    </div>
                </div>

                {/* Bottom strip */}
                <div className="al-bottom">
                    <span>brown_code · v1.0</span>
                    <div className="al-bottom__live">
                        <span className="al-bottom__live-dot" /> secure channel
                    </div>
                </div>

            </div>
        </>
    );
}