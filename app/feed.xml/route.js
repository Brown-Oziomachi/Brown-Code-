import { articles } from "@/app/data/article";
import { CATEGORY_LABELS, getCategoryKey } from "@/lib/blogCategories";

const SITE_URL = "https://browncode.name.ng";

function escapeXml(str = "") {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

export async function GET() {
    const sorted = [...articles].sort(
        (a, b) =>
            new Date(b.datePublished || 0) - new Date(a.datePublished || 0)
    );

    const items = sorted
        .map((article) => {
            const url = `${SITE_URL}/blog/${article.slug}`;
            const pubDate = new Date(
                article.datePublished || Date.now()
            ).toUTCString();
            const category = CATEGORY_LABELS[getCategoryKey(article)];

            return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(article.postedBy || "Sir Brown AD")}</author>
      ${category ? `<category>${escapeXml(category)}</category>` : ""}
      <description>${escapeXml(article.preview || "")}</description>
      ${article.image
                    ? `<enclosure url="${escapeXml(article.image)}" type="image/jpeg" />`
                    : ""
                }
    </item>`;
        })
        .join("");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sir Brown AD — Blog</title>
    <link>${SITE_URL}</link>
    <description>Tech writing, dev logs, and Nigerian business fraud awareness from Sir Brown AD.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
    });
}