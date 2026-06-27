"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Search, FileText, Clock, RefreshCw, CheckCircle } from "lucide-react";
import Footer from "@/components/footer";

const adPackages = [
    {
        id: "one-month",
        name: "1 Month",
        price: "₦25,000",
        amount: "25000",
        period: "/ month",
        tag: "Short campaign",
        features: [
            "1 sponsored article written for your brand",
            "Published and indexed on Google, Bing & Yandex",
            "Live for 30 days, then removed",
            "Link to your website or landing page",
            "Keyword-optimized for search visibility",
        ],
    },
    {
        id: "three-months",
        name: "3 Months",
        price: "₦60,000",
        amount: "60000",
        period: "/ 3 months",
        tag: "Most popular",
        accent: true,
        features: [
            "1 sponsored article written for your brand",
            "Published and indexed on Google, Bing & Yandex",
            "Live for 90 days, then removed",
            "Link to your website or landing page",
            "Keyword-optimized for your niche",
            "Renew at the end to stay listed",
        ],
    },
    {
        id: "six-months",
        name: "6 Months",
        price: "₦100,000",
        amount: "100000",
        period: "/ 6 months",
        tag: "Maximum exposure",
        features: [
            "1 sponsored article written for your brand",
            "Published and indexed on Google, Bing & Yandex",
            "Live for 180 days, then removed",
            "Link to your website or landing page",
            "Keyword-optimized for your niche",
            "Renew at the end to stay listed",
            "Brief performance note at 90 days",
        ],
    },
];

const stats = [
    { label: "Google Indexed", value: "80+", desc: "Pages live on Google" },
    { label: "Search Engines", value: "3", desc: "Google · Bing · Yandex" },
    { label: "Campaign Options", value: "3", desc: "1, 3, or 6 months" },
];

const engines = [
    {
        name: "Google",
        status: "Indexed",
        statusType: "live",
        desc: "80+ pages crawled and ranking in search results",
        detail: "Sitemap submitted · generateMetadata active · Search Console verified",
    },
    {
        name: "Bing",
        status: "Indexing",
        statusType: "live",
        desc: "80 URLs discovered via IndexNow",
        detail: "IndexNow active · Webmaster Tools verified · Crawling in progress",
    },
    {
        name: "Yandex",
        status: "Processing",
        statusType: "pending",
        desc: "Sitemap submitted and in processing queue",
        detail: "Verified · Sitemap accepted · 1–2 week processing window",
    },
];

const benefits = [
    {
        icon: <Search size={16} />,
        title: "Multi-Engine Indexed",
        desc: "Your article is published on a domain with 80+ indexed pages across Google, Bing, and Yandex — giving it an immediate trust signal with all major search engines.",
    },
    {
        icon: <FileText size={16} />,
        title: "Written For You",
        desc: "You don't write a word. Share your brand details and goals — we write a compelling, keyword-rich article that represents you professionally.",
    },
    {
        icon: <Clock size={16} />,
        title: "Time-Limited Placement",
        desc: "Your article stays live for your chosen campaign duration, then gets cleanly removed. No hidden commitments, no surprises.",
    },
    {
        icon: <RefreshCw size={16} />,
        title: "Renewable Anytime",
        desc: "If your campaign delivers value, simply renew before it expires to keep your brand visible without starting over.",
    },
];

const WHATSAPP = "2348142995114";

// ─── SDK loader — runs once, lifts state up to parent ────────────────────────

function usePayPalSDK() {
    const [sdkState, setSdkState] = useState("loading"); // loading | ready | error

    useEffect(() => {
        const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

        if (!clientId) {
            console.error("❌ NEXT_PUBLIC_PAYPAL_CLIENT_ID is not set in .env.local");
            setSdkState("error");
            return;
        }

        // Already on window (HMR / strict-mode double render)
        if (window.paypal) {
            setSdkState("ready");
            return;
        }

        // Script tag exists but hasn't fired onload yet — poll for it
        if (document.getElementById("paypal-sdk")) {
            const poll = setInterval(() => {
                if (window.paypal) {
                    clearInterval(poll);
                    setSdkState("ready");
                }
            }, 150);
            return () => clearInterval(poll);
        }

        // Fresh inject
        const script = document.createElement("script");
        script.id = "paypal-sdk";
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=capture`;
        script.async = true;
        script.onload = () => setSdkState("ready");
        script.onerror = () => {
            console.error("❌ PayPal SDK failed to load — check your Client ID.");
            setSdkState("error");
        };
        document.body.appendChild(script);
    }, []);

    return sdkState;
}

// ─── Per-package PayPal button ────────────────────────────────────────────────

function PackagePayPalButton({ pkg, sdkState }) {
    const containerRef = useRef(null);
    const rendered = useRef(false);
    const [payStatus, setPayStatus] = useState("idle");
    const [invoiceData, setInvoiceData] = useState(null);
    const [showInvoice, setShowInvoice] = useState(false);

    useEffect(() => {
        if (sdkState !== "ready") return;
        if (!containerRef.current || rendered.current) return;
        rendered.current = true;

        window.paypal.Buttons({
            style: {
                layout: "horizontal",
                color: "gold",
                shape: "rect",
                label: "pay",
                height: 40,
                tagline: false,
            },
            createOrder: async () => {
                const res = await fetch("/api/paypal/create-order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        packageId: pkg.id,
                        packageName: pkg.name,
                        amount: pkg.amount,
                        description: `Sir Brown AD — Sponsored Article (${pkg.name})`,
                    }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Order error");
                return data.orderID;
            },
            onApprove: async (data) => {
                const res = await fetch("/api/paypal/capture-order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ orderID: data.orderID }),
                });
                const capture = await res.json();
                if (!res.ok) throw new Error(capture.error || "Capture error");
                setInvoiceData({
                    transactionID: capture.transactionID,
                    payerEmail: capture.payerEmail,
                    amount: capture.amount,
                    packageName: pkg.name,
                    packageId: pkg.id,
                    ngnPrice: pkg.price,
                    date: new Date().toLocaleDateString("en-GB", {
                        day: "numeric", month: "long", year: "numeric"
                    }),
                    invoiceNo: `BC-${Date.now().toString().slice(-8)}`,
                });
                setPayStatus("success");
                setShowInvoice(true);
            },
            onCancel: () => setPayStatus("idle"),
            onError: (err) => {
                console.error(err);
                setPayStatus("error");
            },
        }).render(containerRef.current);
    }, [sdkState, pkg]);

    if (sdkState === "error") return <div className="ad-pay-unavailable">Online payment unavailable</div>;
    if (sdkState === "loading") return (
        <div className="ad-pay-loading">
            <span className="ad-pay-spinner" />Loading payment…
        </div>
    );

    return (
        <>
            {/* PayPal button or success badge */}
            {payStatus === "success" ? (
                <button
                    onClick={() => setShowInvoice(true)}
                    className="ad-pay-success"
                    style={{ cursor: "pointer", border: "1px solid rgba(74,222,128,0.2)", background: "rgba(74,222,128,0.07)", width: "100%" }}
                >
                    <CheckCircle size={13} />
                    <span>Paid ✓ — View Invoice</span>
                </button>
            ) : (
                <div>
                    <div className="ad-pay-label">Pay online</div>
                    <div ref={containerRef} style={{ minHeight: 44, width: "100%" }} />
                    {payStatus === "error" && <p className="ad-pay-error">Payment failed. Please try again.</p>}
                </div>
            )}

            {/* Invoice Modal */}
            {showInvoice && invoiceData && (
                <div className="inv-overlay" onClick={() => setShowInvoice(false)}>
                    <div className="inv-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="inv-print-area" id="invoice-print">
                            {/* Header */}
                            <div className="inv-header">
                                <div>
                                    <div className="inv-brand">Brown<span>.</span>Code</div>
                                    <div className="inv-brand-sub">browncode.name.ng</div>
                                </div>
                                <div className="inv-meta">
                                    <div className="inv-badge">RECEIPT</div>
                                    <div className="inv-no">#{invoiceData.invoiceNo}</div>
                                    <div className="inv-date">{invoiceData.date}</div>
                                </div>
                            </div>

                            <div className="inv-divider" />

                            {/* Billed to */}
                            <div className="inv-section">
                                <div className="inv-label">Billed to</div>
                                <div className="inv-value">{invoiceData.payerEmail || "—"}</div>
                            </div>

                            <div className="inv-divider" />

                            {/* Line item */}
                            <div className="inv-table">
                                <div className="inv-table-head">
                                    <span>Description</span>
                                    <span>Amount</span>
                                </div>
                                <div className="inv-table-row">
                                    <div>
                                        <div className="inv-item-title">Sir Brown AD — Sponsored Article</div>
                                        <div className="inv-item-sub">{invoiceData.packageName} package · 1 article indexed on Google, Bing & Yandex</div>
                                    </div>
                                    <div className="inv-item-price">
                                        <div>{invoiceData.ngnPrice}</div>
                                        <div className="inv-item-usd">${invoiceData.amount?.value} USD</div>
                                    </div>
                                </div>
                            </div>

                            <div className="inv-divider" />

                            {/* Total */}
                            <div className="inv-total-row">
                                <span className="inv-total-label">Total Paid</span>
                                <span className="inv-total-value">{invoiceData.ngnPrice}</span>
                            </div>

                            <div className="inv-divider" />

                            {/* TX */}
                            <div className="inv-section">
                                <div className="inv-label">Transaction ID</div>
                                <div className="inv-tx">{invoiceData.transactionID}</div>
                            </div>

                            <div className="inv-section">
                                <div className="inv-label">Payment Method</div>
                                <div className="inv-value">PayPal</div>
                            </div>

                            <div className="inv-divider" />

                            {/* Footer note */}
                            <div className="inv-note">
                                Thank you for your purchase. We'll be in touch within 24 hours to get your article started. Keep this receipt as proof of payment.
                            </div>

                            <div className="inv-footer-brand">Sir Brown AD · browncemmanuel@gmail.com · wa.me/2348142995114</div>
                        </div>

                        {/* Actions — hidden on print */}
                        <div className="inv-actions no-print">
                            <button className="inv-btn-print" onClick={() => window.print()}>
                                Download / Save as PDF
                            </button>
                            <button className="inv-btn-close" onClick={() => setShowInvoice(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Invoice + print styles */}
            <style>{`
                .inv-overlay {
                    position: fixed; inset: 0; z-index: 9999;
                    background: rgba(0,0,0,0.85);
                    display: flex; align-items: center; justify-content: center;
                    padding: 16px;
                }
                .inv-modal {
                    background: #fff; color: #111;
                    border-radius: 8px; width: 100%; max-width: 520px;
                    overflow: hidden;
                    box-shadow: 0 24px 80px rgba(0,0,0,0.5);
                }
                .inv-print-area { padding: 32px; }
                .inv-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
                .inv-brand { font-size: 22px; font-weight: 700; color: #0a0a0b; letter-spacing: -0.02em; }
                .inv-brand span { color: #b8963e; }
                .inv-brand-sub { font-size: 11px; color: #888; margin-top: 2px; }
                .inv-meta { text-align: right; }
                .inv-badge { display: inline-block; background: #0a0a0b; color: #e8ff47; font-size: 9px; font-weight: 700; letter-spacing: 0.12em; padding: 3px 8px; border-radius: 3px; margin-bottom: 6px; }
                .inv-no { font-size: 12px; font-weight: 600; color: #333; }
                .inv-date { font-size: 11px; color: #888; margin-top: 2px; }
                .inv-divider { height: 1px; background: #eee; margin: 16px 0; }
                .inv-section { margin-bottom: 12px; }
                .inv-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: #999; margin-bottom: 4px; }
                .inv-value { font-size: 13px; color: #222; }
                .inv-tx { font-size: 11px; font-family: monospace; color: #444; word-break: break-all; }
                .inv-table { margin: 4px 0; }
                .inv-table-head { display: flex; justify-content: space-between; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: #999; margin-bottom: 10px; }
                .inv-table-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
                .inv-item-title { font-size: 13px; font-weight: 600; color: #111; }
                .inv-item-sub { font-size: 11px; color: #777; margin-top: 3px; line-height: 1.5; }
                .inv-item-price { text-align: right; font-size: 14px; font-weight: 700; color: #111; flex-shrink: 0; }
                .inv-item-usd { font-size: 11px; font-weight: 400; color: #888; margin-top: 2px; }
                .inv-total-row { display: flex; justify-content: space-between; align-items: center; }
                .inv-total-label { font-size: 13px; font-weight: 600; color: #333; }
                .inv-total-value { font-size: 20px; font-weight: 700; color: #0a0a0b; }
                .inv-note { font-size: 11px; color: #777; line-height: 1.7; margin-bottom: 12px; }
                .inv-footer-brand { font-size: 10px; color: #bbb; text-align: center; }
                .inv-actions { display: flex; gap: 10px; padding: 16px 32px; border-top: 1px solid #eee; background: #fafafa; }
                .inv-btn-print { flex: 1; background: #0a0a0b; color: #e8ff47; border: none; border-radius: 6px; padding: 12px; font-size: 12px; font-weight: 600; cursor: pointer; letter-spacing: 0.04em; }
                .inv-btn-print:hover { opacity: 0.88; }
                .inv-btn-close { background: transparent; border: 1px solid #ddd; border-radius: 6px; padding: 12px 16px; font-size: 12px; color: #666; cursor: pointer; }
                .inv-btn-close:hover { background: #f5f5f5; }

                @media print {
                    body * { visibility: hidden !important; }
                    .inv-print-area, .inv-print-area * { visibility: visible !important; }
                    .inv-print-area { position: fixed; inset: 0; padding: 32px; background: #fff; }
                    .no-print { display: none !important; }
                }
            `}</style>
        </>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdvertiseClient() {
    const sdkState = usePayPalSDK();

    return (
        <>
            <style>{`
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                :root {
                    --bg:          #0a0a0b;
                    --surface:     #111113;
                    --border:      #1e1e22;
                    --border-hi:   #2e2e34;
                    --text-1:      #f4f4f5;
                    --text-2:      #a1a1aa;
                    --text-3:      #52525b;
                    --accent:      #e8ff47;
                    --accent-dim:  rgba(232,255,71,0.08);
                    --wa:          #25d366;
                    --wa-dim:      rgba(37,211,102,0.08);
                    --green:       #4ade80;
                    --yellow:      #facc15;
                    --radius:      6px;
                    --font-serif:  'DM Serif Display', 'Georgia', serif;
                    --font-sans:   'Inter', system-ui, sans-serif;
                    --font-mono:   'JetBrains Mono', 'Fira Code', monospace;
                }

                @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

                .ad-page { font-family: var(--font-sans); background: var(--bg); color: var(--text-1); min-height: 100vh; }

                .ad-nav {
                    position: sticky; top: 0; z-index: 100;
                    background: rgba(10,10,11,0.92); backdrop-filter: blur(12px);
                    border-bottom: 1px solid var(--border);
                    padding: 0 24px; height: 56px;
                    display: flex; align-items: center; justify-content: space-between;
                }
                .ad-nav__brand { font-family: var(--font-mono); font-size: 12px; font-weight: 500; letter-spacing: 0.08em; color: var(--text-1); text-decoration: none; }
                .ad-nav__brand em { font-style: normal; color: var(--accent); }
                .ad-nav__back { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; color: var(--text-2); text-decoration: none; padding: 6px 12px; border: 1px solid var(--border); border-radius: var(--radius); transition: color 0.15s, border-color 0.15s, background 0.15s; }
                .ad-nav__back:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }

                .ad-main { max-width: 1100px; margin: 0 auto; padding: 0 24px 80px; }

                .ad-masthead { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; padding: 52px 0 32px; border-bottom: 1px solid var(--border); margin-bottom: 48px; }
                .ad-masthead__eyebrow { font-family: var(--font-mono); font-size: 11px; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px; }
                .ad-masthead__title { font-family: var(--font-serif); font-size: clamp(36px, 5vw, 60px); font-weight: 400; line-height: 1.05; color: var(--text-1); }
                .ad-masthead__desc { font-size: 13px; color: var(--text-2); line-height: 1.6; max-width: 320px; text-align: right; }
                @media (max-width: 700px) { .ad-masthead { flex-direction: column; align-items: flex-start; } .ad-masthead__desc { text-align: left; } }

                .ad-section-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-3); display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
                .ad-section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }

                .ad-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; margin-bottom: 32px; }
                .ad-stat { background: var(--surface); padding: 24px 28px; display: flex; flex-direction: column; gap: 4px; transition: background 0.15s; }
                .ad-stat:hover { background: #141417; }
                .ad-stat__label { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-3); }
                .ad-stat__value { font-family: var(--font-serif); font-size: 36px; font-weight: 400; color: var(--accent); line-height: 1; }
                .ad-stat__desc { font-size: 11px; color: var(--text-3); margin-top: 2px; }

                .ad-engines { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; margin-bottom: 56px; }
                @media (max-width: 700px) { .ad-engines { grid-template-columns: 1fr; } }
                .ad-engine { background: var(--surface); padding: 24px 28px; display: flex; flex-direction: column; gap: 8px; transition: background 0.15s; position: relative; }
                .ad-engine:hover { background: #141417; }
                .ad-engine::after { content: ''; position: absolute; bottom: 0; left: 28px; right: 28px; height: 1px; background: var(--border); }
                .ad-engine__name { font-family: var(--font-serif); font-size: 20px; font-weight: 400; color: var(--text-1); letter-spacing: -0.01em; }
                .ad-engine__status { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; width: fit-content; padding: 3px 8px; border-radius: 3px; }
                .ad-engine__status--live { color: var(--green); background: rgba(74,222,128,0.08); border: 1px solid rgba(74,222,128,0.2); }
                .ad-engine__status--pending { color: var(--yellow); background: rgba(250,204,21,0.08); border: 1px solid rgba(250,204,21,0.2); }
                .ad-engine__dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
                .ad-engine__desc { font-size: 12px; color: var(--text-2); line-height: 1.5; }
                .ad-engine__detail { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); line-height: 1.6; letter-spacing: 0.02em; }

                .ad-why { background: var(--surface); border: 1px solid var(--border); border-left: 3px solid var(--accent); border-radius: var(--radius); padding: 32px; margin-bottom: 56px; }
                .ad-why__title { font-family: var(--font-serif); font-size: 24px; font-weight: 400; color: var(--text-1); margin-bottom: 16px; }
                .ad-why__body { font-size: 13px; color: var(--text-2); line-height: 1.8; max-width: 720px; }
                .ad-why__body p + p { margin-top: 12px; }

                .ad-timeline { display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; margin-bottom: 56px; }
                .ad-step { background: var(--surface); padding: 24px 28px; display: flex; align-items: flex-start; gap: 20px; border-bottom: 1px solid var(--border); transition: background 0.15s; }
                .ad-step:last-child { border-bottom: none; }
                .ad-step:hover { background: #141417; }
                .ad-step__num { font-family: var(--font-mono); font-size: 11px; font-weight: 600; color: var(--accent); background: var(--accent-dim); border: 1px solid rgba(232,255,71,0.2); border-radius: var(--radius); padding: 4px 10px; flex-shrink: 0; margin-top: 1px; letter-spacing: 0.06em; }
                .ad-step__title { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-1); font-weight: 600; margin-bottom: 4px; }
                .ad-step__desc { font-size: 12px; color: var(--text-2); line-height: 1.65; }

                .ad-benefits { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; margin-bottom: 56px; }
                @media (max-width: 600px) { .ad-benefits { grid-template-columns: 1fr; } }
                .ad-benefit { background: var(--surface); padding: 28px 24px; display: flex; flex-direction: column; gap: 10px; transition: background 0.15s; position: relative; }
                .ad-benefit:hover { background: #141417; }
                .ad-benefit::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: var(--accent); border-radius: 1px; transform: scaleY(0); transform-origin: bottom; transition: transform 0.2s ease; }
                .ad-benefit:hover::before { transform: scaleY(1); }
                .ad-benefit__icon { width: 36px; height: 36px; border-radius: var(--radius); background: var(--accent-dim); border: 1px solid rgba(232,255,71,0.2); display: flex; align-items: center; justify-content: center; color: var(--accent); }
                .ad-benefit__title { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-1); font-weight: 600; }
                .ad-benefit__desc { font-size: 12px; color: var(--text-2); line-height: 1.65; }

                .ad-packages { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; margin-bottom: 56px; }
                @media (max-width: 860px) { .ad-packages { grid-template-columns: 1fr; } }
                .ad-package { background: var(--surface); padding: 28px 24px; display: flex; flex-direction: column; gap: 20px; transition: background 0.15s; }
                .ad-package:hover { background: #141417; }
                .ad-package--accent { background: #0f120a; border-left: 2px solid var(--accent); }
                .ad-package--accent:hover { background: #12150b; }
                .ad-package__tag { display: inline-flex; align-items: center; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 8px; border-radius: 3px; background: var(--accent-dim); color: var(--accent); border: 1px solid rgba(232,255,71,0.2); width: fit-content; }
                .ad-package__name { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-3); }
                .ad-package__price { font-family: var(--font-serif); font-size: 36px; font-weight: 400; color: var(--text-1); line-height: 1; }
                .ad-package__price span { font-family: var(--font-mono); font-size: 12px; color: var(--text-3); }
                .ad-package__duration { font-family: var(--font-mono); font-size: 10px; color: var(--accent); letter-spacing: 0.06em; margin-top: 4px; }
                .ad-package__divider { height: 1px; background: var(--border); }
                .ad-package__features { display: flex; flex-direction: column; gap: 10px; flex: 1; }
                .ad-package__feature { display: flex; align-items: flex-start; gap: 8px; font-size: 12px; color: var(--text-2); line-height: 1.5; }
                .ad-package__check { color: var(--accent); flex-shrink: 0; margin-top: 1px; }
                .ad-package__actions { display: flex; flex-direction: column; gap: 8px; }
                .ad-package__cta { display: inline-flex; align-items: center; justify-content: center; gap: 6px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; padding: 10px 20px; border-radius: var(--radius); border: 1px solid var(--border); background: transparent; color: var(--text-2); cursor: pointer; text-decoration: none; transition: color 0.15s, border-color 0.15s, background 0.15s; width: 100%; }
                .ad-package__cta:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }
                .ad-package__cta--accent { background: var(--accent); border-color: var(--accent); color: #0a0a0b; font-weight: 600; }
                .ad-package__cta--accent:hover { opacity: 0.88; background: var(--accent); }
                .ad-package__cta--wa { border-color: rgba(37,211,102,0.4); color: var(--wa); background: var(--wa-dim); }
                .ad-package__cta--wa:hover { background: rgba(37,211,102,0.15); border-color: var(--wa); color: var(--wa); }

                /* ── PayPal slot ── */
                .ad-pay-divider { height: 1px; background: var(--border); margin: 4px 0 10px; }
                .ad-pay-label { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-bottom: 8px; }
                .ad-pay-success { display: flex; align-items: center; gap: 7px; font-family: var(--font-mono); font-size: 11px; color: var(--green); background: rgba(74,222,128,0.07); border: 1px solid rgba(74,222,128,0.2); border-radius: var(--radius); padding: 10px 14px; }
                .ad-pay-error { font-family: var(--font-mono); font-size: 10px; color: #ff6b6b; margin-top: 6px; letter-spacing: 0.03em; }
                .ad-pay-unavailable { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); letter-spacing: 0.06em; padding: 12px 0; text-align: center; border: 1px dashed var(--border); border-radius: var(--radius); }
                .ad-pay-loading { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 10px; color: var(--text-3); letter-spacing: 0.06em; padding: 12px 0; }
                .ad-pay-spinner { width: 12px; height: 12px; border: 2px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.7s linear infinite; flex-shrink: 0; }
                @keyframes spin { to { transform: rotate(360deg); } }

                /* ── Contact CTA ── */
                .ad-contact { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 40px 32px; display: flex; align-items: center; justify-content: space-between; gap: 24px; margin-bottom: 56px; }
                @media (max-width: 600px) { .ad-contact { flex-direction: column; align-items: flex-start; } }
                .ad-contact__title { font-family: var(--font-serif); font-size: 26px; font-weight: 400; color: var(--text-1); margin-bottom: 6px; }
                .ad-contact__sub { font-size: 13px; color: var(--text-3); }
                .ad-contact__email { font-family: var(--font-mono); font-size: 12px; color: var(--accent); margin-top: 8px; letter-spacing: 0.04em; }
                .ad-contact__actions { display: flex; flex-direction: column; gap: 10px; flex-shrink: 0; }
                .ad-btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; padding: 11px 22px; border-radius: var(--radius); background: var(--accent); border: 1px solid var(--accent); color: #0a0a0b; font-weight: 600; text-decoration: none; transition: opacity 0.15s, transform 0.1s; white-space: nowrap; }
                .ad-btn:hover { opacity: 0.88; transform: translateY(-1px); }
                .ad-btn--wa { background: var(--wa); border-color: var(--wa); color: #fff; }
                .ad-btn--wa:hover { opacity: 0.88; transform: translateY(-1px); }

                .ad-footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; padding-top: 40px; margin-top: 48px; border-top: 1px solid var(--border); }
                .ad-footer__info { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); letter-spacing: 0.06em; }
                .ad-footer__actions { display: flex; gap: 10px; flex-wrap: wrap; }
                .ad-footer-btn { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; padding: 8px 16px; border-radius: var(--radius); border: 1px solid var(--border); background: transparent; color: var(--text-2); cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: color 0.15s, border-color 0.15s, background 0.15s; text-decoration: none; }
                .ad-footer-btn:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }
                .ad-footer-btn--accent { border-color: rgba(232,255,71,0.3); color: var(--accent); background: var(--accent-dim); }
                .ad-footer-btn--accent:hover { background: rgba(232,255,71,0.15); border-color: rgba(232,255,71,0.5); }
            `}</style>

            <div className="ad-page">
                <nav className="ad-nav">
                    <a href="/" className="ad-nav__brand">brown<em>.</em>dev</a>
                    <a href="/blog" className="ad-nav__back"><ArrowLeft size={13} /> Blog</a>
                </nav>

                <main className="ad-main">
                    <header className="ad-masthead">
                        <div>
                            <p className="ad-masthead__eyebrow">Sponsored Content</p>
                            <h1 className="ad-masthead__title">Get Your Brand<br />On Google, Bing<br />& Yandex</h1>
                        </div>
                        <p className="ad-masthead__desc">We write and publish a sponsored article about your business — indexed across Google, Bing, and Yandex for 1, 3, or 6 months, then removed cleanly.</p>
                    </header>

                    <p className="ad-section-label">At a glance</p>
                    <div className="ad-stats">
                        {stats.map((s) => (
                            <div key={s.label} className="ad-stat">
                                <span className="ad-stat__label">{s.label}</span>
                                <span className="ad-stat__value">{s.value}</span>
                                <span className="ad-stat__desc">{s.desc}</span>
                            </div>
                        ))}
                    </div>

                    <p className="ad-section-label">Search engine coverage</p>
                    <div className="ad-engines">
                        {engines.map((e) => (
                            <div key={e.name} className="ad-engine">
                                <span className="ad-engine__name">{e.name}</span>
                                <span className={`ad-engine__status ad-engine__status--${e.statusType}`}>
                                    <span className="ad-engine__dot" />{e.status}
                                </span>
                                <span className="ad-engine__desc">{e.desc}</span>
                                <span className="ad-engine__detail">{e.detail}</span>
                            </div>
                        ))}
                    </div>

                    <div className="ad-why">
                        <div className="ad-why__title">How this works</div>
                        <div className="ad-why__body">
                            <p>You choose a campaign duration — 1, 3, or 6 months. We write a keyword-optimized article about your brand and publish it on this domain, which has 80+ pages actively indexed across Google, Bing, and Yandex. Your article goes live, gets crawled by all three engines, and starts appearing in relevant search results.</p>
                            <p>When your campaign ends, the article is cleanly removed. No awkward permanent footprint, no lingering outdated content about your brand. If the placement delivered value, you simply renew before expiry to keep your visibility running.</p>
                            <p>You provide your brand name, website, and the message or keywords you want to target. We handle the writing, publishing, and indexing across Google, Bing, and Yandex — you get search visibility without writing a single word.</p>
                        </div>
                    </div>

                    <p className="ad-section-label">The process</p>
                    <div className="ad-timeline">
                        {[
                            { num: "01", title: "Pick your duration", desc: "Choose 1, 3, or 6 months depending on your campaign goals and budget." },
                            { num: "02", title: "Send your brand details", desc: "Share your business name, website, target keywords, and what you want the article to communicate." },
                            { num: "03", title: "We write and publish", desc: "We write a professional, keyword-optimized article and publish it. Google, Bing, and Yandex index it within days." },
                            { num: "04", title: "Campaign ends, article removed", desc: "At the end of your chosen period, the article is taken down cleanly. Renew anytime to continue." },
                        ].map((step) => (
                            <div key={step.num} className="ad-step">
                                <span className="ad-step__num">{step.num}</span>
                                <div>
                                    <div className="ad-step__title">{step.title}</div>
                                    <div className="ad-step__desc">{step.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="ad-section-label">What you get</p>
                    <div className="ad-benefits">
                        {benefits.map((b) => (
                            <div key={b.title} className="ad-benefit">
                                <div className="ad-benefit__icon">{b.icon}</div>
                                <div className="ad-benefit__title">{b.title}</div>
                                <div className="ad-benefit__desc">{b.desc}</div>
                            </div>
                        ))}
                    </div>

                    <p className="ad-section-label">Pricing</p>
                    <div className="ad-packages">
                        {adPackages.map((pkg) => (
                            <div key={pkg.id} className={`ad-package${pkg.accent ? " ad-package--accent" : ""}`}>
                                <div><div className="ad-package__tag">{pkg.tag}</div></div>
                                <div>
                                    <div className="ad-package__name">{pkg.name}</div>
                                    <div className="ad-package__price">{pkg.price} <span>{pkg.period}</span></div>
                                    <div className="ad-package__duration">
                                        1 article · live for {pkg.id === "one-month" ? "30" : pkg.id === "three-months" ? "90" : "180"} days
                                    </div>
                                </div>
                                <div className="ad-package__divider" />
                                <div className="ad-package__features">
                                    {pkg.features.map((f) => (
                                        <div key={f} className="ad-package__feature">
                                            <CheckCircle size={13} className="ad-package__check" />
                                            <span>{f}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="ad-package__actions">
                                    <a
                                        href={`mailto:browncemmanuel@gmail.com?subject=Sponsored Article Inquiry — ${pkg.name} Package`}
                                        className={`ad-package__cta${pkg.accent ? " ad-package__cta--accent" : ""}`}
                                    >
                                        Email us <ArrowUpRight size={12} />
                                    </a>
                                    <a
                                        href={`https://wa.me/${WHATSAPP}?text=Hi%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20sponsored%20article%20package.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ad-package__cta ad-package__cta--wa"
                                    >
                                        WhatsApp <ArrowUpRight size={12} />
                                    </a>
                                    <div className="ad-pay-divider" />
                                    {/* sdkState passed down — button only renders when ready */}
                                    <PackagePayPalButton pkg={pkg} sdkState={sdkState} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="ad-contact">
                        <div>
                            <div className="ad-contact__title">Not sure which duration fits?</div>
                            <div className="ad-contact__sub">Reach out and we'll help you pick the right campaign length for your goals.</div>
                            <div className="ad-contact__email">Sir Brown AD</div>
                        </div>
                        <div className="ad-contact__actions">
                            <a href="mailto:browncemmanuel@gmail.com?subject=Sponsored Content Inquiry" className="ad-btn">
                                Email us <ArrowUpRight size={13} />
                            </a>
                            <a href={`https://wa.me/${WHATSAPP}?text=Hi%2C%20I%27m%20interested%20in%20advertising%20on%20Brown%20Code.`} target="_blank" rel="noopener noreferrer" className="ad-btn ad-btn--wa">
                                WhatsApp <ArrowUpRight size={13} />
                            </a>
                        </div>
                    </div>

                    <footer className="ad-footer">
                        <span className="ad-footer__info">brown.dev — indexed on Google · Bing · Yandex</span>
                        <div className="ad-footer__actions">
                            <a href="/bc/contact" className="ad-footer-btn ad-footer-btn--accent">Contact directly</a>
                            <a href="/blog" className="ad-footer-btn"><ArrowLeft size={13} /> Back to blog</a>
                        </div>
                    </footer>
                </main>
            </div>

            <Footer />
        </>
    );
}