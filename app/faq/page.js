"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
    const faqs = [
        {
            question: "How long does it take to build a website?",
            answer:
                "Starter: 2–3 days. Standard: 4–7 days. Premium: 1–3 weeks depending on features.",
        },
        {
            question: "Do you take upfront payment?",
            answer: "Yes. I take 50% upfront and 50% upon completion.",
        },
        {
            question: "Can you help me with website maintenance?",
            answer:
                "Yes. I offer monthly maintenance plans starting from ₦15,000 per month.",
        },
        {
            question: "Will my website be mobile-friendly?",
            answer:
                "Absolutely. All websites I build are fully responsive for all devices.",
        },
        {
            question: "Do you build e-commerce websites?",
            answer:
                "Yes. I build complete e-commerce platforms with admin panel, cart, products, and payment integrations.",
        },
        {
            question: "Do you provide hosting and domain?",
            answer:
                "I can guide you, but you will purchase your domain/hosting yourself so you fully own it.",
        },
        {
            question: "What technologies do you use?",
            answer:
                "Next.js, React, Tailwind CSS, Firebase, MongoDB, Node.js, and Vercel hosting.",
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-cyan-600 text-center mb-10">
                Frequently Asked Questions
            </h2>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-cyan-300 rounded-xl p-4 bg-white shadow-sm"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex justify-between items-center text-left"
                        >
                            <span className="text-lg font-semibold text-gray-800">
                                {faq.question}
                            </span>
                            <ChevronDown
                                className={`w-5 h-5 text-cyan-600 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {openIndex === index && (
                            <p className="mt-3 text-gray-600 border-t border-cyan-200 pt-3">
                                {faq.answer}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
