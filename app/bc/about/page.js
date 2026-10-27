import Link from "next/link";
import {
    ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Calendar, MapPin, Check,
} from "lucide-react";
import { articles } from "@/app/data/article";
import { CATEGORY_LABELS, getCategoryKey } from "@/lib/blogCategories";
import Footer from "@/components/footer";

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

/* ── helpers ─────────────────────────────────────────── */

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

/* ── data ────────────────────────────────────────────── */

const WHATSAPP = "2348142995114";
const CHANNEL_URL = "https://whatsapp.com/channel/0029VbEGWFsC1FuAo5qoPh0q";

const facts = [
    ["Based in", "Abuja, Nigeria (remote)"],
    ["Builds with", "Next.js, Nuxt, Node.js, Firebase"],
    ["Publishes", "browncode.name.ng"],
    ["Status", "Open to projects"],
];

const cases = [
    {
        n: "01",
        tag: "Fraud awareness",
        title: "Fraud Radar NG",
        problem: "Scams spread faster than warnings, and most Nigerians have no single place to check or report one.",
        build: "A multi-step report wizard, threat registry lookup, domain safety quiz, verified agency contacts, rate limiting and a protected admin console.",
        stack: ["Nuxt 4", "Firebase", "Nitro", "Vercel"],
        href: "https://fraudradarng.vercel.app",
    },
    {
        n: "02",
        tag: "Marketplace",
        title: "LAN Library",
        problem: "African students and academics need an affordable place to find, sell and request documents.",
        build: "Seller wallets and withdrawals, Flutterwave payments, a bounty board, boosted listings and an admin panel. Financial writes run on secured server routes.",
        stack: ["Next.js", "Firebase", "Flutterwave", "Node.js"],
        href: "https://learningaccessnetwork.vercel.app",
    },
];

const clientWork = [
    { name: "YotaPoint", url: "https://yotapoint.com" },
    { name: "TheCyclopedia News", url: "https://www.thecyclopedia.com.ng" },
    { name: "IJ Stitches", url: "https://ij-stitches.vercel.app/main" },
];

const beats = [
    ["Fraud and scam awareness", "How scams work, how to spot them and where to report them in Nigeria, written so anyone can act on it."],
    ["Web security", "Practical notes on securing real apps: access rules, server-side writes, payments and the mistakes that cause breaches."],
    ["Building in public", "What broke in production, how I traced it and what I changed."],
];

const stack = [
    ["Frontend", ["Vue 3", "Nuxt", "React", "Next.js", "Tailwind"]],
    ["Backend", ["Node.js", "Nitro", "API routes", "Vercel Functions", "Webhooks"]],
    ["Data and security", ["Firestore", "Firebase Auth", "Security rules", "Rate limiting"]],
    ["Growth", ["Dynamic sitemaps", "IndexNow", "Structured data", "Newsletters"]],
];

const rules = [
    ["Never trust the browser.", "Money and user data are written by the server, and database rules deny by default."],
    ["Debug with evidence.", "Production problems are solved from logs and real requests, not guesses."],
    ["Keep it predictable.", "Small components, shared design tokens and clear boundaries keep a project easy to return to."],
    ["Write for the reader.", "If a person cannot act on what I publish, the engineering is only half done."],
];

const path = [
    ["2024 to 2025", "Training and first builds", "Studied React.js and Next.js at EarlyCode Institute and moved from tutorials to real projects."],
    ["2025", "Marketplace and payments", "Built LAN Library with wallets, Flutterwave payments and an admin panel, and moved all financial writes off the client."],
    ["2026", "Platforms for Nigerians", "Launched Fraud Radar NG in Nuxt 4 and grew browncode.name.ng into a publishing platform."],
];

/* ── page ────────────────────────────────────────────── */

export default function AboutMePage() {
    const sorted = articles
        .slice()
        .sort((a, b) => (b.datePublished || "").localeCompare(a.datePublished || ""));
    const latest = sorted.slice(0, 4);

    const stats = [
        { num: "5", label: "Platforms built" },
        { num: `${articles.length}`, label: "Articles published" },
        { num: "2", label: "Frameworks in production" },
        { num: "24h", label: "Typical reply time" },
    ];

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

                .ab-page {
                    --paper: #ffffff; --paper-2: #f6f5f0; --card: #ffffff;
                    --ink: #111111; --ink-2: #3f3f3f; --ink-3: #6f6f6f;
                    --rule: #e4e2da; --rule-dark: #111111;
                    --accent: #e8ff47; --on-accent: #0a0a0b; --green: #15803d;
                    --serif: 'Playfair Display', Georgia, serif;
                    --sans: 'Inter', system-ui, sans-serif;
                    --mono: 'JetBrains Mono', 'Fira Code', monospace;
                    background: var(--paper); color: var(--ink); font-family: var(--sans); min-height: 100vh;
                }
                .ab-page *, .ab-page *::before, .ab-page *::after { box-sizing: border-box; }
                .ab-page h1, .ab-page h2, .ab-page h3, .ab-page h4, .ab-page p, .ab-page ul, .ab-page ol { margin: 0; padding: 0; }
                :where(.ab-page a) { color: inherit; text-decoration: none; }
                .ab-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
                .ab-section { padding-top: 96px; }

                /* Nav */
                .ab-nav { position: sticky; top: 0; z-index: 1000; background: rgba(255,255,255,0.92); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); border-bottom: 1px solid var(--rule); }
                .ab-nav__inner { max-width: 1120px; margin: 0 auto; padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
                .ab-nav__brand { font-family: var(--serif); font-weight: 800; font-size: 21px; letter-spacing: -0.01em; }
                .ab-nav__brand em { font-style: normal; background: var(--accent); padding: 0 3px; }
                .ab-nav__links { display: flex; align-items: center; gap: 4px; }
                .ab-nav__link { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3); padding: 8px 12px; transition: color 0.15s; }
                .ab-nav__link:hover, .ab-nav__link--on { color: var(--ink); }
                .ab-nav__link--on { box-shadow: inset 0 -3px 0 var(--accent); }
                @media (max-width: 700px) { .ab-nav__hide { display: none; } }

                /* Buttons */
                .ab-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-family: var(--mono); font-size: 11.5px; letter-spacing: 0.06em; padding: 13px 20px; border: 1.5px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; transition: background 0.15s, color 0.15s, transform 0.15s; }
                .ab-btn:hover { background: var(--ink); color: #fff; transform: translateY(-1px); }
                .ab-btn--solid { background: var(--accent); color: var(--on-accent); font-weight: 600; }
                .ab-btn--solid:hover { background: var(--ink); color: var(--accent); }
                .ab-btn--sm { padding: 9px 14px; }

                /* Section heads */
                .ab-kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 10px; }
                .ab-kicker b { background: var(--accent); color: var(--on-accent); padding: 2px 7px; font-weight: 500; }
                .ab-h2 { font-family: var(--serif); font-weight: 800; font-size: clamp(28px, 4vw, 40px); line-height: 1.1; letter-spacing: -0.01em; }
                .ab-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding-top: 12px; border-top: 3px solid var(--rule-dark); margin-bottom: 32px; }
                .ab-head__note { font-size: 14px; line-height: 1.6; color: var(--ink-2); max-width: 380px; }

                /* Hero */
                .ab-hero { padding-top: 64px; }
                .ab-hero__grid { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.6fr); gap: 56px; align-items: center; }
                @media (max-width: 880px) { .ab-hero__grid { grid-template-columns: minmax(0, 1fr); gap: 40px; } .ab-hero { padding-top: 40px; } }
                .ab-hero__name { font-family: var(--serif); font-weight: 800; font-size: clamp(48px, 9.5vw, 112px); line-height: 0.95; letter-spacing: -0.03em; }
                .ab-hero__name span { background: linear-gradient(transparent 64%, var(--accent) 64%); }
                .ab-hero__role { margin-top: 20px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 16px; font-family: var(--mono); font-size: 12px; letter-spacing: 0.06em; color: var(--ink-3); }
                .ab-hero__role span { display: inline-flex; align-items: center; gap: 6px; }
                .ab-hero__dek { margin-top: 24px; max-width: 580px; font-size: clamp(16px, 1.7vw, 19px); line-height: 1.7; font-weight: 300; color: var(--ink-2); }
                .ab-hero__dek strong { font-weight: 600; color: var(--ink); }
                .ab-hero__actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }

                .ab-portrait { position: relative; max-width: 340px; margin-left: auto; padding: 0 0 22px 22px; }
                @media (max-width: 880px) { .ab-portrait { margin: 0; } }
                .ab-portrait::before { content: ''; position: absolute; left: 0; bottom: 0; right: 22px; top: 22px; background: var(--accent); border: 1.5px solid var(--ink); }
                .ab-portrait__img { position: relative; aspect-ratio: 4 / 5; border: 1.5px solid var(--ink); background: var(--paper-2); overflow: hidden; }
                .ab-portrait__img img { width: 100%; height: 100%; object-fit: cover; display: block; }

                .ab-facts { display: grid; grid-template-columns: repeat(4, 1fr); margin-top: 64px; border-top: 3px solid var(--rule-dark); border-bottom: 1px solid var(--rule); }
                @media (max-width: 800px) { .ab-facts { grid-template-columns: 1fr 1fr; } }
                .ab-fact { padding: 18px 20px 18px 0; }
                .ab-fact + .ab-fact { padding-left: 20px; border-left: 1px solid var(--rule); }
                @media (max-width: 800px) { .ab-fact:nth-child(3) { padding-left: 0; border-left: none; } .ab-fact:nth-child(n+3) { border-top: 1px solid var(--rule); } }
                .ab-fact__k { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 6px; }
                .ab-fact__v { font-size: 14.5px; font-weight: 500; line-height: 1.4; }

                /* Story */
                .ab-story { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: 56px; align-items: start; }
                @media (max-width: 860px) { .ab-story { grid-template-columns: minmax(0, 1fr); gap: 24px; } }
                .ab-story__title { font-family: var(--serif); font-weight: 800; font-size: clamp(30px, 4.4vw, 46px); line-height: 1.08; letter-spacing: -0.015em; }
                .ab-story__title em { font-style: italic; background: linear-gradient(transparent 62%, var(--accent) 62%); }
                .ab-story__text p { font-size: 16px; line-height: 1.85; color: var(--ink-2); }
                .ab-story__text p + p { margin-top: 18px; }
                .ab-story__text strong { color: var(--ink); font-weight: 600; }

                .ab-stats { display: grid; grid-template-columns: repeat(4, 1fr); margin-top: 48px; background: var(--ink); color: #f4f1ea; }
                @media (max-width: 700px) { .ab-stats { grid-template-columns: 1fr 1fr; } }
                .ab-stat { padding: 26px 22px; border-right: 1px solid #333; }
                .ab-stat:last-child { border-right: none; }
                @media (max-width: 700px) { .ab-stat:nth-child(2) { border-right: none; } .ab-stat:nth-child(-n+2) { border-bottom: 1px solid #333; } }
                .ab-stat__num { font-family: var(--serif); font-weight: 800; font-size: 44px; line-height: 1; color: var(--accent); }
                .ab-stat__label { margin-top: 8px; font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.12em; text-transform: uppercase; color: #bdb8ae; }

                /* Case rows */
                .ab-cases { border-top: 1px solid var(--rule-dark); }
                .ab-case { display: grid; grid-template-columns: 64px minmax(0, 1fr) minmax(0, 1fr) 150px; gap: 28px; padding: 32px 0; border-bottom: 1px solid var(--rule-dark); align-items: start; transition: background 0.15s; }
                .ab-case:hover { background: var(--paper-2); }
                @media (max-width: 960px) { .ab-case { grid-template-columns: 48px minmax(0, 1fr); } .ab-case__col, .ab-case__side { grid-column: 2; } }
                .ab-case__n { font-family: var(--serif); font-weight: 800; font-size: 40px; line-height: 1; background: linear-gradient(transparent 60%, var(--accent) 60%); width: fit-content; }
                .ab-case__tag { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 8px; }
                .ab-case__title { font-family: var(--serif); font-weight: 800; font-size: 30px; line-height: 1.1; }
                .ab-case__label { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 4px; }
                .ab-case__text { font-size: 14px; line-height: 1.7; color: var(--ink-2); }
                .ab-case__text + .ab-case__label { margin-top: 14px; }
                .ab-case__side { display: flex; flex-direction: column; gap: 14px; align-items: flex-start; }
                .ab-chips { display: flex; flex-wrap: wrap; gap: 6px; }
                .ab-chip { font-family: var(--mono); font-size: 10.5px; color: var(--ink-2); border: 1px solid var(--rule-dark); padding: 3px 9px; background: #fff; }
                .ab-clients { margin-top: 24px; display: flex; flex-wrap: wrap; align-items: center; gap: 10px 22px; }
                .ab-clients__label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); }
                .ab-clients a { font-family: var(--serif); font-weight: 800; font-size: 17px; display: inline-flex; align-items: center; gap: 4px; border-bottom: 2px solid var(--accent); }
                .ab-clients a:hover { background: var(--accent); }

                /* Writing */
                .ab-beats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-bottom: 40px; }
                @media (max-width: 800px) { .ab-beats { grid-template-columns: 1fr; gap: 20px; } }
                .ab-beat { border-top: 3px solid var(--accent); padding-top: 14px; }
                .ab-beat h3 { font-family: var(--serif); font-weight: 800; font-size: 20px; line-height: 1.2; margin-bottom: 8px; }
                .ab-beat p { font-size: 14px; line-height: 1.7; color: var(--ink-2); }

                .ab-posts { border-top: 1px solid var(--rule-dark); }
                .ab-post { display: grid; grid-template-columns: 132px minmax(0, 1fr) auto; gap: 22px; align-items: center; padding: 18px 0; border-bottom: 1px solid var(--rule); transition: background 0.15s; }
                .ab-post:hover { background: var(--paper-2); }
                @media (max-width: 640px) { .ab-post { grid-template-columns: 96px minmax(0, 1fr); gap: 14px; } .ab-post__go { display: none; } }
                .ab-post__media { height: 84px; background: var(--paper-2); border: 1px solid var(--rule); overflow: hidden; }
                @media (max-width: 640px) { .ab-post__media { height: 70px; } }
                .ab-post__media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s; }
                .ab-post:hover .ab-post__media img { transform: scale(1.05); }
                .ab-post__ph { width: 100%; height: 100%; background: repeating-linear-gradient(45deg, #ebe8e0, #ebe8e0 6px, #e3e0d7 6px, #e3e0d7 12px); }
                .ab-post__cat { font-family: var(--mono); font-size: 9.5px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; background: var(--accent); padding: 2px 7px; display: inline-block; margin-bottom: 7px; }
                .ab-post__title { font-family: var(--serif); font-weight: 800; font-size: 19px; line-height: 1.25; }
                .ab-post:hover .ab-post__title { text-decoration: underline; text-underline-offset: 3px; }
                .ab-post__meta { margin-top: 6px; font-family: var(--mono); font-size: 10.5px; color: var(--ink-3); }
                .ab-post__go { color: var(--ink); }
                .ab-more { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }

                /* Stack + rules */
                .ab-stack { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
                @media (max-width: 900px) { .ab-stack { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 520px) { .ab-stack { grid-template-columns: 1fr; } }
                .ab-stack__group { background: var(--paper-2); border: 1px solid var(--rule); padding: 20px; }
                .ab-stack__group h3 { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 14px; }
                .ab-stack__group h3 b { background: var(--accent); padding: 2px 7px; font-weight: 500; }

                .ab-rules { display: grid; grid-template-columns: 1fr 1fr; gap: 0 48px; margin-top: 48px; counter-reset: rule; list-style: none; }
                @media (max-width: 760px) { .ab-rules { grid-template-columns: 1fr; } }
                .ab-rule { counter-increment: rule; display: grid; grid-template-columns: 52px 1fr; gap: 6px; padding: 20px 0; border-top: 1px solid var(--rule); }
                .ab-rule::before { content: counter(rule, decimal-leading-zero); font-family: var(--serif); font-weight: 800; font-size: 28px; line-height: 1; background: linear-gradient(transparent 60%, var(--accent) 60%); width: fit-content; height: fit-content; }
                .ab-rule b { display: block; font-size: 15px; font-weight: 600; margin-bottom: 4px; }
                .ab-rule span { font-size: 13.5px; line-height: 1.65; color: var(--ink-2); }

                /* Path */
                .ab-path { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
                @media (max-width: 800px) { .ab-path { grid-template-columns: 1fr; } }
                .ab-path__item { border-top: 3px solid var(--ink); padding-top: 14px; }
                .ab-path__year { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; background: var(--accent); display: inline-block; padding: 2px 8px; margin-bottom: 12px; }
                .ab-path__title { font-family: var(--serif); font-weight: 800; font-size: 20px; line-height: 1.2; margin-bottom: 6px; }
                .ab-path__body { font-size: 13.5px; line-height: 1.7; color: var(--ink-2); }

                /* CTA */
                .ab-cta { margin-top: 104px; background: var(--ink); color: #f4f1ea; border-top: 5px solid var(--accent); padding: 56px 48px; display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); gap: 40px; align-items: center; }
                @media (max-width: 800px) { .ab-cta { grid-template-columns: minmax(0, 1fr); padding: 36px 22px; gap: 28px; } }
                .ab-cta__kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); margin-bottom: 10px; }
                .ab-cta__title { font-family: var(--serif); font-weight: 800; font-size: clamp(28px, 4vw, 44px); line-height: 1.08; }
                .ab-cta__sub { margin-top: 14px; font-size: 15px; line-height: 1.75; color: #bdb8ae; max-width: 460px; }
                .ab-cta__points { margin-top: 18px; display: flex; flex-direction: column; gap: 8px; font-family: var(--mono); font-size: 11.5px; color: #d9d6cc; }
                .ab-cta__points span { display: flex; align-items: center; gap: 9px; }
                .ab-cta__points svg { color: var(--accent); }
                .ab-cta__actions { display: flex; flex-direction: column; gap: 12px; }
                .ab-cta .ab-btn { border-color: #f4f1ea; color: #f4f1ea; width: 100%; padding: 16px 20px; }
                .ab-cta .ab-btn:hover { background: #f4f1ea; color: var(--ink); }
                .ab-cta .ab-btn--solid { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
                .ab-cta .ab-btn--solid:hover { background: #fff; border-color: #fff; color: var(--ink); }
                .ab-cta__socials { display: flex; gap: 8px; }
                .ab-cta__socials a { width: 44px; height: 44px; border: 1px solid #555; display: flex; align-items: center; justify-content: center; color: #f4f1ea; transition: background 0.15s, color 0.15s; }
                .ab-cta__socials a:hover { background: var(--accent); color: var(--on-accent); border-color: var(--accent); }

                .ab-ad { margin: 32px 0 0; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding: 22px 24px; border: 1px solid var(--rule-dark); background: var(--paper-2); }
                .ab-ad p { font-size: 14.5px; line-height: 1.6; color: var(--ink-2); max-width: 560px; }
                .ab-ad p b { color: var(--ink); font-weight: 600; }
                .ab-end { height: 72px; }

                @media (max-width: 640px) {
                    .ab-wrap, .ab-nav__inner { padding-left: 18px; padding-right: 18px; }
                    .ab-section { padding-top: 72px; }
                    .ab-hero__actions .ab-btn { flex: 1 1 100%; }
                }

                .ab-page :focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
                @media (prefers-reduced-motion: reduce) { .ab-page * { transition: none !important; } }
            `}</style>

            <div className="ab-page">
                <header className="ab-nav">
                    <div className="ab-nav__inner">
                        <Link href="/" className="ab-nav__brand">Sir-AD<em>Blog</em></Link>
                        <nav className="ab-nav__links" aria-label="Main">
                            <Link href="/bc/about" className="ab-nav__link ab-nav__link--on">About</Link>
                            <Link href="/portfolio" className="ab-nav__link ab-nav__hide">Portfolio</Link>
                            <Link href="/blog" className="ab-nav__link ab-nav__hide">Blog</Link>
                            <Link href="/bc/contact" className="ab-btn ab-btn--solid ab-btn--sm">
                                Start a project <ArrowRight size={12} />
                            </Link>
                        </nav>
                    </div>
                </header>

                <main>
                    {/* ── HERO ── */}
                    <section className="ab-wrap ab-hero">
                        <div className="ab-hero__grid">
                            <div>
                                <div className="ab-kicker"><b>About</b></div>
                                <h1 className="ab-hero__name"><span>Sir Brown AD</span></h1>
                                <p className="ab-hero__role">
                                    <span>Full stack engineer and publisher</span>
                                    <span><MapPin size={13} /> Abuja, Nigeria</span>
                                </p>
                                <p className="ab-hero__dek">
                                    I build <strong>secure web platforms</strong> for Nigeria and Africa, and I write about
                                    the problems they solve: fraud, web security and what breaks when real people use real
                                    software.
                                </p>
                                <div className="ab-hero__actions">
                                    <Link href="/bc/contact" className="ab-btn ab-btn--solid">
                                        Start a project <ArrowRight size={13} />
                                    </Link>
                                    <a href="https://cal.com/sir-brown" target="_blank" rel="noopener noreferrer" className="ab-btn">
                                        <Calendar size={13} /> Book a free call
                                    </a>
                                </div>
                            </div>

                            <div className="ab-portrait">
                                <div className="ab-portrait__img">
                                    <img src="/sirb.png" alt="Sir Brown AD" />
                                </div>
                            </div>
                        </div>

                        <div className="ab-facts">
                            {facts.map(([k, v]) => (
                                <div key={k} className="ab-fact">
                                    <div className="ab-fact__k">{k}</div>
                                    <div className="ab-fact__v">{v}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── STORY ── */}
                    <section className="ab-wrap ab-section">
                        <div className="ab-story">
                            <h2 className="ab-story__title">
                                I engineer the systems, then I <em>tell the story.</em>
                            </h2>
                            <div className="ab-story__text">
                                <p>
                                    I&apos;m <strong>Sir Brown AD</strong>. I trained in React.js and Next.js at EarlyCode
                                    Institute, then kept building: Vue and Nuxt for server-rendered apps, Node.js for the
                                    backend and Firebase for auth and data. I work independently on several platforms at once
                                    and own each one end to end, from the interface to the database rules to the payment flow.
                                </p>
                                <p>
                                    The other half of my work is publishing. On <strong>browncode.name.ng</strong> I write
                                    about web security, fraud awareness and what I learn shipping real products. It is the
                                    same discipline as engineering: find the failure, explain it clearly and make sure the
                                    next person does not repeat it.
                                </p>
                            </div>
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

                    {/* ── WORK ── */}
                    <section className="ab-wrap ab-section">
                        <div className="ab-head">
                            <div>
                                <div className="ab-kicker">Engineering</div>
                                <h2 className="ab-h2">Systems I&apos;ve built</h2>
                            </div>
                            <p className="ab-head__note">Two products I run myself, and what I built to solve each problem.</p>
                        </div>

                        <div className="ab-cases">
                            {cases.map((c) => (
                                <article key={c.title} className="ab-case">
                                    <div className="ab-case__n">{c.n}</div>
                                    <div className="ab-case__col">
                                        <div className="ab-case__tag">{c.tag}</div>
                                        <h3 className="ab-case__title">{c.title}</h3>
                                    </div>
                                    <div className="ab-case__col">
                                        <div className="ab-case__label">The problem</div>
                                        <p className="ab-case__text">{c.problem}</p>
                                        <div className="ab-case__label">What I built</div>
                                        <p className="ab-case__text">{c.build}</p>
                                    </div>
                                    <div className="ab-case__side">
                                        <div className="ab-chips">
                                            {c.stack.map((s) => <span key={s} className="ab-chip">{s}</span>)}
                                        </div>
                                        <a href={c.href} target="_blank" rel="noopener noreferrer" className="ab-btn ab-btn--sm">
                                            Visit <ArrowUpRight size={12} />
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="ab-clients">
                            <span className="ab-clients__label">Also built for clients</span>
                            {clientWork.map((c) => (
                                <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer">
                                    {c.name} <ArrowUpRight size={13} />
                                </a>
                            ))}
                            <Link href="/bc/projects" className="ab-clients__label" style={{ marginLeft: "auto" }}>
                                All projects →
                            </Link>
                        </div>
                    </section>

                    {/* ── WRITING ── */}
                    <section className="ab-wrap ab-section">
                        <div className="ab-head">
                            <div>
                                <div className="ab-kicker">The desk</div>
                                <h2 className="ab-h2">What I publish</h2>
                            </div>
                            <p className="ab-head__note">Free to read on browncode.name.ng.</p>
                        </div>

                        <div className="ab-beats">
                            {beats.map(([title, body]) => (
                                <div key={title} className="ab-beat">
                                    <h3>{title}</h3>
                                    <p>{body}</p>
                                </div>
                            ))}
                        </div>

                        {latest.length > 0 && (
                            <div className="ab-posts">
                                {latest.map((a) => (
                                    <Link key={a.slug} href={`/blog/${a.slug}`} className="ab-post">
                                        <div className="ab-post__media">
                                            {a.image ? <img src={a.image} alt={a.title} loading="lazy" /> : <div className="ab-post__ph" />}
                                        </div>
                                        <div>
                                            <span className="ab-post__cat">{CATEGORY_LABELS[getCategoryKey(a)]}</span>
                                            <h3 className="ab-post__title">{a.title}</h3>
                                            <p className="ab-post__meta">
                                                {getReadingTime(a.content)} min read
                                                {formatDate(a.datePublished) ? ` · ${formatDate(a.datePublished)}` : ""}
                                            </p>
                                        </div>
                                        <ArrowUpRight size={18} className="ab-post__go" />
                                    </Link>
                                ))}
                            </div>
                        )}

                        <div className="ab-more">
                            <Link href="/blog" className="ab-btn">Read all articles <ArrowRight size={13} /></Link>
                            <Link href="/gallery" className="ab-btn">Why I teach fraud awareness <ArrowRight size={13} /></Link>
                            <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="ab-btn ab-btn--solid">
                                Join my WhatsApp channel
                            </a>
                        </div>
                    </section>

                    {/* ── HOW I WORK ── */}
                    <section className="ab-wrap ab-section">
                        <div className="ab-head">
                            <div>
                                <div className="ab-kicker">Method</div>
                                <h2 className="ab-h2">Tools and principles</h2>
                            </div>
                        </div>
                        <div className="ab-stack">
                            {stack.map(([title, items]) => (
                                <div key={title} className="ab-stack__group">
                                    <h3><b>{title}</b></h3>
                                    <div className="ab-chips">
                                        {items.map((i) => <span key={i} className="ab-chip">{i}</span>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ol className="ab-rules">
                            {rules.map(([title, body]) => (
                                <li key={title} className="ab-rule">
                                    <div><b>{title}</b><span>{body}</span></div>
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* ── PATH ── */}
                    <section className="ab-wrap ab-section">
                        <div className="ab-head">
                            <div>
                                <div className="ab-kicker">Timeline</div>
                                <h2 className="ab-h2">How I got here</h2>
                            </div>
                        </div>
                        <div className="ab-path">
                            {path.map(([year, title, body]) => (
                                <div key={title} className="ab-path__item">
                                    <span className="ab-path__year">{year}</span>
                                    <h3 className="ab-path__title">{title}</h3>
                                    <p className="ab-path__body">{body}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── CTA ── */}
                    <section className="ab-wrap">
                        <div className="ab-cta">
                            <div>
                                <p className="ab-cta__kicker">Work with me</p>
                                <h2 className="ab-cta__title">Have a platform to build or a story to run?</h2>
                                <p className="ab-cta__sub">
                                    I take on full stack builds, payment integrations, security reviews and sponsored content.
                                    Tell me what you need and I&apos;ll reply with a plan.
                                </p>
                                <div className="ab-cta__points">
                                    <span><Check size={14} /> Free quote, no pressure</span>
                                    <span><Check size={14} /> Reply within 24 hours</span>
                                    <span><Check size={14} /> You work with the developer directly</span>
                                </div>
                            </div>
                            <div className="ab-cta__actions">
                                <Link href="/bc/contact" className="ab-btn ab-btn--solid">
                                    <Mail size={14} /> Start a project
                                </Link>
                                <a
                                    href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Sir Brown, I saw your About page and I'd like to talk about a project.")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ab-btn"
                                >
                                    Chat on WhatsApp
                                </a>
                                <div className="ab-cta__socials">
                                    <a href="https://github.com/Brown-Oziomachi" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={17} /></a>
                                    <a href="https://www.linkedin.com/in/brownoziomachi72a5a3229" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
                                    <a href="mailto:browncemmanuel@gmail.com" aria-label="Email"><Mail size={17} /></a>
                                </div>
                            </div>
                        </div>

                        <div className="ab-ad">
                            <p>
                                <b>Want your brand in front of my readers?</b> I publish clearly labelled sponsored
                                articles with fixed prices.
                            </p>
                            <Link href="/advertise" className="ab-btn">
                                See advertising packages <ArrowRight size={13} />
                            </Link>
                        </div>
                        <div className="ab-end" />
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}