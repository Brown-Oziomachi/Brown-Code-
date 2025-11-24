"use client";

import { useRouter } from "next/navigation";
import { articles } from "../data/article";
import { ArrowLeft, Clock, User, Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function BlogList() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [isSearching, setIsSearching] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("blog");

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setIsSearching(true);

      const filtered = articles.filter((article) => {
        const searchLower = searchTerm.toLowerCase();

        return (
          article.content.toLowerCase().includes(searchLower) ||
          article.postedBy.toLowerCase().includes(searchLower) ||
          article.title.toLowerCase().includes(searchLower)
        );
      });

      setFilteredArticles(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeOutId);
  }, [searchTerm]);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getReadingTime = (content) => {
    const words = content.split(" ").length;
    return Math.max(1, Math.ceil(words / 200));
  };

  return (
    <>
      <Navbar
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      <section className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 space-y-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white text-sm font-semibold px-6 py-2.5 rounded-full backdrop-blur-sm">
              <Sparkles size={16} className="text-purple-400" />
              Our Blog
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
              What You Must Know
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Insights and strategies to build your digital presence and
              future-proof your career
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative flex items-center">
                <Search className="absolute left-5 w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search articles by title, author, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-slate-900/80 backdrop-blur-sm border border-purple-500/20 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-5 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Search Results Count */}
            {searchTerm && (
              <div className="mt-4 text-center">
                <p className="text-gray-400 text-sm">
                  {isSearching ? (
                    "Searching..."
                  ) : (
                    <>
                      Found{" "}
                      <span className="text-purple-400 font-semibold">
                        {filteredArticles.length}
                      </span>{" "}
                      {filteredArticles.length === 1 ? "article" : "articles"}
                    </>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredArticles.map((article, index) => (
                <article
                  key={article.slug}
                  className="group relative bg-gradient-to-br from-slate-900/80 to-purple-900/20 backdrop-blur-sm rounded-3xl overflow-hidden border border-purple-500/10 hover:border-purple-500/40 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-purple-500/30"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                    opacity: 0,
                  }}
                >
                  {/* Image Section */}
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10" />
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute top-4 right-4 z-20">
                      
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-7 space-y-4">
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <User size={14} className="text-purple-400" />
                        <span className="font-medium">{article.postedBy}</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-gray-600" />
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-purple-400" />
                        <span>{getReadingTime(article.content)} min read</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {article.preview}
                    </p>

                    <a
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-300 transition-all duration-300 group/link mt-2"
                    >
                      Read Article
                      <svg
                        className="w-4 h-4 transition-transform group-hover/link:translate-x-1.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </div>

                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/5 to-transparent" />
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                <Search size={32} className="text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                No articles found
              </h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search terms or browse all articles
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold text-white transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Back Button */}
          <div className="flex justify-center">
            <button
              onClick={handleBack}
              className="group flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl font-bold text-white shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 border border-purple-400/20"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1.5" />
              Back to Home
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>
    </>
  );
}