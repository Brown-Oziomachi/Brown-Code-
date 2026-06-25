"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Network, Terminal, Compass, Globe, ArrowLeft, ArrowRight, Activity } from "lucide-react";
import Footer from "@/components/footer";

const getBlogSlugs = async () => [
    "moving-from-social-media-to-digital-asset",
    "how-users-help-ai-companies-make-billions",
    "mastering-local-seo-for-startups",
    "power-of-ecommerce-global-sales",
    "building-trust-online-cro",
    "why-website-speed-matters",
    "smart-automation-business-autopilot",
    "cybersecurity-essentials-online-business",
    "content-marketing-winning-with-value",
];

const corePages = [
    { name: "Home", href: "/portfolio" },
    { name: "About", href: "/bc/about" },
    { name: "Blog", href: "/blog" },
    { name: "Tech-News", href: "/tech-news" },
    { name: "Contact", href: "/bc/contact" },
    { name: "Jobs", href: "/jobs" },
    { name: "Projects", href: "/bc/projects" },
    { name: "Scam Checker", href: "/client/scam-checker" },
    { name: "CV / Resume", href: "/cv" },
];

const seoNodes = [
    { name: "Hire Web Developer — Abuja", href: "/brown-code/hire-web-developer-abuja" },
    { name: "Cheap Web Developer — Nigeria", href: "/brown-code/cheap-web-developer-in-nigeria" },
    { name: "Software Developer — Nigeria", href: "/brown-code/software-developer-nigeria" },
    { name: "Software Developer — Africa", href: "/brown-code/software-developer-africa" },
    { name: "Web Developer — Abuja", href: "/brown-code/web-developer-abuja" },
    { name: "Web Developer — Nigeria", href: "/brown-code/web-developer-nigeria" },
];

export default function SitemapClient() {
    const [blogSlugs, setBlogSlugs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBlogSlugs()
            .then(setBlogSlugs)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div style={{
                minHeight: "100vh", background: "#0a0a0b",
                display: "flex", alignItems: "center", justifyContent: "center",
            }}>
                <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11, letterSpacing: "0.12em",
                    textTransform: "uppercase", color: "#52525b",
                }}>
                    Loading sitemap…
                </span>
            </div>
        );
    }

    const totalRoutes = corePages.length + blogSlugs.length + seoNodes.length;

    return (
        <>
            <style>{`
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                :root {
                    --bg:         #0a0a0b;
                    --surface:    #111113;
                    --border:     #1e1e22;
                    --border-hi:  #2e2e34;
                    --text-1:     #f4f4f5;
                    --text-2:     #a1a1aa;
                    --text-3:     #52525b;
                    --accent:     #e8ff47;
                    --accent-dim: rgba(232,255,71,0.08);
                    --radius:     6px;
                    --font-serif: 'DM Serif Display', 'Georgia', serif;
                    --font-sans:  'Inter', system-ui, sans-serif;
                    --font-mono:  'JetBrains Mono', 'Fira Code', monospace;
                }

                @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

                .sm-page {
                    font-family: var(--font-sans);
                    background: var(--bg);
                    color: var(--text-1);
                    min-height: 100vh;
                }

                /* ── Nav ── */
                .sm-nav {
                    position: sticky; top: 0; z-index: 100;
                    background: rgba(10,10,11,0.92);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid var(--border);
                    height: 56px; padding: 0 24px;
                    display: flex; align-items: center; justify-content: space-between;
                }
                .sm-nav__brand {
                    font-family: var(--font-mono); font-size: 12px; font-weight: 500;
                    letter-spacing: 0.08em; color: var(--text-1); text-decoration: none;
                }
                .sm-nav__brand em { font-style: normal; color: var(--accent); }
                .sm-nav__back {
                    display: inline-flex; align-items: center; gap: 6px;
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    color: var(--text-2); text-decoration: none;
                    padding: 6px 12px; border: 1px solid var(--border); border-radius: var(--radius);
                    transition: color .15s, border-color .15s, background .15s;
                }
                .sm-nav__back:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }

                /* ── Main ── */
                .sm-main { max-width: 1120px; margin: 0 auto; padding: 0 24px 80px; }

                /* ── Masthead ── */
                .sm-masthead {
                    display: flex; align-items: flex-end; justify-content: space-between;
                    gap: 16px; padding: 52px 0 32px;
                    border-bottom: 1px solid var(--border); margin-bottom: 36px;
                }
                .sm-masthead__eyebrow {
                    font-family: var(--font-mono); font-size: 11px; color: var(--accent);
                    letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px;
                }
                .sm-masthead__title {
                    font-family: var(--font-serif);
                    font-size: clamp(36px, 5vw, 60px); font-weight: 400; line-height: 1.05;
                    color: var(--text-1);
                }
                .sm-masthead__desc {
                    font-size: 13px; color: var(--text-2); line-height: 1.6;
                    max-width: 300px; text-align: right;
                }
                @media (max-width: 700px) {
                    .sm-masthead { flex-direction: column; align-items: flex-start; }
                    .sm-masthead__desc { text-align: left; }
                }

                /* ── Stats row ── */
                .sm-stats {
                    display: grid; grid-template-columns: repeat(3, 1fr);
                    gap: 1px; background: var(--border);
                    border: 1px solid var(--border); border-radius: var(--radius);
                    overflow: hidden; margin-bottom: 48px;
                }
                @media (max-width: 600px) { .sm-stats { grid-template-columns: 1fr; } }

                .sm-stat {
                    background: var(--surface); padding: 20px 24px;
                    display: flex; flex-direction: column; gap: 4px;
                    transition: background .15s;
                }
                .sm-stat:hover { background: #141417; }
                .sm-stat__label {
                    font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.12em;
                    text-transform: uppercase; color: var(--text-3);
                }
                .sm-stat__value {
                    font-family: var(--font-serif); font-size: 32px; font-weight: 400;
                    color: var(--text-1); line-height: 1;
                }
                .sm-stat__desc { font-size: 11px; color: var(--text-3); margin-top: 2px; }

                /* ── Section label ── */
                .sm-section-label {
                    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em;
                    text-transform: uppercase; color: var(--text-3);
                    display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
                }
                .sm-section-label::after {
                    content: ''; flex: 1; height: 1px; background: var(--border);
                }

                /* ── Three-column layout ── */
                .sm-columns {
                    display: grid; grid-template-columns: repeat(3, 1fr);
                    gap: 1px; background: var(--border);
                    border: 1px solid var(--border); border-radius: var(--radius);
                    overflow: hidden; margin-bottom: 48px;
                }
                @media (max-width: 860px) { .sm-columns { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 560px) { .sm-columns { grid-template-columns: 1fr; } }

                /* ── Column ── */
                .sm-col {
                    background: var(--surface);
                    display: flex; flex-direction: column;
                }
                .sm-col__header {
                    display: flex; align-items: center; gap: 8px;
                    padding: 14px 20px; border-bottom: 1px solid var(--border);
                    background: var(--bg);
                }
                .sm-col__icon { color: var(--accent); flex-shrink: 0; }
                .sm-col__title {
                    font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.12em;
                    text-transform: uppercase; color: var(--text-3); font-weight: 600;
                }
                .sm-col__count {
                    margin-left: auto;
                    font-family: var(--font-mono); font-size: 9px; color: var(--text-3);
                    background: var(--accent-dim); border: 1px solid rgba(232,255,71,0.15);
                    border-radius: 3px; padding: 2px 7px;
                }
                .sm-col__list { padding: 6px; flex: 1; }

                /* ── Link row ── */
                .sm-link {
                    display: flex; align-items: center; gap: 8px;
                    padding: 9px 12px; border-radius: 4px; text-decoration: none;
                    color: var(--text-2); font-size: 13px;
                    position: relative; transition: background .12s, color .12s;
                }
                .sm-link::before {
                    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
                    background: var(--accent); border-radius: 1px;
                    transform: scaleY(0); transform-origin: bottom;
                    transition: transform .15s ease;
                }
                .sm-link:hover { background: var(--bg); color: var(--text-1); }
                .sm-link:hover::before { transform: scaleY(1); }
                .sm-link:hover .sm-link__arrow { color: var(--accent); }
                .sm-link__text { flex: 1; }
                .sm-link__arrow { color: var(--text-3); flex-shrink: 0; transition: color .12s; }

                /* ── Blog slug row ── */
                .sm-slug {
                    display: flex; align-items: flex-start; gap: 8px;
                    padding: 9px 12px; border-radius: 4px; text-decoration: none;
                    color: var(--text-2); font-size: 12px;
                    position: relative; transition: background .12s, color .12s;
                }
                .sm-slug::before {
                    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
                    background: var(--accent); border-radius: 1px;
                    transform: scaleY(0); transform-origin: bottom;
                    transition: transform .15s ease;
                }
                .sm-slug:hover { background: var(--bg); color: var(--text-1); }
                .sm-slug:hover::before { transform: scaleY(1); }
                .sm-slug__bullet {
                    font-family: var(--font-mono); font-size: 9px; color: var(--text-3);
                    margin-top: 2px; flex-shrink: 0; transition: color .12s;
                }
                .sm-slug:hover .sm-slug__bullet { color: var(--accent); }

                /* ── Footer row ── */
                .sm-footer {
                    display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
                    gap: 12px; padding-top: 40px; margin-top: 48px; border-top: 1px solid var(--border);
                }
                .sm-footer__info {
                    font-family: var(--font-mono); font-size: 10px; color: var(--text-3); letter-spacing: 0.06em;
                }
                .sm-btn {
                    display: inline-flex; align-items: center; gap: 6px;
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    padding: 8px 16px; border: 1px solid var(--border); border-radius: var(--radius);
                    background: transparent; color: var(--text-2); text-decoration: none;
                    transition: color .15s, border-color .15s, background .15s;
                }
                .sm-btn:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }
                .sm-btn--accent {
                    border-color: rgba(232,255,71,0.3); color: var(--accent); background: var(--accent-dim);
                }
                .sm-btn--accent:hover { background: rgba(232,255,71,0.15); border-color: rgba(232,255,71,0.5); }
            `}</style>

            <div className="sm-page">
                {/* Nav */}
                <nav className="sm-nav">
                    <a href="/" className="sm-nav__brand">brown<em>.</em>dev</a>
                    <a href="/" className="sm-nav__back"><ArrowLeft size={13} /> Home</a>
                </nav>

                <main className="sm-main">
                    {/* Masthead */}
                    <header className="sm-masthead">
                        <div>
                            <p className="sm-masthead__eyebrow">Navigation</p>
                            <h1 className="sm-masthead__title">
                                Site<br />Directory
                            </h1>
                        </div>
                        <p className="sm-masthead__desc">
                            All pages, articles, and regional nodes — fully indexed and mapped.
                        </p>
                    </header>

                    {/* Stats */}
                    <div className="sm-stats">
                        <div className="sm-stat">
                            <span className="sm-stat__label">Core pages</span>
                            <span className="sm-stat__value">{String(corePages.length).padStart(2, "0")}</span>
                            <span className="sm-stat__desc">Primary navigation</span>
                        </div>
                        <div className="sm-stat">
                            <span className="sm-stat__label">Articles</span>
                            <span className="sm-stat__value">{String(blogSlugs.length).padStart(2, "0")}</span>
                            <span className="sm-stat__desc">Published blog posts</span>
                        </div>
                        <div className="sm-stat">
                            <span className="sm-stat__label">Total routes</span>
                            <span className="sm-stat__value">{String(totalRoutes).padStart(2, "0")}</span>
                            <span className="sm-stat__desc">Indexed across all nodes</span>
                        </div>
                    </div>

                    {/* Directory */}
                    <p className="sm-section-label">All routes</p>
                    <div className="sm-columns">

                        {/* Core pages */}
                        <div className="sm-col">
                            <div className="sm-col__header">
                                <Compass size={13} className="sm-col__icon" />
                                <span className="sm-col__title">Core navigation</span>
                                <span className="sm-col__count">{corePages.length}</span>
                            </div>
                            <div className="sm-col__list">
                                {corePages.map((p) => (
                                    <Link key={p.href} href={p.href} className="sm-link">
                                        <span className="sm-link__text">{p.name}</span>
                                        <ArrowRight size={11} className="sm-link__arrow" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Articles */}
                        <div className="sm-col">
                            <div className="sm-col__header">
                                <Terminal size={13} className="sm-col__icon" />
                                <span className="sm-col__title">Articles</span>
                                <span className="sm-col__count">{blogSlugs.length}</span>
                            </div>
                            <div className="sm-col__list">
                                {blogSlugs.length === 0 ? (
                                    <p style={{ padding: "16px 12px", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)" }}>
                                        No articles indexed.
                                    </p>
                                ) : blogSlugs.map((slug) => (
                                    <Link key={slug} href={`/blog/${slug}`} className="sm-slug">
                                        <span className="sm-slug__bullet">✦</span>
                                        <span style={{ textTransform: "capitalize" }}>
                                            {slug.replace(/-/g, " ")}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Regional SEO */}
                        <div className="sm-col">
                            <div className="sm-col__header">
                                <Globe size={13} className="sm-col__icon" />
                                <span className="sm-col__title">Regional pages</span>
                                <span className="sm-col__count">{seoNodes.length}</span>
                            </div>
                            <div className="sm-col__list">
                                {seoNodes.map((p) => (
                                    <Link key={p.href} href={p.href} className="sm-link">
                                        <span className="sm-link__text">{p.name}</span>
                                        <ArrowRight size={11} className="sm-link__arrow" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Footer row */}
                    <footer className="sm-footer">
                        <span className="sm-footer__info">brown.dev — site directory</span>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Link href="/bc/contact" className="sm-btn sm-btn--accent">Get in touch</Link>
                            <Link href="/portfolio" className="sm-btn"><ArrowLeft size={13} /> Portfolio</Link>
                        </div>
                    </footer>
                </main>

                <Footer />
            </div>
        </>
    );
}