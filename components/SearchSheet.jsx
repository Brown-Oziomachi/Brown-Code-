"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Search, X, ArrowUpRight } from "lucide-react";
import { sortedArticles } from "@/app/data/article";
import { CATEGORIES } from "@/lib/blogCategories";

/* ── Helpers ──────────────────────────────────────────── */

// URL of a single article
const articleHref = (a) => `/blog/${a.slug}`;

const categoryLabel = (key) =>
  CATEGORIES.find((c) => c.key === key)?.label || key || "";

const fmtDate = (d) => {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/* ── Component ────────────────────────────────────────── */

export default function SearchSheet({ open, onClose }) {
  const [mounted, setMounted] = useState(false); // in the DOM
  const [show, setShow] = useState(false); // slid up
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Already newest first
  const sorted = sortedArticles;

  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!q) return sorted.slice(0, 3);
    return sorted
      .filter((a) =>
        [
          a.title,
          a.description,
          a.excerpt,
          a.preview,
          categoryLabel(a.category),
          a.slug.replace(/-/g, " "),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 6);
  }, [q, sorted]);

  // Mount, then slide up. On close: slide down, then unmount.
  useEffect(() => {
    if (open) {
      setMounted(true);
      const raf = requestAnimationFrame(() => setShow(true));
      const focus = setTimeout(() => inputRef.current?.focus(), 280);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(focus);
      };
    }
    setShow(false);
    const t = setTimeout(() => {
      setMounted(false);
      setQuery("");
    }, 260);
    return () => clearTimeout(t);
  }, [open]);

  // Escape closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        .ss-overlay {
          position: fixed; inset: 0; z-index: 1100; background: rgba(0,0,0,0.5);
          opacity: 0; transition: opacity 0.25s ease;
        }
        .ss-overlay--show { opacity: 1; }
        .ss-sheet {
          position: fixed; left: 0; right: 0; bottom: 0; z-index: 1101;
          max-width: 640px; margin: 0 auto; max-height: 85dvh;
          background: #fff; border-top: 1.5px solid #111;
          box-shadow: 0 -8px 40px rgba(0,0,0,0.25);
          display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.28s cubic-bezier(0.16,1,0.3,1);
          font-family: 'Inter', system-ui, sans-serif;
        }
        .ss-sheet--show { transform: translateY(0); }
        .ss-sheet *, .ss-sheet *::before, .ss-sheet *::after { box-sizing: border-box; }

        .ss-handle { width: 40px; height: 4px; background: #d6d4cb; margin: 10px auto 4px; flex-shrink: 0; }

        .ss-top { display: flex; align-items: center; gap: 10px; padding: 10px 16px 14px; flex-shrink: 0; }
        .ss-field {
          flex: 1; display: flex; align-items: center; gap: 10px; height: 48px; padding: 0 14px;
          border: 1.5px solid #111; background: #fff; color: #111;
        }
        .ss-field:focus-within { box-shadow: 3px 3px 0 #e8ff47; }
        .ss-input {
          flex: 1; min-width: 0; border: none; outline: none; background: transparent;
          font-family: 'Inter', system-ui, sans-serif; font-size: 16px; color: #111;
        }
        .ss-input::placeholder { color: #6f6f6f; }
        .ss-clear { background: none; border: none; cursor: pointer; color: #6f6f6f; display: inline-flex; padding: 2px; }
        .ss-close {
          width: 48px; height: 48px; flex-shrink: 0; border: 1.5px solid #111; background: #e8ff47;
          color: #0a0a0b; cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
        }

        .ss-body { overflow-y: auto; padding: 0 16px 20px; }
        .ss-label {
          font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.14em;
          text-transform: uppercase; color: #6f6f6f; padding: 6px 0 10px;
          border-top: 3px solid #111; margin-top: 4px;
        }
        .ss-item {
          display: block; text-decoration: none; padding: 14px 0; border-bottom: 1px solid #e4e2da;
          color: #111;
        }
        .ss-item:last-child { border-bottom: none; }
        .ss-item__meta {
          display: flex; align-items: center; gap: 8px; margin-bottom: 6px;
          font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase;
        }
        .ss-item__tag { background: #e8ff47; color: #0a0a0b; font-weight: 600; padding: 2px 6px; }
        .ss-item__date { color: #6f6f6f; }
        .ss-item__title {
          display: flex; align-items: flex-start; justify-content: space-between; gap: 10px;
          font-family: 'Playfair Display', Georgia, serif; font-weight: 800; font-size: 17px; line-height: 1.25;
        }
        .ss-item__title svg { flex-shrink: 0; margin-top: 3px; }
        .ss-item:hover .ss-item__title, .ss-item:focus-visible .ss-item__title { text-decoration: underline; text-decoration-color: #e8ff47; text-decoration-thickness: 3px; text-underline-offset: 3px; }
        .ss-empty { padding: 28px 0; text-align: center; color: #6f6f6f; font-size: 14px; }
        .ss-all {
          display: inline-flex; align-items: center; gap: 6px; margin-top: 14px; padding: 9px 12px;
          font-family: 'JetBrains Mono', monospace; font-size: 10.5px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: #111; text-decoration: none; background: #e8ff47;
        }
        .ss-all:hover { background: #111; color: #e8ff47; }
        @media (prefers-reduced-motion: reduce) { .ss-overlay, .ss-sheet { transition: none; } }
      `}</style>

      <div
        className={`ss-overlay${show ? " ss-overlay--show" : ""}`}
        onClick={onClose}
      />
      <div
        className={`ss-sheet${show ? " ss-sheet--show" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Search articles"
      >
        <div className="ss-handle" />

        {/* Search field at the top */}
        <div className="ss-top">
          <label className="ss-field">
            <Search size={18} />
            <input
              ref={inputRef}
              className="ss-input"
              type="search"
              placeholder="Search articles"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              enterKeyHint="search"
            />
            {query && (
              <button
                type="button"
                className="ss-clear"
                aria-label="Clear search"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
              >
                <X size={16} />
              </button>
            )}
          </label>
          <button
            type="button"
            className="ss-close"
            aria-label="Close search"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Recent articles / results */}
        <div className="ss-body">
          <div className="ss-label">
            {q ? `Results (${results.length})` : "Recent articles"}
          </div>

          {results.length === 0 ? (
            <p className="ss-empty">
              No articles match &ldquo;{query.trim()}&rdquo;.
            </p>
          ) : (
            results.map((a) => (
              <Link
                key={a.slug || a.title}
                href={articleHref(a)}
                className="ss-item"
                onClick={onClose}
              >
                <div className="ss-item__meta">
                  {a.category && (
                    <span className="ss-item__tag">
                      {categoryLabel(a.category)}
                    </span>
                  )}
                  {fmtDate(a.datePublished) && (
                    <span className="ss-item__date">
                      {fmtDate(a.datePublished)}
                    </span>
                  )}
                </div>
                <div className="ss-item__title">
                  <span>{a.title}</span>
                  <ArrowUpRight size={16} />
                </div>
              </Link>
            ))
          )}

          <Link href="/blog" className="ss-all" onClick={onClose}>
            Browse all posts <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
    </>
  );
}
