"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Mail, User, Phone, Send, CheckCircle, ShieldAlert, CalendarDays,
    MessageCircle, Clock, ArrowRight, ArrowUpRight, RotateCcw,
} from "lucide-react";
import Navbar from "@/components/Navbar";

/* ── config ──────────────────────────────────────────── */

const WHATSAPP_NUMBER = "2348142995114";
const CONTACT_EMAIL = "browncemmanuel@gmail.com";
const BOOKING_URL = "https://cal.com/sir-brown";

const TOPICS = [
    "Build a website or app",
    "Add payments to my product",
    "Security review",
    "Sponsored article",
    "Something else",
];

const EMPTY = { name: "", email: "", phone: "", topic: "", message: "" };

const WHAT_I_DO = [
    ["Websites and web apps", "Built from the interface to the database, so one person owns the whole thing."],
    ["Payments", "Wallets, checkout and webhooks, with money handled safely on the server."],
    ["Security reviews", "A check of your app's access rules, logins and payment flow for weak spots."],
    ["Sponsored articles", "A clearly labelled, search-friendly article about your business, running for 1, 3 or 6 months."],
];

const STEPS = [
    ["Send your message", "Tell me what you need. Rough ideas are fine."],
    ["I reply within 24 hours", "You get a plan, or a few questions if I need more detail."],
    ["We agree the scope", "If it's a good fit, we settle what gets built and when."],
];

/* ── field (outside the page so inputs keep focus while typing) ── */

function Field({ id, label, optional, icon, error, hint, ...inputProps }) {
    return (
        <div className="ct-field">
            <label htmlFor={id} className="ct-label">
                {label}
                {optional && <span className="ct-optional">optional</span>}
            </label>
            <div className="ct-input-wrap">
                <span className="ct-input-icon">{icon}</span>
                <input
                    id={id}
                    className={`ct-input${error ? " ct-input--err" : ""}`}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
                    {...inputProps}
                />
            </div>
            {error ? (
                <p id={`${id}-err`} className="ct-err" role="alert">
                    <ShieldAlert size={12} /> {error}
                </p>
            ) : hint ? (
                <p id={`${id}-hint`} className="ct-hint">{hint}</p>
            ) : null}
        </div>
    );
}

/* ── page ────────────────────────────────────────────── */

export default function ContactForm() {
    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [sent, setSent] = useState(null); // null | { channel: "whatsapp" | "email", url }

    const setField = (name, value) => {
        setForm((p) => ({ ...p, [name]: value }));
        if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
    };
    const onChange = (e) => setField(e.target.name, e.target.value);

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Please tell me your name.";
        if (!form.email.trim()) e.email = "I need an email address so I can reply.";
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "That email doesn't look right. Check for typos.";
        if (!form.topic) e.topic = "Pick the closest option so I know where to start.";
        if (form.message.trim().length < 10) e.message = "Add a sentence or two about what you need.";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const buildText = () =>
        [
            `Hi Sir Brown, my name is ${form.name.trim()}.`,
            "",
            `I need help with: ${form.topic}`,
            "",
            form.message.trim(),
            "",
            `Reply to: ${form.email.trim()}${form.phone.trim() ? ` or ${form.phone.trim()}` : ""}`,
            "(Sent from the contact form on browncode.name.ng)",
        ].join("\n");

    const sendWhatsApp = () => {
        if (!validate()) return;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildText())}`;
        window.open(url, "_blank", "noopener,noreferrer");
        setSent({ channel: "whatsapp", url });
    };

    const sendEmail = () => {
        if (!validate()) return;
        const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${form.topic} (from ${form.name.trim()})`)}&body=${encodeURIComponent(buildText())}`;
        window.location.href = url;
        setSent({ channel: "email", url });
    };

    const reset = () => {
        setForm(EMPTY);
        setErrors({});
        setSent(null);
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .ct-page {
          --paper: #000000; --paper-2: #121212; --card: #0d0d0d;
          --ink: #f4f1ea; --ink-2: #bdb8ae; --ink-3: #85807a;
          --rule: #242424; --rule-dark: #3a3a3a;
          --accent: #e8ff47; --on-accent: #0a0a0b; --danger: #f87171;
          --serif: 'Playfair Display', Georgia, serif;
          --sans: 'Inter', system-ui, sans-serif;
          --mono: 'JetBrains Mono', 'Fira Code', monospace;
          background: var(--paper); color: var(--ink); font-family: var(--sans); min-height: 100vh;
        }
        .ct-page *, .ct-page *::before, .ct-page *::after { box-sizing: border-box; }
        .ct-page a { color: inherit; }

        .ct-main {
          max-width: 1120px; margin: 0 auto; padding: 116px 24px 96px;
          display: grid; grid-template-columns: 1fr 1.25fr; gap: 56px; align-items: start;
        }
        @media (max-width: 900px) { .ct-main { grid-template-columns: 1fr; gap: 40px; padding-top: 100px; } }

        /* Left column */
        .ct-left { display: flex; flex-direction: column; gap: 32px; }
        @media (min-width: 901px) { .ct-left { position: sticky; top: 100px; } }
        .ct-kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
        .ct-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: ct-blink 1.6s ease-in-out infinite; }
        @keyframes ct-blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        .ct-title { font-family: var(--serif); font-weight: 800; font-size: clamp(36px, 5vw, 54px); line-height: 1.06; letter-spacing: -0.01em; }
        .ct-title em { color: var(--accent); font-style: italic; }
        .ct-dek { margin-top: 18px; font-size: 16px; line-height: 1.65; font-weight: 300; color: var(--ink-2); border-left: 3px solid var(--accent); padding-left: 16px; max-width: 460px; }

        .ct-block-title { font-family: var(--serif); font-weight: 800; font-size: 20px; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 3px double var(--rule-dark); }

        .ct-steps { list-style: none; counter-reset: step; display: flex; flex-direction: column; }
        .ct-step { counter-increment: step; display: grid; grid-template-columns: 40px 1fr; gap: 4px; padding: 14px 0; border-bottom: 1px solid var(--rule); }
        .ct-step::before { content: counter(step); font-family: var(--serif); font-weight: 800; font-size: 26px; line-height: 1; color: var(--accent); }
        .ct-step b { display: block; font-size: 14px; font-weight: 600; margin-bottom: 2px; }
        .ct-step span { font-size: 13px; line-height: 1.6; color: var(--ink-2); }

        .ct-do { display: flex; flex-direction: column; }
        .ct-do__item { padding: 12px 0; border-bottom: 1px solid var(--rule); }
        .ct-do__item b { display: block; font-size: 14px; font-weight: 600; margin-bottom: 2px; }
        .ct-do__item span { font-size: 13px; line-height: 1.6; color: var(--ink-2); }

        /* Right: form card */
        .ct-card { background: var(--card); border: 1px solid var(--rule-dark); border-top: 4px solid var(--accent); }
        .ct-card__head { padding: 28px 32px 0; }
        .ct-card__title { font-family: var(--serif); font-weight: 800; font-size: 28px; line-height: 1.15; }
        .ct-card__sub { margin-top: 8px; font-size: 14px; line-height: 1.6; color: var(--ink-2); }
        .ct-form { padding: 24px 32px 32px; display: flex; flex-direction: column; gap: 22px; }
        @media (max-width: 560px) { .ct-card__head { padding: 24px 20px 0; } .ct-form { padding: 20px 20px 24px; } }
        .ct-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        @media (max-width: 560px) { .ct-row { grid-template-columns: 1fr; } }

        .ct-label { display: flex; align-items: baseline; gap: 8px; font-size: 13px; font-weight: 500; color: var(--ink); margin-bottom: 8px; }
        .ct-optional { font-family: var(--mono); font-size: 10px; font-weight: 400; color: var(--ink-3); }
        .ct-input-wrap { position: relative; }
        .ct-input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--ink-3); display: flex; pointer-events: none; transition: color 0.15s; }
        .ct-input-wrap:focus-within .ct-input-icon { color: var(--accent); }
        .ct-input, .ct-textarea {
          width: 100%; background: var(--paper); border: 1px solid var(--rule-dark); color: var(--ink);
          font-family: var(--sans); font-size: 15px; outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .ct-input { height: 48px; padding: 0 14px 0 42px; }
        .ct-textarea { padding: 14px; line-height: 1.6; resize: vertical; min-height: 140px; }
        .ct-input::placeholder, .ct-textarea::placeholder { color: #5d5a55; }
        .ct-input:hover, .ct-textarea:hover { border-color: #55524d; }
        .ct-input:focus, .ct-textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(232,255,71,0.14); }
        .ct-input--err, .ct-textarea--err { border-color: var(--danger); }
        .ct-input--err:focus, .ct-textarea--err:focus { box-shadow: 0 0 0 3px rgba(248,113,113,0.18); }
        .ct-err { display: flex; align-items: center; gap: 6px; margin-top: 7px; font-size: 12.5px; color: var(--danger); }
        .ct-hint { margin-top: 7px; font-size: 12px; color: var(--ink-3); }

        /* Topic chips */
        .ct-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .ct-chip { position: relative; cursor: pointer; font-size: 13.5px; padding: 10px 16px; border: 1px solid var(--rule-dark); background: var(--paper); color: var(--ink-2); transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.15s; user-select: none; }
        .ct-chip input { position: absolute; opacity: 0; inset: 0; cursor: pointer; }
        .ct-chip:hover { border-color: var(--ink); color: var(--ink); }
        .ct-chip--on { background: var(--accent); border-color: var(--accent); color: var(--on-accent); font-weight: 600; }
        .ct-chip--on:hover { color: var(--on-accent); }
        .ct-chip:focus-within { outline: 2px solid var(--accent); outline-offset: 2px; }

        /* Buttons */
        .ct-actions { display: flex; flex-direction: column; gap: 10px; margin-top: 4px; }
        .ct-btn { display: inline-flex; align-items: center; justify-content: center; gap: 9px; height: 52px; padding: 0 20px; font-family: var(--mono); font-size: 12px; letter-spacing: 0.06em; cursor: pointer; text-decoration: none; border: 1px solid var(--rule-dark); background: transparent; color: var(--ink); transition: background 0.15s, color 0.15s, transform 0.15s, box-shadow 0.15s; }
        .ct-btn:hover { background: var(--ink); color: var(--paper); transform: translateY(-1px); }
        .ct-btn--solid { background: var(--accent); border-color: var(--accent); color: var(--on-accent); font-weight: 600; font-size: 13px; }
        .ct-btn--solid:hover { background: #d4e63c; border-color: #d4e63c; color: var(--on-accent); box-shadow: 4px 4px 0 rgba(232,255,71,0.25); }
        .ct-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
        .ct-or { display: flex; align-items: center; gap: 12px; font-size: 12px; color: var(--ink-3); }
        .ct-or::before, .ct-or::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
        .ct-note { font-size: 12.5px; line-height: 1.6; color: var(--ink-3); text-align: center; }

        /* Success */
        .ct-done { padding: 44px 32px 40px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px; }
        .ct-done__icon { width: 60px; height: 60px; border-radius: 50%; border: 1px solid var(--accent); background: rgba(232,255,71,0.08); color: var(--accent); display: flex; align-items: center; justify-content: center; }
        .ct-done__title { font-family: var(--serif); font-weight: 800; font-size: 28px; }
        .ct-done__text { font-size: 14.5px; line-height: 1.7; color: var(--ink-2); max-width: 420px; }
        .ct-done__text b { color: var(--ink); font-weight: 600; }
        .ct-done__actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 10px; }
        .ct-done__actions .ct-btn { height: 46px; }

        /* Direct contact strip */
        .ct-direct { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--rule-dark); }
        @media (max-width: 700px) { .ct-direct { grid-template-columns: 1fr; } }
        .ct-direct__item { display: flex; gap: 12px; align-items: center; padding: 16px 20px; text-decoration: none; border-right: 1px solid var(--rule); transition: background 0.15s; }
        .ct-direct__item:last-child { border-right: none; }
        @media (max-width: 700px) { .ct-direct__item { border-right: none; border-bottom: 1px solid var(--rule); } .ct-direct__item:last-child { border-bottom: none; } }
        a.ct-direct__item:hover { background: var(--paper-2); }
        .ct-direct__icon { color: var(--accent); flex-shrink: 0; display: flex; }
        .ct-direct__label { font-size: 12px; color: var(--ink-3); margin-bottom: 1px; }
        .ct-direct__val { font-size: 13px; font-weight: 500; color: var(--ink); word-break: break-word; }

        /* Safety notice */
        .ct-alert { border-top: 1px solid var(--rule-dark); padding: 20px 32px 24px; display: flex; gap: 14px; background: var(--paper-2); }
        @media (max-width: 560px) { .ct-alert { padding: 18px 20px 20px; } }
        .ct-alert__icon { color: var(--accent); flex-shrink: 0; margin-top: 2px; }
        .ct-alert__title { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
        .ct-alert__text { font-size: 13px; line-height: 1.7; color: var(--ink-2); }

        @media (prefers-reduced-motion: reduce) { .ct-page * { animation: none !important; transition: none !important; } }
      `}</style>

            <div className="ct-page">
                <Navbar />

                <main className="ct-main">
                    {/* ── Left: what to expect ── */}
                    <div className="ct-left">
                        <header>
                            <div className="ct-kicker"><span className="ct-dot" /> Open to new projects</div>
                            <h1 className="ct-title">
                                Tell me what you&apos;re <em>building</em>.
                            </h1>
                            <p className="ct-dek">
                                Have a website, app, payment flow or article in mind? Send me a few details and I&apos;ll
                                reply within 24 hours with a plan or a few questions.
                            </p>
                        </header>

                        <section>
                            <h2 className="ct-block-title">What happens next</h2>
                            <ol className="ct-steps">
                                {STEPS.map(([title, body]) => (
                                    <li key={title} className="ct-step">
                                        <div>
                                            <b>{title}</b>
                                            <span>{body}</span>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </section>

                        <section>
                            <h2 className="ct-block-title">What I can help with</h2>
                            <div className="ct-do">
                                {WHAT_I_DO.map(([title, body]) => (
                                    <div key={title} className="ct-do__item">
                                        <b>{title}</b>
                                        <span>{body}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* ── Right: form ── */}
                    <div className="ct-card">
                        {sent ? (
                            <div className="ct-done" role="status">
                                <div className="ct-done__icon"><CheckCircle size={28} /></div>
                                <h2 className="ct-done__title">One last step: press send</h2>
                                <p className="ct-done__text">
                                    {sent.channel === "whatsapp" ? (
                                        <>Your message is written and waiting in <b>WhatsApp</b>. Press the send button there and I&apos;ll get it. I reply within 24 hours.</>
                                    ) : (
                                        <>Your message is ready in your <b>email app</b>. Press send there and I&apos;ll get it. I reply within 24 hours.</>
                                    )}
                                </p>
                                <div className="ct-done__actions">
                                    <a
                                        href={sent.url}
                                        target={sent.channel === "whatsapp" ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        className="ct-btn ct-btn--solid"
                                    >
                                        Nothing opened? Try again <ArrowUpRight size={14} />
                                    </a>
                                    <button className="ct-btn" onClick={reset}>
                                        <RotateCcw size={13} /> Write another message
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="ct-card__head">
                                    <h2 className="ct-card__title">Send me a message</h2>
                                    <p className="ct-card__sub">Takes about two minutes. Fields marked optional can be skipped.</p>
                                </div>

                                <form className="ct-form" onSubmit={(e) => e.preventDefault()} noValidate>
                                    <div className="ct-row">
                                        <Field
                                            id="ct-name" name="name" label="Your name" icon={<User size={15} />}
                                            placeholder="e.g. Amaka Obi" autoComplete="name"
                                            value={form.name} onChange={onChange} error={errors.name}
                                        />
                                        <Field
                                            id="ct-email" name="email" type="email" label="Email address" icon={<Mail size={15} />}
                                            placeholder="you@company.com" autoComplete="email" inputMode="email"
                                            value={form.email} onChange={onChange} error={errors.email}
                                        />
                                    </div>

                                    <Field
                                        id="ct-phone" name="phone" type="tel" label="Phone or WhatsApp number" optional
                                        icon={<Phone size={15} />} placeholder="+234 800 000 0000" autoComplete="tel"
                                        hint="Add it if you'd like a reply on WhatsApp or a call."
                                        value={form.phone} onChange={onChange} error={errors.phone}
                                    />

                                    <div>
                                        <div id="ct-topic-label" className="ct-label">What do you need help with?</div>
                                        <div className="ct-chips" role="radiogroup" aria-labelledby="ct-topic-label">
                                            {TOPICS.map((t) => (
                                                <label key={t} className={`ct-chip${form.topic === t ? " ct-chip--on" : ""}`}>
                                                    <input
                                                        type="radio" name="topic" value={t}
                                                        checked={form.topic === t}
                                                        onChange={() => setField("topic", t)}
                                                    />
                                                    {t}
                                                </label>
                                            ))}
                                        </div>
                                        {errors.topic && (
                                            <p className="ct-err" role="alert"><ShieldAlert size={12} /> {errors.topic}</p>
                                        )}
                                    </div>

                                    <div className="ct-field">
                                        <label htmlFor="ct-message" className="ct-label">Tell me about your project</label>
                                        <textarea
                                            id="ct-message" name="message" rows={5}
                                            value={form.message} onChange={onChange}
                                            placeholder="What are you trying to build or fix? Who is it for, and when do you need it?"
                                            className={`ct-textarea${errors.message ? " ct-textarea--err" : ""}`}
                                            aria-invalid={!!errors.message}
                                            aria-describedby={errors.message ? "ct-message-err" : undefined}
                                        />
                                        {errors.message && (
                                            <p id="ct-message-err" className="ct-err" role="alert">
                                                <ShieldAlert size={12} /> {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="ct-actions">
                                        <button type="button" className="ct-btn ct-btn--solid" onClick={sendWhatsApp}>
                                            <MessageCircle size={16} /> Send on WhatsApp
                                        </button>
                                        <div className="ct-or">or</div>
                                        <button type="button" className="ct-btn" onClick={sendEmail}>
                                            <Send size={14} /> Send by email instead
                                        </button>
                                    </div>

                                    <p className="ct-note">
                                        This doesn&apos;t send anything automatically. It opens WhatsApp or your email app with
                                        your message filled in, and you press send there.
                                    </p>
                                </form>
                            </>
                        )}

                        {/* Direct contact */}
                        <div className="ct-direct">
                            <a href={`mailto:${CONTACT_EMAIL}`} className="ct-direct__item">
                                <span className="ct-direct__icon"><Mail size={18} /></span>
                                <div>
                                    <div className="ct-direct__label">Email</div>
                                    <div className="ct-direct__val">{CONTACT_EMAIL}</div>
                                </div>
                            </a>
                            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="ct-direct__item">
                                <span className="ct-direct__icon"><CalendarDays size={18} /></span>
                                <div>
                                    <div className="ct-direct__label">Prefer a call?</div>
                                    <div className="ct-direct__val">Book a time</div>
                                </div>
                            </a>
                            <div className="ct-direct__item">
                                <span className="ct-direct__icon"><Clock size={18} /></span>
                                <div>
                                    <div className="ct-direct__label">Reply time</div>
                                    <div className="ct-direct__val">Within 24 hours</div>
                                </div>
                            </div>
                        </div>

                        {/* Safety notice */}
                        <div className="ct-alert">
                            <ShieldAlert size={18} className="ct-alert__icon" />
                            <div>
                                <div className="ct-alert__title">Watch out for impersonators</div>
                                <p className="ct-alert__text">
                                    I only take enquiries through this site, the booking link above and the WhatsApp
                                    number you reach from this page. I never approach clients through direct messages. If
                                    someone contacts you as Sir Brown AD from another link or account, check with me here
                                    before you reply or send any money.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}