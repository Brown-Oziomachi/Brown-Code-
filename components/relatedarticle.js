"use client"

import { useState, useEffect } from "react";
import { articles } from "@/app/data/article";
import { Clock, ArrowRight, BookOpen } from "lucide-react";

export default function RelatedArticles({ currentSlug }) {
    // 1. Unified technical slug list
    const technicalSlugs = [
        "moving-from-social-media-to-digital-asset",
        "importance-of-a-personal-portfolio",
        "why-branding-matters-online",
        "power-of-ecommerce-global-sales",
        "building-trust-online-cro",
        "why-website-speed-matters",
        "content-marketing-winning-with-value",
        "how-users-help-ai-companies-make-billions",
        "smart-automation-business-autopilot",
        "cybersecurity-essentials-online-business",
        "how-to-build-your-first-website",
        "seo-fundamentals-getting-found",
        "content-marketing-personal-brands",
        "networking-digital-era",
        "data-driven-decisions-web-analytics"
    ];

    // 2. Set up component state to hold display articles post-hydration
    const [displayArticles, setDisplayArticles] = useState([]);

    // 3. Process data filtering and random shuffling safely on the client mount loop
    useEffect(() => {
        // Strict Filter: Remove the current article immediately
        const filteredArticles = articles.filter(article => article.slug !== currentSlug);

        // Category matching logic
        const isTechCategory = technicalSlugs.includes(currentSlug);
        let related = filteredArticles.filter(article => {
            if (isTechCategory) {
                return technicalSlugs.includes(article.slug);
            }
            return !technicalSlugs.includes(article.slug);
        });

        // Fallback if no specific related matches found
        if (related.length === 0) {
            related = filteredArticles;
        }

        // Shuffle logic isolated to prevent SSR / Client mismatches
        const shuffled = [...related].sort(() => 0.5 - Math.random());
        setDisplayArticles(shuffled.slice(0, 8));
    }, [currentSlug]);

    const getReadingTime = (content) => {
        const words = content ? content.split(" ").length : 0;
        return Math.max(1, Math.ceil(words / 200));
    };

    // Prevent rendering mismatched markup placeholders before client execution resolves
    if (displayArticles.length === 0) {
        return null;
    }

    return (
        <section className="mt-5 pt-16 border-t border-slate-200 dark:border-slate-800 p-4 sm:p-10">
            <div className="flex items-center gap-2 mb-10">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                    <BookOpen size={18} />
                </div>
                <div>
                    <h2 className="text-sm font-bold tracking-wider text-slate-400 uppercase">
                        SYS.SUGGESTED_READS // related_matrix_blocks
                    </h2>
                </div>
            </div>

            {/* Grid layout parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                {displayArticles.map((article, index) => {
                    const readTime = getReadingTime(article.content);
                    // Use a clean dark workspace fallback if your article data missing standard image properties
                    const fallbackImage = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80";

                    return (
                        <a
                            key={article.slug}
                            href={`/blog/${article.slug}`}
                            className={`group relative flex flex-col justify-end h-80 p-6 border border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${index >= 4 ? "hidden md:flex" : "flex"
                                }`}
                        >
                            {/* Background Image layer */}
                            <img
                                src={article.image || fallbackImage}
                                alt={article.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            />

                            {/* Dark Gradient Overlay for optimal typographic readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent z-10" />

                            {/* Text Content Layer */}
                            <div className="relative z-20 w-full">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-600 text-white tracking-wider uppercase">
                                        {article.postedBy || "BROWN CODE"}
                                    </span>
                                    <span className="flex items-center gap-1 text-[11px] text-slate-300 font-medium">
                                        <Clock size={11} />
                                        {readTime} min read
                                    </span>
                                </div>

                                <h3 className="text-white font-bold text-base leading-snug group-hover:text-indigo-400 transition-colors line-clamp-2">
                                    {article.title}
                                </h3>

                                {article.preview && (
                                    <p className="text-slate-300 text-xs mt-2 line-clamp-2 opacity-90">
                                        {article.preview}
                                    </p>
                                )}

                                <div className="flex items-center text-xs font-semibold text-indigo-400 mt-4 pt-3 border-t border-slate-800 w-full group-hover:gap-2 transition-all">
                                    <span>Read article</span>
                                    <ArrowRight size={12} className="ml-1 opacity-80 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>
        </section>
    );
}