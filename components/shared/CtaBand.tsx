import { site } from "@/lib/site";
import { AnimatedHeading } from "../motion/AnimatedHeading";
import { Reveal } from "../motion/Reveal";
import { ButtonLink } from "../ui/Button";

/** Teal call-to-action strip used at the bottom of inner pages. */
export function CtaBand({
  title,
  text,
  primary = { href: "/contact", label: "Request a Consultation" },
}: {
  title: string;
  text?: string;
  primary?: { href: string; label: string };
}) {
  return (
    <section className="border-t border-ink bg-teal text-ink">
      <div className="container-x flex flex-wrap items-center justify-between gap-8 py-[clamp(56px,7vw,96px)]">
        <div className="flex max-w-[720px] flex-col gap-3">
          <AnimatedHeading parts={[title]} className="h-section text-[clamp(32px,4vw,56px)]" />
          {text && (
            <Reveal delay={0.2}>
              <p className="text-lg leading-normal">{text}</p>
            </Reveal>
          )}
        </div>
        <Reveal delay={0.25} className="flex flex-wrap gap-3">
          <ButtonLink href={primary.href} variant="ink" arrow>
            {primary.label}
          </ButtonLink>
          <ButtonLink href={site.phoneHref} variant="ghost-light">
            {site.phone}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
