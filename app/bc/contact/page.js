"use client";

import { useState } from "react";
import {
    Mail, User, Phone, Send, CheckCircle, ShieldAlert, CalendarDays,
    MessageCircle, ArrowUpRight, RotateCcw, Check,
} from "lucide-react";
import Footer from "@/components/footer";

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

const facts = [
    ["Reply time", "Within 24 hours"],
    ["Based in", "Abuja, Nigeria (remote)"],
    ["Quote", "Free, no pressure"],
    ["Status", "Open to projects"],
];

const WHAT_I_DO = [
    ["Websites and web apps", "Built from the interface to the database, so one person owns the whole thing."],
    ["Payments", "Wallets, checkout and webhooks, with money handled safely on the server."],
    ["Security reviews", "A check of your access rules, logins and payment flow for weak spots."],
    ["Sponsored articles", "A clearly labelled, search-friendly article running for 1, 3 or 6 months."],
];

const STEPS = [
    ["Send your message", "Tell me what you need. Rough ideas are fine."],
    ["I reply within 24 hours", "You get a plan, or a few questions if I need more detail."],
    ["We agree the scope", "If it's a good fit, we settle what gets built and when."],
];

/* ── field (outside the page so inputs keep focus while typing) ── */

function Field({ id, label, optional, icon, error, hint, ...inputProps }) {
    return (
        <div>
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
                @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Noto+Serif:wght@400;500&family=Inter:wght@400;500;600&display=swap');

                .ct-page {
                    --bg: #ffffff; --bg-2: #f4f7fa; --card: #ffffff; --line: #dde3ea; --line-2: #b9c4cf;
                    --hover: #eef3f7;
                    --ink: #0f1720; --ink-2: #46505c; --ink-3: #6b7682;
                    --blue: #0a84c6; --navy: #0a3d62; --navy-2: #0d5183; --on-blue: #04121c;
                    --danger: #b91c1c;
                    --head: 'Archivo', 'Inter', system-ui, sans-serif;
                    --serif: 'Noto Serif', Georgia, serif;
                    --sans: 'Inter', system-ui, sans-serif;
                    background: var(--bg); color: var(--ink-2); font-family: var(--sans); min-height: 100vh;
                }
                .ct-page *, .ct-page *::before, .ct-page *::after { box-sizing: border-box; }
                .ct-page h1, .ct-page h2, .ct-page h3, .ct-page p, .ct-page ol { margin: 0; padding: 0; }
                :where(.ct-page a) { color: inherit; text-decoration: none; }
                .ct-wrap { max-width: 1240px; margin: 0 auto; padding: 0 28px; }
                .ct-section { padding-top: 96px; }

                /* Buttons */
                .ct-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-family: var(--head); font-size: 13px; font-weight: 600; letter-spacing: 0.03em; text-transform: uppercase; padding: 14px 22px; border: 1px solid var(--line-2); border-radius: 6px; background: transparent; color: var(--ink); cursor: pointer; transition: background 0.15s, border-color 0.15s; }
                .ct-btn:hover { background: var(--hover); border-color: var(--blue); }
                .ct-btn--solid { background: var(--navy); border-color: var(--navy); color: #fff; }
                .ct-btn--solid:hover { background: var(--navy-2); border-color: var(--navy-2); }

                /* Section heads */
                .ct-kicker { font-family: var(--head); font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue); margin-bottom: 10px; }
                .ct-h2 { font-family: var(--head); font-weight: 800; font-size: clamp(28px, 4vw, 40px); line-height: 1.1; letter-spacing: -0.01em; color: var(--ink); text-transform: uppercase; }
                .ct-head { padding-bottom: 22px; border-bottom: 1px solid var(--line); margin-bottom: 32px; }

                /* Hero */
                .ct-hero { padding-top: 72px; }
                @media (max-width: 880px) { .ct-hero { padding-top: 40px; } }
                .ct-hero__name { font-family: var(--head); font-weight: 800; font-size: clamp(44px, 8vw, 96px); line-height: 0.98; letter-spacing: -0.03em; color: var(--ink); max-width: 960px; }
                .ct-hero__name span { color: var(--blue); }
                .ct-hero__dek { margin-top: 24px; max-width: 600px; font-family: var(--serif); font-size: clamp(16px, 1.7vw, 19px); line-height: 1.8; color: var(--ink-2); }
                .ct-promises { display: flex; flex-wrap: wrap; gap: 10px 24px; margin-top: 24px; font-family: var(--head); font-size: 13px; font-weight: 500; letter-spacing: 0.02em; color: var(--ink); }
                .ct-promises span { display: inline-flex; align-items: center; gap: 8px; }
                .ct-promises svg { color: var(--blue); }

                .ct-facts { display: grid; grid-template-columns: repeat(4, 1fr); margin-top: 56px; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
                @media (max-width: 800px) { .ct-facts { grid-template-columns: 1fr 1fr; } }
                .ct-fact { padding: 20px 20px 20px 0; }
                .ct-fact + .ct-fact { padding-left: 20px; border-left: 1px solid var(--line); }
                @media (max-width: 800px) { .ct-fact:nth-child(3) { padding-left: 0; border-left: none; } .ct-fact:nth-child(n+3) { border-top: 1px solid var(--line); } }
                .ct-fact__k { font-family: var(--head); font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue); margin-bottom: 6px; }
                .ct-fact__v { font-family: var(--head); font-size: 15px; font-weight: 500; line-height: 1.4; color: var(--ink); }

                /* Layout */
                .ct-grid { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr); gap: 44px; align-items: start; padding-top: 56px; }
                @media (max-width: 920px) { .ct-grid { grid-template-columns: minmax(0, 1fr); gap: 40px; padding-top: 40px; } }

                /* Form card */
                .ct-card { border: 1px solid var(--line); border-left: 4px solid var(--blue); border-radius: 8px; background: var(--card); overflow: hidden; }
                .ct-card__bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 28px; background: var(--navy); color: #fff; font-family: var(--head); font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; }
                .ct-card__bar b { color: #8fd4f7; font-weight: 600; }
                .ct-form { padding: 28px; display: flex; flex-direction: column; gap: 22px; }
                @media (max-width: 560px) { .ct-form { padding: 20px; } .ct-card__bar { padding: 12px 20px; } }
                .ct-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
                @media (max-width: 560px) { .ct-row { grid-template-columns: 1fr; } }

                .ct-label { display: flex; align-items: baseline; gap: 8px; font-family: var(--head); font-size: 13px; font-weight: 600; color: var(--ink); margin-bottom: 8px; }
                .ct-optional { font-family: var(--head); font-size: 10.5px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-3); }
                .ct-input-wrap { position: relative; }
                .ct-input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--ink-3); display: flex; pointer-events: none; }
                .ct-input, .ct-textarea { width: 100%; background: #fff; border: 1px solid var(--line-2); border-radius: 6px; color: var(--ink); font-family: var(--sans); font-size: 15px; outline: none; transition: border-color 0.15s, box-shadow 0.15s; }
                .ct-input { height: 50px; padding: 0 14px 0 42px; }
                .ct-textarea { padding: 14px; line-height: 1.6; resize: vertical; min-height: 140px; }
                .ct-input::placeholder, .ct-textarea::placeholder { color: #98a2ad; }
                .ct-input:hover, .ct-textarea:hover { border-color: var(--ink-3); }
                .ct-input:focus, .ct-textarea:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(10,132,198,0.15); }
                .ct-input--err, .ct-textarea--err { border-color: var(--danger); }
                .ct-err { display: flex; align-items: center; gap: 6px; margin-top: 7px; font-size: 12.5px; color: var(--danger); }
                .ct-hint { margin-top: 7px; font-size: 12px; color: var(--ink-3); }

                .ct-chips { display: flex; flex-wrap: wrap; gap: 8px; }
                .ct-chip { position: relative; cursor: pointer; font-family: var(--head); font-size: 13px; font-weight: 500; padding: 10px 16px; border: 1px solid var(--line-2); border-radius: 6px; background: #fff; color: var(--ink-2); transition: background 0.15s, border-color 0.15s, color 0.15s; user-select: none; }
                .ct-chip input { position: absolute; opacity: 0; inset: 0; cursor: pointer; }
                .ct-chip:hover { border-color: var(--blue); color: var(--ink); background: var(--hover); }
                .ct-chip--on, .ct-chip--on:hover { background: var(--navy); border-color: var(--navy); color: #fff; }
                .ct-chip:focus-within { outline: 2px solid var(--blue); outline-offset: 2px; }

                .ct-actions { display: flex; flex-direction: column; gap: 10px; }
                .ct-actions .ct-btn { height: 52px; padding: 0 20px; }
                .ct-or { display: flex; align-items: center; gap: 12px; font-size: 12px; color: var(--ink-3); }
                .ct-or::before, .ct-or::after { content: ''; flex: 1; height: 1px; background: var(--line); }
                .ct-note { font-family: var(--serif); font-size: 12.5px; line-height: 1.7; color: var(--ink-3); text-align: center; }

                /* Success */
                .ct-done { padding: 48px 28px 44px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px; }
                .ct-done__icon { width: 64px; height: 64px; background: var(--navy); color: #8fd4f7; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
                .ct-done__title { font-family: var(--head); font-weight: 800; font-size: 28px; line-height: 1.15; color: var(--ink); text-transform: uppercase; }
                .ct-done__text { font-family: var(--serif); font-size: 15px; line-height: 1.8; color: var(--ink-2); max-width: 420px; }
                .ct-done__text b { color: var(--ink); font-weight: 500; }
                .ct-done__actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 10px; }

                /* Side column */
                .ct-side { display: flex; flex-direction: column; gap: 32px; }
                @media (min-width: 921px) { .ct-side { position: sticky; top: 24px; } }
                .ct-side__title { font-family: var(--head); font-weight: 800; font-size: 14px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue); padding-bottom: 12px; border-bottom: 1px solid var(--line); margin-bottom: 14px; }

                .ct-direct { display: flex; flex-direction: column; gap: 10px; }
                .ct-direct__item { display: flex; align-items: center; gap: 14px; padding: 14px 16px; border: 1px solid var(--line); border-radius: 8px; background: #fff; transition: border-color 0.2s, background 0.15s; }
                .ct-direct__item:hover { border-color: var(--blue); background: var(--hover); }
                .ct-direct__item--solid { background: var(--navy); border-color: var(--navy); }
                .ct-direct__item--solid:hover { background: var(--navy-2); border-color: var(--navy-2); }
                .ct-direct__icon { width: 38px; height: 38px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--navy); color: #8fd4f7; border-radius: 6px; }
                .ct-direct__item--solid .ct-direct__icon { background: rgba(255,255,255,0.14); color: #fff; }
                .ct-direct__label { font-family: var(--head); font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-3); }
                .ct-direct__val { font-family: var(--head); font-size: 14px; font-weight: 600; color: var(--ink); word-break: break-word; }
                .ct-direct__item--solid .ct-direct__label { color: #8fd4f7; }
                .ct-direct__item--solid .ct-direct__val { color: #fff; }

                .ct-steps { list-style: none; counter-reset: step; }
                .ct-step { counter-increment: step; display: grid; grid-template-columns: 44px 1fr; gap: 6px; padding: 16px 0; border-top: 1px solid var(--line); }
                .ct-step::before { content: counter(step, decimal-leading-zero); font-family: var(--head); font-weight: 800; font-size: 24px; line-height: 1; color: var(--blue); }
                .ct-step b { display: block; font-family: var(--head); font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 2px; }
                .ct-step span { font-family: var(--serif); font-size: 13.5px; line-height: 1.7; color: var(--ink-2); }

                /* What I do */
                .ct-do { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
                @media (max-width: 900px) { .ct-do { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 520px) { .ct-do { grid-template-columns: 1fr; } }
                .ct-do__item { background: var(--card); border: 1px solid var(--line); border-radius: 8px; padding: 22px; }
                .ct-do__item b { display: block; font-family: var(--head); font-size: 17px; font-weight: 700; line-height: 1.25; color: var(--ink); padding-bottom: 12px; border-bottom: 1px solid var(--line); margin-bottom: 12px; }
                .ct-do__item span { font-family: var(--serif); font-size: 14px; line-height: 1.75; color: var(--ink-2); }

                /* Safety */
                .ct-alert { display: flex; gap: 16px; padding: 24px 28px; background: var(--card); border: 1px solid var(--line); border-left: 4px solid var(--blue); border-radius: 8px; margin-top: 32px; margin-bottom: 72px; }
                .ct-alert svg { flex-shrink: 0; margin-top: 2px; color: var(--blue); }
                .ct-alert b { display: block; font-family: var(--head); font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
                .ct-alert p { font-family: var(--serif); font-size: 14.5px; line-height: 1.75; color: var(--ink-2); max-width: 820px; }

                @media (max-width: 640px) {
                    .ct-wrap { padding-left: 18px; padding-right: 18px; }
                    .ct-section { padding-top: 72px; }
                }
                .ct-page :focus-visible { outline: 2px solid var(--blue); outline-offset: 2px; }
                @media (prefers-reduced-motion: reduce) { .ct-page * { transition: none !important; } }
            `}</style>

            <div className="ct-page">
                <main className="ct-wrap">
                    {/* ── Hero ── */}
                    <header className="ct-hero">
                        <div className="ct-kicker">Contact</div>
                        <h1 className="ct-hero__name">
                            Tell me what you&apos;re <span>building.</span>
                        </h1>
                        <p className="ct-hero__dek">
                            Have a website, app, payment flow or article in mind? Send a few details and I&apos;ll reply with
                            a plan or a few questions.
                        </p>
                        <div className="ct-promises">
                            <span><Check size={15} /> Free quote</span>
                            <span><Check size={15} /> Reply within 24 hours</span>
                            <span><Check size={15} /> You talk to the developer</span>
                        </div>

                        <div className="ct-facts">
                            {facts.map(([k, v]) => (
                                <div key={k} className="ct-fact">
                                    <div className="ct-fact__k">{k}</div>
                                    <div className="ct-fact__v">{v}</div>
                                </div>
                            ))}
                        </div>
                    </header>

                    <div className="ct-grid">
                        {/* ── Form ── */}
                        <div className="ct-card">
                            <div className="ct-card__bar">
                                <span>Project brief</span>
                                <b>About 2 minutes</b>
                            </div>

                            {sent ? (
                                <div className="ct-done" role="status">
                                    <div className="ct-done__icon"><CheckCircle size={30} /></div>
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

                                    <div>
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
                            )}
                        </div>

                        {/* ── Side ── */}
                        <aside className="ct-side">
                            <section>
                                <h2 className="ct-side__title">Prefer another way?</h2>
                                <div className="ct-direct">
                                    <a
                                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Sir Brown, I'd like to talk about a project.")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ct-direct__item ct-direct__item--solid"
                                    >
                                        <span className="ct-direct__icon"><MessageCircle size={18} /></span>
                                        <div>
                                            <div className="ct-direct__label">Fastest</div>
                                            <div className="ct-direct__val">Chat on WhatsApp</div>
                                        </div>
                                    </a>
                                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="ct-direct__item">
                                        <span className="ct-direct__icon"><CalendarDays size={18} /></span>
                                        <div>
                                            <div className="ct-direct__label">Prefer a call?</div>
                                            <div className="ct-direct__val">Book a free time slot</div>
                                        </div>
                                    </a>
                                    <a href={`mailto:${CONTACT_EMAIL}`} className="ct-direct__item">
                                        <span className="ct-direct__icon"><Mail size={18} /></span>
                                        <div>
                                            <div className="ct-direct__label">Email</div>
                                            <div className="ct-direct__val">{CONTACT_EMAIL}</div>
                                        </div>
                                    </a>
                                </div>
                            </section>

                            <section>
                                <h2 className="ct-side__title">What happens next</h2>
                                <ol className="ct-steps">
                                    {STEPS.map(([title, body]) => (
                                        <li key={title} className="ct-step">
                                            <div><b>{title}</b><span>{body}</span></div>
                                        </li>
                                    ))}
                                </ol>
                            </section>
                        </aside>
                    </div>

                    {/* ── What I help with ── */}
                    <section className="ct-section">
                        <div className="ct-head">
                            <div className="ct-kicker">Services</div>
                            <h2 className="ct-h2">What I help with</h2>
                        </div>
                        <div className="ct-do">
                            {WHAT_I_DO.map(([title, body]) => (
                                <div key={title} className="ct-do__item">
                                    <b>{title}</b>
                                    <span>{body}</span>
                                </div>
                            ))}
                        </div>

                        {/* ── Safety notice ── */}
                        <div className="ct-alert">
                            <ShieldAlert size={20} />
                            <div>
                                <b>Watch out for impersonators</b>
                                <p>
                                    I only take enquiries through this site, the booking link above and the WhatsApp number you
                                    reach from this page. I never approach clients through direct messages. If someone contacts
                                    you as Sir Brown AD from another link or account, check with me here before you reply or send
                                    any money.
                                </p>
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}