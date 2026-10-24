// scripts/notify.mjs
// Usage (from the project root):
//   node scripts/notify.mjs              -> sends the newest published article (skipped if already sent)
//   node scripts/notify.mjs my-slug      -> forces a send for that article
//   node scripts/notify.mjs --dry        -> preview only
// Env: PUSH_ADMIN_SECRET, SITE_URL, ARTICLES_FILE

import fs from "node:fs";

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const slugArg = args.find((a) => !a.startsWith("--"));

const site = (process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, "");
const secret = process.env.PUSH_ADMIN_SECRET;
const file = process.env.ARTICLES_FILE || "data/article.js";

if (!secret && !dry) {
    console.error("Missing PUSH_ADMIN_SECRET");
    process.exit(1);
}
if (!fs.existsSync(file)) {
    console.error(`Cannot find ${file}. Set ARTICLES_FILE to the real path of article.js`);
    process.exit(1);
}

// Load the articles array without needing the project to be set up as an ES module
const source = fs
    .readFileSync(file, "utf8")
    .replace(/export\s+const\s+/g, "const ")
    .replace(/export\s+default\s+/g, "");
const articles = new Function(`${source}\n;return articles;`)();

// Pick the article
const today = new Date().toISOString().slice(0, 10);
let article;
if (slugArg) {
    article = articles.find((a) => a.slug === slugArg);
    if (!article) {
        console.error(`No article with slug "${slugArg}"`);
        process.exit(1);
    }
} else {
    // Newest article that is already published (skips future-dated ones)
    article = [...articles]
        .filter((a) => a.datePublished <= today)
        .sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished))[0];
}
if (!article) {
    console.error("No published article found");
    process.exit(1);
}

const image = article.image
    ? article.image.startsWith("http")
        ? article.image
        : `${site}${article.image}`
    : undefined;

const payload = {
    title: article.title.replace(/[“”"]/g, "").trim(),
    body:
        article.preview.length > 140
            ? article.preview.slice(0, 137).trimEnd() + "..."
            : article.preview,
    url: `/blog/${article.slug}`,
    image: image && image.startsWith("https://") ? image : undefined,
};

console.log("Notification:", payload);
if (dry) process.exit(0);

const res = await fetch(`${site}/api/push/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` },
    // A slug typed by hand means "send it even if it was sent before"
    body: JSON.stringify({ ...payload, force: Boolean(slugArg) }),
});
const out = await res.json().catch(() => ({}));
console.log(res.status, out);

if (!res.ok) process.exit(1);