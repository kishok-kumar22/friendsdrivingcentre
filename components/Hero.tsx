"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, CarFront } from "lucide-react";
import { heroFeatures } from "@/lib/data";
import { images } from "@/lib/images";
import { buttonTap, fadeUp, stagger } from "@/lib/motion";
import Icon from "./Icon";
import SafeImage from "./SafeImage";
import { useEnquiry } from "./SiteProvider";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const openEnquiry = useEnquiry();

  // Gentle parallax on scroll for hero image on desktop (max 36px)
  const { scrollY } = useScroll();
  const imageParallaxY = useTransform(scrollY, [0, 500], [0, 36]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative overflow-hidden bg-[#F1FAF9] lg:min-h-[440px] flex items-center scroll-mt-20"
      aria-labelledby="hero-title"
    >
      {/* SVG ClipPath Definition for the curved hero edge on desktop */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="hero-curve-mask" clipPathUnits="objectBoundingBox">
            <path d="M 0.08 0 C 0.02 0.35 0.02 0.65 0.09 1 L 1 1 L 1 0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-7 sm:py-9 lg:py-12 z-10">
        <div className="lg:w-[53%] xl:w-[51%]">
          <m.div
            variants={stagger}
            initial={reduced ? false : "hidden"}
            animate="visible"
          >
            {/* Eyebrow Pill Badge */}
            <m.div variants={fadeUp}>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[12px] sm:text-[13px] font-bold tracking-wider uppercase text-[#0B8F5A] bg-[#D5EFE8]">
                Personalised Driving Training
              </span>
            </m.div>

            {/* Exactly one H1 on the page: Line-by-line staggered entrance */}
            <h1
              id="hero-title"
              className="mt-3.5 sm:mt-4 text-[27px] xs:text-[31px] sm:text-4xl lg:text-[40px] font-bold text-[#0B2F2A] leading-[1.18] tracking-tight"
            >
              <m.span variants={fadeUp} className="block">
                Learn to Drive Confidently
              </m.span>
              <m.span variants={fadeUp} className="block text-[#0B8F5A]">
                in Your Own Vehicle
              </m.span>
            </h1>

            {/* Paragraph: balanced font size with comfortable line-height */}
            <m.p
              variants={fadeUp}
              className="mt-3 sm:mt-3.5 text-[14.5px] sm:text-[15.5px] text-[#374151] leading-relaxed max-w-xl"
            >
              One-to-one guidance for real-world skills — practice with your own
              vehicle, at your pace.
            </m.p>

            {/* Action Buttons: full-width stacked on mobile, row on tablet/desktop */}
            <m.div
              variants={fadeUp}
              className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5"
            >
              <m.button
                variants={buttonTap}
                whileHover={reduced ? undefined : "hover"}
                whileTap={reduced ? undefined : "tap"}
                onClick={openEnquiry}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0B8F5A] hover:bg-[#087A4C] text-white text-[14px] sm:text-[15px] font-semibold px-5.5 sm:px-6 py-3.5 rounded-md shadow-sm transition-colors cursor-pointer min-h-[48px]"
              >
                <span>Book a Training Enquiry</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </m.button>

              <m.a
                variants={buttonTap}
                whileHover={reduced ? undefined : "hover"}
                whileTap={reduced ? undefined : "tap"}
                href="#programs"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#E6F5F3] text-[#0B8F5A] border-[1.5px] border-[#0B8F5A] text-[14px] sm:text-[15px] font-semibold px-5 sm:px-5.5 py-3.5 rounded-md transition-colors cursor-pointer min-h-[48px]"
              >
                <span>Explore Training Programs</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </m.a>
            </m.div>

            {/* Mobile/Tablet Hero Image: displayed between buttons and feature items for optimal narrative flow */}
            <m.div variants={fadeUp} className="lg:hidden my-6 sm:my-7 w-full">
              <div className="relative w-full aspect-[16/9] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-[#E5EEEC] shadow-md bg-[#E6F5F3]">
                <SafeImage
                  src={images.hero}
                  alt="Professional instructor providing one-to-one personalized driving guidance to a student inside car"
                  fill
                  priority
                  fetchPriority="high"
                  quality={85}
                  sizes="(max-width: 1023px) 100vw, 600px"
                  className="object-cover object-[65%_center]"
                />
                {/* Floating White Pill Card on Mobile */}
                <m.div
                  animate={reduced ? {} : { y: [0, -6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/95 backdrop-blur-sm rounded-xl py-2 px-3 shadow-md border border-[#E5EEEC] flex items-center gap-2.5 select-none"
                >
                  <div className="w-8 h-8 rounded-full bg-[#E6F5F3] flex items-center justify-center text-[#0B8F5A] flex-shrink-0">
                    <CarFront size={18} aria-hidden="true" />
                  </div>
                  <div className="text-[11.5px] sm:text-[12px] font-bold text-[#0B2F2A] leading-tight">
                    <div>Your vehicle.</div>
                    <div>Our guidance.</div>
                  </div>
                </m.div>
              </div>
            </m.div>

            {/* Feature items row: 3 compact columns on mobile, row with dividers on desktop */}
            <m.div
              variants={fadeUp}
              className="pt-4 sm:pt-5 border-t border-[#DCEAE6] grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4 lg:flex lg:items-center lg:gap-6"
            >
              {heroFeatures.map((feat, idx) => (
                <div
                  key={feat.title}
                  className={`flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1.5 xs:gap-2 sm:gap-3 ${
                    idx > 0 ? "lg:pl-6 lg:border-l lg:border-[#CDDFDB]" : ""
                  }`}
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E6F5F3] flex items-center justify-center text-[#0B8F5A] flex-shrink-0 shadow-xs">
                    <Icon name={feat.icon} size={18} strokeWidth={2.2} />
                  </div>
                  <span className="text-[11.5px] xs:text-[12px] sm:text-[13px] font-medium text-[#374151] leading-tight">
                    {feat.title}
                  </span>
                </div>
              ))}
            </m.div>
          </m.div>
        </div>
      </div>

      {/* Right Column: Hero Photo with Curved Green-Bordered Edge (Desktop image seamlessly filling right half) */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[49%] xl:w-[50%] h-full z-0 overflow-hidden">
        {/* Curved SVG Border Stroke */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          aria-hidden="true"
        >
          <path
            d="M 8,0 C 2,35 2,65 9,100"
            fill="none"
            stroke="#0B8F5A"
            strokeWidth="3.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Masked Image Container with priority for LCP */}
        <div
          className="relative w-full h-full bg-[#E6F5F3] overflow-hidden"
          style={{ clipPath: "url(#hero-curve-mask)" }}
        >
          <m.div
            style={reduced ? {} : { y: imageParallaxY }}
            initial={reduced ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="relative w-full h-full scale-[1.03] origin-center"
          >
            <SafeImage
              src={images.hero}
              alt="Professional instructor providing one-to-one personalized driving guidance to a student inside car"
              fill
              priority
              fetchPriority="high"
              quality={85}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[68%_center]"
            />
          </m.div>
        </div>

        {/* Floating White Pill Card: continuous bobbing y: 0 -> -8 -> 0 */}
        <m.div
          animate={reduced ? {} : { y: [0, -8, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-6 right-8 lg:bottom-7 lg:right-9 z-30 bg-white rounded-xl py-2.5 px-4 shadow-[0_4px_24px_rgba(11,60,77,0.14)] border border-[#E5EEEC] flex items-center gap-3 select-none"
        >
          <div className="w-9 h-9 rounded-full bg-[#E6F5F3] flex items-center justify-center text-[#0B8F5A] flex-shrink-0">
            <CarFront size={20} aria-hidden="true" />
          </div>
          <div className="text-[12.5px] font-bold text-[#0B2F2A] leading-snug">
            <div>Your vehicle.</div>
            <div>Our guidance.</div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
