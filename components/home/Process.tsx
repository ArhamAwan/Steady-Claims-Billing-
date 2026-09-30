"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/content";
import { AnimatedHeading } from "../motion/AnimatedHeading";
import { EASE, Reveal } from "../motion/Reveal";
import { ButtonLink } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";

export function Process() {
  return (
    <section className="container-x section-y flex flex-col gap-14">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex max-w-[760px] flex-col gap-[18px]">
          <Reveal>
            <Eyebrow>04 — How we work</Eyebrow>
          </Reveal>
          <AnimatedHeading className="h-section" parts={["A more organized revenue cycle."]} />
        </div>
        <Reveal delay={0.2}>
          <ButtonLink href="/contact" variant="ink" arrow>
            Talk to Our Billing Team
          </ButtonLink>
        </Reveal>
      </div>

      <motion.ol
        className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-x-8 gap-y-2"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
      >
        {processSteps.map((s, i) => (
          <motion.li key={s.title} className="relative flex flex-col gap-4 pb-6 pt-7">
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[1.5px] origin-left bg-ink"
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease: EASE } } }}
            />
            <span className="block overflow-hidden">
              <motion.span
                className="block font-display text-[72px] font-light leading-none tracking-[-0.04em] text-blue"
                variants={{ hidden: { y: "100%" }, show: { y: "0%", transition: { duration: 0.9, ease: EASE } } }}
              >
                {String(i + 1).padStart(2, "0")}
              </motion.span>
            </span>
            <motion.div
              className="flex flex-col gap-3"
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.15 } } }}
            >
              <h3 className="font-display text-2xl font-semibold tracking-[-0.01em]">{s.title}</h3>
              <p className="text-[15.5px] leading-relaxed text-muted">{s.text}</p>
            </motion.div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
