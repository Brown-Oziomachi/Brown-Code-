"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Terminal,
    ArrowLeft,
    FileText,
    Layers,
    User,
    Code2,
    Fingerprint,
    ShieldAlert
} from "lucide-react";

export default function AboutCVPage() {
    const router = useRouter();

    const handleBack = () => {
        router.push("/portfolio");
    };

    return (
        <>
            {/* Navigation Header */}
            <nav className="relative z-10 border-b border-slate-800/80 bg-[#090d16]/80 backdrop-blur-md sticky top-0 z-[9999]">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 group">
                        <Terminal size={18} className="text-cyan-400 group-hover:rotate-6 transition-transform" />
                        <a href="/">
                            <span className="text-sm font-bold text-white tracking-wider uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                                BROWN_CODE_DEV // IDENTITY_CORE
                            </span>
                        </a>
                    </div>
                    <button
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-950/80 transition-all duration-300"
                    >
                        <ArrowLeft size={14} />
                        <span>SYS.RETURN()</span>
                    </button>
                </div>
            </nav>

            {/* Main Layout Area */}
            <div className="min-h-screen bg-[#050811] text-slate-400 font-mono antialiased relative pt-12 pb-20">
                {/* Tactical Blueprint Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0d_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0d_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0"></div>

                <main className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">

                    {/* Identity Module Header */}
                    <div className="border border-slate-900 bg-[#0b132b]/10 p-6 rounded-sm space-y-3 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 text-slate-900 pointer-events-none">
                            <Fingerprint size={80} className="opacity-10 text-cyan-500" />
                        </div>
                        <div className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase flex items-center gap-1.5">
                            <User size={12} /> USER_PROFILE // ROOT_NODE
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                            About The Developer
                        </h1>
                        <p className="text-xs text-slate-500 font-sans leading-relaxed max-w-xl">
                            Full-Stack Software developer architecting performant, scalable, and high-availability digital micro-modules. Specialized in React architecture, custom web engines, and secure data infrastructures.
                        </p>
                    </div>

                    {/* Operational Core Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-slate-950/40 border border-slate-900 p-4 rounded-sm space-y-2">
                            <div className="text-[10px] text-slate-500 font-bold tracking-wider flex items-center gap-2">
                                <Code2 size={12} className="text-cyan-500" /> TECH_STACK_MATRIX
                            </div>
                            <div className="flex flex-wrap gap-1 pt-1">
                                {["Next.js", "React Engine", "Node.JS", "JavaScript", "TailwindCSS", "Firebase"].map((tech, i) => (
                                    <span key={i} className="px-2 py-0.5 text-[9px] bg-slate-900 border border-slate-800 text-slate-400 rounded-none">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-950/40 border border-slate-900 p-4 rounded-sm space-y-2">
                            <div className="text-[10px] text-slate-500 font-bold tracking-wider flex items-center gap-2">
                                <Layers size={12} className="text-cyan-500" /> SYSTEM_OBJECTIVES
                            </div>
                            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                                Refactoring legacy codebases, designing optimized data structures, and deploying scalable full-stack pipelines.
                            </p>
                        </div>
                    </div>

                    {/* TARGET ROUTER GATEWAY */}
                    <div className="border border-cyan-500/30 bg-[#0e1726]/30 p-8 rounded-sm text-center space-y-6 relative overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.03)]">
                        {/* Glow corner decorations */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-500"></div>
                        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-500"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-500"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-500"></div>

                        <div className="space-y-2">
                            <div className="inline-flex p-3 bg-cyan-500/10 rounded-full text-cyan-400 mb-2 animate-pulse">
                                <FileText size={24} />
                            </div>
                            <h3 className="text-lg font-black text-white uppercase tracking-wide">
                                Request Professional Ledger
                            </h3>
                        
                        </div>

                        <div className="pt-2">
                            <a
                                href="/cv/pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-widest rounded-sm transition-all shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                EXECUTE_LOAD_CV()
                            </a>
                        </div>
                    </div>

                    {/* Footer System Strip */}
                    <div className="flex items-center justify-between text-[9px] text-slate-600 border-t border-slate-900/60 pt-4">
                        <div>STATUS: CORE_ONLINE</div>
                        <div>SECURE_GATEWAY_v2.0.26</div>
                    </div>

                </main>
            </div>
        </>
    );
}