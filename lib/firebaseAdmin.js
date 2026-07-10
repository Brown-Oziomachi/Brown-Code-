import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let _adminDb;
let _adminAuth;

function ensureInitialized() {
    if (getApps().length > 0) return;

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!projectId || !clientEmail || !privateKey) {
        throw new Error(
            `Missing Firebase Admin env vars: ${[
                !projectId && "FIREBASE_PROJECT_ID",
                !clientEmail && "FIREBASE_CLIENT_EMAIL",
                !privateKey && "FIREBASE_PRIVATE_KEY",
            ].filter(Boolean).join(", ")}`
        );
    }

    initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
    });
}

export function getAdminDb() {
    ensureInitialized();
    if (!_adminDb) _adminDb = getFirestore();
    return _adminDb;
}

export async function getAdminAuth() {
    ensureInitialized();
    if (!_adminAuth) {
        const { getAuth } = await import("firebase-admin/auth");
        _adminAuth = getAuth();
    }
    return _adminAuth;
}