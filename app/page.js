// App.js - Entry Point
import Portfolio from "@/components/Portfolio";
import React from "react";
import Head from "next/head";

export default function App() {
  return (
    <>
      <Head>
        <title>BrownCode Portfolio</title>
        <meta
          name="impact-site-verification"
          content="e9768684-9c09-4886-b2db-ec34003c5283"
        />
        {/* Monetag Verification */}
        <meta name="monetag" content="f078e1ec3e8e3ad7a3b1fde84ea75d8e" />
      </Head>

      <div>
        <Portfolio />
      </div>
    </>
  );
}
