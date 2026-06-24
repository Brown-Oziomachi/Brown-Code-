"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
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
        description: "Enterprise news platform featuring real-time content delivery, advanced filtering algorithms, and multimedia integration with optimised video streaming.",
        image: "/the.jpg",
        link: "https://www.thecyclopedia.com.ng",
        tags: ["Next.js", "React Architecture", "Video Streams"],
        year: "2024",
        role: "FULL_STACK_DEV",
        status: "LIVE",
    },
    {
        id: "SYS_NODE_02",
        title: "E-Commerce Store / Yotapoint",
        description: "Scalable e-commerce solution with secure payment integration, inventory management system, and comprehensive admin dashboard.",
        image: "/yota.jpg",
        link: "https://yotapoint.com",
        tags: ["E-Commerce", "Payment Sockets", "Admin Schema"],
        year: "2024",
        role: "LEAD_ENGINEER",
        status: "LIVE",
    },
    {
        id: "SYS_NODE_03",
        title: "IJ Stitches Portfolio",
        description: "Performance-optimised portfolio with advanced animations, accessibility compliance, and responsive design architecture.",
        image: "/ijs.jpg",
        link: "https://ij-stitches.vercel.app/main",
        tags: ["React Engine", "GSAP Hooks", "Asset Optimisation"],
        year: "2024",
        role: "FRONTEND_ARCHITECT",
        status: "OPTIMISED",
    },
    {
        id: "SYS_NODE_04",
        title: "Portfolio Website",
        description: "Modern portfolio solution with dynamic content management, SEO optimisation, and analytics integration.",
        image: "/cd.jpg",
        link: "https://browncode.name.ng",
        tags: ["Next.js", "Pure JS Engine", "SEO"],
        year: "2024",
        role: "FULL_STACK_DEV",
        status: "PRODUCTION",
    },
    {
        id: "SYS_NODE_05",
        title: "Cyclopedia Editor App",
        description: "Content management system with rich text editing, collaborative features, and version control for editorial workflows.",
        image: "/ed.jpg",
        link: null,
        tags: ["CMS Infrastructure", "Real-time Sync", "Workflow Pipeline"],
        year: "2024",
        role: "TECHNICAL_LEAD",
        status: "NDA_LOCKED",
    },
];

const STATS = [
    { label: "INDEXED_BUILDS", value: `0${projects.length}`, desc: "Active modules", icon: <Layers size={14} /> },
    { label: "SUCCESS_RATIO", value: "100%", desc: "Deployment status", icon: <Binary size={14} /> },
    { label: "YEARS_ACTIVE", value: "02+", desc: "Years validated", icon: <Cpu size={14} /> },
    { label: "UPTIME", value: "24/7", desc: "Service continuity", icon: <Activity size={14} /> },
];

export default function ProjectsPage() {
    const router = useRouter();

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

                .pj-page {
                    font-family: var(--font-sans);
                    background: var(--bg);
                    color: var(--text-1);
                    min-height: 100vh;
                }

                /* ── Nav ── */
                .pj-nav {
                    position: sticky; top: 0; z-index: 100;
                    background: rgba(10,10,11,0.92);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid var(--border);
                    padding: 0 24px; height: 56px;
                    display: flex; align-items: center; justify-content: space-between;
                }
                .pj-nav__brand {
                    font-family: var(--font-mono); font-size: 12px; font-weight: 500;
                    letter-spacing: 0.08em; color: var(--text-1); text-decoration: none;
                }
                .pj-nav__brand em { font-style: normal; color: var(--accent); }
                .pj-nav__back {
                    display: inline-flex; align-items: center; gap: 6px;
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    color: var(--text-2); text-decoration: none;
                    padding: 6px 12px; border: 1px solid var(--border); border-radius: var(--radius);
                    transition: color .15s, border-color .15s, background .15s;
                }
                .pj-nav__back:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }

                /* ── Main ── */
                .pj-main { max-width: 1200px; margin: 0 auto; padding: 0 24px 80px; }

                /* ── Masthead ── */
                .pj-masthead {
                    display: flex; align-items: flex-end; justify-content: space-between;
                    gap: 16px; padding: 52px 0 32px;
                    border-bottom: 1px solid var(--border); margin-bottom: 36px;
                }
                .pj-masthead__eyebrow {
                    font-family: var(--font-mono); font-size: 11px; color: var(--accent);
                    letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px;
                }
                .pj-masthead__title {
                    font-family: var(--font-serif);
                    font-size: clamp(36px, 5vw, 60px); font-weight: 400; line-height: 1.05;
                }
                .pj-masthead__desc {
                    font-size: 13px; color: var(--text-2); line-height: 1.6;
                    max-width: 320px; text-align: right;
                }
                @media (max-width: 700px) {
                    .pj-masthead { flex-direction: column; align-items: flex-start; }
                    .pj-masthead__desc { text-align: left; }
                }

                /* ── Section label ── */
                .pj-section-label {
                    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em;
                    text-transform: uppercase; color: var(--text-3);
                    display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
                }
                .pj-section-label::after {
                    content: ''; flex: 1; height: 1px; background: var(--border);
                }

                /* ── Stats grid ── */
                .pj-stats {
                    display: grid; grid-template-columns: repeat(4, 1fr);
                    gap: 1px; background: var(--border);
                    border: 1px solid var(--border); border-radius: var(--radius);
                    overflow: hidden; margin-bottom: 48px;
                }
                @media (max-width: 700px) { .pj-stats { grid-template-columns: 1fr 1fr; } }

                .pj-stat {
                    background: var(--surface); padding: 20px 24px;
                    display: flex; flex-direction: column; gap: 4px;
                    transition: background .15s;
                }
                .pj-stat:hover { background: #141417; }
                .pj-stat__label {
                    font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.12em;
                    text-transform: uppercase; color: var(--text-3);
                }
                .pj-stat__value {
                    font-family: var(--font-serif); font-size: 32px; font-weight: 400;
                    color: var(--text-1); line-height: 1;
                }
                .pj-stat__desc { font-size: 11px; color: var(--text-3); margin-top: 2px; }

                /* ── Project cards ── */
                .pj-list { display: flex; flex-direction: column; gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; margin-bottom: 48px; }

                .pj-card {
                    display: grid; grid-template-columns: 280px 1fr;
                    background: var(--surface); overflow: hidden;
                    position: relative; transition: background .15s;
                }
                .pj-card:hover { background: #141417; }
                .pj-card::before {
                    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
                    background: var(--accent); transform: scaleY(0); transform-origin: bottom;
                    transition: transform .2s ease; z-index: 5;
                }
                .pj-card:hover::before { transform: scaleY(1); }

                @media (max-width: 800px) { .pj-card { grid-template-columns: 1fr; } }

                .pj-card__img-wrap {
                    position: relative; height: 220px; background: var(--bg); overflow: hidden;
                }
                @media (max-width: 800px) { .pj-card__img-wrap { height: 180px; } }

                .pj-card__img {
                    width: 100%; height: 100%; object-fit: cover;
                    opacity: 0.4; filter: grayscale(30%);
                    transition: opacity .3s, transform .4s, filter .3s;
                }
                .pj-card:hover .pj-card__img { opacity: 0.7; transform: scale(1.03); filter: grayscale(0); }

                .pj-card__img-placeholder {
                    width: 100%; height: 100%;
                    background: repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.015) 8px, rgba(255,255,255,0.015) 16px);
                }

                .pj-card__id {
                    position: absolute; top: 12px; left: 12px;
                    font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em;
                    color: var(--text-3); background: rgba(10,10,11,0.85);
                    padding: 4px 8px; border: 1px solid var(--border); border-radius: 3px;
                }

                .pj-card__body {
                    padding: 24px 28px; display: flex; flex-direction: column; justify-content: space-between; gap: 16px;
                }

                .pj-card__meta {
                    display: flex; flex-wrap: wrap; gap: 16px;
                    font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em;
                    text-transform: uppercase; color: var(--text-3);
                    border-bottom: 1px solid var(--border); padding-bottom: 14px;
                }
                .pj-card__meta span { color: var(--text-2); }
                .pj-card__meta-live { color: var(--accent) !important; }
                .pj-card__meta-locked { color: #f59e0b !important; }

                .pj-card__title {
                    font-family: var(--font-serif);
                    font-size: clamp(18px, 2vw, 22px); font-weight: 400; line-height: 1.25;
                    color: var(--text-1); transition: color .15s;
                }
                .pj-card:hover .pj-card__title { color: #fff; }

                .pj-card__desc {
                    font-size: 13px; color: var(--text-2); line-height: 1.6; margin-top: 6px;
                }

                .pj-card__footer {
                    display: flex; align-items: center; justify-content: space-between;
                    flex-wrap: wrap; gap: 12px; padding-top: 14px; border-top: 1px solid var(--border);
                }

                .pj-tags { display: flex; flex-wrap: wrap; gap: 6px; }
                .pj-tag {
                    font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.08em;
                    text-transform: uppercase; padding: 3px 8px; border-radius: 3px;
                    background: var(--accent-dim); color: var(--accent);
                    border: 1px solid rgba(232,255,71,0.2); line-height: 1;
                }

                .pj-btn {
                    display: inline-flex; align-items: center; gap: 6px;
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    padding: 8px 16px; border: 1px solid var(--border); border-radius: var(--radius);
                    background: transparent; color: var(--text-2);
                    text-decoration: none; cursor: pointer;
                    transition: color .15s, border-color .15s, background .15s;
                }
                .pj-btn:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }
                .pj-btn--accent {
                    border-color: rgba(232,255,71,0.3); color: var(--accent); background: var(--accent-dim);
                }
                .pj-btn--accent:hover { background: rgba(232,255,71,0.15); border-color: rgba(232,255,71,0.5); color: var(--accent); }
                .pj-btn--locked {
                    border-color: rgba(245,158,11,0.2); color: #78716c; background: transparent; cursor: not-allowed;
                }

                /* ── CTA ── */
                .pj-cta {
                    border: 1px solid var(--border); border-radius: var(--radius);
                    background: var(--surface); padding: 40px;
                    text-align: center; position: relative; overflow: hidden;
                }
                .pj-cta::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--accent); }
                .pj-cta__title {
                    font-family: var(--font-serif); font-size: 28px; font-weight: 400;
                    color: var(--text-1); margin-bottom: 10px;
                }
                .pj-cta__desc { font-size: 13px; color: var(--text-2); line-height: 1.6; max-width: 400px; margin: 0 auto 24px; }

                /* ── Footer row ── */
                .pj-footer {
                    display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
                    gap: 12px; padding-top: 40px; margin-top: 48px; border-top: 1px solid var(--border);
                }
                .pj-footer__info { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); letter-spacing: 0.06em; }
            `}</style>

            <div className="pj-page">
                {/* Nav */}
                <nav className="pj-nav">
                    <a href="/" className="pj-nav__brand">brown<em>.</em>dev</a>
                    <a href="/portfolio" className="pj-nav__back">
                        <ArrowLeft size={13} /> Portfolio
                    </a>
                </nav>

                <main className="pj-main">
                    {/* Masthead */}
                    <header className="pj-masthead">
                        <div>
                            <p className="pj-masthead__eyebrow">Work</p>
                            <h1 className="pj-masthead__title">
                                Production<br />Deployments
                            </h1>
                        </div>
                        <p className="pj-masthead__desc">
                            Shipped systems, live platforms, and production-grade builds across the stack.
                        </p>
                    </header>

                    {/* Stats */}
                    <p className="pj-section-label">Metrics</p>
                    <div className="pj-stats">
                        {STATS.map((s, i) => (
                            <div key={i} className="pj-stat">
                                <span className="pj-stat__label">{s.label}</span>
                                <span className="pj-stat__value">{s.value}</span>
                                <span className="pj-stat__desc">{s.desc}</span>
                            </div>
                        ))}
                    </div>

                    {/* Projects */}
                    <p className="pj-section-label">All projects</p>
                    <div className="pj-list">
                        {projects.map((p, i) => (
                            <article key={p.id} className="pj-card">
                                <div className="pj-card__img-wrap">
                                    {p.image
                                        ? <img src={p.image} alt={p.title} className="pj-card__img" onError={e => e.target.style.display = "none"} />
                                        : <div className="pj-card__img-placeholder" />
                                    }
                                    <span className="pj-card__id">{p.id} // #{String(i + 1).padStart(2, "0")}</span>
                                </div>
                                <div className="pj-card__body">
                                    <div>
                                        <div className="pj-card__meta">
                                            <span>Role: <span>{p.role}</span></span>
                                            <span>Year: <span>{p.year}</span></span>
                                            <span>Status: <span className={p.link ? "pj-card__meta-live" : "pj-card__meta-locked"}>[{p.status}]</span></span>
                                        </div>
                                        <h2 className="pj-card__title">{p.title}</h2>
                                        <p className="pj-card__desc">{p.description}</p>
                                    </div>
                                    <div className="pj-card__footer">
                                        <div className="pj-tags">
                                            {p.tags.map(t => <span key={t} className="pj-tag">{t}</span>)}
                                        </div>
                                        {p.link
                                            ? <a href={p.link} target="_blank" rel="noopener noreferrer" className="pj-btn">
                                                View live <ExternalLink size={12} />
                                            </a>
                                            : <span className="pj-btn pj-btn--locked">
                                                <Lock size={12} /> NDA restricted
                                            </span>
                                        }
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="pj-cta">
                        <h2 className="pj-cta__title">Start a project</h2>
                        <p className="pj-cta__desc">
                            Channels are open for contract work, system builds, and remote collaborations.
                        </p>
                        <Link href="/bc/contact" className="pj-btn pj-btn--accent">
                            Get in touch
                        </Link>
                    </div>

                    {/* Footer row */}
                    <footer className="pj-footer">
                        <span className="pj-footer__info">brown.dev — production deployments</span>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button className="pj-btn" onClick={() => router.push("/portfolio")}>
                                <ArrowLeft size={13} /> Portfolio
                            </button>
                        </div>
                    </footer>
                </main>
            </div>
            <Footer />
        </>
    );
}