"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import {
    Github, Linkedin, Mail, Download, ArrowRight, ArrowUpRight, ArrowLeft,
    Calendar, ShieldCheck, CreditCard, Layers, Newspaper, Check, User, MapPin,
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

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

                .pf-page {
                    --paper: #ffffff; --paper-2: #f6f5f0; --card: #ffffff;
                    --ink: #111111; --ink-2: #3f3f3f; --ink-3: #6f6f6f;
                    --rule: #e4e2da; --rule-dark: #111111;
                    --accent: #e8ff47; --on-accent: #0a0a0b;
                    --serif: 'Playfair Display', Georgia, serif;
                    --sans: 'Inter', system-ui, sans-serif;
                    --mono: 'JetBrains Mono', 'Fira Code', monospace;
                    background: var(--paper); color: var(--ink); font-family: var(--sans);
                    min-height: 100vh; overflow-x: hidden;
                }
                .pf-page *, .pf-page *::before, .pf-page *::after { box-sizing: border-box; }
                .pf-page h1, .pf-page h2, .pf-page h3, .pf-page p, .pf-page ul { margin: 0; }
                :where(.pf-page a) { color: inherit; text-decoration: none; }
                .pf-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
                .pf-section { padding: 88px 0 0; }

                /* Buttons */
                .pf-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-family: var(--mono); font-size: 11.5px; letter-spacing: 0.06em; padding: 13px 20px; border: 1.5px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; transition: background 0.15s, color 0.15s, transform 0.15s; }
                .pf-btn:hover { background: var(--ink); color: #fff; transform: translateY(-1px); }
                .pf-btn--solid { background: var(--accent); color: var(--on-accent); font-weight: 600; }
                .pf-btn--solid:hover { background: var(--ink); color: var(--accent); }
                .pf-btn--lg { padding: 16px 26px; font-size: 12px; }

                /* Section heads */
                .pf-kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 10px; }
                .pf-kicker b { background: var(--accent); color: var(--on-accent); padding: 2px 7px; font-weight: 500; }
                .pf-h2 { font-family: var(--serif); font-weight: 800; font-size: clamp(28px, 4vw, 42px); line-height: 1.1; letter-spacing: -0.01em; }
                .pf-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding-top: 12px; border-top: 3px solid var(--rule-dark); margin-bottom: 30px; }
                .pf-head__note { font-size: 14px; line-height: 1.6; color: var(--ink-2); max-width: 380px; }

                /* Hero */
                .pf-hero { padding: 132px 0 64px; border-bottom: 1px solid var(--rule); }
                .pf-hero__grid { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr); gap: 56px; align-items: center; }
                @media (max-width: 900px) { .pf-hero__grid { grid-template-columns: minmax(0, 1fr); gap: 40px; } .pf-hero { padding-top: 108px; } }
                .pf-avail { display: inline-flex; align-items: center; gap: 10px; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase; background: var(--accent); color: var(--on-accent); padding: 7px 13px; margin-bottom: 26px; }
                .pf-ping { position: relative; width: 8px; height: 8px; flex-shrink: 0; }
                .pf-ping__ring { position: absolute; inset: 0; border-radius: 50%; background: var(--on-accent); opacity: 0.4; animation: pf-ping 1.6s ease-out infinite; }
                .pf-ping__dot { position: absolute; inset: 1px; border-radius: 50%; background: var(--on-accent); }
                @keyframes pf-ping { 0% { transform: scale(1); opacity: 0.4; } 100% { transform: scale(2.6); opacity: 0; } }
                .pf-hero__title { font-family: var(--serif); font-weight: 800; font-size: clamp(38px, 6vw, 70px); line-height: 1.04; letter-spacing: -0.015em; }
                .pf-hero__title em { font-style: italic; background: linear-gradient(transparent 62%, var(--accent) 62%); }
                .pf-hero__dek { margin-top: 24px; max-width: 560px; font-size: clamp(15px, 1.6vw, 18px); line-height: 1.7; font-weight: 300; color: var(--ink-2); border-left: 3px solid var(--accent); padding-left: 18px; }
                .pf-hero__actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
                .pf-hero__reply { margin-top: 16px; font-family: var(--mono); font-size: 11px; color: var(--ink-3); display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
                .pf-hero__reply svg { color: var(--ink); background: var(--accent); padding: 2px; width: 17px; height: 17px; }

                .pf-stats { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 44px; border-top: 3px solid var(--rule-dark); border-bottom: 1px solid var(--rule); }
                .pf-stat { padding: 18px 16px 16px 0; }
                .pf-stat + .pf-stat { padding-left: 18px; border-left: 1px solid var(--rule); }
                .pf-stat__num { font-family: var(--serif); font-weight: 800; font-size: 34px; line-height: 1; }
                .pf-stat__label { margin-top: 6px; font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3); }

                .pf-portrait { position: relative; max-width: 380px; margin-left: auto; }
                @media (max-width: 900px) { .pf-portrait { margin: 0 auto; width: 100%; } }
                .pf-portrait__frame { aspect-ratio: 4 / 5; background: var(--paper-2); border: 1.5px solid var(--ink); overflow: hidden; box-shadow: 8px 8px 0 var(--accent); }
                .pf-portrait__frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
                .pf-portrait__tag { position: absolute; left: -14px; bottom: 28px; background: #fff; border: 1.5px solid var(--ink); border-left: 5px solid var(--accent); padding: 12px 16px; }
                @media (max-width: 480px) { .pf-portrait__tag { left: 8px; } }
                .pf-portrait__name { font-family: var(--serif); font-weight: 800; font-size: 18px; }
                .pf-portrait__role { font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-3); margin-top: 3px; }

                /* Trust strip */
                .pf-trust { padding: 22px 0; background: var(--paper-2); border-bottom: 1px solid var(--rule); }
                .pf-trust__inner { display: flex; align-items: center; gap: 14px 28px; flex-wrap: wrap; }
                .pf-trust__label { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); flex-shrink: 0; }
                .pf-trust__list { display: flex; flex-wrap: wrap; gap: 8px 22px; }
                .pf-trust__item { font-family: var(--serif); font-weight: 800; font-size: 16px; color: var(--ink-2); }

                /* About strip */
                .pf-about { display: grid; grid-template-columns: 280px minmax(0, 1fr); gap: 48px; align-items: center; border: 1.5px solid var(--ink); background: var(--paper-2); padding: 36px; }
                @media (max-width: 820px) { .pf-about { grid-template-columns: minmax(0, 1fr); gap: 24px; padding: 24px 20px; } }
                .pf-about__img { aspect-ratio: 1; background: #fff; border: 1.5px solid var(--ink); overflow: hidden; box-shadow: 6px 6px 0 var(--accent); max-width: 280px; }
                .pf-about__img img { width: 100%; height: 100%; object-fit: cover; display: block; }
                .pf-about__title { font-family: var(--serif); font-weight: 800; font-size: clamp(26px, 3.6vw, 38px); line-height: 1.12; letter-spacing: -0.01em; }
                .pf-about__title em { font-style: italic; background: linear-gradient(transparent 62%, var(--accent) 62%); }
                .pf-about__text { margin-top: 14px; font-size: 15px; line-height: 1.8; color: var(--ink-2); max-width: 600px; }
                .pf-about__meta { margin-top: 14px; display: flex; flex-wrap: wrap; gap: 6px 18px; font-family: var(--mono); font-size: 11px; color: var(--ink-3); }
                .pf-about__meta span { display: inline-flex; align-items: center; gap: 6px; }
                .pf-about__actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 22px; }

                /* Services */
                .pf-services { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                @media (max-width: 760px) { .pf-services { grid-template-columns: 1fr; } }
                .pf-service { background: var(--card); border: 1px solid var(--rule-dark); border-top: 4px solid var(--accent); padding: 26px; display: flex; flex-direction: column; gap: 12px; transition: transform 0.2s, box-shadow 0.2s; }
                .pf-service:hover { transform: translate(-3px, -3px); box-shadow: 6px 6px 0 var(--ink); }
                .pf-service__icon { width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; background: var(--accent); color: var(--on-accent); border: 1.5px solid var(--ink); }
                .pf-service__title { font-family: var(--serif); font-weight: 800; font-size: 22px; line-height: 1.2; }
                .pf-service__body { font-size: 14px; line-height: 1.7; color: var(--ink-2); }
                .pf-service__points { list-style: none; padding: 14px 0 0; margin-top: 4px; border-top: 1px solid var(--rule); display: flex; flex-direction: column; gap: 8px; }
                .pf-service__points li { display: flex; align-items: center; gap: 9px; font-family: var(--mono); font-size: 11px; color: var(--ink-2); }
                .pf-service__points svg { color: var(--ink); background: var(--accent); padding: 2px; width: 17px; height: 17px; flex-shrink: 0; }

                /* Projects */
                .pf-projects { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
                @media (max-width: 960px) { .pf-projects { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 600px) { .pf-projects { grid-template-columns: 1fr; } }
                .pf-proj { display: flex; flex-direction: column; background: var(--card); border: 1px solid var(--rule-dark); transition: transform 0.2s, box-shadow 0.2s; }
                .pf-proj:hover { transform: translate(-3px, -3px); box-shadow: 6px 6px 0 var(--accent); }
                .pf-proj__media { position: relative; height: 160px; background: var(--paper-2); overflow: hidden; border-bottom: 1px solid var(--rule-dark); }
                .pf-proj__media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.45s ease; }
                .pf-proj:hover .pf-proj__media img { transform: scale(1.04); }
                .pf-chip { position: absolute; top: 12px; left: 12px; font-family: var(--mono); font-size: 9px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; background: var(--accent); color: var(--on-accent); padding: 4px 9px; border: 1px solid var(--ink); }
                .pf-proj__body { padding: 20px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
                .pf-proj__title { font-family: var(--serif); font-weight: 800; font-size: 20px; line-height: 1.2; }
                .pf-proj:hover .pf-proj__title { text-decoration: underline; text-underline-offset: 3px; }
                .pf-proj__desc { font-size: 13px; line-height: 1.65; color: var(--ink-3); }
                .pf-proj__foot { margin-top: auto; padding-top: 14px; border-top: 1px solid var(--rule); display: flex; align-items: center; justify-content: space-between; gap: 10px; }
                .pf-tags { display: flex; flex-wrap: wrap; gap: 6px; }
                .pf-tag { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.05em; color: var(--ink-2); border: 1px solid var(--rule-dark); padding: 3px 8px; background: #fff; }
                .pf-proj__visit { display: inline-flex; align-items: center; gap: 4px; font-family: var(--mono); font-size: 10.5px; font-weight: 600; flex-shrink: 0; }

                .pf-also { margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                @media (max-width: 600px) { .pf-also { grid-template-columns: 1fr; } }
                .pf-also__item { display: flex; align-items: center; justify-content: space-between; gap: 14px; background: var(--paper-2); border: 1px solid var(--rule-dark); padding: 18px 20px; transition: background 0.15s; }
                .pf-also__item:hover { background: var(--accent); }
                .pf-also__name { font-family: var(--serif); font-weight: 800; font-size: 18px; }
                .pf-also__note { font-size: 12.5px; color: var(--ink-3); margin-top: 3px; }
                .pf-also__item:hover .pf-also__note { color: var(--ink-2); }
                .pf-also__item svg { flex-shrink: 0; }
                .pf-more { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-top: 32px; }

                /* Why + process */
                .pf-why { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
                @media (max-width: 860px) { .pf-why { grid-template-columns: 1fr; gap: 44px; } }
                .pf-why__lead { margin-top: 12px; font-size: 15px; line-height: 1.75; color: var(--ink-2); font-weight: 300; max-width: 480px; }
                .pf-reasons { list-style: none; padding: 0; margin: 26px 0 0; display: flex; flex-direction: column; gap: 14px; }
                .pf-reasons li { display: flex; gap: 14px; align-items: flex-start; font-size: 14.5px; line-height: 1.6; color: var(--ink-2); }
                .pf-reasons__tick { width: 24px; height: 24px; background: var(--accent); color: var(--on-accent); border: 1px solid var(--ink); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
                .pf-steps { display: flex; flex-direction: column; border: 1.5px solid var(--ink); background: var(--card); margin-top: 10px; }
                .pf-step { display: grid; grid-template-columns: 56px 1fr; gap: 6px; padding: 20px; border-bottom: 1px solid var(--rule); }
                .pf-step:last-child { border-bottom: none; }
                .pf-step__n { font-family: var(--serif); font-weight: 800; font-size: 26px; line-height: 1; background: linear-gradient(transparent 60%, var(--accent) 60%); width: fit-content; height: fit-content; }
                .pf-step__title { font-family: var(--serif); font-weight: 800; font-size: 18px; margin-bottom: 4px; }
                .pf-step__body { font-size: 13px; line-height: 1.6; color: var(--ink-3); }

                .pf-stack { margin-top: 56px; display: flex; align-items: center; gap: 14px 22px; flex-wrap: wrap; padding: 22px 0; border-top: 1px solid var(--ink); border-bottom: 1px solid var(--rule); }
                .pf-stack__label { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); }
                .pf-stack__list { display: flex; flex-wrap: wrap; gap: 8px; }
                .pf-stack__chip { font-family: var(--mono); font-size: 11px; color: var(--ink-2); background: var(--paper-2); border: 1px solid var(--rule); padding: 6px 12px; }

                /* Blog */
                .pf-blog { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
                @media (max-width: 960px) { .pf-blog { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 600px) { .pf-blog { grid-template-columns: 1fr; } }
                .pf-post { display: flex; flex-direction: column; background: var(--card); border: 1px solid var(--rule-dark); transition: transform 0.2s, box-shadow 0.2s; }
                .pf-post:hover { transform: translate(-3px, -3px); box-shadow: 6px 6px 0 var(--accent); }
                .pf-post__media { position: relative; height: 140px; background: var(--paper-2); overflow: hidden; border-bottom: 1px solid var(--rule-dark); }
                .pf-post__media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.45s ease; }
                .pf-post:hover .pf-post__media img { transform: scale(1.04); }
                .pf-post__ph { width: 100%; height: 100%; background: repeating-linear-gradient(45deg, #ebe8e0, #ebe8e0 6px, #e3e0d7 6px, #e3e0d7 12px); }
                .pf-post__body { padding: 18px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
                .pf-post__title { font-family: var(--serif); font-weight: 800; font-size: 18px; line-height: 1.25; }
                .pf-post:hover .pf-post__title { text-decoration: underline; text-underline-offset: 3px; }
                .pf-post__desc { font-size: 13px; line-height: 1.65; color: var(--ink-3); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
                .pf-post__meta { margin-top: auto; padding-top: 12px; border-top: 1px solid var(--rule); font-family: var(--mono); font-size: 10.5px; color: var(--ink-3); }

                /* Contact */
                .pf-contact { margin-top: 96px; }
                .pf-contact__card { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: 48px; background: var(--ink); color: #f4f1ea; border-top: 5px solid var(--accent); padding: 48px; }
                @media (max-width: 860px) { .pf-contact__card { grid-template-columns: minmax(0, 1fr); gap: 32px; padding: 32px 22px; } }
                .pf-contact__kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); margin-bottom: 10px; }
                .pf-contact__title { font-family: var(--serif); font-weight: 800; font-size: clamp(30px, 4.4vw, 48px); line-height: 1.08; letter-spacing: -0.01em; }
                .pf-contact__title em { font-style: italic; color: var(--accent); }
                .pf-contact__sub { margin-top: 16px; font-size: 15px; line-height: 1.75; color: #bdb8ae; font-weight: 300; max-width: 460px; }
                .pf-contact__promise { margin-top: 22px; display: flex; flex-direction: column; gap: 10px; }
                .pf-contact__promise span { display: flex; align-items: center; gap: 10px; font-family: var(--mono); font-size: 11.5px; color: #d9d6cc; }
                .pf-contact__promise svg { color: var(--accent); flex-shrink: 0; }
                .pf-contact__actions { display: flex; flex-direction: column; gap: 12px; }
                .pf-contact .pf-btn { border-color: #f4f1ea; color: #f4f1ea; justify-content: space-between; width: 100%; }
                .pf-contact .pf-btn:hover { background: #f4f1ea; color: var(--ink); }
                .pf-contact .pf-btn--solid { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
                .pf-contact .pf-btn--solid:hover { background: #fff; border-color: #fff; color: var(--ink); }
                .pf-contact__socials { display: flex; gap: 8px; margin-top: 6px; }
                .pf-social { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; border: 1px solid #555; color: #f4f1ea; transition: background 0.15s, color 0.15s, border-color 0.15s; }
                .pf-social:hover { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
                .pf-contact__channel { margin-top: 6px; padding-top: 16px; border-top: 1px solid #333; font-size: 13px; color: #bdb8ae; line-height: 1.6; }
                .pf-contact__channel a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }

                @media (max-width: 640px) {
                    .pf-wrap { padding: 0 18px; }
                    .pf-section { padding-top: 64px; }
                    .pf-hero__actions .pf-btn { flex: 1 1 100%; }
                    .pf-stat__num { font-size: 28px; }
                }

                .pf-page :focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
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
                                <Link href="/bc/about" className="pf-btn pf-btn--lg">
                                    <User size={14} /> About me
                                </Link>
                            </div>
                            <p className="pf-hero__reply">
                                <Check /> Free quote <span>·</span> Reply within 24 hours <span>·</span> No commitment
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

                {/* ── ABOUT ── */}
                <section id="about" className="pf-section">
                    <div className="pf-wrap">
                        <div className="pf-about">
                            <div className="pf-about__img">
                                <img src="/sirb.png" alt="Sir Brown AD" />
                            </div>
                            <div>
                                <div className="pf-kicker"><b>Who you&apos;ll work with</b></div>
                                <h2 className="pf-about__title">
                                    One developer. <em>Your whole project.</em>
                                </h2>
                                <p className="pf-about__text">
                                    I build secure web platforms for Nigeria and Africa, and I write about fraud and web
                                    security on my blog. I run my own live products, so I know what it takes to keep a site
                                    fast, safe and working after launch.
                                </p>
                                <div className="pf-about__meta">
                                    <span><MapPin size={13} /> Abuja, Nigeria (remote)</span>
                                    <span><Check size={13} /> Next.js, Nuxt, Node.js, Firebase</span>
                                </div>
                                <div className="pf-about__actions">
                                    <Link href="/bc/about" className="pf-btn pf-btn--solid">
                                        Read my full story <ArrowRight size={13} />
                                    </Link>
                                    <Link href="/bc/contact" className="pf-btn">
                                        Start a project
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── SERVICES ── */}
                <section className="pf-section">
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
                                            <li key={p}><Check /> {p}</li>
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
                                        <span className="pf-chip">{p.kind}</span>
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
                            <Link href="/bc/about" className="pf-btn pf-btn--solid">
                                <User size={13} /> About me
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
                                            {a.category && <span className="pf-chip">{a.category}</span>}
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
                            <div className="pf-contact__kicker">Let&apos;s talk</div>
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
                            <Link href="/bc/about" className="pf-btn pf-btn--lg">
                                About me <User size={14} />
                            </Link>
                            <div className="pf-contact__socials">
                                <a href="https://github.com/Brown-Oziomachi" target="_blank" rel="noopener noreferrer" className="pf-social" aria-label="GitHub"><Github size={16} /></a>
                                <a href="https://www.linkedin.com/in/brownoziomachi72a5a3229" target="_blank" rel="noopener noreferrer" className="pf-social" aria-label="LinkedIn"><Linkedin size={16} /></a>
                                <Link href="/cv" className="pf-social" aria-label="Resume"><Download size={16} /></Link>
                            </div>
                            <p className="pf-contact__channel">
                                Prefer to follow along first?{" "}
                                <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">Join my WhatsApp channel</a>{" "}
                                for new articles and fraud alerts.
                            </p>
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