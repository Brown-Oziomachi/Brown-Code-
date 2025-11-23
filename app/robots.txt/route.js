export const GET = async () => {
    const robots = `
User-agent: *
Allow: /

Sitemap: https://browncode.name.ng/sitemap.xml
  `.trim();

    return new Response(robots, {
        status: 200,
        headers: {
            "Content-Type": "text/plain",
        },
    });
};
