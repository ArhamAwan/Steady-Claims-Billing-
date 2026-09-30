"use client";

import { motion } from "framer-motion";
import { credentialingItems } from "@/lib/content";
import { AnimatedHeading } from "../motion/AnimatedHeading";
import { EASE, Reveal } from "../motion/Reveal";
import { ButtonLink } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";

const codes = ["ICD-10-CM", "CPT", "HCPCS"];

export function CodingCredentialing() {
  return (
    <section className="container-x grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] gap-5 pb-[clamp(72px,10vw,130px)]">
      <Reveal>
        <div id="coding" className="flex h-full scroll-mt-28 flex-col gap-[22px] rounded-[32px] border border-line bg-white p-[clamp(28px,4vw,48px)]">
          <Eyebrow>06 — Medical coding support</Eyebrow>
          <AnimatedHeading
            className="h-section text-[clamp(32px,3.4vw,46px)] leading-[1.02]"
            parts={["Coding support for cleaner billing workflows."]}
          />
          <motion.div
            className="flex flex-wrap gap-2.5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
          >
            {codes.map((c) => (
              <motion.span
                key={c}
                variants={{
                  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
                }}
                className="rounded-[14px] bg-ink px-5 py-3.5 font-mono text-xl font-medium text-teal"
              >
                {c}
              </motion.span>
            ))}
          </motion.div>
          <p className="text-base leading-relaxed text-muted">
            Also: modifier review, documentation review, coding consistency, claim preparation, and identification of
            missing coding information.
          </p>
          <p className="text-base leading-relaxed">
            Codes should accurately represent the services documented by the healthcare provider.{" "}
            <strong>We do not recommend changing codes solely to increase reimbursement.</strong>
          </p>
          <p className="text-[13.5px] leading-relaxed text-subtle">
            Final coding responsibility and documentation requirements depend on the provider, specialty, payer policies,
            and the agreed scope of services.
          </p>
          <ButtonLink href="/contact" variant="ghost-light" arrow className="mt-auto self-start">
            Discuss Coding Support
          </ButtonLink>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div id="credentialing" className="flex h-full scroll-mt-28 flex-col gap-[22px] rounded-[32px] bg-ink p-[clamp(28px,4vw,48px)] text-paper">
          <Eyebrow tone="teal">07 — Credentialing</Eyebrow>
          <AnimatedHeading
            className="h-section text-[clamp(32px,3.4vw,46px)] leading-[1.02]"
            parts={["Provider credentialing & payer enrollment support."]}
          />
          <p className="text-base leading-relaxed text-on-dark-2">
            Applications, supporting documents, payer communication, follow-up, and ongoing profile maintenance — organized
            and managed.
          </p>
          <motion.ul
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
          >
            {credentialingItems.map((c) => (
              <motion.li
                key={c}
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
                className="border-t border-paper/10 py-[11px] text-[15px]"
              >
                {c}
              </motion.li>
            ))}
          </motion.ul>
          <p className="text-[13.5px] leading-relaxed text-on-dark-3">
            Credentialing timelines vary significantly between payers. Approval and processing times are controlled by the
            individual payer and cannot be guaranteed.
          </p>
          <ButtonLink href="/contact" arrow className="mt-auto self-start">
            Ask About Credentialing Support
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
