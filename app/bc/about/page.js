"use client";
import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft, ArrowRight, Terminal, Cpu, Database,
    Layers, GitBranch, Binary, Briefcase, Download,
    Github, Mail
} from "lucide-react";
import { articles } from "@/app/data/article";
import { CATEGORY_LABELS, getCategoryKey } from "@/lib/blogCategories";

const getReadingTime = (content) =>
    Math.max(1, Math.ceil(content.split(" ").length / 200));

const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export default function AboutMePage() {
    const [activeTab, setActiveTab] = useState("story");

    const skills = [
        { name: "Vue 3 Composition API & State Architecture", level: 85, tag: "Production Ready" },
        { name: "Nuxt 3 SSR & Fullstack Routing", level: 80, tag: "Production Ready" },
        { name: "Vite Asset Pipeline & Build Optimization", level: 75, tag: "Advanced" },
        { name: "React Architecture & Next.js SSR", level: 70, tag: "Production Ready" },
        { name: "Node.js Core & Vercel Serverless", level: 50, tag: "Stable Backend" },
        { name: "JavaScript Engine Paradigms (ES6+)", level: 45, tag: "Intermediate Core" },
        { name: "Database Architecture & Management", level: 70, tag: "Scalable Sites" },
    ];

    const exps = [
        { num: "02+", label: "YRS EXP" },
        { num: "05+", label: "SHIPPED" },
        { num: "100%", label: "UNIT TESTS" },
    ];

    const timeline = [
        {
            year: "2024",
            title: "Full Stack Software Developer",
            body: "Architecting full functional interfaces, handling data streams, and building integrated Node.js solutions.",
            icon: <Briefcase size={14} />,
        },
        {
            year: "2025",
            title: "Software Development & Foundation",
            body: "Initiated programmatic core tracks. Discovered deep patterns, data parsing structures, and script logic basics.",
            icon: <Cpu size={14} />,
        },
    ];

    const values = [
        { icon: <Binary size={18} />, title: "Algorithmic Precision", body: "Writing maintainable, predictable, and clean modular structures to minimize technical debt." },
        { icon: <Terminal size={18} />, title: "Async Architecture", body: "Optimizing network round-trips, layout renders, and server workloads for raw performance velocity." },
        { icon: <GitBranch size={18} />, title: "Robust Modularity", body: "Isolating reusable logic into components and functional ecosystems built for clean scaling." },
        { icon: <Layers size={18} />, title: "Software Adaptability", body: "Continually tracking web patterns, security layers, and fresh structural updates." },
    ];

    const interests = [
        { icon: <Terminal size={13} />, text: "Application Architecture" },
        { icon: <Cpu size={13} />, text: "API & Integration Protocols" },
        { icon: <GitBranch size={13} />, text: "Control Flow & App Logic" },
        { icon: <Database size={13} />, text: "Data Modeling & State" },
    ];

    const latestArticles = articles
        .slice()
        .sort((a, b) => (b.datePublished || "").localeCompare(a.datePublished || ""))
        .slice(0, 4);

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
          --serif:      'DM Serif Display', Georgia, serif;
          --sans:       'Inter', system-ui, sans-serif;
          --mono:       'JetBrains Mono', 'Fira Code', monospace;
        }

        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .ab-page { background: var(--bg); color: var(--text-1); font-family: var(--sans); min-height: 100vh; }

        /* Nav */
        .ab-nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(10,10,11,0.92); backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          height: 56px; padding: 0 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .ab-nav__brand { font-family: var(--mono); font-size: 12px; font-weight: 500; letter-spacing: 0.08em; color: var(--text-1); text-decoration: none; }
        .ab-nav__brand em { font-style: normal; color: var(--accent); }
        .ab-nav__back {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em;
          color: var(--text-2); text-decoration: none;
          padding: 6px 12px; border: 1px solid var(--border); border-radius: var(--radius);
          transition: color 0.15s, border-color 0.15s, background 0.15s;
        }
        .ab-nav__back:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }

        /* ── Facebook-style profile header ── */
        .ab-fb { max-width: 1120px; margin: 32px auto 0; padding: 0 24px; }

        .ab-fb__cover {
          position: relative; width: 100%; aspect-ratio: 16 / 5.2;
          border-radius: var(--radius); overflow: hidden;
          border: 1px solid var(--border); background: var(--surface);
        }
        .ab-fb__cover-img { width: 100%; height: 100%; object-fit: contain; display: block; }
        .ab-fb__cover-fade {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(10,10,11,0) 45%, rgba(10,10,11,0.65) 100%);
        }

        .ab-fb__header {
          display: flex; align-items: flex-end; gap: 20px;
          margin-top: -52px; padding: 0 4px; position: relative; z-index: 2;
          flex-wrap: wrap;
        }
        .ab-fb__avatar-wrap {
          position: relative; width: 108px; height: 108px; flex-shrink: 0;
          border-radius: 50%; border: 4px solid var(--bg); background: var(--bg);
          overflow: hidden;
        }
        .ab-fb__avatar { width: 100%; height: 100%; object-fit: cover; filter: grayscale(15%); display: block; }
        .ab-fb__avatar-status {
          position: absolute; bottom: 4px; right: 4px; width: 16px; height: 16px;
          border-radius: 50%; background: #4ade80; border: 2px solid var(--bg);
        }

        .ab-fb__identity { flex: 1; min-width: 220px; padding-bottom: 10px 30px; margin-top: 0px;}
        .ab-fb__name { font-family: var(--serif); font-size: 26px; color: var(--text-1); line-height: 1.2; }
        .ab-fb__role { font-family: var(--mono); font-size: 11px; color: var(--text-3); letter-spacing: 0.05em; margin-top: 4px; }
        .ab-fb__stats { display: flex; gap: 18px; margin-top: 12px; }
        .ab-fb__stat-num { font-family: var(--serif); font-size: 16px; color: var(--accent); line-height: 1; }
        .ab-fb__stat-label { font-family: var(--mono); font-size: 8px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-3); margin-top: 3px; }

        .ab-fb__actions { display: flex; gap: 8px; flex-wrap: wrap; padding-bottom: 10px; }

        .ab-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em;
          padding: 10px 16px; border-radius: var(--radius);
          border: 1px solid var(--border); background: var(--surface);
          color: var(--text-2); cursor: pointer; text-decoration: none;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
        }
        .ab-btn:hover { color: var(--text-1); border-color: var(--border-hi); }
        .ab-btn--accent { background: var(--accent-dim); border-color: rgba(232,255,71,0.3); color: var(--accent); }
        .ab-btn--accent:hover { background: rgba(232,255,71,0.14); border-color: rgba(232,255,71,0.5); color: var(--accent); }

        /* Bio block under the FB header */
        .ab-bio {
          max-width: 1120px; margin: 28px auto 0; padding: 0 24px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
        }
        @media (max-width: 780px) { .ab-bio { grid-template-columns: 1fr; } }
        .ab-bio__card {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 20px; border-left: 2px solid var(--border-hi);
        }
        .ab-bio__label { font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-bottom: 10px; }
        .ab-bio__text { font-size: 13.5px; line-height: 1.7; color: var(--text-2); font-weight: 300; }
        .ab-bio__text strong { color: var(--text-1); font-weight: 500; }

        @media (max-width: 780px) {
          .ab-fb__cover { aspect-ratio: 4 / 3; }
          .ab-fb__header { margin-top: -40px; }
          .ab-fb__avatar-wrap { width: 84px; height: 84px; }
        }

        /* ── Blog preview section ── */
        .ab-blog { max-width: 1120px; margin: 56px auto 0; padding: 0 24px; }
        .ab-blog__head {
          display: flex; align-items: flex-end; justify-content: space-between; gap: 16px;
          margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border);
        }
        .ab-blog__eyebrow { font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-bottom: 6px; }
        .ab-blog__title { font-family: var(--serif); font-size: clamp(22px, 3vw, 30px); color: var(--text-1); }
        .ab-blog__count { font-family: var(--mono); font-size: 11px; color: var(--text-3); white-space: nowrap; }

        .ab-blog__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        @media (max-width: 900px) { .ab-blog__grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .ab-blog__grid { grid-template-columns: 1fr; } }

        .ab-blog-card {
          position: relative; display: flex; flex-direction: column;
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
          overflow: hidden; text-decoration: none;
          transition: border-color 0.2s, transform 0.2s;
        }
        .ab-blog-card:hover { border-color: var(--border-hi); transform: translateY(-3px); }

        .ab-blog-card__media { position: relative; height: 128px; background: var(--bg); overflow: hidden; }
        .ab-blog-card__img { width: 100%; height: 100%; object-fit: cover; opacity: 0.5; filter: grayscale(30%); transition: opacity 0.3s, transform 0.4s; display: block; }
        .ab-blog-card:hover .ab-blog-card__img { opacity: 0.8; transform: scale(1.05); }
        .ab-blog-card__media-placeholder { width: 100%; height: 100%; background: repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.02) 6px, rgba(255,255,255,0.02) 12px); }
        .ab-blog-card__media-fade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(10,10,11,0) 40%, var(--surface) 100%); }
        .ab-blog-card__num {
          position: absolute; top: 6px; right: 10px; font-family: var(--serif); font-size: 30px;
          color: rgba(244,244,245,0.14); line-height: 1; z-index: 1; user-select: none;
        }
        .ab-blog-card__tag {
          position: absolute; top: 10px; left: 10px; z-index: 1;
          font-family: var(--mono); font-size: 8.5px; letter-spacing: 0.06em; text-transform: uppercase;
          padding: 3px 7px; border-radius: 3px; background: rgba(10,10,11,0.75); backdrop-filter: blur(4px);
          color: var(--accent); border: 1px solid rgba(232,255,71,0.3);
        }

        .ab-blog-card__body { padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .ab-blog-card__title { font-family: var(--serif); font-size: 15px; line-height: 1.3; color: var(--text-1); transition: color 0.15s; }
        .ab-blog-card:hover .ab-blog-card__title { color: #fff; }
        .ab-blog-card__preview {
          font-size: 11.5px; color: var(--text-3); line-height: 1.55;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .ab-blog-card__meta {
          margin-top: auto; padding-top: 8px; border-top: 1px solid var(--border);
          font-family: var(--mono); font-size: 9px; color: var(--text-3);
          display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
        }
        .ab-blog-card__meta-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--border-hi); flex-shrink: 0; }
        .ab-blog-card__bar { position: absolute; left: 0; bottom: 0; height: 2px; width: 0%; background: var(--accent); transition: width 0.25s ease; }
        .ab-blog-card:hover .ab-blog-card__bar { width: 100%; }

        .ab-blog__empty { padding: 40px 0; text-align: center; font-family: var(--mono); font-size: 11px; color: var(--text-3); }

        .ab-blog__cta { display: flex; justify-content: center; margin-top: 24px; }

        /* Tabs */
        .ab-tabs { max-width: 1120px; margin: 48px auto 0; padding: 0 24px 80px; }
        .ab-tabs__bar {
          display: flex; gap: 2px; background: var(--surface);
          border: 1px solid var(--border); border-radius: var(--radius) var(--radius) 0 0;
          padding: 6px; overflow-x: auto;
        }
        .ab-tab-btn {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 8px 16px; border-radius: 4px; border: 1px solid transparent;
          background: transparent; color: var(--text-3); cursor: pointer; white-space: nowrap;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
        }
        .ab-tab-btn:hover { color: var(--text-2); }
        .ab-tab-btn--active { background: var(--bg); border-color: var(--border); color: var(--accent); }

        .ab-tabs__panel {
          background: var(--surface); border: 1px solid var(--border); border-top: none;
          border-radius: 0 0 var(--radius) var(--radius); padding: 32px; min-height: 320px;
        }

        /* Story tab */
        .ab-story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
        @media (max-width: 600px) { .ab-story-grid { grid-template-columns: 1fr; } }
        .ab-story-card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; }
        .ab-story-card__label { font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
        .ab-story-card__label::before { content: ''; width: 5px; height: 5px; background: rgba(232,255,71,0.4); border-radius: 1px; flex-shrink: 0; }
        .ab-story-card__text { font-size: 13px; color: var(--text-2); line-height: 1.7; font-weight: 300; }

        .ab-interests { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        @media (max-width: 600px) { .ab-interests { grid-template-columns: 1fr 1fr; } }
        .ab-interest {
          display: flex; align-items: center; gap: 8px;
          background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 10px 12px; font-size: 11px; color: var(--text-2);
          transition: border-color 0.15s, color 0.15s;
        }
        .ab-interest:hover { border-color: var(--border-hi); color: var(--text-1); }
        .ab-interest svg { color: var(--accent); flex-shrink: 0; }

        /* Skills tab */
        .ab-skill-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
        .ab-skill {
          background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 16px 18px; display: flex; align-items: center; justify-content: space-between; gap: 16px;
        }
        .ab-skill__info { flex: 1; min-width: 0; }
        .ab-skill__name { font-size: 13px; font-weight: 500; color: var(--text-1); margin-bottom: 3px; }
        .ab-skill__tag { font-family: var(--mono); font-size: 9px; letter-spacing: 0.08em; color: var(--text-3); text-transform: uppercase; }
        .ab-skill__bar-wrap { width: 120px; height: 3px; background: var(--border); border-radius: 2px; flex-shrink: 0; }
        .ab-skill__bar { height: 100%; background: var(--accent); border-radius: 2px; }
        .ab-skill__pct { font-family: var(--mono); font-size: 10px; color: var(--accent); width: 32px; text-align: right; flex-shrink: 0; }

        .ab-stack-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; border-top: 1px solid var(--border); padding-top: 24px; }
        @media (max-width: 600px) { .ab-stack-grid { grid-template-columns: 1fr; } }
        .ab-stack-card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; }
        .ab-stack-card__title { font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }
        .ab-stack-card__body { font-size: 11px; color: var(--text-3); line-height: 1.6; }

        /* Journey tab */
        .ab-timeline { border-left: 1px solid var(--border); padding-left: 24px; margin-left: 8px; display: flex; flex-direction: column; gap: 24px; }
        .ab-tl-item { position: relative; }
        .ab-tl-dot { position: absolute; left: -31px; top: 6px; width: 8px; height: 8px; background: var(--bg); border: 2px solid var(--accent); border-radius: 50%; }
        .ab-tl-card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px 20px; }
        .ab-tl-card__year { font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; color: var(--accent); background: var(--accent-dim); border: 1px solid rgba(232,255,71,0.2); padding: 2px 8px; border-radius: 3px; display: inline-block; margin-bottom: 8px; }
        .ab-tl-card__title { font-size: 14px; font-weight: 600; color: var(--text-1); margin-bottom: 6px; }
        .ab-tl-card__body { font-size: 12px; color: var(--text-2); line-height: 1.65; font-weight: 300; border-top: 1px solid var(--border); padding-top: 10px; margin-top: 4px; }

        /* Values tab */
        .ab-values-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
        @media (max-width: 600px) { .ab-values-grid { grid-template-columns: 1fr; } }
        .ab-value-card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; display: flex; gap: 14px; align-items: flex-start; transition: border-color 0.15s; }
        .ab-value-card:hover { border-color: var(--border-hi); }
        .ab-value-icon { width: 36px; height: 36px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: var(--accent); flex-shrink: 0; }
        .ab-value-card__title { font-size: 13px; font-weight: 600; color: var(--text-1); margin-bottom: 4px; }
        .ab-value-card__body { font-size: 12px; color: var(--text-3); line-height: 1.6; font-weight: 300; }

        .ab-cta {
          background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 24px 28px; display: flex; align-items: center; justify-content: space-between; gap: 20px;
          border-left: 3px solid var(--accent);
        }
        @media (max-width: 600px) { .ab-cta { flex-direction: column; align-items: flex-start; } }
        .ab-cta__title { font-size: 14px; font-weight: 600; color: var(--text-1); margin-bottom: 4px; }
        .ab-cta__sub { font-size: 12px; color: var(--text-3); line-height: 1.6; max-width: 400px; }
        .ab-cta__actions { display: flex; gap: 8px; flex-shrink: 0; }
      `}</style>

            <div className="ab-page">
                {/* Nav */}
                <nav className="ab-nav">
                    <a href="/" className="ab-nav__brand">brown<em>.</em>dev</a>
                    <a href="/portfolio" className="ab-nav__back"><ArrowLeft size={13} /> Portfolio</a>
                </nav>

                {/* Facebook-style cover + profile header */}
                <div className="ab-fb">
                    <div className="ab-fb__cover">
                        <img src="/banner.png" alt="Sir Brown AD cover" className="ab-fb__cover-img" />
                        <div className="ab-fb__cover-fade" />
                    </div>

                    <div className="ab-fb__header">
                        <div className="ab-fb__avatar-wrap">
                            <img src="/coder1.png" alt="Sir Brown AD" className="ab-fb__avatar" />
                            <span className="ab-fb__avatar-status" />
                        </div>

                        <div className="ab-fb__identity">
                           
                                <h1 className="ab-fb__name">Sir Brown AD</h1>
                                <p className="ab-fb__role">Full Stack Developer · Nigeria · Remote</p>
                        </div>

                        <div className="ab-fb__actions">
                            <Link href="/bc_dev" className="ab-btn">
                                Full profile <ArrowRight size={12} />
                            </Link>
                            <a href="/bc/contact" className="ab-btn ab-btn--accent">
                                Initialize Contact <ArrowRight size={12} />
                            </a>
                            <a href="/cv" className="ab-btn">
                                <Download size={12} /> Resume
                            </a>
                            <a href="https://cal.com/sir-brown" className="ab-btn">
                                Meet With Me <ArrowRight size={12} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bio */}
                <div className="ab-bio">
                    <div className="ab-bio__card">
                        <div className="ab-bio__label">Dev Manifest · Objective Data</div>
                        <p className="ab-bio__text">
                            Specializing in predictable structural web applications within the high-velocity JavaScript stack.
                            Core expertise centers around component encapsulation with <strong>Vue.js, Nuxt.js, React.js & Next.js</strong> alongside
                            reliable background task structures fueled by Node.js integration channels.
                        </p>
                    </div>
                    <div className="ab-bio__card">
                        <div className="ab-bio__label">Methodology</div>
                        <p className="ab-bio__text">
                            My methodology rejects messy script solutions. Instead: explicit component workflows, clean data
                            layer constraints, and clear data indexing patterns via custom modern schema infrastructures.
                        </p>
                    </div>
                </div>

                {/* Blog preview */}
                <div className="ab-blog">
                    <div className="ab-blog__head">
                        <div>
                            <div className="ab-blog__eyebrow">From the blog</div>
                            <h2 className="ab-blog__title">Latest Writing</h2>
                        </div>
                        <span className="ab-blog__count">{latestArticles.length} recent post{latestArticles.length !== 1 ? "s" : ""}</span>
                    </div>

                    {latestArticles.length === 0 ? (
                        <div className="ab-blog__empty">NO_ARTICLES_PUBLISHED_YET</div>
                    ) : (
                        <div className="ab-blog__grid">
                            {latestArticles.map((article, i) => (
                                <a key={article.slug} href={`/blog/${article.slug}`} className="ab-blog-card">
                                    <div className="ab-blog-card__media">
                                        {article.image ? (
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="ab-blog-card__img"
                                                onError={(e) => (e.target.style.display = "none")}
                                            />
                                        ) : (
                                            <div className="ab-blog-card__media-placeholder" />
                                        )}
                                        <div className="ab-blog-card__media-fade" />
                                        <span className="ab-blog-card__num">{String(i + 1).padStart(2, "0")}</span>
                                        <span className="ab-blog-card__tag">{CATEGORY_LABELS[getCategoryKey(article)]}</span>
                                    </div>
                                    <div className="ab-blog-card__body">
                                        <h3 className="ab-blog-card__title">{article.title}</h3>
                                        <p className="ab-blog-card__preview">{article.preview}</p>
                                        <div className="ab-blog-card__meta">
                                            <span>{getReadingTime(article.content)} min read</span>
                                            <span className="ab-blog-card__meta-dot" />
                                            <span>{formatDate(article.datePublished)}</span>
                                        </div>
                                    </div>
                                    <span className="ab-blog-card__bar" />
                                </a>
                            ))}
                        </div>
                    )}

                    <div className="ab-blog__cta">
                        <Link href="/blog" className="ab-btn ab-btn--accent">
                            View all articles <ArrowRight size={12} />
                        </Link>
                    </div>
                </div>

                {/* Tabs */}
                <div className="ab-tabs">
                    <div className="ab-tabs__bar">
                        {["story", "skills", "journey", "values"].map((t) => (
                            <button
                                key={t}
                                className={`ab-tab-btn${activeTab === t ? " ab-tab-btn--active" : ""}`}
                                onClick={() => setActiveTab(t)}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    <div className="ab-tabs__panel">
                        {/* Story */}
                        {activeTab === "story" && (
                            <div>
                                <div className="ab-story-grid">
                                    <div className="ab-story-card">
                                        <div className="ab-story-card__label">Origin</div>
                                        <p className="ab-story-card__text">
                                            My journey began with local infrastructure curiosity and low-level programmatic scripts.
                                            Determined to reverse-engineer layout payloads, that pure structural challenge turned an
                                            experimental past-time into full stack software construction.
                                        </p>
                                    </div>
                                    <div className="ab-story-card">
                                        <div className="ab-story-card__label">Current Runtime</div>
                                        <p className="ab-story-card__text">
                                            I construct integrated full-spectrum websites, managing complex React routing structures
                                            connected to relational engines. My roadmap focuses on architectural optimizations and
                                            secure data flow controls.
                                        </p>
                                    </div>
                                </div>
                                <div style={{ marginBottom: 12 }}>
                                    <div className="ab-story-card__label" style={{ marginBottom: 12 }}>Core Interests</div>
                                    <div className="ab-interests">
                                        {interests.map((item) => (
                                            <div key={item.text} className="ab-interest">
                                                {item.icon} {item.text}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Skills */}
                        {activeTab === "skills" && (
                            <div>
                                <div className="ab-skill-list">
                                    {skills.map((s) => (
                                        <div key={s.name} className="ab-skill">
                                            <div className="ab-skill__info">
                                                <div className="ab-skill__name">{s.name}</div>
                                                <div className="ab-skill__tag">{s.tag}</div>
                                            </div>
                                            <div className="ab-skill__bar-wrap">
                                                <div className="ab-skill__bar" style={{ width: `${s.level}%` }} />
                                            </div>
                                            <div className="ab-skill__pct">{s.level}%</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="ab-stack-grid">
                                    {[
                                        { title: "Frontend Engine", body: "React, Next.js, Core Hooks, HTML5, Tailwind Architecture" },
                                        { title: "Backend Runtime", body: "Node.js, API Pipeline Integration, Vercel Edge Functions" },
                                        { title: "Data Persistence", body: "MongoDB, Firebase Storage Streams, Relational MySQL Layer" },
                                    ].map((c) => (
                                        <div key={c.title} className="ab-stack-card">
                                            <div className="ab-stack-card__title">{c.title}</div>
                                            <div className="ab-stack-card__body">{c.body}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Journey */}
                        {activeTab === "journey" && (
                            <div className="ab-timeline">
                                {timeline.map((item) => (
                                    <div key={item.year} className="ab-tl-item">
                                        <div className="ab-tl-dot" />
                                        <div className="ab-tl-card">
                                            <span className="ab-tl-card__year">{item.year}</span>
                                            <div className="ab-tl-card__title">{item.title}</div>
                                            <div className="ab-tl-card__body">{item.body}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Values */}
                        {activeTab === "values" && (
                            <div>
                                <div className="ab-values-grid">
                                    {values.map((v) => (
                                        <div key={v.title} className="ab-value-card">
                                            <div className="ab-value-icon">{v.icon}</div>
                                            <div>
                                                <div className="ab-value-card__title">{v.title}</div>
                                                <div className="ab-value-card__body">{v.body}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="ab-cta">
                                    <div>
                                        <div className="ab-cta__title">Start a project</div>
                                        <div className="ab-cta__sub">Sockets configured to accept remote development profiles, custom structural integrations, and full-stack optimizations.</div>
                                    </div>
                                    <div className="ab-cta__actions">
                                        <a href="/bc/contact" className="ab-btn ab-btn--accent"><Mail size={12} /> Contact</a>
                                        <a href="https://github.com/Brown-Oziomachi" target="_blank" rel="noopener noreferrer" className="ab-btn"><Github size={12} /> GitHub</a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}