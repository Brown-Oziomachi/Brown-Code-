"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Terminal,
    ArrowLeft,
    ExternalLink,
    Lock,
    Cpu,
    Layers,
    Binary,
    Activity
} from "lucide-react";
import Footer from "@/components/footer";

const projects = [
    {
        id: "SYS_NODE_01",
        title: "Cyclopedia News Website",
        description: "Enterprise news platform featuring real-time content delivery, advanced filtering algorithms, and multimedia integration with optimized video streaming.",
        image: "/the.jpg",
        link: "https://www.thecyclopedia.com.ng",
        tags: ["Next.js", "React Architecture", "Video Steams"],
        year: "2024",
        role: "FULL_STACK_DEV",
        status: "LIVE_SYS"
    },
    {
        id: "SYS_NODE_02",
        title: "E-Commerce Store/Yotapoint",
        description: "Scalable e-commerce solution with secure payment integration, inventory management system, and comprehensive admin dashboard.",
        image: "/yota.jpg",
        link: "https://yotapoint.com",
        tags: ["E-Commerce", "Payment Sockets", "Admin Schema"],
        year: "2024",
        role: "LEAD_ENGINEER",
        status: "LIVE_SYS"
    },
    {
        id: "SYS_NODE_03",
        title: "IJ Stitches Portfolio",
        description: "Performance-optimized portfolio with advanced animations, accessibility compliance, and responsive design architecture.",
        image: "/ijs.jpg",
        link: "https://ij-stitches.vercel.app/main",
        tags: ["React Engine", "GSAP Hooks", "Asset Optimization"],
        year: "2024",
        role: "FRONTEND_ARCHITECT",
        status: "OPTIMIZED"
    },
    {
        id: "SYS_NODE_04",
        title: "Portfolio Website",
        description: "Modern portfolio solution with dynamic content management, SEO optimization, and analytics integration.",
        image: "/cd.jpg",
        link: "https://browncode.name.ng",
        tags: ["Next.js Matrix", "Pure JS Engine", "SEO Sockets"],
        year: "2024",
        role: "FULL_STACK_DEV",
        status: "PRODUCTION"
    },
    {
        id: "SYS_NODE_05",
        title: "Cyclopedia Editor App",
        description: "Content management system with rich text editing, collaborative features, and version control for editorial workflows.",
        image: "/ed.jpg",
        link: null, // Lock status
        tags: ["CMS Infrastructure", "Real-time Sync", "Workflow Pipeline"],
        year: "2024",
        role: "TECHNICAL_LEAD",
        status: "NDA_LOCKED"
    },
];

export default function ProjectsPage() {
    const router = useRouter();

    const handleBack = () => {
        router.push("/portfolio");
    };


    return (
        <>
             {/* Top Navigation Frame */}
                       <nav className="relative z-10 border-b border-slate-800/80 bg-[#090d16]/80 backdrop-blur-md sticky top-0 z-[9999]">
                           <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                               <div className="flex items-center gap-3 group">
                                   <Terminal size={18} className="text-cyan-400 group-hover:rotate-6 transition-transform" />
                                   <a href="/">
                                   <span className="text-sm font-bold text-white tracking-wider uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                                BROWN_CODE_DEV // PRO_DEPLOYMENTS
                                   </span>
                                   </a>
                               </div>
                               <a
                                   href="/portfolio"
                                   className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-950/80 transition-all duration-300 shadow-sm hover:shadow-cyan-500/5"
                               >
                                   <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                                   <span>SYS.RETURN()</span>
                               </a>
                           </div>
                       </nav>

            <div className="min-h-screen bg-[#050811] text-slate-400 font-mono antialiased relative pt-24 pb-20">
                {/* Tactical Blueprint Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0d_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0d_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0"></div>

                {/* HEADER TERMINAL STRIP */}
                <header className="border-b border-slate-900 bg-[#0b132b]/20 backdrop-blur-md relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="space-y-1">
                            <div className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase flex items-center gap-1.5">
                                <Terminal size={12} /> INDEX_REGISTRY // ARCHIVE
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                                Shipped Production Nodes
                            </h1>
                            <p className="text-xs text-slate-500">
                                Total parsed arrays: <span className="text-slate-300 font-bold">[{projects.length}] stable builds detected</span>
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <button
                                onClick={handleBack}
                                className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 rounded-sm transition-all uppercase tracking-wider"
                            >
                                <ArrowLeft size={12} /> ESC_RETURN
                            </button>
                            <div className="inline-flex items-center gap-2 px-3 py-2 bg-slate-950 border border-slate-900 text-xs text-slate-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span className="font-bold text-[10px] tracking-widest text-slate-500 uppercase">SYS_SOCKET:</span>
                                <a href="https://wa.me/2347013725529" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold hover:underline">
                                    COMMS_OPEN
                                </a>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 relative z-10 space-y-12">

                    {/* TELEMETRY METRICS SECTION */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: "INDEXED_BUILDS", value: `0${projects.length}`, desc: "Active modules", icon: <Layers size={14} /> },
                            { label: "SUCCESS_RATIO", value: "100%", desc: "Deployment status", icon: <Binary size={14} /> },
                            { label: "TRACK_DURATION", value: "02+", desc: "Years validation", icon: <Cpu size={14} /> },
                            { label: "CRITICAL_UPTIME", value: "24/7", desc: "Service continuity", icon: <Activity size={14} /> }
                        ].map((stat, i) => (
                            <div key={i} className="bg-[#0b132b]/10 border border-slate-900 p-4 rounded-sm flex justify-between items-start group hover:border-slate-800/80 transition-colors">
                                <div className="space-y-1">
                                    <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">{stat.label}</div>
                                    <div className="text-2xl font-black text-white tracking-tight">{stat.value}</div>
                                    <div className="text-[10px] text-slate-600 font-medium font-sans">{stat.desc}</div>
                                </div>
                                <div className="text-slate-600 group-hover:text-cyan-500/80 transition-colors pt-0.5">
                                    {stat.icon}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* MECHANICAL PROJECT LAYOUT STREAM */}
                    <div className="space-y-6">
                        {projects.map((project, index) => (
                            <article
                                key={project.id}
                                className="bg-slate-950/40 border border-slate-900 rounded-sm overflow-hidden hover:border-slate-800 transition-all duration-300 group shadow-lg"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

                                    {/* Embedded Node Display Column */}
                                    <div className="lg:col-span-4 relative h-48 lg:h-auto min-h-[220px] bg-slate-950 border-b lg:border-b-0 lg:border-r border-slate-900/60 overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover grayscale opacity-40 contrast-125 brightness-70 group-hover:scale-[1.02] group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent to-[#050811]/90"></div>

                                        {/* Structural Hex Coordinates */}
                                        <div className="absolute top-4 left-4 bg-slate-950/90 text-[10px] font-black text-slate-500 px-2.5 py-1 border border-slate-900/80 tracking-widest shadow-xl">
                                            {project.id} // #{String(index + 1).padStart(2, '0')}
                                        </div>
                                    </div>

                                    {/* Operational Architecture Spec Column */}
                                    <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                                        <div className="space-y-4">

                                            {/* Micro-Labels Strip */}
                                            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-900 pb-3">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-1 h-1 bg-cyan-500"></span>
                                                    ROLE: <span className="text-slate-300">{project.role}</span>
                                                </div>
                                                <span className="text-slate-800 hidden sm:inline">|</span>
                                                <div>
                                                    TIMESTAMP: <span className="text-slate-400 font-normal">{project.year}</span>
                                                </div>
                                                <span className="text-slate-800 hidden sm:inline">|</span>
                                                <div>
                                                    STATUS: <span className={`font-black ${project.link ? 'text-cyan-400' : 'text-amber-500/80'}`}>[{project.status}]</span>
                                                </div>
                                            </div>

                                            {/* Header Blocks */}
                                            <div className="space-y-1">
                                                <h2 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                                                    {project.title}
                                                </h2>
                                            </div>

                                            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl font-sans">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Lower Action & Stack Infrastructure Block */}
                                        <div className="pt-4 border-t border-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                                            {/* Tech Tokens */}
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.tags.map((tag, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2.5 py-0.5 text-[9px] font-bold bg-slate-900/80 text-slate-500 border border-slate-800/60 rounded-none tracking-wide"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Functional Execution Gate */}
                                            <div className="shrink-0">
                                                {project.link ? (
                                                    <a
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/30 text-xs font-bold text-slate-300 hover:text-cyan-400 transition-all rounded-sm"
                                                    >
                                                        EXECUTE_LIVE_RUN()
                                                        <ExternalLink size={11} />
                                                    </a>
                                                ) : (
                                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-950 border border-slate-900 text-xs font-bold text-slate-600 cursor-not-allowed">
                                                        <Lock size={11} className="text-amber-600/60" />
                                                        ACCESS_RESTRICTED_NDA
                                                    </div>
                                                )}
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* LOWER DESK PIPELINE HANDSHAKE */}
                    <div className="pt-8">
                        <div className="max-w-3xl mx-auto border border-slate-900 bg-[#0b132b]/10 p-6 sm:p-8 rounded-sm relative overflow-hidden text-center space-y-4">
                            <div className="absolute top-0 left-0 w-24 h-0.5 bg-cyan-500"></div>

                            <div className="space-y-1.5">
                                <h3 className="text-base font-black text-white uppercase tracking-wide">
                                    Initialize System Integration?
                                </h3>
                                <p className="text-xs text-slate-400 font-sans max-w-md mx-auto leading-relaxed">
                                    Operational channels are currently calibrated for contract pipelines, system refactoring, and remote enterprise micro-modules.
                                </p>
                            </div>

                            <div className="pt-2">
                                <Link
                                    href="/bc/contact"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-sm transition-all shadow-md active:scale-95"
                                >
                                    OPEN_CONN_SOCKET()
                                </Link>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
            <Footer />
        </>
    );
}