"use client";

import { useReducedMotion } from "framer-motion";
import { testimonials } from "@/lib/content";
import { AnimatedHeading } from "../motion/AnimatedHeading";
import { Reveal } from "../motion/Reveal";
import { Eyebrow } from "../ui/Eyebrow";

type T = (typeof testimonials)[number];

const initials = (name: string) =>
  name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

function QuoteMark() {
  return (
    <svg width="30" height="24" viewBox="0 0 30 24" aria-hidden="true" className="text-teal">
      <path
        fill="currentColor"
        d="M0 24V14.4C0 5.9 4.3 1.1 12.9 0l1.2 3.9C9.4 5 7.2 7.6 7 11.6h5.8V24H0Zm16.2 0V14.4C16.2 5.9 20.5 1.1 29.1 0l1.2 3.9c-4.7 1.1-6.9 3.7-7.1 7.7H29V24H16.2Z"
      />
    </svg>
  );
}

function Card({ t, hidden = false }: { t: T; hidden?: boolean }) {
  const isDr = t.name.startsWith("Dr.");
  return (
    <figure
      aria-hidden={hidden || undefined}
      className="flex w-[min(380px,82vw)] shrink-0 flex-col justify-between gap-6 rounded-[24px] border border-line bg-white p-7 shadow-[0_24px_48px_-32px_rgba(11,31,58,.35)] transition-[transform,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-teal hover:shadow-[0_30px_60px_-30px_rgba(11,31,58,.45)]"
    >
      <div className="flex flex-col gap-4">
        <QuoteMark />
        <blockquote className="text-[16px] leading-[1.65] text-body">{t.quote}</blockquote>
      </div>
      <figcaption className="flex items-center gap-3.5 border-t border-line pt-5">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-[15px] font-bold ${
            isDr ? "bg-ink text-teal" : "bg-teal-tint text-ink"
          }`}
          aria-hidden="true"
        >
          {initials(t.name)}
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="font-display text-[17px] font-semibold leading-tight text-ink">{t.name}</span>
          <span className="truncate text-[13.5px] text-muted">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function Row({ items, reverse = false }: { items: T[]; reverse?: boolean }) {
  return (
    <div className="group relative overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
      <div
        className={`flex w-max gap-5 pr-5 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] ${
          reverse ? "animate-reviews-rev" : "animate-reviews"
        }`}
      >
        {items.map((t) => (
          <Card key={t.name} t={t} />
        ))}
        {/* duplicate set for a seamless loop */}
        {items.map((t) => (
          <Card key={`${t.name}-dup`} t={t} hidden />
        ))}
      </div>
    </div>
  );
}

/** Client testimonials: two rows drifting in opposite directions, pausing on hover. */
export function Testimonials() {
  const reduce = useReducedMotion();
  const half = Math.ceil(testimonials.length / 2);
  const rowA = testimonials.slice(0, half);
  const rowB = testimonials.slice(half);

  return (
    <section aria-labelledby="testimonials-title" className="section-y overflow-hidden border-t border-line bg-paper">
      <div className="container-x mb-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-end gap-8">
        <div className="flex flex-col gap-[18px]">
          <Reveal>
            <Eyebrow>08 — Client stories</Eyebrow>
          </Reveal>
          <div id="testimonials-title">
            <AnimatedHeading className="h-section" parts={["What practices say about working with us."]} />
          </div>
        </div>
        <Reveal delay={0.15}>
          <p className="text-lg leading-relaxed text-muted">
            Physicians, practice administrators and office managers on what changed once their billing, denials and
            follow-ups had a steady process behind them.
          </p>
        </Reveal>
      </div>

      {reduce ? (
        <div className="container-x grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-5 [&>figure]:w-auto">
          {testimonials.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </div>
      ) : (
        <Reveal className="flex flex-col gap-2">
          <Row items={rowA} />
          <Row items={rowB} reverse />
        </Reveal>
      )}
    </section>
  );
}
