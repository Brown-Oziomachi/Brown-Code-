"use client";

import { useState, useRef, useEffect } from "react";
import {
    doc,
    getDoc,
    collection,
    getDocs,
} from "firebase/firestore";
import {
    Share,
    LinkIcon,
    Clock,
    Twitter,
    Instagram,
    Youtube,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { db2 } from "@/config/firebase.config2";
import Navbar from "@/components/Navbar";

// Utility functions
const createSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

const extractIdFromSlug = (slug) => {
    const parts = slug.split("--");
    return parts.length > 1 ? parts[parts.length - 1] : slug;
};

const createFullSlug = (title, id) => {
    return `${createSlug(title)}--${id}`;
};

// Blog content renderer
const BlogDisplay = ({ body }) => {
    const isHTML = /<\/?[a-z][\s\S]*>/i.test(body || "");
    const html = isHTML ? body : body?.replace(/\n/g, "<br />") || "";

    return (
        <div
            className={`prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-img:rounded-lg ${!isHTML ? "whitespace-pre-line" : ""
                }`}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};

export default function NewsDetails() {
    const { id: slugParam } = useParams();
    const router = useRouter();
    const [article, setArticle] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [readingTime, setReadingTime] = useState(0);
    const menuRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("blog");

    // Calculate reading time
    useEffect(() => {
        if (article?.body) {
            const words = article.body.split(/\s+/).length;
            const minutes = Math.ceil(words / 200);
            setReadingTime(minutes);
        }
    }, [article]);

    // Fetch article
    useEffect(() => {
        if (!slugParam) return;

        async function fetchArticle() {
            try {
                setIsLoading(true);
                const docId = extractIdFromSlug(slugParam);
                const articleRef = doc(db2, "blogs", docId);
                const articleDoc = await getDoc(articleRef);

                if (articleDoc.exists()) {
                    const data = articleDoc.data();
                    setArticle({ id: docId, ...data });
                }
            } catch (error) {
                console.error("Error fetching article:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchArticle();
    }, [slugParam]);

    // Update URL with full slug
    useEffect(() => {
        if (article && slugParam && !slugParam.includes("--")) {
            const fullSlug = createFullSlug(article.title, article.id);
            router.replace(`/news/${fullSlug}`);
        }
    }, [article, slugParam, router]);

    // Close share menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowShareMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleBack = () => {
        router.push("/portfolio");
    };

    const scrollToSection = (sectionId) => {
        router.push(`/#${sectionId}`);
    };

    // Fetch related technology articles
    useEffect(() => {
        if (!article) return;

        async function fetchRelated() {
            try {
                const snapshot = await getDocs(collection(db2, "blogs"));
                const allArticles = snapshot.docs
                    .map((doc) => ({ id: doc.id, ...doc.data() }))
                    .filter((a) =>
                        a.id !== article.id &&
                        a.category?.toLowerCase() === "technology"
                    )
                    .sort((a, b) => (b.createdAt?.toDate() || 0) - (a.createdAt?.toDate() || 0));
                setRelatedArticles(allArticles.slice(0, 12));
            } catch (error) {
                console.error("Error fetching related articles:", error);
            }
        }

        fetchRelated();
    }, [article]);

    const handleShareClick = () => setShowShareMenu(!showShareMenu);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent mb-4"></div>
                    <p className="text-lg font-semibold">Loading News...</p>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Article not found</h2>
                    <Link href="/" className="text-cyan-600 hover:underline">
                        Return to homepage
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar
                isScrolled={isScrolled}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                activeSection={activeSection}
                scrollToSection={scrollToSection}
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="min-h-screen"
            >
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
                    {/* Category Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-4 mt-10"
                    >
                        <span className="inline-block bg-cyan-600 text-white text-sm font-bold px-4 py-1.5 uppercase tracking-wide">
                            {article.category || "News"}
                        </span>
                    </motion.div>

                    {/* Article Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
                    >
                        {article.title}
                    </motion.h1>

                    {/* Author and Date */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-6 flex items-center gap-2"
                    >
                        <Link href="/about" className="text-sm font-semibold mr-4 text-gray-800 dark:text-gray-200">
                        <p className="text-sm font-semibold mb-1 text-cyan-600">BROWN CODE</p>
                        </Link>
                        <div className="text-cyan-600">|</div>
                        {article.createdAt && (
                            <time className="text-xs text-gray-600 dark:text-gray-400">
                                {article.createdAt.toDate().toLocaleDateString("en-US", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })} {article.createdAt.toDate().toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true
                                })}
                            </time>
                        )}
                    </motion.div>

                    {/* Social Share Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-3 mb-8"
                    >
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? window.location.href : ''}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-80 transition-opacity"
                        >
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?url=${typeof window !== 'undefined' ? window.location.href : ''}&text=${encodeURIComponent(article.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:opacity-80 transition-opacity"
                        >
                            <span className="text-white font-bold text-sm">𝕏</span>
                        </a>
                        <button
                            onClick={handleCopyLink}
                            className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center hover:opacity-80 transition-opacity"
                        >
                            <LinkIcon className="w-5 h-5 text-white" />
                            <p className="font-bold">Copy</p>
                        </button>
                    </motion.div>

                    {/* Subtitle with highlighted style */}
                    {article.subtitle && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mb-8 bg-gray-100 text-black p-6 border-l-4 border-cyan-600"
                        >
                            <p className="text-lg font-medium leading-relaxed">
                                {article.subtitle}
                            </p>
                        </motion.div>
                    )}

                    {/* Featured Image */}
                    {article.imageUrl && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 }}
                            className="w-full mb-8 overflow-hidden"
                        >
                            <img
                                src={article.imageUrl}
                                alt={article.title}
                                className="w-full h-auto"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
                                {article.imageCaption || ""}
                            </p>
                        </motion.div>
                    )}

                    {/* Article Body */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mb-16"
                    >
                        <BlogDisplay body={article.body}/>
                    </motion.div>

                    {/* Newsletter CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="relative overflow-hidden mb-16 bg-gradient-to-r from-cyan-600 to-cyan-800 rounded-lg"
                    >
                        <div className="relative py-8 px-8 text-center text-white">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                Stay Informed
                            </h2>
                            <p className="text-base mb-6">
                                Get the latest news and analysis delivered to your inbox.
                            </p>
                            <Link
                                href="https://thecyclopedia.substack.com/subscribe"
                                className="inline-block bg-white text-cyan-600 font-bold px-6 py-3 rounded hover:bg-cyan-600 hover:text-white hover:scale-105 transition-all duration-300 shadow-xl"
                            >
                                Subscribe Now
                            </Link>
                        </div>
                    </motion.div>
                </article>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <div className="py-16 bg-gray-50 ">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-bold mb-8 text-black">Related Articles</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedArticles.slice(0, 6).map((related) => (
                                    <Link
                                        key={related.id}
                                        href={`/news/${createFullSlug(related.title, related.id)}`}
                                        className="group"
                                    >
                                        <article className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-black">
                                            {related.imageUrl && (
                                                <div className="relative h-48 overflow-hidden">
                                                    <img
                                                        src={related.imageUrl}
                                                        alt={related.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                                    <div className="absolute top-0 left-0 bg-cyan-600 text-xs font-bold px-3 py-1 shadow-lg text-white">
                                                        {related.category || "News"}
                                                    </div>
                                                </div>
                                            )}
                                            <div className="p-6">
                                                <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-600 transition-colors line-clamp-2">
                                                    {related.title}
                                                </h3>
                                                {related.subtitle && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                                                        {related.subtitle}
                                                    </p>
                                                )}
                                                {related.createdAt && (
                                                    <time className="text-xs text-gray-500">
                                                        {related.createdAt.toDate().toLocaleDateString()}
                                                    </time>
                                                )}
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </>
    );
}