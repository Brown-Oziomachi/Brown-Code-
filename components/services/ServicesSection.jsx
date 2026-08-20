// components/services/ServicesSection.jsx
import Link from "next/link";
import ServiceCard from "./ServiceCard";
import "./services.css";
import { featuredServices, services } from "@/app/data/services";

/**
 * mode="home"  -> intro + featured 6 only, with a "View all services" link (use on the homepage)
 * mode="full"  -> intro + featured 6 + full remaining catalog (use on /services)
 */
export default function ServicesSection({ mode = "home" }) {
  const rest = services.filter((s) => !s.featured);

  const normalizeImage = (img) => {
    if (!img || typeof img !== "string") return img;
    if (img.startsWith("/") || img.startsWith("http://") || img.startsWith("https://")) return img;
    return `/${img}`;
  };

  return (
    <>
    <section className="services-section" id="services">
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
                        href="https://github.com/sponsors/Brown-Oziomachi/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#65a30d] hover:bg-[#a3e635] text-[#0b0b0f] px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors"
                    >
                        Sponsor
                    </Link>
                </div>
            </nav>
      <div className="services-section__intro">
        <span className="services-section__eyebrow">Services</span>
        <h2 className="services-section__heading">What I do</h2>
        <p className="services-section__sub">
          Digital work built to hold up under real use — from a first website to
          the infrastructure behind it.
        </p>
      </div>

      {/* Stats strip — breaks up the intro-then-grid pattern with a quick,
          scannable read on scope and how the work is delivered. */}
      <div className="services-section__stats">
        <div className="services-section__stat">
          <span className="services-section__stat-num">{services.length}+</span>
          <span className="services-section__stat-label">Services covered</span>
        </div>
        <div className="services-section__stat">
          <span className="services-section__stat-num">100%</span>
          <span className="services-section__stat-label">Custom-built, no themes</span>
        </div>
        <div className="services-section__stat">
          <span className="services-section__stat-num">1:1</span>
          <span className="services-section__stat-label">Solo delivery, direct contact</span>
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

      {/* Callout banner — a direct next step for anyone scanning cards
          without landing on one yet, instead of just more grid. */}
      <div className="services-section__banner">
        <div className="services-section__banner-text">
          <h3 className="services-section__banner-heading">
            Not sure which service fits?
          </h3>
          <p className="services-section__banner-sub">
            Describe what you're trying to do and I'll tell you what it
            actually needs — no obligation.
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

      {/* Closing line — sits after every card has been shown, so the
          section doesn't just stop dead once the grid ends. */}
      <p className="services-section__closing">
        Every service above is built the same way — deliberately, on a real
        foundation, not assembled from a template and left to hold together
        on its own.
      </p>
    </section>
    </>
  );
}