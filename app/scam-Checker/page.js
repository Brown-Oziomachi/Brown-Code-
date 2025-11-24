"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { AlertTriangle, CheckCircle } from "lucide-react";

export default function PortfolioScamChecker() {
    // Navbar state
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("portfolioScam");

    // Scroll listener for navbar effect
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Navbar */}
            <Navbar
                isScrolled={isScrolled}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                activeSection={activeSection}
            />

            {/* Main Content */}
            <div className="min-h-screen bg-black text-white p-4 md:p-8 pt-32">
                <div className="max-w-4xl mx-auto">
                    {/* Title */}
                    <div className="text-center mb-8 lg:not-first:mt-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                            🤔 Beware of Scam?
                        </h2>
                    </div>

                    {/* Story Setup */}
                    <div className="bg-gradient-to-br from-slate-900/80 to-purple-900/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 mb-8 shadow-2xl border border-purple-500/30">
                        <p className="text-gray-300 text-lg leading-relaxed">
                            A business owner contacted a{" "}
                            <span className="font-bold text-purple-400">developer</span> online,
                            excited about getting a professional website and portfolio. They both
                            expressed enthusiasm to work together, but the developer started making
                            demands such as{" "}
                            <span className="font-semibold text-red-500">
                                full payment upfront and refusing to show previous work
                            </span>
                            . Should the business owner trust all their money to someone who hasn't
                            proven their capabilities yet?
                        </p>
                    </div>

                    {/* Case Study */}
                    <div className="mb-8">
                        <h3 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                            The Conversation 💬
                        </h3>

                        {/* Chat Container */}
                        <div className="space-y-6">
                            {[
                                { from: "developer", text: "Hey! I'd love to build your website. It's going to be amazing! 🚀", isRedFlag: false },
                                { from: "client", text: "That sounds great! Can I see some of your previous work?", isRedFlag: false },
                                { from: "developer", text: "My portfolio is still being updated. But trust me, I'm really good! I've done tons of projects.", isRedFlag: false },
                                { from: "client", text: "Okay, what's your process? How do we get started?", isRedFlag: false },
                                { from: "developer", text: "I need the full payment of $5,000 upfront before I start. That's how I work. 💰", isRedFlag: true },
                                { from: "client", text: "That seems like a lot upfront. Can we do payments in stages? Like 30% now, 40% halfway, 30% when done?", isRedFlag: false },
                                { from: "developer", text: "No, I don't work that way. I need full payment first. If you don't trust me, maybe we shouldn't work together. 🤷‍♂️", isRedFlag: true },
                                { from: "client", text: "Can you at least show me a contract or timeline of what you'll deliver?", isRedFlag: false },
                                { from: "developer", text: "We can figure out details later. But I need the money first. I have other clients waiting, so decide fast! ⏰", isRedFlag: true },
                            ].map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex items-start gap-3 ${msg.from === "client" ? "justify-end" : ""}`}
                                >
                                    {msg.from === "developer" && (
                                        <div className="bg-purple-500 rounded-full w-12 h-12 flex items-center justify-center text-2xl flex-shrink-0">
                                            👨‍💻
                                        </div>
                                    )}

                                    <div
                                        className={`p-4 shadow-md max-w-md rounded-2xl ${msg.from === "client"
                                                ? "bg-purple-700 text-white rounded-tr-none"
                                                : msg.isRedFlag
                                                    ? "bg-red-100 border-2 border-red-500 text-gray-800 rounded-tl-none"
                                                    : "bg-slate-800 text-gray-300 rounded-tl-none"
                                            }`}
                                    >
                                        <p className="font-medium mb-1">
                                            {msg.from === "client" ? "Business Owner" : "Shady Developer"}
                                        </p>
                                        <p>{msg.text}</p>
                                    </div>

                                    {msg.from === "client" && (
                                        <div className="bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center text-2xl flex-shrink-0">
                                            👨‍💼
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Analysis Section */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* Red Flags */}
                        <div className="bg-red-900/20 border-2 border-red-500 rounded-3xl p-6 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <AlertTriangle className="text-red-500" size={32} />
                                <h4 className="text-2xl font-bold text-red-400">🚩 Red Flags</h4>
                            </div>
                            <ul className="space-y-3 text-gray-200">
                                <li>✗ No portfolio or examples of work</li>
                                <li>✗ Demanding 100% payment upfront</li>
                                <li>✗ Refusing milestone payments</li>
                                <li>✗ No contract or clear timeline</li>
                                <li>✗ Creating pressure to decide quickly</li>
                                <li>✗ Using guilt or threats to get money</li>
                            </ul>
                        </div>

                        {/* Green Flags */}
                        <div className="bg-green-900/20 border-2 border-green-500 rounded-3xl p-6 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <CheckCircle className="text-green-500" size={32} />
                                <h4 className="text-2xl font-bold text-green-400">✅ Good Signs</h4>
                            </div>
                            <ul className="space-y-3 text-gray-200">
                                <li>✓ Shows real portfolio examples</li>
                                <li>✓ Offers payment in stages/milestones</li>
                                <li>✓ Provides detailed contract</li>
                                <li>✓ Clear timeline and deliverables</li>
                                <li>✓ Has reviews or testimonials</li>
                                <li>✓ Professional communication</li>
                            </ul>
                        </div>
                    </div>

                    {/* Final Warning */}
                    <div className="bg-yellow-900/20 border-2 border-yellow-500 rounded-3xl p-6 md:p-8 text-center shadow-lg">
                        <p className="text-2xl font-bold text-yellow-400 mb-3">⚠️ Remember This:</p>
                        <p className="text-lg text-gray-200 leading-relaxed">
                            A legitimate professional will{" "}
                            <span className="font-bold text-green-400">ALWAYS</span> show you their work,
                            provide a contract, and offer reasonable payment terms. If someone pressures
                            you for full payment upfront without proof of their skills, that's a{" "}
                            <span className="font-bold text-red-500">MAJOR RED FLAG</span>. Trust your
                            instincts and protect your money!
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
