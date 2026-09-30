"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Icon } from "../ui/Icon";
import { EASE } from "../motion/Reveal";

type Tone = "neutral" | "outline" | "teal" | "coral";
type Stage = { pos: number; label: string; tone: Tone };

const rows: { id: string; meta: string; step: number; start: number; stages: Stage[] }[] = [
  {
    id: "CLM-24081",
    meta: "Family Medicine · Commercial payer",
    step: 1500,
    start: 3,
    stages: [
      { pos: 0, label: "Submitted", tone: "neutral" },
      { pos: 25, label: "Accepted", tone: "neutral" },
      { pos: 50, label: "Payer processing", tone: "neutral" },
      { pos: 75, label: "In follow-up", tone: "outline" },
      { pos: 100, label: "Payment posted", tone: "teal" },
      { pos: 100, label: "Payment posted", tone: "teal" },
    ],
  },
  {
    id: "CLM-24077",
    meta: "Behavioral Health · Denial worked",
    step: 1400,
    start: 0,
    stages: [
      { pos: 0, label: "Submitted", tone: "neutral" },
      { pos: 25, label: "Accepted", tone: "neutral" },
      { pos: 50, label: "Payer processing", tone: "neutral" },
      { pos: 50, label: "Denied", tone: "coral" },
      { pos: 62, label: "Corrected", tone: "coral" },
      { pos: 75, label: "Resubmitted", tone: "outline" },
      { pos: 100, label: "Payment posted", tone: "teal" },
      { pos: 100, label: "Payment posted", tone: "teal" },
    ],
  },
  {
    id: "CLM-24069",
    meta: "Physical Therapy · Aging 31–60 days",
    step: 1700,
    start: 2,
    stages: [
      { pos: 0, label: "Submitted", tone: "neutral" },
      { pos: 25, label: "Accepted", tone: "neutral" },
      { pos: 50, label: "Payer processing", tone: "neutral" },
      { pos: 75, label: "In follow-up", tone: "outline" },
      { pos: 75, label: "In follow-up", tone: "outline" },
      { pos: 100, label: "Payment posted", tone: "teal" },
    ],
  },
];

const chipTone: Record<Tone, string> = {
  neutral: "border border-paper/15 text-on-dark",
  outline: "border border-teal/50 text-teal",
  teal: "border border-teal bg-teal text-ink",
  coral: "border border-coral/40 bg-coral/15 text-coral-2",
};

function ClaimCard({
  row,
  running,
  index,
}: {
  row: (typeof rows)[number];
  running: boolean;
  index: number;
}) {
  const [i, setI] = useState(row.start);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setI((n) => (n + 1) % row.stages.length), row.step);
    return () => clearInterval(t);
  }, [running, row]);
  const s = row.stages[i];
  const coral = s.tone === "coral";
  const offset = index === 1 ? "hero-lg:-ml-[30px] hero-lg:mr-[30px]" : "";

  return (
    <motion.div
      className={`${offset}`}
      animate={running ? { y: [0, -10, 0] } : undefined}
      transition={{ duration: 6 + index * 0.5, repeat: Infinity, ease: "easeInOut", delay: index * 1.3 }}
    >
      <div className="flex flex-col gap-2.5 rounded-[18px] border border-paper/12 bg-ink-2/90 px-3.5 pb-3.5 pt-3 shadow-[0_24px_50px_-24px_rgba(0,0,0,.7)] backdrop-blur-md">
        <div className="flex items-center justify-between gap-2.5">
          <span className="font-mono text-[12.5px] text-paper">{row.id}</span>
          <div className="relative h-6 shrink-0">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={s.label}
                className={`flex h-6 items-center whitespace-nowrap rounded-full px-2.5 font-mono text-[10.5px] ${chipTone[s.tone]}`}
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {s.label}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
        <span className="-mt-1 truncate text-[12.5px] text-on-dark-3">{row.meta}</span>
        <div className="relative mx-1.5 h-3">
          <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded bg-paper/15" />
          <motion.div
            className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 rounded"
            animate={{ width: `${s.pos}%`, backgroundColor: coral ? "#FF8A66" : "#37D3C1" }}
            transition={{ duration: 0.9, ease: EASE }}
          />
          {[0, 25, 50, 75, 100].map((p) => (
            <span
              key={p}
              className="absolute top-1/2 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper/30"
              style={{ left: `${p}%` }}
            />
          ))}
          <motion.div
            className="absolute top-1/2 -ml-1.5 -mt-1.5 h-3 w-3 rounded-full"
            animate={{
              left: `${s.pos}%`,
              backgroundColor: coral ? "#FF8A66" : "#37D3C1",
              boxShadow: coral ? "0 0 0 5px rgba(255,138,102,.22)" : "0 0 0 5px rgba(55,211,193,.2)",
            }}
            transition={{ duration: 0.9, ease: EASE }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/** Compact, floating "claims in motion" cards shown beside the 3D doctor. Purely illustrative. */
export function ClaimsBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const running = inView && !reduce;

  return (
    <div ref={ref} className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-2.5 px-1 font-mono text-[11px] tracking-[0.14em] text-on-dark">
        <span className="flex items-center gap-2">
          <span className="relative flex h-[7px] w-[7px]">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
            <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-teal" />
          </span>
          CLAIMS IN MOTION
        </span>
        <span className="tracking-[0.04em] text-on-dark-3/80">Illustrative</span>
      </div>
      {rows.map((r, i) => (
        <ClaimCard key={r.id} row={r} running={running} index={i} />
      ))}
      <div className="flex items-center gap-2.5 px-1 pt-0.5 text-[13px] leading-snug text-on-dark">
        <Icon name="check" size={18} className="shrink-0 text-teal" />
        Every unresolved claim gets a clear status and a next action.
      </div>
    </div>
  );
}
