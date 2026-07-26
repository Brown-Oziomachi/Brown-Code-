"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Search, X, Mail } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Footer from "@/components/footer";
import { CATEGORIES, CATEGORY_LABELS, getCategoryKey } from "@/lib/blogCategories";

const ITEMS_PER_PAGE = 9;

// ─── helpers ────────────────────────────────────────────────────────────────

const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

// ─── sub-components ─────────────────────────────────────────────────────────

const FeaturedHero = ({ article }) => (
    <a href={`/blog/${article.slug}`} className="bl-hero-card">
        <div className="bl-hero-card__img-wrap">
            {article.image ? (
                <img
                    src={article.image}
                    alt={article.title}
                    className="bl-hero-card__img"
                    onError={(e) => (e.target.style.display = "none")}
                />
            ) : (
                <div className="bl-hero-card__img-placeholder" />
            )}
            <span className="bl-tag bl-hero-card__tag">
                {CATEGORY_LABELS[getCategoryKey(article)]}
            </span>
        </div>
        <div className="bl-hero-card__body">
            <span className="bl-tag bl-tag--ghost">
                {CATEGORY_LABELS[getCategoryKey(article)]}
            </span>
            <h2 className="bl-hero-card__title">{article.title}</h2>
            <p className="bl-hero-card__preview">{article.preview}</p>
            <div className="bl-meta">
                <span className="bl-meta__author">{article.postedBy}</span>
                <span>{article.readingTime} min read</span>
                <span className="bl-meta__dot" />
                {formatDate(article.datePublished) && ` ${formatDate(article.datePublished)}`}
            </div>
        </div>
        <span className="bl-hero-card__arrow-wrap">
            <ArrowUpRight size={14} className="bl-hero-card__arrow" />
        </span>
    </a>
);

const SideFeaturedItem = ({ article, index }) => (
    <a href={`/blog/${article.slug}`} className="bl-side-item">
        <span className="bl-side-item__num">{String(index).padStart(2, "0")}</span>
        <div className="bl-side-item__thumb-wrap">
            {article.image ? (
                <img
                    src={article.image}
                    alt={article.title}
                    className="bl-side-item__thumb"
                    onError={(e) => (e.target.style.display = "none")}
                />
            ) : (
                <div className="bl-side-item__thumb-placeholder" />
            )}
        </div>
        <div className="bl-side-item__body">
            <span className="bl-tag bl-tag--sm">
                {CATEGORY_LABELS[getCategoryKey(article)]}
            </span>
            <h3 className="bl-side-item__title">{article.title}</h3>
            <span className="bl-side-item__meta">
                {article.readingTime} min read
                {formatDate(article.datePublished) && ` ${formatDate(article.datePublished)}`}
            </span>
        </div>
    </a>
);

const PopularItem = ({ article, index }) => (
    <a href={`/blog/${article.slug}`} className="bl-popular-item">
        <span className="bl-popular-item__num">{String(index).padStart(2, "0")}</span>
        <div className="bl-popular-item__body">
            <h4 className="bl-popular-item__title">{article.title}</h4>
            <span className="bl-popular-item__meta">
                {CATEGORY_LABELS[getCategoryKey(article)]} · {article.readingTime} min
                {formatDate(article.datePublished) && ` · ${formatDate(article.datePublished)}`}
            </span>
        </div>
    </a>
);

const ArticleCard = ({ article, index }) => (

  <a  href = {`/blog/${article.slug}`}
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
                {CATEGORY_LABELS[getCategoryKey(article)]}
            </span>
            <h3 className="bl-card__title">{article.title}</h3>
            <p className="bl-card__preview">{article.preview}</p>
            <div className="bl-meta bl-meta--sm">
                <span className="bl-meta__author">{article.postedBy}</span>
                <span className="bl-meta__dot" />
                <span>{article.readingTime} min read</span>
                {formatDate(article.datePublished) && (
                    <>
                        <span className="bl-meta__dot" />
                        <span>{formatDate(article.datePublished)}</span>
                    </>
                )}
            </div>
        </div>
    </a >
);

/** Numbered pagination — matches: [1] 2 3 4 5 6 Next → */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="bl-pagination" aria-label="Article pages">
            {pages.map((page) => (
                <button
                    key={page}
                    className={`bl-page-btn ${page === currentPage ? "bl-page-btn--active" : ""}`}
                    onClick={() => onPageChange(page)}
                    aria-current={page === currentPage ? "page" : undefined}
                >
                    {page}
                </button>
            ))}
            {currentPage < totalPages && (
                <button
                    className="bl-page-btn bl-page-btn--next"
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Next <ArrowRight size={13} />
                </button>
            )}
        </nav>
    );
};

/** Desktop-only sticky sidebar — About + Contact */
const Sidebar = () => {
    const router = useRouter();
    return (
        <aside className="bl-sidebar">
            <div className="bl-sidebar__card">
                <p className="bl-sidebar__eyebrow">About</p>
                <h3 className="bl-sidebar__title">Sir Brown AD</h3>
                <p className="bl-sidebar__text">
                    Full-stack developer building web platforms and writing about
                    fraud awareness, fintech security, and software engineering.
                </p>
                <a href="/bc/about" className="bl-btn" style={{ width: "100%", justifyContent: "center" }}>
                    About me
                </a>
            </div>
            <div className="bl-sidebar__card">
                <p className="bl-sidebar__eyebrow">Get in touch</p>
                <h3 className="bl-sidebar__title">Have a project?</h3>
                <p className="bl-sidebar__text">
                    Open to freelance work, collaborations, and questions about
                    anything I&apos;ve written here.
                </p>
                <button
                    className="bl-btn bl-btn--accent"
                    style={{ width: "100%", justifyContent: "center" }}
                    onClick={() => router.push("/bc/contact")}
                >
                    <Mail size={13} />
                    Contact me
                </button>
            </div>
        </aside>
    );
};

export default function BlogListClient({ articles }) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredArticles, setFilteredArticles] = useState(articles);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const id = setTimeout(() => {
            let result = articles;
            if (searchTerm.trim()) {
                const q = searchTerm.toLowerCase();
                result = result.filter(
                    (a) =>
                        a.title.toLowerCase().includes(q) ||
                        a.preview?.toLowerCase().includes(q) ||
                        a.postedBy.toLowerCase().includes(q)
                );
            }
            setFilteredArticles(result);
            setCurrentPage(1);
        }, 250);
        return () => clearTimeout(id);
    }, [searchTerm, articles]);

    const heroArticle = filteredArticles[0];
    const sideArticles = filteredArticles.slice(1, 4);
    const popularArticles = filteredArticles.slice(4, 10);
    const restSlugs = new Set(
        [heroArticle, ...sideArticles, ...popularArticles].filter(Boolean).map((a) => a.slug)
    );
    const remainingArticles = filteredArticles.filter((a) => !restSlugs.has(a.slug));

    const totalPages = Math.max(1, Math.ceil(remainingArticles.length / ITEMS_PER_PAGE));
    const paginatedArticles = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return remainingArticles.slice(start, start + ITEMS_PER_PAGE);
    }, [remainingArticles, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        document.getElementById("bl-all-articles")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

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

                .bl-page { font-family: var(--font-sans); background: var(--bg); color: var(--text-1); min-height: 100vh; }

                /* ── Nav ── */
                .bl-nav {
                    position: sticky; top: 0; z-index: 100;
                    background: rgba(10,10,11,0.92);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid var(--border);
                    padding: 0 24px; height: 56px;
                    display: flex; align-items: center; justify-content: space-between;
                }
                .bl-nav__brand { font-family: var(--font-mono); font-size: 12px; font-weight: 500; letter-spacing: 0.08em; color: var(--text-1); text-decoration: none; }
                .bl-nav__brand em { font-style: normal; color: var(--accent); }
                .bl-nav__back {
                    display: inline-flex; align-items: center; gap: 6px;
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    color: var(--text-2); text-decoration: none; padding: 6px 12px;
                    border: 1px solid var(--border); border-radius: var(--radius);
                    transition: color 0.15s, border-color 0.15s, background 0.15s;
                }
                .bl-nav__back:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }

                /* ── Main ── */
                .bl-main { max-width: 1200px; margin: 0 auto; padding: 0 24px 80px; }

                /* ── Masthead ── */
                .bl-masthead {
                    display: flex; align-items: flex-end; justify-content: space-between;
                    gap: 16px; padding: 52px 0 32px; border-bottom: 1px solid var(--border); margin-bottom: 32px;
                }
                .bl-masthead__eyebrow { font-family: var(--font-mono); font-size: 11px; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px; }
                .bl-masthead__title { font-family: var(--font-serif); font-size: clamp(36px, 5vw, 60px); font-weight: 400; line-height: 1.05; color: var(--text-1); }
                .bl-masthead__desc { font-size: 13px; color: var(--text-2); line-height: 1.6; max-width: 320px; text-align: right; }

                /* ── Toolbar ── */
                .bl-toolbar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 48px; }
                .bl-cat-nav { display: flex; gap: 6px; flex-wrap: wrap; }
                .bl-cat-nav__link {
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    padding: 6px 14px; border-radius: var(--radius); border: 1px solid var(--border);
                    color: var(--text-2); text-decoration: none;
                    transition: color 0.15s, border-color 0.15s, background 0.15s;
                }
                .bl-cat-nav__link:hover { color: var(--accent); border-color: rgba(232,255,71,0.3); background: var(--accent-dim); }

                .bl-search {
                    position: relative; display: flex; align-items: center; gap: 8px;
                    background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
                    padding: 8px 14px; min-width: 260px; transition: border-color 0.15s;
                }
                .bl-search:focus-within { border-color: var(--border-hi); }
                .bl-search__icon { color: var(--text-3); flex-shrink: 0; }
                .bl-search input { background: none; border: none; outline: none; font-family: var(--font-sans); font-size: 13px; color: var(--text-1); width: 100%; }
                .bl-search input::placeholder { color: var(--text-3); }
                .bl-search__clear { background: none; border: none; color: var(--text-3); cursor: pointer; padding: 0; display: flex; align-items: center; transition: color 0.15s; }
                .bl-search__clear:hover { color: var(--text-1); }
                .bl-search__count { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); margin-top: 6px; padding-left: 2px; }
                .bl-search__count em { font-style: normal; color: var(--accent); }

                /* ── Section labels ── */
                .bl-section-label {
                    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
                    color: var(--accent); display: flex; align-items: center; gap: 8px; margin-bottom: 6px;
                }
                .bl-section-label::before { content: '—'; }

                /* ── Tags / meta ── */
                .bl-tag {
                    display: inline-block; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em;
                    text-transform: uppercase; padding: 3px 8px; border-radius: 3px;
                    background: var(--accent-dim); color: var(--accent); border: 1px solid rgba(232,255,71,0.2); line-height: 1;
                }
                .bl-tag--sm { font-size: 9px; padding: 2px 6px; }
                .bl-tag--ghost { background: transparent; border-color: transparent; padding: 0; }
                .bl-meta { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 11px; color: var(--text-3); margin-top: 10px; }
                .bl-meta--sm { font-size: 10px; margin-top: 8px; }
                .bl-meta__author { color: var(--text-2); }
                .bl-meta__dot { width: 3px; height: 3px; border-radius: 50%; background: var(--border-hi); flex-shrink: 0; }

                /* ── Hero (Editor picks) ── */
                .bl-hero-section { margin-bottom: 56px; }
                .bl-hero-title { font-family: var(--font-serif); font-size: clamp(26px, 3vw, 34px); font-weight: 400; color: var(--text-1); margin-bottom: 6px; }
                .bl-hero-sub { font-size: 13px; color: var(--text-2); margin-bottom: 24px; }
                .bl-hero-row { display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; align-items: stretch; }

                .bl-hero-card {
                    display: flex; flex-direction: column; background: var(--surface);
                    border: 1px solid var(--border); border-radius: var(--radius);
                    overflow: hidden; text-decoration: none; position: relative;
                    transition: border-color 0.15s, background 0.15s;
                }
                .bl-hero-card:hover { border-color: var(--border-hi); background: #141417; }
                .bl-hero-card__img-wrap { position: relative; height: 280px; background: var(--bg); overflow: hidden; }
                .bl-hero-card__img { width: 100%; height: 100%; object-fit: cover; opacity: 0.55; filter: grayscale(25%); transition: opacity 0.3s, transform 0.4s; }
                .bl-hero-card:hover .bl-hero-card__img { opacity: 0.75; transform: scale(1.03); }
                .bl-hero-card__img-placeholder { width: 100%; height: 100%; background: repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.015) 8px, rgba(255,255,255,0.015) 16px); }
                .bl-hero-card__tag { position: absolute; top: 14px; left: 14px; background: var(--bg); }
                .bl-hero-card__body { padding: 22px 24px 24px; display: flex; flex-direction: column; gap: 8px; }
                .bl-hero-card__title { font-family: var(--font-serif); font-size: clamp(20px, 2.4vw, 26px); font-weight: 400; line-height: 1.25; color: var(--text-1); transition: color 0.15s; }
                .bl-hero-card:hover .bl-hero-card__title { color: #fff; }
                .bl-hero-card__preview { font-size: 13px; color: var(--text-2); line-height: 1.6; }
                .bl-hero-card__arrow-wrap { position: absolute; top: 14px; right: 14px; }
                .bl-hero-card__arrow { color: var(--text-3); transition: color 0.15s, transform 0.15s; }
                .bl-hero-card:hover .bl-hero-card__arrow { color: var(--accent); transform: translate(2px, -2px); }

                .bl-side-list {
                    display: flex; flex-direction: column;
                    border: 1px solid var(--border); border-radius: var(--radius);
                    background: var(--surface); overflow: hidden;
                }
                .bl-side-item {
                    display: flex; align-items: flex-start; gap: 12px; padding: 16px;
                    text-decoration: none; border-bottom: 1px solid var(--border);
                    transition: background 0.15s;
                }
                .bl-side-item:last-child { border-bottom: none; }
                .bl-side-item:hover { background: #141417; }
                .bl-side-item__num { font-family: var(--font-mono); font-size: 13px; font-weight: 500; color: var(--accent); flex-shrink: 0; padding-top: 2px; }
                .bl-side-item__thumb-wrap { width: 56px; height: 56px; border-radius: 4px; overflow: hidden; background: var(--bg); flex-shrink: 0; }
                .bl-side-item__thumb { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; filter: grayscale(25%); }
                .bl-side-item__thumb-placeholder { width: 100%; height: 100%; background: repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.02) 6px, rgba(255,255,255,0.02) 12px); }
                .bl-side-item__body { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
                .bl-side-item__title { font-family: var(--font-sans); font-weight: 600; font-size: 13px; line-height: 1.35; color: var(--text-1); }
                .bl-side-item__meta { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); }

                /* ── Popular this month ── */
                .bl-popular-section { margin-bottom: 64px; }
                .bl-popular-title { font-family: var(--font-serif); font-size: clamp(24px, 3vw, 32px); font-weight: 400; color: var(--text-1); margin-bottom: 22px; }
                .bl-popular-grid { display: grid; grid-template-columns: 1fr 1fr; column-gap: 40px; }
                .bl-popular-item { display: flex; gap: 14px; align-items: flex-start; text-decoration: none; padding: 16px 0; border-bottom: 1px solid var(--border); transition: opacity 0.15s; }
                .bl-popular-item:hover { opacity: 0.8; }
                .bl-popular-item__num { font-family: var(--font-mono); font-size: 22px; font-weight: 600; color: var(--accent); opacity: 0.4; flex-shrink: 0; line-height: 1; }
                .bl-popular-item__title { font-family: var(--font-sans); font-weight: 600; font-size: 14px; line-height: 1.4; color: var(--text-1); margin-bottom: 4px; }
                .bl-popular-item__meta { font-family: var(--font-mono); font-size: 11px; color: var(--text-3); }
                @media (max-width: 700px) { .bl-popular-grid { grid-template-columns: 1fr; } }

                /* ── All articles + sidebar layout ── */
                .bl-content-row { display: grid; grid-template-columns: 1fr 280px; gap: 40px; align-items: start; }
                @media (max-width: 900px) { .bl-content-row { grid-template-columns: 1fr; } }

                .bl-all-title { font-family: var(--font-serif); font-size: clamp(24px, 3vw, 32px); font-weight: 400; color: var(--text-1); margin-bottom: 22px; }

                .bl-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
                @media (max-width: 1100px) and (min-width: 901px) { .bl-grid { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 900px) { .bl-grid { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 600px) { .bl-grid { grid-template-columns: 1fr; } }

                .bl-card { display: flex; flex-direction: column; background: var(--surface); text-decoration: none; overflow: hidden; position: relative; transition: background 0.15s; animation: blFadeUp 0.4s ease-out both; }
                .bl-card:hover { background: #141417; }
                .bl-card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: var(--accent); transform: scaleY(0); transform-origin: bottom; transition: transform 0.2s ease; z-index: 5; }
                .bl-card:hover::before { transform: scaleY(1); }
                @keyframes blFadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
                .bl-card__img-wrap { height: 160px; background: var(--bg); overflow: hidden; flex-shrink: 0; }
                .bl-card__img { width: 100%; height: 100%; object-fit: cover; opacity: 0.45; filter: grayscale(25%); transition: opacity 0.3s, transform 0.4s; }
                .bl-card:hover .bl-card__img { opacity: 0.65; transform: scale(1.04); }
                .bl-card__img-placeholder { width: 100%; height: 100%; background: repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.015) 6px, rgba(255,255,255,0.015) 12px); }
                .bl-card__body { padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 7px; flex: 1; }
                .bl-card__title { font-family: var(--font-serif); font-size: 17px; font-weight: 400; line-height: 1.3; color: var(--text-1); transition: color 0.15s; }
                .bl-card:hover .bl-card__title { color: #fff; }
                .bl-card__preview { font-size: 12px; color: var(--text-2); line-height: 1.55; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

                /* ── Pagination ── */
                .bl-pagination { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 28px; }
                .bl-page-btn {
                    min-width: 36px; height: 36px; padding: 0 10px;
                    border-radius: 999px; border: 1px solid var(--border);
                    background: var(--surface); color: var(--text-2);
                    font-family: var(--font-mono); font-size: 13px; font-weight: 500;
                    cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px;
                    transition: color 0.15s, border-color 0.15s, background 0.15s;
                }
                .bl-page-btn:hover { color: var(--text-1); border-color: var(--border-hi); }
                .bl-page-btn--active { background: var(--accent); border-color: var(--accent); color: #0a0a0b; font-weight: 700; }
                .bl-page-btn--active:hover { color: #0a0a0b; }
                .bl-page-btn--next { width: auto; padding: 0 16px; border-radius: 999px; }

                /* ── Sidebar (desktop only) ── */
                .bl-sidebar { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 80px; }
                .bl-sidebar__card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; display: flex; flex-direction: column; gap: 8px; }
                .bl-sidebar__eyebrow { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); }
                .bl-sidebar__title { font-family: var(--font-serif); font-size: 19px; font-weight: 400; color: var(--text-1); }
                .bl-sidebar__text { font-size: 12.5px; color: var(--text-2); line-height: 1.6; margin-bottom: 6px; }
                @media (max-width: 900px) { .bl-sidebar { display: none; } }

                /* ── Empty state ── */
                .bl-empty { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 80px 0; text-align: center; }
                .bl-empty__code { font-family: var(--font-mono); font-size: 11px; color: var(--text-3); letter-spacing: 0.1em; }
                .bl-empty__msg { font-size: 14px; color: var(--text-2); }
                .bl-empty__reset { font-family: var(--font-mono); font-size: 11px; color: var(--accent); background: none; border: none; cursor: pointer; margin-top: 4px; transition: opacity 0.15s; }
                .bl-empty__reset:hover { opacity: 0.7; }

                /* ── Footer row ── */
                .bl-footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; padding-top: 40px; margin-top: 48px; border-top: 1px solid var(--border); }
                .bl-footer__info { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); letter-spacing: 0.06em; }
                .bl-footer__actions { display: flex; gap: 10px; flex-wrap: wrap; }
                .bl-btn { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; padding: 8px 16px; border-radius: var(--radius); border: 1px solid var(--border); background: transparent; color: var(--text-2); cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: color 0.15s, border-color 0.15s, background 0.15s; text-decoration: none; }
                .bl-btn:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }
                .bl-btn--accent { border-color: rgba(232,255,71,0.3); color: var(--accent); background: var(--accent-dim); }
                .bl-btn--accent:hover { background: rgba(232,255,71,0.15); border-color: rgba(232,255,71,0.5); color: var(--accent); }

                @media (max-width: 700px) {
                    .bl-hero-row { grid-template-columns: 1fr; }
                    .bl-masthead { flex-direction: column; align-items: flex-start; }
                    .bl-masthead__desc { text-align: left; }
                    .bl-toolbar { flex-direction: column; align-items: flex-start; }
                    .bl-search { min-width: 100%; width: 100%; }
                }
            `}</style>

            <div className="bl-page">
                <nav className="bl-nav">
                    <a href="/" className="bl-nav__brand">brown<em>.</em>dev</a>
                    <a href="/portfolio" className="bl-nav__back">
                        <ArrowLeft size={13} />
                        Portfolio
                    </a>
                </nav>

                <main className="bl-main">
                    <header className="bl-masthead">
                        <div>
                            <p className="bl-masthead__eyebrow">Writing</p>
                            <h1 className="bl-masthead__title">The<br />Stack</h1>
                        </div>
                        <p className="bl-masthead__desc">
                            Notes on building tech, platforms, and businesses across Africa — from the code up.
                        </p>
                    </header>

                    <div className="bl-toolbar">
                        <nav className="bl-cat-nav">
                            {CATEGORIES.map((cat) => (
                                <a key={cat.key} href={`/blog/topic/${cat.key}`} className="bl-cat-nav__link">
                                    {cat.label}
                                </a>
                            ))}
                        </nav>
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

                    {filteredArticles.length === 0 ? (
                        <div className="bl-empty">
                            <span className="bl-empty__code">NO_RESULTS</span>
                            <p className="bl-empty__msg">No articles match your search.</p>
                            <button className="bl-empty__reset" onClick={() => setSearchTerm("")}>
                                Clear search
                            </button>
                        </div>
                    ) : (
                        <>
                            {heroArticle && (
                                <section className="bl-hero-section">
                                    <p className="bl-section-label">Start here</p>
                                    <h2 className="bl-hero-title">Editor picks</h2>
                                    <p className="bl-hero-sub">The cornerstone articles most readers read first.</p>
                                    <div className="bl-hero-row">
                                        <FeaturedHero article={heroArticle} />
                                        {sideArticles.length > 0 && (
                                            <aside className="bl-side-list">
                                                {sideArticles.map((a, i) => (
                                                    <SideFeaturedItem key={a.slug} article={a} index={i + 1} />
                                                ))}
                                            </aside>
                                        )}
                                    </div>
                                </section>
                            )}

                            {popularArticles.length > 0 && (
                                <section className="bl-popular-section">
                                    <p className="bl-section-label">Most read</p>
                                    <h2 className="bl-popular-title">Popular this month</h2>
                                    <div className="bl-popular-grid">
                                        {popularArticles.map((a, i) => (
                                            <PopularItem key={a.slug} article={a} index={i + 1} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {remainingArticles.length > 0 && (
                                <section id="bl-all-articles" className="bl-content-row">
                                    <div>
                                        <p className="bl-section-label">Browse</p>
                                        <h2 className="bl-all-title">All articles</h2>
                                        <div className="bl-grid">
                                            {paginatedArticles.map((a, i) => (
                                                <ArticleCard key={a.slug} article={a} index={i} />
                                            ))}
                                        </div>
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                    <Sidebar />
                                </section>
                            )}
                        </>
                    )}

                    <footer className="bl-footer">
                        <span className="bl-footer__info">brown.dev — writing & insights</span>
                        <div className="bl-footer__actions">
                            <button className="bl-btn bl-btn--accent" onClick={() => router.push("/bc/contact")}>
                                Get in touch
                            </button>
                            <button className="bl-btn" onClick={() => router.push("/portfolio")}>
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