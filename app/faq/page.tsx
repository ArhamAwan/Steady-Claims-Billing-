import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { FaqList } from "@/components/faq/FaqList";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about medical billing, denials, AR follow-up, insurance verification, coding, credentialing, and getting started.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") },
  })),
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={["Straight answers about billing."]}
        intro={
          <p>
            What we do, what we can&apos;t promise, and how getting started works. Still have questions? Call {site.phone}.
          </p>
        }
      />
      <FaqList />
      <section className="grid-bg bg-ink text-paper">
        <div className="container-x flex flex-wrap items-center justify-between gap-8 py-[clamp(64px,8vw,110px)]">
          <AnimatedHeading
            className="h-section max-w-[760px] tracking-[-0.035em]"
            parts={["Ready to start with a consultation?"]}
          />
          <Reveal delay={0.2}>
            <ButtonLink href="/contact" arrow>
              Request a Consultation
            </ButtonLink>
          </Reveal>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
