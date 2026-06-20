"use client";

import Head from "next/head";
import { articles } from "@/app/data/article";
import { ArrowLeft, Clock, User, Share2, Terminal, Code2, Cpu, GitCommit } from "lucide-react";
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
      <div className="min-h-screen bg-[#030712] flex items-center justify-center font-mono">
        <div className="text-center space-y-4 border border-slate-900 bg-slate-950/50 p-12 rounded-xl max-w-md">
          <Terminal size={40} className="text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold text-white">ERR_DOCUMENT_NOT_FOUND</h2>
          <p className="text-xs text-slate-500 font-sans">The requested resource mapping block could not be located in database memory.</p>
          <button
            onClick={() => router.push("/blog")}
            className="mt-6 px-6 py-2.5 border border-cyan-500 text-cyan-400 bg-cyan-950/10 hover:bg-cyan-500 hover:text-black transition-all text-xs font-bold uppercase rounded-md"
          >
            RETURN_TO_INDEX
          </button>
        </div>
      </div>
    );
  }

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
        <title>{article.title} | Technical Documentation | Systems Engineer</title>
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

      <article className="min-h-screen bg-[#030712] text-slate-100 font-mono selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Engineering System Banner */}
        <div className="relative">
          <div className="relative h-[40vh] md:h-[35vh] overflow-hidden border-b border-slate-900">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/80 to-[#9196a3] z-10 " />
           
          </div>

          {/* Interactive Shell Back Action */}
          <button
            onClick={() => router.push("/blog")}
            className="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-slate-400 hover:text-white hover:border-slate-700 transition-all shadow-xl"
          >
            <ArrowLeft size={14} />
            <span>cd ..</span>
          </button>

          {/* Article Node Title Segment */}
          <div className="relative z-20 -mt-24 lg:-mt-38">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
              <div className="bg-slate-950/80 border border-slate-900 backdrop-blur-md p-6 md:p-10 rounded-xl shadow-2xl">

                {/* Module Flag */}
                <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-md text-[11px] text-cyan-400 mb-6 uppercase tracking-wider">
                  <Cpu size={12} className="animate-pulse" />
                  core_node // verified_publication
                </div>

                {/* Technical Title */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-6 leading-snug">
                  {article.title}
                </h1>

                {/* Manifest Metadata */}
                <div className="flex flex-wrap items-center gap-6 text-[11px] text-slate-500 mb-6 border-b border-slate-900 pb-6">
                  <div className="flex items-center gap-2">
                    <User size={13} className="text-slate-600" />
                    <span className="text-slate-300 font-sans">{article.postedBy}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={13} className="text-slate-600" />
                    <span>EST_READ: {getReadingTime(article.content)}m</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GitCommit size={13} className="text-slate-600" />
                    <span>HEX_ID: {article.slug.slice(0, 7).toUpperCase()}</span>
                  </div>
                </div>

                {/* Abstract Text */}
                <p className="text-xs text-slate-400 font-sans leading-relaxed border-l-2 border-cyan-500/50 pl-4 mb-6">
                  <span className="font-mono text-[11px] text-cyan-500 block mb-1">ABSTRACT:</span>
                  {article.preview}
                </p>

                {/* Network Distribution Protocols */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <button
                      onClick={() => setShowShare(!showShare)}
                      className="flex items-center gap-2 px-3 py-1.5 border border-slate-800 bg-slate-900/50 hover:border-slate-700 text-xs text-slate-300 rounded transition-all"
                    >
                      <Share2 size={12} />
                      <span>PIPE_SHARE</span>
                    </button>
                   
                    {showShare && (
                      <div className="absolute top-full mt-2 left-0 bg-slate-950 border border-slate-800 rounded-md p-1 shadow-2xl backdrop-blur-xl min-w-[140px] z-30 text-[11px]">
                        <button
                          onClick={() => handleShare("twitter")}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-900 rounded text-slate-400 hover:text-cyan-400 transition-colors text-left"
                        >
                          <span>X_TWITTER</span>
                        </button>
                        <button
                          onClick={() => handleShare("linkedin")}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-900 rounded text-slate-400 hover:text-cyan-400 transition-colors text-left"
                        >
                          <span>LINKEDIN</span>
                        </button>
                        <button
                          onClick={() => handleShare("facebook")}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-900 rounded text-slate-400 hover:text-cyan-400 transition-colors text-left"
                        >
                          <span>FACEBOOK</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="">
          <img
            src={article.image}
            alt={article.title}
            className="  lg:w-full object-cover opacity-40 mix-blend-luminosity mx-auto max-md:p-5 lg:p-50 mt-5 lg:-mt-20 rounded-lg border border-slate-900 "
          />
        </div>

        {/* Technical Logs / Content Compilation */}
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
          <div className="prose prose-invert max-w-none font-sans">
            <div className="text-slate-300 text-sm md:text-base leading-relaxed space-y-6 whitespace-pre-line">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 pt-6 border-t border-slate-900 font-mono">
              <button
                onClick={() => router.push("/bc/contact")}
                className="px-6 py-3 border border-cyan-500 text-cyan-400 bg-cyan-950/10 hover:bg-cyan-500 hover:text-black transition-all rounded-md text-xs font-bold uppercase tracking-wider"
              >
                INITIALIZE_CONTACT
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Endpoints */}
        <div className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
          <div className="border border-slate-900 bg-slate-950/20 rounded-xl p-8 text-center backdrop-blur-sm">
            <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">
              // review completeness check
            </h3>
            <p className="text-xs text-slate-500 font-sans mb-6 mx-auto">
              Execution loop finished. Select downstream navigation pipeline to parse alternative logs.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-bold">
              <button
                onClick={() => router.push("/blog")}
                className="group flex items-center gap-2 px-5 py-2.5 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all rounded-md uppercase"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                INDEX_LOGS
              </button>
              <button
                onClick={() => router.push("/portfolio")}
                className="px-5 py-2.5 bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all rounded-md uppercase"
              >
                RETURN_TO_BASE
              </button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}