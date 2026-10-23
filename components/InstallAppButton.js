"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function InstallAppButton({ className, style, label = "Install App" }) {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstalled, setIsInstalled] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [showIOSHelp, setShowIOSHelp] = useState(false);

    useEffect(() => {
        try {
            const standalone =
                window.matchMedia("(display-mode: standalone)").matches ||
                window.navigator.standalone === true;
            setIsInstalled(standalone);

            const ua = window.navigator.userAgent || "";
            const isIPadOS =
                window.navigator.platform === "MacIntel" &&
                window.navigator.maxTouchPoints > 1;
            setIsIOS(/iphone|ipad|ipod/i.test(ua) || isIPadOS);
        } catch (e) {
            // ignore
        }

        // The prompt may already have been caught before this button loaded
        if (window.__pwaPrompt) setDeferredPrompt(window.__pwaPrompt);

        const onReady = () => setDeferredPrompt(window.__pwaPrompt || null);
        const onInstalled = () => {
            setIsInstalled(true);
            setDeferredPrompt(null);
            setShowIOSHelp(false);
        };

        window.addEventListener("pwa-install-ready", onReady);
        window.addEventListener("appinstalled", onInstalled);
        return () => {
            window.removeEventListener("pwa-install-ready", onReady);
            window.removeEventListener("appinstalled", onInstalled);
        };
    }, []);

    const handleClick = async () => {
        if (deferredPrompt) {
            try {
                deferredPrompt.prompt();
                await deferredPrompt.userChoice;
            } catch (e) {
                // ignore
            }
            window.__pwaPrompt = null;
            setDeferredPrompt(null);
            // Tell every other Install button on the page to update too
            window.dispatchEvent(new Event("pwa-install-ready"));
            return;
        }
        if (isIOS) setShowIOSHelp(true);
    };

    // Nothing to show: already installed, or this browser can't install
    if (isInstalled) return null;
    if (!deferredPrompt && !isIOS) return null;

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
            <button
                type="button"
                onClick={handleClick}
                className={className}
                style={className ? style : { ...defaultStyle, ...style }}
            >
                {label}
            </button>

            {showIOSHelp &&
                createPortal(
                    <div
                        onClick={() => setShowIOSHelp(false)}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,.6)",
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            zIndex: 99999,
                        }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: "#fff",
                                color: "#111",
                                padding: "1.25rem",
                                borderRadius: "16px 16px 0 0",
                                width: "100%",
                                maxWidth: 420,
                                textAlign: "center",
                            }}
                        >
                            <h3 style={{ marginTop: 0 }}>Install Sir-AD Blog</h3>
                            <p>
                                Tap the <strong>Share</strong> icon, then choose{" "}
                                <strong>Add to Home Screen</strong>.
                            </p>
                            <button
                                type="button"
                                onClick={() => setShowIOSHelp(false)}
                                style={{
                                    padding: "8px 16px",
                                    borderRadius: 8,
                                    border: 0,
                                    background: "#0f172a",
                                    color: "#fff",
                                    cursor: "pointer",
                                }}
                            >
                                Got it
                            </button>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}