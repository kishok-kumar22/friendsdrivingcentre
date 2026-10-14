export interface AddressInfo {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface OpeningHourRule {
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  shortName: string;
  tagline: string;
  url: string;
  email: string;
  telephone: string;
  phoneHref: string;
  whatsappNumber: string;
  address: AddressInfo;
  displayAddress: string;
  geo: GeoCoordinates;
  areaServed: string[];
  openingHours: string;
  openingHoursSpecification: OpeningHourRule[];
  priceRange: string;
  currenciesAccepted: string;
  paymentAccepted: string;
  sameAs: string[];
  socialLinks: {
    name: "Facebook" | "Instagram" | "YouTube";
    href: string;
  }[];
  keywords: string[];
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://friendsdrivingcentre.com";

export const siteConfig: SiteConfig = {
  name: "Friends Driving Centre",
  legalName: "Friends Driving Centre Private Limited",
  shortName: "Friends Driving",
  tagline: "Learn to Drive Confidently in Your Own Vehicle",
  url: siteUrl,
  email: "info@friendsdrivingcentre.com",
  telephone: "+91 7639359098",
  phoneHref: "tel:+917639359098",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "7639359098",
  address: {
    streetAddress: "123 GST Road",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600045",
    addressCountry: "IN",
  },
  displayAddress: "123 GST Road, Tambaram, Chennai, Tamil Nadu 600045",
  geo: {
    latitude: 12.9249,
    longitude: 80.1265,
  },
  areaServed: ["Chennai", "Tambaram", "Velachery"],
  openingHours: "Mo-Su 06:00-20:00",
  openingHoursSpecification: [
    {
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "06:00",
      closes: "20:00",
    },
  ],
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI, Credit Card, Net Banking",
  sameAs: [
    "https://facebook.com",
    "https://instagram.com",
    "https://youtube.com",
  ],
  socialLinks: [
    { name: "Facebook", href: "https://facebook.com" },
    { name: "Instagram", href: "https://instagram.com" },
    { name: "YouTube", href: "https://youtube.com" },
  ],
  keywords: [
    "driving school in Chennai",
    "learn driving with own vehicle",
    "one-to-one driving training",
    "car driving classes Tambaram",
    "driving classes Velachery",
    "parking and highway driving training",
    "personalised driving instructor Chennai",
    "doorstep driving training Chennai",
  ],
};
