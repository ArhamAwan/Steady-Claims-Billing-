"use client";

import { motion } from "framer-motion";
import { verificationItems } from "@/lib/content";
import { AnimatedHeading } from "../motion/AnimatedHeading";
import { EASE, Reveal } from "../motion/Reveal";
import { ButtonLink } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { Icon } from "../ui/Icon";

export function Verification() {
  return (
    <section id="verification" className="scroll-mt-20 bg-teal text-ink">
      <div className="container-x section-y grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-[clamp(40px,6vw,96px)]">
        <div className="flex flex-col gap-[22px]">
          <Reveal>
            <Eyebrow tone="ink">04 — Insurance verification</Eyebrow>
          </Reveal>
          <AnimatedHeading
            className="h-section text-[clamp(36px,4.2vw,58px)]"
            parts={["Verify coverage before it becomes a billing problem."]}
          />
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-[#1B2A3F]">
              Insurance verification helps practices identify important coverage information before services are
              provided. Depending on payer availability, verification may include:
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex items-start gap-4 rounded-[20px] bg-ink p-6 text-paper">
              <Icon name="info" size={24} className="mt-0.5 shrink-0 text-teal" />
              <p className="text-[14.5px] leading-relaxed text-[#D4DCE7]">
                <strong className="text-paper">Insurance verification does not guarantee payment.</strong> Final
                reimbursement depends on payer policies, patient eligibility at the time of service, documentation, coding,
                medical necessity, authorization requirements, contract terms, and other applicable factors.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <ButtonLink href="/contact" variant="ink" arrow>
              Ask About Insurance Verification
            </ButtonLink>
          </Reveal>
        </div>

        <motion.ul
          className="grid content-start gap-2.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          {verificationItems.map((item) => (
            <motion.li
              key={item}
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
              className="flex items-center gap-3 rounded-2xl border-[1.5px] border-ink bg-ink/5 px-5 py-[18px] text-base font-medium transition-colors duration-300 hover:bg-ink hover:text-teal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
                <motion.path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.5, delay: 0.2 } } }}
                />
              </svg>
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
