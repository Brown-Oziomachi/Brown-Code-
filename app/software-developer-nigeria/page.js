export const metadata = {
    title: "Best Web Developer in Nigeria – Brown Code | Professional Website Developer",
    description:
        "Brown Code builds fast, modern, and SEO-optimized websites across Nigeria. Hire a trusted web developer in Nigeria for business websites, e-commerce, portfolios and web apps.",
};

const StructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Brown Oziomachi A",
    "url": "https://browncode.name.ng",
    "logo": "https://browncode.name.ng/logo.png",
    "description": "Professional web development services (Next.js, React, Tailwind) — websites, e-commerce, web apps.",
    "telephone": "+234-701-372-5529",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Abuja",
        "addressCountry": "NG",
        "addressRegion": "FCT"
    },
    "areaServed": ["Nigeria"],
    "sameAs": ["https://x.com/BrownC15427449?t=gWnSN1ElhDlQKD6h1Z_Q4w&s=09", "https://www.linkedin.com/in/brownoziomachi72a5a3229?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"]
};

export default function WebDeveloperNigeria() {
    return (
        <main className="px-6 py-12 max-w-4xl mx-auto prose lg:prose-xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(StructuredData) }}
            />
            <h1>Web Developer in Nigeria — Brown Code</h1>

            <p>
                Looking for a reliable <strong>web developer in Nigeria</strong>? Brown Code delivers modern,
                fast, and SEO-friendly websites that help businesses attract customers, capture leads, and
                sell online. I specialize in Next.js, React, Tailwind CSS, and practical SEO — building
                sites that perform for humans and search engines.
            </p>

            <h2>Services I offer across Nigeria</h2>
            <ul>
                <li>Custom business websites & landing pages</li>
                <li>E-commerce stores with payments & order management</li>
                <li>Portfolio sites for creatives and professionals</li>
                <li>Progressive Web Apps and admin dashboards</li>
                <li>SEO, speed optimization & analytics setup</li>
            </ul>

            <h2>Why Nigerian businesses hire Brown Code</h2>
            <p>
                You want a website that looks great and converts visitors. I focus on three things:
            </p>
            <ol>
                <li><strong>Performance:</strong> Fast loading with Core Web Vitals optimizations.</li>
                <li><strong>Design & UX:</strong> Clean, mobile-first designs that match your brand.</li>
                <li><strong>SEO & Growth:</strong> Structured content, schema, and content strategy that help you rank.</li>
            </ol>

            <h2>Featured portfolio</h2>
            <p>
                A few recent projects: <strong>The Cyclopedia</strong> (news & blog), <strong>IJ Stitches</strong> (fashion/Tailor portfolio),
                and several e-commerce stores. Links and screenshots are on my portfolio at <a href="https://browncode.name.ng">browncode.name.ng</a>.
            </p>

            <h2>How I work</h2>
            <p>
                My process is simple: discovery → design → build → test → launch. You get regular updates,
                staging previews, and training so you can update content yourself.
            </p>

            <h2>SEO-focused page content (what I’ll implement)</h2>
            <p>
                For pages targeting “Web Developer in Nigeria” I implement:
            </p>
            <ul>
                <li>SEO title and description tailored to the keyword</li>
                <li>Localized content and service lists</li>
                <li>FAQ markup for rich snippets</li>
                <li>Internal linking from blog posts and service pages</li>
                <li>Local citations and Google Business Profile integration</li>
            </ul>

            <h2>Frequently Asked Questions</h2>
            <h3>How much does a website cost in Nigeria?</h3>
            <p>Prices vary. Small portfolio sites typically start from ₦300,000. E-commerce and custom apps cost more depending on features.</p>

            <h3>How long will it take?</h3>
            <p>Most sites complete within 1–3 weeks depending on complexity and assets provided.</p>

            <h2>Ready to get started?</h2>
            <p>
                Book a free consultation or send your project brief via WhatsApp: <strong>+234-701-372-5529</strong> or
                email <strong>browncemmanuel@gmail.com</strong>. Visit <a href="https://browncode.name.ng">browncode.name.ng</a> to view full portfolio.
            </p>
        </main>
    );
}
