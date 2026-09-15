import { certificates } from "@/lib/data";
import { CertificateThumbnail } from "@/components/certifications";
import { Reveal, SectionHeading } from "@/components/ui";

export function CertificationsSection() {
  return (
    <Reveal delay={0.22}>
      <section className="pb-14 pt-12">
        <SectionHeading title="Certifications" href="/certifications" />
        <div className="space-y-9">
          {certificates.slice(0, 2).map((certificate) => (
            <article key={certificate.title} className="grid grid-cols-[92px_56px_1fr] items-start gap-5 sm:grid-cols-[110px_60px_1fr]">
              <time className="pt-1 font-mono text-[11px] text-neutral-500">{certificate.date}</time>
              <CertificateThumbnail src={certificate.image} title={certificate.title} />
              <div className="text-[13px] leading-6">
                <h3 className="text-sm font-semibold text-neutral-200">{certificate.title}</h3>
                <p className="text-neutral-400">{certificate.issuer}</p>
                <a href={certificate.image} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-[11px] text-neutral-500 underline-offset-4 transition hover:text-white hover:underline">View certificate</a>
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
        <div className="grid grid-cols-[110px_1fr] gap-6 text-[13px] leading-6 sm:grid-cols-[135px_1fr]">
          <time className="pt-0.5 font-mono text-[11px] text-neutral-500">2023–Present</time>
          <div>
            <h3 className="text-sm font-semibold text-neutral-200">Bachelor of Engineering in Computer Engineering</h3>
            <p className="text-neutral-400">Pibulsongkram Rajabhat University</p>
            <p className="text-neutral-500">Phitsanulok</p>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
