"use client";
import React, { useState, useEffect } from "react";
import {
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
    Code,
    ExternalLink,
    ArrowRight,
    Activity,
    Sliders,
    ShieldAlert,
    User,
} from "lucide-react";
import Link from "next/link";
import Testimonials from "@/components/Testimonials";
import FirebaseChat from "@/components/FirebaseChat";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import FloatingClient from "../floatingchat/chat";
import { Suspense } from "react";


export default function PortfolioClients() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const hasSeenPopup = localStorage.getItem("jobsPopupSeen");
        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setShowPopup(true);
                localStorage.setItem("jobsPopupSeen", "true");
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const projects = [
        {
            id: "BC_PRJ_01",
            title: " Yotapoint // E-Commerce Store",
            description: "Highly scalable transactional client platform built with integrated state machines, secure payment protocols, and a centralized operational dashboard.",
            image: "/yota.jpg",
            link: "https://yotapoint.com",
            tags: ["State Logic", "API Sockets", "Schema Panel"],
            year: "2025",
            status: "DEPLOYED // LIVE"
        },
        {
            id: "BC_PRJ_02",
            title: "Cyclopedia News Website",
            description: "Functional content engine delivery platform featuring real-time payload pipelines, complex rendering logic, and integrated media stream layers.",
            image: "/the.jpg",
            link: "https://www.thecyclopedia.com.ng",
            tags: ["Next.js", "React Architecture", "Data Streams"],
            year: "2025",
            status: "DEPLOYED // PRODUCTION"
        },
        {
            id: "BC_PRJ_03",
            title: "IJ Stitches Portfolio",
            description: "High-performance interface framework built around lightweight asset weights, explicit modular scaling, and optimal UX layout nodes.",
            image: "/ijs.jpg",
            link: "https://ij-stitches.vercel.app/main",
            tags: ["React Engine", "UI Hooks", "Asset Optimization"],
            year: "2025",
            status: "OPTIMIZED // STABLE"
        },
    ];

    const skills = [
        { name: 'React Architecture & Next.js SSR', level: 70, status: 'Production Ready' },
        { name: 'Node.js Core & Vercel Serverless Platforms', level: 50, status: 'Stable Backend' },
        { name: 'JavaScript Engine Paradigms (ES6+ Runtime)', level: 45, status: 'Intermediate Core' },
        { name: 'Database Architecture & Management', level: 70, status: 'Scalable Website' },
    ];

    const timeline = [
        {
            year: '2022',
            title: 'Full Stack Software Developer',
            description: 'Architecting full functional interfaces, handling data streams, and building integrated Node.js solutions.',
            icon: <Code size={14} />
        },
        {
            year: '2021',
            title: 'Software Development & Foundational Code Tracking',
            description: 'Initiated programmatic core tracks. Discovered deep data layout structures, schema validation parsing, and foundational logical algorithms.',
            icon: <Cpu size={14} />
        },
    ];

    const values = [
        {
            icon: <Binary size={18} />,
            title: 'Algorithmic Precision',
            description: 'Writing maintainable, predictable, and clean modular structures developed to minimize technical debt.'
        },
        {
            icon: <Terminal size={18} />,
            title: 'Asynchronous Architecture',
            description: 'Optimizing network data round-trips, layout renders, and server workloads for raw performance velocity.'
        },
        {
            icon: <GitBranch size={18} />,
            title: 'Robust Modularity',
            description: 'Isolating reusable logic into components and functional code ecosystems built for clean scaling.'
        },
        {
            icon: <Layers size={18} />,
            title: 'Software Adaptability',
            description: 'Continually tracking state machine patterns, security layers, and fresh structural updates.'
        },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setActiveSection(id);
            setIsMenuOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0b0b0f] text-slate-400 font-mono antialiased selection:bg-cyan-500/20 selection:text-cyan-300 relative overflow-x-hidden">
            {/* Engineering Grid Line Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0d_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0d_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0"></div>

            <Navbar
                isScrolled={isScrolled}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                activeSection={activeSection}
                scrollToSection={scrollToSection}
            />

            {/* HERO HERO SECTION */}
            <section id="home" className="relative z-10 min-h-screen flex items-center px-4 sm:px-8 pt-24 pb-12 border-b border-slate-900">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    {/* Left Meta Specs Panel */}
                    <div className="lg:col-span-4 flex flex-col justify-between bg-[#0b132b]/40 border border-slate-800/80 p-6 rounded relative backdrop-blur-sm">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                                <span className="text-xs text-slate-500 font-bold tracking-widest">// TARGET_IDENT</span>
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/80 animate-pulse"></span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                                </div>
                            </div>

                            <div className="w-32 h-32 mx-auto border border-slate-800 p-1.5 bg-slate-950 relative group">
                                <img
                                    src="/coder1.png"
                                    alt="Brown Code"
                                    className="w-full h-full object-cover grayscale contrast-125 opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                                />
                                <div className="absolute inset-0 border border-cyan-500/0 group-hover:border-cyan-500/30 transition-all pointer-events-none"></div>
                            </div>

                            <div className="space-y-1.5 text-center sm:text-left">
                                <h2 className="text-xl font-black text-white uppercase tracking-tight">Sir Brown AD</h2>
                                <p className="text-xs font-bold text-cyan-400 tracking-wider">Full-Stack Web Developer</p>
                            </div>

                            {/* Software Diagnostic Telemetry Panel */}
                            <div className="space-y-2 text-xs font-mono border-t border-slate-800/60 pt-4">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">ID:</span>
                                    <span className="text-slate-300 font-bold">BC_CORE_v2.0.6</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-slate-500">ACCESS_LEVEL:</span>
                                    <span className="text-cyan-400 font-bold">ROOT_USER / AUTH_GRANTED</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-slate-500">NET_LOC:</span>
                                    <span className="text-slate-300 font-bold">NIGERIA [GMT +1]</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-slate-500">CORE_RUNTIME:</span>
                                    <span className="text-slate-300 font-bold">NODEJS / NEXTJS / ES6+</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-slate-500">DATA_STORE:</span>
                                    <span className="text-slate-300 font-bold">FIRESTORE / CLOUD_HOSTED</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-slate-500">TRANS_PROTOCOL:</span>
                                    <span className="text-slate-300 font-bold">HTTPS / WSS / REST_API</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-slate-500">SYS_UPTIME:</span>
                                    <span className="text-slate-300 font-bold">02+_YEARS / ACTIVE_CYCLES</span>
                                </div>

                                <div className="flex justify-between items-center pt-1">
                                    <span className="text-slate-500">SOCKET_STATUS:</span>
                                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/20 border border-emerald-900/40 px-2 py-0.5 rounded tracking-wide">
                                        LISTENING_FOR_HIRE
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-8 pt-4 border-t border-slate-800/40 text-center">
                            <div>
                                <div className="text-lg font-black text-white">02+</div>
                                <div className="text-[9px] text-slate-500 tracking-widest font-bold">YRS EXP</div>
                            </div>
                            <div>
                                <div className="text-lg font-black text-white">05+</div>
                                <div className="text-[9px] text-slate-500 tracking-widest font-bold">BUILDS</div>
                            </div>
                            <div>
                                <div className="text-lg font-black text-white">100%</div>
                                <div className="text-[9px] text-slate-500 tracking-widest font-bold">DELIVERY</div>
                            </div>
                        </div>
                        <p className="text-[10px] font-mono tracking-widest text-[rgba(248,248,255,.4)] bg-[#11111a] border border-[rgba(248,248,255,.07)] px-2.5 py-1 rounded text-center">
                            https://www.browncode.name.ng
                        </p>
                    </div>

                    {/* Right Software Scope Panel */}
                    <div className="lg:col-span-8 flex flex-col justify-between p-2 sm:p-6 space-y-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest rounded-none">
                                <Activity size={10} className="text-cyan-500 animate-pulse" /> SOFTWARE_INITIALIZATION_LOG
                            </div>
                            <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tighter uppercase leading-[0.95]">
                                Developing high-velocity web nodes.
                            </h1>
                            <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed font-sans">
                                I bypass boilerplate conventions to architect zero-latency frontends and highly structural layout lifecycles. Focused entirely on lightweight footprints, decoupled data routing pipelines, and robust execution context safety.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3 border-t border-slate-900 pt-6">
                            <button
                                onClick={() => scrollToSection("projects")}
                                className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all tracking-wider uppercase rounded-sm shadow-md flex items-center gap-2 group"
                            >
                                COMPILE_PROJECT_REGISTRY()
                                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                            <Link
                                href="/cv"
                                className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 hover:text-white transition-all uppercase tracking-wider rounded-sm"
                            >
                                <Download size={12} className="text-cyan-400" />
                                FETCH_SPEC_CV.PDF
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW NO-TAB HARDWARE GRID SECTION */}
            <section id="about" className="relative z-10 py-16 px-4 sm:px-8 border-b border-slate-900">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <Sliders size={14} className="text-cyan-500" /> DIAGNOSTIC_SYSTEM_MAP // OVERVIEW
                    </div>

                    {/* Massive Multi-Column Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

                        {/* Col 1: Core Blueprint & Summary (5 Columns Wide) */}
                        <div className="md:col-span-5 space-y-6">
                            <div className="bg-[#0b132b]/20 border border-slate-800/60 p-6 rounded relative">
                                <div className="absolute top-0 left-6 transform -translate-y-1/2 bg-[#050811] px-2 text-[10px] font-bold text-cyan-400 tracking-widest uppercase">
                                    01 // ARCHITECTURAL_MANIFESTO
                                </div>
                                <div className="space-y-4 text-xs sm:text-sm text-slate-400 leading-relaxed">
                                    <p>
                                        My developing process bypasses visual decoration in favor of systemic precision. I scale custom JavaScript applications with strict operational limits, explicit side-effect tracking, and encapsulated data isolation loops.
                                    </p>
                                    <p className="border-t border-slate-900 pt-3 text-slate-500">
                                        Every application stack I initialize prioritizes layout render performance, robust data schema safety boundaries, and modular component isolation.
                                    </p>
                                    <Link
                                        href="/bc/about"
                                        className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 hover:text-white transition-all uppercase tracking-wider rounded-sm"
                                    >
                                        <User size={12} className="text-cyan-400" />
                                        LOAD_ABOUT_ME()
                                    </Link>
                                </div>
                            </div>

                            {/* Operational Values Blocks stacked directly underneath */}
                            <div className="space-y-3">
                                <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest pl-1">
                                    // OPERATIONAL_CONSTRAINTS
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {values.map((v, idx) => (
                                        <div key={idx} className="bg-slate-950 border border-slate-900 p-3 rounded space-y-1">
                                            <div className="text-cyan-500 flex items-center gap-1.5">
                                                {v.icon}
                                                <h4 className="text-[11px] font-black text-white uppercase tracking-wide">{v.title}</h4>
                                            </div>
                                            <p className="text-[11px] text-slate-500 leading-normal">{v.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Col 2: Live Telemetry / Skill Matrix (4 Columns Wide) */}
                        <div className="md:col-span-4 bg-[#0b132b]/20 border border-slate-800/60 p-6 rounded relative self-stretch flex flex-col justify-between">
                            <div className="absolute top-0 left-6 transform -translate-y-1/2 bg-[#050811] px-2 text-[10px] font-bold text-cyan-400 tracking-widest uppercase">
                                02 // STACK_CAPACITIES
                            </div>

                            <div className="space-y-5 h-full flex flex-col justify-center">
                                {skills.map((skill, idx) => (
                                    <div key={idx} className="space-y-1.5">
                                        <div className="flex justify-between items-end text-xs">
                                            <span className="font-bold text-slate-200 tracking-tight">{skill.name}</span>
                                            <span className="text-[11px] font-black text-cyan-400">{skill.level}%</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-950 border border-slate-900 overflow-hidden relative">
                                            <div className="h-full bg-cyan-500" style={{ width: `${skill.level}%` }}></div>
                                        </div>
                                        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                                            METRIC_LOG: <span className="text-slate-400 font-normal">{skill.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Col 3: Chronological Stream (3 Columns Wide) */}
                        <div className="md:col-span-3 bg-[#0b132b]/20 border border-slate-800/60 p-6 rounded relative">
                            <div className="absolute top-0 left-6 transform -translate-y-1/2 bg-[#050811] px-2 text-[10px] font-bold text-cyan-400 tracking-widest uppercase">
                                03 // TIMELINE_STREAM
                            </div>

                            <div className="relative border-l border-slate-800 pl-4 space-y-6 my-2">
                                {timeline.map((item, idx) => (
                                    <div key={idx} className="relative space-y-1">
                                        <div className="absolute -left-[21px] top-1.5 w-2 h-2 bg-[#050811] border border-cyan-500 rounded-full"></div>
                                        <div className="text-[10px] font-black text-cyan-400 tracking-widest bg-cyan-950/20 px-1.5 py-0.5 rounded border border-cyan-900/20 inline-block">
                                            T_{item.year}
                                        </div>
                                        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-tight">{item.title}</h4>
                                        <p className="text-[11px] text-slate-500 leading-relaxed">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* PROJECTS ARCHIVE MODULE */}
            <section id="projects" className="relative z-10 py-16 px-4 sm:px-8 border-b border-slate-900">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <GitBranch size={14} className="text-cyan-500" /> PRODUCTION_DEPLOYMENTS // COMPONENT_REGISTRY
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <article
                                key={project.id}
                                className="bg-slate-950 border border-slate-900 hover:border-slate-800 rounded overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-xl"
                            >
                                <div className="space-y-4">
                                    <div className="relative h-40 w-full bg-slate-900 overflow-hidden border-b border-slate-900">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60"></div>
                                        <div className="absolute top-3 left-3 bg-slate-950/90 text-[9px] font-bold text-slate-500 px-2 py-0.5 border border-slate-900 tracking-widest">
                                            {project.id}
                                        </div>
                                    </div>

                                    <div className="p-5 space-y-3">
                                        <div className="flex justify-between items-center text-[10px] tracking-wider font-bold">
                                            <span className="text-cyan-400 uppercase">{project.status}</span>
                                            <span className="text-slate-600">// {project.year}</span>
                                        </div>
                                        <h3 className="text-base font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-xs text-slate-400 leading-relaxed font-sans">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-5 pt-0 space-y-4">
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-0.5 text-[9px] font-bold bg-slate-900 text-slate-500 border border-slate-800 rounded-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full text-center inline-flex items-center justify-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/30 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-all rounded-sm"
                                    >
                                        INITIALIZE_LIVE_NODE()
                                        <ExternalLink size={10} />
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="flex justify-center pt-4">
                        <Link href="/bc/projects" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-cyan-400 transition-colors tracking-widest">
                            READ_COMPLETE_INDEX()
                            <ArrowRight size={12} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* PIPELINE DISPATCH FOR OPPORTUNITIES */}
            <section id="jobs" className="relative z-10 py-16 px-4 sm:px-8 border-b border-slate-900 bg-white/2">
                <div className="max-w-5xl mx-auto border border-slate-800/80 bg-[#0b132b] p-8 rounded relative overflow-hidden backdrop-blur-sm shadow-inner" >
                    <div className="absolute top-0 left-0 w-50 h-1 bg-cyan-500"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        <div className="lg:col-span-8 space-y-2">
                            <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                                COMM_ROUTING_CHANNEL // PIPELINE
                            </div>
                            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">Worldwide Remote Opportunities Stream</h2>
                            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans max-w-2xl">
                                Software parameters are thoroughly customized to handle distributed micro-tasks, long-term full-stack infrastructure setups, and secure remote platform execution blocks.
                            </p>
                        </div>
                        <div className="lg:col-span-4 lg:text-right">
                            <Link href="/jobs" className="inline-block px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs tracking-wider uppercase rounded-sm transition-all whitespace-nowrap">
                                OPEN_OPPORTUNITY_SOCKET()
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Testimonials />

            {/* RE-ENGINEERED CONTACT PORT */}
            <section id="contact" className="relative z-10 py-16 px-4 sm:px-8">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <div className="space-y-2">
                        <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                            [ PORT_80_HANDSHAKE ]
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Establish Context Stream</h2>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mx-auto font-sans">
                            Submit payloads for remote contracts, core website optimizations, or scalable JavaScript system design consults.
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                        <a href="https://github.com/Brown-Oziomachi" target="_blank" rel="noreferrer" className="p-3 bg-slate-950 border border-slate-900 text-slate-500 hover:text-cyan-400 hover:border-slate-800 rounded transition-all" aria-label="GitHub Hardware Portal"><Github size={16} /></a>
                        <a href="https://www.linkedin.com/in/brownoziomachi72a5a3229" target="_blank" rel="noreferrer" className="p-3 bg-slate-950 border border-slate-900 text-slate-500 hover:text-cyan-400 hover:border-slate-800 rounded transition-all" aria-label="LinkedIn Network Link"><Linkedin size={16} /></a>
                        <a href="mailto:browncemmanuel@gmail.com" className="p-3 bg-slate-950 border border-slate-900 text-slate-500 hover:text-cyan-400 hover:border-slate-800 rounded transition-all" aria-label="Direct Mail Endpoint"><Mail size={16} /></a>
                    </div>

                    <div>
                        <Link href="/bc/contact" className="inline-block px-6 py-3 bg-slate-950 border border-slate-900 hover:border-slate-800 text-slate-300 hover:text-white font-black text-xs tracking-wider uppercase rounded-sm transition-all">
                            INITIALIZE_ENGAGEMENT()
                        </Link>
                    </div>
                </div>
            </section>

            {/* CRITICAL POPUP ALERT */}
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
                    <div className="relative w-full max-w-md rounded border border-slate-900 bg-[#050811] p-6 shadow-2xl font-mono">
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-4 right-4 text-slate-600 hover:text-white text-xs transition-colors"
                            aria-label="Terminate runtime window"
                        >
                            [✕]
                        </button>
                        <div className="space-y-4">
                            <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                                <ShieldAlert size={12} className="text-cyan-500" />
                                CONTEXT_INTERRUPT_ALERT
                            </div>
                            <h3 className="text-base font-black text-white uppercase tracking-tight">Active Remote Pipelines | Jobs</h3>
                            <p className="text-xs text-slate-400 leading-relaxed font-sans">
                                Distributed global remote endpoints are currently open for deep structural integration. Execute trace logs now.
                            </p>
                            <Link href="/jobs" onClick={() => setShowPopup(false)} className="inline-block text-center w-full px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-sm transition-all uppercase tracking-wider">
                                BRIDGE_JOBS_STREAM()
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <Footer />

            <Suspense fallback={null}>
                <FloatingClient onChatOpen={() => setIsChatOpen(true)} />
            </Suspense>
            <FirebaseChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
    );
}
