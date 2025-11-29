import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Brown code | Software Developer",
  icons: { icon: "/logo.png", shortcut: "/logo.png", apple: "/logo.png" },

  // ✅ Open Graph added here
  openGraph: {
    title: "Brown Code | Software Developer",
    description:
      "I build modern websites, blogs, e-commerce stores, and business platforms for brands and companies in Nigeria and worldwide.",
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

  // Twitter card added here
  twitter: {
    card: "summary_large_image",
    title: "Brown Code — Software Developer",
    description:
      "Get a professional website for your business and grow your brand online.",
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
        {children}
        <Script
          src="https://www.careerjet.com.ng/partners/js_banner.html?format=banner_02_468x60&affid=395e979b37f19b4b31613006e51978ee"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
