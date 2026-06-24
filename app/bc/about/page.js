"use client"
import React, { useState } from 'react';
import {
    ArrowLeft,
    Code,
    Award,
    Briefcase,
    GraduationCap,
    Heart,
    Coffee,
    Lightbulb,
    Target,
    Zap,
    Users,
    TrendingUp,
    Github,
    Linkedin,
    Mail,
    Download,
    Terminal,
    Cpu,
    Database,
    Layers,
    GitBranch,
    Binary,
    User
} from 'lucide-react';
import Link from 'next/link';

export default function AboutMePage() {
    const [activeTab, setActiveTab] = useState('story');

    const skills = [
        { name: 'React Architecture & Next.js SSR', level: 70, status: 'Production Ready' },
        { name: 'Node.js Core & Vercel Serverless Platforms', level: 50, status: 'Stable Backend' },
        { name: 'JavaScript Engine Paradigms (ES6+ Runtime)', level: 45, status: 'Intermediate Core' },
        { name: 'Database Architecture & Management', level: 70, status: 'Scalabl websites' },
    ];

    const exps = [
        { num: '02+', name: 'YRS EXP' },
        { num: '05+', name: 'SHIPPED PROJ' },
        { num: '100%', name: 'UNIT TESTS' }
    ];

    const timeline = [
        {
            year: '2024',
            title: 'Full Stack Software Developer',
            description: 'Architecting full functional interfaces, handling data streams, and building integrated Node.js solutions.',
            icon: <Briefcase size={16} />
        },
        {
            year: '2025',
            title: 'Software Development & Developing Foundation',
            description: 'Initiated programmatic core tracks. Discovered deep Developing patterns, data parsing structures, and script logic basics.',
            icon: <Cpu size={16} />
        },
    ];

    const values = [
        {
            icon: <Binary size={20} className="text-cyan-400" />,
            title: 'Algorithmic Precision',
            description: 'Writing maintainable, predictable, and clean modular structures Developered to minimize technical debt.'
        },
        {
            icon: <Terminal size={20} className="text-cyan-400" />,
            title: 'Asynchronous Architecture',
            description: 'Optimizing network data round-trips, layout renders, and server workloads for raw performance velocity.'
        },
        {
            icon: <GitBranch size={20} className="text-cyan-400" />,
            title: 'Robust Modularity',
            description: 'Isolating reusable logic into components and functional code ecosystems built for clean scaling.'
        },
        {
            icon: <Layers size={20} className="text-cyan-400" />,
            title: 'Software Adaptability',
            description: 'Continually tracking state web patterns, security layers, and fresh structural updates.'
        },
    ];

    const interests = [
        { icon: <Code size={16} />, text: 'Application Architecture' },
        { icon: <Cpu size={16} />, text: 'API & Integration Protocols' },
        { icon: <Terminal size={16} />, text: 'Control Flow & Application Logic' },
        { icon: <Database size={16} />, text: 'Data Modeling & State Management' },
    ];

    return (
        <>
          {/* Top Navigation Frame */}
            <nav className="relative border-b border-slate-800/80 bg-[#090d16]/80 backdrop-blur-md sticky top-0 z-[9999]">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 group">
                        <Terminal size={18} className="text-cyan-400 group-hover:rotate-6 transition-transform" />
                        <a href="/">
                        <span className="text-sm font-bold text-white tracking-wider uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            BROWN_CODE_DEV // DEV_PORTFOLIO
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
        <div className="min-h-screen bg-[#090d16] text-slate-300 font-mono antialiased selection:bg-cyan-500/20 selection:text-cyan-300 relative overflow-x-hidden">
            {/* Developing Grid Underlay Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b1a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b1a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

            {/* Subtle Matrix Ambient Spotlights */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[120px] -top-40 -left-40"></div>
                <div className="absolute w-[500px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[120px] bottom-1/4 -right-40"></div>
            </div>

          

            <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20">
                {/* Main Identity Manifest block */}
                <div className="grid md:grid-cols-12 gap-8 items-start mb-16">

                    {/* Dev Software Diagnostic Profile Column */}
                    <div className="md:col-span-4 space-y-4">
                        <div className="bg-slate-900/60 border border-slate-800/80 rounded p-4 relative group hover:border-slate-700/50 transition-all duration-300 shadow-md backdrop-blur-sm">
                            <div className="absolute top-3 right-3 flex gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-red-500/40 group-hover:bg-red-500/60 transition-colors"></span>
                                <span className="w-2 h-2 rounded-full bg-yellow-500/40 group-hover:bg-yellow-500/60 transition-colors"></span>
                                <span className="w-2 h-2 rounded-full bg-green-500/40 group-hover:bg-green-500/60 transition-colors"></span>
                            </div>

                            {/* Terminal Image Wrapper */}
                            <div className="border border-slate-800 rounded overflow-hidden aspect-square bg-slate-950 mb-4 relative shadow-inner">
                                <img
                                    src="/coder1.png"
                                    alt="Brown Oziomachi Engine Layout"
                                    className="w-full h-full object-cover grayscale opacity-75 mix-blend-luminosity group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent"></div>
                                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-[11px] bg-slate-900/95 p-2.5 rounded border border-slate-800/80 backdrop-blur-sm shadow-xl">
                                    <div className="text-white font-bold tracking-wide">Sir Brown AD</div>
                                    <div className="text-cyan-400 text-[10px] font-semibold mt-0.5 tracking-wider">ROLE: FULL_STACK_DEV</div>
                                </div>
                            </div>

                            {/* Operational Diagnostic Streams */}
                            <div className="space-y-2 text-[11px] text-slate-400 border-t border-slate-800/60 pt-3.5 font-mono">
                                <div className="flex justify-between items-center"><span className="text-slate-500 font-medium">NET_LOC:</span> <span className="text-slate-300 font-semibold hover:text-white transition-colors">NIGERIA // REMOTE</span></div>
                                <div className="flex justify-between items-center"><span className="text-slate-500 font-medium">CORE_STACK:</span> <span className="text-cyan-400 font-bold tracking-wide">JAVASCRIPT // NODE</span></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 font-medium">STATUS:</span> 
                                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-950/30 border border-emerald-900/30 px-1.5 py-0.5 rounded text-[10px]">
                                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping"></span>
                                        ACTIVE_FOR_HIRE
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Developing Metrics Indicators */}
                        <div className="bg-slate-900/40 border border-slate-800/60 rounded p-3 grid grid-cols-3 gap-2.5 text-center backdrop-blur-sm">
                            {exps.map((e, idx) => (
                                <div key={idx} className="bg-slate-950/60 p-2.5 rounded border border-slate-900/80 hover:border-slate-800 transition-colors shadow-sm">
                                    <div className="text-base font-black text-white tracking-tight">{e.num}</div>
                                    <div className="text-[9px] font-extrabold text-slate-500 mt-0.5 tracking-widest">{e.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Technical Profile Breakdown Specs */}
                    <div className="md:col-span-8 space-y-6 md:pl-4">
                        <div>
                            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-cyan-500 animate-pulse rounded-none"></span>
                                DEV_MANIFEST // OBJECTIVE_DATA
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight uppercase">
                                Software Developer Portfolio <br />
                                <span className="text-slate-500 font-light text-2xl sm:text-3xl tracking-wide ">ID: BC_CORE_v2.0.6</span>
                            </h1>
                        </div>

                        {/* Text Readout Block */}
                        <div className="space-y-4 text-sm sm:text-base text-slate-400 border-l-2 border-slate-800/80 pl-5 leading-relaxed font-normal">
                            <p className="hover:text-slate-300 transition-colors">
                                I specialize in building predictable structural web applications within the high-velocity JavaScript stack. My core expertise centers around component encapsulation patterns with <span className="text-white font-medium underline decoration-cyan-500/30 underline-offset-4">React & Next.js</span> alongside reliable background task structures fueled by Node.js integration channels.
                            </p>
                            <p className="hover:text-slate-300 transition-colors">
                                My methodology rejects messy script solutions. Instead, I choose explicit component workflows, clean data layer constraints, and clear data indexing patterns via custom modern schema infrastructures.
                            </p>
                            <Link
                                href="/bc_dev"
                                className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 hover:text-white transition-all uppercase tracking-wider rounded-sm"
                            >
                                <User size={12} className="text-cyan-400" />
                                  MORE_ABOUT_ME()
                            </Link>                        </div>

                        {/* Action Interface Controls */}
                        <div className="flex flex-wrap gap-3 pt-3">
                            <a
                                href="/bc/contact"
                                className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded transition-all duration-300 tracking-wider uppercase shadow-md shadow-cyan-500/10 hover:shadow-cyan-400/20 active:scale-[0.98]"
                            >
                                INITIALIZE_CONTACT()
                            </a>
                            <a
                                href="/cv/pdf"
                                className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-950 text-xs font-bold text-slate-300 hover:text-white rounded transition-all duration-300 uppercase tracking-wider shadow-sm active:scale-[0.98]"
                            >
                                <Download size={14} className="text-cyan-400" />
                                FETCH_RESUME.EXE
                            </a>
                        </div>
                    </div>
                </div>

                {/* Developing Tab Interfaces Grid Block */}
                <div className="border border-slate-800/90 rounded bg-slate-900/20 overflow-hidden shadow-xl backdrop-blur-sm">

                    {/* Control Panel Headers Bar */}
                    <div className="bg-slate-950 border-b border-slate-800/80 p-2 flex overflow-x-auto gap-1 scrollbar-none">
                        {['story', 'skills', 'journey', 'values'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2.5 text-xs font-bold font-mono uppercase rounded transition-all duration-300 tracking-wider shrink-0 active:scale-95 ${activeTab === tab
                                        ? 'bg-slate-900 text-cyan-400 border border-slate-800 shadow-md shadow-black/40'
                                        : 'text-slate-500 hover:text-slate-300 border border-transparent hover:bg-slate-900/30'
                                    }`}
                            >
                                [ {tab.toUpperCase()} ]
                            </button>
                        ))}
                    </div>

                    {/* Interactive Tab Target Output Buffer */}
                    <div className="p-6 min-h-[360px] transition-all duration-300">

                        {/* Tab Module: Story / Manifest */}
                        {activeTab === 'story' && (
                            <div className="space-y-6 transition-all duration-500 opacity-100 transform translate-y-0">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded hover:border-slate-700/60 transition-all duration-300 hover:-translate-y-0.5">
                                        <div className="text-xs font-bold text-slate-500 mb-2.5 uppercase flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-cyan-500/50"></span> 01 // ORIGIN_METRICS
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-mono">
                                            My journey began with local infrastructure curiosity and low-level programmatic scripts. I was determined to reverse-Developer layout payloads to parse functional components myself. That pure structural challenge turned an experimental past-time into full stack software construction Developing.
                                        </p>
                                    </div>
                                    <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded hover:border-slate-700/60 transition-all duration-300 hover:-translate-y-0.5">
                                        <div className="text-xs font-bold text-slate-500 mb-2.5 uppercase flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-cyan-500/50"></span> 02 // RUNTIME_OBJECTIVES
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-mono">
                                            Currently, I construct integrated full-spectrum website. I manage complex React routing structures and connect them to relational engines or modern documents. My long-term roadmap focuses on architectural optimizations and secure data flow controls.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-slate-950/60 border border-slate-800 p-5 rounded">
                                    <div className="text-xs font-bold text-slate-500 mb-3.5 uppercase tracking-widest">DEVELOPER_CORE_INTERESTS // ROUTING</div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {interests.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2.5 bg-slate-900/50 p-3 rounded border border-slate-800/80 text-[12px] hover:border-slate-700 hover:bg-slate-900 transition-all duration-300 shadow-sm">
                                                <div className="text-cyan-500 group-hover:scale-110 transition-transform">{item.icon}</div>
                                                <span className="text-slate-300 font-semibold tracking-tight">{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab Module: Skill Matrix Readout */}
                        {activeTab === 'skills' && (
                            <div className="space-y-6 transition-all duration-500 opacity-100 transform translate-y-0">
                                <div className="space-y-3.5">
                                    {skills.map((skill, idx) => (
                                        <div key={idx} className="bg-slate-950/40 border border-slate-800 p-4 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700/60 transition-all duration-300">
                                            <div className="space-y-1 max-w-md">
                                                <div className="text-xs sm:text-sm font-bold text-slate-200 tracking-wide">{skill.name}</div>
                                                <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">DIAGNOSTIC_STATE: <span className="text-slate-400">{skill.status}</span></div>
                                            </div>
                                            <div className="flex items-center gap-4 w-full sm:w-auto shrink-0">
                                                <div className="w-full sm:w-36 h-2 bg-slate-950 rounded-none overflow-hidden border border-slate-800 shadow-inner relative">
                                                    <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-1000 ease-out" style={{ width: `${skill.level}%` }}></div>
                                                </div>
                                                <span className="text-xs font-black text-cyan-400 w-8 text-right font-mono tracking-tighter">{skill.level}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Stack Sub-categories Registry Matrix */}
                                <div className="grid sm:grid-cols-3 gap-4 border-t border-slate-800/60 pt-6">
                                    {[
                                        { title: 'FRONTEND_ENGINE', stack: 'React, Next.js, Core Hooks, HTML5 / Tailwind Architecture' },
                                        { title: 'BACKEND_RUNTIME', stack: 'Node.js Engine Execution, API Pipeline Integration, Vercel Edge' },
                                        { title: 'DATA_PERSISTENCE', stack: 'MongoDB Structures, Firebase Storage Streams, Relational MySQL Layer' }
                                    ].map((cat, idx) => (
                                        <div key={idx} className="bg-slate-900/30 p-4 rounded border border-slate-800/80 hover:border-slate-700/60 transition-colors shadow-sm">
                                            <div className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest mb-2 border-b border-slate-800/50 pb-1">{cat.title}</div>
                                            <div className="text-[11px] text-slate-400 leading-relaxed font-mono">{cat.stack}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tab Module: Career Registry Timeline */}
                        {activeTab === 'journey' && (
                            <div className="relative pl-6 border-l border-slate-800/80 space-y-6 transition-all duration-500 opacity-100 transform translate-y-0 ml-2">
                                {timeline.map((item, idx) => (
                                    <div key={idx} className="relative group">
                                        {/* Line Node Point Crosshair */}
                                        <div className="absolute -left-[31px] top-2 w-2 h-2 bg-slate-950 border-2 border-cyan-500 group-hover:bg-cyan-400 transition-colors z-10"></div>

                                        <div className="bg-slate-950/40 border border-slate-800 p-4 rounded space-y-2.5 hover:border-slate-700/60 transition-all duration-300 shadow-sm">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                <div>
                                                    <span className="text-[9px] font-black text-cyan-400 tracking-widest uppercase bg-cyan-950/40 border border-cyan-900/50 px-2 py-0.5 rounded shadow-sm">
                                                        TIMESTAMP // {item.year}
                                                    </span>
                                                    <h4 className="text-sm font-extrabold text-white mt-2 uppercase tracking-wide">{item.title}</h4>
                                                </div>
                                                <div className="text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 self-start sm:self-center bg-slate-900/80 p-1.5 border border-slate-800 rounded">
                                                    {item.icon}
                                                </div>
                                            </div>
                                            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-mono border-t border-slate-900/60 pt-2">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Tab Module: Softwar Integrity Values */}
                        {activeTab === 'values' && (
                            <div className="space-y-6 transition-all duration-500 opacity-100 transform translate-y-0">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {values.map((v, idx) => (
                                        <div key={idx} className="bg-slate-950/40 border border-slate-800 p-4 rounded flex gap-3.5 items-start hover:border-slate-700/60 transition-all duration-300 shadow-sm hover:-translate-y-0.5">
                                            <div className="p-2 bg-slate-900 border border-slate-800 rounded shrink-0 text-cyan-400 shadow-inner">
                                                {v.icon}
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="text-xs font-bold text-white uppercase tracking-wider">{v.title}</h4>
                                                <p className="text-xs text-slate-400 leading-relaxed font-mono">{v.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Action Console Frame Segment */}
                                <div className="bg-slate-950/80 border border-slate-800 rounded p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-6 shadow-inner relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50"></div>
                                    <div className="space-y-1 relative z-10">
                                        <div className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                                            EXECUTE_NEW_PROJECT // INSTANTIATE
                                        </div>
                                        <p className="text-xs text-slate-500 max-w-xl font-mono leading-relaxed">
                                            Software sockets are currently configured to accept remote development profiles, custom structural integrations, and full-stack software optimizations.
                                        </p>
                                    </div>
                                    <div className="flex gap-2 w-full md:w-auto shrink-0 relative z-10">
                                        <a
                                            href="/bc/contact"
                                            className="inline-flex items-center justify-center gap-2 text-[11px] font-black tracking-wider uppercase px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded transition-all duration-300 w-full sm:w-auto shadow-md shadow-cyan-500/5 hover:shadow-cyan-400/10 active:scale-95"
                                        >
                                            <Mail size={12} />
                                            OPEN_COMMS()
                                        </a>
                                        <a
                                            href="https://github.com/Brown-Oziomachi"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 text-[11px] font-bold tracking-wider uppercase px-4 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-white hover:bg-slate-950 rounded transition-all duration-300 w-full sm:w-auto shadow-sm active:scale-95"
                                        >
                                            <Github size={12} className="text-slate-400" />
                                            GIT_HUB
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Bottom Output Navigation Panel */}
            <footer className="relative z-10 border-t border-slate-900 bg-slate-950/60 py-6 mt-16 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-6 text-center text-[10px] font-bold text-slate-600 tracking-widest uppercase font-mono">
                    <p className="hover:text-slate-500 transition-colors duration-300">&copy; {new Date().getFullYear()} BROWN_CODE.SYS. ALL RIGHTS RESERVED. SECURE_BUILD_V2.0.6</p>
                </div>
            </footer>
            </div>
        </>

    );
}