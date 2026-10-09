import type { Metadata, Viewport } from "next";
import { Poppins, Caveat } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  themeColor: "#0B8F5A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Friends Driving Centre | Driving School in Chennai",
    template: "%s | Friends Driving Centre",
  },
  description:
    "Personalised one-to-one driving school in Chennai. Learn driving in your own vehicle in Tambaram and Velachery with certified trainers. Book your session today.",
  keywords: siteConfig.keywords,
  authors: [{ name: "Friends Driving Centre", url: siteConfig.url }],
  creator: "Friends Driving Centre",
  publisher: "Friends Driving Centre",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Friends Driving Centre | Driving School in Chennai",
    description:
      "Personalised one-to-one driving school in Chennai. Learn driving in your own vehicle in Tambaram & Velachery with certified trainers.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Friends Driving Centre - Learn to Drive Confidently in Your Own Vehicle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Friends Driving Centre | Driving School in Chennai",
    description:
      "Personalised one-to-one driving school in Chennai. Learn driving with your own vehicle in Tambaram & Velachery.",
    images: ["/opengraph-image"],
  },
  formatDetection: {
    telephone: true,
    date: false,
    address: true,
    email: true,
    url: true,
  },
  icons: {
    icon: [
      { url: "/icon", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${poppins.variable} ${caveat.variable}`}>
      <head>
        {/* Preconnect & DNS-prefetch for remote image CDNs */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://i.pravatar.cc" />
        <link rel="dns-prefetch" href="https://i.pravatar.cc" />
      </head>
      <body className="antialiased min-h-screen bg-white text-[#374151]">
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
