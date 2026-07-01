import InteractionTracker from "@/components/InteractionTracker";
import "./globals.css";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://browncode.name.ng"),
  title: "Brown Code — Full-Stack Software Developer | Portfolio",
  description:
    "Sir Brown AD (Brown Oziomachi) — Full-Stack Software Developer based in Abuja, Nigeria. Specializing in Next.js, Firebase, scalable web systems, and African market payment infrastructure. View projects, blog, and contact.",
  keywords: [
    "Sir Brown AD",
    "Brown Code",
    "Brown Oziomachi",
    "Brown ad",
    "Software Developer Nigeria",
    "Full-Stack Developer Abuja Nigeria",
    "Next.js Developer Nigeria",
    "Web Developer Nigeria",
    "Firebase Developer Nigeria",
    "Nigerian fintech developer",
    "digital fraud awareness Nigeria",
    "fake transfer alert Nigeria",
    "website development Abuja Nigeria",
    "browncode.name.ng",
  ],
  icons: { icon: "/logo.png", shortcut: "/logo.png", apple: "/logo.png" },

  alternates: {
    canonical: "https://browncode.name.ng",
    types: {
      "application/rss+xml": "https://browncode.name.ng/feed.xml",
    },
  },

  openGraph: {
    title: "Brown Code — Full-Stack Software Developer | browncode.name.ng",
    description:
      "Portfolio of Brown Oziomachi (Sir Brown AD). Professional web applications, distributed platforms, and full-stack architecture for Nigerian and African businesses.",
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
    title: "Brown Code — Full-Stack Software Developer | browncode.name.ng",
    description:
      "Get a professional website built by Sir Brown AD and grow your business or platform online. Based in Abuja, Nigeria.",
    images: ["https://browncode.name.ng/logo.png"],
  },

  verification: {
    google: "qq5tnpKsPjJBKYLtHTZt9V-NR6bgUyxzLUX4AOB8jIQ",
    yandex: "5edb60b150103ef4",
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
      <body className="" suppressHydrationWarning>
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