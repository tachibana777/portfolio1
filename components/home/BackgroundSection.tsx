import { certificates } from "@/lib/data";
import { CertificateThumbnail } from "@/components/certifications";
import { Reveal, SectionHeading } from "@/components/ui";

export function CertificationsSection() {
  return (
    <Reveal delay={0.22}>
      <section className="pb-14 pt-12">
        <SectionHeading title="Certifications" href="/certifications" />
        <div className="space-y-6">
          {certificates.slice(0, 2).map((certificate) => (
            <article key={certificate.title} className="grid gap-3 sm:grid-cols-[72px_96px_1fr] sm:items-center sm:gap-4">
              <time className="self-center text-xs font-medium text-neutral-400">{certificate.date}</time>
              <CertificateThumbnail src={certificate.image} title={certificate.title} width={96} height={64} className="h-16 w-24 rounded-md border border-neutral-800" />
              <div className="min-w-0 self-center">
                <h3 className="text-base font-semibold leading-tight text-neutral-100">{certificate.title}</h3>
                <p className="mt-0.5 text-sm text-neutral-400">{certificate.issuer}</p>
                <a href={certificate.image} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-widest text-neutral-400 transition-colors hover:text-white">
                  View certificate ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

export function EducationSection() {
  return (
    <Reveal>
      <section className="border-t border-dashed border-neutral-800 pb-14 pt-14">
        <SectionHeading title="Education" />
        <div className="sm:grid sm:grid-cols-[160px_1fr] sm:gap-6">
          <time className="text-xs font-medium text-neutral-400 whitespace-nowrap mb-1 sm:mb-0 sm:pt-1">2023–Present</time>
          <div>
            <h3 className="text-base sm:text-[17px] font-semibold text-neutral-100 leading-tight">Bachelor of Engineering in Computer Engineering</h3>
            <p className="mt-1 text-sm font-medium text-neutral-300">Pibulsongkram Rajabhat University</p>
            <p className="mt-0.5 text-sm text-neutral-400">Phitsanulok</p>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
