import { AwardsList } from "@/components/awards";
import { PageShell } from "@/components/layout";
import { PageIntro, Reveal } from "@/components/ui";
import { awards } from "@/lib/data";

export default function AwardsPage() {
  return (
    <PageShell>
      <Reveal>
        <PageIntro
          title="Competitions & Awards"
          description="Honors, hackathons, startup competitions, and national cybersecurity challenges."
        />
        <div className="mt-8">
          <AwardsList awards={awards} />
        </div>
      </Reveal>
    </PageShell>
  );
}
