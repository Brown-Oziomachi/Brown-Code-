"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, MessageCircle, Search, X } from "lucide-react";
import Footer from "@/components/footer";

const PAGE_SIZE = 9;
const CHANNEL_URL = "https://whatsapp.com/channel/0029VbEGWFsC1FuAo5qoPh0q";

// Quick filters. Each one searches title, preview, slug, tag and article text.
const SUBJECTS = [
    "XSS", "CSRF", "SQL injection", "Authentication", "Session",
    "API", "CORS", "Input validation",
];

/* ── helpers ─────────────────────────────────────────── */

const formatDate = (d) =>
    d
        ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
        : null;

const readingTimeOf = (a) =>
    a.readingTime || Math.max(1, Math.ceil((a.content || "").split(/\s+/).length / 200));

const authorOf = (a) => a.postedBy || "Sir Brown AD";

function Cover({ src, alt }) {
    const [failed, setFailed] = useState(false);
    if (!src || failed) return <div className="ws-ph" aria-hidden="true" />;
    return <img src={src} alt={alt} className="ws-img" loading="lazy" onError={() => setFailed(true)} />;
}

function Card({ article }) {
    const date = formatDate(article.datePublished);
    return (
        <Link href={`/blog/${article.slug}`} className="ws-card">
            <div className="ws-card__media">
                <Cover src={article.image} alt={article.title} />
                {article.tag && <span className="ws-chip">{article.tag}</span>}
            </div>
            <div className="ws-card__body">
                <h3 className="ws-card__title">{article.title}</h3>
                <p className="ws-card__preview">{article.preview}</p>
                <div className="ws-meta">
                    <span>{readingTimeOf(article)} min read</span>
                    {date && (<><span className="ws-dot" /><span>{date}</span></>)}
                </div>
            </div>
        </Link>
    );
}

function Lead({ article }) {
    const date = formatDate(article.datePublished);
    return (
        <Link href={`/blog/${article.slug}`} className="ws-lead">
            <div className="ws-lead__media">
                <Cover src={article.image} alt={article.title} />
            </div>
            <div className="ws-lead__body">
                {article.tag && <span className="ws-kick">{article.tag}</span>}
                <h2 className="ws-lead__title">{article.title}</h2>
                <p className="ws-lead__preview">{article.preview}</p>
                <p className="ws-byline">
                    By {authorOf(article)}{date && <span> · {date} · {readingTimeOf(article)} min read</span>}
                </p>
            </div>
        </Link>
    );
}

/* ── page ────────────────────────────────────────────── */

export default function WebSecurityClient({ articles = [] }) {
    const [query, setQuery] = useState("");
    const [visible, setVisible] = useState(PAGE_SIZE);

    // Newest first
    const sorted = useMemo(
        () => [...articles].sort((a, b) => (b.datePublished || "").localeCompare(a.datePublished || "")),
        [articles]
    );

    const q = query.trim().toLowerCase();

    const filtered = useMemo(() => {
        if (!q) return sorted;
        return sorted.filter((a) =>
            [a.title, a.preview, (a.slug || "").replace(/-/g, " "), a.tag, a.content]
                .filter(Boolean)
                .some((field) => field.toLowerCase().includes(q))
        );
    }, [sorted, q]);

    const showLead = !q && filtered.length > 0;
    const lead = showLead ? filtered[0] : null;
    const rest = showLead ? filtered.slice(1) : filtered;
    const shown = rest.slice(0, visible);

    const pickSubject = (s) => {
        setQuery((cur) => (cur.toLowerCase() === s.toLowerCase() ? "" : s));
        setVisible(PAGE_SIZE);
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Web Application Security",
        description: "Web application security articles by Sir Brown AD.",
        url: "https://browncode.name.ng/blog/web-security",
        mainEntity: {
            "@type": "ItemList",
            itemListElement: sorted.slice(0, 20).map((a, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `https://browncode.name.ng/blog/${a.slug}`,
                name: a.title,
            })),
        },
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:wght@400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,600;0,800;1,600&display=swap');

        .ws-page {
          --paper: #ffffff; --paper-2: #f6f5f0; --card: #ffffff;
          --ink: #0f1626; --ink-2: #3f4655; --ink-3: #6a7080;
          --rule: #e4e2da; --rule-dark: #111111;
          --teal: #0b6b5a; --accent: #e8ff47; --on-accent: #0a0a0b;
          --head: 'IBM Plex Sans Condensed', 'Inter', system-ui, sans-serif;
          --serif: 'Playfair Display', Georgia, serif;
          --sans: 'IBM Plex Sans', system-ui, sans-serif;
          --mono: 'IBM Plex Mono', 'Fira Code', monospace;
          background: var(--paper); color: var(--ink); font-family: var(--sans); min-height: 100vh;
          padding-top: 90px;
        }
        .ws-page *, .ws-page *::before, .ws-page *::after { box-sizing: border-box; }
        .ws-page h1, .ws-page h2, .ws-page h3, .ws-page p { margin: 0; }
        :where(.ws-page a) { color: inherit; text-decoration: none; }
        .ws-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }

        .ws-btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em; padding: 10px 16px; border: 1.5px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; transition: background 0.15s, color 0.15s; }
        .ws-btn:hover { background: var(--ink); color: #fff; }
        .ws-btn--solid { background: var(--accent); color: var(--on-accent); font-weight: 600; }
        .ws-btn--solid:hover { background: var(--ink); color: var(--accent); }

        /* Breadcrumb + masthead */
        .ws-crumb { padding-top: 28px; display: flex; gap: 8px; align-items: center; font-family: var(--mono); font-size: 11px; color: var(--ink-3); }
        .ws-crumb a:hover { color: var(--ink); text-decoration: underline; }
        .ws-mast { display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; padding: 20px 0 30px; border-bottom: 3px solid var(--rule-dark); flex-wrap: wrap; }
        .ws-mast__title { font-family: var(--serif); font-weight: 800; font-size: clamp(38px, 6.2vw, 66px); line-height: 1.02; letter-spacing: -0.02em; }
        .ws-mast__title em { font-style: italic; background: linear-gradient(transparent 62%, var(--accent) 62%); }
        .ws-mast__dek { max-width: 400px; font-size: 16px; line-height: 1.6; font-weight: 300; color: var(--ink-2); border-left: 3px solid var(--accent); padding-left: 16px; }

        /* Toolbar */
        .ws-toolbar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; padding: 18px 0; border-bottom: 1px solid var(--rule); }
        .ws-subjects { display: flex; gap: 8px; flex-wrap: wrap; }
        .ws-subject { font-family: var(--mono); font-size: 11px; padding: 7px 12px; border: 1px solid var(--rule-dark); background: transparent; color: var(--ink-2); cursor: pointer; transition: background 0.15s, color 0.15s; }
        .ws-subject:hover { background: var(--accent); color: var(--on-accent); }
        .ws-subject[aria-pressed="true"] { background: var(--ink); color: var(--accent); }
        .ws-search { display: flex; align-items: center; gap: 8px; min-width: 260px; background: #fff; border: 1.5px solid #c9c6bc; padding: 9px 14px; transition: border-color 0.15s, box-shadow 0.15s; }
        .ws-search:focus-within { border-color: var(--ink); box-shadow: 4px 4px 0 var(--accent); }
        .ws-search svg { color: var(--ink-3); flex-shrink: 0; }
        .ws-search input { background: none; border: none; outline: none; width: 100%; font-family: var(--sans); font-size: 13px; color: var(--ink); }
        .ws-search button { background: none; border: none; color: var(--ink-3); cursor: pointer; display: flex; padding: 0; }
        @media (max-width: 700px) { .ws-search { min-width: 100%; } }

        /* Shared */
        .ws-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease; }
        .ws-ph { width: 100%; height: 100%; background: repeating-linear-gradient(45deg, #ebe8e0, #ebe8e0 6px, #e3e0d7 6px, #e3e0d7 12px); }
        .ws-kick { font-family: var(--mono); font-size: 10.5px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--teal); }
        .ws-byline { font-size: 12px; font-weight: 600; color: var(--teal); }
        .ws-byline span { font-weight: 500; color: var(--ink-3); }
        .ws-chip { position: absolute; top: 12px; left: 12px; font-family: var(--mono); font-size: 9px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; background: var(--accent); color: var(--on-accent); padding: 4px 9px; border: 1px solid var(--ink); }
        .ws-meta { display: flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 10.5px; color: var(--ink-3); flex-wrap: wrap; }
        .ws-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--ink-3); }

        /* Lead */
        .ws-lead { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 32px; padding: 32px 0; align-items: center; border-bottom: 1px solid var(--rule); }
        @media (max-width: 860px) { .ws-lead { grid-template-columns: 1fr; gap: 20px; } }
        .ws-lead__media { height: clamp(220px, 30vw, 340px); overflow: hidden; border: 1px solid var(--rule-dark); background: var(--paper-2); }
        .ws-lead:hover .ws-img { transform: scale(1.04); }
        .ws-lead__body { display: flex; flex-direction: column; gap: 12px; }
        .ws-lead__title { font-family: var(--head); font-weight: 700; font-size: clamp(26px, 3.2vw, 38px); line-height: 1.14; letter-spacing: -0.01em; }
        .ws-lead:hover .ws-lead__title { text-decoration: underline; text-decoration-color: var(--accent); text-decoration-thickness: 4px; text-underline-offset: 4px; }
        .ws-lead__preview { font-size: 15.5px; line-height: 1.65; color: var(--ink-2); display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }

        /* Layout + grid */
        .ws-sechead { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin: 30px 0 24px; flex-wrap: wrap; }
        .ws-sechead__title { font-family: var(--head); font-weight: 700; font-size: clamp(24px, 3vw, 30px); border-left: 5px solid var(--teal); padding-left: 14px; }
        .ws-sechead__note { font-family: var(--mono); font-size: 11px; color: var(--ink-3); }
        .ws-row { display: grid; grid-template-columns: 1fr 290px; gap: 40px; align-items: start; }
        @media (max-width: 960px) { .ws-row { grid-template-columns: 1fr; } }
        .ws-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        @media (max-width: 600px) { .ws-grid { grid-template-columns: 1fr; } }
        .ws-card { display: flex; flex-direction: column; background: var(--card); border: 1px solid var(--rule-dark); transition: transform 0.2s, box-shadow 0.2s; }
        .ws-card:hover { transform: translate(-3px, -3px); box-shadow: 6px 6px 0 var(--accent); }
        .ws-card__media { position: relative; height: 160px; background: var(--paper-2); overflow: hidden; border-bottom: 1px solid var(--rule-dark); }
        .ws-card:hover .ws-img { transform: scale(1.04); }
        .ws-card__body { padding: 18px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
        .ws-card__title { font-family: var(--head); font-weight: 700; font-size: 20px; line-height: 1.22; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .ws-card:hover .ws-card__title { text-decoration: underline; text-decoration-color: var(--accent); text-decoration-thickness: 3px; text-underline-offset: 3px; }
        .ws-card__preview { font-size: 13px; line-height: 1.65; color: var(--ink-3); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .ws-card .ws-meta { margin-top: auto; padding-top: 12px; border-top: 1px solid var(--rule); }
        .ws-more { display: flex; justify-content: center; margin-top: 28px; }
        .ws-solo { font-family: var(--mono); font-size: 11px; color: var(--ink-3); border: 1px dashed var(--rule-dark); padding: 14px 16px; }

        /* Sidebar */
        .ws-side { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 110px; }
        @media (max-width: 960px) { .ws-side { position: static; } }
        .ws-side__card { background: var(--card); border: 1px solid var(--rule-dark); border-top: 4px solid var(--accent); padding: 20px; display: flex; flex-direction: column; gap: 10px; align-items: flex-start; }
        .ws-side__kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); }
        .ws-side__title { font-family: var(--head); font-weight: 700; font-size: 22px; line-height: 1.15; }
        .ws-side__text { font-size: 13px; line-height: 1.65; color: var(--ink-2); }
        .ws-rule { font-family: var(--head); font-weight: 700; font-size: 17px; line-height: 1.3; border-left: 3px solid var(--accent); padding-left: 12px; }

        .ws-empty { padding: 70px 0; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .ws-empty__title { font-family: var(--head); font-weight: 700; font-size: 26px; }
        .ws-empty__msg { font-size: 14px; color: var(--ink-2); max-width: 420px; }

        .ws-cta { margin-top: 56px; background: var(--ink); color: #f4f1ea; border-top: 5px solid var(--accent); padding: 44px 40px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
        @media (max-width: 640px) { .ws-cta { padding: 32px 22px; } }
        .ws-cta__title { font-family: var(--head); font-weight: 700; font-size: clamp(26px, 3.4vw, 36px); line-height: 1.1; margin-bottom: 8px; }
        .ws-cta__sub { font-size: 14px; color: #bdb8ae; line-height: 1.7; max-width: 480px; }
        .ws-cta__actions { display: flex; flex-wrap: wrap; gap: 10px; }
        .ws-cta .ws-btn { border-color: #f4f1ea; color: #f4f1ea; }
        .ws-cta .ws-btn:hover { background: #f4f1ea; color: var(--ink); }
        .ws-cta .ws-btn--solid { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
        .ws-cta .ws-btn--solid:hover { background: #fff; border-color: #fff; color: var(--ink); }
        .ws-end { height: 24px; }

        @media (max-width: 640px) { .ws-wrap { padding-left: 18px; padding-right: 18px; } .ws-page { padding-top: 76px; } }
        .ws-page :focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { .ws-page * { transition: none !important; } }
      `}</style>

            <div className="ws-page">
                <main className="ws-wrap">
                    <nav className="ws-crumb" aria-label="Breadcrumb">
                        <Link href="/blog">Blog</Link>
                        <span>/</span>
                        <span aria-current="page">Web application security</span>
                    </nav>

                    <header className="ws-mast">
                        <h1 className="ws-mast__title">
                            Web Application <em>Security</em>
                        </h1>
                        <p className="ws-mast__dek">
                            How web apps get attacked, and how to build them so they resist it. Plain language, real
                            examples, no jargon wall.
                        </p>
                    </header>

                    <div className="ws-toolbar">
                        <div className="ws-subjects" role="group" aria-label="Popular subjects">
                            {SUBJECTS.map((s) => (
                                <button
                                    key={s}
                                    className="ws-subject"
                                    aria-pressed={q === s.toLowerCase()}
                                    onClick={() => pickSubject(s)}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                        <label className="ws-search">
                            <Search size={15} />
                            <input
                                type="search"
                                placeholder="Search web application security"
                                value={query}
                                onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE); }}
                                aria-label="Search web application security articles"
                            />
                            {query && (
                                <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                                    <X size={14} />
                                </button>
                            )}
                        </label>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="ws-empty">
                            <h2 className="ws-empty__title">
                                {sorted.length === 0 ? "No articles yet" : "No matching articles"}
                            </h2>
                            <p className="ws-empty__msg">
                                {sorted.length === 0
                                    ? "New guides on web application security will appear here."
                                    : "Try a different keyword, or clear the search to see everything."}
                            </p>
                            {sorted.length > 0 && (
                                <button className="ws-btn" onClick={() => setQuery("")}>Clear search</button>
                            )}
                        </div>
                    ) : (
                        <>
                            {lead && <Lead article={lead} />}

                            <div className="ws-sechead">
                                <h2 className="ws-sechead__title">{q ? "Search results" : "All guides"}</h2>
                                <span className="ws-sechead__note">
                                    {filtered.length} {filtered.length === 1 ? "article" : "articles"}
                                </span>
                            </div>

                            <div className="ws-row">
                                <div>
                                    {shown.length > 0 ? (
                                        <div className="ws-grid">
                                            {shown.map((a) => <Card key={a.slug} article={a} />)}
                                        </div>
                                    ) : (
                                        <p className="ws-solo">More guides are on the way. Join the WhatsApp channel to get them first.</p>
                                    )}
                                    {visible < rest.length && (
                                        <div className="ws-more">
                                            <button className="ws-btn" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                                                Show more articles <ArrowRight size={12} />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <aside className="ws-side">
                                    <div className="ws-side__card">
                                        <p className="ws-side__kicker">The one rule</p>
                                        <p className="ws-rule">Never let untrusted input become executable code.</p>
                                        <p className="ws-side__text">
                                            Most web attacks start where a site treats a stranger&apos;s text as its own
                                            instructions.
                                        </p>
                                    </div>
                                    <div className="ws-side__card">
                                        <p className="ws-side__kicker">Follow along</p>
                                        <h3 className="ws-side__title">WhatsApp channel</h3>
                                        <p className="ws-side__text">New articles and fraud alerts, sent straight to your phone.</p>
                                        <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="ws-btn">
                                            <MessageCircle size={12} /> Join channel
                                        </a>
                                    </div>
                                    <div className="ws-side__card">
                                        <p className="ws-side__kicker">About the author</p>
                                        <h3 className="ws-side__title">Sir Brown AD</h3>
                                        <p className="ws-side__text">
                                            Full stack engineer in Abuja. I build web platforms and write about security in
                                            plain language.
                                        </p>
                                        <Link href="/bc/about" className="ws-btn">
                                            About me <ArrowRight size={12} />
                                        </Link>
                                    </div>
                                </aside>
                            </div>
                        </>
                    )}

                    <section>
                        <div className="ws-cta">
                            <div>
                                <div className="ws-cta__title">Want your web app checked before attackers do?</div>
                                <p className="ws-cta__sub">
                                    I build security-minded web platforms and review existing ones. Tell me what you have
                                    and I&apos;ll reply with a plan.
                                </p>
                            </div>
                            <div className="ws-cta__actions">
                                <Link href="/bc/contact" className="ws-btn ws-btn--solid">
                                    <Mail size={12} /> Get in touch
                                </Link>
                                <Link href="/blog" className="ws-btn">All articles</Link>
                            </div>
                        </div>
                        <div className="ws-end" />
                    </section>
                </main>
            </div>

            <Footer />
        </>
    );
}