import { articles } from "@/app/data/article";

export default function sitemap() {
    const blogUrls = articles.map((article) => ({
        url: `https://browncode.name.ng/blog/${article.slug}`,
        lastModified: new Date(article.datePublished || "2025-10-04"),
        changeFrequency: "monthly",
        priority: 0.8,
    }));

    return [
        {
            url: "https://browncode.name.ng",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: "https://browncode.name.ng/blog",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        ...blogUrls,
    ];
}