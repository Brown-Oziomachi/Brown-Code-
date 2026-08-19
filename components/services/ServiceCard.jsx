// components/services/ServiceCard.jsx
import Link from "next/link";
import Image from "next/image";
import ServiceVisual from "./ServiceVisual";

export default function ServiceCard({ service, size = "regular" }) {
  const hasImage = Boolean(service.image);

  return (
    <Link
      href={`/services/${service.slug}`}
      className={`service-card service-card--${size}`}
      aria-label={`${service.title} — read more`}
    >
      {/* Abstract pattern always renders as the base layer. If a real image
          is provided it sits on top; if the image file is missing/unset,
          the pattern alone still looks intentional — nothing ever appears broken. */}
      <ServiceVisual pattern={service.pattern} id={service.slug} />

      {hasImage && (
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes={
            size === "compact"
              ? "(max-width: 800px) 100vw, 33vw"
              : "(max-width: 800px) 100vw, 50vw"
          }
          className="service-card__image"
          priority={false}
        />
      )}

      <div className="service-card__overlay" />

      <span className="service-card__number">{service.number}</span>

      <div className="service-card__content">
        <div className="service-card__heading">
          <h3 className="service-card__title">{service.title}</h3>
          <span className="service-card__arrow" aria-hidden="true">
            ↗
          </span>
        </div>
        {size !== "compact" && (
          <p className="service-card__tagline">{service.tagline}</p>
        )}
      </div>
    </Link>
  );
}
