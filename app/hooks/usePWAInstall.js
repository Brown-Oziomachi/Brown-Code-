import { useEffect, useState } from "react";

export default function usePWAInstall() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstalled, setIsInstalled] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Already running as an installed app?
        const standalone =
            window.matchMedia("(display-mode: standalone)").matches ||
            window.navigator.standalone === true;
        setIsInstalled(standalone);

        // iOS Safari has no install prompt API
        const ua = window.navigator.userAgent;
        setIsIOS(/iphone|ipad|ipod/i.test(ua) && !window.MSStream);

        const onBeforeInstall = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        const onInstalled = () => {
            setIsInstalled(true);
            setDeferredPrompt(null);
        };

        window.addEventListener("beforeinstallprompt", onBeforeInstall);
        window.addEventListener("appinstalled", onInstalled);
        return () => {
            window.removeEventListener("beforeinstallprompt", onBeforeInstall);
            window.removeEventListener("appinstalled", onInstalled);
        };
    }, []);

    const install = async () => {
        if (!deferredPrompt) return false;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        setDeferredPrompt(null);
        return outcome === "accepted";
    };

    return {
        canInstall: !!deferredPrompt,
        isInstalled,
        isIOS,
        install,
    };
}