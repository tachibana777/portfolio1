import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/data";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal, SectionHeading } from "@/components/ui";

export function ProjectsSection() {
  return (
    <Reveal delay={0.14}>
      <section className="py-10">
        <SectionHeading title="Projects" />
        <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
        </div>
        <div className="text-center">
          <Link href="/projects" className="mt-6 inline-flex items-center gap-3 rounded bg-neutral-100 px-4 py-2.5 text-xs font-semibold text-black transition hover:-translate-y-0.5">
            Explore Projects
            <ArrowRight size={12} />
          </Link>
        </div>
      </section>
    </Reveal>
  );
}
