import React from "react";
import Image from "next/image";

interface LogoProps {
  light?: boolean;
  className?: string;
  imageClassName?: string;
  scrolled?: boolean;
}

export default function Logo({
  light = false,
  className = "",
  imageClassName,
  scrolled = false,
}: LogoProps) {
  // Bold, prominent logo sizing - maximum height & width within the standard navbar
  const defaultImageClasses = imageClassName
    ? imageClassName
    : scrolled
    ? "h-[42px] sm:h-[46px] lg:h-[48px] w-auto max-w-[210px] sm:max-w-[240px] lg:max-w-[260px]"
    : "h-[48px] sm:h-[54px] lg:h-[58px] w-auto max-w-[230px] sm:max-w-[270px] lg:max-w-[290px]";

  return (
    <a
      href="#home"
      className={`inline-flex items-center select-none transition-opacity hover:opacity-95 ${className}`}
      aria-label="Friends Driving Centre Home"
    >
      <Image
        src="/images/logo.png"
        alt="Friends Driving Centre"
        width={420}
        height={95}
        priority
        className={`object-contain transition-all duration-200 ${defaultImageClasses} ${
          light ? "brightness-0 invert" : ""
        }`}
      />
    </a>
  );
}
