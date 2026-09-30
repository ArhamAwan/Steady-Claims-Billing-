import Link from "next/link";

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" aria-hidden="true" className="shrink-0">
      <rect width="36" height="36" rx="10" fill="#37D3C1" />
      <path
        d="M5 19 H11 L14 11 L18.5 26 L21.5 16 L23.5 19 H31"
        fill="none"
        stroke="#0B1F3A"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="group flex items-center gap-3 text-paper" aria-label="Steady Claims Billing home">
      <span className="transition-transform duration-500 ease-out-expo group-hover:rotate-[-8deg] group-hover:scale-105">
        <LogoMark />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[21px] font-bold tracking-[-0.02em]">Steady Claims</span>
        <span className="mt-[5px] font-mono text-[10.5px] tracking-[0.32em] text-teal">BILLING</span>
      </span>
    </Link>
  );
}
