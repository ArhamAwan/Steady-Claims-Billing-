import type { Metadata } from "next";
import { MetaLeadsContent } from "@/components/meta-leads/MetaLeadsContent";

export const metadata: Metadata = {
  title: "Free Medical Billing Audit — Stop Leaving Revenue on the Table",
  description:
    "Is your practice losing revenue to denied claims and slow reimbursements? Request your free billing audit from Steady Claims Billing. Takes under 2 minutes.",
  robots: { index: false, follow: false },
};

export default function MetaLeadsPage() {
  return <MetaLeadsContent />;
}
