import type { Metadata } from "next";
import { Fraunces, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const formEndpointOrigin = (() => {
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  if (!endpoint) return "";
  try {
    return ` ${new URL(endpoint).origin}`;
  } catch {
    return "";
  }
})();

const csp = [
  "default-src 'self'",
  "img-src 'self' data:",
  "media-src 'self'",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  `connect-src 'self'${formEndpointOrigin}`,
  `form-action 'self'${formEndpointOrigin}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

export const metadata: Metadata = {
  title: {
    default:
      "Cabinet Creation Co. — Custom Kitchens & Cabinetry, Kuala Lumpur & Selangor",
    template: "%s | Cabinet Creation Co.",
  },
  description:
    "Cabinet Creation Co. designs and builds custom kitchens, wardrobes and interior fit-outs across Kuala Lumpur and Selangor.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body
        className={`${fraunces.variable} ${inter.variable} ${spaceMono.variable} antialiased`}
      >
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
