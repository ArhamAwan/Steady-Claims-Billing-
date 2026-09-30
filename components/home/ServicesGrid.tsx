"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { MouseEvent } from "react";
import { homeServices } from "@/lib/content";
import { AnimatedHeading } from "../motion/AnimatedHeading";
import { Reveal, staggerItem } from "../motion/Reveal";
import { ButtonLink } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { Icon } from "../ui/Icon";

function track(e: MouseEvent<HTMLAnchorElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function ServicesGrid() {
  return (
    <section className="container-x pb-[clamp(72px,10vw,140px)]">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div className="flex max-w-[720px] flex-col gap-[18px]">
          <Reveal>
            <Eyebrow>02 — Services</Eyebrow>
          </Reveal>
          <AnimatedHeading className="h-section" parts={["Complete medical billing support."]} />
        </div>
        <Reveal delay={0.2}>
          <ButtonLink href="/services" variant="ghost-light" arrow>
            Explore Our Medical Billing Services
          </ButtonLink>
        </Reveal>
      </div>

      <motion.div
        className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,270px),1fr))] gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      >
        {homeServices.map((s) => (
          <motion.div key={s.title} variants={staggerItem} className="h-full">
            <Link
              href={`/services#${s.slug}`}
              onMouseMove={track}
              className="group relative flex h-full flex-col gap-3.5 overflow-hidden rounded-[22px] border border-line bg-white p-[30px] transition-[background-color,color,transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:bg-ink hover:text-paper hover:shadow-[0_30px_60px_-30px_rgba(11,31,58,.55)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(55,211,193,.18), transparent 60%)",
                }}
              />
              <span className="relative flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-teal-tint text-ink transition-[background-color,transform] duration-500 ease-out-expo group-hover:rotate-[-6deg] group-hover:scale-110 group-hover:bg-teal">
                <Icon name={s.icon} size={24} />
              </span>
              <h3 className="relative mt-2 font-display text-[23px] font-semibold leading-tight tracking-[-0.01em]">
                {s.title}
              </h3>
              <p className="relative text-[15px] leading-relaxed text-muted transition-colors duration-500 group-hover:text-on-dark-2">
                {s.summary}
              </p>
              <span className="relative mt-auto flex items-center gap-1.5 font-mono text-[13px] text-subtle transition-colors duration-500 group-hover:text-teal">
                Learn more
                <Icon name="arrow" size={15} className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
