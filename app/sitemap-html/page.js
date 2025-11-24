"use client";

import React, { useState, useEffect } from "react"; // ✅ Import React
import Link from "next/link";

// Simulate fetching blog slugs (replace with your real data fetching)
const getBlogSlugs = async () => {
    return [
        "why-you-need-a-website",
        "importance-of-a-personal-portfolio",
        "why-branding-matters-online",
        "future-proofing-your-career-online",
    ];
};

export default function SitemapPage() {
    const pages = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
        { name: "Jobs", href: "/jobs" },
        { name: "Projects", href: "/projects" },
        { name: "Scam Checker", href: "/scam-Checker" },
        { name: "CV", href: "/cv" },
        { name: "Hire Web Developer Abuja", href: "/hire-web-developer-abuja" },
        { name: "Cheap Web Developer in Nigeria", href: "/cheap-web-developer-in-nigeria" },
        { name: "Software Developer Nigeria", href: "/software-developer-nigeria" },
        { name: "Software Developer Africa", href: "/software-developer-africa" },
        { name: "Web Developer Abuja", href: "/web-developer-abuja" },
        { name: "Web Developer Nigeria", href: "/web-developer-nigeria" },
    ];

    const [blogSlugs, setBlogSlugs] = useState([]);

    useEffect(() => {
        async function fetchSlugs() {
            const slugs = await getBlogSlugs();
            setBlogSlugs(slugs);
        }
        fetchSlugs();
    }, []);

    return (
        <main className="min-h-screen bg-black text-white py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Sitemap
                </h1>

                <ul className="space-y-3 text-gray-300">
                    {pages.map((page, i) => (
                        <li key={i}>
                            <Link href={page.href} className="hover:text-purple-400 transition-colors">
                                {page.name}
                            </Link>
                        </li>
                    ))}

                    {/* Blog posts dynamically */}
                    {blogSlugs.map((slug, i) => (
                        <li key={`blog-${i}`}>
                            <Link href={`/blog/${slug}`} className="hover:text-purple-400 transition-colors">
                                {slug.replace(/-/g, " ")} {/* Human-readable */}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
