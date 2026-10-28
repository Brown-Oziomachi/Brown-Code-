import PortfolioClients from "./portfolio/page";

export const metadata = {
  alternates: {
    canonical: "https://browncode.name.ng",
  },
  title: "Sir-AD Blog — Brown Code | Full-Stack Developer in Abuja",
  description:
    "Sir Brown AD (Brown Oziomachi) — Full-Stack Software Developer based in Abuja, Nigeria. Specializing in Next.js, Firebase, scalable web systems, and African market payment infrastructure.",
 
  keywords: ["Sir-AD Blog", "Sir AD Blog", "Sir Brown AD", "Brown Code", "Brown Oziomachi"],
  icons: {
    icon: "/icons/icon-192.png?v=2",
    shortcut: "/icons/icon-192.png?v=2",
    apple: "/icons/apple-touch-icon.png?v=2",
  },
  openGraph: {
    title: "Sir Brown AD — Full-Stack Software Developer | brown.dev",
    description:
      "Portfolio of Brown Oziomachi (Sir Brown AD / Brown ad). Professional web applications, distributed platforms, and full-stack architecture.",
    url: "https://browncode.name.ng",
    siteName: "Sir Brown AD",
    images: [
      {
        url: "https://sirbrownad.name.ng/og-image.jpg?v=3",
        width: 1200,
        height: 630,
        alt: "Sir Brown AD Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brown Code — Full-Stack Software Developer | brown.dev",
    description:
      "Get a professional website built by Sir Brown AD / Brown ad and grow your business or platform online.",
    images: ["https://sirbrownad.name.ng/og-image.jpg?v=3"],
  },
};


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sir-AD Blog",
  alternateName: ["Sir AD Blog", "Sir-AD", "Sir Brown AD", "Brown Code"],
  url: "https://browncode.name.ng",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioClients />
    </>
  );
}