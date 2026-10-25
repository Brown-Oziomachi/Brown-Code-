"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Download, X } from "lucide-react";

const BAR_H = 40;
const INSTALLED_KEY = "sirad_installed";
const DISMISS_KEY = "sirad_install_bar_dismissed"; // per session only

// In-app browsers (Facebook, Instagram, TikTok, etc.) cannot install PWAs
const IN_APP_RE =
    /FBAN|FBAV|FB_IAB|FBIOS|Instagram|Line\/|Twitter|TikTok|musical_ly|BytedanceWebview|Snapchat|LinkedInApp|Pinterest|MicroMessenger|; wv\)/i;

const HELP = {
    ios: {
        title: "Install Sir-AD Blog",
        body: (
            <>
                Tap the <strong>Share</strong> icon, then choose{" "}
                <strong>Add to Home Screen</strong>.
            </>
        ),
    },
    inapp: {
        title: "Open in your browser first",
        body: (
            <>
                This in-app browser can&apos;t install apps. Tap the{" "}
                <strong>three-dot menu</strong> (or the Share icon) and choose{" "}
                <strong>Open in Browser</strong> (Chrome or Safari). Then tap{" "}
                <strong>Install App</strong> there.
            </>
        ),
    },
    generic: {
        title: "Install Sir-AD Blog",
        body: (
            <>
                Open your browser menu and choose <strong>Install app</strong> or{" "}
                <strong>Add to Home screen</strong>.
            </>
        ),
    },
};

export default function InstallBanner() {
    const [ready, setReady] = useState(false);
    const [installed, setInstalled] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isIOS, setIsIOS] = useState(false);
    const [isAndroid, setIsAndroid] = useState(false);
    const [inApp, setInApp] = useState(false);
    const [help, setHelp] = useState(null); // null | "ios" | "inapp" | "generic"

    useEffect(() => {
        try {
            const standalone =
                window.matchMedia("(display-mode: standalone)").matches ||
                window.navigator.standalone === true;

            let wasInstalled = false;
            try {
                wasInstalled = window.localStorage.getItem(INSTALLED_KEY) === "1";
                if (standalone) window.localStorage.setItem(INSTALLED_KEY, "1");
            } catch (e) {
                // ignore
            }
            setInstalled(standalone || wasInstalled);

            const ua = window.navigator.userAgent || "";
            const isIPadOS =
                window.navigator.platform === "MacIntel" &&
                window.navigator.maxTouchPoints > 1;
            setIsIOS(/iphone|ipad|ipod/i.test(ua) || isIPadOS);
            setIsAndroid(/android/i.test(ua));
            setInApp(IN_APP_RE.test(ua));

            try {
                setDismissed(window.sessionStorage.getItem(DISMISS_KEY) === "1");
            } catch (e) {
                // ignore
            }
        } catch (e) {
            // ignore
        }

        if (window.__pwaPrompt) setDeferredPrompt(window.__pwaPrompt);

        const onReady = () => setDeferredPrompt(window.__pwaPrompt || null);
        const onInstalled = () => {
            try {
                window.localStorage.setItem(INSTALLED_KEY, "1");
            } catch (e) {
                // ignore
            }
            setInstalled(true);
            setDeferredPrompt(null);
            setHelp(null);
        };

        window.addEventListener("pwa-install-ready", onReady);
        window.addEventListener("appinstalled", onInstalled);
        setReady(true);

        return () => {
            window.removeEventListener("pwa-install-ready", onReady);
            window.removeEventListener("appinstalled", onInstalled);
        };
    }, []);

    // Desktop browsers with no install support: stay hidden
    const visible =
        ready &&
        !installed &&
        !dismissed &&
        (!!deferredPrompt || isIOS || isAndroid || inApp);

    // Make room for the bar: page content and the desktop menu panel move down
    useEffect(() => {
        if (!visible) return;
        document.documentElement.style.setProperty("--install-bar-h", `${BAR_H}px`);
        document.body.style.paddingTop = `${BAR_H}px`;
        return () => {
            document.documentElement.style.removeProperty("--install-bar-h");
            document.body.style.paddingTop = "";
        };
    }, [visible]);

    const handleClick = async () => {
        // 1. Real install prompt available
        if (deferredPrompt && !inApp) {
            try {
                deferredPrompt.prompt();
                await deferredPrompt.userChoice;
            } catch (e) {
                // ignore
            }
            window.__pwaPrompt = null;
            setDeferredPrompt(null);
            window.dispatchEvent(new Event("pwa-install-ready"));
            return;
        }

        // 2. Inside Facebook / Instagram / etc.
        if (inApp) {
            if (isAndroid) {
                const { host, pathname, search } = window.location;
                const url = window.location.href;
                window.location.href =
                    `intent://${host}${pathname}${search}#Intent;scheme=https;` +
                    `package=com.android.chrome;` +
                    `S.browser_fallback_url=${encodeURIComponent(url)};end`;
                setTimeout(() => setHelp("inapp"), 1200);
            } else {
                setHelp("inapp");
            }
            return;
        }

        // 3. iOS Safari
        if (isIOS) {
            setHelp("ios");
            return;
        }

        // 4. Android browser that has not fired the prompt yet
        setHelp("generic");
    };

    const dismiss = () => {
        setDismissed(true);
        try {
            window.sessionStorage.setItem(DISMISS_KEY, "1");
        } catch (e) {
            // ignore
        }
    };

    if (!visible) return null;

    const text = inApp
        ? "Open in your browser to install the app"
        : "Install Sir-AD Blog app on your device";
    const label = inApp ? "Open in browser" : "Install App";
    const sheet = help ? HELP[help] : null;

    return (
        <>
            <style>{`
        .ib {
          height: ${BAR_H}px; background: #111111; color: #ffffff;
          display: flex; align-items: center; justify-content: center; gap: 12px;
          padding: 0 12px; font-family: 'Inter', system-ui, sans-serif; font-size: 13px;
        }
        .ib__text { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ib__btn {
          flex-shrink: 0; display: inline-flex; align-items: center; gap: 6px; cursor: pointer;
          font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px; font-weight: 600;
          letter-spacing: 0.06em; padding: 6px 12px; border: none;
          background: #e8ff47; color: #0a0a0b;
        }
        .ib__btn:hover { background: #ffffff; }
        .ib__close {
          flex-shrink: 0; width: 28px; height: 28px; display: inline-flex; align-items: center;
          justify-content: center; background: transparent; border: none; color: #ffffff; cursor: pointer;
        }
        .ib__close:hover { color: #e8ff47; }
        @media (max-width: 380px) { .ib { font-size: 12px; gap: 8px; } }
      `}</style>

            <div className="ib" role="region" aria-label="Install app">
                <span className="ib__text">{text}</span>
                <button type="button" className="ib__btn" onClick={handleClick}>
                    <Download size={13} /> {label}
                </button>
                <button type="button" className="ib__close" aria-label="Dismiss" onClick={dismiss}>
                    <X size={15} />
                </button>
            </div>

            {sheet &&
                createPortal(
                    <div
                        onClick={() => setHelp(null)}
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
                            <h3 style={{ marginTop: 0 }}>{sheet.title}</h3>
                            <p>{sheet.body}</p>
                            <button
                                type="button"
                                onClick={() => setHelp(null)}
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