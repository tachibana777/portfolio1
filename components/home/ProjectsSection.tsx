import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { projects } from "@/lib/data";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal, SectionHeading } from "@/components/ui";

export function ProjectsSection() {
  return (
    <Reveal delay={0.14}>
      <section className="py-10">
        <SectionHeading title="Projects" />
        <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-950 shadow-sm transition hover:scale-[1.03] dark:bg-white dark:text-neutral-950"
          >
            <span>Explore Projects</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </Reveal>
  );
}
