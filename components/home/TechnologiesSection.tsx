import { Marquee, Reveal, SectionHeading } from "@/components/ui";
import { technologies, type Technology } from "@/lib/technologies";

const rowSettings = [
  { direction: "left" as const, duration: 30 },
  { direction: "right" as const, duration: 40 },
  { direction: "left" as const, duration: 35 },
];

function splitIntoRows(items: Technology[], rowCount: number) {
  const rowSize = Math.ceil(items.length / rowCount);
  return Array.from({ length: rowCount }, (_, index) => items.slice(index * rowSize, (index + 1) * rowSize));
}

function TechnologyPill({ technology }: Readonly<{ technology: Technology }>) {
  const Icon = technology.icon;

  return (
    <span className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-dashed border-neutral-800 bg-neutral-900/50 px-3 py-1.5 text-[10px] text-neutral-300 transition-colors hover:border-neutral-600 hover:bg-neutral-900">
      <Icon aria-hidden size={13} style={{ color: technology.color }} />
      {technology.name}
    </span>
  );
}

export function TechnologiesSection() {
  const rows = splitIntoRows(technologies, rowSettings.length);

  return (
    <Reveal delay={0.18}>
      <section className="py-8">
        <SectionHeading title="Technologies" />
        <div className="space-y-2.5">
          {rows.map((row, index) => (
            <Marquee
              key={rowSettings[index].duration}
              direction={rowSettings[index].direction}
              duration={rowSettings[index].duration}
              className="[mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]"
            >
              {row.map((technology) => <TechnologyPill key={technology.name} technology={technology} />)}
            </Marquee>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
