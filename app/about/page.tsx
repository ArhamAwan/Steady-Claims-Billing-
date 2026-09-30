import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { PulseLine } from "@/components/motion/PulseLine";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/Button";
import { Principles } from "@/components/shared/Principles";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Steady Claims Billing was built around a simple idea: healthcare practices need billing support they can rely on consistently.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        layout="stack"
        title={[
          "Healthcare practices need billing support they can",
          { text: "rely on", className: "font-semibold italic text-teal" },
          "— consistently.",
        ]}
        bottom={<PulseLine d="M0 60 H520 L540 60 L552 24 L572 84 L588 40 L600 60 H1440" delay={0.8} />}
        className="[&>div]:pb-6"
      />

      <section className="container-x section-y grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-[clamp(40px,6vw,96px)]">
        <div className="flex flex-col gap-[18px]">
          <Reveal>
            <Eyebrow>Our story</Eyebrow>
          </Reveal>
          <AnimatedHeading
            className="h-section text-[clamp(34px,4vw,54px)] leading-[1.02]"
            parts={["Dependable billing support for healthcare practices."]}
          />
        </div>
        <div className="flex flex-col gap-[22px] text-[19px] leading-[1.65] text-body">
          <Reveal>
            <p>
              Steady Claims Billing was built around a simple idea: healthcare practices need billing support they can rely
              on consistently.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Running a medical practice requires much more than providing patient care. Providers and staff also manage
              scheduling, documentation, staffing, insurance requirements, claim submission, denials, outstanding balances,
              and countless administrative responsibilities.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              Our role is to help reduce the operational burden surrounding medical billing. By creating organized billing
              workflows and maintaining consistent follow-up, we help practices stay focused on what matters most:{" "}
              <strong>their patients and their business.</strong>
            </p>
          </Reveal>
        </div>
      </section>

      <Principles />

      <section className="border-y border-line bg-white">
        <div className="container-x section-y grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] gap-[clamp(40px,6vw,96px)]">
          <div className="flex flex-col gap-5">
            <Reveal>
              <Eyebrow>Our mission</Eyebrow>
            </Reveal>
            <AnimatedHeading
              as="p"
              stagger={0.025}
              className="font-display text-[clamp(28px,3vw,40px)] font-medium leading-[1.2] tracking-[-0.02em]"
              parts={["To help healthcare practices maintain a more organized, transparent, and dependable medical billing process."]}
            />
          </div>
          <div className="flex flex-col gap-5">
            <Reveal>
              <Eyebrow>Our philosophy</Eyebrow>
            </Reveal>
            <AnimatedHeading
              as="p"
              stagger={0.025}
              className="font-display text-[clamp(28px,3vw,40px)] font-medium leading-[1.2] tracking-[-0.02em]"
              parts={[
                "Every claim represents healthcare services that have already been provided.",
                { text: "Those claims deserve proper attention throughout the billing process.", className: "text-blue" },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="grid-bg bg-ink text-paper">
        <div className="container-x section-y grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-10">
          <AnimatedHeading
            className="h-display text-[clamp(40px,5.4vw,80px)] tracking-[-0.04em]"
            parts={["Speak with Steady Claims Billing."]}
          />
          <Reveal delay={0.2} className="flex flex-col gap-6">
            <p className="text-lg leading-relaxed text-on-dark-2">
              Based in Katy, Texas. Tell us about your practice and where your billing process needs support.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact" arrow>
                Request a Consultation
              </ButtonLink>
              <ButtonLink href={site.phoneHref} variant="ghost-dark">
                {site.phone}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
