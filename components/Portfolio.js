// Portfolio.jsx - Main Component
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
} from "lucide-react";
import Navbar from "./Navbar";
import FloatingContact from "./FloatingContact";
import FirebaseChat from "./FirebaseChat";

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with React, Node.js, and Firebase",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      link: "#",
    },
    {
      title: "The Cyclopedia /News Hub",
      description: "The platform where news are been read",
      tech: ["React", "Next.js", "firebase", "Tailwind CSS"],
      link: "https://cyclopedia-media-hub.vercel.app",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Data visualization platform with interactive charts and reports",
      tech: ["React", "D3.js", "Python", "FastAPI"],
      link: "#",
    },
  ];

  const skills = {
    frontend: ["React", "HTML", "CSS", "Tailwind CSS", "Next.js"],
    backend: ["Node.js", "Python"],
    database: ["PostgreSQL", "MongoDB", "Firebase", "MySQL"],
    tools: ["Git", "Docker", "AWS", "CI/CD", "Webpack"],
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navbar Component */}
      <Navbar
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 pt-16"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Full Stack
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              Developer
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Building scalable web applications with modern technologies
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 border-2 border-purple-400 rounded-full font-semibold hover:bg-purple-400/10 transition-all"
            >
              Contact Me
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            About Me
          </h2>

          {/* Profile Image */}
          <div className="flex justify-center mb-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <img
                src="/man.png"
                alt="Profile"
                className="relative w-48 h-48 rounded-full object-cover border-4 border-slate-800 shadow-2xl"
              />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              My name is Brown Oziomachi. I'm a passionate full stack web
              developer with expertise in building modern, responsive, and
              user-friendly web applications. With a strong foundation in both
              frontend and backend technologies, I create seamless digital
              experiences that solve real-world problems.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              I specialize in JavaScript ecosystems, with extensive experience
              in React, Node.js, and various database technologies. I'm
              committed to writing clean, maintainable code and staying updated
              with the latest industry trends and best practices.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 hover:transform hover:scale-105 transition-all hover:shadow-xl hover:shadow-purple-500/20"
              >
                <h3 className="text-2xl font-bold mb-3 text-purple-400">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-purple-600/20 rounded-full text-sm text-purple-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  View Project <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Code className="text-purple-400" size={28} />
                <h3 className="text-2xl font-bold">Frontend</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.frontend.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-purple-600/20 rounded-lg text-purple-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="text-pink-400" size={28} />
                <h3 className="text-2xl font-bold">Backend</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.backend.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-pink-600/20 rounded-lg text-pink-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Database className="text-blue-400" size={28} />
                <h3 className="text-2xl font-bold">Database</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.database.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-blue-600/20 rounded-lg text-blue-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Code className="text-green-400" size={28} />
                <h3 className="text-2xl font-bold">Tools & DevOps</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.tools.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-green-600/20 rounded-lg text-green-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Get In Touch</h2>
          <p className="text-xl text-gray-300 mb-12">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <div className="flex justify-center gap-6 mb-12">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-slate-800/50 rounded-full hover:bg-purple-600/30 transition-all transform hover:scale-110"
            >
              <Github size={32} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-slate-800/50 rounded-full hover:bg-purple-600/30 transition-all transform hover:scale-110"
            >
              <Linkedin size={32} />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="p-4 bg-slate-800/50 rounded-full hover:bg-purple-600/30 transition-all transform hover:scale-110"
            >
              <Mail size={32} />
            </a>
          </div>
          <a
            href="mailto:browncemmanuel@gmail.com"
            className="inline-block px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105"
          >
            Send Message
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2025 Full Stack Developer. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Contact Icons Component */}
      <FloatingContact onChatOpen={() => setIsChatOpen(true)} />

      {/* Firebase Chat Component */}
      <FirebaseChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
