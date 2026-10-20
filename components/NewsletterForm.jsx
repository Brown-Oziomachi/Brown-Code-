"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Check } from "lucide-react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db1 } from "@/config/firebase.config1";

// If your existing NewsletterCapture already saves to a collection, set this to the same name
const COLLECTION = "newsletter";
const STORAGE_KEY = "nl_subscribed_email";
const EMAIL_RE = /^[^\s@/]+@[^\s@/]+\.[^\s@/]{2,}$/;

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [trap, setTrap] = useState(""); // honeypot, real people leave it empty
  const [status, setStatus] = useState("idle"); // idle | loading | done | exists | error
  const [message, setMessage] = useState("");

  // If this browser already subscribed, skip the form entirely
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) setStatus("exists");
    } catch {
      /* storage blocked, ignore */
    }
  }, []);

  const remember = (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* storage blocked, ignore */
    }
  };

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
      // The email is the document ID, and your Firestore rules only allow
      // `create` (update is false). So if this email already exists,
      // Firestore rejects the write with "permission-denied".
      await setDoc(doc(db1, COLLECTION, clean), {
        email: clean,
        source: "newsletter-page",
        createdAt: serverTimestamp(),
      });
      remember(clean);
      setStatus("done");
      setEmail("");
    } catch (err) {
      if (err?.code === "permission-denied") {
        // Valid email (checked above) + rejected write = already subscribed
        remember(clean);
        setEmail("");
        setStatus("exists");
        return;
      }
      console.error(err);
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
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

  if (status === "exists") {
    return (
      <div className="nl-done" role="status">
        <span className="nl-done__icon">
          <Check size={18} />
        </span>
        <div>
          <strong>You&apos;re already subscribed.</strong>
          <p>
            This email is already on the list, so there is nothing more to do.
            Watch your inbox.
          </p>
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
