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
import Navbar from "@/components/Navbar";

const TechnologyPage = () => {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("blog");

    const createSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const createFullSlug = (title, id) => `${createSlug(title)}--${id}`;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleBack = () => {
        router.push("/");
    };

    const scrollToSection = (sectionId) => {
        router.push(`/#${sectionId}`);
    };

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
                    console.warn("Fallback: missing index.");

                    q = query(postsRef, orderBy("createdAt", "desc"), limit(6));
                    querySnapshot = await getDocs(q);
                }

                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
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
            <Navbar
                isScrolled={isScrolled}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                activeSection={activeSection}
                scrollToSection={scrollToSection}
            />

            <main className="w-full">
                {/* ===== HERO SECTION (Portfolio Style, No Image) ===== */}
                <section className="w-full py-32 text-center bg-black text-white px-4">
                    <p className="uppercase tracking-wider text-xs font-semibold text-blue-300 mb-3">
                        Tech Insights
                    </p>

                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Tomorrow's World, Built Today
                    </h1>

                    <p className="max-w-2xl mx-auto text-gray-300 text-sm md:text-lg leading-relaxed">
                        Explore ideas, innovation, and deep-tech insights that shape the digital future.
                        Thoughtfully curated articles covering AI, software engineering, web development,
                        clean energy tech, and the technologies transforming our world.
                    </p>
                </section>

                {/* ===== POSTS SECTION ===== */}
                <div className="max-w-7xl mx-auto py-14 px-4">
                    {loading ? (
                        <p className="text-center py-10">Loading latest articles...</p>
                    ) : posts.length === 0 ? (
                        <p className="text-center text-gray-500">No posts found.</p>
                    ) : (
                        <>
                            {/* First Two Posts - Large Cards with Image Overlay */}
                            {firstTwoPosts.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    {firstTwoPosts.map((post) => (
                                        <Link
                                            key={post.id}
                                            href={`/news/${createFullSlug(post.title, post.id)}`}
                                            className="group relative h-80 overflow-hidden bg-gray-900"
                                        >
                                            {post.imageUrl ? (
                                                <img
                                                    src={post.imageUrl}
                                                    alt={post.title}
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600"></div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent"></div>
                                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                <p className="text-xs font-semibold mb-2 uppercase tracking-wider">
                                                    {post.category || "Tech"}
                                                </p>
                                                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-300 transition">
                                                    {post.title}
                                                </h3>
                                                <div className="flex items-center gap-2 text-xs text-gray-300">
                                                    <span>{post.author || "Tech Insights"}</span>
                                                    <span>•</span>
                                                    <span>
                                                        {post.createdAt?.toDate
                                                            ? (() => {
                                                                const date = post.createdAt.toDate();
                                                                const now = new Date();
                                                                const diffTime = Math.abs(now - date);
                                                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                                                const diffMonths = Math.floor(diffDays / 30);

                                                                if (diffMonths > 0) {
                                                                    return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
                                                                } else if (diffDays > 0) {
                                                                    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
                                                                } else {
                                                                    return 'Today';
                                                                }
                                                            })()
                                                            : ""}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Next Two Posts - Horizontal Cards with Side Image */}
                            {nextTwoPosts.length > 0 && (
                                <div className="space-y-6 mb-12">
                                    {nextTwoPosts.map((post) => (
                                        <Link
                                            key={post.id}
                                            href={`/news/${createFullSlug(post.title, post.id)}`}
                                            className="group flex gap-6 items-start hover:bg-gray-50 transition p-4 -mx-4"
                                        >
                                            <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden bg-gray-200">
                                                {post.imageUrl ? (
                                                    <img
                                                        src={post.imageUrl}
                                                        alt={post.title}
                                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500"></div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs text-blue-600 font-semibold mb-2 uppercase tracking-wider">
                                                    {post.category || "Coding"}
                                                </p>
                                                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-700 transition text-gray-100">
                                                    {post.title}
                                                </h3>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <span>{post.author || "Tech Insights"}</span>
                                                    <span>•</span>
                                                    <span>
                                                        {post.createdAt?.toDate
                                                            ? (() => {
                                                                const date = post.createdAt.toDate();
                                                                const now = new Date();
                                                                const diffTime = Math.abs(now - date);
                                                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                                                const diffMonths = Math.floor(diffDays / 30);

                                                                if (diffMonths > 0) {
                                                                    return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
                                                                } else if (diffDays > 0) {
                                                                    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
                                                                } else {
                                                                    return 'Today';
                                                                }
                                                            })()
                                                            : ""}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Remaining Posts as List */}
                            {remainingPosts.length > 0 && (
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-6">
                                        More Articles
                                    </h2>
                                    <div className="space-y-6">
                                        {remainingPosts.map((post) => (
                                            <Link
                                                key={post.id}
                                                href={`/news/${createFullSlug(post.title, post.id)}`}
                                                className="group block p-6 border-b border-gray-200
                                            hover:bg-gray-50 transition duration-200"
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-700 transition text-gray-100">
                                                            {post.title}
                                                        </h3>

                                                        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                                                            {post.subtitle}
                                                        </p>

                                                        <p className="text-xs text-gray-300">
                                                            {post.createdAt?.toDate
                                                                ? post.createdAt.toDate().toDateString()
                                                                : ""}
                                                        </p>
                                                    </div>

                                                    <span className="text-xs text-blue-600 font-semibold uppercase whitespace-nowrap">
                                                        Tech
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </>
    );
};

export default TechnologyPage;