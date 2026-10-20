"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/app/data/article";
import { CATEGORY_LABELS, getCategoryKey } from "@/lib/blogCategories";

const TECHNICAL_SLUGS = [
    "moving-from-social-media-to-digital-asset",
    "importance-of-a-personal-portfolio",
    "why-branding-matters-online",
    "power-of-ecommerce-global-sales",
    "building-trust-online-cro",
    "why-website-speed-matters",
    "content-marketing-winning-with-value",
    "how-users-help-ai-companies-make-billions",
    "smart-automation-business-autopilot",
    "cybersecurity-essentials-online-business",
    "how-to-build-your-first-website",
    "seo-fundamentals-getting-found",
    "content-marketing-personal-brands",
    "networking-digital-era",
    "data-driven-decisions-web-analytics",
];

const getReadingTime = (content) =>
    Math.max(1, Math.ceil(((content || "").split(" ").length || 0) / 200));

const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

/* Image with a clean fallback instead of a blank hole */
function Cover({ src, alt }) {
    const [failed, setFailed] = useState(false);
    if (!src || failed) return <div className="ra-ph" aria-hidden="true" />;
    return (
        <img
            src={src}
            alt={alt}
            className="ra-img"
            loading="lazy"
            onError={() => setFailed(true)}
        />
    );
}

export default function RelatedArticles({ currentSlug }) {
    const [displayArticles, setDisplayArticles] = useState([]);

    useEffect(() => {
        const filtered = articles.filter((a) => a.slug !== currentSlug);
        const isTech = TECHNICAL_SLUGS.includes(currentSlug);
        let related = filtered.filter((a) =>
            isTech ? TECHNICAL_SLUGS.includes(a.slug) : !TECHNICAL_SLUGS.includes(a.slug)
        );
        if (related.length === 0) related = filtered;
        const shuffled = [...related].sort(() => 0.5 - Math.random());
        setDisplayArticles(shuffled.slice(0, 4));
    }, [currentSlug]);

    if (displayArticles.length === 0) return null;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

                .ra-section {
                    --ra-paper-2: #f6f5f0; --ra-card: #ffffff;
                    --ra-ink: #111111; --ra-ink-3: #6f6f6f;
                    --ra-rule: #e4e2da; --ra-rule-dark: #111111;
                    --ra-accent: #e8ff47; --ra-on: #0a0a0b;
                    --ra-serif: 'Playfair Display', Georgia, serif;
                    --ra-mono: 'JetBrains Mono', 'Fira Code', monospace;
                    border-top: 3px solid var(--ra-rule-dark);
                    max-width: 1120px;
                    margin: 0 auto;
                    padding: 48px 24px 64px;
                    background: #fff;
                    color: var(--ra-ink);
                }
                .ra-section *, .ra-section *::before, .ra-section *::after { box-sizing: border-box; }
                .ra-section h2, .ra-section h3 { margin: 0; }

                .ra-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 26px; }
                .ra-kicker { font-family: var(--ra-mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; background: var(--ra-accent); color: var(--ra-on); padding: 2px 7px; width: fit-content; margin-bottom: 10px; }
                .ra-title { font-family: var(--ra-serif); font-weight: 800; font-size: clamp(26px, 3.6vw, 36px); line-height: 1.1; }
                .ra-note { font-family: var(--ra-mono); font-size: 11px; color: var(--ra-ink-3); }

                .ra-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
                @media (max-width: 1000px) { .ra-grid { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 560px) { .ra-grid { grid-template-columns: 1fr; } }

                .ra-card { display: flex; flex-direction: column; text-decoration: none; color: inherit; background: var(--ra-card); border: 1px solid var(--ra-rule-dark); transition: transform 0.2s, box-shadow 0.2s; }
                .ra-card:hover { transform: translate(-3px, -3px); box-shadow: 6px 6px 0 var(--ra-accent); }

                .ra-media { position: relative; height: 140px; background: var(--ra-paper-2); overflow: hidden; border-bottom: 1px solid var(--ra-rule-dark); flex-shrink: 0; }
                .ra-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.45s ease; }
                .ra-card:hover .ra-img { transform: scale(1.04); }
                .ra-ph { width: 100%; height: 100%; background: repeating-linear-gradient(45deg, #ebe8e0, #ebe8e0 6px, #e3e0d7 6px, #e3e0d7 12px); }

                .ra-chip { position: absolute; top: 12px; left: 12px; font-family: var(--ra-mono); font-size: 9px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; background: var(--ra-accent); color: var(--ra-on); padding: 4px 9px; border: 1px solid var(--ra-rule-dark); }

                .ra-body { padding: 16px 16px 14px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
                .ra-card-title { font-family: var(--ra-serif); font-weight: 800; font-size: 17px; line-height: 1.25; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
                .ra-card:hover .ra-card-title { text-decoration: underline; text-underline-offset: 3px; }

                .ra-meta { margin-top: auto; padding-top: 12px; border-top: 1px solid var(--ra-rule); display: flex; align-items: center; justify-content: space-between; gap: 8px; font-family: var(--ra-mono); font-size: 10.5px; color: var(--ra-ink-3); }
                .ra-meta__left { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
                .ra-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--ra-ink-3); flex-shrink: 0; }
                .ra-arrow { color: var(--ra-ink); flex-shrink: 0; transition: transform 0.15s; }
                .ra-card:hover .ra-arrow { transform: translate(2px, -2px); }

                .ra-card:focus-visible { outline: 2px solid var(--ra-rule-dark); outline-offset: 2px; }
                @media (max-width: 640px) { .ra-section { padding: 40px 18px 56px; } }
                @media (prefers-reduced-motion: reduce) { .ra-card, .ra-img, .ra-arrow { transition: none !important; } }
            `}</style>

            <section className="ra-section" aria-label="Related articles">
                <div className="ra-head">
                    <div>
                        <div className="ra-kicker">Keep going</div>
                        <h2 className="ra-title">Continue reading</h2>
                    </div>
                    <span className="ra-note">{displayArticles.length} related</span>
                </div>

                <div className="ra-grid">
                    {displayArticles.map((article) => {
                        const date = formatDate(article.datePublished);
                        return (
                            <Link key={article.slug} href={`/blog/${article.slug}`} className="ra-card">
                                <div className="ra-media">
                                    <Cover src={article.image} alt={article.title} />
                                    <span className="ra-chip">
                                        {CATEGORY_LABELS[getCategoryKey(article)]}
                                    </span>
                                </div>
                                <div className="ra-body">
                                    <h3 className="ra-card-title">{article.title}</h3>
                                    <div className="ra-meta">
                                        <div className="ra-meta__left">
                                            <span>{getReadingTime(article.content)} min read</span>
                                            {date && (
                                                <>
                                                    <span className="ra-dot" />
                                                    <span>{date}</span>
                                                </>
                                            )}
                                        </div>
                                        <ArrowUpRight size={14} className="ra-arrow" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </>
    );
}