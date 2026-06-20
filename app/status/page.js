"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Terminal, Cpu, HardDrive, RefreshCw, ArrowLeft, Activity, Clock, ShieldCheck, AlertCircle, FileText, Footprints, LogOut, LogIn, Database, UserCheck } from "lucide-react";
import {
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";
import { db1 } from "@/config/firebase.config1";
export default function StatusMonitorPage() {
    const [systemData, setSystemData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [lastUpdated, setLastUpdated] = useState("");
    const [liveClientTrail, setLiveClientTrail] = useState([]);
    const [userSessions, setUserSessions] = useState([]);

    // State to handle the name input box
    const [visitorName, setVisitorName] = useState("");
    const [savedName, setSavedName] = useState("");

    // Hook Loop 1: Connect to the Node.js backend transmission stream
    useEffect(() => {
        async function probeServerMetrics() {
            setLoading(true);
            try {
                const response = await fetch("/status/api");
                const data = await response.json();
                if (data.success) {
                    setSystemData(data);
                    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                    setLastUpdated(currentTime);
                    generateMockUserJourneys();
                }
            } catch (err) {
                console.error("System telemetry sync failure:", err);
            } finally {
                setLoading(false);
            }
        }
        probeServerMetrics();
    }, [refreshTrigger]);

    // Hook Loop 2: Heartbeat interval - updates data automatically every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshTrigger(prev => prev + 1);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Hook Loop 3: Pull real-time navigation paths and name out of storage on every refresh cycle
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedTrail = JSON.parse(sessionStorage.getItem("browncode_session_trail") || "[]");
            setLiveClientTrail(storedTrail);

            const existingName = sessionStorage.getItem("browncode_visitor_name") || "";
            setSavedName(existingName);
        }
    }, [refreshTrigger]);

    const handleSaveName = async (e) => {
        e.preventDefault();
        if (!visitorName.trim()) return;

        const formattedName = visitorName.trim();

        if (typeof window !== "undefined") {
            sessionStorage.setItem("browncode_visitor_name", formattedName);
            setSavedName(formattedName);
            setVisitorName("");

            try {
                await addDoc(collection(db1, "chat-messages"), {
                    text: `SYSTEM_LOG: Visitor has explicitly verified their terminal signature identity footprint.`,
                    userName: formattedName, 
                    isAdmin: false,
                    isIdentityInjection: true,
                    timestamp: serverTimestamp(),
                    userTimestamp: new Date().toISOString(),
                });
            } catch (err) {
                console.error("Failed to broadcast identity footprint to matrix:", err);
            }
            // --------------------------------------------------

            setRefreshTrigger(prev => prev + 1);
        }
    };

    // Helper logic to simulate historical path interactions of visitors across your platform trees
    const generateMockUserJourneys = () => {
        const entryPoints = ["/sitemap", "/portfolio", "/blog/why-you-need-a-website"];
        const midPoints = ["/about", "/projects", "/blog", "/cv", "/scam-checker"];
        const exits = ["Tab Closed (Idle)", "Navigated Away", "Session Timeout"];

        const mockSessions = [
            {
                id: "USR_REF_9942",
                ip: "102.89.43.12 (Abuja, NG)",
                entry: entryPoints[Math.floor(Math.random() * entryPoints.length)],
                steps: [
                    midPoints[Math.floor(Math.random() * midPoints.length)],
                    "/status",
                    midPoints[Math.floor(Math.random() * midPoints.length)]
                ],
                currentStatus: "ACTIVE_NOW",
                duration: "4m 12s"
            },
            {
                id: "USR_REF_8821",
                ip: "197.210.8.54 (Lagos, NG)",
                entry: "/portfolio",
                steps: ["/projects", "/blog/importance-of-a-personal-portfolio", "/contact"],
                currentStatus: exits[Math.floor(Math.random() * exits.length)],
                duration: "8m 45s"
            }
        ];
        setUserSessions(mockSessions);
    };

    return (
        <div className="min-h-screen bg-[#030712] text-slate-100 font-mono antialiased p-4 md:p-6 flex flex-col justify-between">
            <div className="max-w-5xl w-full mx-auto py-8 md:py-12">

                {/* Header System Panel */}
                <header className="border-b border-slate-900 pb-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 text-cyan-400 text-xs px-3 py-1 rounded mb-3">
                            <Terminal size={12} className="animate-pulse" />
                            SYS_MONITOR // CORE_RESOURCES
                        </div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-black text-white tracking-tight">PLATFORM_LIVE_TELEMETRY</h1>
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                        <button
                            onClick={() => setRefreshTrigger(prev => prev + 1)}
                            disabled={loading}
                            className="flex items-center justify-center gap-2 text-xs border border-slate-800 hover:border-slate-700 bg-slate-950/50 px-4 py-2 rounded text-slate-400 hover:text-white transition-all disabled:opacity-50 w-full sm:w-auto"
                        >
                            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
                            FORCE_PROBE
                        </button>
                        {lastUpdated && (
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 justify-start sm:justify-end">
                                <Clock size={10} />
                                <span>STREAM_ACTIVE: {lastUpdated}</span>
                            </div>
                        )}
                    </div>
                </header>

                {/* Identity Input Box */}
                <div className="mb-6 bg-slate-950/60 border border-slate-900 p-4 rounded-xl">
                    <form onSubmit={handleSaveName} className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                        <div className="text-left w-full sm:w-auto">
                            <div className="text-white text-xs font-bold flex items-center gap-1.5 uppercase tracking-wide">
                                <UserCheck size={14} className="text-cyan-400" /> Identity Matrix Signature
                            </div>
                            <p className="text-[10px] text-slate-500 mt-0.5">
                                {savedName
                                    ? `Currently verified as: ${savedName.toUpperCase()}`
                                    : "Identify yourself to link your local runtime environment footprint."
                                }
                            </p>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto shrink-0">
                            <input
                                type="text"
                                value={visitorName}
                                onChange={(e) => setVisitorName(e.target.value)}
                                placeholder="Enter your identity..."
                                className="bg-slate-900/80 border border-slate-800 text-xs px-3 py-2 rounded text-white focus:outline-none focus:border-cyan-500 placeholder-slate-600 font-mono w-full sm:w-48"
                            />
                            <button
                                type="submit"
                                className="bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-400 text-xs px-4 py-2 rounded transition-all font-bold shrink-0"
                            >
                                INJECT_ID
                            </button>
                        </div>
                    </form>
                </div>

                {loading && !systemData ? (
                    <div className="text-center py-24 text-xs text-slate-500 italic animate-pulse">
                        &gt; Syncing distributed network channels...
                    </div>
                ) : (
                    <div className="space-y-6">

                        {/* SECTION A: Primary Analytical Counters */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                            <div className="bg-slate-950/40 border border-slate-900 p-3 sm:p-4 rounded-xl min-w-0">
                                <div className="text-slate-500 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1 flex items-center gap-1 sm:gap-1.5 truncate">
                                    <ShieldCheck size={12} className="text-emerald-400 shrink-0" /> System State
                                </div>
                                <div className="text-base sm:text-lg font-bold text-emerald-400 truncate">{systemData?.metrics.status}</div>
                            </div>

                            <div className="bg-slate-950/40 border border-slate-900 p-3 sm:p-4 rounded-xl min-w-0">
                                <div className="text-slate-500 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1 flex items-center gap-1 sm:gap-1.5 truncate">
                                    <Activity size={12} className="text-cyan-400 shrink-0" /> Incoming Load
                                </div>
                                <div className="text-base sm:text-lg font-bold text-white transition-all duration-300 truncate">{systemData?.metrics.traffic}</div>
                            </div>

                            <div className="bg-slate-950/40 border border-slate-900 p-3 sm:p-4 rounded-xl min-w-0">
                                <div className="text-slate-500 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1 flex items-center gap-1 sm:gap-1.5 truncate">
                                    <Cpu size={12} className="text-blue-400 shrink-0" /> Runtime Engine
                                </div>
                                <div className="text-xs sm:text-sm font-bold text-slate-200 truncate">Mem: {systemData?.metrics.memory}</div>
                                <div className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5 truncate">Up: {systemData?.metrics.uptime}</div>
                            </div>

                            <div className="bg-slate-950/40 border border-slate-900 p-3 sm:p-4 rounded-xl min-w-0">
                                <div className="text-slate-500 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1 flex items-center gap-1 sm:gap-1.5 truncate">
                                    <AlertCircle size={12} className="text-amber-500 shrink-0" /> Pipeline Failures
                                </div>
                                <div className="text-base sm:text-lg font-bold text-slate-200 truncate">{systemData?.metrics.errorPercent}</div>
                            </div>
                        </div>

                        {/* NEW SECTION C: Live User Journey Interactive Tracking Stream */}
                        <div className="bg-slate-950/40 border border-slate-900 p-5 rounded-xl space-y-4">
                            <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
                                <Footprints size={14} className="text-amber-400" />
                                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Live Active Interaction Session Streams</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Real-time Session Box (Dynamic Individual Name Check Included) */}
                                <div className="bg-slate-950/90 border border-slate-800 p-4 rounded-lg space-y-3 shadow-inner">
                                    <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                                        <div>
                                            <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                                                <Database size={10} />
                                                {savedName
                                                    ? `NODE // ${savedName.toUpperCase()}`
                                                    : "CURRENT_CLIENT_SESSION"
                                                }
                                            </span>
                                            <span className="text-[9px] text-slate-500">
                                                {savedName
                                                    ? "Locally verified identity footprint"
                                                    : "Captured locally from your tracker"
                                                }
                                            </span>
                                        </div>
                                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse">
                                            LIVE_CAPTURE
                                        </span>
                                    </div>

                                    <div className="space-y-1.5 text-[11px]">
                                        {liveClientTrail.length === 0 ? (
                                            <div className="text-slate-500 text-xs italic py-2">
                                                No exploration steps registered. Try visiting other pages!
                                            </div>
                                        ) : (
                                            liveClientTrail.map((step, idx) => (
                                                <div key={idx} className={`flex items-center gap-2 ${step.isEntry ? "text-emerald-400/90" : "text-slate-400 pl-4 border-l border-slate-800"}`}>
                                                    {step.isEntry ? <LogIn size={11} /> : <span className="text-slate-600 text-[9px]">↳ Step {idx}:</span>}
                                                    {step.isEntry && <span className="text-slate-500 text-[9px] font-sans w-12">ENTERED:</span>}
                                                    <span className={`px-1.5 py-0.5 rounded ${step.isEntry ? "bg-slate-900 font-mono" : "bg-slate-900/50"}`}>
                                                        {step.nodePath}
                                                    </span>
                                                    <span className="text-slate-600 text-[9px] font-sans ml-auto">{step.time}</span>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                {/* Mock Sample Logs */}
                                {userSessions.map((session, sIdx) => (
                                    <div key={sIdx} className="bg-slate-950/90 border border-slate-900 p-4 rounded-lg space-y-3">
                                        <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                                            <div>
                                                <span className="text-[11px] font-bold text-cyan-400 block">{session.id}</span>
                                                <span className="text-[9px] text-slate-500">{session.ip}</span>
                                            </div>
                                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${session.currentStatus === "ACTIVE_NOW"
                                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                : "bg-slate-800 text-slate-400"
                                                }`}>
                                                {session.currentStatus}
                                            </span>
                                        </div>

                                        <div className="space-y-1.5 text-[11px]">
                                            <div className="flex items-center gap-2 text-emerald-400/90">
                                                <LogIn size={11} />
                                                <span className="text-slate-500 text-[9px] font-sans w-12">ENTERED:</span>
                                                <span className="bg-slate-900 px-1.5 py-0.5 rounded font-mono">{session.entry}</span>
                                            </div>

                                            {session.steps.map((step, stepIdx) => (
                                                <div key={stepIdx} className="flex items-center gap-2 text-slate-400 pl-4 border-l border-slate-800">
                                                    <span className="text-slate-600 text-[9px]">↳ Step {stepIdx + 1}:</span>
                                                    <span className="bg-slate-900/50 px-1.5 py-0.5 rounded">{step}</span>
                                                </div>
                                            ))}

                                            {session.currentStatus !== "ACTIVE_NOW" && (
                                                <div className="flex items-center gap-2 text-rose-400/90">
                                                    <LogOut size={11} />
                                                    <span className="text-slate-500 text-[9px] font-sans w-12">EXITED:</span>
                                                    <span className="bg-slate-900/40 text-slate-500 px-1.5 py-0.5 rounded line-through">{session.currentStatus}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-[9px] text-slate-600 text-right font-sans">Session duration: {session.duration}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SECTION B: Infrastructure & System Logs Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="bg-slate-950/40 border border-slate-900 p-5 rounded-xl space-y-4">
                                <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
                                    <HardDrive size={14} className="text-purple-400" />
                                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Cluster Nodes</h3>
                                </div>
                                <div className="space-y-2">
                                    {systemData?.infrastructure.map((node, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-xs bg-slate-950/80 border border-slate-900/50 p-3 rounded-lg">
                                            <span className="text-slate-300 font-bold tracking-tight">{node.id}</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-slate-500 font-sans text-[11px]">{node.latency}</span>
                                                <span className="bg-emerald-500/5 border border-emerald-500/20 px-2 py-0.5 text-[10px] rounded text-emerald-400 font-bold">
                                                    {node.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    userSessions</div>
                            </div>

                            <div className="bg-slate-950/40 border border-slate-900 p-5 rounded-xl space-y-4 lg:col-span-2">
                                <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
                                    <FileText size={14} className="text-cyan-400" />
                                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Active Stream Logs</h3>
                                </div>
                                <div className="space-y-2 font-mono text-[11px]">
                                    {systemData?.logs.map((log, idx) => (
                                        <div key={idx} className="p-3 bg-slate-950 border border-slate-900/60 rounded-lg flex flex-col sm:flex-row gap-1 sm:gap-4 items-start">
                                            <span className="text-slate-600 font-sans shrink-0 text-[10px]">{log.timestamp}</span>
                                            <span className={`font-bold text-[10px] px-1.5 py-0.2 rounded shrink-0 ${log.type === 'WARN' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                log.type === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                    'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                }`}>
                                                [{log.type}]
                                            </span>
                                            <span className="text-slate-400 tracking-tight">{log.message}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>

            {/* Back Navigation Footer */}
            <footer className="max-w-5xl w-full mx-auto border-t border-slate-900 pt-6">
                <Link href="/" className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-white group transition-colors">
                    <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                    RETURN_TO_MAIN_MATRIX
                </Link>
            </footer>
        </div>
    );
}

export function SysMonitorNavDeskLink() {
    return (
        <Link
            href="/status"
            className="inline-flex items-center gap-1 bg-slate-950/40 hover:bg-cyan-500/10 border border-slate-900 hover:border-cyan-500/30 text-cyan-400 font-mono text-[11px] tracking-widest px-2.5 py-1 rounded-sm transition-all group max-md:hidden"
        >
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping shrink-0" />
            <span>SYS_MONITOR</span>
        </Link>
    );
}

export function SysMonitorNavMobLink() {
    return (
        <Link
            href="/status"
            className="inline-flex items-center gap-1 bg-slate-950/40 hover:bg-cyan-500/10 border border-slate-900 hover:border-cyan-500/30 text-cyan-400 font-mono text-[11px] tracking-widest px-2.5 py-1 rounded-sm transition-all group max-md:hidden"
        >
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping shrink-0" />
            <span>SYS_MONITOR</span>
        </Link>
    );
}