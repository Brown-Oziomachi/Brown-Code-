"use client";
import { useState } from "react";

const articles = [
  {
    title: "Why You Need a Website",
    preview:
      "A website builds credibility and makes your work accessible to the world...",
    content: `In today's digital era, having a website is no longer optional. 
    It acts as your digital identity, helping you showcase your skills, services, and ideas. 
    A well-designed website builds trust, improves visibility, and allows you to reach a global audience. 
    Whether you’re a freelancer, entrepreneur, or business owner, a website is your 24/7 representative online.`,
  },
  {
    title: "Importance of a Personal Portfolio",
    preview:
      "Your portfolio is your story—showing employers or clients what you can do...",
    content: `A personal portfolio is more than just a collection of your work. 
    It’s a demonstration of your skills, creativity, and professionalism. 
    Portfolios allow potential clients and employers to evaluate your experience quickly. 
    It also shows that you’re serious about your craft and sets you apart in competitive industries.`,
  },
  {
    title: "Why Branding Matters Online",
    preview:
      "Your brand is how people perceive you. Consistent branding makes you memorable...",
    content: `Branding is not just about logos and colors—it’s about creating an identity. 
    A strong brand communicates trust, professionalism, and reliability. 
    Through consistent branding on your website and portfolio, you become more recognizable and leave a lasting impression.`,
  },
  {
    title: "Future-Proofing Your Career Online",
    preview:
      "In a digital-first world, an online presence opens doors to unlimited opportunities...",
    content: `The job market is rapidly evolving, and having an online presence future-proofs your career. 
    Employers, collaborators, and clients are constantly searching online for talent. 
    A strong website and portfolio ensure you’re not invisible and position you as someone ready for digital opportunities.`,
  },
];

export default function KnowledgeHub() {
  const [selected, setSelected] = useState(null);

  return (
    <section className=" bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <a
          href="/"
          className="block text-2xl mb-10  bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        >
          Return {">>>"}
        </a>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          What you must know
        </h2>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-purple-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-4">{article.title}</h3>
              <p className="text-gray-300 mb-4">{article.preview}</p>
              <button
                onClick={() => setSelected(article)}
                className=" bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 cursor-pointer hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium"
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      {selected && (
        <div className="fixed inset-0  bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 bg-opacity-70 flex items-center justify-center z-50 px-4">
          <div className="bg-purple-950 p-8 rounded-2xl max-w-2xl w-full shadow-lg relative">
            <h3 className="text-2xl font-bold mb-4">{selected.title}</h3>
            <p className="text-gray-300 mb-6 whitespace-pre-line">
              {selected.content}
            </p>
            <button
              onClick={() => setSelected(null)}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
