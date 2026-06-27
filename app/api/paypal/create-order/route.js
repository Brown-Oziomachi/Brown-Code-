// app/api/paypal/create-order/route.js
import { NextResponse } from "next/server";

// Switch to "https://api-m.paypal.com" when going live
const PAYPAL_BASE = "https://api-m.paypal.com";
// NGN → USD conversion (update this rate periodically or fetch live)
// As of mid-2025: ~1 USD ≈ 1600 NGN
const NGN_TO_USD_RATE = 1600;

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

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error_description || "Failed to get PayPal access token");
    }

    const data = await res.json();
    return data.access_token;
}

export async function POST(req) {
    try {
        const { packageId, packageName, amount, description } = await req.json();

        // Convert NGN to USD for PayPal (PayPal processes in USD for Nigerian merchants)
        const ngnAmount = parseFloat(amount);
        const usdAmount = (ngnAmount / NGN_TO_USD_RATE).toFixed(2);

        const accessToken = await getAccessToken();

        const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                "PayPal-Request-Id": `browncode-${packageId}-${Date.now()}`, // idempotency key
            },
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        reference_id: packageId,
                        description: description || `Sir Brown AD — ${packageName} Sponsored Article`,
                        amount: {
                            currency_code: "USD",
                            value: usdAmount,
                        },
                        // Optional: your PayPal email to receive funds
                        // payee: { email_address: "your-paypal@email.com" },
                    },
                ],
                application_context: {
                    brand_name: "Sir Brown AD",
                    landing_page: "NO_PREFERENCE",
                    user_action: "PAY_NOW",
                    return_url: "https://browncode.name.ng/advertise?status=success",
                    cancel_url: "https://browncode.name.ng/advertise?status=cancelled",
                },
            }),
        });

        const order = await res.json();

        if (!res.ok) {
            console.error("PayPal create-order error:", order);
            return NextResponse.json(
                { error: order.message || "Failed to create order" },
                { status: 400 }
            );
        }

        return NextResponse.json({
            orderID: order.id,
            usdAmount, // useful for client-side display
        });

    } catch (err) {
        console.error("create-order route error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}