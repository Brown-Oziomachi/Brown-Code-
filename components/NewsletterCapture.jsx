"use client";

import { useState, useEffect } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { doc, setDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { db1 } from "@/config/firebase.config1";
import Link from "next/link";
import { Heart } from "lucide-react";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// `categoryKey` / `categoryLabel` come from the article this is rendered
// inside (e.g. getCategoryKey(article), CATEGORY_LABELS[...]). `articleSlug`
// is optional — just used so you can see which article drove each signup.
export default function NewsletterCapture({
  categoryKey,
  categoryLabel,
  articleSlug,
}) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState(""); // bots fill this in, humans never see it
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

     useEffect(() => {
    const subscribed = localStorage.getItem("nc_subscribed_email");
    if (subscribed) {
      setEmail(subscribed);
      setStatus("success");
    }
     }, []);
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return; // silently drop bot submissions, no error shown

    if (!isValidEmail(email)) {
      setStatus("error");
      setErrorMsg("Enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const docId = email.trim().toLowerCase();
      const subRef = doc(db1, "blogSubscribers", docId);

      // Using the email as the doc ID means resubscribing from a different
      // article just adds another category to the same subscriber instead
      // of creating a duplicate record.
      await setDoc(
        subRef,
        {
          email: docId,
          categories: arrayUnion(categoryKey),
          ...(articleSlug ? { sourceArticles: arrayUnion(articleSlug) } : {}),
          lastSubscribedAt: serverTimestamp(),
        },
        { merge: true },
      );

     localStorage.setItem("nc_subscribed_email", docId);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <style>{`
        .nc-box {
          margin: 32px 0;
          padding: 22px 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
        }

        .nc-box--success {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          border-color: rgba(232,255,71,0.3);
          background: var(--accent-dim);
        }

        .nc-success-icon {
          color: var(--accent);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .nc-success-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-1);
          margin-bottom: 4px;
        }

        .nc-success-text {
          font-size: 13px;
          color: var(--text-2);
          line-height: 1.5;
        }

        .nc-box__header {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 16px;
        }

        .nc-box__icon {
          color: var(--accent);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .nc-box__title {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-1);
          margin-bottom: 3px;
        }

        .nc-box__subtitle {
          font-size: 12px;
          color: var(--text-3);
          line-height: 1.5;
        }

        .nc-form {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .nc-honeypot {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          opacity: 0;
        }

        .nc-input {
          flex: 1;
          min-width: 180px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 10px 14px;
          font-family: var(--font-sans);
          font-size: 13px;
          color: var(--text-1);
          outline: none;
          transition: border-color 0.15s;
        }

        .nc-input:focus {
          border-color: var(--border-hi);
        }

        .nc-input::placeholder {
          color: var(--text-3);
        }

        .nc-input:disabled {
          opacity: 0.6;
        }

        .nc-btn {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 10px 18px;
          border-radius: var(--radius);
          border: 1px solid rgba(232,255,71,0.3);
          background: var(--accent-dim);
          color: var(--accent);
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.15s, border-color 0.15s;
        }

        .nc-btn:hover:not(:disabled) {
          background: rgba(232,255,71,0.15);
          border-color: rgba(232,255,71,0.5);
        }

        .nc-btn:disabled {
          opacity: 0.6;
          cursor: default;
        }

        .nc-error {
          margin-top: 10px;
          font-size: 12px;
          color: #f87171;
        }

        @media (max-width: 480px) {
          .nc-form { flex-direction: column; }
          .nc-btn { width: 100%; }
        }
      `}</style>

      {status === "success" ? (
        <div className="nc-box nc-box--success">
          <CheckCircle2 size={18} className="nc-success-icon" />
          <div>
            <p className="nc-success-title">You're subscribed</p>
            <p className="nc-success-text">
              You'll get new {categoryLabel} articles like this one straight to
              your inbox.
            </p>
          </div>
        </div>
      ) : (
        <div className="nc-box">
          <div className="nc-box__header">
            <Mail size={16} className="nc-box__icon" />
            <div>
              <p className="nc-box__title">Get new {categoryLabel} alerts</p>
              <p className="nc-box__subtitle">
                One email when a new {categoryLabel?.toLowerCase()} article like
                this one goes live. No spam, unsubscribe anytime.
              </p>
            </div>
          </div>
          <form className="nc-form" onSubmit={handleSubmit}>
            {/* Honeypot field — invisible to real users, bots fill it in */}
            <input
              type="text"
              name="company"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="nc-honeypot"
              tabIndex={-1}
              autoComplete="off"
            />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="nc-input"
              disabled={status === "submitting"}
              required
            />
            <button
              type="submit"
              className="nc-btn"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Subscribing…" : "Subscribe"}
            </button>
       
          </form>
          {status === "error" && <p className="nc-error">{errorMsg}</p>}

        </div>
      )}
    </>
  );
}
