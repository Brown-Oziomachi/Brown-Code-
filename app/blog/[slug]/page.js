"use client";

import Head from "next/head";
import { articles } from "@/app/data/article";
import { ArrowLeft, Clock, User, Share2, CornerDownRight, Twitter, Linkedin, Facebook, Terminal, ArrowRight, Phone, Mail, Instagram, Github, MessageSquare, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, use, useEffect } from "react";
import Link from "next/link";
import RelatedArticles from "@/components/relatedarticle";
import Footer from "@/components/footer";

// --- Firestore Imports ---
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db1 } from "@/config/firebase.config1";
import CommentsSection from "@/components/CommentsSection";

export default function ArticlePage({ params }) {
  const router = useRouter();

  // Unwrap the params Promise using React.use()
  const { slug } = use(params);

  const article = articles.find((a) => a.slug === slug);
  const [showShare, setShowShare] = useState(false);

  // --- Comment System States ---
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Real-time Comments Sync Loop ---
  useEffect(() => {
    if (!article) return;

    // Queries comments matching current article slug, ordered by timestamp
    const commentsRef = collection(db1, "comments");
    const q = query(
      commentsRef,
      where("articleSlug", "==", article.slug),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(fetchedComments);
    }, (error) => {
      console.error("Firestore sync fallback/error: ", error);
    });

    return () => unsubscribe();
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center font-sans px-4">
        <div className="text-center space-y-5 max-w-sm">
          <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
            <span className="text-xl font-bold text-rose-500">404</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white tracking-tight">Article Missing</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              The article you are searching for might have been moved, renamed, or currently does not exist.
            </p>
          </div>
          <button
            onClick={() => router.push("/blog")}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-slate-200 text-xs font-semibold tracking-wide rounded-lg transition-all shadow-lg"
          >
            <ArrowLeft size={14} />
            Back to Blog Index
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
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${article.title} - ${shareUrl}`)}`,
      instagram: `https://www.instagram.com/`,
      tiktok: `https://www.tiktok.com/`
    };
    window.open(urls[platform], '_blank', 'width=full,height=full');
  };

  // --- Handle Comment Insertion ---
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db1, "comments"), {
        articleSlug: article.slug,
        authorName: name.trim(),
        text: commentText.trim(),
        createdAt: serverTimestamp()
      });
      setCommentText("");
      setName("");
    } catch (err) {
      console.error("Error committing message instance:", err);
    } finally {
      setIsSubmitting(false);
    }
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

      <div className="min-h-screen bg-[#0b0b0f] text-slate-200 font-sans antialiased selection:bg-cyan-500/20 selection:text-cyan-300">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none blur-3xl" />

        <nav className="relative z-10 border-b border-slate-800/80 bg-[#090d16]/80 backdrop-blur-md sticky top-0 z-[9999]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 group">
              <Terminal size={18} className="text-cyan-400 group-hover:rotate-6 transition-transform" />
              <a href="/">
                <span className="text-sm font-bold text-white tracking-wider uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  BROWN_CODE_DEV // Blog
                </span>
              </a>
            </div>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-950/80 transition-all duration-300 shadow-sm hover:shadow-cyan-500/5"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>SYS.RETURN()</span>
            </a>
          </div>
        </nav>

        <header className="max-w-3xl mx-auto px-6 pt-12 pb-8 relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.15] bg-gradient-to-b from-white via-slate-400 to-slate-600 bg-clip-text text-transparent">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-400 border-b border-slate-900 pb-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-500 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                  {article.postedBy.slice(0, 2).toUpperCase()}
                </div>
              </div>
              <span className="font-medium text-slate-200">By: {article.postedBy}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <Clock size={13} />
              <span>{getReadingTime(article.content)} min read</span>
            </div>
            <div className="text-slate-600 hidden sm:inline">•</div>
            <div className="text-slate-500 font-mono text-[11px] bg-slate-950 px-2 py-0.5 rounded border border-slate-900">
              ID: {article.slug.slice(0, 7)}
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 md:px-6 mb-10 relative z-10">
          <div className="aspect-[21/9] overflow-hidden border border-slate-900 bg-slate-950/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
        <div>
          <div className="p-5 bg-slate-950/30 -mt-16 text-center lg:hidden">
            <p className="text-xs text-slate-400 font-sans leading-relaxed font-light">
             //  {article.preview}
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            <div className="hidden lg:block lg:col-span-1 sticky top-28 h-fit space-y-6">
              <div className="flex flex-col items-center gap-4 bg-slate-950/40 p-3 rounded-xl border border-slate-900/60 backdrop-blur-md">
                <button onClick={() => handleShare("twitter")} className="p-2 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/5 rounded-lg transition-all" title="Share on X"><Twitter size={30} /></button>
                <button onClick={() => handleShare("linkedin")} className="p-2 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/5 rounded-lg transition-all" title="Share on LinkedIn"><Linkedin size={30} /></button>
                <button onClick={() => handleShare("facebook")} className="p-2 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/5 rounded-lg transition-all" title="Share on Facebook"><Facebook size={30} /></button>
                <button onClick={() => handleShare("whatsapp")} className="p-2 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/5 rounded-lg transition-all" title="Share on WhatsApp">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                </button>
                <button onClick={() => handleShare("instagram")} className="p-2 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/5 rounded-lg transition-all" title="Share on Instagram"><Instagram size={30} /></button>
                <div className="w-4 h-[1px] bg-slate-900" />
                <div className="text-[15px] font-mono text-slate-600 vertical-text select-none tracking-widest">SHARE</div>
              </div>
            </div>

            <div className="lg:col-span-8 lg:col-start-2">
              <article className="prose prose-invert max-w-none">
                <div className="text-slate-300 text-base md:text-lg leading-relaxed space-y-5 font-sans">
                  {article.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.trim().startsWith("###")) {
                      return (
                        <h2 key={index} className="text-xl md:text-xl text-gray-400 tracking-tight pt-3 flex items-center gap-2">
                          <CornerDownRight size={16} className="text-cyan-500 shrink-0" />
                          {paragraph.replace("###", "").trim()}
                        </h2>
                      );
                    }
                    return (
                      <p key={index} className="text-slate-300/90 leading-relaxed font-sans font-light">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </article>

              <CommentsSection articleSlug={article.slug} />


              <section className="max-w-3xl mx-auto my-16">
                <div className="flex flex-col md:flex-row items-center gap-4 group">
                  <div className="relative flex-1 w-full bg-[#0b0b0f] border border-slate-900 p-6 md:p-8 backdrop-blur-md overflow-hidden order-1">
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:bg-cyan-500/10" />
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
                      <Link href="/bc/about" className="shrink-0 group/img relative">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-[2px] bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 group-hover/img:from-cyan-500 group-hover/img:to-emerald-500 transition-all duration-500 shadow-xl">
                          <div className="w-full h-full bg-slate-950 rounded-full overflow-hidden relative">
                            <img src="/coder1.png" alt="Brown AD" className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" />
                          </div>
                        </div>
                        <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-950 rounded-full" />
                      </Link>
                      <div className="flex-1 text-center sm:text-left space-y-4">
                        <div className="space-y-1">
                          <span className="font-mono text-[10px] tracking-widest text-cyan-400 font-bold uppercase block">AUTHOR_PROFILE</span>
                          <h3 className="text-xl font-bold text-white tracking-tight">Sir Brown AD</h3>
                          <p className="text-xs font-mono text-slate-500">Software Developer & Website Architect</p>
                          <p className="text-xs font-mono text-slate-700 line-clamp-2">
                            Full-Stack Software developer architecting performant, scalable, and high-availability digital micro-modules. Specialized in React architecture, custom web engines, and secure data infrastructures.
                          </p>
                        </div>
                        <div className="pt-1">
                          <Link href="/bc/about" className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors group/link">
                            <span>Read entire matrix bio</span>
                            <ArrowRight size={13} className="text-slate-600 group-hover/link:translate-x-0.5 group-hover/link:text-cyan-400 transition-all" />
                          </Link>
                        </div>
                      </div>

                  <div className="flex md:flex-col items-center gap-1 bg-[#0b0b0f] border border-slate-900 p-3 md:py-4 backdrop-blur-md shadow-xl md:h-fit shrink-0 order-2">
                      <span className="font-mono text-[9px] text-slate-600 tracking-wider mr-2 sm:inline">CONNECT //</span>
                    <a href="https://www.linkedin.com/in/brownoziomachi72a5a3229" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-950 border border-slate-900 text-slate-500 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-300" title="LinkedIn Profile"><Linkedin size={16} /></a>
                    <div className="hidden md:block w-px h-4 bg-slate-900" />
                    <a href="https://github.com/Brown-Oziomachi" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-950 border border-slate-900 text-slate-500 hover:text-purple-400 hover:border-purple-500/30 transition-all duration-300" title="GitHub Profile"><Github size={16} /></a>
                    <div className="hidden md:block w-px h-4 bg-slate-900" />
                    <a href="mailto:browncemmanuel@gmail.com" className="p-3 bg-slate-950 border border-slate-900 text-slate-500 hover:text-cyan-400 hover:border-slate-800 rounded transition-all" aria-label="Direct Mail Endpoint"><Mail size={16} rel="noopener noreferrer" target="_blank" title="GitHub Profile" /></a>
                    <div className="hidden md:block w-px h-4 bg-slate-900" />
                    <a href="https://wa.me/2347013725529" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-950 border border-slate-900 text-slate-500 hover:text-cyan-400 hover:border-slate-800 rounded transition-all" title="WhatsApp Gateway">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                    </a>
                  </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex lg:hidden items-center gap-3 mt-12 pt-6 border-t border-slate-900">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Share this resource:</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleShare("twitter")} className="p-2 border border-slate-900 bg-slate-950 rounded-lg text-slate-400 hover:text-white"><Twitter size={14} /></button>
                  <button onClick={() => handleShare("linkedin")} className="p-2 border border-slate-900 bg-slate-950 rounded-lg text-slate-400 hover:text-white"><Linkedin size={14} /></button>
                  <button onClick={() => handleShare("facebook")} className="p-2 border border-slate-900 bg-slate-950 rounded-lg text-slate-400 hover:text-white"><Facebook size={14} /></button>
                  <button onClick={() => handleShare("whatsApp")} className="p-2 border border-slate-900 bg-slate-950 rounded-lg text-slate-400 hover:text-white">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                  </button>
                  <button onClick={() => handleShare("instagram")} className="p-2 border border-slate-900 bg-slate-950 rounded-lg text-slate-400 hover:text-white"><Instagram size={14} /></button>
                </div>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-3 sticky top-28 h-fit space-y-4">
              <div className="p-5 bg-slate-950/30 border border-slate-900/80">
                <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block mb-3">// Topic Abstract</span>
                <p className="text-xs text-slate-400 font-sans leading-relaxed font-light">{article.preview}</p>
              </div>
            </div>

          </div>
        </div>

        <RelatedArticles />

        <footer className="max-w-3xl mx-auto px-4 pb-2 border-t border-slate-900/60 pt-2 text-center">
          <p className="text-xs text-slate-500 mb-6">Finished reading? Journey back or explore home matrix.</p>
          <div className="flex items-center justify-between gap-1.5 xs:gap-2.5 text-[10px] xs:text-xs font-semibold w-full">
            <button onClick={() => router.push("/blog")} className="group flex-1 flex items-center justify-center gap-1 xs:gap-2 px-1.5 xs:px-4 py-2.5 border border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-700 transition-all rounded-md uppercase tracking-wider white-space-nowrap">
              <ArrowLeft className="w-3 h-3 xs:w-3.5 xs:h-3.5 transition-transform group-hover:-translate-x-1 shrink-0" />
              <span className="truncate">INDEX_LOGS</span>
            </button>
            <button onClick={() => router.push("/portfolio")} className="flex-1 px-1.5 xs:px-4 py-2.5 bg-slate-900/40 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all rounded-md uppercase tracking-wider truncate">RETURN_BASE</button>
            <button onClick={() => router.push("/bc/contact")} className="flex-1 px-1.5 xs:px-4 py-2.5 border border-emerald-500 text-emerald-400 bg-emerald-950/10 hover:bg-emerald-500 hover:text-black transition-all rounded font-bold uppercase tracking-wider shadow-lg shadow-emerald-950/20 truncate">CONTACT()</button>
          </div>
        </footer>
        <Footer />
      </div>
    </>
  );
}