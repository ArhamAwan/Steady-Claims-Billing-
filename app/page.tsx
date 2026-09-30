import { Hero } from "@/components/home/Hero";
import { Ticker } from "@/components/home/Ticker";
import { Problem } from "@/components/home/Problem";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { RevenueCycle } from "@/components/home/RevenueCycle";
import { Process } from "@/components/home/Process";
import { WhyUs } from "@/components/home/WhyUs";
import { SpecialtiesBand } from "@/components/home/SpecialtiesBand";
import { SelfCheck } from "@/components/home/SelfCheck";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <Problem />
      <ServicesGrid />
      <RevenueCycle />
      <Process />
      <WhyUs />
      <SpecialtiesBand />
      <SelfCheck />
      <FinalCta />
    </>
  );
}
