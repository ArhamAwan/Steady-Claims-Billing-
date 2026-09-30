"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { specialties } from "@/lib/content";
import { EASE, Reveal } from "../motion/Reveal";
import { ButtonLink } from "../ui/Button";
import { Icon } from "../ui/Icon";

export function SpecialtyExplorer() {
  const [sel, setSel] = useState(0);
  const cur = specialties[sel];

  return (
    <section className="container-x section-y grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-[clamp(32px,5vw,80px)]">
      <motion.ul
        className="flex flex-col border-b border-line-2"
        role="tablist"
        aria-label="Specialties"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
      >
        {specialties.map((s, i) => {
          const on = i === sel;
          return (
            <motion.li
              key={s.name}
              variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } } }}
            >
              <button
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="specialty-panel"
                onClick={() => setSel(i)}
                className={`group relative flex min-h-[60px] w-full items-center justify-between gap-4 border-t border-line-2 px-1 text-left font-display text-[clamp(20px,2vw,26px)] font-semibold tracking-[-0.01em] transition-colors duration-300 ${
                  on ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="spec-bar"
                    className="absolute -left-3 top-1/2 h-8 w-1 -translate-y-1/2 rounded-full bg-teal"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span
                  className={`flex items-center gap-4 transition-transform duration-500 ease-out-expo ${
                    on ? "translate-x-3" : "group-hover:translate-x-3"
                  }`}
                >
                  <span className="font-mono text-xs font-normal text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  {s.name}
                </span>
                <Icon
                  name="arrow"
                  size={22}
                  className={`transition-[opacity,transform] duration-500 ease-out-expo ${
                    on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-50"
                  }`}
                />
              </button>
            </motion.li>
          );
        })}
      </motion.ul>

      <div className="flex flex-col gap-4 lg:sticky lg:top-28">
        <Reveal delay={0.1}>
          <div
            id="specialty-panel"
            role="tabpanel"
            className="grid-bg flex min-h-[480px] flex-col justify-between gap-10 overflow-hidden rounded-[32px] bg-ink p-[clamp(28px,4vw,52px)] text-paper"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[12.5px] tracking-[0.16em] text-teal">
                SPECIALTY{" "}
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={sel}
                    className="inline-block"
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    {String(sel + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>{" "}
                / {specialties.length}
              </span>
              <svg width="120" height="30" viewBox="0 0 120 30" aria-hidden="true">
                <motion.path
                  key={sel}
                  d="M0 15 H40 L48 4 L58 26 L66 10 L72 15 H120"
                  fill="none"
                  stroke="#37D3C1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: EASE }}
                />
              </svg>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={cur.name}
                className="flex flex-col gap-[22px]"
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.07 } },
                  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
                }}
              >
                <motion.h2
                  className="font-display text-[clamp(40px,4.8vw,68px)] font-bold leading-[0.95] tracking-[-0.035em]"
                  variants={{
                    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
                    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
                  }}
                >
                  {cur.name}
                </motion.h2>
                <motion.p
                  className="text-[19px] leading-relaxed text-[#D4DCE7]"
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                >
                  {cur.text}
                </motion.p>
                <motion.div className="flex flex-wrap gap-2" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}>
                  {cur.tags.map((t) => (
                    <motion.span
                      key={t}
                      variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } } }}
                      className="rounded-full border border-teal/45 px-3 py-2 font-mono text-[12.5px] text-teal"
                    >
                      {t}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <ButtonLink href="/contact" arrow className="self-start">
              Discuss your billing needs
            </ButtonLink>
          </div>
        </Reveal>
        <p className="px-2 text-sm leading-relaxed text-muted">
          Medical billing requirements differ by specialty, payer, location, and practice structure.
        </p>
      </div>
    </section>
  );
}
