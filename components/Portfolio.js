"use client";
import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Database,
  Layers,
  Monitor,
  Star,
  ArrowRight,
} from "lucide-react";
import Navbar from "./Navbar";
import FloatingContact from "./FloatingContact";
import FirebaseChat from "./FirebaseChat";
import Testimonials from "./Testimonials";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // media carousel (keeps your media list and timing)
  const mediaList = [
    // { type: "image", src: "/bc.png" },
    // { type: "image", src: "/brown.png" },
    // { type: "image", src: "/brocode.png" },
    { type: "video", src: "/videologo.mp4" },
  ];

  useEffect(() => {
    // popup after 10s once per visitor
    const hasSeenPopup = localStorage.getItem("jobsPopupSeen");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        localStorage.setItem("jobsPopupSeen", "true");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % mediaList.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentMedia = mediaList[currentIndex];

  // Projects (you can expand)
  const projects = [
    {
      id: 1,
      title: "Cyclopedia News Website",
      description: "Enterprise news platform featuring real-time content delivery, advanced filtering algorithms, and multimedia integration with optimized video streaming.",
      image: "/the.jpg",
      link: "https://www.thecyclopedia.com.ng",
      // github: "https://github.com/yourusername/cyclopedia",
      tags: ["Next.js", "React", "Video Streaming"],
      year: "2024",
      role: "Full Stack Developer"
    },
    {
      id: 2,
      title: "E-Commerce Store/Yotapoint",
      description: "Scalable e-commerce solution with secure payment integration, inventory management system, and comprehensive admin dashboard.",
      image: "/yota.jpg",
      link: "https://yotapoint.com/feeds",
      // github: "https://github.com/yourusername/yotapoint",
      tags: ["E-Commerce", "Payment Gateway", "Admin Panel"],
      year: "2024",
      role: "Lead Developer"
    },
    {
      id: 3,
      title: "IJ Stitches Portfolio",
      description: "Performance-optimized portfolio with advanced animations, accessibility compliance, and responsive design architecture.",
      image: "/ijs.jpg",
      link: "https://ij-stitches.vercel.app/main",
      // github: "https://github.com/yourusername/ij-stitches",
      tags: ["React", "GSAP", "Performance"],
      year: "2024",
      role: "Frontend Architect"
    },
  ];

  const skills = {
    frontend: [
      { name: "HTML", pct: 95 },
      { name: "CSS", pct: 92 },
      { name: "JavaScript", pct: 90 },
      { name: "React / Next.js", pct: 92 },
      { name: "Tailwind CSS", pct: 90 },
    ],
    backend: [
      { name: "Node.js", pct: 85 },
    ],
    database: [
      { name: "Firebase", pct: 90 },
      { name: "MongoDB", pct: 82 },
      { name: "MySQL", pct: 75 },
    ],
    tools: [
      { name: "Git", pct: 92 },
      { name: "Vercel", pct: 88 },
    ],
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-pink-400/40 selection:text-slate-900">
      <Navbar
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      {/* MAIN HERO (big, bold, image-first, neon accents) */}
      <section
        id="home"
        className="min-h-screen flex items-center px-6 pt-16 pb-12"
        aria-label="Hero"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-3 bg-slate-800/30 backdrop-blur rounded-full px-4 py-2 ring-1 ring-purple-600/30">
              <Star className="text-pink-400" size={18} />
              <span className="text-sm text-purple-200 font-medium">
                Full Stack Developer • React / Next.js
              </span>
            </div>
            <img src="/cod2.png" alt="Profile" className="relative w-150 lg:h-200 h-200 object-cover shadow-2xl" />

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Brown Oziomachi —{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Crafting scalable & striking web apps
              </span>
            </h1>

            <p className="text-lg text-gray-300 max-w-2xl">
              I build performant, maintainable web apps with thoughtful UX.
              From prototypes to production — modern stack, strong architecture,
              and delightful UI.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("projects")}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 font-semibold shadow-lg hover:scale-105 transform transition"
              >
                View Projects
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="px-6 py-3 rounded-full border-2 border-purple-400/40 hover:bg-purple-400/10 transition"
              >
                Let's roll
              </button>

              <a
                href="/cv"
                className="px-6 py-3 rounded-full border-2 border-pink-400/30 hover:bg-pink-400/10 transition inline-flex items-center gap-2"
              >
                Resume
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Small neon badges (futuristic) */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-700/30 to-pink-700/20 text-sm text-purple-200 ring-1 ring-purple-600/20">
                Remote-friendly
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800/40 text-sm text-pink-200 ring-1 ring-pink-600/20">
                Available for hire
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800/40 text-sm text-blue-200 ring-1 ring-blue-500/10">
                Shipping MVPs fast
              </span>
            </div>
          </div>

          {/* Right: Image / video carousel with glass card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-800/60 bg-gradient-to-tr from-slate-900/30 to-slate-800/20 p-1">
              <div className="bg-gradient-to-br from-slate-900/90 via-purple-900/60 to-transparent rounded-3xl overflow-hidden">
                <div className="relative h-96 w-full">
                  {currentMedia.type === "image" ? (
                    <img
                      src={currentMedia.src}
                      alt="Hero media"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={currentMedia.src}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                    />
                  )}

                  {/* Neon frame */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl mix-blend-screen">
                    <div className="absolute inset-0 border-2 border-transparent rounded-3xl"
                      style={{
                        boxShadow:
                          "0 10px 30px rgba(138, 92, 255, 0.12), inset 0 1px 0 rgba(255,255,255,0.02)",
                      }}
                    />
                  </div>

                  {/* Media overlay info */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4">
                    <div className="bg-black/50 backdrop-blur px-3 py-1 rounded-full text-sm text-gray-200">
                      <span className="font-medium">Currently: </span>
                      {currentMedia.type === "image" ? "Portfolio image" : "Project clip"}
                    </div>
                    <div className="flex gap-2">
                      <a
                        href="https://github.com/Brown-Oziomachi"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full bg-slate-800/40 hover:scale-110 transition transform"
                        aria-label="Github"
                      >
                        <Github size={18} />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/brownoziomachi72a5a3229"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full bg-slate-800/40 hover:scale-110 transition transform"
                        aria-label="LinkedIn"
                      >
                        <Linkedin size={18} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* subtle tech list below media */}
                <div className="p-4 flex flex-wrap gap-2 bg-slate-900/60">
                  <span className="px-3 py-1 rounded-full bg-purple-600/20 text-sm text-purple-200">React</span>
                  <span className="px-3 py-1 rounded-full bg-pink-600/20 text-sm text-pink-200">Next.js</span>
                  <span className="px-3 py-1 rounded-full bg-blue-600/20 text-sm text-blue-200">Firebase</span>
                </div>
              </div>
            </div>

            {/* subtle CTA bar */}
            <div className="mt-4 flex gap-3 items-center">
              <a
                href="/contact"
                className="px-4 py-2 rounded-full bg-purple-600/80 hover:scale-105 transform transition inline-flex items-center gap-2"
              >
                <Mail size={16} /> Let's talk
              </a>
              <a
                href="/banner"
                className="px-4 py-2 rounded-full border border-slate-700 hover:bg-slate-800/40 transition"
              >
                Show banner
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT (glass card + read more) */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">About Me</h2>
          <div className="bg-slate-800/40 backdrop-blur rounded-2xl p-8 shadow-xl border border-slate-800/30">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="flex-shrink-0">
                <div className="relative group">
                  <div className="absolute -inset-1 blur opacity-80 bg-gradient-to-r from-purple-600 to-pink-500 transform -translate-x-1 -translate-y-1 group-hover:scale-105 transition" />
                  <img src="/soft.png" alt="Profile" className="relative w-90 lg:h-100 h-130 object-cover border-4 border-slate-800 shadow-2xl" />
                </div>
              </div>

              <div className="flex-1">
                <p className="text-gray-300 mb-4">
                  I'm Brown Oziomachi — a full stack developer who focuses on
                  building scalable web apps with clean UX and maintainable code.
                </p>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                </div>

                <button onClick={() => setIsExpanded(!isExpanded)} className="mt-4 inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition font-medium">
                  {isExpanded ? <>Show Less <ChevronUp size={18} />
                  <div><a href="/about">MORE ABOUT ME</a></div>
                  </> : <>Read More <ChevronDown size={18} /></>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS (grid with mixed styles + tilt hover) */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Projects</h2>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className="group bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-300 z-0"
              >
                <div className="grid md:grid-cols-5 gap-0 z-0">
                  {/* Image */}
                  <div className="md:col-span-2 relative h-64 md:h-auto overflow-hidden bg-zinc-900 z-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 to-transparent"></div>

                    {/* Project Number */}
                    <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-zinc-950/90 border border-zinc-700 flex items-center justify-center">
                      <span className="text-lg font-mono text-zinc-400">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-3 p-8 flex flex-col justify-between">
                    <div>
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4">
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {project.role}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {project.year}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h2 className="text-2xl font-semibold text-zinc-100 mb-3 group-hover:text-white transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-zinc-400 leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium bg-zinc-800/50 text-zinc-300 rounded border border-zinc-700/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center gap-4 mt-8">
                      {project.link ? (
                        <>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-sm font-medium transition-all"
                          >
                            View Live Site
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </>
                      ) : (
                        <>
                          {project.github ? (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 hover:bg-zinc-800 text-zinc-300 text-sm font-medium transition-all"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                              </svg>
                              View Code
                            </a>
                          ) : (
                            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-500 text-sm font-medium">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              Under NDA
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex gap-3 items-center justify-center mt-10">
            <Link href="/projects">
              <h1 className="text-center text-purple-400 cursor-pointer">Show Me More</h1>
            </Link>
            <ArrowRight className="text-purple-400"/>
          </div>
        </div>
      </section>

      {/* SKILLS (professional — progress bars + cards) */}
      <section id="skills" className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Technical Skills</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 rounded-2xl p-6 shadow">
              <div className="flex items-center gap-3 mb-4">
                <Code size={26} className="text-purple-400" />
                <h3 className="text-xl font-bold">Frontend</h3>
              </div>
              <div className="space-y-3">
                {skills.frontend.map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm text-gray-300 mb-1">
                      <span>{s.name}</span>
                      <span>{s.pct}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 shadow">
              <div className="flex items-center gap-3 mb-4">
                <Layers size={26} className="text-pink-400" />
                <h3 className="text-xl font-bold">Backend</h3>
              </div>
              <div className="space-y-3">
                {skills.backend.map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm text-gray-300 mb-1">
                      <span>{s.name}</span>
                      <span>{s.pct}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 shadow">
              <div className="flex items-center gap-3 mb-4">
                <Database size={26} className="text-blue-400" />
                <h3 className="text-xl font-bold">Databases & Tools</h3>
              </div>

              <div className="space-y-3">
                {skills.database.concat(skills.tools).map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm text-gray-300 mb-1">
                      <span>{s.name}</span>
                      <span>{s.pct}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-400" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOBS / CTA (hero-like background) */}
      <section id="jobs" className="py-20 px-6" style={{
        backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <div className="max-w-4xl mx-auto text-center bg-black/50 p-10 rounded-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-300">Online Jobs & Opportunities</h2>
          <p className="text-gray-200 mb-6">Online jobs are a powerful way to build your career and earn from anywhere in the world. Explore opportunities that match your skills.</p>
          <a href="/jobs" className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 font-semibold hover:scale-105 transform transition">Explore Opportunities</a>
        </div>
      </section>

      <Testimonials />

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-300 mb-8">I'm open to new projects, collaborations, and full-time roles. Let's build something great.</p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <a href="https://github.com/Brown-Oziomachi" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-slate-800/50 hover:bg-purple-600/30 transition"><Github size={24} /></a>
            <a href="https://www.linkedin.com/in/brownoziomachi72a5a3229" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-slate-800/50 hover:bg-purple-600/30 transition"><Linkedin size={24} /></a>
            <a href="mailto:browncemmanuel@gmail.com" className="p-3 rounded-full bg-slate-800/50 hover:bg-purple-600/30 transition"><Mail size={24} /></a>
          </div>

          <a href="/contact" className="inline-block px-10 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 font-semibold hover:scale-105 transform transition">Let's roll</a>
        </div>
      </section>

      {/* POPUP (jobs) */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-white text-slate-900 shadow-2xl">
            <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full">✕</button>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">Online Jobs & Opportunities</h3>
              <p className="text-gray-700 mb-6">Find flexible remote roles and freelance gigs to grow your experience and income.</p>
              <a href="/jobses" className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold">Explore Jobs</a>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-slate-800/40 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400 space-y-2">
          <p>&copy; {new Date().getFullYear()} Brown Code. All rights reserved.</p>
          <p>
            <a
              href="/sitemap-html"
              className="text-purple-400 hover:text-purple-300 underline"
            >
              Sitemap
            </a>
          </p>
        </div>
      </footer>



      {/* Floating contact + Chat */}
      <FloatingContact onChatOpen={() => setIsChatOpen(true)} />
      <FirebaseChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
