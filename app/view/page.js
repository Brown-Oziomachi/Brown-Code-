// components/ViewBlogs.js
"use client";

import { X, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

export default function ViewBlogs({ articles }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const router = useRouter();
    const showPopupRef = useRef(null)

    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredBlogs([]);
            return;
        }

        const results = articles.filter((blog) => {
            const searchLower = searchQuery.toLowerCase();

            return (
                blog.title?.toLowerCase().includes(searchLower) ||
                blog.content?.toLowerCase().includes(searchLower) ||
                blog.author?.toLowerCase().includes(searchLower) ||
                blog.description?.toLowerCase().includes(searchLower) ||
                blog.category?.toLowerCase().includes(searchLower)
            );
        });

        setFilteredBlogs(results);
    }, [searchQuery, articles]);

    const handleSearch = () => {
        if (!searchQuery.trim()) return;
        setShowPopup(false);
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    };

    const handleBlogClick = (blog) => {
        router.push(`/blog/${blog.slug}`);
        setShowPopup(false);
        setSearchQuery("");
    };

    const handleClose = () => {
        setShowPopup(false);
        setSearchQuery("");
        setFilteredBlogs([]);
    };

    // Close on Escape key
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showPopupRef.current && !showPopupRef.current.contain(e.target)) {
                setShowPopup(false)
            }
        };
        if (showPopup) {
            document.addEventListener("keydown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("keydown", handleClickOutside);
        };
    }, [showPopup]);

    return (
        <div>
            <button
                className="bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200 focus:ring-2 focus:ring-purple-400 mt-10 mx-auto px-2 py-2 rounded-full shadow-md flex items-center gap-2 mb-10"
                onClick={() => setShowPopup(true)}
            >
                <Search size={12} />
            </button>

            {showPopup && (
                <>
                    <div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                        onClick={handleClose}
                    />

                    {/* Modal Content */}
                    <div className="fixed inset-0 mt-50 items-center justify-center z-50 p-4 pointer-events-none">
                        <div
                            className="bg-purple-200 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="p-6 border-b">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        Search Blogs
                                    </h2>
                                    <button
                                        onClick={handleClose}
                                        className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="relative">
                                    <div className="flex items-center border-2 border-gray-300 rounded-full overflow-hidden focus-within:ring-4 focus-within:ring-purple-300 focus-within:border-purple-500 transition-all">
                                        <Search size={20} className="ml-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search by title, content, author, or description..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                            className="w-full px-4 py-3 text-gray-800 focus:outline-none"
                                            autoFocus
                                        />
                                        {searchQuery && (
                                            <button
                                                onClick={() => {
                                                    setSearchQuery("");
                                                    setFilteredBlogs([]);
                                                }}
                                                className="px-3 text-gray-400 hover:text-gray-600"
                                            >
                                                <X size={18} />
                                            </button>
                                        )}
                                        <button
                                            onClick={handleSearch}
                                            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 text-white transition-colors font-medium"
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6">
                                {!searchQuery && (
                                    <div className="text-center py-12">
                                        <Search size={48} className="mx-auto text-gray-300 mb-3" />
                                        <p className="text-gray-500">
                                            Start typing to search through blogs...
                                        </p>
                                        <p className="text-sm text-gray-400 mt-2">
                                            Search by title, content, author, or description
                                        </p>
                                    </div>
                                )}

                                {searchQuery && filteredBlogs.length === 0 && (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500 text-lg">
                                            No blogs found for "{searchQuery}"
                                        </p>
                                        <p className="text-gray-400 mt-2">
                                            Try searching with different keywords
                                        </p>
                                    </div>
                                )}

                                {filteredBlogs.length > 0 && (
                                    <div className="space-y-3">
                                        <p className="text-sm text-gray-500 mb-4">
                                            Found {filteredBlogs.length} blog
                                            {filteredBlogs.length !== 1 ? "s" : ""}
                                        </p>

                                        {filteredBlogs.map((blog) => (
                                            <button
                                                key={blog.id || blog.slug}
                                                onClick={() => handleBlogClick(blog)}
                                                className="w-full text-left p-5 rounded-xl hover:bg-purple-50 transition-all border border-gray-200 hover:border-purple-300 hover:shadow-md group"
                                            >
                                                <h3 className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                                                    {blog.title}
                                                </h3>

                                                {blog.description && (
                                                    <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                                                        {blog.description}
                                                    </p>
                                                )}

                                                <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                                                    {blog.content?.substring(0, 150)}...
                                                </p>

                                                <div className="flex items-center gap-4 text-xs text-gray-400">
                                                    {blog.author && (
                                                        <span className="flex items-center gap-1">
                                                            <span className="font-medium">By</span> {blog.author}
                                                        </span>
                                                    )}
                                                    {blog.category && (
                                                        <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full">
                                                            {blog.category}
                                                        </span>
                                                    )}
                                                    {blog.date && <span>{blog.date}</span>}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}