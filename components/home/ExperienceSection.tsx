import { experiences } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/ui";

export function ExperienceSection() {
  return (
    <Reveal delay={0.08}>
      <section className="py-8">
        <SectionHeading title="Experience" href="/experience" linkLabel="View Details" />
        <div className="space-y-6">
          {experiences.map((experience) => (
            <article key={experience.title} className="grid grid-cols-[115px_1fr] gap-4 text-xs leading-relaxed">
              <time className="font-mono text-[9px] text-neutral-500">{experience.date}</time>
              <div>
                <h3 className="text-[13px] font-semibold text-neutral-200">{experience.title}</h3>
                <p className="text-neutral-300">{experience.company}</p>
                <p className="text-neutral-500">{experience.location}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
