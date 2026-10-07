"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { landerPaths } from "@/lib/site";

/**
 * Shows the site header and footer everywhere except ad landing pages,
 * which bring their own minimal header and footer.
 */
export function SiteChrome({ header, footer, children }: { header: ReactNode; footer: ReactNode; children: ReactNode }) {
  const pathname = (usePathname() || "/").toLowerCase();
  const isLander = landerPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  return (
    <>
      {!isLander && header}
      <main id="main">{children}</main>
      {!isLander && footer}
    </>
  );
}
