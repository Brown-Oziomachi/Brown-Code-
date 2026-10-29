import Footer from "@/components/footer";
import Link from "next/link";
import "@/components/landing/landing.css";

export const metadata = {
    title: "Expert Software Developer in Africa – Brown Code | Web Engineering Solutions",
    description:
        "Looking for an elite software developer in Africa? Brown Code builds world-class, fast, and scalable Next.js applications, e-commerce architectures, and SaaS products globally.",
    keywords: [
        "software developer in Africa",
        "best web developer Africa",
        "hire remote software engineer Africa",
        "tech talent Nigeria Africa",
        "full stack developer Africa",
    ],
    alternates: {
        canonical: "https://browncode.name.ng/software-developer-africa",
    },
};

const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Brown Code",
    image: "https://browncode.name.ng/logo.png",
    url: "https://browncode.name.ng",
    telephone: "+234-814-299-5114",
    priceRange: "$500 - $10,000+",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Kubwa",
        addressLocality: "Abuja",
        addressRegion: "FCT",
        postalCode: "900001",
        addressCountry: "NG",
    },
    areaServed: [
        { "@type": "Continent", name: "Africa" },
        { "@type": "Country", name: "Nigeria" },
        { "@type": "Country", name: "Ghana" },
        { "@type": "Country", name: "Kenya" },
        { "@type": "Country", name: "South Africa" },
    ],
    sameAs: [
        "https://x.com/BrownC15427449",
        "https://www.linkedin.com/in/brownoziomachi72a5a3229",
    ],
};

const WA = "https://wa.me/2348142995114";

const CORE_CAPABILITIES = [
    { title: "Full-Stack Web Architectures", body: "Engineering highly dynamic client portals, custom business solutions, and blazing-fast landing platforms utilizing Next.js, React, and Tailwind CSS." },
    { title: "Cross-Border E-Commerce", body: "Building custom checkout flows, localized automated currency models, and robust multi-vendor order routing networks." },
    { title: "SaaS & Cloud Native Engines", body: "Developing scalable management panels, cloud databases, structured real-time metrics trackers, and secure API layers." },
    { title: "Enterprise Technical SEO", body: "Optimizing codebases for global search engines using strict layout structures, fast content delivery pipelines, and deep JSON-LD semantic data." },
];

const ECOSYSTEMS = [
    { market: "Pan-African Reach", description: "Deploying high-performance web systems engineered specifically to combat unstable connection parameters across multiple African regional networks." },
    { market: "Global Standardization", description: "Delivering modern, modular, clean source code matching the fast production metrics expected by international product teams." },
    { market: "Agile Build Delivery", description: "Fast, transparent production lifecycles structured around automated testing blocks, interactive prototype stages, and clear feedback loops." },
];

const FAQS = [
    { q: "How are project asset valuations and payments executed in Africa?", a: "Pricing matrices operate flexibly depending on deployment complexity. Basic specialized code blocks, custom setups, and design portfolios initiate globally from equivalent baseline parameters, with custom contracts mapped for scaled applications and high-traffic platforms. International currencies and local alternatives are systematically integrated based on project location." },
    { q: "What are your operational remote work parameters?", a: "Projects scale entirely via remote development workflows. Teams receive access to regular progress updates, live code environments, and continuous deployment previews. Synchronous milestone check-ins are organized virtually across regional African and European timezones." },
];

export default function WebDeveloperAfrica() {
    return (
        <div className="lp-page">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

            <main className="lp-wrap lp-hero">
                <div className="lp-split">
                    {/* Sticky sidebar */}
                    <aside className="lp-split__side">
                        <div>
                            <span className="lp-chip">Engineering node: Pan-Africa</span>
                            <h1 className="lp-title lp-title--sm">Brown Code <span>/</span></h1>
                            <p className="lp-sub" style={{ marginTop: 10 }}>Software Developer in Africa</p>
                        </div>

                        <p className="lp-panel__text">
                            Deploying resilient, high-speed, and production-ready digital architectures designed for
                            startups, commercial companies, and innovators across Africa.
                        </p>

                        <div className="lp-panel lp-panel--soft lp-panel--top">
                            <div className="lp-kicker"><b>Regional connectivity</b></div>
                            <p className="lp-panel__text">
                                Base hub situated in <strong>Abuja, Nigeria</strong>, providing remote delivery systems,
                                localized performance enhancements, and cloud systems to clients all over the continent.
                            </p>
                        </div>

                        <div className="lp-tags">
                            <span className="lp-tag">West Africa</span>
                            <span className="lp-tag">East Africa</span>
                            <span className="lp-tag">Southern Africa</span>
                        </div>
                    </aside>

                    {/* Main feed */}
                    <div className="lp-stack">
                        <section className="lp-panel">
                            <h2 className="lp-panel__title">Scaling continental operations via elite web engineering</h2>
                            <p className="lp-panel__text">
                                Looking to recruit or collaborate with a reliable <strong>software developer in Africa</strong>?
                                Brown Code engineers clean client interfaces, lightning-fast application backends, and robust
                                performance systems. By combining edge runtime deployment via frameworks like Next.js with deep
                                optimization practices, I ensure your products load efficiently under any networking conditions.
                            </p>
                        </section>

                        <section>
                            <div className="lp-head">
                                <div>
                                    <div className="lp-kicker">Capabilities</div>
                                    <h2 className="lp-h2">Production capabilities</h2>
                                </div>
                            </div>
                            <div className="lp-grid lp-grid--2">
                                {CORE_CAPABILITIES.map((c, i) => (
                                    <div key={c.title} className="lp-card">
                                        <span className="lp-card__badge">{String(i + 1).padStart(2, "0")}</span>
                                        <h3 className="lp-card__title">{c.title}</h3>
                                        <p className="lp-card__text">{c.body}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <div className="lp-head">
                                <div>
                                    <div className="lp-kicker">Why work with me</div>
                                    <h2 className="lp-h2">Why global teams partner with Brown Code</h2>
                                </div>
                            </div>
                            <ul className="lp-list">
                                {ECOSYSTEMS.map((s) => (
                                    <li key={s.market}>
                                        <span><b>{s.market}</b>{s.description}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <div className="lp-head">
                                <div>
                                    <div className="lp-kicker">Questions</div>
                                    <h2 className="lp-h2">Operational framework FAQs</h2>
                                </div>
                            </div>
                            <div>
                                {FAQS.map((f, i) => (
                                    <article key={f.q} className="lp-qa">
                                        <h3 className="lp-qa__q"><span className="lp-qa__n">{i + 1}</span>{f.q}</h3>
                                        <p className="lp-qa__a">{f.a}</p>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section className="lp-cta">
                            <p className="lp-cta__kicker">Work with me</p>
                            <h2 className="lp-cta__title">Initialize a continental pipeline</h2>
                            <p className="lp-cta__sub">
                                Ready to scale your application infrastructure? Connect directly on WhatsApp or send your
                                detailed engineering brief by email.
                            </p>
                            <p className="lp-cta__lines">
                                <span>WhatsApp: <strong>+234-814-299-5114</strong></span>
                                <span>Email: <strong>browncemmanuel@gmail.com</strong></span>
                            </p>
                            <div className="lp-actions">
                                <a href={WA} target="_blank" rel="noopener noreferrer" className="lp-btn lp-btn--solid">WhatsApp consultation</a>
                                <Link href="/portfolio" className="lp-btn">Explore portfolio</Link>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}