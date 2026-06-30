// app/api/comments/submit/route.js
import { adminDb } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req) {
    const { articleSlug, email, authorName, text } = await req.json();

    const normalizedEmail = email.trim().toLowerCase();

    // Duplicate check
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

    // Write public comment
    const newRef = await adminDb.collection("comments").add({
        articleSlug,
        authorName: authorName.trim(),
        text: text.trim(),
        createdAt: FieldValue.serverTimestamp(),
        brownReplied: false,
    });

    // Write email to private subcollection — Admin SDK bypasses rules
    await adminDb
        .collection("comments")
        .doc(newRef.id)
        .collection("private")
        .doc("data")
        .set({ authorEmail: normalizedEmail });

    return Response.json({ isDuplicate: false, commentId: newRef.id });
}