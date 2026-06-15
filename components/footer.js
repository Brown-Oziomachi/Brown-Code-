import Link from "next/link";

export default function Footer() {
    const allYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0b0b0f] border-t border-[rgba(248,248,255,.07)] py-12 mt-20 relative overflow-hidden">
            {/* Decorative Subtle Background Grid Beam */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-[#7c3aed]/30 to-transparent"></div>

            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pb-8 border-b border-[rgba(248,248,255,.04)]">

                    {/* Node 1: Brand System Ident */}
                    <div className="text-center md:text-left space-y-1">
                        <h4 className="text-sm font-black tracking-tight text-[rgba(248,248,255,0.48)]">
                            BROWN_CODE_SYS
                        </h4>
                        <p className="text-[11px] font-mono text-[rgba(248,248,255,.35)]">
              // High Efficiency Web Systems.
                        </p>
                    </div>

                    {/* Node 2: Navigation Index */}
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
                    </div>

                    {/* Node 3: Live Telemetry Status Tag */}
                    <div className="flex justify-center md:justify-end items-center gap-2 select-none">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[rgba(248,248,255,.4)] bg-[#11111a] border border-[rgba(248,248,255,.07)] px-2.5 py-1 rounded">
                            Staging.Verified
                        </span>
                    </div>

                </div>

                {/* Legal Node Base */}
                <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] font-mono text-[rgba(248,248,255,.3)]">
                    <div className="max-w-6xl mx-auto px-6 text-center text-[10px] font-bold text-slate-600 tracking-widest uppercase font-mono">
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