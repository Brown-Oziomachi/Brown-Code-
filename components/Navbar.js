// Navbar.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Home,
  Briefcase,
  Clock,
  GraduationCap,
  Newspaper,
  Globe,
  TrendingUp,
} from "lucide-react";

export default function Navbar({
  isScrolled,
  isMenuOpen,
  setIsMenuOpen,
  activeSection,
  scrollToSection,
}) {
  const [isJobOpen, setIsJobOpen] = useState(false);
  const [isJobOpenMobile, setIsJobOpenMobile] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [isNewsOpenMobile, setIsNewsOpenMobile] = useState(false);
  const newsRef = useRef(null);
  const jobRef = useRef(null);

  const navItems = [
    "home",
    "about",
    "projects",
    "skills",
    "contact",
    "testimonials",
    "blog",
  ];

  const jobOptions = [
    {
      title: "JobCopilot (Auto Apply)",
      description:
        "AI-powered job applications - Apply to hundreds of jobs automatically",
      icon: <Sparkles size={20} className="text-purple-400" />,
      href: "https://jobcopilot.com/?linkId=lp_494205&sourceId=brown-oziomachi&tenantId=jobcopilot",
      external: true,
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "FinalRound AI",
      description:
        "FinalRoundAI excels in preparing job seekers for the final stages of the hiring process",
      icon: <Home size={20} className="text-blue-400" />,
      href: "https://www.finalroundai.com/?via=browncode",
      external: true,
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Purchase a domain at HostAfrica",
      description: "Find the perfect domain for your business!",
      icon: <Briefcase size={24} className="text-green-400" />,
      href: "https://my.hostafrica.com/aff.php?aff=2657",
      external: true,
      gradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      title: "eSkilled",
      description: "AI Course Creator - Your Powerful Online Course Maker",
      icon: <Clock size={24} className="text-orange-400" />,
      href: "https://aicoursecreator.eskilled.io/?fpr=brown99",
      external: true,
      gradient: "from-orange-500/20 to-amber-500/20",
    },
    {
      title: "Prove your knowledge | Answer questions and earn money",
      description: "Launch your career with hands-on learning experiences",
      icon: <GraduationCap size={20} className="text-indigo-400" />,
      href: "https://www.swagbucks.com/p/register?rb=202240461&rp=1",
      external: true,
      gradient: "from-indigo-500/20 to-purple-500/20",
    },
  ];

  const newsOptions = [
    {
      title: "Politics News",
      description: "Navigate the world of governance, elections, secret deals, and politicalmaneuvers that influence global direction. See what lies behind the decisions made in your name",
      icon: <Sparkles size={20} className="text-blue-400" />,
      href: "https://cyclopedia-media-hub.vercel.app/politics",
      gradient: "from-blue-500/20 to-cyan-500/20",
      category: "technology",
    },
    {
      title: "Religion News",
      description: "Explore ancient scriptures, divine mysteries, and the role of religionin shaping societies and ideologies. A closer look at beliefs that unite — and divide — billions.",
      icon: <TrendingUp size={20} className="text-green-400" />,
      href: "https://cyclopedia-media-hub.vercel.app/religion",
      gradient: "from-green-500/20 to-emerald-500/20",
      category: "business",
    },
    {
      title: "World News",
      description: "Global events and international updates",
      icon: <Globe size={20} className="text-purple-400" />,
      href: "https://cyclopedia-media-hub.vercel.app/global",
      gradient: "from-purple-500/20 to-pink-500/20",
      category: "general",
    },
  ];

  const JobCard = ({ job, onClick }) => {
    const content = (
      <div
        className={`group relative p-6 rounded-xl bg-gradient-to-br ${job.gradient} hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-gray-600 h-full`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 p-3 bg-slate-800/50 rounded-lg">
              {job.icon}
            </div>
            <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
              {job.title}
            </h3>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            {job.description}
          </p>
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
      </div>
    );

    if (job.external) {
      return (
        <a
          href={job.href}
          target="_self"
          rel="noopener noreferrer"
          onClick={onClick}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={job.href} onClick={onClick}>
        {content}
      </Link>
    );
  };

  const NewsCard = ({ news, onClick }) => {
    return (
      <Link href={news.href} onClick={onClick}>
        <div
          className={`group relative p-6 rounded-xl bg-gradient-to-br ${news.gradient} hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-gray-600 h-full`}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 p-3 bg-slate-800/50 rounded-lg">
                {news.icon}
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                {news.title}
              </h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {news.description}
            </p>
          </div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300" />
        </div>
      </Link>
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (jobRef.current && !jobRef.current.contains(event.target)) {
        setIsJobOpen(false)
      }
    };
    if (isJobOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isJobOpen])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (newsRef.current && !newsRef.current.contains(event.target)) {
        setIsNewsOpen(false)
      }
    }
    if (isNewsOpen) {
     document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isNewsOpen])
  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {"<BROWN CODE />"}
            </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) =>
                item === "blog" ? (
                  <Link
                    key={item}
                    href="/blog"
                    className={`capitalize px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === item
                        ? "text-purple-400"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item}
                  </Link>
                ) : (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === item
                        ? "text-purple-400"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}

              {/* Desktop Find Job Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsJobOpen(!isJobOpen);
                    setIsNewsOpen(false);
                  }}
                  className="capitalize px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-300 hover:text-white flex items-center gap-1"
                >
                  Find Job{" "}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${
                      isJobOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Desktop Read News Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsNewsOpen(!isNewsOpen);
                    setIsJobOpen(false);
                  }}
                  className="capitalize px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-300 hover:text-white flex items-center gap-1"
                >
                  <Newspaper size={16} className="mr-1" />
                  News{" "}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${
                      isNewsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Right Side (Menu + Find Job + News) */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Find Job */}
            <button
              onClick={() => {
                setIsJobOpenMobile(!isJobOpenMobile);
                setIsNewsOpenMobile(false);
              }}
              className="capitalize px-2 py-2 rounded-md text-xs font-medium text-gray-300 hover:text-white flex items-center gap-1"
            >
              Jobs{" "}
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${
                  isJobOpenMobile ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Mobile Read News */}
            <button
              onClick={() => {
                setIsNewsOpenMobile(!isNewsOpenMobile);
                setIsJobOpenMobile(false);
              }}
              className="capitalize px-2 py-2 rounded-md text-xs font-medium text-gray-300 hover:text-white flex items-center gap-1"
            >
              <Newspaper size={14} />
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${
                  isNewsOpenMobile ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer (other nav items) */}
      {isMenuOpen && (
        <div
          className="md:hidden bg-slate-900/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) =>
              item === "blog" ? (
                <Link
                  key={item}
                  href="/blog"
                  onClick={() => setIsMenuOpen(false)}
                  className="capitalize block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  {item}
                </Link>
              ) : (
                <button
                  key={item}
                  onClick={() => {
                    scrollToSection(item);
                    setIsMenuOpen(false);
                  }}
                  className="capitalize block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* Full Screen Desktop Job Dropdown */}
      {isJobOpen && (
        <div
        ref={jobRef}
          className="hidden md:block fixed inset-x-0 top-16 bg-slate-900/98 backdrop-blur-lg border-t border-gray-700/50 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Find Your Next Opportunity
              </h2>
              <p className="text-gray-400">
                Explore various job options tailored to your career goals
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobOptions.map((job, index) => (
                <JobCard
                  key={index}
                  job={job}
                  onClick={() => setIsJobOpen(false)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Desktop News Dropdown */}
      {isNewsOpen && (
        <div
          ref={newsRef}
          className="hidden md:block fixed inset-x-0 top-16 bg-slate-900/98 backdrop-blur-lg border-t border-gray-700/50 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                Stay Informed
              </h2>
              <p className="text-gray-400">
                Read the latest news from around the world
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsOptions.map((news, index) => (
                <NewsCard
                  key={index}
                  news={news}
                  onClick={() => setIsNewsOpen(false)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Mobile Job Dropdown */}
      {isJobOpenMobile && (
        <div className="md:hidden fixed inset-0 top-16 bg-slate-900/98 backdrop-blur-lg overflow-y-auto z-50">
          <div className="px-4 py-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Find Your Next Opportunity
              </h2>
              <p className="text-gray-400 text-sm">
                Explore various job options tailored to your career goals
              </p>
            </div>
            <div className="space-y-4">
              {jobOptions.map((job, index) => (
                <JobCard
                  key={index}
                  job={job}
                  onClick={() => setIsJobOpenMobile(false)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Mobile News Dropdown */}
      {isNewsOpenMobile && (
        <div
          className="md:hidden fixed inset-0 top-16 bg-slate-900/98 backdrop-blur-lg overflow-y-auto z-50">
          <div className="px-4 py-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                Stay Informed
              </h2>
              <p className="text-gray-400 text-sm">
                Read the latest news from around the world
              </p>
            </div>
            <div className="space-y-4">
              {newsOptions.map((news, index) => (
                <NewsCard
                  key={index}
                  news={news}
                  onClick={() => setIsNewsOpenMobile(false)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}