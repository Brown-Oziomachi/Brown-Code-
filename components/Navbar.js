// Navbar.jsx
"use client";

import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar({
  isScrolled,
  isMenuOpen,
  setIsMenuOpen,
  activeSection,
  scrollToSection,
}) {
  const navItems = [
    "home",
    "about",
    "projects",
    "skills",
    "contact",
    "testimonials",
    "blog",
  ];

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
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {"<BROWN CODE />"}
            </span>
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
    </nav>
  );
}
