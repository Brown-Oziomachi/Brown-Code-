// components/LanBookCatalog.jsx  —  calls YOUR proxy at /api/lan-books
// Cards exactly match LAN Library's own document listing style.
// Set up the Proxy Route first.

"use client";
import { useEffect, useState } from "react";

/* ── Design tokens (same as LAN Library) ──────────────────────── */
const NAVY = "#0d2244";
const GOLD = "#b8963e";
const CREAM = "#f5f0e8";
const BG = "#f5f1ea";

/* ── Thumbnail resolver ────────────────────────────────────────── */
// Resolves the best available thumbnail from a LAN book object
const getThumbnailUrl = (book) => {
    if (book.driveFileId)
        return `https://drive.google.com/thumbnail?id=${book.driveFileId}&sz=w400`;
    if (book.embedUrl) {
        const m = book.embedUrl.match(
            /\/d\/(.*?)\/|\/file\/d\/(.*?)\/|id=(.*?)(&|$)/,
        );
        if (m) {
            const id = m[1] || m[2] || m[3];
            if (id) return `https://drive.google.com/thumbnail?id=${id}&sz=w400`;
        }
    }
    if (book.pdfUrl?.includes("drive.google.com")) {
        const m = book.pdfUrl.match(/[-\w]{25,}/);
        if (m) return `https://drive.google.com/thumbnail?id=${m[0]}&sz=w400`;
    }
    return (
        book.coverImage ||
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400"
    );
};

const isFreeBook = (b) => b.isFree === true || Number(b.price) === 0;

const CATEGORIES = [
    { value: "all", label: "All" },
    { value: "business", label: "Business" },
    { value: "education", label: "Education" },
    { value: "technology", label: "Technology" },
    { value: "science", label: "Science" },
    { value: "past questions", label: "Past questions" },
    { value: "literature", label: "Literature" },
    { value: "health wellness", label: "Health wellness" },
    { value: "history", label: "History" },
    { value: "arts culture", label: "Arts culture" },
    { value: "personal development", label: "Personal development" },
    { value: "mathematics", label: "Mathematics" },
    { value: "law", label: "Law" },
    { value: "engineering", label: "Engineering" },
    { value: "economics", label: "Economics" },
    { value: "religion & spirituality", label: "Religion & spirituality" },
    { value: "general", label: "General" },
];

/* ── Book card — identical markup to LAN Library ──────────────── */
function BookCard({ book }) {
    const free = isFreeBook(book);
    const image = getThumbnailUrl(book);

    return (
        <a
            href={book.affiliatePurchaseUrl || "#"}
            target="_blank"
            rel="noreferrer"
            style={{
                flexShrink: 0,
                width: "200px",
                textDecoration: "none",
                display: "block",
            }}
            className="lan-book-card"
        >
            {/* Cover */}
            <div
                style={{
                    position: "relative",
                    marginBottom: "12px",
                    background: "#e8e4dc",
                }}
            >
                <img
                    src={image}
                    alt={book.title}
                    className="lan-book-img"
                    style={{
                        width: "100%",
                        aspectRatio: "3/4",
                        objectFit: "cover",
                        display: "block",
                    }}
                    onError={(e) => {
                        e.target.src =
                            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400";
                    }}
                />
                {/* PDF badge — top left */}
                <div
                    style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        background: NAVY,
                        padding: "4px 10px",
                    }}
                >
                    <span
                        style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "#22c55e",
                            flexShrink: 0,
                        }}
                    />
                    <span
                        style={{
                            fontSize: "9px",
                            fontWeight: 700,
                            color: GOLD,
                            fontFamily: "'Lato',sans-serif",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                        }}
                    >
                        PDF
                    </span>
                </div>
                {/* Free badge — top right */}
                {free && (
                    <div
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            background: "linear-gradient(135deg,#14532d,#166534)",
                            color: "#86efac",
                            fontSize: "8px",
                            fontWeight: 700,
                            padding: "3px 7px",
                            fontFamily: "'Lato',sans-serif",
                            letterSpacing: "0.06em",
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                        }}
                    >
                        🔓 FREE
                    </div>
                )}
            </div>

            {/* Info */}
            <div>
                <h4
                    style={{
                        fontFamily: "'Playfair Display',serif",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: NAVY,
                        margin: "0 0 4px",
                        lineHeight: 1.35,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {book.title}
                </h4>
                <p
                    style={{
                        fontSize: "11px",
                        color: "#888",
                        margin: "0 0 8px",
                        fontFamily: "'Lato',sans-serif",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                >
                    {book.author || "Unknown"}
                </p>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "6px",
                        flexWrap: "wrap",
                    }}
                >
                    {free ? (
                        <span
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                fontSize: "9px",
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                fontFamily: "'Lato',sans-serif",
                                background: "linear-gradient(135deg,#14532d,#166534)",
                                color: "#86efac",
                                padding: "3px 8px",
                                border: "0.5px solid rgba(134,239,172,0.4)",
                            }}
                        >
                            🔓 Open Access
                        </span>
                    ) : (
                        <span
                            style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: NAVY,
                                fontFamily: "'Lato',sans-serif",
                            }}
                        >
                            ₦{Number(book.price).toLocaleString()}
                        </span>
                    )}
                    {book.category && (
                        <span
                            style={{
                                fontSize: "9px",
                                fontWeight: 700,
                                background: CREAM,
                                border: "0.5px solid rgba(184,150,62,0.35)",
                                color: GOLD,
                                padding: "3px 8px",
                                fontFamily: "'Lato',sans-serif",
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {book.category}
                        </span>
                    )}
                </div>
            </div>
        </a>
    );
}

/* ── Arrow button ──────────────────────────────────────────────── */
function ArrowBtn({ dir, onClick, disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: `0.5px solid ${disabled ? "#e5ddd0" : NAVY}`,
                background: disabled ? CREAM : NAVY,
                color: disabled ? "#ccc" : "#fff",
                fontSize: 16,
                cursor: disabled ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all .15s",
            }}
        >
            {dir === "prev" ? "‹" : "›"}
        </button>
    );
}

/* ── Main catalog with 4-card carousel ────────────────────────── */
export default function LanBookCatalog() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState("all");
    const [priceFilter, setPrice] = useState("all");
    const [start, setStart] = useState(0);
    const visible = 4;

    // Reset carousel when filters change
    useEffect(() => {
        setStart(0);
    }, [category, priceFilter]);

    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams({ limit: "10" });
        if (category !== "all") params.set("category", category);
        if (priceFilter !== "all")
            params.set("isFree", String(priceFilter === "free"));

        fetch(`/api/lan-books?${params}`)
            .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
            .then(({ data }) => {
                setBooks(data || []);
                setLoading(false);
            })
            .catch((e) => {
                setError(String(e));
                setLoading(false);
            });
    }, [category, priceFilter]);

    const canPrev = start > 0;
    const canNext = start + visible < books.length;
    const pages = Math.ceil(books.length / visible);
    const page = Math.floor(start / visible);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lato:wght@300;400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .lan-book-card  { text-decoration: none; display: block; }
        .lan-book-img   { transition: opacity .22s; }
        .lan-book-card:hover .lan-book-img { opacity: .88; }
        .lan-book-card:hover h4 { color: #b8963e; }
        h4 { transition: color .18s; }
        .lan-filter-select { border: 0.5px solid #e5ddd0; background: #fff; color: #0d2244; font-family: 'Lato',sans-serif; font-size: 12px; font-weight: 700; padding: 8px 12px; outline: none; cursor: pointer; }
        @media (max-width: 640px) {
          .lan-cards-row { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

            <div style={{ fontFamily: "'Lato',sans-serif", background: BG }}>
                {/* Section header */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        marginBottom: 20,
                        flexWrap: "wrap",
                        gap: 12,
                    }}
                >
                    <div>
                        <p
                            style={{
                                margin: "0 0 4px",
                                fontSize: "10px",
                                fontWeight: 700,
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                color: GOLD,
                                fontFamily: "'Lato',sans-serif",
                            }}
                        >
                            LAN Library
                        </p>
                        <h2
                            style={{
                                margin: 0,
                                fontFamily: "'Playfair Display',serif",
                                fontSize: "clamp(20px,3vw,28px)",
                                fontWeight: 700,
                                color: NAVY,
                            }}
                        >
                            Academic Documents
                        </h2>
                    </div>
                    {/* Arrows */}
                    <div style={{ display: "flex", gap: 8 }}>
                        <ArrowBtn
                            dir="prev"
                            onClick={() => setStart((s) => Math.max(0, s - visible))}
                            disabled={!canPrev}
                        />
                        <ArrowBtn
                            dir="next"
                            onClick={() =>
                                setStart((s) => Math.min(books.length - visible, s + visible))
                            }
                            disabled={!canNext}
                        />
                    </div>
                </div>

                {/* Filter bar */}
                <div
                    style={{
                        background: "#fff",
                        border: "0.5px solid #e5ddd0",
                        padding: "12px 16px",
                        marginBottom: 20,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 10,
                        alignItems: "center",
                    }}
                >
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="lan-filter-select"
                    >
                        {CATEGORIES.map((c) => (
                            <option key={c.value} value={c.value}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                    <div style={{ display: "flex", gap: 4 }}>
                        {[
                            ["all", "All"],
                            ["free", "Free 🔓"],
                            ["paid", "Paid"],
                        ].map(([val, lbl]) => (
                            <button
                                key={val}
                                onClick={() => setPrice(val)}
                                style={{
                                    padding: "7px 14px",
                                    border: `0.5px solid ${priceFilter === val ? NAVY : "#e5ddd0"}`,
                                    background: priceFilter === val ? NAVY : "#fff",
                                    color: priceFilter === val ? "#fff" : NAVY,
                                    fontFamily: "'Lato',sans-serif",
                                    fontSize: 11,
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    transition: "all .15s",
                                }}
                            >
                                {lbl}
                            </button>
                        ))}
                    </div>
                    <span
                        style={{
                            marginLeft: "auto",
                            fontSize: 11,
                            color: "#aaa",
                            fontFamily: "'Lato',sans-serif",
                        }}
                    >
                        {books.length} document{books.length !== 1 ? "s" : ""}
                    </span>
                </div>

                {/* Cards */}
                {loading && (
                    <div
                        style={{
                            textAlign: "center",
                            padding: 40,
                            color: "#aaa",
                            fontFamily: "'Lato',sans-serif",
                        }}
                    >
                        Loading catalog…
                    </div>
                )}
                {error && (
                    <div
                        style={{
                            color: "#ef4444",
                            padding: 20,
                            fontFamily: "'Lato',sans-serif",
                        }}
                    >
                        Could not load. Check /api/lan-books proxy.
                    </div>
                )}
                {!loading && !error && (
                    <>
                        <div
                            className="lan-cards-row"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(4, 1fr)",
                                gap: "20px",
                            }}
                        >
                            {books.slice(start, start + visible).map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                            {/* Placeholder cells so grid stays full */}
                            {books.length > 0 &&
                                Array.from({
                                    length: Math.max(
                                        0,
                                        visible - books.slice(start, start + visible).length,
                                    ),
                                }).map((_, i) => <div key={`ph-${i}`} />)}
                        </div>

                        {/* Dot pagination */}
                        {pages > 1 && (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: 6,
                                    marginTop: 20,
                                }}
                            >
                                {Array.from({ length: pages }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setStart(i * visible)}
                                        style={{
                                            width: i === page ? 20 : 6,
                                            height: 6,
                                            borderRadius: 3,
                                            border: "none",
                                            cursor: "pointer",
                                            transition: "all .2s",
                                            background: i === page ? NAVY : "#d4c9b8",
                                            padding: 0,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
