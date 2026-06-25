import Link from "next/link";
import { Linkedin, Github, Instagram, Mail } from "lucide-react";

export default function Footer() {
    const year = new Date().getFullYear();

    const clients = [
        { name: "YotaPoint", url: "https://yotapoint.com", logo: "/yota.jpg" },
        { name: "IJ Stitches", url: "https://ij-stitches.vercel.app/main", logo: "/ijs.jpg" },
        { name: "TheCyclopedia News", url: "https://www.thecyclopedia.com.ng", logo: "/the.jpg" },
        { name: "Confidential", url: "", logo: "/ed.jpg" },
    ];

    const nav = [
        { label: "Portfolio", href: "/portfolio" },
        { label: "Blog", href: "/blog" },
        { label: "FAQ", href: "/faq" },
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Sitemap", href: "/sitemap-html" },
        { label: "Advertise", href: "/advertise" },
    ];

    const socials = [
        { name: "LinkedIn", href: "https://www.linkedin.com/in/brownoziomachi72a5a3229", icon: <Linkedin size={15} /> },
        { name: "GitHub", href: "https://github.com/Brown-Oziomachi", icon: <Github size={15} /> },
        { name: "Instagram", href: "https://instagram.com/Brown-Oziomachi", icon: <Instagram size={15} /> },
        { name: "Email", href: "mailto:browncemmanuel@gmail.com", icon: <Mail size={15} /> },
        {
            name: "WhatsApp",
            href: "https://wa.me/2348142995114",
            icon: (
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            ),
        },
    ];

    return (
        <>
            <style>{`
                .ft {
                    background: #0a0a0b;
                    border-top: 1px solid #1e1e22;
                    font-family: 'Inter', system-ui, sans-serif;
                    margin-top: 80px;
                }

                .ft-inner {
                    max-width: 1120px;
                    margin: 0 auto;
                    padding: 0 24px;
                }

                /* ─── Main grid ─── */
                .ft-main {
                    display: grid;
                    grid-template-columns: 1.6fr 1fr 1fr;
                    gap: 56px;
                    padding: 52px 0 44px;
                    border-bottom: 1px solid #1e1e22;
                }

                @media (max-width: 800px) {
                    .ft-main {
                        grid-template-columns: 1fr 1fr;
                        gap: 36px;
                    }
                    .ft-col--brand { grid-column: 1 / -1; }
                }

                @media (max-width: 520px) {
                    .ft-main { grid-template-columns: 1fr; }
                    .ft-col--brand { grid-column: auto; }
                    .ft-col--status { align-items: flex-start; }
                }

                /* ─── Brand col ─── */
                .ft-wordmark {
                    font-family: 'JetBrains Mono', 'Fira Code', monospace;
                    font-size: 15px;
                    font-weight: 500;
                    letter-spacing: 0.04em;
                    color: #f4f4f5;
                    text-decoration: none;
                    display: inline-block;
                    margin-bottom: 12px;
                }

                .ft-wordmark em { font-style: normal; color: #e8ff47; }

                .ft-tagline {
                    font-size: 13px;
                    color: #52525b;
                    line-height: 1.65;
                    max-width: 280px;
                    margin-bottom: 20px;
                }

                .ft-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 10px;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    padding: 7px 14px;
                    border: 1px solid rgba(232,255,71,0.25);
                    border-radius: 4px;
                    background: rgba(232,255,71,0.06);
                    color: #e8ff47;
                    text-decoration: none;
                    transition: background 0.15s, border-color 0.15s;
                }

                .ft-cta:hover {
                    background: rgba(232,255,71,0.12);
                    border-color: rgba(232,255,71,0.45);
                }

                .ft-cta__dot {
                    width: 5px; height: 5px;
                    border-radius: 50%;
                    background: #e8ff47;
                    flex-shrink: 0;
                }

                /* ─── Nav col ─── */
                .ft-col-label {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 9px;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: #3f3f46;
                    display: block;
                    margin-bottom: 16px;
                }

                .ft-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .ft-nav__link {
                    font-size: 13px;
                    color: #71717a;
                    text-decoration: none;
                    transition: color 0.15s;
                    width: fit-content;
                }

                .ft-nav__link:hover { color: #f4f4f5; }

                /* ─── Status col ─── */
                .ft-col--status {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 20px;
                }

                .ft-status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 9px;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #52525b;
                    background: #111113;
                    border: 1px solid #1e1e22;
                    padding: 6px 12px;
                    border-radius: 4px;
                }

                /* Animated ping */
                .ft-ping {
                    position: relative;
                    width: 7px; height: 7px;
                    flex-shrink: 0;
                }

                .ft-ping__ring {
                    position: absolute;
                    inset: 0;
                    border-radius: 50%;
                    background: #e8ff47;
                    opacity: 0.35;
                    animation: ft-ping 1.6s ease-out infinite;
                }

                .ft-ping__dot {
                    position: absolute;
                    inset: 1px;
                    border-radius: 50%;
                    background: #e8ff47;
                }

                @keyframes ft-ping {
                    0%   { transform: scale(1);   opacity: 0.35; }
                    100% { transform: scale(2.4); opacity: 0; }
                }

                /* Socials */
                .ft-socials {
                    display: flex;
                    gap: 6px;
                }

                .ft-social-btn {
                    width: 36px; height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #1e1e22;
                    border-radius: 6px;
                    background: #111113;
                    color: #52525b;
                    text-decoration: none;
                    transition: color 0.15s, border-color 0.15s, background 0.15s;
                }

                .ft-social-btn:hover {
                    color: #e8ff47;
                    border-color: rgba(232,255,71,0.3);
                    background: rgba(232,255,71,0.06);
                }

                /* ─── Clients strip ─── */
                .ft-clients {
                    padding: 28px 0;
                    border-bottom: 1px solid #1e1e22;
                    display: flex;
                    align-items: center;
                    gap: 32px;
                    flex-wrap: wrap;
                }

                .ft-clients__label {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 9px;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: #3f3f46;
                    flex-shrink: 0;
                    white-space: nowrap;
                }

                .ft-clients__logos {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    flex-wrap: wrap;
                }

                .ft-client {
                    display: inline-block;
                    opacity: 0.35;
                    filter: grayscale(100%);
                    transition: opacity 0.2s, filter 0.2s, transform 0.2s;
                }

                .ft-client:hover {
                    opacity: 0.85;
                    filter: grayscale(0%);
                    transform: translateY(-2px);
                }

                .ft-client img {
                    height: 32px;
                    width: auto;
                    max-width: 72px;
                    object-fit: contain;
                    display: block;
                }

                /* ─── Base bar ─── */
                .ft-base {
                    padding: 18px 0 22px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .ft-base__copy {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 9px;
                    letter-spacing: 0.08em;
                    color: #3f3f46;
                }

                .ft-base__url {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 9px;
                    letter-spacing: 0.06em;
                    color: #3f3f46;
                    background: #111113;
                    border: 1px solid #1e1e22;
                    padding: 4px 10px;
                    border-radius: 4px;
                }
            `}</style>

            <footer className="ft">
                <div className="ft-inner">

                    {/* ── Main grid ── */}
                    <div className="ft-main">

                        {/* Brand */}
                        <div className="ft-col--brand">
                            <Link href="/" className="ft-wordmark">
                                brown<em>.</em>dev
                            </Link>
                            <p className="ft-tagline">
                                Full-stack software developer building performant, scalable web products. Based in Nigeria, working globally.
                            </p>
                            <Link href="/bc/contact" className="ft-cta">
                                <span className="ft-cta__dot" />
                                Available for projects
                            </Link>
                        </div>

                        {/* Nav */}
                        <div>
                            <span className="ft-col-label">Navigation</span>
                            <nav className="ft-nav">
                                {nav.map(({ label, href }) => (
                                    <Link key={href} href={href} className="ft-nav__link">
                                        {label}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Status + socials */}
                        <div className="ft-col--status">
                            <div className="ft-status-badge">
                                <span className="ft-ping">
                                    <span className="ft-ping__ring" />
                                    <span className="ft-ping__dot" />
                                </span>
                                Open to work
                            </div>
                            <div>
                                <span className="ft-col-label" style={{ textAlign: "right", display: "block", marginBottom: "12px" }}>
                                    Connect
                                </span>
                                <div className="ft-socials">
                                    {socials.map((s) => (
                                        <a
                                            key={s.name}
                                            href={s.href}
                                            target={s.href.startsWith("mailto") ? undefined : "_blank"}
                                            rel="noopener noreferrer"
                                            className="ft-social-btn"
                                            title={s.name}
                                        >
                                            {s.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* ── Client logos ── */}
                    <div className="ft-clients">
                        <span className="ft-clients__label">Production deployments</span>
                        <div className="ft-clients__logos">
                            {clients.map((c) =>
                                c.url ? (
                                    <a
                                        key={c.name}
                                        href={c.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ft-client"
                                        title={c.name}
                                    >
                                        <img src={c.logo} alt={c.name} />
                                    </a>
                                ) : (
                                    <span key={c.name} className="ft-client" title="Confidential">
                                        <img src={c.logo} alt="Confidential client" />
                                    </span>
                                )
                            )}
                        </div>
                    </div>

                    {/* ── Base bar ── */}
                    <div className="ft-base">
                        <span className="ft-base__copy">
                            &copy; {year} Sir Brown AD — All rights reserved
                        </span>
                        <span className="ft-base__url">browncode.name.ng</span>
                    </div>

                </div>
            </footer>
        </>
    );
}