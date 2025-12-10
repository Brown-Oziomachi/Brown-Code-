"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    {
        id: 4,
        title: "Portfolio Website",
        description: "Modern portfolio solution with dynamic content management, SEO optimization, and analytics integration.",
        image: "/cd.jpg",
        link: "https://browncode.name.ng",
        // github: "https://github.com/yourusername/portfolio",
        tags: ["Next.js", "TypeScript", "SEO"],
        year: "2024",
        role: "Full Stack Developer"
    },
    {
        id: 5,
        title: "Cyclopedia Editor App",
        description: "Content management system with rich text editing, collaborative features, and version control for editorial workflows.",
        image: "/ed.jpg",
        // github: "https://github.com/yourusername/cyclopedia-editor",
        tags: ["CMS", "Real-time Collab", "TypeScript"],
        year: "2024",
        role: "Technical Lead"
    },
];

export default function ProjectsPage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("blog");
    const router = useRouter();
    
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
    
    return (
        <>
         <Navbar
            isScrolled={isScrolled}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
        />
        <div className="min-h-screen bg-zinc-950 text-zinc-100 py-20 ">
            {/* Header */}
            <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
                                Projects Portfolio
                            </h1>
                            <p className="text-sm text-zinc-400 mt-1">
                                {projects.length} Production Applications
                            </p>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-zinc-400">
                            <span className="hidden sm:inline">Full Stack Web Developer</span>
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                <a
                                    href="https://wa.me/2347013725529"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-400 transition-colors cursor-pointer"
                                >
                                    Available
                                </a>
                            </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-16">
                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
                        <div className="text-3xl font-bold text-zinc-100 mb-1">{projects.length}</div>
                        <div className="text-sm text-zinc-400">Projects Delivered</div>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
                        <div className="text-3xl font-bold text-zinc-100 mb-1">90%</div>
                        <div className="text-sm text-zinc-400">Client Satisfaction</div>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
                        <div className="text-3xl font-bold text-zinc-100 mb-1">2</div>
                        <div className="text-sm text-zinc-400">Years Experience</div>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
                        <div className="text-3xl font-bold text-zinc-100 mb-1">24/7</div>
                        <div className="text-sm text-zinc-400">System Uptime</div>
                    </div>
                </div>

                {/* Projects Grid */}
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
                                                {/* {project.github && (
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
                                                )} */}
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

                {/* Footer CTA */}
                <div className="mt-20 text-center">
                    <div className="inline-flex flex-col items-center gap-4 p-8 bg-zinc-900/30 border border-zinc-800 rounded-xl">
                        <h3 className="text-xl font-semibold text-zinc-100">
                            Interested in working together?
                        </h3>
                        <p className="text-sm text-zinc-400 max-w-md">
                            I'm currently available for freelance projects and full-time opportunities.
                        </p>
                        <button className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-medium transition-all">
                          <Link href="/contact">Get in Touch</Link>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </main>
            </div>
        </>

    );
}