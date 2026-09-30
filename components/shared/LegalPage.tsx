import { PageHero } from "./PageHero";
import { site } from "@/lib/site";

/** Placeholder layout for legal pages until the client supplies final copy. */
export function LegalPage({ title, intro }: { title: string; intro: string }) {
  return (
    <>
      <PageHero eyebrow="Legal" layout="stack" title={[title]} intro={<p>{intro}</p>} />
      <section className="mx-auto max-w-[820px] px-[clamp(20px,4vw,48px)] py-[clamp(56px,8vw,110px)]">
        <div className="flex flex-col gap-5 rounded-[28px] border border-dashed border-line-2 bg-white p-[clamp(24px,4vw,48px)]">
          <p className="font-mono text-xs tracking-[0.16em] text-blue">CONTENT PENDING</p>
          <p className="text-lg leading-relaxed text-body">
            [{title} content to be provided by {site.name}. Have it reviewed by a qualified professional before
            publishing.]
          </p>
          <p className="text-base leading-relaxed text-muted">{site.disclaimer}</p>
        </div>
      </section>
    </>
  );
}
