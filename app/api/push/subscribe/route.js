import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

export async function POST(request) {
    let sub;
    try {
        sub = await request.json();
    } catch {
        return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    const endpoint = sub?.endpoint;
    const p256dh = sub?.keys?.p256dh;
    const auth = sub?.keys?.auth;

    if (
        typeof endpoint !== "string" ||
        !endpoint.startsWith("https://") ||
        endpoint.length > 600 ||
        typeof p256dh !== "string" ||
        p256dh.length > 200 ||
        typeof auth !== "string" ||
        auth.length > 100
    ) {
        return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
    }

    try {
        const id = createHash("sha256").update(endpoint).digest("hex");
        await adminDb()
            .collection("pushSubscriptions")
            .doc(id)
            .set(
                { endpoint, keys: { p256dh, auth }, createdAt: new Date().toISOString() },
                { merge: true }
            );
        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error("push subscribe failed", e);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}