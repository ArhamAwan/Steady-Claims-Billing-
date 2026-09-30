"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { rcmSteps } from "@/lib/content";
import { AnimatedHeading } from "../motion/AnimatedHeading";
import { EASE, Reveal } from "../motion/Reveal";
import { ButtonLink } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";

/** Vertical timeline whose rail fills as you scroll, lighting each stage on the way. */
export function RcmTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });
  const [reached, setReached] = useState(-1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setReached(Math.floor(v * (rcmSteps.length - 1) + 0.15));
  });

  return (
    <section id="rcm" className="grid-bg scroll-mt-20 bg-ink text-paper">
      <div className="container-x section-y grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-[clamp(40px,6vw,96px)]">
        <div className="flex flex-col gap-[22px] lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow tone="teal">02 — Revenue cycle management</Eyebrow>
          </Reveal>
          <AnimatedHeading
            className="h-section text-[clamp(36px,4.2vw,58px)]"
            parts={["Revenue cycle management that connects the entire billing process."]}
          />
          <Reveal delay={0.1}>
            <p className="text-[17px] leading-relaxed text-on-dark-2">
              Revenue cycle management covers the financial process surrounding patient care from initial registration
              through final account resolution. A strong revenue cycle depends on multiple steps working together.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-2.5 flex flex-col gap-2.5 rounded-[22px] border border-teal/40 p-[26px]">
              <p className="font-display text-[22px] font-semibold text-teal">RCM is about consistency.</p>
              <p className="text-[15.5px] leading-relaxed text-[#D4DCE7]">
                Submitting claims is only one part of the process. Revenue cycle management requires visibility into what
                happens after a claim is submitted — so claims that need attention are identified and worked
                appropriately.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <ButtonLink href="/contact" arrow>
              Discuss Your Revenue Cycle
            </ButtonLink>
          </Reveal>
        </div>

        <ol ref={listRef} className="relative flex flex-col">
          <span aria-hidden="true" className="absolute bottom-6 left-[23px] top-6 w-px bg-paper/15" />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-6 left-[23px] top-6 w-0.5 origin-top bg-teal"
            style={{ scaleY: fill }}
          />
          {rcmSteps.map((s, i) => {
            const on = i <= reached;
            const alert = "alert" in s && s.alert;
            const color = alert ? "#FF8A66" : "#37D3C1";
            return (
              <li key={s.title} className="relative grid grid-cols-[48px_1fr] gap-5 pb-[30px] last:pb-0">
                <motion.span
                  className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] font-mono text-[13px]"
                  animate={{
                    backgroundColor: on ? color : "#0B1F3A",
                    borderColor: color,
                    color: on ? "#0B1F3A" : color,
                    scale: on ? 1 : 0.92,
                  }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>
                <motion.div
                  className="pt-2"
                  animate={{ opacity: on ? 1 : 0.45, y: on ? 0 : 4 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <h3 className="mb-1.5 font-display text-[21px] font-semibold">{s.title}</h3>
                  <p className="text-[15px] leading-relaxed text-on-dark-2">{s.text}</p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
