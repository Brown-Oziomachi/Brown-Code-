import Link from "next/link";

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
        <div className="min-h-screen bg-[#0b0b0f] text-[#f8f8ff] antialiased selection:bg-[#7c3aed] selection:text-[#f8f8ff]">
            <main className="max-w-4xl mx-auto px-6 py-24 lg:py-32">

                {/* Document Header */}
                <header className="border-b border-[rgba(248,248,255,.07)] pb-8 mb-12">
                    <div className="inline-flex items-center gap-2 bg-[#7c3aed]/10 border border-[#7c3aed]/20 rounded-full px-3 py-1 mb-4 text-xs font-mono text-[#a855f7]">
            // Document Identity Map
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                        Privacy Policy
                    </h1>
                    <p className="text-xs font-mono text-[rgba(248,248,255,.4)] mt-3">
                        Effective Version: June 12, 2026 // Node Status: Locked
                    </p>
                </header>

                {/* Content Flow */}
                <div className="space-y-10 text-sm text-[rgba(248,248,255,.65)] leading-relaxed">

                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-[#f8f8ff] font-mono flex items-center gap-2">
                            <span className="text-[#a3e635]">01.</span> Operational Overview
                        </h2>
                        <p>
                            At <strong className="text-[#f8f8ff] font-medium">Brown Code</strong> (accessible via <code className="text-[#a855f7] bg-[#11111a] px-1.5 py-0.5 rounded border border-[rgba(248,248,255,.05)] font-mono text-xs">browncode.name.ng</code>), I respect data integrity. This documentation charts exactly how client files, system metrics, and real-time support variables are gathered and stored.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-[#f8f8ff] font-mono flex items-center gap-2">
                            <span className="text-[#a3e635]">02.</span> Telemetry & Data Inputs
                        </h2>
                        <p>
                            I run a minimal data footprint. The platform isolates data collection down to two operational segments:
                        </p>
                        <ul className="list-inside list-disc pl-2 space-y-1.5 text-xs">
                            <li><strong className="text-[#f8f8ff]">Voluntary Form Fields:</strong> Identity inputs like your name, electronic address, and specification targets shared via live chat widgets or WhatsApp routing steps.</li>
                            <li><strong className="text-[#f8f8ff]">Chat Log Staging:</strong> Interactive dialogue components map records temporarily to Firestore layers to enable session recall during infrastructure support.</li>
                            <li><strong className="text-[#f8f8ff]">Anonymized System Logs:</strong> Minor viewport parameters, network paths, and browser variables generated through Vercel CDN engines to optimize structural speeds.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-[#f8f8ff] font-mono flex items-center gap-2">
                            <span className="text-[#a3e635]">03.</span> Utilization Protocol
                        </h2>
                        <p>
                            Information parameters are strictly dedicated to performance and operations:
                        </p>
                        <p className="text-xs bg-[#11111a] border border-[rgba(248,248,255,.04)] p-4 rounded-xl font-mono text-[rgba(248,248,255,.45)]">
                            &gt; To configure, build, and deploy personal software pipelines.<br />
                            &gt; To transmit active engineering assessments, quotes, and billing tables.<br />
                            &gt; To protect root site endpoints from bad actors and distributed layout attacks.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-[#f8f8ff] font-mono flex items-center gap-2">
                            <span className="text-[#a3e635]">04.</span> Sharing Framework boundaries
                        </h2>
                        <p>
                            I strictly do not monetize, distribute, or exchange personal data strings with marketing agencies. Information parameters are only routed through verified standard storage nodes (such as Firebase or Vercel cloud architecture) required to compile your application views.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-[#f8f8ff] font-mono flex items-center gap-2">
                            <span className="text-[#a3e635]">05.</span> Execution Rights
                        </h2>
                        <p>
                            You maintain root authority over your data variables. You can invoke a complete wipe of historic support records or live chat data loops at any point by connecting directly to the network control node via WhatsApp.
                        </p>
                    </section>

                </div>

                {/* Action Node Link Back */}
                <footer className="mt-16 pt-8 border-t border-[rgba(248,248,255,.07)] flex flex-col sm:flex-row justify-between items-center gap-4">
                    <Link href="/" className="text-xs font-mono text-[#a3e635] hover:underline flex items-center gap-1">
                        &lt;-- Return to Main Matrix
                    </Link>
                    <span className="text-[11px] font-mono text-[rgba(248,248,255,.2)]">
                        © {currentYear} Brown Code // Sec.Verified
                    </span>
                </footer>

            </main>
        </div>
    );
}