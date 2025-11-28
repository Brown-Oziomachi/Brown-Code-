import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig2 = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE2_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE2_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE2_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE2_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE2_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE2_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE2_MEASUREMENT_ID,
};

// Initialize Firebase App 2 (or get existing instance)
const app2 = !getApps().find(app => app.name === "app2")
    ? initializeApp(firebaseConfig2, "app2")
    : getApp("app2");

// Initialize services
const auth2 = getAuth(app2);
const db2 = getFirestore(app2);

// Analytics - only in browser environment
let analytics2 = null;
if (typeof window !== "undefined") {
    isSupported().then(yes => {
        if (yes) {
            analytics2 = getAnalytics(app2);
        }
    });
}

export { app2, auth2, db2, analytics2 };