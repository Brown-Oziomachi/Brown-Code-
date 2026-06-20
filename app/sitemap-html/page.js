"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Network, Terminal, Compass, Globe, Binary, ArrowLeft, Activity } from "lucide-react";
import Footer from "@/components/footer";

// Simulated fetch layer for production blog nodes
const getBlogSlugs = async () => {
    return [
        "why-business-owners-need-websites",
        "how-users-help-ai-companies-make-billions",
        "importance-of-a-personal-portfolio",
        "why-branding-matters-online",
        "future-proofing-your-career-online",
        "cost-of-neglect-website-maintenance",
        "how-to-build-your-first-website",
        "seo-fundamentals-getting-found",
        "content-marketing-personal-brands",
    ];
};

export default function SitemapPage() {
    // Divided structurally to protect user navigation flows
    const corePages = [
        { name: "Home Node", href: "/portfolio" },
        { name: "About Developer", href: "/bc/about" },
        { name: "Technical Log (Blog)", href: "/blog" },
        { name: "Contact Secure", href: "/bc/contact" },
        { name: "Career Openings (Jobs)", href: "/jobs" },
        { name: "Production Projects", href: "/bc/projects" },
        { name: "Forensic Scam Checker", href: "/client/scam-checker" },
        { name: "Curriculum Vitae (CV)", href: "/cv/pdf" },
    ];

    const seoNodes = [
        { name: "Hire Web Developer — Abuja", href: "/brown-code/hire-web-developer-abuja" },
        { name: "Cheap Web Developer — Nigeria", href: "/brown-code/cheap-web-developer-in-nigeria" },
        { name: "Software Developer — Nigeria", href: "/brown-code/software-developer-nigeria" },
        { name: "Software Developer — Africa", href: "/brown-code/software-developer-africa" },
        { name: "Web Developer — Abuja", href: "/brown-code/web-developer-abuja" },
        { name: "Web Developer — Nigeria", href: "/brown-code/web-developer-nigeria" },
    ];

    const [blogSlugs, setBlogSlugs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSlugs() {
            try {
                const slugs = await getBlogSlugs();
                setBlogSlugs(slugs);
            } catch (err) {
                console.error("Sitemap alignment sync failure", err);
            } finally {
                setLoading(false);
            }
        }
        fetchSlugs();
    }, []);

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
                <p className="font-sans text-xs font-semibold uppercase tracking-widest text-cyan-400">
                    Loading bc Portfolio
                </p>
            </div>
        );
    }
    return (
        <>
             <nav className="relative z-10 border-b border-slate-800/80 bg-[#090d16]/80 backdrop-blur-md sticky top-0 z-[9999]">
                            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-3 group">
                        <Terminal size={18} className="text-cyan-400 group-hover:rotate-6 transition-transform" />
                                    <a href="/">
                                        <span className="text-sm font-bold text-white tracking-wider uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                                BROWN_CODE_DEV // system_tree
                                        </span>
                                    </a>
                                </div>
                                <a
                                    href="/"
                                    className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-950/80 transition-all duration-300 shadow-sm hover:shadow-cyan-500/5"
                                >
                                    <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                        <span>SYS.INDEX()</span>
                                </a>
                            </div>
            </nav>
            
        <main className="min-h-screen bg-[#0b0b0f] text-slate-100 antialiased py-24 px-4 md:px-6 relative font-mono selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden">
            {/* Top Concentrated Subtle Cyan Laser Backlight Blur Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none select-none"></div>

            <div className="max-w-7xl mx-auto">

                {/* Application Architecture Header Meta Section */}
                <header className="relative w-full rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-md overflow-hidden p-6 md:p-10 shadow-2xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none hidden md:block">
                        <Binary size={180} />
                    </div>

                    <div className="relative z-10 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 text-cyan-400 text-xs px-4 py-1.5 rounded-md tracking-wider uppercase mb-4">
                            <Network size={14} className="animate-pulse" />
                            system_tree // route_manifest
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                            DIRECTORY_<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">INDEX</span>
                        </h1>
                    </div>

                    <p className="relative z-10 text-xs text-slate-400 max-w-xs text-center md:text-right leading-relaxed font-sans">
                        Automated structural mapping pipelines indexing all available endpoint records, core platform nodes, and localized optimization routing footprints.
                    </p>
                </header>

                {/* THE SYSTEM GRID PACKET OVERVIEW */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">

                    {/* Block A: Core Platform System Elements */}
                    <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-5 space-y-4 shadow-xl hover:border-slate-800/80 transition-colors duration-300">
                        <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
                            <Compass size={16} className="text-cyan-400" />
                            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                                CORE_NAVIGATION()
                            </h3>
                        </div>
                        <ul className="space-y-0.5 text-xs">
                            {corePages.map((page, i) => (
                                <li key={i}>
                                    <Link
                                        href={page.href}
                                        className="flex items-center gap-2 px-2 py-2 rounded-md text-slate-400 hover:text-cyan-400 hover:bg-slate-950 transition-all duration-200 group"
                                    >
                                        <span className="text-slate-700 group-hover:text-cyan-500/50 text-[10px] transition-colors">
                                            └─
                                        </span>
                                        {/* Dynamic accent color swap if it detects our status tracker node item */}
                                        <span className={page.href === "/status" ? "text-cyan-400 font-bold flex items-center gap-1.5" : ""}>
                                            {page.href === "/status" && <Activity size={11} className="animate-pulse text-cyan-400" />}
                                            {page.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Block B: Technical Platform Journals (Dynamic Slugs Layer) */}
                    <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-5 space-y-4 shadow-xl hover:border-slate-800/80 transition-colors duration-300">
                        <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
                            <Terminal size={16} className="text-emerald-400" />
                            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                                DOCUMENTATION_LOGS
                            </h3>
                        </div>
                        <ul className="space-y-0.5 text-xs">
                            {loading ? (
                                <li className="text-slate-600 text-center py-8 text-[11px] italic">
                                    Compiling map records...
                                </li>
                            ) : blogSlugs.length === 0 ? (
                                <li className="text-slate-600 text-center py-8 text-[11px]">
                                    ERR_NO_ENTRIES_INDEXED
                                </li>
                            ) : (
                                blogSlugs.map((slug, i) => (
                                    <li key={`blog-${i}`}>
                                        <Link
                                            href={`/blog/${slug}`}
                                            className="flex items-start gap-2 px-2 py-2 rounded-md text-slate-400 hover:text-emerald-400 hover:bg-slate-950 transition-all duration-200 group"
                                        >
                                            <span className="text-slate-700 group-hover:text-emerald-500/50 text-[10px] mt-0.5 shrink-0">
                                                ✦
                                            </span>
                                            <span className="capitalize truncate">
                                                {slug.replace(/-/g, " ")}
                                            </span>
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    {/* Block C: Regional Targeting SEO Routing Array Map */}
                    <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-5 space-y-4 shadow-xl hover:border-slate-800/80 transition-colors duration-300 md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
                            <Globe size={16} className="text-blue-400" />
                            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                                GEOLOCATION_NODES
                            </h3>
                        </div>
                        <ul className="space-y-0.5 text-xs">
                            {seoNodes.map((page, i) => (
                                <li key={i}>
                                    <Link
                                        href={page.href}
                                        className="flex items-center gap-2 px-2 py-2 rounded-md text-slate-400 hover:text-blue-400 hover:bg-slate-950 transition-all duration-200 group"
                                    >
                                        <span className="text-slate-700 group-hover:text-blue-500/50 text-[10px] transition-colors">
                                            ::
                                        </span>
                                        <span className="truncate">{page.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Main Control Alignment Matrix back navigation */}
                <div className="flex flex-col sm:flex-row items-center justify-start gap-4 mb-12">
                    <Link
                        href="/portfolio"
                        className="w-full sm:w-auto group flex items-center justify-center gap-2 px-6 py-3 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-200 rounded-md text-xs uppercase tracking-wider"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        RETURN_TO_BASE
                    </Link>
                </div>

            </div>
            <Footer />
            </main>
        </>
    );
}