const { articles } = require("./data/articles");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.browncode.name.ng",
  outDir: "./public",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  additionalPaths: async (config) => {
    const paths = [
      "/",
      "/blog",
      "/jobses"
    ].map((path) => config.transform(config, path));

    const articlePaths = articles.map((article) =>
      config.transform(config, `/blog/${article.slug}`)
    );

    return [...paths, ...articlePaths];
  },
};
