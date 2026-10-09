import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrainingPrograms from "@/components/TrainingPrograms";
import Footer from "@/components/Footer";
import SiteProvider from "@/components/SiteProvider";
import ScrollProgress from "@/components/ScrollProgress";
import JsonLd from "@/components/JsonLd";
import { generateStructuredData } from "@/lib/schema";

// Dynamic import for below-the-fold interactive components to optimize initial JS bundle
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"), {
  loading: () => <div className="min-h-[280px] bg-[#F1FAF9]" />,
});

const CtaBanner = dynamic(() => import("@/components/CtaBanner"), {
  loading: () => <div className="min-h-[120px] max-w-[1360px] mx-auto px-4" />,
});

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="min-h-[280px] bg-white" />,
});

export default function Home() {
  const structuredData = generateStructuredData();

  return (
    <SiteProvider>
      {/* 3px Scroll Progress Bar Fixed to Top */}
      <ScrollProgress />

      {/* Schema.org Structured Data */}
      <JsonLd data={structuredData} />

      {/* Skip to Main Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0B8F5A] focus:text-white focus:rounded-md focus:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0B2F2A]"
      >
        Skip to main content
      </a>

      {/* Sticky Header / Navigation */}
      <Navbar />

      {/* Main Page Landmark */}
      <main id="main-content">
        <Hero />
        <TrainingPrograms />
        <WhyChooseUs />
        <CtaBanner />
        <Testimonials />
      </main>

      {/* Server Component Footer */}
      <Footer />
    </SiteProvider>
  );
}
