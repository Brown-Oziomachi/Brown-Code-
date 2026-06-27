"use client";

import { ArrowLeft, ArrowUpRight, Search, FileText, Clock, RefreshCw, CheckCircle } from "lucide-react";
import Footer from "@/components/footer";

const adPackages = [
    {
        id: "one-month",
        name: "1 Month",
        price: "₦25,000",
        period: "/ month",
        tag: "Short campaign",
        features: [
            "1 sponsored article written for your brand",
            "Published and indexed on Google, Bing & Yandex",
            "Live for 30 days, then removed",
            "Link to your website or landing page",
            "Keyword-optimized for search visibility",
        ],
    },
    {
        id: "three-months",
        name: "3 Months",
        price: "₦60,000",
        period: "/ 3 months",
        tag: "Most popular",
        accent: true,
        features: [
            "1 sponsored article written for your brand",
            "Published and indexed on Google, Bing & Yandex",
            "Live for 90 days, then removed",
            "Link to your website or landing page",
            "Keyword-optimized for your niche",
            "Renew at the end to stay listed",
        ],
    },
    {
        id: "six-months",
        name: "6 Months",
        price: "₦100,000",
        period: "/ 6 months",
        tag: "Maximum exposure",
        features: [
            "1 sponsored article written for your brand",
            "Published and indexed on Google, Bing & Yandex",
            "Live for 180 days, then removed",
            "Link to your website or landing page",
            "Keyword-optimized for your niche",
            "Renew at the end to stay listed",
            "Brief performance note at 90 days",
        ],
    },
];

const stats = [
    { label: "Google Indexed", value: "80+", desc: "Pages live on Google" },
    { label: "Search Engines", value: "3", desc: "Google · Bing · Yandex" },
    { label: "Campaign Options", value: "3", desc: "1, 3, or 6 months" },
];

const engines = [
    {
        name: "Google",
        status: "Indexed",
        statusType: "live",
        desc: "80+ pages crawled and ranking in search results",
        detail: "Sitemap submitted · generateMetadata active · Search Console verified",
    },
    {
        name: "Bing",
        status: "Indexing",
        statusType: "live",
        desc: "80 URLs discovered via IndexNow",
        detail: "IndexNow active · Webmaster Tools verified · Crawling in progress",
    },
    {
        name: "Yandex",
        status: "Processing",
        statusType: "pending",
        desc: "Sitemap submitted and in processing queue",
        detail: "Verified · Sitemap accepted · 1–2 week processing window",
    },
];

const benefits = [
    {
        icon: <Search size={16} />,
        title: "Multi-Engine Indexed",
        desc: "Your article is published on a domain with 80+ indexed pages across Google, Bing, and Yandex — giving it an immediate trust signal with all major search engines.",
    },
    {
        icon: <FileText size={16} />,
        title: "Written For You",
        desc: "You don't write a word. Share your brand details and goals — we write a compelling, keyword-rich article that represents you professionally.",
    },
    {
        icon: <Clock size={16} />,
        title: "Time-Limited Placement",
        desc: "Your article stays live for your chosen campaign duration, then gets cleanly removed. No hidden commitments, no surprises.",
    },
    {
        icon: <RefreshCw size={16} />,
        title: "Renewable Anytime",
        desc: "If your campaign delivers value, simply renew before it expires to keep your brand visible without starting over.",
    },
];

const WHATSAPP = "2348142995114";

export default function AdvertiseClient() {
    return (
        <>
            <style>{`
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                :root {
                    --bg:          #0a0a0b;
                    --surface:     #111113;
                    --border:      #1e1e22;
                    --border-hi:   #2e2e34;
                    --text-1:      #f4f4f5;
                    --text-2:      #a1a1aa;
                    --text-3:      #52525b;
                    --accent:      #e8ff47;
                    --accent-dim:  rgba(232,255,71,0.08);
                    --wa:          #25d366;
                    --wa-dim:      rgba(37,211,102,0.08);
                    --green:       #4ade80;
                    --yellow:      #facc15;
                    --radius:      6px;
                    --font-serif:  'DM Serif Display', 'Georgia', serif;
                    --font-sans:   'Inter', system-ui, sans-serif;
                    --font-mono:   'JetBrains Mono', 'Fira Code', monospace;
                }

                @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

                .ad-page {
                    font-family: var(--font-sans);
                    background: var(--bg);
                    color: var(--text-1);
                    min-height: 100vh;
                }

                /* ── Nav ── */
                .ad-nav {
                    position: sticky; top: 0; z-index: 100;
                    background: rgba(10,10,11,0.92);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid var(--border);
                    padding: 0 24px; height: 56px;
                    display: flex; align-items: center; justify-content: space-between;
                }
                .ad-nav__brand {
                    font-family: var(--font-mono); font-size: 12px; font-weight: 500;
                    letter-spacing: 0.08em; color: var(--text-1); text-decoration: none;
                }
                .ad-nav__brand em { font-style: normal; color: var(--accent); }
                .ad-nav__back {
                    display: inline-flex; align-items: center; gap: 6px;
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    color: var(--text-2); text-decoration: none;
                    padding: 6px 12px; border: 1px solid var(--border); border-radius: var(--radius);
                    transition: color 0.15s, border-color 0.15s, background 0.15s;
                }
                .ad-nav__back:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }

                /* ── Main ── */
                .ad-main { max-width: 1100px; margin: 0 auto; padding: 0 24px 80px; }

                /* ── Masthead ── */
                .ad-masthead {
                    display: flex; align-items: flex-end; justify-content: space-between;
                    gap: 16px; padding: 52px 0 32px;
                    border-bottom: 1px solid var(--border); margin-bottom: 48px;
                }
                .ad-masthead__eyebrow {
                    font-family: var(--font-mono); font-size: 11px; color: var(--accent);
                    letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px;
                }
                .ad-masthead__title {
                    font-family: var(--font-serif);
                    font-size: clamp(36px, 5vw, 60px); font-weight: 400;
                    line-height: 1.05; color: var(--text-1);
                }
                .ad-masthead__desc {
                    font-size: 13px; color: var(--text-2); line-height: 1.6;
                    max-width: 320px; text-align: right;
                }
                @media (max-width: 700px) {
                    .ad-masthead { flex-direction: column; align-items: flex-start; }
                    .ad-masthead__desc { text-align: left; }
                }

                /* ── Section label ── */
                .ad-section-label {
                    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em;
                    text-transform: uppercase; color: var(--text-3);
                    display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
                }
                .ad-section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }

                /* ── Stats ── */
                .ad-stats {
                    display: grid; grid-template-columns: repeat(3, 1fr);
                    gap: 1px; background: var(--border);
                    border: 1px solid var(--border); border-radius: var(--radius);
                    overflow: hidden; margin-bottom: 32px;
                }
                .ad-stat {
                    background: var(--surface); padding: 24px 28px;
                    display: flex; flex-direction: column; gap: 4px;
                    transition: background 0.15s;
                }
                .ad-stat:hover { background: #141417; }
                .ad-stat__label {
                    font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.12em;
                    text-transform: uppercase; color: var(--text-3);
                }
                .ad-stat__value {
                    font-family: var(--font-serif); font-size: 36px; font-weight: 400;
                    color: var(--accent); line-height: 1;
                }
                .ad-stat__desc { font-size: 11px; color: var(--text-3); margin-top: 2px; }

                /* ── Engine coverage ── */
                .ad-engines {
                    display: grid; grid-template-columns: repeat(3, 1fr);
                    gap: 1px; background: var(--border);
                    border: 1px solid var(--border); border-radius: var(--radius);
                    overflow: hidden; margin-bottom: 56px;
                }
                @media (max-width: 700px) { .ad-engines { grid-template-columns: 1fr; } }
                .ad-engine {
                    background: var(--surface); padding: 24px 28px;
                    display: flex; flex-direction: column; gap: 8px;
                    transition: background 0.15s; position: relative;
                }
                .ad-engine:hover { background: #141417; }
                .ad-engine::after {
                    content: ''; position: absolute; bottom: 0; left: 28px; right: 28px;
                    height: 1px; background: var(--border);
                }
                .ad-engine__name {
                    font-family: var(--font-serif); font-size: 20px; font-weight: 400;
                    color: var(--text-1); letter-spacing: -0.01em;
                }
                .ad-engine__status {
                    display: inline-flex; align-items: center; gap: 6px;
                    font-family: var(--font-mono); font-size: 10px;
                    letter-spacing: 0.08em; text-transform: uppercase; width: fit-content;
                    padding: 3px 8px; border-radius: 3px;
                }
                .ad-engine__status--live {
                    color: var(--green); background: rgba(74,222,128,0.08);
                    border: 1px solid rgba(74,222,128,0.2);
                }
                .ad-engine__status--pending {
                    color: var(--yellow); background: rgba(250,204,21,0.08);
                    border: 1px solid rgba(250,204,21,0.2);
                }
                .ad-engine__dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
                .ad-engine__desc { font-size: 12px; color: var(--text-2); line-height: 1.5; }
                .ad-engine__detail {
                    font-family: var(--font-mono); font-size: 10px; color: var(--text-3);
                    line-height: 1.6; letter-spacing: 0.02em;
                }

                /* ── Why section ── */
                .ad-why {
                    background: var(--surface); border: 1px solid var(--border);
                    border-left: 3px solid var(--accent);
                    border-radius: var(--radius); padding: 32px;
                    margin-bottom: 56px;
                }
                .ad-why__title {
                    font-family: var(--font-serif); font-size: 24px; font-weight: 400;
                    color: var(--text-1); margin-bottom: 16px;
                }
                .ad-why__body { font-size: 13px; color: var(--text-2); line-height: 1.8; max-width: 720px; }
                .ad-why__body p + p { margin-top: 12px; }

                /* ── Timeline ── */
                .ad-timeline {
                    display: flex; flex-direction: column;
                    border: 1px solid var(--border); border-radius: var(--radius);
                    overflow: hidden; margin-bottom: 56px;
                }
                .ad-step {
                    background: var(--surface); padding: 24px 28px;
                    display: flex; align-items: flex-start; gap: 20px;
                    border-bottom: 1px solid var(--border);
                    transition: background 0.15s;
                }
                .ad-step:last-child { border-bottom: none; }
                .ad-step:hover { background: #141417; }
                .ad-step__num {
                    font-family: var(--font-mono); font-size: 11px; font-weight: 600;
                    color: var(--accent); background: var(--accent-dim);
                    border: 1px solid rgba(232,255,71,0.2);
                    border-radius: var(--radius); padding: 4px 10px;
                    flex-shrink: 0; margin-top: 1px; letter-spacing: 0.06em;
                }
                .ad-step__title {
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    text-transform: uppercase; color: var(--text-1); font-weight: 600;
                    margin-bottom: 4px;
                }
                .ad-step__desc { font-size: 12px; color: var(--text-2); line-height: 1.65; }

                /* ── Benefits grid ── */
                .ad-benefits {
                    display: grid; grid-template-columns: repeat(2, 1fr);
                    gap: 1px; background: var(--border);
                    border: 1px solid var(--border); border-radius: var(--radius);
                    overflow: hidden; margin-bottom: 56px;
                }
                @media (max-width: 600px) { .ad-benefits { grid-template-columns: 1fr; } }
                .ad-benefit {
                    background: var(--surface); padding: 28px 24px;
                    display: flex; flex-direction: column; gap: 10px;
                    transition: background 0.15s; position: relative;
                }
                .ad-benefit:hover { background: #141417; }
                .ad-benefit::before {
                    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
                    background: var(--accent); border-radius: 1px;
                    transform: scaleY(0); transform-origin: bottom;
                    transition: transform 0.2s ease;
                }
                .ad-benefit:hover::before { transform: scaleY(1); }
                .ad-benefit__icon {
                    width: 36px; height: 36px; border-radius: var(--radius);
                    background: var(--accent-dim); border: 1px solid rgba(232,255,71,0.2);
                    display: flex; align-items: center; justify-content: center;
                    color: var(--accent);
                }
                .ad-benefit__title {
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    text-transform: uppercase; color: var(--text-1); font-weight: 600;
                }
                .ad-benefit__desc { font-size: 12px; color: var(--text-2); line-height: 1.65; }

                /* ── Packages ── */
                .ad-packages {
                    display: grid; grid-template-columns: repeat(3, 1fr);
                    gap: 1px; background: var(--border);
                    border: 1px solid var(--border); border-radius: var(--radius);
                    overflow: hidden; margin-bottom: 56px;
                }
                @media (max-width: 860px) { .ad-packages { grid-template-columns: 1fr; } }
                .ad-package {
                    background: var(--surface); padding: 28px 24px;
                    display: flex; flex-direction: column; gap: 20px;
                    transition: background 0.15s;
                }
                .ad-package:hover { background: #141417; }
                .ad-package--accent { background: #0f120a; border-left: 2px solid var(--accent); }
                .ad-package--accent:hover { background: #12150b; }
                .ad-package__tag {
                    display: inline-flex; align-items: center;
                    font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em;
                    text-transform: uppercase; padding: 3px 8px; border-radius: 3px;
                    background: var(--accent-dim); color: var(--accent);
                    border: 1px solid rgba(232,255,71,0.2); width: fit-content;
                }
                .ad-package__name {
                    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em;
                    text-transform: uppercase; color: var(--text-3);
                }
                .ad-package__price {
                    font-family: var(--font-serif); font-size: 36px; font-weight: 400;
                    color: var(--text-1); line-height: 1;
                }
                .ad-package__price span {
                    font-family: var(--font-mono); font-size: 12px; color: var(--text-3);
                }
                .ad-package__duration {
                    font-family: var(--font-mono); font-size: 10px; color: var(--accent);
                    letter-spacing: 0.06em; margin-top: 4px;
                }
                .ad-package__divider { height: 1px; background: var(--border); }
                .ad-package__features { display: flex; flex-direction: column; gap: 10px; flex: 1; }
                .ad-package__feature {
                    display: flex; align-items: flex-start; gap: 8px;
                    font-size: 12px; color: var(--text-2); line-height: 1.5;
                }
                .ad-package__check { color: var(--accent); flex-shrink: 0; margin-top: 1px; }
                .ad-package__actions { display: flex; flex-direction: column; gap: 8px; }
                .ad-package__cta {
                    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    padding: 10px 20px; border-radius: var(--radius);
                    border: 1px solid var(--border); background: transparent;
                    color: var(--text-2); cursor: pointer; text-decoration: none;
                    transition: color 0.15s, border-color 0.15s, background 0.15s; width: 100%;
                }
                .ad-package__cta:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }
                .ad-package__cta--accent {
                    background: var(--accent); border-color: var(--accent);
                    color: #0a0a0b; font-weight: 600;
                }
                .ad-package__cta--accent:hover { opacity: 0.88; background: var(--accent); }
                .ad-package__cta--wa {
                    border-color: rgba(37,211,102,0.4); color: var(--wa); background: var(--wa-dim);
                }
                .ad-package__cta--wa:hover { background: rgba(37,211,102,0.15); border-color: var(--wa); color: var(--wa); }

                /* ── Contact CTA ── */
                .ad-contact {
                    background: var(--surface); border: 1px solid var(--border);
                    border-radius: var(--radius); padding: 40px 32px;
                    display: flex; align-items: center; justify-content: space-between;
                    gap: 24px; margin-bottom: 56px;
                }
                @media (max-width: 600px) { .ad-contact { flex-direction: column; align-items: flex-start; } }
                .ad-contact__title {
                    font-family: var(--font-serif); font-size: 26px; font-weight: 400;
                    color: var(--text-1); margin-bottom: 6px;
                }
                .ad-contact__sub { font-size: 13px; color: var(--text-3); }
                .ad-contact__email {
                    font-family: var(--font-mono); font-size: 12px; color: var(--accent);
                    margin-top: 8px; letter-spacing: 0.04em;
                }
                .ad-contact__actions { display: flex; flex-direction: column; gap: 10px; flex-shrink: 0; }
                .ad-btn {
                    display: inline-flex; align-items: center; justify-content: center; gap: 7px;
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    padding: 11px 22px; border-radius: var(--radius);
                    background: var(--accent); border: 1px solid var(--accent);
                    color: #0a0a0b; font-weight: 600; text-decoration: none;
                    transition: opacity 0.15s, transform 0.1s; white-space: nowrap;
                }
                .ad-btn:hover { opacity: 0.88; transform: translateY(-1px); }
                .ad-btn--wa {
                    background: var(--wa); border-color: var(--wa); color: #fff;
                }
                .ad-btn--wa:hover { opacity: 0.88; transform: translateY(-1px); }

                /* ── Footer strip ── */
                .ad-footer {
                    display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
                    gap: 12px; padding-top: 40px; margin-top: 48px; border-top: 1px solid var(--border);
                }
                .ad-footer__info {
                    font-family: var(--font-mono); font-size: 10px; color: var(--text-3); letter-spacing: 0.06em;
                }
                .ad-footer__actions { display: flex; gap: 10px; flex-wrap: wrap; }
                .ad-footer-btn {
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    padding: 8px 16px; border-radius: var(--radius);
                    border: 1px solid var(--border); background: transparent;
                    color: var(--text-2); cursor: pointer;
                    display: inline-flex; align-items: center; gap: 6px;
                    transition: color 0.15s, border-color 0.15s, background 0.15s; text-decoration: none;
                }
                .ad-footer-btn:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }
                .ad-footer-btn--accent {
                    border-color: rgba(232,255,71,0.3); color: var(--accent); background: var(--accent-dim);
                }
                .ad-footer-btn--accent:hover { background: rgba(232,255,71,0.15); border-color: rgba(232,255,71,0.5); }
            `}</style>

            <div className="ad-page">
                <nav className="ad-nav">
                    <a href="/" className="ad-nav__brand">brown<em>.</em>dev</a>
                    <a href="/blog" className="ad-nav__back"><ArrowLeft size={13} /> Blog</a>
                </nav>

                <main className="ad-main">

                    {/* Masthead */}
                    <header className="ad-masthead">
                        <div>
                            <p className="ad-masthead__eyebrow">Sponsored Content</p>
                            <h1 className="ad-masthead__title">
                                Get Your Brand<br />On Google, Bing<br />& Yandex
                            </h1>
                        </div>
                        <p className="ad-masthead__desc">
                            We write and publish a sponsored article about your business — indexed across Google, Bing, and Yandex for 1, 3, or 6 months, then removed cleanly.
                        </p>
                    </header>

                    {/* Stats */}
                    <p className="ad-section-label">At a glance</p>
                    <div className="ad-stats">
                        {stats.map((s) => (
                            <div key={s.label} className="ad-stat">
                                <span className="ad-stat__label">{s.label}</span>
                                <span className="ad-stat__value">{s.value}</span>
                                <span className="ad-stat__desc">{s.desc}</span>
                            </div>
                        ))}
                    </div>

                    {/* Search Engine Coverage */}
                    <p className="ad-section-label">Search engine coverage</p>
                    <div className="ad-engines">
                        {engines.map((e) => (
                            <div key={e.name} className="ad-engine">
                                <span className="ad-engine__name">{e.name}</span>
                                <span className={`ad-engine__status ad-engine__status--${e.statusType}`}>
                                    <span className="ad-engine__dot" />
                                    {e.status}
                                </span>
                                <span className="ad-engine__desc">{e.desc}</span>
                                <span className="ad-engine__detail">{e.detail}</span>
                            </div>
                        ))}
                    </div>

                    {/* Why */}
                    <div className="ad-why">
                        <div className="ad-why__title">How this works</div>
                        <div className="ad-why__body">
                            <p>
                                You choose a campaign duration — 1, 3, or 6 months. We write a keyword-optimized article about your brand and publish it on this domain, which has 80+ pages actively indexed across Google, Bing, and Yandex. Your article goes live, gets crawled by all three engines, and starts appearing in relevant search results.
                            </p>
                            <p>
                                When your campaign ends, the article is cleanly removed. No awkward permanent footprint, no lingering outdated content about your brand. If the placement delivered value, you simply renew before expiry to keep your visibility running.
                            </p>
                            <p>
                                You provide your brand name, website, and the message or keywords you want to target. We handle the writing, publishing, and indexing across Google, Bing, and Yandex — you get search visibility without writing a single word.
                            </p>
                        </div>
                    </div>

                    {/* Process */}
                    <p className="ad-section-label">The process</p>
                    <div className="ad-timeline">
                        {[
                            { num: "01", title: "Pick your duration", desc: "Choose 1, 3, or 6 months depending on your campaign goals and budget." },
                            { num: "02", title: "Send your brand details", desc: "Share your business name, website, target keywords, and what you want the article to communicate." },
                            { num: "03", title: "We write and publish", desc: "We write a professional, keyword-optimized article and publish it. Google, Bing, and Yandex index it within days." },
                            { num: "04", title: "Campaign ends, article removed", desc: "At the end of your chosen period, the article is taken down cleanly. Renew anytime to continue." },
                        ].map((step) => (
                            <div key={step.num} className="ad-step">
                                <span className="ad-step__num">{step.num}</span>
                                <div>
                                    <div className="ad-step__title">{step.title}</div>
                                    <div className="ad-step__desc">{step.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Benefits */}
                    <p className="ad-section-label">What you get</p>
                    <div className="ad-benefits">
                        {benefits.map((b) => (
                            <div key={b.title} className="ad-benefit">
                                <div className="ad-benefit__icon">{b.icon}</div>
                                <div className="ad-benefit__title">{b.title}</div>
                                <div className="ad-benefit__desc">{b.desc}</div>
                            </div>
                        ))}
                    </div>

                    {/* Packages */}
                    <p className="ad-section-label">Pricing</p>
                    <div className="ad-packages">
                        {adPackages.map((pkg) => (
                            <div key={pkg.id} className={`ad-package${pkg.accent ? " ad-package--accent" : ""}`}>
                                <div>
                                    <div className="ad-package__tag">{pkg.tag}</div>
                                </div>
                                <div>
                                    <div className="ad-package__name">{pkg.name}</div>
                                    <div className="ad-package__price">
                                        {pkg.price} <span>{pkg.period}</span>
                                    </div>
                                    <div className="ad-package__duration">
                                        1 article · live for {pkg.id === "one-month" ? "30" : pkg.id === "three-months" ? "90" : "180"} days
                                    </div>
                                </div>
                                <div className="ad-package__divider" />
                                <div className="ad-package__features">
                                    {pkg.features.map((f) => (
                                        <div key={f} className="ad-package__feature">
                                            <CheckCircle size={13} className="ad-package__check" />
                                            <span>{f}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="ad-package__actions">
                                    <a
                                        href={`mailto:browncemmanuel@gmail.com?subject=Sponsored Article Inquiry — ${pkg.name} Package`}
                                        className={`ad-package__cta${pkg.accent ? " ad-package__cta--accent" : ""}`}
                                    >
                                        Email us <ArrowUpRight size={12} />
                                    </a>
                                    <a
                                        href={`https://wa.me/${WHATSAPP}?text=Hi%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20sponsored%20article%20package.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ad-package__cta ad-package__cta--wa"
                                    >
                                        WhatsApp <ArrowUpRight size={12} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact CTA */}
                    <div className="ad-contact">
                        <div>
                            <div className="ad-contact__title">Not sure which duration fits?</div>
                            <div className="ad-contact__sub">Reach out and we'll help you pick the right campaign length for your goals.</div>
                            <div className="ad-contact__email">Sir Brown AD</div>
                        </div>
                        <div className="ad-contact__actions">
                            <a
                                href="mailto:browncemmanuel@gmail.com?subject=Sponsored Content Inquiry"
                                className="ad-btn"
                            >
                                Email us <ArrowUpRight size={13} />
                            </a>
                            <a
                                href={`https://wa.me/${WHATSAPP}?text=Hi%2C%20I%27m%20interested%20in%20advertising%20on%20Brown%20Code.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ad-btn ad-btn--wa"
                            >
                                WhatsApp <ArrowUpRight size={13} />
                            </a>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="ad-footer">
                        <span className="ad-footer__info">brown.dev — indexed on Google · Bing · Yandex</span>
                        <div className="ad-footer__actions">
                            <a href="/bc/contact" className="ad-footer-btn ad-footer-btn--accent">
                                Contact directly
                            </a>
                            <a href="/blog" className="ad-footer-btn">
                                <ArrowLeft size={13} /> Back to blog
                            </a>
                        </div>
                    </footer>

                </main>
            </div>

            <Footer />
        </>
    );
}