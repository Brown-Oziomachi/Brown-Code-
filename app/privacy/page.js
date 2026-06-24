import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata = {
    title: "Privacy Policy | Brown Code",
    description: "Learn how Brown Code handles data, information privacy, and client records securely.",
    alternates: { canonical: "https://browncode.name.ng/privacy" },
};

export default function PrivacyPolicy() {
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

                .pp-page { font-family: var(--font-sans); background: var(--bg); color: var(--text-1); min-height: 100vh; }

                .pp-nav {
                    position: sticky; top: 0; z-index: 100;
                    background: rgba(10,10,11,0.92); backdrop-filter: blur(12px);
                    border-bottom: 1px solid var(--border);
                    padding: 0 24px; height: 56px;
                    display: flex; align-items: center; justify-content: space-between;
                }
                .pp-nav__brand { font-family: var(--font-mono); font-size: 12px; font-weight: 500; letter-spacing: 0.08em; color: var(--text-1); text-decoration: none; }
                .pp-nav__brand em { font-style: normal; color: var(--accent); }
                .pp-nav__back {
                    display: inline-flex; align-items: center; gap: 6px;
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    color: var(--text-2); text-decoration: none;
                    padding: 6px 12px; border: 1px solid var(--border); border-radius: var(--radius);
                    transition: color .15s, border-color .15s, background .15s;
                }
                .pp-nav__back:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }

                .pp-main { max-width: 800px; margin: 0 auto; padding: 0 24px 80px; }

                .pp-masthead {
                    padding: 52px 0 40px;
                    border-bottom: 1px solid var(--border); margin-bottom: 48px;
                }
                .pp-masthead__eyebrow {
                    font-family: var(--font-mono); font-size: 11px; color: var(--accent);
                    letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px;
                }
                .pp-masthead__title {
                    font-family: var(--font-serif);
                    font-size: clamp(36px, 5vw, 56px); font-weight: 400; line-height: 1.05;
                    color: var(--text-1); margin-bottom: 12px;
                }
                .pp-masthead__meta {
                    font-family: var(--font-mono); font-size: 11px; color: var(--text-3);
                    display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
                }
                .pp-masthead__badge {
                    display: inline-flex; align-items: center; gap: 5px;
                    background: var(--accent-dim); border: 1px solid rgba(232,255,71,0.2);
                    border-radius: 3px; padding: 3px 10px;
                    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em;
                    color: var(--accent); text-transform: uppercase;
                }

                .pp-section-label {
                    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em;
                    text-transform: uppercase; color: var(--text-3);
                    display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
                }
                .pp-section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }

                .pp-sections { display: flex; flex-direction: column; gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; margin-bottom: 48px; }

                .pp-section {
                    background: var(--surface); padding: 28px 32px;
                    position: relative; transition: background .15s;
                }
                .pp-section:hover { background: #141417; }
                .pp-section::before {
                    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
                    background: var(--accent); transform: scaleY(0); transform-origin: bottom;
                    transition: transform .2s ease;
                }
                .pp-section:hover::before { transform: scaleY(1); }

                .pp-section__num {
                    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em;
                    color: var(--accent); text-transform: uppercase; margin-bottom: 8px;
                }
                .pp-section__title {
                    font-family: var(--font-serif); font-size: 20px; font-weight: 400;
                    color: var(--text-1); margin-bottom: 14px;
                }
                .pp-section__body { font-size: 14px; color: var(--text-2); line-height: 1.7; }
                .pp-section__body p + p { margin-top: 10px; }

                .pp-code-block {
                    background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius);
                    padding: 16px 20px; margin-top: 14px;
                    font-family: var(--font-mono); font-size: 11px; color: var(--text-3);
                    line-height: 2;
                }
                .pp-code-block span { color: var(--accent); }

                .pp-list {
                    list-style: none; margin-top: 12px; display: flex; flex-direction: column; gap: 8px;
                }
                .pp-list li {
                    font-size: 13px; color: var(--text-2); line-height: 1.6;
                    padding-left: 16px; position: relative;
                }
                .pp-list li::before {
                    content: ''; position: absolute; left: 0; top: 9px;
                    width: 4px; height: 4px; border-radius: 50%; background: var(--accent);
                }
                .pp-list strong { font-family: var(--font-mono); font-size: 11px; color: var(--accent); }

                .pp-footer-row {
                    display: flex; align-items: center; justify-content: space-between;
                    flex-wrap: wrap; gap: 12px;
                    padding-top: 32px; border-top: 1px solid var(--border);
                }
                .pp-footer__info {
                    display: flex; align-items: center; gap: 6px;
                    font-family: var(--font-mono); font-size: 10px; color: var(--text-3);
                }

                .pp-btn {
                    display: inline-flex; align-items: center; gap: 6px;
                    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
                    padding: 8px 16px; border: 1px solid var(--border); border-radius: var(--radius);
                    background: transparent; color: var(--text-2); text-decoration: none;
                    transition: color .15s, border-color .15s, background .15s;
                }
                .pp-btn:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }
            `}</style>

            <div className="pp-page">
                <nav className="pp-nav">
                    <a href="/" className="pp-nav__brand">brown<em>.</em>dev</a>
                    <a href="/" className="pp-nav__back"><ArrowLeft size={13} /> Home</a>
                </nav>

                <main className="pp-main">
                    <header className="pp-masthead">
                        <p className="pp-masthead__eyebrow">Legal</p>
                        <h1 className="pp-masthead__title">Privacy<br />Policy</h1>
                        <div className="pp-masthead__meta">
                            <span>Effective: June 12, 2026</span>
                            <span className="pp-masthead__badge">
                                <ShieldCheck size={11} /> Verified
                            </span>
                        </div>
                    </header>

                    <p className="pp-section-label">Policy sections</p>
                    <div className="pp-sections">

                        <div className="pp-section">
                            <p className="pp-section__num">[01]</p>
                            <h2 className="pp-section__title">Operational overview</h2>
                            <div className="pp-section__body">
                                <p>
                                    At <strong style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-1)" }}>Brown Code</strong> (browncode.name.ng), I respect data integrity. This document charts how client files, system metrics, and support variables are gathered, analysed, and stored.
                                </p>
                            </div>
                        </div>

                        <div className="pp-section">
                            <p className="pp-section__num">[02]</p>
                            <h2 className="pp-section__title">Data inputs</h2>
                            <div className="pp-section__body">
                                <p>I run a minimal data footprint. Collection is limited to three explicit segments:</p>
                                <ul className="pp-list">
                                    <li><strong>Voluntary form fields:</strong> Identity inputs like your name, email address, and project details shared via contact forms or WhatsApp.</li>
                                    <li><strong>Chat log staging:</strong> Interactive dialogue components map records temporarily to Firestore to enable session recall during support.</li>
                                    <li><strong>Anonymised system logs:</strong> Minor viewport parameters and browser variables generated through Vercel CDN to optimise performance.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="pp-section">
                            <p className="pp-section__num">[03]</p>
                            <h2 className="pp-section__title">Utilisation protocol</h2>
                            <div className="pp-section__body">
                                <p>Information is strictly processed through clean, non-malicious operations:</p>
                                <div className="pp-code-block">
                                    <div><span>$</span> execute --target="configure, build, and deploy software pipelines"</div>
                                    <div><span>$</span> execute --target="transmit engineering assessments, quotes, billing"</div>
                                    <div><span>$</span> execute --target="protect endpoints from bad actors and layout attacks"</div>
                                </div>
                            </div>
                        </div>

                        <div className="pp-section">
                            <p className="pp-section__num">[04]</p>
                            <h2 className="pp-section__title">Sharing boundaries</h2>
                            <div className="pp-section__body">
                                <p>
                                    I do not monetise, distribute, or exchange personal data with marketing agencies. Information is only routed through verified storage nodes (Firebase, Vercel) required to serve your application.
                                </p>
                            </div>
                        </div>

                        <div className="pp-section">
                            <p className="pp-section__num">[05]</p>
                            <h2 className="pp-section__title">Your rights</h2>
                            <div className="pp-section__body">
                                <p>
                                    You maintain full authority over your data. You can invoke a complete, irrevocable wipe of support records or chat data at any point by reaching out directly via WhatsApp.
                                </p>
                            </div>
                        </div>

                    </div>

                    <footer className="pp-footer-row">
                        <div className="pp-footer__info">
                            <ShieldCheck size={12} style={{ color: "#4ade80" }} />
                            © {currentYear} Brown Code — privacy verified
                        </div>
                        <Link href="/" className="pp-btn">
                            <ArrowLeft size={13} /> Return home
                        </Link>
                    </footer>
                </main>
            </div>
        </>
    );
}