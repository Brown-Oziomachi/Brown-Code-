"use client";

import { useRouter } from "next/navigation";
import { articles } from "../data/article";
import { ArrowLeft, Clock, User, Search, Terminal, Cpu, Database, Binary } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "@/components/footer";

export default function BlogList() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Categorize articles
  const architectureArticles = articles.filter(a =>
    ['why-you-need-a-website', 'importance-of-a-personal-portfolio', 'why-branding-matters-online', 'future-proofing-your-career-online'].includes(a.slug)
  );

  const engineeringArticles = articles.filter(a =>
    ['how-to-build-your-first-website', 'seo-fundamentals-getting-found', 'content-marketing-personal-brands', 'networking-digital-era'].includes(a.slug)
  );

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setIsSearching(true);

      let filtered = articles;

      if (selectedCategory === 'architecture') {
        filtered = architectureArticles;
      } else if (selectedCategory === 'engineering') {
        filtered = engineeringArticles;
      }

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

  const handleBack = () => {
    router.push("/portfolio");
  };


  const getReadingTime = (content) => {
    const words = content.split(" ").length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const getCategoryBadge = (slug) => {
    if (architectureArticles.some(a => a.slug === slug)) {
      return { label: "System Architecture", color: "border-cyan-500/30 text-cyan-400 bg-cyan-950/30" };
    }
    if (engineeringArticles.some(a => a.slug === slug)) {
      return { label: "Core Engineering", color: "border-emerald-500/30 text-emerald-400 bg-emerald-950/30" };
    }
    return { label: "Documentation", color: "border-slate-700 text-slate-400 bg-slate-900/40" };
  };

  return (
    <>
      {/* Top Navigation Frame */}
      <nav className="relative z-10 border-b border-slate-800/80 bg-[#090d16]/80 backdrop-blur-md sticky top-0 z-[9999]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 group">
            <Terminal size={18} className="text-cyan-400 group-hover:rotate-6 transition-transform" />
            <a href="/">
              <span className="text-sm font-bold text-white tracking-wider uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                BROWN_CODE_DEV // technical_logs
              </span>
            </a>
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

      <section className="min-h-screen bg-[#030712] text-slate-100 pt-32 pb-20 px-4 md:px-8 lg:px-12 font-mono selection:bg-cyan-500/30 selection:text-cyan-200">
        <div className="max-w-7xl mx-auto">

          {/* Developer / Engineering Header Section */}
          <div className="relative w-full rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-md overflow-hidden p-6 md:p-12 shadow-2xl mb-12">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none hidden md:block">
              <Binary size={240} />
            </div>

            <div className="relative z-10 max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 text-cyan-400 text-xs px-4 py-1.5 rounded-md tracking-wider uppercase mb-6">
                <Terminal size={14} className="animate-pulse" />
                stdout // technical_logs
              </div>

              <h1 className="text-2xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
                ENGINEERING_<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">INSIGHTS</span>
              </h1>

              <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed font-sans">
                Deep dives into systems architecture, production grade compilation structures, digital infrastructure optimization, and cleaner design patterns.
              </p>
            </div>
          </div>

          {/* Technical Filter Pipeline */}
          <div className="flex flex-wrap items-center justify-start gap-3 mb-10 border-b border-slate-900 pb-6 text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex items-center gap-2 px-4 py-2 border rounded-md transition-all duration-200 ${selectedCategory === 'all'
                ? 'bg-cyan-950/40 border-cyan-500 text-cyan-400 shadow-sm'
                : 'bg-transparent border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
            >
              <Cpu size={14} />
              ALL_MODULES()
            </button>

            <button
              onClick={() => setSelectedCategory('architecture')}
              className={`flex items-center gap-2 px-4 py-2 border rounded-md transition-all duration-200 ${selectedCategory === 'architecture'
                ? 'bg-cyan-950/40 border-cyan-500 text-cyan-400 shadow-sm'
                : 'bg-transparent border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
            >
              <Database size={14} />
              SYS_ARCH
            </button>

            <button
              onClick={() => setSelectedCategory('tech')}
              className={`flex items-center gap-2 px-4 py-2 border rounded-md transition-all duration-200 ${selectedCategory === 'tech'
                ? 'bg-cyan-950/40 border-cyan-500 text-cyan-400 shadow-sm'
                : 'bg-transparent border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
            >
              <Terminal size={14} />
              CORE_ENG
            </button>
          </div>

          {/* CLI Search Shell */}
          <div className="max-w-3xl mb-16">
            <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-lg focus-within:border-cyan-500/50 transition-all duration-200">
              <span className="pl-4 text-cyan-500 select-none text-xs font-bold">$ grep -ri</span>
              <input
                type="text"
                placeholder="search queries or technical parameters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent pl-3 pr-16 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
                >
                  [ESC]
                </button>
              )}
            </div>

            {searchTerm && (
              <div className="mt-2 text-left pl-1">
                <p className="text-slate-500 text-xs">
                  {isSearching ? (
                    "Analyzing records..."
                  ) : (
                    <>
                      Query returned <span className="text-emerald-400">{filteredArticles.length}</span> matching matrix blocks
                    </>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Dev Node/Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredArticles.map((article, index) => {
                const badge = getCategoryBadge(article.slug);
                return (
                  <a
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group flex flex-col justify-between bg-slate-950/40 border border-slate-900 rounded-xl overflow-hidden hover:border-cyan-500/40 transition-all duration-300"
                    style={{
                      animationName: "fadeInUp",
                      animationDuration: "0.4s",
                      animationTimingFunction: "ease-out",
                      animationFillMode: "forwards",
                      animationDelay: `${index * 50}ms`,
                      opacity: 0,
                    }}
                  >
                    <div className="p-6">
                      {/* Meta Node Classification */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-[10px] uppercase px-2 py-0.5 rounded border ${badge.color}`}>
                          {badge.label}
                        </span>
                        <span className="text-[10px] text-slate-600">ID: {article.slug.slice(0, 7)}</span>
                      </div>

                      {/* Technical Title */}
                      <h3 className="text-white text-lg font-bold leading-snug mb-3 group-hover:text-cyan-400 transition-colors duration-200">
                        {article.title}
                      </h3>

                      {/* Abstract / Preview */}
                      <p className="text-slate-400 text-xs font-sans leading-relaxed line-clamp-3 mb-4">
                        {article.preview}
                      </p>
                    </div>

                    {/* Node Footer metrics */}
                    <div className="px-6 py-4 border-t border-slate-900/60 bg-slate-950/60 flex items-center justify-between text-[11px] text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <User size={12} className="text-slate-600" />
                        <span className="text-slate-400">{article.postedBy}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-slate-600" />
                        <span>EST_TIME: {getReadingTime(article.content)}m</span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="border border-dashed border-slate-800 rounded-xl p-12 text-center max-w-xl mx-auto my-12">
              <Terminal size={24} className="text-rose-500 mx-auto mb-4" />
              <h3 className="text-sm font-bold text-slate-300 mb-2">ERR_NO_MATCHING_RECORDS</h3>
              <p className="text-xs text-slate-500 font-sans mb-4">
                The evaluation engine returned 0 records matching your terminal filter parameter strings.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="text-xs text-cyan-400 hover:underline"
              >
                Reset filter configurations
              </button>
            </div>
          )}

          {/* Navigation Matrix controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 pt-8 border-t border-slate-900">
            <button
              onClick={() => router.push("/bc/contact")}
              className="w-full sm:w-auto px-6 py-3 border border-cyan-500 text-cyan-400 bg-cyan-950/10 hover:bg-cyan-500 hover:text-black transition-all duration-200 rounded-md text-xs font-bold uppercase tracking-wider"
            >
              INITIALIZE_CONTACT
            </button>

            <button
              onClick={handleBack}
              className="w-full sm:w-auto group flex items-center justify-center gap-2 px-6 py-3 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-200 rounded-md text-xs uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              RETURN_TO_BASE
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        <Footer />
      </section>
    </>
  );
}