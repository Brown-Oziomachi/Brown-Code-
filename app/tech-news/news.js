"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
} from "firebase/firestore";
import { db2 } from "@/config/firebase.config2";
import { ArrowLeft, ArrowUpRight, ChevronRight } from "lucide-react";

// ─── helpers ────────────────────────────────────────────────────────────────
const createSlug = (title) =>
    title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const createFullSlug = (title, id) => `${createSlug(title)}--${id}`;

const relativeTime = (ts) => {
    if (!ts?.toDate) return null;
    const date = ts.toDate();
    const diffMs = Date.now() - date;
    const diffDays = Math.floor(diffMs / 86400000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths > 0) return `${diffMonths}mo ago`;
    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return "Just now";
};

const shortDate = (ts) => {
    if (!ts?.toDate) return "";
    return ts
        .toDate()
        .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

// ─── sub-components ─────────────────────────────────────────────────────────

/** Large card for the 2-column hero row */
const HeroCard = ({ post }) => (
    <Link
        href={`/news/${createFullSlug(post.title, post.id)}`}
        className="hero-card"
    >
        <div className="hero-card__image-wrap">
            {post.imageUrl ? (
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="hero-card__img"
                    onError={(e) => (e.target.style.display = "none")}
                />
            ) : (
                <div className="hero-card__img-placeholder" />
            )}
            <div className="hero-card__overlay" />
        </div>

        <div className="hero-card__body">
            <span className="tag">{post.category || "Technology"}</span>
            <h2 className="hero-card__title">{post.title}</h2>
            {post.subtitle && (
                <p className="hero-card__sub">{post.subtitle}</p>
            )}
            <div className="meta">
                <span className="meta__author">{post.author || "Editorial"}</span>
                <span className="meta__dot" />
                <span className="meta__time">{relativeTime(post.createdAt)}</span>
            </div>
        </div>
    </Link>
);

/** Horizontal compact card for the secondary row */
const ListCard = ({ post }) => (
    <Link
        href={`/news/${createFullSlug(post.title, post.id)}`}
        className="list-card"
    >
        <div className="list-card__thumb">
            {post.imageUrl ? (
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="list-card__img"
                    onError={(e) => (e.target.style.display = "none")}
                />
            ) : (
                <div className="list-card__img-placeholder" />
            )}
        </div>
        <div className="list-card__body">
            <span className="tag tag--sm">{post.category || "Technology"}</span>
            <h3 className="list-card__title">{post.title}</h3>
            {post.subtitle && (
                <p className="list-card__sub">{post.subtitle}</p>
            )}
            <div className="meta">
                <span className="meta__author">{post.author || "Editorial"}</span>
                <span className="meta__dot" />
                <span className="meta__time">{relativeTime(post.createdAt)}</span>
            </div>
        </div>
        <ArrowUpRight className="list-card__arrow" size={16} />
    </Link>
);

/** Minimal row for the archive */
const ArchiveRow = ({ post, index }) => (
    <Link
        href={`/news/${createFullSlug(post.title, post.id)}`}
        className="archive-row"
    >
        <span className="archive-row__index">
            {String(index + 1).padStart(2, "0")}
        </span>
        <div className="archive-row__body">
            <h4 className="archive-row__title">{post.title}</h4>
            {post.subtitle && (
                <p className="archive-row__sub">{post.subtitle}</p>
            )}
        </div>
        <div className="archive-row__right">
            <span className="tag tag--xs">{post.category || "Tech"}</span>
            <span className="archive-row__date">{shortDate(post.createdAt)}</span>
        </div>
        <ChevronRight className="archive-row__chevron" size={14} />
    </Link>
);

// ─── page ────────────────────────────────────────────────────────────────────
const TechnologyClient = () => {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTechnologyPosts = async () => {
            try {
                const postsRef = collection(db2, "blogs");
                let q = query(
                    postsRef,
                    where("category", "==", "technology"),
                    orderBy("createdAt", "desc"),
                    limit(50)
                );
                let snap;
                try {
                    snap = await getDocs(q);
                } catch {
                    snap = await getDocs(
                        query(postsRef, orderBy("createdAt", "desc"), limit(50))
                    );
                }
                setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchTechnologyPosts();
    }, []);

    const heroPosts = posts.slice(0, 4);
    const listPosts = posts.slice(5, 9);
    const archivePosts = posts.slice(10, 20);

    return (
        <>
            <style>{`
                /* ── Reset / base ── */
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                /* ── Design tokens ── */
                :root {
                    --bg:        #0a0a0b;
                    --surface:   #111113;
                    --border:    #1e1e22;
                    --border-hi: #2e2e34;
                    --text-1:    #f4f4f5;
                    --text-2:    #a1a1aa;
                    --text-3:    #52525b;
                    --accent:    #e8ff47;
                    --accent-dim: rgba(232,255,71,0.08);
                    --radius:    6px;
                    --font-serif: 'DM Serif Display', 'Georgia', serif;
                    --font-sans:  'Inter', system-ui, sans-serif;
                    --font-mono:  'JetBrains Mono', 'Fira Code', monospace;
                }

                @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

                /* ── Page shell ── */
                .tp-page {
                    font-family: var(--font-sans);
                    background: var(--bg);
                    color: var(--text-1);
                    min-height: 100vh;
                }

                /* ── Nav ── */
                .tp-nav {
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

                .tp-nav__brand {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    text-decoration: none;
                }

                .tp-nav__wordmark {
                    font-family: var(--font-mono);
                    font-size: 12px;
                    font-weight: 500;
                    letter-spacing: 0.08em;
                    color: var(--text-1);
                }

                .tp-nav__wordmark em {
                    font-style: normal;
                    color: var(--accent);
                }

                .tp-nav__back {
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

                .tp-nav__back:hover {
                    color: var(--text-1);
                    border-color: var(--border-hi);
                    background: var(--surface);
                }

                /* ── Inner layout ── */
                .tp-main {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px 80px;
                }

                /* ── Masthead ── */
                .tp-masthead {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 16px;
                    padding: 52px 0 32px;
                    border-bottom: 1px solid var(--border);
                    margin-bottom: 40px;
                }

                .tp-masthead__eyebrow {
                    font-family: var(--font-mono);
                    font-size: 11px;
                    color: var(--accent);
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    margin-bottom: 10px;
                }

                .tp-masthead__title {
                    font-family: var(--font-serif);
                    font-size: clamp(36px, 5vw, 60px);
                    font-weight: 400;
                    line-height: 1.05;
                    letter-spacing: -0.01em;
                    color: var(--text-1);
                }

                .tp-masthead__desc {
                    font-size: 13px;
                    color: var(--text-2);
                    line-height: 1.6;
                    max-width: 360px;
                    text-align: right;
                }

                /* ── Section label ── */
                .section-label {
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

                .section-label::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: var(--border);
                }

                /* ── Tags ── */
                .tag {
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

                .tag--sm { font-size: 9px; padding: 2px 6px; }
                .tag--xs { font-size: 9px; padding: 2px 6px; }

                /* ── Meta ── */
                .meta {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-family: var(--font-mono);
                    font-size: 11px;
                    color: var(--text-3);
                    margin-top: 12px;
                }

                .meta__author { color: var(--text-2); }

                .meta__dot {
                    width: 3px;
                    height: 3px;
                    border-radius: 50%;
                    background: var(--border-hi);
                    flex-shrink: 0;
                }

                /* ── Hero grid ── */
                .hero-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1px;
                    background: var(--border);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    overflow: hidden;
                    margin-bottom: 40px;
                }

                @media (max-width: 700px) {
                    .hero-grid { grid-template-columns: 1fr; }
                }

                .hero-card {
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    text-decoration: none;
                    background: var(--surface);
                    min-height: 360px;
                    overflow: hidden;
                    transition: background 0.15s;
                }

                .hero-card:hover { background: #141417; }

                .hero-card__image-wrap {
                    position: relative;
                    height: 200px;
                    flex-shrink: 0;
                    background: var(--bg);
                    overflow: hidden;
                }

                .hero-card__img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: 0.55;
                    filter: grayscale(30%);
                    transition: opacity 0.3s, transform 0.4s;
                }

                .hero-card:hover .hero-card__img {
                    opacity: 0.7;
                    transform: scale(1.03);
                }

                .hero-card__img-placeholder {
                    width: 100%;
                    height: 100%;
                    background: repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 8px,
                        rgba(255,255,255,0.015) 8px,
                        rgba(255,255,255,0.015) 16px
                    );
                }

                .hero-card__overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, transparent 40%, var(--surface) 100%);
                    transition: background 0.15s;
                }

                .hero-card:hover .hero-card__overlay {
                    background: linear-gradient(to bottom, transparent 40%, #141417 100%);
                }

                .hero-card__body {
                    padding: 20px 24px 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    flex: 1;
                }

                .hero-card__title {
                    font-family: var(--font-serif);
                    font-size: clamp(18px, 2.2vw, 24px);
                    font-weight: 400;
                    line-height: 1.25;
                    color: var(--text-1);
                    transition: color 0.15s;
                }

                .hero-card:hover .hero-card__title { color: #fff; }

                .hero-card__sub {
                    font-size: 13px;
                    color: var(--text-2);
                    line-height: 1.55;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                /* ── List cards ── */
                .list-grid {
                    display: flex;
                    flex-direction: column;
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    overflow: hidden;
                    margin-bottom: 56px;
                }

                .list-card {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    padding: 20px 24px;
                    background: var(--surface);
                    text-decoration: none;
                    border-bottom: 1px solid var(--border);
                    transition: background 0.15s;
                    position: relative;
                }

                .list-card:last-child { border-bottom: none; }
                .list-card:hover { background: #141417; }

                .list-card__thumb {
                    width: 80px;
                    height: 80px;
                    flex-shrink: 0;
                    border-radius: 4px;
                    overflow: hidden;
                    background: var(--bg);
                    border: 1px solid var(--border);
                }

                .list-card__img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: 0.6;
                    filter: grayscale(20%);
                    transition: opacity 0.3s;
                }

                .list-card:hover .list-card__img { opacity: 0.8; }

                .list-card__img-placeholder {
                    width: 100%;
                    height: 100%;
                    background: repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 6px,
                        rgba(255,255,255,0.02) 6px,
                        rgba(255,255,255,0.02) 12px
                    );
                }

                .list-card__body {
                    flex: 1;
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .list-card__title {
                    font-family: var(--font-serif);
                    font-size: 18px;
                    font-weight: 400;
                    line-height: 1.3;
                    color: var(--text-1);
                    transition: color 0.15s;
                }

                .list-card:hover .list-card__title { color: #fff; }

                .list-card__sub {
                    font-size: 13px;
                    color: var(--text-2);
                    line-height: 1.5;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .list-card__arrow {
                    color: var(--text-3);
                    flex-shrink: 0;
                    transition: color 0.15s, transform 0.15s;
                }

                .list-card:hover .list-card__arrow {
                    color: var(--accent);
                    transform: translate(2px, -2px);
                }

                /* ── Archive ── */
                .archive-table {
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    overflow: hidden;
                }

                .archive-row {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    padding: 16px 24px;
                    background: var(--surface);
                    text-decoration: none;
                    border-bottom: 1px solid var(--border);
                    transition: background 0.15s;
                }

                .archive-row:last-child { border-bottom: none; }
                .archive-row:hover { background: #141417; }

                .archive-row__index {
                    font-family: var(--font-mono);
                    font-size: 11px;
                    color: var(--text-3);
                    width: 24px;
                    flex-shrink: 0;
                }

                .archive-row__body {
                    flex: 1;
                    min-width: 0;
                }

                .archive-row__title {
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--text-1);
                    line-height: 1.4;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    transition: color 0.15s;
                }

                .archive-row:hover .archive-row__title { color: #fff; }

                .archive-row__sub {
                    font-size: 12px;
                    color: var(--text-3);
                    margin-top: 2px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .archive-row__right {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 6px;
                    flex-shrink: 0;
                }

                .archive-row__date {
                    font-family: var(--font-mono);
                    font-size: 10px;
                    color: var(--text-3);
                    letter-spacing: 0.04em;
                }

                .archive-row__chevron {
                    color: var(--border-hi);
                    flex-shrink: 0;
                    transition: color 0.15s, transform 0.15s;
                }

                .archive-row:hover .archive-row__chevron {
                    color: var(--text-2);
                    transform: translateX(2px);
                }

                /* ── Loading / empty ── */
                .tp-loading {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 14px;
                    padding: 80px 0;
                }

                .tp-loading__bars {
                    display: flex;
                    gap: 4px;
                    align-items: flex-end;
                }

                .tp-loading__bar {
                    width: 3px;
                    background: var(--accent);
                    border-radius: 2px;
                    animation: barPulse 1s ease-in-out infinite;
                }

                .tp-loading__bar:nth-child(1) { height: 16px; animation-delay: 0s; }
                .tp-loading__bar:nth-child(2) { height: 24px; animation-delay: 0.15s; }
                .tp-loading__bar:nth-child(3) { height: 20px; animation-delay: 0.3s; }
                .tp-loading__bar:nth-child(4) { height: 28px; animation-delay: 0.45s; }
                .tp-loading__bar:nth-child(5) { height: 18px; animation-delay: 0.6s; }

                @keyframes barPulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }

                .tp-loading__text {
                    font-family: var(--font-mono);
                    font-size: 11px;
                    color: var(--text-3);
                    letter-spacing: 0.08em;
                }

                .tp-empty {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    padding: 80px 0;
                    text-align: center;
                }

                .tp-empty__code {
                    font-family: var(--font-mono);
                    font-size: 11px;
                    color: var(--text-3);
                    letter-spacing: 0.1em;
                }

                .tp-empty__msg {
                    font-size: 14px;
                    color: var(--text-2);
                }

                /* ── Footer row ── */
                .tp-footer {
                    padding-top: 40px;
                    margin-top: 56px;
                    border-top: 1px solid var(--border);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                }

                .tp-footer__info {
                    font-family: var(--font-mono);
                    font-size: 10px;
                    color: var(--text-3);
                    letter-spacing: 0.06em;
                }

                .tp-footer__back {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-family: var(--font-mono);
                    font-size: 11px;
                    color: var(--text-2);
                    cursor: pointer;
                    border: none;
                    background: none;
                    padding: 8px 14px;
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    transition: color 0.15s, border-color 0.15s, background 0.15s;
                }

                .tp-footer__back:hover {
                    color: var(--text-1);
                    border-color: var(--border-hi);
                    background: var(--surface);
                }

                /* ── Accent bar on hover focus ── */
                .hero-card::before,
                .list-card::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 2px;
                    background: var(--accent);
                    transform: scaleY(0);
                    transform-origin: bottom;
                    transition: transform 0.2s ease;
                }

                .hero-card:hover::before,
                .list-card:hover::before {
                    transform: scaleY(1);
                }

                @media (max-width: 600px) {
                    .tp-masthead { flex-direction: column; align-items: flex-start; }
                    .tp-masthead__desc { text-align: left; }
                    .list-card { gap: 14px; padding: 16px; }
                    .list-card__thumb { width: 60px; height: 60px; }
                    .archive-row { gap: 12px; padding: 14px 16px; }
                    .archive-row__right { display: none; }
                    .tp-footer { flex-direction: column; align-items: flex-start; }
                }
            `}</style>

            <div className="tp-page">
                {/* ── Nav ── */}
                <nav className="tp-nav">
                    <a href="/" className="tp-nav__brand">
                        <span className="tp-nav__wordmark">
                            brown<em>.</em>dev
                        </span>
                    </a>
                    <a href="/portfolio" className="tp-nav__back">
                        <ArrowLeft size={13} />
                        Portfolio
                    </a>
                </nav>

                <main className="tp-main">
                    {/* ── Masthead ── */}
                    <header className="tp-masthead">
                        <div>
                            <p className="tp-masthead__eyebrow">Technology</p>
                            <h1 className="tp-masthead__title">
                                Tech<br />Coverage
                            </h1>
                        </div>
                        <p className="tp-masthead__desc">
                            Architecture decisions, engineering culture, and the systems shaping how software gets built.
                        </p>
                    </header>

                    {/* ── Content ── */}
                    {loading ? (
                        <div className="tp-loading">
                            <div className="tp-loading__bars">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="tp-loading__bar" />
                                ))}
                            </div>
                            <span className="tp-loading__text">Fetching News…</span>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="tp-empty">
                            <span className="tp-empty__code">404 / EMPTY_RESULT_SET</span>
                            <p className="tp-empty__msg">No news found in this category yet.</p>
                        </div>
                    ) : (
                        <>
                            {/* Hero row */}
                            {heroPosts.length > 0 && (
                                <>
                                    <p className="section-label">Featured</p>
                                    <div className="hero-grid">
                                        {heroPosts.map((post) => (
                                            <HeroCard key={post.id} post={post} />
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* List row */}
                            {listPosts.length > 0 && (
                                <>
                                    <p className="section-label">Latest</p>
                                    <div className="list-grid">
                                        {listPosts.map((post) => (
                                            <ListCard key={post.id} post={post} />
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Archive */}
                            {archivePosts.length > 0 && (
                                <>
                                    <p className="section-label">Archive</p>
                                    <div className="archive-table">
                                        {archivePosts.map((post, i) => (
                                            <ArchiveRow key={post.id} post={post} index={i} />
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    {/* ── Footer ── */}
                    <footer className="tp-footer">
                        <span className="tp-footer__info">
                            brown.dev — technology feed
                        </span>
                        <button
                            className="tp-footer__back"
                            onClick={() => router.push("/portfolio")}
                        >
                            <ArrowLeft size={13} />
                            Back to portfolio
                        </button>
                    </footer>
                </main>
            </div>
        </>
    );
};

export default TechnologyClient;