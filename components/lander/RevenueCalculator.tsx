"use client";

import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useId, useState, type ChangeEvent } from "react";
import { DEFAULT_INPUTS, headline, money, type CalcInputs, type CalcResult } from "@/lib/calculator";
import { EASE } from "../motion/Reveal";
import { Icon } from "../ui/Icon";

/** A dollar figure that counts smoothly to its new value. */
export function Money({ value, className }: { value: number; className?: string }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => money(v));
  useEffect(() => {
    if (reduce) {
      mv.set(value);
      return;
    }
    const c = animate(mv, value, { duration: 0.6, ease: EASE });
    return () => c.stop();
  }, [value, mv, reduce]);
  return <motion.span className={className}>{text}</motion.span>;
}

type Field = {
  key: keyof CalcInputs;
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  scale: [string, string];
};

const FIELDS: Field[] = [
  {
    key: "collections",
    label: "Monthly collections",
    hint: "What insurance and patients pay you in a typical month",
    min: 10000,
    max: 1000000,
    step: 5000,
    prefix: "$",
    scale: ["$10k", "$1M+"],
  },
  {
    key: "claims",
    label: "Claims submitted per month",
    hint: "All payers, all providers",
    min: 50,
    max: 10000,
    step: 50,
    scale: ["50", "10,000+"],
  },
  {
    key: "denialRate",
    label: "Current denial rate",
    hint: "Share of claims denied or rejected the first time. Not sure? 10% is a fair guess.",
    min: 1,
    max: 30,
    step: 0.5,
    suffix: "%",
    scale: ["1%", "30%"],
  },
  {
    key: "billingCost",
    label: "What billing costs you now, per month",
    hint: "Billing staff, software, or your current billing company",
    min: 0,
    max: 60000,
    step: 500,
    prefix: "$",
    scale: ["$0", "$60k+"],
  },
];

function Control({ f, value, onChange }: { f: Field; value: number; onChange: (n: number) => void }) {
  const id = useId();
  // Keep what the visitor is typing (including an empty box) separate from the number used in the maths.
  const [draft, setDraft] = useState<string | null>(null);
  const pct = Math.max(0, Math.min(100, ((value - f.min) / (f.max - f.min)) * 100));
  const max = f.key === "denialRate" ? 60 : undefined;

  const onType = (e: ChangeEvent<HTMLInputElement>) => {
    setDraft(e.target.value);
    const n = parseFloat(e.target.value);
    if (!Number.isNaN(n) && n >= 0) onChange(max ? Math.min(n, max) : n);
  };

  return (
    <div className="flex flex-col gap-3 border-t border-[#E3EAF2] py-5 first:border-t-0 first:pt-1">
      <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap">
        <label htmlFor={id} className="min-w-0 flex-1 text-[15px] font-semibold leading-snug text-ink">
          {f.label}
          <span className="mt-0.5 block text-[13px] font-normal text-subtle">{f.hint}</span>
        </label>
        <div className="flex h-[46px] flex-none items-center gap-0.5 rounded-xl border-[1.5px] border-line-2 bg-[#F7FAFC] px-3.5 font-display text-[21px] font-bold text-ink transition-[border-color,box-shadow] duration-200 focus-within:border-ink focus-within:shadow-[0_0_0_4px_rgba(55,211,193,.4)]">
          {f.prefix && <span className="font-semibold text-subtle">{f.prefix}</span>}
          <input
            id={id}
            type="number"
            inputMode={f.key === "denialRate" ? "decimal" : "numeric"}
            min={0}
            max={max}
            step={f.step}
            value={draft ?? String(value)}
            onChange={onType}
            onBlur={() => setDraft(null)}
            className={`[appearance:textfield] bg-transparent text-right outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
              f.suffix ? "w-16" : "w-[118px]"
            }`}
          />
          {f.suffix && <span className="font-semibold text-subtle">{f.suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        min={f.min}
        max={f.max}
        step={f.step}
        value={Math.min(Math.max(value, f.min), f.max)}
        onChange={(e) => {
          setDraft(null);
          onChange(parseFloat(e.target.value));
        }}
        aria-label={`${f.label} slider`}
        aria-valuetext={`${f.prefix ?? ""}${value.toLocaleString("en-US")}${f.suffix ?? ""}`}
        className="calc-range"
        style={{ ["--p" as string]: `${pct}%` }}
      />
      <div className="flex justify-between text-xs text-subtle">
        <span>{f.scale[0]}</span>
        <span>{f.scale[1]}</span>
      </div>
    </div>
  );
}

function Bar({ label, paid, accent }: { label: string; paid: number; accent: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-[13.5px] text-[#D4DCE7]">
        <span>{label}</span>
        <span className="font-mono">{Number(paid.toFixed(1))}%</span>
      </div>
      <div className="flex h-3.5 overflow-hidden rounded-full bg-paper/10">
        <motion.i
          className="block h-full"
          style={{ background: accent }}
          animate={{ width: `${paid}%` }}
          transition={{ duration: 0.6, ease: EASE }}
        />
        <motion.i
          className="block h-full bg-coral"
          animate={{ width: `${100 - paid}%` }}
          transition={{ duration: 0.6, ease: EASE }}
        />
      </div>
    </div>
  );
}

function Row({ k, sub, children }: { k: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-paper/12 py-3.5">
      <span className="text-[14.5px] leading-snug text-on-dark">
        {k}
        <span className="mt-0.5 block text-[12.5px] text-on-dark-3">{sub}</span>
      </span>
      <span className="whitespace-nowrap text-right font-display text-xl font-bold text-paper">{children}</span>
    </div>
  );
}

export function RevenueCalculator({
  inputs,
  result,
  onChange,
  onCta,
  revealed,
  onReveal,
}: {
  inputs: CalcInputs;
  result: CalcResult;
  onChange: (next: CalcInputs) => void;
  onCta: () => void;
  /** The report stays hidden until the visitor asks to review it. */
  revealed: boolean;
  onReveal: () => void;
}) {
  const reduce = useReducedMotion();
  const h = headline(result);
  const per = <span className="text-[13px] font-medium text-on-dark-3"> /mo</span>;

  let diff: React.ReactNode;
  let diffClass = "text-teal";
  if (result.savingLow >= 0) {
    diff = (
      <>
        <Money value={result.savingLow} />–<Money value={result.savingHigh} /> less /mo
      </>
    );
  } else if (result.savingHigh <= 0) {
    diffClass = "text-coral-2";
    diff = (
      <>
        <Money value={-result.savingHigh} />–<Money value={-result.savingLow} /> more /mo
      </>
    );
  } else {
    diff = (
      <>
        Up to <Money value={result.savingHigh} /> less /mo
      </>
    );
  }

  return (
    <div className="grid overflow-hidden rounded-[32px] border border-[#DDE5EE] bg-white shadow-[0_50px_100px_-40px_rgba(11,31,58,.45)] lg:grid-cols-2">
      {/* inputs */}
      <div className="flex flex-col gap-1.5 p-[clamp(22px,3.4vw,44px)]">
        <div className="mb-2.5 flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[12.5px] tracking-[0.16em] text-blue">01 — YOUR PRACTICE</span>
          <button
            type="button"
            onClick={() => onChange(DEFAULT_INPUTS)}
            className="min-h-11 text-[13.5px] text-blue underline-offset-4 hover:underline"
          >
            Reset to example
          </button>
        </div>
        {FIELDS.map((f) => (
          <Control key={f.key} f={f} value={inputs[f.key]} onChange={(n) => onChange({ ...inputs, [f.key]: n })} />
        ))}
        {/* Phones/tablets: the button sits right under the last slider, so there's nothing to scroll past. */}
        {!revealed && (
          <div className="mt-2 flex flex-col gap-2 lg:hidden">
            <button
              type="button"
              onClick={onReveal}
              className="group inline-flex min-h-[60px] items-center justify-center gap-2.5 rounded-full bg-ink px-7 text-[16.5px] font-semibold text-paper transition-[background-color,transform] duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-ink-hover"
            >
              Review my analysis
              <Icon name="arrow" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <p className="text-center text-[12.5px] text-subtle">Free, instant, and no email needed to see it.</p>
          </div>
        )}
      </div>

      {/* results: a teaser until the visitor asks to review the analysis */}
      <div
        id="analysis"
        className={`grid-bg relative scroll-mt-5 bg-ink text-paper ${revealed ? "" : "hidden lg:block"}`}
        aria-live="polite"
      >
        <AnimatePresence mode="wait" initial={false}>
          {!revealed ? (
            <motion.div
              key="teaser"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: EASE }}
              className="flex h-full flex-col justify-center gap-7 p-[clamp(22px,3.4vw,44px)]"
            >
              <span className="font-mono text-[12.5px] tracking-[0.16em] text-teal">02 — YOUR ANALYSIS</span>
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-[clamp(28px,2.8vw,38px)] font-bold leading-[1.05] tracking-[-0.025em]">
                  Your billing analysis is ready.
                </h3>
                <p className="text-[15.5px] leading-relaxed text-on-dark">
                  Set your numbers, then review your analysis. You&apos;ll see:
                </p>
              </div>
              <ul className="flex flex-col gap-3">
                {[
                  "What's stuck in denials each month",
                  "Revenue you could get paid the first time",
                  "Our fee at 2.50%–5.00% of collections",
                  "How that compares with what you pay now",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] text-[#D4DCE7]">
                    <span className="mt-px flex h-6 w-6 flex-none items-center justify-center rounded-full bg-teal/15 text-teal">
                      <Icon name="check" size={14} strokeWidth={2.6} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              {/* blurred preview of the headline number */}
              <div
                aria-hidden="true"
                className="select-none rounded-[18px] border border-paper/10 bg-paper/5 px-5 py-4"
              >
                <span className="block text-[13px] text-on-dark-3">Estimated yearly upside</span>
                <span className="block font-display text-[clamp(28px,2.8vw,40px)] font-bold tracking-[-0.03em] text-teal blur-[9px]">
                  {money(Math.max(0, result.upsideLow))} – {money(Math.max(0, result.upsideHigh))}
                </span>
              </div>
              <button
                type="button"
                onClick={onReveal}
                className="group inline-flex min-h-[60px] items-center justify-center gap-2.5 rounded-full bg-teal px-7 text-[16.5px] font-semibold text-ink transition-[background-color,transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-teal-2 hover:shadow-[0_14px_30px_-12px_rgba(55,211,193,.7)]"
              >
                Review my analysis
                <Icon name="arrow" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <p className="-mt-3 text-center text-[12.5px] text-on-dark-3">
                Free, instant, and no email needed to see it.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="report"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex flex-col gap-[22px] p-[clamp(22px,3.4vw,44px)]"
            >
              <span className="font-mono text-[12.5px] tracking-[0.16em] text-teal">02 — YOUR ANALYSIS</span>

              <div className="flex flex-col gap-2">
                <span className="text-[15px] text-on-dark">{h.label}</span>
                <span className="font-display text-[clamp(34px,3.3vw,48px)] font-bold leading-[1.05] tracking-[-0.03em] text-teal tabular-nums">
                  {h.high === null ? (
                    <>
                      <Money value={h.low} />
                      /yr
                    </>
                  ) : h.low > 0 ? (
                    <>
                      <Money value={h.low} /> – <Money value={h.high} />
                    </>
                  ) : (
                    <>
                      Up to <Money value={h.high} />
                    </>
                  )}
                </span>
                <span className="text-sm text-on-dark-3">{h.note}</span>
              </div>

              <div className="flex flex-col gap-3.5 rounded-[18px] border border-paper/10 bg-paper/5 p-[18px]">
                <Bar label="Paid first time, today" paid={100 - Math.min(inputs.denialRate, 60)} accent="#6FE3D5" />
                <Bar label="At our 98% claims acceptance rate" paid={98} accent="#37D3C1" />
                <div className="flex flex-wrap gap-[18px] text-[12.5px] text-on-dark-2">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-[3px] bg-teal" />
                    Accepted
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-[3px] bg-coral" />
                    Denied or rejected
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <Row
                  k="Stuck in denials today"
                  sub={`About ${Math.round(result.deniedClaims).toLocaleString("en-US")} claims a month`}
                >
                  <Money value={result.stuckMonthly} />
                  {per}
                </Row>
                <Row k="Could be paid first time instead" sub="If your acceptance rate matched our 98%">
                  <Money value={result.recoverableMonthly * 12} />
                  <span className="text-[13px] font-medium text-on-dark-3"> /yr</span>
                </Row>
                <Row k="Our fee" sub="2.50% to 5.00% of the collected amount">
                  <Money value={result.feeLow} />–
                  <Money value={result.feeHigh} />
                  {per}
                </Row>
                <Row k="Compared with what you spend now" sub={`Your cost ${money(inputs.billingCost)}/mo`}>
                  <span className={diffClass}>{diff}</span>
                </Row>
              </div>

              <button
                type="button"
                onClick={onCta}
                className="group inline-flex min-h-[60px] items-center justify-center gap-2.5 rounded-full bg-teal px-7 text-[16.5px] font-semibold text-ink transition-[background-color,transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-teal-2 hover:shadow-[0_14px_30px_-12px_rgba(55,211,193,.7)]"
              >
                Get my free billing audit
                <Icon name="arrow" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <p className="text-[12.5px] leading-relaxed text-on-dark-3">
                Estimates only, based on the numbers you enter, our 98% claims acceptance rate and our 2.50%–5.00% fee.
                Real results depend on your payers, specialty, documentation and claim mix. The free audit gives you
                numbers for your practice.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
