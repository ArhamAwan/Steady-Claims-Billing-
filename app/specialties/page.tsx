import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { CtaBand } from "@/components/shared/CtaBand";
import { SpecialtyExplorer } from "@/components/specialties/SpecialtyExplorer";

export const metadata: Metadata = {
  title: "Specialties",
  description:
    "Medical billing support for primary care, behavioral health, mental health, psychiatry, physical therapy, chiropractic, urgent care, outpatient clinics, and specialty practices.",
};

export default function SpecialtiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Specialties"
        layout="stack"
        title={["Billing support across healthcare specialties."]}
        intro={
          <p>
            Different specialties face different billing challenges. We create billing workflows based on your specialty,
            payer mix, and practice structure.
          </p>
        }
      />
      <SpecialtyExplorer />
      <CtaBand
        title="Don't see your specialty?"
        text="Independent physicians, multi-provider practices and more — call to discuss your specific billing needs."
      />
    </>
  );
}
