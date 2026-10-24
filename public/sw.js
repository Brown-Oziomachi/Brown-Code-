const CACHE_NAME = "sir-ad-blog-v5";
const OFFLINE_URL = "/offline.html";
const PRECACHE = ["/icons/icon-192.png", "/icons/icon-512.png"];

const FALLBACK_HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>You're offline | Sir-AD Blog</title><style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#fff;color:#111;font-family:Georgia,serif;text-align:center;padding:24px}h1{font-size:40px;margin:0 0 12px}em{font-style:italic;background:linear-gradient(transparent 62%,#e8ff47 62%)}p{font-family:system-ui,sans-serif;color:#3f3f3f;line-height:1.6}button{margin-top:16px;padding:14px 24px;border:1.5px solid #111;background:#e8ff47;color:#0a0a0b;font-weight:600;cursor:pointer}</style></head><body><div><h1>You&rsquo;re <em>offline</em> right now.</h1><p>Check your connection and try again.</p><button onclick="location.reload()">Try again</button></div></body></html>`;

// Make sure the offline page is stored; safe to call any time.
// Refuses to cache anything that is not a real HTML page.
async function ensureOfflinePage() {
    try {
        const cache = await caches.open(CACHE_NAME);
        if (await cache.match(OFFLINE_URL)) return;
        const res = await fetch(new Request(OFFLINE_URL, { cache: "reload" }));
        const type = res.headers.get("content-type") || "";
        if (!res.ok || !type.includes("text/html")) return;
        const body = await res.clone().text();
        // Never cache a page that contains service worker code
        if (body.includes("addEventListener(") || body.includes("CACHE_NAME")) return;
        await cache.put(OFFLINE_URL, res);
    } catch (e) {
        // try again on the next page load
    }
}

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) =>
                Promise.all(
                    PRECACHE.map((url) =>
                        cache.add(new Request(url, { cache: "reload" })).catch(() => null)
                    )
                )
            )
            .then(ensureOfflinePage)
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(
                    keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
                )
            )
            .then(ensureOfflinePage)
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    const { request } = event;
    if (request.method !== "GET") return;

    const url = new URL(request.url);

    // Leave other sites (Firebase, AdSense, etc.), APIs and auth routes alone
    if (url.origin !== self.location.origin) return;
    if (url.pathname.startsWith("/api/")) return;
    if (url.pathname.startsWith("/__/")) return;

    // Pages: always the live site; offline page only if there's no connection
    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Online: quietly make sure the offline page is stored
                    event.waitUntil(ensureOfflinePage());
                    return response;
                })
                .catch(async () => {
                    const cached = await caches.match(OFFLINE_URL);
                    return (
                        cached ||
                        new Response(FALLBACK_HTML, {
                            status: 503,
                            headers: { "Content-Type": "text/html; charset=utf-8" },
                        })
                    );
                })
        );
        return;
    }

    // Only cache files that never change under the same URL
    if (
        url.pathname.startsWith("/_next/static/") ||
        url.pathname.startsWith("/icons/")
    ) {
        event.respondWith(
            caches.match(request).then((cached) => {
                if (cached) return cached;
                return fetch(request).then((response) => {
                    if (response && response.status === 200 && response.type === "basic") {
                        const copy = response.clone();
                        caches
                            .open(CACHE_NAME)
                            .then((cache) => cache.put(request, copy))
                            .catch(() => { });
                    }
                    return response;
                });
            })
        );
    }
});

/* -- Push notifications -------------------------------- */

self.addEventListener("push", (event) => {
    let data = {};
    try {
        data = event.data ? event.data.json() : {};
    } catch (e) {
        data = { body: event.data ? event.data.text() : "" };
    }

    const title = data.title || "Sir-AD Blog";
    const options = {
        body: data.body || "",
        icon: "/icons/icon-192.png",
        data: { url: data.url || "/blog" },
    };
    if (data.image) options.image = data.image;
    if (data.tag) options.tag = data.tag;

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    let target = new URL("/blog", self.location.origin);
    try {
        const wanted = new URL(
            (event.notification.data && event.notification.data.url) || "/blog",
            self.location.origin
        );
        // Only ever open pages on our own site
        if (wanted.origin === self.location.origin) target = wanted;
    } catch (e) {
        // keep /blog
    }

    event.waitUntil(
        (async () => {
            const list = await self.clients.matchAll({
                type: "window",
                includeUncontrolled: true,
            });
            for (const client of list) {
                if (new URL(client.url).origin === self.location.origin && "focus" in client) {
                    await client.focus();
                    if ("navigate" in client) {
                        try { await client.navigate(target.href); } catch (e) { /* ignore */ }
                    }
                    return;
                }
            }
            await self.clients.openWindow(target.href);
        })()
    );
});