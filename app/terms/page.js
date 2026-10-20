import Link from "next/link";
import { ArrowLeft, ArrowRight, Scale } from "lucide-react";
import Footer from "@/components/footer";

export const metadata = {
    title: "Terms of Service | Sir Brown AD",
    description:
        "Terms for using browncode.name.ng and for hiring Sir Brown AD: project scope, milestone payments, intellectual property, sponsored articles, comments and liability.",
    alternates: { canonical: "https://browncode.name.ng/terms" },
};

const WHATSAPP = "2348142995114";
const EMAIL = "browncemmanuel@gmail.com";

const packages = [
    ["1 Month", "₦25,000", "Live for 30 days"],
    ["3 Months", "₦60,000", "Live for 90 days"],
    ["6 Months", "₦100,000", "Live for 180 days"],
];

const sections = [
    {
        id: "agreement",
        title: "Agreement",
        body: (
            <>
                <p>
                    These terms apply when you use <strong>browncode.name.ng</strong>, or when you hire{" "}
                    <strong>Sir Brown AD</strong> (Brown Oziomachi) for web development, payments work, security
                    reviews or sponsored content. By using the site or starting a project, you agree to them.
                </p>
                <p>
                    Projects and paid placements may also have a written quote or contract. If it says something different
                    from these terms, the quote or contract applies to that project.
                </p>
            </>
        ),
    },
    {
        id: "site",
        title: "Using the website",
        body: (
            <>
                <p>
                    The articles, news and tools on this site are for general information and awareness. They are not
                    legal, financial or security advice for your specific situation.
                </p>
                <p>
                    Tools such as the Forensic Scam Checker and the fraud-awareness articles help you spot warning
                    signs. They cannot guarantee that a person, offer or website is safe or unsafe. Make your own
                    checks before you send money or share personal information.
                </p>
                <p>
                    You agree not to misuse the site: no attempts to break or overload it, scrape it at scale, or use it
                    for fraud or harassment.
                </p>
            </>
        ),
    },
    {
        id: "scope",
        title: "Scope of work and timelines",
        body: (
            <>
                <p>
                    Features, deliverables and deployment details are agreed in your quote before work begins. Requests
                    added after development has started are treated as separate extensions and billed outside the
                    original scope.
                </p>
                <p>
                    Typical timelines are about 2 to 3 weeks for a starter website, 4 to 7 weeks for a standard business
                    website and 1 to 3 months for a custom platform. These are estimates. They depend on design
                    complexity, integrations and how quickly you provide content, access and feedback.
                </p>
            </>
        ),
    },
    {
        id: "payments",
        title: "Payments and milestones",
        body: (
            <>
                <p>Projects run on milestone payments. The standard arrangement is 50% upfront and 50% on completion and your approval, as set out in your quote.</p>
                <ul className="lg-list">
                    <li><b>Rule 4.1.</b> The upfront payment secures my time and is non-refundable once planning, infrastructure setup or coding has started.</li>
                    <li><b>Rule 4.2.</b> If the final balance is more than 14 business days late, work and handover pause until it is paid.</li>
                    <li><b>Rule 4.3.</b> Monthly website support plans start from ₦15,000 per month and are paid in advance for each month.</li>
                    <li><b>Rule 4.4.</b> Prices are in Nigerian naira unless the quote says otherwise. Online payments are processed by Flutterwave and are subject to its terms.</li>
                </ul>
            </>
        ),
    },
    {
        id: "client",
        title: "What I need from you",
        body: (
            <>
                <ul className="lg-list">
                    <li>Clear information about what you want, and prompt answers to questions.</li>
                    <li>Text, images, logos and other content you have the right to use.</li>
                    <li>Your own domain name and hosting account, bought directly in your name, so you keep legal ownership. I build and deploy, but do not take ownership of your domain.</li>
                    <li>Access keys or accounts for third-party services your project needs, such as a payment gateway.</li>
                </ul>
            </>
        ),
    },
    {
        id: "ip",
        title: "Intellectual property",
        body: (
            <>
                <p>
                    Until the final payment is cleared, all mockups, private repositories and custom code remain my
                    property. When the full payment is received, ownership of the finished production work, licence
                    permissions and deployment access are transferred to you.
                </p>
                <p>
                    I may reuse general techniques and my own pre-existing components in other projects. I may mention
                    the finished project in my portfolio, unless you ask me in writing to keep it confidential.
                </p>
            </>
        ),
    },
    {
        id: "sponsored",
        title: "Sponsored articles and advertising",
        body: (
            <>
                <p>
                    I write and publish a sponsored article about your business on this site. It is clearly labelled as
                    sponsored, stays live for the period you buy, and is then removed.
                </p>
                <div className="lg-pkgs">
                    {packages.map(([name, price, days]) => (
                        <div key={name} className="lg-pkg">
                            <b>{name}</b>
                            <span className="lg-pkg__price">{price}</span>
                            <span>{days}</span>
                        </div>
                    ))}
                </div>
                <ul className="lg-list">
                    <li><b>Content standards.</b> I can refuse or remove any article that promotes fraud, scams, illegal goods or services, hate, or claims I cannot reasonably stand behind. Your claims about your business must be true.</li>
                    <li><b>Your details.</b> You provide your brand name, website and message. I write the article, and you confirm it is accurate.</li>
                    <li><b>No ranking guarantee.</b> The article is published on an indexed domain and optimized for your keywords, but search engines decide rankings and indexing times. I do not promise a position, traffic or sales.</li>
                    <li><b>Removal and renewal.</b> The article is removed at the end of the period. You can renew before then to keep it live.</li>
                    <li><b>Payment and refunds.</b> Placements are paid in advance. If I am unable to publish your article for reasons on my side, you will be refunded. Once your article has been published, the fee is non-refundable.</li>
                </ul>
            </>
        ),
    },
    {
        id: "comments",
        title: "Comments and user content",
        body: (
            <>
                <p>
                    You are responsible for what you post. Do not post anything unlawful, abusive, misleading or
                    spammy, or anything that shares someone else's private information.
                </p>
                <p>
                    By commenting you let me display your comment on the article. I can edit or delete comments, and
                    block repeat offenders, at my discretion. Your email address is used to prevent duplicates and to
                    reply, and is described in the <Link href="/privacy" className="lg-link">Privacy Policy</Link>.
                </p>
            </>
        ),
    },
    {
        id: "links",
        title: "Third-party and affiliate links",
        body: (
            <p>
                The site links to other companies' products and services. Some of these are affiliate or referral links,
                and I may earn a commission if you sign up or buy. I do not control those companies, and I am not
                responsible for their products, prices or policies. Read their terms before you commit.
            </p>
        ),
    },
    {
        id: "hosting",
        title: "Hosting and third-party services",
        body: (
            <p>
                I build with modern tools such as Next.js, Nuxt, Firebase and Vercel. I am not responsible for outages
                or changes at third-party providers (for example Vercel, Firebase, AWS or payment gateways), lapsed
                domain registrations, or external API changes that happen after deployment.
            </p>
        ),
    },
    {
        id: "liability",
        title: "Liability",
        body: (
            <>
                <p>
                    I do my best to deliver reliable work and accurate content, but the site and its content are
                    provided as they are, without promises that they will always be error-free or available.
                </p>
                <p>
                    To the extent the law allows, I am not liable for indirect or consequential losses, such as lost
                    profits or lost business. My total liability for any project is limited to the amount you paid me for
                    that project.
                </p>
            </>
        ),
    },
    {
        id: "termination",
        title: "Ending a project",
        body: (
            <p>
                Either of us can end a project if the other breaches these terms. If a project ends early, you are billed
                proportionally for the milestones completed up to that date, and the upfront payment rules above still
                apply.
            </p>
        ),
    },
    {
        id: "law",
        title: "Governing law, changes and contact",
        body: (
            <>
                <p>
                    These terms are governed by the laws of the Federal Republic of Nigeria. We will try to settle any
                    dispute by talking it through first.
                </p>
                <p>
                    I may update these terms as my services change, and the date at the top shows the latest update.
                    Questions can go to <a href={`mailto:${EMAIL}`} className="lg-link">{EMAIL}</a>,{" "}
                    <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="lg-link">WhatsApp</a>{" "}
                    or the <Link href="/bc/contact" className="lg-link">contact page</Link>.
                </p>
            </>
        ),
    },
];

export default function TermsOfService() {
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

                .lg-pkgs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
                @media (max-width: 560px) { .lg-pkgs { grid-template-columns: 1fr; } }
                .lg-pkg { border: 1px solid var(--ink); background: #fff; padding: 16px; display: flex; flex-direction: column; gap: 4px; font-family: var(--mono); font-size: 11px; color: var(--ink-3); }
                .lg-pkg b { color: var(--ink); font-weight: 600; font-size: 12px; }
                .lg-pkg__price { font-family: var(--serif); font-weight: 800; font-size: 28px; color: var(--ink); line-height: 1.1; background: linear-gradient(transparent 62%, var(--accent) 62%); width: fit-content; }

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
                        <h1 className="lg-title">Terms of Service</h1>
                        <div className="lg-meta">
                            <span>Effective: June 12, 2026</span>
                            <span>Last updated: October 20, 2026</span>
                            <span className="lg-badge"><Scale size={12} /> Active agreement</span>
                        </div>
                        <div className="lg-short">
                            <b>In short</b>
                            <p>
                                Projects are agreed in writing, paid in two milestones (50% upfront, 50% on completion), and
                                you own the finished work once you have paid in full. Sponsored articles are labelled, last
                                for the period you buy, and come with no ranking guarantee.
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
                            <Scale size={13} /> &copy; {currentYear} Sir Brown AD
                        </div>
                        <div className="lg-foot__actions">
                            <Link href="/privacy" className="lg-btn">Privacy Policy <ArrowRight size={12} /></Link>
                            <Link href="/bc/contact" className="lg-btn lg-btn--solid">Contact me</Link>
                        </div>
                    </footer>
                </main>

                <Footer />
            </div>
        </>
    );
}