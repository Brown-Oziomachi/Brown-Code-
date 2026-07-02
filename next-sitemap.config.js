// next-sitemap.config.js
import { articles } from "./app/data/article.js";

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://browncode.name.ng",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,

  exclude: [
    "/admin_sys_node",
    "/admin_sys_node/*",
    "/signin",
    "/signup",
    "/cv/pdf",
    "/floatingchat",
    "/robots.txt",
    "/sitemap",
    "/sitemap-html",
    "/status",
    "/bc_dev",
    "/client/scam-checker",
  ],

  additionalPaths: async () => {
    return articles.map((article) => ({
      loc: `/blog/${article.slug}`,
      lastmod: new Date(
        article.dateModified || article.datePublished || Date.now()
      ).toISOString(),
      changefreq: "monthly",
      priority: 0.9,
    }));
  },
};

export default config;