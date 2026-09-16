import { PageShell } from "@/components/layout";
import { PageIntro, Reveal } from "@/components/ui";
import { technologies, type TechnologyCategory } from "@/lib/technologies";

const categories: { key: TechnologyCategory; title: string; description: string }[] = [
  { key: "web", title: "Web Development", description: "Core technologies used to build modern web interfaces and applications." },
  { key: "development", title: "Development & Infrastructure", description: "Languages, databases, version control, and local development tooling." },
  { key: "security", title: "Pentesting & Security", description: "Fundamental tools used for reconnaissance, web testing, exploitation, and analysis." },
];

export default function TechnologiesPage() {
  return (
    <PageShell>
      <Reveal>
        <PageIntro title="Full Tech Stack" description="The development stack and foundational security tools I use for building, testing, and understanding web systems." />
        <div className="mt-12 space-y-12">
          {categories.map((category) => (
            <section key={category.key}>
              <h2 className="text-lg font-medium text-neutral-100">{category.title}</h2>
              <p className="mt-1 text-xs leading-5 text-neutral-500">{category.description}</p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {technologies.filter((technology) => technology.category === category.key).map((technology) => {
                  const Icon = technology.icon;
                  return <div key={technology.name} className="flex items-center gap-3 rounded-xl border border-dashed border-neutral-800 bg-panel px-4 py-3 text-xs text-neutral-300 transition hover:-translate-y-0.5 hover:border-neutral-600"><Icon aria-hidden size={16} style={{ color: technology.color }} /><span>{technology.name}</span></div>;
                })}
              </div>
            </section>
          ))}
        </div>
      </Reveal>
    </PageShell>
  );
}
