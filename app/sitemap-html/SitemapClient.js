"use client";

import Link from "next/link";
import { Terminal, Compass, Globe, ArrowLeft, ArrowRight } from "lucide-react";
import Footer from "@/components/footer";

const blogSlugs = [
    "moving-from-social-media-to-digital-asset",
    "how-users-help-ai-companies-make-billions",
    "mastering-local-seo-for-startups",
    "power-of-ecommerce-global-sales",
    "building-trust-online-cro",
    "why-website-speed-matters",
    "smart-automation-business-autopilot",
    "cybersecurity-essentials-online-business",
    "content-marketing-winning-with-value",
];

const corePages = [
    { name: "Home", href: "/portfolio" },
    { name: "About", href: "/bc/about" },
    { name: "Blog", href: "/blog" },
    { name: "Tech News", href: "/tech-news" },
    { name: "Contact", href: "/bc/contact" },
    { name: "Projects", href: "/bc/projects" },
    { name: "Advertise", href: "/advertise" },
    { name: "Jobs", href: "/jobs" },
    { name: "Scam Checker", href: "/client/scam-checker" },
    { name: "CV / Resume", href: "/cv" },
    { name: "FAQ", href: "/faq" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
];

const seoNodes = [
    { name: "Hire Web Developer, Abuja", href: "/brown-code/hire-web-developer-abuja" },
    { name: "Cheap Web Developer, Nigeria", href: "/brown-code/cheap-web-developer-in-nigeria" },
    { name: "Software Developer, Nigeria", href: "/brown-code/software-developer-nigeria" },
    { name: "Software Developer, Africa", href: "/brown-code/software-developer-africa" },
    { name: "Web Developer, Abuja", href: "/brown-code/web-developer-abuja" },
    { name: "Web Developer, Nigeria", href: "/brown-code/web-developer-nigeria" },
    { name: "Get a Website", href: "/get-a-website" },
];

const totalRoutes = corePages.length + blogSlugs.length + seoNodes.length;

export default function SitemapClient() {
    const stats = [
        { value: corePages.length, label: "Core pages" },
        { value: blogSlugs.length, label: "Articles listed" },
        { value: totalRoutes, label: "Total routes" },
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

                .sm-page {
                    --paper: #ffffff; --paper-2: #f6f5f0;
                    --ink: #111111; --ink-2: #3f3f3f; --ink-3: #6f6f6f;
                    --rule: #e4e2da; --rule-dark: #111111;
                    --accent: #e8ff47; --on-accent: #0a0a0b;
                    --serif: 'Playfair Display', Georgia, serif;
                    --sans: 'Inter', system-ui, sans-serif;
                    --mono: 'JetBrains Mono', 'Fira Code', monospace;
                    background: var(--paper); color: var(--ink); font-family: var(--sans); min-height: 100vh;
                }
                .sm-page *, .sm-page *::before, .sm-page *::after { box-sizing: border-box; }
                .sm-page h1, .sm-page h2, .sm-page p { margin: 0; }
                :where(.sm-page a) { color: inherit; text-decoration: none; }
                .sm-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }

                .sm-nav { position: sticky; top: 0; z-index: 1000; background: rgba(255,255,255,0.92); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); border-bottom: 1px solid var(--rule); }
                .sm-nav__inner { max-width: 1120px; margin: 0 auto; padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
                .sm-nav__brand { font-family: var(--serif); font-weight: 800; font-size: 21px; letter-spacing: -0.01em; }
                .sm-nav__brand em { font-style: normal; background: var(--accent); padding: 0 3px; }

                .sm-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em; padding: 10px 16px; border: 1.5px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; transition: background 0.15s, color 0.15s, transform 0.15s; }
                .sm-btn:hover { background: var(--ink); color: #fff; transform: translateY(-1px); }
                .sm-btn--solid { background: var(--accent); color: var(--on-accent); font-weight: 600; }
                .sm-btn--solid:hover { background: var(--ink); color: var(--accent); }

                .sm-head { padding: 64px 0 36px; display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
                .sm-kicker { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; background: var(--accent); color: var(--on-accent); padding: 4px 10px; width: fit-content; margin-bottom: 20px; }
                .sm-title { font-family: var(--serif); font-weight: 800; font-size: clamp(38px, 6.4vw, 76px); line-height: 1.02; letter-spacing: -0.025em; }
                .sm-title em { font-style: italic; background: linear-gradient(transparent 62%, var(--accent) 62%); }
                .sm-dek { max-width: 340px; font-size: 15px; line-height: 1.7; font-weight: 300; color: var(--ink-2); border-left: 3px solid var(--accent); padding-left: 16px; }

                .sm-stats { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 3px solid var(--ink); border-bottom: 1px solid var(--rule); margin-bottom: 48px; }
                .sm-stat { padding: 20px 20px 18px 0; }
                .sm-stat + .sm-stat { padding-left: 20px; border-left: 1px solid var(--rule); }
                .sm-stat__value { font-family: var(--serif); font-weight: 800; font-size: 44px; line-height: 1; }
                .sm-stat__label { margin-top: 6px; font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-3); }

                .sm-cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: start; }
                @media (max-width: 900px) { .sm-cols { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 600px) { .sm-cols { grid-template-columns: 1fr; } .sm-stat__value { font-size: 32px; } }

                .sm-col { background: #fff; border: 1px solid var(--ink); }
                .sm-col__head { display: flex; align-items: center; gap: 10px; padding: 14px 18px; background: var(--ink); color: #f4f1ea; }
                .sm-col__icon { color: var(--accent); flex-shrink: 0; }
                .sm-col__title { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; }
                .sm-col__count { margin-left: auto; font-family: var(--mono); font-size: 10px; background: var(--accent); color: var(--on-accent); padding: 2px 7px; font-weight: 600; }
                .sm-col__list { display: flex; flex-direction: column; }

                .sm-link { display: flex; align-items: center; gap: 10px; padding: 12px 18px; border-bottom: 1px solid var(--rule); font-size: 14px; color: var(--ink-2); transition: background 0.12s, color 0.12s; }
                .sm-link:last-child { border-bottom: none; }
                .sm-link:hover { background: var(--accent); color: var(--ink); }
                .sm-link__text { flex: 1; text-transform: capitalize; line-height: 1.4; }
                .sm-link__arrow { flex-shrink: 0; color: var(--ink-3); transition: transform 0.15s, color 0.15s; }
                .sm-link:hover .sm-link__arrow { color: var(--ink); transform: translateX(3px); }
                .sm-link--slug { font-size: 13px; }

                .sm-foot { margin-top: 72px; background: var(--ink); color: #f4f1ea; border-top: 5px solid var(--accent); padding: 32px 36px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
                @media (max-width: 640px) { .sm-foot { padding: 24px 20px; } }
                .sm-foot__info { font-family: var(--serif); font-weight: 800; font-size: 22px; line-height: 1.2; }
                .sm-foot__actions { display: flex; gap: 10px; flex-wrap: wrap; }
                .sm-foot .sm-btn { border-color: #f4f1ea; color: #f4f1ea; }
                .sm-foot .sm-btn:hover { background: #f4f1ea; color: var(--ink); }
                .sm-foot .sm-btn--solid { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
                .sm-foot .sm-btn--solid:hover { background: #fff; border-color: #fff; color: var(--ink); }
                .sm-end { height: 24px; }

                @media (max-width: 640px) { .sm-wrap, .sm-nav__inner { padding-left: 18px; padding-right: 18px; } .sm-head { padding-top: 40px; } }
                .sm-page :focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
                @media (prefers-reduced-motion: reduce) { .sm-page * { transition: none !important; } }
            `}</style>

            <div className="sm-page">

                <main className="sm-wrap">
                    <header className="sm-head">
                        <div>
                            <p className="sm-kicker">Navigation</p>
                            <h1 className="sm-title">Site <em>directory.</em></h1>
                        </div>
                        <p className="sm-dek">Every page, article and regional page on the site, in one place.</p>
                    </header>

                    <div className="sm-stats">
                        {stats.map((s) => (
                            <div key={s.label} className="sm-stat">
                                <div className="sm-stat__value">{s.value}</div>
                                <div className="sm-stat__label">{s.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="sm-cols">
                        <section className="sm-col">
                            <div className="sm-col__head">
                                <Compass size={14} className="sm-col__icon" />
                                <h2 className="sm-col__title">Core pages</h2>
                                <span className="sm-col__count">{corePages.length}</span>
                            </div>
                            <div className="sm-col__list">
                                {corePages.map((p) => (
                                    <Link key={p.href} href={p.href} className="sm-link">
                                        <span className="sm-link__text">{p.name}</span>
                                        <ArrowRight size={12} className="sm-link__arrow" />
                                    </Link>
                                ))}
                            </div>
                        </section>

                        <section className="sm-col">
                            <div className="sm-col__head">
                                <Terminal size={14} className="sm-col__icon" />
                                <h2 className="sm-col__title">Articles</h2>
                                <span className="sm-col__count">{blogSlugs.length}</span>
                            </div>
                            <div className="sm-col__list">
                                {blogSlugs.map((slug) => (
                                    <Link key={slug} href={`/blog/${slug}`} className="sm-link sm-link--slug">
                                        <span className="sm-link__text">{slug.replace(/-/g, " ")}</span>
                                        <ArrowRight size={12} className="sm-link__arrow" />
                                    </Link>
                                ))}
                            </div>
                        </section>

                        <section className="sm-col">
                            <div className="sm-col__head">
                                <Globe size={14} className="sm-col__icon" />
                                <h2 className="sm-col__title">Regional pages</h2>
                                <span className="sm-col__count">{seoNodes.length}</span>
                            </div>
                            <div className="sm-col__list">
                                {seoNodes.map((p) => (
                                    <Link key={p.href} href={p.href} className="sm-link">
                                        <span className="sm-link__text">{p.name}</span>
                                        <ArrowRight size={12} className="sm-link__arrow" />
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </div>

                    <section className="sm-foot">
                        <p className="sm-foot__info">Cannot find what you need?</p>
                        <div className="sm-foot__actions">
                            <Link href="/bc/contact" className="sm-btn sm-btn--solid">Get in touch</Link>
                            <Link href="/portfolio" className="sm-btn"><ArrowLeft size={12} /> Portfolio</Link>
                        </div>
                    </section>
                    <div className="sm-end" />
                </main>

                <Footer />
            </div>
        </>
    );
}