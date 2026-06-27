import SitemapClient from "./sitemap-html/SitemapClient";

export const metadata = {
  alternates: {
    canonical: "https://browncode.name.ng",
  },
  title: "Brown Code — Full-Stack Software Developer | Portfolio",
  description:
    "Sir Brown AD (Brown Oziomachi) — Full-Stack Software Developer based in Abuja, Nigeria. Specializing in Next.js, Firebase, scalable web systems, and African market payment infrastructure.",
  openGraph: {
    title: "Sir Brown AD — Full-Stack Software Developer | brown.dev",
    description:
      "Portfolio of Brown Oziomachi (Sir Brown AD / Brown ad). Professional web applications, distributed platforms, and full-stack architecture.",
    url: "https://browncode.name.ng",
    siteName: "Sir Brown AD",
    images: [
      {
        url: "https://browncode.name.ng/logo.png",
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
    images: ["https://browncode.name.ng/logo.png"],
  },
};


export default function Home() {
  return <SitemapClient />;
}