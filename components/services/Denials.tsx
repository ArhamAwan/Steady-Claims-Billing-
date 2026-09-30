"use client";

import { motion } from "framer-motion";
import { denialReasons, denialSteps } from "@/lib/content";
import { AnimatedHeading } from "../motion/AnimatedHeading";
import { EASE, Reveal } from "../motion/Reveal";
import { ButtonLink } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";

export function Denials() {
  return (
    <section id="denials" className="container-x section-y flex scroll-mt-20 flex-col gap-14">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-end gap-8">
        <div className="flex flex-col gap-[18px]">
          <Reveal>
            <Eyebrow>03 — Denial management</Eyebrow>
          </Reveal>
          <AnimatedHeading
            className="h-section text-[clamp(36px,4.2vw,58px)]"
            parts={["Turn denied claims into actionable workflows."]}
          />
        </div>
        <Reveal delay={0.15}>
          <p className="text-lg leading-relaxed text-muted">
            Denied claims can create delayed revenue and unnecessary administrative work if they are not reviewed promptly.
            We help practices identify, investigate, and manage them.
          </p>
        </Reveal>
      </div>

      <motion.ol
        className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      >
        {denialSteps.map((s, i) => {
          const last = i === denialSteps.length - 1;
          return (
            <motion.li
              key={s.title}
              variants={{
                hidden: { opacity: 0, y: 30, rotateX: -12 },
                show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: EASE } },
              }}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className={`flex flex-col gap-10 rounded-[20px] p-6 ${
                last ? "bg-ink text-paper" : "border border-line bg-white"
              }`}
            >
              <span className={`font-mono text-xs ${last ? "text-teal" : "text-blue"}`}>STEP {i + 1}</span>
              <div>
                <h3 className="mb-2 font-display text-2xl font-bold leading-tight">{s.title}</h3>
                <p className={`text-[14.5px] leading-normal ${last ? "text-on-dark-2" : "text-muted"}`}>{s.text}</p>
              </div>
            </motion.li>
          );
        })}
      </motion.ol>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-10">
        <div className="flex flex-col gap-[18px]">
          <AnimatedHeading
            as="h3"
            className="h-section text-[clamp(28px,3vw,38px)] leading-[1.05]"
            parts={["Common reasons claims are denied."]}
          />
          <Reveal delay={0.1}>
            <p className="font-display text-[22px] font-medium leading-snug text-blue">
              Not every denial can be overturned, but every denial should be understood before the claim is closed.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ButtonLink href="/contact" variant="ink" arrow className="mt-2">
              Get Help With Denied Claims
            </ButtonLink>
          </Reveal>
        </div>
        <motion.ul
          className="flex flex-wrap gap-2.5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035 } } }}
        >
          {denialReasons.map((r) => (
            <motion.li
              key={r}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 22 } },
              }}
              className="group inline-flex items-center gap-2.5 rounded-[14px] border border-line bg-white px-[18px] py-3.5 text-base transition-colors duration-300 hover:border-coral"
            >
              <span className="h-2 w-2 rounded-full bg-coral transition-transform duration-300 group-hover:scale-150" />
              {r}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
