"use client";

import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Cpu,
    Network,
    Globe,
    Layers,
    Server,
} from "lucide-react";

const jobOptions = [
    {
        id: "UTIL_NODE_01",
        title: "JobCopilot (Auto Apply)",
        description: "Automated routing engine designed to cross-reference and batch-submit application data packets to hundreds of target endpoints seamlessly.",
        icon: Network,
        href: "https://jobcopilot.com/?linkId=lp_494205&sourceId=brown-oziomachi&tenantId=jobcopilot",
        type: "DATA_PIPELINE",
    },
    {
        id: "UTIL_NODE_02",
        title: "FinalRound AI",
        description: "Advanced simulation runtime tailored to optimize and prepare developer profiles for rigorous systemic tech interviews and screening blocks.",
        icon: Cpu,
        href: "https://www.finalroundai.com/?via=browncode",
        type: "AI_ENGINE",
    },
    {
        id: "UTIL_NODE_03",
        title: "HostAfrica Domain Engine",
        description: "Global registry allocation system. Provision and resolve high-performance top-level domain nodes for system backbones.",
        icon: Globe,
        href: "https://my.hostafrica.com/aff.php?aff=2657",
        type: "DNS_PROVISION",
    },
    {
        id: "UTIL_NODE_04",
        title: "eSkilled AI Creator",
        description: "Automated content block model built to orchestrate, sequence, and output full digital educational course architectures.",
        icon: Layers,
        href: "https://aicoursecreator.eskilled.io/?fpr=brown99",
        type: "LOGIC_SYNTH",
    },
    {
        id: "UTIL_NODE_05",
        title: "Swagbucks Knowledge Base",
        description: "Distributed manual verification engine where system operators execute micro-tasks and validation scripts for reward payloads.",
        icon: Server,
        href: "https://www.swagbucks.com/p/register?rb=202240461&rp=1",
        type: "COMPUTE_TRACK",
    },
];

const UtilCard = ({ job, index }) => {
    const Icon = job.icon;
    return (
        <a
            href={job.href}
            target="_blank"
            rel="noopener noreferrer"
            className="util-card"
            style={{ animationDelay: `${index * 40}ms` }}
        >
            <div className="util-card__meta">
                <span className="util-card__id">{job.id}</span>
                <span className="util-tag">{job.type}</span>
            </div>
            <div className="util-card__title-row">
                <div className="util-card__icon">
                    <Icon size={16} />
                </div>
                <h3 className="util-card__title">{job.title}</h3>
            </div>
            <p className="util-card__desc">{job.description}</p>
            <div className="util-card__cta">
                Redirect to target <ArrowUpRight size={12} />
            </div>
        </a>
    );
};

export default function JobsClient() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

                .jp-page {
                    --paper: #ffffff; --paper-2: #f6f5f0;
                    --ink: #111111; --ink-2: #3f3f3f; --ink-3: #6f6f6f;
                    --rule: #e4e2da; --rule-dark: #111111;
                    --accent: #e8ff47; --on-accent: #0a0a0b;
                    --serif: 'Playfair Display', Georgia, serif;
                    --sans: 'Inter', system-ui, sans-serif;
                    --mono: 'JetBrains Mono', 'Fira Code', monospace;
                    background: var(--paper); color: var(--ink); font-family: var(--sans); min-height: 100vh;
                }
                .jp-page *, .jp-page *::before, .jp-page *::after { box-sizing: border-box; }
                .jp-page h1, .jp-page h2, .jp-page h3, .jp-page p { margin: 0; padding: 0; }
                :where(.jp-page a) { color: inherit; text-decoration: none; }
                .jp-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }

                /* Nav */
                .jp-nav { position: sticky; top: 0; z-index: 1000; background: rgba(255,255,255,0.92); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); border-bottom: 1px solid var(--rule); }
                .jp-nav__inner { max-width: 1120px; margin: 0 auto; padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
                .jp-nav__brand { font-family: var(--serif); font-weight: 800; font-size: 21px; letter-spacing: -0.01em; }
                .jp-nav__brand em { font-style: normal; background: var(--accent); padding: 0 3px; }
                .jp-nav__links { display: flex; align-items: center; gap: 4px; }
                .jp-nav__link { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3); padding: 8px 12px; transition: color 0.15s; }
                .jp-nav__link:hover, .jp-nav__link--on { color: var(--ink); }
                .jp-nav__link--on { box-shadow: inset 0 -3px 0 var(--accent); }
                @media (max-width: 700px) { .jp-nav__hide { display: none; } }

                /* Buttons */
                .jp-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-family: var(--mono); font-size: 11.5px; letter-spacing: 0.06em; padding: 13px 20px; border: 1.5px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; transition: background 0.15s, color 0.15s, transform 0.15s; }
                .jp-btn:hover { background: var(--ink); color: #fff; transform: translateY(-1px); }
                .jp-btn--solid { background: var(--accent); color: var(--on-accent); font-weight: 600; }
                .jp-btn--solid:hover { background: var(--ink); color: var(--accent); }
                .jp-btn--sm { padding: 9px 14px; }

                /* Masthead */
                .jp-masthead { padding-top: 64px; display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
                @media (max-width: 700px) { .jp-masthead { padding-top: 40px; } }
                .jp-kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 10px; }
                .jp-kicker b { background: var(--accent); color: var(--on-accent); padding: 2px 7px; font-weight: 500; }
                .jp-masthead__title { font-family: var(--serif); font-weight: 800; font-size: clamp(40px, 7.5vw, 88px); line-height: 0.98; letter-spacing: -0.03em; }
                .jp-masthead__title span { background: linear-gradient(transparent 64%, var(--accent) 64%); }
                .jp-masthead__desc { font-size: 15px; line-height: 1.7; font-weight: 300; color: var(--ink-2); max-width: 360px; }

                /* Section head */
                .jp-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding-top: 12px; border-top: 3px solid var(--rule-dark); margin: 64px 0 28px; }
                .jp-h2 { font-family: var(--serif); font-weight: 800; font-size: clamp(28px, 4vw, 40px); line-height: 1.1; letter-spacing: -0.01em; }
                .jp-head__note { font-size: 14px; line-height: 1.6; color: var(--ink-2); max-width: 380px; }

                /* Grid + card */
                .util-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 64px; }
                @media (max-width: 960px) { .util-grid { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 600px) { .util-grid { grid-template-columns: 1fr; } }

                .util-card {
                    display: flex; flex-direction: column; gap: 12px; padding: 18px;
                    background: #fff; border: 1px solid var(--rule); border-radius: 6px;
                    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
                    animation: jpFadeUp 0.4s ease-out both;
                }
                .util-card:hover { border-color: var(--ink); box-shadow: 4px 4px 0 var(--accent), 4px 4px 0 1px var(--ink); transform: translate(-2px, -2px); }
                @keyframes jpFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                .util-card__meta { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding-bottom: 12px; border-bottom: 1px solid var(--rule); }
                .util-card__id { font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; color: var(--ink-3); }
                .util-tag { font-family: var(--mono); font-size: 9.5px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; background: var(--accent); color: var(--on-accent); padding: 2px 7px; }

                .util-card__title-row { display: flex; align-items: center; gap: 10px; }
                .util-card__icon { flex-shrink: 0; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; background: var(--paper-2); border: 1px solid var(--rule); border-radius: 4px; color: var(--ink); }
                .util-card__title { font-family: var(--serif); font-weight: 800; font-size: 18px; line-height: 1.25; }
                .util-card__desc { font-size: 13px; color: var(--ink-2); line-height: 1.65; flex: 1; }

                .util-card__cta { display: inline-flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.04em; font-weight: 500; color: var(--ink); }
                .util-card:hover .util-card__cta { text-decoration: underline; text-underline-offset: 3px; text-decoration-color: var(--accent); text-decoration-thickness: 3px; }

                /* Footer */
                .jp-footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; padding: 32px 0 72px; border-top: 1px solid var(--rule); }
                .jp-footer__info { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.06em; color: var(--ink-3); }
                .jp-footer__actions { display: flex; gap: 10px; flex-wrap: wrap; }

                @media (max-width: 640px) { .jp-wrap, .jp-nav__inner { padding-left: 18px; padding-right: 18px; } }
                .jp-page :focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
                @media (prefers-reduced-motion: reduce) { .jp-page * { transition: none !important; animation: none !important; } }
            `}</style>

            <div className="jp-page">

                <main className="jp-wrap">
                    <header className="jp-masthead">
                        <div>
                            <div className="jp-kicker"><b>Utilities</b></div>
                            <h1 className="jp-masthead__title">
                                Career &amp;<br /><span>Pipeline Gateways</span>
                            </h1>
                        </div>
                        <p className="jp-masthead__desc">
                            Direct connections to external automation layers, career enhancement toolsets, and development resource instances.
                        </p>
                    </header>

                    <div className="jp-head">
                        <div>
                            <div className="jp-kicker">Tools</div>
                            <h2 className="jp-h2">External interfaces</h2>
                        </div>
                        <p className="jp-head__note">Tools I use and recommend. Some links are affiliate links.</p>
                    </div>

                    <div className="util-grid">
                        {jobOptions.map((job, i) => (
                            <UtilCard key={job.id} job={job} index={i} />
                        ))}
                    </div>

                    <footer className="jp-footer">
                        <span className="jp-footer__info">brown.dev — utilities &amp; tools</span>
                        <div className="jp-footer__actions">
                            <Link href="/bc/contact" className="jp-btn jp-btn--solid jp-btn--sm">
                                Get in touch
                            </Link>
                            <Link href="/portfolio" className="jp-btn jp-btn--sm">
                                <ArrowLeft size={13} /> Portfolio
                            </Link>
                        </div>
                    </footer>
                </main>
            </div>
        </>
    );
}