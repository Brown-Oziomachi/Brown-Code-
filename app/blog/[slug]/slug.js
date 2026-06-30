"use client";

import Head from "next/head";
import { articles } from "@/app/data/article";
import {
  ArrowLeft, ArrowRight, Clock, CornerDownRight,
  Twitter, Linkedin, Facebook, Instagram, Github, Mail
} from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { useState, use, useEffect } from "react";
import Link from "next/link";
import RelatedArticles from "@/components/relatedarticle";
import Footer from "@/components/footer";
import CommentsSection from "@/components/CommentsSection";
import {
  collection, addDoc, query, where, orderBy,
  onSnapshot, serverTimestamp
} from "firebase/firestore";
import { db1 } from "@/config/firebase.config1";

// ─── helpers ─────────────────────────────────────────────────────────────────
const getReadingTime = (content) =>
  Math.max(1, Math.ceil(content.split(" ").length / 200));

const shareUrl = (slug) =>
  `https://browncode.name.ng/blog/${slug}`;

// ─── 404 ─────────────────────────────────────────────────────────────────────
const NotFound = ({ onBack }) => (
  <div className="ap-404">
    <div className="ap-404__card">
      <span className="ap-404__code">404</span>
      <h2 className="ap-404__title">Article not found</h2>
      <p className="ap-404__msg">
        This article may have been moved, renamed, or doesn't exist yet.
      </p>
      <button className="ap-btn ap-btn--solid" onClick={onBack}>
        <ArrowLeft size={14} />
        Back to blog
      </button>
    </div>
  </div>
);

// ─── share sidebar ────────────────────────────────────────────────────────────
const ShareSidebar = ({ onShare }) => (
  <div className="ap-share-sidebar">
    <span className="ap-share-sidebar__label">Share</span>
    <button onClick={() => onShare("twitter")} title="X / Twitter" className="ap-share-btn"><Twitter size={16} /></button>
    <button onClick={() => onShare("linkedin")} title="LinkedIn" className="ap-share-btn"><Linkedin size={16} /></button>
    <button onClick={() => onShare("facebook")} title="Facebook" className="ap-share-btn"><Facebook size={16} /></button>
    <button onClick={() => onShare("whatsapp")} title="WhatsApp" className="ap-share-btn">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </button>
    <button onClick={() => onShare("instagram")} title="Instagram" className="ap-share-btn"><Instagram size={16} /></button>
  </div>
);

// ─── page ─────────────────────────────────────────────────────────────────────
export default function ArticleClient({ params }) {
  const router = useRouter();
  const { slug } = use(params);
  const article = articles.find((a) => a.slug === slug);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!article) return;
    const q = query(
      collection(db1, "comments"),
      where("articleSlug", "==", article.slug),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setComments(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }, (e) => console.error(e));
    return () => unsub();
  }, [article]);

  const handleShare = (platform) => {
    const url = shareUrl(article.slug);
    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(article.title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${article.title} — ${url}`)}`,
      instagram: `https://www.instagram.com/`,
    };
    window.open(urls[platform], "_blank", "width=600,height=500");
  };

  if (!article) {
    notFound(); // This halts rendering and automatically shows your custom 404 UI
  }

  return (
    <>
      <Head>
        <title>{article.title} | brown.dev</title>
        <meta name="description" content={article.preview} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.preview} />
        <meta property="og:image" content={article.image} />
        <meta name="author" content={article.postedBy} />
      </Head>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: article.title,
            description: article.preview,
            image: article.image,
            author: { "@type": "Person", name: article.postedBy },
            publisher: { "@type": "Organization", name: "BrownCode" },
            datePublished: article.datePublished || "2025-10-04",
            mainEntityOfPage: { "@type": "WebPage", "@id": shareUrl(article.slug) },
          }),
        }}
      />

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

                @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

                .ap-page {
                    font-family: var(--font-sans);
                    background: var(--bg);
                    color: var(--text-1);
                    min-height: 100vh;
                }

                /* ── Nav ── */
                .ap-nav {
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

                .ap-nav__brand {
                    font-family: var(--font-mono);
                    font-size: 12px;
                    font-weight: 500;
                    letter-spacing: 0.08em;
                    color: var(--text-1);
                    text-decoration: none;
                }

                .ap-nav__brand em { font-style: normal; color: var(--accent); }

                .ap-nav__back {
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

                .ap-nav__back:hover {
                    color: var(--text-1);
                    border-color: var(--border-hi);
                    background: var(--surface);
                }

                /* ── Hero ── */
                .ap-hero {
                    max-width: 880px;
                    margin: 0 auto;
                    padding: 52px 24px 0;
                }

                .ap-hero__eyebrow {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 20px;
                }

                .ap-tag {
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

                .ap-hero__id {
                    font-family: var(--font-mono);
                    font-size: 10px;
                    color: var(--text-3);
                    letter-spacing: 0.06em;
                }

                .ap-hero__title {
                    font-family: var(--font-serif);
                    font-size: clamp(28px, 4.5vw, 52px);
                    font-weight: 400;
                    line-height: 1.1;
                    color: var(--text-1);
                    margin-bottom: 24px;
                    letter-spacing: -0.01em;
                }

                .ap-hero__meta {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 20px;
                    padding-bottom: 28px;
                    border-bottom: 1px solid var(--border);
                    margin-bottom: 0;
                }

                .ap-hero__author {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .ap-hero__avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #1e1e22, #2e2e34);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: var(--font-mono);
                    font-size: 10px;
                    font-weight: 500;
                    color: var(--accent);
                    border: 1px solid var(--border);
                    flex-shrink: 0;
                }

                .ap-hero__author-name {
                    font-size: 13px;
                    font-weight: 500;
                    color: var(--text-1);
                }

                .ap-hero__reading {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-family: var(--font-mono);
                    font-size: 11px;
                    color: var(--text-3);
                }

                /* ── Cover image ── */
                .ap-cover {
                    max-width: 880px;
                    margin: 0 auto;
                    padding: 0 24px;
                }

                .ap-cover__wrap {
                    aspect-ratio: 21/12;
                    overflow: hidden;
                    border: 1px solid var(--border);
                    margin: 32px 0;
                    background: var(--surface);
                }

                .ap-cover__img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: 0.85;
                    filter: grayscale(15%);
                }

                /* ── Body layout ── */
                .ap-layout {
                    max-width: 1120px;
                    margin: 0 auto;
                    padding: 0 24px 80px;
                    display: grid;
                    grid-template-columns: 48px 1fr 260px;
                    gap: 0 40px;
                    align-items: start;
                }

                @media (max-width: 960px) {
                    .ap-layout { grid-template-columns: 1fr; }
                    .ap-share-sidebar { display: none; }
                    .ap-sidebar { display: none; }
                }

               /* ── Share sidebar ── */
              .ap-share-sidebar {
                  display: flex;          /* keep as-is for desktop */
                  flex-direction: column;
                  align-items: center;
                  gap: 8px;
                  position: sticky;
                  top: 80px;
                  padding-top: 8px;
              }

              @media (max-width: 960px) {
                  .ap-share-sidebar {
                      display: none !important;   /* ADD !important — overrides the inline flex */
                  }
              }

                .ap-share-sidebar__label {
                    font-family: var(--font-mono);
                    font-size: 9px;
                    color: var(--text-3);
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    margin-bottom: 4px;
                }

                .ap-share-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    background: var(--surface);
                    color: var(--text-3);
                    cursor: pointer;
                    transition: color 0.15s, border-color 0.15s, background 0.15s;
                }

                .ap-share-btn:hover {
                    color: var(--accent);
                    border-color: rgba(232,255,71,0.3);
                    background: var(--accent-dim);
                }

                /* ── Article body ── */
                .ap-article {
                    padding-top: 8px;
                    max-width: 680px;
                }

                .ap-article__section-heading {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-family: var(--font-sans);
                    font-size: 15px;
                    font-weight: 600;
                    color: var(--text-2);
                    margin: 32px 0 12px;
                    padding-top: 8px;
                }

                .ap-article__section-heading svg { color: var(--accent); flex-shrink: 0; }

                .ap-article__paragraph {
                    font-size: 16px;
                    line-height: 1.75;
                    color: var(--text-2);
                    font-weight: 300;
                    margin-bottom: 20px;
                }

                /* ── Sidebar ── */
                .ap-sidebar {
                    position: sticky;
                    top: 80px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .ap-sidebar__box {
                    padding: 18px;
                    background: var(--surface);
                    border: 1px solid var(--border);
                }

                .ap-sidebar__label {
                    font-family: var(--font-mono);
                    font-size: 10px;
                    letter-spacing: 0.1em;
                    color: var(--text-3);
                    text-transform: uppercase;
                    display: block;
                    margin-bottom: 10px;
                }

                .ap-sidebar__text {
                    font-size: 12px;
                    color: var(--text-2);
                    line-height: 1.65;
                    font-weight: 300;
                }

                /* ── Author card ── */
                .ap-author-card {
                    display: flex;
                    gap: 16px;
                    align-items: flex-start;
                    padding: 24px;
                    background: var(--surface);
                    border: 1px solid var(--border);
                    margin: 48px 0 32px;
                }

                .ap-author-card__avatar {
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    overflow: hidden;
                    flex-shrink: 0;
                    border: 1px solid var(--border);
                    background: var(--bg);
                }

                .ap-author-card__avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .ap-author-card__body { flex: 1; min-width: 0; }

                .ap-author-card__eyebrow {
                    font-family: var(--font-mono);
                    font-size: 9px;
                    letter-spacing: 0.1em;
                    color: var(--accent);
                    text-transform: uppercase;
                    display: block;
                    margin-bottom: 4px;
                }

                .ap-author-card__name {
                    font-family: var(--font-serif);
                    font-size: 18px;
                    color: var(--text-1);
                    margin-bottom: 2px;
                }

                .ap-author-card__role {
                    font-family: var(--font-mono);
                    font-size: 10px;
                    color: var(--text-3);
                    margin-bottom: 10px;
                }

                .ap-author-card__bio {
                    font-size: 12px;
                    color: var(--text-3);
                    line-height: 1.6;
                    margin-bottom: 12px;
                }

                .ap-author-card__link {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    font-family: var(--font-mono);
                    font-size: 11px;
                    color: var(--text-2);
                    text-decoration: none;
                    transition: color 0.15s;
                }

                .ap-author-card__link:hover { color: var(--accent); }

               .ap-author-card__socials {
                  display: flex;
                  flex-direction: column;   /* stacks vertically */
                  gap: 8px;
                  align-items: center;
                  justify-content: center;
                  align-self: stretch;      /* fills card height */
                  padding-left: 16px;
                  border-left: 1px solid var(--border);  /* subtle divider */
              }

                .ap-social-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 34px;
                    height: 34px;
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    background: var(--bg);
                    color: var(--text-3);
                    text-decoration: none;
                    transition: color 0.15s, border-color 0.15s;
                }

                .ap-social-btn:hover {
                    color: var(--text-1);
                    border-color: var(--border-hi);
                }

                /* ── Mobile share ── */
                .ap-share-mobile {
                    display: none;
                    align-items: center;
                    gap: 10px;
                    margin: 32px 0;
                    padding-top: 24px;
                    border-top: 1px solid var(--border);
                }

                @media (max-width: 960px) {
                    .ap-share-mobile { display: flex; flex-wrap: wrap; }
                }

                .ap-share-mobile__label {
                    font-family: var(--font-mono);
                    font-size: 10px;
                    color: var(--text-3);
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                }

                /* ── Article footer ── */
                .ap-article-footer {
                    padding: 28px 24px;
                    border-top: 1px solid var(--border);
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    max-width: 1120px;
                    margin: 0 auto;
                }

                .ap-article-footer__actions {
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                }

                /* ── Buttons ── */
                .ap-btn {
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

                .ap-btn:hover {
                    color: var(--text-1);
                    border-color: var(--border-hi);
                    background: var(--surface);
                }

                .ap-btn--solid {
                    background: var(--surface);
                    color: var(--text-1);
                    border-color: var(--border-hi);
                }

                .ap-btn--accent {
                    background: var(--accent-dim);
                    border-color: rgba(232,255,71,0.3);
                    color: var(--accent);
                }

                .ap-btn--accent:hover {
                    background: rgba(232,255,71,0.15);
                    border-color: rgba(232,255,71,0.5);
                    color: var(--accent);
                }

                /* ── 404 ── */
                .ap-404 {
                    min-height: 100vh;
                    background: var(--bg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                    font-family: var(--font-sans);
                }

                .ap-404__card {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    padding: 40px;
                    max-width: 400px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                    text-align: center;
                }

                .ap-404__code {
                    font-family: var(--font-mono);
                    font-size: 13px;
                    color: var(--accent);
                    letter-spacing: 0.1em;
                }

                .ap-404__title {
                    font-family: var(--font-serif);
                    font-size: 26px;
                    color: var(--text-1);
                }

                .ap-404__msg {
                    font-size: 13px;
                    color: var(--text-2);
                    line-height: 1.6;
                }
                    .ap-article__list-item {
                    display: flex;
                    gap: 14px;
                    align-items: flex-start;
                    margin-bottom: 14px;
                  }

                  .ap-article__list-number {
                    font-family: var(--font-mono);
                    font-size: 11px;
                    color: var(--accent);
                    background: var(--accent-dim);
                    border: 1px solid rgba(232,255,71,0.2);
                    border-radius: 3px;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    margin-top: 2px;
                  }

                  .ap-article__list-text {
                    font-size: 15px;
                    line-height: 1.7;
                    color: var(--text-2);
                    font-weight: 300;
                    margin: 0;
                  }

                  .ap-article__bullet-item {
                    display: flex;
                    gap: 12px;
                    align-items: flex-start;
                    margin-bottom: 10px;
                  }

                  .ap-article__bullet-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: var(--accent);
                    flex-shrink: 0;
                    margin-top: 8px;
                  }

                  .ap-article__bullet-text {
                    font-size: 15px;
                    line-height: 1.7;
                    color: var(--text-2);
                    font-weight: 300;
                    margin: 0;
                  }

                  .ap-article__quote {
                    border-left: 3px solid var(--accent);
                    padding: 12px 20px;
                    margin: 24px 0;
                    background: var(--accent-dim);
                    font-size: 15px;
                    line-height: 1.7;
                    color: var(--text-1);
                    font-style: italic;
                    font-weight: 300;
                  }

                  .ap-article__callout {
                    font-family: var(--font-mono);
                    font-size: 11px;
                    letter-spacing: 0.08em;
                    color: var(--accent);
                    margin-bottom: 16px;
                    padding: 10px 14px;
                    border: 1px solid rgba(232,255,71,0.2);
                    background: var(--accent-dim);
                    border-radius: var(--radius);
                  }
            `}</style>

      <div className="ap-page">
        {/* ── Nav ── */}
        <nav className="ap-nav">
          <a href="/" className="ap-nav__brand">
            brown<em>.</em>dev
          </a>
          <a href="/blog" className="ap-nav__back">
            <ArrowLeft size={13} />
            Blog
          </a>
        </nav>

        {/* ── Hero ── */}
        <header className="ap-hero">
          <div className="ap-hero__eyebrow">
            <span className="ap-tag">Engineering</span>
            <span className="ap-hero__id">{article.slug.slice(0, 8)}</span>
          </div>
          <h1 className="ap-hero__title">{article.title}</h1>
          <div className="ap-hero__meta">
            <div className="ap-hero__author">
              <div className="ap-hero__avatar">
                {article.postedBy.slice(0, 2).toUpperCase()}
              </div>
              <span className="ap-hero__author-name">{article.postedBy}</span>
            </div>
            <div className="ap-hero__reading">
              <Clock size={13} />
              {getReadingTime(article.content)} min read
            </div>
          </div>
        </header>

        {/* ── Cover ── */}
        <div className="ap-cover">
          <div className="ap-cover__wrap">
            <img
              src={article.image}
              alt={article.title}
              className="ap-cover__img"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
          <div className="ap-sidebar__box lg:hidden">
            <span className="ap-sidebar__label">About this article</span>
            <p className="ap-sidebar__text">{article.preview}</p>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="ap-layout">
          {/* Share sidebar */}
          <ShareSidebar onShare={handleShare} />

          {/* Article + comments + author */}
          <div className="ap-article">
            {article.content.split("\n\n").map((para, i) => {
              const trimmed = para.trim();

              // Helper function to turn markdown links [text](url) into actual clickable <a> tags
              const renderInlineElements = (text) => {
                const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                const parts = [];
                let lastIndex = 0;
                let match;

                while ((match = markdownLinkRegex.exec(text)) !== null) {
                  // Add the text before the link
                  if (match.index > lastIndex) {
                    parts.push(text.substring(lastIndex, match.index));
                  }
                  // Add the clickable link component
                  parts.push(
                    <a
                      key={match.index}
                      href={match[2]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ap-article__inline-link"
                      style={{ color: '#3b82f6', textDecoration: 'underline' }} // Style as needed
                    >
                      {match[1]}
                    </a>
                  );
                  lastIndex = markdownLinkRegex.lastIndex;
                }

                if (lastIndex < text.length) {
                  parts.push(text.substring(lastIndex));
                }

                return parts.length > 0 ? parts : text;
              };

              // NEW: Check for Markdown Images: ![Alt Text](URL)
              if (trimmed.startsWith("![") && trimmed.endsWith(")")) {
                const match = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
                if (match) {
                  const altText = match[1];
                  const imageUrl = match[2];
                  return (
                    <div key={i} className="ap-article__image-container" style={{ margin: '24px 0' }}>
                      <img
                        src={imageUrl}
                        alt={altText}
                        className="ap-article__body-image"
                        style={{ width: '100%', height: 'auto',}}
                      />
                      {altText && <span className="ap-article__image-caption" style={{ display: 'block', fontSize: '14px', color: '#6b7280', marginTop: '8px', textAlign: 'center' }}>{altText}</span>}
                    </div>
                  );
                }
              }

              // Section Headings
              if (trimmed.startsWith("###")) {
                return (
                  <h2 key={i} className="ap-article__section-heading">
                    <CornerDownRight size={15} />
                    {renderInlineElements(trimmed.replace(/^###/, "").trim())}
                  </h2>
                );
              }

              // Numbered list item
              if (/^\d+\.\s/.test(trimmed)) {
                return (
                  <div key={i} className="ap-article__list-item">
                    <span className="ap-article__list-number">
                      {trimmed.match(/^(\d+)\./)[1]}
                    </span>
                    <p className="ap-article__list-text">
                      {renderInlineElements(trimmed.replace(/^\d+\.\s/, ""))}
                    </p>
                  </div>
                );
              }

              // Bullet item
              if (trimmed.startsWith("- ")) {
                return (
                  <div key={i} className="ap-article__bullet-item">
                    <span className="ap-article__bullet-dot" />
                    <p className="ap-article__bullet-text">
                      {renderInlineElements(trimmed.replace(/^-\s/, ""))}
                    </p>
                  </div>
                );
              }

              // Blockquote
              if (trimmed.startsWith(">")) {
                return (
                  <blockquote key={i} className="ap-article__quote">
                    {renderInlineElements(trimmed.replace(/^>\s?/, ""))}
                  </blockquote>
                );
              }

              // Short bold-style callout
              if (trimmed === trimmed.toUpperCase() && trimmed.length > 3 && trimmed.length < 80) {
                return (
                  <p key={i} className="ap-article__callout">{renderInlineElements(trimmed)}</p>
                );
              }

              // Default Paragraph
              return (
                <p key={i} className="ap-article__paragraph">
                  {renderInlineElements(trimmed)}
                </p>
              );
            })}

            {/* Mobile share */}
            <div className="ap-share-mobile">
              <span className="ap-share-mobile__label">Share:</span>
              {["twitter", "linkedin", "facebook", "whatsapp", "instagram"].map((p) => (
                <button key={p} className="ap-share-btn" onClick={() => handleShare(p)}>
                  {p === "twitter" && <Twitter size={14} />}
                  {p === "linkedin" && <Linkedin size={14} />}
                  {p === "facebook" && <Facebook size={14} />}
                  {p === "instagram" && <Instagram size={14} />}
                  {p === "whatsapp" && (
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* This sits right below your article content */}
            {/* This sits right below your article content */}
            <footer className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 italic">
              {article.isSponsored ? (
                // Sponsored Article Footer Box
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 text-center border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm">
                  <div className="max-w-xl">
                    <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      This article was sponsored and contributed by{" "}

                    <a  href={article.companyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-900 dark:text-neutral-100 underline font-semibold hover:underline decoration-neutral-400"
          >
                      {article.companyName}
                    </a>
                    . Published via{" "}

                <a    href="https://browncode.name.ng/blog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-950 dark:text-neutral-50 underline font-medium hover:underline"
          >
                    <span className="ap-nav__brand">
                      brown<em>.</em>dev
                    </span>
                  </a>.
                </p>
      </div>


        <a  href="/google_index/advertise"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center shrink-0 gap-2 px-4 py-2 text-sm font-medium text-neutral-900 bg-white border border-neutral-300 shadow-sm hover:bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-700 transition-all duration-200 group"
      >
          <span>Advertise with us</span>
          <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
      ) : (
      // Standard Publication Footer
      <div className="text-center">
        <span className="text-sm">
          This article was originally written and published by{" "}

        <a  href={shareUrl(article.slug)}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-neutral-800 underline dark:text-neutral-200 hover:underline"
        >
          <span className="ap-nav__brand">
            brown<em>.</em>dev
          </span>
        </a>
      </span>
      <span className="text-xs">
        <p className="text-sm text-neutral-500 dark:text-neutral-400 italic">

         <a href="/google_index/advertise"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center shrink-0 gap-2 px-4 py-2 text-sm font-medium text-neutral-900 bg-white border border-neutral-300 shadow-sm hover:bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-700 transition-all duration-200 group"
          >
          <span className="text-xs">Advertise with us</span>
          <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-transform group-hover:translate-x-0.5" />
        </a>
      </p>
    </span >
    </div >
  )
}
</footer >

            {/* Author card */}
            <div className="ap-author-card">
              <Link href="/bc/about" className="ap-author-card__avatar">
                <img src="/coder1.png" alt="Brown AD" />
              </Link>
              <div className="ap-author-card__body">
                <span className="ap-author-card__eyebrow">Author</span>
                <h3 className="ap-author-card__name">Sir Brown AD</h3>
                <p className="ap-author-card__role">Software Developer, Blogger & Web Architect</p>
                <p className="ap-author-card__bio">
                  Full-stack developer building performant, scalable digital products. Specialized in React architecture, custom web engines, and secure data infrastructure.
                </p>
                <Link href="/bc/about" className="ap-author-card__link">
                  Full profile <ArrowRight size={12} />
                </Link>
              </div>
              <div className="ap-author-card__socials">
              <span className="ft-col-label" style={{ textAlign: "right", display: "block", marginBottom: "12px" }}>
                Connect
              </span>
                <a href="https://www.linkedin.com/in/brownoziomachi72a5a3229" target="_blank" rel="noopener noreferrer" className="ap-social-btn" title="LinkedIn">
                  <Linkedin size={15} />
                </a>
                <a href="https://github.com/Brown-Oziomachi" target="_blank" rel="noopener noreferrer" className="ap-social-btn" title="GitHub">
                  <Github size={15} />
                </a>
                <a href="mailto:browncemmanuel@gmail.com" className="ap-social-btn" title="Email">
                  <Mail size={15} />
                </a>
                <a href="https://wa.me/2348142995114" target="_blank" rel="noopener noreferrer" className="ap-social-btn" title="WhatsApp">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Comments */}
            <CommentsSection articleSlug={article.slug} />
          </div>

          {/* Right sidebar */}
          <div className="ap-sidebar">
            <div className="ap-sidebar__box max-lg:hidden">
              <span className="ap-sidebar__label">About this article</span>
              <p className="ap-sidebar__text">{article.preview}</p>
            </div>
            <div className="ap-sidebar__box max-lg:hidden">
              <span className="ap-sidebar__label">Details</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                  <span style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)", fontSize: "10px" }}>Author</span>
                  <span style={{ color: "var(--text-2)", fontSize: "12px" }}>{article.postedBy}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                  <span style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)", fontSize: "10px" }}>Read time</span>
                  <span style={{ color: "var(--text-2)", fontSize: "12px" }}>{getReadingTime(article.content)} min</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                  <span style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)", fontSize: "10px" }}>Article ID</span>
                  <span style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)", fontSize: "10px" }}>{article.slug.slice(0, 8)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        <RelatedArticles />

        {/* Article footer */}
        <div className="ap-article-footer">
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-3)" }}>
            brown.dev — {article.title.slice(0, 32)}{article.title.length > 32 ? "…" : ""}
          </span>
          <div className="ap-article-footer__actions">
            <button className="ap-btn" onClick={() => router.push("/blog")}>
              <ArrowLeft size={13} /> All articles
            </button>
            <button className="ap-btn" onClick={() => router.push("/portfolio")}>
              Portfolio
            </button>
            <button className="ap-btn ap-btn--accent" onClick={() => router.push("/bc/contact")}>
              Get in touch
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}