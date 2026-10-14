import React from "react";

interface StepIconProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

/**
 * Road icon with dashed center line (Step 3: Street Confidence)
 */
export function RoadIcon({
  className = "w-4 h-4",
  size = 16,
  strokeWidth = 2,
}: StepIconProps) {
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
      <path d="M12 5v3" />
      <path d="M12 11v3" />
      <path d="M12 17v2" />
    </svg>
  );
}

/**
 * Highway icon with dual multi-lane dividers (Step 5: Highway & Overtaking Skills)
 */
export function HighwayIcon({
  className = "w-4 h-4",
  size = 16,
  strokeWidth = 2,
}: StepIconProps) {
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
      <path d="M3 19L7 5" />
      <path d="M21 19L17 5" />
      <path d="M10 6v3" />
      <path d="M10 12v3" />
      <path d="M10 18v1" />
      <path d="M14 6v3" />
      <path d="M14 12v3" />
      <path d="M14 18v1" />
    </svg>
  );
}

/**
 * Steering wheel icon (Step 6: Independent Driving Stage)
 */
export function SteeringWheelIcon({
  className = "w-4 h-4",
  size = 16,
  strokeWidth = 2,
}: StepIconProps) {
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
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 3v6.5" />
      <path d="M4.5 16.5l5.5-3" />
      <path d="M19.5 16.5l-5.5-3" />
    </svg>
  );
}
