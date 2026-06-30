import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(req) {
    try {
        const { articleSlug, email } = await req.json();

        if (!articleSlug || !email) {
            return Response.json({ isDuplicate: false });
        }

        const snap = await adminDb
            .collection("comments")
            .where("articleSlug", "==", articleSlug)
            .get();

        const checks = await Promise.all(
            snap.docs.map(async (d) => {
                try {
                    const priv = await adminDb
                        .doc(`comments/${d.id}/private/data`)
                        .get();
                    return priv.data()?.authorEmail ?? null;
                } catch {
                    return null;
                }
            })
        );

        const isDuplicate = checks.includes(email.toLowerCase());
        return Response.json({ isDuplicate });
    } catch (err) {
        console.error(err);
        return Response.json({ isDuplicate: false }, { status: 500 });
    }
}