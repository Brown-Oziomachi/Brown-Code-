// App.js - Entry Point
import Portfolio from "@/components/Portfolio";
import React from "react";
import Head from "next/head"; // import Head

export default function App() {
  return (
    <>
      <Head>
        <title>BrownCode Portfolio</title>
        <meta
          name="impact-site-verification"
          value="e9768684-9c09-4886-b2db-ec34003c5283"
        />
      </Head>

      <div>
        <Portfolio />
      </div>
    </>
  );
}
