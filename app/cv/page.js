"use client";
import { useRouter } from "next/navigation";
import { FileText, Layers, User, Code2, Fingerprint, ArrowLeft, ArrowRight } from "lucide-react";
import Footer from "@/components/footer";

export default function AboutCVPage() {
    const router = useRouter();

    const stack = ["Next.js", "React", "Node.js", "JavaScript", "TailwindCSS", "Firebase"];

    return (
        <>
            <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #0a0a0b; --surface: #111113; --border: #1e1e22; --border-hi: #2e2e34;
          --text-1: #f4f4f5; --text-2: #a1a1aa; --text-3: #52525b;
          --accent: #e8ff47; --accent-dim: rgba(232,255,71,0.08);
          --radius: 6px;
          --serif: 'DM Serif Display', Georgia, serif;
          --sans: 'Inter', system-ui, sans-serif;
          --mono: 'JetBrains Mono', 'Fira Code', monospace;
        }
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .cv-page { background: var(--bg); color: var(--text-2); font-family: var(--sans); min-height: 100vh; }

        .cv-nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(10,10,11,0.92); backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          height: 56px; padding: 0 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .cv-nav__brand { font-family: var(--mono); font-size: 12px; font-weight: 500; letter-spacing: 0.08em; color: var(--text-1); text-decoration: none; }
        .cv-nav__brand em { font-style: normal; color: var(--accent); }
        .cv-nav__back {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em;
          color: var(--text-2); text-decoration: none; cursor: pointer;
          padding: 6px 12px; border: 1px solid var(--border); border-radius: var(--radius);
          background: none;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
        }
        .cv-nav__back:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }

        .cv-main { max-width: 720px; margin: 0 auto; padding: 52px 24px 80px; display: flex; flex-direction: column; gap: 20px; }

        /* Hero card */
        .cv-hero {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 28px 32px;
          position: relative; overflow: hidden;
        }
        .cv-hero__bg-icon {
          position: absolute; right: 20px; top: 50%; transform: translateY(-50%);
          color: var(--border); pointer-events: none;
        }
        .cv-hero__eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--accent); margin-bottom: 12px;
        }
        .cv-hero__title {
          font-family: var(--serif); font-size: clamp(24px, 3.5vw, 36px);
          color: var(--text-1); margin-bottom: 10px; line-height: 1.15;
        }
        .cv-hero__desc { font-size: 14px; color: var(--text-2); line-height: 1.7; font-weight: 300; max-width: 480px; }

        /* Two-col info */
        .cv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 560px) { .cv-grid { grid-template-columns: 1fr; } }

        .cv-info-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 20px;
        }
        .cv-info-card__label {
          display: flex; align-items: center; gap: 6px;
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--text-3); margin-bottom: 14px;
        }
        .cv-info-card__label svg { color: var(--accent); }
        .cv-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .cv-tag {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.06em;
          padding: 3px 9px; border-radius: 3px;
          background: var(--accent-dim); color: var(--accent);
          border: 1px solid rgba(232,255,71,0.2);
        }
        .cv-info-card__text { font-size: 12px; color: var(--text-2); line-height: 1.65; font-weight: 300; }

        /* CTA */
        .cv-cta {
          background: var(--surface); border: 1px solid var(--border);
          border-left: 3px solid var(--accent);
          border-radius: var(--radius); padding: 32px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 24px; position: relative; overflow: hidden;
        }
        @media (max-width: 560px) { .cv-cta { flex-direction: column; align-items: flex-start; } }
        .cv-cta__icon {
          width: 44px; height: 44px; border-radius: var(--radius);
          background: var(--accent-dim); border: 1px solid rgba(232,255,71,0.25);
          display: flex; align-items: center; justify-content: center; color: var(--accent);
          flex-shrink: 0;
        }
        .cv-cta__title { font-family: var(--serif); font-size: 22px; color: var(--text-1); margin-bottom: 4px; }
        .cv-cta__sub { font-size: 12px; color: var(--text-3); font-weight: 300; }
        .cv-btn {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em;
          padding: 11px 22px; border-radius: var(--radius);
          background: var(--accent); border: 1px solid var(--accent);
          color: #0a0a0b; font-weight: 600; text-decoration: none; cursor: pointer;
          transition: opacity 0.15s, transform 0.1s; white-space: nowrap;
          flex-shrink: 0;
        }
        .cv-btn:hover { opacity: 0.88; transform: translateY(-1px); }

        /* Footer strip */
        .cv-strip {
          display: flex; justify-content: space-between;
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--text-3);
          padding-top: 16px; border-top: 1px solid var(--border);
        }
      `}</style>

            <div className="cv-page">
                <nav className="cv-nav">
                    <a href="/" className="cv-nav__brand">brown<em>.</em>dev</a>
                    <button className="cv-nav__back" onClick={() => router.push("/portfolio")}>
                        <ArrowLeft size={13} /> Portfolio
                    </button>
                </nav>

                <main className="cv-main">
                    {/* Hero */}
                    <div className="cv-hero">
                        <div className="cv-hero__bg-icon"><Fingerprint size={100} /></div>
                        <div className="cv-hero__eyebrow">
                            <User size={11} /> Identity core
                        </div>
                        <h1 className="cv-hero__title">About the developer</h1>
                        <p className="cv-hero__desc">
                            Full-stack software developer architecting performant, scalable digital systems. Specialized
                            in React architecture, custom web engines, and secure data infrastructures.
                        </p>
                    </div>

                    {/* Info grid */}
                    <div className="cv-grid">
                        <div className="cv-info-card">
                            <div className="cv-info-card__label"><Code2 size={11} /> Tech stack</div>
                            <div className="cv-tags">
                                {stack.map((t) => <span key={t} className="cv-tag">{t}</span>)}
                            </div>
                        </div>
                        <div className="cv-info-card">
                            <div className="cv-info-card__label"><Layers size={11} /> Objectives</div>
                            <p className="cv-info-card__text">
                                Refactoring legacy codebases, designing optimized data structures, and deploying
                                scalable full-stack pipelines with secure data flows.
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="cv-cta">
                        <div className="cv-cta__icon"><FileText size={20} /></div>
                        <div style={{ flex: 1 }}>
                            <div className="cv-cta__title">Professional résumé</div>
                            <div className="cv-cta__sub">Full work history, skills, and project references.</div>
                        </div>
                        <a href="/cv/pdf" target="_blank" rel="noopener noreferrer" className="cv-btn">
                            View CV <ArrowRight size={13} />
                        </a>
                    </div>

                    <div className="cv-strip">
                        <span>Status: online</span>
                        <span>Secure gateway v2.0.26</span>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}