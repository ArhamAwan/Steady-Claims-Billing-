import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy", robots: { index: false } };

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" intro="How Steady Claims Billing collects, uses, and protects information." />;
}
