"use client";

import { useRouter } from "next/navigation";
import { articles } from "../data/article";
import { ArrowLeft, Clock, User, Search, Sparkles, TrendingUp, Code2, Briefcase } from "lucide-react";
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
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Categorize articles
  const businessArticles = articles.filter(a =>
    ['why-you-need-a-website', 'importance-of-a-personal-portfolio', 'why-branding-matters-online', 'future-proofing-your-career-online'].includes(a.slug)
  );

  const techArticles = articles.filter(a =>
    ['how-to-build-your-first-website', 'seo-fundamentals-getting-found', 'content-marketing-personal-brands', 'networking-digital-era'].includes(a.slug)
  );

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setIsSearching(true);

      let filtered = articles;

      // Filter by category first
      if (selectedCategory === 'business') {
        filtered = businessArticles;
      } else if (selectedCategory === 'tech') {
        filtered = techArticles;
      }

      // Then apply search
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter((article) => {
          return (
            article.content.toLowerCase().includes(searchLower) ||
            article.postedBy.toLowerCase().includes(searchLower) ||
            article.title.toLowerCase().includes(searchLower)
          );
        });
      }

      setFilteredArticles(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeOutId);
  }, [searchTerm, selectedCategory]);

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

  const getReadingTime = (content) => {
    const words = content.split(" ").length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const getCategoryBadge = (slug) => {
    if (businessArticles.some(a => a.slug === slug)) {
      return { label: "Business", color: "bg-cyan-400" };
    }
    if (techArticles.some(a => a.slug === slug)) {
      return { label: "Tech", color: "bg-cyan-700" };
    }
    return { label: "General", color: "bg-cyan-900" };
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
        <div className="relative w-full h-[420px] md:h-[500px] lg:h-[550px] rounded-2xl overflow-hidden shadow-2xl">

  {/* Background Image */}
  <img
    src="/image.png"
    alt="Header illustration"
    className="absolute inset-0 w-900 h-full "
  />

  <div className="absolute inset-0 bg-black/70"></div>

  {/* Text Content on Image */}
  <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 max-w-4xl">
    
    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/30 to-cyan-500/30 border border-cyan-800/40 text-white text-sm font-semibold px-6 py-2.5 rounded-full backdrop-blur-sm w-fit">
      <Sparkles size={16} className="text-cyan-300" />
      Knowledge Base
    </div>

    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-cyan-200 to-cyan-900 bg-clip-text text-transparent leading-tight mt-6">
      Build. Learn. Grow.
    </h1>

    <p className="text-gray-200 text-lg md:text-xl max-w-2xl leading-relaxed mt-4">
      Expert insights on web development, digital strategy, and business growth—crafted by developers, for ambitious professionals.
    </p>
  </div>
</div>


          {/* Category Filter */}
          <div className="flex justify-center gap-1 mb-12 text-sm mt-10">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex items-center gap-2 px-2 py-1 rounded-xl font-semibold transition-all duration-300 ${selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-cyan-600 to-cyan-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-slate-900/50 text-gray-400 hover:text-white border border-cyan-500/20 hover:border-cyan-500/40'
                }`}
            >
              <TrendingUp size={18} />
              All Articles
            </button>

            <button
              onClick={() => setSelectedCategory('business')}
              className={`flex items-center gap-2 px-2 py-1 rounded-xl font-semibold transition-all duration-300 ${selectedCategory === 'business'
                  ? 'bg-gradient-to-r from-cyan-900 to-cyan-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-900/50 text-gray-400 hover:text-white border border-purple-500/20 hover:border-purple-500/40'
                }`}
            >
              <Briefcase size={18} />
              Business Growth
            </button>

            <button
              onClick={() => setSelectedCategory('tech')}
              className={`flex items-center gap-2 px-2 py-1 rounded-xl font-semibold transition-all duration-300 ${selectedCategory === 'tech'
                  ? 'bg-gradient-to-r from-cyan-600 to-cyan-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-slate-900/50 text-gray-400 hover:text-white border border-purple-500/20 hover:border-purple-500/40'
                }`}
            >
              <Code2 size={18} />
              Tech Insights
            </button>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-cyan-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative flex items-center">
                <Search className="absolute left-5 w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search articles by title, author, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-4  backdrop-blur-sm border border-cyan-500 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredArticles.map((article, index) => {
                const category = getCategoryBadge(article.slug);
                return (
                  <a
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group relative block rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.06] hover:shadow-2xl hover:shadow-purple-500/20"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "fadeInUp 0.6s ease-out forwards",
                      opacity: 0,
                    }}
                  >
                    {/* Image Background with Overlay */}
                    <div className="relative h-96 overflow-hidden">
                      {/* Background Image */}
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20" />

                      {/* Category Badge - Top Left */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className={`inline-block ${category.color} text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wide shadow-lg`}>
                          {category.label}
                        </span>
                      </div>

                      {/* Content - Bottom Section */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                        {/* Title */}
                        <h3 className="text-white text-xl md:text-2xl font-bold leading-tight mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-cyan-800 group-hover:bg-clip-text transition-all duration-300">
                          {article.title}
                        </h3>

                        {/* Preview Text */}
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 mb-4">
                          {article.preview}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                              <User size={12} className="text-cyan-400" />
                              <span className="font-medium text-cyan-800">{article.postedBy}</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-gray-500" />
                            <div className="flex items-center gap-1.5">
                              <Clock size={12} className="text-cyan-400" />
                              <span>{getReadingTime(article.content)} min</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hover Border Effect */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/50 rounded-2xl transition-all duration-500 pointer-events-none" />
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
                <Search size={32} className="text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                No articles found
              </h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search terms or browse all articles
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-xl font-semibold text-white transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          <button
            onClick={() => router.push("/contact")}
            className="px-8 py-4 mb-10 bg-slate-800/80 hover:bg-slate-700 border border-cyan-500/30 hover:border-cyan-500/50 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
          >
            Let's roll
          </button>

         
          <div className="flex justify-center">
            <button
              onClick={handleBack}
              className="group flex items-center gap-3 px-10 py-4 bg-cyan-900/80 hover:bg-cyan-800 border border-cyan-500/30 hover:border-cyan-500/50 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105"
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