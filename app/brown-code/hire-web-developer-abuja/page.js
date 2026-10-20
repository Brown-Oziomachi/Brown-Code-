import Footer from "@/components/footer";
import Link from "next/link";
import LandingNav from "@/components/landing/LandingNav";
import "@/components/landing/landing.css";

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

const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Brown Oziomachi (Browncode)",
    url: "https://browncode.name.ng",
    logo: "https://browncode.name.ng/logo.png",
    description: "Professional web development services across Nigeria — websites, e-commerce, portfolios, web apps, SEO.",
    telephone: "+234-814-299-5114",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Kubwa",
        addressLocality: "Abuja",
        addressRegion: "FCT",
        addressCountry: "NG",
    },
    areaServed: [
        { "@type": "AdministrativeArea", name: "Abuja" },
        { "@type": "Country", name: "Nigeria" },
    ],
    sameAs: [
        "https://x.com/BrownC15427449",
        "https://www.linkedin.com/in/brownoziomachi72a5a3229",
    ],
    priceRange: "₦100,000 - ₦500,000+",
};

const WA = "https://wa.me/2348142995114";

const SERVICES = [
    "Custom business websites & landing pages",
    "Portfolio & personal websites",
    "E-commerce stores with payment integration",
    "Blogs, news portals, and media websites",
    "Web applications & dashboards",
    "SEO optimization & speed improvements",
];

const ADVANTAGES = [
    { title: "Local Expertise", desc: "We understand Nigerian businesses and customers." },
    { title: "Modern Technologies", desc: "Next.js, React, Tailwind, Firebase." },
    { title: "Responsive Design", desc: "Works perfectly on mobile, tablet, and desktop." },
    { title: "Fast & SEO-Friendly", desc: "Optimized for Google search and page speed." },
    { title: "Affordable Packages", desc: "High-quality work without breaking your budget." },
];

const PROJECTS = [
    { name: "IJ Stitches", desc: "Fashion website for a Nigeria-based business", emoji: "🧵" },
    { name: "The Cyclopedia", desc: "News & media website", emoji: "📰" },
    { name: "Browncode Portfolio", desc: "Professional web developer showcase", emoji: "👤", href: "https://browncode.name.ng" },
    { name: "E-commerce Store / Yotapoint", desc: "Online shop ecosystem", emoji: "🛍" },
];

const FAQS = [
    { q: "How much does a website cost in Nigeria?", a: "Prices depend on features. Portfolio websites start from ₦100,000, business sites ₦300,000, e-commerce ₦500,000+." },
    { q: "How long will it take?", a: "Most websites are delivered within 5–10 days depending on complexity." },
    { q: "Do you meet clients locally?", a: "Yes, we can meet in Abuja for briefings, handovers, or training sessions. Virtual meetings are also available." },
];

export default function WebDeveloperNigeria() {
    return (
        <div className="lp-page">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
            <LandingNav />

            <main>
                {/* Hero */}
                <section className="lp-wrap lp-hero">
                    <span className="lp-chip">Nationwide, Nigeria</span>
                    <h1 className="lp-title">Web Developer in <span>Nigeria</span>.</h1>
                    <p className="lp-dek">
                        Searching for a <strong>professional web developer in Nigeria</strong>? Browncode provides modern,
                        responsive, and SEO-friendly web ecosystems for businesses and individuals looking to scale.
                    </p>
                    <div className="lp-actions">
                        <a href={WA} target="_blank" rel="noopener noreferrer" className="lp-btn lp-btn--solid">Start a project</a>
                        <Link href="/portfolio" className="lp-btn">View portfolio</Link>
                    </div>
                </section>

                {/* Services + advantages */}
                <section className="lp-wrap lp-section">
                    <div className="lp-grid lp-grid--2">
                        <div className="lp-panel">
                            <div className="lp-kicker"><b>Services</b></div>
                            <h2 className="lp-panel__title">Services offered</h2>
                            <ul className="lp-list">
                                {SERVICES.map((s) => <li key={s}>{s}</li>)}
                            </ul>
                        </div>
                        <div className="lp-panel lp-panel--soft lp-panel--top">
                            <div className="lp-kicker"><b>Why me</b></div>
                            <h2 className="lp-panel__title">Why hire Browncode?</h2>
                            <ul className="lp-list">
                                {ADVANTAGES.map((a) => (
                                    <li key={a.title}><span><b>{a.title}</b>{a.desc}</span></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Projects */}
                <section className="lp-wrap lp-section">
                    <div className="lp-head">
                        <div>
                            <div className="lp-kicker">Work</div>
                            <h2 className="lp-h2">Portfolio – projects in Nigeria</h2>
                        </div>
                    </div>
                    <div className="lp-grid lp-grid--2">
                        {PROJECTS.map((p) => (
                            <div key={p.name} className="lp-card lp-card--lift">
                                <span className="lp-card__badge">{p.emoji}</span>
                                <h3 className="lp-card__title">
                                    {p.href ? (
                                        <Link href={p.href} style={{ textDecoration: "underline", textDecorationColor: "#c9c600", textDecorationThickness: 2, textUnderlineOffset: 3 }}>
                                            {p.name}
                                        </Link>
                                    ) : p.name}
                                </h3>
                                <p className="lp-card__text">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section className="lp-wrap lp-section">
                    <div className="lp-head">
                        <div>
                            <div className="lp-kicker">Questions</div>
                            <h2 className="lp-h2">FAQ – web developer in Nigeria</h2>
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

                {/* CTA */}
                <section className="lp-wrap lp-section">
                    <div className="lp-cta">
                        <p className="lp-cta__kicker">Work with me</p>
                        <h2 className="lp-cta__title">Contact Sir Brown in Nigeria</h2>
                        <p className="lp-cta__sub">
                            Ready to build your website? Reach out on WhatsApp or book a consultation by email.
                        </p>
                        <p className="lp-cta__lines">
                            <span>WhatsApp: <strong>+234-814-299-5114</strong></span>
                            <span>Email: <strong>browncemmanuel@gmail.com</strong></span>
                        </p>
                        <div className="lp-actions">
                            <a href={WA} target="_blank" rel="noopener noreferrer" className="lp-btn lp-btn--solid">Chat on WhatsApp</a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}