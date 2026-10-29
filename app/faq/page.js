"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MessageCircle, Mail, Plus, Minus } from "lucide-react";
import Footer from "@/components/footer";

const WHATSAPP = "2348142995114";
const EMAIL = "browncemmanuel@gmail.com";

const groups = [
    {
        title: "About me and this site",
        items: [
            {
                question: "Who is Sir Brown AD?",
                answer: "Brown Oziomachi AD, known as Sir Brown AD, is a full stack developer and publisher based in Abuja, Nigeria. Through browncode.name.ng he builds fast, modern and responsive web applications and websites for businesses and brands, and writes about web security and fraud awareness.",
            },
            {
                question: "What is the purpose of browncode.name.ng?",
                answer: "It is the official portfolio and publishing hub for Brown Code. It showcases production projects, hosts the blog and tech news, and carries the sponsored-article packages and custom web tools built by Brown.",
            },
            {
                question: "What is the Forensic Scam Checker tool?",
                answer: "The Forensic Scam Checker is a web tool built to help people check suspicious details and patterns before they pay or share information, so they can avoid online scams. It is a guide to help you decide, not a guarantee that something is safe or unsafe.",
            },
            {
                question: "Why do you have location pages like 'Web Developer Abuja'?",
                answer: "Those pages help clients in Abuja, Nigeria and across Africa find local, high-quality software development services when they search on Google.",
            },
        ],
    },
    {
        title: "Working with me",
        items: [
            {
                question: "How long does it take to build and launch a website?",
                answer: "Starter websites take about 2 to 3 weeks. Standard business websites take 4 to 7 weeks. Custom, feature-heavy platforms take 1 to 3 months, depending on design complexity and API integrations. Timelines also depend on how quickly you send content and feedback.",
            },
            {
                question: "Will my website work on mobile phones?",
                answer: "Yes. Responsive design is a core standard. Every layout is built to adapt to smartphones, tablets and desktop computers.",
            },
            {
                question: "Do you build full e-commerce websites?",
                answer: "Yes. I build complete online stores with product catalogues, carts, secure checkout flows, admin dashboards and integrated payment gateways, including Flutterwave.",
            },
            {
                question: "What technology stack do you use?",
                answer: "Next.js, React, Nuxt, Vue, Tailwind CSS, JavaScript, Node.js, Firebase, PostgreSQL and Vercel hosting.",
            },
            {
                question: "Do you provide hosting and domain names?",
                answer: "I handle the code, building and deployment. You buy your domain name and hosting account directly, so you keep full legal ownership of your digital property.",
            },
            {
                question: "How do I get in touch to start a project?",
                answer: "Use the contact page at browncode.name.ng/bc/contact, message me on WhatsApp, or book a free call. Tell me your goals and timeline, and I reply within 24 hours.",
            },
        ],
    },
    {
        title: "Pricing and payment",
        items: [
            {
                question: "Do you require an upfront payment?",
                answer: "Yes. I work on a 50/50 milestone basis: 50% upfront to secure development time and start the work, and the remaining 50% on completion and your approval.",
            },
            {
                question: "Do you offer website maintenance and support?",
                answer: "Yes. Monthly support plans start from ₦15,000 per month. They cover keeping your site updated, monitoring for bugs and making sure everything keeps running smoothly.",
            },
        ],
    },
    {
        title: "Sponsored articles",
        items: [
            {
                question: "What is a sponsored article?",
                answer: "I write and publish a clearly labelled article about your business on this site. It stays live for 1, 3 or 6 months, then is removed. You do not write anything. Packages start at ₦25,000 and are listed on the advertise page.",
            },
            {
                question: "Can you guarantee my article will rank first on Google?",
                answer: "No one honestly can. The article is published on an indexed domain and optimized for your keywords, but search rankings depend on many factors outside anyone's control.",
            },
        ],
    },
];

const allFaqs = groups.flatMap((g) => g.items);

export default function FAQPage() {
    const [openKey, setOpenKey] = useState(null);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: allFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

                .faq-page {
                    --paper: #ffffff; --paper-2: #f6f5f0;
                    --ink: #111111; --ink-2: #3f3f3f; --ink-3: #6f6f6f;
                    --rule: #e4e2da; --rule-dark: #111111;
                    --accent: #e8ff47; --on-accent: #0a0a0b;
                    --serif: 'Playfair Display', Georgia, serif;
                    --sans: 'Inter', system-ui, sans-serif;
                    --mono: 'JetBrains Mono', 'Fira Code', monospace;
                    background: var(--paper); color: var(--ink); font-family: var(--sans); min-height: 100vh;
                }
                .faq-page *, .faq-page *::before, .faq-page *::after { box-sizing: border-box; }
                .faq-page h1, .faq-page h2, .faq-page h3, .faq-page p { margin: 0; }
                :where(.faq-page a) { color: inherit; text-decoration: none; }
                .faq-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }

                .faq-nav { position: sticky; top: 0; z-index: 1000; background: rgba(255,255,255,0.92); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); border-bottom: 1px solid var(--rule); }
                .faq-nav__inner { max-width: 1120px; margin: 0 auto; padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
                .faq-nav__brand { font-family: var(--serif); font-weight: 800; font-size: 21px; letter-spacing: -0.01em; }
                .faq-nav__brand em { font-style: normal; background: var(--accent); padding: 0 3px; }

                .faq-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-family: var(--mono); font-size: 11.5px; letter-spacing: 0.06em; padding: 12px 18px; border: 1.5px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; transition: background 0.15s, color 0.15s, transform 0.15s; }
                .faq-btn:hover { background: var(--ink); color: #fff; transform: translateY(-1px); }
                .faq-btn--solid { background: var(--accent); color: var(--on-accent); font-weight: 600; }
                .faq-btn--solid:hover { background: var(--ink); color: var(--accent); }
                .faq-btn--sm { padding: 8px 14px; font-size: 11px; }

                .faq-head { padding: 64px 0 40px; }
                .faq-kicker { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; background: var(--accent); color: var(--on-accent); padding: 4px 10px; width: fit-content; margin-bottom: 20px; }
                .faq-title { font-family: var(--serif); font-weight: 800; font-size: clamp(38px, 6.4vw, 76px); line-height: 1.02; letter-spacing: -0.025em; }
                .faq-title em { font-style: italic; background: linear-gradient(transparent 62%, var(--accent) 62%); }
                .faq-dek { margin-top: 20px; max-width: 580px; font-size: clamp(15px, 1.6vw, 18px); line-height: 1.7; font-weight: 300; color: var(--ink-2); }

                .faq-grid { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.6fr); gap: 56px; align-items: start; padding-bottom: 24px; }
                @media (max-width: 900px) { .faq-grid { grid-template-columns: minmax(0, 1fr); gap: 40px; } }

                .faq-group { margin-bottom: 44px; }
                .faq-group__title { font-family: var(--serif); font-weight: 800; font-size: 24px; padding-top: 10px; border-top: 3px solid var(--ink); margin-bottom: 4px; }
                .faq-list { border-bottom: 1px solid var(--rule); }
                .faq-item { border-top: 1px solid var(--rule); }
                .faq-item:first-child { border-top: none; }
                .faq-q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 20px 0; background: none; border: none; cursor: pointer; text-align: left; font-family: var(--serif); font-weight: 800; font-size: 19px; line-height: 1.3; color: var(--ink); }
                .faq-q:hover .faq-q__text { text-decoration: underline; text-underline-offset: 4px; }
                .faq-q__icon { flex-shrink: 0; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--ink); transition: background 0.15s; }
                .faq-item--open .faq-q__icon { background: var(--accent); }
                .faq-a { padding: 0 48px 22px 0; font-size: 15px; line-height: 1.8; color: var(--ink-2); max-width: 720px; animation: faqIn 0.2s ease; }
                @keyframes faqIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }

                .faq-side { position: sticky; top: 84px; display: flex; flex-direction: column; gap: 16px; }
                @media (max-width: 900px) { .faq-side { position: static; } }
                .faq-card { border: 1.5px solid var(--ink); background: var(--paper-2); padding: 24px; display: flex; flex-direction: column; gap: 12px; align-items: flex-start; box-shadow: 6px 6px 0 var(--accent); }
                .faq-card__kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); }
                .faq-card__title { font-family: var(--serif); font-weight: 800; font-size: 24px; line-height: 1.15; }
                .faq-card__text { font-size: 14px; line-height: 1.7; color: var(--ink-2); }
                .faq-card__actions { display: flex; flex-direction: column; gap: 10px; width: 100%; margin-top: 4px; }
                .faq-card__actions .faq-btn { width: 100%; }

                .faq-cta { margin: 72px 0 0; background: var(--ink); color: #f4f1ea; border-top: 5px solid var(--accent); padding: 40px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
                @media (max-width: 640px) { .faq-cta { padding: 28px 20px; } }
                .faq-cta__title { font-family: var(--serif); font-weight: 800; font-size: clamp(24px, 3.4vw, 34px); line-height: 1.12; margin-bottom: 8px; }
                .faq-cta__sub { font-size: 14px; color: #bdb8ae; line-height: 1.7; max-width: 460px; }
                .faq-cta__actions { display: flex; flex-wrap: wrap; gap: 10px; }
                .faq-cta .faq-btn { border-color: #f4f1ea; color: #f4f1ea; }
                .faq-cta .faq-btn:hover { background: #f4f1ea; color: var(--ink); }
                .faq-cta .faq-btn--solid { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
                .faq-cta .faq-btn--solid:hover { background: #fff; border-color: #fff; color: var(--ink); }
                .faq-end { height: 24px; }

                @media (max-width: 640px) {
                    .faq-wrap, .faq-nav__inner { padding-left: 18px; padding-right: 18px; }
                    .faq-head { padding: 40px 0 28px; }
                    .faq-a { padding-right: 0; }
                    .faq-q { font-size: 17px; }
                }
                .faq-page :focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
                @media (prefers-reduced-motion: reduce) { .faq-page * { transition: none !important; animation: none !important; } }
            `}</style>

            <div className="faq-page">

                <main className="faq-wrap">
                    <header className="faq-head">
                        <p className="faq-kicker">Support</p>
                        <h1 className="faq-title">Questions, <em>answered.</em></h1>
                        <p className="faq-dek">
                            Timelines, pricing, tech stack and how sponsored articles work. If your question is not here, message me.
                        </p>
                    </header>

                    <div className="faq-grid">
                        <div>
                            {groups.map((g, gi) => (
                                <section key={g.title} className="faq-group">
                                    <h2 className="faq-group__title">{g.title}</h2>
                                    <div className="faq-list">
                                        {g.items.map((faq, i) => {
                                            const key = `${gi}-${i}`;
                                            const isOpen = openKey === key;
                                            return (
                                                <div key={key} className={`faq-item${isOpen ? " faq-item--open" : ""}`}>
                                                    <button
                                                        className="faq-q"
                                                        onClick={() => setOpenKey(isOpen ? null : key)}
                                                        aria-expanded={isOpen}
                                                    >
                                                        <span className="faq-q__text">{faq.question}</span>
                                                        <span className="faq-q__icon">
                                                            {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                                                        </span>
                                                    </button>
                                                    {isOpen && <p className="faq-a">{faq.answer}</p>}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>
                            ))}
                        </div>

                        <aside className="faq-side">
                            <div className="faq-card">
                                <p className="faq-card__kicker">Still unsure?</p>
                                <h3 className="faq-card__title">Ask me directly</h3>
                                <p className="faq-card__text">
                                    I reply within 24 hours. You talk to the developer, not an agency.
                                </p>
                                <div className="faq-card__actions">
                                    <a
                                        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Sir Brown, I have a question about your services.")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="faq-btn faq-btn--solid"
                                    >
                                        <MessageCircle size={14} /> Chat on WhatsApp
                                    </a>
                                    <a href={`mailto:${EMAIL}`} className="faq-btn">
                                        <Mail size={14} /> Send an email
                                    </a>
                                </div>
                            </div>
                        </aside>
                    </div>

                    <section className="faq-cta">
                        <div>
                            <h2 className="faq-cta__title">Ready to start your project?</h2>
                            <p className="faq-cta__sub">Tell me what you need and I will reply with a plan, a timeline and a price.</p>
                        </div>
                        <div className="faq-cta__actions">
                            <Link href="/bc/contact" className="faq-btn faq-btn--solid">
                                Start a project <ArrowRight size={13} />
                            </Link>
                            <Link href="/advertise" className="faq-btn">Sponsored articles</Link>
                        </div>
                    </section>
                    <div className="faq-end" />
                </main>

                <Footer />
            </div>
        </>
    );
}