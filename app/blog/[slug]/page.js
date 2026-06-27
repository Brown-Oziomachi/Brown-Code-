import { Suspense } from "react";
import { articles } from "@/app/data/article";
import ArticleClient from "./slug";
import { articlesMeta } from "@/app/data/articlesMeta";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  const meta = articlesMeta[slug] || {};

  const safeTitle = meta.metaTitle ||
    (article.title.length > 57 ? article.title.slice(0, 57) + "..." : `${article.title} | Brown Code`);

  const safeDescription = meta.metaDescription || article.preview.slice(0, 155);

  return {
    title: safeTitle,
    description: safeDescription,
    alternates: {
      canonical: `https://browncode.name.ng/blog/${slug}`,
    },
    openGraph: {
      title: safeTitle,
      description: safeDescription,
      url: `https://browncode.name.ng/blog/${slug}`,
      siteName: "Sir Brown AD",
      type: "article",
    },
  };
}

export default function ArticlePage({ params }) {
  return (
    <Suspense fallback={<div style={{ background: "#0a0a0b", minHeight: "100vh" }} />}>
      <ArticleClient params={params} />
    </Suspense>
  );
}