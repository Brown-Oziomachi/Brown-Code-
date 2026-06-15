import Link from "next/link";
import { Terminal, Scale, Binary, ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Terms of Service | Brown Code",
    description: "Review the operational terms, intellectual property scopes, and milestone guidelines of Brown Code.",
    alternates: {
        canonical: "https://browncode.name.ng/terms",
    },
};

export default function TermsOfService() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="min-h-screen bg-[#030712] text-slate-100 antialiased font-mono selection:bg-cyan-500/30 selection:text-cyan-200">
            <main className="max-w-4xl mx-auto px-4 md:px-6 py-24 lg:py-32">

                {/* Developer / Legal Agreement Header Block */}
                <header className="relative w-full rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-md overflow-hidden p-6 md:p-10 shadow-2xl mb-12">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none hidden sm:block">
                        <Binary size={180} />
                    </div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 text-cyan-400 text-xs px-4 py-1.5 rounded-md tracking-wider uppercase mb-6">
                            <Terminal size={14} className="animate-pulse" />
                            AGREEMENT_ENGINE // TERMS_MANIFEST
                        </div>

                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
                            TERMS_OF_<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">SERVICE</span>
                        </h1>

                        <p className="text-xs text-slate-500 tracking-wide mt-2">
                            Effective Version: June 12, 2026 <span className="text-slate-700">//</span> Protocol: <span className="text-emerald-400 font-bold">ACTIVE_AGREEMENT</span>
                        </p>
                    </div>
                </header>

                {/* Content Pipeline Stream */}
                <div className="space-y-10 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans border-b border-slate-900 pb-12">

                    <section className="space-y-3">
                        <h2 className="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-2 tracking-tight">
                            <span className="text-cyan-400">[01]</span> AGREEMENT FRAMEWORK
                        </h2>
                        <p className="pl-0 sm:pl-7">
                            By accessing the digital portals or initiating full-scale development contracts with <strong className="text-white font-bold font-mono text-xs">BROWN CODE</strong>, you implicitly agree to be structurally bound by this operational codebase. Read these statements before finalizing your staging pipeline deposits.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-2 tracking-tight">
                            <span className="text-cyan-400">[02]</span> SCOPE OF SOFTWARE WORK
                        </h2>
                        <p className="pl-0 sm:pl-7">
                            All application feature sets, server timelines, deployment models, and design systems are explicitly detailed inside a project contract before launch. Any requests introduced after development has begun will be treated as separate extensions and billed outside the initial scope.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-2 tracking-tight">
                            <span className="text-cyan-400">[03]</span> FINANCIAL MILESTONES & RETAINERS
                        </h2>
                        <p className="pl-0 sm:pl-7">
                            Projects run on step-by-step milestone payments as outlined in your original quote.
                        </p>

                        <div className="ml-0 sm:ml-7 text-xs bg-slate-950 border border-slate-900 p-4 rounded-xl font-mono text-slate-500 space-y-2">
                            <p><strong className="text-cyan-400 font-bold">// Rule 3.1:</strong> Initial layout setup deposits are completely non-refundable once infrastructure allocation or code assembly has started.</p>
                            <p><strong className="text-cyan-400 font-bold">// Rule 3.2:</strong> Delays in milestone balance payments exceeding 14 business days will pause code assembly loops until balances are settled.</p>
                        </div>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-2 tracking-tight">
                            <span className="text-cyan-400 Ram">[04]</span> SOURCE CODE & IP TRANSFER
                        </h2>
                        <p className="pl-0 sm:pl-7">
                            Until final payment is cleared, all mockups, private GitHub testing branches, and custom systems remain the intellectual property of <strong className="text-white font-bold font-mono text-xs">BROWN CODE</strong>. Upon receipt of full final payment, full production ownership, license permissions, and deployment access keys are completely transferred to the client.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-2 tracking-tight">
                            <span className="text-cyan-400">[05]</span> CLOUD HOSTING LIABILITY
                        </h2>
                        <p className="pl-0 sm:pl-7">
                            I build performant systems using cutting-edge tech stacks (Next.js, Tailwind, Firebase). However, I am not responsible for third-party hosting outages (Vercel, AWS), domain registration lapses, or external API modifications that occur after deployment.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-2 tracking-tight">
                            <span className="text-cyan-400">[06]</span> CONTRACT TERMINATION
                        </h2>
                        <p className="pl-0 sm:pl-7">
                            Either party holds the right to terminate a project engagement if the other party breaches the defined terms. In the event of early termination, the client will be billed proportionally for all milestones completed up to that exact date.
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
                        RETURN_TO_MAIN_MATRIX
                    </Link>

                    <div className="flex items-center gap-2 text-[11px] text-slate-600">
                        <Scale size={14} className="text-emerald-500" />
                        <span>© {currentYear} BROWN_CODE // LEGAL_ACTIVE</span>
                    </div>
                </footer>

            </main>
        </div>
    );
}