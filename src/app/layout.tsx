import type { Metadata } from "next";
import { Space_Grotesk, Fraunces, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "A public portfolio of working prototypes, remixes, and live products at the edge of AI, WebGL, and onchain culture.";

export const metadata: Metadata = {
  metadataBase: new URL("https://tynf.vercel.app"),
  title: "thisyearnofear — experimental products",
  description,
  openGraph: {
    title: "thisyearnofear — experimental products",
    description,
    siteName: "thisyearnofear",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "thisyearnofear — experimental products",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
