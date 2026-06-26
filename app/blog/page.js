import { Suspense } from "react";
import BlogListClient from "./blog";

export const metadata = {
  title: "Engineering Insights & Web Development Blog | Sir Brown AD",
  description: "Deep dives into web architecture, digital infrastructure, SEO, cybersecurity, and business growth strategies. Written by Sir Brown AD — Nigeria's leading web development studio.",
  keywords: [
    "web development blog Nigeria",
    "engineering insights",
    "SEO tips for businesses",
    "website development Abuja",
    "cybersecurity blog",
    "digital infrastructure",
    "Sir Brown AD blog",
  ],
  openGraph: {
    title: "Engineering Insights & Web Development Blog | Sir Brown AD",
    description: "Deep dives into web architecture, digital infrastructure, SEO, cybersecurity, and business growth strategies.",
    url: "https://browncode.name.ng/blog",
    siteName: "Sir Brown AD",
    type: "website",
  },
};

export default function BlogListPage() {
  return (
    <Suspense fallback={<div style={{ background: "#0a0a0b", minHeight: "100vh" }} />}>
      <BlogListClient />
    </Suspense>
  );
}