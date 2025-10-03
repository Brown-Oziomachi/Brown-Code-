import { NextResponse } from "next/server";

// Hard-coded blog slugs (you can generate these from your titles)
const blogSlugs = [
  "why-you-need-a-website",
  "importance-of-a-personal-portfolio",
  "why-branding-matters-online",
  "future-proofing-your-career-online"
];

export async function GET() {
  const staticUrls = ["/", "/blog", "/jobses"]; // your main pages

  const allUrls = [...staticUrls, ...blogSlugs.map(slug => `/blog/${slug}`)];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(
      url => `<url>
    <loc>https://www.browncode.name.ng${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
