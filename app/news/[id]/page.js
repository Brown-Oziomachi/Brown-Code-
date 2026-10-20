"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, Link as LinkIcon } from "lucide-react";
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
    return <div className="nw-body" dangerouslySetInnerHTML={{ __html: html }} />;
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

.nw-page {
    --paper: #ffffff; --paper-2: #f6f5f0;
    --ink: #111111; --ink-2: #3f3f3f; --ink-3: #6f6f6f;
    --rule: #e4e2da; --rule-dark: #111111;
    --accent: #e8ff47; --on-accent: #0a0a0b;
    --serif: 'Playfair Display', Georgia, serif;
    --sans: 'Inter', system-ui, sans-serif;
    --mono: 'JetBrains Mono', 'Fira Code', monospace;
    background: var(--paper); color: var(--ink); font-family: var(--sans); min-height: 100vh;
}
.nw-page *, .nw-page *::before, .nw-page *::after { box-sizing: border-box; }
.nw-page h1, .nw-page h2, .nw-page h3, .nw-page p { margin: 0; }
:where(.nw-page a) { color: inherit; text-decoration: none; }
.nw-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }

/* Centered states */
.nw-center { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 24px; text-align: center; }
.nw-center__label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-3); }
.nw-center__title { font-family: var(--serif); font-weight: 800; font-size: 30px; }

/* Nav */
.nw-nav { position: sticky; top: 0; z-index: 1000; background: rgba(255,255,255,0.92); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); border-bottom: 1px solid var(--rule); }
.nw-nav__inner { max-width: 1120px; margin: 0 auto; padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.nw-nav__brand { font-family: var(--serif); font-weight: 800; font-size: 21px; letter-spacing: -0.01em; }
.nw-nav__brand em { font-style: normal; background: var(--accent); padding: 0 3px; }
.nw-nav__links { display: flex; align-items: center; gap: 4px; }
.nw-nav__link { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3); padding: 8px 12px; display: inline-flex; align-items: center; gap: 6px; transition: color 0.15s; }
.nw-nav__link:hover { color: var(--ink); }
.nw-nav__link--box { border: 1.5px solid var(--ink); color: var(--ink); }
.nw-nav__link--box:hover { background: var(--ink); color: #fff; }
@media (max-width: 640px) { .nw-nav__hide { display: none; } .nw-nav__inner { padding: 0 18px; } }

/* Buttons */
.nw-btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em; padding: 10px 16px; border: 1.5px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; transition: background 0.15s, color 0.15s, transform 0.15s; }
.nw-btn:hover { background: var(--ink); color: #fff; transform: translateY(-1px); }
.nw-btn--solid { background: var(--accent); color: var(--on-accent); font-weight: 600; }
.nw-btn--solid:hover { background: var(--ink); color: var(--accent); }

/* Article */
.nw-article { max-width: 760px; margin: 0 auto; padding: 48px 24px 72px; }
@media (max-width: 640px) { .nw-article { padding: 28px 18px 56px; } }

.nw-chip { display: inline-block; font-family: var(--mono); font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; background: var(--accent); color: var(--on-accent); padding: 5px 10px; border: 1px solid var(--ink); }
.nw-eyebrow { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 20px; }
.nw-readtime { display: inline-flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: 11px; color: var(--ink-3); }

.nw-title { font-family: var(--serif); font-weight: 800; font-size: clamp(28px, 4.6vw, 46px); line-height: 1.1; letter-spacing: -0.015em; }

.nw-meta { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-top: 26px; padding: 14px 0; border-top: 3px solid var(--rule-dark); border-bottom: 1px solid var(--rule); font-family: var(--mono); font-size: 11.5px; color: var(--ink-3); }
.nw-meta__tag { background: var(--accent); color: var(--on-accent); padding: 1px 7px; font-weight: 600; letter-spacing: 0.08em; }
.nw-meta__dot { width: 4px; height: 4px; background: var(--ink); }

.nw-share { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin: 22px 0 30px; }
.nw-share__label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); margin-right: 4px; }
.nw-share__btn { display: inline-flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.04em; padding: 8px 12px; border: 1px solid var(--ink); background: #fff; color: var(--ink); cursor: pointer; transition: background 0.15s, transform 0.15s; }
.nw-share__btn:hover { background: var(--accent); transform: translateY(-1px); }
.nw-share__btn--on { background: var(--accent); }

.nw-dek { font-size: clamp(15px, 1.7vw, 18px); line-height: 1.65; font-weight: 300; color: var(--ink-2); border-left: 3px solid var(--accent); padding-left: 18px; margin-bottom: 30px; }

.nw-figure { margin: 0 0 36px; border: 1px solid var(--rule-dark); background: var(--paper-2); overflow: hidden; }
.nw-figure img { width: 100%; height: auto; display: block; }
.nw-figure figcaption { font-family: var(--mono); font-size: 11px; color: var(--ink-3); padding: 9px 12px; border-top: 1px solid var(--rule); background: #fff; }

/* Body prose */
.nw-body { font-size: 17px; line-height: 1.85; color: var(--ink-2); padding-bottom: 40px; margin-bottom: 40px; border-bottom: 1px solid var(--rule); overflow-wrap: anywhere; }
.nw-body h1, .nw-body h2, .nw-body h3 { font-family: var(--serif); font-weight: 800; color: var(--ink); margin: 40px 0 14px; line-height: 1.22; }
.nw-body h1 { font-size: 30px; }
.nw-body h2 { font-size: 25px; }
.nw-body h3 { font-size: 20px; }
.nw-body p { margin-bottom: 20px; }
.nw-body a { color: var(--ink); font-weight: 500; text-decoration: underline; text-decoration-color: #c9c600; text-decoration-thickness: 2px; text-underline-offset: 3px; }
.nw-body a:hover { background: var(--accent); }
.nw-body img { max-width: 100%; height: auto; border: 1px solid var(--rule-dark); margin: 20px 0; display: block; }
.nw-body blockquote { font-family: var(--serif); font-style: italic; font-size: 20px; line-height: 1.6; color: var(--ink); border-left: 5px solid var(--accent); background: var(--paper-2); padding: 20px 24px; margin: 30px 0; }
.nw-body ul, .nw-body ol { padding-left: 22px; margin-bottom: 20px; }
.nw-body li { margin-bottom: 8px; }
.nw-body li::marker { color: var(--ink); font-weight: 600; }
.nw-body strong { color: var(--ink); font-weight: 600; }
.nw-body pre { background: var(--ink); color: #f4f1ea; padding: 16px 18px; overflow-x: auto; font-family: var(--mono); font-size: 13px; line-height: 1.6; margin: 0 0 20px; }
.nw-body code { font-family: var(--mono); font-size: 0.9em; background: var(--paper-2); padding: 1px 5px; }
.nw-body pre code { background: none; padding: 0; }
.nw-body table { width: 100%; border-collapse: collapse; margin: 0 0 20px; font-size: 15px; display: block; overflow-x: auto; }
.nw-body th, .nw-body td { border: 1px solid var(--rule); padding: 8px 12px; text-align: left; }
.nw-body th { background: var(--paper-2); color: var(--ink); }

/* Subscribe CTA */
.nw-subscribe { background: var(--ink); color: #f4f1ea; border-top: 5px solid var(--accent); padding: 36px; text-align: center; }
@media (max-width: 640px) { .nw-subscribe { padding: 28px 20px; } }
.nw-subscribe__title { font-family: var(--serif); font-weight: 800; font-size: 28px; margin-bottom: 8px; }
.nw-subscribe__desc { font-size: 14px; line-height: 1.7; color: #bdb8ae; max-width: 360px; margin: 0 auto 20px; }
.nw-subscribe .nw-btn--solid:hover { background: #fff; color: var(--ink); border-color: #fff; }

/* Related */
.nw-related { padding-bottom: 72px; }
.nw-head { padding-top: 12px; border-top: 3px solid var(--rule-dark); margin-bottom: 24px; }
.nw-kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 8px; }
.nw-h2 { font-family: var(--serif); font-weight: 800; font-size: clamp(26px, 3.6vw, 36px); line-height: 1.1; letter-spacing: -0.01em; }

.nw-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
@media (max-width: 900px) { .nw-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .nw-grid { grid-template-columns: 1fr; } }

.nw-card { display: flex; flex-direction: column; background: #fff; border: 1px solid var(--rule); border-radius: 6px; overflow: hidden; transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s; }
.nw-card:hover { border-color: var(--ink); box-shadow: 4px 4px 0 var(--accent), 4px 4px 0 1px var(--ink); transform: translate(-2px, -2px); }
.nw-card__img-wrap { height: 150px; background: var(--paper-2); border-bottom: 1px solid var(--rule); overflow: hidden; flex-shrink: 0; }
.nw-card__img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s; }
.nw-card:hover .nw-card__img { transform: scale(1.04); }
.nw-card__ph { width: 100%; height: 100%; background: repeating-linear-gradient(45deg, #ebe8e0, #ebe8e0 6px, #e3e0d7 6px, #e3e0d7 12px); }
.nw-card__body { padding: 16px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
.nw-card__cat { align-self: flex-start; font-family: var(--mono); font-size: 9.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; background: var(--accent); color: var(--on-accent); padding: 2px 7px; }
.nw-card__title { font-family: var(--serif); font-weight: 800; font-size: 17px; line-height: 1.3; }
.nw-card__preview { font-size: 13px; line-height: 1.6; color: var(--ink-2); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.nw-card__meta { margin-top: auto; padding-top: 8px; display: flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 10.5px; color: var(--ink-3); }
.nw-card__dot { width: 4px; height: 4px; background: var(--ink); }

.nw-page :focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { .nw-page * { transition: none !important; } }
`;

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
        const load = async () => {
            try {
                const { db2 } = await import("@/config/firebase.config2");
                const { doc, getDoc } = await import("firebase/firestore");
                const docId = extractIdFromSlug(slugParam);
                const snap = await getDoc(doc(db2, "blogs", docId));
                if (snap.exists()) setArticle({ id: docId, ...snap.data() });
            } catch (e) { console.error(e); }
            finally { setIsLoading(false); }
        };
        load();
    }, [slugParam, firebaseReady]);

    useEffect(() => {
        if (article && slugParam && !slugParam.includes("--")) {
            router.replace(`/news/${createFullSlug(article.title, article.id)}`);
        }
    }, [article, slugParam, router]);

    useEffect(() => {
        if (!article || !firebaseReady) return;
        const load = async () => {
            try {
                const { db2 } = await import("@/config/firebase.config2");
                const { collection, getDocs } = await import("firebase/firestore");
                const snap = await getDocs(collection(db2, "blogs"));
                const all = snap.docs
                    .map((d) => ({ id: d.id, ...d.data() }))
                    .filter((a) => a.id !== article.id && !a.isVideo)
                    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
                setRelatedArticles(all.slice(0, 6));
            } catch (e) { console.error(e); }
        };
        load();
    }, [article, firebaseReady]);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.prompt("Copy this link:", window.location.href);
        }
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
            <>
                <style>{CSS}</style>
                <div className="nw-page">
                    <div className="nw-center">
                        <span className="nw-center__label">Loading news…</span>
                    </div>
                </div>
            </>
        );
    }

    if (!article) {
        return (
            <>
                <style>{CSS}</style>
                <div className="nw-page">
                    <div className="nw-center">
                        <span className="nw-chip">404</span>
                        <span className="nw-center__title">Article not found</span>
                        <Link href="/" className="nw-btn nw-btn--solid">
                            <ArrowLeft size={13} /> Return home
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    const pageUrl = typeof window !== "undefined" ? window.location.href : "";
    const encodedUrl = encodeURIComponent(pageUrl);

    return (
        <>
            <style>{CSS}</style>

            <div className="nw-page">
                {/* Nav */}
                <header className="nw-nav">
                    <div className="nw-nav__inner">
                        <Link href="/" className="nw-nav__brand">brown<em>.</em>dev</Link>
                        <nav className="nw-nav__links" aria-label="Main">
                            <Link href="/bc/about" className="nw-nav__link nw-nav__hide">About</Link>
                            <Link href="/portfolio" className="nw-nav__link nw-nav__hide">Portfolio</Link>
                            <Link href="/newsletter" className="nw-nav__link nw-nav__hide">Newsletter</Link>
                            <Link href="/tech-news" className="nw-nav__link nw-nav__link--box">
                                <ArrowLeft size={12} /> All News
                            </Link>
                        </nav>
                    </div>
                </header>

                {/* Article */}
                <article className="nw-article">
                    <div className="nw-eyebrow">
                        <span className="nw-chip">{article.category || "Technology"}</span>
                        {readingTime > 0 && (
                            <span className="nw-readtime"><Clock size={12} /> {readingTime} min read</span>
                        )}
                    </div>

                    <h1 className="nw-title">{article.title}</h1>

                    <div className="nw-meta">
                        <span className="nw-meta__tag">NEWS</span>
                        <span className="nw-meta__dot" />
                        <span>{formatDate(article.createdAt)}</span>
                    </div>

                    <div className="nw-share">
                        <span className="nw-share__label">Share</span>
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                            target="_blank" rel="noopener noreferrer"
                            className="nw-share__btn"
                        >
                            Facebook
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(article.title)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="nw-share__btn"
                        >
                            𝕏 Twitter
                        </a>
                        <button className={`nw-share__btn${copied ? " nw-share__btn--on" : ""}`} onClick={handleCopyLink}>
                            <LinkIcon size={12} /> {copied ? "Copied!" : "Copy link"}
                        </button>
                    </div>

                    {article.subtitle && <p className="nw-dek">{article.subtitle}</p>}

                    {article.imageUrl && (
                        <figure className="nw-figure">
                            <img src={article.imageUrl} alt={article.title} />
                            {article.imageCaption && <figcaption>{article.imageCaption}</figcaption>}
                        </figure>
                    )}

                    <BlogDisplay body={article.body} />

                    <section className="nw-subscribe">
                        <h2 className="nw-subscribe__title">Stay informed</h2>
                        <p className="nw-subscribe__desc">
                            Get the latest news and analysis delivered to your inbox.
                        </p>
                        <a
                            href="https://thecyclopedia.substack.com/subscribe"
                            target="_blank" rel="noopener noreferrer"
                            className="nw-btn nw-btn--solid"
                        >
                            Subscribe <ArrowUpRight size={12} />
                        </a>
                    </section>
                </article>

                {/* Related */}
                {relatedArticles.length > 0 && (
                    <div className="nw-wrap nw-related">
                        <div className="nw-head">
                            <div className="nw-kicker">Keep reading</div>
                            <h2 className="nw-h2">Related news</h2>
                        </div>
                        <div className="nw-grid">
                            {relatedArticles.map((r) => (
                                <Link key={r.id} href={`/news/${createFullSlug(r.title, r.id)}`} className="nw-card">
                                    <div className="nw-card__img-wrap">
                                        {r.imageUrl
                                            ? <img src={r.imageUrl} alt={r.title} className="nw-card__img" loading="lazy" onError={(e) => (e.target.style.display = "none")} />
                                            : <div className="nw-card__ph" />
                                        }
                                    </div>
                                    <div className="nw-card__body">
                                        <span className="nw-card__cat">{r.category || "Technology"}</span>
                                        <h3 className="nw-card__title">{r.title}</h3>
                                        {r.subtitle && <p className="nw-card__preview">{r.subtitle}</p>}
                                        <div className="nw-card__meta">
                                            <span>NEWS</span>
                                            <span className="nw-card__dot" />
                                            <span>{formatDate(r.createdAt)}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <Footer />
            </div>
        </>
    );
}