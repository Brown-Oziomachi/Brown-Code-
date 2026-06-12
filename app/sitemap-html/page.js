"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Network, Terminal, FileText, Compass, Globe } from "lucide-react";
import Footer from "@/components/footer";

// Simulated fetch layer for production blog nodes
const getBlogSlugs = async () => {
    return [
        "why-you-need-a-website",
        "importance-of-a-personal-portfolio",
        "why-branding-matters-online",
        "future-proofing-your-career-online",
    ];
};

export default function SitemapPage() {
    // Divided structurally to protect user navigation flows
    const corePages = [
        { name: "Home Node", href: "/portfolio" },
        { name: "About Developer", href: "/about" },
        { name: "Technical Log (Blog)", href: "/blog" },
        { name: "Contact Secure", href: "/contact" },
        { name: "Career Openings (Jobs)", href: "/jobs" },
        { name: "Production Projects", href: "/projects" },
        { name: "Forensic Scam Checker", href: "/scam-checker" },
        { name: "Curriculum Vitae (CV)", href: "/cv" },
    ];

    const seoNodes = [
        { name: "Hire Web Developer — Abuja", href: "/brown-code/hire-web-developer-abuja" },
        { name: "Cheap Web Developer — Nigeria", href: "/brown-code/cheap-web-developer-in-nigeria" },
        { name: "Software Developer — Nigeria", href: "/brown-code/software-developer-nigeria" },
        { name: "Software Developer — Africa", href: "/brown-code/software-developer-africa" },
        { name: "Web Developer — Abuja", href: "/brown-code/web-developer-abuja" }, // Fixed: Prefixed leading missing forward slash
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

    return (
        <main className="min-h-screen bg-[#0b0b0f] text-[#f8f8ff] antialiased py-24 px-6 relative selection:bg-[#7c3aed] selection:text-[#f8f8ff]">
            {/* Top Concentrated Subtle Purple Laser Backlight Blur Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-[#7c3aed]/10 rounded-full blur-[120px] pointer-events-none select-none"></div>

            <div className="max-w-5xl mx-auto">

                {/* Application Architecture Header Meta Section */}
                <header className="border-b border-[rgba(248,248,255,.06)] pb-8 mb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 bg-[#a3e635]/10 border border-[#a3e635]/20 rounded-full px-3 py-1 text-xs font-mono text-[#a3e635]">
                            <Network size={12} /> // System.Map_Tree
                        </div>
                        <h1 className="text-3xl font-black tracking-tight mt-2">
                            Directory Index Map
                        </h1>
                    </div>
                    <p className="text-xs font-mono text-[rgba(248,248,255,.35)] max-w-xs text-center md:text-right leading-relaxed">
                        Automated directory maps indexing core endpoints, platform insights, and localized routing paths.
                    </p>
                </header>

                {/* THE SYSTEM GRID PACKET OVERVIEW */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Block A: Core Platform System Elements */}
                    <div className="bg-[#111116] border border-[rgba(248,248,255,.04)] rounded-2xl p-5 space-y-4 shadow-xl">
                        <div className="flex items-center gap-2 border-b border-[rgba(248,248,255,.04)] pb-2.5">
                            <Compass size={16} className="text-[#a3e635]" />
                            <h3 className="text-xs font-mono font-black uppercase tracking-wider text-[rgba(248,248,255,.8)]">
                                Core Navigation
                            </h3>
                        </div>
                        <ul className="space-y-1 font-mono text-xs">
                            {corePages.map((page, i) => (
                                <li key={i}>
                                    <Link
                                        href={page.href}
                                        className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-[rgba(248,248,255,.55)] hover:text-[#f8f8ff] hover:bg-[rgba(248,248,255,.03)] transition-all group"
                                    >
                                        <span className="text-[rgba(248,248,255,.2)] group-hover:text-[#a3e635] text-[10px] transition-colors">
                                            └─
                                        </span>
                                        {page.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Block B: Technical Platform Journals (Dynamic Slugs Layer) */}
                    <div className="bg-[#111116] border border-[rgba(248,248,255,.04)] rounded-2xl p-5 space-y-4 shadow-xl">
                        <div className="flex items-center gap-2 border-b border-[rgba(248,248,255,.04)] pb-2.5">
                            <Terminal size={16} className="text-[#a855f7]" />
                            <h3 className="text-xs font-mono font-black uppercase tracking-wider text-[rgba(248,248,255,.8)]">
                                Documentation Logs
                            </h3>
                        </div>
                        <ul className="space-y-1 font-mono text-xs">
                            {loading ? (
                                <li className="text-[rgba(248,248,255,.3)] text-center py-6 text-[11px] italic">
                                    Compiling log paths...
                                </li>
                            ) : blogSlugs.length === 0 ? (
                                <li className="text-[rgba(248,248,255,.3)] text-center py-6 text-[11px]">
                                    No entries indexed.
                                </li>
                            ) : (
                                blogSlugs.map((slug, i) => (
                                    <li key={`blog-${i}`}>
                                        <Link
                                            href={`/blog/${slug}`}
                                            className="flex items-start gap-2 px-2.5 py-2 rounded-lg text-[rgba(248,248,255,.55)] hover:text-[#f8f8ff] hover:bg-[rgba(248,248,255,.03)] transition-all group"
                                        >
                                            <span className="text-[rgba(248,248,255,.2)] group-hover:text-[#a855f7] text-[10px] mt-0.5 shrink-0">
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
                    <div className="bg-[#111116] border border-[rgba(248,248,255,.04)] rounded-2xl p-5 space-y-4 shadow-xl">
                        <div className="flex items-center gap-2 border-b border-[rgba(248,248,255,.04)] pb-2.5">
                            <Globe size={16} className="text-cyan-400" />
                            <h3 className="text-xs font-mono font-black uppercase tracking-wider text-[rgba(248,248,255,.8)]">
                                Geolocation Nodes
                            </h3>
                        </div>
                        <ul className="space-y-1 font-mono text-xs">
                            {seoNodes.map((page, i) => (
                                <li key={i}>
                                    <Link
                                        href={page.href}
                                        className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-[rgba(248,248,255,.55)] hover:text-[#f8f8ff] hover:bg-[rgba(248,248,255,.03)] transition-all group"
                                    >
                                        <span className="text-[rgba(248,248,255,.2)] group-hover:text-cyan-400 text-[10px] transition-colors">
                                            ::
                                        </span>
                                        <span className="truncate">{page.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

               <Footer />

            </div>
        </main>
    );
}