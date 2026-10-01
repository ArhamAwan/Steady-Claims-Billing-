"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Logo } from "@/components/layout/Logo";
import { MetaStepForm } from "./MetaStepForm";
import { EASE } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

const stats = [
  { value: "97%", label: "Clean claim rate" },
  { value: "18 days", label: "Avg. days to payment" },
  { value: "$0", label: "Setup fees" },
];

export function MetaLeadsContent() {
  const formRef = useRef<HTMLDivElement>(null);

  // On mobile: after hero animates in (~900 ms), gently scroll the form card
  // into the dead centre of the screen so users see it immediately.
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (!isMobile) return;

    const timer = setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 950);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid-bg relative flex min-h-screen flex-col bg-ink">
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(55,211,193,0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ── Top bar ── */}
      <header className="relative z-10 container-x flex items-center justify-between py-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Logo />
        </motion.div>

        <motion.a
          href={site.phoneHref}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="hidden sm:flex items-center gap-2 rounded-full border border-paper/20 bg-paper/10 px-4 py-2 text-[14px] font-semibold text-paper backdrop-blur-sm transition-colors hover:bg-paper/20"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
          {site.phone}
        </motion.a>
      </header>

      {/* ── Main: hero + form ── */}
      <div className="relative z-10 container-x flex flex-1 flex-wrap items-center gap-10 py-8 lg:flex-nowrap lg:gap-16 lg:py-12">

        {/* Left: Hero copy */}
        <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            <p className="mb-4 font-mono text-[11px] tracking-[0.18em] text-teal">
              FREE BILLING AUDIT · NO OBLIGATION
            </p>
            <h1
              className="font-display font-bold tracking-[-0.035em] leading-[0.93] text-paper"
              style={{ fontSize: "clamp(36px, 5.2vw, 72px)" }}
            >
              Stop losing revenue to{" "}
              <span className="text-teal">denied claims.</span>
            </h1>
            <p className="mt-5 text-[clamp(15px,1.3vw,17px)] leading-relaxed text-on-dark">
              Most practices lose 5–15% of annual revenue to billing errors and denial
              backlogs. Fill in the form and our team will show you exactly where the
              leaks are — for free.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            className="flex flex-wrap gap-6 border-t border-paper/10 pt-6"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <span className="font-display text-[clamp(26px,2.8vw,36px)] font-bold tracking-[-0.03em] text-teal">
                  {s.value}
                </span>
                <span className="text-[12px] text-on-dark-2">{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Trust bullets */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
            className="flex flex-col gap-3"
          >
            {[
              "HIPAA-compliant processes",
              "97% clean claim rate on first submission",
              "No setup costs or long-term contracts",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/20">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6l3 3 5-5" stroke="#37D3C1" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-[13.5px] text-on-dark">{item}</span>
              </div>
            ))}
          </motion.div>

          {/* Mobile scroll nudge — animated arrow pointing down to form */}
          <motion.button
            type="button"
            aria-label="Scroll to form"
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 1.1 }}
            className="flex lg:hidden w-fit items-center gap-2 text-teal/70 transition-colors hover:text-teal"
          >
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1"
            >
              <span className="font-mono text-[11px] tracking-[0.14em]">FILL THE FORM BELOW</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          </motion.button>
        </div>

        {/* Right: form card — this is the scroll target */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="min-w-0 w-full flex-[1_1_420px] max-w-[520px] self-start rounded-[32px] border border-line bg-white p-[clamp(22px,3vw,40px)] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] lg:self-center"
        >
          <MetaStepForm formRef={formRef} />
        </motion.div>

      </div>

      {/* ── Bottom bar ── */}
      <footer className="relative z-10 border-t border-paper/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-4">
          <p className="text-[12px] leading-relaxed text-on-dark-3 max-w-[680px]">
            {site.disclaimer}
          </p>
          <p className="font-mono text-[11px] text-on-dark-3">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </footer>
    </div>
  );
}
