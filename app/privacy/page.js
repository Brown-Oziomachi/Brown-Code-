import Link from "next/link";
import { Terminal, ShieldCheck, Binary, ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Privacy Policy | Brown Code",
    description: "Learn how Brown Code handles data telemetry, information privacy, and client records securely.",
    alternates: {
        canonical: "https://browncode.name.ng/privacy",
    },
};

export default function PrivacyPolicy() {
    const currentYear = new Date().getFullYear();

    return (
        <>
         <nav className="relative z-10 border-b border-slate-800/80 bg-[#090d16]/80 backdrop-blur-md sticky top-0 z-[9999]">
                    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3 group">
                <Terminal size={18} className="text-cyan-400 group-hover:rotate-6 transition-transform" />
                            <a href="/">
                                <span className="text-sm font-bold text-white tracking-wider uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                                BROWN_CODE_DEV //  PRIV_MANIFES
                                </span>
                            </a>
                        </div>
                        <a
                            href="/"
                            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-950/80 transition-all duration-300 shadow-sm hover:shadow-cyan-500/5"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                            <span>SYS.RETURN()</span>
                        </a>
                    </div>
        </nav>
        <div className="min-h-screen bg-[#030712] text-slate-100 antialiased font-mono pt-12 selection:bg-cyan-500/30 selection:text-cyan-200">
            <main className="max-w-4xl mx-auto px-4 md:px-6 py-24 lg:py-32">

                {/* Developer / Security Header Block */}
                <header className="relative w-full rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-md overflow-hidden p-6 md:p-10 shadow-2xl mb-12">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none hidden sm:block">
                        <Binary size={180} />
                    </div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 text-cyan-400 text-xs px-4 py-1.5 rounded-md tracking-wider uppercase mb-6">
                            <Terminal size={14} className="animate-pulse" />
                            SECURE_SHELL // PRIV_MANIFEST
                        </div>

                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
                            PRIVACY_<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">POLICY</span>
                        </h1>

                        <p className="text-xs text-slate-500 tracking-wide mt-2">
                            Effective Version: June 12, 2026 <span className="text-slate-700">//</span> Node Status: <span className="text-emerald-400 font-bold">LOCKED_AND_VERIFIED</span>
                        </p>
                    </div>
                </header>

                {/* Content Pipeline Stream */}
                <div className="space-y-10 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans border-b border-slate-900 pb-12">

                    <section className="space-y-3">
                        <h2 className="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-2 tracking-tight">
                            <span className="text-cyan-400">[01]</span> OPERATIONAL OVERVIEW
                        </h2>
                        <p className="pl-0 sm:pl-7">
                            At <strong className="text-white font-bold font-mono text-xs">BROWN CODE</strong> (accessible via <code className="text-cyan-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 font-mono text-xs">browncode.name.ng</code>), I respect data integrity. This documentation charts exactly how client files, system metrics, and real-time support variables are gathered, analyzed, and stored.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-2 tracking-tight">
                            <span className="text-cyan-400">[02]</span> TELEMETRY & DATA INPUTS
                        </h2>
                        <p className="pl-0 sm:pl-7">
                            I run a minimal data footprint. The platform isolates data collection down to three explicit operational segments:
                        </p>
                        <ul className="list-inside list-disc pl-2 sm:pl-9 space-y-2 text-xs font-mono text-slate-300">
                            <li><strong className="text-cyan-400">Voluntary Form Fields:</strong> Identity inputs like your name, electronic address, and specification targets shared via live chat widgets or WhatsApp routing steps.</li>
                            <li><strong className="text-cyan-400">Chat Log Staging:</strong> Interactive dialogue components map records temporarily to Firestore layers to enable session recall during infrastructure support.</li>
                            <li><strong className="text-cyan-400">Anonymized System Logs:</strong> Minor viewport parameters, network paths, and browser variables generated through Vercel CDN engines to optimize structural configuration speeds.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-2 tracking-tight">
                            <span className="text-cyan-400">[03]</span> UTILIZATION PROTOCOL
                        </h2>
                        <p className="pl-0 sm:pl-7">
                            Information parameters are strictly processed through clean, non-malicious operations:
                        </p>
                        <div className="ml-0 sm:ml-7 text-xs bg-slate-950 border border-slate-900 p-4 rounded-xl font-mono text-slate-500 space-y-1">
                            <div>$ execute --target="configure, build, and deploy personal software pipelines."</div>
                            <div>$ execute --target="transmit active engineering assessments, quotes, and billing tables."</div>
                            <div>$ execute --target="protect root site endpoints from bad actors and distributed layout attacks."</div>
                        </div>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-2 tracking-tight">
                            <span className="text-cyan-400">[04]</span> SHARING FRAMEWORK BOUNDARIES
                        </h2>
                        <p className="pl-0 sm:pl-7">
                            I strictly do not monetize, distribute, or exchange personal data strings with marketing agencies. Information parameters are only routed through verified standard storage nodes (such as Firebase or Vercel cloud architectures) required to compile your system application views.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-2 tracking-tight">
                            <span className="text-cyan-400">[05]</span> EXECUTION RIGHTS
                        </h2>
                        <p className="pl-0 sm:pl-7">
                            You maintain root authority over your data variables. You can invoke a complete, irrevocable wipe of historical support records or live chat data loops at any point by connecting directly to the network control node via WhatsApp.
                        </p>
                    </section>

                </div>

                {/* Matrix Controls Footer */}
                <footer className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6 font-mono">
                    <Link
                        href="/"
                        className="w-full sm:w-auto group flex items-center justify-center gap-2 px-5 py-2.5 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-200 rounded-md text-xs uppercase tracking-wider"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        RETURN_TO_BASE
                    </Link>

                    <div className="flex items-center gap-2 text-[11px] text-slate-600">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        <span>© {currentYear} BROWN_CODE // SEC_VERIFIED</span>
                    </div>
                </footer>

            </main>
            </div>
        </>

    );
}