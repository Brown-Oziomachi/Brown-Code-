"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Github, Linkedin, Mail, Download, ArrowRight, ArrowUpRight,
    Calendar, ShieldCheck, CreditCard, Layers, Newspaper, Check, MessageCircle,
} from "lucide-react";
import Testimonials from "@/components/Testimonials";
import FirebaseChat from "@/components/FirebaseChat";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import FloatingClient from "../floatingchat/chat";
import { latestArticles } from "../data/latestArticles";
import { Suspense } from "react";

/* ── data ────────────────────────────────────────────── */

const CHANNEL_URL = "https://whatsapp.com/channel/0029VbEGWFsC1FuAo5qoPh0q";
const WHATSAPP_URL = "https://wa.me/2348142995114";
const CALL_URL = "https://cal.com/sir-brown";
const EMAIL = "browncemmanuel@gmail.com";

const stats = [
    { num: "5", label: "Platforms live" },
    { num: "24h", label: "Reply time" },
    { num: "1", label: "Developer, no middlemen" },
];

const trusted = ["YotaPoint", "TheCyclopedia News", "IJ Stitches", "Fraud Radar NG", "LAN Library"];

const services = [
    {
        icon: <Layers size={18} />,
        title: "Full stack web apps",
        body: "Business sites, dashboards and platforms built with Next.js, Nuxt and Firebase. Fast on phones, easy to grow.",
        points: ["Responsive and SEO ready", "Admin dashboards", "Deployed and handed over"],
    },
    {
        icon: <CreditCard size={18} />,
        title: "Payments and marketplaces",
        body: "Checkout flows, seller accounts and payment integrations for stores and platforms that handle real money.",
        points: ["Secure payment flows", "Seller and buyer accounts", "Order and payout logic"],
    },
    {
        icon: <ShieldCheck size={18} />,
        title: "Security-minded builds",
        body: "I write about fraud and web security, and I build with it in mind: validation, access rules and safe data handling.",
        points: ["Auth and access control", "Input validation", "Fraud-aware design"],
    },
    {
        icon: <Newspaper size={18} />,
        title: "Sponsored articles and ads",
        body: "Put your product in front of readers on my blog, written clearly and published with a proper backlink.",
        points: ["Written for your audience", "Permanent article page", "Shared on my channels"],
    },
];

const projects = [
    {
        title: "Yotapoint E-Commerce",
        kind: "E-commerce platform",
        description: "A transactional store with secure payments and a central dashboard for managing products and orders.",
        image: "/yota.jpg",
        link: "https://yotapoint.com",
        tags: ["Payments", "Dashboard", "API"],
    },
    {
        title: "TheCyclopedia News",
        kind: "News platform",
        description: "A content platform with a fast reading experience, rich media and a publishing workflow for editors.",
        image: "/the.jpg",
        link: "https://www.thecyclopedia.com.ng",
        tags: ["Next.js", "React", "CMS"],
    },
    {
        title: "IJ Stitches",
        kind: "Business website",
        description: "A lightweight, image-first site that shows a fashion brand's work and turns visitors into customers.",
        image: "/ijs.jpg",
        link: "https://ij-stitches.vercel.app/main",
        tags: ["React", "UI", "Performance"],
    },
];

const alsoBuilt = [
    { name: "Fraud Radar NG", note: "Fraud reporting and awareness platform", url: "https://fraudradarng.vercel.app" },
    { name: "LAN Library", note: "Marketplace for books and documents", url: "https://learningaccessnetwork.com" },
];

const reasons = [
    "You talk to the developer directly, with no agency layer in between",
    "I run my own live products, so I know what it takes to keep a site working",
    "I reply within 24 hours, usually sooner",
    "You get a clear plan and price before any work starts",
];

const steps = [
    { n: "01", title: "Tell me what you need", body: "Send a message or book a call. A rough idea is enough." },
    { n: "02", title: "Get a plan and a price", body: "I reply with scope, timeline and cost, so there are no surprises." },
    { n: "03", title: "I build, you review", body: "You see progress as it happens and give feedback along the way." },
    { n: "04", title: "Launch and support", body: "I deploy it, hand it over and stay available after go-live." },
];

const stack = ["Next.js", "React", "Nuxt 3", "Vue 3", "JavaScript", "Node.js", "Firebase", "Vercel", "REST APIs", "Tailwind"];

/* ── small pieces ────────────────────────────────────── */

const WhatsAppIcon = ({ size = 16 }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

function SectionHead({ kicker, title, note }) {
    return (
        <div className="pf-head">
            <div>
                <div className="pf-kicker">{kicker}</div>
                <h2 className="pf-h2">{title}</h2>
            </div>
            {note && <p className="pf-head__note">{note}</p>}
        </div>
    );
}

/* ── page ────────────────────────────────────────────── */

export default function PortfolioClients() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

                .pf-page {
                    --paper: #000000; --paper-2: #121212; --card: #0d0d0d;
                    --ink: #f4f1ea; --ink-2: #bdb8ae; --ink-3: #85807a;
                    --rule: #242424; --rule-dark: #3a3a3a;
                    --accent: #e8ff47; --on-accent: #0a0a0b;
                    --serif: 'Playfair Display', Georgia, serif;
                    --sans: 'Inter', system-ui, sans-serif;
                    --mono: 'JetBrains Mono', 'Fira Code', monospace;
                    background: var(--paper); color: var(--ink); font-family: var(--sans);
                    min-height: 100vh; overflow-x: hidden;
                }
                .pf-page *, .pf-page *::before, .pf-page *::after { box-sizing: border-box; }
                .pf-page h1, .pf-page h2, .pf-page h3, .pf-page p { margin: 0; }
                :where(.pf-page a) { color: inherit; }
                .pf-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
                .pf-section { padding: 88px 0 0; }

                /* Buttons */
                .pf-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-family: var(--mono); font-size: 11.5px; letter-spacing: 0.06em; padding: 13px 20px; border: 1px solid var(--rule-dark); background: transparent; color: var(--ink); cursor: pointer; text-decoration: none; transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.15s; }
                .pf-btn:hover { background: var(--ink); color: var(--paper); border-color: var(--ink); transform: translateY(-1px); }
                .pf-btn--solid { background: var(--accent); border-color: var(--accent); color: var(--on-accent); font-weight: 600; }
                .pf-btn--solid:hover { background: #d4e63c; border-color: #d4e63c; color: var(--on-accent); }
                .pf-btn--lg { padding: 16px 26px; font-size: 12px; }

                /* Section heads */
                .pf-kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); margin-bottom: 10px; }
                .pf-h2 { font-family: var(--serif); font-weight: 800; font-size: clamp(28px, 4vw, 42px); line-height: 1.1; letter-spacing: -0.01em; color: var(--ink); }
                .pf-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding-bottom: 16px; margin-bottom: 30px; border-bottom: 3px double var(--rule-dark); }
                .pf-head__note { font-size: 14px; line-height: 1.6; color: var(--ink-2); max-width: 380px; }

                /* ── Hero ── */
                .pf-hero { padding: 132px 0 64px; border-bottom: 1px solid var(--rule-dark); }
                .pf-hero__grid { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr); gap: 56px; align-items: center; }
                @media (max-width: 900px) { .pf-hero__grid { grid-template-columns: minmax(0, 1fr); gap: 40px; } .pf-hero { padding-top: 108px; } }
                .pf-avail { display: inline-flex; align-items: center; gap: 10px; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-2); border: 1px solid var(--rule-dark); background: var(--card); padding: 8px 14px; margin-bottom: 26px; }
                .pf-ping { position: relative; width: 8px; height: 8px; flex-shrink: 0; }
                .pf-ping__ring { position: absolute; inset: 0; border-radius: 50%; background: var(--accent); opacity: 0.4; animation: pf-ping 1.6s ease-out infinite; }
                .pf-ping__dot { position: absolute; inset: 1px; border-radius: 50%; background: var(--accent); }
                @keyframes pf-ping { 0% { transform: scale(1); opacity: 0.4; } 100% { transform: scale(2.6); opacity: 0; } }
                .pf-hero__title { font-family: var(--serif); font-weight: 800; font-size: clamp(38px, 6vw, 70px); line-height: 1.04; letter-spacing: -0.015em; color: var(--ink); }
                .pf-hero__title em { font-style: italic; color: var(--accent); }
                .pf-hero__dek { margin-top: 24px; max-width: 560px; font-size: clamp(15px, 1.6vw, 18px); line-height: 1.7; font-weight: 300; color: var(--ink-2); border-left: 3px solid var(--accent); padding-left: 18px; }
                .pf-hero__actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
                .pf-hero__reply { margin-top: 16px; font-family: var(--mono); font-size: 11px; color: var(--ink-3); display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
                .pf-hero__reply svg { color: var(--accent); }

                .pf-stats { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 44px; border-top: 1px solid var(--rule-dark); border-bottom: 3px double var(--rule-dark); }
                .pf-stat { padding: 18px 16px 16px 0; }
                .pf-stat + .pf-stat { padding-left: 18px; border-left: 1px solid var(--rule); }
                .pf-stat__num { font-family: var(--serif); font-weight: 800; font-size: 34px; line-height: 1; color: var(--ink); }
                .pf-stat__label { margin-top: 6px; font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3); }

                /* Portrait */
                .pf-portrait { position: relative; max-width: 380px; margin-left: auto; }
                @media (max-width: 900px) { .pf-portrait { margin: 0 auto; width: 100%; } }
                .pf-portrait__frame { aspect-ratio: 4 / 5; background: #fff; border: 1px solid var(--rule-dark); overflow: hidden; box-shadow: 8px 8px 0 var(--accent); }
                .pf-portrait__frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
                .pf-portrait__tag { position: absolute; left: -14px; bottom: 28px; background: var(--card); border: 1px solid var(--rule-dark); border-left: 4px solid var(--accent); padding: 12px 16px; }
                @media (max-width: 480px) { .pf-portrait__tag { left: 8px; } }
                .pf-portrait__name { font-family: var(--serif); font-weight: 800; font-size: 18px; color: var(--ink); }
                .pf-portrait__role { font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); margin-top: 3px; }

                /* Trust strip */
                .pf-trust { padding: 22px 0; border-bottom: 1px solid var(--rule); }
                .pf-trust__inner { display: flex; align-items: center; gap: 14px 28px; flex-wrap: wrap; }
                .pf-trust__label { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); flex-shrink: 0; }
                .pf-trust__list { display: flex; flex-wrap: wrap; gap: 8px 22px; }
                .pf-trust__item { font-family: var(--serif); font-weight: 800; font-size: 16px; color: var(--ink-2); }

                /* ── Services ── */
                .pf-services { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                @media (max-width: 760px) { .pf-services { grid-template-columns: 1fr; } }
                .pf-service { background: var(--card); border: 1px solid var(--rule-dark); border-top: 3px solid var(--accent); padding: 26px; display: flex; flex-direction: column; gap: 12px; transition: transform 0.2s, box-shadow 0.2s; }
                .pf-service:hover { transform: translate(-3px, -3px); box-shadow: 5px 5px 0 var(--accent); }
                .pf-service__icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: var(--accent); color: var(--on-accent); }
                .pf-service__title { font-family: var(--serif); font-weight: 800; font-size: 22px; line-height: 1.2; color: var(--ink); }
                .pf-service__body { font-size: 14px; line-height: 1.7; color: var(--ink-2); }
                .pf-service__points { list-style: none; padding: 0; margin: 4px 0 0; display: flex; flex-direction: column; gap: 8px; padding-top: 14px; border-top: 1px solid var(--rule); }
                .pf-service__points li { display: flex; align-items: center; gap: 9px; font-family: var(--mono); font-size: 11px; color: var(--ink-2); }
                .pf-service__points svg { color: var(--accent); flex-shrink: 0; }

                /* ── Projects ── */
                .pf-projects { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
                @media (max-width: 960px) { .pf-projects { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 600px) { .pf-projects { grid-template-columns: 1fr; } }
                .pf-proj { display: flex; flex-direction: column; background: var(--card); border: 1px solid var(--rule-dark); text-decoration: none; transition: transform 0.2s, box-shadow 0.2s; }
                .pf-proj:hover { transform: translate(-3px, -3px); box-shadow: 5px 5px 0 var(--accent); }
                .pf-proj__media { position: relative; height: 160px; background: #fff; overflow: hidden; border-bottom: 1px solid var(--rule-dark); }
                .pf-proj__media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.45s ease; }
                .pf-proj:hover .pf-proj__media img { transform: scale(1.04); }
                .pf-proj__chip { position: absolute; top: 12px; left: 12px; font-family: var(--mono); font-size: 9px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; background: var(--accent); color: var(--on-accent); padding: 4px 9px; }
                .pf-proj__body { padding: 20px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
                .pf-proj__title { font-family: var(--serif); font-weight: 800; font-size: 20px; line-height: 1.2; color: var(--ink); }
                .pf-proj:hover .pf-proj__title { color: var(--accent); }
                .pf-proj__desc { font-size: 13px; line-height: 1.65; color: var(--ink-3); }
                .pf-proj__foot { margin-top: auto; padding-top: 14px; border-top: 1px solid var(--rule); display: flex; align-items: center; justify-content: space-between; gap: 10px; }
                .pf-tags { display: flex; flex-wrap: wrap; gap: 6px; }
                .pf-tag { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.05em; color: var(--ink-2); border: 1px solid var(--rule-dark); padding: 3px 8px; }
                .pf-proj__visit { display: inline-flex; align-items: center; gap: 4px; font-family: var(--mono); font-size: 10.5px; color: var(--accent); flex-shrink: 0; }

                .pf-also { margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                @media (max-width: 600px) { .pf-also { grid-template-columns: 1fr; } }
                .pf-also__item { display: flex; align-items: center; justify-content: space-between; gap: 14px; background: var(--paper-2); border: 1px solid var(--rule-dark); padding: 18px 20px; text-decoration: none; transition: border-color 0.15s; }
                .pf-also__item:hover { border-color: var(--accent); }
                .pf-also__name { font-family: var(--serif); font-weight: 800; font-size: 18px; color: var(--ink); }
                .pf-also__note { font-size: 12.5px; color: var(--ink-3); margin-top: 3px; }
                .pf-also__item svg { color: var(--accent); flex-shrink: 0; }
                .pf-more { display: flex; justify-content: center; margin-top: 32px; }

                /* ── Why + process ── */
                .pf-why { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
                @media (max-width: 860px) { .pf-why { grid-template-columns: 1fr; gap: 44px; } }
                .pf-why__lead { margin-top: 12px; font-size: 15px; line-height: 1.75; color: var(--ink-2); font-weight: 300; max-width: 480px; }
                .pf-reasons { list-style: none; padding: 0; margin: 26px 0 0; display: flex; flex-direction: column; gap: 14px; }
                .pf-reasons li { display: flex; gap: 14px; align-items: flex-start; font-size: 14.5px; line-height: 1.6; color: var(--ink-2); }
                .pf-reasons__tick { width: 24px; height: 24px; background: var(--accent); color: var(--on-accent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
                .pf-steps { display: flex; flex-direction: column; border: 1px solid var(--rule-dark); background: var(--card); }
                .pf-step { display: grid; grid-template-columns: 56px 1fr; gap: 6px; padding: 20px; border-bottom: 1px solid var(--rule); }
                .pf-step:last-child { border-bottom: none; }
                .pf-step__n { font-family: var(--serif); font-weight: 800; font-size: 26px; line-height: 1; color: var(--accent); }
                .pf-step__title { font-family: var(--serif); font-weight: 800; font-size: 18px; color: var(--ink); margin-bottom: 4px; }
                .pf-step__body { font-size: 13px; line-height: 1.6; color: var(--ink-3); }

                .pf-stack { margin-top: 56px; display: flex; align-items: center; gap: 14px 22px; flex-wrap: wrap; padding: 22px 0; border-top: 1px solid var(--rule-dark); border-bottom: 1px solid var(--rule-dark); }
                .pf-stack__label { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); }
                .pf-stack__list { display: flex; flex-wrap: wrap; gap: 8px; }
                .pf-stack__chip { font-family: var(--mono); font-size: 11px; color: var(--ink-2); background: var(--card); border: 1px solid var(--rule-dark); padding: 6px 12px; }

                /* ── Blog ── */
                .pf-blog { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
                @media (max-width: 960px) { .pf-blog { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 600px) { .pf-blog { grid-template-columns: 1fr; } }
                .pf-post { display: flex; flex-direction: column; background: var(--card); border: 1px solid var(--rule-dark); text-decoration: none; transition: transform 0.2s, box-shadow 0.2s; }
                .pf-post:hover { transform: translate(-3px, -3px); box-shadow: 5px 5px 0 var(--accent); }
                .pf-post__media { position: relative; height: 140px; background: #fff; overflow: hidden; border-bottom: 1px solid var(--rule-dark); }
                .pf-post__media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.45s ease; }
                .pf-post:hover .pf-post__media img { transform: scale(1.04); }
                .pf-post__ph { width: 100%; height: 100%; background: repeating-linear-gradient(45deg, #101010, #101010 6px, #171717 6px, #171717 12px); }
                .pf-post__chip { position: absolute; top: 12px; left: 12px; font-family: var(--mono); font-size: 9px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; background: var(--accent); color: var(--on-accent); padding: 4px 9px; }
                .pf-post__body { padding: 18px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
                .pf-post__title { font-family: var(--serif); font-weight: 800; font-size: 18px; line-height: 1.25; color: var(--ink); }
                .pf-post:hover .pf-post__title { color: var(--accent); }
                .pf-post__desc { font-size: 13px; line-height: 1.65; color: var(--ink-3); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
                .pf-post__meta { margin-top: auto; padding-top: 12px; border-top: 1px solid var(--rule); font-family: var(--mono); font-size: 10.5px; color: var(--ink-3); }

                /* ── Contact ── */
                .pf-contact { margin-top: 96px; padding: 56px 0 24px; border-top: 3px double var(--rule-dark); }
                .pf-contact__card { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: 48px; background: var(--card); border: 1px solid var(--rule-dark); border-top: 4px solid var(--accent); padding: 44px; }
                @media (max-width: 860px) { .pf-contact__card { grid-template-columns: minmax(0, 1fr); gap: 32px; padding: 28px 22px; } }
                .pf-contact__title { font-family: var(--serif); font-weight: 800; font-size: clamp(30px, 4.4vw, 48px); line-height: 1.08; letter-spacing: -0.01em; color: var(--ink); }
                .pf-contact__title em { font-style: italic; color: var(--accent); }
                .pf-contact__sub { margin-top: 16px; font-size: 15px; line-height: 1.75; color: var(--ink-2); font-weight: 300; max-width: 460px; }
                .pf-contact__promise { margin-top: 22px; display: flex; flex-direction: column; gap: 10px; }
                .pf-contact__promise span { display: flex; align-items: center; gap: 10px; font-family: var(--mono); font-size: 11.5px; color: var(--ink-2); }
                .pf-contact__promise svg { color: var(--accent); flex-shrink: 0; }
                .pf-contact__actions { display: flex; flex-direction: column; gap: 12px; }
                .pf-contact__actions .pf-btn { justify-content: space-between; width: 100%; }
                .pf-contact__socials { display: flex; gap: 8px; margin-top: 6px; }
                .pf-social { width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--rule-dark); color: var(--ink-2); text-decoration: none; transition: background 0.15s, color 0.15s, border-color 0.15s; }
                .pf-social:hover { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
                .pf-contact__channel { margin-top: 6px; padding-top: 16px; border-top: 1px solid var(--rule); font-size: 13px; color: var(--ink-3); line-height: 1.6; }
                .pf-contact__channel a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }

                @media (max-width: 640px) {
                    .pf-wrap { padding: 0 18px; }
                    .pf-section { padding-top: 64px; }
                    .pf-hero__actions .pf-btn { flex: 1 1 100%; }
                    .pf-stat__num { font-size: 28px; }
                }

                .pf-page :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
                @media (prefers-reduced-motion: reduce) { .pf-page * { transition: none !important; animation: none !important; } }
            `}</style>

            <div className="pf-page">
                <Navbar />

                {/* ── HERO ── */}
                <section id="home" className="pf-hero">
                    <div className="pf-wrap pf-hero__grid">
                        <div>
                            <div className="pf-avail">
                                <span className="pf-ping">
                                    <span className="pf-ping__ring" />
                                    <span className="pf-ping__dot" />
                                </span>
                                Available for new projects
                            </div>
                            <h1 className="pf-hero__title">
                                Web platforms people <em>trust</em> with their money.
                            </h1>
                            <p className="pf-hero__dek">
                                I&apos;m Sir Brown AD, a full stack developer in Abuja. I design and build fast, secure
                                websites, stores and platforms for businesses across Nigeria and Africa, from first sketch
                                to launch.
                            </p>
                            <div className="pf-hero__actions">
                                <Link href="/bc/contact" className="pf-btn pf-btn--solid pf-btn--lg">
                                    Start a project <ArrowRight size={14} />
                                </Link>
                                <a href={CALL_URL} target="_blank" rel="noopener noreferrer" className="pf-btn pf-btn--lg">
                                    <Calendar size={14} /> Book a free call
                                </a>
                            </div>
                            <p className="pf-hero__reply">
                                <Check size={13} /> Free quote <span>·</span> Reply within 24 hours <span>·</span> No commitment
                            </p>

                            <div className="pf-stats">
                                {stats.map((s) => (
                                    <div key={s.label} className="pf-stat">
                                        <div className="pf-stat__num">{s.num}</div>
                                        <div className="pf-stat__label">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pf-portrait">
                            <div className="pf-portrait__frame">
                                <img src="/sirb.png" alt="Sir Brown AD" />
                            </div>
                            <div className="pf-portrait__tag">
                                <div className="pf-portrait__name">Sir Brown AD</div>
                                <div className="pf-portrait__role">Full stack developer · Abuja</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── TRUST STRIP ── */}
                <div className="pf-trust">
                    <div className="pf-wrap pf-trust__inner">
                        <span className="pf-trust__label">Built and shipped</span>
                        <div className="pf-trust__list">
                            {trusted.map((t) => (
                                <span key={t} className="pf-trust__item">{t}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── SERVICES ── */}
                <section id="about" className="pf-section">
                    <div className="pf-wrap">
                        <SectionHead
                            kicker="What I do"
                            title="How I can help your business"
                            note="Pick one, or combine them. Every project starts with a conversation about your goals."
                        />
                        <div className="pf-services">
                            {services.map((s) => (
                                <article key={s.title} className="pf-service">
                                    <div className="pf-service__icon">{s.icon}</div>
                                    <h3 className="pf-service__title">{s.title}</h3>
                                    <p className="pf-service__body">{s.body}</p>
                                    <ul className="pf-service__points">
                                        {s.points.map((p) => (
                                            <li key={p}><Check size={13} /> {p}</li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── PROJECTS ── */}
                <section id="projects" className="pf-section">
                    <div className="pf-wrap">
                        <SectionHead
                            kicker="Selected work"
                            title="Live products you can visit"
                            note="Real platforms in production. Open any of them and see how they work."
                        />
                        <div className="pf-projects">
                            {projects.map((p) => (
                                <a key={p.title} href={p.link} target="_blank" rel="noopener noreferrer" className="pf-proj">
                                    <div className="pf-proj__media">
                                        <img src={p.image} alt={p.title} loading="lazy" />
                                        <span className="pf-proj__chip">{p.kind}</span>
                                    </div>
                                    <div className="pf-proj__body">
                                        <h3 className="pf-proj__title">{p.title}</h3>
                                        <p className="pf-proj__desc">{p.description}</p>
                                        <div className="pf-proj__foot">
                                            <div className="pf-tags">
                                                {p.tags.map((t) => (
                                                    <span key={t} className="pf-tag">{t}</span>
                                                ))}
                                            </div>
                                            <span className="pf-proj__visit">Visit <ArrowUpRight size={12} /></span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div className="pf-also">
                            {alsoBuilt.map((b) => (
                                <a key={b.name} href={b.url} target="_blank" rel="noopener noreferrer" className="pf-also__item">
                                    <div>
                                        <div className="pf-also__name">{b.name}</div>
                                        <div className="pf-also__note">{b.note}</div>
                                    </div>
                                    <ArrowUpRight size={18} />
                                </a>
                            ))}
                        </div>

                        <div className="pf-more">
                            <Link href="/bc/projects" className="pf-btn">
                                All projects <ArrowRight size={13} />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ── WHY + PROCESS ── */}
                <section className="pf-section">
                    <div className="pf-wrap">
                        <div className="pf-why">
                            <div>
                                <div className="pf-kicker">Why work with me</div>
                                <h2 className="pf-h2">Direct, fast and built to last</h2>
                                <p className="pf-why__lead">
                                    A good site is more than good looks. It loads quickly, protects your customers and is easy
                                    for you to manage. That is what I build.
                                </p>
                                <ul className="pf-reasons">
                                    {reasons.map((r) => (
                                        <li key={r}>
                                            <span className="pf-reasons__tick"><Check size={14} /></span>
                                            {r}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <div className="pf-kicker">How it works</div>
                                <div className="pf-steps">
                                    {steps.map((s) => (
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

                        <div className="pf-stack">
                            <span className="pf-stack__label">Tools I use</span>
                            <div className="pf-stack__list">
                                {stack.map((s) => (
                                    <span key={s} className="pf-stack__chip">{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── TESTIMONIALS ── */}
                <div className="pf-section">
                    <Testimonials />
                </div>

                {/* ── BLOG ── */}
                {latestArticles?.length > 0 && (
                    <section id="blog" className="pf-section">
                        <div className="pf-wrap">
                            <SectionHead
                                kicker="From the blog"
                                title="Notes on fraud, security and building"
                                note="Free to read. Shared to help people avoid costly mistakes."
                            />
                            <div className="pf-blog">
                                {latestArticles.slice(0, 3).map((a) => (
                                    <Link key={a.slug} href={`/blog/${a.slug}`} className="pf-post">
                                        <div className="pf-post__media">
                                            {a.image ? (
                                                <img src={a.image} alt={a.title} loading="lazy" onError={(e) => (e.target.style.display = "none")} />
                                            ) : (
                                                <div className="pf-post__ph" />
                                            )}
                                            {a.category && <span className="pf-post__chip">{a.category}</span>}
                                        </div>
                                        <div className="pf-post__body">
                                            <h3 className="pf-post__title">{a.title}</h3>
                                            <p className="pf-post__desc">{a.preview}</p>
                                            <div className="pf-post__meta">
                                                {a.postedBy && <>{a.postedBy} · </>}
                                                {a.readingTime} min read
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="pf-more">
                                <Link href="/blog" className="pf-btn">
                                    All articles <ArrowRight size={13} />
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* ── CONTACT ── */}
                <section id="contact" className="pf-wrap pf-contact">
                    <div className="pf-contact__card">
                        <div>
                            <div className="pf-kicker">Let&apos;s talk</div>
                            <h2 className="pf-contact__title">
                                Got an idea? Let&apos;s turn it into a <em>working product.</em>
                            </h2>
                            <p className="pf-contact__sub">
                                Tell me what you want to build, even if it is rough. I will reply with a clear plan, a
                                timeline and a price.
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
                                <a href="https://github.com/Brown-Oziomachi" target="_blank" rel="noopener noreferrer" className="pf-social" aria-label="GitHub"><Github size={16} /></a>
                                <a href="https://www.linkedin.com/in/brownoziomachi72a5a3229" target="_blank" rel="noopener noreferrer" className="pf-social" aria-label="LinkedIn"><Linkedin size={16} /></a>
                                <Link href="/cv" className="pf-social" aria-label="Resume"><Download size={16} /></Link>
                                <Link href="/bc/about" className="pf-social" aria-label="About me"><ArrowUpRight size={16} /></Link>
                            </div>
                            <p className="pf-contact__channel">
                                Prefer to follow along first?{" "}
                                <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">Join my WhatsApp channel</a>{" "}
                                for new articles and fraud alerts.
                            </p>
                        </div>
                    </div>
                </section>

                <Footer />

                <Suspense fallback={null}>
                    <FloatingClient onChatOpen={() => setIsChatOpen(true)} />
                </Suspense>
                <FirebaseChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
            </div>
        </>
    );
}