// app/api/lan-books/route.js  —  copy into YOUR Next.js project
// Secure server-side proxy: your LAN API key is never sent to the browser.
//
// Add to .env.local:
//   LAN_API_KEY = lan_live_xxxxxxxxxxxx
//   LAN_API_URL = https://www.lanlibrary.com

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get('category') || 'all';
    const limit = searchParams.get('limit') || '10';
    const isFree = searchParams.get('isFree');

    const params = new URLSearchParams({ limit });
    if (category !== 'all') params.set('category', category);
    if (isFree !== null) params.set('isFree', isFree);

    try {
        const res = await fetch(
            `${process.env.LAN_API_URL}/api/v1/books?${params}`,
            {
                headers: { 'x-api-key': process.env.LAN_API_KEY || '' },
                next: { revalidate: 60 },
            }
        );

        if (!res.ok) {
            return Response.json(
                { success: false, error: `Upstream ${res.status}` },
                { status: res.status }
            );
        }

        const json = await res.json();
        return Response.json({ success: true, data: json.data || json });
    } catch (err) {
        console.error('[lan-proxy]', err);
        return Response.json({ success: false, error: 'Proxy failed.' }, { status: 500 });
    }
}