import Footer from "@/components/footer";
import Link from "next/link";

// 1. CONTINENTAL METADATA CONFIGURATION
export const metadata = {
    title: "Expert Software Developer in Africa – Brown Code | Web Engineering Solutions",
    description:
        "Looking for an elite software developer in Africa? Brown Code builds world-class, fast, and scalable Next.js applications, e-commerce architectures, and SaaS products globally.",
    keywords: [
        "software developer in Africa",
        "best web developer Africa",
        "hire remote software engineer Africa",
        "tech talent Nigeria Africa",
        "full stack developer Africa"
    ],
    alternates: {
        canonical: "https://browncode.name.ng/software-developer-africa",
    },
};

// 2. PANAFRICAN SEO STRUCTURED DATA (JSON-LD)
const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Brown Code",
    image: "https://browncode.name.ng/logo.png",
    url: "https://browncode.name.ng",
    telephone: "+234-814-299-5114",
    priceRange: "$500 - $10,000+", // Switched to international standard pricing reference
    address: {
        "@type": "PostalAddress",
        streetAddress: "Kubwa",
        addressLocality: "Abuja",
        addressRegion: "FCT",
        postalCode: "900001",
        addressCountry: "NG" // Base of Operations
    },
    areaServed: [
        { "@type": "Continent", name: "Africa" }, // Targets the continental index layer
        { "@type": "Country", name: "Nigeria" },
        { "@type": "Country", name: "Ghana" },
        { "@type": "Country", name: "Kenya" },
        { "@type": "Country", name: "South Africa" }
    ],
    sameAs: [
        "https://x.com/BrownC15427449",
        "https://www.linkedin.com/in/brownoziomachi72a5a3229"
    ]
};

// 3. CONTINENTAL OPERATION DATA DICTIONARIES
const CORE_CAPABILITIES = [
    { metric: "01", title: "Full-Stack Web Architectures", body: "Engineering highly dynamic client portals, custom business solutions, and blazing-fast landing platforms utilizing Next.js, React, and Tailwind CSS." },
    { block: "02", title: "Cross-Border E-Commerce", body: "Building custom checkout flows, localized automated currency models, and robust multi-vendor order routing networks." },
    { block: "03", title: "SaaS & Cloud Native Engines", body: "Developing scalable management panels, cloud databases, structured real-time metrics trackers, and secure API layers." },
    { block: "04", title: "Enterprise Technical SEO", body: "Optimizing codebases for global search engines using strict layout structures, fast content delivery pipelines, and deep JSON-LD semantic data." }
];

const ECOSYSTEMS = [
    { market: "Pan-African Reach", description: "Deploying high-performance web systems engineered specifically to combat unstable connection parameters across multiple African regional networks." },
    { market: "Global Standardization", description: "Delivering modern, modular, clean source code matching the fast production metrics expected by international product teams." },
    { market: "Agile Build Delivery", description: "Fast, transparent production lifecycles structured around automated testing blocks, interactive prototype stages, and clear feedback loops." }
];

export default function WebDeveloperAfrica() {
    const currentYear = new Date().getFullYear();

    return (
        // Canvas Base: VOID Background (#0b0b0f) & WHITE text (#f8f8ff)
        <div className="min-h-screen bg-[#0b0b0f] text-[#f8f8ff] antialiased selection:bg-[#7c3aed] selection:text-[#f8f8ff]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            {/* Premium Continental Layout Shell */}
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-20">
                <div className="grid lg:grid-cols-12 gap-16 items-start">

                    {/* LEFT SIDEBAR SECTION - Sticky Brand Matrix Column (4 Columns) */}
                    <div className="lg:col-span-4 lg:sticky lg:top-12 space-y-8 border-b lg:border-b-0 lg:border-r border-[rgba(248,248,255,.07)] (BORDER2) pb-8 lg:pb-0 lg:pr-8">
                        <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#a3e635] (LIME) bg-[#a3e635]/10 px-3 py-1 rounded border border-[#a3e635]/20">
                                Engineering Node: Pan-Africa
                            </span>
                            <h1 className="text-3xl sm:text-5xl font-black tracking-tighter mt-4 leading-none">
                                Brown Code <span className="text-[#7c3aed] (PURPLE)">/</span>
                            </h1>
                            <p className="text-sm font-mono text-[rgba(248,248,255,.4)] (MUTED) mt-2">
                                Software Developer in Africa
                            </p>
                        </div>

                        <p className="text-sm text-[rgba(248,248,255,.4)] (MUTED) leading-relaxed">
                            Deploying resilient, high-speed, and production-ready digital architectures designed for startups, commercial companies, and innovators across Africa.
                        </p>

                        <div className="bg-[#11111a] (DARK) border border-[rgba(124,58,237,.25)] (BORDER) p-4 rounded-xl space-y-3">
                            <h4 className="text-xs font-mono text-[#a855f7] (PURPLEL) uppercase tracking-wider">// Regional Connectivity</h4>
                            <p className="text-[11px] text-[rgba(248,248,255,.4)] leading-relaxed">
                                Base hub situated in **Abuja, Nigeria**, providing remote delivery systems, localized performance enhancements, and cloud systems to clients all over the continent.
                            </p>
                        </div>

                        {/* Fast Metadata Tags */}
                        <div className="flex flex-wrap gap-1.5 text-[9px] font-mono text-[rgba(248,248,255,.4)]">
                            <span className="bg-[#18182a] px-2 py-0.5 rounded border border-[rgba(248,248,255,.07)]">West Africa</span>
                            <span className="bg-[#18182a] px-2 py-0.5 rounded border border-[rgba(248,248,255,.07)]">East Africa</span>
                            <span className="bg-[#18182a] px-2 py-0.5 rounded border border-[rgba(248,248,255,.07)]">Southern Africa</span>
                        </div>
                    </div>

                    {/* RIGHT MAIN SECTION - Fluid Scaled Content Feed (8 Columns) */}
                    <div className="lg:col-span-8 space-y-16">

                        {/* Intro Statement Paragraph Block */}
                        <section className="bg-[#11111a] (DARK) border border-[rgba(248,248,255,.07)] (BORDER2) p-6 sm:p-8 rounded-2xl shadow-xl">
                            <h2 className="text-xl font-bold tracking-tight mb-4">
                                Scaling Continental Operations via Elite Web Engineering
                            </h2>
                            <p className="text-base text-[rgba(248,248,255,.4)] (MUTED) leading-relaxed">
                                Looking to recruit or collaborate with a reliable <strong className="text-[#f8f8ff] font-medium">software developer in Africa</strong>? Brown Code engineers clean client interfaces, lightning-fast application backends, and robust performance systems. By combining edge runtime deployment via frameworks like Next.js with deep optimization practices, I ensure your products load efficiently under any networking conditions.
                            </p>
                        </section>

                        {/* Engineering Capabilities Grid (Asymmetric List Layout) */}
                        <section>
                            <h2 className="text-xl font-black uppercase tracking-wider text-[#a3e635] (LIME) mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[#a3e635] rotate-45"></span> Production Capabilities
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {CORE_CAPABILITIES.map((capability, idx) => (
                                    <div key={idx} className="bg-[#18182a] (DARK2) border border-[rgba(248,248,255,.07)] p-5 rounded-xl">
                                        <span className="text-xs font-mono text-[#7c3aed] (PURPLE) block mb-2 font-bold">
                                            [//0{idx + 1}]
                                        </span>
                                        <h3 className="font-bold text-[#f8f8ff] text-base mb-1">{capability.title}</h3>
                                        <p className="text-xs text-[rgba(248,248,255,.4)] (MUTED) leading-relaxed">{capability.body}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Strategic Competitive Advantage Section */}
                        <section className="border-t border-[rgba(248,248,255,.07)] pt-12">
                            <h2 className="text-xl font-black uppercase tracking-wider text-[#a855f7] (PURPLEL) mb-6">
                                Why Global Teams Partner with Brown Code
                            </h2>
                            <div className="space-y-6">
                                {ECOSYSTEMS.map((system, idx) => (
                                    <div key={idx} className="flex gap-4 items-start">
                                        <span className="text-xs font-mono text-[#a3e635] bg-[#a3e635]/10 px-2 py-0.5 rounded border border-[#a3e635]/20 mt-1">
                                            ✓
                                        </span>
                                        <div>
                                            <h3 className="font-bold text-sm text-[#f8f8ff]">{system.market}</h3>
                                            <p className="text-xs text-[rgba(248,248,255,.4)] mt-1 leading-relaxed">{system.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Core Operations FAQ Block */}
                        <section className="bg-[#11111a] (DARK) border border-[rgba(248,248,255,.07)] p-6 sm:p-8 rounded-2xl">
                            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#7c3aed]"></span> Operational Framework FAQs
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-bold text-[#f8f8ff]">How are project asset valuations and payments executed in Africa?</h3>
                                    <p className="text-xs text-[rgba(248,248,255,.4)] (MUTED) mt-2 leading-relaxed">
                                        Pricing matrices operate flexibly depending on deployment complexity. Basic specialized code blocks, custom setups, and design portfolios initiate globally from equivalent baseline parameters, with custom contracts mapped for scaled applications and high-traffic platforms. International currencies and local alternatives are systematically integrated based on project location.
                                    </p>
                                </div>
                                <div className="border-t border-[rgba(248,248,255,.07)] pt-4">
                                    <h3 className="text-sm font-bold text-[#f8f8ff]">What are your operational remote work parameters?</h3>
                                    <p className="text-xs text-[rgba(248,248,255,.4)] (MUTED) mt-2 leading-relaxed">
                                        Projects scale entirely via remote development workflows. Teams receive access to regular progress updates, live code environments, and continuous deployment previews. Synchronous milestone check-ins are organized virtually across regional African and European timezones.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* High-Impact Continental Call To Action Box (DARK3 #1e1e30) */}
                        <section className="bg-[#1e1e30] (DARK3) border border-[rgba(124,58,237,.25)] (BORDER) rounded-2xl p-8 text-center relative overflow-hidden shadow-2xl">
                            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#7c3aed]/10 blur-3xl pointer-events-none rounded-full"></div>
                            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#a3e635]/5 blur-3xl pointer-events-none rounded-full"></div>

                            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#f8f8ff]">
                                Initialize a Continental Pipeline
                            </h2>
                            <p className="text-xs text-[rgba(248,248,255,.4)] mt-3 mx-auto leading-relaxed">
                                Ready to scale your application infrastructure? Connect directly on WhatsApp or route your detailed engineering blueprints via email.
                            </p>

                            <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 text-xs font-mono text-[rgba(248,248,255,.4)]">
                                <span>WhatsApp Secure: <strong className="text-[#a3e635]">+234-814-299-5114</strong></span>
                                <span>Corporate Mail: <strong className="text-[#a855f7]">browncemmanuel@gmail.com</strong></span>
                            </div>

                            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                                <Link
                                    href="https://wa.me/qr/RX4M5D4PGB7CO1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto inline-block bg-[#65a30d] (LIMED) hover:bg-[#a3e635] (LIME) text-[#0b0b0f] (VOID) px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-md"
                                >
                                    WhatsApp Consultation
                                </Link>
                                <Link
                                    href="https://browncode.name.ng/portfolio"
                                    className="w-full sm:w-auto inline-block bg-[#11111a] hover:bg-[#18182a] text-[#f8f8ff] px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border border-[rgba(248,248,255,.12)] transition-all"
                                >
                                    Explore Core Portfolio
                                </Link>
                            </div>
                        </section>

                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}