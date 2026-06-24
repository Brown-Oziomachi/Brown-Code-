import { Suspense } from "react";
import { articles } from "@/app/data/article";
import ArticleClient from "./slug";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) return {};

  return {
    title: `${article.title} | Brown Code`,
    description: article.preview,
    alternates: {
      canonical: `https://browncode.name.ng/blog/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.preview,
      url: `https://browncode.name.ng/blog/${slug}`,
      siteName: "Brown Code",
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