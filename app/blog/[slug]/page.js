import { Suspense } from "react";
import { articles } from "@/app/data/article";
import ArticleClient from "./slug";
import { articlesMeta } from "@/app/data/articlesMeta";

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) {
    return {
      title: "Article Not Found | Sir Brown AD",
      description: "This article could not be found on Brown Code.",
      alternates: { canonical: "https://browncode.name.ng/blog" },
    };
  }

  const meta = articlesMeta[slug] || {};

  const safeTitle =
    meta.metaTitle ||
    (article.title.length > 57
      ? article.title.slice(0, 57) + "..."
      : `${article.title} | Brown Code`);

  const safeDescription = meta.metaDescription || article.preview.slice(0, 155);

  const imageUrl = article.image?.startsWith("http")
    ? article.image
    : `https://browncode.name.ng${article.image}`;

  // Use curated keywords from articlesMeta; fall back to derived keywords only if absent
  const articleKeywords = meta.keywords?.length
    ? meta.keywords
    : [
      article.title,
      ...slug.replace(/-/g, " ").split(" ").filter((w) => w.length > 3).slice(0, 5),
      "Sir Brown AD",
      "browncode.name.ng",
      "Nigeria",
    ];

  return {
    title: safeTitle,
    description: safeDescription,
    keywords: articleKeywords,
    alternates: {
      canonical: `https://browncode.name.ng/blog/${slug}`,
    },
    openGraph: {
      title: safeTitle,
      description: safeDescription,
      url: `https://browncode.name.ng/blog/${slug}`,
      siteName: "Sir Brown AD",
      type: "article",
      authors: [article.postedBy || "Sir Brown AD"],
      images: [{ url: imageUrl, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: safeTitle,
      description: safeDescription,
      images: [imageUrl],
    },
  };
}

export default function ArticlePage({ params }) {
  return (
    <Suspense
      fallback={
        <div style={{ background: "#0a0a0b", minHeight: "100vh" }} />
      }
    >
      <ArticleClient params={params} />
    </Suspense>
  );
}