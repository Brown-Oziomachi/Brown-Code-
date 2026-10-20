import Footer from "@/components/footer";
import Link from "next/link";
import LandingNav from "@/components/landing/LandingNav";
import "@/components/landing/landing.css";

export const metadata = {
    title: "Software Developer in Nigeria – Brown Code | Professional Website Developer",
    description:
        "Brown Code builds fast, modern, and SEO-optimized websites across Nigeria. Hire a trusted web developer in Nigeria for business websites, e-commerce, portfolios, and web apps.",
    keywords: [
        "web developer in Nigeria",
        "best website developer Nigeria",
        "professional web developer Nigeria",
        "hire developer in Lagos Abuja",
        "software engineer Nigeria",
    ],
    alternates: {
        canonical: "https://browncode.name.ng/web-developer-nigeria",
    },
};

const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Brown Code (Brown Oziomachi A.)",
    url: "https://browncode.name.ng",
    logo: "https://browncode.name.ng/logo.png",
    description: "Professional full-stack web development services (Next.js, React, Tailwind CSS) available nationwide across Nigeria.",
    telephone: "+234-814-299-5114",
    priceRange: "₦300,000 - ₦1,500,000+",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Abuja",
        addressRegion: "FCT",
        addressCountry: "NG",
    },
    areaServed: [
        { "@type": "Country", name: "Nigeria" },
        { "@type": "AdministrativeArea", name: "Lagos" },
        { "@type": "AdministrativeArea", name: "Abuja" },
        { "@type": "AdministrativeArea", name: "Rivers" },
    ],
    sameAs: [
        "https://x.com/BrownC15427449",
        "https://www.linkedin.com/in/brownoziomachi72a5a3229",
    ],
};

const WA = "https://wa.me/2348142995114";

const NIGERIA_SERVICES = [
    { title: "Enterprise & Business Sites", desc: "High-conversion corporate platforms and optimized landing pages built to secure market leads." },
    { title: "E-Commerce Infrastructures", desc: "Digital storefronts equipped with payment gateway integrations and custom backend admin systems." },
    { title: "Creative & Agent Portfolios", desc: "Fast, striking online portfolios showcasing services for elite professionals across Nigeria." },
    { title: "Progressive Web Applications", desc: "Dynamic dashboards and client management systems designed to execute offline-first tasks seamlessly." },
    { title: "Technical SEO & Optimization", desc: "Fine-tuning Core Web Vitals, performance speeds, and clean JSON-LD structured data mapping." },
];

const METRICS = [
    { label: "Performance Engine", text: "Sub-second load times engineered via custom Next.js server routing architectures." },
    { label: "Mobile-First UX Strategy", text: "Tailwind interfaces explicitly structured for unstable network connections and mobile-dominant audiences." },
    { label: "Data Architecture", text: "Clean database integrations and semantic markup structures that search engine bots crawl with ease." },
];

const SEO_ITEMS = [
    "High-Intent Local Keywords",
    "Automated JSON-LD Graphs",
    "Core Web Vitals Optimization",
    "Local Business Snippet Schema",
];

const FAQS = [
    { q: "How much does a website cost in Nigeria?", a: "Project costs vary depending on features. Standard business portfolios start around ₦300,000, while deep e-commerce architectures and integrated software systems scale upward based on structural complexity." },
    { q: "How long will it take?", a: "Production lifecycles typically span 1 to 3 weeks. Timeline schedules rely entirely on the engineering scope and asset delivery cycles." },
];

export default function WebDeveloperNigeria() {
    return (
        <div className="lp-page">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
            <LandingNav />

            <main>
                {/* Hero */}
                <section className="lp-wrap lp-hero lp-hero--split">
                    <div>
                        <span className="lp-chip">Nationwide availability — Nigeria</span>
                        <h1 className="lp-title">
                            Software Developer<br />in Nigeria<span>.</span>
                        </h1>
                        <p className="lp-dek">
                            Looking for a reliable <strong>developer in Nigeria</strong>? Brown Code develops high-speed,
                            modern, and SEO-optimized interfaces that empower brands across the federation to process
                            payments, track leads, and capture markets.
                        </p>
                        <div className="lp-actions">
                            <a href={WA} target="_blank" rel="noopener noreferrer" className="lp-btn lp-btn--solid">Start a project</a>
                            <Link href="/portfolio" className="lp-btn">View portfolio</Link>
                        </div>
                    </div>

                    <div className="lp-panel lp-panel--soft lp-panel--top">
                        <div className="lp-kicker"><b>Developing architecture</b></div>
                        <p className="lp-panel__text" style={{ marginBottom: 16 }}>
                            Physical operations are located in <strong>Abuja (FCT)</strong>, with remote deployment
                            capabilities and developing consultations available across all states, including Lagos,
                            Port Harcourt, and Kano.
                        </p>
                        <div className="lp-tags">
                            {["Next.js", "React.js", "Tailwind", "Firebase"].map((t) => <span key={t} className="lp-tag">{t}</span>)}
                        </div>
                    </div>
                </section>

                {/* Body */}
                <section className="lp-wrap lp-section">
                    <div className="lp-cols">
                        {/* Left */}
                        <div className="lp-stack">
                            <section>
                                <div className="lp-head">
                                    <div>
                                        <div className="lp-kicker">Services</div>
                                        <h2 className="lp-h2">Services I offer across Nigeria</h2>
                                    </div>
                                </div>
                                <div className="lp-grid">
                                    {NIGERIA_SERVICES.map((s, i) => (
                                        <div key={s.title} className="lp-card">
                                            <span className="lp-card__badge">{String(i + 1).padStart(2, "0")}</span>
                                            <h3 className="lp-card__title">{s.title}</h3>
                                            <p className="lp-card__text">{s.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="lp-panel lp-panel--soft">
                                <h2 className="lp-panel__title">On-page search optimizations implemented</h2>
                                <ul className="lp-list">
                                    {SEO_ITEMS.map((s) => <li key={s}>{s}</li>)}
                                </ul>
                            </section>
                        </div>

                        {/* Right */}
                        <div className="lp-stack">
                            <section className="lp-panel lp-panel--top">
                                <h2 className="lp-panel__title">Why scale with Brown Code?</h2>
                                <ul className="lp-list">
                                    {METRICS.map((m) => (
                                        <li key={m.label}><span><b>{m.label}</b>{m.text}</span></li>
                                    ))}
                                </ul>
                            </section>

                            <section>
                                <div className="lp-head">
                                    <div>
                                        <div className="lp-kicker">Questions</div>
                                        <h2 className="lp-h2" style={{ fontSize: 26 }}>Frequently asked</h2>
                                    </div>
                                </div>
                                {FAQS.map((f, i) => (
                                    <article key={f.q} className="lp-qa">
                                        <h3 className="lp-qa__q" style={{ fontSize: 16 }}><span className="lp-qa__n">{i + 1}</span>{f.q}</h3>
                                        <p className="lp-qa__a">{f.a}</p>
                                    </article>
                                ))}
                            </section>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="lp-wrap lp-section">
                    <div className="lp-cta">
                        <p className="lp-cta__kicker">Work with me</p>
                        <h2 className="lp-cta__title">Ready to kickstart your system build?</h2>
                        <p className="lp-cta__sub">
                            Schedule a briefing. See live projects and screenshots at{" "}
                            <Link href="https://browncode.name.ng" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>
                                browncode.name.ng
                            </Link>.
                        </p>
                        <p className="lp-cta__lines">
                            <span>WhatsApp: <strong>+234-814-299-5114</strong></span>
                            <span>Email: <strong>browncemmanuel@gmail.com</strong></span>
                        </p>
                        <div className="lp-actions">
                            <a href={WA} target="_blank" rel="noopener noreferrer" className="lp-btn lp-btn--solid">Start a briefing on WhatsApp</a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}