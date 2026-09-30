const items = [
  "Medical Billing",
  "Revenue Cycle Management",
  "Denial Management",
  "Insurance Verification",
  "AR Follow-Up",
  "Payment Posting",
  "Coding Support",
  "Credentialing",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <span key={t} className="flex items-center gap-10">
          <span>{t}</span>
          <span className="text-ink/50">✱</span>
        </span>
      ))}
    </div>
  );
}

export function Ticker() {
  return (
    <div className="overflow-hidden border-b border-ink bg-teal py-[18px] text-ink">
      <div className="flex w-max animate-marquee font-mono text-sm uppercase tracking-[0.14em] hover:[animation-play-state:paused]">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
