"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
    Terminal, ArrowUpRight, Phone, ShieldCheck, Globe, Cpu,
    ArrowLeft, Search, ExternalLink, Code2, Database, Layers,
    GitBranch, Zap, Award, BookOpen, Users, CheckCircle2, Mail
} from 'lucide-react';

const STACK = [
    { label: 'Next.js', color: 'text-white' },
    { label: 'React', color: 'text-cyan-400' },
    { label: 'Tailwind CSS', color: 'text-blue-400' },
    { label: 'JavaScript', color: 'text-yellow-400' },
    { label: 'Node.js', color: 'text-emerald-400' },
    { label: 'Firebase', color: 'text-orange-400' },
    { label: 'PostgreSQL', color: 'text-sky-400' },
    { label: 'Vercel', color: 'text-slate-300' },
    { label: 'Firestore', color: 'text-amber-400' },
    { label: 'REST APIs', color: 'text-purple-400' },
];

const SERVICES = [
    { icon: <Code2 size={13} />, label: 'software_sprints' },
    { icon: <Layers size={13} />, label: 'ui_ux_dashboards' },
    { icon: <Zap size={13} />, label: 'next_js_apps' },
    { icon: <GitBranch size={13} />, label: 'api_gateways' },
    { icon: <Database size={13} />, label: 'secure_e_commerce' },
    { icon: <Award size={13} />, label: '50_50_framework' },
];

const PROJECTS = [
    {
        name: 'LAN Library',
        desc: 'Pan-African academic document marketplace across 30+ countries. Seller dashboards, bounty board, affiliate suite, Flutterwave payments.',
        url: 'https://lanlibrary.com',
        tag: 'LIVE',
        color: 'text-emerald-400 border-emerald-500/20 bg-emerald-950/20',
    },
    {
        name: 'Forensic Scam Checker',
        desc: 'Security utility that audits transaction footprints, metadata patterns, and structural anomalies to limit ecosystem fraud risks.',
        url: '/client/scam-checker',
        tag: 'TOOL',
        color: 'text-red-400 border-red-500/20 bg-red-950/20',
    },
    {
        name: 'Brown Code Portfolio',
        desc: 'Personal engineering portfolio — dark terminal design language, blog with Firestore comment system, and project showcase.',
        url: 'https://browncode.name.ng',
        tag: 'PORTFOLIO',
        color: 'text-cyan-400 border-cyan-500/20 bg-cyan-950/20',
    },
];

export default function DeveloperBanner() {
    const [typed, setTyped] = useState('');
    const fullText = 'browncode.name.ng';

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setTyped(fullText.slice(0, i + 1));
            i++;
            if (i >= fullText.length) clearInterval(interval);
        }, 80);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* ── Nav ── */}
            <nav className="relative z-10 border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md sticky top-0 z-[9999]">
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
                        href="/bc/about"
                        className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-950/80 transition-all duration-300"
                    >
                        <ArrowLeft size={14} />
                        <span>SYS.RETURN()</span>
                    </a>
                </div>
            </nav>

            <div className="min-h-screen bg-[#0b0b0f] text-slate-100 antialiased font-mono selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">

                {/* ── Ambient glows ── */}
                <div className="fixed top-0 left-1/4 w-[500px] h-[300px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
                <div className="fixed bottom-0 right-1/4 w-[500px] h-[300px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

                {/* ══════════════════════════════════
                    HERO SECTION
                ══════════════════════════════════ */}
                <section className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-20">

                    {/* Status bar */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-900 pb-6 mb-12 text-xs text-slate-500 tracking-wider gap-4">
                        <div className="flex items-center gap-2 text-cyan-400">
                            <Terminal size={13} className="animate-pulse" />
                            <span>system_node // browncode.name.ng</span>
                        </div>
                        <div className="flex flex-wrap gap-5 text-[11px]">
                            <span className="flex items-center gap-1.5"><Globe size={11} className="text-blue-400" /> LOC: ABUJA, NG</span>
                            <span className="text-slate-700">|</span>
                            <span className="flex items-center gap-1.5"><Cpu size={11} className="text-emerald-400" /> STATUS: READY_TO_BUILD</span>
                            <span className="text-slate-700">|</span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                                ONLINE
                            </span>
                        </div>
                    </div>

                    {/* Main hero grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Text column */}
                        <div className="lg:col-span-7 flex flex-col space-y-8 text-center lg:text-left order-2 lg:order-1">

                            <div>
                                <p className="text-[11px] text-slate-600 tracking-[0.3em] uppercase mb-4">// Full-Stack Software Developer</p>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-3 leading-[0.95]">
                                    BROWN_<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">CODE</span>
                                </h1>
                                <p className="text-lg md:text-xl text-slate-400 font-sans tracking-wide">
                                    Sir Brown Oziomachi (AD)
                                </p>
                            </div>

                            <div className="text-xs text-slate-400 font-sans max-w-xl space-y-3 leading-relaxed mx-auto lg:mx-0">
                                <p>
                                    I engineer highly optimized web architectures, lightning-fast business systems, and scalable full-stack applications built to deliver measurable outcomes. From interactive frontends to battle-hardened database layers — I own the full lifecycle.
                                </p>
                                <p>
                                    My work spans secure application design, cloud-native deployments, and maintainable codebases built for scale. I specialize in Next.js, Firebase, real-time data systems, and payment infrastructure across African markets.
                                </p>
                            </div>

                            {/* Service tags */}
                            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                {SERVICES.map((s, i) => (
                                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all text-[11px]">
                                        <span className="text-cyan-500">{s.icon}</span>
                                        {s.label}
                                    </span>
                                ))}
                            </div>

                            {/* Metrics */}
                            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0">
                                {[
                                    { val: '5+', label: 'Deployments', color: 'text-cyan-400' },
                                    { val: '2+', label: 'Yrs Exp', color: 'text-blue-400' },
                                    { val: '3–7', label: 'Day Delivery', color: 'text-emerald-400' },
                                ].map((m, i) => (
                                    <div key={i} className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl text-center hover:border-slate-800 transition-colors">
                                        <div className={`text-2xl md:text-3xl font-bold font-mono ${m.color}`}>{m.val}</div>
                                        <div className="text-[10px] text-slate-600 uppercase tracking-widest mt-1 font-sans">{m.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                                <a href="tel:07013725529" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all text-xs font-semibold">
                                    <Phone size={13} className="text-cyan-400" />
                                    <span>CALL: 07013725529</span>
                                </a>
                                <a href="mailto:browncemmanuel@gmail.com" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all text-xs font-semibold">
                                    <Mail size={13} className="text-cyan-400" />
                                    <span>browncemmanuel@gmail.com</span>
                                </a>
                                <a href="/bc/contact" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all text-xs font-semibold uppercase tracking-wider">
                                    <span>INITIALIZE_ENGAGEMENT</span>
                                    <ArrowUpRight size={13} />
                                </a>
                            </div>
                        </div>

                        {/* Image column */}
                        <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2">
                            <div className="relative w-full max-w-sm">
                                {/* Corner brackets */}
                                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-cyan-500/60" />
                                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-cyan-500/60" />
                                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-cyan-500/60" />
                                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-cyan-500/60" />

                                <div className="overflow-hidden border border-slate-800 bg-slate-950/40 p-2 shadow-2xl">
                                    <div className="relative overflow-hidden">
                                        <Image
                                            src="/coder1.png"
                                            alt="Brown Oziomachi - Full Stack Software Developer"
                                            width={400}
                                            height={480}
                                            className="w-full h-auto object-cover grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                            priority
                                        />
                                        {/* Scan line overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/3 to-transparent pointer-events-none" />
                                    </div>
                                </div>

                                <div className="mt-3 flex items-center justify-between px-1">
                                    <span className="text-[10px] text-slate-600 tracking-widest">IDENT: SIR_BROWN_AD</span>
                                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        VERIFIED
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════
                    GOOGLE SEARCH SECTION
                ══════════════════════════════════ */}
                <section className="border-t border-slate-900 py-20 px-4 md:px-8">
                    <div className="max-w-4xl mx-auto">

                        <p className="text-[10px] text-slate-600 tracking-[0.3em] uppercase mb-3 text-center">// Search Engine Presence</p>
                        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3 tracking-tight">
                            Find me on Google
                        </h2>
                        <p className="text-xs text-slate-500 text-center font-sans mb-12 max-w-lg mx-auto leading-relaxed">
                            Search <span className="text-cyan-400 font-mono">browncode.name.ng</span> or <span className="text-cyan-400 font-mono"> Brown Oziomachi</span> on Google and my portfolio comes up. Here's what you'll find indexed.
                        </p>

                        {/* Mock Google result card */}
                        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
                            {/* Google search bar mockup */}
                            <div className="flex items-center gap-3 bg-[#0b0b0f] border border-slate-700 rounded-full px-4 py-2.5 mb-6">
                                <Search size={14} className="text-slate-500 shrink-0" />
                                <span className="text-sm font-sans text-slate-300">
                                    browncode.name.ng
                                    <span className="inline-block w-0.5 h-4 bg-cyan-400 ml-0.5 animate-pulse align-middle" />
                                </span>
                            </div>

                            {/* Search result preview */}
                            <div className="space-y-1 pl-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-4 h-4 rounded-full bg-slate-700 flex items-center justify-center">
                                        <Terminal size={8} className="text-cyan-400" />
                                    </div>
                                    <span className="text-[11px] text-slate-500 font-sans">browncode.name.ng</span>
                                </div>
                                <a href="https://browncode.name.ng" target="_blank" rel="noopener noreferrer"
                                    className="block text-lg text-blue-400 hover:text-blue-300 hover:underline font-sans leading-snug transition-colors">
                                    Brown Code — Full-Stack Software Developer | Portfolio
                                </a>
                                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                                    Sir Brown AD (Brown Oziomachi) — Full-Stack Software Developer based in Abuja, Nigeria. Specializing in Next.js, Firebase, scalable web systems, and African market payment infrastructure. View projects, blog, and contact.
                                </p>
                                <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-slate-900">
                                    {['Portfolio', 'Blog', 'Projects', 'Contact', 'Scam Checker'].map((link, i) => (
                                        <span key={i} className="text-[11px] text-blue-400 font-sans hover:underline cursor-pointer">{link}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* What you'll find grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                            {[
                                {
                                    icon: <BookOpen size={14} />,
                                    title: 'Technical Blog',
                                    desc: 'In-depth engineering articles on Next.js architecture, Firebase patterns, API design, and African tech infrastructure.',
                                    url: '/blog',
                                },
                                {
                                    icon: <Layers size={14} />,
                                    title: 'Project Showcase',
                                    desc: 'Live deployments including LAN Library, scam detection tools, and full-stack dashboards built for real users.',
                                    url: '/portfolio',
                                },
                                {
                                    icon: <Users size={14} />,
                                    title: 'About Sir Brown AD',
                                    desc: 'Background, engineering philosophy, the 50/50 framework, and what it means to build for the African digital economy.',
                                    url: '/bc/about',
                                },
                                {
                                    icon: <ShieldCheck size={14} />,
                                    title: 'Scam Checker Tool',
                                    desc: 'Free forensic utility for auditing suspicious transactions — built open for the community, indexed and accessible.',
                                    url: '/client/scam-checker',
                                },
                            ].map((item, i) => (
                                <a key={i} href={item.url}
                                    className="group flex gap-3 p-4 bg-slate-950/40 border border-slate-900 rounded-lg hover:border-cyan-500/30 hover:bg-cyan-950/10 transition-all">
                                    <div className="shrink-0 mt-0.5 text-cyan-500 group-hover:text-cyan-400 transition-colors">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-300 mb-1 group-hover:text-white transition-colors">{item.title}</p>
                                        <p className="text-[11px] text-slate-600 font-sans leading-relaxed">{item.desc}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Direct link CTA */}
                        <div className="mt-8 text-center">
                            <a
                                href="https://browncode.name.ng"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-2.5 border border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 rounded text-xs font-mono uppercase tracking-wider transition-all"
                            >
                                <ExternalLink size={12} />
                                <span>OPEN: browncode.name.ng</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════
                    FEATURED TOOL: SCAM CHECKER
                ══════════════════════════════════ */}
                <section className="border-t border-slate-900 py-20 px-4 md:px-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-slate-950/60 border border-red-500/20 rounded-xl p-8 flex flex-col md:flex-row gap-6 items-start">
                            <div className="shrink-0 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                <ShieldCheck size={28} className="text-red-400" />
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-[10px] font-mono text-red-400 tracking-widest uppercase">// Featured Security Tool</span>
                                    <h3 className="text-xl font-bold text-white mt-1">Forensic Scam Checker</h3>
                                </div>
                                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                                    A built-in security utility engineered at <code className="text-cyan-400 bg-slate-900 px-1.5 py-0.5 rounded">/client/scam-checker</code> to actively audit transaction footprints, metadata patterns, and structural anomalies. Designed to drastically limit ecosystem fraud risks for users across African digital markets.
                                </p>
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {['Transaction Audit', 'Metadata Analysis', 'Anomaly Detection', 'Free to Use'].map((tag, i) => (
                                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-500 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <a href="/client/scam-checker"
                                    className="inline-flex items-center gap-2 mt-2 px-5 py-2 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded text-xs font-mono uppercase tracking-wider transition-all">
                                    <span>LAUNCH_TOOL()</span>
                                    <ArrowUpRight size={12} />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════
                    TECH STACK FOOTER
                ══════════════════════════════════ */}
                <section className="border-t border-slate-900 py-12 px-4 md:px-8">
                    <div className="max-w-4xl mx-auto">
                        <p className="text-slate-600 text-center mb-6 text-[10px] font-semibold uppercase tracking-widest">
                            // professional_production_stack
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {STACK.map((tech, i) => (
                                <span key={i} className={`px-3 py-1 bg-slate-950 border border-slate-900 rounded text-xs font-mono hover:border-slate-700 transition-colors ${tech.color}`}>
                                    {tech.label}
                                </span>
                            ))}
                        </div>

                        {/* Final contact strip */}
                        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
                            <span className="font-mono">© {new Date().getFullYear()} Brown Code // browncode.name.ng</span>
                            <div className="flex items-center gap-4">
                                <a href="tel:07013725529" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                                    <Phone size={11} /> 07013725529
                                </a>
                                <a href="mailto:browncemmanuel@gmail.com" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                                    <Mail size={11} /> browncemmanuel@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
}