// app/api/paypal/capture-order/route.js
import { db1 } from "@/config/firebase.config1";
import { NextResponse } from "next/server";

const PAYPAL_BASE = "https://api-m.paypal.com";

async function getAccessToken() {
    const credentials = Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
    });

    if (!res.ok) throw new Error("Failed to get PayPal access token");
    const data = await res.json();
    return data.access_token;
}

export async function POST(req) {
    try {
        const { orderID } = await req.json();
        if (!orderID) {
            return NextResponse.json({ error: "orderID is required" }, { status: 400 });
        }

        const accessToken = await getAccessToken();

        const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderID}/capture`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("PayPal capture error:", data);
            return NextResponse.json(
                { error: data.message || "Capture failed" },
                { status: 400 }
            );
        }

        // Extract the transaction ID from the capture response
        const capture = data.purchase_units?.[0]?.payments?.captures?.[0];
        const transactionID = capture?.id;
        const captureStatus = capture?.status; // COMPLETED, PENDING, DECLINED

        // ── Optional: save to your DB / Firestore here ──────────────────────
        await db1.collection("ad_payments").add({
            transactionID,
            orderID,
            status: captureStatus,
            amount: capture?.amount,
            payerEmail: data.payment_source?.paypal?.email_address,
            createdAt: new Date(),
        });

        // ── Optional: send confirmation email via Nodemailer / Resend ────────
        // await sendConfirmationEmail({ transactionID, ... });

        return NextResponse.json({
            transactionID,
            status: captureStatus,
            amount: capture?.amount,
            payerEmail: data.payment_source?.paypal?.email_address,
        });

    } catch (err) {
        console.error("capture-order route error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}