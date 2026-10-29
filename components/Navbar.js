"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Menu, X, ChevronDown, Terminal, Cpu, Network,
    Globe, Layers, Server, Newspaper, TrendingUp, ExternalLink,
    Sparkles, ArrowUpRight, ArrowRight, MessageCircle,
    Home, User, FolderKanban, Quote, Mail, BookOpen, Image as ImageIcon,
    Heart, Download, Search,
} from "lucide-react";
import { featuredServices } from "@/app/data/services";
import InstallAppButton from "@/components/InstallAppButton";
import InstallBanner from "./InstallBanner";
import SearchSheet from "@/components/SearchSheet";
import { CATEGORIES } from "@/lib/blogCategories";

/* ── Data ─────────────────────────────────────────────── */

const CHANNEL_URL = "https://whatsapp.com/channel/0029VbEGWFsC1FuAo5qoPh0q";

// Video shown at the top of the mobile drawer (file goes in /public/)
const DRAWER_VIDEO = "/banner.mp4";
const DRAWER_POSTER = "/banner.jpg"; // shown while the video loads

// Topics shown in the Blog dropdown -> /blog/topic/<key>, same source as the blog page
const blogTopics = CATEGORIES.map((c) => ({ slug: c.key, label: c.label }));

const anchorItems = ["home", "about", "projects", "testimonials", "contact"];
const linkItems = ["blog", "gallery", "tech-news"];
const navItems = [...anchorItems, ...linkItems];

const ITEM_ICONS = {
    home: <Home size={20} />,
    about: <User size={20} />,
    projects: <FolderKanban size={20} />,
    testimonials: <Quote size={20} />,
    contact: <Mail size={20} />,
    blog: <BookOpen size={20} />,
    gallery: <ImageIcon size={20} />,
    "tech-news": <Newspaper size={20} />,
};
const MENU_ICONS = {
    services: <Sparkles size={20} />,
    utilities: <Terminal size={20} />,
    news: <Newspaper size={20} />,
};

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
    const videoRef = useRef(null);

    const [isScrolled, setIsScrolled] = useState(false);
    const [openMenu, setOpenMenu] = useState(null); // null | "services" | "utilities" | "news" | "blog"
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [mobileSection, setMobileSection] = useState(null); // menu key or "blog"
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const closeAll = () => {
        setOpenMenu(null);
        setIsDrawerOpen(false);
        setMobileSection(null);
        setIsSearchOpen(false);
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

    // Click-outside + Escape
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

    // Download the drawer video in the background so it is cached before the menu opens
    useEffect(() => {
        const warm = document.createElement("video");
        warm.preload = "auto";
        warm.muted = true;
        warm.src = DRAWER_VIDEO;
        warm.load();
        return () => { warm.removeAttribute("src"); warm.load(); };
    }, []);

    // Keep the drawer video playing
    useEffect(() => {
        if (!isDrawerOpen) return;
        const v = videoRef.current;
        if (!v) return;
        v.muted = true;
        v.defaultMuted = true;
        const tryPlay = () => {
            if (!v.paused) return;
            const p = v.play();
            if (p && p.catch) p.catch(() => { });
        };
        tryPlay();
        // Retry while the file loads and while the drawer slides in
        const timers = [150, 500, 1200, 2500].map((ms) => setTimeout(tryPlay, ms));
        const events = ["loadedmetadata", "loadeddata", "canplay", "canplaythrough", "stalled"];
        events.forEach((e) => v.addEventListener(e, tryPlay));
        const onVisible = () => { if (!document.hidden) tryPlay(); };
        document.addEventListener("visibilitychange", onVisible);
        return () => {
            timers.forEach(clearTimeout);
            events.forEach((e) => v.removeEventListener(e, tryPlay));
            document.removeEventListener("visibilitychange", onVisible);
        };
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
    const active = openMenu && MENUS[openMenu] ? MENUS[openMenu] : null;
    const blogActive = pathname === "/blog" || pathname.startsWith("/blog/");

    return (
        <div className="nb-shell" ref={shellRef}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Oswald:wght@600;700&display=swap');

        .nb-shell {
          --nb-bg: #ffffff; --nb-card: #ffffff; --nb-card-2: #f6f5f0;
          --nb-ink: #111111; --nb-ink-2: #3f3f3f; --nb-ink-3: #6f6f6f;
          --nb-rule: #e4e2da; --nb-rule-dark: #111111;
          --nb-accent: #e8ff47; --nb-on: #0a0a0b;
          --nb-serif: 'Playfair Display', Georgia, serif;
          --nb-mono: 'JetBrains Mono', 'Fira Code', monospace;
          --nb-sans: 'Inter', system-ui, sans-serif;
          --nb-h: 68px;
          font-family: var(--nb-mono);
        }
        .nb-shell *, .nb-shell *::before, .nb-shell *::after { box-sizing: border-box; }
        .nb-shell p { margin: 0; }

        /* Bar */
        .nb-root {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          background: rgba(255,255,255,0.92);
          -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--nb-rule);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .nb-root--scrolled { border-bottom-color: var(--nb-rule-dark); }
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
        .nb-brand em { font-style: normal; background: var(--nb-accent); padding: 0 3px; }

        /* Desktop links */
        .nb-links { display: flex; align-items: center; gap: 0; }
        .nb-link, .nb-dd {
          position: relative; font-family: var(--nb-mono); font-size: 10.5px; letter-spacing: 0.09em;
          text-transform: uppercase; color: var(--nb-ink-3); background: none; border: none;
          cursor: pointer; text-decoration: none; white-space: nowrap; padding: 10px 10px;
          display: inline-flex; align-items: center; gap: 5px; transition: color 0.15s;
        }
        .nb-link::after, .nb-dd::after {
          content: ''; position: absolute; left: 10px; right: 10px; bottom: 4px; height: 3px;
          background: var(--nb-accent); transform: scaleX(0); transform-origin: left;
          transition: transform 0.2s ease;
        }
        .nb-link:hover, .nb-dd:hover, .nb-link--active, .nb-dd--open { color: var(--nb-ink); }
        .nb-link:hover::after, .nb-dd:hover::after,
        .nb-link--active::after, .nb-dd--open::after { transform: scaleX(1); }
        .nb-dd svg:last-child { transition: transform 0.2s; }
        .nb-dd--open svg:last-child { transform: rotate(180deg); }

        /* Desktop Blog: link + dropdown toggle */
        .nb-blog { position: relative; display: inline-flex; align-items: center; }
        .nb-blog > .nb-link { padding-right: 2px; }
        .nb-blog > .nb-link::after { right: 2px; }
        .nb-blog__chev {
          background: none; border: none; cursor: pointer; color: var(--nb-ink-3);
          padding: 10px 8px 10px 2px; display: inline-flex; align-items: center;
        }
        .nb-blog__chev:hover, .nb-blog__chev--open { color: var(--nb-ink); }
        .nb-blog__chev svg { transition: transform 0.2s; }
        .nb-blog__chev--open svg { transform: rotate(180deg); }
        .nb-blog__menu {
          position: absolute; top: 100%; left: 0; min-width: 230px; z-index: 1001;
          background: #fff; border: 1.5px solid var(--nb-ink);
          box-shadow: 4px 4px 0 var(--nb-accent); animation: nb-drop 0.16s ease-out;
        }
        .nb-blog__item {
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
          padding: 11px 14px; font-family: var(--nb-mono); font-size: 10.5px; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--nb-ink-2); text-decoration: none;
          border-bottom: 1px solid var(--nb-rule); transition: background 0.15s, color 0.15s;
        }
        .nb-blog__item:last-child { border-bottom: none; }
        .nb-blog__item:hover { background: var(--nb-accent); color: var(--nb-on); }
        .nb-blog__item--all { font-weight: 600; color: var(--nb-ink); background: var(--nb-card-2); }

        .nb-btn {
          display: inline-flex; align-items: center; gap: 7px; font-family: var(--nb-mono);
          font-size: 11px; letter-spacing: 0.06em; padding: 10px 16px; cursor: pointer;
          border: 1.5px solid var(--nb-ink); background: transparent; color: var(--nb-ink);
          text-decoration: none; transition: background 0.15s, color 0.15s, transform 0.15s;
        }
        .nb-btn:hover { background: var(--nb-ink); color: #fff; transform: translateY(-1px); }
        .nb-btn--solid { background: var(--nb-accent); color: var(--nb-on); font-weight: 600; }
        .nb-btn--solid:hover { background: var(--nb-ink); color: var(--nb-accent); }
        .nb-cta { margin-left: 10px; }
        .nb-right { display: none; align-items: center; gap: 8px; }

        /* Burger */
        .nb-burger {
          display: none; width: 40px; height: 40px; border: 1.5px solid var(--nb-ink);
          background: transparent; color: var(--nb-ink); cursor: pointer;
          align-items: center; justify-content: center;
        }

        @media (max-width: 1250px) {
          .nb-links { display: none; }
          .nb-right { display: flex; }
          .nb-burger { display: inline-flex; }
        }

        /* Mega panel */
        .nb-mega {
          position: fixed; left: 0; right: 0; top: calc(var(--nb-h) + var(--install-bar-h, 0px)); z-index: 999;
          background: rgba(255,255,255,0.98); -webkit-backdrop-filter: blur(16px); backdrop-filter: blur(16px);
          border-bottom: 1.5px solid var(--nb-ink); border-top: 1px solid var(--nb-rule);
          box-shadow: 0 18px 40px rgba(0,0,0,0.08);
          animation: nb-drop 0.18s ease-out;
        }
        @keyframes nb-drop { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
        .nb-mega__inner { max-width: 1120px; margin: 0 auto; padding: 26px 24px 28px; }
        .nb-mega__header {
          display: flex; align-items: flex-end; justify-content: space-between; gap: 16px;
          padding-top: 10px; border-top: 3px solid var(--nb-ink); margin-bottom: 20px;
        }
        .nb-mega__kicker {
          font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--nb-ink-3);
          display: flex; align-items: center; gap: 6px; margin-bottom: 6px;
        }
        .nb-mega__sub { font-family: var(--nb-serif); font-weight: 800; font-size: 22px; color: var(--nb-ink); line-height: 1.15; }
        .nb-mega__close {
          font-family: var(--nb-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--nb-ink-2); border: 1px solid var(--nb-ink); background: transparent;
          padding: 6px 12px; cursor: pointer; transition: background 0.15s, color 0.15s;
        }
        .nb-mega__close:hover { background: var(--nb-ink); color: #fff; }
        .nb-mega__grid { display: grid; gap: 14px; grid-template-columns: repeat(var(--cols), 1fr); }
        .nb-mega__footer { margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--nb-rule); display: flex; justify-content: flex-end; }
        .nb-mega__viewall {
          display: inline-flex; align-items: center; gap: 6px; font-size: 10.5px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--nb-ink); text-decoration: none; background: var(--nb-accent); padding: 8px 12px;
        }
        .nb-mega__viewall:hover { background: var(--nb-ink); color: var(--nb-accent); }
        @media (max-width: 1250px) { .nb-mega, .nb-blog__menu { display: none; } }

        /* Card */
        .nb-card {
          background: var(--nb-card); border: 1px solid var(--nb-rule-dark); padding: 16px; height: 100%;
          display: flex; flex-direction: column; gap: 8px; cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .nb-card:hover { transform: translate(-3px, -3px); box-shadow: 4px 4px 0 var(--nb-accent); }
        .nb-card__top { display: flex; justify-content: space-between; align-items: center; padding-bottom: 8px; border-bottom: 1px solid var(--nb-rule); }
        .nb-card__id { font-size: 8.5px; letter-spacing: 0.1em; color: var(--nb-ink-3); }
        .nb-card__tag { font-size: 8.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--nb-on); background: var(--nb-accent); padding: 2px 6px; }
        .nb-card__icon { color: var(--nb-ink); margin-top: 4px; }
        .nb-card__title { font-family: var(--nb-serif); font-weight: 800; font-size: 16px; line-height: 1.2; color: var(--nb-ink); }
        .nb-card__desc { font-family: var(--nb-sans); font-size: 12px; line-height: 1.6; color: var(--nb-ink-3); flex: 1; }
        .nb-card__cta {
          align-self: flex-start; display: inline-flex; align-items: center; gap: 4px; font-size: 9px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--nb-ink-2);
          background: var(--nb-card-2); border: 1px solid var(--nb-rule); padding: 3px 8px;
        }
        .nb-card:hover .nb-card__cta { color: var(--nb-on); background: var(--nb-accent); border-color: var(--nb-ink); }

        /* ── Side drawer (slides in from the left) ── */
        .nb-overlay {
          position: fixed; inset: 0; z-index: 1001; background: rgba(0,0,0,0.5);
          animation: nb-fade 0.2s ease-out;
        }
        @keyframes nb-fade { from { opacity: 0; } to { opacity: 1; } }
        .nb-drawer {
          position: fixed; top: 0; left: 0; bottom: 0; z-index: 1002;
          width: min(86vw, 340px); background: #fff;
          box-shadow: 8px 0 32px rgba(0,0,0,0.25);
          display: flex; flex-direction: column;
          animation: nb-slide 0.26s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes nb-slide { from { transform: translateX(-100%); } to { transform: translateX(0); } }

        /* Hero image area */
        .nb-drawer__hero {
          position: relative; flex-shrink: 0; height: 190px;
          background-color: #2b3a42;
          background-image: linear-gradient(135deg, #2b3a42, #4b6472);
          background-size: cover; background-position: center;
        }
        .nb-drawer__hero::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0) 60%);
        }
        .nb-drawer__heroTitle {
          position: absolute; left: 14px; bottom: 12px; z-index: 1;
          font-family: var(--nb-sans); font-weight: 600; font-size: 18px; color: #fff;
        }
        .nb-drawer__close {
          position: absolute; top: 10px; right: 10px; z-index: 2;
          width: 34px; height: 34px; border: none; border-radius: 50%;
          background: rgba(0,0,0,0.45); color: #fff; cursor: pointer;
          display: inline-flex; align-items: center; justify-content: center;
        }

        /* Rows */
        .nb-drawer__body { flex: 1; overflow-y: auto; }
        .nb-row {
          display: flex; align-items: center; gap: 22px; width: 100%; text-align: left;
          padding: 0 20px; min-height: 56px; background: none; border: none;
          border-bottom: 1px solid var(--nb-rule); cursor: pointer; text-decoration: none;
          font-family: var(--nb-sans); font-size: 15px; color: #5b7a8c;
          transition: background 0.15s;
        }
        .nb-row:hover { background: var(--nb-card-2); }
        .nb-row__icon { display: inline-flex; width: 24px; justify-content: center; flex-shrink: 0; color: #4b6472; }
        .nb-row__label { flex: 1; }
        .nb-row--active { color: var(--nb-ink); font-weight: 600; box-shadow: inset 4px 0 0 var(--nb-accent); }
        .nb-row__chev { transition: transform 0.2s; }
        .nb-row--open .nb-row__chev { transform: rotate(180deg); }

        /* Blog row: clickable label + separate toggle */
        .nb-split { display: flex; align-items: stretch; border-bottom: 1px solid var(--nb-rule); }
        .nb-split .nb-row { border-bottom: none; flex: 1; }
        .nb-split__toggle {
          width: 56px; flex-shrink: 0; background: none; border: none; border-left: 1px solid var(--nb-rule);
          color: #4b6472; cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
        }
        .nb-split__toggle svg { transition: transform 0.2s; }
        .nb-split__toggle--open svg { transform: rotate(180deg); }
        .nb-split__toggle:hover { background: var(--nb-card-2); }

        /* Sub lists */
        .nb-sub { background: var(--nb-card-2); border-bottom: 1px solid var(--nb-rule); border-left: 4px solid var(--nb-accent); }
        .nb-sub__link {
          display: block; padding: 12px 20px 12px 66px; text-decoration: none;
          border-bottom: 1px solid var(--nb-rule); font-family: var(--nb-sans); font-size: 13.5px; color: var(--nb-ink-2);
        }
        .nb-sub__link:last-child { border-bottom: none; }
        .nb-sub__link:hover { background: #fff; color: var(--nb-ink); }
        .nb-sub__link b { display: flex; align-items: center; gap: 6px; font-weight: 600; color: var(--nb-ink); }
        .nb-sub__link span { display: block; margin-top: 2px; font-size: 11.5px; line-height: 1.5; color: var(--nb-ink-3); }

        .nb-drawer__foot { flex-shrink: 0; padding: 14px 16px 18px; border-top: 1px solid var(--nb-rule); display: flex; flex-direction: column; gap: 10px; }
        .nb-drawer__foot .nb-btn { justify-content: center; }

        .nb-shell :focus-visible { outline: 2px solid var(--nb-ink); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { .nb-shell * { transition: none !important; animation: none !important; } }
              .nb-drawer__video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
     
                      /* ── Mobile top bar: blue strip + big wordmark ── */
        .nb-strip, .nb-m-brand { display: none; }
        @media (max-width: 1250px) {
          body { padding-top: 28px; }
         .nb-strip {
  display: flex; align-items: center; gap: 12px; height: 28px; padding: 0 18px;
  background: var(--nb-accent); color: var(--nb-on); overflow: hidden; transition: height 0.2s ease;
}
.nb-strip__bar { width: 1px; height: 14px; background: rgba(10,10,11,0.8); }
          .nb-root--scrolled .nb-strip { height: 0; }
          .nb-strip__a { font-family: var(--nb-serif); font-weight: 800; font-size: 14px; letter-spacing: 0.28em; }
          .nb-strip__b { font-family: var(--nb-sans); font-weight: 600; font-size: 14px; }

          .nb-brand--desk { display: none; }
          .nb-m-brand { display: inline-flex; flex-direction: column; justify-content: center; text-decoration: none; color: #111; flex-shrink: 0; }
.nb-m-brand__cap { font-family: var(--nb-sans); font-size: 9px; font-weight: 500; letter-spacing: 0.03em; text-transform: uppercase; color: #111; line-height: 1.2; }
          .nb-m-brand__word { font-family: 'Oswald', 'Inter', sans-serif; font-weight: 700; font-size: 34px; line-height: 1; letter-spacing: -0.01em; color: #111; }
.nb-m-brand__word b { display: inline-block; line-height: 1; font-weight: 700; color: #111; background: var(--nb-accent); padding: 2px 4px; }

          .nb-right { gap: 18px; }
.nb-icon { display: inline-flex; color: #111; background: none; border: none; padding: 0; cursor: pointer; }
.nb-burger { border: none; width: auto; height: auto; padding: 4px; color: #111; }
        }
     `}</style>

            {/* ── Bar ── */}
            <header className={`nb-root${isScrolled ? " nb-root--scrolled" : ""}`}>
                               <InstallBanner />
                <div className="nb-strip" aria-hidden="true">
                    <span className="nb-strip__a">SIR-AD</span>
                    <span className="nb-strip__bar" />
                    <span className="nb-strip__b">Blog</span>
                </div>
                <div className="nb-inner">
                    <Link href="/" className="nb-brand nb-brand--desk" onClick={closeAll}>
                        Sir-AD<em>Blog</em>
                    </Link>
                    <Link href="/" className="nb-m-brand" onClick={closeAll}>
                        <span className="nb-m-brand__word"><b>SIR-AD</b>BLOG</span>
                        <span className="nb-m-brand__cap">Fraud awareness and web security</span>
                    </Link>

                    <nav className="nb-links" aria-label="Main">
                        {navItems.map((item) => {
                            if (item === "blog") {
                                return (
                                    <div key="blog" className="nb-blog">
                                        <Link
                                            href="/blog"
                                            className={`nb-link${blogActive ? " nb-link--active" : ""}`}
                                            onClick={closeAll}
                                        >
                                            Blog
                                        </Link>
                                        <button
                                            className={`nb-blog__chev${openMenu === "blog" ? " nb-blog__chev--open" : ""}`}
                                            onClick={() => toggleMenu("blog")}
                                            aria-label="Blog topics"
                                            aria-expanded={openMenu === "blog"}
                                            aria-haspopup="true"
                                        >
                                            <ChevronDown size={10} />
                                        </button>
                                        {openMenu === "blog" && (
                                            <div className="nb-blog__menu" role="menu">
                                                <Link href="/blog" className="nb-blog__item nb-blog__item--all" onClick={closeAll}>
                                                    All posts <ArrowUpRight size={11} />
                                                </Link>
                                                {blogTopics.map((t) => (
                                                    <Link
                                                        key={t.slug}
                                                        href={`/blog/topic/${t.slug}`}
                                                        className="nb-blog__item"
                                                        onClick={closeAll}
                                                    >
                                                        {t.label} <ArrowRight size={11} />
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            }
                            return isLinkItem(item) ? (
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
                            );
                        })}

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

                                     <div className="nb-right">
                        <button
                            type="button"
                            className="nb-icon"
                            aria-label="Search articles"
                            onClick={() => { setIsDrawerOpen(false); setOpenMenu(null); setIsSearchOpen(true); }}
                        >
                            <Search size={24} />
                        </button>
                        <button
                            className="nb-burger"
                            aria-label="Open menu"
                            onClick={() => { setIsDrawerOpen(true); setOpenMenu(null); }}
                        >
                            <svg width="26" height="22" viewBox="0 0 26 22" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" aria-hidden="true">
                                <path d="M2 3h22M8 11h16M2 19h22" />
                            </svg>
                        </button>
                    </div>
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

            {/* ── Mobile side drawer (slides from the left) ── */}
            {isDrawerOpen && (
                <>
                    <div className="nb-overlay" onClick={closeAll} />
                    <aside className="nb-drawer" aria-label="Navigation">
                        {/* Video area */}
                        <div className="nb-drawer__hero">
                            <video
                                ref={videoRef}
                                className="nb-drawer__video"
                                src={DRAWER_VIDEO}
                                poster={DRAWER_POSTER}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="auto"
                                aria-hidden="true"
                                onCanPlay={(e) => e.currentTarget.play().catch(() => { })}
                                onPause={(e) => {
                                    if (!e.currentTarget.ended) e.currentTarget.play().catch(() => { });
                                }}
                                onEnded={(e) => {
                                    e.currentTarget.currentTime = 0;
                                    e.currentTarget.play().catch(() => { });
                                }}
                            />
                            <button className="nb-drawer__close" aria-label="Close menu" onClick={closeAll}>
                                <X size={16} />
                            </button>
                            <span className="nb-drawer__heroTitle">Sir-AD Blog</span>
                        </div>

                        <div className="nb-drawer__body">
                            {navItems.map((item) => {
                                if (item === "blog") {
                                    const open = mobileSection === "blog";
                                    return (
                                        <div key="blog">
                                            <div className="nb-split">
                                                <Link
                                                    href="/blog"
                                                    className={`nb-row${blogActive ? " nb-row--active" : ""}`}
                                                    onClick={closeAll}
                                                >
                                                    <span className="nb-row__icon">{ITEM_ICONS.blog}</span>
                                                    <span className="nb-row__label">Blog</span>
                                                </Link>
                                                <button
                                                    className={`nb-split__toggle${open ? " nb-split__toggle--open" : ""}`}
                                                    onClick={() => setMobileSection(open ? null : "blog")}
                                                    aria-label="Toggle blog topics"
                                                    aria-expanded={open}
                                                >
                                                    <ChevronDown size={16} />
                                                </button>
                                            </div>
                                            {open && (
                                                <div className="nb-sub">
                                                    <Link href="/blog" className="nb-sub__link" onClick={closeAll}>
                                                        <b>All posts <ArrowUpRight size={12} /></b>
                                                    </Link>
                                                    {blogTopics.map((t) => (
                                                        <Link
                                                            key={t.slug}
                                                            href={`/blog/topic/${t.slug}`}
                                                            className="nb-sub__link"
                                                            onClick={closeAll}
                                                        >
                                                            {t.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }
                                return isLinkItem(item) ? (
                                    <Link
                                        key={item}
                                        href={`/${item}`}
                                        className={`nb-row${pathname === `/${item}` ? " nb-row--active" : ""}`}
                                        onClick={closeAll}
                                    >
                                        <span className="nb-row__icon">{ITEM_ICONS[item]}</span>
                                        <span className="nb-row__label">{fmtItem(item)}</span>
                                    </Link>
                                ) : (
                                    <button key={item} className="nb-row" onClick={() => goToSection(item)}>
                                        <span className="nb-row__icon">{ITEM_ICONS[item]}</span>
                                        <span className="nb-row__label">{fmtItem(item)}</span>
                                    </button>
                                );
                            })}

                            {Object.entries(MENUS).map(([key, m]) => {
                                const open = mobileSection === key;
                                return (
                                    <div key={key}>
                                        <button
                                            className={`nb-row${open ? " nb-row--open nb-row--active" : ""}`}
                                            onClick={() => setMobileSection(open ? null : key)}
                                            aria-expanded={open}
                                        >
                                            <span className="nb-row__icon">{MENU_ICONS[key]}</span>
                                            <span className="nb-row__label">{m.label}</span>
                                            <ChevronDown size={16} className="nb-row__chev" />
                                        </button>
                                        {open && (
                                            <div className="nb-sub">
                                                {m.options.map((o) =>
                                                    o.external ? (
                                                        <a key={o.id} href={o.href} target="_blank" rel="noopener noreferrer" className="nb-sub__link" onClick={closeAll}>
                                                            <b>{o.title} <ExternalLink size={11} /></b>
                                                            <span>{o.description}</span>
                                                        </a>
                                                    ) : (
                                                        <Link key={o.id} href={o.href} className="nb-sub__link" onClick={closeAll}>
                                                            <b>{o.title} <ArrowUpRight size={12} /></b>
                                                            <span>{o.description}</span>
                                                        </Link>
                                                    )
                                                )}
                                                {m.footer && (
                                                    <Link href={m.footer.href} className="nb-sub__link" onClick={closeAll}>
                                                        <b>{m.footer.label} <ArrowUpRight size={12} /></b>
                                                    </Link>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="nb-row" onClick={closeAll}>
                                <span className="nb-row__icon"><MessageCircle size={20} /></span>
                                <span className="nb-row__label">WhatsApp channel</span>
                            </a>
                            <a href="https://github.com/sponsors/Brown-Oziomachi/" target="_blank" rel="noopener noreferrer" className="nb-row" onClick={closeAll}>
                                <span className="nb-row__icon"><Heart size={20} /></span>
                                <span className="nb-row__label">Sponsor Sir Brown AD</span>
                            </a>
                        </div>

                        <div className="nb-drawer__foot">
                            <Link href="/bc/contact" className="nb-btn nb-btn--solid" onClick={closeAll}>
                                Start a project <ArrowRight size={12} />
                            </Link>
                            <InstallAppButton className="nb-btn" />
                        </div>
                    </aside>
                </>
            )}

            {/* ── Search sheet (slides up from the bottom) ── */}
            <SearchSheet open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </div>
    );
}