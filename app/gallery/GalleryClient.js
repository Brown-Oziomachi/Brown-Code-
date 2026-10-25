"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import styles from "./gallery.module.css";

const CHANNEL_URL = "https://whatsapp.com/channel/0029VbEGWFsC1FuAo5qoPh0q";

export default function GalleryClient({ items }) {
    const [active, setActive] = useState(null);
    const [closing, setClosing] = useState(false);
    const touchStartY = useRef(null);
    const lastCard = useRef(null);
    const sheetRef = useRef(null);

    const close = useCallback(() => {
        setClosing(true);
        setTimeout(() => {
            setActive(null);
            setClosing(false);
            if (lastCard.current) lastCard.current.focus();
        }, 250);
    }, []);

    const go = useCallback(
        (dir) => {
            setActive((i) => (i === null ? i : (i + dir + items.length) % items.length));
            if (sheetRef.current) sheetRef.current.scrollTop = 0;
        },
        [items.length]
    );

    useEffect(() => {
        if (active === null) return;
        const onKey = (e) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
        };
        document.addEventListener("keydown", onKey);
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = previous;
        };
    }, [active, close, go]);

    const item = active === null ? null : items[active];
    const num = (i) => String(i + 1).padStart(2, "0");

    return (
        <>
            <div className={styles.grid}>
                {items.map((it, i) => (
                    <button
                        key={it.id}
                        type="button"
                        className={styles.card}
                        onClick={(e) => {
                            lastCard.current = e.currentTarget;
                            setActive(i);
                        }}
                        aria-label={`Open: ${it.title}`}
                    >
                        <span className={styles.cardMedia}>
                            <img src={it.src} alt={it.alt} loading="lazy" />
                        </span>
                        <span className={styles.cardBody}>
                            <span className={styles.cardNum}>{num(i)}</span>
                            <span className={styles.cardTitle}>{it.title}</span>
                            <span className={styles.cardMore}>
                                Read the story <ArrowRight size={12} />
                            </span>
                        </span>
                    </button>
                ))}
            </div>

            {item && (
                <div
                    className={`${styles.backdrop} ${closing ? styles.backdropOut : ""}`}
                    onClick={close}
                >
                    <div
                        ref={sheetRef}
                        className={`${styles.sheet} ${closing ? styles.sheetOut : ""}`}
                        role="dialog"
                        aria-modal="true"
                        aria-label={item.title}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className={styles.handleArea}
                            onTouchStart={(e) => (touchStartY.current = e.touches[0].clientY)}
                            onTouchEnd={(e) => {
                                if (touchStartY.current === null) return;
                                const delta = e.changedTouches[0].clientY - touchStartY.current;
                                touchStartY.current = null;
                                if (delta > 80) close();
                            }}
                        >
                            <span className={styles.handle} />
                            <span className={styles.counter}>
                                {num(active)} / {num(items.length - 1)}
                            </span>
                            <button
                                type="button"
                                className={styles.closeBtn}
                                onClick={close}
                                aria-label="Close"
                                autoFocus
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className={styles.sheetGrid}>
                            <img className={styles.sheetImg} src={item.src} alt={item.alt} />

                            <div className={styles.body}>
                                <div className={styles.sheetKicker}>
                                    <b>{item.tag || "Why I teach this"}</b>
                                </div>
                                <h2 className={styles.title}>{item.title}</h2>
                                {item.date && (
                                    <time className={styles.meta} dateTime={item.date}>
                                        {new Date(item.date).toLocaleDateString("en-NG", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </time>
                                )}
                                {item.writeup.split("\n\n").map((p, i) => (
                                    <p key={i} className={styles.text}>
                                        {p}
                                    </p>
                                ))}

                                <div className={styles.actions}>
                                    {item.link && (
                                        <a
                                            href={item.link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`${styles.btn} ${styles.btnSolid}`}
                                        >
                                            {item.link.label} <ArrowUpRight size={13} />
                                        </a>
                                    )}
                                    <Link
                                        href="/blog"
                                        className={`${styles.btn} ${item.link ? "" : styles.btnSolid}`}
                                    >
                                        Read the guides <ArrowRight size={13} />
                                    </Link>
                                    <a
                                        href={CHANNEL_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.btn}
                                    >
                                        Join my WhatsApp channel
                                    </a>
                                </div>

                                {items.length > 1 && (
                                    <div className={styles.nav}>
                                        <button type="button" onClick={() => go(-1)}>← Previous</button>
                                        <button type="button" onClick={() => go(1)}>Next →</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}