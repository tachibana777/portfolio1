import {
  ActivitySection,
  CertificationsSection,
  ContactSection,
  EducationSection,
  ExperienceSection,
  HeroSection,
  OutsideSection,
  ProjectsSection,
  TechnologiesSection,
} from "@/components/home";
import { Footer, Header } from "@/components/layout";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-[min(100%-2rem,720px)] pt-12 sm:pt-16">
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <TechnologiesSection />
        <CertificationsSection />
        <EducationSection />
        <OutsideSection />
        <ActivitySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
