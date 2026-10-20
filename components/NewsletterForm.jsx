"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db1 } from "@/config/firebase.config1";

// If your existing NewsletterCapture already saves to a collection, set this to the same name
const COLLECTION = "newsletter";
const EMAIL_RE = /^[^\s@/]+@[^\s@/]+\.[^\s@/]{2,}$/;

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [trap, setTrap] = useState(""); // honeypot, real people leave it empty
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;

    const clean = email.trim().toLowerCase();
    if (!EMAIL_RE.test(clean) || clean.length > 254) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }
    if (trap) {
      setStatus("done");
      return;
    }

    setStatus("loading");
    try {
      await setDoc(doc(db1, COLLECTION, clean), {
        email: clean,
        source: "newsletter-page",
        createdAt: serverTimestamp(),
      });
      setStatus("done");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage(
        err?.code === "permission-denied"
          ? "You may already be on the list. If not, try again later."
          : "Something went wrong. Please try again.",
      );
    }
  };

  if (status === "done") {
    return (
      <div className="nl-done" role="status">
        <span className="nl-done__icon">
          <Check size={18} />
        </span>
        <div>
          <strong>You&apos;re on the list.</strong>
          <p>Thanks for subscribing. Watch your inbox.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="nl-form" onSubmit={onSubmit} noValidate>
      <label htmlFor="nl-email" className="nl-form__label">
        Email address
      </label>
      <div className="nl-form__row">
        <input
          id="nl-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          className="nl-form__input"
          required
        />
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
          className="nl-form__trap"
          aria-hidden="true"
        />
        <button
          type="submit"
          className="nl-btn nl-btn--solid"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            "Subscribing…"
          ) : (
            <>
              Subscribe <ArrowRight size={13} />
            </>
          )}
        </button>
      </div>
      {status === "error" && (
        <p className="nl-form__error" role="alert">
          {message}
        </p>
      )}
      <p className="nl-form__fine">Free. No spam.</p>
    </form>
  );
}
