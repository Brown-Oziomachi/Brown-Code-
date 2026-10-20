"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// Where your articles live. Each story links to `${BLOG_BASE}/${slug}`.
// Change this if your article route is different (for example "/articles").
const BLOG_BASE = "/blog";

const editions = [
    {
        label: "Security Desk",
        dateline: "Oct 18 to 24, 2026",
        stories: [
            {
                slug: "unsafe-public-wifi-fake-hotspots-how-to-stay-safe",
                tag: "Security & Fraud",
                title: "Free Public Wi-Fi Is Not Free: How Fake Hotspots Steal Your Data",
                summary: "Airports, hotels and cafés offer free Wi-Fi. Some of it is a trap with a name that looks like the real thing.",
                image: "/public-wifi.jpg",
                date: "Oct 24, 2026",
            },
            {
                slug: "bluetooth-scams-hacking-how-it-works-protect-your-phone",
                tag: "Security & Fraud",
                title: "Bluetooth Scams and Hacking: How They Work",
                summary: "Bluetooth cannot empty your bank account by itself, but it can be the first step in an attack.",
                image: "/bluetooth.jpeg",
                date: "Oct 22, 2026",
            },
            {
                slug: "sim-swap-fraud-nigeria-how-it-works",
                tag: "Security & Fraud",
                title: "SIM Swap Fraud in Nigeria: The Scam That Needs No Password",
                summary: "A scammer can take over your accounts using only your phone number and one fooled network agent.",
                image: "/simswap.png",
                date: "Oct 20, 2026",
            },
        ],
    },
    {
        label: "Fraud Watch",
        dateline: "Aug to Oct 2026",
        stories: [
            {
                slug: "fake-alerts-and-money-mule-schemes-protect-your-business-nigeria",
                tag: "Alerts & Transfers",
                title: "The Big-Transfer Trap: Fake Alerts and Money Mule Schemes Hit POS Agents",
                summary: "A fake alert steals your goods. A money mule scheme can steal your name. Here is how to protect your shop.",
                image: "/money-mule.png",
                date: "Oct 18, 2026",
            },
            {
                slug: "palmpay-fake-alert-app-how-to-verify-transfers-nigeria",
                tag: "Alerts & Transfers",
                title: "PalmPay Fake Alert App: How to Verify Every Transfer",
                summary: "A fake alert can look identical to the real one. Check your own balance before you release anything.",
                image: "/palm.png",
                date: "Aug 18, 2026",
            },
            {
                slug: "moniepoint-fake-alert-app-how-to-verify-transfers-nigeria",
                tag: "Alerts & Transfers",
                title: "Moniepoint Fake Alert Scam: How to Verify a Real Transfer",
                summary: "A scammer needs only your phone number and account number to build a convincing fake.",
                image: "/moni.webp",
                date: "Aug 17, 2026",
            },
        ],
    },
    {
        label: "Money & Trust",
        dateline: "July 2026",
        stories: [
            {
                slug: "true-cost-of-fraud-nigeria-economy-and-people",
                tag: "Analysis",
                title: "The True Cost of Fraud: How Scams Quietly Drain Nigeria's Economy",
                summary: "Beyond the billions in bank fraud reports, fraud is reshaping how Nigerians trust and transact.",
                image: "/ngf.png",
                date: "Jul 25, 2026",
            },
            {
                slug: "origin-of-fraud-in-nigeria-history-and-platforms",
                tag: "History",
                title: "Where Nigerian Fraud Actually Started",
                summary: "From a letter in 1920 to today's apps, the same script keeps changing platforms.",
                image: "/origin.jpg",
                date: "Jul 26, 2026",
            },
            {
                slug: "how-laundered-money-betting-crypto-gets-traced-nigeria",
                tag: "Recovery",
                title: "\"Untraceable\" Is a Myth: How Stolen Money Gets Traced",
                summary: "Betting accounts and crypto wallets are not the dead end victims are told they are.",
                image: "/bet.jpeg",
                date: "Jul 27, 2026",
            },
        ],
    },
    {
        label: "Bank Safety",
        dateline: "February 2026",
        stories: [
            {
                slug: "fake-bank-website-how-to-spot-it",
                tag: "Banking",
                title: "The Fake Bank Website: How to Spot a Perfect Copy",
                summary: "The design can be copied. The web address cannot. Learn to read it before you log in.",
                image: "/fake.jpeg",
                date: "Feb 12, 2026",
            },
            {
                slug: "before-you-log-in-banking-checklist",
                tag: "Banking",
                title: "The 60-Second Check Before Every Online Banking Session",
                summary: "Seven quick checks that close the gap between looks right and is right.",
                image: "/checklist.png",
                date: "Feb 9, 2026",
            },
            {
                slug: "fake-pos-alert-fraud-how-to-detect",
                tag: "POS & Agents",
                title: "The Fake POS Alert: How Agents Release Cash That Was Never Sent",
                summary: "Your POS terminal does not lie. Their phone screen might.",
                image: "/pos.jpeg",
                date: "Feb 19, 2026",
            },
        ],
    },
    {
        label: "Build Online",
        dateline: "June 2026",
        stories: [
            {
                slug: "why-you-need-a-website",
                tag: "Web & Business",
                title: "Why You Need a Website in 2026",
                summary: "A website builds credibility, attracts clients and gives your business a presence around the clock.",
                image: "/website.jpg",
                date: "Jun 7, 2026",
            },
            {
                slug: "seo-fundamentals-getting-found",
                tag: "Web & Business",
                title: "SEO Fundamentals: Getting Found Online",
                summary: "Master the basics so your website appears when the right people are already searching.",
                image: "/seo.jpeg",
                date: "Jun 14, 2026",
            },
        ],
    },
];

const CSS = `
.np { max-width: 860px; margin: 0 auto; --np-body: Georgia, 'Times New Roman', serif; }
.np-stage { display: grid; padding: 10px 26px 36px 26px; }

.np-paper {
    grid-area: 1 / 1;
    position: relative;
    background: linear-gradient(180deg, #fdfcf7 0%, #f8f6ee 100%);
    border: 1.5px solid var(--ink);
    box-shadow: 0 18px 38px rgba(0,0,0,0.14);
    transform-origin: 50% 0%;
    transition: transform 0.65s cubic-bezier(0.22, 0.8, 0.2, 1), opacity 0.45s ease, box-shadow 0.4s;
    will-change: transform;
}
.np-paper::before { content: ""; position: absolute; inset: 0; pointer-events: none; background-image: repeating-linear-gradient(0deg, rgba(0,0,0,0.018) 0 1px, transparent 1px 3px); }

.np-paper[data-pos="0"] { transform: none; z-index: 10; }
.np-paper[data-pos="1"] { transform: translate(18px, 12px) rotate(1.8deg); z-index: 9; background: #f3f1e8; pointer-events: none; }
.np-paper[data-pos="2"] { transform: translate(-16px, 22px) rotate(-1.5deg); z-index: 8; background: #ece9df; pointer-events: none; }
.np-paper[data-pos="3"] { transform: translate(-16px, 22px) rotate(-1.5deg); z-index: 7; opacity: 0; pointer-events: none; }
.np-paper[data-pos="out"] { transform: translate(-118%, -2%) rotate(-9deg); z-index: 11; opacity: 0; pointer-events: none; }
.np-paper[data-pos="1"] .np-inner, .np-paper[data-pos="2"] .np-inner, .np-paper[data-pos="3"] .np-inner, .np-paper[data-pos="out"] .np-inner { visibility: hidden; transition: visibility 0s 0.65s; }

.np-inner { position: relative; padding: 22px 30px 24px; }

/* Masthead */
.np-flag { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 12px; padding-bottom: 10px; border-bottom: 1px solid var(--ink); }
.np-flag__side { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); line-height: 1.7; }
.np-flag__side--r { text-align: right; }
.np-flag__title { font-family: var(--serif); font-weight: 800; font-size: clamp(26px, 5vw, 46px); line-height: 1; letter-spacing: -0.02em; text-align: center; white-space: nowrap; }
.np-flag__title span { background: linear-gradient(transparent 64%, var(--accent) 64%); }
.np-date { display: flex; justify-content: space-between; gap: 10px; flex-wrap: wrap; padding: 7px 0; margin-bottom: 16px; border-bottom: 4px double var(--ink); font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; }
.np-date b { background: var(--accent); color: var(--on-accent); padding: 1px 6px; font-weight: 500; }

/* Story base */
.np .np-story { display: block; color: inherit; min-width: 0; }
.np-img { position: relative; overflow: hidden; border: 1px solid var(--ink); background: var(--paper-2); aspect-ratio: 4 / 3; }
.np-img img { object-fit: cover; filter: grayscale(1) contrast(1.1); transition: filter 0.35s; }
.np-story:hover .np-img img, .np-story:focus-visible .np-img img { filter: grayscale(0.2); }
.np-tag { display: inline-block; margin-bottom: 7px; font-family: var(--mono); font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; background: var(--accent); color: var(--on-accent); padding: 2px 6px; }
.np .np-h { font-family: var(--serif); font-weight: 800; letter-spacing: -0.01em; line-height: 1.15; margin: 0 0 7px; }
.np-story:hover .np-h { text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 3px; }
.np .np-sum { font-family: var(--np-body); font-size: 13.5px; line-height: 1.6; color: var(--ink-2); text-align: justify; hyphens: auto; -webkit-hyphens: auto; margin: 0; }
.np-meta { display: inline-flex; align-items: center; gap: 6px; margin-top: 9px; font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-3); }

/* Lead story: headline and text on the left, small photo on the right */
.np .np-story--lead { display: grid; grid-template-columns: minmax(0, 1fr) 190px; grid-template-areas: "body fig"; gap: 22px; align-items: start; padding-bottom: 4px; }
.np-story--lead .np-fig { grid-area: fig; padding-top: 4px; }
.np-story--lead .np-body { grid-area: body; }
.np .np-story--lead .np-h { font-size: clamp(24px, 3.6vw, 34px); line-height: 1.1; }
.np .np-story--lead .np-sum { font-size: 15px; }

/* Secondary stories sit in ruled columns with a small thumbnail beside the text */
.np-cols { display: grid; margin-top: 18px; border-top: 3px solid var(--ink); }
.np-cols--2 { grid-template-columns: 1fr 1fr; }
.np-cols--1 { grid-template-columns: 1fr; }
.np .np-cols .np-story { display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 14px; align-items: start; padding: 16px 0 0; }
.np-cols--2 .np-story:first-child { padding-right: 20px; border-right: 1px solid var(--ink); }
.np-cols--2 .np-story:last-child { padding-left: 20px; }
.np .np-cols .np-h { font-size: 17px; }
.np .np-cols .np-sum { font-size: 13px; }
.np .np-cols--1 .np-story { grid-template-columns: 150px minmax(0, 1fr); gap: 18px; }
.np .np-cols--1 .np-h { font-size: 22px; }

.np-foot { display: flex; justify-content: space-between; gap: 10px; flex-wrap: wrap; margin-top: 20px; padding-top: 10px; border-top: 1px solid var(--ink); font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em; color: var(--ink-3); }

/* Controls */
.np-ctrl { display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; margin-top: 6px; }
.np-arrow { width: 40px; height: 40px; display: inline-flex; align-items: center; justify-content: center; border: 1.5px solid var(--ink); background: #fff; color: var(--ink); cursor: pointer; transition: background 0.15s, color 0.15s, transform 0.15s; }
.np-arrow:hover:not(:disabled) { background: var(--ink); color: var(--accent); transform: translateY(-1px); }
.np-arrow:disabled { opacity: 0.35; cursor: default; }
.np-tabs { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
.np-tab { display: inline-flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.08em; text-transform: uppercase; padding: 10px 12px; border: 1.5px solid var(--ink); background: #fff; color: var(--ink-2); cursor: pointer; transition: background 0.15s, color 0.15s, transform 0.15s; }
.np-tab span { font-weight: 600; }
.np-tab:hover { transform: translateY(-1px); background: var(--paper-2); }
.np-tab[aria-selected="true"] { background: var(--accent); color: var(--on-accent); box-shadow: 3px 3px 0 var(--ink); }
.np-hint { text-align: center; margin-top: 12px; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.08em; color: var(--ink-3); }

/* Tablet */
@media (max-width: 760px) {
    .np .np-story--lead { grid-template-columns: minmax(0, 1fr) 140px; gap: 16px; }
    .np .np-cols--1 .np-story { grid-template-columns: 120px minmax(0, 1fr); }
}

/* Phone: still reads like a newspaper, with small photos beside the text */
@media (max-width: 640px) {
    .np-stage { padding: 8px 12px 30px 12px; }
    .np-inner { padding: 14px 14px 18px; }
    .np-flag { grid-template-columns: 1fr; text-align: center; }
    .np-flag__side, .np-flag__side--r { display: none; }
    .np-date { font-size: 9px; letter-spacing: 0.08em; }
    .np .np-story--lead { grid-template-columns: minmax(0, 1fr) 104px; gap: 12px; }
    .np .np-story--lead .np-h { font-size: 21px; }
    .np .np-story--lead .np-sum { font-size: 13.5px; }
    .np-cols--2 { grid-template-columns: 1fr; }
    .np-cols--2 .np-story:first-child { padding-right: 0; border-right: 0; border-bottom: 1px solid var(--ink); padding-bottom: 16px; }
    .np-cols--2 .np-story:last-child { padding-left: 0; }
    .np .np-cols .np-story, .np .np-cols--1 .np-story { grid-template-columns: 84px minmax(0, 1fr); gap: 12px; }
    .np .np-cols .np-h, .np .np-cols--1 .np-h { font-size: 16px; }
    .np .np-cols .np-sum { font-size: 12.5px; }
    .np-tab { padding: 10px 12px; }
    .np-tab em { display: none; }
}

@media (prefers-reduced-motion: reduce) {
    .np-paper, .np-img img { transition: none !important; }
}
`;

function Story({ story, lead, active }) {
    const Heading = lead ? "h2" : "h3";
    // Newspaper photos are small, so ask the browser for small files only.
    const sizes = lead ? "(max-width: 640px) 104px, 190px" : "(max-width: 640px) 84px, 150px";
    return (
        <Link
            href={`${BLOG_BASE}/${story.slug}`}
            className={`np-story${lead ? " np-story--lead" : ""}`}
            tabIndex={active ? 0 : -1}
            aria-hidden={active ? undefined : true}
        >
            <div className="np-fig">
                <div className="np-img">
                    <Image src={story.image} alt="" fill sizes={sizes} />
                </div>
            </div>
            <div className="np-body">
                <span className="np-tag">{story.tag}</span>
                <Heading className="np-h">{story.title}</Heading>
                <p className="np-sum">{story.summary}</p>
                <span className="np-meta">
                    {story.date} · Read story <ArrowRight size={11} />
                </span>
            </div>
        </Link>
    );
}

export default function NewspaperStack() {
    const [active, setActive] = useState(0);
    const last = editions.length - 1;

    const posFor = (i) => {
        const offset = i - active;
        if (offset < 0) return "out";
        if (offset >= 3) return "3";
        return String(offset);
    };

    return (
        <div className="np">
            <style>{CSS}</style>

            <div className="np-stage">
                {editions.map((ed, i) => {
                    const isActive = i === active;
                    const [lead, ...rest] = ed.stories;
                    return (
                        <div key={ed.label} className="np-paper" data-pos={posFor(i)}>
                            <div className="np-inner">
                                <div className="np-flag">
                                    <div className="np-flag__side">
                                        Vol. 1 · No. {i + 1}
                                        <br />
                                        {ed.label}
                                    </div>
                                    <div className="np-flag__title">
                                        Sir-AD <span>Blog</span>
                                    </div>
                                    <div className="np-flag__side np-flag__side--r">
                                        Abuja, Nigeria
                                        <br />
                                        Free to read
                                    </div>
                                </div>
                                <div className="np-date">
                                    <b>{ed.label}</b>
                                    <span>{ed.dateline}</span>
                                    <span>{ed.stories.length} stories</span>
                                </div>

                                <Story story={lead} lead active={isActive} />

                                <div className={`np-cols np-cols--${rest.length}`}>
                                    {rest.map((s) => (
                                        <Story key={s.slug} story={s} active={isActive} />
                                    ))}
                                </div>

                                <div className="np-foot">
                                    <span>Page {i + 1} of {editions.length}</span>
                                    <span>Subscribe above for the next edition</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="np-ctrl">
                <button
                    type="button"
                    className="np-arrow"
                    onClick={() => setActive((a) => Math.max(0, a - 1))}
                    disabled={active === 0}
                    aria-label="Previous edition"
                >
                    <ChevronLeft size={18} />
                </button>

                <div className="np-tabs" role="tablist" aria-label="Newspaper editions">
                    {editions.map((ed, i) => (
                        <button
                            key={ed.label}
                            type="button"
                            role="tab"
                            aria-selected={i === active}
                            className="np-tab"
                            onClick={() => setActive(i)}
                        >
                            <span>{i + 1}</span>
                            <em style={{ fontStyle: "normal" }}>{ed.label}</em>
                        </button>
                    ))}
                </div>

                <button
                    type="button"
                    className="np-arrow"
                    onClick={() => setActive((a) => Math.min(last, a + 1))}
                    disabled={active === last}
                    aria-label="Next edition"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
            <p className="np-hint">Tap an edition to flip the paper, then tap any story to read it.</p>
        </div>
    );
}