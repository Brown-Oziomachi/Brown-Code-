"use client";

import { useState } from "react";

function Thumb({ src, alt }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed)
    return <span className="ar-thumb ar-thumb--empty" aria-hidden="true" />;
  return (
    <img
      className="ar-thumb"
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default function AlsoRead({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <>
      <style>{`
        .ar-box {
          --ar-heading: #0f766e;
          margin: 26px 0;
          padding: 14px 16px 4px;
          background: #f6f7f9;
          border: 1px solid #dfe2e7;
          border-radius: 12px;
        }
        .ar-box__label {
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ar-heading);
          margin: 0 0 10px;
        }
        .ar-list { display: flex; flex-direction: column; }
        .ar-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          text-decoration: none;
          color: #111;
          border-top: 1px solid #e4e6ea;
        }
        .ar-item:first-child { border-top: none; padding-top: 0; }
        .ar-thumb {
          width: 64px;
          height: 64px;
          flex-shrink: 0;
          object-fit: cover;
          border-radius: 8px;
          background: #e8eaee;
          display: block;
        }
        .ar-thumb--empty { background: #e8eaee; }
        .ar-item__body { min-width: 0; }
        .ar-item__title {
          margin: 0;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 600;
          line-height: 1.4;
          color: #111;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .ar-item:hover .ar-item__title { color: var(--ar-heading); }
        @media (max-width: 640px) {
          .ar-box { padding: 12px 12px 2px; }
          .ar-thumb { width: 56px; height: 56px; }
          .ar-item__title { font-size: 13.5px; }
        }
      `}</style>

      <div className="ar-box">
        <h2 className="ar-box__label">New Updates</h2>
        <div className="ar-list">
          {items.map((item) => (
            <a key={item.slug} href={`/blog/${item.slug}`} className="ar-item">
              <Thumb src={item.image} alt={item.title} />
              <div className="ar-item__body">
                <p className="ar-item__title">{item.title}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
