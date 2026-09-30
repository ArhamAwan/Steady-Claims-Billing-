"use client";

import { motion } from "framer-motion";
import { billingServices } from "@/lib/content";
import { AnimatedHeading } from "../motion/AnimatedHeading";
import { EASE, Reveal } from "../motion/Reveal";
import { ButtonLink } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { Icon } from "../ui/Icon";

export function BillingServices() {
  return (
    <section id="billing" className="container-x section-y grid scroll-mt-24 grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-[clamp(40px,6vw,96px)]">
      <div className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
        <Reveal>
          <Eyebrow>01 — Medical billing</Eyebrow>
        </Reveal>
        <AnimatedHeading className="h-section text-[clamp(36px,4.2vw,58px)]" parts={["Our medical billing services."]} />
        <Reveal delay={0.1}>
          <p className="text-[17px] leading-relaxed text-muted">
            Eleven connected responsibilities, from the first patient record to the final status report.
          </p>
        </Reveal>
      </div>
      <motion.ol
        className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        {billingServices.map((s, i) => (
          <motion.li
            key={s.title}
            className="group relative grid grid-cols-[56px_1fr] gap-[18px] py-[26px]"
            variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
          >
            <span className="absolute inset-x-0 top-0 h-px bg-line-2" />
            <span className="absolute left-0 top-0 h-px w-0 bg-blue transition-[width] duration-700 ease-out-expo group-hover:w-full" />
            <span className="font-mono text-[13px] text-blue">{String(i + 1).padStart(2, "0")}</span>
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-[21px] font-semibold transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                {s.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-muted">{s.text}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}

function FlowLine({ variant }: { variant: "rejected" | "denied" }) {
  const dark = variant === "denied";
  const stopAt = dark ? "86%" : "34%";
  return (
    <div className="relative flex h-8 items-center" aria-hidden="true">
      <div className={`absolute inset-x-0 top-1/2 h-px -translate-y-1/2 ${dark ? "bg-paper/20" : "border-t border-dashed border-[#AAB6C4]"}`} />
      <motion.div
        className={`absolute left-0 top-1/2 h-0.5 -translate-y-1/2 ${dark ? "bg-teal" : "bg-ink"}`}
        initial={{ width: "0%" }}
        whileInView={{ width: ["0%", stopAt, stopAt] }}
        viewport={{ once: false, margin: "-20% 0px" }}
        transition={{ duration: 3, times: [0, 0.55, 1], ease: EASE, repeat: Infinity, repeatDelay: 0.6 }}
      />
      <motion.span
        className={`absolute top-1/2 -ml-1.5 -mt-1.5 h-3 w-3 rounded-full ${dark ? "bg-teal" : "bg-ink"}`}
        initial={{ left: "0%" }}
        whileInView={{ left: ["0%", stopAt, stopAt] }}
        viewport={{ once: false, margin: "-20% 0px" }}
        transition={{ duration: 3, times: [0, 0.55, 1], ease: EASE, repeat: Infinity, repeatDelay: 0.6 }}
      />
      {dark && (
        <span className="absolute left-[62%] -translate-x-1/2 bg-ink px-2 font-mono text-[11px] text-on-dark-2">PAYER</span>
      )}
      {!dark && (
        <span className="absolute right-0 bg-paper pl-2 font-mono text-[11px] text-subtle">PAYER</span>
      )}
      <motion.span
        className={`absolute top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border-2 ${
          dark ? "border-coral bg-ink text-coral" : "border-ink bg-paper text-ink"
        }`}
        style={{ left: stopAt }}
        initial={{ scale: 1 }}
        whileInView={{ scale: [1, 1, 1.25, 1, 1], rotate: [0, 0, -8, 0, 0] }}
        viewport={{ once: false, margin: "-20% 0px" }}
        transition={{ duration: 3, times: [0, 0.5, 0.6, 0.7, 1], repeat: Infinity, repeatDelay: 0.6 }}
      >
        <Icon name="x" size={16} strokeWidth={2.6} />
      </motion.span>
    </div>
  );
}

export function RejectedVsDenied() {
  return (
    <section className="container-x pb-[clamp(72px,10vw,130px)]">
      <Reveal>
        <div className="flex flex-col gap-10 rounded-[32px] border border-line bg-white p-[clamp(24px,4vw,56px)]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <AnimatedHeading
              className="h-section max-w-[640px] text-[clamp(32px,3.6vw,48px)]"
              parts={["Rejected claims vs. denied claims."]}
            />
            <p className="font-mono text-[13px] text-muted">Each type of issue requires a different workflow.</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-5">
            <Reveal delay={0.1} className="flex flex-col gap-[18px] rounded-3xl bg-paper p-8">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-ink px-3 py-1.5 font-mono text-xs text-paper">REJECTED</span>
                <span className="font-mono text-xs text-muted">Before adjudication</span>
              </div>
              <FlowLine variant="rejected" />
              <p className="text-[16.5px] leading-relaxed">
                A rejected claim typically has not entered the payer&apos;s full adjudication process.
              </p>
              <p className="text-[15.5px] leading-relaxed text-muted">
                This may happen because required information is missing, data is formatted incorrectly, or the claim fails
                an initial payer validation.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="flex flex-col gap-[18px] rounded-3xl bg-ink p-8 text-paper">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-coral px-3 py-1.5 font-mono text-xs text-ink">DENIED</span>
                <span className="font-mono text-xs text-on-dark-2">After processing</span>
              </div>
              <FlowLine variant="denied" />
              <p className="text-[16.5px] leading-relaxed">
                A denied claim has generally been processed by the insurance company, but payment was denied or reduced.
              </p>
              <p className="text-[15.5px] leading-relaxed text-on-dark-2">
                Denials may relate to eligibility, authorization, coding, documentation, timely filing, coverage, medical
                necessity, provider enrollment, or payer policy.
              </p>
            </Reveal>
          </div>
          <ButtonLink href="/contact" variant="ink" arrow className="self-start">
            Talk to Our Medical Billing Team
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
