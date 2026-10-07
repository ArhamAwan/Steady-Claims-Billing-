import Link from "next/link";
import { site } from "@/lib/site";
import { LogoMark } from "../layout/Logo";
import { Icon } from "../ui/Icon";

/** Minimal header for ad landing pages: logo and phone only, no site navigation. */
export function LanderHeader() {
  return (
    <header className="grid-bg bg-ink text-paper">
      <div className="container-x flex flex-wrap items-center justify-between gap-4 py-5">
        <Link href="/" className="flex items-center gap-3 text-paper" aria-label="Steady Claims Billing home">
          <LogoMark />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[21px] font-bold tracking-[-0.02em]">Steady Claims</span>
            <span className="mt-[5px] font-mono text-[10.5px] tracking-[0.32em] text-teal">BILLING</span>
          </span>
        </Link>
        <div className="flex items-center gap-3.5">
          <span className="hidden font-mono text-xs tracking-[0.14em] text-on-dark-2 md:inline">QUESTIONS? CALL US</span>
          <a
            href={site.phoneHref}
            className="inline-flex min-h-[46px] items-center gap-2.5 rounded-full border-[1.5px] border-paper/35 px-5 text-[15px] font-semibold text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
          >
            <Icon name="phone" size={17} />
            {site.phone}
          </a>
        </div>
      </div>
    </header>
  );
}

export function LanderFooter() {
  return (
    <footer className="bg-ink-3 text-paper">
      <div className="container-x flex flex-col gap-4 py-9">
        <p className="max-w-[900px] text-[13px] leading-relaxed text-on-dark-3">
          {site.disclaimer} Calculator results are estimates, not a guarantee of payment or savings.
        </p>
        <p className="font-mono text-xs text-on-dark-3">
          © {new Date().getFullYear()} {site.name} · {site.address.street}, {site.address.city}, {site.address.region}{" "}
          {site.address.zip}
        </p>
      </div>
    </footer>
  );
}
