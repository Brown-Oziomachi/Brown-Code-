"use client"
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Database,
  Layers,
  MessageCircle,
  Send,
} from "lucide-react";

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showContactIcons, setShowContactIcons] = useState(false);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        timestamp: new Date().toLocaleString(),
        sender: "visitor",
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const clearMessages = () => {
    if (window.confirm("Are you sure you want to clear all messages?")) {
      setMessages([]);
      localStorage.removeItem("chatMessages");
    }
  };

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
      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/95 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {"<Dev />"}
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {["home", "about", "projects", "skills", "contact"].map(
                  (item) => (
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
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {["home", "about", "projects", "skills", "contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="capitalize block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </nav>

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
              My name is Brown Oziomachi Adiele. I'm a passionate full stack web
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
            href="mailto:your.email@example.com"
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

      {/* Floating Contact Icons */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Contact Options */}
          {showContactIcons && (
            <div className="absolute bottom-20 right-0 flex flex-col gap-3 mb-2">
              {/* WhatsApp */}
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full shadow-lg hover:scale-110 transition-transform animate-fade-in"
                title="WhatsApp"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>

              {/* Email */}
              <a
                href="mailto:your.email@example.com"
                className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full shadow-lg hover:scale-110 transition-transform animate-fade-in"
                title="Email"
              >
                <Mail className="w-6 h-6 text-white" />
              </a>

              {/* Platform Chat */}
              <button
                onClick={() => {
                  setIsChatOpen(true);
                  setShowContactIcons(false);
                }}
                className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full shadow-lg hover:scale-110 transition-transform animate-fade-in"
                title="Chat on Platform"
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </button>
            </div>
          )}

          {/* Main Contact Button */}
          <button
            onClick={() => setShowContactIcons(!showContactIcons)}
            className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all"
          >
            {showContactIcons ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <MessageCircle className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-slate-900 rounded-2xl shadow-2xl z-50 flex flex-col border border-purple-500/50">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Chat with Brown</h3>
                <p className="text-xs text-white/80">
                  I'll get back to you soon!
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 mt-20">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="flex flex-col">
                  <div className="bg-purple-600 text-white rounded-2xl rounded-br-sm px-4 py-2 max-w-[80%] self-end">
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 self-end">
                    {msg.timestamp}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-slate-700"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-slate-800 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full p-2 hover:shadow-lg transition-all"
              >
                <Send size={20} />
              </button>
            </div>
          </form>

          {/* Clear Messages Button */}
          <div className="px-4 pb-3 flex justify-between items-center">
            <span className="text-xs text-green-400">
              ✓ Messages Brown Code
            </span>
            <button
              onClick={clearMessages}
              className="text-xs text-red-400 hover:text-red-300 underline"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
