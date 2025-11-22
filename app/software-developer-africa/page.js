export const metadata = {
    title: "Web Developer in Abuja – Brown Code | Local Web Development",
    description:
        "Brown Code is a web developer in Abuja building modern responsive websites for businesses. Next.js, React, Tailwind — local expertise you can trust.",
};

const StructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Brown Oziomachi A",
    "url": "https://browncode.name.ng",
    "telephone": "+234-701-372-5529",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kubwa,",
        "addressLocality": "Abuja",
        "addressRegion": "FCT",
        "postalCode": "900001",
        "addressCountry": "Nigeria"
    },
    "areaServed": ["Abuja", "Nigeria"]
};

export default function WebDeveloperAbuja() {
    return (
        <main className="px-6 py-12 max-w-4xl mx-auto prose lg:prose-xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(StructuredData) }}
            />
            <h1>Web Developer in Abuja — Brown Code</h1>

            <p>
                Need a local web developer in Abuja? I design and build websites for Abuja businesses:
                shops, restaurants, consultancies, and professional services. A strong online presence
                helps local customers find and trust you.
            </p>

            <h2>Local SEO & Google Business Profile</h2>
            <p>
                As an Abuja-focused developer I set up and optimize your Google Business Profile, local
                schema, and service pages so customers searching for “web developer in Abuja” see you first.
            </p>

            <h2>Services for Abuja businesses</h2>
            <ul>
                <li>Local business websites with contact & maps</li>
                <li>Online booking & appointment systems</li>
                <li>E-commerce for local delivery</li>
                <li>Speed & mobile optimizations</li>
                <li>Content writing & local keyword strategy</li>
            </ul>

            <h2>Success stories</h2>
            <p>
                I’ve helped businesses in Abuja increase enquiries by improving site speed, adding CTAs,
                and optimizing local landing pages — measurable results that turn traffic into customers.
            </p>

            <h2>FAQ — Web developer in Abuja</h2>
            <h3>Do you meet clients in Abuja?</h3>
            <p>Yes. I can meet for briefings or deliver project handovers in Abuja or use virtual meetings if preferred.</p>

            <h2>Contact</h2>
            <p>
                Get a free quote: WhatsApp <strong>+234-701-372-5529</strong> or visit <a href="https://browncode.name.ng">browncode.name.ng</a>.
            </p>
        </main>
    );
}
