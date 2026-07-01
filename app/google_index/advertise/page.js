import { Suspense } from "react";
import AdvertiseClient from "./advertise";

export const metadata = {
  title: "Advertise With Us | Sir Brown AD",
  description: "Reach Nigeria's top web developers, tech founders, and digital-savvy businesses. Partner with Brown Code to place your brand in front of the right audience.",
  keywords: [
    "advertise with Brown Code",
    "sponsor tech blog Nigeria",
    "digital advertising Abuja",
    "web development audience Nigeria",
    "tech sponsorship Nigeria",
    "Brown Code advertising",
  ],
  openGraph: {
    title: "Advertise With Us | Sir Brown AD",
    description: "Reach Nigeria's top web developers, tech founders, and digital-savvy businesses. Partner with Sir Brown AD to place your brand in front of the right audience.",
    url: "https://sirbrowndev.name.ng/advertise",
    siteName: "Sir Brown AD",
    type: "website",
  },
};

export default function AdvertisePage() {
  return (
    <Suspense fallback={<div style={{ background: "#0a0a0b", minHeight: "100vh" }} />}>
      <AdvertiseClient />
    </Suspense>
  );
}