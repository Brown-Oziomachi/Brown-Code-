import { Suspense } from "react";
import TechnologyClient from "./news";

export const metadata = {
    title: "Tech News & Industry Trends | Brown Code",
    description: "Stay ahead with the latest technology news, industry trends, and digital insights curated by Brown Code. Covering AI, cybersecurity, web development, and African tech.",
    keywords: [
        "tech news Nigeria",
        "technology trends Africa",
        "AI news",
        "cybersecurity updates",
        "web development news",
        "African tech industry",
        "Brown Code news",
    ],
    alternates: {
        canonical: "https://browncode.name.ng/tech-news",
    },
    openGraph: {
        title: "Tech News & Industry Trends | Brown Code",
        description: "Latest technology news, industry trends, and digital insights curated by Brown Code.",
        url: "https://browncode.name.ng/tech-news",
        siteName: "Sir Brown AD",
        images: [{ url: "https://browncode.name.ng/logo.png", width: 1200, height: 630, alt: "Brown Code Tech News" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Tech News & Industry Trends | Sir Brown AD",
        description: "Latest technology news, industry trends, and digital insights curated by Sir Brown AD.",
        images: ["https://browncode.name.ng/logo.png"],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tech News & Industry Trends",
    url: "https://browncode.name.ng/tech-news",
    description: "Latest technology news, industry trends, and digital insights curated by Sir Brown AD.",
    publisher: {
        "@type": "Organization",
        name: "Sir Brown AD",
        logo: {
            "@type": "ImageObject",
            url: "https://browncode.name.ng/logo.png",
        },
    },
};

export default function TechnologyPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Suspense fallback={<div style={{ background: "#0a0a0b", minHeight: "100vh" }} />}>
                <TechnologyClient />
            </Suspense>
        </>
    );
}