"use client";

import { useEffect, useState } from "react";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "";

function urlBase64ToUint8Array(base64) {
    const padding = "=".repeat((4 - (base64.length % 4)) % 4);
    const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
    const raw = window.atob(b64);
    const out = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
}

export default function NotifyButton({ className, style, label = "Get blog alerts" }) {
    const [state, setState] = useState("hidden"); // hidden | ready | working
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!PUBLIC_KEY) return;
        if (
            !("serviceWorker" in navigator) ||
            !("PushManager" in window) ||
            !("Notification" in window)
        ) {
            return;
        }
        if (Notification.permission === "denied") return;

        let cancelled = false;
        (async () => {
            try {
                const reg = await navigator.serviceWorker.getRegistration();
                const existing = reg ? await reg.pushManager.getSubscription() : null;
                if (!cancelled && !existing) setState("ready");
            } catch (e) {
                if (!cancelled) setState("ready");
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    const handleClick = async () => {
        setState("working");
        setMessage("");
        try {
            // Ask first, straight from the click
            const permission = await Notification.requestPermission();
            if (permission !== "granted") {
                setMessage(
                    permission === "denied"
                        ? "Notifications are blocked. You can allow them in your browser settings."
                        : ""
                );
                setState(permission === "denied" ? "hidden" : "ready");
                return;
            }

            const reg = await navigator.serviceWorker.getRegistration();
            if (!reg) {
                setMessage("Alerts work on the live site, not in development mode.");
                setState("ready");
                return;
            }
            await Promise.race([
                navigator.serviceWorker.ready,
                new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 8000)),
            ]);

            const existing = await reg.pushManager.getSubscription();
            const sub =
                existing ||
                (await reg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY),
                }));

            const res = await fetch("/api/push/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sub.toJSON()),
            });
            if (!res.ok) throw new Error("save failed");

            setMessage("Done. You'll get an alert when a new article is published.");
            setState("hidden");
        } catch (e) {
            setMessage("Could not turn on alerts. Please try again.");
            setState("ready");
        }
    };

    if (state === "hidden" && !message) return null;

    const defaultStyle = {
        padding: "8px 16px",
        borderRadius: "8px",
        border: "none",
        background: "#0f172a",
        color: "#fff",
        fontWeight: 600,
        cursor: "pointer",
    };

    return (
        <>
            {state !== "hidden" && (
                <button
                    type="button"
                    onClick={handleClick}
                    disabled={state === "working"}
                    className={className}
                    style={className ? style : { ...defaultStyle, ...style }}
                >
                    {state === "working" ? "Working..." : label}
                </button>
            )}
            {message && (
                <span role="status" style={{ fontSize: 12, lineHeight: 1.5, color: "#3f3f3f" }}>
                    {message}
                </span>
            )}
        </>
    );
}