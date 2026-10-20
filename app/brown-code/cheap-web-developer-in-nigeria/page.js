import Footer from "@/components/footer";
import Link from "next/link";
import ImageWithFallback from "@/components/ImageWithFallback";
import LandingNav from "@/components/landing/LandingNav";
import "@/components/landing/landing.css";

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
        "website developer",
    ],
    alternates: {
        canonical: "https://browncode.name.ng/cheap-web-developer-nigeria",
    },
};

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
        addressCountry: "NG",
    },
    areaServed: { "@type": "Country", name: "Nigeria" },
};

const WA = "https://wa.me/2348142995114";

const BENEFITS = [
    { label: "Optimized Baseline Costs", detail: "Professional grade deployment without inflated digital agency margins." },
    { label: "Rapid Delivery Engine", detail: "Lean, direct-to-market construction pipelines getting you live in record time." },
    { label: "Zero Speed Compromise", detail: "Built natively on Next.js to load instantly even over unstable mobile data links." },
    { label: "Built-In SEO Foundations", detail: "Clean structure, microdata schemas, and meta layouts mapped right out of the box." },
];

const COST_TABLE = [
    { plan: "Basic Portfolio Website", range: "₦250,000 – ₦400,000", scope: "Single-page landers, biography hubs, and basic lead captures." },
    { plan: "Business / Company Website", range: "₦450,000 – ₦700,000", scope: "Multi-page corporate layouts, custom service sheets, and contact pipes." },
    { plan: "News / Blog Website", range: "₦600,000 – ₦800,000", scope: "Dynamic CMS content architectures, infinite scrolling features, and media feeds." },
    { plan: "E-commerce Website", range: "₦800,000 – ₦1,200,000", scope: "Full digital store catalogs, secure checkouts, and local payment gateways." },
];

const SKILLS = ["Next.js & React.js", "Tailwind CSS", "Firebase Engine", "Node.js Architecture", "Vercel Cloud Hosting"];

const PROJECTS = [
    { name: "IJ Stitches Fashion Website", meta: "Modern design & fashion portfolio ecosystem", icon: "🧵", image: "/ijs.jpg" },
    { name: "The Cyclopedia", meta: "News portal, high-speed blog, and integrated media showcase", icon: "📰", image: "/the.jpg" },
    { name: "Browncode Portfolio", meta: "Core professional stack demonstration platform", icon: "👤", link: "https://browncode.name.ng", image: "/logoo.png" },
    { name: "E-commerce Store / Yotapoint", meta: "Fully operational transactional retail infrastructure", icon: "🛍", image: "/yota.jpg" },
];

const FAQS = [
    { q: "How much is a cheap website in Nigeria?", a: "My basic fast-deployment frameworks initiate straight from ₦150,000, sizing and scaling dynamically based upon specific functional component additions." },
    { q: "How long does it take to build down the site?", a: "Most foundational value builds achieve full production staging within a 2 to 3 week delivery timeline." },
    { q: "Do you offer post-launch platform maintenance?", a: "Yes. I provide highly accessible, affordable platform optimization and structural update arrangements." },
    { q: "Can you build out custom full-stack software applications?", a: "Absolutely. Beyond static layouts, I design and deploy interactive administrative software panels and dynamic data engines." },
];

export default function CheapWebDeveloperNigeria() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="lp-page">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
            <LandingNav />

            <main>
                {/* Hero */}
                <section className="lp-wrap lp-hero lp-hero--split">
                    <div>
                        <span className="lp-chip"><i className="lp-dot" /> Maximize capital efficiency</span>
                        <h1 className="lp-title lp-title--sm">
                            Cheap Web Developer in Nigeria — <span>Budget-Friendly</span>, Professional Engineering.
                        </h1>
                        <p className="lp-dek">
                            If you are searching for a <strong>cheap web developer in Nigeria</strong> who delivers
                            enterprise-grade performance without the agency markup, you are in the right place. At{" "}
                            <strong>Browncode</strong>, I strip out the overhead to build fast, secure, mobile-optimized
                            sites at flat rates that fit your budget.
                        </p>
                        <div className="lp-actions">
                            <a href={WA} target="_blank" rel="noopener noreferrer" className="lp-btn lp-btn--solid">Start a project</a>
                            <a href="#packages" className="lp-btn">View pricing</a>
                        </div>
                    </div>

                    <div className="lp-figure">
                        <ImageWithFallback
                            src="/v.webp"
                            alt="Web developer building a website in Abuja, Nigeria"
                            className="lp-img"
                        />
                        <div className="lp-figure__tags">
                            <span className="lp-figure__tag">Live in Abuja, FCT</span>
                            <span className="lp-figure__tag">{currentYear}</span>
                        </div>
                    </div>
                </section>

                {/* Benefits */}
                <section className="lp-wrap lp-section">
                    <div className="lp-head">
                        <div>
                            <div className="lp-kicker">Why it costs less</div>
                            <h2 className="lp-h2">Performance features</h2>
                        </div>
                    </div>
                    <div className="lp-grid lp-grid--2">
                        {BENEFITS.map((b, i) => (
                            <div key={b.label} className="lp-card">
                                <span className="lp-card__badge">{String(i + 1).padStart(2, "0")}</span>
                                <h3 className="lp-card__title">{b.label}</h3>
                                <p className="lp-card__text">{b.detail}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Packages */}
                <section id="packages" className="lp-wrap lp-section">
                    <div className="lp-head">
                        <div>
                            <div className="lp-kicker">Pricing</div>
                            <h2 className="lp-h2">Affordable website packages</h2>
                        </div>
                        <p className="lp-head__note">Transparent pricing that scales with what your project needs.</p>
                    </div>
                    <div className="lp-table-wrap">
                        <table className="lp-table">
                            <thead>
                                <tr>
                                    <th>Website type</th>
                                    <th>Investment range</th>
                                    <th className="lp-hide-sm">What&apos;s included</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COST_TABLE.map((row) => (
                                    <tr key={row.plan}>
                                        <td>{row.plan}</td>
                                        <td className="lp-table__price"><span>{row.range}</span></td>
                                        <td className="lp-hide-sm">{row.scope}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Stack */}
                <section className="lp-wrap lp-section">
                    <div className="lp-strip">
                        <div>
                            <div className="lp-kicker">Stack</div>
                            <p className="lp-strip__note">Clean builds on modern cloud technologies.</p>
                        </div>
                        <div className="lp-tags">
                            {SKILLS.map((s) => <span key={s} className="lp-tag">{s}</span>)}
                        </div>
                    </div>
                </section>

                {/* Projects */}
                <section className="lp-wrap lp-section">
                    <div className="lp-head">
                        <div>
                            <div className="lp-kicker">Work</div>
                            <h2 className="lp-h2">Verified platform deliveries</h2>
                        </div>
                    </div>
                    <div className="lp-grid lp-grid--2">
                        {PROJECTS.map((p) => (
                            <div key={p.name} className="lp-proj">
                                <div className="lp-proj__img">
                                    <ImageWithFallback src={p.image} alt={p.name} className="lp-img" />
                                    <span className="lp-proj__icon">{p.icon}</span>
                                </div>
                                <div className="lp-proj__body">
                                    <h3 className="lp-proj__name">
                                        {p.link ? <Link href={p.link}>{p.name}</Link> : p.name}
                                    </h3>
                                    <p className="lp-proj__meta">{p.meta}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section className="lp-wrap lp-section">
                    <div className="lp-head">
                        <div>
                            <div className="lp-kicker">Questions</div>
                            <h2 className="lp-h2">Frequently asked</h2>
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
                        <h2 className="lp-cta__title">Launch your platform intelligently</h2>
                        <p className="lp-cta__sub">
                            Secure, high-performance builds engineered inside your budget. Send a short project brief on WhatsApp.
                        </p>
                        <p className="lp-cta__lines">
                            <span>Direct line: <strong>+234-701-372-5529</strong></span>
                        </p>
                        <div className="lp-actions">
                            <a href={WA} target="_blank" rel="noopener noreferrer" className="lp-btn lp-btn--solid">Start a project</a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}