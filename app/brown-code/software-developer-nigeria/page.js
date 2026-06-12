import Link from "next/link";

// 1. COUNTRY-SCALE METADATA CONFIGURATION
export const metadata = {
    title: "Software Developer in Nigeria – Brown Code | Professional Website Developer",
    description:
        "Brown Code builds fast, modern, and SEO-optimized websites across Nigeria. Hire a trusted web developer in Nigeria for business websites, e-commerce, portfolios, and web apps.",
    keywords: [
        "web developer in Nigeria",
        "best website developer Nigeria",
        "professional web developer Nigeria",
        "hire developer in Lagos Abuja",
        "software engineer Nigeria"
    ],
    alternates: {
        canonical: "https://browncode.name.ng/web-developer-nigeria",
    },
};

// 2. REGIONAL FIXED STRUCTURED DATA
const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Brown Code (Brown Oziomachi A.)",
    url: "https://browncode.name.ng",
    logo: "https://browncode.name.ng/logo.png",
    description: "Professional full-stack web development services (Next.js, React, Tailwind CSS) available nationwide across Nigeria.",
    telephone: "+234-701-372-5529",
    priceRange: "₦300,000 - ₦1,500,000+",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Abuja", // Physical base remains constant
        addressRegion: "FCT",
        addressCountry: "NG"
    },
    areaServed: [
        { "@type": "Country", name: "Nigeria" }, // Expands index radius nationwide
        { "@type": "AdministrativeArea", name: "Lagos" },
        { "@type": "AdministrativeArea", name: "Abuja" },
        { "@type": "AdministrativeArea", name: "Rivers" }
    ],
    sameAs: [
        "https://x.com/BrownC15427449",
        "https://www.linkedin.com/in/brownoziomachi72a5a3229"
    ]
};

// 3. NATIONWIDE OBJECT ARRAYS
const NIGERIA_SERVICES = [
    { title: "Enterprise & Business Sites", desc: "High-conversion corporate platforms and optimized landing pages built to secure market leads." },
    { title: "E-Commerce Infrastructures", desc: "Digital storefronts equipped with payment gateway integrations and custom backend admin systems." },
    { title: "Creative & Agent Portfolios", desc: "Fast, striking online portfolios showcasing services for elite professionals across Nigeria." },
    { title: "Progressive Web Applications", desc: "Dynamic dashboards and client management systems designed to execute offline-first tasks seamlessly." },
    { title: "Technical SEO & Optimization", desc: "Fine-tuning Core Web Vitals, performance speeds, and clean JSON-LD structured data mapping." }
];

const METRICS = [
    { label: "Performance Engine", text: "Sub-second load times engineered via custom Next.js server routing architectures." },
    { label: "Mobile-First UX Strategy", desc: "Tailwind interfaces explicitly structured for unstable network connections and mobile-dominant audiences." },
    { label: "Data Architecture", desc: "Clean database integrations and semantic markup structures that search engine bots crawl with ease." }
];

const FAQS = [
    { q: "How much does a website cost in Nigeria?", a: "Project costs vary depending on features. Standard business portfolios start around ₦300,000, while deep e-commerce architectures and integrated software systems scale upward based on structural complexity." },
    { q: "How long will it take?", a: "Production lifecycles typically span 1 to 3 weeks. Timeline schedules rely entirely on the engineering scope and asset delivery cycles." }
];

export default function WebDeveloperNigeria() {
    const currentYear = new Date().getFullYear();

    return (
        // VOID Background (#0b0b0f) & WHITE text (#f8f8ff)
        <div className="min-h-screen bg-[#0b0b0f] text-[#f8f8ff] antialiased selection:bg-[#7c3aed] selection:text-[#f8f8ff]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            {/* Layout Main Shell */}
            <main className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:py-24">

                {/* Two-Column Hero Split Layout */}
                <div className="grid lg:grid-cols-12 gap-12 items-start border-b border-[rgba(248,248,255,.07)] pb-12 mb-16">
                    <div className="lg:col-span-7">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#a3e635] bg-[#a3e635]/10 px-4 py-1.5 rounded-full border border-[#a3e635]/20">
                            Nationwide Availability — Nigeria
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-black tracking-tight mt-6 leading-tight">
                            Software Developer <br />
                            in Nigeria <span className="text-[#7c3aed]">.</span>
                        </h1>
                        <p className="text-lg text-[rgba(248,248,255,.4)] mt-6 leading-relaxed max-w-xl">
                            Looking for a reliable <strong className="text-[#f8f8ff] font-medium"> developer in Nigeria</strong>?
                            Brown Code engineers high-speed, modern, and SEO-optimized interfaces that empower brands across the federation to process payments, track leads, and capture markets.
                        </p>
                    </div>

                    {/* Right Hand Context Box (DARK #11111a) */}
                    <div className="lg:col-span-5 bg-[#11111a] border border-[rgba(124,58,237,.25)] p-6 rounded-2xl relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#7c3aed]/10 blur-2xl pointer-events-none"></div>
                        <h3 className="text-sm font-mono text-[#a855f7] uppercase tracking-wider mb-4">// Engineering Architecture</h3>
                        <p className="text-xs text-[rgba(248,248,255,.4)] leading-relaxed mb-4">
                            Physical operations are located in **Abuja (FCT)**, with remote deployment capabilities and engineering consultations available across all states, including Lagos, Port Harcourt, and Kano.
                        </p>
                        <div className="flex gap-2 text-[10px] font-mono text-[rgba(248,248,255,.4)]">
                            <span className="bg-[#0b0b0f] px-2 py-1 rounded border border-[rgba(248,248,255,.07)]">Next.js</span>
                            <span className="bg-[#0b0b0f] px-2 py-1 rounded border border-[rgba(248,248,255,.07)]">React.js</span>
                            <span className="bg-[#0b0b0f] px-2 py-1 rounded border border-[rgba(248,248,255,.07)]">Tailwind</span>
                            <span className="bg-[#0b0b0f] px-2 py-1 rounded border border-[rgba(248,248,255,.07)]">Firebase</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Presentation Grid */}
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Left Column: Services & Execution (7 Cols) */}
                    <div className="lg:col-span-7 space-y-12">

                        {/* Services block */}
                        <section>
                            <h2 className="text-2xl font-black tracking-tight mb-6 text-[#f8f8ff] flex items-center gap-2">
                                <span className="text-[#a3e635]">■</span> Services I Offer Across Nigeria
                            </h2>
                            <div className="space-y-4">
                                {NIGERIA_SERVICES.map((service, index) => (
                                    <div key={index} className="bg-[#11111a] border border-[rgba(248,248,255,.07)] p-5 rounded-xl hover:bg-[#18182a]/30 transition-colors">
                                        <h3 className="font-bold text-[#f8f8ff] text-base">{service.title}</h3>
                                        <p className="text-sm text-[rgba(248,248,255,.4)] mt-1.5 leading-relaxed">{service.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Implementation block */}
                        <section className="bg-[#18182a] border border-[rgba(248,248,255,.07)] p-6 rounded-2xl">
                            <h2 className="text-xl font-bold tracking-tight mb-4 text-[#f8f8ff]">
                                On-Page Search Optimizations Implemented
                            </h2>
                            <ul className="grid sm:grid-cols-2 gap-3 text-xs text-[rgba(248,248,255,.4)]">
                                <li className="flex items-center gap-2 bg-[#11111a] p-3 rounded-lg border border-[rgba(248,248,255,.07)]">
                                    <span className="text-[#a3e635]">✔</span> High-Intent Local Keywords
                                </li>
                                <li className="flex items-center gap-2 bg-[#11111a] p-3 rounded-lg border border-[rgba(248,248,255,.07)]">
                                    <span className="text-[#a3e635]">✔</span> Automated JSON-LD Graphs
                                </li>
                                <li className="flex items-center gap-2 bg-[#11111a] p-3 rounded-lg border border-[rgba(248,248,255,.07)]">
                                    <span className="text-[#a3e635]">✔</span> Core Web Vitals Optimization
                                </li>
                                <li className="flex items-center gap-2 bg-[#11111a] p-3 rounded-lg border border-[rgba(248,248,255,.07)]">
                                    <span className="text-[#a3e635]">✔</span> Local Business Snippet Schema
                                </li>
                            </ul>
                        </section>
                    </div>

                    {/* Right Column: Value Props, FAQ, Call To Action (5 Cols) */}
                    <div className="lg:col-span-5 space-y-12">

                        {/* Why Hire block */}
                        <section className="bg-[#11111a] border border-[rgba(248,248,255,.07)] p-6 rounded-2xl">
                            <h2 className="text-xl font-bold mb-6 text-[#a855f7]">Why Scale With Brown Code?</h2>
                            <div className="space-y-4">
                                {METRICS.map((metric, index) => (
                                    <div key={index} className="border-l-2 border-[#7c3aed] pl-4">
                                        <h3 className="text-sm font-bold text-[#f8f8ff]">{metric.label}</h3>
                                        <p className="text-xs text-[rgba(248,248,255,.4)] mt-1 leading-relaxed">{metric.text || metric.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* FAQ block */}
                        <section>
                            <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {FAQS.map((faq, index) => (
                                    <div key={index}>
                                        <h3 className="text-sm font-bold text-[#f8f8ff]">{faq.q}</h3>
                                        <p className="text-xs text-[rgba(248,248,255,.4)] mt-2 leading-relaxed">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Conversion Call To Action Frame (DARK3 #1e1e30) */}
                <section className="bg-[#1e1e30] border border-[rgba(124,58,237,.25)] rounded-2xl p-8 text-center mt-16 relative overflow-hidden shadow-2xl">
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#7c3aed]/10 blur-3xl pointer-events-none rounded-full"></div>
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#a3e635]/5 blur-3xl pointer-events-none rounded-full"></div>

                    <h2 className="text-2xl sm:text-3xl font-black">Ready to Kickstart Your System Build?</h2>
                    <p className="text-xs text-[rgba(248,248,255,.4)] mt-3 max-w-lg mx-auto leading-relaxed">
                        Schedule a system audit briefing. Check out deployment parameters, screenshots, and live instances directly at{" "}
                        <Link href="https://browncode.name.ng" className="text-[#a855f7] underline hover:text-[#7c3aed]">
                            browncode.name.ng
                        </Link>.
                    </p>

                    <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 text-xs font-mono">
                        <span className="text-[rgba(248,248,255,.4)]">WhatsApp: <strong className="text-[#a3e635]">+234-701-372-5529</strong></span>
                        <span className="text-[rgba(248,248,255,.4)]">Mail routing: <strong className="text-[#a855f7]">browncemmanuel@gmail.com</strong></span>
                    </div>

                    <div className="mt-8">
                        <Link
                            href="https://wa.me/qr/RX4M5D4PGB7CO1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#65a30d] hover:bg-[#a3e635] text-[#0b0b0f] px-8 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-[#65a30d]/20"
                        >
                            Initialize Secure Briefing (WhatsApp)
                        </Link>
                    </div>
                </section>

                {/* Footer Section */}
                <footer className="mt-20 pt-8 border-t border-[rgba(248,248,255,.12)] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[rgba(248,248,255,.4)]">
                    <p>© {currentYear} browncode.name.ng — Engineering Scalable Platforms Across Nigeria.</p>
                    <span className="text-[10px] font-mono bg-[rgba(248,248,255,.12)] px-2 py-1 rounded">
                        v2.2.0-stable
                    </span>
                </footer>
            </main>
        </div>
    );
}