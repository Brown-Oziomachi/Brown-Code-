import Link from "next/link";
import { Linkedin, Github, Mail, ArrowUpRight, MessageCircle } from "lucide-react";
import InstallAppButton from "@/components/InstallAppButton";
import NotifyButton from "@/components/NotifyButton";

export default function Footer() {
    const year = new Date().getFullYear();

    const columns = [
        {
            title: "Explore",
            links: [
                { label: "Portfolio", href: "/portfolio" },
                { label: "About", href: "/bc/about" },
                { label: "Blog", href: "/blog" },
                { label: "Tech News", href: "/tech-news" },
                { label: "Gallery", href: "/gallery" },
                { label: "Jobs", href: "/jobs" },
                { label: "Newsletter", href: "/newsletter" },
                { label: "FAQ", href: "/faq" },
            ],
        },
        {
            title: "Work with me",
            links: [
                { label: "Contact", href: "/bc/contact" },
                { label: "Services", href: "/services" },
                { label: "Get a Website", href: "/get-a-website" },
                { label: "Advertise", href: "/advertise" },
                { label: "Sponsor", href: "https://github.com/sponsors/Brown-Oziomachi/", external: true },
            ],
        },
        {
            title: "Platforms",
            links: [
                { label: "Fraud Radar NG", href: "https://fraudradarng.vercel.app", external: true },
                { label: "LAN Library", href: "https://learningaccessnetwork.vercel.app", external: true },
                { label: "TheCyclopedia News", href: "https://www.thecyclopedia.com.ng", external: true },
                { label: "YotaPoint", href: "https://yotapoint.com", external: true },
            ],
        },
        {
            title: "Legal",
            links: [
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
                { label: "Sitemap", href: "/sitemap-html" },
            ],
        },
    ];

    const bottom = [
        { label: "About Us", href: "/bc/about" },
        { label: "Advertise With Us", href: "/advertise" },
        { label: "Contact", href: "/bc/contact" },
        { label: "Jobs", href: "/jobs" },
        { label: "Newsletter", href: "/newsletter" },
    ];

    const socials = [
        { name: "LinkedIn", href: "https://www.linkedin.com/in/brownoziomachi72a5a3229", icon: <Linkedin size={18} /> },
        { name: "GitHub", href: "https://github.com/Brown-Oziomachi", icon: <Github size={18} /> },
        { name: "Email", href: "mailto:browncemmanuel@gmail.com", icon: <Mail size={18} /> },
        {
            name: "WhatsApp",
            href: "https://wa.me/2348142995114",
            icon: (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            ),
        },
    ];

    const renderLink = ({ label, href, external }) =>
        external ? (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="ft-link">
                {label} <ArrowUpRight size={11} className="ft-link__icon" />
            </a>
        ) : (
            <Link key={label} href={href} className="ft-link">
                {label}
            </Link>
        );

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Noto+Serif:wght@400;500&family=Inter:wght@400;500;600&display=swap');

                .ft {
                    --bg: #121212; --line: #3a3a3e; --ink: #ffffff; --ink-2: #c4c4ca; --ink-3: #8a8a93;
                    --blue: #0b9be6; --navy: #0a3d62; --navy-2: #0d5183;
                    --head: 'Archivo', 'Inter', system-ui, sans-serif;
                    --serif: 'Noto Serif', Georgia, serif;
                    --sans: 'Inter', system-ui, sans-serif;
                    background: var(--bg); color: var(--ink-2); font-family: var(--sans); margin-top: 80px;
                    border-top: 1px solid var(--line);
                }
                .ft *, .ft *::before, .ft *::after { box-sizing: border-box; }
                .ft h2, .ft h3, .ft p { margin: 0; }
                .ft-inner { max-width: 1240px; margin: 0 auto; padding: 0 28px; }

                .ft-top { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.6fr); gap: 72px; padding: 80px 0 48px; }
                @media (max-width: 1000px) { .ft-top { grid-template-columns: minmax(0, 1fr); gap: 48px; padding-top: 56px; } }

                /* brand side */
                .ft-wordmark { font-family: var(--head); font-weight: 800; font-size: 40px; letter-spacing: -0.02em; color: var(--ink); text-decoration: none; display: inline-block; line-height: 1; }
                .ft-wordmark em { font-style: normal; color: var(--blue); }
                .ft-motto { margin-top: 6px; font-family: var(--head); font-size: 10px; letter-spacing: 0.04em; color: var(--ink-2); }
                .ft-brief { margin-top: 44px; font-family: var(--head); font-weight: 700; font-size: 26px; color: var(--ink); letter-spacing: -0.01em; }
                .ft-brief-text { margin-top: 14px; font-family: var(--serif); font-size: 17px; line-height: 1.75; color: var(--ink-2); max-width: 420px; }
                .ft-sub { display: inline-block; margin-top: 24px; background: var(--navy); color: #fff; text-decoration: none; font-family: var(--head); font-weight: 600; font-size: 14px; letter-spacing: 0.02em; text-transform: uppercase; padding: 17px 31px; border-radius: 6px; transition: background 0.15s; }
                .ft-sub:hover { background: var(--navy-2); }
                .ft-connect { margin-top: 44px; font-family: var(--head); font-weight: 700; font-size: 18px; color: var(--ink); }
                .ft-socials { display: flex; gap: 14px; margin-top: 20px; flex-wrap: wrap; }
                .ft-social { width: 55px; height: 55px; border-radius: 50%; background: #232326; display: flex; align-items: center; justify-content: center; color: var(--ink); text-decoration: none; transition: background 0.15s, color 0.15s; }
                .ft-social:hover { background: var(--blue); }
                .ft-app { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
                .ft-app button, .ft-app a { font-family: var(--head); }
                .ft-btn { display: inline-flex; align-items: center; gap: 8px; font-family: var(--head); font-size: 12px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; padding: 11px 16px; border: 1px solid #55555b; border-radius: 6px; color: var(--ink); background: transparent; text-decoration: none; cursor: pointer; transition: background 0.15s, border-color 0.15s; }
                .ft-btn:hover { background: #232326; border-color: var(--blue); }
                .ft-btn--blue { background: var(--blue); border-color: var(--blue); color: #04121c; }
                .ft-btn--blue:hover { background: #fff; border-color: #fff; }
                .ft-address { margin-top: 36px; font-family: var(--serif); font-size: 17px; line-height: 1.75; color: var(--ink-2); max-width: 420px; }

                /* link columns */
                .ft-cols { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 28px; align-content: start; }
                @media (max-width: 1000px) { .ft-cols { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 40px 28px; } }
                .ft-colhead { font-family: var(--head); font-weight: 700; font-size: 19px; text-transform: uppercase; letter-spacing: 0.01em; color: var(--ink); padding: 0 0 24px; border-bottom: 1px solid var(--line); margin-bottom: 26px; min-height: 66px; display: flex; align-items: flex-end; }
                .ft-list { display: flex; flex-direction: column; gap: 14px; padding-left: 5px; }
                .ft-link { display: inline-flex; align-items: center; gap: 5px; width: fit-content; font-family: var(--head); font-weight: 500; font-size: 15px; color: var(--ink); text-decoration: none; transition: color 0.15s; }
                .ft-link__icon { color: var(--ink-3); }
                .ft-link:hover { color: var(--blue); text-decoration: underline; text-underline-offset: 3px; }

                /* base */
                .ft-base { border-top: 1px solid var(--line); padding: 24px 0 14px; display: flex; flex-wrap: wrap; align-items: center; gap: 10px 0; }
                .ft-base a { font-family: var(--head); font-weight: 600; font-size: 15px; color: var(--ink); text-decoration: none; }
                .ft-base a:hover { color: var(--blue); }
                .ft-base a + a::before { content: '\\2022'; color: var(--ink-2); margin: 0 22px; font-size: 10px; display: inline-block; vertical-align: middle; }
                .ft-copy { padding: 0 0 32px; font-size: 12.5px; color: var(--ink-3); }
                .ft-copy strong { color: var(--ink-2); font-weight: 500; }

                @media (max-width: 640px) { .ft-inner { padding: 0 18px; } .ft-base a + a::before { margin: 0 12px; } }
                .ft :focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; }
                @media (prefers-reduced-motion: reduce) { .ft * { transition: none !important; } }
            `}</style>

            <footer className="ft">
                <div className="ft-inner">
                    <div className="ft-top">
                        <div>
                            <Link href="/" className="ft-wordmark">
                                SIR-AD <em>BLOG</em>
                            </Link>
                            <p className="ft-motto">Fraud awareness. Web security. Built in Nigeria.</p>

                            <h2 className="ft-brief">Get the weekly scam alerts</h2>
                            <p className="ft-brief-text">
                                Start your week with the latest fraud warnings, security lessons and plain-language
                                guides delivered straight to your phone or inbox.
                            </p>
                            <Link href="/newsletter" className="ft-sub">Subscribe</Link>

                            <h3 className="ft-connect">Connect with us</h3>
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
                                    className="ft-btn ft-btn--blue"
                                >
                                    <MessageCircle size={14} /> WhatsApp channel
                                </a>
                                <InstallAppButton className="ft-btn" />
                                <NotifyButton className="ft-btn" />
                            </div>

                            <p className="ft-address">Abuja, Nigeria. Open to projects, remote worldwide.</p>
                        </div>

                        <div className="ft-cols">
                            {columns.map((col) => (
                                <div key={col.title}>
                                    <h3 className="ft-colhead">{col.title}</h3>
                                    <nav className="ft-list" aria-label={col.title}>{col.links.map(renderLink)}</nav>
                                </div>
                            ))}
                        </div>
                    </div>

                    <nav className="ft-base" aria-label="Footer">
                        {bottom.map((l) => (
                            <Link key={l.label} href={l.href}>{l.label}</Link>
                        ))}
                    </nav>
                    <p className="ft-copy">
                        &copy; {year} <strong>Sir-AD Blog</strong> / Sir Brown AD &middot; Abuja, Nigeria
                    </p>
                </div>
            </footer>
        </>
    );
}