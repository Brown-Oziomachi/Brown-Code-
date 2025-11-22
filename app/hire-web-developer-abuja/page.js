export const metadata = {
    title: "Hire Web Developer in Abuja – Brown Code | Fast, Local, Reliable",
    description:
        "Hire a web developer in Abuja. Brown Code builds websites, online stores and web apps with fast delivery and local support.",
};

const StructuredData = {
    "@context": "https://schema.org",
    "@type": "HireAction",
    "agent": {
        "@type": "Person",
        "name": "Brown Code",
        "url": "https://browncode.name.ng"
    },
    "recipient": {
        "@type": "Organization",
        "name": "Client"
    },
    "actionStatus": "PotentialAction"
};

export default function HireWebDeveloperAbuja() {
    return (
        <main className="px-6 py-12 max-w-4xl mx-auto prose lg:prose-xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(StructuredData) }}
            />
            <h1>Hire a Web Developer in Abuja — Brown Code</h1>

            <p>
                Want to hire a local web developer in Abuja? I offer fixed-price packages, hourly work,
                and full project delivery with local support. Get a quote, review a timeline, and view a
                staging site before launch.
            </p>

            <h2>Packages</h2>
            <h3>Starter Website</h3>
            <p>Portfolio or landing page — fast delivery, SEO basics, deployment included.</p>

            <h3>Business Website</h3>
            <p>5–10 pages, contact forms, basic SEO, hosting setup, and training.</p>

            <h3>E-commerce</h3>
            <p>Product management, checkout flow, payment integration, order management.</p>

            <h2>How to hire me</h2>
            <ol>
                <li>Send a short brief to <strong>browncemmanuel@gmail.com</strong>.</li>
                <li>I reply with scope, estimate, and timeline.</li>
                <li>Approve the proposal and I start building on a staging site.</li>
            </ol>

            <h2>Contact</h2>
            <p>
                Ready to hire? WhatsApp: <strong>+234-701-372-5529</strong> or contact me via
                <a href="https://browncode.name.ng"> browncode.name.ng</a>.
            </p>
        </main>
    );
}
