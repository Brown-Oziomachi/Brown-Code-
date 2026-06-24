"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock, Link as LinkIcon } from "lucide-react";
import Footer from "@/components/footer";

const createSlug = (title) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const extractIdFromSlug = (slug) => {
    const parts = slug.split("--");
    return parts.length > 1 ? parts[parts.length - 1] : slug;
};

const createFullSlug = (title, id) => `${createSlug(title)}--${id}`;

const BlogDisplay = ({ body }) => {
    const isHTML = /<\/?[a-z][\s\S]*>/i.test(body || "");
    const html = isHTML ? body : (body || "").replace(/\n/g, "<br />");
    return (
        <div
            className="cy-article__body"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};

export default function NewsDetails() {
    const { id: slugParam } = useParams();
    const router = useRouter();
    const [article, setArticle] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [firebaseReady, setFirebaseReady] = useState(false);
    const [readingTime, setReadingTime] = useState(0);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        import("@/config/firebase.config2")
            .then(() => setFirebaseReady(true))
            .catch(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (article?.body) {
            const words = article.body.replace(/<[^>]+>/g, " ").split(/\s+/).length;
            setReadingTime(Math.max(1, Math.ceil(words / 200)));
        }
    }, [article]);

    useEffect(() => {
        if (!slugParam || !firebaseReady) return;
        setIsLoading(true);
        const fetch = async () => {
            try {
                const { db2 } = await import("@/config/firebase.config2");
                const { doc, getDoc } = await import("firebase/firestore");
                const docId = extractIdFromSlug(slugParam);
                const snap = await getDoc(doc(db2, "blogs", docId));
                if (snap.exists()) setArticle({ id: docId, ...snap.data() });
            } catch (e) { console.error(e); }
            finally { setIsLoading(false); }
        };
        fetch();
    }, [slugParam, firebaseReady]);

    useEffect(() => {
        if (article && slugParam && !slugParam.includes("--")) {
            router.replace(`/news/${createFullSlug(article.title, article.id)}`);
        }
    }, [article, slugParam, router]);

    useEffect(() => {
        if (!article || !firebaseReady) return;
        const fetch = async () => {
            try {
                const { db2 } = await import("@/config/firebase.config2");
                const { collection, getDocs } = await import("firebase/firestore");
                const snap = await getDocs(collection(db2, "blogs"));
                const all = snap.docs
                    .map(d => ({ id: d.id, ...d.data() }))
                    .filter(a => a.id !== article.id && !a.isVideo)
                    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
                setRelatedArticles(all.slice(0, 6));
            } catch (e) { console.error(e); }
        };
        fetch();
    }, [article, firebaseReady]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatDate = (ts) => {
        if (!ts) return "";
        try {
            const d = typeof ts.toDate === "function" ? ts.toDate() : new Date(ts.seconds * 1000);
            return d.toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" });
        } catch { return ""; }
    };

    if (!firebaseReady || isLoading) {
        return (
            <div style={{ minHeight: "100vh", background: "#0a0a0b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#52525b" }}>
                    Loading news…
                </span>
            </div>
        );
    }

    if (!article) {
        return (
            <div style={{ minHeight: "100vh", background: "#0a0a0b", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
                <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 28, color: "#f4f4f5" }}>Article not found</span>
                <Link href="/" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#e8ff47", textDecoration: "none" }}>← Return home</Link>
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
                .cy-nav__back {
                    display: inline-flex; align-items: center; gap: 6px;
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    color: var(--text-2); text-decoration: none;
                    padding: 6px 12px; border: 1px solid var(--border); border-radius: var(--radius);
                    transition: color .15s, border-color .15s, background .15s;
                }
                .cy-nav__back:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }

                /* Article layout */
                .cy-article-wrap { max-width: 760px; margin: 0 auto; padding: 52px 24px 80px; }

                /* Header */
                .cy-article__eyebrow {
                    display: flex; align-items: center; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;
                }
                .cy-tag {
                    display: inline-block; font-family: var(--font-mono); font-size: 10px;
                    letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 10px;
                    border-radius: 3px; background: var(--accent-dim); color: var(--accent);
                    border: 1px solid rgba(232,255,71,0.2); line-height: 1;
                }
                .cy-article__readtime {
                    display: flex; align-items: center; gap: 5px;
                    font-family: var(--font-mono); font-size: 10px; color: var(--text-3);
                }

                .cy-article__title {
                    font-family: var(--font-serif);
                    font-size: clamp(28px, 4vw, 44px); font-weight: 400; line-height: 1.15;
                    color: var(--text-1); margin-bottom: 20px;
                }

                .cy-article__meta {
                    display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
                    font-family: var(--font-mono); font-size: 11px; color: var(--text-3);
                    padding-bottom: 20px; border-bottom: 1px solid var(--border); margin-bottom: 28px;
                }
                .cy-article__meta-author { color: var(--accent); }
                .cy-article__meta-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--border-hi); }

                /* Share strip */
                .cy-share {
                    display: flex; align-items: center; gap: 8px; margin-bottom: 32px; flex-wrap: wrap;
                }
                .cy-share__label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-right: 4px; }
                .cy-share__btn {
                    display: inline-flex; align-items: center; gap: 5px;
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.05em;
                    padding: 6px 12px; border: 1px solid var(--border); border-radius: var(--radius);
                    background: var(--surface); color: var(--text-2); cursor: pointer;
                    text-decoration: none; transition: color .15s, border-color .15s, background .15s;
                }
                .cy-share__btn:hover { color: var(--text-1); border-color: var(--border-hi); }
                .cy-share__btn--accent { border-color: rgba(232,255,71,0.3); color: var(--accent); background: var(--accent-dim); }

                /* Subtitle callout */
                .cy-article__subtitle {
                    border-left: 2px solid var(--accent); padding: 12px 20px;
                    background: var(--surface); border-radius: 0 var(--radius) var(--radius) 0;
                    font-size: 15px; color: var(--text-2); line-height: 1.65;
                    font-style: italic; margin-bottom: 28px;
                }

                /* Image */
                .cy-article__img-wrap { margin-bottom: 36px; border: 1px solid var(--border);  overflow: hidden; }
                .cy-article__img { width: 100%; height: auto; display: block; opacity: 0.9; }
                .cy-article__caption { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); padding: 8px 12px; border-top: 1px solid var(--border); }

                /* Body prose */
                .cy-article__body {
                    font-size: 15px; color: var(--text-2); line-height: 1.8;
                    border-bottom: 1px solid var(--border); padding-bottom: 40px; margin-bottom: 40px;
                }
                .cy-article__body h1,
                .cy-article__body h2,
                .cy-article__body h3 { font-family: var(--font-serif); font-weight: 400; color: var(--text-1); margin: 28px 0 12px; line-height: 1.2; }
                .cy-article__body h1 { font-size: 28px; }
                .cy-article__body h2 { font-size: 22px; }
                .cy-article__body h3 { font-size: 18px; }
                .cy-article__body p { margin-bottom: 16px; }
                .cy-article__body a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }
                .cy-article__body img { max-width: 100%; border-radius: var(--radius); margin: 16px 0; }
                .cy-article__body blockquote {
                    border-left: 2px solid var(--accent); padding: 10px 18px;
                    background: var(--surface); margin: 20px 0; color: var(--text-2); font-style: italic;
                }
                .cy-article__body ul, .cy-article__body ol { padding-left: 20px; margin-bottom: 16px; }
                .cy-article__body li { margin-bottom: 6px; }
                .cy-article__body strong { color: var(--text-1); font-weight: 600; }

                /* Subscribe CTA */
                .cy-subscribe {
                    border: 1px solid var(--border); border-radius: var(--radius);
                    background: var(--surface); padding: 36px; text-align: center;
                    position: relative; overflow: hidden; margin-bottom: 48px;
                }
                .cy-subscribe::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--accent); }
                .cy-subscribe__title { font-family: var(--font-serif); font-size: 24px; font-weight: 400; color: var(--text-1); margin-bottom: 8px; }
                .cy-subscribe__desc { font-size: 13px; color: var(--text-2); line-height: 1.6; max-width: 340px; margin: 0 auto 20px; }

                .cy-btn {
                    display: inline-flex; align-items: center; gap: 6px;
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    padding: 8px 18px; border-radius: var(--radius); border: 1px solid var(--border);
                    background: transparent; color: var(--text-2); text-decoration: none; cursor: pointer;
                    transition: color .15s, border-color .15s, background .15s;
                }
                .cy-btn:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }
                .cy-btn--accent { border-color: rgba(232,255,71,0.3); color: var(--accent); background: var(--accent-dim); }
                .cy-btn--accent:hover { background: rgba(232,255,71,0.15); border-color: rgba(232,255,71,0.5); }

                /* Related */
                .cy-related { max-width: 1200px; margin: 0 auto; padding: 0 24px 80px; }
                .cy-section-label {
                    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em;
                    text-transform: uppercase; color: var(--text-3);
                    display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
                }
                .cy-section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }

                .cy-grid {
                    display: grid; grid-template-columns: repeat(3, 1fr);
                    gap: 1px; background: var(--border); border: 1px solid var(--border);
                    border-radius: var(--radius); overflow: hidden;
                }
                @media (max-width: 900px) { .cy-grid { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 600px) { .cy-grid { grid-template-columns: 1fr; } }

                .cy-card {
                    display: flex; flex-direction: column; background: var(--surface);
                    text-decoration: none; overflow: hidden; position: relative; transition: background .15s;
                }
                .cy-card:hover { background: #141417; }
                .cy-card::before {
                    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
                    background: var(--accent); transform: scaleY(0); transform-origin: bottom;
                    transition: transform .2s ease; z-index: 5;
                }
                .cy-card:hover::before { transform: scaleY(1); }
                .cy-card__img-wrap { height: 160px; background: var(--bg); overflow: hidden; flex-shrink: 0; }
                .cy-card__img { width: 100%; height: 100%; object-fit: cover; opacity: 0.45; filter: grayscale(25%); transition: opacity .3s, transform .4s; }
                .cy-card:hover .cy-card__img { opacity: 0.65; transform: scale(1.04); }
                .cy-card__img-placeholder { width: 100%; height: 100%; background: repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.015) 6px, rgba(255,255,255,0.015) 12px); }
                .cy-card__body { padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 7px; flex: 1; }
                .cy-card__title { font-family: var(--font-serif); font-size: 16px; font-weight: 400; line-height: 1.3; color: var(--text-1); transition: color .15s; }
                .cy-card:hover .cy-card__title { color: #fff; }
                .cy-card__preview { font-size: 12px; color: var(--text-2); line-height: 1.55; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
                .cy-card__meta { display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 10px; color: var(--text-3); margin-top: auto; padding-top: 10px; }
                .cy-card__meta-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--border-hi); }
            `}</style>

            <div className="cy-page">
                {/* Nav */}
                <nav className="cy-nav">
                    <a href="/" className="cy-nav__brand">
                        brown<em>.</em>dev <span style={{ color: "var(--text-3)", marginLeft: 6 }}></span>
                    </a>
                    <Link href="/news" className="cy-nav__back">
                        <ArrowLeft size={13} /> All News
                    </Link>
                </nav>

                {/* Article */}
                <div className="cy-article-wrap">

                    {/* Eyebrow */}
                    <div className="cy-article__eyebrow">
                        <span className="cy-tag">{article.category || "Technology"}</span>
                        {readingTime > 0 && (
                            <span className="cy-article__readtime">
                                <Clock size={11} /> {readingTime} min read
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="cy-article__title">{article.title}</h1>

                    {/* Meta */}
                    <div className="cy-article__meta">
                        <span className="cy-article__meta-author">NEWS</span>
                        <span className="cy-article__meta-dot" />
                        <span>{formatDate(article.createdAt)}</span>
                    </div>

                    {/* Share */}
                    <div className="cy-share">
                        <span className="cy-share__label">Share</span>
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== "undefined" ? window.location.href : ""}`}
                            target="_blank" rel="noopener noreferrer"
                            className="cy-share__btn"
                        >
                            Facebook
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?url=${typeof window !== "undefined" ? window.location.href : ""}&text=${encodeURIComponent(article.title)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="cy-share__btn"
                        >
                            𝕏 Twitter
                        </a>
                        <button className={`cy-share__btn${copied ? " cy-share__btn--accent" : ""}`} onClick={handleCopyLink}>
                            <LinkIcon size={11} /> {copied ? "Copied!" : "Copy link"}
                        </button>
                    </div>

                    {/* Subtitle */}
                    {article.subtitle && (
                        <div className="cy-article__subtitle">{article.subtitle}</div>
                    )}

                    {/* Image */}
                    {article.imageUrl && (
                        <div className="cy-article__img-wrap">
                            <img src={article.imageUrl} alt={article.title} className="cy-article__img" />
                            {article.imageCaption && (
                                <p className="cy-article__caption">{article.imageCaption}</p>
                            )}
                        </div>
                    )}

                    {/* Body */}
                    <BlogDisplay body={article.body} />

                    {/* Subscribe CTA */}
                    <div className="cy-subscribe">
                        <h2 className="cy-subscribe__title">Stay informed</h2>
                        <p className="cy-subscribe__desc">
                            Get the latest news and analysis delivered to your inbox.
                        </p>
                        <a
                            href="https://thecyclopedia.substack.com/subscribe"
                            target="_blank" rel="noopener noreferrer"
                            className="cy-btn cy-btn--accent"
                        >
                            Subscribe <ArrowUpRight size={12} />
                        </a>
                    </div>
                </div>

                {/* Related articles */}
                {relatedArticles.length > 0 && (
                    <div className="cy-related">
                        <p className="cy-section-label">Related News</p>
                        <div className="cy-grid">
                            {relatedArticles.map(r => (
                                <Link key={r.id} href={`/news/${createFullSlug(r.title, r.id)}`} className="cy-card">
                                    <div className="cy-card__img-wrap">
                                        {r.imageUrl
                                            ? <img src={r.imageUrl} alt={r.title} className="cy-card__img" onError={e => e.target.style.display = "none"} />
                                            : <div className="cy-card__img-placeholder" />
                                        }
                                    </div>
                                    <div className="cy-card__body">
                                        <span style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", padding: "2px 6px", borderRadius: 3, background: "var(--accent-dim)", color: "var(--accent)", border: "1px solid rgba(232,255,71,0.2)", lineHeight: 1 }}>
                                            {r.category || "Technology"}
                                        </span>
                                        <h3 className="cy-card__title">{r.title}</h3>
                                        {r.subtitle && <p className="cy-card__preview">{r.subtitle}</p>}
                                        <div className="cy-card__meta">
                                            <span>NEWS</span>
                                            <span className="cy-card__meta-dot" />
                                            <span>{formatDate(r.createdAt)}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}