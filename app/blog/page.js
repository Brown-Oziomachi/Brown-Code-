import { Suspense } from "react";
import BlogListClient from "./blog";
import { articles as allArticles } from "@/app/data/article";
import { CATEGORY_LABELS, getCategoryKey } from "@/lib/blogCategories";

const SITE_URL = "https://browncode.name.ng";

export const metadata = {
  title: "Blog — Business, Fraud Awareness, Tech & Faith | Sir Brown AD",
  description:
    "Articles on Nigerian business scams, fake transfer alerts, cybersecurity, web development, digital growth, and faith and religion by Sir Brown AD.",
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
    "faith and religion articles",
  ],
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "Blog — Business, Fraud Awareness, Tech & Faith | Brown Code",
    description:
      "Articles on Nigerian business scams, fake transfer alerts, cybersecurity, web development, digital growth, and faith by Sir Brown AD.",
    url: `${SITE_URL}/blog`,
    siteName: "Sir Brown AD",
    images: [{ url: `${SITE_URL}/logo.png`, width: 1200, height: 630, alt: "Sir Brown AD Blog" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Business, Fraud Awareness, Tech & Faith | Sir Brown AD",
    description: "Articles on Nigerian business scams, fake transfer alerts, cybersecurity, web development, and faith.",
    images: [`${SITE_URL}/logo.png`],
  },
};

const getReadingTime = (content) =>
  Math.max(1, Math.ceil((content || "").split(" ").length / 200));

// Article images may be "/cover.jpg" or a full URL; schema.org wants a full URL.
const absoluteUrl = (src) => {
  if (!src) return undefined;
  return /^https?:\/\//i.test(src) ? src : `${SITE_URL}${src.startsWith("/") ? "" : "/"}${src}`;
};

export default function BlogListPage() {
  const sortedArticles = [...allArticles].sort(
    (a, b) => (b.datePublished || "").localeCompare(a.datePublished || "")
  );

  const articlesForClient = sortedArticles.map(({ content, ...rest }) => ({
    ...rest,
    readingTime: getReadingTime(content),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Sir Brown AD Blog",
    url: `${SITE_URL}/blog`,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: "Sir Brown AD",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    blogPost: sortedArticles.slice(0, 20).map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      url: `${SITE_URL}/blog/${article.slug}`,
      mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
      datePublished: article.datePublished,
      dateModified: article.datePublished,
      // Topic, so search engines can group posts such as Religion or Security & Fraud
      articleSection: CATEGORY_LABELS[getCategoryKey(article)],
      ...(article.image && { image: absoluteUrl(article.image) }),
      author: {
        "@type": "Person",
        name: article.postedBy || "Sir Brown AD",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // "<" is escaped so an article title can never close the script tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Suspense fallback={<div style={{ background: "#0a0a0b", minHeight: "100vh" }} />}>
        <BlogListClient articles={articlesForClient} />
      </Suspense>
    </>
  );
}