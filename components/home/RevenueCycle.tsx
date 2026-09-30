"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { revenueCycleSteps } from "@/lib/content";
import { AnimatedHeading } from "../motion/AnimatedHeading";
import { EASE, Reveal } from "../motion/Reveal";
import { Eyebrow } from "../ui/Eyebrow";

/** The 13 stages light up one by one as the section scrolls through the viewport. */
export function RevenueCycle() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 85%", "end 45%"] });
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [count, setCount] = useState(0);
  const total = revenueCycleSteps.length;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setCount(Math.max(0, Math.min(total, Math.round(v * total))));
  });

  const current = Math.max(0, count - 1);

  return (
    <section className="grid-bg section-y bg-ink text-paper">
      <div className="container-x flex flex-col gap-14">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-end gap-10">
          <div className="flex flex-col gap-[18px]">
            <Reveal>
              <Eyebrow tone="teal">03 — The revenue cycle</Eyebrow>
            </Reveal>
            <AnimatedHeading className="h-section" parts={["From claim submission to payment follow-up."]} />
          </div>
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed text-on-dark-2">
              Medical billing involves much more than sending a claim to an insurance company. A problem at any stage can
              create delays later in the process — so we keep every stage organized and catch issues before they sit
              unresolved.
            </p>
          </Reveal>
        </div>

        <div className="sticky top-[84px] z-10 flex flex-col gap-3 rounded-2xl border border-paper/10 bg-ink/80 px-5 py-4 backdrop-blur-md">
          <div className="flex items-center justify-between gap-4 font-mono text-xs tracking-[0.12em]">
            <span className="shrink-0 whitespace-nowrap text-on-dark-3">
              STAGE <span className="text-teal">{String(count).padStart(2, "0")}</span> / {total}
            </span>
            <motion.span
              key={count}
              className="truncate text-right text-paper"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {count === 0 ? "Scroll to follow a claim" : revenueCycleSteps[current].toUpperCase()}
            </motion.span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-paper/10">
            <motion.div className="h-full origin-left rounded-full bg-teal" style={{ scaleX: bar }} />
          </div>
        </div>

        <ol ref={listRef} className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,150px),1fr))] gap-3 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
          {revenueCycleSteps.map((step, i) => {
            const lit = i < count;
            const isCurrent = i === current && count > 0;
            return (
              <motion.li
                key={step}
                className="relative flex min-h-[116px] flex-col justify-between gap-[18px] overflow-hidden rounded-[18px] border p-[18px] sm:min-h-[132px] sm:p-[22px]"
                animate={{
                  backgroundColor: isCurrent ? "#37D3C1" : lit ? "#15325A" : "#12294B",
                  borderColor: isCurrent ? "#37D3C1" : lit ? "rgba(55,211,193,.35)" : "rgba(242,246,250,.1)",
                  color: isCurrent ? "#0B1F3A" : "#F2F6FA",
                  scale: isCurrent ? 1.02 : 1,
                }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <span className="flex items-center justify-between font-mono text-xs opacity-70">
                  {String(i + 1).padStart(2, "0")}
                  {lit && !isCurrent && (
                    <motion.svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#37D3C1"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <motion.path d="M20 6L9 17l-5-5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }} />
                    </motion.svg>
                  )}
                </span>
                <span className="font-display text-[17px] font-semibold leading-tight sm:text-xl">{step}</span>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
