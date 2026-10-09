import { siteConfig } from "./siteConfig";
import { programs, testimonials } from "./data";
import { images } from "./images";

/**
 * Builds schema.org JSON-LD structured data for Friends Driving Centre.
 * Complies with Google Search documentation for LocalBusiness, Service,
 * WebSite, and BreadcrumbList.
 *
 * NOTE: As per Google Guidelines, AggregateRating must NOT be faked.
 * Only genuine individual customer reviews are marked up.
 */
export function generateStructuredData() {
  const businessId = `${siteConfig.url}/#business`;
  const websiteId = `${siteConfig.url}/#website`;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    additionalType: "https://schema.org/DrivingSchool",
    "@id": businessId,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon`,
    image: [images.hero],
    telephone: siteConfig.telephone,
    email: siteConfig.email,
    priceRange: siteConfig.priceRange,
    currenciesAccepted: siteConfig.currenciesAccepted,
    paymentAccepted: siteConfig.paymentAccepted,
    description: siteConfig.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: siteConfig.areaServed.map((city) => ({
      "@type": "City",
      name: city,
    })),
    openingHoursSpecification: siteConfig.openingHoursSpecification.map((item) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: item.dayOfWeek,
      opens: item.opens,
      closes: item.closes,
    })),
    sameAs: siteConfig.sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Driving Training Programs",
      itemListElement: programs.map((prog, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: prog.title,
          description: prog.description,
          url: `${siteConfig.url}/#programs`,
          provider: {
            "@id": businessId,
          },
        },
      })),
    },
    // Genuine reviews from authentic learners only (no synthetic AggregateRating)
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: t.name,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: t.review,
    })),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.tagline,
    publisher: {
      "@id": businessId,
    },
    inLanguage: "en-IN",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Training Programs",
        item: `${siteConfig.url}/#programs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Why Choose Us",
        item: `${siteConfig.url}/#why`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Contact",
        item: `${siteConfig.url}/#contact`,
      },
    ],
  };

  return [localBusinessSchema, websiteSchema, breadcrumbSchema];
}
