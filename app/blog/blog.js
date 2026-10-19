"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowRight, ArrowUpRight, Search, X, Mail, Heart, Menu,
    ChevronLeft, ChevronRight,
} from "lucide-react";
import Footer from "@/components/footer";
import { CATEGORIES, CATEGORY_LABELS, getCategoryKey } from "@/lib/blogCategories";

const ITEMS_PER_PAGE = 9;

/* ── helpers ─────────────────────────────────────────── */

const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const readingTimeOf = (a) =>
    a.readingTime || Math.max(1, Math.ceil((a.content || "").split(/\s+/).length / 200));

const labelOf = (a) => CATEGORY_LABELS[getCategoryKey(a)];

/* Image with a clean fallback instead of a blank hole */
function Cover({ src, alt, className }) {
    const [failed, setFailed] = useState(false);
    if (!src || failed) return <div className="bl-ph" aria-hidden="true" />;
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            loading="lazy"
            onError={() => setFailed(true)}
        />
    );
}

function Meta({ article }) {
    const date = formatDate(article.datePublished);
    return (
        <div className="bl-meta">
            <span>{readingTimeOf(article)} min read</span>
            {date && (
                <>
                    <span className="bl-meta__dot" />
                    <span>{date}</span>
                </>
            )}
        </div>
    );
}

/* ── sub-components ──────────────────────────────────── */

function HeroCard({ article }) {
    return (
        <Link href={`/blog/${article.slug}`} className="bl-hero">
            <div className="bl-hero__media">
                <Cover src={article.image} alt={article.title} className="bl-img" />
                <span className="bl-chip">{labelOf(article)}</span>
            </div>
            <div className="bl-hero__body">
                <h3 className="bl-hero__title">{article.title}</h3>
                <p className="bl-hero__preview">{article.preview}</p>
                <Meta article={article} />
            </div>
        </Link>
    );
}

function PickItem({ article }) {
    return (
        <Link href={`/blog/${article.slug}`} className="bl-pick">
            <div className="bl-pick__thumb">
                <Cover src={article.image} alt={article.title} className="bl-img" />
            </div>
            <div className="bl-pick__body">
                <span className="bl-pick__cat">{labelOf(article)}</span>
                <h3 className="bl-pick__title">{article.title}</h3>
                <Meta article={article} />
            </div>
        </Link>
    );
}

function PopularItem({ article, rank }) {
    return (
        <Link href={`/blog/${article.slug}`} className="bl-pop">
            <span className="bl-pop__rank">{rank}</span>
            <div>
                <h3 className="bl-pop__title">{article.title}</h3>
                <div className="bl-pop__meta">
                    {labelOf(article)}
                    <span className="bl-meta__dot" />
                    {readingTimeOf(article)} min read
                </div>
            </div>
        </Link>
    );
}

function ArticleCard({ article }) {
    return (
        <Link href={`/blog/${article.slug}`} className="bl-card">
            <div className="bl-card__media">
                <Cover src={article.image} alt={article.title} className="bl-img" />
                <span className="bl-chip">{labelOf(article)}</span>
            </div>
            <div className="bl-card__body">
                <h3 className="bl-card__title">{article.title}</h3>
                <p className="bl-card__preview">{article.preview}</p>
                <Meta article={article} />
            </div>
        </Link>
    );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <nav className="bl-pager" aria-label="Article pages">
            <button
                className="bl-pager__btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                <ChevronLeft size={14} />
            </button>
            {pages.map((p) => (
                <button
                    key={p}
                    className={`bl-pager__btn${p === currentPage ? " bl-pager__btn--on" : ""}`}
                    onClick={() => onPageChange(p)}
                    aria-current={p === currentPage ? "page" : undefined}
                >
                    {p}
                </button>
            ))}
            <button
                className="bl-pager__btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                <ChevronRight size={14} />
            </button>
        </nav>
    );
}

function Sidebar() {
    return (
        <aside className="bl-side">
            <div className="bl-side__card">
                <p className="bl-side__kicker">About the author</p>
                <h3 className="bl-side__title">Sir Brown AD</h3>
                <p className="bl-side__text">
                    Full stack engineer in Abuja. I build web platforms and write about fraud
                    awareness, fintech security and software engineering.
                </p>
                <Link href="/bc/about" className="bl-btn">
                    About me <ArrowRight size={12} />
                </Link>
            </div>
            <div className="bl-side__card">
                <p className="bl-side__kicker">Work with me</p>
                <h3 className="bl-side__title">Have a project?</h3>
                <p className="bl-side__text">
                    Open to freelance builds, collaborations and sponsored articles.
                </p>
                <Link href="/bc/contact" className="bl-btn bl-btn--solid">
                    <Mail size={12} /> Contact me
                </Link>
            </div>
            <div className="bl-side__card">
                <p className="bl-side__kicker">Support the writing</p>
                <h3 className="bl-side__title">Sponsor on GitHub</h3>
                <p className="bl-side__text">
                    Every article is free to read. Sponsors help keep it that way.
                </p>
                <a
                    href="https://github.com/sponsors/Brown-Oziomachi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bl-btn"
                >
                    <Heart size={12} fill="currentColor" /> Sponsor
                </a>
            </div>
        </aside>
    );
}

/* ── page ────────────────────────────────────────────── */

export default function BlogListClient({ articles }) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [debounced, setDebounced] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [menuOpen, setMenuOpen] = useState(false);

    // Debounce search
    useEffect(() => {
        const id = setTimeout(() => {
            setDebounced(searchTerm.trim().toLowerCase());
            setCurrentPage(1);
        }, 250);
        return () => clearTimeout(id);
    }, [searchTerm]);

    // Newest first, then filter
    const filteredArticles = useMemo(() => {
        const sorted = [...articles].sort((a, b) =>
            (b.datePublished || "").localeCompare(a.datePublished || "")
        );
        if (!debounced) return sorted;
        return sorted.filter(
            (a) =>
                a.title?.toLowerCase().includes(debounced) ||
                a.preview?.toLowerCase().includes(debounced) ||
                a.postedBy?.toLowerCase().includes(debounced)
        );
    }, [articles, debounced]);

    const heroArticle = filteredArticles[0];
    const sideArticles = filteredArticles.slice(1, 4);
    const popularArticles = filteredArticles.slice(4, 10);
    const remainingArticles = filteredArticles.slice(10);

    const totalPages = Math.max(1, Math.ceil(remainingArticles.length / ITEMS_PER_PAGE));
    const paginatedArticles = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return remainingArticles.slice(start, start + ITEMS_PER_PAGE);
    }, [remainingArticles, currentPage]);

    const handlePageChange = (page) => {
        const next = Math.min(Math.max(1, page), totalPages);
        setCurrentPage(next);
        document.getElementById("bl-all")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .bl-page {
          --paper: #000000; --paper-2: #121212; --card: #0d0d0d;
          --ink: #f4f1ea; --ink-2: #bdb8ae; --ink-3: #85807a;
          --rule: #242424; --rule-dark: #3a3a3a;
          --accent: #e8ff47; --on-accent: #0a0a0b;
          --serif: 'Playfair Display', Georgia, serif;
          --sans: 'Inter', system-ui, sans-serif;
          --mono: 'JetBrains Mono', 'Fira Code', monospace;
          background: var(--paper); color: var(--ink); font-family: var(--sans); min-height: 100vh;
        }
        .bl-page *, .bl-page *::before, .bl-page *::after { box-sizing: border-box; }
        .bl-page a { color: inherit; }
        .bl-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
        .bl-section { margin-top: 72px; }

        /* Nav */
        .bl-nav { position: sticky; top: 0; z-index: 1000; background: rgba(0,0,0,0.78); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); border-bottom: 1px solid var(--rule-dark); }
        .bl-nav__inner { max-width: 1120px; margin: 0 auto; padding: 0 24px; height: 68px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
        .bl-nav__brand { display: inline-flex; align-items: center; gap: 10px; font-family: var(--serif); font-weight: 800; font-size: 22px; letter-spacing: -0.01em; color: var(--ink); text-decoration: none; }
        .bl-nav__brand em { color: var(--accent); font-style: normal; }
        .bl-nav__tag { font-family: var(--mono); font-size: 9px; font-weight: 500; letter-spacing: 0.12em; color: var(--ink-3); border: 1px solid var(--rule-dark); padding: 2px 6px; }
        .bl-nav__menu { display: flex; align-items: center; gap: 6px; }
        .bl-nav__link { position: relative; font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-2); text-decoration: none; padding: 10px 14px; transition: color 0.15s; }
        .bl-nav__link::after { content: ''; position: absolute; left: 14px; right: 14px; bottom: 4px; height: 2px; background: var(--accent); transform: scaleX(0); transform-origin: left; transition: transform 0.2s ease; }
        .bl-nav__link:hover, .bl-nav__link--active { color: var(--ink); }
        .bl-nav__link:hover::after, .bl-nav__link--active::after { transform: scaleX(1); }
        .bl-nav__cta { margin-left: 10px; }
        .bl-nav__burger { display: none; width: 40px; height: 40px; border: 1px solid var(--rule-dark); background: transparent; color: var(--ink); cursor: pointer; align-items: center; justify-content: center; }
        @media (max-width: 780px) {
          .bl-nav__inner { height: 60px; }
          .bl-nav__burger { display: inline-flex; }
          .bl-nav__menu { display: none; position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; align-items: stretch; gap: 0; padding: 12px 24px 20px; background: #000; border-bottom: 1px solid var(--rule-dark); }
          .bl-nav__menu--open { display: flex; }
          .bl-nav__link { padding: 14px 0; border-bottom: 1px solid var(--rule); }
          .bl-nav__link::after { display: none; }
          .bl-nav__link--active { color: var(--accent); }
          .bl-nav__cta { margin: 16px 0 0; justify-content: center; }
        }

        /* Buttons */
        .bl-btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em; padding: 10px 16px; border: 1px solid var(--rule-dark); background: transparent; color: var(--ink); cursor: pointer; text-decoration: none; transition: background 0.15s, color 0.15s, transform 0.15s; }
        .bl-btn:hover { background: var(--ink); color: var(--paper); transform: translateY(-1px); }
        .bl-btn--solid { background: var(--accent); border-color: var(--accent); color: var(--on-accent); font-weight: 500; }
        .bl-btn--solid:hover { background: #d4e63c; border-color: #d4e63c; color: var(--on-accent); }

        /* Section heads */
        .bl-kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; }
        .bl-h2 { font-family: var(--serif); font-weight: 800; font-size: clamp(26px, 3.6vw, 38px); line-height: 1.1; color: var(--ink); }
        .bl-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; margin-bottom: 26px; padding-bottom: 14px; border-bottom: 3px double var(--rule-dark); flex-wrap: wrap; }
        .bl-head__note { font-family: var(--mono); font-size: 11px; color: var(--ink-3); }

        /* Masthead */
        .bl-mast { display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; padding: 56px 0 30px; border-bottom: 3px double var(--rule-dark); flex-wrap: wrap; }
        .bl-mast__title { font-family: var(--serif); font-weight: 800; font-size: clamp(44px, 7vw, 76px); line-height: 1; letter-spacing: -0.01em; color: var(--ink); }
        .bl-mast__title em { color: var(--accent); font-style: italic; }
        .bl-mast__dek { max-width: 380px; font-size: 16px; line-height: 1.6; font-weight: 300; color: var(--ink-2); border-left: 3px solid var(--accent); padding-left: 16px; }

        /* Toolbar */
        .bl-toolbar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; padding: 20px 0; border-bottom: 1px solid var(--rule); }
        .bl-cats { display: flex; gap: 8px; flex-wrap: wrap; }
        .bl-cats a { font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em; padding: 8px 14px; border: 1px solid var(--rule-dark); color: var(--ink-2); text-decoration: none; transition: background 0.15s, color 0.15s, border-color 0.15s; }
        .bl-cats a:hover { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
        .bl-search { display: flex; align-items: center; gap: 8px; min-width: 280px; background: var(--card); border: 1px solid var(--rule-dark); padding: 9px 14px; transition: border-color 0.15s; }
        .bl-search:focus-within { border-color: var(--accent); }
        .bl-search svg { color: var(--ink-3); flex-shrink: 0; }
        .bl-search input { background: none; border: none; outline: none; width: 100%; font-family: var(--sans); font-size: 13px; color: var(--ink); }
        .bl-search input::placeholder { color: var(--ink-3); }
        .bl-search button { background: none; border: none; color: var(--ink-3); cursor: pointer; display: flex; padding: 0; }
        .bl-search button:hover { color: var(--ink); }
        .bl-count { font-family: var(--mono); font-size: 10.5px; color: var(--ink-3); margin-top: 6px; }
        .bl-count b { color: var(--accent); font-weight: 500; }
        @media (max-width: 700px) { .bl-search { min-width: 100%; width: 100%; } .bl-toolbar > div:last-child { width: 100%; } }

        /* Shared: images stay clean and bright */
        .bl-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.45s ease; }
        .bl-ph { width: 100%; height: 100%; background: repeating-linear-gradient(45deg, #101010, #101010 6px, #171717 6px, #171717 12px); }
        .bl-chip { position: absolute; top: 12px; left: 12px; font-family: var(--mono); font-size: 9px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; background: var(--accent); color: var(--on-accent); padding: 4px 9px; }
        .bl-meta { display: flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 10.5px; color: var(--ink-3); flex-wrap: wrap; }
        .bl-meta__dot { width: 3px; height: 3px; border-radius: 50%; background: var(--ink-3); flex-shrink: 0; }

        /* Lead + picks */
        .bl-lead { display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px; align-items: stretch; }
        @media (max-width: 900px) { .bl-lead { grid-template-columns: 1fr; } }
        .bl-hero { display: flex; flex-direction: column; background: var(--card); border: 1px solid var(--rule-dark); text-decoration: none; transition: transform 0.2s, box-shadow 0.2s; }
        .bl-hero:hover { transform: translate(-3px, -3px); box-shadow: 5px 5px 0 var(--accent); }
        .bl-hero__media { position: relative; height: 230px; background: #fff; overflow: hidden; border-bottom: 1px solid var(--rule-dark); }
        .bl-hero:hover .bl-img { transform: scale(1.03); }
        .bl-hero__body { padding: 24px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
        .bl-hero__title { font-family: var(--serif); font-weight: 800; font-size: clamp(22px, 2.8vw, 30px); line-height: 1.2; color: var(--ink); }
        .bl-hero:hover .bl-hero__title { color: var(--accent); }
        .bl-hero__preview { font-size: 14px; line-height: 1.7; color: var(--ink-2); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .bl-hero .bl-meta { margin-top: auto; padding-top: 12px; border-top: 1px solid var(--rule); }

        .bl-picks { display: flex; flex-direction: column; border: 1px solid var(--rule-dark); background: var(--card); }
        .bl-pick { display: flex; gap: 14px; padding: 16px; text-decoration: none; border-bottom: 1px solid var(--rule); flex: 1; transition: background 0.15s; }
        .bl-pick:last-child { border-bottom: none; }
        .bl-pick:hover { background: var(--paper-2); }
        .bl-pick__thumb { width: 96px; height: 72px; flex-shrink: 0; overflow: hidden; background: #fff; border: 1px solid var(--rule); }
        .bl-pick:hover .bl-img { transform: scale(1.06); }
        .bl-pick__body { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
        .bl-pick__cat { font-family: var(--mono); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); }
        .bl-pick__title { font-family: var(--serif); font-weight: 800; font-size: 15.5px; line-height: 1.25; color: var(--ink); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .bl-pick:hover .bl-pick__title { color: var(--accent); }

        /* Popular */
        .bl-pops { display: grid; grid-template-columns: 1fr 1fr; column-gap: 44px; }
        @media (max-width: 760px) { .bl-pops { grid-template-columns: 1fr; } }
        .bl-pop { display: grid; grid-template-columns: 44px 1fr; gap: 6px; padding: 18px 0; border-bottom: 1px solid var(--rule); text-decoration: none; }
        .bl-pop__rank { font-family: var(--serif); font-weight: 800; font-size: 28px; line-height: 1; color: var(--accent); }
        .bl-pop__title { font-family: var(--serif); font-weight: 800; font-size: 17px; line-height: 1.3; color: var(--ink); margin-bottom: 6px; }
        .bl-pop:hover .bl-pop__title { color: var(--accent); }
        .bl-pop__meta { display: flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 10.5px; color: var(--ink-3); }

        /* All articles */
        .bl-row { display: grid; grid-template-columns: 1fr 290px; gap: 40px; align-items: start; }
        @media (max-width: 960px) { .bl-row { grid-template-columns: 1fr; } }
        .bl-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 1100px) { .bl-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .bl-grid { grid-template-columns: 1fr; } }
        .bl-card { display: flex; flex-direction: column; background: var(--card); border: 1px solid var(--rule-dark); text-decoration: none; transition: transform 0.2s, box-shadow 0.2s; }
        .bl-card:hover { transform: translate(-3px, -3px); box-shadow: 5px 5px 0 var(--accent); }
        .bl-card__media { position: relative; height: 140px; background: #fff; overflow: hidden; border-bottom: 1px solid var(--rule-dark); }
        .bl-card:hover .bl-img { transform: scale(1.04); }
        .bl-card__body { padding: 18px 18px 16px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
        .bl-card__title { font-family: var(--serif); font-weight: 800; font-size: 18px; line-height: 1.25; color: var(--ink); }
        .bl-card:hover .bl-card__title { color: var(--accent); }
        .bl-card__preview { font-size: 13px; line-height: 1.65; color: var(--ink-3); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .bl-card .bl-meta { margin-top: auto; padding-top: 12px; border-top: 1px solid var(--rule); }

        /* Pager */
        .bl-pager { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 32px; }
        .bl-pager__btn { min-width: 38px; height: 38px; padding: 0 10px; display: inline-flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 12px; background: transparent; color: var(--ink-2); border: 1px solid var(--rule-dark); cursor: pointer; transition: background 0.15s, color 0.15s, border-color 0.15s; }
        .bl-pager__btn:hover:not(:disabled) { color: var(--ink); border-color: var(--ink); }
        .bl-pager__btn--on { background: var(--accent); border-color: var(--accent); color: var(--on-accent); font-weight: 600; }
        .bl-pager__btn:disabled { opacity: 0.35; cursor: not-allowed; }

        /* Sidebar */
        .bl-side { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 92px; }
        @media (max-width: 960px) { .bl-side { position: static; } }
        .bl-side__card { background: var(--card); border: 1px solid var(--rule-dark); border-top: 3px solid var(--accent); padding: 20px; display: flex; flex-direction: column; gap: 10px; align-items: flex-start; }
        .bl-side__kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); }
        .bl-side__title { font-family: var(--serif); font-weight: 800; font-size: 21px; line-height: 1.15; color: var(--ink); }
        .bl-side__text { font-size: 13px; line-height: 1.65; color: var(--ink-2); }
        .bl-side__card .bl-btn { margin-top: 4px; }

        /* Empty */
        .bl-empty { padding: 90px 0; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .bl-empty__title { font-family: var(--serif); font-weight: 800; font-size: 28px; color: var(--ink); }
        .bl-empty__msg { font-size: 14px; color: var(--ink-2); }

        /* Footer CTA */
        .bl-cta { border-top: 3px double var(--rule-dark); padding: 44px 0 96px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; margin-top: 72px; }
        .bl-cta__title { font-family: var(--serif); font-weight: 800; font-size: clamp(26px, 3.6vw, 38px); line-height: 1.1; color: var(--ink); margin-bottom: 8px; }
        .bl-cta__sub { font-size: 14px; color: var(--ink-2); line-height: 1.7; max-width: 480px; }
        .bl-cta__actions { display: flex; flex-wrap: wrap; gap: 10px; }

        .bl-page :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { .bl-page * { transition: none !important; } }
      `}</style>

            <div className="bl-page">
                {/* ── Nav (delete this block if your global Navbar already renders on /blog) ── */}
                <header className="bl-nav">
                    <div className="bl-nav__inner">
                        <Link href="/" className="bl-nav__brand">
                            brown<em>.</em>dev
                            <span className="bl-nav__tag">SBA-01</span>
                        </Link>
                        <button
                            className="bl-nav__burger"
                            aria-label="Toggle menu"
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen((v) => !v)}
                        >
                            {menuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                        <nav className={`bl-nav__menu${menuOpen ? " bl-nav__menu--open" : ""}`} aria-label="Main">
                            <Link href="/bc/about" className="bl-nav__link">About</Link>
                            <Link href="/portfolio" className="bl-nav__link">Portfolio</Link>
                            <Link href="/blog" className="bl-nav__link bl-nav__link--active">Blog</Link>
                            <Link href="/cv" className="bl-nav__link">Resume</Link>
                            <Link href="/bc/contact" className="bl-btn bl-btn--solid bl-nav__cta">
                                Start a project <ArrowRight size={12} />
                            </Link>
                        </nav>
                    </div>
                </header>

                <main className="bl-wrap">
                    {/* Masthead */}
                    <header className="bl-mast">
                        <h1 className="bl-mast__title">
                            The <em>Stack</em>
                        </h1>
                        <p className="bl-mast__dek">
                            Notes on building tech, platforms and businesses across Africa, from the code up.
                        </p>
                    </header>

                    {/* Toolbar */}
                    <div className="bl-toolbar">
                        <nav className="bl-cats" aria-label="Topics">
                            {CATEGORIES.map((cat) => (
                                <Link key={cat.key} href={`/blog/topic/${cat.key}`}>
                                    {cat.label}
                                </Link>
                            ))}
                        </nav>
                        <div>
                            <div className="bl-search">
                                <Search size={14} />
                                <input
                                    type="text"
                                    placeholder="Search articles"
                                    aria-label="Search articles"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                {searchTerm && (
                                    <button onClick={() => setSearchTerm("")} aria-label="Clear search">
                                        <X size={13} />
                                    </button>
                                )}
                            </div>
                            {debounced && (
                                <p className="bl-count">
                                    <b>{filteredArticles.length}</b> result{filteredArticles.length !== 1 ? "s" : ""}
                                </p>
                            )}
                        </div>
                    </div>

                    {filteredArticles.length === 0 ? (
                        <div className="bl-empty">
                            <h2 className="bl-empty__title">No matching articles</h2>
                            <p className="bl-empty__msg">Try a different keyword, or clear the search to see everything.</p>
                            <button className="bl-btn" onClick={() => setSearchTerm("")}>
                                Clear search
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Start here */}
                            {heroArticle && (
                                <section className="bl-section" style={{ marginTop: 48 }}>
                                    <div className="bl-head">
                                        <div>
                                            <div className="bl-kicker">Start here</div>
                                            <h2 className="bl-h2">Editor picks</h2>
                                        </div>
                                        <span className="bl-head__note">The articles most readers open first</span>
                                    </div>
                                    <div className="bl-lead">
                                        <HeroCard article={heroArticle} />
                                        {sideArticles.length > 0 && (
                                            <div className="bl-picks">
                                                {sideArticles.map((a) => (
                                                    <PickItem key={a.slug} article={a} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* Popular */}
                            {popularArticles.length > 0 && (
                                <section className="bl-section">
                                    <div className="bl-head">
                                        <div>
                                            <div className="bl-kicker">Most read</div>
                                            <h2 className="bl-h2">Popular this month</h2>
                                        </div>
                                        <span className="bl-head__note">{popularArticles.length} articles</span>
                                    </div>
                                    <div className="bl-pops">
                                        {popularArticles.map((a, i) => (
                                            <PopularItem key={a.slug} article={a} rank={String(i + 1).padStart(2, "0")} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* All articles */}
                            {remainingArticles.length > 0 && (
                                <section id="bl-all" className="bl-section">
                                    <div className="bl-head">
                                        <div>
                                            <div className="bl-kicker">Browse</div>
                                            <h2 className="bl-h2">All articles</h2>
                                        </div>
                                        <span className="bl-head__note">{remainingArticles.length} articles</span>
                                    </div>
                                    <div className="bl-row">
                                        <div>
                                            <div className="bl-grid">
                                                {paginatedArticles.map((a) => (
                                                    <ArticleCard key={a.slug} article={a} />
                                                ))}
                                            </div>
                                            <Pagination
                                                currentPage={currentPage}
                                                totalPages={totalPages}
                                                onPageChange={handlePageChange}
                                            />
                                        </div>
                                        <Sidebar />
                                    </div>
                                </section>
                            )}
                        </>
                    )}

                    {/* Footer CTA */}
                    <section>
                        <div className="bl-cta">
                            <div>
                                <div className="bl-cta__title">Have a platform to build or a story to run?</div>
                                <p className="bl-cta__sub">
                                    I take on full stack builds, security reviews and sponsored articles. Tell me what you
                                    need and I&apos;ll reply with a plan.
                                </p>
                            </div>
                            <div className="bl-cta__actions">
                                <button className="bl-btn bl-btn--solid" onClick={() => router.push("/bc/contact")}>
                                    <Mail size={12} /> Get in touch
                                </button>
                                <Link href="/portfolio" className="bl-btn">
                                    Portfolio <ArrowUpRight size={12} />
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            <Footer />
        </>
    );
}