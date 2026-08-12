import { Suspense } from "react";
import AdvertiseClient from "./advertise";

export const metadata = {
  title: "Advertise With Us | Sir Brown AD",
  description: "Reach Nigeria's top web developers, tech founders, and digital-savvy businesses. Partner with Sir Brown AD to place your brand in front of the right audience.",
  keywords: [
    "advertise with Brown Code",
    "sponsor tech blog Nigeria",
    "digital advertising Abuja",
    "web development audience Nigeria",
    "tech sponsorship Nigeria",
    "Brown Code advertising",
    "sponsored article Nigeria",
    "advertise on tech blog Nigeria",
  ],
  alternates: {
    canonical: "https://browncode.name.ng/google_index/advertise",
  },
  openGraph: {
    title: "Advertise With Us | Sir Brown AD",
    description: "Reach Nigeria's top web developers, tech founders, and digital-savvy businesses. Partner with Sir Brown AD to place your brand in front of the right audience.",
    url: "https://browncode.name.ng/google_index/advertise",
    siteName: "Sir Brown AD",
    images: [{ url: "https://browncode.name.ng/logo.png", width: 1200, height: 630, alt: "Advertise with Sir Brown AD" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advertise With Us | Sir Brown AD",
    description: "Reach Nigeria's top web developers, tech founders, and digital-savvy businesses.",
    images: ["https://browncode.name.ng/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Sponsored Content Advertising",
  name: "Sir Brown AD — Sponsored Article Placement",
  description: "Sponsored article writing and multi-search-engine indexing service for Nigerian and African businesses, covering Google, Bing, and Yandex.",
  provider: {
    "@type": "Organization",
    name: "Sir Brown AD",
    url: "https://browncode.name.ng",
    logo: "https://browncode.name.ng/logo.png",
  },
  areaServed: {
    "@type": "Country",
    name: "Nigeria",
  },
  offers: [
    { "@type": "Offer", name: "1 Month Package", price: "25000", priceCurrency: "NGN" },
    { "@type": "Offer", name: "3 Months Package", price: "60000", priceCurrency: "NGN" },
    { "@type": "Offer", name: "6 Months Package", price: "100000", priceCurrency: "NGN" },
  ],
};

export default function AdvertisePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div style={{ background: "#0a0a0b", minHeight: "100vh" }} />}>
        <AdvertiseClient />
      </Suspense>
    </>
  );
}