"use client";

import { useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import { fadeUp, stagger, starContainer, starItem, viewport } from "@/lib/motion";
import SectionHeading from "./SectionHeading";
import SafeImage from "./SafeImage";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = useReducedMotion();

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const cardWidth = container.offsetWidth * 0.85;
    const newIndex = Math.round(container.scrollLeft / cardWidth);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < testimonials.length) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section
      className="py-12 lg:py-16 bg-white scroll-mt-20"
      aria-labelledby="testimonials-title"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Eyebrow */}
        <SectionHeading
          eyebrow="What Our Learners Say"
          id="testimonials-title"
          className="mb-9 sm:mb-11"
        />

        {/* Testimonials 3-Card Grid on md+, Snap Carousel on Mobile */}
        <m.div
          variants={stagger}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={viewport}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory pb-4 md:pb-0 scrollbar-none"
        >
          {testimonials.map((item) => (
            <m.article
              key={item.name}
              variants={fadeUp}
              whileHover={
                reduced
                  ? undefined
                  : {
                      y: -8,
                      boxShadow: "0 18px 36px rgba(11,60,77,0.12)",
                    }
              }
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="flex-shrink-0 w-[85%] sm:w-[65%] md:w-auto snap-center bg-white rounded-xl border border-[#E5EEEC] shadow-[0_4px_16px_rgba(11,60,77,0.06)] p-6 lg:p-7 flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Name, 5 Stars */}
                <div className="flex items-center gap-3.5">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#E6F5F3] flex-shrink-0">
                    <SafeImage
                      src={item.image}
                      alt={`Portrait of ${item.name}`}
                      fill
                      loading="lazy"
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    {/* Name: clean 15px */}
                    <h3 className="text-[15px] font-bold text-[#0B2F2A] leading-snug">
                      {item.name}
                    </h3>

                    {/* Staggered Stars Fill-in */}
                    <m.div
                      variants={starContainer}
                      initial={reduced ? false : "hidden"}
                      whileInView="visible"
                      viewport={viewport}
                      className="flex items-center gap-0.5 text-[#F5B301] mt-1"
                      aria-label="5 out of 5 stars"
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <m.span key={i} variants={starItem} className="inline-block">
                          <Star
                            size={14}
                            fill="currentColor"
                            aria-hidden="true"
                          />
                        </m.span>
                      ))}
                    </m.div>
                  </div>
                </div>

                {/* Review Text: crisp 14px */}
                <p className="mt-4 text-[14px] text-[#4B5563] leading-relaxed">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              {/* Location with Green Pin */}
              <div className="mt-5 pt-3.5 border-t border-[#F1FAF9] flex items-center gap-2 text-[13px] text-[#6B7280]">
                <MapPin size={15} className="text-[#0B8F5A]" aria-hidden="true" />
                <span>{item.city}</span>
              </div>
            </m.article>
          ))}
        </m.div>

        {/* Mobile Carousel Dot Indicators */}
        <div className="flex md:hidden justify-center items-center gap-2 mt-4" aria-hidden="true">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i ? "w-6 bg-[#0B8F5A]" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
