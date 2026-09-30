"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { AnimatedHeading } from "../motion/AnimatedHeading";
import { EASE } from "../motion/Reveal";
import { Eyebrow } from "../ui/Eyebrow";

type Part = string | { text: string; className?: string };

/** Dark hero used at the top of every inner page. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  layout = "split",
  bottom,
  className = "",
  introClassName = "max-w-[640px]",
}: {
  eyebrow: string;
  title: Part[];
  intro?: ReactNode;
  children?: ReactNode;
  layout?: "split" | "stack";
  bottom?: ReactNode;
  className?: string;
  introClassName?: string;
}) {
  return (
    <section className={`grid-bg relative overflow-hidden bg-ink text-paper ${className}`}>
      <div className="container-x pb-[clamp(56px,7vw,96px)] pt-[clamp(140px,14vw,190px)]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          <Eyebrow tone="teal">{eyebrow}</Eyebrow>
        </motion.div>
        <div
          className={
            layout === "split"
              ? "mt-7 grid grid-cols-[repeat(auto-fit,minmax(min(100%,480px),1fr))] items-end gap-10"
              : "mt-7 flex flex-col gap-8"
          }
        >
          <AnimatedHeading
            as="h1"
            onMount
            delay={0.15}
            parts={title}
            className="h-display max-w-[1150px] text-[clamp(44px,6.8vw,104px)] leading-[0.93]"
          />
          {intro && (
            <motion.div
              className={`${introClassName} text-[clamp(17px,1.5vw,19px)] leading-relaxed text-on-dark`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
            >
              {intro}
            </motion.div>
          )}
        </div>
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
          >
            {children}
          </motion.div>
        )}
      </div>
      {bottom}
    </section>
  );
}
