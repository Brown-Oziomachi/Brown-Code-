"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
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
          <Icon size={15} />
        </div>
        <h3 className="util-card__title">{job.title}</h3>
      </div>
      <p className="util-card__desc">{job.description}</p>
      <div className="util-card__cta">
        REDIRECT_TO_TARGET()
        <ExternalLink size={10} />
      </div>
    </a>
  );
};

export default function JobsPage() {
  const router = useRouter();

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
          --font-serif: 'DM Serif Display', Georgia, serif;
          --font-sans:  'Inter', system-ui, sans-serif;
          --font-mono:  'JetBrains Mono', 'Fira Code', monospace;
        }

        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .jp-page { font-family: var(--font-sans); background: var(--bg); color: var(--text-1); min-height: 100vh; }

        /* Nav */
        .jp-nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(10,10,11,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          padding: 0 24px; height: 56px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .jp-nav__brand { font-family: var(--font-mono); font-size: 12px; font-weight: 500; letter-spacing: 0.08em; color: var(--text-1); text-decoration: none; }
        .jp-nav__brand em { font-style: normal; color: var(--accent); }
        .jp-nav__back {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
          color: var(--text-2); text-decoration: none;
          padding: 6px 12px; border: 1px solid var(--border); border-radius: var(--radius);
          transition: color 0.15s, border-color 0.15s, background 0.15s;
        }
        .jp-nav__back:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }

        /* Main */
        .jp-main { max-width: 1200px; margin: 0 auto; padding: 0 24px 80px; }

        /* Masthead */
        .jp-masthead {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 16px; padding: 52px 0 32px;
          border-bottom: 1px solid var(--border); margin-bottom: 36px;
        }
        @media (max-width: 700px) {
          .jp-masthead { flex-direction: column; align-items: flex-start; }
          .jp-masthead__desc { text-align: left; }
        }
        .jp-masthead__eyebrow { font-family: var(--font-mono); font-size: 11px; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px; }
        .jp-masthead__title { font-family: var(--font-serif); font-size: clamp(36px, 5vw, 60px); font-weight: 400; line-height: 1.05; color: var(--text-1); }
        .jp-masthead__desc { font-size: 13px; color: var(--text-2); line-height: 1.6; max-width: 320px; text-align: right; }

        /* Section label */
        .jp-section-label {
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--text-3);
          display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
        }
        .jp-section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }

        /* Tag */
        .util-tag {
          display: inline-block;
          font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 2px 7px; border-radius: 3px;
          background: var(--accent-dim); color: var(--accent);
          border: 1px solid rgba(232,255,71,0.2); line-height: 1;
        }

        /* Grid */
        .util-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--border);
          border: 1px solid var(--border); border-radius: var(--radius);
          overflow: hidden; margin-bottom: 56px;
        }
        @media (max-width: 900px) { .util-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .util-grid { grid-template-columns: 1fr; } }

        /* Card */
        .util-card {
          display: flex; flex-direction: column; gap: 12px;
          background: var(--surface); text-decoration: none;
          padding: 20px; position: relative; overflow: hidden;
          transition: background 0.15s;
          animation: jpFadeUp 0.4s ease-out both;
        }
        .util-card:hover { background: #141417; }
        .util-card::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 2px; background: var(--accent);
          transform: scaleY(0); transform-origin: bottom;
          transition: transform 0.2s ease; z-index: 5;
        }
        .util-card:hover::before { transform: scaleY(1); }
        @keyframes jpFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .util-card__meta {
          display: flex; align-items: center; justify-content: space-between;
          padding-bottom: 12px; border-bottom: 1px solid var(--border);
        }
        .util-card__id { font-family: var(--font-mono); font-size: 10px; font-weight: 500; letter-spacing: 0.1em; color: var(--text-3); text-transform: uppercase; }

        .util-card__title-row { display: flex; align-items: flex-start; gap: 10px; }

        .util-card__icon {
          flex-shrink: 0; width: 30px; height: 30px;
          display: flex; align-items: center; justify-content: center;
          background: var(--bg); border: 1px solid var(--border);
          border-radius: 4px; color: var(--text-3);
          transition: color 0.15s, border-color 0.15s;
        }
        .util-card:hover .util-card__icon { color: var(--accent); border-color: rgba(232,255,71,0.3); }

        .util-card__title {
          font-family: var(--font-serif); font-size: 17px; font-weight: 400;
          line-height: 1.3; color: var(--text-1); transition: color 0.15s; padding-top: 4px;
        }
        .util-card:hover .util-card__title { color: #fff; }

        .util-card__desc { font-size: 12px; color: var(--text-2); line-height: 1.6; flex: 1; }

        .util-card__cta {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 8px 0; font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-3);
          border: 1px solid var(--border); border-radius: var(--radius);
          transition: color 0.15s, border-color 0.15s, background 0.15s;
          margin-top: 4px;
        }
        .util-card:hover .util-card__cta { color: var(--accent); border-color: rgba(232,255,71,0.25); background: var(--accent-dim); }

        /* Footer */
        .jp-footer {
          display: flex; flex-wrap: wrap; align-items: center;
          justify-content: space-between; gap: 12px;
          padding-top: 40px; margin-top: 8px; border-top: 1px solid var(--border);
        }
        .jp-footer__info { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); letter-spacing: 0.06em; }
        .jp-footer__actions { display: flex; gap: 10px; flex-wrap: wrap; }

        .jp-btn {
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
          padding: 8px 16px; border-radius: var(--radius);
          border: 1px solid var(--border); background: transparent; color: var(--text-2);
          cursor: pointer; display: inline-flex; align-items: center; gap: 6px;
          transition: color 0.15s, border-color 0.15s, background 0.15s; text-decoration: none;
        }
        .jp-btn:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }
        .jp-btn--accent { border-color: rgba(232,255,71,0.3); color: var(--accent); background: var(--accent-dim); }
        .jp-btn--accent:hover { background: rgba(232,255,71,0.15); border-color: rgba(232,255,71,0.5); color: var(--accent); }
      `}</style>

      <div className="jp-page">
        <nav className="jp-nav">
          <a href="/" className="jp-nav__brand">brown<em>.</em>dev</a>
          <a href="/portfolio" className="jp-nav__back">
            <ArrowLeft size={13} />
            Portfolio
          </a>
        </nav>

        <main className="jp-main">
          <header className="jp-masthead">
            <div>
              <p className="jp-masthead__eyebrow">Utilities</p>
              <h1 className="jp-masthead__title">Career &amp;<br />Pipeline Gateways</h1>
            </div>
            <p className="jp-masthead__desc">
              Direct connections to external automation layers, career enhancement toolsets, and development resource instances.
            </p>
          </header>

          <p className="jp-section-label">External interfaces</p>
          <div className="util-grid">
            {jobOptions.map((job, i) => (
              <UtilCard key={job.id} job={job} index={i} />
            ))}
          </div>

          <footer className="jp-footer">
            <span className="jp-footer__info">brown.dev — utilities &amp; tools</span>
            <div className="jp-footer__actions">
              <button className="jp-btn jp-btn--accent" onClick={() => router.push("/bc/contact")}>
                Get in touch
              </button>
              <button className="jp-btn" onClick={() => router.push("/portfolio")}>
                <ArrowLeft size={13} />
                Portfolio
              </button>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}