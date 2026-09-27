import { awards } from "@/lib/data";
import { AwardsList } from "@/components/awards";
import { Reveal, SectionHeading } from "@/components/ui";

export function AwardsSection() {
  return (
    <Reveal delay={0.16}>
      <section id="awards" className="py-10 scroll-mt-20">
        <SectionHeading title="Competitions & Awards" href="/awards" />
        <AwardsList awards={awards} />
      </section>
    </Reveal>
  );
}
