import { Suspense } from "react";
import BlogListClient from "./blog";

export const metadata = {
  title: "Blog — Business, Fraud Awareness & Tech | Sir Brown AD",
  description:
    "Articles on Nigerian business scams, fake transfer alerts, cybersecurity, web development, and digital growth strategies by Sir Brown AD.",
  keywords: [
    "fake transfer alert Nigeria",
    "Nigerian business scam awareness",
    "Moniepoint OPay fake alert",
    "how to avoid fraud Nigeria",
    "web development blog Nigeria",
    "cybersecurity Nigeria",
    "Sir Brown AD blog",
    "small business protection Nigeria",
    "fake dispatch rider scam",
    "POS reversal fraud Nigeria",
    "WhatsApp business scam Nigeria",
    "digital fraud awareness Abuja",
    "SEO tips Nigeria",
    "website development Abuja",
  ],
  alternates: {
    canonical: "https://browncode.name.ng/blog",
  },
  openGraph: {
    title: "Blog — Business, Fraud Awareness & Tech | Sir Brown AD",
    description:
      "Articles on Nigerian business scams, fake transfer alerts, cybersecurity, web development, and digital growth by Sir Brown AD.",
    url: "https://browncode.name.ng/blog",
    siteName: "Sir Brown AD",
    images: [{ url: "https://browncode.name.ng/logo.png", width: 1200, height: 630, alt: "Sir Brown AD Blog" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Business, Fraud Awareness & Tech | Sir Brown AD",
    description: "Articles on Nigerian business scams, fake transfer alerts, cybersecurity, and web development.",
    images: ["https://browncode.name.ng/logo.png"],
  },
};

export default function BlogListPage() {
  return (
    <Suspense fallback={<div style={{ background: "#0a0a0b", minHeight: "100vh" }} />}>
      <BlogListClient />
    </Suspense>
  );
}