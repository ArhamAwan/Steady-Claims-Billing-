"use client";

import { motion } from "framer-motion";
import { reasons } from "@/lib/content";
import { AnimatedHeading } from "../motion/AnimatedHeading";
import { EASE, Reveal } from "../motion/Reveal";
import { Eyebrow } from "../ui/Eyebrow";

export function WhyUs() {
  return (
    <section className="border-y border-line bg-white">
      <div className="container-x section-y grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-[clamp(40px,6vw,96px)]">
        <div className="flex flex-col gap-[22px] lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>05 — Why Steady</Eyebrow>
          </Reveal>
          <AnimatedHeading className="h-section" parts={["Why practices choose Steady Claims Billing."]} />
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed text-muted">
              Full-service billing or help with specific parts of your revenue cycle — we&apos;ll discuss a structure that
              fits your practice.
            </p>
          </Reveal>
        </div>
        <motion.div
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-10 gap-y-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              className="group relative flex flex-col gap-2.5 py-[26px]"
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
            >
              <motion.span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left bg-line"
                variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1, ease: EASE } } }}
              />
              <span className="absolute left-0 top-0 h-px w-0 bg-teal transition-[width] duration-700 ease-out-expo group-hover:w-full" />
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-blue">/{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-[22px] font-semibold">{r.title}</h3>
              </div>
              <p className="text-[15.5px] leading-relaxed text-muted">{r.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
