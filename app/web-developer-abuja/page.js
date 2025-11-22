export const metadata = {
  title: "Web Developer in Abuja | Professional Website Developer – Browncode",
  description:
    "Looking for a web developer in Abuja? Browncode builds modern, responsive, SEO-optimized websites, e-commerce stores, portfolios, and web apps for local businesses.",
  keywords: [
    "web developer in Abuja",
    "website developer Abuja",
    "professional web developer Abuja",
    "affordable web developer Abuja",
    "software developer Abuja"
  ],
};

const StructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Brown Oziomachi",
  "url": "https://browncode.name.ng",
  "logo": "https://browncode.name.ng/logo.png",
  "description": "Professional web development services in Abuja, Nigeria — websites, e-commerce, portfolios, web apps, SEO.",
  "telephone": "+234-071-372-5529",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kubwa, Abuja",
    "addressLocality": "Abuja",
    "addressRegion": "FCT",
    "addressCountry": "NG"
  },
  "areaServed": ["Abuja", "Nigeria"],
  "sameAs": [
    "https://x.com/BrownC15427449?t=gWnSN1ElhDlQKD6h1Z_Q4w&s=09",
    "https://www.linkedin.com/in/brownoziomachi72a5a3229?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
  ]
};

export default function WebDeveloperAbuja() {
  return (
    <main className="min-h-screen px-6 py-12 max-w-4xl mx-auto prose lg:prose-xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(StructuredData) }}
      />
      <h1 className="text-4xl font-bold mb-6">
        Web Developer in Abuja – Browncode
      </h1>

      <p className="mb-6">
        Searching for a <strong>professional web developer in Abuja</strong>? Browncode
        provides modern, responsive, and SEO-friendly websites for businesses, startups, shops,
        and individuals in Abuja and surrounding areas. From landing pages to full e-commerce stores,
        we deliver fast, secure, and visually stunning websites.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Services Offered in Abuja</h2>
      <ul className="list-disc pl-5 space-y-3 mb-6">
        <li>Custom business websites & landing pages</li>
        <li>Portfolio & personal websites</li>
        <li>E-commerce stores with payment integration</li>
        <li>Blogs, news portals, and media websites</li>
        <li>Web applications & dashboards</li>
        <li>SEO optimization & speed improvements</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Why Hire Browncode in Abuja?</h2>
      <p className="mb-4">
        Choosing the right web developer can make or break your online presence. With Browncode, you get:
      </p>
      <ol className="list-decimal pl-5 space-y-3 mb-6">
        <li><strong>Local Expertise:</strong> We understand Abuja businesses and customers.</li>
        <li><strong>Modern Technologies:</strong> Next.js, React, Tailwind, Firebase.</li>
        <li><strong>Responsive Design:</strong> Works perfectly on mobile, tablet, and desktop.</li>
        <li><strong>Fast & SEO-Friendly:</strong> Optimized for Google search and page speed.</li>
        <li><strong>Affordable Packages:</strong> High-quality work without breaking your budget.</li>
      </ol>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Portfolio – Projects in Abuja</h2>
      <ul className="list-disc pl-5 space-y-3 mb-6">
        <li>🧵 <strong>IJ Stitches</strong> – Fashion website for Abuja-based business</li>
        <li>📰 <strong>The Cyclopedia</strong> – News & media website</li>
        <li>👤 <strong className="text-blue-600 underline"><a href="https://browncode.name.ng">Browncode Portfolio</a></strong> – Professional web developer showcase</li>
        <li>🛍 <strong>E-commerce Store/Yotapoint</strong> – Online shop & Buying and selling</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">FAQ – Web Developer in Abuja</h2>

      <h3 className="text-xl font-semibold mt-6 mb-2">1. How much does a website cost in Abuja?</h3>
      <p className="mb-4">Prices depend on features. Portfolio websites start from ₦100,000, business sites ₦300,000, e-commerce ₦500,000+.</p>

      <h3 className="text-xl font-semibold mt-6 mb-2">2. How long will it take?</h3>
      <p className="mb-4">Most websites are delivered within 5–10 days depending on complexity.</p>

      <h3 className="text-xl font-semibold mt-6 mb-2">3. Do you meet clients locally?</h3>
      <p className="mb-4">Yes, we can meet in Abuja for briefings, handovers, or training sessions. Virtual meetings are also available.</p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Contact Browncode in Abuja</h2>
      <p className="mb-4">
        Ready to build your website? Chat now via WhatsApp: <strong>+234-701-372-5529</strong> or
        email: <strong>browncemmanuel@gmail.com</strong>.
      </p>

      <a
        href="https://wa.me/qr/RX4M5D4PGB7CO1"
        className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold"
      >
        Chat on WhatsApp
      </a>

      <p className="mt-6 text-sm text-gray-600">
        © {new Date().getFullYear()} browncode.name.ng — Web Developer in Abuja
      </p>
    </main>
  );
}