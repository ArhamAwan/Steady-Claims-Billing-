import { painPoints } from "@/lib/content";
import { AnimatedHeading } from "../motion/AnimatedHeading";
import { Reveal, Stagger, StaggerItem } from "../motion/Reveal";
import { Eyebrow } from "../ui/Eyebrow";

export function Problem() {
  return (
    <section className="container-x section-y grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] gap-[clamp(40px,6vw,96px)]">
      <div className="flex flex-col gap-6">
        <Reveal>
          <Eyebrow>01 — The problem</Eyebrow>
        </Reveal>
        <AnimatedHeading className="h-section" parts={["Your practice deserves a better billing process."]} />
        <Reveal delay={0.15}>
          <p className="text-lg leading-relaxed text-muted">
            Medical billing can quickly become one of the most time-consuming parts of running a healthcare practice.
          </p>
        </Reveal>
        <Stagger className="mt-2 flex flex-wrap gap-2.5" stagger={0.06}>
          {painPoints.map((p) => (
            <StaggerItem key={p} as="span" className="rounded-full border border-line bg-white px-3.5 py-2.5 font-mono text-[13px]">
              {p}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
      <div className="flex flex-col justify-end gap-7">
        <Reveal>
          <p className="text-[19px] leading-[1.65] text-body">
            Unpaid claims, denials, eligibility issues, missing information, aging accounts receivable, and repeated payer
            follow-ups can put unnecessary pressure on your staff and your revenue cycle.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[19px] leading-[1.65] text-body">
            Steady Claims Billing provides dependable billing support designed to keep your claims organized, monitored,
            and moving through the reimbursement process.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-col gap-3.5 rounded-3xl bg-ink p-8 text-paper">
            <Eyebrow tone="teal" className="text-xs">
              Our goal is simple
            </Eyebrow>
            <p className="font-display text-[clamp(22px,2.2vw,28px)] font-medium leading-tight tracking-[-0.01em]">
              Help your practice maintain a consistent billing workflow — and give you better visibility into what is
              happening with your claims.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
