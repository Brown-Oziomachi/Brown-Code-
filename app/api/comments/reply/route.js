import { adminDb, adminAuth } from "@/lib/firebaseAdmin";

export async function POST(req) {
    try {
        const { commentId, token } = await req.json();

        if (!commentId || !token) {
            return Response.json({ error: "Missing fields" }, { status: 400 });
        }

        const decoded = await adminAuth.verifyIdToken(token);
        if (decoded.email !== "browncemmanuel@gmail.com") {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const privateDoc = await adminDb
            .doc(`comments/${commentId}/private/data`)
            .get();

        let authorEmail;

        if (!privateDoc.exists) {
            const publicDoc = await adminDb.doc(`comments/${commentId}`).get();
            authorEmail = publicDoc.data()?.authorEmail;
        } else {
            authorEmail = privateDoc.data()?.authorEmail;
        }

        if (!authorEmail) {
            return Response.json({ error: "No email found" }, { status: 404 });
        }

        await adminDb.doc(`comments/${commentId}`).update({ brownReplied: true });

        return Response.json({ success: true, email: authorEmail });
    } catch (err) {
        console.error(err);
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}