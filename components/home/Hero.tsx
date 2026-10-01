"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { site } from "@/lib/site";
import { AnimatedHeading } from "../motion/AnimatedHeading";
import { PulseLine } from "../motion/PulseLine";
import { EASE } from "../motion/Reveal";
import { ButtonLink } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { heroPoints } from "@/lib/content";
import { ClaimsBoard } from "./ClaimsBoard";
import { Doctor3D } from "./Doctor3D";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const stageY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section ref={ref} className="grid-bg relative overflow-hidden bg-ink text-paper">
      <div className="container-x grid grid-cols-1 items-center gap-[clamp(40px,5vw,72px)] pb-6 pt-[clamp(120px,13vw,170px)] hero-lg:min-h-[calc(100svh-90px)] hero-lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] hero-lg:pt-[clamp(104px,15vh,160px)]">
        <motion.div style={{ y: copyY, opacity: fade }} className="flex flex-col gap-7 hero-lg:gap-[clamp(16px,3.2vh,28px)]">
          <motion.p
            className="inline-flex items-center gap-2.5 font-mono text-[12.5px] uppercase tracking-[0.14em] text-teal"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            Medical billing &amp; revenue cycle support
          </motion.p>

          <AnimatedHeading
            as="h1"
            onMount
            delay={0.2}
            stagger={0.06}
            className="h-display text-[clamp(46px,6.4vw,92px)] hero-lg:text-[clamp(52px,min(5.8vw,10.5vh),88px)]"
            parts={[
              "Medical billing that keeps your revenue",
              { text: "moving.", className: "font-semibold italic text-teal" },
            ]}
          />

          <motion.ul
            aria-label="Why practices choose Steady Claims Billing"
            className="grid max-w-[620px] grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.7 } } }}
          >
            {heroPoints.map((p) => (
              <motion.li
                key={p.key}
                className="flex items-start gap-3 text-[clamp(15.5px,1.3vw,17px)] leading-snug text-on-dark hero-lg:text-[clamp(15px,min(1.25vw,2.3vh),17px)]"
                variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
              >
                <span className="mt-[1px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal">
                  <Icon name="check" size={14} strokeWidth={2.6} />
                </span>
                <span>
                  {p.before}
                  <strong className="whitespace-nowrap font-semibold text-teal">{p.highlight}</strong>
                  {p.after}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="flex flex-wrap gap-3.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
          >
            <ButtonLink href="/contact" arrow>
              Request a Billing Consultation
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="ghost-dark">
              Call {site.phone}
            </ButtonLink>
          </motion.div>

          <motion.p
            className="flex items-center gap-2.5 text-[15px] text-on-dark-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <span className="h-[1.5px] w-7 bg-on-dark-3" />
            Spend less time chasing claims and more time on your patients.
          </motion.p>
        </motion.div>

        {/* Hero visual: live 3D doctor presenting the claims */}
        <div className="relative flex flex-col items-center hero-lg:block hero-lg:h-[min(640px,calc(100svh-150px))] hero-lg:min-h-[480px]">
          <motion.div
            style={{ y: stageY }}
            className="relative w-[min(360px,80vw)] hero-lg:absolute hero-lg:-left-6 hero-lg:bottom-0 hero-lg:w-[min(440px,36vw,calc((100svh-170px)*0.776))]"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
            >
              <div aria-hidden="true" className="absolute left-[8%] right-[4%] top-[14%] aspect-square rounded-full border border-teal/20 bg-teal/[0.07]">
                <motion.div
                  className="absolute -inset-[7%] rounded-full border border-dashed border-teal/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <Doctor3D className="[mask-image:linear-gradient(to_bottom,#000_82%,transparent_99%)] drop-shadow-[0_30px_40px_rgba(0,0,0,.35)]" />
            </motion.div>

            <motion.div
              aria-hidden="true"
              className="absolute left-[58%] top-[-4%] z-20 w-max max-w-[160px] rounded-[18px] rounded-bl-[4px] bg-paper px-3.5 py-2.5 text-[12.5px] font-semibold leading-snug text-ink shadow-[0_18px_40px_-14px_rgba(0,0,0,.5)] hero-lg:left-[60%] hero-lg:top-0 hero-lg:max-w-[210px] hero-lg:px-4 hero-lg:py-3 hero-lg:text-sm"
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: [0.6, 1.06, 1], y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 1.4 }}
              style={{ transformOrigin: "0% 100%" }}
            >
              Hi! Let&apos;s get your claims moving.
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: cardsY }}
            className="relative z-10 -mt-7 w-full max-w-[520px] hero-lg:absolute hero-lg:-right-3 hero-lg:bottom-[26px] hero-lg:mt-0 hero-lg:w-[clamp(250px,22vw,292px)]"
          >
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.8 }}
            >
              <ClaimsBoard />
            </motion.div>
          </motion.div>
        </div>
      </div>
      <PulseLine drawOnLoad />
    </section>
  );
}
