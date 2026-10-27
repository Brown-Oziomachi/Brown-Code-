"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Mail, User, Phone, Send, CheckCircle, ShieldAlert, CalendarDays,
    MessageCircle, ArrowRight, ArrowUpRight, RotateCcw, Check,
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
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

                .ct-page {
                    --paper: #ffffff; --paper-2: #f6f5f0; --card: #ffffff;
                    --ink: #111111; --ink-2: #3f3f3f; --ink-3: #6f6f6f;
                    --rule: #e4e2da; --rule-dark: #111111;
                    --accent: #e8ff47; --on-accent: #0a0a0b; --danger: #b91c1c;
                    --serif: 'Playfair Display', Georgia, serif;
                    --sans: 'Inter', system-ui, sans-serif;
                    --mono: 'JetBrains Mono', 'Fira Code', monospace;
                    background: var(--paper); color: var(--ink); font-family: var(--sans); min-height: 100vh;
                }
                .ct-page *, .ct-page *::before, .ct-page *::after { box-sizing: border-box; }
                .ct-page h1, .ct-page h2, .ct-page h3, .ct-page p, .ct-page ol { margin: 0; padding: 0; }
                :where(.ct-page a) { color: inherit; text-decoration: none; }
                .ct-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }

                /* Nav */
                .ct-nav { position: sticky; top: 0; z-index: 1000; background: rgba(255,255,255,0.92); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); border-bottom: 1px solid var(--rule); }
                .ct-nav__inner { max-width: 1120px; margin: 0 auto; padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
                .ct-nav__brand { font-family: var(--serif); font-weight: 800; font-size: 21px; letter-spacing: -0.01em; }
                .ct-nav__brand em { font-style: normal; background: var(--accent); padding: 0 3px; }
                .ct-nav__links { display: flex; align-items: center; gap: 4px; }
                .ct-nav__link { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3); padding: 8px 12px; transition: color 0.15s; }
                .ct-nav__link:hover { color: var(--ink); }
                @media (max-width: 640px) { .ct-nav__hide { display: none; } }

                /* Header */
                .ct-head { padding: 64px 0 40px; }
                @media (max-width: 640px) { .ct-head { padding: 40px 0 28px; } }
                .ct-kicker { display: inline-flex; align-items: center; gap: 10px; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; background: var(--accent); color: var(--on-accent); padding: 5px 11px; margin-bottom: 20px; }
                .ct-ping { position: relative; width: 8px; height: 8px; }
                .ct-ping__ring { position: absolute; inset: 0; border-radius: 50%; background: var(--on-accent); opacity: 0.4; animation: ct-ping 1.6s ease-out infinite; }
                .ct-ping__dot { position: absolute; inset: 1px; border-radius: 50%; background: var(--on-accent); }
                @keyframes ct-ping { 0% { transform: scale(1); opacity: 0.4; } 100% { transform: scale(2.6); opacity: 0; } }
                .ct-title { font-family: var(--serif); font-weight: 800; font-size: clamp(38px, 6.4vw, 76px); line-height: 1.02; letter-spacing: -0.025em; max-width: 880px; }
                .ct-title em { font-style: italic; background: linear-gradient(transparent 62%, var(--accent) 62%); }
                .ct-dek { margin-top: 22px; max-width: 600px; font-size: clamp(15px, 1.6vw, 18px); line-height: 1.7; font-weight: 300; color: var(--ink-2); }
                .ct-promises { display: flex; flex-wrap: wrap; gap: 10px 24px; margin-top: 24px; font-family: var(--mono); font-size: 11.5px; color: var(--ink-2); }
                .ct-promises span { display: inline-flex; align-items: center; gap: 8px; }
                .ct-promises svg { background: var(--accent); color: var(--ink); padding: 2px; width: 17px; height: 17px; }

                /* Layout */
                .ct-grid { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr); gap: 44px; align-items: start; padding-bottom: 56px; }
                @media (max-width: 920px) { .ct-grid { grid-template-columns: minmax(0, 1fr); gap: 40px; } }

                /* Form card */
                .ct-card { border: 1.5px solid var(--ink); background: var(--card); }
                .ct-card__bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 28px; background: var(--ink); color: #f4f1ea; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; }
                .ct-card__bar b { color: var(--accent); font-weight: 500; }
                .ct-form { padding: 28px; display: flex; flex-direction: column; gap: 22px; }
                @media (max-width: 560px) { .ct-form { padding: 20px; } .ct-card__bar { padding: 12px 20px; } }
                .ct-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
                @media (max-width: 560px) { .ct-row { grid-template-columns: 1fr; } }

                .ct-label { display: flex; align-items: baseline; gap: 8px; font-size: 13px; font-weight: 600; margin-bottom: 8px; }
                .ct-optional { font-family: var(--mono); font-size: 10px; font-weight: 400; color: var(--ink-3); }
                .ct-input-wrap { position: relative; }
                .ct-input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--ink-3); display: flex; pointer-events: none; }
                .ct-input, .ct-textarea { width: 100%; background: #fff; border: 1.5px solid #c9c6bc; color: var(--ink); font-family: var(--sans); font-size: 15px; outline: none; transition: border-color 0.15s, box-shadow 0.15s; }
                .ct-input { height: 50px; padding: 0 14px 0 42px; }
                .ct-textarea { padding: 14px; line-height: 1.6; resize: vertical; min-height: 140px; }
                .ct-input::placeholder, .ct-textarea::placeholder { color: #9a978f; }
                .ct-input:hover, .ct-textarea:hover { border-color: var(--ink-3); }
                .ct-input:focus, .ct-textarea:focus { border-color: var(--ink); box-shadow: 4px 4px 0 var(--accent); }
                .ct-input--err, .ct-textarea--err { border-color: var(--danger); }
                .ct-err { display: flex; align-items: center; gap: 6px; margin-top: 7px; font-size: 12.5px; color: var(--danger); }
                .ct-hint { margin-top: 7px; font-size: 12px; color: var(--ink-3); }

                .ct-chips { display: flex; flex-wrap: wrap; gap: 8px; }
                .ct-chip { position: relative; cursor: pointer; font-size: 13.5px; padding: 10px 16px; border: 1.5px solid #c9c6bc; background: #fff; color: var(--ink-2); transition: background 0.15s, border-color 0.15s, color 0.15s; user-select: none; }
                .ct-chip input { position: absolute; opacity: 0; inset: 0; cursor: pointer; }
                .ct-chip:hover { border-color: var(--ink); color: var(--ink); }
                .ct-chip--on { background: var(--accent); border-color: var(--ink); color: var(--on-accent); font-weight: 600; }
                .ct-chip:focus-within { outline: 2px solid var(--ink); outline-offset: 2px; }

                .ct-actions { display: flex; flex-direction: column; gap: 10px; }
                .ct-btn { display: inline-flex; align-items: center; justify-content: center; gap: 9px; height: 52px; padding: 0 20px; font-family: var(--mono); font-size: 12px; letter-spacing: 0.06em; cursor: pointer; border: 1.5px solid var(--ink); background: transparent; color: var(--ink); transition: background 0.15s, color 0.15s, transform 0.15s; }
                .ct-btn:hover { background: var(--ink); color: #fff; transform: translateY(-1px); }
                .ct-btn--solid { background: var(--accent); color: var(--on-accent); font-weight: 600; font-size: 13px; }
                .ct-btn--solid:hover { background: var(--ink); color: var(--accent); }
                .ct-or { display: flex; align-items: center; gap: 12px; font-size: 12px; color: var(--ink-3); }
                .ct-or::before, .ct-or::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
                .ct-note { font-size: 12.5px; line-height: 1.6; color: var(--ink-3); text-align: center; }

                /* Success */
                .ct-done { padding: 48px 28px 44px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px; }
                .ct-done__icon { width: 64px; height: 64px; background: var(--accent); border: 1.5px solid var(--ink); display: flex; align-items: center; justify-content: center; }
                .ct-done__title { font-family: var(--serif); font-weight: 800; font-size: 30px; line-height: 1.15; }
                .ct-done__text { font-size: 14.5px; line-height: 1.7; color: var(--ink-2); max-width: 420px; }
                .ct-done__text b { color: var(--ink); font-weight: 600; }
                .ct-done__actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 10px; }
                .ct-done__actions .ct-btn { height: 46px; }

                /* Side column */
                .ct-side { display: flex; flex-direction: column; gap: 28px; }
                @media (min-width: 921px) { .ct-side { position: sticky; top: 84px; } }
                .ct-side__title { font-family: var(--serif); font-weight: 800; font-size: 20px; padding-top: 10px; border-top: 3px solid var(--ink); margin-bottom: 12px; }

                .ct-direct { display: flex; flex-direction: column; gap: 10px; }
                .ct-direct__item { display: flex; align-items: center; gap: 14px; padding: 14px 16px; border: 1.5px solid var(--ink); background: #fff; transition: transform 0.2s, box-shadow 0.2s, background 0.15s; }
                .ct-direct__item:hover { transform: translate(-3px, -3px); box-shadow: 4px 4px 0 var(--accent); }
                .ct-direct__item--solid { background: var(--accent); }
                .ct-direct__icon { width: 38px; height: 38px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--ink); color: var(--accent); }
                .ct-direct__item--solid .ct-direct__icon { background: var(--ink); }
                .ct-direct__label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-2); }
                .ct-direct__val { font-size: 14px; font-weight: 600; word-break: break-word; }

                .ct-steps { list-style: none; counter-reset: step; }
                .ct-step { counter-increment: step; display: grid; grid-template-columns: 40px 1fr; gap: 4px; padding: 14px 0; border-bottom: 1px solid var(--rule); }
                .ct-step::before { content: counter(step); font-family: var(--serif); font-weight: 800; font-size: 26px; line-height: 1; background: linear-gradient(transparent 60%, var(--accent) 60%); width: fit-content; height: fit-content; }
                .ct-step b { display: block; font-size: 14px; font-weight: 600; margin-bottom: 2px; }
                .ct-step span { font-size: 13px; line-height: 1.6; color: var(--ink-2); }

                /* What I do */
                .ct-do { display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid var(--ink); margin-bottom: 40px; }
                @media (max-width: 900px) { .ct-do { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 520px) { .ct-do { grid-template-columns: 1fr; } }
                .ct-do__item { padding: 20px; border-right: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
                .ct-do__item b { display: block; font-family: var(--serif); font-weight: 800; font-size: 18px; line-height: 1.25; margin-bottom: 6px; }
                .ct-do__item span { font-size: 13px; line-height: 1.65; color: var(--ink-3); }

                /* Safety */
                .ct-alert { display: flex; gap: 16px; padding: 22px 24px; background: var(--paper-2); border: 1px solid var(--ink); border-left: 5px solid var(--accent); margin-bottom: 72px; }
                .ct-alert svg { flex-shrink: 0; margin-top: 2px; }
                .ct-alert b { display: block; font-size: 15px; font-weight: 600; margin-bottom: 4px; }
                .ct-alert p { font-size: 13.5px; line-height: 1.7; color: var(--ink-2); max-width: 820px; }

                @media (max-width: 640px) { .ct-wrap, .ct-nav__inner { padding-left: 18px; padding-right: 18px; } }
                .ct-page :focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
                @media (prefers-reduced-motion: reduce) { .ct-page * { animation: none !important; transition: none !important; } }
            `}</style>

            <div className="ct-page">
                <header className="ct-nav">
                    <div className="ct-nav__inner">
                        <Link href="/" className="ct-nav__brand">Sir-AD<em>Blog</em></Link>
                        <nav className="ct-nav__links" aria-label="Main">
                            <Link href="/bc/about" className="ct-nav__link ct-nav__hide">About</Link>
                            <Link href="/portfolio" className="ct-nav__link ct-nav__hide">Portfolio</Link>
                            <Link href="/blog" className="ct-nav__link">Blog</Link>
                        </nav>
                    </div>
                </header>

                <main className="ct-wrap">
                    {/* ── Header ── */}
                    <header className="ct-head">
                        <div className="ct-kicker">
                            <span className="ct-ping">
                                <span className="ct-ping__ring" />
                                <span className="ct-ping__dot" />
                            </span>
                            Open to new projects
                        </div>
                        <h1 className="ct-title">
                            Tell me what you&apos;re <em>building.</em>
                        </h1>
                        <p className="ct-dek">
                            Have a website, app, payment flow or article in mind? Send a few details and I&apos;ll reply with
                            a plan or a few questions.
                        </p>
                        <div className="ct-promises">
                            <span><Check /> Free quote</span>
                            <span><Check /> Reply within 24 hours</span>
                            <span><Check /> You talk to the developer</span>
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
                </main>

                <Footer />
            </div>
        </>
    );
}