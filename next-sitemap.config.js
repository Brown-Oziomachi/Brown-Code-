/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.browncode.name.ng',
  outDir: './public',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/blog'),
    await config.transform(config, '/jobses'),
    await config.transform(config, '/admin'),
    await config.transform(config, '/admin/dashboard'),
  ],
};
