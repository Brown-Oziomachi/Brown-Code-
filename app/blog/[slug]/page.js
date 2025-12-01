"use client";

import Head from "next/head";
import { articles } from "@/app/data/article";
import { ArrowLeft, Calendar, Clock, User, Share2, Bookmark, Twitter, Linkedin, Facebook } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, use } from "react";

export default function ArticlePage({ params }) {
  const router = useRouter();

  // Unwrap the params Promise using React.use()
  const { slug } = use(params);

  const article = articles.find((a) => a.slug === slug);
  const [showShare, setShowShare] = useState(false);

  if (!article) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl">📄</div>
          <h2 className="text-3xl font-bold text-white">Article Not Found</h2>
          <p className="text-gray-400">The article you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push("/blog")}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getReadingTime = (content) => {
    const words = content.split(" ").length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const shareUrl = `https://browncode.name.ng/blog/${article.slug}`;

  const handleShare = (platform) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    };
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

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
            datePublished: article.datePublished || "2025-10-04",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": shareUrl,
            },
          }),
        }}
      />

      <article className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <div className="relative">
          {/* Background Image with Overlay */}
          <div className="relative h-[60vh] md:h-[50vh] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/80 to-slate-950 z-10" />
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Back Button */}
          <button
            onClick={() => router.push("/blog")}
            className="absolute top-8 left-8 z-20 flex items-center gap-2 px-5 py-3 bg-cyan-900/80 backdrop-blur-md border border-purple-500/30 rounded-xl text-white font-semibold hover:bg-slate-800/80 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 shadow-xl"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Article Header - Overlapping the image */}
          <div className="relative z-20 -mt-32 md:-mt-40">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
              <div className="bg-gradient-to-r from-cyan-500/20 to-cyan-500/20 backdrop-blur-xl p-8 md:p-12 shadow-2xl">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-cyan-500/20 border border-cyan-500/40 px-4 py-2 rounded-full text-sm font-semibold text-purple-300 mb-6">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  Featured Article
                </div>

                {/* Title */}
                <h1 className="text-xl md:text-xl lg:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  {article.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
                  <div className="flex items-center gap-2">
                   
                    <div>
                      <div className="flex items-center gap-1.5 text-white font-semibold">
                        <img src="/cod2.png" alt="Author" className="w-30 h-20 rounded-full mr-1" />
                      </div>
                      <span className="ml-5">
                        {article.postedBy}
                      </span>
                    </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-cyan-400" />
                    <span>{getReadingTime(article.content)} min read</span>
                  </div>
                    
                  </div>

                  <div className="hidden sm:block w-px h-10 bg-purple-500/20" />

                </div>

                {/* Preview Text */}
                <p className="text-sm text-gray-300 leading-relaxed border-l-4 border-cyan-500 pl-6 mb-8">
                  {article.preview}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <button
                        onClick={() => setShowShare(!showShare)}
                        className="flex items-center gap-2 px-4 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 border border-purple-500/30 rounded-xl transition-all duration-300 hover:scale-105"
                      >
                        <Share2 size={16} />
                        <span className="text-sm font-semibold">Share</span>
                      </button>

                      {showShare && (
                        <div className="absolute top-full mt-2 left-0 bg-slate-900 border border-cyan-500/30 rounded-xl p-2 shadow-xl backdrop-blur-xl min-w-[160px] z-30">
                          <button
                            onClick={() => handleShare("twitter")}
                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-purple-600/20 rounded-lg transition-colors text-left"
                          >
                            <Twitter size={16} className="text-blue-400" />
                            <span className="text-sm">Twitter</span>
                          </button>

                          <button
                            onClick={() => handleShare("linkedin")}
                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-purple-600/20 rounded-lg transition-colors text-left"
                          >
                            <Linkedin size={16} className="text-blue-500" />
                            <span className="text-sm">LinkedIn</span>
                          </button>

                          <button
                            onClick={() => handleShare("facebook")}
                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-purple-600/20 rounded-lg transition-colors text-left"
                          >
                            <Facebook size={16} className="text-blue-600" />
                            <span className="text-sm">Facebook</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
          <div className="prose prose-lg prose-invert max-w-none">
            <div className="text-gray-300 text-sm leading-relaxed space-y-6 whitespace-pre-line">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 font-medium">
                  {paragraph}
                </p>
              ))}
            </div>
            <button
              onClick={() => router.push("/contact")}
              className="px-8 py-4  bg-gradient-to-r from-cyan-600 to-cyan-800-600 hover:bg-slate-800 border border-purple-500/30 hover:border-purple-500/50 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
            >
              Let's roll
            </button>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
          <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border border-cyan-500/30 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Enjoyed this article?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Explore more insights and strategies to build your digital presence
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => router.push("/blog")}
                className="group flex items-center gap-3 px-8 py-4  bg-gradient-to-r from-cyan-600 to-cyan-800-600 hover:from-cyan-600 hover:to-can-900 rounded-xl font-bold text-white shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                More Articles
              </button>
              <button
                onClick={() => router.push("/")}
                className="px-8 py-4 bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 hover:border-purple-500/50 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}