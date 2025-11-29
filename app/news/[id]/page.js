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

    const categoryColors = {
        technology: "from-purple-600 to-purple-900",
    };

    const getCategoryColor = (category) => {
        const cat = category?.toLowerCase() || "other";
        return categoryColors[cat] || categoryColors.other;
    };

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
            router.push("/");
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
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
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
                    <Link href="/" className="text-blue-600 hover:underline">
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
            className="min-h-screen "
        >

            <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
                {/* Article Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 mt-10"
                >
                    {article.title}
                </motion.h1>

                {/* Metadata Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700"
                >
                    {article.createdAt && (
                        <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4" />
                            <time dateTime={article.createdAt.toDate().toISOString()}>
                                {article.createdAt.toDate().toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                        </div>
                    )}

                    {readingTime > 0 && (
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {readingTime} min read
                        </span>
                    )}

                    <div className="flex-1"></div>

                    {/* Share Button */}
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={handleShareClick}
                            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                        >
                            <Share className="h-4 w-4" />
                            <span className="text-sm font-semibold">Share</span>
                        </button>

                        {showShareMenu && (
                            <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-3 flex flex-col gap-2 text-sm z-50">
                                <a
                                    href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(
                                        article.title
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                                        𝕏
                                    </div>
                                    <span className="font-medium">Share on Twitter</span>
                                </a>
                                <a
                                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${encodeURIComponent(
                                        article.title
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                                        in
                                    </div>
                                    <span className="font-medium">Share on LinkedIn</span>
                                </a>
                                <button
                                    onClick={handleCopyLink}
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                                >
                                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                                        <LinkIcon className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="font-medium">Copy link</span>
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Social Links */}
                <div className="flex gap-6 justify-center mb-8">
                    <a
                            href="https://x.com/BrownC15427449?t=nCQKNfzI8S5gnUTPDwTAQw&s=09"
                        className="text-cyan-400 hover:scale-110 transition-transform"
                    >
                        <Twitter size={28} />
                    </a>
                    
                    <a
                            href="https://tiktok.com/@browncode2_4_7"
                        className="text-red-600 hover:scale-110 transition-transform"
                    >
                        <Youtube size={28} />
                    </a>
                </div>

                {/* Category Badge */}
                <div className="flex items-center gap-3 mb-6">
                    <span
                        className={`inline-block bg-gradient-to-r ${getCategoryColor(
                            article.category
                        )} text-white text-xs font-bold uppercase tracking-wider px-4 py-2 shadow-lg`}
                    >
                        {article.category || "News"}
                    </span>
                </div>

                {/* Featured Image */}
                {article.imageUrl && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="w-full mb-12 overflow-hidden shadow-xl"
                    >
                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-auto"
                        />
                    </motion.div>
                )}

                {/* Subtitle */}
                {article.subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl font-medium leading-relaxed mb-10 border-l-4 border-blue-600 pl-4"
                    >
                        {article.subtitle}
                    </motion.p>
                )}

                {/* Article Body */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-16"
                >
                    <BlogDisplay body={article.body} className="py-5"/>
                </motion.div>

                {/* Newsletter CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="relative overflow-hidden rounded-3xl mb-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                >
                    <div className="relative py-16 px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Stay Informed
                        </h2>
                        <p className="text-lg max-w-2xl mx-auto mb-8">
                            Get the latest news and analysis delivered to your inbox.
                        </p>
                        <Link
                            href="https://thecyclopedia.substack.com/subscribe"
                            className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl"
                        >
                            Subscribe Now
                        </Link>
                    </div>
                </motion.div>
            </article>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
                <div className="py-16 bg-black">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold mb-8">Related Articles</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedArticles.slice(0, 6).map((related) => (
                                <Link
                                    key={related.id}
                                    href={`/news/${createFullSlug(related.title, related.id)}`}
                                    className="group"
                                >
                                    <article className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-black">
                                        {related.imageUrl && (
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={related.imageUrl}
                                                    alt={related.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                                <div
                                                    className={`absolute top-4 left-4 bg-gradient-to-r ${getCategoryColor(
                                                        related.category
                                                    )} text-xs font-bold px-3 py-1 rounded-full shadow-lg text-white`}
                                                >
                                                    {related.category || "News"}
                                                </div>
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
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