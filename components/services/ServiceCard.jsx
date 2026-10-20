// components/services/ServiceCard.jsx
import Link from "next/link";
import Image from "next/image";
import ServiceVisual from "./ServiceVisual";

export default function ServiceCard({ service, size = "regular" }) {
  const hasImage = Boolean(service.image);
  const stackPreview = service.stack?.slice(0, 3) ?? [];

  return (
    <Link
      href={`/services/${service.slug}`}
      className={`service-card service-card--${size}`}
      aria-label={`${service.title} — read more`}
    >
      {/* Thumbnail strip: pattern is the base layer, image sits on top if set */}
      <div className="service-card__thumb">
        <ServiceVisual pattern={service.pattern} id={service.slug} />
        {hasImage && (
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(max-width: 800px) 100vw, 33vw"
            className="service-card__image"
            priority={false}
          />
        )}
        <span className="service-card__number">{service.number}</span>
      </div>

      <div className="service-card__body">
        <h3 className="service-card__title">{service.title}</h3>

        {size !== "compact" && service.tagline && (
          <p className="service-card__tagline">{service.tagline}</p>
        )}

        {size !== "compact" && stackPreview.length > 0 && (
          <div className="service-card__meta">
            {stackPreview.map((tech) => (
              <span className="service-card__meta-tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        )}

        <span className="service-card__link">
          Learn more <span aria-hidden="true">↗</span>
        </span>
      </div>
    </Link>
  );
}
