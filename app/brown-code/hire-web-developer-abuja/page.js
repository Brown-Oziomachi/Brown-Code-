import Footer from "@/components/footer";
import Link from "next/link";
import ImageWithFallback from "@/components/ImageWithFallback";

// 1. METADATA — written for link-preview sharing (WhatsApp/social)
export const metadata = {
    title: "Get a Website Built — Brown Code | Business, Church, School & Portfolio Sites",
    description:
        "Someone thinks you need a website. See starting prices for business, church, school, and portfolio sites — all negotiable — and get in touch directly on WhatsApp.",
    keywords: [
        "website for church Nigeria",
        "website for school Nigeria",
        "business website Abuja",
        "portfolio website developer",
        "affordable website Nigeria"
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

// 2. SEO STRUCTURED DATA
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
        addressCountry: "NG"
    },
    areaServed: [
        { "@type": "AdministrativeArea", name: "Abuja" },
        { "@type": "Country", name: "Nigeria" }
    ]
};

const WA_BASE = "https://wa.me/2348142995114";

// 3. AUDIENCE PACKAGES
const AUDIENCES = [
    {
        name: "Business Website",
        tag: "Companies & Startups",
        price: "From ₦450,000",
        icon: "🏢",
        image: "/eco.jpg",
        blurb: "A site that makes a business look credible and gets found on Google.",
        features: [
            "Custom design, not a template",
            "Contact & inquiry forms",
            "Mobile-first, fast loading",
            "Local SEO setup"
        ]
    },
    {
        name: "Church Website",
        tag: "Ministries & Parishes",
        price: "From ₦400,000",
        icon: "⛪",
        image: "/church.avif",
        blurb: "Sermons, service times, giving, and events — all in one trusted place.",
        features: [
            "Sermon/media archive",
            "Service times & events calendar",
            "Online giving integration",
            "Live stream embed"
        ]
    },
    {
        name: "School Website",
        tag: "Schools & Academies",
        price: "From ₦450,000",
        icon: "🎓",
        image: "/school.png",
        blurb: "Admissions, news, and a portal parents and students actually use.",
        features: [
            "Admissions & enrollment forms",
            "News & announcements section",
            "Staff/faculty directory",
            "Parent portal ready"
        ]
    },
    {
        name: "Portfolio Website",
        tag: "Individuals & Creatives",
        price: "From ₦250,000",
        icon: "✨",
        image: "/portfo.jpeg",
        blurb: "A personal site that makes you look serious and easy to hire or book.",
        features: [
            "Personal brand design",
            "Project/work showcase",
            "Resume/CV download",
            "Contact & social links"
        ]
    }
];

// 4. TRUST STATS — REPLACE WITH YOUR REAL NUMBERS
const STATS = [
    { value: "[5]+", label: "Sites shipped" },
    { value: "[3]", label: "Years building" },
    { value: "[2]hr", label: "Avg. reply time" },
    { value: "100%", label: "Fixed-price, no surprises" }
];

// 5. PORTFOLIO PREVIEW — REPLACE image PATHS WITH REAL PROJECT SCREENSHOTS
const PORTFOLIO = [
    { name: "LAN Library", tag: "Marketplace", image: "/lanlib.png", url: "https://learningaccessnetwork.vercel.app/" },
    { name: "The Cyclopedia News", tag: "Public platform", image: "/the.jpg", url: "https://www.thecyclopedia.com.ng/" },
    { name: "Yotapoint", tag: "Business site", image: "/yota.jpg", url: "http://yotapoint.com/feeds" }
];

// 6. TESTIMONIALS — PLACEHOLDER TEXT, REPLACE WITH REAL CLIENT QUOTES
const TESTIMONIALS = [
    { quote: "[Add a real client quote here about the process and result.]", name: "[Client name]", role: "[Business / Church / School]" },
    { quote: "[Add a real client quote here — what problem the site solved for them.]", name: "[Client name]", role: "[Business / Church / School]" },
    { quote: "[Add a real client quote here about turnaround time or communication.]", name: "[Client name]", role: "[Business / Church / School]" }
];

const GUARANTEES = [
    { icon: "💰", title: "Fixed price, no surprises", text: "We agree a number before I start. No hourly billing shocks." },
    { icon: "👀", title: "See it before it's live", text: "You test the site on a private staging link before anything goes public." },
    { icon: "🤝", title: "Price is negotiable", text: "Every price on this page is a starting point, not a final quote." },
    { icon: "🛠️", title: "Support after launch", text: "You're not left alone once the site is delivered." }
];

const FAQS = [
    { q: "Is the price really negotiable?", a: "Yes. The prices shown are starting points based on typical scope. Once I know exactly what you need, we agree on a final number together." },
    { q: "How long does a website take?", a: "Most business, church, and portfolio sites take 1–3 weeks depending on scope. I'll give you a clear timeline in the initial brief before work starts." },
    { q: "Do I need to pay everything upfront?", a: "No — payment is typically split into milestones. Full terms are in the terms of service link below." },
    { q: "Can I request changes after it's built?", a: "Yes, within the scope we agree on. Anything outside the original brief is scoped and priced separately." },
    { q: "What if I don't have content or images ready?", a: "That's fine — tell me what you have, and we'll figure out what's needed together during the brief stage." }
];

<style>
    {`
    .ft-wordmark {
        font-family: 'JetBrains Mono', 'Fira Code', monospace;
        font-size: 15px;
        font-weight: 500;
        letter-spacing: 0.04em;
        color: #f4f4f5;
        text-decoration: none;
        display: inline-block;
        margin-bottom: 12px;
    }
    `}
</style>
export default function GetAWebsitePage() {
    return (
        <div className="min-h-screen bg-[#0e0e17] text-[#f8f8ff] antialiased selection:bg-[#7c3aed] selection:text-[#f8f8ff]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            {/* Sticky nav */}
            <nav className="sticky top-0 z-40 bg-[#0b0b0f]/85 backdrop-blur border-b border-[rgba(248,248,255,.07)]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="ft-wordmark">
                        brown<em>.</em>dev
                    </Link>
                    <div className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-[rgba(248,248,255,.5)]">
                        <a href="#prices" className="hover:text-[#f8f8ff] transition-colors">Pricing</a>
                        <a href="#portfolio" className="hover:text-[#f8f8ff] transition-colors">Portfolio</a>
                        <a href="#faq" className="hover:text-[#f8f8ff] transition-colors">FAQ</a>
                        <Link href="/terms" className="hover:text-[#f8f8ff] transition-colors">Terms</Link>
                    </div>
                    <Link
                        href={`${WA_BASE}?text=Hi%2C%20I%20was%20sent%20this%20page%20and%20I%27d%20like%20to%20talk%20about%20a%20website`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#65a30d] hover:bg-[#a3e635] text-[#0b0b0f] px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors"
                    >
                        WhatsApp
                    </Link>
                </div>
            </nav>

            {/* Floating WhatsApp button */}
            <Link
                href={`${WA_BASE}?text=Hi%2C%20I%20was%20sent%20this%20page%20and%20I%27d%20like%20to%20talk%20about%20a%20website`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-[#65a30d] hover:bg-[#a3e635] text-[#0b0b0f] w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-2xl shadow-[#65a30d]/30 transition-transform hover:scale-105"
                aria-label="Chat on WhatsApp"
            >
                💬
            </Link>

            <main className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:py-24">

                {/* Hero */}
                <header className="text-center max-w-2xl mx-auto mb-16">
                    <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#a3e635] bg-[#a3e635]/10 px-4 py-1.5 rounded border border-[#a3e635]/20">
                        Someone sent you this page
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-6 leading-tight">
                        You need a website<span className="text-[#7c3aed]">.</span><br />
                        Here&apos;s what it costs.
                    </h1>
                    <p className="text-base text-[rgba(248,248,255,.4)] mt-4 leading-relaxed">
                        Whether it&apos;s for a business, a church, a school, or your own name — I build it,
                        host it, and hand it over working. Prices below are starting points and
                        <span className="text-[#f8f8ff]"> fully negotiable</span> once I know your scope.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Link
                            href={`${WA_BASE}?text=Hi%2C%20I%20was%20sent%20this%20page%20and%20I%27d%20like%20to%20talk%20about%20a%20website`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#65a30d] hover:bg-[#a3e635] text-[#0b0b0f] px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-md shadow-[#65a30d]/20"
                        >
                            Chat on WhatsApp
                        </Link>

                      <a  href="#prices"
                        className="inline-flex items-center gap-2 border border-[rgba(248,248,255,.15)] hover:border-[rgba(248,248,255,.35)] text-[#f8f8ff] px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                        See starting prices
                    </a>
                </div>
            </header>

            {/* Stats bar */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                {STATS.map((s, idx) => (
                    <div key={idx} className="bg-[#11111a] border border-[rgba(248,248,255,.07)] rounded-xl p-5 text-center">
                        <div className="text-2xl sm:text-3xl font-black text-[#a3e635]">{s.value}</div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[rgba(248,248,255,.4)] mt-1">{s.label}</div>
                    </div>
                ))}
            </section>

            {/* Audience / pricing cards */}
            <section id="prices" className="mb-24">
                <div className="text-center max-w-xl mx-auto mb-10">
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#f8f8ff]">Pick what fits you</h2>
                    <p className="text-xs text-[rgba(248,248,255,.4)] mt-3">
                        These are starting prices — final cost depends on pages, features, and timeline. We agree on it together.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                    {AUDIENCES.map((a, idx) => (
                        <div
                            key={idx}
                            className="rounded-2xl overflow-hidden flex flex-col bg-[#11111a] border border-[rgba(248,248,255,.07)] shadow-xl"
                        >
                            <div className="relative h-44 w-full">
                                <ImageWithFallback
                                    src={a.image}
                                    alt={`${a.name} example`}
                                    className="w-full h-full object-cover grayscale-[10%] contrast-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/30 to-transparent" />
                                <span className="absolute bottom-3 left-4 text-2xl drop-shadow-lg">{a.icon}</span>
                                <span className="absolute bottom-3 right-4 text-[10px] font-mono uppercase tracking-wider text-[rgba(248,248,255,.7)] bg-[#0b0b0f]/70 backdrop-blur px-2.5 py-1 rounded-full">
                                    {a.tag}
                                </span>
                            </div>

                            <div className="p-6 sm:p-7 flex flex-col flex-1">
                                <h3 className="text-xl font-black text-[#f8f8ff]">{a.name}</h3>
                                <p className="text-xs text-[rgba(248,248,255,.4)] mt-2 leading-relaxed">{a.blurb}</p>

                                <div className="flex items-baseline gap-2 mt-5">
                                    <span className="text-2xl font-black text-[#f8f8ff]">{a.price}</span>
                                    <span className="text-[10px] font-mono uppercase text-[rgba(248,248,255,.4)]">negotiable</span>
                                </div>

                                <ul className="space-y-2.5 mt-5 pt-5 border-t border-[rgba(248,248,255,.07)]">
                                    {a.features.map((f, fIdx) => (
                                        <li key={fIdx} className="text-xs flex items-start gap-2.5 text-[rgba(248,248,255,.4)]">
                                            <span className="text-[#a3e635] font-bold">✓</span>
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-6 pt-5 border-t border-[rgba(248,248,255,.07)]">
                                    <Link
                                        href={`${WA_BASE}?text=Hi%2C%20I%27m%20interested%20in%20a%20${encodeURIComponent(a.name)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full block text-center py-2.5 rounded-xl text-xs font-bold tracking-wide bg-[#0b0b0f] border border-[rgba(248,248,255,.12)] hover:bg-[#18182a] transition-all"
                                    >
                                        Talk price for this
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Portfolio preview */}
            <section id="portfolio" className="mb-24">
                <div className="text-center max-w-xl mx-auto mb-10">
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#f8f8ff]">Recent work</h2>
                    <p className="text-xs text-[rgba(248,248,255,.4)] mt-3">A few things I&apos;ve built and shipped.</p>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                    {PORTFOLIO.map((p, idx) => (
                        <Link
                            key={idx}
                            href={p.url}
                            target={p.url.startsWith("http") ? "_blank" : undefined}
                            rel={p.url.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="group rounded-2xl overflow-hidden bg-[#11111a] border border-[rgba(248,248,255,.07)] block"
                        >
                            <div className="relative h-36 w-full overflow-hidden">
                                <ImageWithFallback
                                    src={p.image}
                                    alt={p.name}
                                    className="w-full h-full object-cover grayscale-[10%] group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-sm font-bold text-[#f8f8ff]">{p.name}</h3>
                                <p className="text-[10px] font-mono uppercase tracking-wider text-[rgba(248,248,255,.4)] mt-1">{p.tag}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Guarantees / trust badges */}
            <section className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-24">
                {GUARANTEES.map((g, idx) => (
                    <div key={idx} className="bg-[#11111a] border border-[rgba(248,248,255,.07)] rounded-2xl p-5">
                        <div className="text-2xl mb-3">{g.icon}</div>
                        <h3 className="text-sm font-bold text-[#f8f8ff] mb-1.5">{g.title}</h3>
                        <p className="text-xs text-[rgba(248,248,255,.4)] leading-relaxed">{g.text}</p>
                    </div>
                ))}
            </section>

            {/* Testimonials */}
            {/* <section className="mb-24">
                <div className="text-center max-w-xl mx-auto mb-10">
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#f8f8ff]">What clients say</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {TESTIMONIALS.map((t, idx) => (
                        <div key={idx} className="bg-[#1e1e30] border border-[rgba(248,248,255,.07)] rounded-2xl p-6">
                            <p className="text-xs text-[rgba(248,248,255,.6)] leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                            <div className="mt-4 pt-4 border-t border-[rgba(248,248,255,.07)]">
                                <p className="text-xs font-bold text-[#f8f8ff]">{t.name}</p>
                                <p className="text-[10px] font-mono uppercase tracking-wider text-[rgba(248,248,255,.4)]">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section> */}

            {/* How pricing works */}
            <section className="bg-[#1e1e30] border border-[rgba(248,248,255,.07)] rounded-2xl p-6 sm:p-8 mb-24 shadow-2xl">
                <h2 className="text-xl font-extrabold tracking-tight mb-8 text-[#f8f8ff] flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#a855f7] rounded-full"></span> How pricing works
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <div className="text-4xl font-black text-[rgba(124,58,237,.2)] font-mono mb-2">01</div>
                        <h3 className="text-base font-bold text-[#f8f8ff] mb-2">Tell me what you need</h3>
                        <p className="text-xs text-[rgba(248,248,255,.4)] leading-relaxed">Message me on WhatsApp with your category and what the site needs to do.</p>
                    </div>
                    <div>
                        <div className="text-4xl font-black text-[rgba(124,58,237,.2)] font-mono mb-2">02</div>
                        <h3 className="text-base font-bold text-[#f8f8ff] mb-2">We agree on a fair price</h3>
                        <p className="text-xs text-[rgba(248,248,255,.4)] leading-relaxed">The prices above are starting points — we adjust together based on real scope and your budget.</p>
                    </div>
                    <div>
                        <div className="text-4xl font-black text-[rgba(124,58,237,.2)] font-mono mb-2">03</div>
                        <h3 className="text-base font-bold text-[#f8f8ff] mb-2">Review terms, then start</h3>
                        <p className="text-xs text-[rgba(248,248,255,.4)] leading-relaxed">
                            Before any work begins, please read my{" "}
                            <Link href="/terms" className="text-[#a3e635] underline underline-offset-2">
                                terms of service
                            </Link>.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-24">
                <div className="text-center max-w-xl mx-auto mb-10">
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#f8f8ff]">Common questions</h2>
                </div>
                <div className="max-w-2xl mx-auto space-y-3">
                    {FAQS.map((f, idx) => (
                        <details
                            key={idx}
                            className="group bg-[#11111a] border border-[rgba(248,248,255,.07)] rounded-xl p-5 open:border-[#7c3aed]/40"
                        >
                            <summary className="flex items-center justify-between cursor-pointer text-sm font-bold text-[#f8f8ff] list-none">
                                {f.q}
                                <span className="text-[#a3e635] font-mono text-lg group-open:rotate-45 transition-transform">+</span>
                            </summary>
                            <p className="text-xs text-[rgba(248,248,255,.4)] leading-relaxed mt-3">{f.a}</p>
                        </details>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-[#11111a] border border-[rgba(124,58,237,.25)] rounded-2xl p-8 max-w-4xl mx-auto text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#7c3aed]/5 blur-3xl pointer-events-none"></div>

                <h2 className="text-2xl font-black">Ready to talk?</h2>
                <p className="text-xs text-[rgba(248,248,255,.4)] mt-3 mx-auto leading-relaxed">
                    No pressure, no fixed number — send a message and let&apos;s find a price that works for both of us.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 text-xs font-mono text-[rgba(248,248,255,.4)]">
                    <span>Call/WhatsApp: <strong className="text-[#a3e635]">+234-814-299-5114</strong></span>
                    <span>Email: <strong className="text-[#a855f7]">browncemmanuel@gmail.com</strong></span>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link
                        href={`${WA_BASE}?text=Hi%2C%20I%20was%20sent%20this%20page%20and%20I%27d%20like%20to%20talk%20about%20a%20website`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#65a30d] hover:bg-[#a3e635] text-[#0b0b0f] px-10 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-md shadow-[#65a30d]/10"
                    >
                        Start the conversation
                    </Link>
                    <Link
                        href="/terms"
                        className="inline-flex items-center gap-2 border border-[rgba(248,248,255,.15)] hover:border-[rgba(248,248,255,.35)] text-[#f8f8ff] px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                        Read terms
                    </Link>
                </div>
            </section>

        </main>
            <Footer />
        </div >
    );
}