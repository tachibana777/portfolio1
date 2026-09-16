import { Marquee, Reveal, SectionHeading } from "@/components/ui";
import { technologies, type Technology, type TechnologyCategory } from "@/lib/technologies";

const rowSettings = [
  { category: "web" as TechnologyCategory, title: "Web Development", direction: "left" as const, duration: 30 },
  { category: "development" as TechnologyCategory, title: "Development & Infrastructure", direction: "right" as const, duration: 40 },
  { category: "security" as TechnologyCategory, title: "Pentesting & Security", direction: "left" as const, duration: 35 },
] as const;

function TechnologyPill({ technology }: Readonly<{ technology: Technology }>) {
  const Icon = technology.icon;

  return (
    <span className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-dashed border-neutral-800 bg-neutral-900/50 px-3 py-2 text-xs text-neutral-300 transition-colors hover:border-neutral-600 hover:bg-neutral-900">
      <Icon aria-hidden size={13} style={{ color: technology.color }} />
      {technology.name}
    </span>
  );
}

export function TechnologiesSection() {
  return (
    <Reveal delay={0.18}>
      <section className="py-10">
        <SectionHeading title="Technologies" href="/technologies" />
        <div className="space-y-5">
          {rowSettings.map((settings) => (
            <div key={settings.category}>
              <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-neutral-500">{settings.title}</h3>
              <Marquee
                direction={settings.direction}
                duration={settings.duration}
                className="[mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]"
              >
                {technologies.filter((technology) => technology.category === settings.category).map((technology) => <TechnologyPill key={technology.name} technology={technology} />)}
              </Marquee>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
