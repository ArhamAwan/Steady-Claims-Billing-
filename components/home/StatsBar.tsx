"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { homeStats, type Stat } from "@/lib/content";
import { EASE } from "../motion/Reveal";

function CountUp({ to, decimals = 0, start, delay }: { to: number; decimals?: number; start: boolean; delay: number }) {
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!start || reduce) return;
    const controls = animate(0, to, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [start, to, delay, reduce]);
  return <>{val.toFixed(decimals)}</>;
}

function StatItem({ s, i, start }: { s: Stat; i: number; start: boolean }) {
  return (
    <motion.li
      className="group relative flex flex-col gap-3 px-1 py-7 hero-lg:px-8 hero-lg:py-2"
      initial={{ opacity: 0, y: 24 }}
      animate={start ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, ease: EASE, delay: i * 0.12 }}
    >
      {/* divider between items */}
      {i > 0 && (
        <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-paper/10 hero-lg:h-full hero-lg:w-px" />
      )}
      <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-on-dark-3">{s.title}</p>
      <p className="flex flex-wrap items-baseline gap-x-2 font-display font-bold leading-none tracking-[-0.04em] text-teal">
        {s.prefix && <span className="font-sans text-sm font-medium tracking-normal text-on-dark-2">{s.prefix}</span>}
        <span className="whitespace-nowrap text-[clamp(44px,4.4vw,64px)]">
          {s.values.map((v, k) => (
            <span key={k}>
              {k > 0 && "–"}
              <CountUp to={v} decimals={s.decimals?.[k] ?? 0} start={start} delay={i * 0.12 + 0.1} />
            </span>
          ))}
          <span className="ml-1 text-[0.5em] tracking-[-0.02em]">{s.suffix}</span>
        </span>
      </p>
      <p className="max-w-[260px] text-[15px] leading-relaxed text-on-dark">{s.text}</p>
    </motion.li>
  );
}

/** Proof bar right under the hero: pricing, speed, acceptance and follow-up, counting up on view. */
export function StatsBar() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section aria-label="Steady Claims Billing at a glance" className="grid-bg border-t border-paper/10 bg-ink text-paper">
      <div className="container-x py-[clamp(36px,5vw,64px)]">
        <ul ref={ref} className="grid grid-cols-1 sm:grid-cols-2 hero-lg:grid-cols-4">
          {homeStats.map((s, i) => (
            <StatItem key={s.title} s={s} i={i} start={inView} />
          ))}
        </ul>
      </div>
    </section>
  );
}
