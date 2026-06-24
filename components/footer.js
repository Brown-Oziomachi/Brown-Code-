import Link from "next/link";
import { Linkedin, Github, Facebook, Instagram, MessageSquareCode } from "lucide-react";

export default function Footer() {
    const allYear = new Date().getFullYear();

    // Mock client array—replace these names, links, and image paths with your actual portfolio sites
    const clientDeployments = [
        { name: "YotaPoint", url: "https://yotapoint.com", logo: "/yota.jpg" },
        { name: "IJ_Stitches", url: "https://ij-stitches.vercel.app/main", logo: "/ijs.jpg" },
        { name: "TheCyclopedia_News", url: "https://www.thecyclopedia.com.ng", logo: "/the.jpg" },
        { name: "Not_Allowed", url: "", logo: "/ed.jpg" },
    ];

    // Configure your profile links here
    const socialEndpoints = [
        { name: "LinkedIn", url: "https://www.linkedin.com/in/brownoziomachi72a5a3229", icon: <Linkedin size={14} /> },
        { name: "GitHub", url: "https://github.com/Brown-Oziomachi", icon: <Github size={14} /> },
        // { name: "Facebook", url: "https://facebook.com/yourprofile", icon: <Facebook size={14} /> },
        { name: "Instagram", url: "https://instagram.com/Brown Oziomachi", icon: <Instagram size={14} /> },
        {
            name: "WhatsApp Business",
            url: "https://wa.me/2347013725529",
            icon: (
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            )
        }
    ];

    return (
        <footer className="bg-[#0b0b0f] border-t border-[rgba(248,248,255,.07)] py-12 mt-20 relative overflow-hidden">
            {/* Decorative Subtle Background Grid Beam */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-[#7c3aed]/30 to-transparent"></div>

            <div className="max-w-6xl mx-auto px-6">

                {/* Node 1: Primary Metadata Controls Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pb-8 border-b border-[rgba(248,248,255,.04)]">

                    {/* Brand System Ident */}
                    <div className="text-center md:text-left space-y-1">
                        <h4 className="text-sm font-black tracking-tight text-[rgba(248,248,255,0.48)]">
                            <Link href="/">{'< BROWN_CODE_DEV />'}</Link>
                        </h4>
                        <p className="text-[11px] font-mono text-[rgba(248,248,255,.35)]">
                            // Architecting High-Efficiency Web Applications at Scale.
                        </p>
                    </div>

                    {/* Navigation Index */}
                    <div className="flex justify-center gap-6 text-xs font-mono">
                        <Link
                            href="/sitemap-html"
                            className="text-[rgba(248,248,255,.45)] hover:text-cyan-400 transition-colors relative group py-1"
                        >
                            <span>Sitemap</span>
                            <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 transition-all group-hover:w-full"></span>
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-[rgba(248,248,255,.45)] hover:text-cyan-400 transition-colors relative group py-1"
                        >
                            <span>Privacy</span>
                            <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 transition-all group-hover:w-full"></span>
                        </Link>
                        <Link
                            href="/terms"
                            className="text-[rgba(248,248,255,.45)] hover:text-cyan-400 transition-colors relative group py-1"
                        >
                            <span>Terms</span>
                            <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 transition-all group-hover:w-full"></span>
                        </Link>
                        <Link
                            href="/faq"
                            className="text-[rgba(248,248,255,.45)] hover:text-cyan-400 transition-colors relative group py-1"
                        >
                            <span>Faq</span>
                            <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 transition-all group-hover:w-full"></span>
                        </Link>
                    </div>

                    {/* Live Telemetry Status Tag & Social Media Platform Registry */}
                    <div className="flex flex-col items-center md:items-end justify-center gap-3">
                        <div className="flex justify-center md:justify-end items-center gap-2 select-none">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 border-2"></span>
                            </span>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[rgba(248,248,255,.4)] bg-[#11111a] border border-[rgba(248,248,255,.07)] px-2.5 py-1 rounded">
                                Staging.Verified
                            </span>
                        </div>

                        {/* Interactive Social Interface Icons */}
                        <div className="flex items-center gap-3.5 text-[rgba(248,248,255,.4)]">
                            {socialEndpoints.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-cyan-400 hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.4)] transition-all duration-200 transform hover:-translate-y-0.5"
                                    title={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Node 2: Clickable Client Logo Showcase Block */}
                <div className="py-8 border-b border-[rgba(248,248,255,.04)] text-center md:text-left">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[rgba(248,248,255,0.3)] mb-4">
                        // verified_production_deployments
                    </p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-5 opacity-100 hover:opacity-100 transition-opacity duration-300">
                        {clientDeployments.map((client, index) => (
                            <a
                                key={index}
                                href={client.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" hover:grayscale-0 hover:contrast-100 transition-all duration-300 transform hover:scale-105 inline-block"
                                title={`Visit live site: ${client.name}`}
                            >
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className="lg:h-20 h-10 w-auto max-w-[90px] object-contain"
                                />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Legal Node Base */}
                <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] font-mono text-[rgba(248,248,255,.3)]">
                    <div className="text-center sm:text-left text-[10px] font-bold text-slate-600 tracking-widest uppercase font-mono">
                        <p>&copy; {allYear} BROWN_CODE.SYS. ALL RIGHTS RESERVED. SECURE_BUILD_V2.0.6</p>
                    </div>
                    <p className="text-[10px] font-mono tracking-widest text-[rgba(248,248,255,.4)] bg-[#11111a] border border-[rgba(248,248,255,.07)] px-2.5 py-1 rounded">
                        https://www.browncode.name.ng
                    </p>
                </div>
            </div>
        </footer>
    );
}