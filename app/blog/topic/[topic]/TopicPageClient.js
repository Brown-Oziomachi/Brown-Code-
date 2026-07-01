"use client";

import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { articles } from "@/app/data/article";
import { CATEGORIES, CATEGORY_LABELS, getCategoryKey } from "@/lib/blogCategories";
import { ArrowLeft, ArrowUpRight, ChevronDown } from "lucide-react";
import Footer from "@/components/footer";

const getReadingTime = (content) =>
    Math.max(1, Math.ceil(content.split(" ").length / 200));

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
                {CATEGORY_LABELS[getCategoryKey(article)]}
            </span>
            <h3 className="bl-card__title">{article.title}</h3>
            <p className="bl-card__preview">{article.preview}</p>
            <div className="bl-meta bl-meta--sm">
                <span className="bl-meta__author">{article.postedBy}</span>
                <span className="bl-meta__dot" />
                <span>{getReadingTime(article.content)} min read</span>
            </div>
        </div>
    </a >
);

export default function TopicPageClient({ topic }) {
    const router = useRouter();
    const label = CATEGORY_LABELS[topic];

    const [isSticky, setIsSticky] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 120);
        };
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

    if (!label) {
        notFound();
    }

    const topicArticles = articles
        .filter((a) => getCategoryKey(a) === topic)
        .sort((a, b) => (b.datePublished || "").localeCompare(a.datePublished || ""));

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

                .bl-page { font-family: var(--font-sans); background: var(--bg); color: var(--text-1); min-height: 100vh; }

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

                .bl-main { max-width: 1200px; margin: 0 auto; padding: 0 24px 80px; }

                .bl-masthead {
                    display: flex; align-items: flex-end; justify-content: space-between;
                    gap: 16px; padding: 52px 0 32px; border-bottom: 1px solid var(--border); margin-bottom: 32px;
                }
                .bl-masthead__eyebrow { font-family: var(--font-mono); font-size: 11px; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px; }
                .bl-masthead__title { font-family: var(--font-serif); font-size: clamp(36px, 5vw, 60px); font-weight: 400; line-height: 1.05; color: var(--text-1); }
                .bl-masthead__desc { font-size: 13px; color: var(--text-2); line-height: 1.6; max-width: 320px; text-align: right; }

                /* ── Category dropdown nav ── */
                .bl-cat-nav-wrap {
                    position: relative;
                    margin-bottom: 48px;
                    width: fit-content;
                    transition: margin-bottom 0.2s ease;
                }

                .bl-cat-nav-wrap--sticky {
                    position: sticky;
                    top: 56px;
                    z-index: 50;
                    margin-bottom: 24px;
                    padding: 10px 0;
                    background: var(--bg);
                }

                .bl-cat-nav__trigger {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-family: var(--font-mono);
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.06em;
                    color: var(--accent);
                    background: var(--accent-dim);
                    border: 1px solid rgba(232,255,71,0.3);
                    border-radius: var(--radius);
                    padding: 8px 14px;
                    cursor: pointer;
                    transition: background 0.15s, border-color 0.15s;
                }

                .bl-cat-nav__trigger:hover {
                    background: rgba(232,255,71,0.15);
                    border-color: rgba(232,255,71,0.5);
                }

                .bl-cat-nav__chevron {
                    transition: transform 0.2s ease;
                }

                .bl-cat-nav__chevron--open {
                    transform: rotate(180deg);
                }

                .bl-cat-nav__dropdown {
                    position: absolute;
                    top: calc(100% + 6px);
                    left: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    min-width: 200px;
                    background: var(--surface);
                    border: 1px solid var(--border-hi);
                    border-radius: var(--radius);
                    padding: 6px;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
                    z-index: 60;
                    animation: blDropdownIn 0.15s ease-out;
                }

                @keyframes blDropdownIn {
                    from { opacity: 0; transform: translateY(-4px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .bl-cat-nav__item {
                    font-family: var(--font-mono);
                    font-size: 11px;
                    letter-spacing: 0.05em;
                    color: var(--text-2);
                    text-decoration: none;
                    padding: 8px 10px;
                    border-radius: 4px;
                    transition: color 0.15s, background 0.15s;
                }

                .bl-cat-nav__item:hover {
                    color: var(--text-1);
                    background: var(--bg);
                }

                .bl-cat-nav__item--active {
                    color: var(--accent);
                    background: var(--accent-dim);
                }

                .bl-tag {
                    display: inline-block; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em;
                    text-transform: uppercase; padding: 3px 8px; border-radius: 3px;
                    background: var(--accent-dim); color: var(--accent); border: 1px solid rgba(232,255,71,0.2); line-height: 1;
                }
                .bl-tag--sm { font-size: 9px; padding: 2px 6px; }
                .bl-meta { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 11px; color: var(--text-3); margin-top: 10px; }
                .bl-meta--sm { font-size: 10px; margin-top: 8px; }
                .bl-meta__author { color: var(--text-2); }
                .bl-meta__dot { width: 3px; height: 3px; border-radius: 50%; background: var(--border-hi); flex-shrink: 0; }

                .bl-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
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

                .bl-empty { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 80px 0; text-align: center; }
                .bl-empty__code { font-family: var(--font-mono); font-size: 11px; color: var(--text-3); letter-spacing: 0.1em; }
                .bl-empty__msg { font-size: 14px; color: var(--text-2); }

                .bl-footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; padding-top: 40px; margin-top: 48px; border-top: 1px solid var(--border); }
                .bl-footer__info { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); letter-spacing: 0.06em; }
                .bl-footer__actions { display: flex; gap: 10px; flex-wrap: wrap; }
                .bl-btn { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; padding: 8px 16px; border-radius: var(--radius); border: 1px solid var(--border); background: transparent; color: var(--text-2); cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: color 0.15s, border-color 0.15s, background 0.15s; text-decoration: none; }
                .bl-btn:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }
                .bl-btn--accent { border-color: rgba(232,255,71,0.3); color: var(--accent); background: var(--accent-dim); }
                .bl-btn--accent:hover { background: rgba(232,255,71,0.15); border-color: rgba(232,255,71,0.5); color: var(--accent); }

                @media (max-width: 700px) {
                    .bl-masthead { flex-direction: column; align-items: flex-start; }
                    .bl-masthead__desc { text-align: left; }
                }
            `}</style>

            <div className="bl-page">
                <nav className="bl-nav">
                    <a href="/" className="bl-nav__brand">brown<em>.</em>dev</a>
                    <a href="/blog" className="bl-nav__back">
                        <ArrowLeft size={13} />
                        All articles
                    </a>
                </nav>

                <main className="bl-main">
                    <header className="bl-masthead">
                        <div>
                            <p className="bl-masthead__eyebrow">Topic</p>
                            <h1 className="bl-masthead__title">{label}</h1>
                        </div>
                        <p className="bl-masthead__desc">
                            {topicArticles.length} article{topicArticles.length !== 1 ? "s" : ""} in this topic.
                        </p>
                    </header>

                    <div
                        ref={dropdownRef}
                        className={`bl-cat-nav-wrap ${isSticky ? "bl-cat-nav-wrap--sticky" : ""}`}
                    >
                        <button
                            className="bl-cat-nav__trigger"
                            onClick={() => setIsOpen((prev) => !prev)}
                            aria-expanded={isOpen}
                        >
                            <span className="bl-cat-nav__trigger-label">{label}</span>
                            <ChevronDown
                                size={14}
                                className={`bl-cat-nav__chevron ${isOpen ? "bl-cat-nav__chevron--open" : ""}`}
                            />
                        </button>

                        {isOpen && (
                            <div className="bl-cat-nav__dropdown">
                                {CATEGORIES.map((cat) => (

                                  <a  key = { cat.key }
                                        href = {`/blog/topic/${cat.key}`}
                                className={`bl-cat-nav__item ${cat.key === topic ? "bl-cat-nav__item--active" : ""}`}
                                onClick={() => setIsOpen(false)}
                                    >
                                {cat.label}
                            </a>
                        ))}
                    </div>
                        )}
            </div>

            {topicArticles.length === 0 ? (
                <div className="bl-empty">
                    <span className="bl-empty__code">NO_ARTICLES</span>
                    <p className="bl-empty__msg">Nothing published in {label} yet.</p>
                </div>
            ) : (
                <div className="bl-grid">
                    {topicArticles.map((a, i) => (
                        <ArticleCard key={a.slug} article={a} index={i} />
                    ))}
                </div>
            )}

            <footer className="bl-footer">
                <span className="bl-footer__info">brown.dev — writing & insights</span>
                <div className="bl-footer__actions">
                    <button className="bl-btn bl-btn--accent" onClick={() => router.push("/bc/contact")}>
                        Get in touch
                    </button>
                    <button className="bl-btn" onClick={() => router.push("/blog")}>
                        <ArrowLeft size={13} />
                        All articles
                    </button>
                </div>
            </footer>
        </main >
            </div >

        <Footer />
        </>
    );
}