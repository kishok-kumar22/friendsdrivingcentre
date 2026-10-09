"use client";

import { m, useReducedMotion } from "framer-motion";
import { benefits } from "@/lib/data";
import { popSpring, stagger, viewport, dividerGrow } from "@/lib/motion";
import SectionHeading from "./SectionHeading";
import Icon from "./Icon";

export default function WhyChooseUs() {
  const reduced = useReducedMotion();

  const eyebrowContent = (
    <>
      WHY CHOOSE <span className="text-[#0B8F5A] font-extrabold">FRIENDS</span>{" "}
      DRIVING CENTRE?
    </>
  );

  return (
    <section
      id="why"
      className="py-12 lg:py-16 bg-[#F1FAF9] scroll-mt-20"
      aria-labelledby="why-title"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full" id="about">
        <SectionHeading
          eyebrow={eyebrowContent}
          title="Your Safety, Our Priority"
          id="why-title"
        />

        {/* 5-column layout on desktop, 3 on tablet, 2 on mobile with 5th centered */}
        <m.div
          variants={stagger}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-9 sm:gap-y-10 mt-10 sm:mt-12"
        >
          {benefits.map((item, index) => {
            const isLastOnMobile = index === benefits.length - 1;
            const isLastOnDesktop = index === benefits.length - 1;
            return (
              <div
                key={item.title}
                className={`relative flex flex-col items-center text-center px-4 sm:px-5 lg:px-6 ${
                  isLastOnMobile
                    ? "col-span-2 sm:col-span-1 justify-self-center max-w-xs sm:max-w-none"
                    : ""
                }`}
              >
                {/* Desktop vertical divider that grows top-to-bottom */}
                {!isLastOnDesktop && (
                  <m.div
                    variants={dividerGrow}
                    className="hidden lg:block absolute right-0 top-2 bottom-2 w-[1px] bg-[#DCEAE6]"
                    aria-hidden="true"
                  />
                )}

                {/* Mint circle with spring pop-in & soft hover pulse */}
                <m.div
                  variants={popSpring}
                  whileHover={reduced ? undefined : { scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 350, damping: 15 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#E6F5F3] flex items-center justify-center text-[#0B8F5A] mb-4 shadow-sm cursor-pointer"
                  aria-hidden="true"
                >
                  <Icon name={item.icon} size={28} strokeWidth={2.2} />
                </m.div>

                {/* Balanced H3 Title */}
                <h3 className="text-[16px] font-bold text-[#0B2F2A] leading-snug">
                  {item.title}
                </h3>

                {/* Description: exactly 14px body text */}
                <p className="mt-2 text-[14px] text-[#6B7280] leading-relaxed max-w-[210px]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}
