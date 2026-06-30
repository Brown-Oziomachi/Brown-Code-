"use client";

import { useState, useEffect } from "react";
import { articles } from "@/app/data/article";
import { Clock, ArrowUpRight } from "lucide-react";

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
    Math.max(1, Math.ceil((content?.split(" ").length || 0) / 200));

export default function RelatedArticles({ currentSlug }) {
    const [displayArticles, setDisplayArticles] = useState([]);

    useEffect(() => {
        const filtered = articles.filter((a) => a.slug !== currentSlug);
        const isTech = TECHNICAL_SLUGS.includes(currentSlug);
        let related = filtered.filter((a) =>
            isTech
                ? TECHNICAL_SLUGS.includes(a.slug)
                : !TECHNICAL_SLUGS.includes(a.slug)
        );
        if (related.length === 0) related = filtered;
        const shuffled = [...related].sort(() => 0.5 - Math.random());
        setDisplayArticles(shuffled.slice(0, 4));
    }, [currentSlug]);

    if (displayArticles.length === 0) return null;

    return (
        <>
            <style>{`
                .ra-section {
                    border-top: 1px solid var(--border);
                    padding: 48px 24px 64px;
                    max-width: 1120px;
                    margin: 0 auto;
                }

                .ra-header {
                    display: flex;
                    align-items: baseline;
                    justify-content: space-between;
                    gap: 16px;
                    margin-bottom: 28px;
                }

                .ra-header__title {
                    font-family: var(--font-serif);
                    font-size: 22px;
                    font-weight: 400;
                    color: var(--text-1);
                }

                .ra-header__label {
                    font-family: var(--font-mono);
                    font-size: 10px;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: var(--text-3);
                }

                /* ── Grid ── */
                .ra-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1px;
                    background: var(--border);
                    border: 1px solid var(--border);
                    overflow: hidden;
                }

                @media (max-width: 900px) { .ra-grid { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 560px) { .ra-grid { grid-template-columns: 1fr; } }

                /* ── Card ── */
                .ra-card {
                    display: flex;
                    flex-direction: column;
                    background: var(--surface);
                    text-decoration: none;
                    overflow: hidden;
                    position: relative;
                    transition: background 0.15s;
                }

                .ra-card:hover { background: #141417; }

                .ra-card::before {
                    content: '';
                    position: absolute;
                    left: 0; top: 0; bottom: 0;
                    width: 2px;
                    background: var(--accent);
                    transform: scaleY(0);
                    transform-origin: bottom;
                    transition: transform 0.2s ease;
                    z-index: 5;
                }

                .ra-card:hover::before { transform: scaleY(1); }

                .ra-card__img-wrap {
                    height: 140px;
                    background: var(--bg);
                    overflow: hidden;
                    flex-shrink: 0;
                    position: relative;
                }

                .ra-card__img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: 0.45;
                    filter: grayscale(25%);
                    transition: opacity 0.3s, transform 0.4s;
                }

                .ra-card:hover .ra-card__img {
                    opacity: 0.65;
                    transform: scale(1.04);
                }

                .ra-card__img-placeholder {
                    width: 100%; height: 100%;
                    background: repeating-linear-gradient(
                        45deg, transparent, transparent 6px,
                        rgba(255,255,255,0.015) 6px, rgba(255,255,255,0.015) 12px
                    );
                }

                .ra-card__body {
                    padding: 16px 18px 18px;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    flex: 1;
                }

                .ra-card__tag {
                    display: inline-block;
                    font-family: var(--font-mono);
                    font-size: 9px;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    padding: 2px 6px;
                    border-radius: 3px;
                    background: var(--accent-dim);
                    color: var(--accent);
                    border: 1px solid rgba(232,255,71,0.2);
                    line-height: 1;
                    align-self: flex-start;
                }

                .ra-card__title {
                    font-family: var(--font-serif);
                    font-size: 15px;
                    font-weight: 400;
                    line-height: 1.35;
                    color: var(--text-1);
                    transition: color 0.15s;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .ra-card:hover .ra-card__title { color: #fff; }

                .ra-card__meta {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: auto;
                    padding-top: 12px;
                }

                .ra-card__reading {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-family: var(--font-mono);
                    font-size: 10px;
                    color: var(--text-3);
                }

                .ra-card__arrow {
                    color: var(--text-3);
                    transition: color 0.15s, transform 0.15s;
                }

                .ra-card:hover .ra-card__arrow {
                    color: var(--accent);
                    transform: translate(2px, -2px);
                }

                 /* ── Meta ── */
                .bl-meta {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-family: var(--font-mono);
                    font-size: 11px;
                    color: var(--text-3);
                    margin-top: 12px;
                }

                .bl-meta--sm { font-size: 10px; margin-top: 10px; }
                .bl-meta__author { color: var(--text-2); }

                .bl-meta__dot {
                    width: 3px;
                    height: 3px;
                    border-radius: 50%;
                    background: var(--border-hi);
                    flex-shrink: 0;
                }
            `}</style>

            <section className="ra-section">
                <div className="ra-header">
                    <h2 className="ra-header__title">Continue reading</h2>
                    <span className="ra-header__label">{displayArticles.length} related</span>
                </div>

                <div className="ra-grid">
                    {displayArticles.map((article) => (
                        <a
                            key={article.slug}
                            href={`/blog/${article.slug}`}
                            className="ra-card"
                        >
                            <div className="ra-card__img-wrap">
                                {article.image ? (
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="ra-card__img"
                                        onError={(e) => (e.target.style.display = "none")}
                                        title={article.content.split(" ").slice(0, 250).join(" ") + "..."}
                                    />
                                ) : (
                                    <div className="ra-card__img-placeholder" />
                                )}
                            </div>
                            <div className="ra-card__body">
                                <span className="ra-card__tag">
                                    {TECHNICAL_SLUGS.includes(article.slug) ? "Engineering" : "Insights"}
                                </span>
                                <h3 className="ra-card__title">{article.title}</h3>
                                <div className="bl-meta bl-meta--sm">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={article.isSponsored ? "/coder1.png" : "/coder1.png"}
                                            className="h-5 w-5 rounded-full object-cover flex-shrink-0"
                                            alt={article.postedBy || "Author"}
                                        />
                                        <span className="bl-meta__author">{article.postedBy}</span>
                                        <span className="bl-meta__dot" />
                                        <span>{getReadingTime(article.content)} min read</span>
                                    </div>
                                </div>
                                <div className="ra-card__meta">
                                    <div className="ra-card__reading">
                                        <Clock size={11} />
                                        {getReadingTime(article.content)} min
                                    </div>
                                    <ArrowUpRight size={14} className="ra-card__arrow" />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        </>
    );
}