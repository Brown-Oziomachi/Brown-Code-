import Link from "next/link";

// 1. METADATA CONFIGURATION
export const metadata = {
    title: "Web Developer in Nigeria | Professional Website Developer – Browncode",
    description:
        "Looking for a web developer in Nigeria? Browncode builds modern, responsive, SEO-optimized websites, e-commerce stores, portfolios, and web apps for local businesses.",
    keywords: [
        "web developer in Nigeria",
        "website developer Nigeria",
        "professional web developer Nigeria",
        "affordable web developer Nigeria",
        "software developer Nigeria",
    ],
    alternates: {
        canonical: "https://browncode.name.ng/web-developer-nigeria",
    },
};

// 2. SEO STRUCTURED DATA (JSON-LD)
const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Brown Oziomachi (Browncode)",
    url: "https://browncode.name.ng",
    logo: "https://browncode.name.ng/logo.png",
    description: "Professional web development services in Nigeria, Nigeria — websites, e-commerce, portfolios, web apps, SEO.",
    telephone: "+234-701-372-5529",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Kubwa",
        addressLocality: "Nigeria",
        addressRegion: "FCT",
        addressCountry: "NG",
    },
    areaServed: [
        { "@type": "AdministrativeArea", name: "Nigeria" },
        { "@type": "Country", name: "Nigeria" }
    ],
    sameAs: [
        "https://x.com/BrownC15427449",
        "https://www.linkedin.com/in/brownoziomachi72a5a3229"
    ],
    priceRange: "₦100,000 - ₦500,000+"
};

// 3. SEPARATED DATA ARRAYS
const SERVICES = [
    "Custom business websites & landing pages",
    "Portfolio & personal websites",
    "E-commerce stores with payment integration",
    "Blogs, news portals, and media websites",
    "Web applications & dashboards",
    "SEO optimization & speed improvements",
];

const ADVANTAGES = [
    { title: "Local Expertise", desc: "We understand Nigeria businesses and customers." },
    { title: "Modern Technologies", desc: "Next.js, React, Tailwind, Firebase." },
    { title: "Responsive Design", desc: "Works perfectly on mobile, tablet, and desktop." },
    { title: "Fast & SEO-Friendly", desc: "Optimized for Google search and page speed." },
    { title: "Affordable Packages", desc: "High-quality work without breaking your budget." },
];

const PROJECTS = [
    { name: "IJ Stitches", desc: "Fashion website for Nigeria-based business", emoji: "🧵" },
    { name: "The Cyclopedia", desc: "News & media website", emoji: "📰" },
    { name: "Browncode Portfolio", desc: "Professional web developer showcase", emoji: "👤", href: "https://browncode.name.ng" },
    { name: "E-commerce Store / Yotapoint", desc: "Online shop ecosystem", emoji: "🛍" },
];

const FAQS = [
    { q: "How much does a website cost in Nigeria?", a: "Prices depend on features. Portfolio websites start from ₦100,000, business sites ₦300,000, e-commerce ₦500,000+." },
    { q: "How long will it take?", a: "Most websites are delivered within 5–10 days depending on complexity." },
    { q: "Do you meet clients locally?", a: "Yes, we can meet in Nigeria for briefings, handovers, or training sessions. Virtual meetings are also available." },
];

export default function WebDeveloperNigeria() {
    const currentYear = new Date().getFullYear();

    return (
        // Canvas Wrapper: VOID Background (#0b0b0f) & WHITE text (#f8f8ff)
        <div className="min-h-screen bg-[#0b0b0f] text-[#f8f8ff] antialiased selection:bg-[#7c3aed] selection:text-[#f8f8ff]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <main className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:py-24">

                {/* Header Section */}
                <header className="border-b border-[rgba(248,248,255,.07)] (BORDER2) pb-10 mb-12">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#a3e635] (LIME) bg-[#a3e635]/10 px-3 py-1 rounded-full border border-[#a3e635]/20">
                        Nigeria, Nigeria
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-4">
                        Web Developer in Nigeria <span className="text-[#7c3aed] (PURPLE)">.</span>
                    </h1>
                    <p className="text-xl text-[rgba(248,248,255,.4)] (MUTED) mt-4 max-w-2xl leading-relaxed">
                        Searching for a <strong className="text-[#f8f8ff] font-semibold">professional web developer in Nigeria</strong>?
                        Browncode provides modern, responsive, and SEO-friendly web ecosystems for businesses and individuals looking to scale.
                    </p>
                </header>

                {/* Services & Benefits Grid (DARK #11111a cards) */}
                <section className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* Services Column */}
                    <div className="bg-[#11111a] (DARK) border border-[rgba(248,248,255,.07)] (BORDER2) rounded-2xl p-6 shadow-xl">
                        <h2 className="text-xl font-bold text-[#a3e635] (LIME) mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#a3e635]"></span> Services Offered
                        </h2>
                        <ul className="space-y-3 text-[rgba(248,248,255,.4)] (MUTED)">
                            {SERVICES.map((service, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="text-[#7c3aed] (PURPLE) mt-0.5">▹</span>
                                    <span className="text-sm">{service}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Advantages Column */}
                    <div className="bg-[#11111a] (DARK) border border-[rgba(124,58,237,.25)] (BORDER) rounded-2xl p-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#7c3aed]/5 blur-3xl pointer-events-none"></div>
                        <h2 className="text-xl font-bold text-[#a855f7] (PURPLEL) mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#a855f7]"></span> Why Hire Browncode?
                        </h2>
                        <ul className="space-y-4">
                            {ADVANTAGES.map((item, index) => (
                                <li key={index} className="text-sm">
                                    <strong className="text-[#f8f8ff] (WHITE) block font-medium">{item.title}</strong>
                                    <span className="text-[rgba(248,248,255,.4)] (MUTED)">{item.desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Portfolio Section (DARK2 #18182a container) */}
                <section className="bg-[#18182a] (DARK2) border border-[rgba(248,248,255,.07)] (BORDER2) rounded-2xl p-6 sm:p-8 mb-16 shadow-2xl">
                    <h2 className="text-2xl font-extrabold tracking-tight mb-6">
                        Portfolio – Projects in Nigeria
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {PROJECTS.map((project, index) => (
                            <div
                                key={index}
                                className="bg-[#11111a] (DARK) p-4 rounded-xl border border-[rgba(248,248,255,.07)] (BORDER2) hover:border-[#7c3aed]/40 transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xl p-2 bg-[#0b0b0f] (VOID) rounded-lg border border-[rgba(248,248,255,.07)]">{project.emoji}</span>
                                    {project.href ? (
                                        <Link
                                            href={project.href}
                                            className="text-[#a855f7] (PURPLEL) hover:text-[#7c3aed] (PURPLE) font-bold underline transition-colors"
                                        >
                                            {project.name}
                                        </Link>
                                    ) : (
                                        <h3 className="font-bold text-[#f8f8ff] (WHITE)">{project.name}</h3>
                                    )}
                                </div>
                                <p className="text-xs text-[rgba(248,248,255,.4)] (MUTED) leading-relaxed pl-1">
                                    {project.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-extrabold tracking-tight mb-8">
                        FAQ – Web Developer in Nigeria
                    </h2>
                    <div className="space-y-4">
                        {FAQS.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-[#11111a] (DARK) border border-[rgba(248,248,255,.07)] (BORDER2) p-5 rounded-xl hover:bg-[#18182a]/50 transition-colors duration-200"
                            >
                                <h3 className="text-base font-bold flex items-start gap-2">
                                    <span className="text-[#a3e635] (LIME) font-mono">{index + 1}.</span>
                                    {faq.q}
                                </h3>
                                <p className="text-sm text-[rgba(248,248,255,.4)] (MUTED) mt-2 pl-6 leading-relaxed">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Banner Section (DARK3 #1e1e30 with variant accents) */}
                <section className="bg-[#1e1e30] (DARK3) border border-[rgba(124,58,237,.25)] (BORDER) rounded-2xl p-8 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#7c3aed]/10 blur-3xl pointer-events-none rounded-full"></div>
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#a3e635]/5 blur-3xl pointer-events-none rounded-full"></div>

                    <h2 className="text-2xl sm:text-3xl font-black">
                        Contact Browncode in Nigeria
                    </h2>
                    <p className="text-sm text-[rgba(248,248,255,.4)] (MUTED) mt-3 max-w-lg mx-auto leading-relaxed">
                        Ready to build your website? Reach out directly via WhatsApp or secure a consultation block via email.
                    </p>
                    <div className="mt-4 text-xs text-[rgba(248,248,255,.4)] (MUTED) space-y-1">
                        <p>Line Secure: <span className="text-[#a3e635] (LIME) font-mono">+234-701-372-5529</span></p>
                        <p>Routing: <span className="text-[#a855f7] (PURPLEL) font-mono">browncemmanuel@gmail.com</span></p>
                    </div>

                    <div className="mt-8">
                        <Link
                            href="https://wa.me/qr/RX4M5D4PGB7CO1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#65a30d] (LIMED) hover:bg-[#a3e635] (LIME) text-[#0b0b0f] (VOID) px-8 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-[#65a30d]/20"
                        >
                            Chat on WhatsApp
                        </Link>
                    </div>
                </section>

                {/* System Footer Info (BORDER2 variant separator) */}
                <footer className="mt-20 pt-8 border-t border-[rgba(248,248,255,.12)] (MUTED2) flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-[rgba(248,248,255,.4)] (MUTED)">
                        © {currentYear} browncode.name.ng — Web Developer in Nigeria
                    </p>
                    <span className="text-[10px] font-mono text-[rgba(248,248,255,.4)] (MUTED) bg-[rgba(248,248,255,.12)] (MUTED2) px-2 py-1 rounded">
                        v2.1.0-stable
                    </span>
                </footer>
            </main>
        </div>
    );
}