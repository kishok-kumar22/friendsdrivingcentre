import React, { type ReactNode } from "react";

export interface StepTagProps {
  step: number;
  title: string;
  icon: ReactNode;
  className?: string;
}

export default function StepTag({
  step,
  title,
  icon,
  className = "",
}: StepTagProps) {
  return (
    <div
      role="status"
      aria-label={`Step ${step}: ${title}`}
      className={`inline-flex items-center gap-1.5 sm:gap-2 py-1 pl-1 pr-3 sm:py-1 sm:pl-1 sm:pr-3.5 bg-white rounded-full border border-slate-200/90 shadow-[0_2px_8px_rgba(11,22,84,0.08)] select-none transition-transform duration-200 ${className}`}
    >
      {/* Step Number Circle */}
      <span
        aria-hidden="true"
        className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#16a34a] text-white text-[11px] sm:text-xs font-bold shrink-0 shadow-xs leading-none"
      >
        {step}
      </span>

      {/* Step Icon */}
      <span
        aria-hidden="true"
        className="text-[#48ae6d] flex items-center justify-center shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-4 sm:[&>svg]:h-4"
      >
        {icon}
      </span>

      {/* Step Title */}
      <span className="text-[#0b1654] font-semibold text-xs sm:text-[13px] tracking-tight whitespace-nowrap">
        {title}
      </span>
    </div>
  );
}
