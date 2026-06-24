// next-sitemap.config.js
import { articles } from "./app/data/article";

/** @type {import('next-sitemap').IConfig} */
export const siteUrl = "https://browncode.name.ng";
export const generateRobotsTxt = true;
export const changefreq = "weekly";
export const priority = 0.7;
export const exclude = [
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
];
export async function additionalPaths() {
  return articles.map((article) => ({
    loc: `/blog/${article.slug}`,
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: 0.9,
  }));
}