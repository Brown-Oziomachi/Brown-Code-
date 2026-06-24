"use client";

import { useState } from "react";
import { ChevronDown, ArrowLeft } from "lucide-react";
import Footer from "@/components/footer";

const faqs = [
    {
        question: "Who is Brown Oziomachi?",
        answer: "Brown Oziomachi is a professional Full-Stack Software Developer based in Nigeria. Operating through browncode.name.ng, he specialises in writing clean code to build fast, modern, and highly responsive web applications and websites for businesses and brands.",
    },
    {
        question: "What is the purpose of browncode.name.ng?",
        answer: "It is the official portfolio and hub for Brown Code. The platform showcases production-ready projects, personal development blogs, regional SEO landing pages, and custom web tools built by Brown.",
    },
    {
        question: "What is the Forensic Scam Checker tool?",
        answer: "The Forensic Scam Checker is a custom web application built to help users verify transaction authenticity and check suspicious details or metadata patterns to avoid online scams.",
    },
    {
        question: "How long does it take to build and launch a website?",
        answer: "Starter websites take 2–3 weeks. Standard business websites take 4–7 weeks. Custom, feature-heavy web platforms take 1–3 months depending on design complexity and API integrations.",
    },
    {
        question: "Why do you have specific location pages like 'Web Developer Abuja'?",
        answer: "Those are targeted SEO nodes designed to help clients in Abuja, Nigeria, and across Africa easily discover local, high-quality software development services when searching on Google.",
    },
    {
        question: "Do you require an upfront payment?",
        answer: "Yes. I work on a standard 50/50 milestone framework: a 50% upfront payment is required to secure development time and launch the coding sprints, and the remaining 50% is due upon completion and your approval.",
    },
    {
        question: "Do you offer website maintenance and support?",
        answer: "Yes. I offer monthly website support plans starting from ₦15,000 per month to keep your site updated, monitor performance bugs, and ensure everything continues running smoothly.",
    },
    {
        question: "Will my website work on mobile phones?",
        answer: "Absolutely. Responsive design is a core standard. Every line of code is written to ensure the layout adapts beautifully to smartphones, tablets, and desktop computers alike.",
    },
    {
        question: "Do you build full e-commerce websites?",
        answer: "Yes. I build complete online stores equipped with product catalogues, shopping carts, secure checkout flows, admin dashboards, and integrated local payment gateways.",
    },
    {
        question: "Do you provide hosting and domain names?",
        answer: "I handle the code, building, and deployment process entirely. However, you will purchase your domain name and hosting account directly so that you maintain 100% legal ownership of your digital property.",
    },
    {
        question: "What technology stack do you use?",
        answer: "I specialise in modern web development technologies including Next.js, React, Tailwind CSS, JavaScript, Node.js, Firebase, PostgreSQL, and Vercel hosting.",
    },
    {
        question: "How do I get in touch to start a project?",
        answer: "Head over to browncode.name.ng/bc/contact to submit your project requirements, goals, and desired timeline so we can get started.",
    },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <>
            <style>{`
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                :root {
                    --bg:         #0a0a0b;
                    --surface:    #111113;
                    --border:     #1e1e22;
                    --border-hi:  #2e2e34;
                    --text-1:     #f4f4f5;
                    --text-2:     #a1a1aa;
                    --text-3:     #52525b;
                    --accent:     #e8ff47;
                    --accent-dim: rgba(232,255,71,0.08);
                    --radius:     6px;
                    --font-serif: 'DM Serif Display', 'Georgia', serif;
                    --font-sans:  'Inter', system-ui, sans-serif;
                    --font-mono:  'JetBrains Mono', 'Fira Code', monospace;
                }
                @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

                .faq-page { font-family: var(--font-sans); background: var(--bg); color: var(--text-1); min-height: 100vh; }

                .faq-nav {
                    position: sticky; top: 0; z-index: 100;
                    background: rgba(10,10,11,0.92); backdrop-filter: blur(12px);
                    border-bottom: 1px solid var(--border);
                    padding: 0 24px; height: 56px;
                    display: flex; align-items: center; justify-content: space-between;
                }
                .faq-nav__brand { font-family: var(--font-mono); font-size: 12px; font-weight: 500; letter-spacing: 0.08em; color: var(--text-1); text-decoration: none; }
                .faq-nav__brand em { font-style: normal; color: var(--accent); }
                .faq-nav__back {
                    display: inline-flex; align-items: center; gap: 6px;
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    color: var(--text-2); text-decoration: none;
                    padding: 6px 12px; border: 1px solid var(--border); border-radius: var(--radius);
                    transition: color .15s, border-color .15s, background .15s;
                }
                .faq-nav__back:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }

                .faq-main { max-width: 800px; margin: 0 auto; padding: 0 24px 80px; }

                .faq-masthead {
                    display: flex; align-items: flex-end; justify-content: space-between;
                    gap: 16px; padding: 52px 0 32px;
                    border-bottom: 1px solid var(--border); margin-bottom: 36px;
                }
                .faq-masthead__eyebrow {
                    font-family: var(--font-mono); font-size: 11px; color: var(--accent);
                    letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px;
                }
                .faq-masthead__title {
                    font-family: var(--font-serif);
                    font-size: clamp(36px, 5vw, 60px); font-weight: 400; line-height: 1.05;
                }
                .faq-masthead__desc {
                    font-size: 13px; color: var(--text-2); line-height: 1.6;
                    max-width: 280px; text-align: right;
                }
                @media (max-width: 600px) {
                    .faq-masthead { flex-direction: column; align-items: flex-start; }
                    .faq-masthead__desc { text-align: left; }
                }

                .faq-section-label {
                    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em;
                    text-transform: uppercase; color: var(--text-3);
                    display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
                }
                .faq-section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }

                .faq-list {
                    display: flex; flex-direction: column;
                    gap: 1px; background: var(--border);
                    border: 1px solid var(--border); border-radius: var(--radius);
                    overflow: hidden; margin-bottom: 48px;
                }

                .faq-item {
                    background: var(--surface); overflow: hidden;
                    position: relative; transition: background .15s;
                }
                .faq-item:hover { background: #141417; }
                .faq-item::before {
                    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
                    background: var(--accent); transform: scaleY(0); transform-origin: bottom;
                    transition: transform .2s ease; pointer-events: none;
                }
                .faq-item:hover::before,
                .faq-item--open::before { transform: scaleY(1); }

                .faq-item__btn {
                    width: 100%; display: flex; align-items: center; justify-content: space-between;
                    gap: 16px; padding: 20px 24px; background: none; border: none;
                    cursor: pointer; text-align: left;
                }

                .faq-item__question {
                    font-family: var(--font-serif); font-size: 16px; font-weight: 400;
                    color: var(--text-1); line-height: 1.35;
                    transition: color .15s;
                }
                .faq-item:hover .faq-item__question,
                .faq-item--open .faq-item__question { color: #fff; }

                .faq-item__chevron {
                    flex-shrink: 0; color: var(--text-3);
                    transition: transform .25s ease, color .15s;
                }
                .faq-item--open .faq-item__chevron { transform: rotate(180deg); color: var(--accent); }

                .faq-item__answer {
                    padding: 0 24px 20px 24px; padding-left: 40px;
                    font-size: 14px; color: var(--text-2); line-height: 1.7;
                    border-left: 2px solid var(--border); margin-left: 24px;
                    animation: faqFadeIn .2s ease;
                }
                @keyframes faqFadeIn {
                    from { opacity: 0; transform: translateY(-4px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .faq-footer {
                    display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
                    gap: 12px; padding-top: 40px; margin-top: 48px; border-top: 1px solid var(--border);
                }
                .faq-footer__info { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); letter-spacing: 0.06em; }

                .faq-btn {
                    display: inline-flex; align-items: center; gap: 6px;
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    padding: 8px 16px; border: 1px solid var(--border); border-radius: var(--radius);
                    background: transparent; color: var(--text-2); text-decoration: none; cursor: pointer;
                    transition: color .15s, border-color .15s, background .15s;
                }
                .faq-btn:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }
                .faq-btn--accent {
                    border-color: rgba(232,255,71,0.3); color: var(--accent); background: var(--accent-dim);
                }
                .faq-btn--accent:hover { background: rgba(232,255,71,0.15); border-color: rgba(232,255,71,0.5); color: var(--accent); }
            `}</style>

            <div className="faq-page">
                <nav className="faq-nav">
                    <a href="/" className="faq-nav__brand">brown<em>.</em>dev</a>
                    <a href="/" className="faq-nav__back"><ArrowLeft size={13} /> Home</a>
                </nav>

                <main className="faq-main">
                    <header className="faq-masthead">
                        <div>
                            <p className="faq-masthead__eyebrow">Support</p>
                            <h1 className="faq-masthead__title">
                                Frequently<br />Asked
                            </h1>
                        </div>
                        <p className="faq-masthead__desc">
                            Common questions about timelines, pricing, tech stack, and how Brown Code operates.
                        </p>
                    </header>

                    <p className="faq-section-label">{faqs.length} questions</p>
                    <div className="faq-list">
                        {faqs.map((faq, i) => {
                            const isOpen = openIndex === i;
                            return (
                                <div key={i} className={`faq-item${isOpen ? " faq-item--open" : ""}`}>
                                    <button
                                        className="faq-item__btn"
                                        onClick={() => setOpenIndex(isOpen ? null : i)}
                                        aria-expanded={isOpen}
                                    >
                                        <span className="faq-item__question">{faq.question}</span>
                                        <ChevronDown size={16} className="faq-item__chevron" />
                                    </button>
                                    {isOpen && (
                                        <p className="faq-item__answer">{faq.answer}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <footer className="faq-footer">
                        <span className="faq-footer__info">brown.dev — frequently asked</span>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <a href="/bc/contact" className="faq-btn faq-btn--accent">Get in touch</a>
                            <a href="/" className="faq-btn"><ArrowLeft size={13} /> Home</a>
                        </div>
                    </footer>
                </main>
            </div>
            <Footer />
        </>
    );
}