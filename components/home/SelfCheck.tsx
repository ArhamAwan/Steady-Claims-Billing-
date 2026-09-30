"use client";

import { AnimatePresence, motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { selfCheckQuestions } from "@/lib/content";
import { AnimatedHeading } from "../motion/AnimatedHeading";
import { EASE, Reveal } from "../motion/Reveal";
import { ButtonLink } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 140, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v).toString());
  useEffect(() => spring.set(value), [spring, value]);
  return <motion.span>{display}</motion.span>;
}

export function SelfCheck() {
  const [checked, setChecked] = useState<boolean[]>(() => selfCheckQuestions.map(() => false));
  const count = checked.filter(Boolean).length;
  const total = selfCheckQuestions.length;

  const message =
    count === 0
      ? "Tick anything that sounds familiar — your answers stay on this page."
      : count < 3
        ? "Even a few gaps can slow reimbursement down. A quick review can show where support may help."
        : "These challenges add up. It may be time for a closer look at your billing process.";

  return (
    <section className="container-x section-y grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-start gap-[clamp(40px,5vw,72px)]">
      <div className="flex flex-col gap-6 lg:sticky lg:top-28">
        <Reveal>
          <Eyebrow>07 — Quick self-check</Eyebrow>
        </Reveal>
        <AnimatedHeading className="h-section" parts={["Are billing problems slowing down your practice?"]} />
        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed text-muted">
            Tick the challenges that sound familiar. If they do, we can review your current billing process and discuss
            where additional support may help.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-col gap-[18px] rounded-3xl bg-ink p-[30px] text-paper" aria-live="polite">
            <div className="flex items-baseline gap-2.5">
              <span className="font-display text-[64px] font-bold leading-none tracking-[-0.04em] text-teal">
                <AnimatedNumber value={count} />
              </span>
              <span className="font-mono text-sm text-on-dark-2">of {total} sound familiar</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-paper/10">
              <motion.div
                className="h-full rounded-full bg-teal"
                initial={false}
                animate={{ width: `${(count / total) * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
            <div className="relative min-h-[54px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={message}
                  className="text-[17px] leading-normal text-[#D4DCE7]"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  {message}
                </motion.p>
              </AnimatePresence>
            </div>
            <ButtonLink href="/contact" arrow className="self-start">
              Request a Billing Consultation
            </ButtonLink>
          </div>
        </Reveal>
      </div>

      <motion.ul
        className="flex flex-col gap-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      >
        {selfCheckQuestions.map((q, i) => {
          const on = checked[i];
          return (
            <motion.li
              key={q}
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
            >
              <motion.button
                type="button"
                aria-pressed={on}
                onClick={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}
                whileTap={{ scale: 0.98 }}
                animate={{
                  backgroundColor: on ? "#0B1F3A" : "#FFFFFF",
                  color: on ? "#F2F6FA" : "#0B1F3A",
                  borderColor: on ? "#0B1F3A" : "#D5DEE8",
                }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex w-full cursor-pointer items-start gap-[18px] rounded-[18px] border-[1.5px] px-6 py-[22px] text-left text-[17px] leading-snug hover:!border-ink"
              >
                <motion.span
                  className="mt-px flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-lg border-[1.5px]"
                  animate={{
                    backgroundColor: on ? "#37D3C1" : "rgba(0,0,0,0)",
                    borderColor: on ? "#37D3C1" : "#0B1F3A",
                    scale: on ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 0.35 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <motion.path
                      d="M20 6L9 17l-5-5"
                      stroke="#0B1F3A"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={false}
                      animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                  </svg>
                </motion.span>
                <span className="flex flex-col gap-1">
                  <span className={`font-mono text-xs ${on ? "text-on-dark-3" : "text-subtle"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{q}</span>
                </span>
              </motion.button>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
