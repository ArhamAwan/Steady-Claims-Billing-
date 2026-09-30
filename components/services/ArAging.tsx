"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { arBuckets, arServices } from "@/lib/content";
import { AnimatedHeading } from "../motion/AnimatedHeading";
import { EASE, Reveal } from "../motion/Reveal";
import { ButtonLink } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";

export function ArAging() {
  const [sel, setSel] = useState(0);
  const cur = arBuckets[sel];

  return (
    <section id="ar" className="container-x section-y flex scroll-mt-20 flex-col gap-14">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-end gap-8">
        <div className="flex flex-col gap-[18px]">
          <Reveal>
            <Eyebrow>05 — Accounts receivable follow-up</Eyebrow>
          </Reveal>
          <AnimatedHeading
            className="h-section text-[clamp(36px,4.2vw,58px)]"
            parts={["Don't let outstanding claims sit unworked."]}
          />
        </div>
        <Reveal delay={0.15}>
          <p className="text-lg leading-relaxed text-muted">
            Accounts receivable is money owed to your practice for services already provided. As claims age, they may
            become more difficult to resolve — we review aging claims and determine what action is required.
          </p>
        </Reveal>
      </div>

      <Reveal>
        <div className="flex flex-col gap-8 rounded-[32px] bg-ink p-[clamp(20px,4vw,48px)] text-paper">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="font-display text-[clamp(26px,2.8vw,36px)] font-bold tracking-[-0.02em]">Understanding AR aging</h3>
            <span className="font-mono text-[12.5px] text-on-dark-2">Select a bucket</span>
          </div>

          <motion.div
            role="tablist"
            aria-label="AR aging buckets"
            className="grid h-[260px] grid-cols-5 items-end gap-[clamp(6px,1vw,12px)]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          >
            {arBuckets.map((b, i) => (
              <motion.button
                key={b.range}
                type="button"
                role="tab"
                aria-selected={i === sel}
                onClick={() => setSel(i)}
                style={{ height: `${b.height}%`, backgroundColor: b.bg, color: b.fg, originY: 1 }}
                variants={{
                  hidden: { scaleY: 0, opacity: 0 },
                  show: { scaleY: 1, opacity: 1, transition: { duration: 1, ease: EASE } },
                }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex min-w-0 cursor-pointer flex-col justify-end rounded-[18px] px-[clamp(6px,1.3vw,18px)] py-3.5 text-left"
              >
                {i === sel && (
                  <motion.span
                    layoutId="ar-ring"
                    className="absolute -inset-[5px] rounded-[22px] border-2 border-paper"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="font-mono text-[clamp(10px,1.2vw,14px)] font-medium leading-tight">
                  <span className="whitespace-nowrap">{b.range}</span> days
                </span>
              </motion.button>
            ))}
          </motion.div>

          <div className="grid min-h-[120px] grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-center gap-6 border-t border-paper/10 pt-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={cur.range}
                className="contents"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.p
                  className="font-display text-[clamp(40px,5vw,64px)] font-bold leading-none tracking-[-0.04em] text-teal"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {cur.range} days
                </motion.p>
                <motion.p
                  className="text-lg leading-relaxed text-[#D4DCE7]"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.05 }}
                >
                  {cur.text}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="font-mono text-[13px] text-on-dark-2">
            The earlier an unresolved claim is identified, the more options a practice may have to address it.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-10">
        <div className="flex flex-col gap-[18px]">
          <AnimatedHeading
            as="h3"
            className="h-section text-[clamp(28px,3vw,38px)] leading-[1.05]"
            parts={["AR follow-up services."]}
          />
          <Reveal delay={0.1}>
            <p className="text-[17px] leading-relaxed text-muted">Our accounts receivable support may include:</p>
          </Reveal>
          <Reveal delay={0.2}>
            <ButtonLink href="/contact" variant="ink" arrow>
              Talk to Us About Your Aging AR
            </ButtonLink>
          </Reveal>
        </div>
        <motion.ul
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
        >
          {arServices.map((s) => (
            <motion.li
              key={s}
              variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } } }}
              className="border-t border-line-2 py-3.5 text-base"
            >
              {s}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
