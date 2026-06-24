"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    Terminal, Cpu, HardDrive, RefreshCw, ArrowLeft,
    Activity, Clock, ShieldCheck, AlertCircle, FileText,
    Footprints, LogOut, LogIn, Database, UserCheck
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db1 } from "@/config/firebase.config1";

export default function StatusMonitorPage() {
    const [systemData, setSystemData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [lastUpdated, setLastUpdated] = useState("");
    const [liveClientTrail, setLiveClientTrail] = useState([]);
    const [userSessions, setUserSessions] = useState([]);
    const [visitorName, setVisitorName] = useState("");
    const [savedName, setSavedName] = useState("");

    useEffect(() => {
        async function probe() {
            setLoading(true);
            try {
                const res = await fetch("/status/api");
                const data = await res.json();
                if (data.success) {
                    setSystemData(data);
                    setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
                    generateMockSessions();
                }
            } catch (e) { console.error(e); }
            finally { setLoading(false); }
        }
        probe();
    }, [refreshTrigger]);

    useEffect(() => {
        const t = setInterval(() => setRefreshTrigger((p) => p + 1), 5000);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const trail = JSON.parse(sessionStorage.getItem("browncode_session_trail") || "[]");
            // ── Limit to 10 most recent steps ──
            setLiveClientTrail(trail.slice(-10));
            setSavedName(sessionStorage.getItem("browncode_visitor_name") || "");
        }
    }, [refreshTrigger]);

    const handleSaveName = async (e) => {
        e.preventDefault();
        if (!visitorName.trim()) return;
        const name = visitorName.trim();
        sessionStorage.setItem("browncode_visitor_name", name);
        setSavedName(name);
        setVisitorName("");
        try {
            await addDoc(collection(db1, "chat-messages"), {
                text: `SYSTEM_LOG: Visitor verified identity.`,
                userName: name, isAdmin: false, isIdentityInjection: true,
                timestamp: serverTimestamp(), userTimestamp: new Date().toISOString(),
            });
        } catch (e) { console.error(e); }
        setRefreshTrigger((p) => p + 1);
    };

    const generateMockSessions = () => {
        const entries = ["/sitemap", "/portfolio", "/blog/why-you-need-a-website"];
        const mids = ["/about", "/projects", "/blog", "/cv", "/scam-checker"];
        const exits = ["Tab Closed (Idle)", "Navigated Away", "Session Timeout"];
        setUserSessions([
            {
                id: "USR_9942", ip: "102.89.43.12 (Abuja, NG)",
                entry: entries[Math.floor(Math.random() * entries.length)],
                steps: [mids[Math.floor(Math.random() * mids.length)], "/status", mids[Math.floor(Math.random() * mids.length)]],
                status: "ACTIVE", duration: "4m 12s",
            },
            {
                id: "USR_8821", ip: "197.210.8.54 (Lagos, NG)",
                entry: "/portfolio",
                steps: ["/projects", "/blog/importance-of-a-personal-portfolio", "/contact"],
                status: exits[Math.floor(Math.random() * exits.length)], duration: "8m 45s",
            },
        ]);
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

        .st-page { min-height: 100vh; background: var(--bg); color: var(--text-2); font-family: var(--sans); display: flex; flex-direction: column; }
        .st-main { max-width: 1000px; width: 100%; margin: 0 auto; padding: 40px 24px 60px; flex: 1; display: flex; flex-direction: column; gap: 20px; }

        /* Header */
        .st-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding-bottom: 20px; border-bottom: 1px solid var(--border); flex-wrap: wrap; }
        .st-header__eyebrow { display: inline-flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-3); margin-bottom: 8px; }
        .st-header__eyebrow-dot { width: 5px; height: 5px; background: var(--accent); border-radius: 50%; }
        .st-header__title { font-family: var(--serif); font-size: clamp(22px, 3vw, 32px); color: var(--text-1); display: flex; align-items: center; gap: 12px; }
        .st-ping { position: relative; width: 8px; height: 8px; flex-shrink: 0; }
        .st-ping__ring { position: absolute; inset: 0; border-radius: 50%; background: var(--accent); opacity: 0.4; animation: st-ping 1.4s ease-out infinite; }
        .st-ping__dot { position: absolute; inset: 1px; border-radius: 50%; background: var(--accent); }
        @keyframes st-ping { 0%{transform:scale(1);opacity:0.4} 100%{transform:scale(2.2);opacity:0} }

        .st-header__right { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
        .st-refresh {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.06em;
          padding: 7px 14px; border: 1px solid var(--border); border-radius: var(--radius);
          background: var(--surface); color: var(--text-2); cursor: pointer;
          transition: color 0.15s, border-color 0.15s;
        }
        .st-refresh:hover:not(:disabled) { color: var(--text-1); border-color: var(--border-hi); }
        .st-refresh:disabled { opacity: 0.4; cursor: not-allowed; }
        .st-last-updated { font-family: var(--mono); font-size: 9px; color: var(--text-3); display: flex; align-items: center; gap: 5px; }

        /* Identity input */
        .st-identity { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
        .st-identity__label { font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-bottom: 3px; display: flex; align-items: center; gap: 5px; }
        .st-identity__label svg { color: var(--accent); }
        .st-identity__sub { font-size: 11px; color: var(--text-3); }
        .st-identity__form { display: flex; gap: 8px; flex-shrink: 0; }
        .st-identity__input {
          font-family: var(--mono); font-size: 11px; padding: 7px 12px;
          background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius);
          color: var(--text-1); outline: none; width: 180px;
          transition: border-color 0.15s;
        }
        .st-identity__input::placeholder { color: var(--text-3); }
        .st-identity__input:focus { border-color: rgba(232,255,71,0.4); }
        .st-identity__btn {
          font-family: var(--mono); font-size: 10px; font-weight: 600; letter-spacing: 0.06em;
          padding: 7px 14px; border-radius: var(--radius);
          background: var(--accent-dim); border: 1px solid rgba(232,255,71,0.25);
          color: var(--accent); cursor: pointer; white-space: nowrap;
          transition: background 0.15s;
        }
        .st-identity__btn:hover { background: rgba(232,255,71,0.14); }

        /* Stat cards */
        .st-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
        @media (max-width: 700px) { .st-stats { grid-template-columns: 1fr 1fr; } }
        .st-stat { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; }
        .st-stat__label { font-family: var(--mono); font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }
        .st-stat__label svg { flex-shrink: 0; }
        .st-stat__val { font-family: var(--serif); font-size: 20px; color: var(--text-1); }
        .st-stat__sub { font-family: var(--mono); font-size: 9px; color: var(--text-3); margin-top: 2px; }

        /* Sessions panel */
        .st-sessions { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
        .st-sessions__header { padding: 14px 18px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 8px; }
        .st-sessions__title { font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); }
        .st-sessions__title svg { color: var(--accent); }
        .st-sessions__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); }
        @media (max-width: 640px) { .st-sessions__grid { grid-template-columns: 1fr; } }

        .st-session { background: var(--bg); padding: 16px 18px; }
        .st-session__top { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 10px; margin-bottom: 10px; border-bottom: 1px solid var(--border); }
        .st-session__id { font-family: var(--mono); font-size: 10px; color: var(--accent); margin-bottom: 2px; display: flex; align-items: center; gap: 5px; }
        .st-session__ip { font-family: var(--mono); font-size: 9px; color: var(--text-3); }
        .st-session__badge { font-family: var(--mono); font-size: 8px; letter-spacing: 0.08em; padding: 2px 7px; border-radius: 3px; }
        .st-session__badge--active { background: rgba(74,222,128,0.07); border: 1px solid rgba(74,222,128,0.2); color: #4ade80; animation: st-ping-badge 1.4s ease-out infinite; }
        @keyframes st-ping-badge { 0%,100%{opacity:1} 50%{opacity:0.5} }
        .st-session__badge--ended { background: var(--surface); border: 1px solid var(--border); color: var(--text-3); }

        .st-trail { display: flex; flex-direction: column; gap: 5px; font-family: var(--mono); font-size: 10px; }
        .st-trail__entry { display: flex; align-items: center; gap: 6px; color: #4ade80; }
        .st-trail__step { display: flex; align-items: center; gap: 6px; color: var(--text-3); padding-left: 14px; border-left: 1px solid var(--border); }
        .st-trail__exit { display: flex; align-items: center; gap: 6px; color: #f87171; }
        .st-trail__step-label { font-size: 9px; color: var(--text-3); }
        .st-trail__path { background: var(--surface); padding: 1px 6px; border-radius: 3px; }
        .st-trail__time { font-size: 9px; color: var(--text-3); margin-left: auto; }
        .st-trail__duration { font-family: var(--mono); font-size: 9px; color: var(--text-3); text-align: right; margin-top: 8px; }
        .st-empty { font-size: 11px; color: var(--text-3); padding: 8px 0; font-style: italic; }

        /* Infra grid */
        .st-infra { display: grid; grid-template-columns: 1fr 2fr; gap: 16px; }
        @media (max-width: 700px) { .st-infra { grid-template-columns: 1fr; } }

        .st-panel { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
        .st-panel__header { padding: 12px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 7px; font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); }
        .st-panel__header svg { color: var(--accent); }
        .st-panel__body { padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; }

        .st-node { display: flex; justify-content: space-between; align-items: center; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 10px 14px; font-family: var(--mono); font-size: 11px; }
        .st-node__name { color: var(--text-1); font-weight: 500; }
        .st-node__right { display: flex; align-items: center; gap: 10px; }
        .st-node__latency { font-size: 10px; color: var(--text-3); }
        .st-node__status { font-size: 9px; padding: 2px 7px; border-radius: 3px; background: rgba(74,222,128,0.07); border: 1px solid rgba(74,222,128,0.2); color: #4ade80; letter-spacing: 0.06em; }

        .st-log { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 10px 14px; display: flex; gap: 12px; align-items: flex-start; font-family: var(--mono); font-size: 10px; }
        .st-log__time { color: var(--text-3); white-space: nowrap; flex-shrink: 0; font-size: 9px; margin-top: 1px; }
        .st-log__type { font-size: 9px; padding: 1px 6px; border-radius: 3px; flex-shrink: 0; letter-spacing: 0.06em; }
        .st-log__type--WARN { background: rgba(251,191,36,0.08); border: 1px solid rgba(251,191,36,0.2); color: #fbbf24; }
        .st-log__type--SUCCESS { background: rgba(74,222,128,0.07); border: 1px solid rgba(74,222,128,0.2); color: #4ade80; }
        .st-log__type--INFO { background: rgba(96,165,250,0.07); border: 1px solid rgba(96,165,250,0.2); color: #60a5fa; }
        .st-log__msg { color: var(--text-2); line-height: 1.5; }

        /* Footer */
        .st-footer { border-top: 1px solid var(--border); padding: 20px 24px; max-width: 1000px; margin: 0 auto; width: 100%; }
        .st-footer__link { display: inline-flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: 10px; color: var(--text-3); text-decoration: none; transition: color 0.15s; }
        .st-footer__link:hover { color: var(--text-1); }

        /* Loading */
        .st-loading { flex: 1; display: flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); }
      `}</style>

            <div className="st-page">
                <div className="st-main">

                    {/* Header */}
                    <div className="st-header">
                        <div>
                            <div className="st-header__eyebrow">
                                <span className="st-header__eyebrow-dot" /> Platform monitor
                            </div>
                            <div className="st-header__title">
                                Live telemetry
                                <span className="st-ping"><span className="st-ping__ring" /><span className="st-ping__dot" /></span>
                            </div>
                        </div>
                        <div className="st-header__right">
                            <button
                                className="st-refresh"
                                onClick={() => setRefreshTrigger((p) => p + 1)}
                                disabled={loading}
                            >
                                <RefreshCw size={12} style={loading ? { animation: "spin 1s linear infinite" } : {}} />
                                Refresh
                            </button>
                            {lastUpdated && (
                                <div className="st-last-updated">
                                    <Clock size={10} /> Updated {lastUpdated}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Identity */}
                    <div className="st-identity">
                        <div>
                            <div className="st-identity__label"><UserCheck size={11} /> Identity</div>
                            <div className="st-identity__sub">
                                {savedName ? `Verified as: ${savedName}` : "Enter your name to tag your session."}
                            </div>
                        </div>
                        <form className="st-identity__form" onSubmit={handleSaveName}>
                            <input
                                className="st-identity__input" type="text" value={visitorName}
                                onChange={(e) => setVisitorName(e.target.value)} placeholder="Your name…"
                            />
                            <button type="submit" className="st-identity__btn">Save</button>
                        </form>
                    </div>

                    {loading && !systemData ? (
                        <div className="st-loading">Syncing…</div>
                    ) : (
                        <>
                            {/* Stats */}
                            <div className="st-stats">
                                {[
                                    { label: "System state", icon: <ShieldCheck size={11} />, val: systemData?.metrics.status, sub: null, color: "#4ade80" },
                                    { label: "Incoming load", icon: <Activity size={11} />, val: systemData?.metrics.traffic, sub: null, color: "var(--text-1)" },
                                    { label: "Runtime", icon: <Cpu size={11} />, val: `Mem: ${systemData?.metrics.memory}`, sub: `Up: ${systemData?.metrics.uptime}`, color: "var(--text-1)" },
                                    { label: "Error rate", icon: <AlertCircle size={11} />, val: systemData?.metrics.errorPercent, sub: null, color: "var(--text-1)" },
                                ].map((s) => (
                                    <div key={s.label} className="st-stat">
                                        <div className="st-stat__label">{s.icon} {s.label}</div>
                                        <div className="st-stat__val" style={{ color: s.color, fontSize: 16 }}>{s.val}</div>
                                        {s.sub && <div className="st-stat__sub">{s.sub}</div>}
                                    </div>
                                ))}
                            </div>

                            {/* Live sessions — capped at 10 */}
                            <div className="st-sessions">
                                <div className="st-sessions__header">
                                    <Footprints size={13} style={{ color: "var(--accent)" }} />
                                    <span className="st-sessions__title">
                                        Live interaction streams
                                        <span style={{ marginLeft: 8, color: "var(--text-3)", fontFamily: "var(--mono)", fontSize: 9 }}>
                                            (showing up to 10 steps)
                                        </span>
                                    </span>
                                </div>
                                <div className="st-sessions__grid">

                                    {/* Your session */}
                                    <div className="st-session">
                                        <div className="st-session__top">
                                            <div>
                                                <div className="st-session__id">
                                                    <Database size={10} />
                                                    {savedName ? `NODE · ${savedName.toUpperCase()}` : "YOUR SESSION"}
                                                </div>
                                                <div className="st-session__ip">Local capture</div>
                                            </div>
                                            <span className="st-session__badge st-session__badge--active">LIVE</span>
                                        </div>
                                        <div className="st-trail">
                                            {liveClientTrail.length === 0 ? (
                                                <div className="st-empty">No steps yet. Browse around!</div>
                                            ) : liveClientTrail.map((step, i) => (
                                                step.isEntry ? (
                                                    <div key={i} className="st-trail__entry">
                                                        <LogIn size={10} />
                                                        <span className="st-trail__step-label">ENTERED</span>
                                                        <span className="st-trail__path">{step.nodePath}</span>
                                                        <span className="st-trail__time">{step.time}</span>
                                                    </div>
                                                ) : (
                                                    <div key={i} className="st-trail__step">
                                                        <span className="st-trail__step-label">↳ {i}</span>
                                                        <span className="st-trail__path">{step.nodePath}</span>
                                                        <span className="st-trail__time">{step.time}</span>
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    </div>

                                    {/* Mock sessions */}
                                    {userSessions.map((s) => (
                                        <div key={s.id} className="st-session">
                                            <div className="st-session__top">
                                                <div>
                                                    <div className="st-session__id">{s.id}</div>
                                                    <div className="st-session__ip">{s.ip}</div>
                                                </div>
                                                <span className={`st-session__badge ${s.status === "ACTIVE" ? "st-session__badge--active" : "st-session__badge--ended"}`}>
                                                    {s.status === "ACTIVE" ? "ACTIVE" : "ENDED"}
                                                </span>
                                            </div>
                                            <div className="st-trail">
                                                <div className="st-trail__entry">
                                                    <LogIn size={10} />
                                                    <span className="st-trail__step-label">ENTERED</span>
                                                    <span className="st-trail__path">{s.entry}</span>
                                                </div>
                                                {s.steps.map((step, i) => (
                                                    <div key={i} className="st-trail__step">
                                                        <span className="st-trail__step-label">↳ {i + 1}</span>
                                                        <span className="st-trail__path">{step}</span>
                                                    </div>
                                                ))}
                                                {s.status !== "ACTIVE" && (
                                                    <div className="st-trail__exit">
                                                        <LogOut size={10} />
                                                        <span className="st-trail__step-label">EXITED</span>
                                                        <span style={{ textDecoration: "line-through", opacity: 0.6 }}>{s.status}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="st-trail__duration">Duration: {s.duration}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Infra + logs */}
                            <div className="st-infra">
                                <div className="st-panel">
                                    <div className="st-panel__header"><HardDrive size={12} /> Cluster nodes</div>
                                    <div className="st-panel__body">
                                        {systemData?.infrastructure.map((node) => (
                                            <div key={node.id} className="st-node">
                                                <span className="st-node__name">{node.id}</span>
                                                <div className="st-node__right">
                                                    <span className="st-node__latency">{node.latency}</span>
                                                    <span className="st-node__status">{node.status}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="st-panel">
                                    <div className="st-panel__header"><FileText size={12} /> Stream logs</div>
                                    <div className="st-panel__body">
                                        {systemData?.logs.map((log, i) => (
                                            <div key={i} className="st-log">
                                                <span className="st-log__time">{log.timestamp}</span>
                                                <span className={`st-log__type st-log__type--${log.type}`}>{log.type}</span>
                                                <span className="st-log__msg">{log.message}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="st-footer">
                    <Link href="/" className="st-footer__link">
                        <ArrowLeft size={13} /> Back to home
                    </Link>
                </div>
            </div>
        </>
    );
}

export function SysMonitorNavDeskLink() {
    return (
        <Link
            href="/status"
            style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em",
                textTransform: "uppercase", padding: "5px 10px",
                background: "rgba(232,255,71,0.06)", border: "1px solid rgba(232,255,71,0.2)",
                borderRadius: "var(--radius, 6px)", color: "var(--accent, #e8ff47)",
                textDecoration: "none", transition: "background 0.15s",
            }}
        >
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent, #e8ff47)", animation: "st-ping 1.4s ease-out infinite", flexShrink: 0 }} />
            Monitor
        </Link>
    );
}

export function SysMonitorNavMobLink() {
    return <SysMonitorNavDeskLink />;
}