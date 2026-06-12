"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { AlertTriangle, CheckCircle, Check, CheckCheck, ArrowLeft, MoreVertical, Phone, Video, Info } from "lucide-react";

export default function PortfolioScamChecker() {
    const router = useRouter();

    // Navbar & System Interactions State
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("scam-checker");

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        router.push(`/#${sectionId}`);
    };

    // Chat Message Mock Schema
    const chatLog = [
        { from: "developer", text: "Hey! I'd love to build your website. It's going to be amazing! 🚀", time: "11:24 AM", isRedFlag: false },
        { from: "client", text: "That sounds great! Can I see some of your previous work?", time: "11:26 AM", isRedFlag: false },
        { from: "developer", text: "My portfolio is still being updated. But trust me, I'm really good! I've done tons of projects.", time: "11:27 AM", isRedFlag: false },
        { from: "client", text: "Okay, what's your process? How do we get started?", time: "11:30 AM", isRedFlag: false },
        { from: "developer", text: "I need the full payment of $5,000 upfront before I start. That's how I work. 💰", time: "11:31 AM", isRedFlag: true },
        { from: "client", text: "That seems like a lot upfront. Can we do payments in stages? Like 30% now, 40% halfway, 30% when done?", time: "11:35 AM", isRedFlag: false },
        { from: "developer", text: "No, I don't work that way. I need full payment first. If you don't trust me, maybe we shouldn't work together. 🤷‍♂️", time: "11:36 AM", isRedFlag: true },
        { from: "client", text: "Can you at least show me a contract or timeline of what you'll deliver?", time: "11:39 AM", isRedFlag: false },
        { from: "developer", text: "We can figure out details later. But I need the money first. I have other clients waiting, so decide fast! ⏰", time: "11:40 AM", isRedFlag: true }
    ];

    return (
        <div className="bg-[#111b21] min-h-screen text-[#e9edef] antialiased">
            {/* Global Base Layout Sync Header */}
            <Navbar
                isScrolled={isScrolled}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                activeSection={activeSection}
                scrollToSection={scrollToSection}
            />

            {/* Content Container Window */}
            <div className="max-w-3xl mx-auto px-4 pt-28 pb-16">

                {/* Introduction Header Banner */}
                <div className="text-center mb-8">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#00a884] bg-[#00a884]/10 px-3 py-1 rounded-full border border-[#00a884]/20">
                        Security Awareness Pipeline
                    </span>
                    <h1 className="text-3xl font-black tracking-tight mt-3 text-[#e9edef]">
                        Developer Scam Checker
                    </h1>
                    <p className="text-xs text-[#8696a0] max-w-md mx-auto mt-2 leading-relaxed">
                        Analysing communication signatures and structural red flags to protect your engineering investments.
                    </p>
                </div>

                {/* WHATSAPP PHONE FRAME CONTAINER */}
                <div className="rounded-2xl border border-[#222e35] shadow-2xl overflow-hidden bg-[#0b141a] flex flex-col h-[650px]">

                    {/* WhatsApp Top Application Bar */}
                    <div className="bg-[#202c33] px-3 py-2.5 flex items-center justify-between select-none border-b border-[#222e35]">
                        <div className="flex items-center gap-2">
                            <ArrowLeft size={18} className="text-[#aebac1] cursor-pointer" />
                            <div className="relative">
                                <div className="bg-[#65a30d] w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white">
                                    SD
                                </div>
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#00e676] border-2 border-[#202c33] rounded-full"></span>
                            </div>
                            <div className="pl-1">
                                <h3 className="text-sm font-bold text-[#e9edef] leading-tight">Shady Developer</h3>
                                <span className="text-[11px] text-[#00a884] block">online</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 text-[#aebac1]">
                            <Video size={18} className="cursor-pointer hover:text-[#e9edef]" />
                            <Phone size={16} className="cursor-pointer hover:text-[#e9edef]" />
                            <MoreVertical size={18} className="cursor-pointer hover:text-[#e9edef]" />
                        </div>
                    </div>

                    {/* WhatsApp Dynamic Scrolling Chat Feed Canvas */}
                    <div
                        className="flex-1 overflow-y-auto p-4 space-y-3.5 relative"
                        style={{
                            backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
                            backgroundBlendMode: "overlay",
                            backgroundColor: "#0b141a"
                        }}
                    >
                        {/* WhatsApp Encrypted Security Alert Flag */}
                        <div className="flex justify-center my-2">
                            <span className="bg-[#182229] border border-[#222e35] text-[#ffd279] text-[11px] px-3 py-1.5 rounded-lg max-w-sm text-center shadow-sm flex items-start gap-1.5 leading-normal">
                                <Info size={14} className="shrink-0 mt-0.5" />
                                Messages and calls are end-to-end encrypted. No one outside of this chat can read them, not even WhatsApp.
                            </span>
                        </div>

                        {/* Thread Mapping */}
                        {chatLog.map((msg, i) => {
                            const isClient = msg.from === "client";
                            return (
                                <div
                                    key={i}
                                    className={`flex ${isClient ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[75%] px-3 py-1.5 rounded-lg text-sm shadow-md relative group transition-all ${isClient
                                                ? "bg-[#005c4b] text-[#e9edef] rounded-tr-none"
                                                : msg.isRedFlag
                                                    ? "bg-[#3b1919] border border-red-900 text-[#f9bcbc] rounded-tl-none animate-pulse"
                                                    : "bg-[#202c33] text-[#e9edef] rounded-tl-none"
                                            }`}
                                    >
                                        {/* Danger Flag Alert Tag */}
                                        {!isClient && msg.isRedFlag && (
                                            <span className="text-[9px] uppercase tracking-wider font-mono font-black text-red-400 block mb-1">
                                                🚨 [Risk Variable Detected]
                                            </span>
                                        )}

                                        <p className="whitespace-pre-wrap break-words pr-12 text-[13.5px]">
                                            {msg.text}
                                        </p>

                                        {/* Timestamp Layout Block */}
                                        <div className="absolute bottom-1 right-2 flex items-center gap-1 select-none">
                                            <span className="text-[9px] text-[#8696a0]">
                                                {msg.time}
                                            </span>
                                            {isClient && (
                                                <CheckCheck size={13} className="text-[#53bdeb]" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* WhatsApp Mock Input Footer Utility */}
                    <div className="bg-[#202c33] p-2.5 flex items-center gap-2 select-none border-t border-[#222e35]">
                        <div className="flex-1 bg-[#2a3942] rounded-lg px-3 py-2 text-xs text-[#8696a0] flex items-center">
                            Chat sequence locked for forensic analysis...
                        </div>
                        <div className="bg-[#00a884] w-9 h-9 rounded-full flex items-center justify-center text-white shadow-md">
                            🔒
                        </div>
                    </div>
                </div>

                {/* CRITICAL STRUCTURAL RISK EVALUATION SCHEMATICS */}
                <div className="grid md:grid-cols-2 gap-4 mt-8">

                    {/* Red Flags Container */}
                    <div className="bg-[#182229] border border-red-500/20 rounded-xl p-5 shadow-lg">
                        <div className="flex items-center gap-2 mb-3 border-b border-[#222e35] pb-2">
                            <AlertTriangle className="text-red-500" size={20} />
                            <h4 className="text-sm font-black text-red-400 uppercase tracking-wider">🚩 Execution Red Flags</h4>
                        </div>
                        <ul className="space-y-2 text-xs text-[#8696a0]">
                            <li className="flex items-start gap-2"><span className="text-red-500 font-bold">✗</span> Missing active portfolio or live software URLs</li>
                            <li className="flex items-start gap-2"><span className="text-red-500 font-bold">✗</span> Insisting on full upfront budget allocation</li>
                            <li className="flex items-start gap-2"><span className="text-red-500 font-bold">✗</span> Rejecting milestones or private sandbox tests</li>
                            <li className="flex items-start gap-2"><span className="text-red-500 font-bold">✗</span> Absence of signed operational agreements</li>
                            <li className="flex items-start gap-2"><span className="text-red-500 font-bold">✗</span> Instigating synthetic timeline panic loops</li>
                        </ul>
                    </div>

                    {/* Green Flags Container */}
                    <div className="bg-[#182229] border border-[#00a884]/20 rounded-xl p-5 shadow-lg">
                        <div className="flex items-center gap-2 mb-3 border-b border-[#222e35] pb-2">
                            <CheckCircle className="text-[#00a884]" size={20} />
                            <h4 className="text-sm font-black text-[#00a884] uppercase tracking-wider">✅ Professional Baselines</h4>
                        </div>
                        <ul className="space-y-2 text-xs text-[#8696a0]">
                            <li className="flex items-start gap-2"><span className="text-[#00a884] font-bold">✓</span> Provision of verified live deployment builds</li>
                            <li className="flex items-start gap-2"><span className="text-[#00a884] font-bold">✓</span> Structural staging pipelines with split funding</li>
                            <li className="flex items-start gap-2"><span className="text-[#00a884] font-bold">✓</span> Explicit, legally valid delivery agreements</li>
                            <li className="flex items-start gap-2"><span className="text-[#00a884] font-bold">✓</span> Clear milestone schedules and tracking updates</li>
                            <li className="flex items-start gap-2"><span className="text-[#00a884] font-bold">✓</span> Objective, transparent scoping communication</li>
                        </ul>
                    </div>
                </div>

                {/* Final Diagnostic Warning Banner */}
                <div className="bg-[#182229] border-l-4 border-yellow-500 rounded-r-xl p-5 mt-4 shadow-md">
                    <div className="flex gap-3">
                        <span className="text-xl shrink-0 select-none">⚠️</span>
                        <div>
                            <h4 className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-wider">System Resolution Guidance</h4>
                            <p className="text-xs text-[#8696a0] mt-1.5 leading-relaxed">
                                Elite engineering partners prioritize accountability. They will naturally walk you through staging links, structure detailed contracts, and organize transparent milestone funding. If a contact attempts to force financial settlement without providing technical validation, protect your capital resources.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Clean Structural Footer Action Alignment */}
                <div className="mt-12 text-center pt-6 border-t border-[#222e35]">
                    <p className="text-[11px] font-mono text-[#8696a0]">
                        Need to sync with a verified production node?
                    </p>
                    <div className="mt-4">
                        <Link
                            href="https://browncode.name.ng"
                            className="inline-block bg-[#202c33] hover:bg-[#2a3942] border border-[#222e35] text-[#e9edef] text-xs font-bold font-mono tracking-wider px-6 py-2.5 rounded-lg transition-all"
                        >
                            // Access Secure Main Portfolio
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}