import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = { title: "Terms of Use", robots: { index: false } };

export default function TermsPage() {
  return <LegalPage title="Terms of Use" intro="The terms that apply when you use this website." />;
}
