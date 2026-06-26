"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
    ArrowLeft, ArrowRight, Terminal, Cpu, Database,
    Layers, GitBranch, Binary, Briefcase, Download,
    Github, Mail, Phone, Globe, ShieldCheck,
    Code2, Zap, Award, BookOpen, Users, Search,
    ExternalLink, CheckCircle2
} from "lucide-react";

const STACK = [
    { label: "Next.js" }, { label: "React" }, { label: "Firebase" },
    { label: "Node.js" }, { label: "Firestore" }, { label: "Tailwind CSS" },
    { label: "JavaScript ES6+" }, { label: "Vercel" },,
];


export default function AboutMePage() {
    const [activeTab, setActiveTab] = useState("story");
    const [typed, setTyped] = useState("");
    const fullText = "Brown Oziomachi";

    useEffect(() => {
        let i = 0;
        const id = setInterval(() => {
            setTyped(fullText.slice(0, i + 1));
            i++;
            if (i >= fullText.length) clearInterval(id);
        }, 70);
        return () => clearInterval(id);
    }, []);

    const skills = [
        { name: "React Architecture & Next.js SSR", level: 70, tag: "Production Ready" },
        { name: "Node.js Core & Vercel Serverless", level: 50, tag: "Stable Backend" },
        { name: "JavaScript Engine Paradigms (ES6+)", level: 45, tag: "Intermediate Core" },
        { name: "Database Architecture & Management", level: 70, tag: "Scalable Systems" },
    ];
   
    const timeline = [
        {
            year: "2023",
            title: "Self-Directed Engineering Foundation",
            body: "Initiated programmatic core tracks — data parsing structures, script logic basics, and reverse-engineering layout payloads. An experimental past-time became a discipline.",
            icon: <Binary size={13} />,
        },
        {
            year: "2024",
            title: "Full Stack Software Developer",
            body: "Architecting full functional interfaces, handling data streams, and building integrated Node.js solutions across African digital markets.",
            icon: <Briefcase size={13} />,
        },
        {
            year: "2025",
            title: "Production Systems & EdTech Infrastructure",
            body: "Built LAN Library from the ground up — payment rails, affiliate APIs, seller dashboards, and a multi-currency marketplace serving 30+ countries.",
            icon: <Cpu size={13} />,
        },
    ];

    const values = [
        { icon: <Binary size={16} />, title: "Algorithmic Precision", body: "Writing maintainable, predictable, and clean modular structures to minimize technical debt." },
        { icon: <Terminal size={16} />, title: "Async Architecture", body: "Optimizing network round-trips, layout renders, and server workloads for raw performance velocity." },
        { icon: <GitBranch size={16} />, title: "Robust Modularity", body: "Isolating reusable logic into components and functional ecosystems built for clean scaling." },
        { icon: <Layers size={16} />, title: "Software Adaptability", body: "Continually tracking web patterns, security layers, and fresh structural updates." },
    ];

    const interests = [
        { icon: <Terminal size={12} />, text: "Application Architecture" },
        { icon: <Cpu size={12} />, text: "API & Integration Protocols" },
        { icon: <GitBranch size={12} />, text: "Control Flow & App Logic" },
        { icon: <Database size={12} />, text: "Data Modeling & State" },
    ];

    const SERVICES = [
        { icon: <Code2 size={12} />, label: "software_sprints" },
        { icon: <Layers size={12} />, label: "ui_ux_dashboards" },
        { icon: <Zap size={12} />, label: "next_js_apps" },
        { icon: <GitBranch size={12} />, label: "api_gateways" },
        { icon: <Database size={12} />, label: "secure_e_commerce" },
        { icon: <Award size={12} />, label: "50_50_framework" },
    ];

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:         #0a0a0b;
          --surface:    #111113;
          --surface-2:  #16161a;
          --border:     #1e1e22;
          --border-hi:  #2e2e34;
          --text-1:     #f4f4f5;
          --text-2:     #a1a1aa;
          --text-3:     #52525b;
          --accent:     #e8ff47;
          --accent-dim: rgba(232,255,71,0.08);
          --accent-mid: rgba(232,255,71,0.15);
          --radius:     6px;
          --serif:      'DM Serif Display', Georgia, serif;
          --sans:       'Inter', system-ui, sans-serif;
          --mono:       'JetBrains Mono', 'Fira Code', monospace;
        }

        .ab { background: var(--bg); color: var(--text-1); font-family: var(--sans); min-height: 100vh; overflow-x: hidden; }

        /* ── Nav ── */
        .ab-nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(10,10,11,0.94); backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border);
          height: 56px; padding: 0 28px;
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

        /* ── Status bar ── */
        .ab-status {
          max-width: 1140px; margin: 0 auto; padding: 28px 28px 0;
          display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
          border-bottom: 1px solid var(--border); padding-bottom: 20px;
          gap: 12px;
        }
        .ab-status__left { display: flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 11px; color: var(--accent); }
        .ab-status__left svg { animation: ab-pulse 2s ease-in-out infinite; }
        @keyframes ab-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        .ab-status__right { display: flex; flex-wrap: wrap; gap: 20px; }
        .ab-status__item { display: flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: 10px; color: var(--text-3); letter-spacing: 0.06em; }
        .ab-status__item svg { color: var(--text-3); }
        .ab-status__online { display: flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: 10px; color: #4ade80; }
        .ab-status__dot { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; animation: ab-ping 1.4s ease-out infinite; }
        @keyframes ab-ping { 0% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); } 100% { box-shadow: 0 0 0 7px rgba(74,222,128,0); } }

        /* ── Hero ── */
        .ab-hero {
          max-width: 1140px; margin: 0 auto; padding: 44px 28px 0;
          display: grid; grid-template-columns: 300px 1fr; gap: 56px; align-items: start;
        }
        @media (max-width: 820px) { .ab-hero { grid-template-columns: 1fr; gap: 36px; } }

        /* Profile card */
        .ab-profile { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
        .ab-profile__frame {
          position: relative; aspect-ratio: 3/4; background: var(--bg);
        }
        .ab-profile__corner { position: absolute; width: 18px; height: 18px; z-index: 2; }
        .ab-profile__corner--tl { top: 8px; left: 8px; border-top: 2px solid rgba(232,255,71,0.6); border-left: 2px solid rgba(232,255,71,0.6); }
        .ab-profile__corner--tr { top: 8px; right: 8px; border-top: 2px solid rgba(232,255,71,0.6); border-right: 2px solid rgba(232,255,71,0.6); }
        .ab-profile__corner--bl { bottom: 8px; left: 8px; border-bottom: 2px solid rgba(232,255,71,0.6); border-left: 2px solid rgba(232,255,71,0.6); }
        .ab-profile__corner--br { bottom: 8px; right: 8px; border-bottom: 2px solid rgba(232,255,71,0.6); border-right: 2px solid rgba(232,255,71,0.6); }
        .ab-profile__img { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; filter: grayscale(25%); display: block; transition: opacity 0.5s, filter 0.5s; }
        .ab-profile__frame:hover .ab-profile__img { opacity: 1; filter: grayscale(0%); }
        .ab-profile__overlay { position: absolute; inset: 0; background: linear-gradient(to top, #0a0a0b 0%, transparent 45%); }
        .ab-profile__badge {
          position: absolute; bottom: 10px; left: 10px; right: 10px;
          background: rgba(17,17,19,0.96); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 10px 12px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .ab-profile__badge-name { font-family: var(--serif); font-size: 14px; color: var(--text-1); }
        .ab-profile__badge-role { font-family: var(--mono); font-size: 9px; color: var(--accent); letter-spacing: 0.08em; text-transform: uppercase; margin-top: 2px; }
        .ab-profile__verified { display: inline-flex; align-items: center; gap: 4px; font-family: var(--mono); font-size: 9px; color: #4ade80; }
        .ab-profile__verified-dot { width: 5px; height: 5px; border-radius: 50%; background: #4ade80; animation: ab-ping 1.4s ease-out infinite; }

        .ab-profile__meta { padding: 14px 16px; border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 8px; }
        .ab-profile__row { display: flex; justify-content: space-between; align-items: center; }
        .ab-profile__key { font-family: var(--mono); font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-3); }
        .ab-profile__val { font-family: var(--mono); font-size: 10px; color: var(--text-2); }
        .ab-profile__val--accent { color: var(--accent); }

        .ab-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-top: none; border-radius: 0 0 var(--radius) var(--radius); overflow: hidden; }
        .ab-stat { background: var(--surface); padding: 12px 6px; text-align: center; }
        .ab-stat__num { font-family: var(--serif); font-size: 22px; color: var(--text-1); }
        .ab-stat__label { font-family: var(--mono); font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-top: 2px; }

        /* Intro */
        .ab-intro { padding-top: 4px; }
        .ab-intro__eyebrow { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
        .ab-intro__dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; animation: ab-pulse 2s ease-out infinite; }
        .ab-intro__eyebrow-text { font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-3); }

        .ab-intro__h1 { font-family: var(--serif); font-size: clamp(36px, 5vw, 58px); color: var(--text-1); line-height: 1.0; margin-bottom: 4px; }
        .ab-intro__h1 span { color: var(--accent); }
        .ab-intro__sub { font-family: var(--mono); font-size: 11px; color: var(--text-3); letter-spacing: 0.07em; margin-bottom: 6px; }
        .ab-intro__fullname { font-family: var(--sans); font-size: 16px; color: var(--text-2); font-weight: 300; margin-bottom: 28px; }

        .ab-intro__body { border-left: 2px solid var(--border); padding-left: 20px; display: flex; flex-direction: column; gap: 13px; margin-bottom: 28px; }
        .ab-intro__p { font-size: 14px; line-height: 1.78; color: var(--text-2); font-weight: 300; }
        .ab-intro__p strong { color: var(--text-1); font-weight: 500; }

        .ab-services { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
        .ab-service-tag {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.04em;
          padding: 6px 10px; background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); color: var(--text-3);
          transition: color 0.15s, border-color 0.15s;
        }
        .ab-service-tag:hover { color: var(--text-2); border-color: var(--border-hi); }
        .ab-service-tag svg { color: var(--accent); }

        .ab-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 28px; max-width: 360px; }
        .ab-metric { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px 10px; text-align: center; }
        .ab-metric__val { font-family: var(--serif); font-size: 26px; color: var(--accent); }
        .ab-metric__label { font-family: var(--mono); font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-top: 3px; }

        .ab-intro__actions { display: flex; gap: 8px; flex-wrap: wrap; }
        .ab-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.06em;
          padding: 9px 16px; border-radius: var(--radius);
          border: 1px solid var(--border); background: var(--surface);
          color: var(--text-2); cursor: pointer; text-decoration: none;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
          white-space: nowrap;
        }
        .ab-btn:hover { color: var(--text-1); border-color: var(--border-hi); }
        .ab-btn--accent { background: var(--accent-dim); border-color: rgba(232,255,71,0.3); color: var(--accent); }
        .ab-btn--accent:hover { background: var(--accent-mid); border-color: rgba(232,255,71,0.5); }

        /* ── Tabs ── */
        .ab-tabs { max-width: 1140px; margin: 52px auto 0; padding: 0 28px 0; }
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

        /* Story */
        .ab-story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
        @media (max-width: 640px) { .ab-story-grid { grid-template-columns: 1fr; } }
        .ab-story-card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; }
        .ab-story-card__label { font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
        .ab-story-card__label::before { content: ''; width: 5px; height: 5px; background: rgba(232,255,71,0.4); border-radius: 1px; flex-shrink: 0; }
        .ab-story-card__text { font-size: 13px; color: var(--text-2); line-height: 1.72; font-weight: 300; }
        .ab-interests { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
        @media (max-width: 640px) { .ab-interests { grid-template-columns: 1fr 1fr; } }
        .ab-interest {
          display: flex; align-items: center; gap: 8px;
          background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 9px 11px; font-size: 11px; color: var(--text-2);
          transition: border-color 0.15s, color 0.15s;
        }
        .ab-interest:hover { border-color: var(--border-hi); color: var(--text-1); }
        .ab-interest svg { color: var(--accent); flex-shrink: 0; }

        /* Skills */
        .ab-skill-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 28px; }
        .ab-skill { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .ab-skill__name { font-size: 13px; font-weight: 500; color: var(--text-1); margin-bottom: 3px; }
        .ab-skill__tag { font-family: var(--mono); font-size: 9px; letter-spacing: 0.08em; color: var(--text-3); text-transform: uppercase; }
        .ab-skill__bar-wrap { width: 110px; height: 2px; background: var(--border); border-radius: 2px; flex-shrink: 0; }
        .ab-skill__bar { height: 100%; background: var(--accent); border-radius: 2px; }
        .ab-skill__pct { font-family: var(--mono); font-size: 10px; color: var(--accent); width: 30px; text-align: right; flex-shrink: 0; }
        .ab-stack-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; border-top: 1px solid var(--border); padding-top: 22px; }
        @media (max-width: 640px) { .ab-stack-grid { grid-template-columns: 1fr; } }
        .ab-stack-card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px; }
        .ab-stack-card__title { font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }
        .ab-stack-card__body { font-size: 11px; color: var(--text-3); line-height: 1.6; }

        /* Journey */
        .ab-timeline { border-left: 1px solid var(--border); padding-left: 24px; margin-left: 8px; display: flex; flex-direction: column; gap: 22px; }
        .ab-tl-item { position: relative; }
        .ab-tl-dot { position: absolute; left: -31px; top: 6px; width: 8px; height: 8px; background: var(--bg); border: 2px solid var(--accent); border-radius: 50%; }
        .ab-tl-card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px 18px; }
        .ab-tl-card__year { font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; color: var(--accent); background: var(--accent-dim); border: 1px solid rgba(232,255,71,0.2); padding: 2px 8px; border-radius: 3px; display: inline-block; margin-bottom: 8px; }
        .ab-tl-card__title { font-size: 14px; font-weight: 600; color: var(--text-1); margin-bottom: 6px; }
        .ab-tl-card__body { font-size: 12px; color: var(--text-2); line-height: 1.68; font-weight: 300; border-top: 1px solid var(--border); padding-top: 10px; margin-top: 4px; }

        /* Values */
        .ab-values-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 22px; }
        @media (max-width: 640px) { .ab-values-grid { grid-template-columns: 1fr; } }
        .ab-value-card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; display: flex; gap: 14px; align-items: flex-start; transition: border-color 0.15s; }
        .ab-value-card:hover { border-color: var(--border-hi); }
        .ab-value-icon { width: 34px; height: 34px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: var(--accent); flex-shrink: 0; }
        .ab-value-card__title { font-size: 13px; font-weight: 600; color: var(--text-1); margin-bottom: 4px; }
        .ab-value-card__body { font-size: 12px; color: var(--text-3); line-height: 1.62; font-weight: 300; }

        /* ── Projects section ── */
        .ab-section { max-width: 1140px; margin: 0 auto; padding: 52px 28px 0; }
        .ab-section__eyebrow { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-3); margin-bottom: 8px; }
        .ab-section__title { font-family: var(--serif); font-size: clamp(22px, 3vw, 32px); color: var(--text-1); margin-bottom: 6px; }
        .ab-section__sub { font-size: 13px; color: var(--text-3); font-weight: 300; margin-bottom: 28px; max-width: 520px; line-height: 1.65; }
        .ab-projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        @media (max-width: 780px) { .ab-projects-grid { grid-template-columns: 1fr; } }
        .ab-project-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 20px; display: flex; flex-direction: column; gap: 12px;
          text-decoration: none; transition: border-color 0.15s, background 0.15s;
        }
        .ab-project-card:hover { border-color: var(--border-hi); background: var(--surface-2); }
        .ab-project-card__header { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
        .ab-project-card__name { font-size: 14px; font-weight: 600; color: var(--text-1); }
        .ab-project-card__tag { font-family: var(--mono); font-size: 9px; letter-spacing: 0.08em; padding: 2px 8px; border-radius: 3px; flex-shrink: 0; }
        .ab-project-card__desc { font-size: 12px; color: var(--text-3); line-height: 1.65; font-weight: 300; flex: 1; }
        .ab-project-card__link { display: inline-flex; align-items: center; gap: 4px; font-family: var(--mono); font-size: 10px; color: var(--text-3); transition: color 0.15s; }
        .ab-project-card:hover .ab-project-card__link { color: var(--accent); }

        /* ── Search section ── */
        .ab-search-section { max-width: 1140px; margin: 0 auto; padding: 52px 28px 0; }
        .ab-search-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px; max-width: 680px; margin: 0 auto;
        }
        .ab-search-bar {
          display: flex; align-items: center; gap: 10px;
          background: var(--bg); border: 1px solid var(--border-hi); border-radius: 40px;
          padding: 10px 18px; margin-bottom: 22px;
        }
        .ab-search-bar svg { color: var(--text-3); flex-shrink: 0; }
        .ab-search-bar__text { font-family: var(--mono); font-size: 13px; color: var(--text-2); }
        .ab-search-bar__cursor { display: inline-block; width: 2px; height: 14px; background: var(--accent); margin-left: 2px; vertical-align: middle; animation: ab-blink 1s step-start infinite; }
        @keyframes ab-blink { 50% { opacity: 0; } }
        .ab-search-result { padding-left: 2px; }
        .ab-search-result__source { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; font-family: var(--mono); font-size: 10px; color: var(--text-3); }
        .ab-search-result__icon { width: 16px; height: 16px; background: var(--surface-2); border: 1px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .ab-search-result__title { font-family: var(--sans); font-size: 17px; color: #4a9eff; margin-bottom: 4px; text-decoration: none; }
        .ab-search-result__title:hover { text-decoration: underline; }
        .ab-search-result__desc { font-family: var(--sans); font-size: 12px; color: var(--text-2); line-height: 1.65; margin-bottom: 10px; }
        .ab-search-result__links { display: flex; flex-wrap: wrap; gap: 14px; border-top: 1px solid var(--border); padding-top: 10px; }
        .ab-search-result__link { font-family: var(--sans); font-size: 12px; color: #4a9eff; text-decoration: none; }
        .ab-search-result__link:hover { text-decoration: underline; }

        .ab-search-sub-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px; max-width: 680px; margin-left: auto; margin-right: auto; }
        @media (max-width: 640px) { .ab-search-sub-grid { grid-template-columns: 1fr; } }
        .ab-search-sub-card {
          display: flex; gap: 12px; align-items: flex-start;
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px;
          text-decoration: none; transition: border-color 0.15s;
        }
        .ab-search-sub-card:hover { border-color: var(--border-hi); }
        .ab-search-sub-card svg { color: var(--accent); flex-shrink: 0; margin-top: 1px; }
        .ab-search-sub-card__title { font-size: 12px; font-weight: 600; color: var(--text-1); margin-bottom: 3px; }
        .ab-search-sub-card__desc { font-size: 11px; color: var(--text-3); line-height: 1.55; font-weight: 300; }

        /* ── Scam Checker ── */
        .ab-tool-section { max-width: 1140px; margin: 0 auto; padding: 52px 28px 0; }
        .ab-tool-card {
          background: var(--surface); border: 1px solid rgba(248,113,113,0.2); border-radius: var(--radius);
          padding: 28px; display: flex; gap: 22px; align-items: flex-start;
          border-left: 3px solid rgba(248,113,113,0.5);
        }
        @media (max-width: 640px) { .ab-tool-card { flex-direction: column; } }
        .ab-tool-icon { width: 52px; height: 52px; background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.2); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: #f87171; flex-shrink: 0; }
        .ab-tool-eyebrow { font-family: var(--mono); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: #f87171; margin-bottom: 6px; }
        .ab-tool-name { font-family: var(--serif); font-size: 22px; color: var(--text-1); margin-bottom: 8px; }
        .ab-tool-desc { font-size: 13px; color: var(--text-2); line-height: 1.68; font-weight: 300; margin-bottom: 14px; }
        .ab-tool-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
        .ab-tool-tag { font-family: var(--mono); font-size: 9px; padding: 2px 8px; background: var(--bg); border: 1px solid var(--border); border-radius: 3px; color: var(--text-3); }

        /* ── Stack section ── */
        .ab-stack-section { max-width: 1140px; margin: 0 auto; padding: 52px 28px; }
        .ab-stack-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-top: 20px; }
        .ab-pill { font-family: var(--mono); font-size: 11px; padding: 6px 14px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-3); transition: color 0.15s, border-color 0.15s; }
        .ab-pill:hover { color: var(--text-2); border-color: var(--border-hi); }

        /* CTA banner */
        .ab-cta {
          max-width: 1140px; margin: 0 auto 80px; padding: 0 28px;
        }
        .ab-cta-inner {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 28px; display: flex; align-items: center; justify-content: space-between; gap: 20px;
          border-left: 3px solid var(--accent);
        }
        @media (max-width: 640px) { .ab-cta-inner { flex-direction: column; align-items: flex-start; } }
        .ab-cta__title { font-family: var(--serif); font-size: 20px; color: var(--text-1); margin-bottom: 5px; }
        .ab-cta__sub { font-size: 12px; color: var(--text-3); line-height: 1.65; max-width: 420px; }
        .ab-cta__actions { display: flex; gap: 8px; flex-shrink: 0; flex-wrap: wrap; }

        /* Footer strip */
        .ab-footer { border-top: 1px solid var(--border); padding: 20px 28px; max-width: 1140px; margin: 0 auto; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; }
        .ab-footer__copy { font-family: var(--mono); font-size: 10px; color: var(--text-3); }
        .ab-footer__links { display: flex; gap: 16px; }
        .ab-footer__link { display: inline-flex; align-items: center; gap: 5px; font-family: var(--mono); font-size: 10px; color: var(--text-3); text-decoration: none; transition: color 0.15s; }
        .ab-footer__link:hover { color: var(--accent); }
      `}</style>

                <nav className="ab-nav">
                    <a href="/" className="ab-nav__brand">brown<em>.</em>dev</a>
                    <a href="/portfolio" className="ab-nav__back"><ArrowLeft size={12} /> Portfolio</a>
                </nav>
            <div className="ab">

                {/* ── Status bar ── */}
                <div className="ab-status">
                    <div className="ab-status__left">
                        <Terminal size={13} />
                        <span>system_node // browncode.name.ng</span>
                    </div>
                    <div className="ab-status__right">
                        <span className="ab-status__item"><Globe size={11} /> LOC: ABUJA, NG</span>
                        <span className="ab-status__item"><Cpu size={11} /> STATUS: READY_TO_BUILD</span>
                        <span className="ab-status__online"><span className="ab-status__dot" /> ONLINE</span>
                    </div>
                </div>

                {/* ── Hero ── */}
                <div className="ab-hero">

                    {/* Profile card */}
                    <div>
                        <div className="ab-profile">
                            <div className="ab-profile__frame">
                                <div className="ab-profile__corner ab-profile__corner--tl" />
                                <div className="ab-profile__corner ab-profile__corner--tr" />
                                <div className="ab-profile__corner ab-profile__corner--bl" />
                                <div className="ab-profile__corner ab-profile__corner--br" />
                                <img src="/coder1.png" alt="Brown Oziomachi" className="ab-profile__img" />
                                <div className="ab-profile__overlay" />
                                <div className="ab-profile__badge">
                                    <div>
                                        <div className="ab-profile__badge-name">Sir Brown AD</div>
                                        <div className="ab-profile__badge-role">Full Stack Developer</div>
                                    </div>
                                    <span className="ab-profile__verified">
                                        <span className="ab-profile__verified-dot" /> VERIFIED
                                    </span>
                                </div>
                            </div>
                            <div className="ab-profile__meta">
                                <div className="ab-profile__row">
                                    <span className="ab-profile__key">Location</span>
                                    <span className="ab-profile__val">Abuja, Nigeria · Remote</span>
                                </div>
                                <div className="ab-profile__row">
                                    <span className="ab-profile__key">Stack</span>
                                    <span className="ab-profile__val ab-profile__val--accent">JS · Node · React · Firebase</span>
                                </div>
                                <div className="ab-profile__row">
                                    <span className="ab-profile__key">Ident</span>
                                    <span className="ab-profile__val">SIR_BROWN_AD</span>
                                </div>
                            </div>
                        </div>
                        <div className="ab-stats">
                            {[
                                { num: "02+", label: "Yrs Exp" },
                                { num: "05+", label: "Shipped" },
                                { num: "3–7d", label: "Delivery" },
                            ].map((s) => (
                                <div key={s.label} className="ab-stat">
                                    <div className="ab-stat__num">{s.num}</div>
                                    <div className="ab-stat__label">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Intro */}
                    <div className="ab-intro">
                        <div className="ab-intro__eyebrow">
                            <span className="ab-intro__dot" />
                            <span className="ab-intro__eyebrow-text">// Full-Stack Software Developer</span>
                        </div>
                        <h1 className="ab-intro__h1">BROWN_<span>CODE</span></h1>
                        <p className="ab-intro__sub">ID: BC_CORE_v2.0.6</p>
                        <p className="ab-intro__fullname">Sir Brown Oziomachi (AD)</p>

                        <div className="ab-intro__body">
                            <p className="ab-intro__p">
                                I engineer highly optimized web architectures, lightning-fast business systems, and scalable
                                full-stack applications built to deliver measurable outcomes. Specializing in predictable structural
                                web applications within the high-velocity JavaScript stack — from <strong>React & Next.js</strong> component
                                encapsulation to reliable background task structures fueled by Node.js integration channels.
                            </p>
                            <p className="ab-intro__p">
                                My work spans <strong>secure application design</strong>, cloud-native deployments, and maintainable codebases
                                built for scale. I specialize in Firebase, real-time data systems, and payment infrastructure across African markets.
                            </p>
                        </div>

                        <div className="ab-services">
                            {SERVICES.map((s) => (
                                <span key={s.label} className="ab-service-tag">{s.icon} {s.label}</span>
                            ))}
                        </div>

                        <div className="ab-metrics">
                            {[
                                { val: "5+", label: "Deployments" },
                                { val: "2+", label: "Yrs Exp" },
                                { val: "3–7", label: "Day Delivery" },
                            ].map((m) => (
                                <div key={m.label} className="ab-metric">
                                    <div className="ab-metric__val">{m.val}</div>
                                    <div className="ab-metric__label">{m.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="ab-intro__actions">
                            <a href="/bc/contact" className="ab-btn ab-btn--accent">
                                Initialize Contact <ArrowRight size={12} />
                            </a>
                            <a href="tel:08142995114" className="ab-btn"><Phone size={12} /> 08142995114</a>
                            <a href="mailto:browncemmanuel@gmail.com" className="ab-btn"><Mail size={12} /> Email</a>
                            <a href="https://github.com/Brown-Oziomachi" target="_blank" rel="noopener noreferrer" className="ab-btn">
                                <Github size={12} /> GitHub
                            </a>
                            <a href="/cv" className="ab-btn"><Download size={12} /> Resume</a>
                        </div>
                    </div>
                </div>

                {/* ── Tabs ── */}
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

                        {activeTab === "story" && (
                            <div>
                                <div className="ab-story-grid">
                                    <div className="ab-story-card">
                                        <div className="ab-story-card__label">Origin</div>
                                        <p className="ab-story-card__text">
                                            My journey began with local infrastructure curiosity and low-level programmatic scripts.
                                            Determined to reverse-engineer layout payloads, that pure structural challenge turned
                                            an experimental past-time into full stack software construction.
                                        </p>
                                    </div>
                                    <div className="ab-story-card">
                                        <div className="ab-story-card__label">Current Runtime</div>
                                        <p className="ab-story-card__text">
                                            I construct integrated full-spectrum websites, managing complex React routing structures
                                            connected to relational engines. My roadmap focuses on architectural optimizations,
                                            secure data flow controls, and EdTech infrastructure across African markets.
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div className="ab-story-card__label" style={{ marginBottom: 10 }}>Core Interests</div>
                                    <div className="ab-interests">
                                        {interests.map((item) => (
                                            <div key={item.text} className="ab-interest">{item.icon} {item.text}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "skills" && (
                            <div>
                                <div className="ab-skill-list">
                                    {skills.map((s) => (
                                        <div key={s.name} className="ab-skill">
                                            <div style={{ flex: 1, minWidth: 0 }}>
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
                                        { title: "Data Persistence", body: "Firebase, Firestore, MongoDB, Relational MySQL Layer" },
                                    ].map((c) => (
                                        <div key={c.title} className="ab-stack-card">
                                            <div className="ab-stack-card__title">{c.title}</div>
                                            <div className="ab-stack-card__body">{c.body}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

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
                            </div>
                        )}

                    </div>
                </div>

                {/* ── Google Search ── */}
                <div className="ab-search-section" style={{ borderTop: "1px solid var(--border)", marginTop: 52 }}>
                    <div style={{ maxWidth: 1140, margin: "0 auto", paddingTop: 52 }}>
                        <p className="ab-section__eyebrow" style={{ textAlign: "center" }}>// Search Engine Presence</p>
                        <h2 className="ab-section__title" style={{ textAlign: "center" }}>Find me on Google</h2>
                        <p className="ab-section__sub" style={{ textAlign: "center", maxWidth: 480, margin: "0 auto 28px" }}>
                            Search <span style={{ fontFamily: "var(--mono)", color: "var(--accent)" }}>{typed}<span className="ab-search-bar__cursor" /></span> on Google — my portfolio comes up indexed.
                        </p>

                        <div className="ab-search-card">
                            <div className="ab-search-bar">
                                <Search size={14} />
                                <span className="ab-search-bar__text">Brown Oziomachi</span>
                            </div>
                            <div className="ab-search-result">
                                <div className="ab-search-result__source">
                                    <div className="ab-search-result__icon"><Terminal size={8} style={{ color: "var(--accent)" }} /></div>
                                    browncode.name.ng
                                </div>
                                <a href="https://browncode.name.ng" target="_blank" rel="noopener noreferrer" className="ab-search-result__title">
                                    Brown Code — Full-Stack Software Developer | Portfolio
                                </a>
                                <p className="ab-search-result__desc">
                                    Sir Brown AD (Brown Oziomachi) — Full-Stack Software Developer based in Abuja, Nigeria. Specializing in Next.js, Firebase, scalable web systems, and African market payment infrastructure. View projects, blog, and contact.
                                </p>
                                <div className="ab-search-result__links">
                                    {["Portfolio", "Blog", "Projects", "bc/Contact", "Tech News"].map((l) => {
                                        // Generates web-standard slugs (e.g., "Tech News" becomes "/tech-news")
                                        const slug = l.toLowerCase().replace(/\s+/g, '-');
                                        return (
                                            <a
                                                key={l}
                                                href={`/${slug}`}
                                                className="ab-search-result__link"
                                            >
                                                {l}
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="ab-search-sub-grid">
                            {[
                                { icon: <BookOpen size={13} />, title: "Technical Blog", desc: "In-depth articles on Next.js architecture, Firebase patterns, and African tech infrastructure.", url: "/blog" },
                                { icon: <Layers size={13} />, title: "Project Showcase", desc: "Live deployments including LAN Library, scam detection tools, and full-stack dashboards.", url: "/bc/projects" },
                                { icon: <Users size={13} />, title: "About Sir Brown AD", desc: "Background, engineering philosophy, the 50/50 framework, and building for African digital economy.", url: "/bc/about" },
                                { icon: <ShieldCheck size={13} />, title: "Scam Checker Tool", desc: "Free forensic utility for auditing suspicious transactions — built open for the community.", url: "/client/scam-checker" },
                            ].map((item) => (
                                <a key={item.title} href={item.url} className="ab-search-sub-card">
                                    {item.icon}
                                    <div>
                                        <div className="ab-search-sub-card__title">{item.title}</div>
                                        <div className="ab-search-sub-card__desc">{item.desc}</div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div style={{ textAlign: "center", marginTop: 22 }}>
                            <a href="https://browncode.name.ng" target="_blank" rel="noopener noreferrer" className="ab-btn">
                                <ExternalLink size={11} /> OPEN: browncode.name.ng
                            </a>
                        </div>
                    </div>
                </div>

                {/* ── Scam Checker ── */}
                <div className="ab-tool-section" style={{ borderTop: "1px solid var(--border)", marginTop: 52 }}>
                    <div style={{ maxWidth: 1140, margin: "0 auto", paddingTop: 52 }}>
                        <div className="ab-tool-card">
                            <div className="ab-tool-icon"><ShieldCheck size={24} /></div>
                            <div>
                                <div className="ab-tool-eyebrow">// Featured Security Tool</div>
                                <div className="ab-tool-name">Forensic Scam Checker</div>
                                <p className="ab-tool-desc">
                                    A built-in security utility engineered at{" "}
                                    <code style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)", background: "var(--bg)", padding: "1px 6px", borderRadius: 3 }}>/client/scam-checker</code>{" "}
                                    to actively audit transaction footprints, metadata patterns, and structural anomalies. Designed to
                                    drastically limit ecosystem fraud risks for users across African digital markets.
                                </p>
                                <div className="ab-tool-tags">
                                    {["Transaction Audit", "Metadata Analysis", "Anomaly Detection", "Free to Use"].map((tag) => (
                                        <span key={tag} className="ab-tool-tag">{tag}</span>
                                    ))}
                                </div>
                                <a href="/client/scam-checker" className="ab-btn" style={{ color: "#f87171", borderColor: "rgba(248,113,113,0.3)", background: "rgba(248,113,113,0.08)" }}>
                                    <ShieldCheck size={11} /> LAUNCH_TOOL()
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Stack ── */}
                <div className="ab-stack-section" style={{ borderTop: "1px solid var(--border)", marginTop: 52 }}>
                    <p className="ab-section__eyebrow" style={{ textAlign: "center" }}>// Professional Production Stack</p>
                    <div className="ab-stack-pills">
                        {STACK.map((t) => (
                            <span key={t.label} className="ab-pill">{t.label}</span>
                        ))}
                    </div>
                </div>

                {/* ── CTA ── */}
                <div className="ab-cta">
                    <div className="ab-cta-inner">
                        <div>
                            <div className="ab-cta__title">Start a project</div>
                            <div className="ab-cta__sub">
                                Sockets configured to accept remote development profiles, custom structural integrations, and full-stack optimizations across African digital markets.
                            </div>
                        </div>
                        <div className="ab-cta__actions">
                            <a href="/bc/contact" className="ab-btn ab-btn--accent"><Mail size={11} /> Contact</a>
                            <a href="https://github.com/Brown-Oziomachi" target="_blank" rel="noopener noreferrer" className="ab-btn"><Github size={11} /> GitHub</a>
                        </div>
                    </div>
                </div>

                {/* ── Footer ── */}
                <div style={{ borderTop: "1px solid var(--border)" }}>
                    <div className="ab-footer">
                        <span className="ab-footer__copy">© {new Date().getFullYear()} Brown Code // browncode.name.ng</span>
                        <div className="ab-footer__links">
                            <a href="tel:07013725529" className="ab-footer__link"><Phone size={10} /> 08142995114</a>
                            <a href="mailto:browncemmanuel@gmail.com" className="ab-footer__link"><Mail size={10} /> browncemmanuel@gmail.com</a>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}