import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import webpush from "web-push";
import { adminDb } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function authorized(request) {
    const secret = process.env.PUSH_ADMIN_SECRET || "";
    const header = request.headers.get("authorization") || "";
    const given = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (!secret || !given) return false;
    const a = Buffer.from(given);
    const b = Buffer.from(secret);
    return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request) {
    if (!authorized(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    const privateKey = process.env.VAPID_PRIVATE_KEY;
    const subject = process.env.VAPID_SUBJECT;
    if (!publicKey || !privateKey || !subject) {
        return NextResponse.json({ error: "Missing VAPID env vars" }, { status: 500 });
    }
    webpush.setVapidDetails(subject, publicKey, privateKey);

    let body = {};
    try {
        body = await request.json();
    } catch {
        // handled below
    }

    const title = String(body.title || "").slice(0, 120);
    if (!title) {
        return NextResponse.json({ error: "title is required" }, { status: 400 });
    }
    const url =
        typeof body.url === "string" && body.url.startsWith("/") ? body.url : "/blog";

    const payload = JSON.stringify({
        title,
        body: String(body.body || "").slice(0, 200),
        url,
        image:
            typeof body.image === "string" && body.image.startsWith("https://")
                ? body.image
                : undefined,
        tag: url,
    });

    const snap = await adminDb().collection("pushSubscriptions").get();
    const docs = snap.docs;
    let sent = 0;
    let removed = 0;
    let failed = 0;

    for (let i = 0; i < docs.length; i += 50) {
        const batch = docs.slice(i, i + 50);
        await Promise.all(
            batch.map(async (d) => {
                const s = d.data();
                try {
                    await webpush.sendNotification(
                        { endpoint: s.endpoint, keys: s.keys },
                        payload,
                        { TTL: 60 * 60 * 24 }
                    );
                    sent++;
                } catch (err) {
                    // Subscription expired or the user turned notifications off
                    if (err.statusCode === 404 || err.statusCode === 410) {
                        await d.ref.delete();
                        removed++;
                    } else {
                        failed++;
                    }
                }
            })
        );
    }

    return NextResponse.json({ total: docs.length, sent, removed, failed });
}