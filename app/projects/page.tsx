import { PageShell } from "@/components/layout";
import { ProjectCard } from "@/components/projects";
import { PageIntro, Reveal } from "@/components/ui";
import { projects } from "@/lib/data";

export default function ProjectsPage() {
  return <PageShell><Reveal><PageIntro title="Selected Projects" description="A collection of penetration tests, vulnerability assessments, and security write-ups focused on identifying flaws, demonstrating impact, and delivering remediation." /><div className="mt-10 grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2">{projects.map((project) => <ProjectCard key={project.title} project={project} />)}</div></Reveal></PageShell>;
}
