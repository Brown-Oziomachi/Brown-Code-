import Link from "next/link";

export default function NotFound() {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "3rem 1.5rem",
                background: "#0a0a0a",
                color: "#f5f5f5",
                fontFamily: "system-ui, -apple-system, sans-serif",
            }}
        >
            <span
                style={{
                    fontSize: "0.85rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#888",
                    marginBottom: "1rem",
                }}
            >
                Brown Code
            </span>

            <h1
                style={{
                    fontSize: "clamp(3rem, 8vw, 5.5rem)",
                    fontWeight: 800,
                    margin: 0,
                    lineHeight: 1,
                    background: "linear-gradient(135deg, #f5f5f5 0%, #888 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                404
            </h1>

            <p
                style={{
                    fontSize: "1.15rem",
                    margin: "1rem 0 0.5rem",
                    maxWidth: "480px",
                    color: "#ccc",
                }}
            >
                This page doesn&apos;t exist — but you&apos;ve landed on{" "}
                <strong style={{ color: "#fff" }}>Sir Brown AD&apos;s</strong> blog.
            </p>

            <p
                style={{
                    fontSize: "0.95rem",
                    margin: "0 0 2.5rem",
                    maxWidth: "460px",
                    color: "#888",
                    lineHeight: 1.6,
                }}
            >
                I write about fraud awareness, fintech security, and full-stack
                development in Nigeria. While you&apos;re here, take a look around.
            </p>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                    justifyContent: "center",
                    marginBottom: "3rem",
                }}
            >
                <Link
                    href="/"
                    style={{
                        padding: "0.7rem 1.6rem",
                        borderRadius: "8px",
                        background: "#fff",
                        color: "#0a0a0a",
                        textDecoration: "none",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                    }}
                >
                    Go home
                </Link>
                <Link
                    href="/blog"
                    style={{
                        padding: "0.7rem 1.6rem",
                        borderRadius: "8px",
                        background: "transparent",
                        border: "1px solid #333",
                        color: "#f5f5f5",
                        textDecoration: "none",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                    }}
                >
                    Read the blog
                </Link>
            </div>

            <div
                style={{
                    borderTop: "1px solid #222",
                    paddingTop: "1.5rem",
                    width: "100%",
                    maxWidth: "420px",
                }}
            >
                <p
                    style={{
                        fontSize: "0.8rem",
                        color: "#666",
                        margin: 0,
                    }}
                >
                    Or explore recent posts:
                </p>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        marginTop: "0.75rem",
                    }}
                >
                    <Link
                        href="/blog/how-laundered-money-betting-crypto-gets-traced-nigeria"
                        style={{ color: "#aaa", fontSize: "0.9rem", textDecoration: "none" }}
                    >
                        How stolen money gets traced through betting and crypto →
                    </Link>
                    <Link
                        href="/blog/moniepoint-opay-fake-transfer-alert-nigeria"
                        style={{ color: "#aaa", fontSize: "0.9rem", textDecoration: "none" }}
                    >
                        Moniepoint and OPay fake transfer alerts →
                    </Link>
                </div>
            </div>
        </div>
    );
}