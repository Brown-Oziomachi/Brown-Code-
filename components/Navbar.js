"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
    Menu, X, ChevronDown, Terminal, Cpu, Network,
    Globe, Layers, Server, Newspaper, TrendingUp, ExternalLink,
} from "lucide-react";
import { SysMonitorNavDeskLink } from "@/app/status/page";

export default function Navbar({ isScrolled, isMenuOpen, setIsMenuOpen, activeSection, scrollToSection }) {
    const [isJobOpen, setIsJobOpen] = useState(false);
    const [isJobOpenMobile, setIsJobOpenMobile] = useState(false);
    const [isNewsOpen, setIsNewsOpen] = useState(false);
    const [isNewsOpenMobile, setIsNewsOpenMobile] = useState(false);
    const newsRef = useRef(null);
    const jobRef = useRef(null);
    const navRef = useRef(null);

    const navItems = ["home", "about", "projects", "testimonials", "contact", "blog", "tech-news"];

    const jobOptions = [
        { id: "UTL-01", title: "JobCopilot", description: "Automated engine to batch-submit application data packets across job boards.", icon: <Network size={14} />, href: "https://jobcopilot.com/?linkId=lp_494205&sourceId=brown-oziomachi&tenantId=jobcopilot", external: true, tag: "Auto Apply" },
        { id: "UTL-02", title: "FinalRound AI", description: "Simulation runtime that prepares developer profiles for screening interviews.", icon: <Cpu size={14} />, href: "https://www.finalroundai.com/?via=browncode", external: true, tag: "Interview Prep" },
        { id: "UTL-03", title: "HostAfrica Domains", description: "Provision and resolve high-performance top-level domain nodes globally.", icon: <Globe size={14} />, href: "https://my.hostafrica.com/aff.php?aff=2657", external: true, tag: "DNS" },
        { id: "UTL-04", title: "eSkilled AI Creator", description: "Automated model built to orchestrate and output online course architectures.", icon: <Layers size={14} />, href: "https://aicoursecreator.eskilled.io/?fpr=brown99", external: true, tag: "Courses" },
        { id: "UTL-05", title: "Swagbucks", description: "Distributed manual verification platform — execute tasks for reward payloads.", icon: <Server size={14} />, href: "https://www.swagbucks.com/p/register?rb=202240461&rp=1", external: true, tag: "Rewards" },
    ];

    const newsOptions = [
        { id: "NEWS-01", title: "Oversharing with AI", description: "How your ChatGPT conversations could be indexed or used against you.", icon: <Cpu size={14} />, href: "https://browncode.name.ng/news/oversharing-with-ai-how-your-chatgpt-conversations-could-be-used-against-you--sygqIVJl6xs5jo47WwQw", tag: "Security" },
        { id: "NEWS-02", title: "Unregulated AI Policies", description: "Global warnings regarding unmitigated algorithmic development vectors.", icon: <TrendingUp size={14} />, href: "https://browncode.name.ng/news/china-warns-of-catastrophic-consequences-from-unregulated-ai-development-in-u-s--WSHJ3fcktdE5wlKY5lZQ", tag: "Policy" },
        { id: "NEWS-03", title: "Labor Automation Deficit", description: "Stats on high-density anxiety profiles concerning AI resource replacement.", icon: <Globe size={14} />, href: "https://browncode.name.ng/news/nearly-two-thirds-of-young-adults-fear-ai-will-take-their-jobs--73sOIQLizN4Vs3O65pa2", tag: "Research" },
    ];

    const isLinkItem = (item) => ["blog", "tech-news"].includes(item);
    const fmtItem = (item) => item.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");

    // Click-outside handlers
    useEffect(() => {
        const h = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setIsMenuOpen(false); };
        if (isMenuOpen) document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, [isMenuOpen, setIsMenuOpen]);

    useEffect(() => {
        const h = (e) => { if (jobRef.current && !jobRef.current.contains(e.target)) setIsJobOpen(false); };
        if (isJobOpen) document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, [isJobOpen]);

    useEffect(() => {
        const h = (e) => { if (newsRef.current && !newsRef.current.contains(e.target)) setIsNewsOpen(false); };
        if (isNewsOpen) document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, [isNewsOpen]);

    const UtilCard = ({ item, onClick }) => {
        const inner = (
            <div className="nb-util-card">
                <div className="nb-util-card__top">
                    <span className="nb-util-card__id">{item.id}</span>
                    <span className="nb-util-card__tag">{item.tag}</span>
                </div>
                <div className="nb-util-card__icon">{item.icon}</div>
                <div className="nb-util-card__title">{item.title}</div>
                <p className="nb-util-card__desc">{item.description}</p>
                <div className="nb-util-card__cta">
                    Open <ExternalLink size={9} />
                </div>
            </div>
        );
        return item.external
            ? <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClick} style={{ display: "block", height: "100%" }}>{inner}</a>
            : <Link href={item.href} onClick={onClick} style={{ display: "block", height: "100%" }}>{inner}</Link>;
    };

    return (
        <>
            <style>{`
        /* ── Navbar root ── */
        .nb-root {
          position: fixed; width: 100%; z-index: 50;
          font-family: var(--mono); transition: background 0.2s, border-color 0.2s;
          border-bottom: 1px solid transparent;
        }
        .nb-root--scrolled {
          background: rgba(10,10,11,0.95); backdrop-filter: blur(14px);
          border-bottom-color: var(--border);
        }
        .nb-inner {
          max-width: 1120px; margin: 0 auto; padding: 0 24px;
          height: 60px; display: flex; align-items: center; justify-content: space-between;
        }

        /* Brand */
        .nb-brand {
          font-family: var(--mono); font-size: 13px; font-weight: 500;
          letter-spacing: 0.08em; color: var(--text-1); text-decoration: none;
          flex-shrink: 0;
        }
        .nb-brand em { font-style: normal; color: var(--accent); }

        /* Desktop links */
        .nb-links { display: flex; align-items: center; gap: 2px; }
        @media (max-width: 768px) { .nb-links { display: none; } }

        .nb-link {
          font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 6px 10px; border-radius: 4px; border: 1px solid transparent;
          background: none; color: var(--text-3); cursor: pointer;
          text-decoration: none; white-space: nowrap;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
          font-family: var(--mono);
        }
        .nb-link:hover { color: var(--text-1); }
        .nb-link--active {
          color: var(--accent); border-color: var(--border); background: var(--surface);
        }

        .nb-dropdown-btn {
          display: inline-flex; align-items: center; gap: 4px;
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 6px 10px; border-radius: 4px;
          border: 1px solid transparent; background: none;
          color: var(--text-3); cursor: pointer;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
        }
        .nb-dropdown-btn:hover { color: var(--text-1); }
        .nb-dropdown-btn--open {
          color: var(--text-1); border-color: var(--border); background: var(--surface);
        }

        /* Hamburger */
        .nb-hamburger {
          display: none; align-items: center; gap: 6px;
        }
        @media (max-width: 768px) { .nb-hamburger { display: flex; } }

        .nb-ham-btn {
          display: inline-flex; align-items: center; gap: 4px;
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 5px 8px;
          border: 1px solid var(--border); border-radius: 4px;
          background: var(--surface); color: var(--text-3); cursor: pointer;
        }
        .nb-ham-icon {
          padding: 6px; border: 1px solid transparent; border-radius: 4px;
          background: none; color: var(--text-2); cursor: pointer;
          transition: color 0.15s;
        }
        .nb-ham-icon:hover { color: var(--text-1); }

        /* ── Mega dropdown ── */
        .nb-mega {
          position: fixed; inset-x: 0; top: 60px;
          background: rgba(17,17,19,0.98); backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border); z-index: 49;
          font-family: var(--mono);
        }
        .nb-mega__inner {
          max-width: 1120px; margin: 0 auto; padding: 28px 24px;
        }
        .nb-mega__header {
          display: flex; align-items: center; justify-content: space-between;
          padding-bottom: 16px; margin-bottom: 20px;
          border-bottom: 1px solid var(--border);
        }
        .nb-mega__title {
          font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--text-3); display: flex; align-items: center; gap: 6px;
        }
        .nb-mega__title svg { color: var(--accent); }
        .nb-mega__sub { font-size: 11px; color: var(--text-3); font-family: var(--sans); }
        .nb-mega__close {
          font-family: var(--mono); font-size: 10px; color: var(--text-3);
          border: 1px solid var(--border); border-radius: 4px;
          background: var(--bg); padding: 4px 10px; cursor: pointer;
          transition: color 0.15s, border-color 0.15s;
        }
        .nb-mega__close:hover { color: var(--text-1); border-color: var(--border-hi); }
        .nb-mega__grid {
          display: grid; gap: 12px;
        }
        .nb-mega__grid--5 { grid-template-columns: repeat(5,1fr); }
        .nb-mega__grid--3 { grid-template-columns: repeat(3,1fr); }
        @media (max-width: 900px) {
          .nb-mega__grid--5 { grid-template-columns: repeat(3,1fr); }
          .nb-mega__grid--3 { grid-template-columns: 1fr 1fr; }
        }

        /* Util card */
        .nb-util-card {
          background: var(--bg); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 16px;
          display: flex; flex-direction: column; gap: 8px; height: 100%;
          transition: border-color 0.15s;
          cursor: pointer;
        }
        .nb-util-card:hover { border-color: rgba(232,255,71,0.3); }
        .nb-util-card__top {
          display: flex; justify-content: space-between; align-items: center;
          padding-bottom: 8px; border-bottom: 1px solid var(--border);
        }
        .nb-util-card__id {
          font-size: 8px; letter-spacing: 0.1em; color: var(--text-3);
        }
        .nb-util-card__tag {
          font-size: 8px; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--accent);
        }
        .nb-util-card__icon {
          color: var(--text-3); margin-top: 4px;
        }
        .nb-util-card:hover .nb-util-card__icon { color: var(--accent); }
        .nb-util-card__title {
          font-size: 11px; font-weight: 600; color: var(--text-1);
        }
        .nb-util-card:hover .nb-util-card__title { color: var(--accent); }
        .nb-util-card__desc {
          font-size: 10px; color: var(--text-3); line-height: 1.6;
          font-family: var(--sans); flex: 1;
        }
        .nb-util-card__cta {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--text-3); background: var(--surface);
          border: 1px solid var(--border); padding: 3px 8px; border-radius: 3px;
          transition: color 0.15s, border-color 0.15s;
        }
        .nb-util-card:hover .nb-util-card__cta {
          color: var(--accent); border-color: rgba(232,255,71,0.3);
        }

        /* Mobile drawer */
        .nb-drawer {
          position: fixed; top: 0; right: 0; bottom: 0; width: 280px;
          background: var(--surface); border-left: 1px solid var(--border);
          z-index: 51; display: flex; flex-direction: column;
          font-family: var(--mono);
          animation: nb-slide-in 0.2s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes nb-slide-in {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        .nb-drawer__header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 16px; border-bottom: 1px solid var(--border);
        }
        .nb-drawer__title {
          font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--text-3);
        }
        .nb-drawer__close {
          background: none; border: 1px solid var(--border); border-radius: 4px;
          padding: 4px; color: var(--text-3); cursor: pointer;
          transition: color 0.15s;
        }
        .nb-drawer__close:hover { color: var(--text-1); }
        .nb-drawer__links { padding: 10px; flex: 1; overflow-y: auto; }
        .nb-drawer__link {
          display: block; padding: 9px 12px; border-radius: 4px;
          font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--text-2); text-decoration: none;
          transition: background 0.12s, color 0.12s; cursor: pointer;
          background: none; border: none; width: 100%; text-align: left;
          font-family: var(--mono);
        }
        .nb-drawer__link:hover { background: var(--bg); color: var(--text-1); }
        .nb-drawer__footer {
          padding: 16px; border-top: 1px solid var(--border);
        }
        .nb-drawer__cta {
          display: block; width: 100%; text-align: center;
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 10px;
          background: var(--accent-dim, rgba(232,255,71,0.08));
          border: 1px solid rgba(232,255,71,0.25);
          border-radius: var(--radius); color: var(--accent);
          text-decoration: none; transition: background 0.15s;
        }
        .nb-drawer__cta:hover { background: rgba(232,255,71,0.14); }

        /* Mobile mega panels */
        .nb-mob-panel {
          position: fixed; left: 0; right: 0; bottom: 0;
          background: var(--surface); border-top: 1px solid var(--border);
          overflow-y: auto; z-index: 50;
          font-family: var(--mono);
          max-height: calc(100vh - 60px);
        }
        .nb-mob-panel__inner { padding: 20px 16px; }
        .nb-mob-panel__title {
          font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--text-3); margin-bottom: 14px;
          padding-bottom: 10px; border-bottom: 1px solid var(--border);
        }
        .nb-mob-panel__grid { display: flex; flex-direction: column; gap: 10px; }
        .nb-overlay {
          position: fixed; inset: 0; background: rgba(10,10,11,0.7);
          z-index: 49; backdrop-filter: blur(2px);
        }
      `}</style>

            {/* ── Nav bar ── */}
            <nav className={`nb-root${isScrolled ? " nb-root--scrolled" : ""}`}>
                <div className="nb-inner">

                    {/* Brand */}
                    <Link href="/" className="nb-brand">brown<em>.</em>dev</Link>

                    {/* Desktop links */}
                    <div className="nb-links">
                        {navItems.map((item) =>
                            isLinkItem(item) ? (
                                <Link
                                    key={item}
                                    href={`/${item}`}
                                    className={`nb-link${activeSection === item ? " nb-link--active" : ""}`}
                                >
                                    {fmtItem(item)}
                                </Link>
                            ) : (
                                <button
                                    key={item}
                                    className={`nb-link${activeSection === item ? " nb-link--active" : ""}`}
                                    onClick={() => scrollToSection(item)}
                                >
                                    {item}
                                </button>
                            )
                        )}

                        {/* Utilities dropdown */}
                        <div ref={jobRef} style={{ position: "relative" }}>
                            <button
                                className={`nb-dropdown-btn${isJobOpen ? " nb-dropdown-btn--open" : ""}`}
                                onClick={() => { setIsJobOpen(!isJobOpen); setIsNewsOpen(false); }}
                            >
                                Utilities
                                <ChevronDown size={10} style={{ transition: "transform 0.2s", transform: isJobOpen ? "rotate(180deg)" : "none" }} />
                            </button>
                        </div>

                        {/* Telemetry dropdown */}
                        <div ref={newsRef} style={{ position: "relative" }}>
                            <button
                                className={`nb-dropdown-btn${isNewsOpen ? " nb-dropdown-btn--open" : ""}`}
                                onClick={() => { setIsNewsOpen(!isNewsOpen); setIsJobOpen(false); }}
                            >
                                <Newspaper size={11} style={{ color: "var(--text-3)" }} />
                                News
                                <ChevronDown size={10} style={{ transition: "transform 0.2s", transform: isNewsOpen ? "rotate(180deg)" : "none" }} />
                            </button>
                        </div>

                        <SysMonitorNavDeskLink />
                    </div>

                    {/* Mobile controls */}
                    <div className="nb-hamburger">
                        <button
                            className="nb-ham-btn"
                            onClick={() => { setIsJobOpenMobile(!isJobOpenMobile); setIsNewsOpenMobile(false); setIsMenuOpen(false); }}
                        >
                            UTIL <ChevronDown size={9} />
                        </button>
                        <button
                            className="nb-ham-btn"
                            onClick={() => { setIsNewsOpenMobile(!isNewsOpenMobile); setIsJobOpenMobile(false); setIsMenuOpen(false); }}
                        >
                            <Newspaper size={10} /> <ChevronDown size={9} />
                        </button>
                        <button
                            className="nb-ham-icon"
                            onClick={() => { setIsMenuOpen(!isMenuOpen); setIsJobOpenMobile(false); setIsNewsOpenMobile(false); }}
                        >
                            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>

                </div>
            </nav>

            {/* ── Desktop mega: Utilities ── */}
            {isJobOpen && (
                <div ref={jobRef} className="nb-mega" style={{ display: "none" }} /* overridden below */ >
                    <div className="nb-mega__inner">
                        <div className="nb-mega__header">
                            <div>
                                <div className="nb-mega__title"><Terminal size={11} /> Utilities</div>
                                <div className="nb-mega__sub">Tools and automation resources for developers.</div>
                            </div>
                            <button className="nb-mega__close" onClick={() => setIsJobOpen(false)}>Close</button>
                        </div>
                        <div className={`nb-mega__grid nb-mega__grid--5`}>
                            {jobOptions.map((j) => <UtilCard key={j.id} item={j} onClick={() => setIsJobOpen(false)} />)}
                        </div>
                    </div>
                </div>
            )}

            {/* Fix: desktop mega needs to be visible on md+ */}
            {isJobOpen && (
                <div ref={jobRef} className="nb-mega" style={{ display: "block" }}>
                    <div className="nb-mega__inner">
                        <div className="nb-mega__header">
                            <div>
                                <div className="nb-mega__title"><Terminal size={11} /> Utilities</div>
                                <div className="nb-mega__sub">Tools and automation resources for developers.</div>
                            </div>
                            <button className="nb-mega__close" onClick={() => setIsJobOpen(false)}>Close</button>
                        </div>
                        <div className="nb-mega__grid nb-mega__grid--5">
                            {jobOptions.map((j) => <UtilCard key={j.id} item={j} onClick={() => setIsJobOpen(false)} />)}
                        </div>
                    </div>
                </div>
            )}

            {isNewsOpen && (
                <div ref={newsRef} className="nb-mega">
                    <div className="nb-mega__inner">
                        <div className="nb-mega__header">
                            <div>
                                <div className="nb-mega__title"><Newspaper size={11} /> Tech news</div>
                                <div className="nb-mega__sub">AI and industry articles curated for developers.</div>
                            </div>
                            <button className="nb-mega__close" onClick={() => setIsNewsOpen(false)}>Close</button>
                        </div>
                        <div className="nb-mega__grid nb-mega__grid--3">
                            {newsOptions.map((n) => <UtilCard key={n.id} item={n} onClick={() => setIsNewsOpen(false)} />)}
                        </div>
                    </div>
                </div>
            )}

            {/* ── Mobile drawer ── */}
            {isMenuOpen && (
                <>
                    <div className="nb-overlay" onClick={() => setIsMenuOpen(false)} />
                    <div ref={navRef} className="nb-drawer">
                        <div className="nb-drawer__header">
                            <span className="nb-drawer__title">Navigation</span>
                            <button className="nb-drawer__close" onClick={() => setIsMenuOpen(false)}><X size={14} /></button>
                        </div>
                        <div className="nb-drawer__links">
                            {navItems.map((item) =>
                                isLinkItem(item) ? (
                                    <Link key={item} href={`/${item}`} className="nb-drawer__link" onClick={() => setIsMenuOpen(false)}>
                                        {fmtItem(item)}
                                    </Link>
                                ) : (
                                    <button key={item} className="nb-drawer__link" onClick={() => { scrollToSection(item); setIsMenuOpen(false); }}>
                                        {item}
                                    </button>
                                )
                            )}
                        </div>
                        <div className="nb-drawer__footer">
                            <Link href="/bc/contact" className="nb-drawer__cta" onClick={() => setIsMenuOpen(false)}>
                                Get in touch
                            </Link>
                        </div>
                    </div>
                </>
            )}

            {/* ── Mobile panel: Utilities ── */}
            {isJobOpenMobile && (
                <>
                    <div className="nb-overlay" style={{ top: 60 }} onClick={() => setIsJobOpenMobile(false)} />
                    <div className="nb-mob-panel" style={{ top: 60 }}>
                        <div className="nb-mob-panel__inner">
                            <div className="nb-mob-panel__title">Utilities</div>
                            <div className="nb-mob-panel__grid">
                                {jobOptions.map((j) => <UtilCard key={j.id} item={j} onClick={() => setIsJobOpenMobile(false)} />)}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* ── Mobile panel: News ── */}
            {isNewsOpenMobile && (
                <>
                    <div className="nb-overlay" style={{ top: 60 }} onClick={() => setIsNewsOpenMobile(false)} />
                    <div className="nb-mob-panel" style={{ top: 60 }}>
                        <div className="nb-mob-panel__inner">
                            <div className="nb-mob-panel__title">Tech news</div>
                            <div className="nb-mob-panel__grid">
                                {newsOptions.map((n) => <UtilCard key={n.id} item={n} onClick={() => setIsNewsOpenMobile(false)} />)}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}