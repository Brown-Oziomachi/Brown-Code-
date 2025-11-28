// firebase.config2.js (APP2 - DB2)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

let app2, auth2, db2, analytics2;

if (typeof window !== "undefined") {
    const firebaseConfig2 = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE2_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE2_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE2_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE2_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE2_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE2_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE2_MEASUREMENT_ID,
    };

    app2 = initializeApp(firebaseConfig2, "app2");
    auth2 = getAuth(app2);
    db2 = getFirestore(app2);
    analytics2 = getAnalytics(app2);
}

export { app2, auth2, db2, analytics2 };
