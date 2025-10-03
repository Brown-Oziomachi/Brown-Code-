/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',   // the URL users and Google see
        destination: '/api/sitemap', // your API route
      },
    ];
  },
};

export default nextConfig;
