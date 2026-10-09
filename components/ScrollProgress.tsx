"use client";

import { m, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * High-performance 3px scroll progress indicator fixed at the top of the viewport.
 * Driven by useScroll + useSpring and automatically disabled for prefers-reduced-motion.
 */
export default function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 35,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <m.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#0B8F5A] z-50 pointer-events-none"
      aria-hidden="true"
    />
  );
}
