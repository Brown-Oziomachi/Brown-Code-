"use client";
import React, { useState, useEffect, Suspense } from "react";
import {
    Github, Linkedin, Mail, Download, Terminal, Cpu,
    Database, Layers, GitBranch, Binary, Code,
    ExternalLink, ArrowRight, User, ShieldAlert, ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import Testimonials from "@/components/Testimonials";
import FirebaseChat from "@/components/FirebaseChat";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import FloatingClient from "../floatingchat/chat";

export default function PortfolioClients() {
    const [activeSection, setActiveSection] = useState("home");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const seen = localStorage.getItem("jobsPopupSeen");
        if (!seen) {
            const t = setTimeout(() => {
                setShowPopup(true);
                localStorage.setItem("jobsPopupSeen", "true");
            }, 10000);
            return () => clearTimeout(t);
        }
    }, []);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setActiveSection(id);
        setIsMenuOpen(false);
    };

    const projects = [
        {
            id: "PRJ — 01",
            title: "Yotapoint E-Commerce",
            description: "Scalable transactional client platform with integrated state machines, secure payment protocols, and a centralized operational dashboard.",
            image: "/yota.jpg",
            link: "https://yotapoint.com",
            tags: ["State Logic", "API Sockets", "Schema Panel"],
            year: "2025",
            status: "Live",
        },
        {
            id: "PRJ — 02",
            title: "Cyclopedia News",
            description: "Content engine delivery platform featuring real-time payload pipelines, complex rendering logic, and integrated media stream layers.",
            image: "/the.jpg",
            link: "https://www.thecyclopedia.com.ng",
            tags: ["Next.js", "React", "Data Streams"],
            year: "2025",
            status: "Production",
        },
        {
            id: "PRJ — 03",
            title: "IJ Stitches Portfolio",
            description: "High-performance interface framework built around lightweight asset weights, modular scaling, and optimal UX layout nodes.",
            image: "/ijs.jpg",
            link: "https://ij-stitches.vercel.app/main",
            tags: ["React", "UI Hooks", "Asset Optimization"],
            year: "2025",
            status: "Stable",
        },
    ];

    const skills = [
        { name: "React & Next.js SSR", level: 70, tag: "Production Ready" },
        { name: "Node.js & Vercel Serverless", level: 50, tag: "Stable Backend" },
        { name: "JavaScript ES6+ Runtime", level: 45, tag: "Intermediate Core" },
        { name: "Database Architecture", level: 70, tag: "Scalable" },
    ];

    const values = [
        { icon: <Binary size={16} />, title: "Algorithmic Precision", body: "Maintainable, predictable, modular structures that minimize technical debt." },
        { icon: <Terminal size={16} />, title: "Async Architecture", body: "Optimizing network round-trips and server workloads for raw performance." },
        { icon: <GitBranch size={16} />, title: "Robust Modularity", body: "Reusable logic isolated into components built for clean scaling." },
        { icon: <Layers size={16} />, title: "Adaptability", body: "Tracking web patterns, security layers, and structural updates continuously." },
    ];

    const timeline = [
        { year: "2024", title: "Full Stack Developer", body: "Architecting full functional interfaces, handling data streams, and building integrated Node.js solutions.", icon: <Code size={13} /> },
        { year: "2022", title: "Foundation & Core Tracks", body: "Initiated programmatic core tracks. Deep data layout structures, schema validation parsing, and foundational algorithms.", icon: <Cpu size={13} /> },
    ];

    const stats = [
        { num: "02+", label: "Years exp." },
        { num: "05+", label: "Shipped" },
        { num: "100%", label: "Delivery" },
    ];

    return (
        <>
            <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:         #0a0a0b;
          --surface:    #111113;
          --surface-2:  #18181b;
          --border:     #1e1e22;
          --border-hi:  #2e2e34;
          --text-1:     #f4f4f5;
          --text-2:     #a1a1aa;
          --text-3:     #52525b;
          --accent:     #e8ff47;
          --accent-dim: rgba(232,255,71,0.08);
          --accent-bdr: rgba(232,255,71,0.25);
          --radius:     6px;
          --serif:      'DM Serif Display', Georgia, serif;
          --sans:       'Inter', system-ui, sans-serif;
          --mono:       'JetBrains Mono', 'Fira Code', monospace;
        }

        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .pf-page {
          background: var(--bg);
          color: var(--text-2);
          font-family: var(--sans);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── Section wrapper ── */
        .pf-section {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .pf-divider { border: none; border-top: 1px solid var(--border); }

        /* ── Eyebrow ── */
        .pf-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--text-3);
          margin-bottom: 20px;
        }
        .pf-eyebrow__dot {
          width: 5px; height: 5px; background: var(--accent);
          border-radius: 50%;
        }

        /* ════════════════════════════════════
           HERO
        ════════════════════════════════════ */
        .pf-hero {
          padding: 80px 24px 72px;
          border-bottom: 1px solid var(--border);
        }
        .pf-hero__inner {
          max-width: 1120px; margin: 0 auto;
          display: grid; grid-template-columns: 300px 1fr;
          gap: 60px; align-items: start;
        }
        @media (max-width: 840px) {
          .pf-hero__inner { grid-template-columns: 1fr; gap: 36px; }
        }

        /* Profile card */
        .pf-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); overflow: hidden;
        }
        .pf-card__img { position: relative; aspect-ratio: 1; }
        .pf-card__img img {
          width: 100%; height: 100%; object-fit: cover;
          display: block; opacity: 0.82; filter: grayscale(15%);
          transition: opacity 0.3s, filter 0.3s;
        }
        .pf-card:hover .pf-card__img img { opacity: 1; filter: grayscale(0); }
        .pf-card__img-fade {
          position: absolute; inset: 0;
          background: linear-gradient(to top, var(--bg) 0%, transparent 55%);
        }
        .pf-card__badge {
          position: absolute; bottom: 12px; left: 12px; right: 12px;
          background: rgba(17,17,19,0.96); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 10px 14px;
        }
        .pf-card__badge-name {
          font-family: var(--serif); font-size: 16px; color: var(--text-1);
        }
        .pf-card__badge-role {
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--accent); margin-top: 2px;
        }

        .pf-card__meta {
          padding: 16px; display: flex; flex-direction: column; gap: 9px;
          border-top: 1px solid var(--border);
        }
        .pf-card__row { display: flex; justify-content: space-between; align-items: center; }
        .pf-card__key {
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--text-3);
        }
        .pf-card__val { font-family: var(--mono); font-size: 10px; color: var(--text-2); }
        .pf-card__val--accent { color: var(--accent); }
        .pf-card__status {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: var(--mono); font-size: 9px; color: #4ade80;
          background: rgba(74,222,128,0.07); border: 1px solid rgba(74,222,128,0.18);
          padding: 2px 8px; border-radius: 3px;
        }
        .pf-card__status-dot {
          width: 5px; height: 5px; border-radius: 50%; background: #4ade80;
          animation: pf-status 1.4s ease-out infinite;
        }
        @keyframes pf-status {
          0%   { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
          100% { box-shadow: 0 0 0 6px rgba(74,222,128,0); }
        }

        /* Stats strip */
        .pf-stats {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 1px; background: var(--border);
          border: 1px solid var(--border); border-top: none;
          border-radius: 0 0 var(--radius) var(--radius); overflow: hidden;
        }
        .pf-stat { background: var(--surface); padding: 14px 8px; text-align: center; }
        .pf-stat__num {
          font-family: var(--serif); font-size: 22px; color: var(--text-1);
          line-height: 1;
        }
        .pf-stat__label {
          font-family: var(--mono); font-size: 8px; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--text-3); margin-top: 4px;
        }

        /* Hero copy */
        .pf-hero__copy { padding-top: 8px; }
        .pf-hero__title {
          font-family: var(--serif);
          font-size: clamp(36px, 5.5vw, 68px);
          color: var(--text-1); line-height: 1.05;
          letter-spacing: -0.01em; margin-bottom: 20px;
        }
        .pf-hero__title em { font-style: normal; color: var(--accent); }
        .pf-hero__desc {
          font-size: 15px; line-height: 1.75; color: var(--text-2);
          font-weight: 300; max-width: 520px;
          border-left: 2px solid var(--border); padding-left: 18px;
          margin-bottom: 32px;
        }
        .pf-hero__actions { display: flex; flex-wrap: wrap; gap: 10px; }

        .pf-btn {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em;
          padding: 10px 20px; border-radius: var(--radius);
          border: 1px solid var(--border); background: var(--surface);
          color: var(--text-2); cursor: pointer; text-decoration: none;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
          white-space: nowrap;
        }
        .pf-btn:hover { color: var(--text-1); border-color: var(--border-hi); }
        .pf-btn--accent {
          background: var(--accent); border-color: var(--accent);
          color: #0a0a0b; font-weight: 600;
        }
        .pf-btn--accent:hover {
          background: #d4eb3c; border-color: #d4eb3c; color: #0a0a0b;
        }

        /* Spec table */
        .pf-spec-table {
          margin-top: 36px; border: 1px solid var(--border);
          border-radius: var(--radius); overflow: hidden;
        }
        .pf-spec-table__header {
          background: var(--surface-2); padding: 9px 14px;
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--text-3);
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; gap: 6px;
        }
        .pf-spec-table__header svg { color: var(--accent); }
        .pf-spec-row {
          display: flex; justify-content: space-between;
          padding: 8px 14px; border-bottom: 1px solid var(--border);
          font-family: var(--mono); font-size: 10px;
        }
        .pf-spec-row:last-child { border-bottom: none; }
        .pf-spec-row__key { color: var(--text-3); }
        .pf-spec-row__val { color: var(--text-2); text-align: right; }
        .pf-spec-row__val--accent { color: var(--accent); }

        /* ════════════════════════════════════
           ABOUT / DIAGNOSTIC
        ════════════════════════════════════ */
        .pf-about {
          padding: 72px 24px;
          border-bottom: 1px solid var(--border);
        }
        .pf-about__grid {
          max-width: 1120px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 380px;
          gap: 48px; align-items: start;
        }
        @media (max-width: 900px) {
          .pf-about__grid { grid-template-columns: 1fr; }
        }

        .pf-about__manifesto {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 28px;
          margin-bottom: 24px;
        }
        .pf-about__manifesto p {
          font-size: 14px; color: var(--text-2); line-height: 1.75;
          font-weight: 300; margin-bottom: 14px;
        }
        .pf-about__manifesto p:last-of-type { margin-bottom: 20px; }

        /* Values */
        .pf-values { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 560px) { .pf-values { grid-template-columns: 1fr; } }
        .pf-value {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 16px;
          display: flex; gap: 12px; align-items: flex-start;
          transition: border-color 0.15s;
        }
        .pf-value:hover { border-color: var(--border-hi); }
        .pf-value__icon {
          width: 32px; height: 32px; background: var(--bg);
          border: 1px solid var(--border); border-radius: var(--radius);
          display: flex; align-items: center; justify-content: center;
          color: var(--accent); flex-shrink: 0;
        }
        .pf-value__title {
          font-size: 12px; font-weight: 600; color: var(--text-1);
          margin-bottom: 3px;
        }
        .pf-value__body { font-size: 11px; color: var(--text-3); line-height: 1.6; }

        /* Right column: skills + timeline */
        .pf-skills { margin-bottom: 24px; }
        .pf-skill-list { display: flex; flex-direction: column; gap: 14px; }
        .pf-skill__header {
          display: flex; justify-content: space-between;
          font-size: 12px; margin-bottom: 6px;
        }
        .pf-skill__name { color: var(--text-1); font-weight: 500; }
        .pf-skill__pct { font-family: var(--mono); font-size: 11px; color: var(--accent); }
        .pf-skill__track {
          height: 2px; background: var(--border); border-radius: 1px;
          overflow: hidden; margin-bottom: 3px;
        }
        .pf-skill__fill { height: 100%; background: var(--accent); border-radius: 1px; }
        .pf-skill__tag {
          font-family: var(--mono); font-size: 9px; text-transform: uppercase;
          letter-spacing: 0.08em; color: var(--text-3);
        }

        /* Timeline */
        .pf-timeline {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 20px;
        }
        .pf-timeline__label {
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--text-3);
          margin-bottom: 16px;
        }
        .pf-tl-list {
          border-left: 1px solid var(--border); padding-left: 18px;
          display: flex; flex-direction: column; gap: 20px;
        }
        .pf-tl-item { position: relative; }
        .pf-tl-dot {
          position: absolute; left: -24px; top: 5px;
          width: 7px; height: 7px; background: var(--bg);
          border: 2px solid var(--accent); border-radius: 50%;
        }
        .pf-tl-year {
          display: inline-block; font-family: var(--mono); font-size: 9px;
          letter-spacing: 0.1em; color: var(--accent);
          background: var(--accent-dim); border: 1px solid var(--accent-bdr);
          padding: 1px 7px; border-radius: 3px; margin-bottom: 5px;
        }
        .pf-tl-title { font-size: 12px; font-weight: 600; color: var(--text-1); margin-bottom: 4px; }
        .pf-tl-body { font-size: 11px; color: var(--text-3); line-height: 1.6; }

        /* ════════════════════════════════════
           PROJECTS
        ════════════════════════════════════ */
        .pf-projects {
          padding: 72px 24px;
          border-bottom: 1px solid var(--border);
        }
        .pf-projects__grid {
          max-width: 1120px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 860px) { .pf-projects__grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .pf-projects__grid { grid-template-columns: 1fr; } }

        .pf-proj {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); overflow: hidden;
          display: flex; flex-direction: column;
          transition: border-color 0.2s, transform 0.2s;
        }
        .pf-proj:hover { border-color: var(--border-hi); transform: translateY(-2px); }

        .pf-proj__img { position: relative; aspect-ratio: 16/9; overflow: hidden; }
        .pf-proj__img img {
          width: 100%; height: 100%; object-fit: cover;
          display: block; filter: grayscale(20%); opacity: 0.8;
          transition: filter 0.3s, opacity 0.3s, transform 0.4s;
        }
        .pf-proj:hover .pf-proj__img img {
          filter: grayscale(0); opacity: 1; transform: scale(1.04);
        }
        .pf-proj__img-fade {
          position: absolute; inset: 0;
          background: linear-gradient(to top, var(--bg) 0%, transparent 60%);
        }
        .pf-proj__id {
          position: absolute; top: 10px; left: 10px;
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.08em;
          color: var(--text-3); background: rgba(10,10,11,0.85);
          border: 1px solid var(--border); padding: 2px 7px; border-radius: 3px;
        }
        .pf-proj__status {
          position: absolute; top: 10px; right: 10px;
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.06em;
          color: var(--accent); background: var(--accent-dim);
          border: 1px solid var(--accent-bdr); padding: 2px 7px; border-radius: 3px;
        }

        .pf-proj__body { padding: 18px; flex: 1; }
        .pf-proj__year {
          font-family: var(--mono); font-size: 9px; color: var(--text-3);
          margin-bottom: 6px;
        }
        .pf-proj__title {
          font-family: var(--serif); font-size: 18px; color: var(--text-1);
          line-height: 1.2; margin-bottom: 8px;
          transition: color 0.15s;
        }
        .pf-proj:hover .pf-proj__title { color: var(--accent); }
        .pf-proj__desc { font-size: 12px; color: var(--text-3); line-height: 1.65; font-weight: 300; }

        .pf-proj__footer {
          padding: 14px 18px; border-top: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
        }
        .pf-proj__tags { display: flex; flex-wrap: wrap; gap: 5px; }
        .pf-proj__tag {
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.06em;
          color: var(--text-3); background: var(--bg);
          border: 1px solid var(--border); padding: 2px 7px; border-radius: 3px;
        }
        .pf-proj__link {
          display: inline-flex; align-items: center; gap: 4px;
          font-family: var(--mono); font-size: 10px; color: var(--text-3);
          text-decoration: none; transition: color 0.15s; flex-shrink: 0;
        }
        .pf-proj__link:hover { color: var(--accent); }

        .pf-projects__more {
          max-width: 1120px; margin: 24px auto 0;
          text-align: center;
        }

        /* ════════════════════════════════════
           JOBS CTA BAND
        ════════════════════════════════════ */
        .pf-jobs {
          padding: 72px 24px;
          border-bottom: 1px solid var(--border);
        }
        .pf-jobs__inner {
          max-width: 1120px; margin: 0 auto;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 40px 36px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 28px; border-left: 3px solid var(--accent);
          position: relative; overflow: hidden;
        }
        @media (max-width: 680px) { .pf-jobs__inner { flex-direction: column; align-items: flex-start; } }
        .pf-jobs__title {
          font-family: var(--serif); font-size: 26px; color: var(--text-1);
          margin-bottom: 6px;
        }
        .pf-jobs__sub { font-size: 13px; color: var(--text-3); line-height: 1.65; max-width: 440px; font-weight: 300; }

        /* ════════════════════════════════════
           CONTACT STRIP
        ════════════════════════════════════ */
        .pf-contact {
          padding: 80px 24px 72px;
        }
        .pf-contact__inner {
          max-width: 540px; margin: 0 auto; text-align: center;
        }
        .pf-contact__title {
          font-family: var(--serif); font-size: clamp(28px, 4vw, 44px);
          color: var(--text-1); margin-bottom: 12px; line-height: 1.1;
        }
        .pf-contact__sub {
          font-size: 14px; color: var(--text-2); line-height: 1.7;
          font-weight: 300; margin-bottom: 28px;
        }
        .pf-contact__socials {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          margin-bottom: 24px;
        }
        .pf-social {
          width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
          color: var(--text-3); text-decoration: none;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
        }
        .pf-social:hover {
          color: var(--accent); border-color: var(--accent-bdr); background: var(--accent-dim);
        }

        /* ════════════════════════════════════
           POPUP
        ════════════════════════════════════ */
        .pf-popup-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(10,10,11,0.85); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center; padding: 24px;
        }
        .pf-popup {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 28px; max-width: 400px; width: 100%;
          position: relative; border-top: 2px solid var(--accent);
        }
        .pf-popup__close {
          position: absolute; top: 14px; right: 14px;
          background: none; border: none; cursor: pointer;
          font-family: var(--mono); font-size: 11px; color: var(--text-3);
          transition: color 0.15s;
        }
        .pf-popup__close:hover { color: var(--text-1); }
        .pf-popup__eyebrow {
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--accent); margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .pf-popup__title {
          font-family: var(--serif); font-size: 22px; color: var(--text-1);
          margin-bottom: 8px;
        }
        .pf-popup__body { font-size: 13px; color: var(--text-2); line-height: 1.65; margin-bottom: 20px; font-weight: 300; }
      `}</style>

            <div className="pf-page">

                <Navbar
                    isScrolled={isScrolled}
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    activeSection={activeSection}
                    scrollToSection={scrollToSection}
                />

                {/* ── HERO ── */}
                <section id="home">
                    <div className="pf-hero">
                        <div className="pf-hero__inner">

                            {/* Left: profile card */}
                            <div>
                                <div className="pf-card">
                                    <div className="pf-card__img">
                                        <img src="/coder1.png" alt="Sir Brown AD" />
                                        <div className="pf-card__img-fade" />
                                        <div className="pf-card__badge">
                                            <div className="pf-card__badge-name">Sir Brown AD</div>
                                            <div className="pf-card__badge-role">Full-Stack Developer</div>
                                        </div>
                                    </div>
                                    <div className="pf-card__meta">
                                        <div className="pf-card__row">
                                            <span className="pf-card__key">Location</span>
                                            <span className="pf-card__val">Nigeria · Remote</span>
                                        </div>
                                        <div className="pf-card__row">
                                            <span className="pf-card__key">Runtime</span>
                                            <span className="pf-card__val pf-card__val--accent">Node · Next · ES6+</span>
                                        </div>
                                        <div className="pf-card__row">
                                            <span className="pf-card__key">Status</span>
                                            <span className="pf-card__status">
                                                <span className="pf-card__status-dot" /> Open to work
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pf-stats">
                                    {stats.map((s) => (
                                        <div key={s.label} className="pf-stat">
                                            <div className="pf-stat__num">{s.num}</div>
                                            <div className="pf-stat__label">{s.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Spec table */}
                                <div className="pf-spec-table">
                                    <div className="pf-spec-table__header">
                                        <Terminal size={11} /> System spec
                                    </div>
                                    {[
                                        ["Access", "Root / Auth granted", true],
                                        ["Data store", "Firestore · Cloud"],
                                        ["Protocol", "HTTPS · WSS · REST"],
                                        ["Uptime", "02+ yrs active"],
                                    ].map(([k, v, acc]) => (
                                        <div key={k} className="pf-spec-row">
                                            <span className="pf-spec-row__key">{k}</span>
                                            <span className={`pf-spec-row__val${acc ? " pf-spec-row__val--accent" : ""}`}>{v}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: copy */}
                            <div className="pf-hero__copy">
                                <div className="pf-eyebrow">
                                    <span className="pf-eyebrow__dot" />
                                    BC_CORE_v2.0.6 · Portfolio
                                </div>
                                <h1 className="pf-hero__title">
                                    Building<br />high-velocity<br /><em>web systems.</em>
                                </h1>
                                <p className="pf-hero__desc">
                                    I bypass boilerplate conventions to architect zero-latency frontends and structural
                                    layout lifecycles. Focused on lightweight footprints, decoupled data routing pipelines,
                                    and robust execution context safety.
                                </p>
                                <div className="pf-hero__actions">
                                    <button
                                        className="pf-btn pf-btn--accent"
                                        onClick={() => scrollToSection("projects")}
                                    >
                                        View projects <ArrowRight size={13} />
                                    </button>
                                    <Link href="/cv" className="pf-btn">
                                        <Download size={13} /> Resume
                                    </Link>
                                    <Link href="/bc/about" className="pf-btn">
                                        <User size={13} /> About me
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── ABOUT / DIAGNOSTIC ── */}
                <section id="about">
                    <div className="pf-about">
                        <div className="pf-about__grid">

                            {/* Left */}
                            <div>
                                <div className="pf-eyebrow">
                                    <span className="pf-eyebrow__dot" />
                                    Architectural manifesto
                                </div>
                                <div className="pf-about__manifesto">
                                    <p>
                                        My development process bypasses visual decoration in favour of systemic
                                        precision. I scale custom JavaScript applications with strict operational limits,
                                        explicit side-effect tracking, and encapsulated data isolation loops.
                                    </p>
                                    <p>
                                        Every application stack I initialise prioritises layout render performance,
                                        robust data schema safety boundaries, and modular component isolation.
                                    </p>
                                    <Link href="/bc/about" className="pf-btn" style={{ display: "inline-flex" }}>
                                        Full profile <ArrowRight size={12} />
                                    </Link>
                                </div>

                                <div className="pf-values">
                                    {values.map((v) => (
                                        <div key={v.title} className="pf-value">
                                            <div className="pf-value__icon">{v.icon}</div>
                                            <div>
                                                <div className="pf-value__title">{v.title}</div>
                                                <div className="pf-value__body">{v.body}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right */}
                            <div>
                                <div className="pf-eyebrow">
                                    <span className="pf-eyebrow__dot" />
                                    Stack capacities
                                </div>
                                <div className="pf-skills">
                                    <div className="pf-skill-list">
                                        {skills.map((s) => (
                                            <div key={s.name}>
                                                <div className="pf-skill__header">
                                                    <span className="pf-skill__name">{s.name}</span>
                                                    <span className="pf-skill__pct">{s.level}%</span>
                                                </div>
                                                <div className="pf-skill__track">
                                                    <div className="pf-skill__fill" style={{ width: `${s.level}%` }} />
                                                </div>
                                                <div className="pf-skill__tag">{s.tag}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pf-timeline">
                                    <div className="pf-timeline__label">Career timeline</div>
                                    <div className="pf-tl-list">
                                        {timeline.map((t) => (
                                            <div key={t.year} className="pf-tl-item">
                                                <div className="pf-tl-dot" />
                                                <span className="pf-tl-year">{t.year}</span>
                                                <div className="pf-tl-title">{t.title}</div>
                                                <div className="pf-tl-body">{t.body}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* ── PROJECTS ── */}
                <section id="projects">
                    <div className="pf-projects">
                        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
                            <div className="pf-eyebrow">
                                <span className="pf-eyebrow__dot" />
                                Production deployments
                            </div>
                            <div className="pf-projects__grid">
                                {projects.map((p) => (
                                    <article key={p.id} className="pf-proj">
                                        <div className="pf-proj__img">
                                            <img src={p.image} alt={p.title} />
                                            <div className="pf-proj__img-fade" />
                                            <span className="pf-proj__id">{p.id}</span>
                                            <span className="pf-proj__status">{p.status}</span>
                                        </div>
                                        <div className="pf-proj__body">
                                            <div className="pf-proj__year">{p.year}</div>
                                            <div className="pf-proj__title">{p.title}</div>
                                            <p className="pf-proj__desc">{p.description}</p>
                                        </div>
                                        <div className="pf-proj__footer">
                                            <div className="pf-proj__tags">
                                                {p.tags.map((t) => (
                                                    <span key={t} className="pf-proj__tag">{t}</span>
                                                ))}
                                            </div>

                                            <a
                                                href={p.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="pf-proj__link"
                                            >
                                                Visit <ArrowUpRight size={11} />
                                            </a>
                                        </div>
                                    </article>
                                ))}
                            </div>
                            <div className="pf-projects__more">
                                <Link href="/bc/projects" className="pf-btn" style={{ display: "inline-flex" }}>
                                    All projects <ArrowRight size={12} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── JOBS CTA ── */}
                <section id="jobs">
                    <div className="pf-jobs">
                        <div className="pf-jobs__inner">
                            <div>
                                <div className="pf-eyebrow" style={{ marginBottom: 10 }}>
                                    <span className="pf-eyebrow__dot" />
                                    Remote opportunities
                                </div>
                                <div className="pf-jobs__title">Worldwide remote work</div>
                                <p className="pf-jobs__sub">
                                    Parameters configured for distributed micro-tasks, long-term full-stack infrastructure,
                                    and secure remote platform execution.
                                </p>
                            </div>
                            <Link href="/jobs" className="pf-btn pf-btn--accent" style={{ flexShrink: 0 }}>
                                View opportunities <ArrowRight size={13} />
                            </Link>
                        </div>
                    </div>
                </section>

                <Testimonials />

                {/* ── CONTACT ── */}
                <section id="contact">
                    <div className="pf-contact">
                        <div className="pf-contact__inner">
                            <div className="pf-eyebrow" style={{ justifyContent: "center" }}>
                                <span className="pf-eyebrow__dot" />
                                Get in touch
                            </div>
                            <h2 className="pf-contact__title">Let's build something together</h2>
                            <p className="pf-contact__sub">
                                Submit project queries, remote contracts, or JavaScript system design consults
                                and I'll respond within 24 hours.
                            </p>
                            <div className="pf-contact__socials">
                                {[
                                    { href: "https://github.com/Brown-Oziomachi", icon: <Github size={16} />, label: "GitHub" },
                                    { href: "https://www.linkedin.com/in/brownoziomachi72a5a3229", icon: <Linkedin size={16} />, label: "LinkedIn" },
                                    { href: "mailto:browncemmanuel@gmail.com", icon: <Mail size={16} />, label: "Email" },
                                ].map((s) => (
                                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="pf-social" aria-label={s.label}>
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                            <Link href="/bc/contact" className="pf-btn pf-btn--accent">
                                Start a conversation <ArrowRight size={13} />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ── POPUP ── */}
                {
                    showPopup && (
                        <div className="pf-popup-overlay">
                            <div className="pf-popup">
                                <button className="pf-popup__close" onClick={() => setShowPopup(false)}>
                                    [✕] close
                                </button>
                                <div className="pf-popup__eyebrow">
                                    <ShieldAlert size={11} /> Remote opportunities open
                                </div>
                                <div className="pf-popup__title">Active job pipelines</div>
                                <p className="pf-popup__body">
                                    Global remote endpoints are currently open for deep structural integration.
                                    Browse available positions now.
                                </p>
                                <Link
                                    href="/jobs"
                                    className="pf-btn pf-btn--accent"
                                    style={{ width: "100%", justifyContent: "center" }}
                                    onClick={() => setShowPopup(false)}
                                >
                                    View open roles <ArrowRight size={13} />
                                </Link>
                            </div>
                        </div>
                    )
                }

                <Footer />

                <Suspense fallback={null}>
                    <FloatingClient onChatOpen={() => setIsChatOpen(true)} />
                </Suspense>
                <FirebaseChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

            </div >
        </>
    );
}