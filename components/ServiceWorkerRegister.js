"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
    useEffect(() => {
        if (!("serviceWorker" in navigator)) return;

        if (process.env.NODE_ENV === "production") {
            navigator.serviceWorker.register("/sw.js").catch(() => { });
        } else {
            // In development, remove any old service worker to avoid stale files
            navigator.serviceWorker
                .getRegistrations()
                .then((regs) => regs.forEach((r) => r.unregister()))
                .catch(() => { });
        }
    }, []);

    return null;
}