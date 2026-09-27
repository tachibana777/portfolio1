import { PageShell } from "@/components/layout";
import { PageIntro, Reveal } from "@/components/ui";
import { experiences } from "@/lib/data";

export default function ExperiencePage() {
  return (
    <PageShell><Reveal><PageIntro title="Experience" description="Where I've worked and what I did there." />
      <div className="mt-10 border-l border-neutral-800 pl-6">
        {experiences.map((experience) => (
          <article key={experience.title} className="relative mb-14 before:absolute before:-left-[30px] before:top-1.5 before:h-3 before:w-3 before:rounded-full before:border-[3px] before:border-ink before:bg-neutral-100">
            <time className="font-mono text-xs sm:text-[13px] text-neutral-400">{experience.date}</time>
            <h2 className="mt-2 text-xl font-semibold text-neutral-100">{experience.title}</h2>
            <p className="mt-1 text-sm sm:text-base text-neutral-300">{experience.company}</p>
            <p className="text-xs sm:text-sm text-neutral-400">{experience.location}</p>
            <ul className="mt-5 list-disc space-y-3 pl-4 text-sm sm:text-[15px] leading-relaxed text-neutral-300">
              {experience.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Reveal></PageShell>
  );
}
