import Link from "next/link";
import { Linkedin, Github, Mail, ArrowUpRight, MessageCircle } from "lucide-react";
import SocialLinks from "@/components/SocialLinks";
import InstallAppButton from "@/components/InstallAppButton";
import NotifyButton from "@/components/NotifyButton";

export default function Footer() {
    const year = new Date().getFullYear();

    const explore = [
        { label: "Portfolio", href: "/portfolio" },
        { label: "About Me", href: "/bc/about" },
        { label: "Blog", href: "/blog" },
        { label: "Jobs", href: "/jobs" },
        { label: "Newsletter", href: "/newsletter" },
        { label: "Tech News", href: "/tech-news" },
        { label: "FAQ", href: "/faq" },
    ];

    const work = [
        { label: "Contact Me", href: "/bc/contact" },
        { label: "Advertise", href: "/advertise" },
        { label: "Services", href: "/services" },
        { label: "Get a Website", href: "/get-a-website" },
        { label: "Sponsor", href: "https://github.com/sponsors/Brown-Oziomachi/", external: true },
    ];

    const legal = [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Sitemap", href: "/sitemap-html" },
    ];

    const builds = [
        { name: "Fraud Radar NG", url: "https://fraudradarng.vercel.app" },
        { name: "LAN Library", url: "https://learningaccessnetwork.vercel.app" },
        { name: "TheCyclopedia News", url: "https://www.thecyclopedia.com.ng" },
        { name: "YotaPoint", url: "https://yotapoint.com" },
    ];

    const socials = [
        { name: "LinkedIn", href: "https://www.linkedin.com/in/brownoziomachi72a5a3229", icon: <Linkedin size={15} /> },
        { name: "GitHub", href: "https://github.com/Brown-Oziomachi", icon: <Github size={15} /> },
        // { name: "Instagram", href: "https://instagram.com/Brown-Oziomachi", icon: <Instagram size={15} /> },
        { name: "Email", href: "mailto:browncemmanuel@gmail.com", icon: <Mail size={15} /> },
        {
            name: "WhatsApp",
            href: "https://wa.me/2348142995114",
            icon: (
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            ),
        },
    ];

    const renderLink = ({ label, href, external }) =>
        external ? (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="ft-link">
                {label} <ArrowUpRight size={11} />
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
                    --ft-bg: #ffffff;
                    --ft-soft: #f6f5f0;
                    --ft-rule: #e4e2da;
                    --ft-ink: #111111;
                    --ft-ink-2: #3f3f3f;
                    --ft-ink-3: #6f6f6f;
                    --ft-accent: #e8ff47;
                    --ft-on-accent: #0a0a0b;
                    --ft-serif: 'Playfair Display', Georgia, serif;
                    --ft-sans: 'Inter', system-ui, sans-serif;
                    --ft-mono: 'JetBrains Mono', 'Fira Code', monospace;

                    background: var(--ft-bg);
                    border-top: 5px solid var(--ft-ink);
                    font-family: var(--ft-sans);
                    margin-top: 80px;
                    color: var(--ft-ink-2);
                }
                .ft *, .ft *::before, .ft *::after { box-sizing: border-box; }
                .ft h2, .ft p { margin: 0; }

                .ft-inner { max-width: 1120px; margin: 0 auto; padding: 0 24px; }

                /* Call-to-action band */
                .ft-band {
                    display: flex; align-items: center; justify-content: space-between;
                    gap: 24px; flex-wrap: wrap;
                    padding: 44px 0; border-bottom: 1px solid var(--ft-rule);
                }
                .ft-band__title {
                    font-family: var(--ft-serif); font-weight: 800;
                    font-size: clamp(26px, 3.6vw, 40px); line-height: 1.1;
                    color: var(--ft-ink); max-width: 620px;
                }
                .ft-band__title em { font-style: italic; background: linear-gradient(transparent 62%, var(--ft-accent) 62%); }
                .ft-band__actions { display: flex; flex-wrap: wrap; gap: 10px; }

                .ft-btn {
                    display: inline-flex; align-items: center; gap: 8px;
                    font-family: var(--ft-mono); font-size: 11px; letter-spacing: 0.06em;
                    padding: 12px 18px; border: 1.5px solid var(--ft-ink);
                    color: var(--ft-ink); text-decoration: none; background: transparent;
                    transition: background 0.15s, color 0.15s, transform 0.15s;
                }
                .ft-btn:hover { background: var(--ft-ink); color: #fff; transform: translateY(-1px); }
                .ft-btn--solid { background: var(--ft-accent); color: var(--ft-on-accent); font-weight: 600; }
                .ft-btn--solid:hover { background: var(--ft-ink); color: var(--ft-accent); }
                .ft-btn__dot { width: 6px; height: 6px; border-radius: 50%; background: var(--ft-on-accent); }

                /* Main grid */
                .ft-main {
                    display: grid; grid-template-columns: 1.7fr 1fr 1fr 1fr; gap: 48px;
                    padding: 52px 0 44px; border-bottom: 1px solid var(--ft-rule);
                }
                @media (max-width: 900px) {
                    .ft-main { grid-template-columns: 1fr 1fr; gap: 36px; }
                    .ft-brand { grid-column: 1 / -1; }
                }
                @media (max-width: 480px) { .ft-main { grid-template-columns: 1fr; } .ft-brand { grid-column: auto; } }

                .ft-wordmark {
                    font-family: var(--ft-serif); font-weight: 800; font-size: 26px;
                    color: var(--ft-ink); text-decoration: none; display: inline-block; margin-bottom: 14px;
                }
                .ft-wordmark em { font-style: normal; background: var(--ft-accent); padding: 0 3px; }
                .ft-tagline { font-size: 13.5px; line-height: 1.75; color: var(--ft-ink-2); max-width: 340px; margin-bottom: 20px; }

                .ft-status {
                    display: inline-flex; align-items: center; gap: 9px;
                    font-family: var(--ft-mono); font-size: 9.5px; letter-spacing: 0.12em; text-transform: uppercase;
                    color: var(--ft-ink); padding: 7px 12px; border: 1px solid var(--ft-ink); background: var(--ft-soft);
                    margin-bottom: 18px;
                }
                .ft-ping { position: relative; width: 8px; height: 8px; flex-shrink: 0; }
                .ft-ping__ring { position: absolute; inset: 0; border-radius: 50%; background: #15803d; opacity: 0.4; animation: ft-ping 1.6s ease-out infinite; }
                .ft-ping__dot { position: absolute; inset: 1px; border-radius: 50%; background: #15803d; }
                @keyframes ft-ping { 0% { transform: scale(1); opacity: 0.4; } 100% { transform: scale(2.6); opacity: 0; } }

                .ft-channel { display: flex; margin-bottom: 18px; width: fit-content; }

                .ft-socials { display: flex; gap: 6px; flex-wrap: wrap; }
                .ft-social {
                    width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;
                    border: 1px solid var(--ft-ink); background: #fff; color: var(--ft-ink);
                    text-decoration: none; transition: background 0.15s, transform 0.15s;
                }
                .ft-social:hover { background: var(--ft-accent); transform: translateY(-2px); }

                .ft-label {
                    display: inline-block; font-family: var(--ft-mono); font-size: 9.5px; letter-spacing: 0.16em;
                    text-transform: uppercase; color: var(--ft-on-accent); background: var(--ft-accent);
                    padding: 2px 7px; margin-bottom: 18px;
                }
                .ft-list { display: flex; flex-direction: column; gap: 11px; }
                .ft-link {
                    display: inline-flex; align-items: center; gap: 5px; width: fit-content;
                    font-size: 13.5px; color: var(--ft-ink-2); text-decoration: none; transition: color 0.15s, transform 0.15s;
                }
                .ft-link:hover { color: var(--ft-ink); transform: translateX(3px); text-decoration: underline; text-underline-offset: 3px; }

                /* Built-by strip */
                .ft-builds {
                    padding: 26px 0; border-bottom: 1px solid var(--ft-rule);
                    display: flex; align-items: center; gap: 14px 28px; flex-wrap: wrap;
                }
                .ft-builds__label {
                    font-family: var(--ft-mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase;
                    color: var(--ft-ink-3); flex-shrink: 0;
                }
                .ft-builds__list { display: flex; flex-wrap: wrap; gap: 8px; }
                .ft-build {
                    font-family: var(--ft-mono); font-size: 10.5px; letter-spacing: 0.04em;
                    color: var(--ft-ink); text-decoration: none; padding: 5px 11px;
                    border: 1px solid var(--ft-ink); background: #fff;
                    display: inline-flex; align-items: center; gap: 6px;
                    transition: background 0.15s;
                }
                .ft-build:hover { background: var(--ft-accent); }

                /* Base bar */
                .ft-base {
                    padding: 20px 0 26px; display: flex; align-items: center; justify-content: space-between;
                    gap: 12px 24px; flex-wrap: wrap;
                }
                .ft-base__copy { font-family: var(--ft-mono); font-size: 10px; letter-spacing: 0.06em; color: var(--ft-ink-3); }
                .ft-base__legal { display: flex; gap: 18px; flex-wrap: wrap; }
                .ft-base__legal a {
                    font-family: var(--ft-mono); font-size: 10px; letter-spacing: 0.06em;
                    color: var(--ft-ink-3); text-decoration: none; transition: color 0.15s;
                }
                .ft-base__legal a:hover { color: var(--ft-ink); text-decoration: underline; text-underline-offset: 3px; }

                @media (max-width: 640px) { .ft-inner { padding: 0 18px; } }
                .ft :focus-visible { outline: 2px solid var(--ft-ink); outline-offset: 2px; }
                @media (prefers-reduced-motion: reduce) { .ft * { transition: none !important; animation: none !important; } }
            `}</style>

            <footer className="ft">
                <div className="ft-inner">
                    {/* Call-to-action band */}
                    <div className="ft-band">
                        <h2 className="ft-band__title">
                            Have a platform to build or a story to <em>run</em>?
                        </h2>
                        <div className="ft-band__actions">
                            <Link href="/bc/contact" className="ft-btn ft-btn--solid">
                                <span className="ft-btn__dot" /> Start a project
                            </Link>
                            <Link href="/advertise" className="ft-btn">
                                Advertise with us <ArrowUpRight size={13} />
                            </Link>
                            <InstallAppButton className="ft-btn" />
                            <NotifyButton className="ft-btn" />
                        </div>
                    </div>

                    {/* Main grid */}
                    <div className="ft-main">
                        <div className="ft-brand">
                            <Link href="/" className="ft-wordmark">
                                brown<em>.</em>dev
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
                            <a
                                href="https://whatsapp.com/channel/0029VbEGWFsC1FuAo5qoPh0q"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ft-btn ft-btn--solid ft-channel"
                            >
                                <MessageCircle size={13} /> Join my WhatsApp channel
                            </a>
                            <InstallAppButton className="ft-btn ft-channel" />
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
                        </div>

                        <div>
                            <span className="ft-label">Explore</span>
                            <nav className="ft-list">{explore.map(renderLink)}</nav>
                        </div>

                        <div>
                            <span className="ft-label">Work with me</span>
                            <nav className="ft-list">{work.map(renderLink)}</nav>
                        </div>

                        <div>
                            <span className="ft-label">Legal</span>
                            <nav className="ft-list">{legal.map(renderLink)}</nav>
                        </div>
                    </div>

                    {/* Built by */}
                    <div className="ft-builds">
                        <span className="ft-builds__label">Platforms I build</span>
                        <div className="ft-builds__list">
                            {builds.map((b) => (
                                <a key={b.name} href={b.url} target="_blank" rel="noopener noreferrer" className="ft-build">
                                    {b.name} <ArrowUpRight size={11} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Base bar */}
                    <div className="ft-base">
                        <span className="ft-base__copy">
                            &copy; {year} brown.dev / Sir Brown AD &middot; browncode.name.ng
                        </span>
                        <div className="ft-base__legal">
                            {legal.map((l) => (
                                <Link key={l.href} href={l.href}>
                                    {l.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}