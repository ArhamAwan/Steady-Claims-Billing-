import { ButtonLink } from "@/components/ui/Button";
import { PulseLine } from "@/components/motion/PulseLine";

export default function NotFound() {
  return (
    <section className="grid-bg flex min-h-[80vh] flex-col justify-center bg-ink text-paper">
      <div className="container-x flex flex-col items-start gap-6 pt-32">
        <p className="font-mono text-[12.5px] tracking-[0.16em] text-teal">404 — CLAIM NOT FOUND</p>
        <h1 className="h-display text-[clamp(44px,7vw,104px)]">This page didn&apos;t make it through processing.</h1>
        <ButtonLink href="/" arrow>
          Back to home
        </ButtonLink>
      </div>
      <PulseLine />
    </section>
  );
}
