"use client";

import { ChevronRight } from "lucide-react";

export default function AlsoRead({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <>
      <style>{`
        .ar-box {
          margin: 32px 0;
          padding: 20px 22px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
        }
        .ar-box__label {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px dashed var(--border-hi);
        }
        .ar-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ar-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          text-decoration: none;
          color: var(--text-2);
          font-size: 14px;
          line-height: 1.5;
          transition: color 0.15s;
        }
        .ar-item:hover {
          color: var(--accent);
        }
        .ar-item__icon {
          color: var(--accent);
          flex-shrink: 0;
          margin-top: 3px;
        }
      `}</style>

      <div className="ar-box">
        <div className="ar-box__label">Also Read</div>
        <div className="ar-list">
          {items.map((item) => (
            <a key={item.slug} href={`/blog/${item.slug}`} className="ar-item">
              <ChevronRight size={14} className="ar-item__icon" />
              <span>{item.title}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}