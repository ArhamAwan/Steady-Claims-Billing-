import type { ReactNode } from "react";

export function Eyebrow({
  children,
  tone = "blue",
  className = "",
}: {
  children: ReactNode;
  tone?: "blue" | "teal" | "ink";
  className?: string;
}) {
  const color = tone === "teal" ? "text-teal" : tone === "ink" ? "text-ink" : "text-blue";
  return (
    <p className={`font-mono text-[12.5px] uppercase tracking-[0.16em] ${color} ${className}`}>{children}</p>
  );
}
