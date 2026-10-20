"use client";

import Link from "next/link";
import {
    ArrowLeft, ArrowRight, ArrowUpRight, Search, FileText, Clock, RefreshCw,
    Check, Mail, MessageCircle,
} from "lucide-react";
import Footer from "@/components/footer";

/* ── data ────────────────────────────────────────────── */

const WHATSAPP = "2348142995114";
const EMAIL = "browncemmanuel@gmail.com";

const adPackages = [
    {
        id: "one-month",
        name: "1 Month",
        days: 30,
        price: "₦25,000",
        period: "/ month",
        tag: "Short campaign",
        flutterwaveLink: "https://flutterwave.com/pay/lgngcngvwpx3",
        features: [
            "1 sponsored article written for your brand",
            "Published and indexed on Google, Bing and Yandex",
            "Live for 30 days, then removed",
            "Link to your website or landing page",
            "Keyword-optimized for search visibility",
        ],
    },
    {
        id: "three-months",
        name: "3 Months",
        days: 90,
        price: "₦60,000",
        period: "/ 3 months",
        tag: "Most popular",
        accent: true,
        flutterwaveLink: "https://flutterwave.com/pay/usahqiavxxqd",
        features: [
            "1 sponsored article written for your brand",
            "Published and indexed on Google, Bing and Yandex",
            "Live for 90 days, then removed",
            "Link to your website or landing page",
            "Keyword-optimized for your niche",
            "Renew at the end to stay listed",
        ],
    },
    {
        id: "six-months",
        name: "6 Months",
        days: 180,
        price: "₦100,000",
        period: "/ 6 months",
        tag: "Maximum exposure",
        flutterwaveLink: "https://flutterwave.com/pay/xiiglqmjknsa",
        features: [
            "1 sponsored article written for your brand",
            "Published and indexed on Google, Bing and Yandex",
            "Live for 180 days, then removed",
            "Link to your website or landing page",
            "Keyword-optimized for your niche",
            "Renew at the end to stay listed",
            "Brief performance note at 90 days",
        ],
    },
];

const stats = [
    { value: "115+", label: "Pages indexed on Google" },
    { value: "3", label: "Search engines: Google, Bing, Yandex" },
    { value: "0", label: "Words you need to write" },
];

const engines = [
    {
        name: "Google",
        status: "Indexed",
        live: true,
        desc: "115+ pages crawled and ranking in search results.",
        detail: "Sitemap submitted · Search Console verified",
    },
    {
        name: "Bing",
        status: "Indexing",
        live: false,
        desc: "100 URLs discovered via IndexNow.",
        detail: "IndexNow active · Webmaster Tools verified",
    },
    {
        name: "Yandex",
        status: "Indexed",
        live: true,
        desc: "100+ pages crawled and appearing in Yandex search.",
        detail: "Verified · Sitemap accepted",
    },
];

const steps = [
    { n: "01", title: "Pick your duration", body: "Choose 1, 3 or 6 months to match your goals and budget." },
    { n: "02", title: "Send your brand details", body: "Share your business name, website, target keywords and the message you want to get across." },
    { n: "03", title: "We write and publish", body: "A professional, keyword-optimized article goes live, and the search engines index it within days." },
    { n: "04", title: "Renew or let it end", body: "When your period ends the article is removed cleanly. Renew any time to stay visible." },
];

const benefits = [
    {
        icon: <Search size={18} />,
        title: "Published on an indexed domain",
        desc: "Your article goes live on a site with 115+ pages already indexed by Google, Bing and Yandex, so it starts with a trust signal.",
    },
    {
        icon: <FileText size={18} />,
        title: "Written for you",
        desc: "You do not write a word. Share your brand details and goals, and we write a clear, keyword-rich article that represents you well.",
    },
    {
        icon: <Clock size={18} />,
        title: "Fixed-length placement",
        desc: "Your article stays live for the period you chose, then comes down. No hidden commitments, no surprises.",
    },
    {
        icon: <RefreshCw size={18} />,
        title: "Renew when it works",
        desc: "If the placement brings value, renew before it expires to stay visible without starting over.",
    },
];

const faqs = [
    {
        q: "Do I need to write the article?",
        a: "No. Send your brand name, website and the keywords or message you want to target. We write and publish it.",
    },
    {
        q: "Can you guarantee my article will rank first on Google?",
        a: "No one honestly can. We publish on an indexed domain and optimize the article for your keywords, but search rankings depend on many factors outside our control.",
    },
    {
        q: "What happens when my campaign ends?",
        a: "The article is removed cleanly, so nothing outdated about your brand is left online. You can renew before the end date to keep it live.",
    },
    {
        q: "How do I pay?",
        a: "Pay online with Flutterwave using the button on your chosen package, or message us on WhatsApp or email and we will arrange it with you.",
    },
];

/* ── page ────────────────────────────────────────────── */

export default function AdvertiseClient() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

                .ad-page {
                    --paper: #ffffff; --paper-2: #f6f5f0; --card: #ffffff;
                    --ink: #111111; --ink-2: #3f3f3f; --ink-3: #6f6f6f;
                    --rule: #e4e2da; --rule-dark: #111111;
                    --accent: #e8ff47; --accent-dark: #d4e63c; --on-accent: #0a0a0b;
                    --green: #15803d; --amber: #b45309;
                    --serif: 'Playfair Display', Georgia, serif;
                    --sans: 'Inter', system-ui, sans-serif;
                    --mono: 'JetBrains Mono', 'Fira Code', monospace;
                    background: var(--paper); color: var(--ink); font-family: var(--sans); min-height: 100vh;
                }
                .ad-page *, .ad-page *::before, .ad-page *::after { box-sizing: border-box; }
                .ad-page h1, .ad-page h2, .ad-page h3, .ad-page p { margin: 0; }
                :where(.ad-page a) { color: inherit; text-decoration: none; }
                .ad-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
                .ad-section { padding-top: 88px; }

                /* Nav */
                .ad-nav { position: sticky; top: 0; z-index: 1000; background: rgba(255,255,255,0.9); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); border-bottom: 1px solid var(--rule); }
                .ad-nav__inner { max-width: 1120px; margin: 0 auto; padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
                .ad-nav__brand { font-family: var(--serif); font-weight: 800; font-size: 21px; letter-spacing: -0.01em; }
                .ad-nav__brand em { font-style: normal; background: var(--accent); padding: 0 3px; }
                .ad-nav__links { display: flex; align-items: center; gap: 4px; }
                .ad-nav__link { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3); padding: 8px 12px; transition: color 0.15s; }
                .ad-nav__link:hover { color: var(--ink); }
                @media (max-width: 640px) { .ad-nav__hide { display: none; } }

                /* Buttons */
                .ad-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-family: var(--mono); font-size: 11.5px; letter-spacing: 0.06em; padding: 13px 20px; border: 1.5px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; transition: background 0.15s, color 0.15s, transform 0.15s; }
                .ad-btn:hover { background: var(--ink); color: #fff; transform: translateY(-1px); }
                .ad-btn--solid { background: var(--accent); border-color: var(--ink); color: var(--on-accent); font-weight: 600; }
                .ad-btn--solid:hover { background: var(--ink); color: var(--accent); }
                .ad-btn--dark { background: var(--ink); color: #fff; }
                .ad-btn--dark:hover { background: var(--accent); color: var(--on-accent); }
                .ad-btn--lg { padding: 16px 26px; font-size: 12px; }
                .ad-btn--block { width: 100%; }

                /* Section heads */
                .ad-kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 10px; }
                .ad-kicker b { background: var(--accent); color: var(--on-accent); padding: 2px 7px; font-weight: 500; }
                .ad-h2 { font-family: var(--serif); font-weight: 800; font-size: clamp(28px, 4vw, 40px); line-height: 1.1; letter-spacing: -0.01em; }
                .ad-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding-top: 12px; border-top: 3px solid var(--rule-dark); margin-bottom: 30px; }
                .ad-head__note { font-size: 14px; line-height: 1.6; color: var(--ink-2); max-width: 400px; }

                /* Hero */
                .ad-hero { padding: 64px 0 56px; border-bottom: 1px solid var(--rule); }
                .ad-hero__grid { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr); gap: 56px; align-items: center; }
                @media (max-width: 900px) { .ad-hero__grid { grid-template-columns: minmax(0, 1fr); gap: 36px; } .ad-hero { padding-top: 40px; } }
                .ad-hero__title { margin-top: 4px; font-family: var(--serif); font-weight: 800; font-size: clamp(36px, 5.6vw, 64px); line-height: 1.05; letter-spacing: -0.015em; }
                .ad-hero__title em { font-style: italic; background: linear-gradient(transparent 62%, var(--accent) 62%); }
                .ad-hero__dek { margin-top: 22px; max-width: 560px; font-size: clamp(15px, 1.6vw, 18px); line-height: 1.7; font-weight: 300; color: var(--ink-2); border-left: 3px solid var(--accent); padding-left: 18px; }
                .ad-hero__actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
                .ad-hero__note { margin-top: 16px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-family: var(--mono); font-size: 11px; color: var(--ink-3); }

                .ad-proof { background: var(--paper-2); border: 1.5px solid var(--ink); box-shadow: 8px 8px 0 var(--accent); padding: 26px; }
                .ad-proof__label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 14px; }
                .ad-stat { padding: 14px 0; border-top: 1px solid var(--rule); }
                .ad-stat:first-of-type { border-top: none; padding-top: 0; }
                .ad-stat__value { font-family: var(--serif); font-weight: 800; font-size: 40px; line-height: 1; }
                .ad-stat__label { margin-top: 5px; font-size: 12.5px; color: var(--ink-2); line-height: 1.5; }

                /* Engines */
                .ad-engines { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
                @media (max-width: 800px) { .ad-engines { grid-template-columns: 1fr; } }
                .ad-engine { background: var(--card); border: 1px solid var(--rule); border-top: 3px solid var(--ink); padding: 24px; display: flex; flex-direction: column; gap: 10px; }
                .ad-engine__top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
                .ad-engine__name { font-family: var(--serif); font-weight: 800; font-size: 24px; }
                .ad-status { display: inline-flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 500; }
                .ad-status::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
                .ad-status--live { color: var(--green); }
                .ad-status--wait { color: var(--amber); }
                .ad-engine__desc { font-size: 14px; line-height: 1.6; color: var(--ink-2); }
                .ad-engine__detail { margin-top: auto; padding-top: 12px; border-top: 1px solid var(--rule); font-family: var(--mono); font-size: 10.5px; line-height: 1.6; color: var(--ink-3); }

                /* Steps */
                .ad-steps { display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid var(--rule-dark); }
                @media (max-width: 960px) { .ad-steps { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 560px) { .ad-steps { grid-template-columns: 1fr; } }
                .ad-step { padding: 24px; border-right: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
                .ad-step__n { font-family: var(--serif); font-weight: 800; font-size: 34px; line-height: 1; background: linear-gradient(transparent 60%, var(--accent) 60%); display: inline-block; }
                .ad-step__title { margin: 14px 0 6px; font-family: var(--serif); font-weight: 800; font-size: 19px; line-height: 1.25; }
                .ad-step__body { font-size: 13px; line-height: 1.65; color: var(--ink-3); }

                /* Benefits */
                .ad-benefits { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                @media (max-width: 700px) { .ad-benefits { grid-template-columns: 1fr; } }
                .ad-benefit { display: flex; gap: 16px; padding: 24px; background: var(--paper-2); border: 1px solid var(--rule); }
                .ad-benefit__icon { width: 42px; height: 42px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--accent); color: var(--on-accent); border: 1.5px solid var(--ink); }
                .ad-benefit__title { font-family: var(--serif); font-weight: 800; font-size: 19px; line-height: 1.25; margin-bottom: 6px; }
                .ad-benefit__desc { font-size: 13.5px; line-height: 1.7; color: var(--ink-2); }

                /* Pricing */
                .ad-packages { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: stretch; }
                @media (max-width: 920px) { .ad-packages { grid-template-columns: 1fr; max-width: 520px; margin: 0 auto; } }
                .ad-pkg { position: relative; display: flex; flex-direction: column; gap: 18px; background: var(--card); border: 1px solid var(--rule-dark); padding: 28px 24px; transition: transform 0.2s, box-shadow 0.2s; }
                .ad-pkg:hover { transform: translate(-3px, -3px); box-shadow: 6px 6px 0 var(--ink); }
                .ad-pkg--accent { border-width: 2px; box-shadow: 6px 6px 0 var(--accent); }
                .ad-pkg--accent:hover { box-shadow: 8px 8px 0 var(--accent); }
                .ad-pkg__tag { align-self: flex-start; font-family: var(--mono); font-size: 9.5px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border: 1px solid var(--ink); padding: 4px 9px; }
                .ad-pkg--accent .ad-pkg__tag { background: var(--accent); }
                .ad-pkg__name { font-family: var(--serif); font-weight: 800; font-size: 24px; }
                .ad-pkg__price { font-family: var(--serif); font-weight: 800; font-size: 44px; line-height: 1; letter-spacing: -0.02em; }
                .ad-pkg__price span { font-family: var(--mono); font-weight: 400; font-size: 12px; letter-spacing: 0; color: var(--ink-3); margin-left: 4px; }
                .ad-pkg__days { margin-top: 8px; font-family: var(--mono); font-size: 11px; color: var(--ink-3); }
                .ad-pkg__list { list-style: none; padding: 18px 0 0; margin: 0; border-top: 1px solid var(--rule); display: flex; flex-direction: column; gap: 11px; flex: 1; }
                .ad-pkg__list li { display: flex; gap: 10px; align-items: flex-start; font-size: 13.5px; line-height: 1.55; color: var(--ink-2); }
                .ad-pkg__list svg { color: var(--ink); background: var(--accent); padding: 2px; width: 17px; height: 17px; flex-shrink: 0; margin-top: 2px; }
                .ad-pkg__actions { display: flex; flex-direction: column; gap: 10px; }
                .ad-pkg__alt { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                .ad-pkg__alt .ad-btn { padding: 11px 10px; font-size: 11px; }
                .ad-pricing-note { margin-top: 22px; text-align: center; font-size: 13px; color: var(--ink-3); }

                /* FAQ */
                .ad-faq { border-top: 1px solid var(--rule-dark); }
                .ad-faq details { border-bottom: 1px solid var(--rule); }
                .ad-faq summary { list-style: none; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 20px 0; font-family: var(--serif); font-weight: 800; font-size: 19px; line-height: 1.3; }
                .ad-faq summary::-webkit-details-marker { display: none; }
                .ad-faq summary::after { content: '+'; font-family: var(--mono); font-size: 22px; font-weight: 400; flex-shrink: 0; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--rule-dark); transition: background 0.15s; }
                .ad-faq details[open] summary::after { content: '–'; background: var(--accent); }
                .ad-faq p { padding: 0 48px 22px 0; font-size: 14.5px; line-height: 1.75; color: var(--ink-2); max-width: 720px; }

                /* Contact */
                .ad-contact { margin: 96px 0 0; background: var(--ink); color: #f4f1ea; padding: 48px; display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); gap: 40px; align-items: center; border-top: 5px solid var(--accent); }
                @media (max-width: 800px) { .ad-contact { grid-template-columns: minmax(0, 1fr); padding: 32px 22px; gap: 28px; } }
                .ad-contact__kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); margin-bottom: 10px; }
                .ad-contact__title { font-family: var(--serif); font-weight: 800; font-size: clamp(26px, 3.6vw, 38px); line-height: 1.12; }
                .ad-contact__sub { margin-top: 12px; font-size: 14.5px; line-height: 1.7; color: #bdb8ae; max-width: 460px; }
                .ad-contact__actions { display: flex; flex-direction: column; gap: 12px; }
                .ad-contact .ad-btn { border-color: #f4f1ea; color: #f4f1ea; width: 100%; }
                .ad-contact .ad-btn:hover { background: #f4f1ea; color: var(--ink); }
                .ad-contact .ad-btn--solid { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
                .ad-contact .ad-btn--solid:hover { background: #fff; border-color: #fff; color: var(--ink); }

                .ad-backrow { padding: 32px 0 8px; }

                @media (max-width: 640px) {
                    .ad-wrap, .ad-nav__inner { padding-left: 18px; padding-right: 18px; }
                    .ad-section { padding-top: 64px; }
                    .ad-hero__actions .ad-btn { flex: 1 1 100%; }
                }

                .ad-page :focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
                @media (prefers-reduced-motion: reduce) { .ad-page * { transition: none !important; } }
            `}</style>

            <div className="ad-page">
                <header className="ad-nav">
                    <div className="ad-nav__inner">
                        <Link href="/" className="ad-nav__brand">brown<em>.</em>dev</Link>
                        <nav className="ad-nav__links" aria-label="Main">
                            <Link href="/portfolio" className="ad-nav__link ad-nav__hide">Portfolio</Link>
                            <Link href="/bc/contact" className="ad-nav__link ad-nav__hide">Contact</Link>
                            <Link href="/blog" className="ad-btn" style={{ padding: "8px 14px" }}>
                                <ArrowLeft size={12} /> Blog
                            </Link>
                        </nav>
                    </div>
                </header>

                <main>
                    {/* ── HERO ── */}
                    <section className="ad-hero">
                        <div className="ad-wrap ad-hero__grid">
                            <div>
                                <div className="ad-kicker"><b>Sponsored content</b></div>
                                <h1 className="ad-hero__title">
                                    Get your brand found on <em>Google, Bing and Yandex.</em>
                                </h1>
                                <p className="ad-hero__dek">
                                    We write and publish a sponsored article about your business on an indexed domain. It
                                    stays live for 1, 3 or 6 months, then comes down cleanly.
                                </p>
                                <div className="ad-hero__actions">
                                    <a href="#pricing" className="ad-btn ad-btn--solid ad-btn--lg">
                                        See pricing <ArrowRight size={14} />
                                    </a>
                                    <a
                                        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi, I'm interested in advertising on brown.dev.")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ad-btn ad-btn--lg"
                                    >
                                        <MessageCircle size={14} /> Ask on WhatsApp
                                    </a>
                                </div>
                                <p className="ad-hero__note">
                                    <Check size={13} /> You write nothing <span>·</span> Fixed prices <span>·</span> Renew any time
                                </p>
                            </div>

                            <aside className="ad-proof" aria-label="At a glance">
                                <p className="ad-proof__label">At a glance</p>
                                {stats.map((s) => (
                                    <div key={s.label} className="ad-stat">
                                        <div className="ad-stat__value">{s.value}</div>
                                        <div className="ad-stat__label">{s.label}</div>
                                    </div>
                                ))}
                            </aside>
                        </div>
                    </section>

                    {/* ── ENGINES ── */}
                    <section className="ad-section">
                        <div className="ad-wrap">
                            <div className="ad-head">
                                <div>
                                    <div className="ad-kicker">Reach</div>
                                    <h2 className="ad-h2">Search engine coverage</h2>
                                </div>
                                <p className="ad-head__note">
                                    Your article is published on a domain the three major search engines already crawl.
                                </p>
                            </div>
                            <div className="ad-engines">
                                {engines.map((e) => (
                                    <article key={e.name} className="ad-engine">
                                        <div className="ad-engine__top">
                                            <h3 className="ad-engine__name">{e.name}</h3>
                                            <span className={`ad-status ${e.live ? "ad-status--live" : "ad-status--wait"}`}>
                                                {e.status}
                                            </span>
                                        </div>
                                        <p className="ad-engine__desc">{e.desc}</p>
                                        <p className="ad-engine__detail">{e.detail}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── PROCESS ── */}
                    <section className="ad-section">
                        <div className="ad-wrap">
                            <div className="ad-head">
                                <div>
                                    <div className="ad-kicker">The process</div>
                                    <h2 className="ad-h2">From message to live in four steps</h2>
                                </div>
                                <p className="ad-head__note">
                                    You choose the length and share your details. We handle the writing, publishing and
                                    indexing.
                                </p>
                            </div>
                            <div className="ad-steps">
                                {steps.map((s) => (
                                    <div key={s.n} className="ad-step">
                                        <span className="ad-step__n">{s.n}</span>
                                        <h3 className="ad-step__title">{s.title}</h3>
                                        <p className="ad-step__body">{s.body}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── BENEFITS ── */}
                    <section className="ad-section">
                        <div className="ad-wrap">
                            <div className="ad-head">
                                <div>
                                    <div className="ad-kicker">What you get</div>
                                    <h2 className="ad-h2">Visibility without the hassle</h2>
                                </div>
                            </div>
                            <div className="ad-benefits">
                                {benefits.map((b) => (
                                    <article key={b.title} className="ad-benefit">
                                        <div className="ad-benefit__icon">{b.icon}</div>
                                        <div>
                                            <h3 className="ad-benefit__title">{b.title}</h3>
                                            <p className="ad-benefit__desc">{b.desc}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── PRICING ── */}
                    <section id="pricing" className="ad-section" style={{ scrollMarginTop: 60 }}>
                        <div className="ad-wrap">
                            <div className="ad-head">
                                <div>
                                    <div className="ad-kicker">Pricing</div>
                                    <h2 className="ad-h2">Simple, fixed prices</h2>
                                </div>
                                <p className="ad-head__note">
                                    One sponsored article per package. Pay online, or message us first if you have questions.
                                </p>
                            </div>

                            <div className="ad-packages">
                                {adPackages.map((pkg) => (
                                    <article key={pkg.id} className={`ad-pkg${pkg.accent ? " ad-pkg--accent" : ""}`}>
                                        <span className="ad-pkg__tag">{pkg.tag}</span>
                                        <div>
                                            <h3 className="ad-pkg__name">{pkg.name}</h3>
                                            <div className="ad-pkg__price" style={{ marginTop: 10 }}>
                                                {pkg.price}<span>{pkg.period}</span>
                                            </div>
                                            <p className="ad-pkg__days">1 article · live for {pkg.days} days</p>
                                        </div>
                                        <ul className="ad-pkg__list">
                                            {pkg.features.map((f) => (
                                                <li key={f}><Check size={13} /> {f}</li>
                                            ))}
                                        </ul>
                                        <div className="ad-pkg__actions">
                                            <a
                                                href={pkg.flutterwaveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`ad-btn ad-btn--block ${pkg.accent ? "ad-btn--solid" : "ad-btn--dark"}`}
                                            >
                                                Pay with Flutterwave <ArrowUpRight size={13} />
                                            </a>
                                            <div className="ad-pkg__alt">
                                                <a
                                                    href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi, I'm interested in the ${pkg.name} sponsored article package.`)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="ad-btn"
                                                >
                                                    <MessageCircle size={13} /> WhatsApp
                                                </a>
                                                <a
                                                    href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Sponsored Article Inquiry - ${pkg.name} Package`)}`}
                                                    className="ad-btn"
                                                >
                                                    <Mail size={13} /> Email
                                                </a>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                            <p className="ad-pricing-note">
                                Not sure which length fits? Message us and we will help you choose.
                            </p>
                        </div>
                    </section>

                    {/* ── FAQ ── */}
                    <section className="ad-section">
                        <div className="ad-wrap">
                            <div className="ad-head">
                                <div>
                                    <div className="ad-kicker">Questions</div>
                                    <h2 className="ad-h2">Before you book</h2>
                                </div>
                            </div>
                            <div className="ad-faq">
                                {faqs.map((f) => (
                                    <details key={f.q}>
                                        <summary>{f.q}</summary>
                                        <p>{f.a}</p>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── CONTACT ── */}
                    <div className="ad-wrap">
                        <section className="ad-contact">
                            <div>
                                <p className="ad-contact__kicker">Ready when you are</p>
                                <h2 className="ad-contact__title">Tell us about your brand and we will take it from there.</h2>
                                <p className="ad-contact__sub">
                                    Send your business name, website and the keywords you want to be found for. We reply
                                    within 24 hours.
                                </p>
                            </div>
                            <div className="ad-contact__actions">
                                <a
                                    href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi, I'm interested in advertising on brown.dev.")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ad-btn ad-btn--solid ad-btn--lg"
                                >
                                    <MessageCircle size={14} /> Chat on WhatsApp
                                </a>
                                <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Sponsored Content Inquiry")}`} className="ad-btn ad-btn--lg">
                                    <Mail size={14} /> Send an email
                                </a>
                                <Link href="/bc/contact" className="ad-btn ad-btn--lg">
                                    Use the contact form <ArrowRight size={14} />
                                </Link>
                            </div>
                        </section>

                        <div className="ad-backrow">
                            <Link href="/blog" className="ad-btn">
                                <ArrowLeft size={13} /> Back to blog
                            </Link>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}