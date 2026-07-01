import { CATEGORY_LABELS } from "@/lib/blogCategories";
import TopicPageClient from "./TopicPageClient";

const SITE_URL = "https://browncode.name.ng";

export async function generateMetadata({ params }) {
    const { topic } = await params;
    const label = CATEGORY_LABELS[topic];

    if (!label) {
        return {
            title: "Topic not found | Brown Code",
            robots: { index: false, follow: false },
        };
    }

    const title = `${label} Articles | Brown Code`;
    const description = `Engineering insights, fraud-awareness writing, and deep dives on ${label.toLowerCase()} from Sir Brown AD at Brown Code.`;
    const url = `${SITE_URL}/blog/topic/${topic}`;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            siteName: "Brown Code",
            type: "website",
        },
        twitter: {
            card: "summary",
            title,
            description,
        },
    };
}

export async function generateStaticParams() {
    return Object.keys(CATEGORY_LABELS).map((topic) => ({ topic }));
}

export default async function TopicPage({ params }) {
    const { topic } = await params;
    return <TopicPageClient topic={topic} />;
}