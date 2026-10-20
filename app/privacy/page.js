import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import Footer from "@/components/footer";

export const metadata = {
    title: "Privacy Policy | Sir Brown AD",
    description:
        "How Sir Brown AD (browncode.name.ng) collects, uses and protects information from comments, contact messages, newsletters, payments and advertising.",
    alternates: { canonical: "https://browncode.name.ng/privacy" },
};

const WHATSAPP = "2348142995114";
const EMAIL = "browncemmanuel@gmail.com";

const providers = [
    ["Firebase (Google)", "Database and sign-in for comments, likes, chat and site data", "Comment text, name, email, likes count, chat messages"],
    ["Vercel", "Hosting and delivery of the site", "Standard server logs: IP address, browser and device type, pages requested"],
    ["Flutterwave", "Online payments for sponsored articles and marketplace sales", "Payment details you enter on Flutterwave's page. I do not see or store your card number"],
    ["Google AdSense", "Advertising shown on the site", "Cookies and ad identifiers (see section 6)"],
    ["WhatsApp (Meta)", "Messaging when you contact me or follow my channel", "Your phone number and messages, handled under WhatsApp's own policy"],
    ["Cal.com", "Booking free calls", "Your name, email and chosen time, handled under Cal.com's policy"],
];

const sections = [
    {
        id: "overview",
        title: "Who I am and what this covers",
        body: (
            <>
                <p>
                    This policy covers <strong>browncode.name.ng</strong> and the related pages published by Sir Brown AD
                    (Brown Oziomachi), a full stack developer and publisher in Abuja, Nigeria. It explains what
                    information I collect through the site, why, who else handles it, and what choices you have.
                </p>
                <p>
                    I keep data collection small. I do not sell personal information, and I do not run marketing
                    mailing lists for other companies.
                </p>
            </>
        ),
    },
    {
        id: "collect",
        title: "What I collect",
        body: (
            <>
                <ul className="lg-list">
                    <li><b>Contact messages.</b> The contact form does not send anything to a server. It opens WhatsApp or your email app with your message filled in, and you press send. I only receive what you actually send, which can include your name, email, phone number and project details.</li>
                    <li><b>Comments.</b> When you comment on an article I store your name, your comment and the time. I also ask for your email address, which is used to stop duplicate comments and so I can reply. It is not shown publicly.</li>
                    <li><b>Likes.</b> A like adds to a public counter for the article. Your browser remembers which articles you liked, so the heart stays filled when you come back.</li>
                    <li><b>Newsletter.</b> If you subscribe through a sign-up box on an article, I store the email address you enter, along with the topic or article you subscribed from.</li>
                    <li><b>Live chat.</b> If you use the chat widget, your messages are saved so the conversation can continue during support.</li>
                    <li><b>Payments.</b> If you pay for a sponsored article or buy something on a platform I run, the payment is processed by Flutterwave. I receive confirmation of the payment and the details needed to deliver your order, not your card number.</li>
                    <li><b>Technical logs.</b> Like any website, the hosting provider records basic request information such as IP address, browser type and pages visited, to keep the site running and secure.</li>
                </ul>
            </>
        ),
    },
    {
        id: "use",
        title: "How I use it",
        body: (
            <ul className="lg-list">
                <li>To reply to your messages, quotes and support requests.</li>
                <li>To show comments and like counts, and to prevent spam and duplicate comments.</li>
                <li>To send the newsletter or updates you signed up for.</li>
                <li>To deliver paid services, such as writing and publishing a sponsored article, and to keep records of payments.</li>
                <li>To keep the site fast, secure and free of abuse.</li>
                <li>To show advertising through Google AdSense.</li>
            </ul>
        ),
    },
    {
        id: "providers",
        title: "Who else handles your data",
        body: (
            <>
                <p>I use a small set of trusted services to run the site. Each handles data under its own policy.</p>
                <div className="lg-table" role="table" aria-label="Service providers">
                    <div className="lg-table__head" role="row">
                        <span>Provider</span><span>What it does</span><span>Data involved</span>
                    </div>
                    {providers.map(([name, what, data]) => (
                        <div key={name} className="lg-table__row" role="row">
                            <b data-label="Provider">{name}</b>
                            <span data-label="What it does">{what}</span>
                            <span data-label="Data involved">{data}</span>
                        </div>
                    ))}
                </div>
                <p>
                    I do not sell your data or share it with marketing agencies. I may disclose information if the law
                    requires it, or to protect the site and its users from fraud and abuse.
                </p>
            </>
        ),
    },
    {
        id: "cookies",
        title: "Cookies and browser storage",
        body: (
            <>
                <p>The site uses a small amount of storage in your browser:</p>
                <ul className="lg-list">
                    <li>A record of which articles you have liked, so your likes are remembered.</li>
                    <li>Simple flags that stop a pop-up from showing again and again.</li>
                    <li>Cookies set by Google AdSense and its partners (see the next section).</li>
                </ul>
                <p>You can clear this data at any time in your browser settings. Clearing it will not affect your comments.</p>
            </>
        ),
    },
    {
        id: "ads",
        title: "Advertising and cookies",
        body: (
            <>
                <p>
                    This site displays advertising served by Google AdSense. Google and its advertising partners use
                    cookies, including the DoubleClick cookie, to serve ads based on your prior visits to this and
                    other websites. This lets Google and its partners show you ads based on your visit to this site
                    and other sites on the Internet.
                </p>
                <p>
                    You can opt out of personalised advertising at{" "}
                    <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="lg-link">Google Ads Settings</a>.
                    You can also opt out of a third-party vendor's use of cookies for personalised advertising at{" "}
                    <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="lg-link">www.aboutads.info</a>.
                </p>
                <p>This site does not run any other third-party ad network alongside Google AdSense.</p>
            </>
        ),
    },
    {
        id: "sponsored",
        title: "Sponsored content and affiliate links",
        body: (
            <>
                <p>
                    I publish sponsored articles for businesses, and they are clearly labelled as sponsored. When you
                    buy a sponsored placement, I use the brand name, website and details you send me to write and
                    publish your article.
                </p>
                <p>
                    Some links on the site, such as the tools in the Utilities menu, are referral or affiliate links.
                    If you sign up or buy through one, I may earn a commission at no extra cost to you. Following one
                    of these links takes you to another company's site, which has its own privacy policy.
                </p>
            </>
        ),
    },
    {
        id: "keep",
        title: "How long I keep data and how I protect it",
        body: (
            <>
                <p>
                    I keep comments, chat records and newsletter sign-ups until you ask me to remove them or I no
                    longer need them. Records of payments and client projects are kept as long as needed for
                    accounting and for supporting the work I delivered.
                </p>
                <p>
                    The site is served over HTTPS. Data stored in Firebase is protected by access rules, and actions
                    that involve money or user records run on the server rather than in your browser. No system is
                    perfectly secure, so I cannot promise absolute security, but I take care to limit access.
                </p>
            </>
        ),
    },
    {
        id: "rights",
        title: "Your rights",
        body: (
            <>
                <p>
                    You can ask me at any time to show you the information I hold about you, correct it, or delete it,
                    including your comments, newsletter subscription and chat records. You can also withdraw consent for
                    anything you agreed to, such as the newsletter. I handle personal data with the Nigeria Data
                    Protection Act 2023 in mind.
                </p>
                <p>
                    To make a request, message me on{" "}
                    <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="lg-link">WhatsApp</a>{" "}
                    or email <a href={`mailto:${EMAIL}`} className="lg-link">{EMAIL}</a>. I will confirm it is you and
                    act on the request.
                </p>
            </>
        ),
    },
    {
        id: "children",
        title: "Children",
        body: (
            <p>
                The site is not aimed at children under 13, and I do not knowingly collect information from them. If you
                believe a child has sent me personal information, contact me and I will delete it.
            </p>
        ),
    },
    {
        id: "changes",
        title: "Changes and contact",
        body: (
            <p>
                I may update this policy as the site changes. The date at the top shows when it was last updated.
                Questions about privacy can go to{" "}
                <a href={`mailto:${EMAIL}`} className="lg-link">{EMAIL}</a> or through the{" "}
                <Link href="/bc/contact" className="lg-link">contact page</Link>.
            </p>
        ),
    },
];

export default function PrivacyPolicy() {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

                .lg-page {
                    --paper: #ffffff; --paper-2: #f6f5f0;
                    --ink: #111111; --ink-2: #3f3f3f; --ink-3: #6f6f6f;
                    --rule: #e4e2da; --rule-dark: #111111;
                    --accent: #e8ff47; --on-accent: #0a0a0b;
                    --serif: 'Playfair Display', Georgia, serif;
                    --sans: 'Inter', system-ui, sans-serif;
                    --mono: 'JetBrains Mono', 'Fira Code', monospace;
                    background: var(--paper); color: var(--ink); font-family: var(--sans); min-height: 100vh;
                }
                .lg-page *, .lg-page *::before, .lg-page *::after { box-sizing: border-box; }
                .lg-page h1, .lg-page h2, .lg-page p, .lg-page ul { margin: 0; padding: 0; }
                :where(.lg-page a) { color: inherit; text-decoration: none; }
                .lg-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }

                .lg-nav { position: sticky; top: 0; z-index: 1000; background: rgba(255,255,255,0.92); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); border-bottom: 1px solid var(--rule); }
                .lg-nav__inner { max-width: 1120px; margin: 0 auto; padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
                .lg-nav__brand { font-family: var(--serif); font-weight: 800; font-size: 21px; letter-spacing: -0.01em; }
                .lg-nav__brand em { font-style: normal; background: var(--accent); padding: 0 3px; }

                .lg-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em; padding: 9px 14px; border: 1.5px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; transition: background 0.15s, color 0.15s, transform 0.15s; }
                .lg-btn:hover { background: var(--ink); color: #fff; transform: translateY(-1px); }
                .lg-btn--solid { background: var(--accent); color: var(--on-accent); font-weight: 600; }
                .lg-btn--solid:hover { background: var(--ink); color: var(--accent); }

                .lg-head { padding: 64px 0 36px; border-bottom: 3px solid var(--rule-dark); }
                .lg-kicker { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; background: var(--accent); color: var(--on-accent); padding: 4px 10px; width: fit-content; margin-bottom: 20px; }
                .lg-title { font-family: var(--serif); font-weight: 800; font-size: clamp(40px, 6.6vw, 80px); line-height: 1.02; letter-spacing: -0.025em; }
                .lg-meta { margin-top: 20px; display: flex; flex-wrap: wrap; align-items: center; gap: 10px 18px; font-family: var(--mono); font-size: 11.5px; color: var(--ink-3); }
                .lg-badge { display: inline-flex; align-items: center; gap: 6px; border: 1px solid var(--ink); color: var(--ink); padding: 3px 10px; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; }

                .lg-short { margin: 32px 0 0; border: 1.5px solid var(--ink); background: var(--paper-2); box-shadow: 6px 6px 0 var(--accent); padding: 22px 24px; max-width: 760px; }
                .lg-short b { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; background: var(--accent); padding: 2px 7px; display: inline-block; margin-bottom: 10px; }
                .lg-short p { font-size: 15px; line-height: 1.75; color: var(--ink-2); }

                .lg-grid { display: grid; grid-template-columns: 240px minmax(0, 1fr); gap: 56px; align-items: start; padding: 48px 0 24px; }
                @media (max-width: 900px) { .lg-grid { grid-template-columns: minmax(0, 1fr); gap: 28px; } }
                .lg-toc { position: sticky; top: 84px; border-top: 3px solid var(--ink); padding-top: 12px; }
                @media (max-width: 900px) { .lg-toc { position: static; } }
                .lg-toc__label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 10px; }
                .lg-toc ol { list-style: none; display: flex; flex-direction: column; counter-reset: toc; }
                .lg-toc a { counter-increment: toc; display: flex; gap: 10px; padding: 7px 0; font-size: 13.5px; line-height: 1.4; color: var(--ink-2); border-left: 3px solid transparent; padding-left: 10px; margin-left: -1px; transition: color 0.15s, border-color 0.15s; }
                .lg-toc a::before { content: counter(toc, decimal-leading-zero); font-family: var(--mono); font-size: 10.5px; color: var(--ink-3); padding-top: 2px; }
                .lg-toc a:hover { color: var(--ink); border-left-color: var(--accent); }

                .lg-sec { padding: 0 0 40px; scroll-margin-top: 84px; }
                .lg-sec + .lg-sec { padding-top: 36px; border-top: 1px solid var(--rule); }
                .lg-sec__num { font-family: var(--mono); font-size: 11px; background: var(--accent); width: fit-content; padding: 2px 8px; margin-bottom: 12px; }
                .lg-sec__title { font-family: var(--serif); font-weight: 800; font-size: clamp(24px, 3vw, 32px); line-height: 1.15; margin-bottom: 14px; }
                .lg-body { display: flex; flex-direction: column; gap: 14px; font-size: 15.5px; line-height: 1.85; color: var(--ink-2); max-width: 720px; }
                .lg-body strong, .lg-list b { color: var(--ink); font-weight: 600; }
                .lg-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
                .lg-list li { position: relative; padding-left: 22px; }
                .lg-list li::before { content: ''; position: absolute; left: 0; top: 11px; width: 8px; height: 8px; background: var(--accent); border: 1px solid var(--ink); }
                .lg-link { color: var(--ink); font-weight: 500; text-decoration: underline; text-decoration-color: #c9c600; text-decoration-thickness: 2px; text-underline-offset: 3px; }
                .lg-link:hover { background: var(--accent); }

                .lg-table { border: 1px solid var(--ink); margin: 4px 0 6px; max-width: 100%; }
                .lg-table__head, .lg-table__row { display: grid; grid-template-columns: 1fr 1.3fr 1.5fr; gap: 16px; padding: 12px 16px; font-size: 13px; line-height: 1.6; }
                .lg-table__head { background: var(--ink); color: #f4f1ea; font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; }
                .lg-table__row { border-top: 1px solid var(--rule); color: var(--ink-2); }
                .lg-table__row b { color: var(--ink); font-weight: 600; }
                @media (max-width: 700px) {
                    .lg-table__head { display: none; }
                    .lg-table__row { grid-template-columns: 1fr; gap: 4px; }
                    .lg-table__row span::before { content: attr(data-label) ": "; font-family: var(--mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-3); }
                }

                .lg-foot { margin-top: 24px; border-top: 3px solid var(--rule-dark); padding: 28px 0 72px; display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
                .lg-foot__info { display: flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 10.5px; color: var(--ink-3); }
                .lg-foot__actions { display: flex; gap: 10px; flex-wrap: wrap; }

                @media (max-width: 640px) { .lg-wrap, .lg-nav__inner { padding-left: 18px; padding-right: 18px; } .lg-head { padding-top: 40px; } }
                .lg-page :focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
                @media (prefers-reduced-motion: reduce) { .lg-page * { transition: none !important; } }
            `}</style>

            <div className="lg-page">
                <header className="lg-nav">
                    <div className="lg-nav__inner">
                        <Link href="/" className="lg-nav__brand">brown<em>.</em>dev</Link>
                        <Link href="/" className="lg-btn"><ArrowLeft size={12} /> Home</Link>
                    </div>
                </header>

                <main className="lg-wrap">
                    <header className="lg-head">
                        <p className="lg-kicker">Legal</p>
                        <h1 className="lg-title">Privacy Policy</h1>
                        <div className="lg-meta">
                            <span>Effective: June 12, 2026</span>
                            <span>Last updated: October 20, 2026</span>
                            <span className="lg-badge"><ShieldCheck size={12} /> Small data footprint</span>
                        </div>
                        <div className="lg-short">
                            <b>In short</b>
                            <p>
                                I collect only what I need: the messages you send me, comments, newsletter sign-ups and
                                payment confirmations. I do not sell your data. Ads are served by Google AdSense, and you
                                can ask me to delete your information at any time.
                            </p>
                        </div>
                    </header>

                    <div className="lg-grid">
                        <aside className="lg-toc" aria-label="On this page">
                            <p className="lg-toc__label">On this page</p>
                            <ol>
                                {sections.map((s) => (
                                    <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
                                ))}
                            </ol>
                        </aside>

                        <div>
                            {sections.map((s, i) => (
                                <section key={s.id} id={s.id} className="lg-sec">
                                    <p className="lg-sec__num">{String(i + 1).padStart(2, "0")}</p>
                                    <h2 className="lg-sec__title">{s.title}</h2>
                                    <div className="lg-body">{s.body}</div>
                                </section>
                            ))}
                        </div>
                    </div>

                    <footer className="lg-foot">
                        <div className="lg-foot__info">
                            <ShieldCheck size={13} /> &copy; {currentYear} Sir Brown AD
                        </div>
                        <div className="lg-foot__actions">
                            <Link href="/terms" className="lg-btn">Terms of Service <ArrowRight size={12} /></Link>
                            <Link href="/bc/contact" className="lg-btn lg-btn--solid">Contact me</Link>
                        </div>
                    </footer>
                </main>

                <Footer />
            </div>
        </>
    );
}