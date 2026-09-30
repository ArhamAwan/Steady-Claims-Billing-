"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import { faqCategories, faqs, type FaqCategory } from "@/lib/content";
import { EASE } from "../motion/Reveal";

export function FaqList() {
  const [cat, setCat] = useState<FaqCategory | "all">("all");
  const [open, setOpen] = useState<string | null>(faqs[0].q);
  const list = faqs.filter((f) => cat === "all" || f.c === cat);

  return (
    <section className="mx-auto flex w-full max-w-[1100px] flex-col gap-9 px-[clamp(20px,4vw,48px)] py-[clamp(56px,8vw,110px)]">
      <div role="group" aria-label="Filter questions" className="flex flex-wrap gap-2.5">
        {faqCategories.map((c) => {
          const on = c.id === cat;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={on}
              onClick={() => {
                setCat(c.id);
                setOpen(null);
              }}
              className={`relative min-h-11 rounded-full border-[1.5px] border-ink px-[18px] text-[14.5px] font-medium transition-colors duration-300 ${
                on ? "text-teal" : "text-ink hover:bg-[#E3EAF2]"
              }`}
            >
              {on && (
                <motion.span
                  layoutId="faq-cat"
                  className="absolute inset-[-1.5px] rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">{c.label}</span>
            </button>
          );
        })}
      </div>

      <LayoutGroup>
        <motion.ul layout className="border-b border-line-2">
          <AnimatePresence initial={false} mode="popLayout">
            {list.map((f, k) => {
              const isOpen = open === f.q;
              const id = `faq-${faqs.indexOf(f)}`;
              return (
                <motion.li
                  key={f.q}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="border-t border-line-2"
                >
                  <h2>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={id}
                      onClick={() => setOpen(isOpen ? null : f.q)}
                      className="group flex w-full items-center justify-between gap-5 px-1 py-[26px] text-left font-display text-[clamp(19px,1.8vw,24px)] font-semibold tracking-[-0.01em]"
                    >
                      <span className="flex min-w-0 items-baseline gap-[18px]">
                        <span className="font-mono text-xs font-normal text-blue">{String(k + 1).padStart(2, "0")}</span>
                        <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">{f.q}</span>
                      </span>
                      <motion.span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px]"
                        animate={{
                          rotate: isOpen ? 45 : 0,
                          backgroundColor: isOpen ? "#37D3C1" : "rgba(0,0,0,0)",
                          borderColor: isOpen ? "#37D3C1" : "#0B1F3A",
                        }}
                        transition={{ duration: 0.4, ease: EASE }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </motion.span>
                    </button>
                  </h2>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={id}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          className="flex flex-col gap-3 pb-7 pl-1 pr-4 sm:pl-11 sm:pr-16"
                          initial={{ y: -8 }}
                          animate={{ y: 0 }}
                          transition={{ duration: 0.5, ease: EASE }}
                        >
                          {f.a.map((p) => (
                            <p key={p} className="text-[17px] leading-[1.65] text-[#384658]">
                              {p}
                            </p>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>
    </section>
  );
}
