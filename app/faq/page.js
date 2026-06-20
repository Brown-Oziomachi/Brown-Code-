"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Binary, ArrowLeft, Terminal } from "lucide-react";
import Footer from "@/components/footer";

export default function FAQSection() {
    const faqs = [
        {
            question: "Who is Brown Oziomachi?",
            answer: "Brown Oziomachi is a professional Full-Stack Software Developer based in Nigeria. Operating through browncode.name.ng, he specializes in writing clean code to build fast, modern, and highly responsive web applications and websites for businesses and brands.",
        },
        {
            question: "What is the purpose of browncode.name.ng?",
            answer: "It is the official portfolio and hub for BROWN_CODE_DEV. The platform showcases production-ready projects, personal development blogs, regional SEO landing pages, and custom web tools built by Brown.",
        },
        {
            question: "What is the Forensic Scam Checker tool on your platform?",
            answer: "The Forensic Scam Checker (/client/scam-checker) is a custom web application built to help users verify transaction authenticity and check suspicious details or metadata patterns to avoid online scams.",
        },
        {
            question: "How long does it take to build and launch a website?",
            answer: "Starter Websites take 2–3 weeks Standard Business Websites take 4–7 weeks Custom, feature-heavy web platforms take 1–3 months depending on the design complexity and API integrations.",
        },
        {
            question: "Why do you have specific location pages like 'Web Developer Abuja'?",
            answer: "Those are targeted SEO nodes designed to help clients in Abuja, Nigeria, and across Africa easily discover local, high-quality software development services when searching on Google.",
        },
        {
            question: "Do you require an upfront payment for development?",
            answer: "Yes. I work on a standard 50/50 milestone framework: a 50% upfront payment is required to secure development time and launch the coding sprints, and the remaining 50% is due upon completion and your approval.",
        },
        {
            question: "Do you offer website maintenance and support?",
            answer: "Yes. I offer monthly website support plans starting from ₦15,000 per month to keep your site updated, monitor performance bugs, and ensure everything continues running smoothly.",
        },
        {
            question: "Will my website look good and work on mobile phones?",
            answer: "Absolutely. Responsive design is a core standard. Every line of code is written to ensure the layout adapts beautifully to smartphones, tablets, and desktop computers alike.",
        },
        {
            question: "Do you build full e-commerce websites?",
            answer: "Yes. I build complete online stores equipped with product catalogs, shopping carts, secure user checkout flows, administrative dashboards, and integrated local payment gateways.",
        },
        {
            question: "Do you provide the hosting server and domain name?",
            answer: "I handle the code, building, and deployment process entirely. However, you will purchase your domain name and hosting account directly so that you maintain 100% legal ownership of your digital property.",
        },
        {
            question: "What technology stack do you use to write your applications?",
            answer: "I specialize in modern web development technologies including Next.js, React, Tailwind CSS, TypeScript, Node.js, Firebase, PostgreSQL, and Vercel hosting.",
        },
        {
            question: "How do I get in touch to start a project?",
            answer: "You can head over to the Secure Contact page (/bc/contact) on browncode.name.ng to submit your project requirements, goals, and desired timeline so we can get started.",
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
          <nav className="relative z-10 border-b border-slate-800 bg-[#090d16]/80 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Terminal size={18} className="text-cyan-400" />
                        <a href='/'>
                        <span className="text-sm font-bold text-white tracking-wider uppercase">
                                BROWN_CODE_DEV // faq_manifest
                        </span>
                        </a>
                    </div>
                    <a
                        href="/portfolio"
                        className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                    >
                        <ArrowLeft size={14} />
                        <span>SYS.RETURN()</span>
                    </a>
                </div>
            </nav>
        <section className="min-h-screen bg-[#0b0b0f] text-slate-100 antialiased py-24 px-4 md:px-6 relative font-mono selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden">
            {/* Top Concentrated Subtle Cyan Laser Backlight Blur Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none select-none"></div>

            <div className="max-w-4xl mx-auto">

                {/* FAQ Header Section */}
                <header className="relative w-full rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-md overflow-hidden p-6 md:p-10 shadow-2xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none hidden md:block">
                        <Binary size={180} />
                    </div>

                    <div className="relative z-10 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 text-cyan-400 text-xs px-4 py-1.5 rounded-md tracking-wider uppercase mb-4">
                            <HelpCircle size={14} className="animate-pulse" />
                            developer_queries // faq_manifest
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                            FREQUENT_ASKED_<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">QUESTIONS</span>
                        </h1>
                    </div>

                    <p className="relative z-10 text-xs text-slate-400 max-w-xs text-center md:text-right leading-relaxed font-sans">
                        Answering common questions about development capabilities, project timelines, pricing setup, and the browncode.name.ng ecosystem.
                    </p>
                </header>

                {/* FAQ Accordion Grid Node */}
                <div className="space-y-4 max-w-3xl mx-auto">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className="bg-slate-950/40 border border-slate-900 rounded-xl shadow-xl hover:border-slate-800/80 transition-colors duration-300 overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex justify-between items-center text-left p-5 text-xs group transition-all duration-200"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`text-[10px] transition-colors ${isOpen ? "text-cyan-400" : "text-slate-700 group-hover:text-cyan-500/50"}`}>
                                            {isOpen ? "▼" : "└─"}
                                        </span>
                                        <span className={`font-semibold tracking-wider uppercase text-sm transition-colors ${isOpen ? "text-cyan-400" : "text-slate-300 group-hover:text-white"}`}>
                                            {faq.question}
                                        </span>
                                    </div>
                                    <ChevronDown
                                        size={16}
                                        className={`text-slate-500 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-cyan-400" : "group-hover:text-slate-300"}`}
                                    />
                                </button>

                                {isOpen && (
                                    <div className="px-5 pb-5 ml-6 border-l border-slate-900 font-sans text-xs text-slate-400 leading-relaxed max-w-2xl">
                                        <p className="pt-2 border-t border-slate-900/50">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                </div>
                <Footer />
            </section>
        </>

    );
}