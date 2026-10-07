"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

/** Routes that should render without the site Header and Footer. */
const STANDALONE_ROUTES = ["/RCM", "/revenue-calculator"];

export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone = STANDALONE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  return (
    <>
      {!isStandalone && <Header />}
      <main id="main">{children}</main>
      {!isStandalone && <Footer />}
    </>
  );
}
