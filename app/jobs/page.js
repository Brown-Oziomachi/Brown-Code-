import { Suspense } from "react";
import JobsClient from "./jobs";

export const metadata = {
  title: "Jobs & Opportunities | Brown Code",
  description: "Explore web development job opportunities and freelance projects at Brown Code. We connect talented developers with clients across Nigeria and Africa.",
  keywords: [
    "web development jobs Nigeria",
    "developer jobs Abuja",
    "freelance web developer Africa",
    "tech jobs Nigeria",
    "Brown Code careers",
  ],
  openGraph: {
    title: "Web Development Jobs & Opportunities | Brown Code",
    description: "Explore web development job opportunities and freelance projects at Brown Code.",
    url: "https://browncode.name.ng/jobs",
    siteName: "Brown Code",
    type: "website",
  },
};

export default function JobPage() {
  return (
    <Suspense fallback={<div style={{ background: "#0a0a0b", minHeight: "100vh" }} />}>
      <JobsClient />
    </Suspense>
  );
}