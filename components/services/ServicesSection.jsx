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
    <section className="services-section" id="services">
      <div className="services-section__intro">
        <span className="services-section__eyebrow">Services</span>
        <h2 className="services-section__heading">What I do</h2>
        <p className="services-section__sub">
          Digital work built to hold up under real use — from a first website to
          the infrastructure behind it.
        </p>
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
    </section>
  );
}
