"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
    Menu,
    X,
    ChevronDown,
    Terminal,
    Cpu,
    Network,
    Globe,
    Layers,
    Server,
    Newspaper,
    TrendingUp,
    ExternalLink
} from "lucide-react";
import { SysMonitorNavDeskLink, SysMonitorNavLink, SysMonitorNavMobLink } from "@/app/status/page";

export default function Navbar({
    isScrolled,
    isMenuOpen,
    setIsMenuOpen,
    activeSection,
    scrollToSection,
}) {
    const [isJobOpen, setIsJobOpen] = useState(false);
    const [isJobOpenMobile, setIsJobOpenMobile] = useState(false);
    const [isNewsOpen, setIsNewsOpen] = useState(false);
    const [isNewsOpenMobile, setIsNewsOpenMobile] = useState(false);
    const newsRef = useRef(null);
    const jobRef = useRef(null);
    const navRef = useRef(null);

    const navItems = [
        "home",
        "about",
        "projects",
        "testimonials",
        "contact",
        "blog",
        "tech-news",
    ];      

    const jobOptions = [
        {
            id: "UTIL_NODE_01",
            title: "JobCopilot (Auto Apply)",
            description: "Automated routing engine designed to cross-reference and batch-submit application data packets.",
            icon: <Network size={14} />,
            href: "https://jobcopilot.com/?linkId=lp_494205&sourceId=brown-oziomachi&tenantId=jobcopilot",
            external: true,
            type: "DATA_PIPELINE"
        },
        {
            id: "UTIL_NODE_02",
            title: "FinalRound AI",
            description: "Advanced simulation runtime tailored to optimize and prepare developer profiles for screening blocks.",
            icon: <Cpu size={14} />,
            href: "https://www.finalroundai.com/?via=browncode",
            external: true,
            type: "AI_ENGINE"
        },
        {
            id: "UTIL_NODE_03",
            title: "HostAfrica Domain Engine",
            description: "Global registry allocation system. Provision and resolve high-performance top-level domain nodes.",
            icon: <Globe size={14} />,
            href: "https://my.hostafrica.com/aff.php?aff=2657",
            external: true,
            type: "DNS_PROVISION"
        },
        {
            id: "UTIL_NODE_04",
            title: "eSkilled AI Creator",
            description: "Automated content block model built to orchestrate and output online course architectures.",
            icon: <Layers size={14} />,
            href: "https://aicoursecreator.eskilled.io/?fpr=brown99",
            external: true,
            type: "LOGIC_SYNTH"
        },
        {
            id: "UTIL_NODE_05",
            title: "Swagbucks Knowledge Base",
            description: "Distributed manual verification engine where operators execute tasks for reward payloads.",
            icon: <Server size={14} />,
            href: "https://www.swagbucks.com/p/register?rb=202240461&rp=1",
            external: true,
            type: "COMPUTE_TRACK"
        },
    ];

    const newsOptions = [
        {
            id: "NEWS_NODE_01",
            title: "Oversharing with AI",
            description: "Risk Assessment: How your production ChatGPT conversations could be indexed or used against you.",
            icon: <Cpu size={14} />,
            href: "https://browncode.name.ng/news/oversharing-with-ai-how-your-chatgpt-conversations-could-be-used-against-you--sygqIVJl6xs5jo47WwQw",
            type: "SEC_LOG"
        },
        {
            id: "NEWS_NODE_02",
            title: "Unregulated AI Policies",
            description: "Global telemetry warnings regarding unmitigated and unregulated algorithmic development vectors.",
            icon: <TrendingUp size={14} />,
            href: "https://browncode.name.ng/news/china-warns-of-catastrophic-consequences-from-unregulated-ai-development-in-u-s--WSHJ3fcktdE5wlKY5lZQ",
            type: "SYS_WARN"
        },
        {
            id: "NEWS_NODE_03",
            title: "Labor Automation Deficit",
            description: "Statistical indicators reporting high-density anxiety profiles concerning AI resource replacement.",
            icon: <Globe size={14} />,
            href: "https://browncode.name.ng/news/nearly-two-thirds-of-young-adults-fear-ai-will-take-their-jobs--73sOIQLizN4Vs3O65pa2",
            type: "TELEMETRY"
        },
    ];

    const isLinkItem = (item) => ["blog", "tech-news"].includes(item);

    const formatDisplayText = (item) => {
        return item.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    };

    const JobCard = ({ job, onClick }) => {
        const content = (
            <div className="group bg-slate-950 border border-slate-900 hover:border-slate-800 p-4 rounded-sm flex flex-col justify-between h-full space-y-4 relative transition-all duration-300">
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[4px] border-r-[4px] border-t-transparent border-r-transparent group-hover:border-t-cyan-500 group-hover:border-r-cyan-500 transition-all"></div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2 text-[9px] font-bold tracking-widest text-slate-500">
                        <span>{job.id}</span>
                        <span className="text-cyan-500">{job.type}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <div className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-cyan-400 transition-colors shrink-0">
                            {job.icon}
                        </div>
                        <h4 className="text-xs font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors pt-0.5">
                            {job.title}
                        </h4>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{job.description}</p>
                </div>
                <div className="text-[9px] text-slate-500 inline-flex items-center gap-1 uppercase tracking-wider bg-slate-900/50 border border-slate-800/60 group-hover:border-cyan-500/20 px-2 py-1 rounded-sm group-hover:text-cyan-400 transition-all w-fit">
                    EXEC_CONNECT() <ExternalLink size={8} />
                </div>
            </div>
        );

        return job.external ? (
            <a href={job.href} target="_blank" rel="noopener noreferrer" onClick={onClick} className="block h-full">
                {content}
            </a>
        ) : (
            <Link href={job.href} onClick={onClick} className="block h-full">
                {content}
            </Link>
        );
    };

    const NewsCard = ({ news, onClick }) => {
        const isExternal = news.href.startsWith("http");
        const content = (
            <div className="group bg-slate-950 border border-slate-900 hover:border-slate-800 p-4 rounded-sm flex flex-col justify-between h-full space-y-4 relative transition-all duration-300">
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[4px] border-r-[4px] border-t-transparent border-r-transparent group-hover:border-t-cyan-500 group-hover:border-r-cyan-500 transition-all"></div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2 text-[9px] font-bold tracking-widest text-slate-500">
                        <span>{news.id}</span>
                        <span className="text-cyan-500">{news.type}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <div className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-cyan-400 transition-colors shrink-0">
                            {news.icon}
                        </div>
                        <h4 className="text-xs font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors pt-0.5">
                            {news.title}
                        </h4>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{news.description}</p>
                </div>
                <div className="text-[9px] text-slate-500 inline-flex items-center gap-1 uppercase tracking-wider bg-slate-900/50 border border-slate-800/60 group-hover:border-cyan-500/20 px-2 py-1 rounded-sm group-hover:text-cyan-400 transition-all w-fit">
                    FETCH_LOG() <ExternalLink size={8} />
                </div>
            </div>
        );

        return isExternal ? (
            <a href={news.href} target="_blank" rel="noopener noreferrer" onClick={onClick} className="block h-full">
                {content}
            </a>
        ) : (
            <Link href={news.href} onClick={onClick} className="block h-full">
                {content}
            </Link>
        );
    };

    // Close on click outside hooks
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) setIsMenuOpen(false);
        };
        if (isMenuOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMenuOpen, setIsMenuOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (jobRef.current && !jobRef.current.contains(event.target)) setIsJobOpen(false);
        };
        if (isJobOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isJobOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (newsRef.current && !newsRef.current.contains(event.target)) setIsNewsOpen(false);
        };
        if (isNewsOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isNewsOpen]);

    return (
        <>
            <nav className={`fixed w-full z-50 font-mono antialiased transition-all duration-200 border-b ${isScrolled
                    ? "bg-[#050811]/95 border-slate-900 backdrop-blur-md shadow-md"
                    : "bg-transparent border-transparent"
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* System Identifier Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/">
                                <span className="text-xs font-black tracking-widest text-cyan-400 hover:text-white transition-colors">
                                    {"<BROWN_CODE_DEV />"}
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-4">
                                {navItems.map((item) =>
                                    isLinkItem(item) ? (
                                        <Link
                                            key={item}
                                            href={`/${item}`}
                                            className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1.5 transition-colors border border-transparent rounded-sm ${activeSection === item
                                                    ? "text-cyan-400 border-slate-900 bg-slate-900/40"
                                                    : "text-slate-400 hover:text-white"
                                                }`}
                                        >
                                            {formatDisplayText(item)}
                                        </Link>
                                    ) : (
                                        <button
                                            key={item}
                                            onClick={() => scrollToSection(item)}
                                            className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1.5 transition-colors border border-transparent rounded-sm cursor-pointer ${activeSection === item
                                                    ? "text-cyan-400 border-slate-900 bg-slate-900/40"
                                                    : "text-slate-400 hover:text-white"
                                                }`}
                                        >
                                            {item}
                                        </button>
                                    )
                                )}
                                
                                {/* Desktop Pipeline Router Toggles */}
                                <div ref={jobRef} className="relative inline-block">
                                    <button
                                        onClick={() => { setIsJobOpen(!isJobOpen); setIsNewsOpen(false); }}
                                        className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1.5 text-slate-400 hover:text-white transition-colors flex items-center gap-1 rounded-sm border ${isJobOpen ? "border-slate-800 bg-slate-900/60 text-white" : "border-transparent"
                                            }`}
                                    >
                                        [UTILITIES]
                                        <ChevronDown size={10} className={`transition-transform duration-200 ${isJobOpen ? "rotate-180" : ""}`} />
                                    </button>
                                </div>

                                <div ref={newsRef} className="relative inline-block">
                                    <button
                                        onClick={() => { setIsNewsOpen(!isNewsOpen); setIsJobOpen(false); }}
                                        className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1.5 text-slate-400 hover:text-white transition-colors flex items-center gap-1 rounded-sm border ${isNewsOpen ? "border-slate-800 bg-slate-900/60 text-white" : "border-transparent"
                                            }`}
                                    >
                                        <Newspaper size={12} className="text-slate-500" /> [TELEMETRY]
                                        <ChevronDown size={10} className={`transition-transform duration-200 ${isNewsOpen ? "rotate-180" : ""}`} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Operations Block triggers */}
                        <div className="md:hidden flex items-center gap-1">
                            <button
                                onClick={() => { setIsJobOpenMobile(!isJobOpenMobile); setIsNewsOpenMobile(false); setIsMenuOpen(false); }}
                                className="text-[10px] font-bold uppercase tracking-wider px-2 py-1.5 text-slate-400 border border-slate-900/60 bg-slate-950 rounded-sm flex items-center gap-0.5"
                            >
                                UTIL <ChevronDown size={10} className={isJobOpenMobile ? "rotate-180" : ""} />
                            </button>

                            <button
                                onClick={() => { setIsNewsOpenMobile(!isNewsOpenMobile); setIsJobOpenMobile(false); setIsMenuOpen(false); }}
                                className="text-[10px] font-bold uppercase tracking-wider px-2 py-1.5 text-slate-400 border border-slate-900/60 bg-slate-950 rounded-sm flex items-center gap-0.5"
                            >
                                <Newspaper size={11} /> <ChevronDown size={10} className={isNewsOpenMobile ? "rotate-180" : ""} />
                            </button>

                            <button
                                onClick={() => { setIsMenuOpen(!isMenuOpen); setIsJobOpenMobile(false); setIsNewsOpenMobile(false); }}
                                className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-white border border-transparent rounded-sm focus:outline-none"
                            >
                                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                            </button>
               
                        </div>
                <SysMonitorNavDeskLink />
                    </div>
                </div>

            </nav>

            {/* Mobile Controls Drawer Block */}
            {isMenuOpen && (
                <>
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-40 md:hidden" onClick={() => setIsMenuOpen(false)} />
                    <div
                        ref={navRef}
                        className="fixed top-0 right-0 h-full w-72 bg-[#050811] border-l border-slate-900 font-mono shadow-xl z-50 md:hidden flex flex-col justify-between overflow-y-auto"
                        style={{ animation: "slideInRight 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
                    >
                        <div>
                            <div className="flex justify-between items-center p-4 border-b border-slate-900">
                                <span className="text-xs font-black tracking-widest text-white uppercase">// MAIN_MENU</span>
                                <button onClick={() => setIsMenuOpen(false)} className="p-1.5 border border-slate-900 hover:border-slate-800 rounded-sm text-slate-400">
                                    <X size={14} />
                                </button>
                            </div>

                            <div className="p-3 space-y-1">
                                {navItems.map((item) =>
                                    isLinkItem(item) ? (
                                        <Link
                                            key={item}
                                            href={`/${item}`}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-xs font-bold uppercase tracking-wider block w-full text-left px-3 py-2.5 text-slate-400 hover:text-white hover:bg-slate-950 border border-transparent hover:border-slate-900 rounded-sm transition-colors"
                                        >
                                            {formatDisplayText(item)}
                                        </Link>
                                    ) : (
                                        <button
                                            key={item}
                                            onClick={() => { scrollToSection(item); setIsMenuOpen(false); }}
                                            className="text-xs font-bold uppercase tracking-wider block w-full text-left px-3 py-2.5 text-slate-400 hover:text-white hover:bg-slate-950 border border-transparent hover:border-slate-900 rounded-sm transition-colors cursor-pointer"
                                        >
                                            {item}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="p-4 border-t border-slate-900 bg-slate-950/50 space-y-3">
                            <div className="text-[11px] text-slate-500 font-sans leading-relaxed border-l-2 border-cyan-500 pl-2">
                                <strong>System Notice:</strong> Distributed commercial interfaces are deploying operational assets continuously.<strong> Secure connectivity profiles now.</strong>
                            </div>
                            <Link
                                href="/bc/contact"
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-center w-full bg-slate-900 border border-slate-800 hover:border-cyan-500/30 hover:text-cyan-400 text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-sm transition-all"
                            >
                                INITIALIZE_ENGAGEMENT()
                            </Link>
                        </div>
                    </div>

                    <style jsx>{`
                        @keyframes slideInRight {
                            from { transform: translateX(100%); }
                            to { transform: translateX(0); }
                        }
                    `}</style>
                </>
            )}

            {/* Full Screen Desktop Mega Dropdown System - Utilities Router */}
            {isJobOpen && (
                <div ref={jobRef} className="hidden md:block fixed inset-x-0 top-16 bg-[#fff]/98 backdrop-blur-md border-b border-slate-900 z-40 font-mono shadow-xl animate-none">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="mb-6 border-b border-slate-900 pb-4 flex items-center justify-between">
                            <div className="space-y-1">
                                <h2 className="text-sm font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                                    <Terminal size={12} className="text-cyan-400" /> SYS_UTILITIES_ROUTER // CONFIG
                                </h2>
                                <p className="text-xs text-slate-500 font-sans">
                                    Execute data bridges to integrated application routing networks and automation runtimes.
                                </p>
                            </div>
                            <button onClick={() => setIsJobOpen(false)} className="text-[10px] font-bold text-slate-500 border border-slate-900 px-2 py-1 hover:border-slate-800 rounded-sm">CLOSE_X()</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {jobOptions.map((job, index) => (
                                <JobCard key={index} job={job} onClick={() => setIsJobOpen(false)} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Full Screen Desktop Mega Dropdown System - Telemetry Feed */}
            {isNewsOpen && (
                <div ref={newsRef} className="hidden md:block fixed inset-x-0 top-16 bg-white backdrop-blur-md border-b border-slate-900 z-40 font-mono shadow-xl">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="mb-6 border-b border-slate-900 pb-4 flex items-center justify-between">
                            <div className="space-y-1">
                                <h2 className="text-sm font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                                    <Terminal size={12} className="text-cyan-400" /> DATA_TELEMETRY_STREAM // SYSTEM_LOGS
                                </h2>
                                <p className="text-xs text-slate-500 font-sans">
                                    Monitor system environment parameters, automation indexes, and structural global industry metrics.
                                </p>
                            </div>
                            <button onClick={() => setIsNewsOpen(false)} className="text-[10px] font-bold text-slate-500 border border-slate-900 px-2 py-1 hover:border-slate-800 rounded-sm">CLOSE_X()</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {newsOptions.map((news, index) => (
                                <NewsCard key={index} news={news} onClick={() => setIsNewsOpen(false)} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Full Screen Mobile Dropdown Panels */}
            {isJobOpenMobile && (
                <>
                    <div className="md:hidden fixed inset-0 bg-black/70 z-40" style={{ top: "64px" }} onClick={() => setIsJobOpenMobile(false)} />
                    <div className="md:hidden fixed left-0 right-0 bg-[#050811] border-b border-slate-900 overflow-y-auto z-40 font-mono shadow-xl max-h-[calc(100vh-64px)]" style={{ top: "64px" }}>
                        <div className="px-4 py-6 space-y-4">
                            <div className="border-b border-slate-900 pb-2">
                                <h2 className="text-xs font-black text-white uppercase tracking-widest">// SYS_UTILITIES</h2>
                            </div>
                            <div className="space-y-3">
                                {jobOptions.map((job, index) => (
                                    <JobCard key={index} job={job} onClick={() => setIsJobOpenMobile(false)} />
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {isNewsOpenMobile && (
                <>
                    <div className="md:hidden fixed inset-0 bg-black/70 z-40" style={{ top: "64px" }} onClick={() => setIsNewsOpenMobile(false)} />
                    <div className="md:hidden fixed left-0 right-0 bg-[#050811] border-b border-slate-900 overflow-y-auto z-40 font-mono shadow-xl max-h-[calc(100vh-64px)]" style={{ top: "64px" }}>
                        <div className="px-4 py-6 space-y-4">
                            <div className="border-b border-slate-900 pb-2">
                                <h2 className="text-xs font-black text-white uppercase tracking-widest">// DATA_TELEMETRY</h2>
                            </div>
                            <div className="space-y-3">
                                {newsOptions.map((news, index) => (
                                    <NewsCard key={index} news={news} onClick={() => setIsNewsOpenMobile(false)} />
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}