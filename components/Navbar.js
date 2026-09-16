"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Menu, X, ChevronDown, Terminal, Cpu, Network,
    Globe, Layers, Server, Newspaper, TrendingUp, ExternalLink,
    Sparkles, ArrowUpRight,
} from "lucide-react";
import { featuredServices } from "@/app/data/services";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isJobOpen, setIsJobOpen] = useState(false);
    const [isJobOpenMobile, setIsJobOpenMobile] = useState(false);
    const [isNewsOpen, setIsNewsOpen] = useState(false);
    const [isNewsOpenMobile, setIsNewsOpenMobile] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isServicesOpenMobile, setIsServicesOpenMobile] = useState(false);

    const newsRef = useRef(null);
    const jobRef = useRef(null);
    const servicesRef = useRef(null);
    const navRef = useRef(null);

    // Sections that live on the homepage and are reached by scrolling
    const anchorItems = ["home", "about", "projects", "testimonials", "contact"];
    // Standalone routed pages
    const linkItems = ["blog", "tech-news"];
    const navItems = [...anchorItems, ...linkItems];

    const isLinkItem = (item) => linkItems.includes(item);
    const fmtItem = (item) => item.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");

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

    // Built from your real services data — top 6 featured, plus a "view all" card
    const serviceOptions = featuredServices.map((s) => ({
        id: `SVC-${s.number}`,
        title: s.title,
        description: s.tagline,
        icon: <Sparkles size={14} />,
        href: `/services/${s.slug}`,
        tag: s.number,
    }));

    // ── Scroll listener (self-contained, no parent needed) ──
    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // ── If we land on "/" with a hash, scroll to that section ──
    useEffect(() => {
        if (pathname === "/" && window.location.hash) {
            const id = window.location.hash.slice(1);
            const el = document.getElementById(id);
            if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 80);
        }
    }, [pathname]);

    // ── Click-outside handlers ──
    useEffect(() => {
        const h = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setIsMenuOpen(false); };
        if (isMenuOpen) document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, [isMenuOpen]);

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

    useEffect(() => {
        const h = (e) => { if (servicesRef.current && !servicesRef.current.contains(e.target)) setIsServicesOpen(false); };
        if (isServicesOpen) document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, [isServicesOpen]);

    // ── Handles both "scroll on home" and "navigate then scroll" ──
    const goToSection = (id) => {
        if (id === "home" && pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (pathname === "/") {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        } else {
            router.push(`/#${id}`);
        }
        setIsMenuOpen(false);
    };

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
          height: 64px; display: flex; align-items: center; justify-content: space-between;
        }

        /* ── Brand / logo ── */
        .nb-brand {
          display: inline-flex; align-items: center; gap: 10px;
          text-decoration: none; flex-shrink: 0;
        }
        .nb-brand__mark {
          width: 30px; height: 30px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--border-hi);
          border-radius: 7px;
          font-family: var(--serif);
          font-size: 15px;
          color: var(--accent);
          background: linear-gradient(155deg, var(--surface), var(--bg));
          transition: border-color 0.2s, transform 0.2s;
        }
        .nb-brand:hover .nb-brand__mark {
          border-color: var(--accent);
          transform: rotate(-4deg);
        }
        .nb-brand__word {
          font-family: var(--serif);
          font-size: 17px;
          letter-spacing: -0.01em;
          color: var(--text-1);
          line-height: 1;
        }
        .nb-brand__word em {
          font-style: normal;
          color: var(--accent);
        }
        .nb-brand__suffix {
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-3);
          margin-top: 2px;
        }
        .nb-brand__stack { display: flex; flex-direction: column; gap: 0; }

        /* Desktop links */
        .nb-links { display: flex; align-items: center; gap: 2px; }
        @media (max-width: 900px) { .nb-links { display: none; } }

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
        @media (max-width: 900px) { .nb-hamburger { display: flex; } }

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
          position: fixed; inset-x: 0; top: 64px;
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
        .nb-mega__grid { display: grid; gap: 12px; }
        .nb-mega__grid--6 { grid-template-columns: repeat(3,1fr); }
        .nb-mega__grid--5 { grid-template-columns: repeat(5,1fr); }
        .nb-mega__grid--3 { grid-template-columns: repeat(3,1fr); }
        @media (max-width: 900px) {
          .nb-mega__grid--6 { grid-template-columns: 1fr 1fr; }
          .nb-mega__grid--5 { grid-template-columns: repeat(3,1fr); }
          .nb-mega__grid--3 { grid-template-columns: 1fr 1fr; }
        }
        .nb-mega__footer {
          margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--border);
          display: flex; justify-content: flex-end;
        }
        .nb-mega__viewall {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--accent);
          text-decoration: none;
        }

        /* Util card */
        .nb-util-card {
          background: var(--bg); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 16px;
          display: flex; flex-direction: column; gap: 8px; height: 100%;
          transition: border-color 0.15s;
          cursor: pointer;
        }
        .nb-util-card:hover { border-color: var(--accent-bdr); }
        .nb-util-card__top {
          display: flex; justify-content: space-between; align-items: center;
          padding-bottom: 8px; border-bottom: 1px solid var(--border);
        }
        .nb-util-card__id { font-size: 8px; letter-spacing: 0.1em; color: var(--text-3); }
        .nb-util-card__tag { font-size: 8px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); }
        .nb-util-card__icon { color: var(--text-3); margin-top: 4px; }
        .nb-util-card:hover .nb-util-card__icon { color: var(--accent); }
        .nb-util-card__title { font-size: 11px; font-weight: 600; color: var(--text-1); }
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
          color: var(--accent); border-color: var(--accent-bdr);
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
        .nb-drawer__footer { padding: 16px; border-top: 1px solid var(--border); }
        .nb-drawer__cta {
          display: block; width: 100%; text-align: center;
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 10px;
          background: var(--accent-dim);
          border: 1px solid var(--accent-bdr);
          border-radius: var(--radius); color: var(--accent);
          text-decoration: none; transition: background 0.15s;
        }
        .nb-drawer__cta:hover { background: var(--accent-dim); }

        /* Mobile mega panels */
        .nb-mob-panel {
          position: fixed; left: 0; right: 0; bottom: 0;
          background: var(--surface); border-top: 1px solid var(--border);
          overflow-y: auto; z-index: 50;
          font-family: var(--mono);
          max-height: calc(100vh - 64px);
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

                    {/* Brand / logo */}
                    <Link href="/" className="nb-brand">
                        <span className="nb-brand__mark">B</span>
                        <span className="nb-brand__stack">
                            <span className="nb-brand__word">rown<em>.</em>dev</span>
                            <span className="nb-brand__suffix">Full-Stack Studio</span>
                        </span>
                    </Link>

                    {/* Desktop links */}
                    <div className="nb-links">
                        {navItems.map((item) =>
                            isLinkItem(item) ? (
                                <Link
                                    key={item}
                                    href={`/${item}`}
                                    className={`nb-link${pathname === `/${item}` ? " nb-link--active" : ""}`}
                                >
                                    {fmtItem(item)}
                                </Link>
                            ) : (
                                <button
                                    key={item}
                                    className="nb-link"
                                    onClick={() => goToSection(item)}
                                >
                                    {item}
                                </button>
                            )
                        )}

                        {/* Services dropdown */}
                        <div ref={servicesRef} style={{ position: "relative" }}>
                            <button
                                className={`nb-dropdown-btn${isServicesOpen ? " nb-dropdown-btn--open" : ""}${pathname.startsWith("/services") ? " nb-link--active" : ""}`}
                                onClick={() => { setIsServicesOpen(!isServicesOpen); setIsJobOpen(false); setIsNewsOpen(false); }}
                            >
                                Services
                                <ChevronDown size={10} style={{ transition: "transform 0.2s", transform: isServicesOpen ? "rotate(180deg)" : "none" }} />
                            </button>
                        </div>

                        {/* Utilities dropdown */}
                        <div ref={jobRef} style={{ position: "relative" }}>
                            <button
                                className={`nb-dropdown-btn${isJobOpen ? " nb-dropdown-btn--open" : ""}`}
                                onClick={() => { setIsJobOpen(!isJobOpen); setIsNewsOpen(false); setIsServicesOpen(false); }}
                            >
                                Utilities
                                <ChevronDown size={10} style={{ transition: "transform 0.2s", transform: isJobOpen ? "rotate(180deg)" : "none" }} />
                            </button>
                        </div>

                        {/* Telemetry dropdown */}
                        <div ref={newsRef} style={{ position: "relative" }}>
                            <button
                                className={`nb-dropdown-btn${isNewsOpen ? " nb-dropdown-btn--open" : ""}`}
                                onClick={() => { setIsNewsOpen(!isNewsOpen); setIsJobOpen(false); setIsServicesOpen(false); }}
                            >
                                <Newspaper size={11} style={{ color: "var(--text-3)" }} />
                                News
                                <ChevronDown size={10} style={{ transition: "transform 0.2s", transform: isNewsOpen ? "rotate(180deg)" : "none" }} />
                            </button>
                        </div>

                    </div>

                    {/* Mobile controls */}
                    <div className="nb-hamburger">
                        <button
                            className="nb-ham-btn"
                            onClick={() => { setIsServicesOpenMobile(!isServicesOpenMobile); setIsJobOpenMobile(false); setIsNewsOpenMobile(false); setIsMenuOpen(false); }}
                        >
                            Services <ChevronDown size={9} />
                        </button>
                        <button
                            className="nb-ham-icon"
                            onClick={() => { setIsMenuOpen(!isMenuOpen); setIsJobOpenMobile(false); setIsNewsOpenMobile(false); setIsServicesOpenMobile(false); }}
                        >
                            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>

                </div>
            </nav>

            {/* ── Desktop mega: Services ── */}
            {isServicesOpen && (
                <div ref={servicesRef} className="nb-mega">
                    <div className="nb-mega__inner">
                        <div className="nb-mega__header">
                            <div>
                                <div className="nb-mega__title"><Sparkles size={11} /> Services</div>
                                <div className="nb-mega__sub">What I build, end to end.</div>
                            </div>
                            <button className="nb-mega__close" onClick={() => setIsServicesOpen(false)}>Close</button>
                        </div>
                        <div className="nb-mega__grid nb-mega__grid--6">
                            {serviceOptions.map((s) => <UtilCard key={s.id} item={s} onClick={() => setIsServicesOpen(false)} />)}
                        </div>
                        <div className="nb-mega__footer">
                            <Link href="/services" className="nb-mega__viewall" onClick={() => setIsServicesOpen(false)}>
                                View all services <ArrowUpRight size={12} />
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Desktop mega: Utilities ── */}
            {isJobOpen && (
                <div ref={jobRef} className="nb-mega">
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

            {/* ── Desktop mega: News ── */}
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
                                    <button key={item} className="nb-drawer__link" onClick={() => goToSection(item)}>
                                        {item}
                                    </button>
                                )
                            )}
                            <Link href="/services" className="nb-drawer__link" onClick={() => setIsMenuOpen(false)}>
                                Services
                            </Link>
                        </div>
                        <div className="nb-drawer__footer">
                            <Link href="https://github.com/sponsors/Brown-Oziomachi/" className="nb-drawer__cta" onClick={() => setIsMenuOpen(false)} target="_blank">
                               SPONSOR SIR BROWN AD
                            </Link>
                        </div>
                    </div>
                </>
            )}

            {/* ── Mobile panel: Services ── */}
            {isServicesOpenMobile && (
                <>
                    <div className="nb-overlay" style={{ top: 64 }} onClick={() => setIsServicesOpenMobile(false)} />
                    <div className="nb-mob-panel" style={{ top: 64 }}>
                        <div className="nb-mob-panel__inner">
                            <div className="nb-mob-panel__title">Services</div>
                            <div className="nb-mob-panel__grid">
                                {serviceOptions.map((s) => <UtilCard key={s.id} item={s} onClick={() => setIsServicesOpenMobile(false)} />)}
                            </div>
                        </div>
                    </div>
                </>
            )}          
        </>
    );
}