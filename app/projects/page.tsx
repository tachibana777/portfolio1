import { PageShell } from "@/components/layout";
import { ProjectList } from "@/components/projects";
import { PageIntro, Reveal } from "@/components/ui";
import { projects } from "@/lib/data";

export default function ProjectsPage() {
  return <PageShell><Reveal><PageIntro title="Selected Projects" description="A collection of penetration tests, vulnerability assessments, and security write-ups focused on identifying flaws, demonstrating impact, and delivering remediation." /><ProjectList projects={projects} /></Reveal></PageShell>;
}
