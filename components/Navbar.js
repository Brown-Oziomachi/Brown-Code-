"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Menu, X, ChevronDown, Terminal, Cpu, Network,
    Globe, Layers, Server, Newspaper, TrendingUp, ExternalLink,
    Sparkles, ArrowUpRight, ArrowRight,
} from "lucide-react";
import { featuredServices } from "@/app/data/services";

/* ── Data ─────────────────────────────────────────────── */

const anchorItems = ["home", "about", "projects", "testimonials", "contact"];
const linkItems = ["blog", "tech-news"];
const navItems = [...anchorItems, ...linkItems];

const isLinkItem = (item) => linkItems.includes(item);
const fmtItem = (item) =>
    item.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

const jobOptions = [
    { id: "UTL-01", title: "JobCopilot", description: "Automated engine to batch-submit application data packets across job boards.", icon: <Network size={14} />, href: "https://jobcopilot.com/?linkId=lp_494205&sourceId=brown-oziomachi&tenantId=jobcopilot", external: true, tag: "Auto Apply" },
    { id: "UTL-02", title: "FinalRound AI", description: "Simulation runtime that prepares developer profiles for screening interviews.", icon: <Cpu size={14} />, href: "https://www.finalroundai.com/?via=browncode", external: true, tag: "Interview Prep" },
    { id: "UTL-03", title: "HostAfrica Domains", description: "Provision and resolve high-performance top-level domain nodes globally.", icon: <Globe size={14} />, href: "https://my.hostafrica.com/aff.php?aff=2657", external: true, tag: "DNS" },
    { id: "UTL-04", title: "eSkilled AI Creator", description: "Automated model built to orchestrate and output online course architectures.", icon: <Layers size={14} />, href: "https://aicoursecreator.eskilled.io/?fpr=brown99", external: true, tag: "Courses" },
    { id: "UTL-05", title: "Swagbucks", description: "Distributed manual verification platform — execute tasks for reward payloads.", icon: <Server size={14} />, href: "https://www.swagbucks.com/p/register?rb=202240461&rp=1", external: true, tag: "Rewards" },
];

const newsOptions = [
    { id: "NEWS-01", title: "Oversharing with AI", description: "How your ChatGPT conversations could be indexed or used against you.", icon: <Cpu size={14} />, href: "https://browncode.name.ng/news/oversharing-with-ai-how-your-chatgpt-conversations-could-be-used-against-you--sygqIVJl6xs5jo47WwQw", external: true, tag: "Security" },
    { id: "NEWS-02", title: "Unregulated AI Policies", description: "Global warnings regarding unmitigated algorithmic development vectors.", icon: <TrendingUp size={14} />, href: "https://browncode.name.ng/news/china-warns-of-catastrophic-consequences-from-unregulated-ai-development-in-u-s--WSHJ3fcktdE5wlKY5lZQ", external: true, tag: "Policy" },
    { id: "NEWS-03", title: "Labor Automation Deficit", description: "Stats on high-density anxiety profiles concerning AI resource replacement.", icon: <Globe size={14} />, href: "https://browncode.name.ng/news/nearly-two-thirds-of-young-adults-fear-ai-will-take-their-jobs--73sOIQLizN4Vs3O65pa2", external: true, tag: "Research" },
];

const serviceOptions = featuredServices.map((s) => ({
    id: `SVC-${s.number}`,
    title: s.title,
    description: s.tagline,
    icon: <Sparkles size={14} />,
    href: `/services/${s.slug}`,
    tag: s.number,
}));

const MENUS = {
    services: {
        label: "Services",
        icon: <Sparkles size={11} />,
        sub: "What I build, end to end.",
        options: serviceOptions,
        cols: 3,
        footer: { href: "/services", label: "View all services" },
    },
    utilities: {
        label: "Utilities",
        icon: <Terminal size={11} />,
        sub: "Tools and automation resources for developers.",
        options: jobOptions,
        cols: 5,
    },
    news: {
        label: "News",
        icon: <Newspaper size={11} />,
        sub: "AI and industry articles curated for developers.",
        options: newsOptions,
        cols: 3,
    },
};

/* ── Card (outside the component so it doesn't remount) ─ */

function UtilCard({ item, onClick }) {
    const inner = (
        <div className="nb-card">
            <div className="nb-card__top">
                <span className="nb-card__id">{item.id}</span>
                <span className="nb-card__tag">{item.tag}</span>
            </div>
            <div className="nb-card__icon">{item.icon}</div>
            <div className="nb-card__title">{item.title}</div>
            <p className="nb-card__desc">{item.description}</p>
            <div className="nb-card__cta">
                Open {item.external ? <ExternalLink size={9} /> : <ArrowUpRight size={9} />}
            </div>
        </div>
    );
    const style = { display: "block", height: "100%", textDecoration: "none" };
    return item.external ? (
        <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClick} style={style}>{inner}</a>
    ) : (
        <Link href={item.href} onClick={onClick} style={style}>{inner}</Link>
    );
}

/* ── Navbar ───────────────────────────────────────────── */

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const shellRef = useRef(null);

    const [isScrolled, setIsScrolled] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);        // desktop mega: null | "services" | "utilities" | "news"
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [mobileSection, setMobileSection] = useState(null); // drawer accordion

    const closeAll = () => {
        setOpenMenu(null);
        setIsDrawerOpen(false);
        setMobileSection(null);
    };

    // Scroll state
    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Land on "/" with a hash → scroll to the section
    useEffect(() => {
        if (pathname === "/" && window.location.hash) {
            const el = document.getElementById(window.location.hash.slice(1));
            if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 80);
        }
    }, [pathname]);

    // Close everything on route change
    useEffect(() => { closeAll(); }, [pathname]);

    // One click-outside + Escape handler for the whole shell
    useEffect(() => {
        if (!openMenu && !isDrawerOpen) return;
        const onDown = (e) => {
            if (shellRef.current && !shellRef.current.contains(e.target)) closeAll();
        };
        const onKey = (e) => { if (e.key === "Escape") closeAll(); };
        document.addEventListener("mousedown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [openMenu, isDrawerOpen]);

    // Lock body scroll while the drawer is open
    useEffect(() => {
        document.body.style.overflow = isDrawerOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isDrawerOpen]);

    const goToSection = (id) => {
        if (id === "home" && pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (pathname === "/") {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        } else {
            router.push(`/#${id}`);
        }
        closeAll();
    };

    const toggleMenu = (key) => setOpenMenu((cur) => (cur === key ? null : key));
    const active = openMenu ? MENUS[openMenu] : null;

    return (
        <div className="nb-shell" ref={shellRef}>
            <style>{`
        .nb-shell {
          --nb-bg: #000000; --nb-card: #0d0d0d; --nb-card-2: #121212;
          --nb-ink: #f4f1ea; --nb-ink-2: #bdb8ae; --nb-ink-3: #85807a;
          --nb-rule: #242424; --nb-rule-dark: #3a3a3a;
          --nb-accent: #e8ff47; --nb-on: #0a0a0b;
          --nb-serif: 'Playfair Display', Georgia, serif;
          --nb-mono: 'JetBrains Mono', 'Fira Code', monospace;
          --nb-sans: 'Inter', system-ui, sans-serif;
          --nb-h: 68px;
          font-family: var(--nb-mono);
        }

        /* Bar */
        .nb-root {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          background: rgba(0,0,0,0.72);
          -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--nb-rule);
          transition: background 0.2s, border-color 0.2s;
        }
        .nb-root--scrolled { background: rgba(0,0,0,0.9); border-bottom-color: var(--nb-rule-dark); }
        .nb-inner {
          max-width: 1120px; margin: 0 auto; padding: 0 24px; height: var(--nb-h);
          display: flex; align-items: center; justify-content: space-between; gap: 20px;
        }

        /* Brand */
        .nb-brand {
          display: inline-flex; align-items: center; gap: 10px; flex-shrink: 0;
          font-family: var(--nb-serif); font-weight: 800; font-size: 22px;
          letter-spacing: -0.01em; color: var(--nb-ink); text-decoration: none;
        }
        .nb-brand em { color: var(--nb-accent); font-style: normal; }
        .nb-brand__tag {
          font-family: var(--nb-mono); font-size: 9px; font-weight: 500; letter-spacing: 0.12em;
          color: var(--nb-ink-3); border: 1px solid var(--nb-rule-dark); padding: 2px 6px;
        }

        /* Desktop links */
        .nb-links { display: flex; align-items: center; gap: 0; }
        .nb-link, .nb-dd {
          position: relative; font-family: var(--nb-mono); font-size: 10.5px; letter-spacing: 0.09em;
          text-transform: uppercase; color: var(--nb-ink-2); background: none; border: none;
          cursor: pointer; text-decoration: none; white-space: nowrap; padding: 10px 10px;
          display: inline-flex; align-items: center; gap: 5px; transition: color 0.15s;
        }
        .nb-link::after, .nb-dd::after {
          content: ''; position: absolute; left: 10px; right: 10px; bottom: 4px; height: 2px;
          background: var(--nb-accent); transform: scaleX(0); transform-origin: left;
          transition: transform 0.2s ease;
        }
        .nb-link:hover, .nb-dd:hover, .nb-link--active, .nb-dd--open { color: var(--nb-ink); }
        .nb-link:hover::after, .nb-dd:hover::after,
        .nb-link--active::after, .nb-dd--open::after { transform: scaleX(1); }
        .nb-dd svg:last-child { transition: transform 0.2s; }
        .nb-dd--open svg:last-child { transform: rotate(180deg); }

        .nb-btn {
          display: inline-flex; align-items: center; gap: 7px; font-family: var(--nb-mono);
          font-size: 11px; letter-spacing: 0.06em; padding: 10px 16px; cursor: pointer;
          border: 1px solid var(--nb-rule-dark); background: transparent; color: var(--nb-ink);
          text-decoration: none; transition: background 0.15s, color 0.15s, transform 0.15s;
        }
        .nb-btn:hover { background: var(--nb-ink); color: var(--nb-bg); transform: translateY(-1px); }
        .nb-btn--solid { background: var(--nb-accent); border-color: var(--nb-accent); color: var(--nb-on); font-weight: 500; }
        .nb-btn--solid:hover { background: #d4e63c; border-color: #d4e63c; color: var(--nb-on); }
        .nb-cta { margin-left: 10px; }

        /* Burger */
        .nb-burger {
          display: none; width: 40px; height: 40px; border: 1px solid var(--nb-rule-dark);
          background: transparent; color: var(--nb-ink); cursor: pointer;
          align-items: center; justify-content: center;
        }

        @media (max-width: 1100px) {
          .nb-links { display: none; }
          .nb-burger { display: inline-flex; }
        }
        @media (max-width: 480px) { .nb-brand__tag { display: none; } }

        /* Mega panel */
        .nb-mega {
          position: fixed; left: 0; right: 0; top: var(--nb-h); z-index: 999;
          background: rgba(10,10,10,0.98); -webkit-backdrop-filter: blur(16px); backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--nb-rule-dark); border-top: 1px solid var(--nb-rule);
          animation: nb-drop 0.18s ease-out;
        }
        @keyframes nb-drop { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
        .nb-mega__inner { max-width: 1120px; margin: 0 auto; padding: 26px 24px 28px; }
        .nb-mega__header {
          display: flex; align-items: flex-end; justify-content: space-between; gap: 16px;
          padding-bottom: 14px; margin-bottom: 20px; border-bottom: 3px double var(--nb-rule-dark);
        }
        .nb-mega__kicker {
          font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--nb-accent);
          display: flex; align-items: center; gap: 6px; margin-bottom: 6px;
        }
        .nb-mega__sub { font-family: var(--nb-serif); font-weight: 800; font-size: 22px; color: var(--nb-ink); line-height: 1.15; }
        .nb-mega__close {
          font-family: var(--nb-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--nb-ink-3); border: 1px solid var(--nb-rule-dark); background: transparent;
          padding: 6px 12px; cursor: pointer; transition: color 0.15s, border-color 0.15s;
        }
        .nb-mega__close:hover { color: var(--nb-ink); border-color: var(--nb-ink); }
        .nb-mega__grid { display: grid; gap: 14px; grid-template-columns: repeat(var(--cols), 1fr); }
        .nb-mega__footer { margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--nb-rule); display: flex; justify-content: flex-end; }
        .nb-mega__viewall {
          display: inline-flex; align-items: center; gap: 6px; font-size: 10px; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--nb-accent); text-decoration: none;
        }
        .nb-mega__viewall:hover { text-decoration: underline; text-underline-offset: 4px; }
        @media (max-width: 1100px) { .nb-mega { display: none; } }

        /* Card */
        .nb-card {
          background: var(--nb-card); border: 1px solid var(--nb-rule-dark); padding: 16px; height: 100%;
          display: flex; flex-direction: column; gap: 8px; cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .nb-card:hover { transform: translate(-3px, -3px); box-shadow: 4px 4px 0 var(--nb-accent); border-color: var(--nb-accent); }
        .nb-card__top { display: flex; justify-content: space-between; align-items: center; padding-bottom: 8px; border-bottom: 1px solid var(--nb-rule); }
        .nb-card__id { font-size: 8.5px; letter-spacing: 0.1em; color: var(--nb-ink-3); }
        .nb-card__tag { font-size: 8.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--nb-accent); }
        .nb-card__icon { color: var(--nb-ink-3); margin-top: 4px; }
        .nb-card:hover .nb-card__icon { color: var(--nb-accent); }
        .nb-card__title { font-family: var(--nb-serif); font-weight: 800; font-size: 16px; line-height: 1.2; color: var(--nb-ink); }
        .nb-card__desc { font-family: var(--nb-sans); font-size: 12px; line-height: 1.6; color: var(--nb-ink-3); flex: 1; }
        .nb-card__cta {
          align-self: flex-start; display: inline-flex; align-items: center; gap: 4px; font-size: 9px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--nb-ink-3);
          background: var(--nb-card-2); border: 1px solid var(--nb-rule); padding: 3px 8px;
        }
        .nb-card:hover .nb-card__cta { color: var(--nb-on); background: var(--nb-accent); border-color: var(--nb-accent); }

        /* Drawer */
        .nb-overlay { position: fixed; inset: 0; z-index: 1001; background: rgba(0,0,0,0.7); -webkit-backdrop-filter: blur(2px); backdrop-filter: blur(2px); }
        .nb-drawer {
          position: fixed; top: 0; right: 0; bottom: 0; width: min(320px, 88vw); z-index: 1002;
          background: #000; border-left: 1px solid var(--nb-rule-dark); display: flex; flex-direction: column;
          animation: nb-slide 0.22s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes nb-slide { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .nb-drawer__head { display: flex; justify-content: space-between; align-items: center; height: 60px; padding: 0 18px; border-bottom: 1px solid var(--nb-rule-dark); }
        .nb-drawer__close { width: 36px; height: 36px; border: 1px solid var(--nb-rule-dark); background: transparent; color: var(--nb-ink); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
        .nb-drawer__body { flex: 1; overflow-y: auto; padding: 8px 18px 16px; }
        .nb-drawer__link {
          display: flex; align-items: center; justify-content: space-between; width: 100%; text-align: left;
          padding: 14px 0; background: none; border: none; border-bottom: 1px solid var(--nb-rule);
          font-family: var(--nb-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--nb-ink-2); text-decoration: none; cursor: pointer; transition: color 0.15s;
        }
        .nb-drawer__link:hover, .nb-drawer__link--active { color: var(--nb-accent); }
        .nb-drawer__link svg { transition: transform 0.2s; }
        .nb-drawer__link--open svg { transform: rotate(180deg); }
        .nb-drawer__sub { padding: 6px 0 10px 12px; border-left: 2px solid var(--nb-accent); margin: 6px 0 4px; }
        .nb-drawer__sublink {
          display: block; padding: 10px 0 10px 12px; text-decoration: none; border-bottom: 1px solid var(--nb-rule);
        }
        .nb-drawer__sublink:last-child { border-bottom: none; }
        .nb-drawer__sublink b { display: flex; align-items: center; justify-content: space-between; gap: 8px; font-family: var(--nb-serif); font-weight: 800; font-size: 15px; color: var(--nb-ink); }
        .nb-drawer__sublink span { display: block; margin-top: 3px; font-family: var(--nb-sans); font-size: 11.5px; line-height: 1.5; color: var(--nb-ink-3); }
        .nb-drawer__foot { padding: 16px 18px 20px; border-top: 1px solid var(--nb-rule-dark); display: flex; flex-direction: column; gap: 10px; }
        .nb-drawer__foot .nb-btn { justify-content: center; }
      `}</style>

            {/* ── Bar ── */}
            <header className={`nb-root${isScrolled ? " nb-root--scrolled" : ""}`}>
                <div className="nb-inner">
                    <Link href="/" className="nb-brand" onClick={closeAll}>
                        brown<em>.</em>dev
                        <span className="nb-brand__tag">SBA-01</span>
                    </Link>

                    <nav className="nb-links" aria-label="Main">
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
                                <button key={item} className="nb-link" onClick={() => goToSection(item)}>
                                    {fmtItem(item)}
                                </button>
                            )
                        )}

                        {Object.entries(MENUS).map(([key, m]) => (
                            <button
                                key={key}
                                className={`nb-dd${openMenu === key ? " nb-dd--open" : ""}${key === "services" && pathname.startsWith("/services") ? " nb-link--active" : ""}`}
                                onClick={() => toggleMenu(key)}
                                aria-expanded={openMenu === key}
                                aria-haspopup="true"
                            >
                                {key === "news" && <Newspaper size={11} />}
                                {m.label}
                                <ChevronDown size={10} />
                            </button>
                        ))}

                        <Link href="/bc/contact" className="nb-btn nb-btn--solid nb-cta">
                            Start a project <ArrowRight size={12} />
                        </Link>
                    </nav>

                    <button
                        className="nb-burger"
                        aria-label="Open menu"
                        onClick={() => { setIsDrawerOpen(true); setOpenMenu(null); }}
                    >
                        <Menu size={18} />
                    </button>
                </div>
            </header>

            {/* ── Desktop mega panel ── */}
            {active && (
                <div className="nb-mega" role="region" aria-label={active.label}>
                    <div className="nb-mega__inner">
                        <div className="nb-mega__header">
                            <div>
                                <div className="nb-mega__kicker">{active.icon} {active.label}</div>
                                <div className="nb-mega__sub">{active.sub}</div>
                            </div>
                            <button className="nb-mega__close" onClick={() => setOpenMenu(null)}>Close</button>
                        </div>
                        <div className="nb-mega__grid" style={{ "--cols": active.cols }}>
                            {active.options.map((o) => (
                                <UtilCard key={o.id} item={o} onClick={() => setOpenMenu(null)} />
                            ))}
                        </div>
                        {active.footer && (
                            <div className="nb-mega__footer">
                                <Link href={active.footer.href} className="nb-mega__viewall" onClick={() => setOpenMenu(null)}>
                                    {active.footer.label} <ArrowUpRight size={12} />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── Mobile drawer ── */}
            {isDrawerOpen && (
                <>
                    <div className="nb-overlay" onClick={closeAll} />
                    <aside className="nb-drawer" aria-label="Navigation">
                        <div className="nb-drawer__head">
                            <span className="nb-brand" style={{ fontSize: 19 }}>brown<em>.</em>dev</span>
                            <button className="nb-drawer__close" aria-label="Close menu" onClick={closeAll}>
                                <X size={16} />
                            </button>
                        </div>

                        <div className="nb-drawer__body">
                            {navItems.map((item) =>
                                isLinkItem(item) ? (
                                    <Link
                                        key={item}
                                        href={`/${item}`}
                                        className={`nb-drawer__link${pathname === `/${item}` ? " nb-drawer__link--active" : ""}`}
                                        onClick={closeAll}
                                    >
                                        {fmtItem(item)}
                                    </Link>
                                ) : (
                                    <button key={item} className="nb-drawer__link" onClick={() => goToSection(item)}>
                                        {fmtItem(item)}
                                    </button>
                                )
                            )}

                            {Object.entries(MENUS).map(([key, m]) => {
                                const open = mobileSection === key;
                                return (
                                    <div key={key}>
                                        <button
                                            className={`nb-drawer__link${open ? " nb-drawer__link--open nb-drawer__link--active" : ""}`}
                                            onClick={() => setMobileSection(open ? null : key)}
                                            aria-expanded={open}
                                        >
                                            {m.label} <ChevronDown size={12} />
                                        </button>
                                        {open && (
                                            <div className="nb-drawer__sub">
                                                {m.options.map((o) =>
                                                    o.external ? (
                                                        <a key={o.id} href={o.href} target="_blank" rel="noopener noreferrer" className="nb-drawer__sublink" onClick={closeAll}>
                                                            <b>{o.title} <ExternalLink size={11} /></b>
                                                            <span>{o.description}</span>
                                                        </a>
                                                    ) : (
                                                        <Link key={o.id} href={o.href} className="nb-drawer__sublink" onClick={closeAll}>
                                                            <b>{o.title} <ArrowUpRight size={12} /></b>
                                                            <span>{o.description}</span>
                                                        </Link>
                                                    )
                                                )}
                                                {m.footer && (
                                                    <Link href={m.footer.href} className="nb-drawer__sublink" onClick={closeAll}>
                                                        <b style={{ color: "var(--nb-accent)", fontFamily: "var(--nb-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                                                            {m.footer.label} <ArrowUpRight size={12} />
                                                        </b>
                                                    </Link>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="nb-drawer__foot">
                            <Link href="/bc/contact" className="nb-btn nb-btn--solid" onClick={closeAll}>
                                Start a project <ArrowRight size={12} />
                            </Link>
                            <a href="https://github.com/sponsors/Brown-Oziomachi/" target="_blank" rel="noopener noreferrer" className="nb-btn" onClick={closeAll}>
                                Sponsor Sir Brown AD
                            </a>
                        </div>
                    </aside>
                </>
            )}
        </div>
    );
}