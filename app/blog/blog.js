"use client";

import { useRouter } from "next/navigation";
import { articles } from "../data/article";
import { ArrowLeft, ArrowUpRight, Search, X, Clock, User } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "@/components/footer";

// ─── helpers ────────────────────────────────────────────────────────────────
const getReadingTime = (content) =>
    Math.max(1, Math.ceil(content.split(" ").length / 200));

const CATEGORIES = [
    { key: "all", label: "All posts" },
    { key: "architecture", label: "Architecture" },
    { key: "engineering", label: "Engineering" },
    { key: "technology", label: "Technology" },
];

const architectureSlugs = [
    "why-you-need-a-website",
    "importance-of-a-personal-portfolio",
    "why-branding-matters-online",
    "future-proofing-your-career-online",
];
const engineeringSlugs = [
    "how-to-build-your-first-website",
    "seo-fundamentals-getting-found",
    "content-marketing-personal-brands",
    "networking-digital-era",
];

const getCategoryKey = (slug) => {
    if (architectureSlugs.includes(slug)) return "architecture";
    if (engineeringSlugs.includes(slug)) return "engineering";
    return "technology";
};

const CATEGORY_LABELS = {
    architecture: "Architecture",
    engineering: "Engineering",
    technology: "Technology",
};

// ─── sub-components ─────────────────────────────────────────────────────────

/** Featured (large) card — first 2 articles */
/** Featured (large) card — first 2 articles */
const FeaturedCard = ({ article }) => (
    <a href={`/blog/${article.slug}`} className="bl-feat-card">
        <div className="bl-feat-card__img-wrap">
            {article.image ? (
                <img
                    src={article.image}
                    alt={article.title}
                    className="bl-feat-card__img"
                    onError={(e) => (e.target.style.display = "none")}
                />
            ) : (
                <div className="bl-feat-card__img-placeholder" />
            )}
            <div className="bl-feat-card__overlay" />
        </div>
        <div className="bl-feat-card__body">
            <span className="bl-tag">{CATEGORY_LABELS[getCategoryKey(article.slug)]}</span>
            <h2 className="bl-feat-card__title">{article.title}</h2>
            <p className="bl-feat-card__preview">{article.preview}</p>
            <div className="bl-meta">
                <div className="flex items-center gap-2">
                    <img
                        src="/coder1.png"
                        className="h-5 w-5 rounded-full"
                        alt={article.postedBy}
                    />
                    <span className="bl-meta__author">{article.postedBy}</span>
                    <span className="bl-meta__dot" />
                    <span>{getReadingTime(article.content)} min read</span>
                </div>
            </div>
        </div>
        <span className="bl-feat-card__arrow-wrap">
            <ArrowUpRight size={14} className="bl-feat-card__arrow" />
        </span>
    </a>
);

/** Standard card — grid of remaining articles */
const ArticleCard = ({ article, index }) => (

    <a href = {`/blog/${article.slug}`}
className = "bl-card"
style = {{ animationDelay: `${index * 40}ms` }}
    >
        <div className="bl-card__img-wrap">
            {article.image ? (
                <img
                    src={article.image}
                    alt={article.title}
                    className="bl-card__img"
                    onError={(e) => (e.target.style.display = "none")}
                />
            ) : (
                <div className="bl-card__img-placeholder" />
            )}
        </div>
        <div className="bl-card__body">
            <span className="bl-tag bl-tag--sm">
                {CATEGORY_LABELS[getCategoryKey(article.slug)]}
            </span>
            <h3 className="bl-card__title">{article.title}</h3>
            <p className="bl-card__preview">{article.preview}</p>
            <div className="bl-meta bl-meta--sm">
                <div className="flex items-center gap-2">
                    <img
                        src={article.isSponsored ? "/coder1.png" : "/coder1.png"}
                        className="h-5 w-5 rounded-full object-cover"
                        alt={article.postedBy || "Author"}
                    />
                    <span className="bl-meta__author">{article.postedBy}</span>
                    <span className="bl-meta__dot" />
                    <span>{getReadingTime(article.content)} min read</span>
                </div>
            </div>
        </div>
    </a >
);

// ─── page ────────────────────────────────────────────────────────────────────
export default function BlogListClient() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [filteredArticles, setFilteredArticles] = useState(articles);

    useEffect(() => {
        const id = setTimeout(() => {
            let result = articles;
            if (selectedCategory !== "all") {
                result = result.filter(
                    (a) => getCategoryKey(a.slug) === selectedCategory
                );
            }
            if (searchTerm.trim()) {
                const q = searchTerm.toLowerCase();
                result = result.filter(
                    (a) =>
                        a.title.toLowerCase().includes(q) ||
                        a.preview?.toLowerCase().includes(q) ||
                        a.content.toLowerCase().includes(q) ||
                        a.postedBy.toLowerCase().includes(q)
                );
            }
            setFilteredArticles(result);
        }, 250);
        return () => clearTimeout(id);
    }, [searchTerm, selectedCategory]);

    const featuredArticles = filteredArticles.slice(0, 2);
    const gridArticles = filteredArticles.slice(2);

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
                    --radius:      6px;
                    --font-serif:  'DM Serif Display', 'Georgia', serif;
                    --font-sans:   'Inter', system-ui, sans-serif;
                    --font-mono:   'JetBrains Mono', 'Fira Code', monospace;
                }

                @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

                .bl-page {
                    font-family: var(--font-sans);
                    background: var(--bg);
                    color: var(--text-1);
                    min-height: 100vh;
                }

                /* ── Nav ── */
                .bl-nav {
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    background: rgba(10,10,11,0.92);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid var(--border);
                    padding: 0 24px;
                    height: 56px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .bl-nav__brand {
                    font-family: var(--font-mono);
                    font-size: 12px;
                    font-weight: 500;
                    letter-spacing: 0.08em;
                    color: var(--text-1);
                    text-decoration: none;
                }

                .bl-nav__brand em { font-style: normal; color: var(--accent); }

                .bl-nav__back {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-family: var(--font-mono);
                    font-size: 11px;
                    letter-spacing: 0.06em;
                    color: var(--text-2);
                    text-decoration: none;
                    padding: 6px 12px;
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    transition: color 0.15s, border-color 0.15s, background 0.15s;
                }

                .bl-nav__back:hover {
                    color: var(--text-1);
                    border-color: var(--border-hi);
                    background: var(--surface);
                }

                /* ── Main ── */
                .bl-main {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px 80px;
                }

                /* ── Masthead ── */
                .bl-masthead {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 16px;
                    padding: 52px 0 32px;
                    border-bottom: 1px solid var(--border);
                    margin-bottom: 36px;
                }

                .bl-masthead__eyebrow {
                    font-family: var(--font-mono);
                    font-size: 11px;
                    color: var(--accent);
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    margin-bottom: 10px;
                }

                .bl-masthead__title {
                    font-family: var(--font-serif);
                    font-size: clamp(36px, 5vw, 60px);
                    font-weight: 400;
                    line-height: 1.05;
                    color: var(--text-1);
                }

                .bl-masthead__desc {
                    font-size: 13px;
                    color: var(--text-2);
                    line-height: 1.6;
                    max-width: 320px;
                    text-align: right;
                }

                /* ── Toolbar: filter + search ── */
                .bl-toolbar {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                    margin-bottom: 36px;
                }

                .bl-filters {
                    display: flex;
                    gap: 6px;
                    flex-wrap: wrap;
                }

                .bl-filter-btn {
                    font-family: var(--font-mono);
                    font-size: 11px;
                    letter-spacing: 0.06em;
                    padding: 6px 14px;
                    border-radius: var(--radius);
                    border: 1px solid var(--border);
                    background: transparent;
                    color: var(--text-2);
                    cursor: pointer;
                    transition: color 0.15s, border-color 0.15s, background 0.15s;
                }

                .bl-filter-btn:hover {
                    color: var(--text-1);
                    border-color: var(--border-hi);
                    background: var(--surface);
                }

                .bl-filter-btn--active {
                    background: var(--accent-dim);
                    border-color: rgba(232,255,71,0.3);
                    color: var(--accent);
                }

                .bl-search {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    padding: 8px 14px;
                    min-width: 260px;
                    transition: border-color 0.15s;
                }

                .bl-search:focus-within {
                    border-color: var(--border-hi);
                }

                .bl-search__icon { color: var(--text-3); flex-shrink: 0; }

                .bl-search input {
                    background: none;
                    border: none;
                    outline: none;
                    font-family: var(--font-sans);
                    font-size: 13px;
                    color: var(--text-1);
                    width: 100%;
                }

                .bl-search input::placeholder { color: var(--text-3); }

                .bl-search__clear {
                    background: none;
                    border: none;
                    color: var(--text-3);
                    cursor: pointer;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    transition: color 0.15s;
                }

                .bl-search__clear:hover { color: var(--text-1); }

                .bl-search__count {
                    font-family: var(--font-mono);
                    font-size: 10px;
                    color: var(--text-3);
                    margin-top: 6px;
                    padding-left: 2px;
                }

                .bl-search__count em { font-style: normal; color: var(--accent); }

                /* ── Section label ── */
                .bl-section-label {
                    font-family: var(--font-mono);
                    font-size: 10px;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: var(--text-3);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 20px;
                }

                .bl-section-label::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: var(--border);
                }

                /* ── Tags ── */
                .bl-tag {
                    display: inline-block;
                    font-family: var(--font-mono);
                    font-size: 10px;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    padding: 3px 8px;
                    border-radius: 3px;
                    background: var(--accent-dim);
                    color: var(--accent);
                    border: 1px solid rgba(232,255,71,0.2);
                    line-height: 1;
                }

                .bl-tag--sm { font-size: 9px; padding: 2px 6px; }

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

                /* ── Featured row ── */
                .bl-feat-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1px;
                    background: var(--border);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    overflow: hidden;
                    margin-bottom: 48px;
                }

                @media (max-width: 700px) {
                    .bl-feat-row { grid-template-columns: 1fr; }
                    .bl-masthead { flex-direction: column; align-items: flex-start; }
                    .bl-masthead__desc { text-align: left; }
                    .bl-toolbar { flex-direction: column; align-items: flex-start; }
                    .bl-search { min-width: 100%; width: 100%; }
                }

                .bl-feat-card {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    min-height: 380px;
                    overflow: hidden;
                    background: var(--surface);
                    text-decoration: none;
                    transition: background 0.15s;
                }

                .bl-feat-card:hover { background: #141417; }

                .bl-feat-card::before {
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

                .bl-feat-card:hover::before { transform: scaleY(1); }

                .bl-feat-card__img-wrap {
                    position: relative;
                    height: 200px;
                    background: var(--bg);
                    overflow: hidden;
                    flex-shrink: 0;
                }

                .bl-feat-card__img {
                    width: 100%; height: 100%;
                    object-fit: cover;
                    opacity: 0.5;
                    filter: grayscale(25%);
                    transition: opacity 0.3s, transform 0.4s;
                }

                .bl-feat-card:hover .bl-feat-card__img {
                    opacity: 0.7;
                    transform: scale(1.03);
                }

                .bl-feat-card__img-placeholder {
                    width: 100%; height: 100%;
                    background: repeating-linear-gradient(
                        45deg, transparent, transparent 8px,
                        rgba(255,255,255,0.015) 8px, rgba(255,255,255,0.015) 16px
                    );
                }

                .bl-feat-card__overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, transparent 40%, var(--surface) 100%);
                    transition: background 0.15s;
                }

                .bl-feat-card:hover .bl-feat-card__overlay {
                    background: linear-gradient(to bottom, transparent 40%, #141417 100%);
                }

                .bl-feat-card__body {
                    padding: 20px 24px 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    flex: 1;
                }

                .bl-feat-card__title {
                    font-family: var(--font-serif);
                    font-size: clamp(18px, 2.2vw, 23px);
                    font-weight: 400;
                    line-height: 1.25;
                    color: var(--text-1);
                    transition: color 0.15s;
                }

                .bl-feat-card:hover .bl-feat-card__title { color: #fff; }

                .bl-feat-card__preview {
                    font-size: 13px;
                    color: var(--text-2);
                    line-height: 1.55;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .bl-feat-card__arrow-wrap {
                    position: absolute;
                    top: 16px; right: 16px;
                    z-index: 4;
                }

                .bl-feat-card__arrow {
                    color: var(--text-3);
                    transition: color 0.15s, transform 0.15s;
                }

                .bl-feat-card:hover .bl-feat-card__arrow {
                    color: var(--accent);
                    transform: translate(2px, -2px);
                }

                /* ── Article grid ── */
                .bl-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1px;
                    background: var(--border);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    overflow: hidden;
                    margin-bottom: 56px;
                }

                @media (max-width: 900px) { .bl-grid { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 600px) { .bl-grid { grid-template-columns: 1fr; } }

                .bl-card {
                    display: flex;
                    flex-direction: column;
                    background: var(--surface);
                    text-decoration: none;
                    overflow: hidden;
                    position: relative;
                    transition: background 0.15s;
                    animation: blFadeUp 0.4s ease-out both;
                }

                .bl-card:hover { background: #141417; }

                .bl-card::before {
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

                .bl-card:hover::before { transform: scaleY(1); }

                @keyframes blFadeUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .bl-card__img-wrap {
                    height: 160px;
                    background: var(--bg);
                    overflow: hidden;
                    flex-shrink: 0;
                }

                .bl-card__img {
                    width: 100%; height: 100%;
                    object-fit: cover;
                    opacity: 0.45;
                    filter: grayscale(25%);
                    transition: opacity 0.3s, transform 0.4s;
                }

                .bl-card:hover .bl-card__img {
                    opacity: 0.65;
                    transform: scale(1.04);
                }

                .bl-card__img-placeholder {
                    width: 100%; height: 100%;
                    background: repeating-linear-gradient(
                        45deg, transparent, transparent 6px,
                        rgba(255,255,255,0.015) 6px, rgba(255,255,255,0.015) 12px
                    );
                }

                .bl-card__body {
                    padding: 18px 20px 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 7px;
                    flex: 1;
                }

                .bl-card__title {
                    font-family: var(--font-serif);
                    font-size: 17px;
                    font-weight: 400;
                    line-height: 1.3;
                    color: var(--text-1);
                    transition: color 0.15s;
                }

                .bl-card:hover .bl-card__title { color: #fff; }

                .bl-card__preview {
                    font-size: 12px;
                    color: var(--text-2);
                    line-height: 1.55;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                /* ── Empty state ── */
                .bl-empty {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    padding: 80px 0;
                    text-align: center;
                }

                .bl-empty__code {
                    font-family: var(--font-mono);
                    font-size: 11px;
                    color: var(--text-3);
                    letter-spacing: 0.1em;
                }

                .bl-empty__msg { font-size: 14px; color: var(--text-2); }

                .bl-empty__reset {
                    font-family: var(--font-mono);
                    font-size: 11px;
                    color: var(--accent);
                    background: none;
                    border: none;
                    cursor: pointer;
                    margin-top: 4px;
                    transition: opacity 0.15s;
                }

                .bl-empty__reset:hover { opacity: 0.7; }

                /* ── CTA / Footer row ── */
                .bl-footer {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    padding-top: 40px;
                    margin-top: 48px;
                    border-top: 1px solid var(--border);
                }

                .bl-footer__info {
                    font-family: var(--font-mono);
                    font-size: 10px;
                    color: var(--text-3);
                    letter-spacing: 0.06em;
                }

                .bl-footer__actions {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .bl-btn {
                    font-family: var(--font-mono);
                    font-size: 11px;
                    letter-spacing: 0.06em;
                    padding: 8px 16px;
                    border-radius: var(--radius);
                    border: 1px solid var(--border);
                    background: transparent;
                    color: var(--text-2);
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    transition: color 0.15s, border-color 0.15s, background 0.15s;
                    text-decoration: none;
                }

                .bl-btn:hover {
                    color: var(--text-1);
                    border-color: var(--border-hi);
                    background: var(--surface);
                }

                .bl-btn--accent {
                    border-color: rgba(232,255,71,0.3);
                    color: var(--accent);
                    background: var(--accent-dim);
                }

                .bl-btn--accent:hover {
                    background: rgba(232,255,71,0.15);
                    border-color: rgba(232,255,71,0.5);
                    color: var(--accent);
                }
            `}</style>

            <div className="bl-page">
                {/* ── Nav ── */}
                <nav className="bl-nav">
                    <a href="/" className="bl-nav__brand">
                        brown<em>.</em>dev
                    </a>
                    <a href="/portfolio" className="bl-nav__back">
                        <ArrowLeft size={13} />
                        Portfolio
                    </a>
                </nav>

                <main className="bl-main">
                    {/* ── Masthead ── */}
                    <header className="bl-masthead">
                        <div>
                            <p className="bl-masthead__eyebrow">Writing</p>
                            <h1 className="bl-masthead__title">
                                Engineering<br />Insights
                            </h1>
                        </div>
                        <p className="bl-masthead__desc">
                            Deep dives into systems architecture, digital infrastructure, and design patterns worth thinking about.
                        </p>
                    </header>

                    {/* ── Toolbar ── */}
                    <div className="bl-toolbar">
                        <div className="bl-filters">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.key}
                                    onClick={() => setSelectedCategory(cat.key)}
                                    className={`bl-filter-btn${selectedCategory === cat.key ? " bl-filter-btn--active" : ""}`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                        <div>
                            <div className="bl-search">
                                <Search size={14} className="bl-search__icon" />
                                <input
                                    type="text"
                                    placeholder="Search articles…"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                {searchTerm && (
                                    <button className="bl-search__clear" onClick={() => setSearchTerm("")}>
                                        <X size={13} />
                                    </button>
                                )}
                            </div>
                            {searchTerm && (
                                <p className="bl-search__count">
                                    <em>{filteredArticles.length}</em> result{filteredArticles.length !== 1 ? "s" : ""}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* ── Content ── */}
                    {filteredArticles.length === 0 ? (
                        <div className="bl-empty">
                            <span className="bl-empty__code">NO_RESULTS</span>
                            <p className="bl-empty__msg">No articles match your current filter.</p>
                            <button
                                className="bl-empty__reset"
                                onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
                            >
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <>
                            {featuredArticles.length > 0 && (
                                <>
                                    <p className="bl-section-label">Featured</p>
                                    <div className="bl-feat-row">
                                        {featuredArticles.map((a) => (
                                            <FeaturedCard key={a.slug} article={a} />
                                        ))}
                                    </div>
                                </>
                            )}

                            {gridArticles.length > 0 && (
                                <>
                                    <p className="bl-section-label">All articles</p>
                                    <div className="bl-grid">
                                        {gridArticles.map((a, i) => (
                                            <ArticleCard key={a.slug} article={a} index={i} />
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    {/* ── Footer ── */}
                    <footer className="bl-footer">
                        <span className="bl-footer__info">
                            brown.dev — writing & insights
                        </span>
                        <div className="bl-footer__actions">
                            <button
                                className="bl-btn bl-btn--accent"
                                onClick={() => router.push("/bc/contact")}
                            >
                                Get in touch
                            </button>
                            <button
                                className="bl-btn"
                                onClick={() => router.push("/portfolio")}
                            >
                                <ArrowLeft size={13} />
                                Portfolio
                            </button>
                        </div>
                    </footer>
                </main>
            </div>

            <Footer />
        </>
    );
}