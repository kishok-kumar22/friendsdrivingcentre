"use client";

import { m, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/images";
import { buttonTap, fadeUp, viewport } from "@/lib/motion";
import SafeImage from "./SafeImage";
import { useEnquiry } from "./SiteProvider";

export default function CtaBanner() {
  const reduced = useReducedMotion();
  const openEnquiry = useEnquiry();

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 w-full">
      <m.section
        variants={fadeUp}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={viewport}
        aria-labelledby="cta-title"
        className="relative overflow-hidden rounded-2xl bg-[#0B3C4D] py-8 sm:py-9 px-6 sm:px-10 lg:px-12 shadow-xl"
      >
        {/* Background Image with Slow Ken Burns Zoom (scale: 1 -> 1.08 over 20s) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <m.div
            animate={
              reduced
                ? {}
                : {
                    scale: [1, 1.08, 1],
                  }
            }
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full h-full"
          >
            <SafeImage
              src={images.banner}
              alt=""
              fill
              loading="lazy"
              sizes="(max-width: 1360px) 100vw, 1360px"
              className="object-cover blur-[2px] opacity-25"
            />
          </m.div>
          <div className="absolute inset-0 bg-[#0B3C4D]/92" />
        </div>

        {/* Content Row: Stacks vertically and centers on mobile */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-7 lg:gap-8 text-center md:text-left">
          {/* Left: Steering Wheel Icon + Copy */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full md:w-auto">
            {/* Steering Wheel Icon: Swings on enter, rotates slowly on hover */}
            <m.div
              initial={reduced ? false : { rotate: 0 }}
              whileInView={reduced ? undefined : { rotate: [-14, 14, -8, 8, 0] }}
              whileHover={reduced ? undefined : { rotate: 360, transition: { duration: 2.5, ease: "linear", repeat: Infinity } }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="cursor-pointer"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-13 h-13 sm:w-14 sm:h-14 flex-shrink-0 opacity-95"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3.2" />
                <path d="M12 2v6.8" />
                <path d="M4 14.5l6-3" />
                <path d="M20 14.5l-6-3" />
              </svg>
            </m.div>

            <div>
              <h2
                id="cta-title"
                className="text-white text-[20px] sm:text-[24px] lg:text-[25px] font-bold leading-tight tracking-tight"
              >
                Ready to start your
                <br className="hidden sm:inline" />{" "}
                driving journey?
              </h2>
              <p className="mt-1.5 text-[#E6F5F3] text-[14px] opacity-90 max-w-md">
                Take the first step towards a safer, more confident you.
              </p>
            </div>
          </div>

          {/* Center-Right: Pulsing Solid Green Button */}
          <div className="w-full sm:w-auto flex justify-center">
            <m.div
              variants={buttonTap}
              whileHover={reduced ? undefined : "hover"}
              whileTap={reduced ? undefined : "tap"}
              className="relative w-full sm:w-auto"
            >
              {/* Subtle pulse ring loop */}
              {!reduced && (
                <m.span
                  animate={{
                    scale: [1, 1.2, 1.35],
                    opacity: [0.7, 0.3, 0],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 rounded-md bg-[#0B8F5A] pointer-events-none -z-10"
                />
              )}
              <button
                onClick={openEnquiry}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0B8F5A] hover:bg-[#087A4C] text-white text-[14.5px] sm:text-[15px] font-semibold px-6 py-3.5 rounded-md shadow-lg transition-colors cursor-pointer min-h-[48px] whitespace-nowrap"
              >
                <span>Talk to a Trainer</span>
                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </m.div>
          </div>

          {/* Far Right: Handwritten Script with Self-Drawing Underline Swoosh (hidden on mobile) */}
          <div className="hidden lg:flex flex-col items-center justify-center -rotate-6 select-none pl-2">
            <span
              className="text-white text-[30px] font-semibold leading-tight tracking-wide font-handwriting"
            >
              Drive Safe,
              <br />
              Drive Confident
            </span>
            <svg
              viewBox="0 0 160 14"
              fill="none"
              className="w-40 h-3.5 mt-1 text-white"
              aria-hidden="true"
            >
              <m.path
                d="M4 10C45 2 110 1 156 7M50 12C80 8 115 8 142 10"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={viewport}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
              />
            </svg>
          </div>
        </div>
      </m.section>
    </div>
  );
}
