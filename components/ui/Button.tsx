import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon } from "./Icon";

type Variant = "teal" | "ink" | "ghost-dark" | "ghost-light";

const variants: Record<Variant, string> = {
  teal: "bg-teal text-ink hover:bg-teal-2",
  ink: "bg-ink text-paper hover:bg-ink-hover",
  "ghost-dark": "border-[1.5px] border-paper/35 text-paper hover:bg-paper hover:text-ink",
  "ghost-light": "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-paper",
};

export const buttonClass = (variant: Variant = "teal", extra = "") =>
  `group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full px-6 py-2.5 text-center text-[15px] font-semibold leading-tight transition-[background-color,color,transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5 active:translate-y-0 ${variants[variant]} ${extra}`;

export function ButtonLink({
  href,
  variant = "teal",
  arrow = false,
  className = "",
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  const isExternal = href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http");
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <Icon
          name="arrow"
          size={18}
          className="shrink-0 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
        />
      )}
    </>
  );
  if (isExternal) {
    return (
      <a href={href} className={buttonClass(variant, className)}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, className)} {...rest}>
      {content}
    </Link>
  );
}
