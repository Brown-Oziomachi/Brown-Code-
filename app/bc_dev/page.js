"use client";
import React from 'react';
import Image from 'next/image';
import { Terminal, ArrowUpRight, Code, Phone, ShieldCheck, Layers, Globe, Cpu, ArrowLeft } from 'lucide-react';

export default function DeveloperBanner() {

 
    return (
        <>
         <nav className="relative z-10 border-b border-slate-800/80 bg-[#090d16]/80 backdrop-blur-md sticky top-0">
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
                                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-950/80 transition-all duration-300 shadow-sm hover:shadow-cyan-500/5"
                            >
                                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                                <span>SYS.RETURN()</span>
                            </a>
                        </div>
                    </nav>
        <section className="min-h-screen bg-[#0b0b0f] text-slate-100 antialiased py-16 px-4 md:px-6 relative font-mono selection:bg-cyan-500/30 selection:text-cyan-200 flex items-center justify-center overflow-hidden">
            {/* Ambient Cyan Laser Backlight Blur Effects */}
            <div className="absolute top-12 left-1/4 w-[400px] h-[200px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none select-none"></div>
            <div className="absolute bottom-12 right-1/4 w-[400px] h-[200px] bg-blue-500/10 rounded-full blur-[130px] pointer-events-none select-none"></div>

            <div className="w-full max-w-7xl backdrop-blur-md overflow-hidden shadow-2xl relative p-6 md:p-12 lg:p-1">

                {/* Decorative Top Sub-header Line */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-900 pb-6 mb-10 text-xs text-slate-500 tracking-wider gap-4">
                    <div className="flex items-center gap-2 text-cyan-400">
                        <Terminal size={14} className="animate-pulse" />
                        <span>system_node // browncode.name.ng</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-[11px]">
                        <span className="flex items-center gap-1"><Globe size={12} className="text-blue-400" /> LOC: ABUJA, NG // AFRICA</span>
                        <span className="hidden md:inline text-slate-700">|</span>
                        <span className="flex items-center gap-1"><Cpu size={12} className="text-emerald-400" /> STATUS: READY_TO_BUILD</span>
                    </div>
                </div>

                {/* Grid Layout Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left Column Text Nodes (7/12 width on desktop) */}
                    <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left">
                        <div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-2">
                                BROWN_<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">CODE</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-400 font-sans tracking-wide mt-2">
                                Full-Stack Software Developer
                            </p>
                            <p className="text-xs text-slate-500 font-sans mt-3 max-w-xl leading-relaxed mx-auto lg:mx-0">
                                Developing highly optimized web platforms, fast business sites, and production-ready applications. Managing full lifecycles from architecture design to global deployment.
                            </p>
                        </div>

                        {/* Special Custom Core Feature Block */}
                        <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 text-left max-w-xl">
                            <div className="p-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg shrink-0">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Featured Tool: Forensic Scam Checker</h4>
                                <p className="text-[11px] text-slate-500 font-sans mt-1">
                                    A built-in utility located at <code className="text-cyan-400 bg-slate-900 px-1 rounded">/client/scam-checker</code> designed to scan transactions, metadata patterns, and suspicious details to minimize risk.
                                </p>
                            </div>
                        </div>

                        {/* Custom Services Capability Tags */}
                        <div className="flex flex-wrap gap-2 justify-center lg:justify-start text-[11px]">
                            {[
                                '💻 software_sprints',
                                '🎨 ui_ux_dashboards',
                                '📱 next_js_responsive_apps',
                                '🔧 api_gateways',
                                '🛒 secure_e_commerce',
                                '⚡ milestone_50_50_framework'
                            ].map((service, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-200"
                                >
                                    {service}
                                </span>
                            ))}
                        </div>

                        {/* Data Metrics Counters Matrix */}
                        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 pt-2">
                            <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl text-center">
                                <div className="text-2xl md:text-3xl font-bold text-cyan-400 font-mono">5+</div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-sans">Deployments</div>
                            </div>
                            <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl text-center">
                                <div className="text-2xl md:text-3xl font-bold text-blue-400 font-mono">2+</div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-sans">Years Exp</div>
                            </div>
                            <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl text-center">
                                <div className="text-2xl md:text-3xl font-bold text-emerald-400 font-mono">3-7</div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-sans">Day Delivery</div>
                            </div>
                        </div>

                        {/* Execution Form Controls (CTAs) */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                            <a
                                href="tel:07013725529"
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-950/80 transition-all text-xs font-semibold"
                            >
                                <Phone size={14} className="text-cyan-400" />
                                <span>CALL: 07013725529</span>
                            </a>

                            <a
                                href="/bc/contact"
                                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:text-white hover:border-cyan-400 transition-all text-xs font-semibold uppercase tracking-wider shadow-sm hover:shadow-cyan-500/10"
                            >
                                <span>INITIALIZE_ENGAGEMENT</span>
                                <ArrowUpRight size={14} />
                            </a>
                        </div>
                    </div>

                    {/* Right Column Context Render Layer (5/12 width on desktop) */}
                    <div className="lg:col-span-5 flex items-center justify-center relative">
                        <div className="relative w-full max-w-sm">

                            {/* Graphic Border Bracket Container */}
                            <div className="relative overflow-hidden border border-slate-800 bg-slate-950/40 p-2 shadow-2xl">
                                <div className="relative rounded-xl overflow-hidden">
                                    <Image
                                        src="/coder1.png"
                                        alt="Brown Oziomachi - Full Stack Software Developer"
                                        width={400}
                                        height={480}
                                        className="w-full h-auto object-cover grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                                        priority
                                    />
                                </div>
                            </div>
                                <div>
                                    {['SIR BROWN AD'].map((name, index) => (
                                        <span key={index}
                                            className="px-3 py-1 bg-slate-950 border-slate-800 text-slate-500 text-xl font-mono hover:text-slate-300 transition-colors border-2"
                                        >
                                        {name}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </div>

                </div>
                {/* Horizontal Technical Specification Log Footer Array */}
                <div className="mt-12 pt-8 border-t border-slate-900">
                    <p className="text-slate-600 text-center mb-4 text-[10px] font-semibold uppercase tracking-widest font-sans">
                        // professional_production_stack
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
                        {['Next.js', 'React', 'Tailwind CSS', 'JavaScript', 'Node.js', 'Firebase', 'PostgreSQL', 'Vercel'].map((tech, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-slate-950 border border-slate-900/60 rounded text-slate-500 text-xs font-mono hover:text-slate-300 transition-colors"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                    
                </div>

            </div>
            </section>
        </>

    );
}