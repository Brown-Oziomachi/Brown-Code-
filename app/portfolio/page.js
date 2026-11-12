"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import {
    Github, Linkedin, Mail, Download, ArrowRight, ArrowUpRight, Calendar, Check, User,
    MapPin, ShieldAlert, ShieldCheck, AlertTriangle, BookOpen, Banknote, Briefcase, UserX,
    CreditCard, Heart, Code2, Lock, Eye, MessageCircle, Layers, Newspaper, Phone,
} from "lucide-react";
import Testimonials from "@/components/Testimonials";
import FirebaseChat from "@/components/FirebaseChat";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import FloatingClient from "../floatingchat/chat";
import { latestArticles } from "../data/latestArticles";

/* ── data ────────────────────────────────────────────── */

const CHANNEL_URL = "https://whatsapp.com/channel/0029VbEGWFsC1FuAo5qoPh0q";
const WHATSAPP_URL = "https://wa.me/2348142995114";
const CALL_URL = "https://cal.com/sir-brown";
const EMAIL = "browncemmanuel@gmail.com";
const FRAUDRADAR_URL = "https://fraudradarng.vercel.app/reports";
const XSS_LESSON = "/blog/dom-and-xss-beginners-guide-web-security";

const pillars = [
    "Free to read",
    "Plain language, no jargon wall",
    "Written by a working developer",
    "Built for readers across Nigeria and Africa",
];

const FLAGS = [
    "They are rushing me to act right now",
    "They asked for my OTP, PIN, BVN or password",
    "They want payment by transfer, crypto or gift cards",
    "The offer sounds too good to be true",
    "I cannot verify who they are or the account name",
    "They told me to keep it a secret",
];

const scams = [
    { icon: <Mail size={18} />, title: "Fake alerts and phishing", body: "Messages and links that look like your bank, courier or employer, built to steal logins and codes.", act: "Open your bank app yourself. Never tap the link." },
    { icon: <Banknote size={18} />, title: "Investment and Ponzi schemes", body: "Guaranteed returns, referral bonuses and pressure to bring in friends.", act: "No honest investment guarantees profit. Check the licence first." },
    { icon: <Briefcase size={18} />, title: "Job and visa scams", body: "Fees for interviews, training, equipment or paperwork before any work exists.", act: "A real employer does not charge you to hire you." },
    { icon: <UserX size={18} />, title: "Impersonation and OTP theft", body: "Someone posing as support, an official or a relative asks you for a code or a transfer.", act: "Hang up and call the official number you find yourself." },
    { icon: <CreditCard size={18} />, title: "Fake sellers and payment alerts", body: "Buyers pay and nothing arrives, or a fake alert tricks a seller into releasing goods.", act: "Confirm payment inside your own banking app, not a screenshot." },
    { icon: <Heart size={18} />, title: "Romance and trust scams", body: "A stranger builds affection over weeks, then has an emergency that needs money.", act: "Never send money to someone you have not met in person." },
];

const webTopics = [
    { icon: <Code2 size={18} />, title: "Untrusted input and XSS", body: "Why a site that shows a stranger's text as code can be turned against its own visitors, and the one-word fix.", href: XSS_LESSON, cta: "Read the XSS lesson" },
    { icon: <Lock size={18} />, title: "Authentication and access control", body: "Hiding a button is not security. The server has to decide who can see and do what, every time.", href: "/blog/web-security", cta: "Browse web security lessons" },
    { icon: <Eye size={18} />, title: "Safe handling of money and data", body: "Validation, secure payment flows and fraud-aware design for stores and platforms that move real money.", href: "/blog/web-security", cta: "Browse web security lessons" },
];

const scammedSteps = [
    { n: "01", title: "Stop and go quiet", body: "Do not reply, do not send more money and do not click anything else they sent." },
    { n: "02", title: "Call your bank straight away", body: "Tell them what happened. Time matters, and a quick call gives them the best chance to act." },
    { n: "03", title: "Keep the evidence", body: "Screenshots, phone numbers, account details, receipts and chat history. Do not delete anything." },
    { n: "04", title: "Secure your accounts", body: "Change passwords on anything you shared, turn on two-step login and sign out other devices." },
    { n: "05", title: "Report it", body: "Report on Fraud Radar NG so others can be warned, and to the relevant authorities such as the EFCC or the Nigeria Police cybercrime unit." },
];

const platforms = [
    { name: "Fraud Radar NG", kind: "Fraud reporting platform", body: "Check and report scams so the next person does not lose money to the same one.", url: FRAUDRADAR_URL },
    { name: "LAN Library", kind: "Academic document marketplace", body: "A marketplace for books and documents that serves students across Africa.", url: "https://learningaccessnetwork.com" },
];

const projects = [
    { title: "Yotapoint E-Commerce", kind: "E-commerce platform", description: "A transactional store with secure payments and a central dashboard for managing products and orders.", image: "/yota.jpg", link: "https://yotapoint.com", tags: ["Payments", "Dashboard", "API"] },
    { title: "TheCyclopedia News", kind: "News platform", description: "A content platform with a fast reading experience, rich media and a publishing workflow for editors.", image: "/the.jpg", link: "https://www.thecyclopedia.com.ng", tags: ["Next.js", "React", "CMS"] },
    { title: "IJ Stitches", kind: "Business website", description: "A lightweight, image-first site that shows a fashion brand's work and turns visitors into customers.", image: "/ijs.jpg", link: "https://ij-stitches.vercel.app/main", tags: ["React", "UI", "Performance"] },
];

const services = [
    { icon: <Layers size={18} />, title: "Secure web platforms", body: "Business sites, stores and dashboards built with Next.js, Nuxt and Firebase, with validation, access rules and safe data handling from day one." },
    { icon: <ShieldCheck size={18} />, title: "Security reviews", body: "A second pair of eyes on an existing site: inputs, logins, permissions and payment flows, with a plain-language report." },
    { icon: <Newspaper size={18} />, title: "Sponsored articles", body: "Put your product in front of a security-minded audience, written clearly and published with a proper backlink." },
];

/* ── small pieces ────────────────────────────────────── */

const WhatsAppIcon = ({ size = 16 }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

function SectionHead({ kicker, title, note, id }) {
    return (
        <div className="pf-head" id={id}>
            <div>
                <div className="pf-kicker">{kicker}</div>
                <h2 className="pf-h2">{title}</h2>
            </div>
            {note && <p className="pf-head__note">{note}</p>}
        </div>
    );
}

function ScamChecker() {
    const [picked, setPicked] = useState([]);
    const toggle = (i) =>
        setPicked((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]));
    const n = picked.length;

    const level =
        n === 0
            ? { tone: "idle", title: "Tick anything that matches", text: "This is a quick guide, not a verdict. When in doubt, pause and verify." }
            : n === 1
                ? { tone: "watch", title: "One red flag", text: "Pause. Verify through an official channel that you find yourself, not one they gave you." }
                : n < 4
                    ? { tone: "warn", title: "Several red flags", text: "Do not pay and do not share any code. Verify the person independently before you do anything else." }
                    : { tone: "stop", title: "This has the marks of a scam", text: "Stop contact, do not send money or codes, and report it. If you already paid, call your bank now." };

    return (
        <div className="pf-check" role="group" aria-label="Quick scam check">
            <div className="pf-check__top">
                <span className="pf-check__badge"><ShieldAlert size={13} /> Quick scam check</span>
                <span className="pf-check__count">{n}/{FLAGS.length}</span>
            </div>
            <p className="pf-check__lead">Does your situation match any of these?</p>
            <ul className="pf-check__list">
                {FLAGS.map((f, i) => (
                    <li key={f}>
                        <button
                            type="button"
                            className={`pf-check__item${picked.includes(i) ? " is-on" : ""}`}
                            aria-pressed={picked.includes(i)}
                            onClick={() => toggle(i)}
                        >
                            <span className="pf-check__box">{picked.includes(i) && <Check size={12} />}</span>
                            {f}
                        </button>
                    </li>
                ))}
            </ul>
            <div className={`pf-check__result pf-check__result--${level.tone}`} aria-live="polite">
                <strong>{level.title}</strong>
                <span>{level.text}</span>
            </div>
            {n >= 2 && (
                <div className="pf-check__actions">
                    <a href={FRAUDRADAR_URL} target="_blank" rel="noopener noreferrer" className="pf-btn pf-btn--solid">
                        Report on Fraud Radar NG <ArrowUpRight size={13} />
                    </a>
                    <a href="#report" className="pf-btn">Already paid? Do this</a>
                </div>
            )}
        </div>
    );
}

/* ── page ────────────────────────────────────────────── */

export default function PortfolioClients() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const hasArticles = Array.isArray(latestArticles) && latestArticles.length > 0;
    const newest = hasArticles ? latestArticles[0] : null;
    const featured = hasArticles ? latestArticles[0] : null;
    const sideList = hasArticles ? latestArticles.slice(1, 4) : [];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Noto+Serif:wght@400;500&family=Inter:wght@400;500;600&display=swap');

                .pf-page {
                   --bg: #ffffff; --bg-2: #f4f7fa; --card: #ffffff; --line: #dde3ea; --line-2: #b9c4cf;
--hover: #eef3f7; --tint: #e6f4fc; --danger-bg: #fdecea;
--ink: #0f1720; --ink-2: #46505c; --ink-3: #6b7682;
--blue: #0a84c6; --navy: #0a3d62; --navy-2: #0d5183; --on-blue: #04121c;
                    --alert: #ef5b45; --warn: #f0a82c;
                    --head: 'Archivo', 'Inter', system-ui, sans-serif;
                    --serif: 'Noto Serif', Georgia, serif;
                    --sans: 'Inter', system-ui, sans-serif;
                    background: var(--bg); color: var(--ink-2); font-family: var(--sans);
                    min-height: 100vh; overflow-x: hidden;
                }
                .pf-page *, .pf-page *::before, .pf-page *::after { box-sizing: border-box; }
                .pf-page h1, .pf-page h2, .pf-page h3, .pf-page p, .pf-page ul { margin: 0; }
                :where(.pf-page a) { color: inherit; text-decoration: none; }
                .pf-wrap { max-width: 1240px; margin: 0 auto; padding: 0 28px; }
                .pf-section { padding: 88px 0 0; }
                html { scroll-behavior: smooth; }
                .pf-page [id] { scroll-margin-top: 96px; }

                /* Buttons */
                .pf-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-family: var(--head); font-size: 13px; font-weight: 600; letter-spacing: 0.03em; text-transform: uppercase; padding: 14px 22px; border: 1px solid var(--line-2); border-radius: 6px; background: transparent; color: var(--ink); cursor: pointer; transition: background 0.15s, border-color 0.15s, color 0.15s; }
                .pf-btn:hover { background: var(--hover); border-color: var(--blue); }
                .pf-btn--solid { background: var(--navy); border-color: var(--navy); color: #fff; }
                .pf-btn--solid:hover { background: var(--navy-2); border-color: var(--navy-2); }
                .pf-btn--lg { padding: 17px 30px; font-size: 14px; }

                /* Section heads */
                .pf-kicker { font-family: var(--head); font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue); margin-bottom: 10px; }
                .pf-kicker b { font-weight: 700; color: var(--blue); }
                .pf-h2 { font-family: var(--head); font-weight: 800; font-size: clamp(28px, 4vw, 42px); line-height: 1.1; letter-spacing: -0.01em; color: var(--ink); text-transform: uppercase; }
                .pf-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding-bottom: 22px; border-bottom: 1px solid var(--line); margin-bottom: 32px; }
                .pf-head__note { font-family: var(--serif); font-size: 15px; line-height: 1.7; color: var(--ink-2); max-width: 420px; }

                /* Alert ribbon */
                .pf-ribbon { margin-top: 95px; background: var(--navy); border-bottom: 1px solid var(--line); }
                @media (max-width: 640px) { .pf-ribbon { margin-top: 76px; } }
                .pf-ribbon__inner { max-width: 1240px; margin: 0 auto; padding: 10px 28px; display: flex; align-items: center; gap: 14px; min-height: 44px; }
                .pf-ribbon__tag { display: inline-flex; align-items: center; gap: 7px; flex-shrink: 0; font-family: var(--head); font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; background: var(--blue); color: var(--on-blue); padding: 5px 10px; border-radius: 4px; }
                .pf-ribbon__text { font-family: var(--head); font-weight: 600; font-size: 14px; color: #fff; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .pf-ribbon__text:hover { text-decoration: underline; text-underline-offset: 3px; }
                .pf-ribbon__more { margin-left: auto; flex-shrink: 0; font-family: var(--head); font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;  color: var(--navy); display: inline-flex; align-items: center; gap: 5px; }
                @media (max-width: 640px) { .pf-ribbon__more { display: none; } .pf-ribbon__inner { padding: 10px 18px; } }

                /* Hero */
                .pf-hero { padding: 64px 0 72px; border-bottom: 1px solid var(--line); }
                .pf-hero__grid { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr); gap: 64px; align-items: start; }
                @media (max-width: 960px) { .pf-hero__grid { grid-template-columns: minmax(0, 1fr); gap: 44px; } .pf-hero { padding-top: 40px; } }
                .pf-avail { display: inline-flex; align-items: center; gap: 10px; font-family: var(--head); font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #8fd4f7; border: 1px solid var(--line); background: var(--bg-2); padding: 8px 14px; border-radius: 4px; margin-bottom: 24px; }
                .pf-ping { position: relative; width: 8px; height: 8px; flex-shrink: 0; }
                .pf-ping__ring { position: absolute; inset: 0; border-radius: 50%; background: var(--blue); opacity: 0.5; animation: pf-ping 1.8s ease-out infinite; }
                .pf-ping__dot { position: absolute; inset: 1px; border-radius: 50%; background: var(--blue); }
                @keyframes pf-ping { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(2.8); opacity: 0; } }
                .pf-hero__title { font-family: var(--head); font-weight: 800; font-size: clamp(38px, 5.8vw, 68px); line-height: 1.03; letter-spacing: -0.02em; color: var(--ink); }
                .pf-hero__title em { font-style: normal; color: var(--blue); }
                .pf-hero__dek { margin-top: 24px; max-width: 560px; font-family: var(--serif); font-size: clamp(16px, 1.6vw, 19px); line-height: 1.8; color: var(--ink-2); }
                .pf-hero__actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
                .pf-hero__note { margin-top: 18px; font-family: var(--head); font-size: 13px; color: var(--ink-3); display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
                .pf-hero__note svg { color: var(--on-blue); background: var(--blue); padding: 3px; width: 18px; height: 18px; border-radius: 50%; }

                /* Scam checker */
                .pf-check { background: var(--card); border: 1px solid var(--line); border-top: 3px solid var(--blue); border-radius: 8px; padding: 26px; }
                @media (max-width: 640px) { .pf-check { padding: 20px 16px; } }
                .pf-check__top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
                .pf-check__badge { display: inline-flex; align-items: center; gap: 7px; font-family: var(--head); font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; background: var(--navy); color: #fff; padding: 6px 11px; border-radius: 4px; }
                .pf-check__count { font-family: var(--head); font-size: 12px; color: var(--ink-3); }
                .pf-check__lead { margin: 16px 0 14px; font-family: var(--head); font-weight: 700; font-size: 22px; line-height: 1.2; color: var(--ink); }
                .pf-check__list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px; }
                .pf-check__item { width: 100%; display: flex; align-items: center; gap: 12px; text-align: left; font-family: var(--head); font-weight: 500; font-size: 14px; line-height: 1.4; color: var(--ink-2); background: #232326; border: 1px solid transparent; border-radius: 6px; padding: 12px; cursor: pointer; transition: border-color 0.15s, background 0.15s; }
                .pf-check__item:hover { border-color: var(--blue); }
                .pf-check__item.is-on { background: var(--tint); border-color: var(--blue); color: var(--ink); }
                .pf-check__box { width: 19px; height: 19px; flex-shrink: 0; border: 1.5px solid var(--ink-3); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--on-blue); }
                .pf-check__item.is-on .pf-check__box { background: var(--blue); border-color: var(--blue); }
                .pf-check__result { margin-top: 16px; padding: 13px 15px; border-left: 4px solid var(--line); border-radius: 4px; background: var(--bg-2); display: flex; flex-direction: column; gap: 4px; font-family: var(--serif); font-size: 13.5px; line-height: 1.6; color: var(--ink-2); }
                .pf-check__result strong { font-family: var(--head); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink); }
                .pf-check__result--watch { border-left-color: var(--blue); }
                .pf-check__result--warn { border-left-color: var(--warn); }
                .pf-check__result--stop { border-left-color: var(--alert); background: var(--danger-bg); }
                .pf-check__actions { margin-top: 14px; display: flex; flex-wrap: wrap; gap: 10px; }
                .pf-check__actions .pf-btn { padding: 11px 15px; font-size: 12px; }

                /* Pillars strip */
                .pf-trust { padding: 20px 0; background: var(--bg-2); border-bottom: 1px solid var(--line); }
                .pf-trust__list { display: flex; flex-wrap: wrap; gap: 10px 32px; align-items: center; }
                .pf-trust__item { display: inline-flex; align-items: center; gap: 9px; font-family: var(--head); font-weight: 500; font-size: 13px; color: var(--ink-2); }
                .pf-trust__item svg { color: var(--on-blue); background: var(--blue); padding: 3px; width: 18px; height: 18px; border-radius: 50%; }

                /* Latest */
                .pf-latest { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); gap: 48px; align-items: start; }
                @media (max-width: 900px) { .pf-latest { grid-template-columns: minmax(0, 1fr); gap: 28px; } }
                .pf-feature { display: block; }
                .pf-feature__media { position: relative; height: clamp(220px, 32vw, 340px); overflow: hidden; border-radius: 8px; background: var(--bg-2); margin-bottom: 18px; }
                .pf-feature__media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease; }
                .pf-feature:hover .pf-feature__media img { transform: scale(1.04); }
                .pf-feature__title { font-family: var(--head); font-weight: 700; font-size: clamp(24px, 3vw, 34px); line-height: 1.15; letter-spacing: -0.01em; color: var(--ink); }
                .pf-feature:hover .pf-feature__title { color: var(--blue); }
                .pf-feature__desc { margin-top: 12px; font-family: var(--serif); font-size: 16px; line-height: 1.75; color: var(--ink-2); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
                .pf-feature__meta { margin-top: 14px; font-family: var(--head); font-size: 12px; color: var(--ink-3); }
                .pf-list { border-top: 1px solid var(--line); }
                .pf-list__tag { display: block; font-family: var(--head); font-size: 19px; font-weight: 700; text-transform: uppercase; color: var(--ink); padding: 0 0 22px; border-bottom: 1px solid var(--line); margin-bottom: 4px; border-top: none; }
                .pf-list { border-top: none; }
                .pf-list__item { display: block; padding: 18px 0; border-bottom: 1px solid var(--line); }
                .pf-list__item:last-of-type { border-bottom: none; }
                .pf-list__title { font-family: var(--head); font-weight: 600; font-size: 18px; line-height: 1.3; color: var(--ink); }
                .pf-list__item:hover .pf-list__title { color: var(--blue); text-decoration: underline; text-underline-offset: 3px; }
                .pf-list__meta { margin-top: 6px; font-family: var(--head); font-size: 11.5px; color: var(--ink-3); }
                .pf-chip { position: absolute; top: 12px; left: 12px; font-family: var(--head); font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; background: var(--blue); color: var(--on-blue); padding: 5px 10px; border-radius: 4px; }
                .pf-more { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-top: 36px; }

                /* Card grids */
                .pf-grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
                @media (max-width: 960px) { .pf-grid3 { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 600px) { .pf-grid3 { grid-template-columns: 1fr; } }
                .pf-card { background: var(--card); border: 1px solid var(--line); border-radius: 8px; padding: 26px; display: flex; flex-direction: column; gap: 12px; transition: border-color 0.2s, transform 0.2s; }
                .pf-card:hover { border-color: var(--blue); transform: translateY(-3px); }
                .pf-card__icon { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: var(--navy); color: #8fd4f7; border-radius: 8px; }
                .pf-card__title { font-family: var(--head); font-weight: 700; font-size: 20px; line-height: 1.25; color: var(--ink); }
                .pf-card__body { font-family: var(--serif); font-size: 14.5px; line-height: 1.75; color: var(--ink-2); }
                .pf-card__act { margin-top: auto; padding-top: 14px; border-top: 1px solid var(--line); font-family: var(--serif); font-size: 13.5px; line-height: 1.6; color: var(--ink); }
                .pf-card__act b { display: block; font-family: var(--head); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue); margin-bottom: 4px; }
                .pf-card__link { margin-top: auto; padding-top: 14px; border-top: 1px solid var(--line); display: inline-flex; align-items: center; gap: 6px; font-family: var(--head); font-size: 12px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--blue); }
                .pf-card:hover .pf-card__link { text-decoration: underline; text-underline-offset: 3px; }

                /* Dark panels */
                .pf-dark { background: var(--navy); border-radius: 10px; padding: 56px; display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 56px; }
                @media (max-width: 900px) { .pf-dark { grid-template-columns: minmax(0, 1fr); gap: 32px; padding: 32px 22px; } }
                .pf-dark__kicker { font-family: var(--head); font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #8fd4f7; margin-bottom: 12px; }
                .pf-dark__title { font-family: var(--head); font-weight: 800; font-size: clamp(30px, 4.2vw, 46px); line-height: 1.08; letter-spacing: -0.01em; color: #fff; text-transform: uppercase; }
                .pf-dark__title em { font-style: normal; color: #8fd4f7; }
                .pf-dark__sub { margin-top: 18px; font-family: var(--serif); font-size: 16px; line-height: 1.8; color: #cfe3f1; max-width: 440px; }
                .pf-dark__actions { margin-top: 26px; display: flex; flex-wrap: wrap; gap: 12px; }
                .pf-dark .pf-btn { border-color: rgba(255,255,255,0.5); color: #fff; }
                .pf-dark .pf-btn:hover { background: rgba(255,255,255,0.12); border-color: #fff; }
                .pf-dark .pf-btn--solid { background: var(--blue); border-color: var(--blue); color: var(--on-blue); }
                .pf-dark .pf-btn--solid:hover { background: #fff; border-color: #fff; }
                .pf-steps { display: flex; flex-direction: column; }
                .pf-step { display: grid; grid-template-columns: 56px 1fr; gap: 6px; padding: 18px 0; border-bottom: 1px solid rgba(255,255,255,0.18); }
                .pf-step:first-child { padding-top: 0; }
                .pf-step:last-child { border-bottom: none; padding-bottom: 0; }
                .pf-step__n { font-family: var(--head); font-weight: 800; font-size: 26px; line-height: 1; color: #8fd4f7; }
                .pf-step__title { font-family: var(--head); font-weight: 700; font-size: 18px; margin-bottom: 4px; color: #fff; }
                .pf-step__body { font-family: var(--serif); font-size: 14px; line-height: 1.7; color: #cfe3f1; }

                /* Platforms + client work */
                .pf-platforms { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-bottom: 22px; }
                @media (max-width: 700px) { .pf-platforms { grid-template-columns: 1fr; } }
                .pf-plat { display: flex; flex-direction: column; gap: 8px; background: var(--card); border: 1px solid var(--line); border-left: 4px solid var(--blue); border-radius: 8px; padding: 26px; transition: background 0.15s, border-color 0.15s; }
                .pf-plat:hover { background: var(--hover); border-color: var(--blue); }
                .pf-plat__kind { font-family: var(--head); font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue); }
                .pf-plat__name { font-family: var(--head); font-weight: 700; font-size: 24px; color: var(--ink); display: flex; align-items: center; justify-content: space-between; gap: 12px; }
                .pf-plat__body { font-family: var(--serif); font-size: 14.5px; line-height: 1.7; color: var(--ink-2); }
                .pf-projects { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
                @media (max-width: 960px) { .pf-projects { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 600px) { .pf-projects { grid-template-columns: 1fr; } }
                .pf-proj { display: flex; flex-direction: column; background: var(--card); border: 1px solid var(--line); border-radius: 8px; overflow: hidden; transition: border-color 0.2s, transform 0.2s; }
                .pf-proj:hover { border-color: var(--blue); transform: translateY(-3px); }
                .pf-proj__media { position: relative; height: 160px; background: var(--bg-2); overflow: hidden; }
                .pf-proj__media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.45s ease; }
                .pf-proj:hover .pf-proj__media img { transform: scale(1.05); }
                .pf-proj__body { padding: 20px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
                .pf-proj__title { font-family: var(--head); font-weight: 700; font-size: 19px; line-height: 1.25; color: var(--ink); }
                .pf-proj:hover .pf-proj__title { color: var(--blue); }
                .pf-proj__desc { font-family: var(--serif); font-size: 13.5px; line-height: 1.7; color: var(--ink-2); }
                .pf-proj__foot { margin-top: auto; padding-top: 14px; border-top: 1px solid var(--line); display: flex; align-items: center; justify-content: space-between; gap: 10px; }
                .pf-tags { display: flex; flex-wrap: wrap; gap: 6px; }
                .pf-tag { font-family: var(--head); font-size: 11px; font-weight: 500; color: #8fd4f7; background: var(--navy); padding: 4px 9px; border-radius: 4px; }
                .pf-proj__visit { display: inline-flex; align-items: center; gap: 4px; font-family: var(--head); font-size: 12px; font-weight: 600; text-transform: uppercase; flex-shrink: 0; color: var(--blue); }

                /* About */
                .pf-about { display: grid; grid-template-columns: 280px minmax(0, 1fr); gap: 52px; align-items: center; border: 1px solid var(--line); border-radius: 10px; background: var(--card); padding: 40px; }
                @media (max-width: 820px) { .pf-about { grid-template-columns: minmax(0, 1fr); gap: 24px; padding: 24px 20px; } }
                .pf-about__img { aspect-ratio: 1; background: var(--bg-2); border-radius: 8px; overflow: hidden; max-width: 280px; border-bottom: 4px solid var(--blue); }
                .pf-about__img img { width: 100%; height: 100%; object-fit: cover; display: block; }
                .pf-about__title { font-family: var(--head); font-weight: 800; font-size: clamp(26px, 3.6vw, 38px); line-height: 1.12; letter-spacing: -0.01em; color: var(--ink); }
                .pf-about__title em { font-style: normal; color: var(--blue); }
                .pf-about__text { margin-top: 16px; font-family: var(--serif); font-size: 16px; line-height: 1.85; color: var(--ink-2); max-width: 620px; }
                .pf-about__meta { margin-top: 16px; display: flex; flex-wrap: wrap; gap: 6px 20px; font-family: var(--head); font-size: 12.5px; color: var(--ink-3); }
                .pf-about__meta span { display: inline-flex; align-items: center; gap: 6px; }
                .pf-about__actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }

                /* Channel band */
                .pf-band { display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; background: var(--blue); color: var(--on-blue); border-radius: 10px; padding: 36px 40px; }
                @media (max-width: 640px) { .pf-band { padding: 26px 20px; } }
                .pf-band__title { font-family: var(--head); font-weight: 800; font-size: clamp(24px, 3.2vw, 34px); line-height: 1.1; text-transform: uppercase; }
                .pf-band__sub { margin-top: 8px; font-family: var(--serif); font-size: 15px; line-height: 1.65; max-width: 520px; }
                .pf-band .pf-btn { background: var(--navy); border-color: var(--navy); color: #fff; }
                .pf-band .pf-btn:hover { background: #04121c; border-color: #04121c; }

                /* Contact */
                .pf-contact { margin-top: 96px; }
                .pf-contact__card { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: 56px; background: var(--navy); border-radius: 10px; padding: 56px; }
                @media (max-width: 860px) { .pf-contact__card { grid-template-columns: minmax(0, 1fr); gap: 32px; padding: 32px 22px; } }
                .pf-contact__kicker { font-family: var(--head); font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #8fd4f7; margin-bottom: 12px; }
                .pf-contact__title { font-family: var(--head); font-weight: 800; font-size: clamp(30px, 4.4vw, 46px); line-height: 1.08; letter-spacing: -0.01em; color: #fff; text-transform: uppercase; }
                .pf-contact__title em { font-style: normal; color: #8fd4f7; }
                .pf-contact__sub { margin-top: 18px; font-family: var(--serif); font-size: 16px; line-height: 1.8; color: #cfe3f1; max-width: 460px; }
                .pf-contact__promise { margin-top: 24px; display: flex; flex-direction: column; gap: 10px; }
                .pf-contact__promise span { display: flex; align-items: center; gap: 10px; font-family: var(--head); font-size: 13px; color: #e3f0f9; }
                .pf-contact__promise svg { color: #8fd4f7; flex-shrink: 0; }
                .pf-contact__actions { display: flex; flex-direction: column; gap: 12px; }
                .pf-contact .pf-btn { border-color: rgba(255,255,255,0.5); color: #fff; justify-content: space-between; width: 100%; }
                .pf-contact .pf-btn:hover { background: rgba(255,255,255,0.12); border-color: #fff; }
                .pf-contact .pf-btn--solid { background: var(--blue); border-color: var(--blue); color: var(--on-blue); }
                .pf-contact .pf-btn--solid:hover { background: #fff; border-color: #fff; }
                .pf-contact__socials { display: flex; gap: 10px; margin-top: 6px; }
                .pf-social { width: 46px; height: 46px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.12); border-radius: 50%; color: #fff; transition: background 0.15s; }
                .pf-social:hover { background: var(--blue); color: var(--on-blue); }

                @media (max-width: 640px) {
                    .pf-wrap { padding: 0 18px; }
                    .pf-section { padding-top: 64px; }
                    .pf-hero__actions .pf-btn { flex: 1 1 100%; }
                }
                .pf-page :focus-visible { outline: 2px solid var(--blue); outline-offset: 2px; }
                @media (prefers-reduced-motion: reduce) { .pf-page * { transition: none !important; animation: none !important; } html { scroll-behavior: auto; } }
            `}</style>

            <div className="pf-page">
                <Navbar />

                {newest && (
                    <div className="pf-ribbon">
                        <div className="pf-ribbon__inner">
                            <span className="pf-ribbon__tag"><AlertTriangle size={12} /> Latest</span>
                            <Link href={`/blog/${newest.slug}`} className="pf-ribbon__text">{newest.title}</Link>
                            <Link href="/blog" className="pf-ribbon__more">All alerts <ArrowRight size={11} /></Link>
                        </div>
                    </div>
                )}

                {/* HERO */}
                <section id="home" className="pf-hero" style={!newest ? { paddingTop: 132 } : undefined}>
                    <div className="pf-wrap pf-hero__grid">
                        <div>
                            <div className="pf-avail">
                                <span className="pf-ping">
                                    <span className="pf-ping__ring" />
                                    <span className="pf-ping__dot" />
                                </span>
                                Fraud awareness and web security
                            </div>
                            <h1 className="pf-hero__title">
                                Know the scam <em>before</em> it knows you.
                            </h1>
                            <p className="pf-hero__dek">
                                Plain-language lessons on how fraud works and how web applications get attacked, so you
                                can protect your money, your customers and your code. From Abuja, for readers across
                                Nigeria and Africa.
                            </p>
                            <div className="pf-hero__actions">
                                <Link href="/blog" className="pf-btn pf-btn--solid pf-btn--lg">
                                    Start learning <ArrowRight size={14} />
                                </Link>
                                <a href={FRAUDRADAR_URL} target="_blank" rel="noopener noreferrer" className="pf-btn pf-btn--lg">
                                    <ShieldAlert size={14} /> Check or report a scam
                                </a>
                            </div>
                            <p className="pf-hero__note">
                                <Check /> Free to read <span>·</span> No sign-up <span>·</span> Alerts on WhatsApp
                            </p>
                        </div>
                        <ScamChecker />
                    </div>
                </section>

                {/* PILLARS */}
                <div className="pf-trust">
                    <div className="pf-wrap pf-trust__list">
                        {pillars.map((p) => (
                            <span key={p} className="pf-trust__item"><Check /> {p}</span>
                        ))}
                    </div>
                </div>

                {/* LATEST */}
                {hasArticles && (
                    <section id="blog" className="pf-section">
                        <div className="pf-wrap">
                            <SectionHead
                                kicker="Latest from the desk"
                                title="New lessons and scam alerts"
                                note="Read one, share it with someone who needs it. Free for everyone."
                            />
                            <div className="pf-latest">
                                <Link href={`/blog/${featured.slug}`} className="pf-feature">
                                    <div className="pf-feature__media">
                                        {featured.image && (
                                            <img
                                                src={featured.image}
                                                alt={featured.title}
                                                loading="lazy"
                                                onError={(e) => (e.target.style.display = "none")}
                                            />
                                        )}
                                        {featured.category && <span className="pf-chip">{featured.category}</span>}
                                    </div>
                                    <h3 className="pf-feature__title">{featured.title}</h3>
                                    {featured.preview && <p className="pf-feature__desc">{featured.preview}</p>}
                                    <p className="pf-feature__meta">
                                        {featured.postedBy ? `By ${featured.postedBy}` : "By Sir Brown AD"}
                                        {featured.readingTime ? ` · ${featured.readingTime} min read` : ""}
                                    </p>
                                </Link>

                                {sideList.length > 0 && (
                                    <div className="pf-list">
                                        <span className="pf-list__tag">More to read</span>
                                        {sideList.map((a) => (
                                            <Link key={a.slug} href={`/blog/${a.slug}`} className="pf-list__item">
                                                <h3 className="pf-list__title">{a.title}</h3>
                                                <p className="pf-list__meta">
                                                    {a.postedBy || "Sir Brown AD"}
                                                    {a.readingTime ? ` · ${a.readingTime} min read` : ""}
                                                </p>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="pf-more">
                                <Link href="/blog" className="pf-btn">All articles <ArrowRight size={13} /></Link>
                                <Link href="/newsletter" className="pf-btn pf-btn--solid">
                                    <BookOpen size={13} /> Subscribe to lessons
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* SCAMS */}
                <section className="pf-section">
                    <div className="pf-wrap">
                        <SectionHead
                            kicker="Fraud awareness"
                            title="Six scams to recognise on sight"
                            note="Scammers change the story, not the trick. Learn the pattern and you can spot new versions."
                        />
                        <div className="pf-grid3">
                            {scams.map((s) => (
                                <article key={s.title} className="pf-card">
                                    <div className="pf-card__icon">{s.icon}</div>
                                    <h3 className="pf-card__title">{s.title}</h3>
                                    <p className="pf-card__body">{s.body}</p>
                                    <p className="pf-card__act"><b>What to do</b>{s.act}</p>
                                </article>
                            ))}
                        </div>
                        <div className="pf-more">
                            <Link href="/blog/topic/security" className="pf-btn pf-btn--solid">
                                Learn how each one works <ArrowRight size={13} />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* WEB SECURITY */}
                <section className="pf-section">
                    <div className="pf-wrap">
                        <SectionHead
                            kicker="Web application security"
                            title="For people who build and run websites"
                            note="Most breaches start with a small mistake in how a site handles input, logins or money. Here is where to start."
                        />
                        <div className="pf-grid3">
                            {webTopics.map((t) => (
                                <Link key={t.title} href={t.href} className="pf-card">
                                    <div className="pf-card__icon">{t.icon}</div>
                                    <h3 className="pf-card__title">{t.title}</h3>
                                    <p className="pf-card__body">{t.body}</p>
                                    <span className="pf-card__link">{t.cta} <ArrowRight size={12} /></span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* IF SCAMMED */}
                <section id="report" className="pf-section">
                    <div className="pf-wrap">
                        <div className="pf-dark">
                            <div>
                                <div className="pf-dark__kicker">If it already happened</div>
                                <h2 className="pf-dark__title">
                                    Been scammed? <em>Act in the first hour.</em>
                                </h2>
                                <p className="pf-dark__sub">
                                    It is not your fault, and it is not the end. Quick action gives you the best chance of
                                    limiting the damage and stops the scammer reaching the next person.
                                </p>
                                <div className="pf-dark__actions">
                                    <a href={FRAUDRADAR_URL} target="_blank" rel="noopener noreferrer" className="pf-btn pf-btn--solid pf-btn--lg">
                                        Report on Fraud Radar NG <ArrowUpRight size={14} />
                                    </a>
                                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="pf-btn pf-btn--lg">
                                        <Phone size={14} /> Ask me a question
                                    </a>
                                </div>
                            </div>
                            <div className="pf-steps">
                                {scammedSteps.map((s) => (
                                    <div key={s.n} className="pf-step">
                                        <span className="pf-step__n">{s.n}</span>
                                        <div>
                                            <div className="pf-step__title">{s.title}</div>
                                            <p className="pf-step__body">{s.body}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* PLATFORMS + CLIENT WORK */}
                <section id="projects" className="pf-section">
                    <div className="pf-wrap">
                        <SectionHead
                            kicker="The platforms behind the mission"
                            title="Built, run and maintained by one developer"
                            note="I run my own live products, so what I teach comes from keeping real sites safe."
                        />
                        <div className="pf-platforms">
                            {platforms.map((p) => (
                                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="pf-plat">
                                    <span className="pf-plat__kind">{p.kind}</span>
                                    <span className="pf-plat__name">{p.name} <ArrowUpRight size={20} /></span>
                                    <span className="pf-plat__body">{p.body}</span>
                                </a>
                            ))}
                        </div>
                        <div className="pf-projects">
                            {projects.map((p) => (
                                <a key={p.title} href={p.link} target="_blank" rel="noopener noreferrer" className="pf-proj">
                                    <div className="pf-proj__media">
                                        <img src={p.image} alt={p.title} loading="lazy" />
                                        <span className="pf-chip">{p.kind}</span>
                                    </div>
                                    <div className="pf-proj__body">
                                        <h3 className="pf-proj__title">{p.title}</h3>
                                        <p className="pf-proj__desc">{p.description}</p>
                                        <div className="pf-proj__foot">
                                            <div className="pf-tags">
                                                {p.tags.map((t) => <span key={t} className="pf-tag">{t}</span>)}
                                            </div>
                                            <span className="pf-proj__visit">Visit <ArrowUpRight size={12} /></span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                        <div className="pf-more">
                            <Link href="/bc/projects" className="pf-btn">All projects <ArrowRight size={13} /></Link>
                        </div>
                    </div>
                </section>

                {/* ABOUT */}
                <section id="about" className="pf-section">
                    <div className="pf-wrap">
                        <div className="pf-about">
                            <div className="pf-about__img">
                                <img src="/sirb.png" alt="Sir Brown AD" />
                            </div>
                            <div>
                                <div className="pf-kicker">Who is behind this</div>
                                <h2 className="pf-about__title">
                                    A developer who teaches <em>what he sees.</em>
                                </h2>
                                <p className="pf-about__text">
                                    I&apos;m Sir Brown AD, a full stack developer in Abuja. I build web platforms for Nigeria
                                    and Africa, and I teach fraud awareness and web security because people lose money to
                                    things they were never taught to see. Every lesson here is written to be understood on a
                                    phone, in one sitting.
                                </p>
                                <div className="pf-about__meta">
                                    <span><MapPin size={13} /> Abuja, Nigeria (remote)</span>
                                    <span><Check size={13} /> Fraud awareness, web application security</span>
                                </div>
                                <div className="pf-about__actions">
                                    <Link href="/bc/about" className="pf-btn pf-btn--solid">
                                        Read my full story <ArrowRight size={13} />
                                    </Link>
                                    <Link href="/bc/contact" className="pf-btn">
                                        <User size={13} /> Contact me
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="pf-section">
                    <Testimonials />
                </div>

                {/* WHATSAPP BAND */}
                <section className="pf-section">
                    <div className="pf-wrap">
                        <div className="pf-band">
                            <div>
                                <div className="pf-band__title">Get scam alerts on your phone.</div>
                                <p className="pf-band__sub">
                                    Join the WhatsApp channel for new lessons and fraud alerts, sent as they are published.
                                </p>
                            </div>
                            <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="pf-btn pf-btn--lg">
                                <MessageCircle size={14} /> Join the channel
                            </a>
                        </div>
                    </div>
                </section>

                {/* WORK WITH ME */}
                <section className="pf-section">
                    <div className="pf-wrap">
                        <SectionHead
                            kicker="Work with me"
                            title="Security-minded help for your business"
                            note="The same care I put into these lessons goes into the platforms I build and review."
                        />
                        <div className="pf-grid3">
                            {services.map((s) => (
                                <article key={s.title} className="pf-card">
                                    <div className="pf-card__icon">{s.icon}</div>
                                    <h3 className="pf-card__title">{s.title}</h3>
                                    <p className="pf-card__body">{s.body}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CONTACT */}
                <section id="contact" className="pf-wrap pf-contact">
                    <div className="pf-contact__card">
                        <div>
                            <div className="pf-contact__kicker">Let&apos;s talk</div>
                            <h2 className="pf-contact__title">
                                Need a secure build, a review or an <em>article placed?</em>
                            </h2>
                            <p className="pf-contact__sub">
                                Tell me what you need, even if it is rough. I will reply with a clear plan, a timeline and a
                                price.
                            </p>
                            <div className="pf-contact__promise">
                                <span><Check size={14} /> Free quote, no pressure</span>
                                <span><Check size={14} /> I reply within 24 hours</span>
                                <span><Check size={14} /> You work with the developer directly</span>
                            </div>
                        </div>

                        <div className="pf-contact__actions">
                            <Link href="/bc/contact" className="pf-btn pf-btn--solid pf-btn--lg">
                                Start a project <ArrowRight size={14} />
                            </Link>
                            <a href={CALL_URL} target="_blank" rel="noopener noreferrer" className="pf-btn pf-btn--lg">
                                Book a free call <Calendar size={14} />
                            </a>
                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="pf-btn pf-btn--lg">
                                Chat on WhatsApp <WhatsAppIcon size={15} />
                            </a>
                            <a href={`mailto:${EMAIL}`} className="pf-btn pf-btn--lg">
                                Send an email <Mail size={14} />
                            </a>
                            <div className="pf-contact__socials">
                                <a href="https://github.com/Brown-Oziomachi" target="_blank" rel="noopener noreferrer" className="pf-social" aria-label="GitHub"><Github size={17} /></a>
                                <a href="https://www.linkedin.com/in/brownoziomachi72a5a3229" target="_blank" rel="noopener noreferrer" className="pf-social" aria-label="LinkedIn"><Linkedin size={17} /></a>
                                <Link href="/cv" className="pf-social" aria-label="Resume"><Download size={17} /></Link>
                            </div>
                        </div>
                    </div>
                </section>

                <div style={{ height: 80 }} />

                <Footer />

                <Suspense fallback={null}>
                    <FloatingClient onChatOpen={() => setIsChatOpen(true)} />
                </Suspense>
                <FirebaseChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
            </div>
        </>
    );
}