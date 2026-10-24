"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Clock, Twitter, Linkedin, Facebook,
  Github, Mail, Heart, Link2, Check,
} from "lucide-react";
import { doc, getDoc, setDoc, updateDoc, increment, onSnapshot } from "firebase/firestore";
import { db1 } from "@/config/firebase.config1";
import RelatedArticles from "@/components/relatedarticle";
import Footer from "@/components/footer";
import SocialLinks from "@/components/SocialLinks";
import CommentsSection from "@/components/CommentsSection";
import TableOfContents from "@/components/TableOfContents";
import AlsoRead from "@/components/AlsoRead";
import NewsletterCapture from "@/components/NewsletterCapture";
import { CATEGORY_LABELS, getCategoryKey } from "@/lib/blogCategories";
import InstallAppButton from "@/components/InstallAppButton";
import NotifyButton from "@/components/NotifyButton";

/* ── helpers ─────────────────────────────────────────── */

const getReadingTime = (content) =>
  Math.max(1, Math.ceil((content || "").split(" ").length / 200));

const shareUrl = (slug) => `https://sirbrownad.name.ng/blog/${slug}`;

const formatDate = (dateString) => {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/* Inline markdown: [text](url) and **bold** */
const renderInline = (text) => {
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  const parts = [];
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) {
      parts.push(
        <a key={m.index} href={m[2]} target="_blank" rel="noopener noreferrer" className="ap-link">
          {m[1]}
        </a>
      );
    } else {
      parts.push(<strong key={m.index}>{m[3]}</strong>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : text;
};

const headingId = (text) =>
  text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

const WhatsAppIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

/* ── 404 ─────────────────────────────────────────────── */

const NotFound = ({ onBack }) => (
  <div className="ap-404">
    <div className="ap-404__card">
      <span className="ap-404__code">404</span>
      <h2 className="ap-404__title">Article not found</h2>
      <p className="ap-404__msg">This article may have been moved, renamed, or doesn&apos;t exist yet.</p>
      <button className="ap-404__btn" onClick={onBack}>
        <ArrowLeft size={14} /> Back to blog
      </button>
    </div>
  </div>
);

/* ── page ────────────────────────────────────────────── */

export default function ArticleClient({ article, relatedArticles = [] }) {
  const router = useRouter();
  const progressRef = useRef(null);

  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [coverFailed, setCoverFailed] = useState(false);

  /* Likes */
  useEffect(() => {
    if (!article) return;
    const likedSlugs = JSON.parse(localStorage.getItem("likedArticles") || "[]");
    setHasLiked(likedSlugs.includes(article.slug));

    const likeRef = doc(db1, "likes", article.slug);
    const unsub = onSnapshot(
      likeRef,
      (snap) => setLikeCount(snap.exists() ? snap.data().count || 0 : 0),
      (e) => console.error(e)
    );
    return () => unsub();
  }, [article]);

  /* Reading progress (updates the bar directly, no re-render) */
  useEffect(() => {
    const onScroll = () => {
      const el = progressRef.current;
      if (!el) return;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      el.style.transform = `scaleX(${max > 0 ? Math.min(1, h.scrollTop / max) : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [article]);

  /* Article body (memoised so likes/copy don't re-render the whole text) */
  const body = useMemo(() => {
    if (!article) return null;
    const blocks = (article.content || "").split("\n\n");

    const elements = blocks.map((para, i) => {
      const trimmed = para.trim();
      if (!trimmed) return null;

      // Image: ![alt](url)
      if (trimmed.startsWith("![") && trimmed.endsWith(")")) {
        const m = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (m) {
          return (
            <figure key={i} className="ap-figure">
              <img src={m[2]} alt={m[1]} loading="lazy" />
              {m[1] && <figcaption>{m[1]}</figcaption>}
            </figure>
          );
        }
      }

      // Section heading
      if (trimmed.startsWith("###")) {
        const text = trimmed.replace(/^###/, "").trim();
        return (
          <h2 key={i} id={headingId(text)} className="ap-h2">
            {renderInline(text)}
          </h2>
        );
      }

      const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);

      // Numbered list
      if (lines.length && lines.every((l) => /^\d+\.\s/.test(l))) {
        return (
          <div key={i} className="ap-list">
            {lines.map((l, j) => (
              <div key={j} className="ap-list__item">
                <span className="ap-list__num">{l.match(/^(\d+)\./)[1]}</span>
                <p>{renderInline(l.replace(/^\d+\.\s/, ""))}</p>
              </div>
            ))}
          </div>
        );
      }

      // Bullets
      if (lines.length && lines.every((l) => l.startsWith("- "))) {
        return (
          <div key={i} className="ap-list">
            {lines.map((l, j) => (
              <div key={j} className="ap-list__item">
                <span className="ap-list__dot" />
                <p>{renderInline(l.replace(/^-\s/, ""))}</p>
              </div>
            ))}
          </div>
        );
      }

      // Quote
      if (trimmed.startsWith(">")) {
        return (
          <blockquote key={i} className="ap-quote">
            {renderInline(trimmed.replace(/^>\s?/, ""))}
          </blockquote>
        );
      }

      // Short ALL-CAPS callout
      if (trimmed === trimmed.toUpperCase() && trimmed.length > 3 && trimmed.length < 80) {
        return <p key={i} className="ap-callout">{renderInline(trimmed)}</p>;
      }

      return <p key={i} className="ap-p">{renderInline(trimmed)}</p>;
    });

    // "Also read" about a third of the way down
    if (relatedArticles.length > 0) {
      const insertAt = Math.min(Math.max(3, Math.floor(elements.length / 3)), elements.length);
      elements.splice(insertAt, 0, <AlsoRead key="also-read" items={relatedArticles} />);
    }
    return elements;
  }, [article, relatedArticles]);

  if (!article) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
          .ap-404 { min-height: 100vh; background: #fff; display: flex; align-items: center; justify-content: center; padding: 24px; font-family: 'Inter', system-ui, sans-serif; }
          .ap-404__card { background: #fff; border: 1.5px solid #111; border-top: 5px solid #e8ff47; box-shadow: 8px 8px 0 #e8ff47; padding: 40px; max-width: 420px; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; color: #111; }
          .ap-404__code { font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 0.1em; background: #e8ff47; padding: 2px 8px; }
          .ap-404__title { margin: 0; font-family: 'Playfair Display', Georgia, serif; font-weight: 800; font-size: 28px; }
          .ap-404__msg { margin: 0; font-size: 14px; color: #3f3f3f; line-height: 1.6; }
          .ap-404__btn { display: inline-flex; align-items: center; gap: 7px; margin-top: 6px; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.06em; padding: 12px 18px; border: 1.5px solid #111; background: #e8ff47; color: #0a0a0b; font-weight: 600; cursor: pointer; }
          .ap-404__btn:hover { background: #111; color: #e8ff47; }
        `}</style>
        <NotFound onBack={() => router.push("/blog")} />
      </>
    );
  }

  /* Likes */
  const handleLike = async () => {
    if (likeLoading) return;
    setLikeLoading(true);
    const likeRef = doc(db1, "likes", article.slug);
    const likedSlugs = JSON.parse(localStorage.getItem("likedArticles") || "[]");
    try {
      const snap = await getDoc(likeRef);
      if (hasLiked) {
        await updateDoc(likeRef, { count: increment(-1) });
        localStorage.setItem("likedArticles", JSON.stringify(likedSlugs.filter((s) => s !== article.slug)));
        setHasLiked(false);
      } else if (!snap.exists()) {
        await setDoc(likeRef, { count: 1 });
        localStorage.setItem("likedArticles", JSON.stringify([...likedSlugs, article.slug]));
        setHasLiked(true);
      } else {
        await updateDoc(likeRef, { count: increment(1) });
        localStorage.setItem("likedArticles", JSON.stringify([...likedSlugs, article.slug]));
        setHasLiked(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLikeLoading(false);
    }
  };

  /* Sharing */
  const handleShare = (platform) => {
    const url = shareUrl(article.slug);
    const links = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(article.title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${article.title}\n${url}`)}`,
    };
    window.open(links[platform], "_blank", "noopener,noreferrer,width=600,height=500");
  };

  const copyLink = async () => {
    const url = shareUrl(article.slug);
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Copy this link:", url);
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const category = CATEGORY_LABELS[getCategoryKey(article)];
  const date = formatDate(article.datePublished);
  const readTime = getReadingTime(article.content);

  const likeButton = (
    <button
      className={`ap-like${hasLiked ? " ap-like--on" : ""}`}
      onClick={handleLike}
      disabled={likeLoading}
      aria-pressed={hasLiked}
      aria-label={hasLiked ? "Unlike this article" : "Like this article"}
    >
      <Heart size={14} fill={hasLiked ? "currentColor" : "none"} />
      {likeCount}
    </button>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .ap-page {
          --paper: #ffffff; --paper-2: #f6f5f0; --card: #ffffff;
          --ink: #111111; --ink-2: #3f3f3f; --ink-3: #6f6f6f;
          --rule: #e4e2da; --rule-dark: #111111;
          --accent: #e8ff47; --on-accent: #0a0a0b;
          --serif: 'Playfair Display', Georgia, serif;
          --sans: 'Inter', system-ui, sans-serif;
          --mono: 'JetBrains Mono', 'Fira Code', monospace;
          /* names used by AlsoRead, NewsletterCapture, CommentsSection, TableOfContents */
          --bg: #ffffff; --surface: #f6f5f0; --border: #e4e2da; --border-hi: #111111;
          --text-1: #111111; --text-2: #3f3f3f; --text-3: #6f6f6f;
          --accent-dim: rgba(232,255,71,0.35); --radius: 0px;
          --font-serif: var(--serif); --font-sans: var(--sans); --font-mono: var(--mono);
          background: var(--paper); color: var(--ink); font-family: var(--sans); min-height: 100vh;
        }
        .ap-page *, .ap-page *::before, .ap-page *::after { box-sizing: border-box; }
        .ap-page h1, .ap-page h2, .ap-page h3, .ap-page p { margin: 0; }
        :where(.ap-page a) { color: inherit; text-decoration: none; }
        .ap-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }

        /* Reading progress */
        .ap-progress { position: fixed; top: 0; left: 0; right: 0; height: 4px; z-index: 1100; background: transparent; pointer-events: none; }
        .ap-progress__bar { height: 100%; background: var(--ink); transform: scaleX(0); transform-origin: left; will-change: transform; }

        /* Nav */
        .ap-nav { position: sticky; top: 0; z-index: 1000; background: rgba(255,255,255,0.92); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); border-bottom: 1px solid var(--rule); }
        .ap-nav__inner { max-width: 1120px; margin: 0 auto; padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .ap-nav__brand { font-family: var(--serif); font-weight: 800; font-size: 21px; letter-spacing: -0.01em; }
        .ap-nav__brand em { font-style: normal; background: var(--accent); padding: 0 3px; }
        .ap-nav__links { display: flex; align-items: center; gap: 4px; }
        .ap-nav__link { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3); padding: 8px 12px; display: inline-flex; align-items: center; gap: 6px; transition: color 0.15s; }
        .ap-nav__link:hover { color: var(--ink); }
        .ap-nav__link--box { border: 1.5px solid var(--ink); color: var(--ink); }
        .ap-nav__link--box:hover { background: var(--ink); color: #fff; }
        button.ap-nav__link { background: transparent; cursor: pointer; }
                @media (max-width: 640px) { .ap-nav__hide { display: none; } }

        /* Buttons */
        .ap-btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em; padding: 10px 16px; border: 1.5px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; transition: background 0.15s, color 0.15s, transform 0.15s; }
        .ap-btn:hover { background: var(--ink); color: #fff; transform: translateY(-1px); }
        .ap-btn--solid { background: var(--accent); color: var(--on-accent); font-weight: 600; }
        .ap-btn--solid:hover { background: var(--ink); color: var(--accent); }

        /* Hero */
        .ap-hero { padding-top: 48px; max-width: 880px; }
        .ap-chip { display: inline-block; font-family: var(--mono); font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; background: var(--accent); color: var(--on-accent); padding: 5px 10px; margin-bottom: 20px; border: 1px solid var(--ink); }
        .ap-title { font-family: var(--serif); font-weight: 800; font-size: clamp(28px, 4.6vw, 48px); line-height: 1.1; letter-spacing: -0.015em; }
        .ap-dek { margin-top: 22px; font-size: clamp(15px, 1.7vw, 18px); line-height: 1.65; font-weight: 300; color: var(--ink-2); border-left: 3px solid var(--accent); padding-left: 18px; max-width: 720px; }
        .ap-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 14px 22px; margin-top: 30px; padding: 16px 0; border-top: 3px solid var(--rule-dark); border-bottom: 1px solid var(--rule); }
        .ap-author { display: flex; align-items: center; gap: 10px; }
        .ap-avatar { width: 34px; height: 34px; background: var(--accent); color: var(--on-accent); border: 1.5px solid var(--ink); display: flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 11px; font-weight: 600; flex-shrink: 0; }
        .ap-author__name { font-size: 14px; font-weight: 600; }
        .ap-meta__item { display: inline-flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: 11.5px; color: var(--ink-3); }
        .ap-meta .ap-like { margin-left: auto; }

        .ap-like { display: inline-flex; align-items: center; gap: 7px; font-family: var(--mono); font-size: 12px; color: var(--ink); background: transparent; border: 1.5px solid var(--ink); padding: 8px 14px; cursor: pointer; transition: color 0.15s, background 0.15s; }
        .ap-like:hover { background: var(--accent); }
        .ap-like--on { background: var(--accent); color: var(--on-accent); }
        .ap-like:disabled { opacity: 0.6; cursor: default; }

        /* Cover */
        .ap-cover { margin: 32px 0 0; height: clamp(200px, 34vw, 400px); overflow: hidden; background: var(--paper-2); border: 1px solid var(--rule-dark); }
        .ap-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* Layout */
        .ap-layout { display: grid; grid-template-columns: 48px minmax(0, 1fr) 260px; gap: 0 44px; align-items: start; padding-top: 44px; padding-bottom: 72px; }
        @media (max-width: 960px) { .ap-layout { grid-template-columns: minmax(0, 1fr); padding-top: 28px; } }

        /* Share rail */
        .ap-rail { position: sticky; top: 90px; display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .ap-rail__label { font-family: var(--mono); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 4px; }
        .ap-share-btn { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--ink); background: #fff; color: var(--ink); cursor: pointer; transition: background 0.15s, transform 0.15s; }
        .ap-share-btn:hover { background: var(--accent); transform: translateY(-1px); }

        /* Prose */
        .ap-article { max-width: 700px; min-width: 0; }
        .ap-p { font-size: 17px; line-height: 1.85; color: var(--ink-2); margin-bottom: 22px; }
        .ap-p strong, .ap-list p strong, .ap-quote strong { color: var(--ink); font-weight: 600; }
        .ap-link { color: var(--ink); font-weight: 500; text-decoration: underline; text-decoration-color: #c9c600; text-decoration-thickness: 2px; text-underline-offset: 3px; }
        .ap-link:hover { background: var(--accent); }
        .ap-h2 { font-family: var(--serif); font-weight: 800; font-size: clamp(22px, 2.8vw, 28px); line-height: 1.25; color: var(--ink); margin: 44px 0 14px; scroll-margin-top: 96px; }
        .ap-h2::before { content: ''; display: block; width: 40px; height: 5px; background: var(--accent); border: 1px solid var(--ink); margin-bottom: 14px; }
        .ap-list { margin: 4px 0 28px; display: flex; flex-direction: column; gap: 14px; }
        .ap-list__item { display: flex; gap: 14px; align-items: flex-start; }
        .ap-list__item p { font-size: 16.5px; line-height: 1.75; color: var(--ink-2); }
        .ap-list__num { font-family: var(--mono); font-size: 12px; font-weight: 600; width: 26px; height: 26px; background: var(--accent); color: var(--on-accent); border: 1px solid var(--ink); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 3px; }
        .ap-list__dot { width: 9px; height: 9px; background: var(--accent); border: 1px solid var(--ink); flex-shrink: 0; margin-top: 11px; }
        .ap-quote { font-family: var(--serif); font-style: italic; font-size: 20px; line-height: 1.6; color: var(--ink); border-left: 5px solid var(--accent); background: var(--paper-2); padding: 22px 26px; margin: 34px 0; }
        .ap-callout { font-family: var(--mono); font-size: 12px; font-weight: 500; letter-spacing: 0.08em; color: var(--on-accent); background: var(--accent); border: 1.5px solid var(--ink); padding: 12px 16px; margin: 0 0 24px; }
        .ap-figure { margin: 34px 0; }
        .ap-figure img { width: 100%; height: auto; display: block; border: 1px solid var(--rule-dark); background: var(--paper-2); }
        .ap-figure figcaption { margin-top: 10px; font-family: var(--mono); font-size: 11px; color: var(--ink-3); text-align: center; }

        /* WhatsApp channel */
        .ap-channel { margin: 48px 0 0; padding: 22px 24px; background: var(--paper-2); border: 1px solid var(--rule-dark); border-left: 5px solid var(--accent); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; }
        .ap-channel__title { font-family: var(--serif); font-weight: 800; font-size: 20px; line-height: 1.2; margin-bottom: 4px; }
        .ap-channel__sub { font-size: 13px; line-height: 1.6; color: var(--ink-2); max-width: 420px; }

        /* Share card */
        .ap-sharecard { margin: 28px 0 32px; padding: 28px; background: var(--card); border: 1px solid var(--rule-dark); border-top: 5px solid var(--accent); }
        .ap-sharecard__title { font-family: var(--serif); font-weight: 800; font-size: 24px; line-height: 1.2; margin-bottom: 6px; }
        .ap-sharecard__sub { font-size: 14px; color: var(--ink-2); margin-bottom: 18px; line-height: 1.6; }
        .ap-sharecard__row { display: flex; flex-wrap: wrap; gap: 10px; }
        .ap-sharecard__row .ap-btn { height: 44px; }

        /* Publication note */
        .ap-note { margin: 0 0 32px; padding: 18px 20px; border: 1px solid var(--rule); background: var(--paper-2); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; }
        .ap-note p { font-size: 13px; line-height: 1.7; color: var(--ink-2); max-width: 460px; }
        .ap-note a.ap-note__link { color: var(--ink); font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }

        /* Author card */
        .ap-author-card { display: grid; grid-template-columns: 72px 1fr; gap: 20px; padding: 26px; background: var(--card); border: 1px solid var(--rule-dark); box-shadow: 6px 6px 0 var(--accent); margin: 0 6px 56px 0; }
        @media (max-width: 520px) { .ap-author-card { grid-template-columns: 1fr; } }
        .ap-author-card__avatar { width: 72px; height: 72px; border-radius: 50%; overflow: hidden; border: 1.5px solid var(--ink); background: var(--paper-2); display: block; }
        .ap-author-card__avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ap-author-card__kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; background: var(--accent); width: fit-content; padding: 1px 6px; margin-bottom: 6px; }
        .ap-author-card__name { font-family: var(--serif); font-weight: 800; font-size: 22px; }
        .ap-author-card__role { font-family: var(--mono); font-size: 11px; color: var(--ink-3); margin: 2px 0 10px; }
        .ap-author-card__bio { font-size: 13.5px; line-height: 1.7; color: var(--ink-2); margin-bottom: 14px; }
        .ap-author-card__actions { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.ap-socials { display: flex; flex-wrap: wrap; gap: 6px; margin-left: auto; }
        .ap-social { width: 36px; height: 36px; border: 1px solid var(--ink); display: flex; align-items: center; justify-content: center; color: var(--ink); transition: background 0.15s; }
        .ap-social:hover { background: var(--accent); }

        /* Comments */
        .ap-comments { border-top: 3px solid var(--rule-dark); padding-top: 32px; }

        /* Sidebar */
        .ap-side { position: sticky; top: 90px; display: flex; flex-direction: column; gap: 16px; max-height: calc(100vh - 110px); overflow-y: auto; }
        .ap-sidebar__box { padding: 18px; background: var(--card); border: 1px solid var(--rule-dark); }
        .ap-sidebar__label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; color: var(--on-accent); background: var(--accent); text-transform: uppercase; display: inline-block; padding: 2px 7px; margin-bottom: 12px; }
        .ap-detail { display: flex; justify-content: space-between; gap: 10px; font-size: 13px; padding: 8px 0; border-bottom: 1px solid var(--rule); }
        .ap-detail:last-child { border-bottom: none; }
        .ap-detail span:first-child { color: var(--ink-3); font-family: var(--mono); font-size: 11px; }
        .ap-detail span:last-child { color: var(--ink); text-align: right; }
        .ap-hire { border-top: 4px solid var(--accent); }
        .ap-hire h3 { font-family: var(--serif); font-weight: 800; font-size: 18px; margin-bottom: 6px; }
        .ap-hire p { font-size: 13px; line-height: 1.6; color: var(--ink-2); margin-bottom: 12px; }

        /* Table of contents (rendered by TableOfContents) */
        .ap-toc-box ul, .ap-toc-box ol { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 10px; }
        .ap-toc-box li { line-height: 1.4; }
        .ap-toc-box a { display: block; font-size: 13px; line-height: 1.5; color: var(--ink-2); border-left: 3px solid transparent; padding-left: 10px; margin-left: -1px; transition: color 0.15s, border-color 0.15s; cursor: pointer; }
        .ap-toc-box a:hover { color: var(--ink); border-left-color: var(--rule-dark); }
        .ap-toc-box a.active, .ap-toc-box a[aria-current="true"] { color: var(--ink); font-weight: 600; border-left-color: var(--accent); }
        .ap-toc-mobile { display: block; position: sticky; top: 60px; z-index: 20; background: var(--paper); padding-bottom: 10px; margin-bottom: 6px; }
        @media (min-width: 961px) { .ap-toc-mobile { display: none; } }

        /* Bottom CTA bar */
        .ap-bottom { border-top: 3px solid var(--rule-dark); padding: 36px 0 72px; margin-top: 8px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; }
        .ap-bottom__text { font-family: var(--serif); font-weight: 800; font-size: clamp(20px, 2.6vw, 26px); line-height: 1.2; max-width: 520px; }
        .ap-bottom__actions { display: flex; flex-wrap: wrap; gap: 10px; }

        /* Mobile and tablet (kept last so it wins) */
        @media (max-width: 960px) {
          .ap-rail, .ap-side { display: none !important; }
          .ap-article { max-width: 100%; }
        }
        @media (max-width: 640px) {
          .ap-wrap, .ap-nav__inner { padding-left: 18px; padding-right: 18px; }
          .ap-hero { padding-top: 28px; }
          .ap-chip { margin-bottom: 14px; }
          .ap-dek { padding-left: 14px; margin-top: 16px; }
          .ap-meta { gap: 12px 16px; margin-top: 22px; }
          .ap-meta .ap-like { margin-left: 0; }
          .ap-cover { margin-top: 22px; height: clamp(170px, 52vw, 260px); }
          .ap-p { font-size: 16px; line-height: 1.8; margin-bottom: 18px; }
          .ap-h2 { margin: 34px 0 12px; }
          .ap-list__item p { font-size: 15.5px; }
          .ap-quote { font-size: 17px; padding: 16px 18px; margin: 24px 0; }
          .ap-channel { padding: 18px; }
          .ap-channel .ap-btn { width: 100%; }
          .ap-sharecard { padding: 22px 18px; }
          .ap-sharecard__row .ap-btn { flex: 1 1 calc(50% - 10px); }
          .ap-note { padding: 16px; }
          .ap-author-card { padding: 20px 18px; }
          .ap-socials { margin-left: 0; width: 100%; }
          .ap-bottom__actions .ap-btn { flex: 1 1 auto; }
        }

        .ap-page :focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { .ap-page * { transition: none !important; } }
      `}</style>

      <div className="ap-page">
        <div className="ap-progress" aria-hidden="true">
          <div className="ap-progress__bar" ref={progressRef} />
        </div>

        {/* Nav */}
        <header className="ap-nav">
          <div className="ap-nav__inner">
            <Link href="/" className="ap-nav__brand">brown<em>.</em>dev</Link>
            <nav className="ap-nav__links" aria-label="Main">
              <Link href="/bc/about" className="ap-nav__link ap-nav__hide">About</Link>
              <Link href="/portfolio" className="ap-nav__link ap-nav__hide">Portfolio</Link>
              <InstallAppButton className="ap-nav__link ap-nav__link--box ap-nav__hide" />
              <a
                href="https://github.com/sponsors/Brown-Oziomachi/"
                target="_blank"
                rel="noopener noreferrer"
                className="ap-nav__link ap-nav__link--box ap-nav__hide"
              >
                <Heart size={12} fill="currentColor" /> Sponsor
              </a>
              <Link href="/blog" className="ap-nav__link ap-nav__link--box">
                <ArrowLeft size={12} /> Blog
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <header className="ap-wrap ap-hero">
          <span className="ap-chip">{category}</span>
          <h1 className="ap-title">{article.title}</h1>
          {article.preview && <p className="ap-dek">{article.preview}</p>}

          <div className="ap-meta">
            <div className="ap-author">
              <span className="ap-avatar">{(article.postedBy || "SB").slice(0, 2).toUpperCase()}</span>
              <span className="ap-author__name">{article.postedBy}</span>
            </div>
            {date && <span className="ap-meta__item">{date}</span>}
            <span className="ap-meta__item"><Clock size={13} /> {readTime} min read</span>
            {likeButton}
          </div>
        </header>

        {/* Cover */}
        {article.image && !coverFailed && (
          <div className="ap-wrap">
            <div className="ap-cover">
              <img src={article.image} alt={article.title} onError={() => setCoverFailed(true)} />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="ap-wrap ap-layout">
          {/* Share rail */}
          <aside className="ap-rail" aria-label="Share this article">
            <span className="ap-rail__label">Share</span>
            <button className="ap-share-btn" onClick={() => handleShare("whatsapp")} title="Share on WhatsApp" aria-label="Share on WhatsApp"><WhatsAppIcon /></button>
            <button className="ap-share-btn" onClick={() => handleShare("twitter")} title="Share on X" aria-label="Share on X"><Twitter size={16} /></button>
            <button className="ap-share-btn" onClick={() => handleShare("linkedin")} title="Share on LinkedIn" aria-label="Share on LinkedIn"><Linkedin size={16} /></button>
            <button className="ap-share-btn" onClick={() => handleShare("facebook")} title="Share on Facebook" aria-label="Share on Facebook"><Facebook size={16} /></button>
            <button className="ap-share-btn" onClick={copyLink} title="Copy link" aria-label="Copy link">
              {copied ? <Check size={16} /> : <Link2 size={16} />}
            </button>
          </aside>

          {/* Article */}
          <div className="ap-article">
            <div className="ap-toc-mobile ap-toc-box">
              <TableOfContents content={article.content} />
            </div>

            {body}

            <NewsletterCapture
              categoryKey={getCategoryKey(article)}
              categoryLabel={category}
              articleSlug={article.slug}
            />

            {/* WhatsApp channel */}
            <section className="ap-channel" aria-label="Join my WhatsApp channel">
              <div>
                <h2 className="ap-channel__title">Join my WhatsApp channel</h2>
                <p className="ap-channel__sub">
                  Get new articles, fraud alerts and web security tips straight to your phone.
                </p>
              </div>
              <a
                href="https://whatsapp.com/channel/0029VbEGWFsC1FuAo5qoPh0q"
                target="_blank"
                rel="noopener noreferrer"
                className="ap-btn ap-btn--solid"
              >
                <WhatsAppIcon size={15} /> Join channel
              </a>
            </section>

            {/* Share card */}
            <section className="ap-sharecard" aria-label="Share this article">
              <h2 className="ap-sharecard__title">Found this useful? Share it.</h2>
              <p className="ap-sharecard__sub">
                Someone you know may be about to fall for a scam or make a costly mistake. Send them this.
              </p>
              <div className="ap-sharecard__row">
                <button className="ap-btn ap-btn--solid" onClick={() => handleShare("whatsapp")}>
                  <WhatsAppIcon size={15} /> WhatsApp
                </button>
                <button className="ap-btn" onClick={() => handleShare("twitter")}><Twitter size={14} /> X</button>
                <button className="ap-btn" onClick={() => handleShare("linkedin")}><Linkedin size={14} /> LinkedIn</button>
                <button className="ap-btn" onClick={() => handleShare("facebook")}><Facebook size={14} /> Facebook</button>
                <button className="ap-btn" onClick={copyLink}>
                  {copied ? <Check size={14} /> : <Link2 size={14} />} {copied ? "Link copied" : "Copy link"}
                </button>
              </div>
            </section>

            {/* Publication note */}
            <div className="ap-note">
              {article.isSponsored ? (
                <p>
                  This article was sponsored and contributed by{" "}
                  <a
                    href={article.companyLink}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="ap-note__link"
                  >
                    {article.companyName}
                  </a>
                  . Published via <Link href="/blog" className="ap-note__link">brown.dev</Link>.
                </p>
              ) : (
                <p>
                  This article was originally written and published by{" "}
                  <a href={shareUrl(article.slug)} className="ap-note__link">Sir Brown AD</a>.
                </p>
              )}
              <Link href="/advertise" className="ap-btn">
                Advertise with us <ArrowRight size={12} />
              </Link>
            </div>

            {/* Author */}
            <section className="ap-author-card" aria-label="About the author">
              <Link href="/bc/about" className="ap-author-card__avatar">
                <img src="/sirb.png" alt="Sir Brown AD" />
              </Link>
              <div>
                <div className="ap-author-card__kicker">Written by</div>
                <h3 className="ap-author-card__name">Sir Brown AD</h3>
                <p className="ap-author-card__role">Full stack engineer and publisher, Abuja</p>
                <p className="ap-author-card__bio">
                  I build secure web platforms for Nigeria and Africa, and write about fraud awareness, web
                  security and what I learn shipping real products.
                </p>
                <div className="ap-author-card__actions">
                  <a href="https://cal.com/sir-brown" className="ap-btn" target="_blank" rel="noopener noreferrer">
                    Book a call <ArrowUpRight size={12} />
                  </a>
                  <Link href="/bc/about" className="ap-btn">
                    Full profile <ArrowRight size={12} />
                  </Link>
                  <div className="ap-socials">
                    <a href="https://www.linkedin.com/in/brownoziomachi72a5a3229" target="_blank" rel="noopener noreferrer" className="ap-social" title="LinkedIn" aria-label="LinkedIn"><Linkedin size={15} /></a>
                    <a href="https://github.com/Brown-Oziomachi" target="_blank" rel="noopener noreferrer" className="ap-social" title="GitHub" aria-label="GitHub"><Github size={15} /></a>
                    <a href="mailto:browncemmanuel@gmail.com" className="ap-social" title="Email" aria-label="Email"><Mail size={15} /></a>
                    <SocialLinks size={15} linkClass="ap-social" />
                  </div>
                </div>
              </div>
            </section>

            {/* Comments */}
            <section className="ap-comments">
              <CommentsSection articleSlug={article.slug} />
            </section>
          </div>

          {/* Sidebar */}
          <aside className="ap-side">
            <div className="ap-sidebar__box ap-toc-box">
              <span className="ap-sidebar__label">On this page</span>
              <TableOfContents content={article.content} />
            </div>

            <div className="ap-sidebar__box">
              <span className="ap-sidebar__label">Details</span>
              <div className="ap-detail"><span>Author</span><span>{article.postedBy}</span></div>
              {date && <div className="ap-detail"><span>Published</span><span>{date}</span></div>}
              <div className="ap-detail"><span>Read time</span><span>{readTime} min</span></div>
              <div className="ap-detail"><span>Topic</span><span>{category}</span></div>
            </div>

            <div className="ap-sidebar__box ap-hire">
              <h3>Need a site or app?</h3>
              <p>I build secure platforms, payment flows and write sponsored articles.</p>
              <Link href="/bc/contact" className="ap-btn ap-btn--solid">
                Start a project <ArrowRight size={12} />
              </Link>
            </div>
          </aside>
        </div>

        {/* Related */}
        <RelatedArticles currentSlug={article.slug} />

        {/* Bottom bar */}
        <div className="ap-wrap">
          <div className="ap-bottom">
            <p className="ap-bottom__text">Keep reading, or tell me about what you&apos;re building.</p>
            <div className="ap-bottom__actions">
              <button className="ap-btn" onClick={() => router.push("/blog")}>
                <ArrowLeft size={13} /> All articles
              </button>
              <button className="ap-btn" onClick={() => router.push("/portfolio")}>Portfolio</button>
              <InstallAppButton className="ap-btn" />
              <NotifyButton className="ap-btn" />
              <button className="ap-btn ap-btn--solid" onClick={() => router.push("/bc/contact")}>
                Get in touch
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}