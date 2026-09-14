import { PageShell } from "@/components/layout";
import { PageIntro, Reveal } from "@/components/ui";
import { experiences } from "@/lib/data";

export default function ExperiencePage() {
  return (
    <PageShell><Reveal><PageIntro title="Experience" description="Where I've worked and what I did there." />
      <div className="mt-10 border-l border-neutral-800 pl-6">
        {experiences.map((experience) => <article key={experience.title} className="relative mb-12 before:absolute before:-left-[30px] before:top-1 before:h-3 before:w-3 before:rounded-full before:border-[3px] before:border-ink before:bg-neutral-100"><time className="font-mono text-[10px] text-neutral-500">{experience.date}</time><h2 className="mt-1 text-lg font-semibold">{experience.title}</h2><p className="text-xs text-neutral-300">{experience.company}</p><p className="text-xs text-neutral-400">{experience.location}</p><ul className="mt-4 list-disc space-y-3 pl-4 text-[13px] leading-6 text-neutral-400">{experience.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></article>)}
      </div>
    </Reveal></PageShell>
  );
}
