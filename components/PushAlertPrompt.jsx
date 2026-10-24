"use client";

import { useEffect, useState } from "react";

const DONE_KEY = "push-alerts-done";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

export default function PushAlertPrompt() {
  // hidden | ask | working | done | error
  const [status, setStatus] = useState("hidden");

  useEffect(() => {
    if (
      !("serviceWorker" in navigator) ||
      !("PushManager" in window) ||
      !("Notification" in window)
    ) {
      return;
    }
    if (Notification.permission === "denied") return;

    try {
      if (localStorage.getItem(DONE_KEY) === "1") return;
    } catch (e) {
      // ignore
    }

    const check = async () => {
      try {
        const reg = await navigator.serviceWorker.ready;
        const existing = await reg.pushManager.getSubscription();
        if (existing) {
          try {
            localStorage.setItem(DONE_KEY, "1");
          } catch (e) {
            // ignore
          }
          return;
        }
        setStatus("ask");
      } catch (e) {
        // ignore
      }
    };

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    // Installed app opened (iOS, or reopening on Android/desktop)
    if (standalone) check();

    // Just installed from the browser tab
    const onInstalled = () => setTimeout(check, 800);
    window.addEventListener("appinstalled", onInstalled);
    return () => window.removeEventListener("appinstalled", onInstalled);
  }, []);

  const enable = async () => {
    setStatus("working");
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus(permission === "denied" ? "hidden" : "ask");
        return;
      }

      const reg = await navigator.serviceWorker.ready;
      let sub = await reg.pushManager.getSubscription();
      if (!sub) {
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
          ),
        });
      }

      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub.toJSON()),
      });
      if (!res.ok) throw new Error("Could not save subscription");

      try {
        localStorage.setItem(DONE_KEY, "1");
      } catch (e) {
        // ignore
      }
      setStatus("done");
      setTimeout(() => setStatus("hidden"), 6000);
    } catch (e) {
      setStatus("error");
    }
  };

  if (status === "hidden") return null;

  const button = {
    padding: "8px 16px",
    borderRadius: 8,
    border: 0,
    background: "#0f172a",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  };

  return (
    <div
      style={{
        position: "fixed",
        left: 12,
        right: 12,
        bottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
        maxWidth: 420,
        margin: "0 auto",
        background: "#fff",
        color: "#111",
        padding: "1rem",
        borderRadius: 14,
        boxShadow: "0 8px 30px rgba(0,0,0,.25)",
        zIndex: 99998,
        textAlign: "center",
      }}
    >
      {status === "done" ? (
        <p style={{ margin: 0, fontWeight: 600 }}>
          Done. You&apos;ll get an alert when a new article is published.
        </p>
      ) : (
        <>
          <p style={{ margin: "0 0 0.75rem", fontWeight: 600 }}>
            Get an alert when a new article is published?
          </p>
          {status === "error" && (
            <p
              style={{ margin: "0 0 0.75rem", color: "#b91c1c", fontSize: 14 }}
            >
              Something went wrong. Please try again.
            </p>
          )}
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            <button
              type="button"
              onClick={enable}
              disabled={status === "working"}
              style={button}
            >
              {status === "working" ? "Please wait..." : "Get alerts"}
            </button>
            <button
              type="button"
              onClick={() => setStatus("hidden")}
              style={{ ...button, background: "#e2e8f0", color: "#0f172a" }}
            >
              Not now
            </button>
          </div>
        </>
      )}
    </div>
  );
}
