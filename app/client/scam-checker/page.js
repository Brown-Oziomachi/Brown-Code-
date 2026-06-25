"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import {
    AlertTriangle, CheckCircle, ArrowLeft, MoreVertical,
    Phone, Video, Info, CheckCheck, Terminal, ShieldAlert,
    ArrowRight, Binary
} from "lucide-react";

export default function PortfolioScamChecker() {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("scam-checker");

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        router.push(`/#${sectionId}`);
    };

    const chatLog = [
        { from: "developer", text: "Hey! I'd love to build your website. It's going to be amazing! 🚀", time: "11:24 AM", isRedFlag: false },
        { from: "client", text: "That sounds great! Can I see some of your previous work?", time: "11:26 AM", isRedFlag: false },
        { from: "developer", text: "My portfolio is still being updated. But trust me, I'm really good! I've done tons of projects.", time: "11:27 AM", isRedFlag: false },
        { from: "client", text: "Okay, what's your process? How do we get started?", time: "11:30 AM", isRedFlag: false },
        { from: "developer", text: "I need the full payment of $5,000 upfront before I start. That's how I work. 💰", time: "11:31 AM", isRedFlag: true },
        { from: "client", text: "That seems like a lot upfront. Can we do payments in stages? Like 30% now, 40% halfway, 30% when done?", time: "11:35 AM", isRedFlag: false },
        { from: "developer", text: "No, I don't work that way. I need full payment first. If you don't trust me, maybe we shouldn't work together. 🤷‍♂️", time: "11:36 AM", isRedFlag: true },
        { from: "client", text: "Can you at least show me a contract or timeline of what you'll deliver?", time: "11:39 AM", isRedFlag: false },
        { from: "developer", text: "We can figure out details later. But I need the money first. I have other clients waiting, so decide fast! ⏰", time: "11:40 AM", isRedFlag: true },
    ];

    const redFlags = [
        "Missing active portfolio or live software URLs",
        "Insisting on full upfront budget allocation",
        "Rejecting milestones or sandbox test access",
        "Absence of signed operational agreements",
        "Instigating synthetic timeline panic loops",
    ];

    const greenFlags = [
        "Provision of verified live deployment builds",
        "Structural staging pipelines with split funding",
        "Explicit, legally valid delivery agreements",
        "Clear milestone schedules and tracking updates",
        "Objective, transparent scoping communication",
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
          --danger:     rgba(239,68,68,0.08);
          --danger-bdr: rgba(239,68,68,0.2);
          --danger-txt: #fca5a5;
          --radius:     6px;
          --serif:      'DM Serif Display', Georgia, serif;
          --sans:       'Inter', system-ui, sans-serif;
          --mono:       'JetBrains Mono', 'Fira Code', monospace;
        }

        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .sc-page {
          background: var(--bg);
          color: var(--text-2);
          font-family: var(--sans);
          min-height: 100vh;
        }

        .sc-wrap {
          max-width: 780px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── Eyebrow ── */
        .sc-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--text-3);
          margin-bottom: 16px;
        }
        .sc-eyebrow__dot {
          width: 5px; height: 5px; background: var(--accent); border-radius: 50%;
        }

        /* ── Page header ── */
        .sc-header {
          padding: 112px 24px 56px;
          border-bottom: 1px solid var(--border);
          text-align: center;
        }
        .sc-header__title {
          font-family: var(--serif);
          font-size: clamp(32px, 5vw, 52px);
          color: var(--text-1);
          line-height: 1.05;
          letter-spacing: -0.01em;
          margin-bottom: 14px;
        }
        .sc-header__title em { font-style: normal; color: var(--accent); }
        .sc-header__sub {
          font-size: 13px;
          color: var(--text-3);
          font-weight: 300;
          max-width: 440px;
          margin: 0 auto;
          line-height: 1.7;
          font-family: var(--mono);
          letter-spacing: 0.02em;
        }

        /* ── Section wrapper ── */
        .sc-section {
          padding: 56px 24px;
          border-bottom: 1px solid var(--border);
        }

        /* ── Spec table ── */
        .sc-spec-table {
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          margin-bottom: 32px;
        }
        .sc-spec-table__header {
          background: var(--surface-2);
          padding: 9px 14px;
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--text-3);
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; gap: 6px;
        }
        .sc-spec-table__header svg { color: var(--accent); }
        .sc-spec-row {
          display: flex; justify-content: space-between;
          padding: 8px 14px; border-bottom: 1px solid var(--border);
          font-family: var(--mono); font-size: 10px;
        }
        .sc-spec-row:last-child { border-bottom: none; }
        .sc-spec-row__key { color: var(--text-3); }
        .sc-spec-row__val { color: var(--text-2); }
        .sc-spec-row__val--accent { color: var(--accent); }
        .sc-spec-row__val--danger { color: var(--danger-txt); }

        /* ── Chat frame ── */
        .sc-chat-frame {
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          background: #0b141a;
          display: flex;
          flex-direction: column;
          height: 620px;
        }

        /* Chat topbar */
        .sc-chat-bar {
          background: #202c33;
          padding: 10px 14px;
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid #222e35;
          flex-shrink: 0;
        }
        .sc-chat-bar__left { display: flex; align-items: center; gap: 10px; }
        .sc-chat-bar__avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--accent); display: flex; align-items: center;
          justify-content: center; font-family: var(--mono); font-size: 11px;
          font-weight: 600; color: #0a0a0b; flex-shrink: 0; position: relative;
        }
        .sc-chat-bar__online {
          position: absolute; bottom: 0; right: 0;
          width: 9px; height: 9px; background: #4ade80;
          border: 2px solid #202c33; border-radius: 50%;
        }
        .sc-chat-bar__name {
          font-size: 13px; font-weight: 600; color: #e9edef; font-family: var(--sans);
        }
        .sc-chat-bar__status {
          font-family: var(--mono); font-size: 10px; color: var(--accent);
        }
        .sc-chat-bar__actions {
          display: flex; align-items: center; gap: 16px; color: #aebac1;
        }
        .sc-chat-bar__actions svg { cursor: pointer; transition: color 0.15s; }
        .sc-chat-bar__actions svg:hover { color: #e9edef; }

        /* Chat feed */
        .sc-chat-feed {
          flex: 1; overflow-y: auto; padding: 16px;
          display: flex; flex-direction: column; gap: 12px;
          background-color: #0b141a;
          background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
          background-blend-mode: overlay;
        }
        .sc-chat-feed::-webkit-scrollbar { width: 4px; }
        .sc-chat-feed::-webkit-scrollbar-track { background: transparent; }
        .sc-chat-feed::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

        /* E2E notice */
        .sc-e2e {
          display: flex; justify-content: center; margin: 4px 0 8px;
        }
        .sc-e2e__pill {
          background: rgba(24,34,41,0.92); border: 1px solid #222e35;
          color: #8696a0; font-size: 11px; padding: 6px 14px;
          border-radius: 8px; max-width: 320px; text-align: center;
          display: flex; align-items: flex-start; gap: 6px; line-height: 1.5;
        }
        .sc-e2e__pill svg { flex-shrink: 0; margin-top: 1px; color: #ffd279; }

        /* Message bubbles */
        .sc-msg { display: flex; }
        .sc-msg--client { justify-content: flex-end; }
        .sc-msg--dev { justify-content: flex-start; }

        .sc-bubble {
          max-width: 74%; padding: 7px 12px 20px;
          border-radius: 8px; position: relative;
          font-size: 13px; line-height: 1.5;
        }
        .sc-bubble--client {
          background: #005c4b; color: #e9edef;
          border-top-right-radius: 2px;
        }
        .sc-bubble--dev {
          background: #202c33; color: #e9edef;
          border-top-left-radius: 2px;
        }
        .sc-bubble--redflag {
          background: rgba(59,25,25,0.95);
          border: 1px solid rgba(239,68,68,0.25);
          color: #fca5a5;
          border-top-left-radius: 2px;
        }
        .sc-bubble__flag {
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em;
          text-transform: uppercase; color: #ef4444;
          font-weight: 600; display: block; margin-bottom: 4px;
        }
        .sc-bubble__meta {
          position: absolute; bottom: 4px; right: 8px;
          display: flex; align-items: center; gap: 3px;
        }
        .sc-bubble__time {
          font-size: 9px; color: #8696a0; font-family: var(--mono);
        }

        /* Chat input */
        .sc-chat-input {
          background: #202c33; padding: 10px 12px;
          display: flex; align-items: center; gap: 10px;
          border-top: 1px solid #222e35; flex-shrink: 0;
        }
        .sc-chat-input__field {
          flex: 1; background: #2a3942; border-radius: 20px;
          padding: 8px 14px; font-size: 11px; color: #8696a0;
          font-family: var(--mono);
        }
        .sc-chat-input__send {
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--accent); display: flex; align-items: center;
          justify-content: center; font-size: 14px; flex-shrink: 0;
          color: #0a0a0b; font-weight: 700;
        }

        /* ── Analysis grid ── */
        .sc-analysis {
          padding: 56px 24px;
          border-bottom: 1px solid var(--border);
        }
        .sc-analysis__grid {
          max-width: 780px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 600px) { .sc-analysis__grid { grid-template-columns: 1fr; } }

        .sc-flag-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
        }
        .sc-flag-card__header {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; gap: 8px;
          background: var(--surface-2);
        }
        .sc-flag-card__label {
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em;
          text-transform: uppercase; font-weight: 600;
        }
        .sc-flag-card__label--red { color: #ef4444; }
        .sc-flag-card__label--green { color: #4ade80; }
        .sc-flag-card__body { padding: 16px; }
        .sc-flag-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 8px 0; border-bottom: 1px solid var(--border);
          font-size: 12px; color: var(--text-2); line-height: 1.5;
          font-weight: 300;
        }
        .sc-flag-item:last-child { border-bottom: none; padding-bottom: 0; }
        .sc-flag-item:first-child { padding-top: 0; }
        .sc-flag-item__dot {
          width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; margin-top: 6px;
        }
        .sc-flag-item__dot--red { background: #ef4444; }
        .sc-flag-item__dot--green { background: #4ade80; }

        /* ── Warning banner ── */
        .sc-warning {
          max-width: 780px; margin: 0 auto 0;
          background: var(--surface);
          border: 1px solid var(--border);
          border-left: 3px solid var(--accent);
          border-radius: 0 var(--radius) var(--radius) 0;
          padding: 20px 24px;
          display: flex; gap: 16px; align-items: flex-start;
          margin-top: 16px;
        }
        .sc-warning__icon {
          font-family: var(--mono); font-size: 14px; flex-shrink: 0;
          color: var(--accent); margin-top: 2px;
        }
        .sc-warning__label {
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--accent); margin-bottom: 6px;
        }
        .sc-warning__body {
          font-size: 12px; color: var(--text-3); line-height: 1.7; font-weight: 300;
        }

        /* ── Footer CTA ── */
        .sc-cta {
          padding: 72px 24px;
          text-align: center;
        }
        .sc-cta__title {
          font-family: var(--serif);
          font-size: clamp(24px, 4vw, 38px);
          color: var(--text-1);
          margin-bottom: 10px;
        }
        .sc-cta__sub {
          font-size: 13px; color: var(--text-3);
          font-weight: 300; font-family: var(--mono);
          letter-spacing: 0.02em; margin-bottom: 28px;
        }

        /* ── Button ── */
        .sc-btn {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em;
          padding: 10px 20px; border-radius: var(--radius);
          border: 1px solid var(--border); background: var(--surface);
          color: var(--text-2); cursor: pointer; text-decoration: none;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
          white-space: nowrap;
        }
        .sc-btn:hover { color: var(--text-1); border-color: var(--border-hi); }
        .sc-btn--accent {
          background: var(--accent); border-color: var(--accent);
          color: #0a0a0b; font-weight: 600;
        }
        .sc-btn--accent:hover { background: #d4eb3c; border-color: #d4eb3c; }
      `}</style>

            <div className="sc-page">
                <Navbar
                    isScrolled={isScrolled}
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    activeSection={activeSection}
                    scrollToSection={scrollToSection}
                />

                {/* ── PAGE HEADER ── */}
                <div className="sc-header">
                    <div className="sc-eyebrow" style={{ justifyContent: "center" }}>
                        <span className="sc-eyebrow__dot" />
                        BC_SECURITY · Awareness Pipeline
                    </div>
                    <h1 className="sc-header__title">
                        Developer<br /><em>Scam Checker</em>
                    </h1>
                    <p className="sc-header__sub">
                        Analysing communication signatures and structural red flags to protect your engineering investments.
                    </p>
                </div>

                {/* ── FORENSIC SPEC TABLE ── */}
                <div className="sc-section">
                    <div className="sc-wrap">
                        <div className="sc-eyebrow">
                            <span className="sc-eyebrow__dot" />
                            Case file metadata
                        </div>
                        <div className="sc-spec-table">
                            <div className="sc-spec-table__header">
                                <Terminal size={11} /> Forensic analysis spec
                            </div>
                            {[
                                ["Case ID", "SC-2025-0041", false, false],
                                ["Subject", "Shady Developer", false, false],
                                ["Risk Level", "HIGH — Confirmed Vectors", false, true],
                                ["Flags Detected", "3 of 9 messages", true, false],
                                ["Resolution", "Do not engage", false, true],
                            ].map(([k, v, acc, danger]) => (
                                <div key={k} className="sc-spec-row">
                                    <span className="sc-spec-row__key">{k}</span>
                                    <span className={`sc-spec-row__val${acc ? " sc-spec-row__val--accent" : danger ? " sc-spec-row__val--danger" : ""}`}>
                                        {v}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* ── CHAT FRAME ── */}
                        <div className="sc-chat-frame">

                            {/* Top bar */}
                            <div className="sc-chat-bar">
                                <div className="sc-chat-bar__left">
                                    <ArrowLeft size={17} color="#aebac1" style={{ cursor: "pointer" }} />
                                    <div className="sc-chat-bar__avatar">
                                        SD
                                        <span className="sc-chat-bar__online" />
                                    </div>
                                    <div>
                                        <div className="sc-chat-bar__name">Shady Developer</div>
                                        <div className="sc-chat-bar__status">online</div>
                                    </div>
                                </div>
                                <div className="sc-chat-bar__actions">
                                    <Video size={17} />
                                    <Phone size={15} />
                                    <MoreVertical size={17} />
                                </div>
                            </div>

                            {/* Feed */}
                            <div className="sc-chat-feed">
                                <div className="sc-e2e">
                                    <div className="sc-e2e__pill">
                                        <Info size={13} />
                                        Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read them.
                                    </div>
                                </div>

                                {chatLog.map((msg, i) => {
                                    const isClient = msg.from === "client";
                                    return (
                                        <div key={i} className={`sc-msg ${isClient ? "sc-msg--client" : "sc-msg--dev"}`}>
                                            <div className={`sc-bubble ${isClient ? "sc-bubble--client" : msg.isRedFlag ? "sc-bubble--redflag" : "sc-bubble--dev"}`}>
                                                {!isClient && msg.isRedFlag && (
                                                    <span className="sc-bubble__flag">⚠ Risk vector detected</span>
                                                )}
                                                <p style={{ paddingRight: "40px" }}>{msg.text}</p>
                                                <div className="sc-bubble__meta">
                                                    <span className="sc-bubble__time">{msg.time}</span>
                                                    {isClient && <CheckCheck size={12} color="#53bdeb" />}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Input */}
                            <div className="sc-chat-input">
                                <div className="sc-chat-input__field">
                                    Chat sequence locked for forensic analysis...
                                </div>
                                <div className="sc-chat-input__send">🔒</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── ANALYSIS GRID ── */}
                <div className="sc-analysis">
                    <div style={{ maxWidth: 780, margin: "0 auto" }}>
                        <div className="sc-eyebrow">
                            <span className="sc-eyebrow__dot" />
                            Risk evaluation schematics
                        </div>

                        <div className="sc-analysis__grid">
                            {/* Red flags */}
                            <div className="sc-flag-card">
                                <div className="sc-flag-card__header">
                                    <AlertTriangle size={14} color="#ef4444" />
                                    <span className="sc-flag-card__label sc-flag-card__label--red">
                                        Execution red flags
                                    </span>
                                </div>
                                <div className="sc-flag-card__body">
                                    {redFlags.map((f) => (
                                        <div key={f} className="sc-flag-item">
                                            <span className="sc-flag-item__dot sc-flag-item__dot--red" />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Green flags */}
                            <div className="sc-flag-card">
                                <div className="sc-flag-card__header">
                                    <CheckCircle size={14} color="#4ade80" />
                                    <span className="sc-flag-card__label sc-flag-card__label--green">
                                        Professional baselines
                                    </span>
                                </div>
                                <div className="sc-flag-card__body">
                                    {greenFlags.map((f) => (
                                        <div key={f} className="sc-flag-item">
                                            <span className="sc-flag-item__dot sc-flag-item__dot--green" />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Warning banner */}
                        <div className="sc-warning">
                            <div className="sc-warning__icon">
                                <ShieldAlert size={16} />
                            </div>
                            <div>
                                <div className="sc-warning__label">System resolution guidance</div>
                                <p className="sc-warning__body">
                                    Elite engineering partners prioritize accountability. They will naturally walk you
                                    through staging links, structure detailed contracts, and organize transparent
                                    milestone funding. If a contact attempts to force financial settlement without
                                    providing technical validation, protect your capital resources.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── FOOTER CTA ── */}
                <div className="sc-cta">
                    <div className="sc-eyebrow" style={{ justifyContent: "center" }}>
                        <span className="sc-eyebrow__dot" />
                        Verified production node
                    </div>
                    <h2 className="sc-cta__title">Need a developer you can trust?</h2>
                    <p className="sc-cta__sub">
                        Sync with a verified, milestone-structured engineering partner.
                    </p>
                    <Link href="https://browncode.name.ng" className="sc-btn sc-btn--accent">
                        Access main portfolio <ArrowRight size={13} />
                    </Link>
                </div>

                <Footer />
            </div>
        </>
    );
}