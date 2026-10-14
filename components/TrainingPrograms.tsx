"use client";

import { m, useReducedMotion } from "framer-motion";
import { Check, Users, User, ParkingSquare } from "lucide-react";
import { programs } from "@/lib/data";
import {
  cardEntryVariants,
  checklistContainer,
  checklistItem,
  stagger,
  viewport,
} from "@/lib/motion";
import SectionHeading from "./SectionHeading";
import SafeImage from "./SafeImage";
import StepTag from "./StepTag";
import { RoadIcon, HighwayIcon, SteeringWheelIcon } from "./StepIcons";

const steps = [
  {
    step: 1,
    title: "Women-to-Women Training",
    icon: <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.2} />,
  },
  {
    step: 2,
    title: "One-to-One Mentor",
    icon: <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.2} />,
  },
  {
    step: 3,
    title: "Street Confidence",
    icon: <RoadIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.2} />,
  },
  {
    step: 4,
    title: "Parking Mastery",
    icon: <ParkingSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.2} />,
  },
  {
    step: 5,
    title: "Highway & Overtaking Skills",
    icon: <HighwayIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.2} />,
  },
  {
    step: 6,
    title: "Independent Driving Stage",
    icon: <SteeringWheelIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.2} />,
  },
];

export default function TrainingPrograms() {
  const reduced = useReducedMotion();

  return (
    <section
      id="programs"
      className="py-12 lg:py-16 bg-white scroll-mt-20"
      aria-labelledby="programs-title"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Heading with Upgraded Font Sizes */}
        <SectionHeading
          eyebrow="Training Programs"
          title="Our Driving Training Programs"
          id="programs-title"
          subtitle="From basics to independence — we guide you at every step, with focused training and real-world practice."
        />

        {/* Programs Grid: 6 cards in a balanced 3-column grid on desktop */}
        <m.div
          variants={stagger}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-9 sm:mt-11"
        >
          {programs.map((prog, index) => {
            const stepItem = steps[index];

            return (
              <m.article
                key={prog.id}
                variants={cardEntryVariants}
                whileHover={
                  reduced
                    ? undefined
                    : {
                        y: -8,
                        boxShadow: "0 18px 40px rgba(11,60,77,0.14)",
                      }
                }
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="group bg-white rounded-xl border border-[#E5EEEC] shadow-[0_4px_16px_rgba(11,60,77,0.06)] overflow-hidden flex flex-col"
              >
                {/* Image on top: uses uploaded program image containing the photo + program badge */}
                <div className="relative w-full bg-[#E6F5F3] overflow-hidden aspect-[500/302]">
                  <SafeImage
                    src={prog.image}
                    alt={prog.imageAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Step Tag overlay at bottom-left of the card image */}
                  {stepItem && (
                    <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
                      <StepTag
                        step={stepItem.step}
                        title={stepItem.title}
                        icon={stepItem.icon}
                      />
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 lg:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Semantic heading for screen readers & SEO */}
                    <h3 className="sr-only">{prog.title}</h3>

                    {/* Short Description: crisp 14px font size */}
                    <p className="text-[14px] text-[#6B7280] leading-relaxed">
                      {prog.description}
                    </p>
                  </div>

                  {/* Checklist items: 14px font size with staggered reveal */}
                  <m.ul
                    variants={checklistContainer}
                    initial={reduced ? false : "hidden"}
                    whileInView="visible"
                    viewport={viewport}
                    className="mt-4 space-y-2 pt-3.5 border-t border-[#F1FAF9]"
                  >
                    {prog.features.map((feat) => (
                      <m.li
                        key={feat}
                        variants={checklistItem}
                        className="flex items-start gap-2.5"
                      >
                        <Check
                          size={15}
                          strokeWidth={2.8}
                          className="text-[#0B8F5A] mt-0.5 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-[14px] text-[#374151] leading-tight">
                          {feat}
                        </span>
                      </m.li>
                    ))}
                  </m.ul>
                </div>
              </m.article>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}
