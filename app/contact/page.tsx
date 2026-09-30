import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Consultation",
  description:
    "Talk to Steady Claims Billing about medical billing, denied claims, aging AR, insurance verification, credentialing, or revenue cycle management. Call +1 (702) 415-1750.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact & consultation"
        title={["Let's review your billing process."]}
        className="[&>div]:pb-[clamp(120px,12vw,180px)]"
        intro={
          <p>
            Some practices need complete billing support. Others need help with aging claims, denials, insurance
            verification, or credentialing. Tell us about your practice and the challenges you&apos;re experiencing.
          </p>
        }
      />
      <section className="container-x relative -mt-[clamp(90px,10vw,140px)] flex flex-wrap items-start gap-5 pb-[clamp(72px,10vw,120px)]">
        <aside className="order-2 flex min-w-0 flex-[1_1_340px] flex-col gap-4 lg:order-1">
          <Reveal delay={0.3}>
            <div className="flex flex-col gap-3.5 rounded-[28px] bg-teal p-8 text-ink">
              <p className="font-mono text-xs tracking-[0.16em]">CALL US</p>
              <a href={site.phoneHref} className="font-display text-[clamp(28px,2.6vw,36px)] font-bold tracking-[-0.02em] hover:underline">
                {site.phone}
              </a>
              <p className="text-[15px] leading-normal text-[#1B2A3F]">
                Talk to our medical billing team about denied claims, aging AR, verification, credentialing, or your
                revenue cycle.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="flex flex-col gap-3.5 rounded-[28px] border border-line bg-white p-8">
              <p className="font-mono text-xs tracking-[0.16em] text-blue">VISIT OR WRITE TO US</p>
              <address className="font-display text-[22px] font-semibold not-italic leading-snug">
                {site.name}
                <br />
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.zip}
                <br />
                {site.address.country}
              </address>
              <a
                href="https://maps.google.com/?q=4905+Sunfalls+Dr,+Katy,+TX+77493"
                target="_blank"
                rel="noreferrer"
                className="group mt-1.5 flex items-center gap-2 font-mono text-[13px] text-blue"
              >
                <Icon name="pin" size={18} />
                Open in Google Maps
                <Icon name="arrow" size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="flex items-start gap-3.5 rounded-[28px] bg-ink p-7 text-paper">
              <Icon name="shield-check" size={22} className="mt-0.5 shrink-0 text-teal" />
              <p className="text-sm leading-relaxed text-on-dark">
                Please do not submit protected health information, patient medical records, Social Security numbers,
                insurance member IDs, or other sensitive patient information through this form.
              </p>
            </div>
          </Reveal>
        </aside>
        <Reveal delay={0.2} className="order-1 min-w-0 flex-[2_1_560px] lg:order-2">
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
