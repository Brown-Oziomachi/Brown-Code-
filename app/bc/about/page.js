"use client";
import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft, ArrowRight, Terminal, Cpu, Database,
    Layers, GitBranch, Binary, Briefcase, Download,
    Github, Linkedin, Mail, User,
    MessageCircle
} from "lucide-react";

export default function AboutMePage() {
    const [activeTab, setActiveTab] = useState("story");

    const skills = [
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

        /* Hero */
        .ab-hero { max-width: 1120px; margin: 0 auto; padding: 52px 24px 0; display: grid; grid-template-columns: 280px 1fr; gap: 48px; align-items: start; }
        @media (max-width: 780px) { .ab-hero { grid-template-columns: 1fr; gap: 32px; } }

        /* Profile card */
        .ab-profile {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
          overflow: hidden;
        }
        .ab-profile__img-wrap { position: relative; aspect-ratio: 1; background: var(--bg); }
        .ab-profile__img { width: 100%; height: 100%; object-fit: cover; opacity: 0.85; filter: grayscale(20%); display: block; }
        .ab-profile__img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, #0a0a0b 0%, transparent 50%);
        }
        .ab-profile__img-badge {
          position: absolute; bottom: 12px; left: 12px; right: 12px;
          background: rgba(17,17,19,0.95); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 10px 12px;
        }
        .ab-profile__img-name { font-family: var(--serif); font-size: 15px; color: var(--text-1); }
        .ab-profile__img-role { font-family: var(--mono); font-size: 9px; color: var(--accent); letter-spacing: 0.08em; text-transform: uppercase; margin-top: 2px; }

        .ab-profile__meta { padding: 16px; display: flex; flex-direction: column; gap: 8px; border-top: 1px solid var(--border); }
        .ab-profile__meta-row { display: flex; justify-content: space-between; align-items: center; }
        .ab-profile__meta-key { font-family: var(--mono); font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-3); }
        .ab-profile__meta-val { font-family: var(--mono); font-size: 10px; color: var(--text-2); }
        .ab-profile__meta-val--accent { color: var(--accent); }
        .ab-profile__status {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--mono); font-size: 9px; color: #4ade80;
          background: rgba(74,222,128,0.08); border: 1px solid rgba(74,222,128,0.2);
          padding: 3px 8px; border-radius: 3px;
        }
        .ab-profile__status-dot { width: 5px; height: 5px; border-radius: 50%; background: #4ade80; animation: ab-ping 1.4s ease-out infinite; }
        @keyframes ab-ping { 0% { box-shadow: 0 0 0 0 rgba(74,222,128,0.4); } 100% { box-shadow: 0 0 0 6px rgba(74,222,128,0); } }

        /* Stats */
        .ab-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-top: none; border-radius: 0 0 var(--radius) var(--radius); overflow: hidden; }
        .ab-stat { background: var(--surface); padding: 12px 8px; text-align: center; }
        .ab-stat__num { font-family: var(--serif); font-size: 20px; color: var(--text-1); }
        .ab-stat__label { font-family: var(--mono); font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-top: 2px; }

        /* Right column */
        .ab-intro { padding-top: 8px; }
        .ab-intro__eyebrow { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
        .ab-intro__dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; animation: ab-ping2 2s ease-out infinite; }
        @keyframes ab-ping2 { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        .ab-intro__eyebrow-text { font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); }

        .ab-intro__title { font-family: var(--serif); font-size: clamp(30px, 4vw, 48px); color: var(--text-1); line-height: 1.1; margin-bottom: 8px; }
        .ab-intro__subtitle { font-family: var(--mono); font-size: 11px; color: var(--text-3); letter-spacing: 0.06em; margin-bottom: 28px; }

        .ab-intro__body { border-left: 2px solid var(--border); padding-left: 20px; display: flex; flex-direction: column; gap: 14px; margin-bottom: 28px; }
        .ab-intro__p { font-size: 15px; line-height: 1.75; color: var(--text-2); font-weight: 300; }
        .ab-intro__p strong { color: var(--text-1); font-weight: 500; }

        .ab-intro__actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .ab-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em;
          padding: 10px 18px; border-radius: var(--radius);
          border: 1px solid var(--border); background: var(--surface);
          color: var(--text-2); cursor: pointer; text-decoration: none;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
        }
        .ab-btn:hover { color: var(--text-1); border-color: var(--border-hi); }
        .ab-btn--accent { background: var(--accent-dim); border-color: rgba(232,255,71,0.3); color: var(--accent); }
        .ab-btn--accent:hover { background: rgba(232,255,71,0.14); border-color: rgba(232,255,71,0.5); color: var(--accent); }

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

                {/* Hero */}
                <div className="ab-hero">

                    {/* Profile card */}
                    <div>
                        <div className="ab-profile">
                            <div className="ab-profile__img-wrap">
                                <img src="/coder1.png" alt="Brown AD" className="ab-profile__img" />
                                <div className="ab-profile__img-overlay" />
                                <div className="ab-profile__img-badge">
                                    <div className="ab-profile__img-name">Sir Brown AD</div>
                                    <div className="ab-profile__img-role">Full Stack Developer</div>
                                </div>
                            </div>
                            <div className="ab-profile__meta">
                                <div className="ab-profile__meta-row">
                                    <span className="ab-profile__meta-key">Location</span>
                                    <span className="ab-profile__meta-val">Nigeria · Remote</span>
                                </div>
                                <div className="ab-profile__meta-row">
                                    <span className="ab-profile__meta-key">Stack</span>
                                    <span className="ab-profile__meta-val ab-profile__meta-val--accent">JS · Node · React</span>
                                </div>
                                <div className="ab-profile__meta-row">
                                    <span className="ab-profile__meta-key">Status</span>
                                    <span className="ab-profile__status">
                                        <span className="ab-profile__status-dot" /> Available
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="ab-stats">
                            {exps.map((e) => (
                                <div key={e.label} className="ab-stat">
                                    <div className="ab-stat__num">{e.num}</div>
                                    <div className="ab-stat__label">{e.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Intro */}
                    <div className="ab-intro">
                        <div className="ab-intro__eyebrow">
                            <span className="ab-intro__dot" />
                            <span className="ab-intro__eyebrow-text">Dev Manifest · Objective Data</span>
                        </div>
                        <h1 className="ab-intro__title">Software<br />Developer</h1>
                        <p className="ab-intro__subtitle">ID: BC_CORE_v2.0.6</p>

                        <div className="ab-intro__body">
                            <p className="ab-intro__p">
                                Specializing in predictable structural web applications within the high-velocity JavaScript stack.
                                Core expertise centers around component encapsulation with <strong>React & Next.js</strong> alongside
                                reliable background task structures fueled by Node.js integration channels.
                            </p>
                            <p className="ab-intro__p">
                                My methodology rejects messy script solutions. Instead: explicit component workflows, clean data
                                layer constraints, and clear data indexing patterns via custom modern schema infrastructures.
                            </p>
                        </div>

                        <div className="ab-intro__actions">
                             <Link href="/bc_dev" className="ab-btn" style={{ display: "inline-flex" }}>
                                Full profile <ArrowRight size={12} />
                            </Link>
                            <a href="/bc/contact" className="ab-btn ab-btn--accent">
                                Initialize Contact <ArrowRight size={12} />
                            </a>
                            <a href="/cv" className="ab-btn">
                                <Download size={12} /> Resume
                            </a>
                          
                             <a href="https://cal.com/sir-brown" className="ab-btn" style={{ display: "inline-flex" }}>
                                Meet With Me <ArrowRight size={12} />
                            </a>

                            
                        </div>
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