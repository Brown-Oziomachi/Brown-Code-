// components/services/ServicesSection.jsx
import Link from "next/link";
import ServiceCard from "./ServiceCard";
import "./services.css";
import { featuredServices, services } from "@/app/data/services";

/**
 * mode="home"  -> intro + featured only, with a "View all services" link (use on the homepage)
 * mode="full"  -> intro + featured + full remaining catalog (use on /services)
 */
export default function ServicesSection({ mode = "home" }) {
  const rest = services.filter((s) => !s.featured);

  const normalizeImage = (img) => {
    if (!img || typeof img !== "string") return img;
    if (
      img.startsWith("/") ||
      img.startsWith("http://") ||
      img.startsWith("https://")
    )
      return img;
    return `/${img}`;
  };

  return (
    <>
      <header className="sv-nav">
        <div className="sv-nav__inner">
          <Link href="/" className="sv-nav__brand">
            brown<em>.</em>dev
          </Link>
          <nav className="sv-nav__links" aria-label="Main">
            <Link
              href="/brown-code/hire-web-developer-abuja"
              className="sv-nav__link sv-nav__hide"
            >
              Pricing
            </Link>
            <Link href="/portfolio" className="sv-nav__link sv-nav__hide">
              Portfolio
            </Link>
            <Link href="/faq" className="sv-nav__link sv-nav__hide">
              FAQ
            </Link>
            <Link href="/terms" className="sv-nav__link sv-nav__hide">
              Terms
            </Link>
            <Link
              href="https://github.com/sponsors/Brown-Oziomachi/"
              target="_blank"
              rel="noopener noreferrer"
              className="sv-btn sv-btn--solid sv-btn--sm"
            >
              Sponsor
            </Link>
          </nav>
        </div>
      </header>

      <section className="services-section" id="services">
        <div className="services-section__intro">
          <span className="services-section__eyebrow">Services</span>
          <h2 className="services-section__heading">What I do</h2>
          <p className="services-section__sub">
            Digital work built to hold up under real use — from a first website
            to the infrastructure behind it.
          </p>
        </div>

        <div className="services-section__stats">
          <div className="services-section__stat">
            <span className="services-section__stat-num">
              {services.length}+
            </span>
            <span className="services-section__stat-label">
              Services covered
            </span>
          </div>
          <div className="services-section__stat">
            <span className="services-section__stat-num">100%</span>
            <span className="services-section__stat-label">
              Custom-built, no themes
            </span>
          </div>
          <div className="services-section__stat">
            <span className="services-section__stat-num">1:1</span>
            <span className="services-section__stat-label">
              Solo delivery, direct contact
            </span>
          </div>
        </div>

        <div className="services-section__label">Featured</div>
        <div className="services-section__grid services-section__grid--featured">
          {featuredServices.map((service) => (
            <ServiceCard
              key={service.slug}
              service={{ ...service, image: normalizeImage(service.image) }}
            />
          ))}
        </div>

        <div className="services-section__banner">
          <div className="services-section__banner-text">
            <h3 className="services-section__banner-heading">
              Not sure which service fits?
            </h3>
            <p className="services-section__banner-sub">
              Describe what you&apos;re trying to do and I&apos;ll tell you what
              it actually needs — no obligation.
            </p>
          </div>
          <Link
            href="https://wa.me/2348142995114"
            target="_blank"
            rel="noopener noreferrer"
            className="services-section__banner-cta"
          >
            Ask on WhatsApp ↗
          </Link>
        </div>

        {mode === "home" && (
          <div className="services-section__footer">
            <Link href="/services" className="services-section__view-all">
              View all services ↗
            </Link>
          </div>
        )}

        {mode === "full" && rest.length > 0 && (
          <>
            <div className="services-section__label services-section__label--secondary">
              More services
            </div>
            <div className="services-section__grid services-section__grid--compact">
              {rest.map((service) => (
                <ServiceCard
                  key={service.slug}
                  service={{ ...service, image: normalizeImage(service.image) }}
                  size="compact"
                />
              ))}
            </div>
          </>
        )}

        <p className="services-section__closing">
          Every service above is built the same way — deliberately, on a real
          foundation, not assembled from a template and left to hold together on
          its own.
        </p>
      </section>
    </>
  );
}
