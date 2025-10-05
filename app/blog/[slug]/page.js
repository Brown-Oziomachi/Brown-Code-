import Head from "next/head";
import { articles } from "@/app/data/article";

export default function ArticlePage({ params }) {
  const { slug } = params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return <div>No article found</div>;
  }

  return (
    <>
      <Head>
        <title>{article.title} | BrownCode Blog | Software Developer</title>
        <meta name="description" content={article.preview} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.preview} />
        <meta property="og:image" content={article.image} />
        <meta name="author" content={article.postedBy} />
      </Head>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: article.title,
            description: article.preview,
            image: article.image,
            author: {
              "@type": "Person",
              name: article.postedBy,
            },
            publisher: {
              "@type": "Organization",
              name: "BrownCode",
            },
            datePublished: "2025-10-04", // Optional: make dynamic later
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://browncode.name.ng/blog/${article.slug}`,
            },
          }),
        }}
      />

      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <h3 className="text-sm font-semibold mb-4 text-gray-500">
            Posted by: {article.postedBy}
          </h3>

          <img
            src={article.image}
            alt={article.title}
            className="w-full rounded-lg mb-6 shadow-lg"
          />

          <p className="text-gray-300 whitespace-pre-line mb-10">
            {article.content}
          </p>
        </div>
        <div>
          <a
            href="/blog"
            className="mt-20 px-10 py-3 cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg"
          >
            Back
          </a>
        </div>
      </section>
    </>
  );
}

// Static generation for each article
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}
