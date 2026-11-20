import MainLayout from "../components/layout/MainLayout";

import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import Features from "../components/landing/Features";
import AnalysisComparison from "../components/landing/AnalysisComparison";
import SampleReport from "../components/landing/SampleReport";
import TrustSection from "../components/landing/TrustSection";
import FinalCTA from "../components/landing/FinalCTA";

function LandingPage() {
  return (
    <MainLayout>
      <Hero />
      <HowItWorks />
      <Features />
      <AnalysisComparison />
      <SampleReport />
      <TrustSection />
      <FinalCTA />
    </MainLayout>
  );
}

export default LandingPage;
