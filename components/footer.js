import Link from "next/link";
import { Linkedin, Github, Mail, ArrowUpRight, MessageCircle } from "lucide-react";
import InstallAppButton from "@/components/InstallAppButton";
import NotifyButton from "@/components/NotifyButton";

export default function Footer() {
    const year = new Date().getFullYear();

    const explore = [
        { label: "Portfolio", href: "/portfolio" },
        { label: "About", href: "/bc/about" },
        { label: "Blog", href: "/blog" },
        { label: "Tech News", href: "/tech-news" },
        { label: "Gallery", href: "/gallery" },
        { label: "Jobs", href: "/jobs" },
        { label: "Newsletter", href: "/newsletter" },
        { label: "FAQ", href: "/faq" },
    ];

    const work = [
        { label: "Contact", href: "/bc/contact" },
        { label: "Services", href: "/services" },
        { label: "Get a Website", href: "/get-a-website" },
        { label: "Advertise", href: "/advertise" },
        { label: "Sponsor", href: "https://github.com/sponsors/Brown-Oziomachi/", external: true },
    ];

    const platforms = [
        { label: "Fraud Radar NG", href: "https://fraudradarng.vercel.app", external: true },
        { label: "LAN Library", href: "https://learningaccessnetwork.vercel.app", external: true },
        { label: "TheCyclopedia News", href: "https://www.thecyclopedia.com.ng", external: true },
        { label: "YotaPoint", href: "https://yotapoint.com", external: true },
    ];

    const legal = [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Sitemap", href: "/sitemap-html" },
    ];

    const socials = [
        { name: "LinkedIn", href: "https://www.linkedin.com/in/brownoziomachi72a5a3229", icon: <Linkedin size={16} /> },
        { name: "GitHub", href: "https://github.com/Brown-Oziomachi", icon: <Github size={16} /> },
        { name: "Email", href: "mailto:browncemmanuel@gmail.com", icon: <Mail size={16} /> },
        {
            name: "WhatsApp",
            href: "https://wa.me/2348142995114",
            icon: (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            ),
        },
    ];

    const renderLink = ({ label, href, external }) =>
        external ? (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="ft-link">
                {label} <ArrowUpRight size={12} className="ft-link__icon" />
            </a>
        ) : (
            <Link key={label} href={href} className="ft-link">
                {label}
            </Link>
        );

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

                .ft {
                    --ft-bg: #0a0a0b;
                    --ft-bg-2: #131315;
                    --ft-rule: rgba(255, 255, 255, 0.1);
                    --ft-ink: #ffffff;
                    --ft-ink-2: #b4b4bb;
                    --ft-ink-3: #7d7d86;
                    --ft-accent: #e8ff47;
                    --ft-on-accent: #0a0a0b;
                    --ft-serif: 'Playfair Display', Georgia, serif;
                    --ft-sans: 'Inter', system-ui, sans-serif;
                    --ft-mono: 'JetBrains Mono', 'Fira Code', monospace;

                    background: var(--ft-bg);
                    border-top: 4px solid var(--ft-accent);
                    font-family: var(--ft-sans);
                    margin-top: 80px;
                    color: var(--ft-ink-2);
                }
                .ft *, .ft *::before, .ft *::after { box-sizing: border-box; }
                .ft h2, .ft p { margin: 0; }
                .ft-inner { max-width: 1120px; margin: 0 auto; padding: 0 24px; }

                /* Buttons */
                .ft-btn {
                    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
                    font-family: var(--ft-mono); font-size: 11px; font-weight: 500; letter-spacing: 0.06em;
                    padding: 12px 20px; border: 1.5px solid rgba(255, 255, 255, 0.3);
                    color: var(--ft-ink); text-decoration: none; background: transparent; cursor: pointer;
                    transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.15s;
                }
                .ft-btn:hover { background: var(--ft-ink); color: var(--ft-on-accent); border-color: var(--ft-ink); transform: translateY(-1px); }
                .ft-btn--solid { background: var(--ft-accent); color: var(--ft-on-accent); border-color: var(--ft-accent); font-weight: 600; }
                .ft-btn--solid:hover { background: var(--ft-ink); border-color: var(--ft-ink); }

                /* Top call to action */
                .ft-cta {
                    display: flex; align-items: center; justify-content: space-between; gap: 28px; flex-wrap: wrap;
                    padding: 56px 0; border-bottom: 1px solid var(--ft-rule);
                }
                .ft-cta__eyebrow {
                    font-family: var(--ft-mono); font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase;
                    color: var(--ft-accent); margin-bottom: 14px;
                }
                .ft-cta__title {
                    font-family: var(--ft-serif); font-weight: 800; font-size: clamp(28px, 4vw, 44px);
                    line-height: 1.12; color: var(--ft-ink); max-width: 640px; letter-spacing: -0.01em;
                }
                .ft-cta__title em { font-style: italic; color: var(--ft-accent); }
                .ft-cta__actions { display: flex; flex-wrap: wrap; gap: 12px; }

                /* Main grid */
                .ft-main {
                    display: grid; grid-template-columns: 1.7fr 1fr 1fr 1.1fr; gap: 48px;
                    padding: 56px 0 48px;
                }
                @media (max-width: 960px) {
                    .ft-main { grid-template-columns: 1fr 1fr 1fr; gap: 36px; }
                    .ft-brand { grid-column: 1 / -1; }
                }
                @media (max-width: 600px) {
                    .ft-main { grid-template-columns: 1fr 1fr; gap: 32px 24px; padding: 44px 0 36px; }
                }

                /* Brand column */
                .ft-wordmark {
                    font-family: var(--ft-serif); font-weight: 800; font-size: 28px; letter-spacing: -0.01em;
                    color: var(--ft-ink); text-decoration: none; display: inline-block; margin-bottom: 16px;
                }
                .ft-wordmark em { font-style: normal; color: var(--ft-accent); }
                .ft-tagline { font-size: 14px; line-height: 1.75; color: var(--ft-ink-2); max-width: 360px; margin-bottom: 22px; }

                .ft-status {
                    display: inline-flex; align-items: center; gap: 10px; margin-bottom: 24px;
                    font-family: var(--ft-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
                    color: var(--ft-ink); padding: 8px 14px; border: 1px solid var(--ft-rule); background: var(--ft-bg-2);
                }
                .ft-ping { position: relative; width: 8px; height: 8px; flex-shrink: 0; }
                .ft-ping__ring { position: absolute; inset: 0; border-radius: 50%; background: #22c55e; opacity: 0.45; animation: ft-ping 1.8s ease-out infinite; }
                .ft-ping__dot { position: absolute; inset: 1px; border-radius: 50%; background: #22c55e; }
                @keyframes ft-ping { 0% { transform: scale(1); opacity: 0.45; } 100% { transform: scale(2.8); opacity: 0; } }

                .ft-socials { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 22px; }
                .ft-social {
                    width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
                    border: 1px solid rgba(255, 255, 255, 0.22); color: var(--ft-ink); text-decoration: none;
                    transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.15s;
                }
                .ft-social:hover { background: var(--ft-accent); color: var(--ft-on-accent); border-color: var(--ft-accent); transform: translateY(-2px); }

                .ft-app { display: flex; flex-wrap: wrap; gap: 10px; }
                .ft-app .ft-btn { padding: 10px 16px; }

                /* Link columns */
                .ft-label {
                    display: block; font-family: var(--ft-mono); font-size: 10.5px; letter-spacing: 0.16em;
                    text-transform: uppercase; color: var(--ft-accent); margin-bottom: 20px;
                    padding-bottom: 12px; border-bottom: 1px solid var(--ft-rule);
                }
                .ft-list { display: flex; flex-direction: column; gap: 12px; }
                .ft-link {
                    display: inline-flex; align-items: center; gap: 5px; width: fit-content;
                    font-size: 14px; color: var(--ft-ink-2); text-decoration: none; transition: color 0.15s, transform 0.15s;
                }
                .ft-link__icon { opacity: 0.55; transition: opacity 0.15s, transform 0.15s; }
                .ft-link:hover { color: var(--ft-ink); transform: translateX(3px); }
                .ft-link:hover .ft-link__icon { opacity: 1; color: var(--ft-accent); transform: translate(1px, -1px); }

                /* Base bar */
                .ft-base {
                    padding: 22px 0 30px; border-top: 1px solid var(--ft-rule);
                    display: flex; align-items: center; justify-content: space-between; gap: 12px 24px; flex-wrap: wrap;
                }
                .ft-base__copy { font-size: 12.5px; color: var(--ft-ink-3); }
                .ft-base__copy strong { color: var(--ft-ink-2); font-weight: 500; }
                .ft-base__legal { display: flex; gap: 22px; flex-wrap: wrap; }
                .ft-base__legal a { font-size: 12.5px; color: var(--ft-ink-3); text-decoration: none; transition: color 0.15s; }
                .ft-base__legal a:hover { color: var(--ft-ink); }

                @media (max-width: 640px) {
                    .ft-inner { padding: 0 18px; }
                    .ft-cta { padding: 44px 0; }
                    .ft-cta__actions { width: 100%; }
                    .ft-cta__actions .ft-btn { flex: 1 1 auto; }
                }
                .ft :focus-visible { outline: 2px solid var(--ft-accent); outline-offset: 3px; }
                @media (prefers-reduced-motion: reduce) { .ft * { transition: none !important; animation: none !important; } }
            `}</style>

            <footer className="ft">
                <div className="ft-inner">
                    {/* Call to action */}
                    <div className="ft-cta">
                        <div>
                            <p className="ft-cta__eyebrow">Let&apos;s work together</p>
                            <h2 className="ft-cta__title">
                                Have a platform to build or a story to <em>run</em>?
                            </h2>
                        </div>
                        <div className="ft-cta__actions">
                            <Link href="/bc/contact" className="ft-btn ft-btn--solid">
                                Start a project <ArrowUpRight size={14} />
                            </Link>
                            <Link href="/advertise" className="ft-btn">
                                Advertise with us
                            </Link>
                        </div>
                    </div>

                    {/* Main grid */}
                    <div className="ft-main">
                        <div className="ft-brand">
                            <Link href="/" className="ft-wordmark">
                                Sir-AD <em>Blog</em>
                            </Link>
                            <p className="ft-tagline">
                                Full stack engineer and publisher in Abuja, Nigeria. I build secure web platforms for
                                Africa and write about web security and fraud awareness.
                            </p>
                            <div className="ft-status">
                                <span className="ft-ping">
                                    <span className="ft-ping__ring" />
                                    <span className="ft-ping__dot" />
                                </span>
                                Open to projects
                            </div>

                            <div className="ft-socials">
                                {socials.map((s) => (
                                    <a
                                        key={s.name}
                                        href={s.href}
                                        target={s.href.startsWith("mailto") ? undefined : "_blank"}
                                        rel="noopener noreferrer"
                                        className="ft-social"
                                        title={s.name}
                                        aria-label={s.name}
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>

                            <div className="ft-app">
                                <a
                                    href="https://whatsapp.com/channel/0029VbEGWFsC1FuAo5qoPh0q"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ft-btn ft-btn--solid"
                                >
                                    <MessageCircle size={13} /> WhatsApp channel
                                </a>
                                <InstallAppButton className="ft-btn" />
                                <NotifyButton className="ft-btn" />
                            </div>
                        </div>

                        <div>
                            <span className="ft-label">Explore</span>
                            <nav className="ft-list" aria-label="Explore">{explore.map(renderLink)}</nav>
                        </div>

                        <div>
                            <span className="ft-label">Work with me</span>
                            <nav className="ft-list" aria-label="Work with me">{work.map(renderLink)}</nav>
                        </div>

                        <div>
                            <span className="ft-label">Platforms</span>
                            <nav className="ft-list" aria-label="Platforms I build">{platforms.map(renderLink)}</nav>
                        </div>
                    </div>

                    {/* Base bar */}
                    <div className="ft-base">
                        <p className="ft-base__copy">
                            &copy; {year} <strong>Sir-AD Blog</strong> / Sir Brown AD &middot; Abuja, Nigeria
                        </p>
                        <nav className="ft-base__legal" aria-label="Legal">
                            {legal.map((l) => (
                                <Link key={l.href} href={l.href}>
                                    {l.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </footer>
        </>
    );
}