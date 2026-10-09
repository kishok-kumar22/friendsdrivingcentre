"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

// Soft mint #E6F5F3 placeholder blur data URL
export const MINT_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiNFMkY1RTIiLz48L3N2Zz4=";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackClassName?: string;
  fetchPriority?: "high" | "low" | "auto";
}

export default function SafeImage({
  alt,
  className = "",
  fallbackClassName = "",
  style,
  placeholder = "blur",
  blurDataURL = MINT_BLUR_DATA_URL,
  fetchPriority,
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`bg-[#E6F5F3] flex items-center justify-center text-[#0B8F5A]/40 w-full h-full select-none ${fallbackClassName}`}
        style={style}
        role="img"
        aria-label={alt}
      >
        <svg
          className="w-8 h-8 opacity-40 text-[#0B8F5A]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      className={`object-cover ${className}`}
      style={style}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      onError={() => setHasError(true)}
      {...(fetchPriority ? { fetchPriority } : {})}
      {...props}
    />
  );
}
