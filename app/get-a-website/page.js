import Footer from "@/components/footer";
import Link from "next/link";
import ImageWithFallback from "@/components/ImageWithFallback";
import ServicesSection from "@/components/services/ServicesSection";
import LandingNav from "@/components/landing/LandingNav";
import "@/components/landing/landing.css";

export const metadata = {
    title: "Get a Website Built — Brown Code | Business, Church, School & Portfolio Sites",
    description:
        "Someone thinks you need a website. See starting prices for business, church, school, and portfolio sites — all negotiable — and get in touch directly on WhatsApp.",
    keywords: [
        "website for church Nigeria",
        "website for school Nigeria",
        "business website Abuja",
        "portfolio website developer",
        "affordable website Nigeria",
    ],
    alternates: {
        canonical: "https://browncode.name.ng/get-a-website",
    },
    openGraph: {
        title: "Get a Website Built — Brown Code",
        description: "Starting prices for business, church, school & portfolio websites. Fully negotiable — chat directly on WhatsApp.",
        url: "https://browncode.name.ng/get-a-website",
        images: ["/og-get-a-website.jpg"],
    },
};

const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Brown Code",
    image: "https://browncode.name.ng/logo.png",
    url: "https://browncode.name.ng",
    telephone: "+234-814-299-5114",
    priceRange: "₦150,000 - ₦800,000+",
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
};

const WA_BASE = "https://wa.me/2348142995114";
const WA_HELLO = `${WA_BASE}?text=Hi%2C%20I%20was%20sent%20this%20page%20and%20I%27d%20like%20to%20talk%20about%20a%20website`;

const AUDIENCES = [
    {
        name: "Business Website", tag: "Companies & Startups", price: "From ₦450,000", icon: "🏢", image: "/eco.jpg",
        blurb: "A site that makes a business look credible and gets found on Google.",
        features: ["Custom design, not a template", "Contact & inquiry forms", "Mobile-first, fast loading", "Local SEO setup"],
    },
    {
        name: "Church Website", tag: "Ministries & Parishes", price: "From ₦400,000", icon: "⛪", image: "/church.avif",
        blurb: "Sermons, service times, giving, and events — all in one trusted place.",
        features: ["Sermon/media archive", "Service times & events calendar", "Online giving integration", "Live stream embed"],
    },
    {
        name: "School Website", tag: "Schools & Academies", price: "From ₦450,000", icon: "🎓", image: "/school.png",
        blurb: "Admissions, news, and a portal parents and students actually use.",
        features: ["Admissions & enrollment forms", "News & announcements section", "Staff/faculty directory", "Parent portal ready"],
    },
    {
        name: "Portfolio Website", tag: "Individuals & Creatives", price: "From ₦250,000", icon: "✨", image: "/portfo.jpeg",
        blurb: "A personal site that makes you look serious and easy to hire or book.",
        features: ["Personal brand design", "Project/work showcase", "Resume/CV download", "Contact & social links"],
    },
];

// TRUST STATS: replace the bracketed values with your real numbers
const STATS = [
    { value: "[5]+", label: "Sites shipped" },
    { value: "[3]", label: "Years building" },
    { value: "[2]hr", label: "Avg. reply time" },
    { value: "100%", label: "Fixed-price, no surprises" },
];

const PORTFOLIO = [
    { name: "LAN Library", tag: "Marketplace", image: "/lanlib.png", url: "https://learningaccessnetwork.vercel.app/" },
    { name: "The Cyclopedia News", tag: "Public platform", image: "/the.jpg", url: "https://www.thecyclopedia.com.ng/" },
    { name: "Yotapoint", tag: "Business site", image: "/yota.jpg", url: "http://yotapoint.com/feeds" },
];

// Kept for later: add a testimonials section once you have real quotes
// const TESTIMONIALS = [{ quote: "", name: "", role: "" }];

const GUARANTEES = [
    { icon: "💰", title: "Fixed price, no surprises", text: "We agree a number before I start. No hourly billing shocks." },
    { icon: "👀", title: "See it before it's live", text: "You test the site on a private staging link before anything goes public." },
    { icon: "🤝", title: "Price is negotiable", text: "Every price on this page is a starting point, not a final quote." },
    { icon: "🛠️", title: "Support after launch", text: "You're not left alone once the site is delivered." },
];

const FAQS = [
    { q: "Is the price really negotiable?", a: "Yes. The prices shown are starting points based on typical scope. Once I know exactly what you need, we agree on a final number together." },
    { q: "How long does a website take?", a: "Most business, church, and portfolio sites take 1–3 weeks depending on scope. I'll give you a clear timeline in the initial brief before work starts." },
    { q: "Do I need to pay everything upfront?", a: "No — payment is typically split into milestones. Full terms are in the terms of service link below." },
    { q: "Can I request changes after it's built?", a: "Yes, within the scope we agree on. Anything outside the original brief is scoped and priced separately." },
    { q: "What if I don't have content or images ready?", a: "That's fine — tell me what you have, and we'll figure out what's needed together during the brief stage." },
];

export default function GetAWebsitePage() {
    return (
        <div className="lp-page">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
            <LandingNav />

            {/* Floating WhatsApp button */}
            <a href={WA_HELLO} target="_blank" rel="noopener noreferrer" className="lp-fab" aria-label="Chat on WhatsApp">
                💬
            </a>

            <main>
                {/* Hero */}
                <section className="lp-wrap lp-hero lp-hero--center">
                    <span className="lp-chip">Someone sent you this page</span>
                    <h1 className="lp-title">
                        You need a website.<br /><span>Here&apos;s what it costs.</span>
                    </h1>
                    <p className="lp-dek">
                        Whether it&apos;s for a business, a church, a school, or your own name — I build it, host it,
                        and hand it over working. Prices below are starting points and{" "}
                        <strong>fully negotiable</strong> once I know your scope.
                    </p>
                    <div className="lp-actions">
                        <a href={WA_HELLO} target="_blank" rel="noopener noreferrer" className="lp-btn lp-btn--solid">Chat on WhatsApp</a>
                        <a href="#prices" className="lp-btn">See starting prices</a>
                    </div>

                    <div className="lp-stats" style={{ textAlign: "left" }}>
                        {STATS.map((s) => (
                            <div key={s.label} className="lp-stat">
                                <div className="lp-stat__num">{s.value}</div>
                                <div className="lp-stat__label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Prices */}
                <section id="prices" className="lp-wrap lp-section">
                    <div className="lp-head">
                        <div>
                            <div className="lp-kicker">Pricing</div>
                            <h2 className="lp-h2">Pick what fits you</h2>
                        </div>
                        <p className="lp-head__note">
                            Starting prices only. Final cost depends on pages, features and timeline, and we agree it together.
                        </p>
                    </div>

                    <div className="lp-grid lp-grid--2">
                        {AUDIENCES.map((a) => (
                            <article key={a.name} className="lp-price">
                                <div className="lp-price__media">
                                    <ImageWithFallback src={a.image} alt={`${a.name} example`} className="lp-img" />
                                    <span className="lp-price__icon">{a.icon}</span>
                                    <span className="lp-price__tag">{a.tag}</span>
                                </div>
                                <div className="lp-price__body">
                                    <h3 className="lp-card__title" style={{ fontSize: 24 }}>{a.name}</h3>
                                    <p className="lp-card__text">{a.blurb}</p>
                                    <div className="lp-price__amount">
                                        <strong>{a.price}</strong>
                                        <span>negotiable</span>
                                    </div>
                                    <ul className="lp-list">
                                        {a.features.map((f) => <li key={f}>{f}</li>)}
                                    </ul>
                                    <a
                                        href={`${WA_BASE}?text=Hi%2C%20I%27m%20interested%20in%20a%20${encodeURIComponent(a.name)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="lp-btn lp-btn--block"
                                    >
                                        Talk price for this
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Services (nav hidden because this page already has one) */}
                <div className="lp-section">
                    <ServicesSection mode="home" showNav={false} />
                </div>

                {/* Portfolio */}
                <section id="portfolio" className="lp-wrap lp-section">
                    <div className="lp-head">
                        <div>
                            <div className="lp-kicker">Work</div>
                            <h2 className="lp-h2">Recent work</h2>
                        </div>
                        <p className="lp-head__note">A few things I&apos;ve built and shipped.</p>
                    </div>
                    <div className="lp-grid lp-grid--3">
                        {PORTFOLIO.map((p) => (
                            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="lp-proj">
                                <div className="lp-proj__img">
                                    <ImageWithFallback src={p.image} alt={p.name} className="lp-img" />
                                </div>
                                <div className="lp-proj__body">
                                    <h3 className="lp-proj__name">{p.name}</h3>
                                    <p className="lp-proj__tag">{p.tag}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Guarantees */}
                <section className="lp-wrap lp-section">
                    <div className="lp-grid lp-grid--4">
                        {GUARANTEES.map((g) => (
                            <div key={g.title} className="lp-card">
                                <span className="lp-card__badge">{g.icon}</span>
                                <h3 className="lp-card__title">{g.title}</h3>
                                <p className="lp-card__text">{g.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How pricing works */}
                <section className="lp-wrap lp-section">
                    <div className="lp-head">
                        <div>
                            <div className="lp-kicker">Process</div>
                            <h2 className="lp-h2">How pricing works</h2>
                        </div>
                    </div>
                    <div className="lp-steps">
                        <div className="lp-step">
                            <div className="lp-step__n">01</div>
                            <h3 className="lp-card__title">Tell me what you need</h3>
                            <p className="lp-card__text">Message me on WhatsApp with your category and what the site needs to do.</p>
                        </div>
                        <div className="lp-step">
                            <div className="lp-step__n">02</div>
                            <h3 className="lp-card__title">We agree on a fair price</h3>
                            <p className="lp-card__text">The prices above are starting points. We adjust together based on real scope and your budget.</p>
                        </div>
                        <div className="lp-step">
                            <div className="lp-step__n">03</div>
                            <h3 className="lp-card__title">Review terms, then start</h3>
                            <p className="lp-card__text">
                                Before any work begins, please read my{" "}
                                <Link href="/terms" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>terms of service</Link>.
                            </p>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section id="faq" className="lp-wrap lp-section">
                    <div className="lp-head">
                        <div>
                            <div className="lp-kicker">Questions</div>
                            <h2 className="lp-h2">Common questions</h2>
                        </div>
                    </div>
                    <div className="lp-faqs">
                        {FAQS.map((f) => (
                            <details key={f.q} className="lp-faq">
                                <summary>{f.q}</summary>
                                <p>{f.a}</p>
                            </details>
                        ))}
                    </div>
                </section>

                {/* Final CTA */}
                <section className="lp-wrap lp-section">
                    <div className="lp-cta">
                        <p className="lp-cta__kicker">No pressure</p>
                        <h2 className="lp-cta__title">Ready to talk?</h2>
                        <p className="lp-cta__sub">
                            No fixed number. Send a message and let&apos;s find a price that works for both of us.
                        </p>
                        <p className="lp-cta__lines">
                            <span>Call/WhatsApp: <strong>+234-814-299-5114</strong></span>
                            <span>Email: <strong>browncemmanuel@gmail.com</strong></span>
                        </p>
                        <div className="lp-actions">
                            <a href={WA_HELLO} target="_blank" rel="noopener noreferrer" className="lp-btn lp-btn--solid">Start the conversation</a>
                            <Link href="/terms" className="lp-btn">Read terms</Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}