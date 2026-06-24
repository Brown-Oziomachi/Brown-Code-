"use client";

import { Suspense } from "react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowUpRight } from "lucide-react";
import Footer from "@/components/footer";

const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Unknown date";
    if (timestamp.seconds && typeof timestamp.seconds === "number") {
        return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
    }
    if (typeof timestamp.toDate === "function") {
        try { return timestamp.toDate().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }); } catch { return "Unknown date"; }
    }
    if (timestamp instanceof Date) return timestamp.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
    try {
        const d = new Date(timestamp);
        if (!isNaN(d.getTime())) return d.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
    } catch { return "Unknown date"; }
    return "Unknown date";
};

const createFullSlug = (title, id) => {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    return `${slug}--${id}`;
};

const getReadingTime = (body = "") =>
    Math.max(1, Math.ceil(body.replace(/<[^>]+>/g, " ").split(/\s+/).length / 200));

const CONTENT_TYPES = [
    { key: "blog", label: "Articles" },
    { key: "video", label: "Videos" },
    { key: "reel", label: "Reels" },
];

const GENRES = ["Cyclopedia"];

/* ── Featured card ── */
const FeaturedCard = ({ post }) => (
    <Link href={`/news/${createFullSlug(post.title, post.id)}`} className="cy-feat-card">
        <div className="cy-feat-card__img-wrap">
            {post.imageUrl
                ? <img src={post.imageUrl} alt={post.title} className="cy-feat-card__img" onError={e => e.target.style.display = "none"} />
                : <div className="cy-feat-card__img-placeholder" />
            }
            <div className="cy-feat-card__overlay" />
        </div>
        <div className="cy-feat-card__body">
            <span className="cy-tag">{post.genre || "General"}</span>
            <h2 className="cy-feat-card__title">{post.title}</h2>
            {post.subtitle && <p className="cy-feat-card__preview">{post.subtitle}</p>}
            <div className="cy-meta">
                <span className="cy-meta__author">Cyclopedia</span>
                <span className="cy-meta__dot" />
                <span>{getReadingTime(post.body)} min read</span>
                <span className="cy-meta__dot" />
                <span>{formatTimestamp(post.timestamp)}</span>
            </div>
        </div>
        <span className="cy-feat-card__arrow-wrap">
            <ArrowUpRight size={14} className="cy-feat-card__arrow" />
        </span>
    </Link>
);

/* ── Standard card ── */
const ArticleCard = ({ post, index }) => (
    <Link href={`/news/${createFullSlug(post.title, post.id)}`} className="cy-card" style={{ animationDelay: `${index * 40}ms` }}>
        <div className="cy-card__img-wrap">
            {post.imageUrl
                ? <img src={post.imageUrl} alt={post.title} className="cy-card__img" onError={e => e.target.style.display = "none"} />
                : <div className="cy-card__img-placeholder" />
            }
        </div>
        <div className="cy-card__body">
            <span className="cy-tag cy-tag--sm">{post.genre || "General"}</span>
            <h3 className="cy-card__title">{post.title}</h3>
            {post.subtitle && <p className="cy-card__preview">{post.subtitle}</p>}
            <div className="cy-meta cy-meta--sm">
                <span className="cy-meta__author">Cyclopedia</span>
                <span className="cy-meta__dot" />
                <span>{formatTimestamp(post.timestamp)}</span>
            </div>
        </div>
    </Link>
);

/* ── Video card ── */
const VideoCard = ({ post, onClick, index }) => {
    const getThumb = () => {
        if (post.thumbnail) return post.thumbnail;
        const m = (post.videoURL || "").match(/(?:youtu\.be\/|v\/|embed\/|watch\?v=)([^#&?]{11})/);
        return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : "/video-placeholder.jpg";
    };
    return (
        <div className="cy-card" style={{ animationDelay: `${index * 40}ms`, cursor: "pointer" }} onClick={() => onClick(post)}>
            <div className="cy-card__img-wrap" style={{ position: "relative" }}>
                <img src={getThumb()} alt={post.title} className="cy-card__img" />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(10,10,11,0.8)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: "var(--accent)", fontSize: 14, marginLeft: 2 }}>▶</span>
                    </div>
                </div>
            </div>
            <div className="cy-card__body">
                <span className="cy-tag cy-tag--sm">{post.genre || "Video"}</span>
                <h3 className="cy-card__title">{post.title}</h3>
                {(post.description || post.body) && (
                    <p className="cy-card__preview">{(post.description || post.body).replace(/<[^>]+>/g, " ").slice(0, 100)}…</p>
                )}
                <div className="cy-meta cy-meta--sm">
                    <span className="cy-meta__author">Cyclopedia</span>
                    <span className="cy-meta__dot" />
                    <span>{formatTimestamp(post.timestamp)}</span>
                </div>
            </div>
        </div>
    );
};

export default function BlogPage() {
    const router = useRouter();
    const [blogPosts, setBlogPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showContentType, setShowContentType] = useState("blog");
    const [firebaseReady, setFirebaseReady] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [adShown, setAdShown] = useState({ video: false, reel: false });

    useEffect(() => {
        import("@/config/firebase.config2")
            .then(() => setFirebaseReady(true))
            .catch(() => setLoading(false));
    }, []);

    const getBasePosts = (posts, type) => {
        if (type === "blog") return posts.filter(p => !p.isVideo);
        if (type === "video") return posts.filter(p => p.isVideo && !p.isReel);
        if (type === "reel") return posts.filter(p => p.isReel);
        return posts;
    };

    useEffect(() => {
        if (!firebaseReady) return;
        setLoading(true);
        const fetch = async () => {
            try {
                const { db2 } = await import("@/config/firebase.config2");
                const { collection, getDocs } = await import("firebase/firestore");
                const snap = await getDocs(collection(db2, "blogs"));
                const blogs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                setBlogPosts(blogs);
                setFilteredPosts(getBasePosts(blogs, showContentType));
            } catch (e) { console.error(e); }
            finally { setLoading(false); }
        };
        fetch();
    }, [firebaseReady, showContentType]);

    // Search + category filter
    useEffect(() => {
        let base = getBasePosts(blogPosts, showContentType);
        if (selectedCategory) base = base.filter(p => p.genre?.toLowerCase() === selectedCategory.toLowerCase());
        if (searchTerm.trim()) {
            const q = searchTerm.toLowerCase();
            base = base.filter(p => p.title?.toLowerCase().includes(q) || p.genre?.toLowerCase().includes(q) || p.subtitle?.toLowerCase().includes(q));
        }
        setFilteredPosts(base);
    }, [searchTerm, selectedCategory]);

    const handleTypeChange = (type) => {
        if ((type === "reel" || type === "video") && !adShown[type]) {
            window.open("https://otieu.com/4/9366150", "_blank");
            setAdShown(p => ({ ...p, [type]: true }));
            return;
        }
        setShowContentType(type);
        setSelectedCategory(null);
        setSearchTerm("");
        setFilteredPosts(getBasePosts(blogPosts, type));
    };

    const openVideo = (post) => {
        if (!post.videoURL) return alert("Video URL missing.");
        router.push(`/video/${post.id}?url=${encodeURIComponent(post.videoURL)}&title=${encodeURIComponent(post.title || "")}&desc=${encodeURIComponent(post.description || post.body || "")}`);
    };

    const featuredPosts = filteredPosts.slice(0, 2);
    const gridPosts = filteredPosts.slice(2);

    if (!firebaseReady || loading) {
        return (
            <div style={{ minHeight: "100vh", background: "#0a0a0b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#52525b" }}>
                    Loading content…
                </span>
            </div>
        );
    }

    return (
        <>
            <style>{`
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                :root {
                    --bg:         #0a0a0b;
                    --surface:    #111113;
                    --border:     #1e1e22;
                    --border-hi:  #2e2e34;
                    --text-1:     #f4f4f5;
                    --text-2:     #a1a1aa;
                    --text-3:     #52525b;
                    --accent:     #e8ff47;
                    --accent-dim: rgba(232,255,71,0.08);
                    --radius:     6px;
                    --font-serif: 'DM Serif Display', 'Georgia', serif;
                    --font-sans:  'Inter', system-ui, sans-serif;
                    --font-mono:  'JetBrains Mono', 'Fira Code', monospace;
                }
                @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

                .cy-page { font-family: var(--font-sans); background: var(--bg); color: var(--text-1); min-height: 100vh; }

                /* Nav */
                .cy-nav {
                    position: sticky; top: 0; z-index: 100;
                    background: rgba(10,10,11,0.92); backdrop-filter: blur(12px);
                    border-bottom: 1px solid var(--border);
                    height: 56px; padding: 0 24px;
                    display: flex; align-items: center; justify-content: space-between;
                }
                .cy-nav__brand { font-family: var(--font-mono); font-size: 12px; font-weight: 500; letter-spacing: 0.08em; color: var(--text-1); text-decoration: none; }
                .cy-nav__brand em { font-style: normal; color: var(--accent); }
                .cy-nav__link {
                    display: inline-flex; align-items: center; gap: 6px;
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    color: var(--text-2); text-decoration: none;
                    padding: 6px 12px; border: 1px solid var(--border); border-radius: var(--radius);
                    transition: color .15s, border-color .15s, background .15s;
                }
                .cy-nav__link:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }

                /* Main */
                .cy-main { max-width: 1200px; margin: 0 auto; padding: 0 24px 80px; }

                /* Masthead */
                .cy-masthead {
                    display: flex; align-items: flex-end; justify-content: space-between;
                    gap: 16px; padding: 52px 0 32px;
                    border-bottom: 1px solid var(--border); margin-bottom: 36px;
                }
                .cy-masthead__eyebrow { font-family: var(--font-mono); font-size: 11px; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px; }
                .cy-masthead__title { font-family: var(--font-serif); font-size: clamp(36px, 5vw, 60px); font-weight: 400; line-height: 1.05; }
                .cy-masthead__desc { font-size: 13px; color: var(--text-2); line-height: 1.6; max-width: 300px; text-align: right; }
                @media (max-width: 700px) {
                    .cy-masthead { flex-direction: column; align-items: flex-start; }
                    .cy-masthead__desc { text-align: left; }
                }

                /* Toolbar */
                .cy-toolbar {
                    display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
                    gap: 16px; margin-bottom: 36px;
                }
                .cy-filters { display: flex; gap: 6px; flex-wrap: wrap; }
                .cy-filter-btn {
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    padding: 6px 14px; border-radius: var(--radius); border: 1px solid var(--border);
                    background: transparent; color: var(--text-2); cursor: pointer;
                    transition: color .15s, border-color .15s, background .15s;
                }
                .cy-filter-btn:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }
                .cy-filter-btn--active { background: var(--accent-dim); border-color: rgba(232,255,71,0.3); color: var(--accent); }

                .cy-search {
                    position: relative; display: flex; align-items: center; gap: 8px;
                    background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
                    padding: 8px 14px; min-width: 260px; transition: border-color .15s;
                }
                .cy-search:focus-within { border-color: var(--border-hi); }
                .cy-search__icon { color: var(--text-3); flex-shrink: 0; }
                .cy-search input { background: none; border: none; outline: none; font-family: var(--font-sans); font-size: 13px; color: var(--text-1); width: 100%; }
                .cy-search input::placeholder { color: var(--text-3); }
                .cy-search__clear { background: none; border: none; color: var(--text-3); cursor: pointer; padding: 0; display: flex; align-items: center; transition: color .15s; }
                .cy-search__clear:hover { color: var(--text-1); }
                .cy-search__count { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); margin-top: 6px; padding-left: 2px; }
                .cy-search__count em { font-style: normal; color: var(--accent); }

                @media (max-width: 700px) {
                    .cy-toolbar { flex-direction: column; align-items: flex-start; }
                    .cy-search { min-width: 100%; width: 100%; }
                }

                /* Section label */
                .cy-section-label {
                    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em;
                    text-transform: uppercase; color: var(--text-3);
                    display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
                }
                .cy-section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }

                /* Tags */
                .cy-tag {
                    display: inline-block; font-family: var(--font-mono); font-size: 10px;
                    letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 8px;
                    border-radius: 3px; background: var(--accent-dim); color: var(--accent);
                    border: 1px solid rgba(232,255,71,0.2); line-height: 1;
                }
                .cy-tag--sm { font-size: 9px; padding: 2px 6px; }

                /* Meta */
                .cy-meta {
                    display: flex; align-items: center; gap: 8px;
                    font-family: var(--font-mono); font-size: 11px; color: var(--text-3); margin-top: 12px;
                }
                .cy-meta--sm { font-size: 10px; margin-top: 10px; }
                .cy-meta__author { color: var(--text-2); }
                .cy-meta__dot { width: 3px; height: 3px; border-radius: 50%; background: var(--border-hi); flex-shrink: 0; }

                /* Featured row */
                .cy-feat-row {
                    display: grid; grid-template-columns: 1fr 1fr;
                    gap: 1px; background: var(--border); border: 1px solid var(--border);
                    border-radius: var(--radius); overflow: hidden; margin-bottom: 48px;
                }
                @media (max-width: 700px) { .cy-feat-row { grid-template-columns: 1fr; } }

                .cy-feat-card {
                    position: relative; display: flex; flex-direction: column;
                    min-height: 380px; overflow: hidden; background: var(--surface);
                    text-decoration: none; transition: background .15s;
                }
                .cy-feat-card:hover { background: #141417; }
                .cy-feat-card::before {
                    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
                    background: var(--accent); transform: scaleY(0); transform-origin: bottom;
                    transition: transform .2s ease; z-index: 5;
                }
                .cy-feat-card:hover::before { transform: scaleY(1); }
                .cy-feat-card__img-wrap { position: relative; height: 200px; background: var(--bg); overflow: hidden; flex-shrink: 0; }
                .cy-feat-card__img { width: 100%; height: 100%; object-fit: cover; opacity: 0.5; filter: grayscale(25%); transition: opacity .3s, transform .4s; }
                .cy-feat-card:hover .cy-feat-card__img { opacity: 0.7; transform: scale(1.03); }
                .cy-feat-card__img-placeholder { width: 100%; height: 100%; background: repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.015) 8px, rgba(255,255,255,0.015) 16px); }
                .cy-feat-card__overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, var(--surface) 100%); transition: background .15s; }
                .cy-feat-card:hover .cy-feat-card__overlay { background: linear-gradient(to bottom, transparent 40%, #141417 100%); }
                .cy-feat-card__body { padding: 20px 24px 24px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
                .cy-feat-card__title { font-family: var(--font-serif); font-size: clamp(18px, 2.2vw, 23px); font-weight: 400; line-height: 1.25; color: var(--text-1); transition: color .15s; }
                .cy-feat-card:hover .cy-feat-card__title { color: #fff; }
                .cy-feat-card__preview { font-size: 13px; color: var(--text-2); line-height: 1.55; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
                .cy-feat-card__arrow-wrap { position: absolute; top: 16px; right: 16px; z-index: 4; }
                .cy-feat-card__arrow { color: var(--text-3); transition: color .15s, transform .15s; }
                .cy-feat-card:hover .cy-feat-card__arrow { color: var(--accent); transform: translate(2px,-2px); }

                /* Grid */
                .cy-grid {
                    display: grid; grid-template-columns: repeat(3, 1fr);
                    gap: 1px; background: var(--border); border: 1px solid var(--border);
                    border-radius: var(--radius); overflow: hidden; margin-bottom: 56px;
                }
                @media (max-width: 900px) { .cy-grid { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 600px) { .cy-grid { grid-template-columns: 1fr; } }

                .cy-card {
                    display: flex; flex-direction: column; background: var(--surface);
                    text-decoration: none; overflow: hidden; position: relative;
                    transition: background .15s; animation: cyFadeUp .4s ease-out both;
                }
                .cy-card:hover { background: #141417; }
                .cy-card::before {
                    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
                    background: var(--accent); transform: scaleY(0); transform-origin: bottom;
                    transition: transform .2s ease; z-index: 5;
                }
                .cy-card:hover::before { transform: scaleY(1); }
                @keyframes cyFadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
                .cy-card__img-wrap { height: 160px; background: var(--bg); overflow: hidden; flex-shrink: 0; }
                .cy-card__img { width: 100%; height: 100%; object-fit: cover; opacity: 0.45; filter: grayscale(25%); transition: opacity .3s, transform .4s; }
                .cy-card:hover .cy-card__img { opacity: 0.65; transform: scale(1.04); }
                .cy-card__img-placeholder { width: 100%; height: 100%; background: repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.015) 6px, rgba(255,255,255,0.015) 12px); }
                .cy-card__body { padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 7px; flex: 1; }
                .cy-card__title { font-family: var(--font-serif); font-size: 17px; font-weight: 400; line-height: 1.3; color: var(--text-1); transition: color .15s; }
                .cy-card:hover .cy-card__title { color: #fff; }
                .cy-card__preview { font-size: 12px; color: var(--text-2); line-height: 1.55; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

                /* Empty */
                .cy-empty { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 80px 0; text-align: center; }
                .cy-empty__code { font-family: var(--font-mono); font-size: 11px; color: var(--text-3); letter-spacing: 0.1em; }
                .cy-empty__msg { font-size: 14px; color: var(--text-2); }
                .cy-empty__reset { font-family: var(--font-mono); font-size: 11px; color: var(--accent); background: none; border: none; cursor: pointer; margin-top: 4px; transition: opacity .15s; }
                .cy-empty__reset:hover { opacity: 0.7; }

                /* CTA */
                .cy-cta {
                    border: 1px solid var(--border); border-radius: var(--radius); background: var(--surface);
                    padding: 40px; text-align: center; position: relative; overflow: hidden; margin-bottom: 48px;
                }
                .cy-cta::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--accent); }
                .cy-cta__title { font-family: var(--font-serif); font-size: 24px; font-weight: 400; color: var(--text-1); margin-bottom: 8px; }
                .cy-cta__desc { font-size: 13px; color: var(--text-2); line-height: 1.6; max-width: 360px; margin: 0 auto 20px; }

                /* Footer row */
                .cy-footer {
                    display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
                    gap: 12px; padding-top: 40px; margin-top: 48px; border-top: 1px solid var(--border);
                }
                .cy-footer__info { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); letter-spacing: 0.06em; }

                .cy-btn {
                    display: inline-flex; align-items: center; gap: 6px;
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    padding: 8px 16px; border-radius: var(--radius); border: 1px solid var(--border);
                    background: transparent; color: var(--text-2); cursor: pointer;
                    text-decoration: none; transition: color .15s, border-color .15s, background .15s;
                }
                .cy-btn:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }
                .cy-btn--accent { border-color: rgba(232,255,71,0.3); color: var(--accent); background: var(--accent-dim); }
                .cy-btn--accent:hover { background: rgba(232,255,71,0.15); border-color: rgba(232,255,71,0.5); color: var(--accent); }
            `}</style>

            <div className="cy-page">
                {/* Nav */}
                <nav className="cy-nav">
                    <a href="/" className="cy-nav__brand">brown<em>.</em>dev <span style={{ color: "var(--text-3)", marginLeft: 6 }}>// cyclopedia</span></a>
                    <a href="/" className="cy-nav__link">← Home</a>
                </nav>

                <main className="cy-main">
                    {/* Masthead */}
                    <header className="cy-masthead">
                        <div>
                            <p className="cy-masthead__eyebrow">Cyclopedia</p>
                            <h1 className="cy-masthead__title">
                                Insights &<br />Stories
                            </h1>
                        </div>
                        <p className="cy-masthead__desc">
                            Unique insights, research, trends, histories, news, politics and expert opinions.
                        </p>
                    </header>

                    {/* Toolbar */}
                    <div className="cy-toolbar">
                        <div className="cy-filters">
                            {CONTENT_TYPES.map(t => (
                                <button
                                    key={t.key}
                                    className={`cy-filter-btn${showContentType === t.key ? " cy-filter-btn--active" : ""}`}
                                    onClick={() => handleTypeChange(t.key)}
                                >
                                    {t.label}
                                </button>
                            ))}
                            {GENRES.map(g => (
                                <button
                                    key={g}
                                    className={`cy-filter-btn${selectedCategory === g ? " cy-filter-btn--active" : ""}`}
                                    onClick={() => setSelectedCategory(selectedCategory === g ? null : g)}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                        <div>
                            <div className="cy-search">
                                <Search size={14} className="cy-search__icon" />
                                <input
                                    type="text"
                                    placeholder="Search articles…"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                                {searchTerm && (
                                    <button className="cy-search__clear" onClick={() => setSearchTerm("")}>
                                        <X size={13} />
                                    </button>
                                )}
                            </div>
                            {searchTerm && (
                                <p className="cy-search__count">
                                    <em>{filteredPosts.length}</em> result{filteredPosts.length !== 1 ? "s" : ""}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    {filteredPosts.length === 0 ? (
                        <div className="cy-empty">
                            <span className="cy-empty__code">NO_RESULTS</span>
                            <p className="cy-empty__msg">No posts match your current filter.</p>
                            <button className="cy-empty__reset" onClick={() => { setSearchTerm(""); setSelectedCategory(null); setShowContentType("blog"); setFilteredPosts(getBasePosts(blogPosts, "blog")); }}>
                                Clear filters
                            </button>
                        </div>
                    ) : showContentType === "blog" ? (
                        <>
                            {featuredPosts.length > 0 && (
                                <>
                                    <p className="cy-section-label">Featured</p>
                                    <div className="cy-feat-row">
                                        {featuredPosts.map(p => <FeaturedCard key={p.id} post={p} />)}
                                    </div>
                                </>
                            )}
                            {gridPosts.length > 0 && (
                                <>
                                    <p className="cy-section-label">All articles</p>
                                    <div className="cy-grid">
                                        {gridPosts.map((p, i) => <ArticleCard key={p.id} post={p} index={i} />)}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <p className="cy-section-label">{showContentType === "video" ? "Videos" : "Reels"}</p>
                            <div className="cy-grid">
                                {filteredPosts.map((p, i) => <VideoCard key={p.id} post={p} onClick={openVideo} index={i} />)}
                            </div>
                        </>
                    )}

                    {/* Share CTA */}
                    <div className="cy-cta">
                        <h2 className="cy-cta__title">Have something to share?</h2>
                        <p className="cy-cta__desc">
                            Share your opinions, suggestions, or topics you'd love to see on the blog.
                        </p>
                        <a
                            href="https://wa.me/+2348142995114?text=Hello,%20my%20name%20is%20[Your%20Name].%20I'd%20like%20to%20share%20some%20information%20with%20Wiz-Blog."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cy-btn cy-btn--accent"
                        >
                            Chat on WhatsApp
                        </a>
                    </div>

                    {/* Footer row */}
                    <footer className="cy-footer">
                        <span className="cy-footer__info">cyclopedia — insights & stories</span>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <a href="https://thecyclopedia.substack.com/subscribe" target="_blank" rel="noopener noreferrer" className="cy-btn cy-btn--accent">Subscribe</a>
                            <a href="/" className="cy-btn">← Home</a>
                        </div>
                    </footer>
                </main>
            </div>

            <Footer />
        </>
    );
}