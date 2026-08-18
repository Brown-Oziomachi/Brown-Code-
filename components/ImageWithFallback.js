"use client";

export default function ImageWithFallback({ src, alt, className }) {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={(e) => (e.target.style.display = "none")}
        />
    );
}