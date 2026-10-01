"use client";

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * The brand heartbeat line, driven by scroll:
 * - it draws itself as it moves up through the viewport,
 * - a glowing pulse travels along it with your scroll position,
 * - the beats spike higher the faster you scroll, then settle back.
 */
export function PulseLine({
  d = "M0 60 H260 L285 60 L300 22 L322 84 L340 40 L352 60 H620 L640 60 L652 36 L668 74 L680 60 H1440",
  className = "",
  drawOnLoad = false,
}: {
  d?: string;
  className?: string;
  /** Draw the line in on page load (used in the hero) instead of waiting for scroll. */
  drawOnLoad?: boolean;
  /** Kept for compatibility with earlier usage; the line is now scroll-driven. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress, scrollY } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Draw from 0 → 100% while the line travels from the bottom of the screen to just past the middle.
  const drawRaw = useTransform(scrollYProgress, [0.02, 0.55], [0, 1], { clamp: true });
  const drawScroll = useSpring(drawRaw, { stiffness: 90, damping: 24, mass: 0.4 });
  // Hero variant: draw once on load and stay fully drawn.
  const drawLoad = useMotionValue(0);
  useEffect(() => {
    if (!drawOnLoad) return;
    const c = animate(drawLoad, 1, { duration: 2.2, delay: 0.9, ease: [0.65, 0, 0.35, 1] });
    return () => c.stop();
  }, [drawOnLoad, drawLoad]);
  const draw = drawOnLoad ? drawLoad : drawScroll;

  // A short bright segment that rides along the line with the scroll.
  const pulseRaw = useTransform(scrollYProgress, [0.05, 0.95], [-0.12, 1]);
  const pulse = useSpring(pulseRaw, { stiffness: 120, damping: 26, mass: 0.4 });
  const pulseOpacity = useTransform(
    scrollYProgress,
    drawOnLoad ? [0, 0.85, 0.95] : [0.05, 0.15, 0.85, 0.95],
    drawOnLoad ? [1, 1, 0] : [0, 1, 1, 0]
  );

  // Faster scrolling = taller heartbeat.
  const velocity = useVelocity(scrollY);
  const ampRaw = useTransform(velocity, [-2500, 0, 2500], [1.7, 1, 1.7], { clamp: true });
  const amp = useSpring(ampRaw, { stiffness: 110, damping: 16, mass: 0.6 });
  const beat = useMotionTemplate`scaleY(${amp})`;
  // Baseline y of the line (the "M0 <y>" start), so spikes grow around it.
  const base = parseFloat(d.trim().split(/[\s,]+/)[1]) || 60;

  if (reduce) {
    return (
      <div ref={ref} className={className} aria-hidden="true">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="block h-[90px] w-full">
          <path d={d} fill="none" stroke="#37D3C1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    );
  }

  return (
    <div ref={ref} className={className} aria-hidden="true">
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="block h-[90px] w-full overflow-visible">
      <motion.g style={{ transform: beat, transformBox: "view-box", transformOrigin: `0px ${base}px` }}>
        {/* faint full track so the shape reads before it's drawn */}
        <path d={d} fill="none" stroke="#37D3C1" strokeOpacity={0.12} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <motion.path
          d={d}
          fill="none"
          stroke="#37D3C1"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: draw }}
        />
        <motion.path
          d={d}
          fill="none"
          stroke="#B6F5EC"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{
            pathLength: 0.1,
            pathOffset: pulse,
            opacity: pulseOpacity,
            filter: "drop-shadow(0 0 6px rgba(55,211,193,.9))",
          }}
        />
      </motion.g>
    </svg>
    </div>
  );
}
