"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock, Clock } from "lucide-react";
import Footer from "@/components/footer";

// state: "live" = has a public link, "dev" = still being built, "nda" = private work
const projects = [
    {
        id: "SYS_NODE_01",
        title: "Fraud Radar NG",
        description: "Nigerian fraud reporting and awareness platform. Includes a multi-step report wizard, threat registry lookup, domain safety quiz, verified agency contacts, rate limiting, suspicious-activity clustering and a protected admin console.",
        image: "/fraud.png",
        link: "https://fraudradarng.vercel.app",
        tags: ["Nuxt 4", "Firebase", "Nitro", "Vercel"],
        year: "2026",
        role: "FULL_STACK_DEV",
        status: "LIVE",
        state: "live",
    },
    {
        id: "SYS_NODE_02",
        title: "LAN Library",
        description: "Pan-African academic document marketplace. Sellers list books and documents and earn per sale, with wallets and withdrawals, Flutterwave payments, a bounty board, boosted listings, an admin panel and pricing in 30+ African currencies.",
        image: "/lan.png",
        link: "https://learningaccessnetwork.com",
        tags: ["Next.js", "Firebase", "Flutterwave", "Webhooks"],
        year: "2025",
        role: "FULL_STACK_DEV",
        status: "LIVE",
        state: "live",
    },
    {
        id: "SYS_NODE_03",
        title: "Cyclopedia News Website",
        description: "Enterprise news platform featuring real-time content delivery, advanced filtering algorithms, and multimedia integration with optimised video streaming.",
        image: "/the.jpg",
        link: "https://www.thecyclopedia.com.ng",
        tags: ["Next.js", "React Architecture", "Video Streams"],
        year: "2025",
        role: "FULL_STACK_DEV",
        status: "LIVE",
        state: "live",
    },
    {
        id: "SYS_NODE_04",
        title: "E-Commerce Store / Yotapoint",
        description: "Scalable e-commerce solution with secure payment integration, inventory management system, and comprehensive admin dashboard.",
        image: "/yota.jpg",
        link: "https://yotapoint.com",
        tags: ["E-Commerce", "Payment Sockets", "Admin Schema"],
        year: "2025",
        role: "DEV_COLLABRATOR",
        status: "LIVE",
        state: "live",
    },
    {
        id: "SYS_NODE_05",
        title: "IJ Stitches Portfolio",
        description: "Performance-optimised portfolio with advanced animations, accessibility compliance, and responsive design architecture.",
        image: "/ijs.jpg",
        link: "https://ij-stitches.vercel.app/main",
        tags: ["React Engine", "GSAP Hooks", "Asset Optimisation"],
        year: "2025",
        role: "FULL_STACK_DEV",
        status: "OPTIMISED",
        state: "live",
    },
    {
        id: "SYS_NODE_06",
        title: "browncode.name.ng Blog and Portfolio",
        description: "SEO-focused publishing platform and personal portfolio with dynamic sitemaps, IndexNow pings, newsletter signups, comments, a sponsored-article model and an automated image watermarking pipeline.",
        image: "/cd.jpg",
        link: "https://browncode.name.ng",
        tags: ["Next.js", "Firebase", "SEO", "Node.js"],
        year: "2024",
        role: "FULL_STACK_DEV",
        status: "PRODUCTION",
        state: "live",
    },
    {
        id: "SYS_NODE_07",
        title: "Sir Brown AD Studio",
        description: "Multi-page business showcase site with Home, Services, Pricing and Contact pages, built to present my work and rates to clients.",
        image: null,
        link: null,
        tags: ["Nuxt", "Vue 3", "Vercel"],
        year: "2026",
        role: "FULL_STACK_DEV",
        status: "IN_DEVELOPMENT",
        state: "dev",
    },
    {
        id: "SYS_NODE_08",
        title: "Cyclopedia Editor App",
        description: "Content management system with rich text editing, collaborative features, and version control for editorial workflows.",
        image: "/ed.jpg",
        link: null,
        tags: ["CMS Infrastructure", "Real-time Sync", "Workflow Pipeline"],
        year: "2025",
        role: "TECHNICAL_LEAD",
        status: "NDA_LOCKED",
        state: "nda",
    },
];

const STATS = [
    { label: "Indexed builds", value: String(projects.length).padStart(2, "0") },
    { label: "Deployment success", value: "100%" },
    { label: "Years active", value: "05+" },
    { label: "Service uptime", value: "24/7" },
];

export default function ProjectsPage() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

                .pj-page {
                    --paper: #ffffff; --paper-2: #f6f5f0; --card: #ffffff;
                    --ink: #111111; --ink-2: #3f3f3f; --ink-3: #6f6f6f;
                    --rule: #e4e2da; --rule-dark: #111111;
                    --accent: #e8ff47; --on-accent: #0a0a0b;
                    --green: #15803d; --amber: #b45309;
                    --serif: 'Playfair Display', Georgia, serif;
                    --sans: 'Inter', system-ui, sans-serif;
                    --mono: 'JetBrains Mono', 'Fira Code', monospace;
                    background: var(--paper); color: var(--ink); font-family: var(--sans); min-height: 100vh;
                }
                .pj-page *, .pj-page *::before, .pj-page *::after { box-sizing: border-box; }
                .pj-page h1, .pj-page h2, .pj-page h3, .pj-page p { margin: 0; padding: 0; }
                :where(.pj-page a) { color: inherit; text-decoration: none; }
                .pj-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }

                /* Nav */
                .pj-nav { position: sticky; top: 0; z-index: 1000; background: rgba(255,255,255,0.92); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); border-bottom: 1px solid var(--rule); }
                .pj-nav__inner { max-width: 1120px; margin: 0 auto; padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
                .pj-nav__brand { font-family: var(--serif); font-weight: 800; font-size: 21px; letter-spacing: -0.01em; }
                .pj-nav__brand em { font-style: normal; background: var(--accent); padding: 0 3px; }
                .pj-nav__links { display: flex; align-items: center; gap: 4px; }
                .pj-nav__link { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3); padding: 8px 12px; transition: color 0.15s; }
                .pj-nav__link:hover, .pj-nav__link--on { color: var(--ink); }
                .pj-nav__link--on { box-shadow: inset 0 -3px 0 var(--accent); }
                @media (max-width: 700px) { .pj-nav__hide { display: none; } }

                /* Buttons */
                .pj-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-family: var(--mono); font-size: 11.5px; letter-spacing: 0.06em; padding: 13px 20px; border: 1.5px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; transition: background 0.15s, color 0.15s, transform 0.15s; }
                .pj-btn:hover { background: var(--ink); color: #fff; transform: translateY(-1px); }
                .pj-btn--solid { background: var(--accent); color: var(--on-accent); font-weight: 600; }
                .pj-btn--solid:hover { background: var(--ink); color: var(--accent); }
                .pj-btn--sm { padding: 9px 14px; }
                .pj-btn--locked { border-color: var(--rule); color: var(--ink-3); background: var(--paper-2); cursor: not-allowed; }
                .pj-btn--locked:hover { background: var(--paper-2); color: var(--ink-3); transform: none; }

                /* Masthead */
                .pj-masthead { padding-top: 64px; display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
                .pj-kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 10px; }
                .pj-kicker b { background: var(--accent); color: var(--on-accent); padding: 2px 7px; font-weight: 500; }
                .pj-masthead__title { font-family: var(--serif); font-weight: 800; font-size: clamp(44px, 8vw, 96px); line-height: 0.98; letter-spacing: -0.03em; }
                .pj-masthead__title span { background: linear-gradient(transparent 64%, var(--accent) 64%); }
                .pj-masthead__desc { font-size: 15px; line-height: 1.7; font-weight: 300; color: var(--ink-2); max-width: 340px; }
                @media (max-width: 700px) { .pj-masthead { padding-top: 40px; } }

                /* Section heads */
                .pj-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding-top: 12px; border-top: 3px solid var(--rule-dark); margin: 64px 0 32px; }
                .pj-h2 { font-family: var(--serif); font-weight: 800; font-size: clamp(28px, 4vw, 40px); line-height: 1.1; letter-spacing: -0.01em; }
                .pj-head__note { font-size: 14px; line-height: 1.6; color: var(--ink-2); max-width: 380px; }

                /* Stats */
                .pj-stats { display: grid; grid-template-columns: repeat(4, 1fr); margin-top: 48px; background: var(--ink); color: #f4f1ea; }
                @media (max-width: 700px) { .pj-stats { grid-template-columns: 1fr 1fr; } }
                .pj-stat { padding: 26px 22px; border-right: 1px solid #333; }
                .pj-stat:last-child { border-right: none; }
                @media (max-width: 700px) { .pj-stat:nth-child(2) { border-right: none; } .pj-stat:nth-child(-n+2) { border-bottom: 1px solid #333; } }
                .pj-stat__num { font-family: var(--serif); font-weight: 800; font-size: 44px; line-height: 1; color: var(--accent); }
                .pj-stat__label { margin-top: 8px; font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.12em; text-transform: uppercase; color: #bdb8ae; }

                /* Project rows */
                .pj-list { border-top: 1px solid var(--rule-dark); }
                .pj-card { display: grid; grid-template-columns: 300px minmax(0, 1fr); gap: 32px; padding: 32px 0; border-bottom: 1px solid var(--rule-dark); align-items: stretch; transition: background 0.15s; }
                .pj-card:hover { background: var(--paper-2); }
                @media (max-width: 800px) { .pj-card { grid-template-columns: minmax(0, 1fr); gap: 20px; } }

                .pj-card__img-wrap { position: relative; height: 220px; border: 1.5px solid var(--ink); background: var(--paper-2); overflow: hidden; }
                @media (max-width: 800px) { .pj-card__img-wrap { height: 190px; } }
                .pj-card__img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s; }
                .pj-card:hover .pj-card__img { transform: scale(1.04); }
                .pj-card__img-placeholder { width: 100%; height: 100%; background: repeating-linear-gradient(45deg, #ebe8e0, #ebe8e0 6px, #e3e0d7 6px, #e3e0d7 12px); }
                .pj-card__id { position: absolute; top: 10px; left: 10px; font-family: var(--mono); font-size: 9.5px; font-weight: 600; letter-spacing: 0.1em; background: var(--accent); color: var(--on-accent); padding: 3px 8px; }

                .pj-card__body { display: flex; flex-direction: column; justify-content: space-between; gap: 18px; }
                .pj-card__meta { display: flex; flex-wrap: wrap; gap: 6px 18px; font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 12px; }
                .pj-card__meta b { font-weight: 500; color: var(--ink); }
                .pj-status--live { color: var(--green); font-weight: 600; }
                .pj-status--locked { color: var(--amber); font-weight: 600; }
                .pj-card__title { font-family: var(--serif); font-weight: 800; font-size: clamp(22px, 2.6vw, 30px); line-height: 1.1; }
                .pj-card__desc { margin-top: 10px; font-size: 14px; line-height: 1.7; color: var(--ink-2); }
                .pj-card__footer { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
                .pj-chips { display: flex; flex-wrap: wrap; gap: 6px; }
                .pj-chip { font-family: var(--mono); font-size: 10.5px; color: var(--ink-2); border: 1px solid var(--rule-dark); padding: 3px 9px; background: #fff; }

                /* CTA */
                .pj-cta { margin-top: 80px; background: var(--ink); color: #f4f1ea; border-top: 5px solid var(--accent); padding: 56px 48px; display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
                @media (max-width: 700px) { .pj-cta { padding: 36px 22px; } }
                .pj-cta__kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); margin-bottom: 10px; }
                .pj-cta__title { font-family: var(--serif); font-weight: 800; font-size: clamp(28px, 4vw, 44px); line-height: 1.08; }
                .pj-cta__desc { margin-top: 14px; font-size: 15px; line-height: 1.75; color: #bdb8ae; max-width: 460px; }
                .pj-cta .pj-btn--solid { background: var(--accent); border-color: var(--accent); color: var(--on-accent); padding: 16px 24px; }
                .pj-cta .pj-btn--solid:hover { background: #fff; border-color: #fff; color: var(--ink); }

                .pj-footer-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; padding: 32px 0 72px; }
                .pj-footer-row__info { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.06em; color: var(--ink-3); }

                @media (max-width: 640px) { .pj-wrap, .pj-nav__inner { padding-left: 18px; padding-right: 18px; } }
                .pj-page :focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
                @media (prefers-reduced-motion: reduce) { .pj-page * { transition: none !important; } }
            `}</style>

            <div className="pj-page">
                {/* Nav */}
                <header className="pj-nav">
                    <div className="pj-nav__inner">
                        <Link href="/" className="pj-nav__brand">brown<em>.</em>dev</Link>
                        <nav className="pj-nav__links" aria-label="Main">
                            <Link href="/bc/about" className="pj-nav__link pj-nav__hide">About</Link>
                            <Link href="/portfolio" className="pj-nav__link pj-nav__link--on">Portfolio</Link>
                            <Link href="/blog" className="pj-nav__link pj-nav__hide">Blog</Link>
                            <Link href="/bc/contact" className="pj-btn pj-btn--solid pj-btn--sm">
                                Start a project <ArrowRight size={12} />
                            </Link>
                        </nav>
                    </div>
                </header>

                <main className="pj-wrap">
                    {/* Masthead */}
                    <header className="pj-masthead">
                        <div>
                            <div className="pj-kicker"><b>Work</b></div>
                            <h1 className="pj-masthead__title">
                                Production<br /><span>Deployments</span>
                            </h1>
                        </div>
                        <p className="pj-masthead__desc">
                            Shipped systems, live platforms, and production-grade builds across the stack.
                        </p>
                    </header>

                    {/* Stats */}
                    <div className="pj-stats">
                        {STATS.map((s) => (
                            <div key={s.label} className="pj-stat">
                                <div className="pj-stat__num">{s.value}</div>
                                <div className="pj-stat__label">{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Projects */}
                    <div className="pj-head">
                        <div>
                            <div className="pj-kicker">Archive</div>
                            <h2 className="pj-h2">All projects</h2>
                        </div>
                        <p className="pj-head__note">Live platforms, client work and what is still in the workshop.</p>
                    </div>

                    <div className="pj-list">
                        {projects.map((p, i) => (
                            <article key={p.id} className="pj-card">
                                <div className="pj-card__img-wrap">
                                    {p.image
                                        ? <img src={p.image} alt={p.title} className="pj-card__img" loading="lazy" onError={(e) => (e.target.style.display = "none")} />
                                        : <div className="pj-card__img-placeholder" />
                                    }
                                    <span className="pj-card__id">{p.id} // #{String(i + 1).padStart(2, "0")}</span>
                                </div>

                                <div className="pj-card__body">
                                    <div>
                                        <div className="pj-card__meta">
                                            <span>Role: <b>{p.role}</b></span>
                                            <span>Year: <b>{p.year}</b></span>
                                            <span>
                                                Status:{" "}
                                                <span className={p.state === "live" ? "pj-status--live" : "pj-status--locked"}>
                                                    [{p.status}]
                                                </span>
                                            </span>
                                        </div>
                                        <h3 className="pj-card__title">{p.title}</h3>
                                        <p className="pj-card__desc">{p.description}</p>
                                    </div>

                                    <div className="pj-card__footer">
                                        <div className="pj-chips">
                                            {p.tags.map((t) => <span key={t} className="pj-chip">{t}</span>)}
                                        </div>
                                        {p.state === "live" && p.link && (
                                            <a href={p.link} target="_blank" rel="noopener noreferrer" className="pj-btn pj-btn--sm">
                                                View live <ArrowUpRight size={12} />
                                            </a>
                                        )}
                                        {p.state === "dev" && (
                                            <span className="pj-btn pj-btn--sm pj-btn--locked">
                                                <Clock size={12} /> Coming soon
                                            </span>
                                        )}
                                        {p.state === "nda" && (
                                            <span className="pj-btn pj-btn--sm pj-btn--locked">
                                                <Lock size={12} /> NDA restricted
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* CTA */}
                    <section className="pj-cta">
                        <div>
                            <p className="pj-cta__kicker">Work with me</p>
                            <h2 className="pj-cta__title">Start a project</h2>
                            <p className="pj-cta__desc">
                                Channels are open for contract work, system builds, and remote collaborations.
                            </p>
                        </div>
                        <Link href="/bc/contact" className="pj-btn pj-btn--solid">
                            Get in touch <ArrowRight size={13} />
                        </Link>
                    </section>

                    {/* Footer row */}
                    <div className="pj-footer-row">
                        <span className="pj-footer-row__info">brown.dev — production deployments</span>
                        <Link href="/portfolio" className="pj-btn pj-btn--sm">
                            <ArrowLeft size={13} /> Portfolio
                        </Link>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}