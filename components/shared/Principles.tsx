"use client";

import { motion } from "framer-motion";
import { principles } from "@/lib/content";
import { AnimatedHeading } from "../motion/AnimatedHeading";
import { EASE, Reveal } from "../motion/Reveal";

const tones = {
  ink: { card: "bg-ink text-paper", num: "text-teal", body: "text-on-dark-2" },
  teal: { card: "bg-teal text-ink", num: "text-ink", body: "text-[#1B2A3F]" },
  white: { card: "border border-line bg-white text-ink", num: "text-blue", body: "text-muted" },
  blue: { card: "bg-blue text-paper", num: "text-blue-tint", body: "text-blue-tint" },
};

export function Principles() {
  return (
    <section className="container-x flex flex-col gap-10 pb-[clamp(72px,10vw,130px)]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <AnimatedHeading className="h-section text-[clamp(34px,4vw,54px)]" parts={["Our approach."]} />
        <Reveal delay={0.1}>
          <p className="font-mono text-[13px] text-muted">Four principles behind every claim we touch.</p>
        </Reveal>
      </div>
      <motion.div
        className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      >
        {principles.map((p, i) => {
          const t = tones[p.tone];
          return (
            <motion.article
              key={p.title}
              variants={{
                hidden: { opacity: 0, y: 50, rotate: 1.5 },
                show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.9, ease: EASE } },
              }}
              whileHover={{ y: -8, rotate: -0.6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className={`flex min-h-[320px] flex-col gap-14 rounded-[28px] p-8 ${t.card}`}
            >
              <span className={`font-mono text-xs ${t.num}`}>{String(i + 1).padStart(2, "0")}</span>
              <div className="flex flex-col gap-3.5">
                <h3 className="font-display text-[clamp(22px,1.8vw,26px)] font-bold leading-[1.1] tracking-[-0.015em] [overflow-wrap:break-word]">
                  {p.title}
                </h3>
                <p className={`text-[15.5px] leading-relaxed ${t.body}`}>{p.text}</p>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
