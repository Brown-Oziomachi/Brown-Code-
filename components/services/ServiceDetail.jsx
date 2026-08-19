// components/services/ServiceDetail.jsx
import Link from "next/link";
import Image from "next/image";
import "./service-detail.css";

const PROCESS = [
  {
    step: "01",
    title: "Discover",
    body: "Understand the goal, the constraints, and what actually needs to exist.",
  },
  {
    step: "02",
    title: "Plan",
    body: "Scope the work, pick the approach, and set a realistic timeline.",
  },
  {
    step: "03",
    title: "Design",
    body: "Structure and interface decisions made deliberately, not defaulted to.",
  },
  {
    step: "04",
    title: "Develop",
    body: "Built on a clean, maintainable foundation — not just made to work once.",
  },
  {
    step: "05",
    title: "Test",
    body: "Checked across devices, edge cases, and real conditions before launch.",
  },
  {
    step: "06",
    title: "Launch",
    body: "Deployed carefully, with a plan for what happens if something needs to roll back.",
  },
  {
    step: "07",
    title: "Improve",
    body: "Monitored after launch, with fixes and improvements as real usage comes in.",
  },
];

function normalizeImageSrc(value) {
  if (!value) return null;

  if (typeof value === "object") {
    return normalizeImageSrc(value.src ?? value.url);
  }

  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:")
  ) {
    return trimmed;
  }

  return `/${trimmed.replace(/^\.\//, "").replace(/^\//, "")}`;
}

export default function ServiceDetail({ service }) {
  return (
    <>
     <nav className="sticky top-0 z-40 bg-[#0b0b0f]/85 backdrop-blur border-b border-[rgba(248,248,255,.07)]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="ft-wordmark">
                        brown<em>.</em>dev
                    </Link>
                    <div className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-[rgba(248,248,255,.5)]">
                        <Link href="/brown-code/hire-web-developer-abuja" className="hover:text-[#f8f8ff] transition-colors">Pricing</Link>
                        <Link href="/portfolio" className="hover:text-[#f8f8ff] transition-colors">Portfolio</Link>
                        <Link href="/faq" className="hover:text-[#f8f8ff] transition-colors">FAQ</Link>
                        <Link href="/terms" className="hover:text-[#f8f8ff] transition-colors">Terms</Link>
                    </div>
                    <Link
                        href="https://wa.me/2348142995114"                        
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#65a30d] hover:bg-[#a3e635] text-[#0b0b0f] px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors"
                    >
                        WhatsApp
                    </Link>
                </div>
            </nav>
    <article className="service-detail">
      {/* Hero */}
      <section className="service-detail__hero">
        <span className="service-detail__number">{service.number}</span>
        <span className="service-detail__eyebrow">{service.hero.eyebrow}</span>
        <h1 className="service-detail__headline">{service.hero.headline}</h1>
        <p className="service-detail__sub">{service.hero.sub}</p>
        <div className="service-detail__hero-actions">
          <Link
            href="https://wa.me/2348142995114"
            className="service-detail__cta service-detail__cta--primary"
          >
            Start a Project ↗
          </Link>
          <Link
            href="/bc/projects"
            className="service-detail__cta service-detail__cta--ghost"
          >
            View My Work
          </Link>
        </div>
      </section>

      {service.image &&
        (() => {
          const imgSrc = normalizeImageSrc(service.image);
          if (!imgSrc) return null;
          return (
            <div className="service-detail__hero-image-wrap">
              <div className="service-detail__hero-image">
                <Image
                  src={imgSrc}
                  alt={service.title}
                  fill={true}
                  sizes="(max-width: 700px) 100vw, (max-width: 1200px) 90vw, 1000px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  priority
                />
              </div>
            </div>
          );
        })()}

      {/* Problem */}
      <section className="service-detail__section">
        <h2 className="service-detail__section-heading">
          {service.problem.heading}
        </h2>
        <p className="service-detail__section-body">{service.problem.body}</p>
      </section>

      {/* Benefits */}
      <section className="service-detail__section">
        <h2 className="service-detail__section-heading">Why it matters</h2>
        <div className="service-detail__benefits">
          {service.benefits.map((b) => (
            <div className="service-detail__benefit" key={b.title}>
              <h3 className="service-detail__benefit-title">{b.title}</h3>
              <p className="service-detail__benefit-body">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Second body image — full-width photo break, only renders once
          service.secondImage is set. Same object-fit fix as the hero image. */}
      {service.secondImage &&
        (() => {
          const secondSrc = normalizeImageSrc(service.secondImage);
          if (!secondSrc) return null;
          return (
            <div className="service-detail__body-image">
              <Image
                src={secondSrc}
                alt={`${service.title} in practice`}
                fill={true}
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          );
        })()}

      {/* What I provide — optional image sits beside the checklist on
          desktop (pass service.provideImage). Stacks on mobile. */}
      <section className="service-detail__section">
        <h2 className="service-detail__section-heading">What I provide</h2>
        <div
          className={
            service.provideImage
              ? "service-detail__provide-layout service-detail__provide-layout--with-image"
              : "service-detail__provide-layout"
          }
        >
          {service.provideImage &&
            (() => {
              const provideSrc = normalizeImageSrc(service.provideImage);
              if (!provideSrc) return null;
              return (
                <div className="service-detail__provide-image-wrap">
                  <div className="service-detail__provide-image">
                    <Image
                      src={provideSrc}
                      alt={`What's included in ${service.title}`}
                      fill={true}
                      sizes="(max-width: 900px) 100vw, 40vw"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  </div>
                </div>
              );
            })()}

          <ul className="service-detail__checklist">
            {service.provide.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stack */}
      {service.stack?.length > 0 && (
        <section className="service-detail__section">
          <h2 className="service-detail__section-heading">Technology</h2>
          <div className="service-detail__stack">
            {service.stack.map((tech) => (
              <span className="service-detail__stack-item" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Process — full section rendered on top of a background image.
          Pass service.processImage to enable it; falls back to the plain
          dark background if not set. */}
      <section
        className={
          service.processImage
            ? "service-detail__section service-detail__process-section service-detail__process-section--image"
            : "service-detail__section service-detail__process-section"
        }
      >
        {service.processImage &&
          (() => {
            const processSrc = normalizeImageSrc(service.processImage);
            if (!processSrc) return null;
            return (
              <div className="service-detail__process-bg">
                <Image
                  src={processSrc}
                  alt=""
                  fill={true}
                  sizes="100vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
                <div className="service-detail__process-overlay" />
              </div>
            );
          })()}

        <div className="service-detail__process-content">
          <h2 className="service-detail__section-heading">How I work</h2>
          <div className="service-detail__process">
            {PROCESS.map((p) => (
              <div className="service-detail__process-step" key={p.step}>
                <span className="service-detail__process-num">{p.step}</span>
                <h3 className="service-detail__process-title">{p.title}</h3>
                <p className="service-detail__process-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial — optional social proof block, sits right before the
          closing CTA. Pass service.testimonial = { quote, name, role }. */}
      {service.testimonial && (
        <section className="service-detail__section service-detail__testimonial">
          <p className="service-detail__testimonial-quote">
            “{service.testimonial.quote}”
          </p>
          <p className="service-detail__testimonial-author">
            {service.testimonial.name}
            {service.testimonial.role && (
              <span className="service-detail__testimonial-role">
                {" "}
                — {service.testimonial.role}
              </span>
            )}
          </p>
        </section>
      )}

      {/* FAQ — optional, pass service.faqs = [{ question, answer }, ...] */}
      {service.faqs?.length > 0 && (
        <section className="service-detail__section">
          <h2 className="service-detail__section-heading">Common questions</h2>
          <div className="service-detail__faq">
            {service.faqs.map((faq) => (
              <details className="service-detail__faq-item" key={faq.question}>
                <summary className="service-detail__faq-question">
                  {faq.question}
                </summary>
                <p className="service-detail__faq-answer">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="service-detail__closing">
        <h2 className="service-detail__closing-heading">
          Have a project in mind?
        </h2>
        <p className="service-detail__closing-sub">{service.cta}</p>
        <Link
          href="https://wa.me/2348142995114"
          className="service-detail__cta service-detail__cta--primary"
        >
          Start a Conversation ↗
        </Link>
      </section>
    </article>
    {/* <Footer/> */}
    </>
  );
}
