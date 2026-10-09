import React from "react";
import {
  User,
  Clock,
  MapPin,
  ShieldPlus,
  ShieldCheck,
} from "lucide-react";
import type { IconName } from "@/lib/data";

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function Icon({
  name,
  size = 20,
  className = "",
  strokeWidth = 2,
}: IconProps) {
  switch (name) {
    case "user":
      return <User size={size} strokeWidth={strokeWidth} className={className} />;
    case "clock":
      return <Clock size={size} strokeWidth={strokeWidth} className={className} />;
    case "pin":
      return <MapPin size={size} strokeWidth={strokeWidth} className={className} />;
    case "shieldPlus":
      return <ShieldPlus size={size} strokeWidth={strokeWidth} className={className} />;
    case "shieldCheck":
      return <ShieldCheck size={size} strokeWidth={strokeWidth} className={className} />;
    case "road":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M4 19L8 5" />
          <path d="M20 19L16 5" />
          <path d="M12 5V8" />
          <path d="M12 11V14" />
          <path d="M12 17V19" />
        </svg>
      );
    case "parking":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
        </svg>
      );
    case "wheel":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v7" />
          <path d="M4 14l6-3" />
          <path d="M20 14l-6-3" />
        </svg>
      );
    default:
      return null;
  }
}
