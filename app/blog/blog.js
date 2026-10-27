"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowRight, ArrowUpRight, Search, X, Mail, Heart,
    ChevronLeft, ChevronRight, MessageCircle,
} from "lucide-react";
import Footer from "@/components/footer";
import { CATEGORIES, CATEGORY_LABELS, getCategoryKey } from "@/lib/blogCategories";

const ITEMS_PER_PAGE = 9;
const SLIDER_COUNT = 5;   // posts in the sliding row
const SPOTLIGHT_COUNT = 4; // posts in the spotlight (2 per row, also on mobile)
const UPDATES_COUNT = 6;   // posts in the compact "New updates" box
const CHANNEL_URL = "https://whatsapp.com/channel/0029VbEGWFsC1FuAo5qoPh0q";

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

/* distance the track moves for one slide (card width + gap) */
const getStep = (el) => {
    const first = el && el.children[0];
    if (!first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return first.offsetWidth + gap;
};

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

function ArticleCard({ article, tall = false }) {
    return (
        <Link href={`/blog/${article.slug}`} className={`bl-card${tall ? " bl-card--tall" : ""}`}>
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

/* Big card that stands on its own */
function FeatureCard({ article }) {
    return (
        <Link href={`/blog/${article.slug}`} className="bl-feature">
            <div className="bl-feature__media">
                <Cover src={article.image} alt={article.title} className="bl-img" />
                <span className="bl-chip">{labelOf(article)}</span>
            </div>
            <div className="bl-feature__body">
                <h3 className="bl-feature__title">{article.title}</h3>
                <p className="bl-feature__preview">{article.preview}</p>
                <div className="bl-feature__foot">
                    <Meta article={article} />
                    <span className="bl-feature__cta">
                        Read article <ArrowUpRight size={13} />
                    </span>
                </div>
            </div>
        </Link>
    );
}

/* Compact list box: small picture on the left, title on the right */
function UpdatesBox({ articles }) {
    return (
        <div className="bl-upd">
            <h2 className="bl-upd__label">New Updates</h2>
            <div className="bl-upd__list">
                {articles.map((a) => (
                    <Link key={a.slug} href={`/blog/${a.slug}`} className="bl-upd__item">
                        <div className="bl-upd__thumb">
                            <Cover src={a.image} alt={a.title} className="bl-upd__img" />
                        </div>
                        <div className="bl-upd__body">
                            <p className="bl-upd__title">{a.title}</p>
                            <span className="bl-upd__cat">{labelOf(a)}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

/* Side by side cards that slide */
function Slider({ articles }) {
    const trackRef = useRef(null);
    const [active, setActive] = useState(0);
    const [steps, setSteps] = useState(Math.max(1, articles.length));
    const [paused, setPaused] = useState(false);

    // How many positions the track can rest on (depends on cards per screen)
    const measure = useCallback(() => {
        const el = trackRef.current;
        const w = getStep(el);
        if (!el || !w) return;
        const max = el.scrollWidth - el.clientWidth;
        setSteps(Math.max(1, Math.round(max / w) + 1));
    }, []);

    useEffect(() => {
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [measure, articles.length]);

    const onScroll = () => {
        const el = trackRef.current;
        const w = getStep(el);
        if (!el || !w) return;
        setActive(Math.min(steps - 1, Math.max(0, Math.round(el.scrollLeft / w))));
    };

    const goTo = (i) => {
        const el = trackRef.current;
        const w = getStep(el);
        if (!el || !w) return;
        const next = Math.min(steps - 1, Math.max(0, i));
        el.scrollTo({ left: next * w, behavior: "smooth" });
    };

    // Auto-slide every 5s. Stops on hover/touch/focus and for reduced-motion users.
    useEffect(() => {
        if (paused || steps <= 1) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setInterval(() => goTo(active + 1 >= steps ? 0 : active + 1), 5000);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paused, active, steps]);

    return (
        <div
            className="bl-slider"
            role="region"
            aria-roledescription="carousel"
            aria-label="Latest articles"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
        >
            <div className="bl-slider__bar">
                <div className="bl-slider__arrows">
                    <button
                        className="bl-arrow"
                        onClick={() => goTo(active - 1)}
                        disabled={active === 0}
                        aria-label="Previous articles"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        className="bl-arrow"
                        onClick={() => goTo(active + 1)}
                        disabled={active >= steps - 1}
                        aria-label="Next articles"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className="bl-track" ref={trackRef} onScroll={onScroll}>
                {articles.map((a) => (
                    <div className="bl-slide" key={a.slug}>
                        <ArticleCard article={a} tall />
                    </div>
                ))}
            </div>

            {steps > 1 && (
                <div className="bl-dots" role="tablist" aria-label="Choose slide">
                    {Array.from({ length: steps }, (_, i) => (
                        <button
                            key={i}
                            role="tab"
                            aria-selected={i === active}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`bl-dot${i === active ? " bl-dot--on" : ""}`}
                            onClick={() => goTo(i)}
                        />
                    ))}
                </div>
            )}
        </div>
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
                <p className="bl-side__kicker">Follow along</p>
                <h3 className="bl-side__title">WhatsApp channel</h3>
                <p className="bl-side__text">
                    New articles and fraud alerts, sent straight to your phone.
                </p>
                <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="bl-btn">
                    <MessageCircle size={12} /> Join channel
                </a>
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

    const searching = Boolean(debounced);

    // Normal view: 5 sliding, then 2 standing alone, then the rest with pagination.
    // While searching, every match goes into the paginated list instead.
    const sliderArticles = searching ? [] : filteredArticles.slice(0, SLIDER_COUNT);
    const spotlightArticles = searching
        ? []
        : filteredArticles.slice(SLIDER_COUNT, SLIDER_COUNT + SPOTLIGHT_COUNT);
    const updatesArticles = searching
        ? []
        : filteredArticles.slice(
            SLIDER_COUNT + SPOTLIGHT_COUNT,
            SLIDER_COUNT + SPOTLIGHT_COUNT + UPDATES_COUNT
        );
    const remainingArticles = searching
        ? filteredArticles
        : filteredArticles.slice(SLIDER_COUNT + SPOTLIGHT_COUNT + UPDATES_COUNT);

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
          --paper: #ffffff; --paper-2: #f6f5f0; --card: #ffffff;
          --ink: #111111; --ink-2: #3f3f3f; --ink-3: #6f6f6f;
          --rule: #e4e2da; --rule-dark: #111111;
          --accent: #e8ff47; --on-accent: #0a0a0b;
          --serif: 'Playfair Display', Georgia, serif;
          --sans: 'Inter', system-ui, sans-serif;
          --mono: 'JetBrains Mono', 'Fira Code', monospace;
          background: var(--paper); color: var(--ink); font-family: var(--sans); min-height: 100vh;
          padding-top: 90px; /* room for the fixed site navbar */
        }
        .bl-page *, .bl-page *::before, .bl-page *::after { box-sizing: border-box; }
        .bl-page h1, .bl-page h2, .bl-page h3, .bl-page p { margin: 0; }
        :where(.bl-page a) { color: inherit; text-decoration: none; }
        .bl-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
        .bl-section { margin-top: 72px; }

        /* Buttons */
        .bl-btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em; padding: 10px 16px; border: 1.5px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; transition: background 0.15s, color 0.15s, transform 0.15s; }
        .bl-btn:hover { background: var(--ink); color: #fff; transform: translateY(-1px); }
        .bl-btn--solid { background: var(--accent); color: var(--on-accent); font-weight: 600; }
        .bl-btn--solid:hover { background: var(--ink); color: var(--accent); }

        /* Section heads */
        .bl-kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 8px; }
        .bl-kicker b { background: var(--accent); color: var(--on-accent); padding: 2px 7px; font-weight: 500; }
        .bl-h2 { font-family: var(--serif); font-weight: 800; font-size: clamp(26px, 3.6vw, 38px); line-height: 1.1; }
        .bl-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; margin-bottom: 26px; padding-top: 12px; border-top: 3px solid var(--rule-dark); flex-wrap: wrap; }
        .bl-head__note { font-family: var(--mono); font-size: 11px; color: var(--ink-3); }

        /* Masthead */
        .bl-mast { display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; padding: 40px 0 30px; border-bottom: 3px solid var(--rule-dark); flex-wrap: wrap; }
        .bl-mast__title { font-family: var(--serif); font-weight: 800; font-size: clamp(44px, 7vw, 76px); line-height: 1; letter-spacing: -0.02em; }
        .bl-mast__title em { font-style: italic; background: linear-gradient(transparent 62%, var(--accent) 62%); }
        .bl-mast__dek { max-width: 380px; font-size: 16px; line-height: 1.6; font-weight: 300; color: var(--ink-2); border-left: 3px solid var(--accent); padding-left: 16px; }

        /* Toolbar */
        .bl-toolbar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; padding: 20px 0; border-bottom: 1px solid var(--rule); }
        .bl-cats { display: flex; gap: 8px; flex-wrap: wrap; }
        .bl-cats a { font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em; padding: 8px 14px; border: 1px solid var(--rule-dark); color: var(--ink-2); transition: background 0.15s, color 0.15s; }
        .bl-cats a:hover { background: var(--accent); color: var(--on-accent); }
        .bl-search { display: flex; align-items: center; gap: 8px; min-width: 280px; background: #fff; border: 1.5px solid #c9c6bc; padding: 9px 14px; transition: border-color 0.15s, box-shadow 0.15s; }
        .bl-search:focus-within { border-color: var(--ink); box-shadow: 4px 4px 0 var(--accent); }
        .bl-search svg { color: var(--ink-3); flex-shrink: 0; }
        .bl-search input { background: none; border: none; outline: none; width: 100%; font-family: var(--sans); font-size: 13px; color: var(--ink); }
        .bl-search input::placeholder { color: #9a978f; }
        .bl-search button { background: none; border: none; color: var(--ink-3); cursor: pointer; display: flex; padding: 0; }
        .bl-search button:hover { color: var(--ink); }
        .bl-count { font-family: var(--mono); font-size: 10.5px; color: var(--ink-3); margin-top: 6px; }
        .bl-count b { background: var(--accent); color: var(--on-accent); padding: 0 4px; font-weight: 500; }
        @media (max-width: 700px) { .bl-search { min-width: 100%; width: 100%; } .bl-toolbar > div:last-child { width: 100%; } }

        /* Shared */
        .bl-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.45s ease; }
        .bl-ph { width: 100%; height: 100%; background: repeating-linear-gradient(45deg, #ebe8e0, #ebe8e0 6px, #e3e0d7 6px, #e3e0d7 12px); }
        .bl-chip { position: absolute; top: 12px; left: 12px; font-family: var(--mono); font-size: 9px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; background: var(--accent); color: var(--on-accent); padding: 4px 9px; border: 1px solid var(--ink); }
        .bl-meta { display: flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 10.5px; color: var(--ink-3); flex-wrap: wrap; }
        .bl-meta__dot { width: 3px; height: 3px; border-radius: 50%; background: var(--ink-3); flex-shrink: 0; }

        /* Slider */
        .bl-slider__bar { display: flex; justify-content: flex-end; margin: 0 0 14px; }
        .bl-slider__arrows { display: flex; gap: 8px; }
        .bl-arrow { width: 38px; height: 38px; display: inline-flex; align-items: center; justify-content: center; background: var(--card); color: var(--ink); border: 1.5px solid var(--ink); cursor: pointer; transition: background 0.15s, color 0.15s; }
        .bl-arrow:hover:not(:disabled) { background: var(--accent); }
        .bl-arrow:disabled { opacity: 0.35; cursor: not-allowed; }
        .bl-track { display: flex; gap: 20px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; -ms-overflow-style: none; padding: 4px 8px 12px 0; overscroll-behavior-x: contain; }
        .bl-track::-webkit-scrollbar { display: none; }
        .bl-slide { flex: 0 0 calc((100% - 48px) / 3); scroll-snap-align: start; display: flex; }
        .bl-slide .bl-card { width: 100%; }
        @media (max-width: 1000px) { .bl-slide { flex-basis: calc((100% - 28px) / 2); } }
        @media (max-width: 600px) { .bl-track { gap: 14px; } .bl-slide { flex-basis: 84%; } }
        .bl-dots { display: flex; justify-content: center; gap: 8px; margin-top: 8px; }
        .bl-dot { width: 10px; height: 10px; padding: 0; border: 1.5px solid var(--ink); background: transparent; cursor: pointer; transition: background 0.15s, width 0.2s; }
        .bl-dot--on { background: var(--accent); width: 26px; }
        @media (max-width: 560px) { .bl-slider__bar { display: none; } }

        /* Spotlight (2 standing alone) */
        .bl-spot { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .bl-feature { display: flex; flex-direction: column; background: var(--card); border: 1px solid var(--rule-dark); transition: transform 0.2s, box-shadow 0.2s; }
        .bl-feature:hover { transform: translate(-3px, -3px); box-shadow: 6px 6px 0 var(--accent); }
        .bl-feature__media { position: relative; height: 230px; background: var(--paper-2); overflow: hidden; border-bottom: 1px solid var(--rule-dark); }
        .bl-feature:hover .bl-img { transform: scale(1.04); }
        .bl-feature__body { padding: 24px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
        .bl-feature__title { font-family: var(--serif); font-weight: 800; font-size: clamp(22px, 2.6vw, 28px); line-height: 1.2; }
        .bl-feature:hover .bl-feature__title { text-decoration: underline; text-underline-offset: 4px; }
        .bl-feature__preview { font-size: 14px; line-height: 1.7; color: var(--ink-2); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .bl-feature__foot { margin-top: auto; padding-top: 14px; border-top: 1px solid var(--rule); display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .bl-feature__cta { display: inline-flex; align-items: center; gap: 5px; font-family: var(--mono); font-size: 11px; font-weight: 600; letter-spacing: 0.06em; background: var(--accent); color: var(--on-accent); padding: 4px 9px; border: 1px solid var(--ink); }

        @media (max-width: 860px) { .bl-spot { gap: 16px; } .bl-feature__media { height: 190px; } }
        @media (max-width: 560px) {
          .bl-spot { gap: 12px; }
          .bl-feature__media { height: 110px; }
          .bl-feature .bl-chip { top: 8px; left: 8px; font-size: 8px; padding: 3px 6px; }
          .bl-feature__body { padding: 12px; gap: 8px; }
          .bl-feature__title { font-size: 15px; line-height: 1.25; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
          .bl-feature__preview, .bl-feature__cta { display: none; }
          .bl-feature__foot { padding-top: 8px; }
          .bl-feature .bl-meta { font-size: 9.5px; gap: 5px; }
        }

        /* New Updates box */
        .bl-upd { --bl-teal: #0f766e; padding: 18px 22px 6px; background: #f6f7f9; border: 1px solid #dfe2e7; border-radius: 12px; }
        .bl-upd__label { font-family: var(--sans); font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--bl-teal); margin: 0 0 6px; }
        .bl-upd__list { display: grid; grid-template-columns: 1fr 1fr; column-gap: 40px; }
        .bl-upd__item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-top: 1px solid #e4e6ea; }
        .bl-upd__item:nth-child(-n+2) { border-top: none; }
        .bl-upd__thumb { width: 64px; height: 64px; flex-shrink: 0; border-radius: 8px; overflow: hidden; background: #e8eaee; }
        .bl-upd__img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .bl-upd__body { min-width: 0; display: flex; flex-direction: column; gap: 4px; }
        .bl-upd__title { font-family: var(--sans); font-size: 14px; font-weight: 600; line-height: 1.4; color: #111; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .bl-upd__cat { font-family: var(--sans); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: #6b7280; }
        .bl-upd__item:hover .bl-upd__title { color: var(--bl-teal); }
        @media (max-width: 760px) {
          .bl-upd { padding: 14px 14px 2px; }
          .bl-upd__list { grid-template-columns: 1fr; }
          .bl-upd__item:nth-child(2) { border-top: 1px solid #e4e6ea; }
          .bl-upd__thumb { width: 56px; height: 56px; }
          .bl-upd__title { font-size: 13.5px; }
        }

        /* All articles */
        .bl-row { display: grid; grid-template-columns: 1fr 290px; gap: 40px; align-items: start; }
        @media (max-width: 960px) { .bl-row { grid-template-columns: 1fr; } }
        .bl-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 1100px) { .bl-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .bl-grid { grid-template-columns: 1fr; } }
        .bl-card { display: flex; flex-direction: column; background: var(--card); border: 1px solid var(--rule-dark); transition: transform 0.2s, box-shadow 0.2s; }
        .bl-card:hover { transform: translate(-3px, -3px); box-shadow: 6px 6px 0 var(--accent); }
        .bl-card__media { position: relative; height: 140px; background: var(--paper-2); overflow: hidden; border-bottom: 1px solid var(--rule-dark); }
        .bl-card--tall .bl-card__media { height: 190px; }
        .bl-card:hover .bl-img { transform: scale(1.04); }
        .bl-card__body { padding: 18px 18px 16px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
        .bl-card__title { font-family: var(--serif); font-weight: 800; font-size: 18px; line-height: 1.25; }
        .bl-card--tall .bl-card__title { font-size: 19px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .bl-card:hover .bl-card__title { text-decoration: underline; text-underline-offset: 3px; }
        .bl-card__preview { font-size: 13px; line-height: 1.65; color: var(--ink-3); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .bl-card .bl-meta { margin-top: auto; padding-top: 12px; border-top: 1px solid var(--rule); }

        /* Pager */
        .bl-pager { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 32px; }
        .bl-pager__btn { min-width: 38px; height: 38px; padding: 0 10px; display: inline-flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 12px; background: transparent; color: var(--ink-2); border: 1px solid var(--rule-dark); cursor: pointer; transition: background 0.15s, color 0.15s; }
        .bl-pager__btn:hover:not(:disabled) { background: var(--ink); color: #fff; }
        .bl-pager__btn--on { background: var(--accent); color: var(--on-accent); font-weight: 600; }
        .bl-pager__btn--on:hover:not(:disabled) { background: var(--accent); color: var(--on-accent); }
        .bl-pager__btn:disabled { opacity: 0.35; cursor: not-allowed; }

        /* Sidebar */
        .bl-side { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 110px; }
        @media (max-width: 960px) { .bl-side { position: static; } }
        .bl-side__card { background: var(--card); border: 1px solid var(--rule-dark); border-top: 4px solid var(--accent); padding: 20px; display: flex; flex-direction: column; gap: 10px; align-items: flex-start; }
        .bl-side__kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); }
        .bl-side__title { font-family: var(--serif); font-weight: 800; font-size: 21px; line-height: 1.15; }
        .bl-side__text { font-size: 13px; line-height: 1.65; color: var(--ink-2); }
        .bl-side__card .bl-btn { margin-top: 4px; }

        /* Empty */
        .bl-empty { padding: 90px 0; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .bl-empty__title { font-family: var(--serif); font-weight: 800; font-size: 28px; }
        .bl-empty__msg { font-size: 14px; color: var(--ink-2); }

        /* Footer CTA */
        .bl-cta { margin-top: 88px; background: var(--ink); color: #f4f1ea; border-top: 5px solid var(--accent); padding: 44px 40px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
        @media (max-width: 640px) { .bl-cta { padding: 32px 22px; } }
        .bl-cta__title { font-family: var(--serif); font-weight: 800; font-size: clamp(26px, 3.6vw, 38px); line-height: 1.1; margin-bottom: 8px; }
        .bl-cta__sub { font-size: 14px; color: #bdb8ae; line-height: 1.7; max-width: 480px; }
        .bl-cta__actions { display: flex; flex-wrap: wrap; gap: 10px; }
        .bl-cta .bl-btn { border-color: #f4f1ea; color: #f4f1ea; }
        .bl-cta .bl-btn:hover { background: #f4f1ea; color: var(--ink); }
        .bl-cta .bl-btn--solid { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
        .bl-cta .bl-btn--solid:hover { background: #fff; border-color: #fff; color: var(--ink); }
        .bl-end { height: 24px; }

        @media (max-width: 640px) { .bl-wrap { padding-left: 18px; padding-right: 18px; } .bl-page { padding-top: 76px; } }
        .bl-page :focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { .bl-page * { transition: none !important; } .bl-track { scroll-behavior: auto; } }
      `}</style>

            <div className="bl-page">
                <main className="bl-wrap">
                    {/* Masthead */}
                    <header className="bl-mast">
                        <h1 className="bl-mast__title">
                            The <em>Stack</em>
                        </h1>
                        <p className="bl-mast__dek">
                            Notes on tech, fraud awareness, business and faith across Africa, from the code up.
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
                            {/* 1. Sliding row: the 5 newest posts side by side */}
                            {sliderArticles.length > 0 && (
                                <section className="bl-section" style={{ marginTop: 48 }}>
                                    <div className="bl-head">
                                        <div>
                                            <div className="bl-kicker"><b>Just published</b></div>
                                            <h2 className="bl-h2">Latest articles</h2>
                                        </div>
                                        <span className="bl-head__note">Slide to see more</span>
                                    </div>
                                    <Slider articles={sliderArticles} />
                                </section>
                            )}

                            {/* 2. Two posts standing alone */}
                            {spotlightArticles.length > 0 && (
                                <section className="bl-section">
                                    <div className="bl-head">
                                        <div>
                                            <div className="bl-kicker">Don&apos;t miss</div>
                                            <h2 className="bl-h2">In the spotlight</h2>
                                        </div>
                                        <span className="bl-head__note">Four reads worth your time</span>
                                    </div>
                                    <div className="bl-spot">
                                        {spotlightArticles.map((a) => (
                                            <FeatureCard key={a.slug} article={a} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* 3. Compact "New Updates" list */}
                            {updatesArticles.length > 0 && (
                                <section className="bl-section">
                                    <UpdatesBox articles={updatesArticles} />
                                </section>
                            )}

                            {/* 4. Everything else, paginated */}
                            {remainingArticles.length > 0 && (
                                <section
                                    id="bl-all"
                                    className="bl-section"
                                    style={searching ? { marginTop: 40 } : undefined}
                                >
                                    <div className="bl-head">
                                        <div>
                                            <div className="bl-kicker">Browse</div>
                                            <h2 className="bl-h2">{searching ? "Search results" : "All articles"}</h2>
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
                        <div className="bl-end" />
                    </section>
                </main>
            </div>

            <Footer />
        </>
    );
}