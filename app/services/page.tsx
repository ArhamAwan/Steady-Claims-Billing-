import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { CtaBand } from "@/components/shared/CtaBand";
import { BillingServices, RejectedVsDenied } from "@/components/services/BillingServices";
import { RcmTimeline } from "@/components/services/RcmTimeline";
import { Denials } from "@/components/services/Denials";
import { Verification } from "@/components/services/Verification";
import { ArAging } from "@/components/services/ArAging";
import { CodingCredentialing } from "@/components/services/CodingCredentialing";

export const metadata: Metadata = {
  title: "Medical Billing Services",
  description:
    "Medical billing, revenue cycle management, denial management, insurance verification, AR follow-up, coding support, and credentialing for healthcare providers.",
};

const jumps = [
  { href: "#billing", label: "Medical Billing" },
  { href: "#rcm", label: "Revenue Cycle" },
  { href: "#denials", label: "Denial Management" },
  { href: "#verification", label: "Insurance Verification" },
  { href: "#ar", label: "AR Follow-Up" },
  { href: "#coding", label: "Coding Support" },
  { href: "#credentialing", label: "Credentialing" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        layout="stack"
        introClassName="max-w-none"
        title={["Medical billing services for healthcare providers."]}
        intro={
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-8">
            <p>
              Medical billing is not simply about submitting claims. Successful billing requires attention to patient
              information, insurance details, documentation, coding, payer requirements, claim status, denials, payments,
              and outstanding balances.
            </p>
            <p>
              Our team can support your practice across multiple stages of the billing cycle — helping you maintain an
              organized and consistent reimbursement process.
            </p>
          </div>
        }
      >
        <nav aria-label="Service sections" className="mt-10 flex flex-wrap gap-2.5">
          {jumps.map((j) => (
            <Link
              key={j.href}
              href={j.href}
              className="inline-flex min-h-11 items-center rounded-full border border-paper/20 px-[18px] text-sm text-paper transition-[background-color,color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-teal hover:bg-teal hover:text-ink"
            >
              {j.label}
            </Link>
          ))}
        </nav>
      </PageHero>
      <BillingServices />
      <RejectedVsDenied />
      <RcmTimeline />
      <Denials />
      <Verification />
      <ArAging />
      <CodingCredentialing />
      <CtaBand title="Full-service billing or one part of the cycle — let's talk." />
    </>
  );
}
