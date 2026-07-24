import { notFound } from "next/navigation";
import { CATEGORY_LABELS, getCategoryKey } from "@/lib/blogCategories";
import { articles as allArticles } from "@/app/data/article";
import TopicPageClient from "./TopicPageClient";

const SITE_URL = "https://browncode.name.ng";

const getReadingTime = (content) =>
    Math.max(1, Math.ceil((content || "").split(" ").length / 200));

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
    const label = CATEGORY_LABELS[topic];

    // Resolve the "unknown topic" 404 here on the server, same as the
    // article page — instead of letting the client component mount first
    // and then call notFound() itself.
    if (!label) {
        notFound();
    }

    // Filter to this topic AND strip `content` before this ever reaches the
    // client. Previously TopicPageClient imported the FULL articles array
    // (every topic, every article's full body) just to filter it down to
    // one topic in the browser — meaning every topic page shipped every
    // other article's content too.
    const topicArticles = allArticles
        .filter((a) => getCategoryKey(a) === topic)
        .sort((a, b) => (b.datePublished || "").localeCompare(a.datePublished || ""))
        .map(({ content, ...rest }) => ({
            ...rest,
            readingTime: getReadingTime(content),
            // Precomputed here so ArticleCard doesn't need getCategoryKey/
            // CATEGORY_LABELS lookups per-card on the client.
            categoryLabel: CATEGORY_LABELS[topic],
        }));

    return <TopicPageClient topic={topic} label={label} articles={topicArticles} />;
}