"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CATEGORY_LABELS, getCategoryKey } from "@/lib/blogCategories";
import { articles } from "@/app/data/article";

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

/* 1 featured + SIDE_COUNT in the right list + MORE_COUNT underneath */
const SIDE_COUNT = 4;
const MORE_COUNT = 6;
const TOTAL = 1 + SIDE_COUNT + MORE_COUNT;

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

/* One compact row: thumbnail + category + title + byline */
function Row({ article }) {
    const date = formatDate(article.datePublished);
    return (
        <Link href={`/blog/${article.slug}`} className="ra-row">
            <div className="ra-row__media">
                <Cover src={article.image} alt={article.title} />
            </div>
            <div className="ra-row__body">
                <span className="ra-kick">{CATEGORY_LABELS[getCategoryKey(article)]}</span>
                <h3 className="ra-row__title">{article.title}</h3>
                <p className="ra-by">
                    By {article.postedBy || "Sir Brown AD"}
                    {date && <span> · {date}</span>}
                </p>
            </div>
        </Link>
    );
}

export default function RelatedArticles({ currentSlug }) {
    const [displayArticles, setDisplayArticles] = useState([]);

    useEffect(() => {
        const filtered = articles.filter((a) => a.slug !== currentSlug);
        const isTech = TECHNICAL_SLUGS.includes(currentSlug);
        const same = filtered.filter((a) =>
            isTech ? TECHNICAL_SLUGS.includes(a.slug) : !TECHNICAL_SLUGS.includes(a.slug)
        );
        const shuffle = (list) => [...list].sort(() => 0.5 - Math.random());

        // Same-topic posts first, then fill up from the rest if there aren't enough
        const picked = shuffle(same);
        if (picked.length < TOTAL) {
            const extra = shuffle(filtered.filter((a) => !same.includes(a)));
            picked.push(...extra);
        }
        setDisplayArticles(picked.slice(0, TOTAL));
    }, [currentSlug]);

    if (displayArticles.length === 0) return null;

    const [featured, ...rest] = displayArticles;
    const sideList = rest.slice(0, SIDE_COUNT);
    const moreList = rest.slice(SIDE_COUNT);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

                .ra-section {
                    --ra-paper-2: #f6f5f0;
                    --ra-ink: #0f1626; --ra-ink-3: #5f6677;
                    --ra-rule: #e4e2da; --ra-rule-dark: #111111;
                    --ra-accent: #e8ff47; --ra-kicker: #0b6b5a;
                    --ra-sans: 'Inter', system-ui, sans-serif;
                    --ra-mono: 'JetBrains Mono', 'Fira Code', monospace;
                    border-top: 1px solid var(--ra-rule-dark);
                    max-width: 1120px;
                    margin: 0 auto;
                    padding: 40px 24px 64px;
                    background: #fff;
                    color: var(--ra-ink);
                    font-family: var(--ra-sans);
                }
                .ra-section *, .ra-section *::before, .ra-section *::after { box-sizing: border-box; }
                .ra-section h2, .ra-section h3, .ra-section p { margin: 0; }
                .ra-section a { color: inherit; text-decoration: none; }

                /* Heading with vertical bar */
                .ra-heading { font-weight: 700; font-size: clamp(24px, 3vw, 30px); line-height: 1.1; border-left: 5px solid var(--ra-kicker); padding-left: 14px; margin-bottom: 34px; letter-spacing: -0.01em; }

                .ra-layout { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); gap: 40px; align-items: start; }

                .ra-kick { font-family: var(--ra-mono); font-size: 10.5px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ra-kicker); }
                .ra-by { font-size: 12.5px; font-weight: 600; color: var(--ra-ink-3); }
                .ra-by span { font-weight: 400; }

                .ra-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.45s ease; }
                .ra-ph { width: 100%; height: 100%; background: repeating-linear-gradient(45deg, #ebe8e0, #ebe8e0 6px, #e3e0d7 6px, #e3e0d7 12px); }

                /* Featured (left) */
                .ra-feature { display: flex; align-items: center; gap: 18px; }
                .ra-feature__media { width: 52%; aspect-ratio: 1 / 1.05; flex-shrink: 0; overflow: hidden; border: 1px solid var(--ra-rule-dark); background: var(--ra-paper-2); }
                .ra-feature:hover .ra-img { transform: scale(1.05); }
                .ra-feature__body { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
                .ra-feature__title { font-weight: 700; font-size: clamp(22px, 2.5vw, 30px); line-height: 1.2; letter-spacing: -0.01em; display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; }
                .ra-feature:hover .ra-feature__title { text-decoration: underline; text-decoration-color: var(--ra-accent); text-decoration-thickness: 4px; text-underline-offset: 4px; }

                /* Rows (right list + "More stories") */
                .ra-list { border-top: 2px solid var(--ra-rule-dark); }
                .ra-row { display: flex; gap: 14px; align-items: center; padding: 14px 6px 14px 0; border-bottom: 1px solid var(--ra-rule); transition: background 0.15s, padding 0.15s; }
                .ra-row:hover { background: var(--ra-paper-2); padding-left: 8px; }
                .ra-row__media { width: 92px; height: 78px; flex-shrink: 0; overflow: hidden; border: 1px solid var(--ra-rule); background: var(--ra-paper-2); }
                .ra-row:hover .ra-img { transform: scale(1.08); }
                .ra-row__body { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
                .ra-row__title { font-weight: 600; font-size: 16.5px; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
                .ra-row:hover .ra-row__title { text-decoration: underline; text-decoration-color: var(--ra-accent); text-decoration-thickness: 3px; text-underline-offset: 3px; }

                /* More stories (under the main block) */
                .ra-morewrap { margin-top: 48px; }
                .ra-subheading { font-weight: 700; font-size: 20px; line-height: 1.1; border-left: 5px solid var(--ra-kicker); padding-left: 12px; margin-bottom: 18px; letter-spacing: -0.01em; }
                .ra-morelist { display: grid; grid-template-columns: 1fr 1fr; column-gap: 40px; border-top: 2px solid var(--ra-rule-dark); }

                .ra-viewall { margin-top: 28px; display: inline-flex; align-items: center; gap: 8px; font-family: var(--ra-mono); font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; background: var(--ra-accent); color: #0a0a0b !important; border: 1.5px solid var(--ra-rule-dark); padding: 11px 16px; transition: background 0.15s, color 0.15s; }
                .ra-viewall:hover { background: var(--ra-rule-dark); color: var(--ra-accent) !important; }

                .ra-feature:focus-visible, .ra-row:focus-visible, .ra-viewall:focus-visible { outline: 2px solid var(--ra-rule-dark); outline-offset: 2px; }

                @media (max-width: 900px) {
                    .ra-layout { grid-template-columns: minmax(0, 1fr); gap: 32px; }
                    .ra-morelist { grid-template-columns: 1fr; }
                    .ra-morewrap { margin-top: 36px; }
                }
                @media (max-width: 560px) {
                    .ra-section { padding: 32px 18px 52px; }
                    .ra-feature { flex-direction: column; align-items: stretch; }
                    .ra-feature__media { width: 100%; aspect-ratio: 16 / 10; }
                    .ra-row__media { width: 80px; height: 70px; }
                    .ra-row__title { font-size: 15.5px; }
                    .ra-viewall { width: 100%; justify-content: center; }
                }
                @media (prefers-reduced-motion: reduce) { .ra-img, .ra-row { transition: none !important; } }
            `}</style>

            <section className="ra-section" aria-label="Related articles">
                <h2 className="ra-heading">Continue reading</h2>

                <div className="ra-layout">
                    {/* Featured */}
                    <Link href={`/blog/${featured.slug}`} className="ra-feature">
                        <div className="ra-feature__media">
                            <Cover src={featured.image} alt={featured.title} />
                        </div>
                        <div className="ra-feature__body">
                            <span className="ra-kick">{CATEGORY_LABELS[getCategoryKey(featured)]}</span>
                            <h3 className="ra-feature__title">{featured.title}</h3>
                            <p className="ra-by">
                                By {featured.postedBy || "Sir Brown AD"}
                                {formatDate(featured.datePublished) && (
                                    <span> · {formatDate(featured.datePublished)}</span>
                                )}
                            </p>
                        </div>
                    </Link>

                    {/* Right list */}
                    <div className="ra-list">
                        {sideList.map((article) => (
                            <Row key={article.slug} article={article} />
                        ))}
                    </div>
                </div>

                {/* 7 more underneath */}
                {moreList.length > 0 && (
                    <div className="ra-morewrap">
                        <h2 className="ra-subheading">More stories</h2>
                        <div className="ra-morelist">
                            {moreList.map((article) => (
                                <Row key={article.slug} article={article} />
                            ))}
                        </div>
                    </div>
                )}

                <Link href="/blog" className="ra-viewall">View all articles →</Link>
            </section>
        </>
    );
}