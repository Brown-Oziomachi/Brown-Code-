"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "sirad_install_prompt_seen";
const DELAY_MS = 3000;

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isIOS, setIsIOS] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);
    const [alreadySeen, setAlreadySeen] = useState(true); // assume seen until checked
    const [visible, setVisible] = useState(false);

    // Read device, install state and whether this visitor has seen the pop-up
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

        try {
            setAlreadySeen(window.localStorage.getItem(STORAGE_KEY) === "1");
        } catch (e) {
            // Storage blocked: stay quiet instead of asking on every page load
            setAlreadySeen(true);
        }

        if (window.__pwaPrompt) setDeferredPrompt(window.__pwaPrompt);

        const onReady = () => setDeferredPrompt(window.__pwaPrompt || null);
        const onInstalled = () => {
            setIsInstalled(true);
            setDeferredPrompt(null);
            setVisible(false);
        };

        window.addEventListener("pwa-install-ready", onReady);
        window.addEventListener("appinstalled", onInstalled);
        return () => {
            window.removeEventListener("pwa-install-ready", onReady);
            window.removeEventListener("appinstalled", onInstalled);
        };
    }, []);

    const canPrompt = !!deferredPrompt || isIOS;

    // Show once, a few seconds after arrival
    useEffect(() => {
        if (alreadySeen || isInstalled || !canPrompt) return;
        const t = setTimeout(() => {
            setVisible(true);
            try {
                window.localStorage.setItem(STORAGE_KEY, "1");
            } catch (e) {
                // ignore
            }
            setAlreadySeen(true);
        }, DELAY_MS);
        return () => clearTimeout(t);
    }, [alreadySeen, isInstalled, canPrompt]);

    // Escape closes it
    useEffect(() => {
        if (!visible) return;
        const onKey = (e) => {
            if (e.key === "Escape") setVisible(false);
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [visible]);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        try {
            deferredPrompt.prompt();
            await deferredPrompt.userChoice;
        } catch (e) {
            // ignore
        }
        window.__pwaPrompt = null;
        setDeferredPrompt(null);
        setVisible(false);
        // Tell the navbar button to update too
        window.dispatchEvent(new Event("pwa-install-ready"));
    };

    if (!visible || isInstalled) return null;

    return (
        <>
            <style>{`
        .ip {
          --ip-ink: #111111; --ip-ink-2: #3f3f3f; --ip-ink-3: #6f6f6f;
          --ip-accent: #e8ff47; --ip-on: #0a0a0b; --ip-rule: #e4e2da;
          position: fixed; z-index: 2147483647;
          left: 16px; right: 16px; bottom: 90px;
                    max-width: 400px; margin: 0 auto;
          background: #ffffff; color: var(--ip-ink);
          border: 1.5px solid var(--ip-ink); border-top: 5px solid var(--ip-accent);
          box-shadow: 6px 6px 0 var(--ip-accent);
          padding: 20px 20px 18px;
          font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
          animation: ip-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (min-width: 640px) { .ip { left: 24px; right: auto; bottom: 24px; margin: 0; } }
                        @keyframes ip-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        .ip *, .ip *::before, .ip *::after { box-sizing: border-box; }
        .ip__close {
          position: absolute; top: 10px; right: 10px; width: 30px; height: 30px;
          border: 1px solid var(--ip-ink); background: transparent; color: var(--ip-ink);
          font-size: 18px; line-height: 1; cursor: pointer;
        }
        .ip__close:hover { background: var(--ip-ink); color: #fff; }
        .ip__kicker {
          font-family: 'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace;
          font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--ip-ink-3); margin: 0 0 8px;
        }
        .ip__title {
          font-family: 'Playfair Display', Georgia, serif; font-weight: 800;
          font-size: 22px; line-height: 1.15; margin: 0 34px 8px 0;
        }
        .ip__title em { font-style: italic; background: linear-gradient(transparent 62%, var(--ip-accent) 62%); }
        .ip__text { font-size: 13.5px; line-height: 1.65; color: var(--ip-ink-2); margin: 0 0 16px; }
        .ip__steps { margin: 0 0 16px; padding: 0; list-style: none; font-size: 13.5px; line-height: 1.6; color: var(--ip-ink-2); }
        .ip__steps li { padding: 6px 0; border-top: 1px solid var(--ip-rule); }
        .ip__steps li:first-child { border-top: none; }
        .ip__actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .ip__btn {
          flex: 1 1 auto; display: inline-flex; align-items: center; justify-content: center;
          font-family: 'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace;
          font-size: 11.5px; letter-spacing: 0.06em; padding: 12px 16px; cursor: pointer;
          border: 1.5px solid var(--ip-ink); background: transparent; color: var(--ip-ink);
          transition: background 0.15s, color 0.15s;
        }
        .ip__btn:hover { background: var(--ip-ink); color: #fff; }
        .ip__btn--solid { background: var(--ip-accent); color: var(--ip-on); font-weight: 600; }
        .ip__btn--solid:hover { background: var(--ip-ink); color: var(--ip-accent); }
        .ip :focus-visible { outline: 2px solid var(--ip-ink); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { .ip { animation: none; } }
      `}</style>

            <div className="ip" role="dialog" aria-label="Install Sir-AD Blog">
                <button
                    type="button"
                    className="ip__close"
                    aria-label="Close"
                    onClick={() => setVisible(false)}
                >
                    &times;
                </button>

                <p className="ip__kicker">Install the app</p>
                <h2 className="ip__title">
                    Get Sir-AD Blog on your <em>home screen</em>
                </h2>

                {deferredPrompt ? (
                    <>
                        <p className="ip__text">
                            Open the blog in one tap, in its own full-screen window. It&apos;s free
                            and takes a few seconds, with no app store needed.
                        </p>
                        <div className="ip__actions">
                            <button
                                type="button"
                                className="ip__btn ip__btn--solid"
                                onClick={handleInstall}
                            >
                                Install app
                            </button>
                            <button
                                type="button"
                                className="ip__btn"
                                onClick={() => setVisible(false)}
                            >
                                Not now
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <ol className="ip__steps">
                            <li>1. Tap the <strong>Share</strong> icon in your browser.</li>
                            <li>2. Choose <strong>Add to Home Screen</strong>.</li>
                            <li>3. Tap <strong>Add</strong>.</li>
                        </ol>
                        <div className="ip__actions">
                            <button
                                type="button"
                                className="ip__btn ip__btn--solid"
                                onClick={() => setVisible(false)}
                            >
                                Got it
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}