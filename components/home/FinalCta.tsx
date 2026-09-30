import { site } from "@/lib/site";
import { AnimatedHeading } from "../motion/AnimatedHeading";
import { PulseLine } from "../motion/PulseLine";
import { Reveal } from "../motion/Reveal";
import { ButtonLink } from "../ui/Button";

export function FinalCta() {
  return (
    <section className="grid-bg relative overflow-hidden bg-ink text-paper">
      <div className="container-x flex flex-col gap-9 pb-10 pt-[clamp(80px,11vw,160px)]">
        <AnimatedHeading
          stagger={0.05}
          className="h-display max-w-[1200px] text-[clamp(48px,8vw,128px)] leading-[0.92] tracking-[-0.045em]"
          parts={["Keep your claims moving.", { text: "Keep your revenue steady.", className: "text-teal" }]}
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-10">
          <Reveal delay={0.2}>
            <p className="max-w-[600px] text-[19px] leading-relaxed text-on-dark-2">
              Your billing process should support your practice, not overwhelm it. Whether you&apos;re outsourcing your
              billing, improving follow-up on outstanding claims, strengthening denial management, or need extra help
              managing your revenue cycle — we&apos;re ready to learn about your practice.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="flex flex-wrap gap-3.5">
            <ButtonLink href="/contact" arrow>
              Request a Consultation
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="ghost-dark">
              Call {site.phone}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
      <PulseLine d="M0 50 H900 L920 50 L932 20 L950 80 L964 36 L976 50 H1440" />
    </section>
  );
}
