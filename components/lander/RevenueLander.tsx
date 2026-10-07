"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { calculate, DEFAULT_INPUTS, headline, money, type CalcInputs } from "@/lib/calculator";
import { heroPoints, testimonials } from "@/lib/content";
import { site } from "@/lib/site";
import { useLenis } from "../providers/SmoothScroll";
import { PulseLine } from "../motion/PulseLine";
import { EASE, Reveal } from "../motion/Reveal";
import { Icon } from "../ui/Icon";
import { AuditForm } from "./AuditForm";
import { Money, RevenueCalculator } from "./RevenueCalculator";

const QUOTES = ["Dr. Christopher Bennett", "Amanda Williams", "Sarah Mitchell"]
  .map((n) => testimonials.find((t) => t.name === n))
  .filter((t): t is (typeof testimonials)[number] => Boolean(t));

const FAQS = [
  {
    q: "How accurate is the calculator?",
    a: "It’s an estimate. It uses the numbers you enter, our 98% claims acceptance rate and our fee of 2.50% to 5.00% of the collected amount. Your real figures depend on your payers, specialty, documentation and claim mix, which is what the free audit looks at.",
  },
  {
    q: "Can you guarantee that a denied claim will be paid?",
    a: "No. Some denials can be corrected or appealed, while others may not be recoverable. Our role is to help identify the reason for denial and determine what action may be appropriate.",
  },
  {
    q: "Can you take over billing from another company?",
    a: "Yes, depending on the circumstances. A billing transition may involve reviewing outstanding accounts receivable, claim history, payer information, system access, existing workflows, and unresolved billing issues.",
  },
  {
    q: "Do I need to share patient information for the audit?",
    a: "No. To get started we only need practice-level details like the ones in this form. Please don’t send protected health information through the website.",
  },
];

const STEPS = [
  { t: "Tell us about your practice", d: "Five short steps below. Your calculator numbers come with you, so there's nothing to retype." },
  { t: "We review your billing", d: "Our team looks at where claims are getting stuck: denials, eligibility, coding, aging AR and follow-up." },
  { t: "You get a clear plan", d: "What we'd fix first, what it would cost, and how the handover works. You decide what happens next." },
];

const initials = (name: string) =>
  name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="border-b border-line-2">
      {FAQS.map((x, i) => {
        const on = open === i;
        return (
          <div key={x.q} className="border-t border-line-2">
            <button
              type="button"
              aria-expanded={on}
              onClick={() => setOpen(on ? null : i)}
              className="flex w-full items-center justify-between gap-5 px-1 py-6 text-left font-display text-[clamp(18px,1.7vw,22px)] font-semibold text-ink"
            >
              {x.q}
              <motion.span
                animate={{ rotate: on ? 45 : 0, backgroundColor: on ? "#37D3C1" : "rgba(0,0,0,0)", borderColor: on ? "#37D3C1" : "#0B1F3A" }}
                transition={{ duration: 0.3, ease: EASE }}
                className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full border-[1.5px]"
              >
                <Icon name="plus" size={16} strokeWidth={2} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="px-1 pb-6 pr-14 text-[16.5px] leading-relaxed text-[#384658]">{x.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function RevenueLander() {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const [inputs, setInputs] = useState<CalcInputs>(DEFAULT_INPUTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const h = headline(result);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -24 });
    else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="grid-bg bg-ink text-paper">
        <div className="container-x grid items-end gap-[clamp(24px,4vw,64px)] pb-[clamp(150px,14vw,190px)] pt-[clamp(28px,4vw,56px)] lg:grid-cols-2">
          <div className="flex flex-col gap-[22px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2.5 self-start rounded-full border border-teal/40 px-3.5 py-2 font-mono text-xs tracking-[0.16em] text-teal"
            >
              <span className="relative flex h-[7px] w-[7px]">
                <span className="absolute inset-0 animate-ping rounded-full bg-teal opacity-60 motion-reduce:hidden" />
                <span className="relative h-[7px] w-[7px] rounded-full bg-teal" />
              </span>
              FREE REVENUE CALCULATOR · 60 SECONDS
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
              className="font-display text-[clamp(40px,5vw,72px)] font-bold leading-[0.95] tracking-[-0.04em]"
            >
              What are denied claims <span className="font-semibold italic text-teal">costing</span> your practice?
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="flex flex-col gap-[22px] pb-1.5"
          >
            <p className="max-w-[560px] text-[18.5px] leading-relaxed text-on-dark">
              Move the sliders to match your practice. You&apos;ll see what&apos;s stuck in denials, what our fee would
              be, and what you could keep each year. Then get a free billing audit to confirm the numbers.
            </p>
            <div className="flex flex-wrap gap-x-[22px] gap-y-2.5 text-[14.5px] text-[#D4DCE7]">
              {["No patient data needed", "Free audit, no obligation"].map((t) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <Icon name="check" size={16} strokeWidth={2.4} className="text-teal" />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- Calculator ---------- */}
      <section id="calc" aria-label="Revenue calculator" className="container-x relative -mt-[clamp(130px,12vw,170px)] scroll-mt-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.25 }}
        >
          <RevenueCalculator inputs={inputs} result={result} onChange={setInputs} onCta={() => scrollTo("audit")} />
        </motion.div>
      </section>

      {/* ---------- Client points ---------- */}
      <section className="container-x pt-[clamp(56px,7vw,96px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-3.5">
          {heroPoints.map((p, i) => {
            const style =
              i === 2 ? "bg-teal text-ink" : i === 3 ? "bg-ink text-paper" : "border border-[#DDE5EE] bg-white text-ink";
            return (
              <Reveal key={p.key} delay={i * 0.06} className={`flex flex-col gap-2.5 rounded-3xl p-[26px] ${style}`}>
                <span className={`font-display text-[34px] font-bold leading-none tracking-[-0.03em] ${i === 3 ? "text-teal" : ""}`}>
                  {p.highlight.replace(" to ", "–")}
                </span>
                <span className={`text-[15px] leading-snug ${i === 3 ? "text-on-dark" : i === 2 ? "text-ink" : "text-muted"}`}>
                  {(p.before + p.highlight + p.after).trim().replace(/^./, (c) => c.toUpperCase())}
                </span>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="container-x flex flex-col gap-9 pt-[clamp(64px,8vw,110px)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="max-w-[720px] font-display text-[clamp(32px,3.8vw,52px)] font-bold leading-none tracking-[-0.03em]">
              From estimate to real numbers in three steps.
            </h2>
          </Reveal>
          <span className="font-mono text-[13px] text-muted">Free · No obligation · No patient data</span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.08} className="flex flex-col gap-[18px] rounded-3xl border border-line-2 p-7">
              <span className="font-mono text-xs text-blue">STEP 0{i + 1}</span>
              <h3 className="font-display text-2xl font-bold tracking-[-0.015em]">{s.t}</h3>
              <p className="text-[15.5px] leading-relaxed text-muted">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Form ---------- */}
      <section id="audit" aria-labelledby="audit-title" className="container-x scroll-mt-6 pt-[clamp(64px,8vw,110px)]">
        <div className="flex flex-wrap items-start gap-5">
          <aside className="flex min-w-0 flex-[1_1_320px] flex-col gap-4 lg:sticky lg:top-6">
            <div className="grid-bg flex flex-col gap-[18px] rounded-[28px] bg-ink p-[30px] text-paper">
              <span className="font-mono text-xs tracking-[0.16em] text-teal">YOUR ESTIMATE</span>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm text-on-dark">{h.label}</span>
                <span className="font-display text-[30px] font-bold leading-[1.1] tracking-[-0.025em] text-teal tabular-nums">
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
              </div>
              <dl className="grid grid-cols-2 gap-3.5 border-t border-paper/12 pt-4">
                {[
                  ["Collections", `${money(inputs.collections)}/mo`],
                  ["Denial rate", `${inputs.denialRate}%`],
                  ["Claims", `${Math.round(inputs.claims).toLocaleString("en-US")}/mo`],
                  ["Current cost", `${money(inputs.billingCost)}/mo`],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1">
                    <dt className="text-[12.5px] text-on-dark-3">{k}</dt>
                    <dd className="font-display text-[19px] font-bold">{v}</dd>
                  </div>
                ))}
                <div className="col-span-2 flex flex-col gap-1">
                  <dt className="text-[12.5px] text-on-dark-3">Our fee (2.50%–5.00%)</dt>
                  <dd className="font-display text-[19px] font-bold">
                    {money(result.feeLow)}–{money(result.feeHigh)}/mo
                  </dd>
                </div>
              </dl>
              <button type="button" onClick={() => scrollTo("calc")} className="min-h-11 self-start text-sm text-teal-2 underline underline-offset-4">
                Change my numbers
              </button>
            </div>
            <div className="flex items-start gap-3.5 rounded-[22px] border border-[#DDE5EE] bg-white p-[22px]">
              <Icon name="shield-check" size={22} className="mt-0.5 flex-none text-blue" />
              <p className="text-sm leading-relaxed text-muted">
                Please don&apos;t include protected health information, patient records, Social Security numbers or
                member IDs. We only need practice-level details.
              </p>
            </div>
          </aside>

          <AuditForm inputs={inputs} result={result} estimateText={h.text} />
        </div>
        <p className="mt-[18px] text-center text-sm text-muted">No patient data. No hidden fees. No spam, ever.</p>
      </section>

      {/* ---------- Testimonials ---------- */}
      <section className="container-x flex flex-col gap-8 pt-[clamp(72px,9vw,120px)]">
        <Reveal>
          <h2 className="max-w-[760px] font-display text-[clamp(32px,3.8vw,52px)] font-bold leading-none tracking-[-0.03em]">
            What practices say about working with us.
          </h2>
        </Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-4">
          {QUOTES.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="h-full">
              <figure className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-[#DDE5EE] bg-white p-7 shadow-[0_24px_48px_-32px_rgba(11,31,58,.35)] transition-[transform,border-color] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-teal">
                <blockquote className="text-base leading-[1.65] text-body">“{t.quote}”</blockquote>
                <figcaption className="flex items-center gap-3.5 border-t border-[#E3EAF2] pt-[18px]">
                  <span
                    aria-hidden="true"
                    className={`flex h-11 w-11 items-center justify-center rounded-full font-display font-bold ${
                      t.name.startsWith("Dr.") ? "bg-ink text-teal" : "bg-teal-tint text-ink"
                    }`}
                  >
                    {initials(t.name)}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display text-[17px] font-semibold">{t.name}</span>
                    <span className="text-[13.5px] text-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="mx-auto max-w-[1000px] px-[clamp(20px,4vw,48px)] py-[clamp(72px,9vw,120px)]">
        <Reveal>
          <h2 className="mb-6 font-display text-[clamp(30px,3.4vw,44px)] font-bold leading-none tracking-[-0.03em]">Before you ask.</h2>
        </Reveal>
        <Faq />
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="grid-bg bg-ink text-paper">
        <div className="container-x flex flex-wrap items-center justify-between gap-7 py-[clamp(56px,7vw,96px)]">
          <h2 className="max-w-[760px] font-display text-[clamp(32px,4.2vw,60px)] font-bold leading-[0.98] tracking-[-0.035em]">
            Find out what&apos;s stuck in your claims.
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollTo("audit")}
              className="inline-flex min-h-[54px] items-center rounded-full bg-teal px-6 text-[15px] font-semibold text-ink transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-teal-2"
            >
              Get my free billing audit
            </button>
            <a
              href={site.phoneHref}
              className="inline-flex min-h-[54px] items-center rounded-full border-[1.5px] border-paper/35 px-6 text-[15px] font-semibold text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              Call {site.phone}
            </a>
          </div>
        </div>
        <PulseLine />
      </section>
    </>
  );
}
