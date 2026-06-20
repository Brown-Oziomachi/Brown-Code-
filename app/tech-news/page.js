"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Terminal, Cpu, Layers, Disc, ArrowLeft, AlertTriangle } from "lucide-react";

const TechnologyPage = () => {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const createSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const createFullSlug = (title, id) => `${createSlug(title)}--${id}`;

    const handleBack = () => {
        router.push("/portfolio");
    };

    const handleReturn = () => {
        router.push('/')
    }


    useEffect(() => {
        const fetchTechnologyPosts = async () => {
            try {
                const postsRef = collection(db2, "blogs");

                let q = query(
                    postsRef,
                    where("category", "==", "technology"),
                    orderBy("createdAt", "desc"),
                    limit(50)
                );

                let querySnapshot;

                try {
                    querySnapshot = await getDocs(q);
                } catch (err) {
                    console.warn("Fallback: missing index allocation mapping structures.");

                    q = query(postsRef, orderBy("createdAt", "desc"), limit(6));
                    querySnapshot = await getDocs(q);
                }

                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setPosts(data);
            } catch (error) {
                console.error("Pipeline breakdown tracking data streams:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTechnologyPosts();
    }, []);

    const firstTwoPosts = posts.slice(0, 2);
    const nextTwoPosts = posts.slice(2, 4);
    const remainingPosts = posts.slice(4);

    return (
        <>
            <nav className="relative z-10 border-b border-slate-800/80 bg-[#090d16]/80 backdrop-blur-md sticky top-0 z-[9999]">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 group">
                        <Terminal nal size={18} className="text-cyan-400 group-hover:rotate-6 transition-transform" />
                        <span onClick={handleReturn}>
                            <span className="text-sm font-bold text-white tracking-wider uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                                BROWN_CODE_DEV // tech_feed_logs
                            </span>
                        </span>
                    </div>
                    <a
                        href="/portfolio"
                        className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-950/80 transition-all duration-300 shadow-sm hover:shadow-cyan-500/5"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                        <span>SYS.RETURN()</span>
                    </a>
                </div>
            </nav>

            <main className="w-full min-h-screen bg-[#030712] text-slate-100 pt-28 font-mono selection:bg-cyan-500/30 selection:text-cyan-200">
                {/* ===== SYSTEM BANNER HEADER ===== */}
                <section className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-8 pb-12">
                    <div className="relative w-full rounded-2xl border border-slate-900 bg-slate-950/40 backdrop-blur-md overflow-hidden p-6 md:p-12 shadow-2xl">
                        <div className="absolute top-0 right-0 p-4 opacity-[0.02] pointer-events-none hidden md:block">
                            <Cpu size={240} />
                        </div>

                        <div className="relative z-10 max-w-4xl">
                            <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 text-cyan-400 text-xs px-4 py-1.5 rounded-md tracking-wider uppercase mb-6">
                                <Terminal size={14} className="animate-pulse" />
                                fetch // tech_feed_logs
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
                                TECH_NEWS_<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">STREAM</span>
                            </h1>

                            <p className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed font-sans">
                                Explore automated indices, architecture strategies, and deep technical innovations shaping optimization layers. From compiler components to cleaner computational logic.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== PIPELINE MODULE RECTIFY ===== */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pb-24">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3">
                            <Disc className="w-6 h-6 animate-spin text-cyan-500" />
                            <p className="text-xs text-slate-500 uppercase tracking-widest">Querying database matrix endpoints...</p>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="border border-dashed border-slate-800 rounded-xl p-12 text-center max-w-xl mx-auto">
                            <AlertTriangle size={24} className="text-amber-500 mx-auto mb-4" />
                            <h3 className="text-sm font-bold text-slate-300 mb-2">ERR_EMPTY_RESULT_SET</h3>
                            <p className="text-xs text-slate-500 font-sans">
                                The tracking stream returned absolute zero values fitting standard query parameters.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Primary Nodes: Grid Matrix Blocks */}
                            {firstTwoPosts.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    {firstTwoPosts.map((post) => (
                                        <Link
                                            key={post.id}
                                            href={`/news/${createFullSlug(post.title, post.id)}`}
                                            className="group relative h-80 overflow-hidden rounded-xl border border-slate-900 bg-slate-950/40 hover:border-cyan-500/40 transition-all duration-300 shadow-lg flex flex-col justify-end"
                                        >
                                            {post.imageUrl ? (
                                                <img
                                                    src={post.imageUrl}
                                                    alt={post.title}
                                                    className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity group-hover:opacity-30 group-hover:scale-[1.02] transition duration-500"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/10 to-slate-950/50"></div>
                                            )}

                                            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/70 to-transparent z-10"></div>

                                            <div className="relative z-20 p-6">
                                                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-400 bg-cyan-950/30 mb-3 inline-block">
                                                    {post.category || "SYS_TECH"}
                                                </span>
                                                <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-200 leading-snug">
                                                    {post.title}
                                                </h3>
                                                <div className="flex items-center gap-4 text-[10px] text-slate-500">
                                                    <span className="font-sans text-slate-400 font-medium">{post.author || "Core System"}</span>
                                                    <span>//</span>
                                                    <span>
                                                        {post.createdAt?.toDate ? (() => {
                                                            const date = post.createdAt.toDate();
                                                            const now = new Date();
                                                            const diffTime = Math.abs(now - date);
                                                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                                            const diffMonths = Math.floor(diffDays / 30);

                                                            if (diffMonths > 0) return `DELTA_${diffMonths}M_AGO`;
                                                            if (diffDays > 0) return `DELTA_${diffDays}D_AGO`;
                                                            return 'DELTA_TIMESTAMP_TODAY';
                                                        })() : "UNKNOWN_TIME"}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Secondary Downstream Split-Nodes */}
                            {nextTwoPosts.length > 0 && (
                                <div className="grid grid-cols-1 gap-4 mb-14">
                                    {nextTwoPosts.map((post) => (
                                        <Link
                                            key={post.id}
                                            href={`/news/${createFullSlug(post.title, post.id)}`}
                                            className="group flex flex-col sm:flex-row gap-6 items-start sm:items-center bg-slate-950/20 border border-slate-900/60 rounded-xl hover:border-cyan-500/30 p-4 transition-all duration-200"
                                        >
                                            <div className="relative w-full sm:w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-slate-900 bg-slate-950">
                                                {post.imageUrl ? (
                                                    <img
                                                        src={post.imageUrl}
                                                        alt={post.title}
                                                        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity group-hover:scale-105 transition duration-300"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 bg-slate-900 flex items-center justify-center text-slate-700">
                                                        <Layers size={18} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-[10px] text-cyan-500/70 font-bold uppercase tracking-wider mb-1">
                                                    &gt;_ {post.category || "MODULE_ENG"}
                                                </p>
                                                <h3 className="text-base font-bold mb-2 group-hover:text-cyan-400 transition-colors text-slate-100">
                                                    {post.title}
                                                </h3>
                                                <div className="flex items-center gap-3 text-[10px] text-slate-500">
                                                    <span className="font-sans text-slate-400">{post.author || "System Dev"}</span>
                                                    <span>•</span>
                                                    <span>
                                                        {post.createdAt?.toDate ? (() => {
                                                            const date = post.createdAt.toDate();
                                                            const now = new Date();
                                                            const diffTime = Math.abs(now - date);
                                                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                                            const diffMonths = Math.floor(diffDays / 30);

                                                            if (diffMonths > 0) return `${diffMonths}m ago`;
                                                            if (diffDays > 0) return `${diffDays}d ago`;
                                                            return 'Today';
                                                        })() : ""}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Outlying Registry Log Indices */}
                            {remainingPosts.length > 0 && (
                                <div className="mt-12">
                                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Layers size={14} className="text-cyan-500" />
                                        DEEP_ARCHIVE_REGISTRY()
                                    </h2>
                                    <div className="border-t border-slate-900 divide-y divide-slate-900/60">
                                        {remainingPosts.map((post) => (
                                            <Link
                                                key={post.id}
                                                href={`/news/${createFullSlug(post.title, post.id)}`}
                                                className="group block py-5 px-2 hover:bg-slate-950/40 transition duration-150"
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                    <div className="flex-1">
                                                        <h3 className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors mb-1">
                                                            {post.title}
                                                        </h3>
                                                        <p className="text-xs text-slate-500 font-sans line-clamp-1 max-w-3xl">
                                                            {post.subtitle}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-between sm:justify-end gap-6 text-[10px] text-slate-600 font-mono">
                                                        <span>
                                                            {post.createdAt?.toDate
                                                                ? post.createdAt.toDate().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase()
                                                                : "UNKNOWN_DATE"}
                                                        </span>
                                                        <span className="text-cyan-600 font-bold border border-cyan-950 px-1.5 py-0.5 rounded text-[9px]">
                                                            {post.category?.toUpperCase() || "TECH"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* Pipeline Termination Return Options */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16 pt-8 border-t border-slate-900">
                        <button
                            onClick={handleBack}
                            className="w-full sm:w-auto group flex items-center justify-center gap-2 px-6 py-2.5 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all rounded-md text-xs uppercase tracking-wider"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            RETURN_TO_BASE
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default TechnologyPage;