// firebase.config1.js (APP1 - DB1)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

let app1, auth1, db1;

if (typeof window !== "undefined") {
    const firebaseConfig1 = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE1_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE1_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE1_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE1_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE1_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE1_APP_ID,
    };

    app1 = initializeApp(firebaseConfig1, "app1");
    auth1 = getAuth(app1);
    db1 = getFirestore(app1);
}

export { app1, auth1, db1 };
