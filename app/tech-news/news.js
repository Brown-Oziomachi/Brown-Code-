"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
} from "firebase/firestore";
import { db2 } from "@/config/firebase.config2";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Footer from "@/components/footer";

/* ── helpers ─────────────────────────────────────────── */

const CHANNEL_URL = "https://whatsapp.com/channel/0029VbEGWFsC1FuAo5qoPh0q";
const PAGE_SIZE = 12;

const createSlug = (title = "") =>
    title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const hrefOf = (post) => `/news/${createSlug(post.title)}--${post.id}`;

const relativeTime = (ts) => {
    if (!ts?.toDate) return null;
    const diffMs = Date.now() - ts.toDate();
    const hours = Math.floor(diffMs / 3600000);
    const days = Math.floor(diffMs / 86400000);
    const months = Math.floor(days / 30);
    if (months > 0) return `${months}mo ago`;
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return "Just now";
};

const labelOf = (post) => post.category || "Technology";

/* Image with a clean fallback instead of a blank hole */
function Pic({ src, alt }) {
    const [failed, setFailed] = useState(false);
    if (!src || failed) return <div className="tn-ph" aria-hidden="true" />;
    return (
        <img
            src={src}
            alt={alt}
            className="tn-img"
            loading="lazy"
            onError={() => setFailed(true)}
        />
    );
}

function Byline({ post }) {
    const time = relativeTime(post.createdAt);
    return (
        <div className="tn-by">
            <span>{post.author || "Editorial"}</span>
            {time && (
                <>
                    <span className="tn-by__dot" />
                    <span>{time}</span>
                </>
            )}
        </div>
    );
}

/* ── story blocks ────────────────────────────────────── */

function LeadStory({ post }) {
    return (
        <Link href={hrefOf(post)} className="tn-lead">
            <div className="tn-lead__media">
                <Pic src={post.imageUrl} alt={post.title} />
            </div>
            <span className="tn-kicker">{labelOf(post)}</span>
            <h2 className="tn-lead__title">{post.title}</h2>
            {post.subtitle && <p className="tn-lead__sub">{post.subtitle}</p>}
            <Byline post={post} />
        </Link>
    );
}

function TopStory({ post }) {
    return (
        <Link href={hrefOf(post)} className="tn-top">
            <div className="tn-top__text">
                <span className="tn-kicker">{labelOf(post)}</span>
                <h3 className="tn-top__title">{post.title}</h3>
                <Byline post={post} />
            </div>
            <div className="tn-top__media">
                <Pic src={post.imageUrl} alt={post.title} />
            </div>
        </Link>
    );
}

function StoryCard({ post }) {
    return (
        <Link href={hrefOf(post)} className="tn-card">
            <div className="tn-card__media">
                <Pic src={post.imageUrl} alt={post.title} />
            </div>
            <span className="tn-kicker">{labelOf(post)}</span>
            <h3 className="tn-card__title">{post.title}</h3>
            {post.subtitle && <p className="tn-card__sub">{post.subtitle}</p>}
            <Byline post={post} />
        </Link>
    );
}

function HeadlineRow({ post, rank }) {
    return (
        <Link href={hrefOf(post)} className="tn-row">
            <span className="tn-row__rank">{rank}</span>
            <div>
                <h4 className="tn-row__title">{post.title}</h4>
                <div className="tn-row__meta">{relativeTime(post.createdAt)}</div>
            </div>
        </Link>
    );
}

function Skeleton() {
    return (
        <div className="tn-skel" aria-hidden="true">
            <div className="tn-skel__lead">
                <div className="tn-skel__img" />
                <div className="tn-skel__line tn-skel__line--w80" />
                <div className="tn-skel__line tn-skel__line--w60" />
            </div>
            <div className="tn-skel__side">
                {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="tn-skel__item">
                        <div className="tn-skel__lines">
                            <div className="tn-skel__line tn-skel__line--w90" />
                            <div className="tn-skel__line tn-skel__line--w50" />
                        </div>
                        <div className="tn-skel__thumb" />
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── page ────────────────────────────────────────────── */

const TechnologyClient = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(PAGE_SIZE);
    const [today, setToday] = useState("");

    useEffect(() => {
        setToday(
            new Date().toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            })
        );
    }, []);

    useEffect(() => {
        const fetchTechnologyPosts = async () => {
            try {
                const postsRef = collection(db2, "blogs");
                const q = query(
                    postsRef,
                    where("category", "==", "technology"),
                    orderBy("createdAt", "desc"),
                    limit(50)
                );
                let snap;
                try {
                    snap = await getDocs(q);
                } catch {
                    snap = await getDocs(
                        query(postsRef, orderBy("createdAt", "desc"), limit(50))
                    );
                }
                setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchTechnologyPosts();
    }, []);

    const lead = posts[0];
    const topStories = posts.slice(1, 5);
    const headlines = posts.slice(5, 11);
    const moreStories = posts.slice(11);
    const shown = moreStories.slice(0, visible);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

                .tn-page {
                    --paper: #fbfaf7; --paper-2: #f1efe9; --white: #ffffff;
                    --ink: #121212; --ink-2: #3d3d3d; --ink-3: #6b6b6b;
                    --rule: #dcd9d0; --rule-dark: #121212;
                    --accent: #c8102e; --accent-dark: #a30d25;
                    --serif: 'Playfair Display', Georgia, 'Times New Roman', serif;
                    --sans: 'Inter', system-ui, sans-serif;
                    --mono: 'JetBrains Mono', 'Fira Code', monospace;
                    background: var(--paper); color: var(--ink); font-family: var(--sans); min-height: 100vh;
                }
                .tn-page *, .tn-page *::before, .tn-page *::after { box-sizing: border-box; }
                .tn-page h1, .tn-page h2, .tn-page h3, .tn-page h4, .tn-page p { margin: 0; }
                :where(.tn-page a) { color: inherit; text-decoration: none; }
                .tn-wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }

                /* Top bar */
                .tn-bar { background: var(--rule-dark); color: #d9d6cc; }
                .tn-bar__inner { max-width: 1180px; margin: 0 auto; padding: 0 24px; height: 36px; display: flex; align-items: center; justify-content: space-between; gap: 16px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.04em; }
                .tn-bar__links { display: flex; gap: 18px; }
                .tn-bar__links a { color: #d9d6cc; transition: color 0.15s; }
                .tn-bar__links a:hover { color: #fff; text-decoration: underline; text-underline-offset: 3px; }
                @media (max-width: 640px) { .tn-bar__date { display: none; } .tn-bar__inner { justify-content: flex-end; } }

                /* Masthead */
                .tn-mast { text-align: center; padding: 30px 0 18px; border-bottom: 1px solid var(--rule); }
                .tn-mast__brand { font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-3); }
                .tn-mast__brand em { font-style: normal; color: var(--accent); }
                .tn-mast__title { margin-top: 8px; font-family: var(--serif); font-weight: 800; font-size: clamp(40px, 8vw, 84px); line-height: 1; letter-spacing: -0.02em; color: var(--ink); }
                .tn-mast__tag { margin-top: 10px; font-size: 13px; color: var(--ink-3); }

                /* Section nav */
                .tn-nav { position: sticky; top: 0; z-index: 50; background: var(--paper); border-bottom: 3px double var(--rule-dark); }
                .tn-nav__inner { max-width: 1180px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: center; gap: 4px; overflow-x: auto; scrollbar-width: none; }
                .tn-nav__inner::-webkit-scrollbar { display: none; }
                .tn-nav a { white-space: nowrap; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-2); padding: 14px 16px; border-bottom: 3px solid transparent; margin-bottom: -3px; transition: color 0.15s, border-color 0.15s; }
                .tn-nav a:hover { color: var(--accent); }
                .tn-nav a.is-active { color: var(--accent); border-bottom-color: var(--accent); }

                /* Shared bits */
                .tn-kicker { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); }
                .tn-by { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 12px; color: var(--ink-3); }
                .tn-by span:first-child { font-weight: 600; color: var(--ink-2); }
                .tn-by__dot { width: 3px; height: 3px; border-radius: 50%; background: var(--ink-3); flex-shrink: 0; }
                .tn-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.45s ease; }
                .tn-ph { width: 100%; height: 100%; background: repeating-linear-gradient(45deg, #ebe8e0, #ebe8e0 6px, #e3e0d7 6px, #e3e0d7 12px); }
                .tn-section-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; border-top: 3px solid var(--rule-dark); padding-top: 10px; margin-bottom: 18px; }
                .tn-section-head h2 { font-family: var(--serif); font-weight: 800; font-size: 22px; letter-spacing: -0.01em; }
                .tn-section-head span { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-3); }

                /* Front page */
                .tn-front { display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr); gap: 36px; padding: 28px 0 36px; }
                @media (max-width: 900px) { .tn-front { grid-template-columns: minmax(0, 1fr); gap: 28px; } }

                .tn-lead { display: flex; flex-direction: column; gap: 10px; }
                .tn-lead__media { height: clamp(210px, 34vw, 380px); background: var(--paper-2); overflow: hidden; margin-bottom: 4px; }
                .tn-lead:hover .tn-img { transform: scale(1.03); }
                .tn-lead__title { font-family: var(--serif); font-weight: 800; font-size: clamp(28px, 4vw, 44px); line-height: 1.1; letter-spacing: -0.015em; }
                .tn-lead:hover .tn-lead__title { text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 5px; }
                .tn-lead__sub { font-size: 17px; line-height: 1.55; color: var(--ink-2); font-weight: 300; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

                .tn-tops { display: flex; flex-direction: column; border-left: 1px solid var(--rule); padding-left: 36px; }
                @media (max-width: 900px) { .tn-tops { border-left: none; padding-left: 0; border-top: 1px solid var(--rule); padding-top: 8px; } }
                .tn-top { display: grid; grid-template-columns: minmax(0, 1fr) 104px; gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--rule); }
                .tn-top:first-child { padding-top: 0; }
                .tn-top:last-child { border-bottom: none; padding-bottom: 0; }
                .tn-top__text { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
                .tn-top__title { font-family: var(--serif); font-weight: 800; font-size: 18px; line-height: 1.25; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
                .tn-top:hover .tn-top__title { text-decoration: underline; text-underline-offset: 3px; }
                .tn-top__media { height: 78px; background: var(--paper-2); overflow: hidden; align-self: start; }
                .tn-top:hover .tn-img { transform: scale(1.06); }

                /* Body */
                .tn-body { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 44px; padding: 8px 0 72px; align-items: start; }
                @media (max-width: 960px) { .tn-body { grid-template-columns: minmax(0, 1fr); } }

                .tn-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px 28px; }
                @media (max-width: 600px) { .tn-grid { grid-template-columns: 1fr; } }
                .tn-card { display: flex; flex-direction: column; gap: 8px; }
                .tn-card__media { height: 160px; background: var(--paper-2); overflow: hidden; margin-bottom: 4px; }
                .tn-card:hover .tn-img { transform: scale(1.04); }
                .tn-card__title { font-family: var(--serif); font-weight: 800; font-size: 21px; line-height: 1.2; }
                .tn-card:hover .tn-card__title { text-decoration: underline; text-underline-offset: 3px; }
                .tn-card__sub { font-size: 14px; line-height: 1.6; color: var(--ink-2); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
                .tn-more { display: flex; justify-content: center; margin-top: 40px; }
                .tn-btn { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 13px 24px; border: 2px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; transition: background 0.15s, color 0.15s; }
                .tn-btn:hover { background: var(--ink); color: var(--paper); }
                .tn-btn--red { background: var(--accent); border-color: var(--accent); color: #fff; }
                .tn-btn--red:hover { background: var(--accent-dark); border-color: var(--accent-dark); color: #fff; }

                /* Sidebar */
                .tn-side { position: sticky; top: 64px; display: flex; flex-direction: column; gap: 28px; }
                @media (max-width: 960px) { .tn-side { position: static; } }
                .tn-rows { display: flex; flex-direction: column; }
                .tn-row { display: grid; grid-template-columns: 34px minmax(0, 1fr); gap: 4px; padding: 14px 0; border-bottom: 1px solid var(--rule); }
                .tn-row:last-child { border-bottom: none; }
                .tn-row__rank { font-family: var(--serif); font-weight: 800; font-size: 26px; line-height: 1; color: var(--accent); }
                .tn-row__title { font-family: var(--serif); font-weight: 800; font-size: 16.5px; line-height: 1.3; }
                .tn-row:hover .tn-row__title { text-decoration: underline; text-underline-offset: 3px; }
                .tn-row__meta { margin-top: 5px; font-size: 12px; color: var(--ink-3); }

                .tn-follow { background: var(--ink); color: #f4f1ea; padding: 24px; }
                .tn-follow__kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: #ff6b81; }
                .tn-follow__title { margin-top: 8px; font-family: var(--serif); font-weight: 800; font-size: 22px; line-height: 1.2; }
                .tn-follow__text { margin-top: 8px; font-size: 13px; line-height: 1.65; color: #bdb8ae; }
                .tn-follow .tn-btn { margin-top: 16px; }

                /* Skeleton + empty */
                .tn-skel { display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr); gap: 36px; padding: 28px 0 72px; }
                @media (max-width: 900px) { .tn-skel { grid-template-columns: minmax(0, 1fr); } }
                .tn-skel__img, .tn-skel__line, .tn-skel__thumb { background: linear-gradient(90deg, #ebe8e0 25%, #f4f2ec 50%, #ebe8e0 75%); background-size: 200% 100%; animation: tnShimmer 1.4s linear infinite; }
                .tn-skel__img { height: clamp(210px, 34vw, 380px); margin-bottom: 16px; }
                .tn-skel__line { height: 16px; margin-bottom: 10px; }
                .tn-skel__line--w90 { width: 90%; } .tn-skel__line--w80 { width: 80%; } .tn-skel__line--w60 { width: 60%; } .tn-skel__line--w50 { width: 50%; }
                .tn-skel__item { display: grid; grid-template-columns: 1fr 104px; gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--rule); }
                .tn-skel__thumb { height: 78px; }
                @keyframes tnShimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }

                .tn-empty { padding: 96px 0; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; }
                .tn-empty h2 { font-family: var(--serif); font-weight: 800; font-size: 30px; }
                .tn-empty p { font-size: 14px; color: var(--ink-3); }

                .tn-page :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
                @media (max-width: 640px) {
                    .tn-wrap, .tn-bar__inner, .tn-nav__inner { padding-left: 18px; padding-right: 18px; }
                    .tn-nav__inner { justify-content: flex-start; }
                }
                @media (prefers-reduced-motion: reduce) { .tn-page * { transition: none !important; animation: none !important; } }
            `}</style>

            <div className="tn-page">
                {/* Top bar */}
                <div className="tn-bar">
                    <div className="tn-bar__inner">
                        <span className="tn-bar__date">{today}</span>
                        <nav className="tn-bar__links" aria-label="Site">
                            <Link href="/">Home</Link>
                            <Link href="/portfolio">Portfolio</Link>
                            <Link href="/blog">Blog</Link>
                            <Link href="/bc/contact">Contact</Link>
                        </nav>
                    </div>
                </div>

                {/* Masthead */}
                <header className="tn-mast tn-wrap">
                    <p className="tn-mast__brand">brown<em>.</em>dev presents</p>
                    <h1 className="tn-mast__title">Tech News</h1>
                    <p className="tn-mast__tag">
                        Architecture decisions, engineering culture and the systems shaping how software gets built.
                    </p>
                </header>

                {/* Section nav */}
                <nav className="tn-nav" aria-label="Sections">
                    <div className="tn-nav__inner">
                        <Link href="/tech-news" className="is-active">Technology</Link>
                        <Link href="/blog">Blog</Link>
                        <Link href="/blog/topic/fraud-awareness">Fraud Alerts</Link>
                        <Link href="/portfolio">Portfolio</Link>
                        <Link href="/advertise">Advertise</Link>
                    </div>
                </nav>

                <main className="tn-wrap">
                    {loading ? (
                        <Skeleton />
                    ) : posts.length === 0 ? (
                        <div className="tn-empty">
                            <h2>No stories yet</h2>
                            <p>Nothing has been published in this section. Check back soon.</p>
                            <Link href="/blog" className="tn-btn">
                                Read the blog <ArrowRight size={13} />
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* Front page */}
                            <section className="tn-front" aria-label="Top stories">
                                {lead && <LeadStory post={lead} />}
                                {topStories.length > 0 && (
                                    <div className="tn-tops">
                                        {topStories.map((p) => (
                                            <TopStory key={p.id} post={p} />
                                        ))}
                                    </div>
                                )}
                            </section>

                            <div className="tn-body">
                                {/* Main column */}
                                <div>
                                    {shown.length > 0 && (
                                        <>
                                            <div className="tn-section-head">
                                                <h2>More stories</h2>
                                                <span>{moreStories.length} articles</span>
                                            </div>
                                            <div className="tn-grid">
                                                {shown.map((p) => (
                                                    <StoryCard key={p.id} post={p} />
                                                ))}
                                            </div>
                                            {visible < moreStories.length && (
                                                <div className="tn-more">
                                                    <button className="tn-btn" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                                                        Load more stories
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                {/* Sidebar */}
                                <aside className="tn-side">
                                    {headlines.length > 0 && (
                                        <section>
                                            <div className="tn-section-head">
                                                <h2>More headlines</h2>
                                            </div>
                                            <div className="tn-rows">
                                                {headlines.map((p, i) => (
                                                    <HeadlineRow key={p.id} post={p} rank={i + 1} />
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    <section className="tn-follow">
                                        <p className="tn-follow__kicker">Stay informed</p>
                                        <h3 className="tn-follow__title">Get the news on WhatsApp</h3>
                                        <p className="tn-follow__text">
                                            New tech stories, fraud alerts and security tips sent straight to your phone.
                                        </p>
                                        <a
                                            href={CHANNEL_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="tn-btn tn-btn--red"
                                        >
                                            Join the channel <ArrowUpRight size={13} />
                                        </a>
                                    </section>
                                </aside>
                            </div>
                        </>
                    )}
                </main>

                <Footer />
            </div>
        </>
    );
};

export default TechnologyClient;