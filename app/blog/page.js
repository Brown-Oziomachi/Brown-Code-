import { Suspense } from "react";
import BlogListClient from "./blog";

export const metadata = {
  title: "Engineering Insights & Web Development Blog | Sir Brown AD",
  description:
    "Deep dives into digital infrastructure, SEO, cybersecurity, and business growth strategies. Written by Sir Brown AD.",
  keywords: [
    "web development blog Nigeria",
    "engineering insights",
    "SEO tips for businesses",
    "website development Abuja",
    "cybersecurity blog",
    "digital infrastructure",
    "Sir Brown AD blog",
  ],
  alternates: {
    canonical: "https://browncode.name.ng/blog",
  },
  openGraph: {
    title: "Engineering Insights & Web Development Blog | Sir Brown AD",
    description:
      "Deep dives into web architecture, digital infrastructure, SEO, cybersecurity, and business growth strategies.",
    url: "https://browncode.name.ng/blog",
    siteName: "Sir Brown AD",
    images: [
      {
        url: "https://browncode.name.ng/logo.png",
        width: 1200,
        height: 630,
        alt: "Sir Brown AD Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Insights & Web Development Blog | Sir Brown AD",
    description:
      "Deep dives into web architecture, digital infrastructure, SEO, cybersecurity, and business growth strategies.",
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