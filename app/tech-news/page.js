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
    openGraph: {
        title: "Tech News & Industry Trends | Brown Code",
        description: "Latest technology news, industry trends, and digital insights curated by Brown Code.",
        url: "https://browncode.name.ng/tech-news",
        siteName: "Brown Code",
        type: "website",
    },
};

export default function TechnologyPage() {
    return (
        <Suspense fallback={<div style={{ background: "#0a0a0b", minHeight: "100vh" }} />}>
            <TechnologyClient />
        </Suspense>
    );
}