import React from "react";

interface SectionHeadingProps {
  eyebrow: string | React.ReactNode;
  title?: string;
  subtitle?: string;
  id?: string;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`text-center mb-9 sm:mb-11 ${className}`}>
      {/* Eyebrow with green lines: upgraded to 13-14px */}
      <div className="inline-flex items-center justify-center gap-3 text-[13px] sm:text-[14px] font-bold tracking-[1.4px] uppercase text-[#0B8F5A] mb-2.5">
        <span className="w-8 h-[2px] bg-[#0B8F5A] inline-block" aria-hidden="true" />
        <span>{eyebrow}</span>
        <span className="w-8 h-[2px] bg-[#0B8F5A] inline-block" aria-hidden="true" />
      </div>

      {/* Main Section Title: balanced not too big and not too small */}
      {title && (
        <h2
          id={id}
          className="text-2xl sm:text-[28px] lg:text-[30px] font-bold text-[#0B2F2A] tracking-tight leading-[1.25]"
        >
          {title}
        </h2>
      )}

      {/* Subtitle: clean 14px font size with comfortable reading line-height */}
      {subtitle && (
        <p className="max-w-2xl mx-auto mt-2 sm:mt-2.5 text-[14px] text-[#6B7280] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
