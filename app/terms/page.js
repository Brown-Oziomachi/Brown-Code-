import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";

export const metadata = {
    title: "Terms of Service | Brown Code",
    description: "Review the operational terms, IP scopes, and milestone guidelines of Brown Code.",
    alternates: { canonical: "https://browncode.name.ng/terms" },
};

export default function TermsOfService() {
    const currentYear = new Date().getFullYear();

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

                .tos-page { font-family: var(--font-sans); background: var(--bg); color: var(--text-1); min-height: 100vh; }

                .tos-nav {
                    position: sticky; top: 0; z-index: 100;
                    background: rgba(10,10,11,0.92); backdrop-filter: blur(12px);
                    border-bottom: 1px solid var(--border);
                    padding: 0 24px; height: 56px;
                    display: flex; align-items: center; justify-content: space-between;
                }
                .tos-nav__brand { font-family: var(--font-mono); font-size: 12px; font-weight: 500; letter-spacing: 0.08em; color: var(--text-1); text-decoration: none; }
                .tos-nav__brand em { font-style: normal; color: var(--accent); }
                .tos-nav__back {
                    display: inline-flex; align-items: center; gap: 6px;
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    color: var(--text-2); text-decoration: none;
                    padding: 6px 12px; border: 1px solid var(--border); border-radius: var(--radius);
                    transition: color .15s, border-color .15s, background .15s;
                }
                .tos-nav__back:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }

                .tos-main { max-width: 800px; margin: 0 auto; padding: 0 24px 80px; }

                .tos-masthead {
                    padding: 52px 0 40px;
                    border-bottom: 1px solid var(--border); margin-bottom: 48px;
                }
                .tos-masthead__eyebrow {
                    font-family: var(--font-mono); font-size: 11px; color: var(--accent);
                    letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px;
                }
                .tos-masthead__title {
                    font-family: var(--font-serif);
                    font-size: clamp(36px, 5vw, 56px); font-weight: 400; line-height: 1.05;
                    color: var(--text-1); margin-bottom: 12px;
                }
                .tos-masthead__meta {
                    font-family: var(--font-mono); font-size: 11px; color: var(--text-3);
                    display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
                }
                .tos-masthead__badge {
                    display: inline-flex; align-items: center; gap: 5px;
                    background: var(--accent-dim); border: 1px solid rgba(232,255,71,0.2);
                    border-radius: 3px; padding: 3px 10px;
                    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em;
                    color: var(--accent); text-transform: uppercase;
                }

                .tos-section-label {
                    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em;
                    text-transform: uppercase; color: var(--text-3);
                    display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
                }
                .tos-section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }

                .tos-sections { display: flex; flex-direction: column; gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; margin-bottom: 48px; }

                .tos-section {
                    background: var(--surface); padding: 28px 32px;
                    position: relative; transition: background .15s;
                }
                .tos-section:hover { background: #141417; }
                .tos-section::before {
                    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
                    background: var(--accent); transform: scaleY(0); transform-origin: bottom;
                    transition: transform .2s ease;
                }
                .tos-section:hover::before { transform: scaleY(1); }

                .tos-section__num {
                    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em;
                    color: var(--accent); text-transform: uppercase; margin-bottom: 8px;
                }
                .tos-section__title {
                    font-family: var(--font-serif); font-size: 20px; font-weight: 400;
                    color: var(--text-1); margin-bottom: 14px;
                }
                .tos-section__body { font-size: 14px; color: var(--text-2); line-height: 1.7; }
                .tos-section__body p + p { margin-top: 10px; }

                .tos-rules {
                    background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius);
                    padding: 16px 20px; margin-top: 14px;
                    display: flex; flex-direction: column; gap: 10px;
                }
                .tos-rules p {
                    font-size: 13px; color: var(--text-2); line-height: 1.6;
                }
                .tos-rules strong {
                    font-family: var(--font-mono); font-size: 11px; color: var(--accent);
                }

                .tos-footer-row {
                    display: flex; align-items: center; justify-content: space-between;
                    flex-wrap: wrap; gap: 12px;
                    padding-top: 32px; border-top: 1px solid var(--border);
                }
                .tos-footer__info {
                    display: flex; align-items: center; gap: 6px;
                    font-family: var(--font-mono); font-size: 10px; color: var(--text-3);
                }

                .tos-btn {
                    display: inline-flex; align-items: center; gap: 6px;
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    padding: 8px 16px; border: 1px solid var(--border); border-radius: var(--radius);
                    background: transparent; color: var(--text-2); text-decoration: none;
                    transition: color .15s, border-color .15s, background .15s;
                }
                .tos-btn:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }
            `}</style>

            <div className="tos-page">
                <nav className="tos-nav">
                    <a href="/" className="tos-nav__brand">brown<em>.</em>dev</a>
                    <a href="/" className="tos-nav__back"><ArrowLeft size={13} /> Home</a>
                </nav>

                <main className="tos-main">
                    <header className="tos-masthead">
                        <p className="tos-masthead__eyebrow">Legal</p>
                        <h1 className="tos-masthead__title">Terms of<br />Service</h1>
                        <div className="tos-masthead__meta">
                            <span>Effective: June 12, 2026</span>
                            <span className="tos-masthead__badge">
                                <Scale size={11} /> Active agreement
                            </span>
                        </div>
                    </header>

                    <p className="tos-section-label">Agreement terms</p>
                    <div className="tos-sections">

                        <div className="tos-section">
                            <p className="tos-section__num">[01]</p>
                            <h2 className="tos-section__title">Agreement framework</h2>
                            <div className="tos-section__body">
                                <p>By accessing the digital portals or initiating development contracts with <strong style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-1)" }}>Brown Code</strong>, you agree to be bound by this operational codebase. Read these statements before finalising your staging pipeline deposits.</p>
                            </div>
                        </div>

                        <div className="tos-section">
                            <p className="tos-section__num">[02]</p>
                            <h2 className="tos-section__title">Scope of work</h2>
                            <div className="tos-section__body">
                                <p>All feature sets, server timelines, deployment models, and design systems are explicitly detailed inside a project contract before launch. Any requests introduced after development has begun will be treated as separate extensions and billed outside the initial scope.</p>
                            </div>
                        </div>

                        <div className="tos-section">
                            <p className="tos-section__num">[03]</p>
                            <h2 className="tos-section__title">Financial milestones</h2>
                            <div className="tos-section__body">
                                <p>Projects run on step-by-step milestone payments as outlined in your original quote.</p>
                                <div className="tos-rules">
                                    <p><strong>Rule 3.1:</strong> Initial deposits are non-refundable once infrastructure allocation or code assembly has started.</p>
                                    <p><strong>Rule 3.2:</strong> Delays in balance payments exceeding 14 business days will pause code assembly until balances are settled.</p>
                                </div>
                            </div>
                        </div>

                        <div className="tos-section">
                            <p className="tos-section__num">[04]</p>
                            <h2 className="tos-section__title">Intellectual property</h2>
                            <div className="tos-section__body">
                                <p>Until final payment is cleared, all mockups, private GitHub branches, and custom systems remain the intellectual property of Brown Code. Upon receipt of full final payment, complete production ownership, licence permissions, and deployment access keys are transferred to the client.</p>
                            </div>
                        </div>

                        <div className="tos-section">
                            <p className="tos-section__num">[05]</p>
                            <h2 className="tos-section__title">Hosting liability</h2>
                            <div className="tos-section__body">
                                <p>I build performant systems using modern stacks (Next.js, Tailwind, Firebase). However, I am not responsible for third-party hosting outages (Vercel, AWS), domain registration lapses, or external API modifications that occur after deployment.</p>
                            </div>
                        </div>

                        <div className="tos-section">
                            <p className="tos-section__num">[06]</p>
                            <h2 className="tos-section__title">Contract termination</h2>
                            <div className="tos-section__body">
                                <p>Either party holds the right to terminate a project engagement if the other party breaches the defined terms. In the event of early termination, the client will be billed proportionally for all milestones completed up to that exact date.</p>
                            </div>
                        </div>

                    </div>

                    <footer className="tos-footer-row">
                        <div className="tos-footer__info">
                            <Scale size={12} style={{ color: "#4ade80" }} />
                            © {currentYear} Brown Code — legal active
                        </div>
                        <Link href="/" className="tos-btn">
                            <ArrowLeft size={13} /> Return home
                        </Link>
                    </footer>
                </main>
            </div>
        </>
    );
}