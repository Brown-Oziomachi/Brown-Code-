import InteractionTracker from "@/components/InteractionTracker";
import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Brown code | Software Developer",
  // 🚀 Added standard description and keywords array directly to the metadata root
  description:
    "Portfolio of Brown Oziomachi (Brown code / Brown ad / Bown). I build modern websites, blogs, e-commerce stores, and business platforms for brands in Nigeria and worldwide.",
  keywords: [
    "Brown code",
    "Brown ad",
    "Bown",
    "Brown Oziomachi",
    "Software Developer Nigeria",
    "Web Developer",
    "Next.js Developer"
  ],
  icons: { icon: "/logo.png", shortcut: "/logo.png", apple: "/logo.png" },

  // ✅ Open Graph optimized with your search phrases
  openGraph: {
    title: "Brown Code | Software Developer",
    description:
      "Portfolio of Brown Oziomachi (Brown code / Brown ad). Professional web applications, distributed platforms, and full-stack architecture.",
    url: "https://browncode.name.ng",
    siteName: "Brown Code",
    images: [
      {
        url: "https://browncode.name.ng/logoo.png", // <-- upload this image in /public
        width: 1200,
        height: 630,
        alt: "Brown Code Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // ✅ Twitter Cards optimized with your terms
  twitter: {
    card: "summary_large_image",
    title: "Brown Code (Brown Oziomachi) — Software Developer",
    description:
      "Get a professional website built by Brown code / Brown ad and grow your business or platform online.",
    images: ["https://browncode.name.ng/logoo.png"],
  },

  verification: {
    other: {
      "impact-site-verification": "e9768684-9c09-4886-b2db-ec34003c5283",
      monetag: "f078e1ec3e8e3ad7a3b1fde84ea75d8e",
      "google-adsense-account": "ca-pub-8408243121163767",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        {/* 🕵️‍♂️ THE LIVE INTERACTION TRACKER (Runs client-side tracking across all nodes) */}
        <InteractionTracker />

        <div className="gradient" />
        {children}
        <Script
          src="https://www.careerjet.com.ng/partners/js_banner.html?format=banner_02_468x60&affid=395e979b37f19b4b31613006e51978ee"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}