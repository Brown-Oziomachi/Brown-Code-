"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, Terminal, Mail, Network } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth1 } from "@/config/firebase.config1";

export default function FloatingClient({ onChatOpen }) {
    const [showContactIcons, setShowContactIcons] = useState(false);
    const contactRef = useRef(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const autoChatActive = searchParams.get("autochat");
        if (autoChatActive === "true") {
            onChatOpen();
            router.replace("/", { scroll: false });
        }
    }, [searchParams, onChatOpen, router]);

    const handleChatClick = () => {
        setShowContactIcons(false);
        const user = auth1.currentUser;
        if (user) {
            onChatOpen();
        } else {
            router.push("/signup?redirect=open-chat");
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (contactRef.current && !contactRef.current.contains(event.target)) {
                setShowContactIcons(false);
            }
        };
        if (showContactIcons) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showContactIcons]);

    return (
        <>
            <style>{`
        .fc-wrap {
          --fc-card: #ffffff;
          --fc-card-2: #f6f5f0;
          --fc-ink: #111111;
          --fc-ink-2: #3f3f3f;
          --fc-ink-3: #6f6f6f;
          --fc-rule: #e4e2da;
          --fc-accent: #e8ff47;
          --fc-on: #0a0a0b;
          --fc-mono: 'JetBrains Mono', 'Fira Code', monospace;

          position: fixed; bottom: 24px; right: 24px;
          z-index: 9999; font-family: var(--fc-mono);
        }
        .fc-wrap *, .fc-wrap *::before, .fc-wrap *::after { box-sizing: border-box; }

        .fc-stack { display: flex; flex-direction: column; align-items: flex-end; }

        /* Sub-actions */
        .fc-actions {
          display: flex; flex-direction: column; gap: 10px; margin-bottom: 12px;
          animation: fcSlideUp 0.2s ease-out both;
        }
        @keyframes fcSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .fc-action-btn {
          display: flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; border-radius: 50%;
          border: 1.5px solid var(--fc-ink);
          background: var(--fc-card);
          color: var(--fc-ink);
          box-shadow: 0 6px 18px rgba(0,0,0,0.12);
          cursor: pointer; text-decoration: none;
          transition: color 0.15s, background 0.15s, transform 0.15s, box-shadow 0.15s;
          position: relative;
        }
        .fc-action-btn:hover {
          color: var(--fc-on);
          background: var(--fc-accent);
          transform: scale(1.08);
          box-shadow: 0 8px 22px rgba(0,0,0,0.16);
        }

        .fc-action-btn__tooltip {
          position: absolute; right: 54px;
          font-family: var(--fc-mono); font-size: 9px;
          letter-spacing: 0.08em; text-transform: uppercase;
          background: var(--fc-card); color: var(--fc-ink);
          border: 1px solid var(--fc-ink);
          padding: 3px 8px;
          white-space: nowrap; pointer-events: none;
          opacity: 0; transition: opacity 0.15s;
        }
        .fc-action-btn:hover .fc-action-btn__tooltip { opacity: 1; }

        /* Main trigger */
        .fc-trigger {
          display: flex; align-items: center; justify-content: center;
          width: 52px; height: 52px; border-radius: 50%;
          background: var(--fc-card);
          border: 1.5px solid var(--fc-ink);
          color: var(--fc-ink);
          box-shadow: 0 6px 18px rgba(0,0,0,0.14);
          cursor: pointer; position: relative;
          transition: color 0.15s, background 0.15s, transform 0.15s;
        }
        .fc-trigger:hover {
          color: var(--fc-on);
          background: var(--fc-accent);
        }
        .fc-trigger--open {
          background: var(--fc-ink);
          color: #fff;
        }
        .fc-trigger--open:hover {
          background: var(--fc-ink);
          color: var(--fc-accent);
        }

        .fc-ping {
          position: absolute; inset: 0; border-radius: 50%;
          background: rgba(232,255,71,0.55);
          animation: fcPing 2s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes fcPing {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.5); opacity: 0; }
        }

        .fc-wrap :focus-visible { outline: 2px solid var(--fc-ink); outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) { .fc-wrap * { transition: none !important; animation: none !important; } }
      `}</style>

            <div className="fc-wrap">
                <div ref={contactRef} className="fc-stack">

                    {showContactIcons && (
                        <div className="fc-actions">
                            {/* WhatsApp */}
                            <a
                                href="https://wa.me/2348142995114"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="fc-action-btn"
                                title="WhatsApp"
                            >
                                <svg style={{ width: 18, height: 18, fill: "currentColor" }} viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                <span className="fc-action-btn__tooltip">WhatsApp</span>
                            </a>

                            {/* Email */}
                            <a
                                href="mailto:browncemmanuel@gmail.com"
                                className="fc-action-btn"
                                title="Email"
                            >
                                <Mail size={17} />
                                <span className="fc-action-btn__tooltip">Email</span>
                            </a>

                            {/* Book a meeting */}
                            <a
                                href="https://cal.com/sir-brown"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="fc-action-btn"
                                title="Meet With Me"
                            >
                                <Network size={17} />
                                <span className="fc-action-btn__tooltip">Meet With Me</span>
                            </a>
                        </div>
                    )}

                    {/* Main trigger */}
                    <button
                        onClick={() => setShowContactIcons(!showContactIcons)}
                        aria-label="Toggle communications"
                        className={`fc-trigger${showContactIcons ? " fc-trigger--open" : ""}`}
                    >
                        {showContactIcons ? (
                            <X size={18} />
                        ) : (
                            <>
                                <Terminal size={18} style={{ position: "relative", zIndex: 1 }} />
                                <span className="fc-ping" />
                            </>
                        )}
                    </button>

                </div>
            </div>
        </>
    );
}