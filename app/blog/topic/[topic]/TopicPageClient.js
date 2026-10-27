"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, Mail } from "lucide-react";
import { CATEGORIES } from "@/lib/blogCategories";
import Footer from "@/components/footer";

/* ── helpers ─────────────────────────────────────────── */

const DEFAULT_AUTHOR = "Sir Brown AD";

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

/* Big card: image left, text right */
function FeaturedArticle({ article, fallbackLabel }) {
    return (
        <Link href={`/blog/${article.slug}`} className="tp-feat">
            <div className="tp-feat__media">
                <Cover src={article.image} alt={article.title} />
            </div>
            <div className="tp-feat__body">
                <span className="tp-label">{article.categoryLabel || fallbackLabel}</span>
                <h2 className="tp-feat__title">{article.title}</h2>
                <span className="tp-by">By {article.author || DEFAULT_AUTHOR}</span>
            </div>
        </Link>
    );
}

/* List row: small thumbnail left, text right */
function ListArticle({ article, fallbackLabel }) {
    return (
        <Link href={`/blog/${article.slug}`} className="tp-row">
            <div className="tp-row__media">
                <Cover src={article.image} alt={article.title} />
            </div>
            <div className="tp-row__body">
                <span className="tp-label">{article.categoryLabel || fallbackLabel}</span>
                <h3 className="tp-row__title">{article.title}</h3>
                <span className="tp-by">By {article.author || DEFAULT_AUTHOR}</span>
            </div>
        </Link>
    );
}

/* One big article + a list-with-image of up to 3 more */
function Block({ items, fallbackLabel }) {
    const [big, ...list] = items;
    return (
        <div className={`tp-top${list.length === 0 ? " tp-top--solo" : ""}`}>
            <FeaturedArticle article={big} fallbackLabel={fallbackLabel} />
            {list.length > 0 && (
                <div className="tp-list">
                    {list.map((a) => (
                        <ListArticle key={a.slug} article={a} fallbackLabel={fallbackLabel} />
                    ))}
                </div>
            )}
        </div>
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

    // Group articles in fours: 1 big + up to 3 in the image list.
    // The first block is the top of the page; the rest go under "More in …".
    const blocks = [];
    for (let i = 0; i < topicArticles.length; i += 4) {
        blocks.push(topicArticles.slice(i, i + 4));
    }
    const [firstBlock, ...moreBlocks] = blocks;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');

                .tp-page {
                    --paper: #ffffff; --paper-2: #f1f3f3; --ink: #0f1f2e; --ink-3: #5b6770;
                    --rule: #e3e6e8; --rule-dark: #0f1f2e;
                    --teal: #0f6a63; --teal-dark: #0a4f49;
                    --sans: 'IBM Plex Sans', system-ui, sans-serif;
                    --mono: 'IBM Plex Mono', ui-monospace, monospace;
                    background: var(--paper); color: var(--ink); font-family: var(--sans); min-height: 100vh;
                }
                .tp-page *, .tp-page *::before, .tp-page *::after { box-sizing: border-box; }
                .tp-page h1, .tp-page h2, .tp-page h3, .tp-page p { margin: 0; }
                :where(.tp-page a) { color: inherit; text-decoration: none; }
                .tp-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }

                /* Nav */
                .tp-nav { position: sticky; top: 0; z-index: 1000; background: rgba(255,255,255,0.94); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); border-bottom: 1px solid var(--rule); }
                .tp-nav__inner { max-width: 1120px; margin: 0 auto; padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
                .tp-nav__brand { font-weight: 700; font-size: 20px; letter-spacing: -0.01em; }
                .tp-nav__brand em { font-style: normal; color: var(--teal); }

                /* Buttons */
                .tp-btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; font-family: var(--sans); font-weight: 600; font-size: 13px; padding: 10px 16px; border: 1.5px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; transition: background 0.15s, color 0.15s; }
                .tp-btn:hover { background: var(--ink); color: #fff; }
                .tp-btn--solid { background: var(--teal); border-color: var(--teal); color: #fff; }
                .tp-btn--solid:hover { background: var(--teal-dark); border-color: var(--teal-dark); }

                /* Section heading: teal bar + title */
                .tp-head { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding: 44px 0 0; }
                .tp-title { font-weight: 700; font-size: clamp(26px, 3.4vw, 34px); letter-spacing: -0.02em; line-height: 1.1; border-left: 5px solid var(--teal); padding: 4px 0 4px 16px; color: var(--ink); }
                .tp-count { font-size: 13px; color: var(--ink-3); }

                /* Category dropdown */
                .tp-cats { position: relative; margin: 20px 0 8px; width: fit-content; }
                .tp-cats--sticky { position: sticky; top: 60px; z-index: 50; margin: 0 0 8px; padding: 10px 0; background: var(--paper); }
                .tp-cats__trigger { display: inline-flex; align-items: center; gap: 8px; font-family: var(--sans); font-size: 13px; font-weight: 600; color: #fff; background: var(--teal); border: 0; padding: 9px 14px; cursor: pointer; transition: background 0.15s; }
                .tp-cats__trigger:hover { background: var(--teal-dark); }
                .tp-cats__chev { transition: transform 0.2s ease; }
                .tp-cats__chev--open { transform: rotate(180deg); }
                .tp-cats__menu { position: absolute; top: calc(100% + 6px); left: 0; z-index: 60; display: flex; flex-direction: column; min-width: 210px; background: #fff; border: 1px solid var(--rule-dark); box-shadow: 0 10px 30px rgba(15,31,46,0.14); }
                .tp-cats__item { font-size: 13px; color: var(--ink); padding: 11px 14px; border-bottom: 1px solid var(--rule); transition: background 0.15s; }
                .tp-cats__item:last-child { border-bottom: none; }
                .tp-cats__item:hover { background: var(--paper-2); }
                .tp-cats__item--active { font-weight: 700; color: var(--teal); box-shadow: inset 4px 0 0 var(--teal); }

                /* Shared bits */
                .tp-label { font-family: var(--mono); font-size: 10.5px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--teal); }
                .tp-by { font-size: 12.5px; font-weight: 500; color: var(--ink-3); }
                .tp-img { width: 100%; height: 100%; object-fit: cover; display: block; }
                .tp-ph { width: 100%; height: 100%; background: repeating-linear-gradient(45deg, #e6eaeb, #e6eaeb 6px, #dde2e4 6px, #dde2e4 12px); }

                /* Top block: big + list with image */
                .tp-top { display: grid; grid-template-columns: 1fr 1.1fr; gap: 32px; align-items: center; padding: 28px 0 40px; }

                /* Big */
                .tp-feat { display: flex; align-items: center; gap: 18px; }
                .tp-feat__media { flex: 0 0 46%; aspect-ratio: 4 / 3.7; border: 1px solid var(--rule-dark); overflow: hidden; background: var(--paper-2); }
                .tp-feat__body { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
                .tp-feat__title { font-weight: 700; font-size: clamp(22px, 2.5vw, 30px); line-height: 1.12; letter-spacing: -0.02em; color: var(--teal); }
                .tp-feat:hover .tp-feat__title { color: var(--teal-dark); text-decoration: underline; text-underline-offset: 4px; }

                /* List with image */
                .tp-list { border-top: 2px solid var(--rule-dark); }
                .tp-row { display: flex; align-items: center; gap: 16px; padding: 14px 0; border-bottom: 1px solid var(--rule); }
                .tp-row__media { flex: 0 0 88px; width: 88px; height: 88px; overflow: hidden; background: var(--paper-2); }
                .tp-row__body { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
                .tp-row__title { font-weight: 700; font-size: 17px; line-height: 1.25; letter-spacing: -0.01em; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
                .tp-row:hover .tp-row__title { color: var(--teal); }

                .tp-top--solo { grid-template-columns: 1fr; }
                .tp-top--solo .tp-feat__media { flex-basis: 34%; }

                /* More: repeated big + list blocks */
                .tp-more { border-top: 1px solid var(--rule); padding-top: 8px; }
                .tp-more__head { display: block; width: fit-content; margin-top: 28px; }
                .tp-more .tp-top { padding: 28px 0 36px; }
                .tp-more .tp-top + .tp-top { border-top: 1px solid var(--rule); }

                /* Empty */
                .tp-empty { padding: 80px 0; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; }
                .tp-empty__title { font-weight: 700; font-size: 26px; }
                .tp-empty__msg { font-size: 14px; color: var(--ink-3); }

                /* Bottom CTA */
                .tp-cta { margin-top: 64px; background: var(--ink); color: #fff; border-top: 5px solid var(--teal); padding: 34px 38px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
                .tp-cta__text { font-weight: 700; font-size: clamp(20px, 2.6vw, 26px); line-height: 1.25; max-width: 520px; }
                .tp-cta__actions { display: flex; flex-wrap: wrap; gap: 10px; }
                .tp-cta .tp-btn { border-color: #fff; color: #fff; }
                .tp-cta .tp-btn:hover { background: #fff; color: var(--ink); }
                .tp-cta .tp-btn--solid { background: var(--teal); border-color: var(--teal); }
                .tp-cta .tp-btn--solid:hover { background: #fff; border-color: #fff; color: var(--ink); }
                .tp-end { height: 24px; }

                @media (max-width: 900px) {
                    .tp-top { grid-template-columns: 1fr; gap: 28px; align-items: stretch; }
                }
                @media (max-width: 560px) {
                    .tp-wrap, .tp-nav__inner { padding-left: 18px; padding-right: 18px; }
                    .tp-head { padding-top: 30px; }
                    .tp-feat { flex-direction: column; align-items: stretch; }
                    .tp-feat__media { flex: none; width: 100%; aspect-ratio: 16 / 10; }
                    .tp-row__media { flex-basis: 76px; width: 76px; height: 76px; }
                    .tp-cta { padding: 28px 20px; }
                    .tp-cta__actions .tp-btn { flex: 1 1 auto; }
                }

                .tp-page :focus-visible { outline: 2px solid var(--teal); outline-offset: 2px; }
            `}</style>

            <div className="tp-page">
                <header className="tp-nav">
                    <div className="tp-nav__inner">
                        <Link href="/" className="tp-nav__brand">Sir Brown <em>Blog</em></Link>
                        <Link href="/blog" className="tp-btn">
                            <ArrowLeft size={12} /> All articles
                        </Link>
                    </div>
                </header>

                <main className="tp-wrap">
                    <div className="tp-head">
                        <h1 className="tp-title">{label}</h1>
                        <p className="tp-count">
                            {topicArticles.length} article{topicArticles.length !== 1 ? "s" : ""}
                        </p>
                    </div>

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
                        <>
                            {/* Big + list with image */}
                            <Block items={firstBlock} fallbackLabel={label} />

                            {/* More: every group of 4 repeats the same big + list layout */}
                            {moreBlocks.length > 0 && (
                                <section className="tp-more">
                                    <h2 className="tp-title tp-more__head">More in {label}</h2>
                                    {moreBlocks.map((items) => (
                                        <Block key={items[0].slug} items={items} fallbackLabel={label} />
                                    ))}
                                </section>
                            )}
                        </>
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
                    <div className="tp-end" />
                </main>
            </div>

            <Footer />
        </>
    );
}