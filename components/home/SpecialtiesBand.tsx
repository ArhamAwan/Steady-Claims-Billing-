"use client";

import { motion } from "framer-motion";
import { specialtyPills } from "@/lib/content";
import { site } from "@/lib/site";
import { AnimatedHeading } from "../motion/AnimatedHeading";
import { Reveal } from "../motion/Reveal";
import { ButtonLink } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";

export function SpecialtiesBand() {
  return (
    <section className="bg-teal text-ink">
      <div className="container-x section-y flex flex-col gap-12">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-end gap-8">
          <div className="flex flex-col gap-[18px]">
            <Reveal>
              <Eyebrow tone="ink">06 — Who we support</Eyebrow>
            </Reveal>
            <AnimatedHeading className="h-section" parts={["Billing support for healthcare practices."]} />
          </div>
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed text-[#1B2A3F]">
              We work with healthcare providers who need reliable support managing their billing operations — from
              independent physicians to multi-provider practices.
            </p>
          </Reveal>
        </div>

        <motion.ul
          className="flex flex-wrap gap-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
        >
          {specialtyPills.map((p) => (
            <motion.li
              key={p}
              variants={{
                hidden: { opacity: 0, scale: 0.85, y: 14 },
                show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
              }}
              whileHover={{ y: -3 }}
              className="inline-flex min-h-[52px] cursor-default items-center rounded-full border-[1.5px] border-ink px-6 text-[clamp(17px,1.6vw,22px)] font-medium transition-colors duration-300 hover:bg-ink hover:text-teal"
            >
              {p}
            </motion.li>
          ))}
        </motion.ul>

        <Reveal className="flex flex-wrap items-center justify-between gap-5 border-t-[1.5px] border-ink pt-7">
          <p className="font-display text-[clamp(22px,2.4vw,30px)] font-semibold tracking-[-0.01em]">
            Don&apos;t see your specialty listed?
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={site.phoneHref} variant="ink">
              Call {site.phone}
            </ButtonLink>
            <ButtonLink href="/specialties" variant="ghost-light" arrow>
              View all specialties
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

