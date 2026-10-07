import type { Metadata } from "next";
import { LanderFooter, LanderHeader } from "@/components/lander/LanderChrome";
import { RevenueLander } from "@/components/lander/RevenueLander";

export const metadata: Metadata = {
  title: { absolute: "Free Revenue Calculator — What Are Denied Claims Costing You? | Steady Claims Billing" },
  description:
    "See what denied claims cost your practice, what our 2.50%–5.00% fee would be, and what you could keep each year. Then request a free billing audit.",
  alternates: { canonical: "/revenue-calculator" },
  // Paid-traffic landing page: keep it out of search results.
  robots: { index: false, follow: false },
};

export default function RevenueCalculatorPage() {
  return (
    <>
      <LanderHeader />
      <RevenueLander />
      <LanderFooter />
    </>
  );
}
