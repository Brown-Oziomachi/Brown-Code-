"use client";
import React, { useState, useEffect } from "react";
import { Lock, Mail, Eye, EyeOff, Terminal, ShieldAlert, Activity } from "lucide-react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth1 } from "@/config/firebase.config1";

// Add to .env.local:  NEXT_PUBLIC_ADMIN_EMAIL=your@email.com
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    const unsub = onAuthStateChanged(auth1, (user) => {
      if (user && ADMIN_EMAIL && user.email === ADMIN_EMAIL) {
        router.push("/admin/dashboard");
      }
    });
    return () => unsub();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth1, email, password);
      if (user.email === ADMIN_EMAIL) {
        router.push("/admin/dashboard");
      } else {
        setError("ACCESS_DENIED // Unauthorized node.");
        await auth1.signOut();
      }
    } catch (err) {
      if (err.code === "auth/user-not-found") setError("ERR_404 // No account found for this endpoint.");
      else if (err.code === "auth/wrong-password") setError("ERR_401 // Invalid credential payload.");
      else setError("ERR_403 // Access restricted to authorized operators only.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-400 font-mono antialiased selection:bg-cyan-500/20 selection:text-cyan-300 relative overflow-hidden flex flex-col items-center justify-center px-4">

      {/* Engineering grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0d_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0d_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/3 rounded-full blur-3xl pointer-events-none" />

      {/* ── Top status bar ───────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-md mb-6">
        <div className="flex items-center justify-between text-[9px] font-bold text-slate-600 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span>BROWN_CODE // ADMIN_PORTAL</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity size={9} className="text-cyan-500" />
            <span className="text-cyan-600">SYSTEM_ONLINE</span>
          </div>
        </div>
      </div>

      {/* ── Login panel ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[#0b132b]/20 border border-slate-800/60 rounded relative">

          {/* Floating panel label */}
          <div className="absolute top-0 left-6 -translate-y-1/2 bg-[#050811] px-2 text-[9px] font-bold text-cyan-400 tracking-widest uppercase">
            01 // AUTH_GATEWAY
          </div>

          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-24 h-px bg-cyan-500" />

          <div className="p-8 pt-10 space-y-8">

            {/* Header */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest rounded-none">
                <ShieldAlert size={10} className="text-cyan-500" /> SECURE_ENDPOINT_ACCESS
              </div>
              <h1 className="text-2xl font-black text-white uppercase tracking-tight leading-none">
                Admin Authentication
              </h1>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                Authorized operators only. Credential payloads are encrypted in transit.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                  // IDENTITY_ENDPOINT
                </label>
                <div className="relative flex items-center bg-slate-950 border border-slate-800 focus-within:border-cyan-900/60 transition-colors rounded-sm">
                  <span className="pl-3 text-[10px] font-bold text-cyan-500 tracking-widest flex-shrink-0">›_</span>
                  <Mail size={11} className="ml-2 text-slate-600 flex-shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@domain.com"
                    required
                    className="flex-1 bg-transparent text-xs text-slate-300 placeholder-slate-700 outline-none px-3 py-3 font-mono"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                  // CREDENTIAL_HASH
                </label>
                <div className="relative flex items-center bg-slate-950 border border-slate-800 focus-within:border-cyan-900/60 transition-colors rounded-sm">
                  <span className="pl-3 text-[10px] font-bold text-cyan-500 tracking-widest flex-shrink-0">›_</span>
                  <Lock size={11} className="ml-2 text-slate-600 flex-shrink-0" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="flex-1 bg-transparent text-xs text-slate-300 placeholder-slate-700 outline-none px-3 py-3 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="pr-3 text-slate-700 hover:text-slate-400 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
                  </button>
                </div>
              </div>

              {/* Error output */}
              {error && (
                <div className="flex items-start gap-2 px-3 py-2.5 bg-red-950/20 border border-red-900/40 rounded-sm">
                  <ShieldAlert size={11} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-[10px] text-red-400 font-bold tracking-wide leading-relaxed">{error}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-black text-xs uppercase tracking-widest transition-all rounded-sm disabled:cursor-not-allowed shadow-md"
              >
                {loading ? (
                  <>
                    <span className="w-3 h-3 border border-slate-500 border-t-slate-300 rounded-full animate-spin" />
                    AUTHENTICATING…
                  </>
                ) : (
                  <>
                    <Terminal size={11} />
                    EXECUTE_LOGIN()
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="border-t border-slate-900 pt-4 flex items-center justify-between">
              <span className="text-[9px] text-slate-700 uppercase tracking-widest font-bold">
                AUTHORIZED_PERSONNEL_ONLY
              </span>
              <a
                href="/portfolio"
                className="text-[9px] font-bold text-slate-600 hover:text-cyan-400 uppercase tracking-widest transition-colors"
              >
                ← RETURN_HOME()
              </a>
            </div>
          </div>
        </div>

        {/* Bottom meta line */}
        <div className="mt-4 flex items-center justify-between text-[9px] text-slate-700 font-bold uppercase tracking-widest">
          <span>BROWN_CODE_PORTFOLIO // v1.0</span>
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            SECURE_CHANNEL
          </span>
        </div>
      </div>
    </div>
  );
}