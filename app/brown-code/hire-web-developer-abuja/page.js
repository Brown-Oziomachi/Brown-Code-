import Footer from "@/components/footer";
import Link from "next/link";
import ImageWithFallback from "@/components/ImageWithFallback";

// 1. TRANSACTIONAL METADATA CONFIGURATION
export const metadata = {
    title: "Hire Web Developer in Abuja – Brown Code | Fast, Local, Reliable",
    description:
        "Hire an expert web developer in Abuja. Brown Code builds custom commercial websites, online stores, and web apps with lightning-fast delivery and local FCT support.",
    keywords: [
        "hire web developer in Abuja",
        "hire website developer Abuja",
        "freelance web developer Abuja",
        "contract software engineer Abuja",
        "web design packages Abuja"
    ],
    alternates: {
        canonical: "https://browncode.name.ng/hire-web-developer-abuja",
    },
};

// 2. SEO STRUCTURED DATA (JSON-LD with explicit Tiered Offer Schema)
const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Brown Code",
    image: "https://browncode.name.ng/logo.png",
    url: "https://browncode.name.ng",
    telephone: "+234-814-299-5114",
    priceRange: "₦100,000 - ₦500,000+",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Kubwa",
        addressLocality: "Abuja",
        addressRegion: "FCT",
        addressCountry: "NG"
    },
    areaServed: [
        { "@type": "AdministrativeArea", name: "Abuja" },
        { "@type": "Country", name: "Nigeria" }
    ],
    offers: {
        "@type": "AggregateOffer",
        priceCurrency: "NGN",
        lowPrice: "100000",
        highPrice: "500000",
        offerCount: "3",
        offers: [
            {
                "@type": "Offer",
                name: "Starter Package",
                price: "100000",
                priceCurrency: "NGN",
                description: "Single-page landing portfolios built with high-speed performance engines."
            },
            {
                "@type": "Offer",
                name: "Business Package",
                price: "300000",
                priceCurrency: "NGN",
                description: "Multi-page commercial web systems engineered with custom forms and content training modules."
            },
            {
                "@type": "Offer",
                name: "E-Commerce Package",
                price: "500000",
                priceCurrency: "NGN",
                description: "Advanced digital store ecosystems with absolute secure checkout mechanics and dynamic payment parameters."
            }
        ]
    }
};

// 3. SEPARATED SERVICE PACKAGES DICTIONARIES
const PACKAGES = [
    {
        name: "Starter System",
        tag: "Portfolios & Landers",
        price: "₦350,000",
        wasPrice: "₦450,000",
        savings: "Save ₦100,000",
        icon: "⚡",
        image: "/portfo.jpeg",
        features: [
            "High-conversion single-page architecture",
            "Next.js static engine performance",
            "Core technical SEO integration",
            "Tailwind layout responsiveness",
            "1 year direct deployment setup"
        ]
    },
    {
        name: "Business Engine",
        tag: "Commercial Standard",
        price: "₦500,000",
        wasPrice: "₦650,000",
        savings: "Save ₦150,000",
        icon: "🚀",
        image: "/commer.jpeg",
        features: [
            "5–10 deep functional sub-pages",
            "Custom integrated contact pipelines",
            "On-page schema markup deployment",
            "Local FCT hosting optimizations",
            "CMS content management training"
        ],
        highlighted: true // Accent block separator trigger
    },
    {
        name: "E-Commerce Core",
        tag: "Scalable Infrastructure",
        price: "₦800,000+",
        wasPrice: "₦1,000,000+",
        savings: "Save ₦200,000+",
        icon: "🛒",
        image: "/eco.jpg",
        features: [
            "Unlimited item database configuration",
            "Secure automated checkout streams",
            "Instant payment gateway integrations",
            "Interactive merchant management board",
            "Cross-device mobile UX testing matrix"
        ]
    }
];

const ONBOARDING_STEPS = [
    { step: "01", title: "Submit System Brief", text: "Route your feature parameters, target market scope, and functional requirements to browncemmanuel@gmail.com." },
    { step: "02", title: "Review Blueprint Scope", text: "I provide an architectural brief containing fixed-price budget estimations, exact structural scope, and clean milestone dates." },
    { step: "03", title: "Build & Staging Live", text: "Production deploys on a private sandbox development url, allowing you to click through, test logic, and approve layouts prior to live routing." }
];

export default function HireWebDeveloperAbuja() {
    return (
        // Canvas Foundation: VOID Background (#0b0b0f) & WHITE text (#f8f8ff)
        <div className="min-h-screen bg-[#0b0b0f] text-[#f8f8ff] antialiased selection:bg-[#7c3aed] selection:text-[#f8f8ff]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <main className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:py-24">

                {/* Transactional Intention Header Section — now with a visual */}
                <header className="mb-20">
                    <div className="grid lg:grid-cols-[1fr_0.9fr] gap-10 items-center">
                        <div className="text-center lg:text-left">
                            <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#a3e635] bg-[#a3e635]/10 px-4 py-1.5 rounded border border-[#a3e635]/20">
                                Production Pipeline Allocation
                            </span>
                            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-6 leading-tight">
                                Hire a Web Developer <br />in Abuja <span className="text-[#7c3aed]">.</span>
                            </h1>
                            <p className="text-base text-[rgba(248,248,255,.4)] mt-4 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Secure a dedicated engineering asset in the FCT. I build bulletproof web applications, online stores, and corporate sites under reliable timelines, protected by local staging tests.
                            </p>

                            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
                                <Link
                                    href="https://wa.me/2348142995114"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-[#65a30d] hover:bg-[#a3e635] text-[#0b0b0f] px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-md shadow-[#65a30d]/20"
                                >
                                    Get a quote
                                </Link>


                               <a href="#pricing"
                                className="inline-flex items-center gap-2 border border-[rgba(248,248,255,.15)] hover:border-[rgba(248,248,255,.35)] text-[#f8f8ff] px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                                >
                                See pricing
                            </a>
                        </div>
                    </div>

                    {/* Hero image */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-br from-[#7c3aed]/20 via-transparent to-[#a3e635]/10 blur-2xl rounded-3xl pointer-events-none" />
                        <div className="relative rounded-2xl overflow-hidden border border-[rgba(248,248,255,.08)] shadow-2xl">
                            <ImageWithFallback
                                src="/vue.jpg"
                                alt="Web developer working with a client in Abuja"
                                className="w-full h-[300px] sm:h-[360px] object-cover grayscale-[15%] contrast-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                <span className="font-mono text-[10px] uppercase tracking-wider bg-[#0b0b0f]/80 backdrop-blur border border-[rgba(248,248,255,.1)] text-[#a3e635] px-3 py-1.5 rounded-full">
                                    Based in Kubwa, Abuja
                                </span>
                                <span className="font-mono text-[10px] uppercase tracking-wider bg-[#0b0b0f]/80 backdrop-blur border border-[rgba(248,248,255,.1)] text-[#f8f8ff] px-3 py-1.5 rounded-full">
                                    Fixed-price
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* 3-Tier Premium Pricing Architecture Grid Layout */}
            <section id="pricing" className="mb-24">
                <div className="text-center max-w-xl mx-auto mb-10">
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#f8f8ff]">Simple, fixed-price packages</h2>
                    <p className="text-xs text-[rgba(248,248,255,.4)] mt-3">No hourly surprises — pick a tier, lock the price, and I build to spec.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-stretch">
                    {PACKAGES.map((pkg, idx) => (
                        <div
                            key={idx}
                            className={`rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 relative ${pkg.highlighted
                                ? "bg-[#18182a] border-2 border-[#7c3aed] shadow-2xl scale-[1.02] lg:-translate-y-2"
                                : "bg-[#11111a] border border-[rgba(248,248,255,.07)] shadow-xl"
                                }`}
                        >
                            {pkg.highlighted && (
                                <span className="absolute top-3 left-1/2 z-10 transform -translate-x-1/2 bg-[#7c3aed] text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase shadow-lg">
                                    Most Popular System
                                </span>
                            )}

                            {/* Card image banner */}
                            <div className="relative h-40 w-full">
                                <ImageWithFallback
                                    src={pkg.image}
                                    alt={`${pkg.name} package preview`}
                                    className="w-full h-full object-cover grayscale-[10%] contrast-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/30 to-transparent" />
                                <span className="absolute bottom-3 left-4 text-2xl drop-shadow-lg">{pkg.icon}</span>
                                <span className="absolute bottom-3 right-4 text-[10px] font-mono uppercase tracking-wider text-[rgba(248,248,255,.7)] bg-[#0b0b0f]/70 backdrop-blur px-2.5 py-1 rounded-full">
                                    {pkg.tag}
                                </span>
                            </div>

                            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                                <div>
                                    <h3 className="text-xl font-black text-[#f8f8ff]">{pkg.name}</h3>

                                    <div className="my-6">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl sm:text-4xl font-black text-[#f8f8ff]">{pkg.price}</span>
                                            {pkg.wasPrice && (
                                                <span className="text-sm text-[rgba(248,248,255,.3)] line-through">{pkg.wasPrice}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-[10px] font-mono text-[rgba(248,248,255,.4)]">Fixed baseline cost</span>
                                            {pkg.savings && (
                                                <span className="text-[10px] font-mono font-bold text-[#a3e635] bg-[#a3e635]/10 border border-[#a3e635]/20 px-2 py-0.5 rounded-full">
                                                    {pkg.savings}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <ul className="space-y-3.5 pt-6 border-t border-[rgba(248,248,255,.07)]">
                                        {pkg.features.map((feature, fIdx) => (
                                            <li key={fIdx} className="text-xs flex items-start gap-2.5 text-[rgba(248,248,255,.4)]">
                                                <span className="text-[#a3e635] font-bold">✓</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-8 pt-6 border-t border-[rgba(248,248,255,.07)]">
                                    <Link
                                        href="https://wa.me/2348142995114"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-full block text-center py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all ${pkg.highlighted
                                            ? "bg-[#7c3aed] hover:bg-[#a855f7] text-[#f8f8ff]"
                                            : "bg-[#0b0b0f] border border-[rgba(248,248,255,.12)] hover:bg-[#11111a]"
                                            }`}
                                    >
                                        Initialize Tier
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Horizontal Flow Pipeline Section (DARK3 #1e1e30 Container) */}
            <section className="bg-[#1e1e30] border border-[rgba(248,248,255,.07)] rounded-2xl p-6 sm:p-8 mb-24 shadow-2xl">
                <h2 className="text-xl font-extrabold tracking-tight mb-8 text-[#f8f8ff] flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#a855f7] rounded-full"></span> Production Pipeline Onboarding
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {ONBOARDING_STEPS.map((step, idx) => (
                        <div key={idx} className="relative">
                            <div className="text-4xl font-black text-[rgba(124,58,237,.2)] font-mono mb-2">
                                {step.step}
                            </div>
                            <h3 className="text-base font-bold text-[#f8f8ff] mb-2">{step.title}</h3>
                            <p className="text-xs text-[rgba(248,248,255,.4)] leading-relaxed">{step.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Secure Contact Conversion Node Area */}
            <section className="bg-[#11111a] border border-[rgba(124,58,237,.25)] rounded-2xl p-8 max-w-4xl mx-auto text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#7c3aed]/5 blur-3xl pointer-events-none"></div>

                <h2 className="text-2xl font-black">Ready to Align Production Schedules?</h2>
                <p className="text-xs text-[rgba(248,248,255,.4)] mt-3 mx-auto leading-relaxed">
                    Let&apos;s build down a clear baseline. Skip lengthy consulting periods and connect directly on-site or via WhatsApp.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 text-xs font-mono text-[rgba(248,248,255,.4)]">
                    <span>FCT Office Pipeline: <strong className="text-[#a3e635]">+234-814-299-5114</strong></span>
                    <span>Asynchronous Routing: <strong className="text-[#a855f7]">browncemmanuel@gmail.com</strong></span>
                </div>

                <div className="mt-8">
                    <Link
                        href="https://wa.me/2348142995114"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#65a30d] hover:bg-[#a3e635] text-[#0b0b0f] px-10 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-md shadow-[#65a30d]/10"
                    >
                        Open Direct Contract (WhatsApp)
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
        </div >
    );
}