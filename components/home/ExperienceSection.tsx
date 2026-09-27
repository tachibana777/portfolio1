import { experiences } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/ui";

export function ExperienceSection() {
  return (
    <Reveal delay={0.08}>
      <section className="py-10">
        <SectionHeading title="Experience" href="/experience" linkLabel="View Details" />
        <div className="space-y-6">
          {experiences.map((experience) => (
            <article key={experience.title} className="grid grid-cols-[110px_1fr] gap-5 text-sm sm:text-[15px] leading-relaxed sm:grid-cols-[140px_1fr]">
              <time className="pt-0.5 font-mono text-xs sm:text-[13px] text-neutral-400">{experience.date}</time>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-neutral-100">{experience.title}</h3>
                <p className="mt-0.5 text-sm sm:text-[15px] text-neutral-300">{experience.company}</p>
                <p className="text-xs sm:text-sm text-neutral-400">{experience.location}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
