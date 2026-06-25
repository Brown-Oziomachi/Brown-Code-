import SitemapClient from "./SitemapClient";

export const metadata = {
    title: "Site Directory — Brown Code",
    description: "Full site directory for Brown Code portfolio. All pages, blog articles, and regional nodes fully indexed and mapped.",
};

export default function sitemapPage() {
    return <SitemapClient />;
}