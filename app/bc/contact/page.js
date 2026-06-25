"use client";
import { useState } from "react";
import {
    ArrowLeft, Mail, User, MessageSquare,
    Phone, Send, CheckCircle, Terminal, Network, ShieldAlert
} from "lucide-react";

export default function ContactForm() {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
    const [errors, setErrors] = useState({});
    const WHATSAPP_NUMBER = "2348142995114";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
        if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
    };

    const validate = () => {
        const e = {};
        if (!formData.name.trim()) e.name = "Name is required";
        if (!formData.email.trim()) e.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Invalid email address";
        if (!formData.phone.trim()) e.phone = "Phone number is required";
        if (!formData.subject.trim()) e.subject = "Subject is required";
        if (!formData.message.trim()) e.message = "Message is required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        const msg = `[PORTFOLIO CONTACT]\n---\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSubject: ${formData.subject}\n---\n${formData.message}`.trim();
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    };

    const Field = ({ label, name, type = "text", placeholder, icon }) => (
        <div>
            <label className="ct-label">{label} <span style={{ color: "#f87171" }}>*</span></label>
            <div className="ct-input-wrap">
                <span className="ct-input-icon">{icon}</span>
                <input
                    type={type} name={name} value={formData[name]}
                    onChange={handleChange} placeholder={placeholder}
                    className={`ct-input${errors[name] ? " ct-input--err" : ""}`}
                />
            </div>
            {errors[name] && (
                <p className="ct-err"><ShieldAlert size={10} /> {errors[name]}</p>
            )}
        </div>
    );

    return (
        <>
            <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:         #0a0a0b;
          --surface:    #111113;
          --border:     #1e1e22;
          --border-hi:  #2e2e34;
          --text-1:     #f4f4f5;
          --text-2:     #a1a1aa;
          --text-3:     #52525b;
          --accent:     #e8ff47;
          --accent-dim: rgba(232,255,71,0.08);
          --radius:     6px;
          --serif:      'DM Serif Display', Georgia, serif;
          --sans:       'Inter', system-ui, sans-serif;
          --mono:       'JetBrains Mono', 'Fira Code', monospace;
        }

        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .ct-page { background: var(--bg); color: var(--text-1); font-family: var(--sans); min-height: 100vh; }

        /* Nav */
        .ct-nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(10,10,11,0.92); backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          height: 56px; padding: 0 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .ct-nav__brand { font-family: var(--mono); font-size: 12px; font-weight: 500; letter-spacing: 0.08em; color: var(--text-1); text-decoration: none; }
        .ct-nav__brand em { font-style: normal; color: var(--accent); }
        .ct-nav__back {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em;
          color: var(--text-2); text-decoration: none;
          padding: 6px 12px; border: 1px solid var(--border); border-radius: var(--radius);
          transition: color 0.15s, border-color 0.15s, background 0.15s;
        }
        .ct-nav__back:hover { color: var(--text-1); border-color: var(--border-hi); background: var(--surface); }

        /* Layout */
        .ct-main { max-width: 1120px; margin: 0 auto; padding: 52px 24px 80px; display: grid; grid-template-columns: 1fr 1.4fr; gap: 48px; align-items: start; }
        @media (max-width: 780px) { .ct-main { grid-template-columns: 1fr; gap: 32px; } }

        /* Left */
        .ct-left__eyebrow { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
        .ct-dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; animation: ct-pulse 2s ease-out infinite; }
        @keyframes ct-pulse { 0%,100%{opacity:1}50%{opacity:0.3} }
        .ct-left__eyebrow-text { font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); }

        .ct-left__title { font-family: var(--serif); font-size: clamp(30px, 4vw, 44px); color: var(--text-1); line-height: 1.1; margin-bottom: 6px; }
        .ct-left__sub { font-family: var(--mono); font-size: 11px; color: var(--text-3); letter-spacing: 0.06em; }
        .ct-left__desc { font-size: 14px; color: var(--text-2); line-height: 1.7; font-weight: 300; border-left: 2px solid var(--border); padding-left: 16px; margin: 20px 0 28px; }

        /* Info cards */
        .ct-info-cards { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
        .ct-info-card { display: flex; gap: 14px; align-items: center; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px 16px; }
        .ct-info-card__icon { width: 34px; height: 34px; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: var(--accent); flex-shrink: 0; }
        .ct-info-card__label { font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-bottom: 2px; }
        .ct-info-card__val { font-size: 12px; color: var(--text-2); }
        .ct-info-card__val--green { color: #4ade80; }

        /* Specs */
        .ct-specs { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px 18px; }
        .ct-specs__title { font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-bottom: 12px; }
        .ct-specs__list { display: flex; flex-direction: column; gap: 7px; }
        .ct-specs__item { display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--text-3); }
        .ct-specs__item::before { content: ''; width: 4px; height: 4px; background: rgba(232,255,71,0.5); border-radius: 1px; flex-shrink: 0; }

        /* Form */
        .ct-form-wrap { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
        .ct-form-header { background: var(--bg); border-bottom: 1px solid var(--border); padding: 12px 18px; display: flex; align-items: center; justify-content: space-between; }
        .ct-form-header__label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-3); display: flex; align-items: center; gap: 6px; }
        .ct-form-header__label svg { color: var(--accent); }
        .ct-form-header__dots { display: flex; gap: 5px; }
        .ct-form-header__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border); }
        .ct-form-header__dot--accent { background: rgba(232,255,71,0.4); }

        .ct-form-body { padding: 24px; display: flex; flex-direction: column; gap: 18px; }

        .ct-label { display: block; font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-bottom: 6px; }
        .ct-input-wrap { position: relative; }
        .ct-input-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: var(--text-3); display: flex; pointer-events: none; }
        .ct-input {
          width: 100%; padding: 9px 12px 9px 34px;
          background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius);
          font-family: var(--mono); font-size: 12px; color: var(--text-1);
          outline: none; transition: border-color 0.15s;
        }
        .ct-input::placeholder { color: var(--text-3); }
        .ct-input:focus { border-color: rgba(232,255,71,0.4); }
        .ct-input--err { border-color: rgba(248,113,113,0.5); }
        .ct-input--err:focus { border-color: #f87171; }

        .ct-textarea {
          width: 100%; padding: 9px 12px;
          background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius);
          font-family: var(--mono); font-size: 12px; color: var(--text-1);
          outline: none; resize: none; transition: border-color 0.15s; line-height: 1.6;
        }
        .ct-textarea::placeholder { color: var(--text-3); }
        .ct-textarea:focus { border-color: rgba(232,255,71,0.4); }
        .ct-textarea--err { border-color: rgba(248,113,113,0.5); }

        .ct-err { display: flex; align-items: center; gap: 4px; font-family: var(--mono); font-size: 9px; color: #f87171; margin-top: 5px; }

        .ct-submit {
          width: 100%; padding: 11px; border-radius: var(--radius); border: none; cursor: pointer;
          background: var(--accent); color: #0a0a0b;
          font-family: var(--mono); font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: opacity 0.15s, transform 0.1s;
        }
        .ct-submit:hover { opacity: 0.9; }
        .ct-submit:active { transform: scale(0.99); }

        .ct-notice { font-family: var(--mono); font-size: 9px; color: var(--text-3); text-align: center; line-height: 1.6; border-top: 1px solid var(--border); padding-top: 14px; }
      `}</style>

            <div className="ct-page">

                {/* Nav */}
                <nav className="ct-nav">
                    <a href="/" className="ct-nav__brand">brown<em>.</em>dev</a>
                    <a href="/portfolio" className="ct-nav__back"><ArrowLeft size={13} /> Portfolio</a>
                </nav>

                <main className="ct-main">

                    {/* Left */}
                    <div>
                        <div className="ct-left__eyebrow">
                            <span className="ct-dot" />
                            <span className="ct-left__eyebrow-text">Socket Open · Connect Interface</span>
                        </div>
                        <h1 className="ct-left__title">Get in<br />touch</h1>
                        <p className="ct-left__sub">COMMS_GATEWAY · BROWN_CODE</p>
                        <p className="ct-left__desc">
                            Pipe your project dependencies, timeline frameworks, or structural queries directly into my workspace.
                            Submissions are serialized and delivered via WhatsApp.
                        </p>

                        <div className="ct-info-cards">
                            <div className="ct-info-card">
                                <div className="ct-info-card__icon"><Mail size={14} /></div>
                                <div>
                                    <div className="ct-info-card__label">Email</div>
                                    <div className="ct-info-card__val">browncemmanuel@gmail.com</div>
                                </div>
                            </div>
                            <div className="ct-info-card">
                                <div className="ct-info-card__icon"><Network size={14} /></div>
                                <div>
                                    <div className="ct-info-card__label">WhatsApp</div>
                                    <div className="ct-info-card__val ct-info-card__val--green">Available 24/7</div>
                                </div>
                            </div>
                            <div className="ct-info-card">
                                <div className="ct-info-card__icon"><CheckCircle size={14} /></div>
                                <div>
                                    <div className="ct-info-card__label">Response Time</div>
                                    <div className="ct-info-card__val">Within 24 hours</div>
                                </div>
                            </div>
                        </div>

                        <div className="ct-specs">
                            <div className="ct-specs__title">What I can help with</div>
                            <div className="ct-specs__list">
                                <div className="ct-specs__item">Modular component structures optimized for performance</div>
                                <div className="ct-specs__item">Clean asynchronous state routing architectures</div>
                                <div className="ct-specs__item">Strict type checks and scalable schema validations</div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="ct-form-wrap">
                        <div className="ct-form-header">
                            <span className="ct-form-header__label"><Terminal size={11} /> contact.sh</span>
                            <div className="ct-form-header__dots">
                                <span className="ct-form-header__dot" />
                                <span className="ct-form-header__dot" />
                                <span className="ct-form-header__dot ct-form-header__dot--accent" />
                            </div>
                        </div>

                        <div className="ct-form-body">
                            <Field label="Your name" name="name" placeholder="e.g. John Doe" icon={<User size={13} />} />
                            <Field label="Email address" name="email" type="email" placeholder="e.g. dev@network.com" icon={<Mail size={13} />} />
                            <Field label="Phone number" name="phone" type="tel" placeholder="e.g. +234 701 000 0000" icon={<Phone size={13} />} />
                            <Field label="Subject" name="subject" placeholder="e.g. Architecture Optimization" icon={<MessageSquare size={13} />} />

                            <div>
                                <label className="ct-label">Message <span style={{ color: "#f87171" }}>*</span></label>
                                <textarea
                                    name="message" rows={5} value={formData.message}
                                    onChange={handleChange} placeholder="Describe your project, goals, or questions..."
                                    className={`ct-textarea${errors.message ? " ct-textarea--err" : ""}`}
                                />
                                {errors.message && <p className="ct-err"><ShieldAlert size={10} /> {errors.message}</p>}
                            </div>

                            <button className="ct-submit" onClick={handleSubmit}>
                                Send via WhatsApp <Send size={12} />
                            </button>

                            <p className="ct-notice">
                                Submitting constructs a formatted message and opens WhatsApp with your details pre-filled.
                            </p>
                        </div>
                    </div>

                </main>

            </div>
        </>
    );
}