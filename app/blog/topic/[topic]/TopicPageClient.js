"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronDown, Mail } from "lucide-react";
import { CATEGORIES } from "@/lib/blogCategories";
import Footer from "@/components/footer";

/* ── helpers ─────────────────────────────────────────── */

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
    if (!src || failed) return <div className="tp-ph" aria-hidden="true" />;
    return (
        <img
            src={src}
            alt={alt}
            className="tp-img"
            loading="lazy"
            onError={() => setFailed(true)}
        />
    );
}

function ArticleCard({ article, fallbackLabel }) {
    const date = formatDate(article.datePublished);
    return (
        <Link href={`/blog/${article.slug}`} className="tp-card">
            <div className="tp-card__media">
                <Cover src={article.image} alt={article.title} />
                <span className="tp-chip">{article.categoryLabel || fallbackLabel}</span>
            </div>
            <div className="tp-card__body">
                <h3 className="tp-card__title">{article.title}</h3>
                <p className="tp-card__preview">{article.preview}</p>
                <div className="tp-meta">
                    {article.readingTime && <span>{article.readingTime} min read</span>}
                    {article.readingTime && date && <span className="tp-meta__dot" />}
                    {date && <span>{date}</span>}
                </div>
            </div>
        </Link>
    );
}

/* ── page ────────────────────────────────────────────── */

// `topic`, `label`, and the already-filtered, already-lightened `articles`
// list all arrive as props from the server component (page.js).
export default function TopicPageClient({ topic, label, articles: topicArticles }) {
    const router = useRouter();

    const [isSticky, setIsSticky] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 120);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

                .tp-page {
                    --paper: #000000; --paper-2: #121212; --card: #0d0d0d;
                    --ink: #f4f1ea; --ink-2: #bdb8ae; --ink-3: #85807a;
                    --rule: #242424; --rule-dark: #3a3a3a;
                    --accent: #e8ff47; --on-accent: #0a0a0b;
                    --serif: 'Playfair Display', Georgia, serif;
                    --sans: 'Inter', system-ui, sans-serif;
                    --mono: 'JetBrains Mono', 'Fira Code', monospace;
                    background: var(--paper); color: var(--ink); font-family: var(--sans); min-height: 100vh;
                }
                .tp-page *, .tp-page *::before, .tp-page *::after { box-sizing: border-box; }
                :where(.tp-page a) { color: inherit; }
                .tp-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }

                /* Nav */
                .tp-nav { position: sticky; top: 0; z-index: 1000; background: rgba(0,0,0,0.78); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); border-bottom: 1px solid var(--rule-dark); }
                .tp-nav__inner { max-width: 1120px; margin: 0 auto; padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
                .tp-nav__brand { font-family: var(--serif); font-weight: 800; font-size: 21px; letter-spacing: -0.01em; color: var(--ink); text-decoration: none; }
                .tp-nav__brand em { color: var(--accent); font-style: normal; }

                /* Buttons */
                .tp-btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em; padding: 10px 16px; border: 1px solid var(--rule-dark); background: transparent; color: var(--ink); cursor: pointer; text-decoration: none; transition: background 0.15s, color 0.15s, transform 0.15s; }
                .tp-btn:hover { background: var(--ink); color: var(--paper); transform: translateY(-1px); }
                .tp-btn--solid { background: var(--accent); border-color: var(--accent); color: var(--on-accent); font-weight: 500; }
                .tp-btn--solid:hover { background: #d4e63c; border-color: #d4e63c; color: var(--on-accent); }

                /* Masthead */
                .tp-mast { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; padding: 52px 0 30px; border-bottom: 3px double var(--rule-dark); flex-wrap: wrap; }
                .tp-kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); margin-bottom: 10px; }
                .tp-mast__title { font-family: var(--serif); font-weight: 800; font-size: clamp(36px, 6vw, 64px); line-height: 1.05; letter-spacing: -0.01em; color: var(--ink); }
                .tp-mast__desc { font-family: var(--mono); font-size: 11px; color: var(--ink-3); border-left: 3px solid var(--accent); padding-left: 14px; }

                /* Category dropdown */
                .tp-cats { position: relative; margin: 28px 0 36px; width: fit-content; }
                .tp-cats--sticky { position: sticky; top: 60px; z-index: 50; margin: 0 0 24px; padding: 10px 0; background: var(--paper); }
                .tp-cats__trigger { display: inline-flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 11px; font-weight: 600; letter-spacing: 0.06em; color: var(--on-accent); background: var(--accent); border: 1px solid var(--accent); padding: 9px 14px; cursor: pointer; transition: background 0.15s; }
                .tp-cats__trigger:hover { background: #d4e63c; }
                .tp-cats__chev { transition: transform 0.2s ease; }
                .tp-cats__chev--open { transform: rotate(180deg); }
                .tp-cats__menu { position: absolute; top: calc(100% + 6px); left: 0; z-index: 60; display: flex; flex-direction: column; min-width: 210px; background: var(--card); border: 1px solid var(--rule-dark); box-shadow: 5px 5px 0 var(--accent); animation: tpDrop 0.15s ease-out; }
                @keyframes tpDrop { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
                .tp-cats__item { font-family: var(--mono); font-size: 11px; letter-spacing: 0.05em; color: var(--ink-2); text-decoration: none; padding: 11px 14px; border-bottom: 1px solid var(--rule); transition: background 0.15s, color 0.15s; }
                .tp-cats__item:last-child { border-bottom: none; }
                .tp-cats__item:hover { background: var(--accent); color: var(--on-accent); }
                .tp-cats__item--active { color: var(--accent); }
                .tp-cats__item--active:hover { color: var(--on-accent); }

                /* Cards: bright, short images */
                .tp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
                @media (max-width: 1100px) { .tp-grid { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 560px) { .tp-grid { grid-template-columns: 1fr; } }
                .tp-card { display: flex; flex-direction: column; background: var(--card); border: 1px solid var(--rule-dark); text-decoration: none; transition: transform 0.2s, box-shadow 0.2s; }
                .tp-card:hover { transform: translate(-3px, -3px); box-shadow: 5px 5px 0 var(--accent); }
                .tp-card__media { position: relative; height: 140px; background: #fff; overflow: hidden; border-bottom: 1px solid var(--rule-dark); }
                .tp-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.45s ease; }
                .tp-card:hover .tp-img { transform: scale(1.04); }
                .tp-ph { width: 100%; height: 100%; background: repeating-linear-gradient(45deg, #101010, #101010 6px, #171717 6px, #171717 12px); }
                .tp-chip { position: absolute; top: 12px; left: 12px; font-family: var(--mono); font-size: 9px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; background: var(--accent); color: var(--on-accent); padding: 4px 9px; }
                .tp-card__body { padding: 18px 18px 16px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
                .tp-card__title { font-family: var(--serif); font-weight: 800; font-size: 18px; line-height: 1.25; color: var(--ink); }
                .tp-card:hover .tp-card__title { color: var(--accent); }
                .tp-card__preview { font-size: 13px; line-height: 1.65; color: var(--ink-3); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
                .tp-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-family: var(--mono); font-size: 10.5px; color: var(--ink-3); margin-top: auto; padding-top: 12px; border-top: 1px solid var(--rule); }
                .tp-meta__dot { width: 3px; height: 3px; border-radius: 50%; background: var(--ink-3); flex-shrink: 0; }

                /* Empty */
                .tp-empty { padding: 80px 0; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; }
                .tp-empty__title { font-family: var(--serif); font-weight: 800; font-size: 28px; color: var(--ink); }
                .tp-empty__msg { font-size: 14px; color: var(--ink-2); }

                /* Bottom CTA */
                .tp-cta { border-top: 3px double var(--rule-dark); padding: 40px 0 80px; margin-top: 64px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
                .tp-cta__text { font-family: var(--serif); font-weight: 800; font-size: clamp(20px, 2.6vw, 26px); line-height: 1.2; max-width: 520px; }
                .tp-cta__actions { display: flex; flex-wrap: wrap; gap: 10px; }

                @media (max-width: 640px) {
                    .tp-wrap { padding: 0 18px; }
                    .tp-mast { padding-top: 32px; }
                    .tp-cta__actions .tp-btn { flex: 1 1 auto; }
                }

                .tp-page :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
                @media (prefers-reduced-motion: reduce) { .tp-page * { transition: none !important; } }
            `}</style>

            <div className="tp-page">
                <header className="tp-nav">
                    <div className="tp-nav__inner">
                        <Link href="/" className="tp-nav__brand">brown<em>.</em>dev</Link>
                        <Link href="/blog" className="tp-btn">
                            <ArrowLeft size={12} /> All articles
                        </Link>
                    </div>
                </header>

                <main className="tp-wrap">
                    <header className="tp-mast">
                        <div>
                            <p className="tp-kicker">Topic</p>
                            <h1 className="tp-mast__title">{label}</h1>
                        </div>
                        <p className="tp-mast__desc">
                            {topicArticles.length} article{topicArticles.length !== 1 ? "s" : ""} in this topic
                        </p>
                    </header>

                    <div ref={dropdownRef} className={`tp-cats${isSticky ? " tp-cats--sticky" : ""}`}>
                        <button
                            className="tp-cats__trigger"
                            onClick={() => setIsOpen((prev) => !prev)}
                            aria-expanded={isOpen}
                        >
                            {label}
                            <ChevronDown size={14} className={`tp-cats__chev${isOpen ? " tp-cats__chev--open" : ""}`} />
                        </button>

                        {isOpen && (
                            <div className="tp-cats__menu">
                                {CATEGORIES.map((cat) => (
                                    <Link
                                        key={cat.key}
                                        href={`/blog/topic/${cat.key}`}
                                        className={`tp-cats__item${cat.key === topic ? " tp-cats__item--active" : ""}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {cat.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {topicArticles.length === 0 ? (
                        <div className="tp-empty">
                            <h2 className="tp-empty__title">Nothing here yet</h2>
                            <p className="tp-empty__msg">Nothing published in {label} yet.</p>
                            <Link href="/blog" className="tp-btn">
                                <ArrowLeft size={12} /> Browse all articles
                            </Link>
                        </div>
                    ) : (
                        <div className="tp-grid">
                            {topicArticles.map((a) => (
                                <ArticleCard key={a.slug} article={a} fallbackLabel={label} />
                            ))}
                        </div>
                    )}

                    <div className="tp-cta">
                        <p className="tp-cta__text">Keep reading, or tell me about what you&apos;re building.</p>
                        <div className="tp-cta__actions">
                            <button className="tp-btn" onClick={() => router.push("/blog")}>
                                <ArrowLeft size={12} /> All articles
                            </button>
                            <button className="tp-btn tp-btn--solid" onClick={() => router.push("/bc/contact")}>
                                <Mail size={12} /> Get in touch
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            <Footer />
        </>
    );
}