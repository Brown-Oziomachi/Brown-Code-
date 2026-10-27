"use client";

import Link from "next/link";
import { memo, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
    ArrowRight,
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
    Download,
    Link2,
    Maximize2,
    Minimize2,
    Pause,
    Play,
    Search,
    Share2,
    X,
    ZoomIn,
    ZoomOut,
} from "lucide-react";
import styles from "./gallery.module.css";

/* ── constants ───────────────────────────────────────── */

const CHANNEL_URL = "https://whatsapp.com/channel/0029VbEGWFsC1FuAo5qoPh0q";
const DEFAULT_TAG = "Why I teach this";
const ALL = "All";
const HASH_PREFIX = "story-";
const EXIT_ANIMATION_MS = 250;
const AUTOPLAY_MS = 5500;
const ZOOM_SCALE = 2.2;
const SWIPE_CLOSE_PX = 80;
const SWIPE_STEP_PX = 50;
const NOTICE_MS = 2200;
const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

/* ── helpers ─────────────────────────────────────────── */

const pad = (n) => String(n + 1).padStart(2, "0");
const tagOf = (item) => item.tag || DEFAULT_TAG;

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Formats an ISO date (YYYY-MM-DD) without timezone drift. Returns null if invalid. */
function formatDate(value) {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleDateString("en-NG", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    });
}

const toParagraphs = (text = "") =>
    text
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean);

const readingMinutes = (text = "") =>
    Math.max(1, Math.round(text.trim().split(/\s+/).filter(Boolean).length / 200));

const readHashId = () => {
    if (typeof window === "undefined") return null;
    const match = window.location.hash.match(/^#story-(.+)$/);
    return match ? decodeURIComponent(match[1]) : null;
};

const storyUrl = (id) =>
    `${window.location.origin}${window.location.pathname}${window.location.search}#${HASH_PREFIX}${encodeURIComponent(id)}`;

/* ── hooks ───────────────────────────────────────────── */

function useBodyScrollLock(locked) {
    useEffect(() => {
        if (!locked) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, [locked]);
}

/** Swipe left/right to change story, swipe down to close. Disabled while zoomed. */
function useStageSwipe(onClose, onStep, disabled) {
    const start = useRef(null);

    const onTouchStart = useCallback(
        (e) => {
            if (disabled || e.touches.length > 1) {
                start.current = null;
                return;
            }
            const t = e.touches[0];
            start.current = { x: t.clientX, y: t.clientY };
        },
        [disabled]
    );

    const onTouchEnd = useCallback(
        (e) => {
            if (!start.current || disabled) return;
            const t = e.changedTouches[0];
            const dx = t.clientX - start.current.x;
            const dy = t.clientY - start.current.y;
            start.current = null;

            if (Math.abs(dx) > Math.abs(dy)) {
                if (Math.abs(dx) > SWIPE_STEP_PX) onStep(dx < 0 ? 1 : -1);
            } else if (dy > SWIPE_CLOSE_PX) {
                onClose();
            }
        },
        [disabled, onClose, onStep]
    );

    return { onTouchStart, onTouchEnd };
}

/** Fullscreen for a given element ref. */
function useFullscreen(ref) {
    const [active, setActive] = useState(false);

    useEffect(() => {
        const onChange = () => setActive(document.fullscreenElement === ref.current);
        document.addEventListener("fullscreenchange", onChange);
        return () => {
            document.removeEventListener("fullscreenchange", onChange);
            if (document.fullscreenElement) {
                try {
                    document.exitFullscreen();
                } catch {
                    /* ignore */
                }
            }
        };
    }, [ref]);

    const toggle = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        if (document.fullscreenElement) {
            document.exitFullscreen?.();
        } else {
            el.requestFullscreen?.().catch(() => { });
        }
    }, [ref]);

    const supported = typeof document !== "undefined" && Boolean(document.fullscreenEnabled);
    return { active, toggle, supported };
}

/* ── card ────────────────────────────────────────────── */

const GalleryCard = memo(function GalleryCard({ item, index, onOpen }) {
    return (
        <button
            type="button"
            className={styles.card}
            style={{ "--i": Math.min(index, 12) }}
            onClick={(e) => onOpen(item.id, e.currentTarget)}
            aria-label={`Open: ${item.title}`}
        >
            <span className={styles.cardMedia}>
                <img
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                />
                <span className={styles.cardCue} aria-hidden="true">
                    <Maximize2 size={14} />
                </span>
            </span>
            <span className={styles.cardCaption}>
                <span className={styles.cardMeta}>
                    <span className={styles.cardNum}>{pad(index)}</span>
                    <span className={styles.cardTag}>{tagOf(item)}</span>
                </span>
                <span className={styles.cardTitle}>{item.title}</span>
            </span>
        </button>
    );
});

/* ── viewer ──────────────────────────────────────────── */

function ToolButton({ label, pressed, onClick, children }) {
    return (
        <button
            type="button"
            className={styles.iconBtn}
            aria-label={label}
            aria-pressed={pressed}
            title={label}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

function GalleryViewer({ items, index, closing, onClose, onStep, onJump }) {
    const item = items[index];
    const total = items.length;

    const [zoomed, setZoomed] = useState(false);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [notice, setNotice] = useState("");

    const viewerRef = useRef(null);
    const stageRef = useRef(null);
    const imgRef = useRef(null);
    const panelRef = useRef(null);
    const stripRef = useRef(null);
    const dragRef = useRef(null);
    const justDragged = useRef(false);
    const noticeTimer = useRef(null);

    const titleId = useId();
    const fullscreen = useFullscreen(stageRef);
    const swipeHandlers = useStageSwipe(onClose, onStep, zoomed);

    const formattedDate = formatDate(item.date);
    const [lede, ...rest] = toParagraphs(item.writeup);
    const minutes = item.writeup ? readingMinutes(item.writeup) : null;
    const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

    const upNext = useMemo(() => {
        const seen = new Set([item.id]);
        const out = [];
        for (let o = 1; o <= 3 && o < total; o++) {
            const next = items[(index + o) % total];
            if (!seen.has(next.id)) {
                seen.add(next.id);
                out.push(next);
            }
        }
        return out;
    }, [items, index, total, item.id]);

    useBodyScrollLock(true);

    const flash = useCallback((message) => {
        setNotice(message);
        clearTimeout(noticeTimer.current);
        noticeTimer.current = setTimeout(() => setNotice(""), NOTICE_MS);
    }, []);

    useEffect(() => () => clearTimeout(noticeTimer.current), []);

    const resetZoom = useCallback(() => {
        setZoomed(false);
        setPan({ x: 0, y: 0 });
    }, []);

    const toggleZoom = useCallback(() => {
        setZoomed((z) => !z);
        setPan({ x: 0, y: 0 });
        setPlaying(false);
    }, []);

    // New story: reset zoom, scroll panel to top, keep thumbnail in view.
    useEffect(() => {
        resetZoom();
        setDragging(false);
        dragRef.current = null;
        if (panelRef.current) panelRef.current.scrollTop = 0;
        stripRef.current
            ?.querySelector('[aria-current="true"]')
            ?.scrollIntoView({ inline: "center", block: "nearest" });
    }, [item.id, resetZoom]);

    // Warm the cache for the neighbours so stepping feels instant.
    useEffect(() => {
        if (total < 2) return;
        [items[(index + 1) % total], items[(index - 1 + total) % total]].forEach((n) => {
            const img = new Image();
            img.src = n.src;
        });
    }, [items, index, total]);

    // Slideshow.
    useEffect(() => {
        if (!playing || zoomed || total < 2) return;
        const timer = setTimeout(() => onStep(1), AUTOPLAY_MS);
        return () => clearTimeout(timer);
    }, [playing, zoomed, index, total, onStep]);

    // Keyboard: Esc, arrows, Z / F / P shortcuts, and a Tab focus trap.
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.metaKey || e.ctrlKey || e.altKey) return;
            const key = e.key.toLowerCase();

            if (key === "escape") return zoomed ? resetZoom() : onClose();
            if (key === "arrowright") return onStep(1);
            if (key === "arrowleft") return onStep(-1);
            if (key === "z") return toggleZoom();
            if (key === "p") return setPlaying((p) => !p);
            if (key === "f" && fullscreen.supported) return fullscreen.toggle();

            if (key === "tab" && viewerRef.current) {
                const focusable = viewerRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [zoomed, resetZoom, toggleZoom, onClose, onStep, fullscreen]);

    /* pan (only while zoomed) */
    const clampPan = (x, y) => {
        const el = imgRef.current;
        if (!el) return { x, y };
        const maxX = (el.offsetWidth * (ZOOM_SCALE - 1)) / 2;
        const maxY = (el.offsetHeight * (ZOOM_SCALE - 1)) / 2;
        return {
            x: Math.max(-maxX, Math.min(maxX, x)),
            y: Math.max(-maxY, Math.min(maxY, y)),
        };
    };

    const onPointerDown = (e) => {
        if (!zoomed) return;
        dragRef.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y, moved: false };
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);
    };

    const onPointerMove = (e) => {
        const d = dragRef.current;
        if (!d) return;
        const dx = e.clientX - d.x;
        const dy = e.clientY - d.y;
        if (Math.hypot(dx, dy) > 4) d.moved = true;
        setPan(clampPan(d.px + dx, d.py + dy));
    };

    const endDrag = () => {
        const d = dragRef.current;
        dragRef.current = null;
        justDragged.current = Boolean(d?.moved);
        setDragging(false);
    };

    const onImageClick = () => {
        if (justDragged.current) {
            justDragged.current = false;
            return;
        }
        toggleZoom();
    };

    /* sharing */
    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(storyUrl(item.id));
            flash("Link copied");
        } catch {
            flash("Couldn't copy the link");
        }
    };

    const share = async () => {
        try {
            await navigator.share({ title: item.title, url: storyUrl(item.id) });
        } catch (err) {
            if (err?.name !== "AbortError") flash("Couldn't share");
        }
    };

    return (
        <div
            ref={viewerRef}
            className={`${styles.viewer} ${closing ? styles.viewerOut : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
        >
            {/* Stage */}
            <div ref={stageRef} className={styles.stage} {...swipeHandlers}>
                <img
                    key={`bg-${item.id}`}
                    className={styles.stageBackdrop}
                    src={item.src}
                    alt=""
                    aria-hidden="true"
                />

                <div className={styles.progress} aria-hidden="true">
                    <span
                        className={styles.progressBar}
                        style={{ width: `${((index + 1) / total) * 100}%` }}
                    />
                </div>

                <div className={styles.topBar}>
                    <p className={styles.counter} aria-label={`Story ${index + 1} of ${total}`}>
                        {pad(index)}
                        <span>/ {pad(total - 1)}</span>
                    </p>
                    <div className={styles.tools}>
                        <ToolButton
                            label={zoomed ? "Zoom out (Z)" : "Zoom in (Z)"}
                            pressed={zoomed}
                            onClick={toggleZoom}
                        >
                            {zoomed ? <ZoomOut size={17} /> : <ZoomIn size={17} />}
                        </ToolButton>
                        {total > 1 && (
                            <ToolButton
                                label={playing ? "Pause slideshow (P)" : "Play slideshow (P)"}
                                pressed={playing}
                                onClick={() => setPlaying((p) => !p)}
                            >
                                {playing ? <Pause size={17} /> : <Play size={17} />}
                            </ToolButton>
                        )}
                        {fullscreen.supported && (
                            <ToolButton
                                label={fullscreen.active ? "Exit full screen (F)" : "Full screen (F)"}
                                pressed={fullscreen.active}
                                onClick={fullscreen.toggle}
                            >
                                {fullscreen.active ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
                            </ToolButton>
                        )}
                    </div>
                </div>

                <div className={styles.frame}>
                    <img
                        key={item.id}
                        ref={imgRef}
                        className={`${styles.stageImg} ${zoomed ? styles.zoomed : ""} ${dragging ? styles.dragging : ""}`}
                        style={{
                            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomed ? ZOOM_SCALE : 1})`,
                        }}
                        src={item.src}
                        alt={item.alt}
                        decoding="async"
                        draggable={false}
                        onClick={onImageClick}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={endDrag}
                        onPointerCancel={endDrag}
                    />
                </div>

                {total > 1 && (
                    <>
                        <button
                            type="button"
                            className={`${styles.arrow} ${styles.arrowPrev}`}
                            onClick={() => onStep(-1)}
                            aria-label="Previous story"
                        >
                            <ChevronLeft size={22} aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            className={`${styles.arrow} ${styles.arrowNext}`}
                            onClick={() => onStep(1)}
                            aria-label="Next story"
                        >
                            <ChevronRight size={22} aria-hidden="true" />
                        </button>

                        <div ref={stripRef} className={styles.strip}>
                            {items.map((t, i) => (
                                <button
                                    key={t.id}
                                    type="button"
                                    className={styles.thumb}
                                    aria-current={i === index}
                                    aria-label={`Go to story ${i + 1}: ${t.title}`}
                                    onClick={() => onJump(t.id)}
                                >
                                    <img src={t.src} alt="" loading="lazy" decoding="async" />
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {playing && !zoomed && (
                    <span
                        key={`auto-${item.id}`}
                        className={styles.autoplay}
                        style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                        aria-hidden="true"
                    />
                )}
            </div>

            {/* Panel */}
            <aside ref={panelRef} className={styles.panel}>
                <div className={styles.panelTop}>
                    <span className={styles.tag}>{tagOf(item)}</span>
                    <button
                        type="button"
                        className={styles.close}
                        onClick={onClose}
                        aria-label="Close"
                        autoFocus
                    >
                        <X size={18} aria-hidden="true" />
                    </button>
                </div>

                <div className={styles.panelBody}>
                    <h2 id={titleId} className={styles.title}>
                        {item.title}
                    </h2>

                    {(formattedDate || minutes) && (
                        <p className={styles.meta}>
                            {formattedDate && <time dateTime={item.date}>{formattedDate}</time>}
                            {formattedDate && minutes && <span aria-hidden="true">·</span>}
                            {minutes && <span>{minutes} min read</span>}
                        </p>
                    )}

                    {lede && <p className={`${styles.text} ${styles.lede}`}>{lede}</p>}
                    {rest.map((text, i) => (
                        <p key={i} className={styles.text}>
                            {text}
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
                                {item.link.label} <ArrowUpRight size={14} aria-hidden="true" />
                            </a>
                        )}
                        <Link
                            href="/blog"
                            className={`${styles.btn} ${item.link ? "" : styles.btnSolid}`}
                        >
                            Read the guides <ArrowRight size={14} aria-hidden="true" />
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

                    <div className={styles.utility}>
                        <button type="button" className={styles.utilBtn} onClick={copyLink}>
                            <Link2 size={14} aria-hidden="true" /> Copy link
                        </button>
                        {canShare && (
                            <button type="button" className={styles.utilBtn} onClick={share}>
                                <Share2 size={14} aria-hidden="true" /> Share
                            </button>
                        )}
                        <a
                            className={styles.utilBtn}
                            href={item.src}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Download size={14} aria-hidden="true" /> Save image
                        </a>
                    </div>

                    {upNext.length > 0 && (
                        <section className={styles.upNext} aria-label="Up next">
                            <h3 className={styles.upNextHead}>Up next</h3>
                            <div className={styles.upNextGrid}>
                                {upNext.map((n) => (
                                    <button
                                        key={n.id}
                                        type="button"
                                        className={styles.upNextItem}
                                        onClick={() => onJump(n.id)}
                                    >
                                        <img src={n.src} alt="" loading="lazy" decoding="async" />
                                        <span>{n.title}</span>
                                    </button>
                                ))}
                            </div>
                        </section>
                    )}

                    <p className={styles.shortcuts} aria-hidden="true">
                        <kbd>←</kbd>
                        <kbd>→</kbd> browse <kbd>Z</kbd> zoom <kbd>P</kbd> play <kbd>F</kbd> full
                        screen <kbd>Esc</kbd> close
                    </p>
                </div>
            </aside>

            {notice && (
                <div className={styles.toast} role="status">
                    {notice}
                </div>
            )}
        </div>
    );
}

/* ── gallery ─────────────────────────────────────────── */

export default function GalleryClient({ items = [] }) {
    const [activeId, setActiveId] = useState(null); // string id of the open story
    const [closing, setClosing] = useState(false);
    const [tag, setTag] = useState(ALL);
    const [query, setQuery] = useState("");

    const triggerRef = useRef(null);
    const closeTimer = useRef(null);
    const hashSynced = useRef(false);

    /* filtering */
    const tags = useMemo(() => {
        const counts = new Map();
        items.forEach((i) => counts.set(tagOf(i), (counts.get(tagOf(i)) || 0) + 1));
        return [...counts].map(([name, count]) => ({ name, count }));
    }, [items]);

    const needle = query.trim().toLowerCase();
    const visible = useMemo(
        () =>
            items.filter((i) => {
                if (tag !== ALL && tagOf(i) !== tag) return false;
                if (!needle) return true;
                return `${i.title} ${i.writeup || ""} ${i.tag || ""}`.toLowerCase().includes(needle);
            }),
        [items, tag, needle]
    );

    const showControls = items.length > 3;
    const activeIndex =
        activeId === null ? -1 : visible.findIndex((i) => String(i.id) === activeId);

    /* open / close / step */
    const open = useCallback((id, trigger) => {
        triggerRef.current = trigger;
        setActiveId(String(id));
    }, []);

    const close = useCallback(() => {
        if (closeTimer.current) return;

        const finish = () => {
            closeTimer.current = null;
            setActiveId(null);
            setClosing(false);
            triggerRef.current?.focus();
        };

        if (prefersReducedMotion()) return finish();

        setClosing(true);
        closeTimer.current = setTimeout(finish, EXIT_ANIMATION_MS);
    }, []);

    const step = useCallback(
        (direction) => {
            if (closeTimer.current || visible.length === 0) return;
            setActiveId((current) => {
                const i = visible.findIndex((x) => String(x.id) === current);
                if (i < 0) return current;
                return String(visible[(i + direction + visible.length) % visible.length].id);
            });
        },
        [visible]
    );

    const jump = useCallback((id) => {
        if (closeTimer.current) return;
        setActiveId(String(id));
    }, []);

    /* deep link: open from #story-<id> on load, keep the hash in sync after */
    useEffect(() => {
        const id = readHashId();
        if (id && items.some((i) => String(i.id) === id)) setActiveId(id);
    }, [items]);

    useEffect(() => {
        if (!hashSynced.current) {
            hashSynced.current = true;
            return;
        }
        const base = `${window.location.pathname}${window.location.search}`;
        if (activeId !== null) {
            window.history.replaceState(null, "", `${base}#${HASH_PREFIX}${encodeURIComponent(activeId)}`);
        } else if (window.location.hash.startsWith(`#${HASH_PREFIX}`)) {
            window.history.replaceState(null, "", base);
        }
    }, [activeId]);

    useEffect(() => () => clearTimeout(closeTimer.current), []);

    const resetFilters = () => {
        setTag(ALL);
        setQuery("");
    };

    return (
        <div className={styles.gallery}>
            {showControls && (
                <div className={styles.toolbar}>
                    {tags.length > 1 && (
                        <div className={styles.chips} role="group" aria-label="Filter stories by topic">
                            {[{ name: ALL, count: items.length }, ...tags].map((t) => (
                                <button
                                    key={t.name}
                                    type="button"
                                    className={styles.chip}
                                    aria-pressed={tag === t.name}
                                    onClick={() => setTag(t.name)}
                                >
                                    {t.name}
                                    <span className={styles.chipCount}>{t.count}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    <div className={styles.search} role="search">
                        <Search size={16} aria-hidden="true" />
                        <input
                            type="search"
                            className={styles.searchInput}
                            placeholder="Search stories"
                            aria-label="Search stories"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        {query && (
                            <button
                                type="button"
                                className={styles.clear}
                                onClick={() => setQuery("")}
                                aria-label="Clear search"
                            >
                                <X size={14} aria-hidden="true" />
                            </button>
                        )}
                    </div>
                </div>
            )}

            {showControls && (
                <p className={styles.status} role="status" aria-live="polite">
                    Showing {visible.length} of {items.length} stories
                </p>
            )}

            {visible.length > 0 ? (
                <div className={styles.masonry}>
                    {visible.map((item, i) => (
                        <GalleryCard key={item.id} item={item} index={i} onOpen={open} />
                    ))}
                </div>
            ) : (
                <div className={styles.empty}>
                    <p>No stories match that search.</p>
                    <button type="button" className={styles.resetBtn} onClick={resetFilters}>
                        Clear filters
                    </button>
                </div>
            )}

            {activeIndex >= 0 &&
                createPortal(
                    <GalleryViewer
                        items={visible}
                        index={activeIndex}
                        closing={closing}
                        onClose={close}
                        onStep={step}
                        onJump={jump}
                    />,
                    document.body
                )}
        </div>
    );
}