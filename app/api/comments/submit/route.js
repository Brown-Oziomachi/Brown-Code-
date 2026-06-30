import { adminDb } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req) {
    try {
        const { articleSlug, email, authorName, text } = await req.json();

        if (!articleSlug || !email || !authorName || !text) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existing = await adminDb
            .collection("comments")
            .where("articleSlug", "==", articleSlug)
            .get();

        for (const docSnap of existing.docs) {
            const privateDoc = await adminDb
                .collection("comments")
                .doc(docSnap.id)
                .collection("private")
                .doc("data")
                .get();

            if (privateDoc.exists && privateDoc.data().authorEmail === normalizedEmail) {
                return Response.json({ isDuplicate: true });
            }
        }

        const newRef = await adminDb.collection("comments").add({
            articleSlug,
            authorName: authorName.trim(),
            text: text.trim(),
            createdAt: FieldValue.serverTimestamp(),
            brownReplied: false,
        });

        await adminDb
            .collection("comments")
            .doc(newRef.id)
            .collection("private")
            .doc("data")
            .set({ authorEmail: normalizedEmail });

        return Response.json({ isDuplicate: false, commentId: newRef.id });
    } catch (err) {
        console.error("SUBMIT ROUTE ERROR:", err);
        return Response.json({ error: err.message || "Server error" }, { status: 500 });
    }
}