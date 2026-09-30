"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { EASE } from "./Reveal";

type Part = string | { text: string; className?: string };

/**
 * Heading whose words rise out of a mask one after another.
 * `parts` lets individual phrases carry their own styling (e.g. the teal accent word).
 */
export function AnimatedHeading({
  parts,
  as = "h2",
  className = "",
  delay = 0,
  stagger = 0.045,
  onMount = false,
}: {
  parts: Part[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount (hero headings) instead of when scrolled into view. */
  onMount?: boolean;
}) {
  const Tag = motion[as];
  const words: { word: string; className?: string }[] = [];
  for (const part of parts) {
    const text = typeof part === "string" ? part : part.text;
    const cls = typeof part === "string" ? undefined : part.className;
    text
      .split(" ")
      .filter(Boolean)
      .forEach((word) => words.push({ word, className: cls }));
  }
  const label = parts.map((p) => (typeof p === "string" ? p : p.text)).join(" ").replace(/\s+/g, " ");

  const trigger = onMount
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "0px 0px -60px 0px" } };

  return (
    <Tag
      className={className}
      aria-label={label}
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
            <motion.span
              className={`inline-block ${w.className ?? ""}`}
              variants={{
                hidden: { y: "108%", rotate: 3 },
                show: { y: "0%", rotate: 0, transition: { duration: 1, ease: EASE } },
              }}
            >
              {w.word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
