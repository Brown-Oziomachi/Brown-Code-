// lib/blogCategories.js

import { articlesMeta } from "@/app/data/articlesMeta";

export const CATEGORIES = [
    { key: "security", label: "Security & Fraud" },
    { key: "business", label: "Business Strategy" },
    { key: "webdev", label: "Web & Engineering" },
    { key: "marketing", label: "Marketing & SEO" },
    { key: "growth", label: "Personal Growth" },
    { key: "ai", label: "AI & Technology" },
];

export const CATEGORY_LABELS = {
    security: "Security & Fraud",
    business: "Business Strategy",
    webdev: "Web & Engineering",
    marketing: "Marketing & SEO",
    growth: "Personal Growth",
    ai: "AI & Technology",
};

const CATEGORY_KEYWORDS = [
    {
        key: "security",
        match: [
            "scam", "fraud", "hack", "hacked", "hijack", "phishing", "skimming",
            "impersonation", "security", "cybersecurity", "cyber-security",
            "sim-card", "sim-swap", "bvn", "nin", "atm", "pos-", "chargeback",
            "escrow", "invoice-fraud", "dispatch-rider", "reversal", "overpayment",
        ],
    },
    {
        key: "ai",
        match: [
            "ai-", "-ai", "artificial-intelligence", "cognitive-offloading",
            "dead-internet", "algorithmic-warfare", "ai-companies",
        ],
    },
    {
        key: "marketing",
        match: [
            "seo", "content-marketing", "social-media", "local-seo",
            "conversion", "cro", "branding", "brand-", "ecommerce", "e-commerce",
            "lead-generation", "inbound", "crm", "ad-account", "advertising",
        ],
    },
    {
        key: "webdev",
        match: [
            "website", "web-", "portfolio", "coding", "custom-coding", "cloud",
            "infrastructure", "automation", "data-driven", "analytics",
            "accessibility", "technical-debt", "ux", "scaling-ecommerce",
            "cybersecurity-for-enterprises", "maintenance", "sitemap",
            "custom-crm", "predictive-analytics",
        ],
    },
    {
        key: "growth",
        match: [
            "relationship", "personal-development", "character-currency",
            "networking", "future-proofing", "career", "habits",
            "founders-dilemma", "mvp-fallacy", "premature-automation",
        ],
    },
    {
        key: "business",
        match: [
            "business", "startup", "loan", "pricing", "customer", "trust",
            "cac-", "paystack", "paypal", "flutterwave", "b2b", "enterprise",
            "solopreneur", "financial-growth", "first-10-customers",
        ],
    },
];

export const getCategoryKey = (article) => {
    const slug = article?.slug || "";
    const metaCategory = articlesMeta[slug]?.category;

    if (metaCategory && CATEGORY_LABELS[metaCategory]) {
        return metaCategory;
    }
    if (article?.category && CATEGORY_LABELS[article.category]) {
        return article.category;
    }
    for (const group of CATEGORY_KEYWORDS) {
        if (group.match.some((kw) => slug.includes(kw))) return group.key;
    }
    return "business";
};