import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import Footer from "@/components/footer";
import NewsletterForm from "@/components/NewsletterForm";
import SocialLinks from "@/components/SocialLinks";
import NewspaperStack from "@/components/NewspaperStack";
import { waLink } from "@/lib/newsletter-config";

export const metadata = {
    title: "Newsletter | Fraud Alerts, Web Security and Building in Public",
    description:
        "Subscribe to Sir Brown AD's newsletter for fraud and scam awareness, practical web security notes and lessons from shipping real products in Nigeria.",
    alternates: { canonical: "https://browncode.name.ng/newsletter" },
};

const beats = [
    ["Fraud and scam awareness", "How scams work, how to spot them and where to report them in Nigeria, written so anyone can act on it."],
    ["Web security", "Practical notes on securing real apps: access rules, server-side writes, payments and the mistakes that cause breaches."],
    ["Building in public", "What broke in production, how I traced it and what I changed."],
];

const faqs = [
    ["Is it free?", "Yes. Joining and reading are free."],
    ["How often will I get an email?", "You get an email when a new article goes up, so nothing lands in your inbox just to fill space."],
    ["Do you share my email address?", "No. Your email is used only to send you the newsletter."],
    ["Can I leave whenever I want?", "Yes. Every email has an unsubscribe link."],
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

.nl-page {
    --paper: #ffffff; --paper-2: #f6f5f0;
    --ink: #111111; --ink-2: #3f3f3f; --ink-3: #6f6f6f;
    --rule: #e4e2da; --rule-dark: #111111;
    --accent: #e8ff47; --on-accent: #0a0a0b;
    --serif: 'Playfair Display', Georgia, serif;
    --sans: 'Inter', system-ui, sans-serif;
    --mono: 'JetBrains Mono', 'Fira Code', monospace;
    background: var(--paper); color: var(--ink); font-family: var(--sans); min-height: 100vh;
}
.nl-page *, .nl-page *::before, .nl-page *::after { box-sizing: border-box; }
.nl-page h1, .nl-page h2, .nl-page h3, .nl-page p { margin: 0; padding: 0; }
:where(.nl-page a) { color: inherit; text-decoration: none; }
.nl-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
.nl-section { padding-top: 88px; }

/* Nav */
.nl-nav { position: sticky; top: 0; z-index: 1000; background: rgba(255,255,255,0.92); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); border-bottom: 1px solid var(--rule); }
.nl-nav__inner { max-width: 1120px; margin: 0 auto; padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.nl-nav__brand { font-family: var(--serif); font-weight: 800; font-size: 21px; letter-spacing: -0.01em; }
.nl-nav__brand em { font-style: normal; background: var(--accent); padding: 0 3px; }
.nl-nav__links { display: flex; align-items: center; gap: 4px; }
.nl-nav__link { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3); padding: 8px 12px; transition: color 0.15s; }
.nl-nav__link:hover, .nl-nav__link--on { color: var(--ink); }
.nl-nav__link--on { box-shadow: inset 0 -3px 0 var(--accent); }
@media (max-width: 700px) { .nl-nav__hide { display: none; } .nl-nav__inner { padding: 0 18px; } }

/* Buttons */
.nl-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-family: var(--mono); font-size: 11.5px; letter-spacing: 0.06em; padding: 14px 22px; border: 1.5px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; transition: background 0.15s, color 0.15s, transform 0.15s; }
.nl-btn:hover { background: var(--ink); color: #fff; transform: translateY(-1px); }
.nl-btn--solid { background: var(--accent); color: var(--on-accent); font-weight: 600; }
.nl-btn--solid:hover { background: var(--ink); color: var(--accent); }
.nl-btn--sm { padding: 9px 14px; }
.nl-btn:disabled { opacity: 0.6; cursor: default; transform: none; }

/* Hero */
.nl-hero { padding-top: 64px; display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); gap: 56px; align-items: center; }
@media (max-width: 880px) { .nl-hero { grid-template-columns: minmax(0, 1fr); gap: 36px; padding-top: 40px; } }
.nl-kicker { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 10px; }
.nl-kicker b { background: var(--accent); color: var(--on-accent); padding: 2px 7px; font-weight: 500; }
.nl-title { font-family: var(--serif); font-weight: 800; font-size: clamp(40px, 7vw, 80px); line-height: 0.98; letter-spacing: -0.03em; }
.nl-title span { background: linear-gradient(transparent 64%, var(--accent) 64%); }
.nl-dek { margin-top: 22px; max-width: 520px; font-size: clamp(16px, 1.7vw, 19px); line-height: 1.7; font-weight: 300; color: var(--ink-2); }

/* Signup card */
.nl-card { background: #fff; border: 1.5px solid var(--ink); border-top: 5px solid var(--accent); box-shadow: 8px 8px 0 var(--accent), 8px 8px 0 1.5px var(--ink); padding: 28px; }
@media (max-width: 880px) { .nl-card { box-shadow: 6px 6px 0 var(--accent), 6px 6px 0 1.5px var(--ink); } }
.nl-card__title { font-family: var(--serif); font-weight: 800; font-size: 24px; line-height: 1.2; margin-bottom: 6px; }
.nl-card__sub { font-size: 14px; line-height: 1.6; color: var(--ink-2); margin-bottom: 20px; }

.nl-form__label { display: block; font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 8px; }
.nl-form__row { display: flex; gap: 10px; flex-wrap: wrap; position: relative; }
.nl-form__input { flex: 1 1 220px; min-width: 0; font-family: var(--sans); font-size: 15px; padding: 13px 14px; border: 1.5px solid var(--ink); background: #fff; color: var(--ink); border-radius: 0; }
.nl-form__input::placeholder { color: var(--ink-3); }
.nl-form__input:focus { outline: 2px solid var(--ink); outline-offset: 2px; background: var(--paper-2); }
.nl-form__trap { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
.nl-form__error { margin-top: 10px; font-size: 13px; color: #b91c1c; }
.nl-form__fine { margin-top: 12px; font-family: var(--mono); font-size: 11px; color: var(--ink-3); }

.nl-done { display: flex; gap: 14px; align-items: flex-start; }
.nl-done__icon { width: 36px; height: 36px; background: var(--accent); border: 1.5px solid var(--ink); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.nl-done strong { font-family: var(--serif); font-weight: 800; font-size: 20px; display: block; margin-bottom: 4px; }
.nl-done p { font-size: 14px; color: var(--ink-2); line-height: 1.6; }

/* Section heads */
.nl-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding-top: 12px; border-top: 3px solid var(--rule-dark); margin-bottom: 28px; }
.nl-h2 { font-family: var(--serif); font-weight: 800; font-size: clamp(28px, 4vw, 40px); line-height: 1.1; letter-spacing: -0.01em; }
.nl-head__note { font-size: 14px; line-height: 1.6; color: var(--ink-2); max-width: 380px; }

/* Beats */
.nl-beats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
@media (max-width: 800px) { .nl-beats { grid-template-columns: 1fr; gap: 20px; } }
.nl-beat { border-top: 3px solid var(--accent); padding-top: 14px; }
.nl-beat h3 { font-family: var(--serif); font-weight: 800; font-size: 20px; line-height: 1.2; margin-bottom: 8px; }
.nl-beat p { font-size: 14px; line-height: 1.7; color: var(--ink-2); }

/* Socials */
.nl-socials { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; }
.nl-social { display: flex; align-items: center; gap: 14px; padding: 16px 18px; background: #fff; border: 1px solid var(--rule); border-radius: 6px; transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s; }
.nl-social:hover { border-color: var(--ink); box-shadow: 4px 4px 0 var(--accent), 4px 4px 0 1px var(--ink); transform: translate(-2px, -2px); }
.nl-social svg { flex-shrink: 0; width: 20px; height: 20px; }
.nl-social .sl-text { display: flex; flex-direction: column; min-width: 0; }
.nl-social .sl-text b { font-family: var(--serif); font-weight: 800; font-size: 16px; }
.nl-social .sl-text small { font-family: var(--mono); font-size: 11px; color: var(--ink-3); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }


/* Extras */
.nl-narrow { max-width: 760px; }
.nl-btn--wa { background: #25d366; color: var(--on-accent); font-weight: 600; }
.nl-btn--wa:hover { background: var(--ink); color: #25d366; }
.nl-card__alt { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--rule); display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; font-size: 13.5px; color: var(--ink-2); }
.nl-proof { margin-top: 14px; font-family: var(--mono); font-size: 11px; color: var(--ink-3); }
.nl-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }

.nl-band { max-width: 640px; margin: 56px auto 0; background: #fff; border: 1.5px solid var(--ink); border-top: 5px solid var(--accent); box-shadow: 6px 6px 0 var(--accent), 6px 6px 0 1.5px var(--ink); padding: 24px; }
.nl-band h3 { font-family: var(--serif); font-weight: 800; font-size: 22px; line-height: 1.2; margin-bottom: 6px; }
.nl-band p { font-size: 14px; line-height: 1.6; color: var(--ink-2); margin-bottom: 16px; }

.nl-quiz { background: #fff; border: 1.5px solid var(--ink); padding: 24px; }
.nl-quiz__count { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 10px; }
.nl-quiz__scene { font-family: var(--serif); font-weight: 600; font-size: clamp(18px, 2.4vw, 22px); line-height: 1.4; margin-bottom: 20px; overflow-wrap: anywhere; }
.nl-quiz__choices, .nl-quiz__actions { display: flex; gap: 10px; flex-wrap: wrap; }
.nl-quiz__result { margin-top: 18px; padding: 14px 16px; border-left: 4px solid var(--ink); background: var(--paper-2); font-size: 14.5px; line-height: 1.65; color: var(--ink-2); }
.nl-quiz__result.is-right { border-left-color: #15803d; }
.nl-quiz__result.is-wrong { border-left-color: #b91c1c; }
.nl-quiz__result .nl-btn { margin-top: 12px; }
.nl-quiz__score { font-family: var(--serif); font-weight: 800; font-size: 56px; line-height: 1; margin: 4px 0 12px; }
.nl-quiz__why { font-size: 15px; line-height: 1.7; color: var(--ink-2); margin-bottom: 20px; }

.nl-check { background: #fff; border: 1.5px solid var(--ink); padding: 8px 24px 20px; }
.nl-check__list { list-style: none; margin: 0; padding: 0; }
.nl-check__list li { border-bottom: 1px solid var(--rule); }
.nl-check__row { display: flex; gap: 14px; align-items: flex-start; padding: 14px 0; font-size: 15px; line-height: 1.55; color: var(--ink-2); cursor: pointer; }
.nl-check__row input { width: 20px; height: 20px; margin: 2px 0 0; flex-shrink: 0; accent-color: var(--ink); cursor: pointer; }
.nl-check__foot { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; padding-top: 18px; font-family: var(--mono); font-size: 11.5px; color: var(--ink-3); }

.nl-mail { max-width: 640px; background: #fff; border: 1.5px solid var(--ink); box-shadow: 8px 8px 0 var(--accent), 8px 8px 0 1.5px var(--ink); }
.nl-mail__bar { padding: 14px 20px; border-bottom: 1px solid var(--ink); background: var(--paper-2); font-size: 13px; line-height: 1.7; color: var(--ink-2); }
.nl-mail__bar b { font-weight: 600; color: var(--ink); }
.nl-mail__body { padding: 22px 20px 24px; }
.nl-mail__body h3 { font-family: var(--serif); font-weight: 800; font-size: 22px; line-height: 1.2; margin-bottom: 12px; }
.nl-mail__body p { font-size: 14.5px; line-height: 1.7; color: var(--ink-2); margin-bottom: 12px; }
.nl-mail__body p:last-child { margin-bottom: 0; }
.nl-mail__tip { border-left: 4px solid var(--accent); padding-left: 12px; color: var(--ink); }

.nl-author { display: grid; grid-template-columns: 88px minmax(0, 1fr); gap: 22px; align-items: start; max-width: 760px; }
.nl-author__mark { width: 88px; height: 88px; display: flex; align-items: center; justify-content: center; border: 1.5px solid var(--ink); background: var(--accent); font-family: var(--serif); font-weight: 800; font-size: 32px; }
.nl-author p { font-size: 15.5px; line-height: 1.75; color: var(--ink-2); margin-bottom: 12px; }
.nl-author a.nl-link { font-family: var(--mono); font-size: 12px; box-shadow: inset 0 -3px 0 var(--accent); }

.nl-report { max-width: 640px; }
.nl-report__box { display: block; width: 100%; resize: vertical; min-height: 120px; font-family: var(--sans); line-height: 1.6; }
.nl-report .nl-form__fine { margin: 10px 0 16px; line-height: 1.6; }

.nl-faq { max-width: 760px; border-top: 1px solid var(--ink); }
.nl-faq details { border-bottom: 1px solid var(--ink); }
.nl-faq summary { cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 18px 0; font-family: var(--serif); font-weight: 800; font-size: 18px; }
.nl-faq summary::-webkit-details-marker { display: none; }
.nl-faq summary::after { content: "+"; font-family: var(--mono); font-weight: 400; font-size: 20px; }
.nl-faq details[open] summary::after { content: "–"; }
.nl-faq details p { padding: 0 0 18px; font-size: 15px; line-height: 1.7; color: var(--ink-2); max-width: 620px; }

@media (max-width: 640px) {
  .nl-author { grid-template-columns: 1fr; gap: 14px; }
  .nl-quiz, .nl-band { padding: 20px 16px; }
  .nl-check { padding: 4px 16px 16px; }
}

.nl-end { height: 72px; }
@media (max-width: 640px) { .nl-wrap { padding-left: 18px; padding-right: 18px; } .nl-section { padding-top: 64px; } .nl-card { padding: 22px 18px; } }
.nl-page :focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { .nl-page * { transition: none !important; } }
`;

export default function NewsletterPage() {
    return (
        <>
            <style>{CSS}</style>

            <div className="nl-page">
                <header className="nl-nav">
                    <div className="nl-nav__inner">
                        <Link href="/" className="nl-nav__brand">brown<em>.</em>dev</Link>
                        <nav className="nl-nav__links" aria-label="Main">
                            <Link href="/bc/about" className="nl-nav__link nl-nav__hide">About</Link>
                            <Link href="/portfolio" className="nl-nav__link nl-nav__hide">Portfolio</Link>
                            <Link href="/blog" className="nl-nav__link nl-nav__hide">Blog</Link>
                            <Link href="/newsletter" className="nl-nav__link nl-nav__link--on">Newsletter</Link>
                            <Link href="/bc/contact" className="nl-btn nl-btn--solid nl-btn--sm">
                                Start a project <ArrowRight size={12} />
                            </Link>
                        </nav>
                    </div>
                </header>

                <main>
                    {/* Hero + form */}
                    <section className="nl-wrap nl-hero">
                        <div>
                            <div className="nl-kicker"><b>Newsletter</b></div>
                            <h1 className="nl-title">
                                Read it here <span>before it happens to you.</span>
                            </h1>
                            <p className="nl-dek">
                                New articles on fraud and scams, practical web security and what I learn shipping real
                                products in Nigeria, sent to your inbox.
                            </p>
                        </div>

                        <div className="nl-card" id="join">
                            <h2 className="nl-card__title">Join the list</h2>
                            <p className="nl-card__sub">Enter your email and I&apos;ll send you new articles as they go up.</p>
                            <NewsletterForm />
                           
                            <div className="nl-card__alt">
                                <span>Rather use WhatsApp?</span>
                                <a
                                    className="nl-btn nl-btn--wa nl-btn--sm"
                                    href={waLink("Hello, please add me to the scam alert list.")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <MessageCircle size={14} /> Message me
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Newspaper */}
                    <section className="nl-wrap nl-section" aria-label="Latest from the newsletter">
                        <div className="nl-head">
                            <div>
                                <div className="nl-kicker">The paper</div>
                                <h2 className="nl-h2">Flip through the latest editions</h2>
                            </div>
                            <p className="nl-head__note">Every story below is a full article. Tap one to read it.</p>
                        </div>
                        <NewspaperStack />

                        <div className="nl-band">
                            <h3>Don&apos;t miss the next edition</h3>
                            <p>New fraud warnings go straight to your inbox the day they are published.</p>
                            <NewsletterForm />
                        </div>
                     
                    </section>

                    {/* What you get */}
                    <section className="nl-wrap nl-section">
                        <div className="nl-head">
                            <div>
                                <div className="nl-kicker">What you get</div>
                                <h2 className="nl-h2">Three things I write about</h2>
                            </div>
                        </div>
                        <div className="nl-beats">
                            {beats.map(([title, body]) => (
                                <div key={title} className="nl-beat">
                                    <h3>{title}</h3>
                                    <p>{body}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Sample email */}
                    <section className="nl-wrap nl-section" aria-label="Sample email">
                        <div className="nl-head">
                            <div>
                                <div className="nl-kicker">Inside the inbox</div>
                                <h2 className="nl-h2">What an email looks like</h2>
                            </div>
                        </div>
                        <div className="nl-mail">
                            <div className="nl-mail__bar">
                                <div><b>From:</b> Sir-AD Blog</div>
                                <div><b>Subject:</b> The fake alert that costs agents the most</div>
                            </div>
                            <div className="nl-mail__body">
                                <h3>Your POS terminal does not lie</h3>
                                <p>A scammer shows a credit alert, you release the goods, and the money never arrives. This week: how the fake alert works and the one check that stops it.</p>
                                <p className="nl-mail__tip">Check your own balance before you release anything.</p>
                                <p>Read the full story, then forward it to one person who handles money for a living.</p>
                            </div>
                        </div>
                    </section>

                    {/* About the writer */}
                    <section className="nl-wrap nl-section" aria-label="About the writer">
                        <div className="nl-head">
                            <div>
                                <div className="nl-kicker">The writer</div>
                                <h2 className="nl-h2">Who writes this</h2>
                            </div>
                        </div>
                        <div className="nl-author">
                            <div className="nl-author__mark" aria-hidden="true">
                                <img src="/sirb.png" alt="Sir Brown AD" width={88} height={88} />
                            </div>
                            <div>
                                <p>
                                    I&apos;m Sir Brown AD, a full-stack developer in Abuja building platforms for African digital markets.
                                    I write this newsletter so ordinary people can spot a scam before it costs them money.
                                </p>
                                <p>
                                    I also build Fraud Radar NG, a platform that tracks fraud in Nigeria, so what you read here comes from
                                    watching real cases.
                                </p>
                                <a className="nl-link" href="https://fraudradarng.vercel.app" target="_blank" rel="noopener noreferrer">
                                    Visit Fraud Radar NG
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Report a scam */}
                    <section className="nl-wrap nl-section" aria-label="Report a scam">
                        <div className="nl-head">
                            <div>
                                <div className="nl-kicker">Your story</div>
                                <h2 className="nl-h2">Saw a scam? Tell me.</h2>
                            </div>
                            <p className="nl-head__note">The best reports become articles that warn other people.</p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="nl-wrap nl-section" aria-label="Frequently asked questions">
                        <div className="nl-head">
                            <div>
                                <div className="nl-kicker">Questions</div>
                                <h2 className="nl-h2">Before you join</h2>
                            </div>
                        </div>
                        <div className="nl-faq">
                            {faqs.map(([q, a]) => (
                                <details key={q}>
                                    <summary>{q}</summary>
                                    <p>{a}</p>
                                </details>
                            ))}
                        </div>

                        <div className="nl-band">
                            <h3>Read it here before it happens to you</h3>
                            <p>Join the list, or follow on WhatsApp.</p>
                            <NewsletterForm />
                            <div className="nl-card__alt">
                                <span>Prefer a chat?</span>
                                <a
                                    className="nl-btn nl-btn--wa nl-btn--sm"
                                    href={waLink("Hello, please add me to the scam alert list.")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <MessageCircle size={14} /> WhatsApp me
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Socials */}
                    <section className="nl-wrap nl-section">
                        <div className="nl-head">
                            <div>
                                <div className="nl-kicker">Elsewhere</div>
                                <h2 className="nl-h2">Follow me</h2>
                            </div>
                            <p className="nl-head__note">Prefer a different platform? I post on all of these.</p>
                        </div>
                        <div className="nl-socials">
                            <SocialLinks linkClass="nl-social" showLabels size={20} />
                        </div>
                        <div className="nl-end" />
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}