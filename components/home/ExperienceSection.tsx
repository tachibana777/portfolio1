import { experiences } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/ui";

export function ExperienceSection() {
  return (
    <Reveal delay={0.08}>
      <section className="py-10">
        <SectionHeading title="Experience" href="/experience" linkLabel="View Details" />
        <div className="space-y-6">
          {experiences.map((experience) => (
            <article key={experience.title} className="sm:grid sm:grid-cols-[160px_1fr] sm:gap-6">
              <time className="text-xs font-medium text-neutral-400 whitespace-nowrap mb-1 sm:mb-0 sm:pt-1">{experience.date}</time>
              <div>
                <h3 className="text-base sm:text-[17px] font-semibold text-neutral-100 leading-tight">{experience.title}</h3>
                <p className="mt-1 text-sm font-medium text-neutral-300">{experience.company}</p>
                <p className="mt-0.5 text-sm text-neutral-400">{experience.location}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
