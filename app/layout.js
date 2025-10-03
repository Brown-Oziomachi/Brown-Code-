import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Brown code | Software Developer",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  verification: {
    other: {
      "impact-site-verification": "e9768684-9c09-4886-b2db-ec34003c5283",
      monetag: "f078e1ec3e8e3ad7a3b1fde84ea75d8e",
    },
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8408243121163767"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
