import Link from "next/link";

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
        <div className="min-h-screen bg-[#0b0b0f] text-[#f8f8ff] antialiased selection:bg-[#7c3aed] selection:text-[#f8f8ff]">
            <main className="max-w-4xl mx-auto px-6 py-24 lg:py-32">

                {/* Document Header */}
                <header className="border-b border-[rgba(248,248,255,.07)] pb-8 mb-12">
                    <div className="inline-flex items-center gap-2 bg-[#65a30d]/10 border border-[#65a30d]/20 rounded-full px-3 py-1 mb-4 text-xs font-mono text-[#a3e635]">
            // Agreement Parameters
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                        Terms of Service
                    </h1>
                    <p className="text-xs font-mono text-[rgba(248,248,255,.4)] mt-3">
                        Effective Version: June 12, 2026 // Protocol: Active Agreement
                    </p>
                </header>

                {/* Content Flow */}
                <div className="space-y-10 text-sm text-[rgba(248,248,255,.65)] leading-relaxed">

                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-[#f8f8ff] font-mono flex items-center gap-2">
                            <span className="text-[#a855f7]">01.</span> Agreement Framework
                        </h2>
                        <p>
                            By accessing the digital portals or initiating full-scale development contracts with <strong className="text-[#f8f8ff] font-medium">Brown Code</strong>, you implicitly agree to be structurally bound by this operational codebase. Read these statements before finalizing your staging pipeline deposits.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-[#f8f8ff] font-mono flex items-center gap-2">
                            <span className="text-[#a3e635]">02.</span> Scope of Software Work
                        </h2>
                        <p>
                            All application feature sets, server timelines, deployment models, and design systems are explicitly detailed inside a project contract before launch. Any requests introduced after development has begun will be treated as separate extensions and billed outside the initial scope.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-[#f8f8ff] font-mono flex items-center gap-2">
                            <span className="text-[#a855f7]">03.</span> Financial Milestones & Retainers
                        </h2>
                        <p>
                            Projects run on step-by-step milestone payments as outlined in your original quote.
                        </p>
                        <div className="bg-[#11111a] border border-[rgba(248,248,255,.04)] p-4 rounded-xl text-xs space-y-2 text-[rgba(248,248,255,.5)]">
                            <p><strong>[Rule 3.1]</strong> Initial layout setup deposits are completely non-refundable once infrastructure allocation or code assembly has started.</p>
                            <p><strong>[Rule 3.2]</strong> Delays in milestone balance payments exceeding 14 business days will pause code assembly until balances are settled.</p>
                        </div>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-[#f8f8ff] font-mono flex items-center gap-2">
                            <span className="text-[#a3e635]">04.</span> Source Code & IP Transfer
                        </h2>
                        <p>
                            Until final payment is cleared, all mockups, private GitHub testing branches, and custom systems remain the intellectual property of <strong className="text-[#f8f8ff] font-medium">Brown Code</strong>. Upon receipt of full final payment, full production ownership, license permissions, and deployment access keys are completely transferred to the client.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-[#f8f8ff] font-mono flex items-center gap-2">
                            <span className="text-[#a855f7]">05.</span> Cloud Hosting Liability
                        </h2>
                        <p>
                            I build performant systems using cutting-edge tech stacks (Next.js, Tailwind, Firebase). However, I am not responsible for third-party hosting outages (Vercel, AWS), domain registration lapses, or external API modifications that occur after deployment.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-[#f8f8ff] font-mono flex items-center gap-2">
                            <span className="text-[#a3e635]">06.</span> Contract Termination
                        </h2>
                        <p>
                            Either party holds the right to terminate a project engagement if the other party breaches the defined terms. In the event of early termination, the client will be billed proportionally for all milestones completed up to that exact date.
                        </p>
                    </section>

                </div>

                {/* Action Node Link Back */}
                <footer className="mt-16 pt-8 border-t border-[rgba(248,248,255,.07)] flex flex-col sm:flex-row justify-between items-center gap-4">
                    <Link href="/" className="text-xs font-mono text-[#a3e635] hover:underline flex items-center gap-1">
                        &lt;-- Return to Main Matrix
                    </Link>
                    <span className="text-[11px] font-mono text-[rgba(248,248,255,.2)]">
                        © {currentYear} Brown Code // Legal.Active
                    </span>
                </footer>

            </main>
        </div>
    );
}