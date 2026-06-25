import Footer from "@/components/footer";
import Link from "next/link";

// 1. VALUE-OPTIMIZED METADATA CONFIGURATION
export const metadata = {
    title: "Cheap Web Developer in Nigeria | Affordable Website Design – Browncode",
    description:
        "Looking for a cheap web developer in Nigeria? Browncode offers affordable, professional website design, e-commerce websites, portfolio sites, blogs, business sites and more.",
    keywords: [
        "cheap web developer in Nigeria",
        "affordable website designer Nigeria",
        "budget-friendly web developer",
        "cheap website design Abuja",
        "affordable software developer",
        "low cost website development Nigeria",
        "software developers",
        "web developers",
        "website developer"
    ],
    alternates: {
        canonical: "https://browncode.name.ng/cheap-web-developer-nigeria",
    },
};

// 2. SEO STRUCTURED DATA (JSON-LD - Focused on Service Affordability Mapping)
const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Browncode",
    image: "https://browncode.name.ng/logo.png",
    url: "https://browncode.name.ng",
    telephone: "+234-814-299-5114",
    priceRange: "₦100,000 - ₦1,200,000",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Kubwa",
        addressLocality: "Abuja",
        addressRegion: "FCT",
        addressCountry: "NG"
    },
    areaServed: {
        "@type": "Country",
        name: "Nigeria"
    }
};

// 3. AFFORDABILITY SCHEMATICS & MATRIX ARRAYS
const BENEFITS = [
    { label: "Optimized Baseline Costs", detail: "Professional grade deployment without inflated digital agency margins." },
    { label: "Rapid Delivery Engine", detail: "Lean, direct-to-market construction pipelines getting you live in record time." },
    { label: "Zero Speed Compromise", detail: "Built natively on Next.js to load instantly even over unstable mobile data links." },
    { label: "Built-In SEO Foundations", detail: "Clean structure, microdata schemas, and meta layouts mapped right out of the box." }
];

const COST_TABLE = [
    { plan: "Basic Portfolio Website", range: "₦250,000 – ₦400,000", scope: "Single-page landers, biography hubs, and basic lead captures." },
    { plan: "Business / Company Website", range: "₦450,000 – ₦700,000", scope: "Multi-page corporate layouts, custom service sheets, and contact pipes." },
    { plan: "News / Blog Website", range: "₦600,000 – ₦800,000", scope: "Dynamic CMS content architectures, infinite scrolling features, and media feeds." },
    { plan: "E-commerce Website", range: "₦800,000 – ₦1,200,000", scope: "Full digital store catalogs, secure checkouts, and local payment gateways." }
];

const SKILLS = ["Next.js & React.js", "Tailwind CSS", "Firebase Engine", "Node.js Architecture", "Vercel Cloud Hosting"];

const PROJECTS = [
    { name: "IJ Stitches Fashion Website", meta: "Modern design & fashion portfolio ecosystem", icon: "🧵" },
    { name: "The Cyclopedia", meta: "News portal, high-speed blog, and integrated media showcase", icon: "📰" },
    { name: "Browncode Portfolio", meta: "Core professional stack demonstration platform", icon: "👤", link: "https://browncode.name.ng" },
    { name: "E-commerce Store / Yotapoint", meta: "Fully operational transactional retail infrastructure", icon: "🛍" }
];

const FAQS = [
    { q: "How much is a cheap website in Nigeria?", a: "My basic fast-deployment frameworks initiate straight from ₦150,000, sizing and scaling dynamically based upon specific functional component additions." },
    { q: "How long does it take to build down the site?", a: "Most foundational value builds achieve full production staging within a 2 to 3 week delivery timeline." },
    { q: "Do you offer post-launch platform maintenance?", a: "Yes. I provide highly accessible, affordable platform optimization and structural update arrangements." },
    { q: "Can you build out custom full-stack software applications?", a: "Absolutely. Beyond static layouts, I design and deploy interactive administrative software panels and dynamic data engines." }
];

export default function CheapWebDeveloperNigeria() {
    const currentYear = new Date().getFullYear();

    return (
        // Canvas Container: VOID Background (#0b0b0f) & WHITE text (#f8f8ff)
        <div className="min-h-screen bg-[#0b0b0f] text-[#f8f8ff] antialiased selection:bg-[#7c3aed] selection:text-[#f8f8ff]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <main className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:py-24">

                {/* Value Proposition Hero Banner */}
                <header className="border-b border-[rgba(248,248,255,.07)] pb-12 mb-16">
                    <div className="inline-flex items-center gap-2 bg-[#7c3aed]/10 border border-[#7c3aed]/20 rounded-full px-3 py-1 mb-4 text-xs font-mono text-[#a855f7]">
                        <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse"></span> Maximize Capital Efficiency
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-4xl">
                        Cheap Web Developer in Nigeria <br />
                        <span className="text-[rgba(248,248,255,.4)]">— Budget-Friendly, Professional Engineering.</span>
                    </h1>
                    <p className="text-base sm:text-lg text-[rgba(248,248,255,.4)] mt-6 max-w-3xl leading-relaxed">
                        If you are searching for a <strong className="text-[#f8f8ff] font-medium">cheap web developer in Nigeria</strong> who delivers enterprise-grade performance without the agency markup, you are in the right node. At <strong className="text-[#f8f8ff] font-medium">Browncode</strong>, I strip out the overhead to construct fast, secure, mobile-optimized sites at flat rates that fit your operational budget.
                    </p>
                </header>

                {/* Grid-Based Value Matrix Block (DARK #11111a) */}
                <section className="mb-20">
                    <h2 className="text-xs font-mono uppercase tracking-wider text-[#a3e635] mb-6">// Performance Features</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {BENEFITS.map((benefit, idx) => (
                            <div key={idx} className="bg-[#11111a] border border-[rgba(248,248,255,.07)] p-5 rounded-xl hover:border-[rgba(248,248,255,.15)] transition-colors">
                                <h3 className="font-bold text-sm text-[#f8f8ff] mb-1">{benefit.label}</h3>
                                <p className="text-xs text-[rgba(248,248,255,.4)] leading-relaxed">{benefit.detail}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tabular Budget Specification Sheet (DARK2 #18182a layout matrix) */}
                <section className="bg-[#18182a] border border-[rgba(248,248,255,.07)] rounded-2xl p-6 sm:p-8 mb-20 shadow-2xl">
                    <h2 className="text-xl font-extrabold tracking-tight text-[#f8f8ff] mb-2">Affordable Website Packages</h2>
                    <p className="text-xs text-[rgba(248,248,255,.4)] mb-6">Fully transparent pricing matrices designed to scale with your project parameters.</p>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-[rgba(248,248,255,.12)] text-[rgba(248,248,255,.4)] font-mono uppercase tracking-wider">
                                    <th className="pb-3 pr-4 font-medium">Core Architecture</th>
                                    <th className="pb-3 px-4 font-medium">Investment Range</th>
                                    <th className="pb-3 pl-4 font-medium hidden md:table-cell">Structural Scope Summary</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[rgba(248,248,255,.07)] text-[rgba(248,248,255,.4)]">
                                {COST_TABLE.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-[#11111a]/40 transition-colors">
                                        <td className="py-4 pr-4 font-bold text-[#f8f8ff]">{row.plan}</td>
                                        <td className="py-4 px-4 font-mono font-bold text-[#a3e635]">{row.range}</td>
                                        <td className="py-4 pl-4 hidden md:table-cell leading-relaxed">{row.scope}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Core Modern Stack Deployment Horizontal Badge Strip */}
                <section className="mb-20 grid sm:grid-cols-4 gap-6 items-start border-y border-[rgba(248,248,255,.07)] py-8">
                    <div className="sm:col-span-1">
                        <h2 className="text-xs font-mono uppercase tracking-wider text-[#a855f7]">// Stack Arrays</h2>
                        <p className="text-[11px] text-[rgba(248,248,255,.4)] mt-1">Clean compilation via modern cloud technologies.</p>
                    </div>
                    <div className="sm:col-span-3 flex flex-wrap gap-2">
                        {SKILLS.map((skill, idx) => (
                            <span key={idx} className="bg-[#11111a] border border-[rgba(248,248,255,.07)] px-3 py-1.5 rounded-lg font-mono text-xs text-[#f8f8ff]">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Portfolio Showcase Section Grid */}
                <section className="mb-20">
                    <h2 className="text-xl font-extrabold tracking-tight text-[#f8f8ff] mb-6">Production Logs — Verified Platform Deliveries</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {PROJECTS.map((project, idx) => (
                            <div key={idx} className="bg-[#11111a] border border-[rgba(248,248,255,.07)] p-4 rounded-xl flex items-start gap-4">
                                <span className="text-xl p-2 bg-[#0b0b0f] rounded-lg border border-[rgba(248,248,255,.07)] shrink-0">{project.icon}</span>
                                <div className="space-y-1">
                                    {project.link ? (
                                        <Link href={project.link} className="text-xs font-bold text-[#a855f7] underline hover:text-[#7c3aed] block transition-colors">
                                            {project.name}
                                        </Link>
                                    ) : (
                                        <h3 className="text-xs font-bold text-[#f8f8ff]">{project.name}</h3>
                                    )}
                                    <p className="text-[11px] text-[rgba(248,248,255,.4)] leading-relaxed">{project.meta}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Structured Dynamic FAQ Assembly */}
                <section className="mb-20">
                    <h2 className="text-xl font-extrabold tracking-tight text-[#f8f8ff] mb-8">Frequently Answered Parameters</h2>
                    <div className="space-y-4">
                        {FAQS.map((faq, idx) => (
                            <div key={idx} className="bg-[#11111a] border border-[rgba(248,248,255,.07)] p-5 rounded-xl">
                                <h3 className="text-sm font-bold text-[#f8f8ff] flex gap-2">
                                    <span className="text-[#7c3aed] font-mono">{idx + 1}.</span>
                                    {faq.q}
                                </h3>
                                <p className="text-xs text-[rgba(248,248,255,.4)] mt-2 leading-relaxed pl-5 border-l border-[rgba(248,248,255,.07)]">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Conversion Hub Core Action Banner Box (DARK3 #1e1e30) */}
                <section className="bg-[#1e1e30] border border-[rgba(124,58,237,.25)] rounded-2xl p-8 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#7c3aed]/10 blur-3xl pointer-events-none rounded-full"></div>
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#a3e635]/5 blur-3xl pointer-events-none rounded-full"></div>

                    <h2 className="text-2xl sm:text-3xl font-black text-[#f8f8ff]">Launch Your Platform Intelligently</h2>
                    <p className="text-xs text-[rgba(248,248,255,.4)] mt-3 mx-auto leading-relaxed">
                        Secure high-performance infrastructure engineered inside your custom pricing parameters. Drop an active project specification brief on WhatsApp.
                    </p>

                    <div className="mt-6 text-xs font-mono text-[rgba(248,248,255,.4)] space-y-1">
                        <p>Direct FCT Routing Node: <strong className="text-[#a3e635]">+234-701-372-5529</strong></p>
                    </div>

                    <div className="mt-8">
                        <Link
                            href="https://wa.me/qr/RX4M5D4PGB7CO1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#65a30d] hover:bg-[#a3e635] text-[#0b0b0f] px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-md shadow-[#65a30d]/10"
                        >
                            Initiate Value Build
                        </Link>
                    </div>
                </section>

                <Footer />
            </main>
        </div>
    );
}