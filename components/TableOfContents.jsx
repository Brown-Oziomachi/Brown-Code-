"use client";

import { useEffect, useState, useRef } from "react";
import { List, ChevronDown } from "lucide-react";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export default function TableOfContents({ content }) {
  const [activeId, setActiveId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  // Extract ### headings from the same markdown content ArticleClient renders
  const headings = content
    .split("\n\n")
    .map((para) => para.trim())
    .filter((p) => p.startsWith("###"))
    .map((p) => {
      const text = p.replace(/^###/, "").trim();
      return { text, id: slugify(text) };
    });

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px" },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [content]);

  // Click-outside-to-close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  if (headings.length < 2) return null; // not worth showing for short articles

  const handleClick = (id) => {
    setIsOpen(false); // collapse after picking one, mobile-friendly
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
                .toc-box {
                    padding: 18px;
                    background: var(--surface);
                    border: 1px solid var(--border);
                    position: relative;
                }
                .toc-label {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-family: var(--font-mono);
                    font-size: 10px;
                    letter-spacing: 0.1em;
                    color: var(--text-3);
                    text-transform: uppercase;
                    margin-bottom: 12px;
                    background: none;
                    border: none;
                    padding: 0;
                    cursor: default;
                    width: 100%;
                }
                .toc-list {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    border-left: 1px solid var(--border);
                    padding-left: 12px;
                }
                .toc-item {
                    font-size: 12px;
                    line-height: 1.5;
                    color: var(--text-3);
                    cursor: pointer;
                    background: none;
                    border: none;
                    text-align: left;
                    font-family: var(--font-sans);
                    transition: color 0.15s;
                    padding: 0;
                }
                .toc-item:hover { color: var(--text-1); }
                .toc-item--active {
                    font-weight: 500;
                }

                /* Mobile: sticky, collapsed by default, expands on tap */
                @media (max-width: 960px) {
                    .toc-box {
                        margin: 0 24px 24px;
                        position: sticky;
                        top: 56px;
                        z-index: 50;
                        padding: 12px 18px;
                    }
                    .toc-label {
                        margin-bottom: 0;
                        cursor: pointer;
                        justify-content: space-between;
                    }
                    .toc-label__chevron {
                        transition: transform 0.2s ease;
                    }
                    .toc-label__chevron--open {
                        transform: rotate(180deg);
                    }
                    .toc-list {
                        display: grid;
                        grid-template-columns: 1fr;
                        border-left: none;
                        padding-left: 0;
                        gap: 10px;
                        max-height: 0;
                        overflow: hidden;
                        margin-top: 0;
                        transition: max-height 0.25s ease, margin-top 0.25s ease;
                    }
                    .toc-list--open {
                        max-height: 400px;
                        overflow-y: auto;
                        margin-top: 14px;
                    }
                    .toc-item {
                        white-space: normal;
                        line-height: 1.4;
                    }
                }
            `}</style>

      <nav className="toc-box" aria-label="Table of contents" ref={navRef}>
        <button
          type="button"
          className="toc-label"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <List size={12} />
            On this page
          </span>
          <ChevronDown
            size={12}
            className={`toc-label__chevron${isOpen ? " toc-label__chevron--open" : ""}`}
            style={{ display: "none" }}
          />
        </button>
        <ul className={`toc-list${isOpen ? " toc-list--open" : ""}`}>
          {headings.map(({ text, id }) => (
            <li key={id}>
              <button
                className={`toc-item${activeId === id ? " toc-item--active" : ""}`}
                onClick={() => handleClick(id)}
              >
                {text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
