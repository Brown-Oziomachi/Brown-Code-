import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/footer";
import NewsletterForm from "@/components/NewsletterForm";
import SocialLinks from "@/components/SocialLinks";

export const metadata = {
    title: "Newsletter | Fraud Alerts, Web Security and Building in Public",
    description:
        "Subscribe to Sir Brown AD's newsletter for fraud and scam awareness, practical web security notes and lessons from shipping real products in Nigeria.",
    alternates: { canonical: "https://browncode.name.ng/newsletter" },
};

const beats = [
    ["Fraud and scam awareness", "How scams work, how to spot them and where to report them in Nigeria, written so anyone can act on it."],
    ["Web security", "Practical notes on securing real apps: access rules, server-side writes, payments and the mistakes that cause breaches."],
    ["Building in public", "What broke in production, how I traced it and what I changed."],
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

.nl-page {
    --paper: #ffffff; --paper-2: #f6f5f0;
    --ink: #111111; --ink-2: #3f3f3f; --ink-3: #6f6f6f;
    --rule: #e4e2da; --rule-dark: #111111;
    --accent: #e8ff47; --on-accent: #0a0a0b;
    --serif: 'Playfair Display', Georgia, serif;
    --sans: 'Inter', system-ui, sans-serif;
    --mono: 'JetBrains Mono', 'Fira Code', monospace;
    background: var(--paper); color: var(--ink); font-family: var(--sans); min-height: 100vh;
}
.nl-page *, .nl-page *::before, .nl-page *::after { box-sizing: border-box; }
.nl-page h1, .nl-page h2, .nl-page h3, .nl-page p { margin: 0; padding: 0; }
:where(.nl-page a) { color: inherit; text-decoration: none; }
.nl-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
.nl-section { padding-top: 88px; }

/* Nav */
.nl-nav { position: sticky; top: 0; z-index: 1000; background: rgba(255,255,255,0.92); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); border-bottom: 1px solid var(--rule); }
.nl-nav__inner { max-width: 1120px; margin: 0 auto; padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.nl-nav__brand { font-family: var(--serif); font-weight: 800; font-size: 21px; letter-spacing: -0.01em; }
.nl-nav__brand em { font-style: normal; background: var(--accent); padding: 0 3px; }
.nl-nav__links { display: flex; align-items: center; gap: 4px; }
.nl-nav__link { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3); padding: 8px 12px; transition: color 0.15s; }
.nl-nav__link:hover, .nl-nav__link--on { color: var(--ink); }
.nl-nav__link--on { box-shadow: inset 0 -3px 0 var(--accent); }
@media (max-width: 700px) { .nl-nav__hide { display: none; } .nl-nav__inner { padding: 0 18px; } }

/* Buttons */
.nl-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-family: var(--mono); font-size: 11.5px; letter-spacing: 0.06em; padding: 14px 22px; border: 1.5px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; transition: background 0.15s, color 0.15s, transform 0.15s; }
.nl-btn:hover { background: var(--ink); color: #fff; transform: translateY(-1px); }
.nl-btn--solid { background: var(--accent); color: var(--on-accent); font-weight: 600; }
.nl-btn--solid:hover { background: var(--ink); color: var(--accent); }
.nl-btn--sm { padding: 9px 14px; }
.nl-btn:disabled { opacity: 0.6; cursor: default; transform: none; }

/* Hero */
.nl-hero { padding-top: 64px; display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); gap: 56px; align-items: center; }
@media (max-width: 880px) { .nl-hero { grid-template-columns: minmax(0, 1fr); gap: 36px; padding-top: 40px; } }
.nl-kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 10px; }
.nl-kicker b { background: var(--accent); color: var(--on-accent); padding: 2px 7px; font-weight: 500; }
.nl-title { font-family: var(--serif); font-weight: 800; font-size: clamp(40px, 7vw, 80px); line-height: 0.98; letter-spacing: -0.03em; }
.nl-title span { background: linear-gradient(transparent 64%, var(--accent) 64%); }
.nl-dek { margin-top: 22px; max-width: 520px; font-size: clamp(16px, 1.7vw, 19px); line-height: 1.7; font-weight: 300; color: var(--ink-2); }

/* Signup card */
.nl-card { background: #fff; border: 1.5px solid var(--ink); border-top: 5px solid var(--accent); box-shadow: 8px 8px 0 var(--accent), 8px 8px 0 1.5px var(--ink); padding: 28px; }
@media (max-width: 880px) { .nl-card { box-shadow: 6px 6px 0 var(--accent), 6px 6px 0 1.5px var(--ink); } }
.nl-card__title { font-family: var(--serif); font-weight: 800; font-size: 24px; line-height: 1.2; margin-bottom: 6px; }
.nl-card__sub { font-size: 14px; line-height: 1.6; color: var(--ink-2); margin-bottom: 20px; }

.nl-form__label { display: block; font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 8px; }
.nl-form__row { display: flex; gap: 10px; flex-wrap: wrap; position: relative; }
.nl-form__input { flex: 1 1 220px; min-width: 0; font-family: var(--sans); font-size: 15px; padding: 13px 14px; border: 1.5px solid var(--ink); background: #fff; color: var(--ink); border-radius: 0; }
.nl-form__input::placeholder { color: var(--ink-3); }
.nl-form__input:focus { outline: 2px solid var(--ink); outline-offset: 2px; background: var(--paper-2); }
.nl-form__trap { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
.nl-form__error { margin-top: 10px; font-size: 13px; color: #b91c1c; }
.nl-form__fine { margin-top: 12px; font-family: var(--mono); font-size: 11px; color: var(--ink-3); }

.nl-done { display: flex; gap: 14px; align-items: flex-start; }
.nl-done__icon { width: 36px; height: 36px; background: var(--accent); border: 1.5px solid var(--ink); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.nl-done strong { font-family: var(--serif); font-weight: 800; font-size: 20px; display: block; margin-bottom: 4px; }
.nl-done p { font-size: 14px; color: var(--ink-2); line-height: 1.6; }

/* Section heads */
.nl-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding-top: 12px; border-top: 3px solid var(--rule-dark); margin-bottom: 28px; }
.nl-h2 { font-family: var(--serif); font-weight: 800; font-size: clamp(28px, 4vw, 40px); line-height: 1.1; letter-spacing: -0.01em; }
.nl-head__note { font-size: 14px; line-height: 1.6; color: var(--ink-2); max-width: 380px; }

/* Beats */
.nl-beats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
@media (max-width: 800px) { .nl-beats { grid-template-columns: 1fr; gap: 20px; } }
.nl-beat { border-top: 3px solid var(--accent); padding-top: 14px; }
.nl-beat h3 { font-family: var(--serif); font-weight: 800; font-size: 20px; line-height: 1.2; margin-bottom: 8px; }
.nl-beat p { font-size: 14px; line-height: 1.7; color: var(--ink-2); }

/* Socials */
.nl-socials { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; }
.nl-social { display: flex; align-items: center; gap: 14px; padding: 16px 18px; background: #fff; border: 1px solid var(--rule); border-radius: 6px; transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s; }
.nl-social:hover { border-color: var(--ink); box-shadow: 4px 4px 0 var(--accent), 4px 4px 0 1px var(--ink); transform: translate(-2px, -2px); }
.nl-social svg { flex-shrink: 0; width: 20px; height: 20px; }
.nl-social .sl-text { display: flex; flex-direction: column; min-width: 0; }
.nl-social .sl-text b { font-family: var(--serif); font-weight: 800; font-size: 16px; }
.nl-social .sl-text small { font-family: var(--mono); font-size: 11px; color: var(--ink-3); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.nl-end { height: 72px; }
@media (max-width: 640px) { .nl-wrap { padding-left: 18px; padding-right: 18px; } .nl-section { padding-top: 64px; } .nl-card { padding: 22px 18px; } }
.nl-page :focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { .nl-page * { transition: none !important; } }
`;

export default function NewsletterPage() {
    return (
        <>
            <style>{CSS}</style>

            <div className="nl-page">
                <header className="nl-nav">
                    <div className="nl-nav__inner">
                        <Link href="/" className="nl-nav__brand">brown<em>.</em>dev</Link>
                        <nav className="nl-nav__links" aria-label="Main">
                            <Link href="/bc/about" className="nl-nav__link nl-nav__hide">About</Link>
                            <Link href="/portfolio" className="nl-nav__link nl-nav__hide">Portfolio</Link>
                            <Link href="/blog" className="nl-nav__link nl-nav__hide">Blog</Link>
                            <Link href="/newsletter" className="nl-nav__link nl-nav__link--on">Newsletter</Link>
                            <Link href="/bc/contact" className="nl-btn nl-btn--solid nl-btn--sm">
                                Start a project <ArrowRight size={12} />
                            </Link>
                        </nav>
                    </div>
                </header>

                <main>
                    {/* Hero + form */}
                    <section className="nl-wrap nl-hero">
                        <div>
                            <div className="nl-kicker"><b>Newsletter</b></div>
                            <h1 className="nl-title">
                                Read it here <span>before it happens to you.</span>
                            </h1>
                            <p className="nl-dek">
                                New articles on fraud and scams, practical web security and what I learn shipping real
                                products in Nigeria, sent to your inbox.
                            </p>
                        </div>

                        <div className="nl-card">
                            <h2 className="nl-card__title">Join the list</h2>
                            <p className="nl-card__sub">Enter your email and I&apos;ll send you new articles as they go up.</p>
                            <NewsletterForm />
                        </div>
                    </section>

                    {/* What you get */}
                    <section className="nl-wrap nl-section">
                        <div className="nl-head">
                            <div>
                                <div className="nl-kicker">What you get</div>
                                <h2 className="nl-h2">Three things I write about</h2>
                            </div>
                        </div>
                        <div className="nl-beats">
                            {beats.map(([title, body]) => (
                                <div key={title} className="nl-beat">
                                    <h3>{title}</h3>
                                    <p>{body}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Socials */}
                    <section className="nl-wrap nl-section">
                        <div className="nl-head">
                            <div>
                                <div className="nl-kicker">Elsewhere</div>
                                <h2 className="nl-h2">Follow me</h2>
                            </div>
                            <p className="nl-head__note">Prefer a different platform? I post on all of these.</p>
                        </div>
                        <div className="nl-socials">
                            <SocialLinks linkClass="nl-social" showLabels size={20} />
                        </div>
                        <div className="nl-end" />
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}