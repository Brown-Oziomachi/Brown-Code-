import Link from "next/link";
import {
    ArrowRight, Download, Github, Mail, ShieldCheck, Globe,
    Rocket, ExternalLink, MapPin, Terminal, Database, Megaphone,
    FileText, PenLine, Cpu, ArrowLeft
} from "lucide-react";
import { articles } from "@/app/data/article";
import { CATEGORY_LABELS, getCategoryKey } from "@/lib/blogCategories";

export const metadata = {
    title: "About Sir Brown AD | Full Stack Developer and Publisher in Abuja",
    description:
        "Sir Brown AD is a full stack engineer and publisher in Abuja, Nigeria. He builds Fraud Radar NG and LAN Library, and writes about web security and fraud awareness at browncode.name.ng.",
    openGraph: {
        title: "About Sir Brown AD | Engineer and Publisher",
        description:
            "Full stack engineer and publisher in Abuja building fraud-awareness, marketplace and content platforms.",
        type: "profile",
    },
};

const getReadingTime = (content) =>
    Math.max(1, Math.ceil((content || "").split(" ").length / 200));

const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const datasheet = [
    ["Role", "Full stack engineer and publisher"],
    ["Base", "Abuja, Nigeria (remote)"],
    ["Stack", "Next.js, Nuxt, Node.js, Firebase"],
    ["Publishes", "browncode.name.ng"],
    ["Beats", "Fraud awareness, web security, building in public"],
    ["Trained at", "EarlyCode Institute (React.js, Next.js)"],
    ["Status", "Open to projects"],
];

const stats = [
    { num: "5+", label: "Years shipping" },
    { num: "5", label: "Platforms built" },
    { num: "20+", label: "Countries reached" },
    { num: "2", label: "Frameworks in production" },
];

const systems = [
    {
        tag: "Fraud awareness",
        status: "Live",
        title: "Fraud Radar NG",
        problem: "Scams spread faster than warnings, and most Nigerians have no single place to check or report one.",
        build: "Multi-step report wizard, threat registry lookup, domain safety quiz, verified agency contacts, rate limiting by action type, suspicious-activity clustering and a protected admin console.",
        stack: ["Nuxt 4", "Firebase", "Nitro", "Vercel"],
        href: "https://fraudradarng.vercel.app",
        icon: <ShieldCheck size={15} />,
    },
    {
        tag: "Marketplace",
        status: "Live",
        title: "LAN Library",
        problem: "African students and academics need an affordable place to find, sell and request documents.",
        build: "Seller wallets and withdrawals, Flutterwave payments, a bounty board, boosted listings, an admin panel and pricing in 30+ African currencies. Financial writes run on secured server routes with idempotent webhooks.",
        stack: ["Next.js", "Firebase", "Flutterwave", "Node.js"],
        href: "https://learningaccessnetwork.vercel.app",
        icon: <Globe size={15} />,
    },
   
];

const beats = [
    {
        icon: <ShieldCheck size={18} />,
        title: "Fraud and scam awareness",
        body: "How scams work, how to spot them, and where to report them in Nigeria, written so anyone can act on it.",
    },
    {
        icon: <Terminal size={18} />,
        title: "Web security",
        body: "Practical notes on securing real apps: access rules, server-side writes, payments and the mistakes that cause breaches.",
    },
    {
        icon: <Cpu size={18} />,
        title: "Building in public",
        body: "What breaks in production, how I traced it, and what I changed. Lessons from shipping real products.",
    },
];

const skills = [
    { name: "Vue 3 and Nuxt (SSR, routing)", level: 85 },
    { name: "React and Next.js App Router", level: 75 },
    { name: "Firebase: Auth, Firestore, security rules", level: 75 },
    { name: "SEO and technical publishing", level: 70 },
    { name: "Payments: Flutterwave, webhooks, wallets", level: 65 },
    { name: "Node.js and Vercel serverless", level: 60 },
];

const stackCards = [
    { title: "Frontend", body: "Vue 3, Nuxt, React, Next.js, CSS design tokens, Tailwind" },
    { title: "Backend", body: "Node.js, Nitro, API routes, Vercel Functions, webhooks" },
    { title: "Data and security", body: "Firestore, Firebase Auth and Admin SDK, security rules, rate limiting" },
    { title: "Growth", body: "Dynamic sitemaps, IndexNow, newsletters, structured data" },
];

const fieldNotes = [
    {
        year: "2024 - 2025",
        title: "Training and first builds",
        body: "Studied React.js and Next.js at EarlyCode Institute and moved from tutorials to real projects.",
    },
    {
        year: "2025",
        title: "Marketplace and payments",
        body: "Built LAN Library with wallets, Flutterwave payments, a bounty board and an admin panel. Moved all financial writes off the client.",
    },
    {
        year: "2026",
        title: "Platforms for Nigerians",
        body: "Launched Fraud Radar NG in Nuxt 4, grew browncode.name.ng into a publishing platform and started the studio site.",
    },
];

const rules = [
    ["Never trust the browser.", "Money and user data are written by the server, and database rules deny by default."],
    ["Debug with evidence.", "Production problems are solved from logs and real requests, not guesses."],
    ["Keep it predictable.", "Small components, shared design tokens and clear boundaries, so a project stays easy to return to."],
    ["Write for the reader.", "If a person cannot act on what I publish, the engineering is only half done."],
];

export default function AboutMePage() {
    const latestArticles = articles
        .slice()
        .sort((a, b) => (b.datePublished || "").localeCompare(a.datePublished || ""))
        .slice(0, 4);

    const tickerItems = articles
        .slice()
        .sort((a, b) => (b.datePublished || "").localeCompare(a.datePublished || ""))
        .slice(0, 6);

    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Sir Brown AD",
        jobTitle: "Full Stack Engineer and Publisher",
        url: "https://browncode.name.ng",
        address: { "@type": "PostalAddress", addressLocality: "Abuja", addressCountry: "NG" },
        sameAs: ["https://github.com/Brown-Oziomachi"],
        knowsAbout: ["Next.js", "Nuxt", "React", "Vue", "Node.js", "Firebase", "Web security", "Fraud awareness"],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
                  --paper: #000000; --paper-2: #121212; --card: #0d0d0d;
          --ink: #f4f1ea; --ink-2: #bdb8ae; --ink-3: #85807a;
          --rule: #242424; --rule-dark: #3a3a3a;
          --red: #e8ff47; --red-dim: rgba(232,255,71,0.1);
          --on-accent: #0a0a0b;
                    --dark: #000000;
          --serif: 'Playfair Display', Georgia, serif;
          --sans: 'Inter', system-ui, sans-serif;
          --mono: 'JetBrains Mono', 'Fira Code', monospace;
        }

        @keyframes ab-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes ab-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .ab-page { background: var(--paper); color: var(--ink); font-family: var(--sans); min-height: 100vh; }
        .ab-topbar { position: sticky; top: 0; z-index: 1000; width: 100%; min-height: 76px; background: var(--paper); }
                .ab-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
        .ab-section { margin-top: 72px; }

        /* Ticker */
        .ab-ticker { background: #0b0b0b; color: #f4f4f5; display: flex; align-items: stretch; overflow: hidden; border-top: 1px solid var(--rule); border-bottom: 3px solid var(--red); }
                .ab-ticker__label { flex-shrink: 0; background: var(--red); color: var(--on-accent); font-family: var(--mono); font-size: 10px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; padding: 10px 16px; display: flex; align-items: center; gap: 8px; }
        .ab-ticker__dot { width: 6px; height: 6px; border-radius: 50%; background: var(--on-accent); animation: ab-blink 1.4s ease-in-out infinite; }
        .ab-ticker__viewport { flex: 1; overflow: hidden; display: flex; align-items: center; }
        .ab-ticker__track { display: flex; gap: 40px; white-space: nowrap; padding-left: 40px; animation: ab-marquee 55s linear infinite; }
        .ab-ticker__viewport:hover .ab-ticker__track { animation-play-state: paused; }
        .ab-ticker__item { font-size: 12px; color: #d4d4d8; text-decoration: none; display: inline-flex; align-items: center; gap: 10px; }
        .ab-ticker__item::after { content: '/'; color: #52525b; margin-left: 30px; }
        .ab-ticker__item:hover { color: #fff; }

        /* Cover + masthead */
        .ab-cover-wrap { max-width: 1120px; margin: 28px auto 0; padding: 0 24px; }
        .ab-cover { position: relative; width: 100%; aspect-ratio: 16 / 5.2; background: var(--dark); border: 1px solid var(--rule-dark); overflow: hidden; }
        .ab-cover__img { width: 100%; height: 100%; object-fit: contain; display: block; }
        .ab-cover__fade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(15,15,16,0) 55%, rgba(15,15,16,0.6) 100%); pointer-events: none; }
        .ab-cover__tag { position: absolute; top: 12px; left: 12px; font-family: var(--mono); font-size: 9px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; background: var(--red); color: var(--on-accent); padding: 4px 9px; }

        .ab-mast { display: flex; align-items: flex-end; gap: 20px; margin-top: -54px; padding: 0 6px; position: relative; z-index: 2; flex-wrap: wrap; }
        .ab-mast__avatar { width: 112px; height: 112px; border-radius: 50%; border: 4px solid var(--paper); background: var(--paper); object-fit: cover; flex-shrink: 0; box-shadow: 0 0 0 1px var(--rule-dark); }
        .ab-mast__id { flex: 1; min-width: 220px; padding-bottom: 6px; }
        .ab-mast__name { font-family: var(--serif); font-weight: 800; font-size: clamp(28px, 4vw, 40px); line-height: 1.05; color: var(--ink); }
        .ab-mast__role { font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em; color: var(--ink-3); margin-top: 6px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .ab-mast__role span { display: inline-flex; align-items: center; gap: 5px; }
        .ab-mast__role svg { color: var(--red); }
        .ab-mast__actions { display: flex; flex-wrap: wrap; gap: 8px; padding-bottom: 6px; }
        @media (max-width: 780px) {
          .ab-cover { aspect-ratio: 4 / 3; }
          .ab-mast { margin-top: -40px; }
          .ab-mast__avatar { width: 88px; height: 88px; }
        }

        .ab-btn { display: inline-flex; align-items: center; gap: 7px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em; padding: 10px 16px; border: 1px solid var(--rule-dark); background: transparent; color: var(--ink); cursor: pointer; text-decoration: none; transition: background 0.15s, color 0.15s, transform 0.15s; }
        .ab-btn:hover { background: var(--ink); color: var(--paper); transform: translateY(-1px); }
        .ab-btn--solid { background: var(--red); border-color: var(--red); color: black; font-weight: 500; }
.ab-btn--solid:hover { background: #d4e63c; border-color: #d4e63c; color: #0a0a0b; }

        /* Section heads */
        .ab-kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--red); margin-bottom: 8px; }
        .ab-h2 { font-family: var(--serif); font-weight: 800; font-size: clamp(26px, 3.6vw, 38px); line-height: 1.1; color: var(--ink); }
        .ab-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; margin-bottom: 26px; padding-bottom: 14px; border-bottom: 3px double var(--rule-dark); flex-wrap: wrap; }
        .ab-head__note { font-family: var(--mono); font-size: 11px; color: var(--ink-3); }

        /* Lead story */
        .ab-lead { display: grid; grid-template-columns: 1.6fr 1fr; gap: 44px; padding-top: 44px; }
        @media (max-width: 900px) { .ab-lead { grid-template-columns: 1fr; gap: 32px; } }
        .ab-lead__title { font-family: var(--serif); font-weight: 800; font-size: clamp(34px, 5vw, 56px); line-height: 1.04; letter-spacing: -0.01em; color: var(--ink); }
        .ab-lead__title em { color: var(--red); font-style: italic; }
        .ab-lead__dek { margin-top: 18px; font-size: 17px; line-height: 1.6; color: var(--ink-2); font-weight: 300; border-left: 3px solid var(--red); padding-left: 16px; }
        .ab-lead__body { margin-top: 22px; column-count: 2; column-gap: 32px; font-size: 14px; line-height: 1.8; color: var(--ink-2); }
        @media (max-width: 700px) { .ab-lead__body { column-count: 1; } }
        .ab-lead__body p + p { margin-top: 14px; }
        .ab-lead__body p:first-child::first-letter { font-family: var(--serif); font-weight: 800; font-size: 54px; float: left; line-height: 0.85; padding: 6px 8px 0 0; color: var(--red); }
        .ab-lead__body strong { color: var(--ink); font-weight: 600; }

        /* Datasheet */
        .ab-sheet { background: var(--card); border: 1px solid var(--rule-dark); align-self: start; }
        .ab-sheet__head { background: var(--ink); color: var(--paper); font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; padding: 10px 16px; display: flex; justify-content: space-between; }
        .ab-sheet__row { display: grid; grid-template-columns: 96px 1fr; gap: 12px; padding: 11px 16px; border-bottom: 1px solid var(--rule); font-size: 12.5px; }
        .ab-sheet__row:last-child { border-bottom: none; }
        .ab-sheet__k { font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-3); padding-top: 2px; }
        .ab-sheet__v { color: var(--ink); font-weight: 500; line-height: 1.5; }

        /* Stats */
        .ab-stats { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 3px double var(--rule-dark); border-bottom: 3px double var(--rule-dark); margin-top: 48px; }
        @media (max-width: 700px) { .ab-stats { grid-template-columns: 1fr 1fr; } }
        .ab-stat { padding: 24px 20px; border-right: 1px solid var(--rule); }
        .ab-stat:last-child { border-right: none; }
        @media (max-width: 700px) { .ab-stat:nth-child(2) { border-right: none; } .ab-stat:nth-child(-n+2) { border-bottom: 1px solid var(--rule); } }
        .ab-stat__num { font-family: var(--serif); font-weight: 800; font-size: 42px; color: var(--red); line-height: 1; }
        .ab-stat__label { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3); margin-top: 8px; }

        /* Systems */
        .ab-systems { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 800px) { .ab-systems { grid-template-columns: 1fr; } }
        .ab-sys { display: flex; flex-direction: column; background: var(--card); border: 1px solid var(--rule-dark); padding: 24px; text-decoration: none; color: inherit; transition: transform 0.2s, box-shadow 0.2s; }
        a.ab-sys:hover { transform: translate(-3px, -3px); box-shadow: 5px 5px 0 var(--red); }
                .ab-sys__top { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px; }
        .ab-sys__tag { display: inline-flex; align-items: center; gap: 7px; font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--red); }
               .ab-sys__status { font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 8px; border: 1px solid #4ade80; color: #4ade80; }
        .ab-sys__status--dev { border-color: #fbbf24; color: #fbbf24; }
        .ab-sys__title { font-family: var(--serif); font-weight: 800; font-size: 26px; line-height: 1.15; color: var(--ink); display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
        .ab-sys__title svg { color: var(--ink-3); }
        .ab-sys__row { font-size: 13px; line-height: 1.65; color: var(--ink-2); margin-bottom: 10px; }
        .ab-sys__row b { display: block; font-family: var(--mono); font-size: 9.5px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 3px; }
        .ab-sys__stack { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; padding-top: 14px; border-top: 1px solid var(--rule); }
        .ab-chip { font-family: var(--mono); font-size: 10px; padding: 3px 9px; background: var(--paper-2); border: 1px solid var(--rule); color: var(--ink-2); }

        /* Beats */
        .ab-beats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border: 1px solid var(--rule-dark); background: var(--card); margin-bottom: 36px; }
        @media (max-width: 800px) { .ab-beats { grid-template-columns: 1fr; } }
        .ab-beat { padding: 24px; border-right: 1px solid var(--rule-dark); }
        .ab-beat:last-child { border-right: none; }
        @media (max-width: 800px) { .ab-beat { border-right: none; border-bottom: 1px solid var(--rule-dark); } .ab-beat:last-child { border-bottom: none; } }
        .ab-beat__icon { color: var(--red); margin-bottom: 12px; }
        .ab-beat__title { font-family: var(--serif); font-weight: 800; font-size: 19px; color: var(--ink); margin-bottom: 8px; line-height: 1.2; }
        .ab-beat__body { font-size: 12.5px; line-height: 1.7; color: var(--ink-2); }

        /* Articles */
        .ab-articles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        @media (max-width: 900px) { .ab-articles { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .ab-articles { grid-template-columns: 1fr; } }
        .ab-art { display: flex; flex-direction: column; text-decoration: none; color: inherit; background: var(--card); border: 1px solid var(--rule); transition: border-color 0.15s, transform 0.2s; }
        .ab-art:hover { border-color: var(--ink); transform: translateY(-3px); }
        .ab-art__media { position: relative; height: 130px; background: var(--paper-2); overflow: hidden; border-bottom: 1px solid var(--rule); }
        .ab-art__img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s; }
        .ab-art:hover .ab-art__img { transform: scale(1.05); }
        .ab-art__ph { width: 100%; height: 100%; background: repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.04) 6px, rgba(255,255,255,0.04) 12px); }
        .ab-art__tag { position: absolute; top: 10px; left: 10px; font-family: var(--mono); font-size: 8.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; background: var(--red); color: var(--on-accent); padding: 3px 7px; }
        .ab-art__body { padding: 14px 14px 16px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .ab-art__title { font-family: var(--serif); font-weight: 800; font-size: 16px; line-height: 1.25; color: var(--ink); }
        .ab-art:hover .ab-art__title { color: var(--red); }
        .ab-art__preview { font-size: 12px; color: var(--ink-3); line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .ab-art__meta { margin-top: auto; padding-top: 8px; border-top: 1px solid var(--rule); font-family: var(--mono); font-size: 9.5px; color: var(--ink-3); display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .ab-art__dot { width: 3px; height: 3px; border-radius: 50%; background: var(--ink-3); }
        .ab-articles__empty { padding: 40px 0; text-align: center; font-family: var(--mono); font-size: 11px; color: var(--ink-3); }
        .ab-articles__cta { display: flex; justify-content: center; margin-top: 26px; }

        /* Advertise */
        .ab-ad { background: var(--card); color: var(--ink); border: 1px solid var(--rule-dark); border-top: 4px solid var(--red); padding: 40px; display: grid; grid-template-columns: 1.3fr 1fr; gap: 36px; align-items: center; }
                @media (max-width: 800px) { .ab-ad { grid-template-columns: 1fr; padding: 28px; } }
        .ab-ad__kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--red); margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
        .ab-ad__title { font-family: var(--serif); font-weight: 800; font-size: clamp(26px, 3.4vw, 36px); line-height: 1.1; margin-bottom: 12px; }
        .ab-ad__sub { font-size: 14px; line-height: 1.7; color: #c9c5bc; font-weight: 300; max-width: 460px; }
        .ab-ad__list { display: flex; flex-direction: column; gap: 12px; }
        .ab-ad__item { display: flex; gap: 12px; align-items: flex-start; padding: 14px 16px; border: 1px solid #333; background: #181818; }
        .ab-ad__item svg { color: var(--red); flex-shrink: 0; margin-top: 2px; }
        .ab-ad__item b { display: block; font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 3px; }
        .ab-ad__item span { font-size: 12px; color: #a8a49b; line-height: 1.55; }
        .ab-ad__actions { margin-top: 24px; display: flex; flex-wrap: wrap; gap: 10px; }
        .ab-ad .ab-btn { border-color: #f3efe6; color: #f3efe6; }
        .ab-ad .ab-btn:hover { background: #f3efe6; color: #131313; }
        .ab-ad .ab-btn--solid { background: var(--red); border-color: var(--red); color: var(--on-accent); }
        .ab-ad .ab-btn--solid:hover { background: #d4e63c; border-color: #d4e63c; color: var(--on-accent); }

        /* Skills */
        .ab-skills { display: grid; grid-template-columns: 1fr 1fr; gap: 0 36px; margin-bottom: 28px; }
        @media (max-width: 780px) { .ab-skills { grid-template-columns: 1fr; } }
        .ab-skill { padding: 14px 0; border-bottom: 1px solid var(--rule); }
        .ab-skill__row { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-bottom: 9px; }
        .ab-skill__name { font-size: 13px; font-weight: 500; color: var(--ink); }
        .ab-skill__pct { font-family: var(--mono); font-size: 10.5px; color: var(--red); }
        .ab-skill__bar-wrap { height: 4px; background: var(--paper-2); border: 1px solid var(--rule); }
        .ab-skill__bar { height: 100%; background: var(--ink); }
        .ab-stack { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        @media (max-width: 860px) { .ab-stack { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 520px) { .ab-stack { grid-template-columns: 1fr; } }
        .ab-stack__card { background: var(--card); border: 1px solid var(--rule); padding: 16px; }
        .ab-stack__title { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--red); margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid var(--rule); }
        .ab-stack__body { font-size: 12px; color: var(--ink-2); line-height: 1.65; }

        /* Field notes + rules */
        .ab-two { display: grid; grid-template-columns: 1fr 1fr; gap: 44px; }
        @media (max-width: 860px) { .ab-two { grid-template-columns: 1fr; gap: 56px; } }
        .ab-notes { border-left: 2px solid var(--rule-dark); padding-left: 22px; display: flex; flex-direction: column; gap: 22px; }
        .ab-note { position: relative; }
        .ab-note::before { content: ''; position: absolute; left: -29px; top: 5px; width: 10px; height: 10px; background: var(--red); border: 2px solid var(--paper); }
        .ab-note__year { font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em; color: var(--red); margin-bottom: 4px; }
        .ab-note__title { font-family: var(--serif); font-weight: 800; font-size: 18px; color: var(--ink); margin-bottom: 5px; }
        .ab-note__body { font-size: 13px; line-height: 1.7; color: var(--ink-2); }
        .ab-rules { list-style: none; counter-reset: rule; display: flex; flex-direction: column; }
        .ab-rule { counter-increment: rule; display: grid; grid-template-columns: 44px 1fr; gap: 6px; padding: 16px 0; border-bottom: 1px solid var(--rule); }
        .ab-rule::before { content: counter(rule, decimal-leading-zero); font-family: var(--serif); font-weight: 800; font-size: 26px; color: var(--red); line-height: 1; }
        .ab-rule b { display: block; font-size: 14px; font-weight: 600; color: var(--ink); margin-bottom: 3px; }
        .ab-rule span { font-size: 12.5px; line-height: 1.65; color: var(--ink-2); }

        /* Footer CTA */
        .ab-cta { border-top: 3px double var(--rule-dark); padding: 44px 0 96px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; margin-top: 72px; }
        .ab-cta__title { font-family: var(--serif); font-weight: 800; font-size: clamp(26px, 3.6vw, 38px); line-height: 1.1; color: var(--ink); margin-bottom: 8px; }
        .ab-cta__sub { font-size: 14px; color: var(--ink-2); line-height: 1.7; max-width: 480px; }
        .ab-cta__actions { display: flex; flex-wrap: wrap; gap: 10px; }
      
        /* Navbar */
.ab-nav { position: sticky; top: 0; z-index: 1000; background: rgba(0,0,0,0.78); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); border-bottom: 1px solid var(--rule-dark); }
.ab-nav__inner { max-width: 1120px; margin: 0 auto; padding: 0 24px; height: 68px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }

.ab-nav__brand { display: inline-flex; align-items: center; gap: 10px; font-family: var(--serif); font-weight: 800; font-size: 22px; letter-spacing: -0.01em; color: var(--ink); text-decoration: none; }
.ab-nav__brand em { color: var(--red); font-style: normal; }
.ab-nav__tag { font-family: var(--mono); font-size: 9px; font-weight: 500; letter-spacing: 0.12em; color: var(--ink-3); border: 1px solid var(--rule-dark); padding: 2px 6px; }

.ab-nav__menu { display: flex; align-items: center; gap: 6px; }
.ab-nav__link { position: relative; font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-2); text-decoration: none; padding: 10px 14px; transition: color 0.15s; }
.ab-nav__link::after { content: ''; position: absolute; left: 14px; right: 14px; bottom: 4px; height: 2px; background: var(--red); transform: scaleX(0); transform-origin: left; transition: transform 0.2s ease; }
.ab-nav__link:hover, .ab-nav__link--active { color: var(--ink); }
.ab-nav__link:hover::after, .ab-nav__link--active::after { transform: scaleX(1); }
.ab-nav__cta { margin-left: 10px; }

.ab-nav__toggle { display: none; }
.ab-nav__burger { display: none; width: 40px; height: 40px; border: 1px solid var(--rule-dark); cursor: pointer; flex-direction: column; align-items: center; justify-content: center; gap: 5px; }
.ab-nav__burger span { display: block; width: 18px; height: 2px; background: var(--ink); transition: transform 0.2s, opacity 0.2s; }
.ab-nav__toggle:checked + .ab-nav__burger span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.ab-nav__toggle:checked + .ab-nav__burger span:nth-child(2) { opacity: 0; }
.ab-nav__toggle:checked + .ab-nav__burger span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 780px) {
  .ab-nav__inner { height: 60px; }
  .ab-nav__burger { display: flex; }
  .ab-nav__menu { display: none; position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; align-items: stretch; gap: 0; padding: 12px 24px 20px; background: #000; border-bottom: 1px solid var(--rule-dark); }
  .ab-nav__toggle:checked ~ .ab-nav__menu { display: flex; }
  .ab-nav__link { padding: 14px 0; border-bottom: 1px solid var(--rule); }
  .ab-nav__link::after { display: none; }
  .ab-nav__link--active { color: var(--red); }
  .ab-nav__cta { margin: 16px 0 0; justify-content: center; }
}
      `}</style>
            <header className="ab-nav">
                <div className="ab-nav__inner">
                    <a href="/" className="ab-nav__brand">
                        brown<em>.</em>dev
                    </a>

                    <input type="checkbox" id="ab-nav-toggle" className="ab-nav__toggle" aria-label="Toggle menu" />
                    <label htmlFor="ab-nav-toggle" className="ab-nav__burger" aria-hidden="true">
                        <span /><span /><span />
                    </label>

                    <nav className="ab-nav__menu" aria-label="Main">
                        <a href="/bc_dev" className="ab-nav__link ab-nav__link--active">About</a>
                        <a href="/portfolio" className="ab-nav__link">Portfolio</a>
                        <a href="/blog" className="ab-nav__link">Blog</a>
                        {/* <a href="/cv" className="ab-nav__link">Resume</a> */}
                        <a href="/bc/contact" className="ab-btn ab-btn--solid ab-nav__cta">
                            Start a project <ArrowRight size={12} />
                        </a>
                    </nav>
                </div>
            </header>
            <div className="ab-page">

                <main>
                    {/* Ticker */}
                    {tickerItems.length > 0 && (
                        <div className="ab-ticker">
                            <div className="ab-ticker__label">
                                <span className="ab-ticker__dot" /> Latest
                            </div>
                            <div className="ab-ticker__viewport">
                                <div className="ab-ticker__track">
                                    {[...tickerItems, ...tickerItems].map((a, i) => (
                                        <a key={`${a.slug}-${i}`} href={`/blog/${a.slug}`} className="ab-ticker__item">
                                            {a.title}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Cover + masthead */}
                    <div className="ab-cover-wrap">
                        <div className="ab-cover">
                            <img src="/banner.png" alt="Sir Brown AD cover" className="ab-cover__img" />
                            <div className="ab-cover__fade" />
                            <span className="ab-cover__tag">Engineer and publisher</span>
                        </div>

                        <div className="ab-mast">
                            <img src="/sirb.png" alt="Sir Brown AD" className="ab-mast__avatar" />
                            <div className="ab-mast__id">
                                <h1 className="ab-mast__name">Sir Brown AD</h1>
                                <div className="ab-mast__role">
                                    <span>Full Stack Engineer</span>
                                    <span><MapPin size={12} /> Abuja, Nigeria</span>
                                    <span><Globe size={12} /> Remote</span>
                                </div>
                            </div>
                            <div className="ab-mast__actions">
                                <a href="/bc/contact" className="ab-btn ab-btn--solid">
                                    Start a project <ArrowRight size={12} />
                                </a>
                                <a href="https://cal.com/sir-brown" className="ab-btn">
                                    Book a call <ArrowRight size={12} />
                                </a>
                                {/* <a href="/cv" className="ab-btn">
                                    <Download size={12} /> Resume
                                </a> */}
                                <Link href="/bc_dev" className="ab-btn">
                                    Full profile <ArrowRight size={12} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Lead story */}
                    <section className="ab-wrap">
                        <div className="ab-lead">
                            <div>
                                <div className="ab-kicker">The profile</div>
                                <h2 className="ab-lead__title">
                                    I engineer the systems, then I <em>tell the story</em>.
                                </h2>
                                <p className="ab-lead__dek">
                                    Full stack engineer and publisher in Abuja. I build secure web platforms for Nigeria and
                                    Africa, and I write about the problems they solve.
                                </p>
                                <div className="ab-lead__body">
                                    <p>
                                        I&apos;m <strong>Sir Brown AD</strong>. I trained in React.js and Next.js at EarlyCode
                                        Institute, then kept building: Vue and Nuxt for server-rendered apps, Node.js for the backend, and
                                        Firebase for auth and data. I work independently on several platforms at once and own them end
                                        to end, from the interface to the database rules to the payment flow.
                                    </p>
                                    <p>
                                        The other half of my work is publishing. On <strong>browncode.name.ng</strong> I write about
                                        web security, fraud awareness and what I learn shipping real products. It is the same
                                        discipline as engineering: find the failure, explain it clearly, and make sure the next
                                        person does not repeat it.
                                    </p>
                                </div>
                            </div>

                            <aside className="ab-sheet">
                                <div className="ab-sheet__head">
                                    <span>Datasheet</span>
                                    <span>SBA-01</span>
                                </div>
                                {datasheet.map(([k, v]) => (
                                    <div key={k} className="ab-sheet__row">
                                        <div className="ab-sheet__k">{k}</div>
                                        <div className="ab-sheet__v">{v}</div>
                                    </div>
                                ))}
                            </aside>
                        </div>

                        <div className="ab-stats">
                            {stats.map((s) => (
                                <div key={s.label} className="ab-stat">
                                    <div className="ab-stat__num">{s.num}</div>
                                    <div className="ab-stat__label">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Systems */}
                    <section className="ab-wrap ab-section">
                        <div className="ab-head">
                            <div>
                                <div className="ab-kicker">Engineering</div>
                                <h2 className="ab-h2">Systems I&apos;ve built</h2>
                            </div>
                            <span className="ab-head__note">{systems.length} projects</span>
                        </div>
                        <div className="ab-systems">
                            {systems.map((p) => {
                                const inner = (
                                    <>
                                        <div className="ab-sys__top">
                                            <span className="ab-sys__tag">{p.icon} {p.tag}</span>
                                            <span className={`ab-sys__status${p.status !== "Live" ? " ab-sys__status--dev" : ""}`}>
                                                {p.status}
                                            </span>
                                        </div>
                                        <h3 className="ab-sys__title">
                                            {p.title} {p.href && <ExternalLink size={15} />}
                                        </h3>
                                        <div className="ab-sys__row"><b>Problem</b>{p.problem}</div>
                                        <div className="ab-sys__row"><b>Build</b>{p.build}</div>
                                        <div className="ab-sys__stack">
                                            {p.stack.map((s) => (
                                                <span key={s} className="ab-chip">{s}</span>
                                            ))}
                                        </div>
                                    </>
                                );
                                return p.href ? (
                                    <a key={p.title} href={p.href} className="ab-sys">{inner}</a>
                                ) : (
                                    <div key={p.title} className="ab-sys">{inner}</div>
                                );
                            })}
                        </div>
                        <p className="ab-more">
                            <a href="/bc/projects" className="ab-more__link">Explore more of my work →</a>
                        </p>
                    </section>

                    {/* The desk */}
                    <section className="ab-wrap ab-section">
                        <div className="ab-head">
                            <div>
                                <div className="ab-kicker">The desk</div>
                                <h2 className="ab-h2">What I publish</h2>
                            </div>
                            <span className="ab-head__note">browncode.name.ng</span>
                        </div>

                        <div className="ab-beats">
                            {beats.map((b) => (
                                <div key={b.title} className="ab-beat">
                                    <div className="ab-beat__icon">{b.icon}</div>
                                    <div className="ab-beat__title">{b.title}</div>
                                    <p className="ab-beat__body">{b.body}</p>
                                </div>
                            ))}
                        </div>

                        {latestArticles.length === 0 ? (
                            <div className="ab-articles__empty">NO_ARTICLES_PUBLISHED_YET</div>
                        ) : (
                            <div className="ab-articles">
                                {latestArticles.map((article) => (
                                    <a key={article.slug} href={`/blog/${article.slug}`} className="ab-art">
                                        <div className="ab-art__media">
                                            {article.image ? (
                                                <img src={article.image} alt={article.title} className="ab-art__img" />
                                            ) : (
                                                <div className="ab-art__ph" />
                                            )}
                                            <span className="ab-art__tag">
                                                {CATEGORY_LABELS[getCategoryKey(article)]}
                                            </span>
                                        </div>
                                        <div className="ab-art__body">
                                            <h3 className="ab-art__title">{article.title}</h3>
                                            <p className="ab-art__preview">{article.preview}</p>
                                            <div className="ab-art__meta">
                                                <span>{getReadingTime(article.content)} min read</span>
                                                <span className="ab-art__dot" />
                                                <span>{formatDate(article.datePublished)}</span>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}

                        <div className="ab-articles__cta">
                            <Link href="/blog" className="ab-btn">
                                Read all articles <ArrowRight size={12} />
                            </Link>
                        </div>
                    </section>

                    {/* Advertise */}
                    <section className="ab-wrap ab-section">
                        <div className="ab-ad">
                            <div>
                                <div className="ab-ad__kicker"><Megaphone size={13} /> Advertise with the desk</div>
                                <h2 className="ab-ad__title">Put your brand in front of an engaged, security-minded audience.</h2>
                                <p className="ab-ad__sub">
                                    browncode.name.ng is an SEO-driven publication read by developers and everyday Nigerians
                                    interested in security and fraud awareness. Reach them with a clearly labelled sponsored
                                    article or an ad placement.
                                </p>
                                <div className="ab-ad__actions">
                                    <a href="/bc/contact" className="ab-btn ab-btn--solid">
                                        <Mail size={12} /> Request details
                                    </a>
                                    <Link href="/blog" className="ab-btn">
                                        See the publication <ArrowRight size={12} />
                                    </Link>
                                </div>
                            </div>
                            <div className="ab-ad__list">
                                <div className="ab-ad__item">
                                    <FileText size={16} />
                                    <div>
                                        <b>Sponsored articles</b>
                                        <span>A researched, clearly labelled article about your product or service, optimised for search.</span>
                                    </div>
                                </div>
                                <div className="ab-ad__item">
                                    <Megaphone size={16} />
                                    <div>
                                        <b>Ad placements</b>
                                        <span>Placements across the blog where relevant readers are already looking.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Skills */}
                    <section className="ab-wrap ab-section">
                        <div className="ab-head">
                            <div>
                                <div className="ab-kicker">Capabilities</div>
                                <h2 className="ab-h2">Skills and stack</h2>
                            </div>
                        </div>
                        <div className="ab-skills">
                            {skills.map((s) => (
                                <div key={s.name} className="ab-skill">
                                    <div className="ab-skill__row">
                                        <div className="ab-skill__name">{s.name}</div>
                                        <div className="ab-skill__pct">{s.level}%</div>
                                    </div>
                                    <div className="ab-skill__bar-wrap">
                                        <div className="ab-skill__bar" style={{ width: `${s.level}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="ab-stack">
                            {stackCards.map((c) => (
                                <div key={c.title} className="ab-stack__card">
                                    <div className="ab-stack__title">{c.title}</div>
                                    <div className="ab-stack__body">{c.body}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Field notes + rules */}
                    <section className="ab-wrap ab-section">
                        <div className="ab-two">
                            <div>
                                <div className="ab-head">
                                    <div>
                                        <div className="ab-kicker">Field notes</div>
                                        <h2 className="ab-h2">The timeline</h2>
                                    </div>
                                </div>
                                <div className="ab-notes">
                                    {fieldNotes.map((n) => (
                                        <div key={n.title} className="ab-note">
                                            <div className="ab-note__year">{n.year}</div>
                                            <div className="ab-note__title">{n.title}</div>
                                            <p className="ab-note__body">{n.body}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="ab-head">
                                    <div>
                                        <div className="ab-kicker">Rulebook</div>
                                        <h2 className="ab-h2">How I engineer</h2>
                                    </div>
                                </div>
                                <ol className="ab-rules">
                                    {rules.map(([title, body]) => (
                                        <li key={title} className="ab-rule">
                                            <div>
                                                <b>{title}</b>
                                                <span>{body}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </section>

                    {/* Footer CTA */}
                    <section className="ab-wrap">
                        <div className="ab-cta">
                            <div>
                                <div className="ab-cta__title">Have a platform to build or a story to run?</div>
                                <p className="ab-cta__sub">
                                    I take on full stack builds, payment integrations, security reviews and sponsored content.
                                    Tell me what you need and I&apos;ll reply with a plan.
                                </p>
                            </div>
                            <div className="ab-cta__actions">
                                <a href="/bc/contact" className="ab-btn ab-btn--solid">
                                    <Mail size={12} /> Contact me
                                </a>
                                <a
                                    href="https://github.com/Brown-Oziomachi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ab-btn"
                                >
                                    <Github size={12} /> GitHub
                                </a>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}