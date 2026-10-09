import React from "react";
import Image from "next/image";

interface LogoProps {
  light?: boolean;
  className?: string;
}

export default function Logo({ light = false, className = "" }: LogoProps) {
  return (
    <a
      href="#home"
      className={`inline-flex items-center select-none transition-opacity hover:opacity-90 ${className}`}
      aria-label="Friends Driving Centre Home"
    >
      <Image
        src="/images/logo.png"
        alt="Friends Driving Centre"
        width={160}
        height={55}
        priority
        className={`w-auto h-9 sm:h-10 lg:h-11 max-h-11 object-contain transition-all duration-200 ${
          light ? "brightness-0 invert" : ""
        }`}
      />
    </a>
  );
}
