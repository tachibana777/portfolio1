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
            <article key={certificate.title} className="grid grid-cols-[92px_56px_1fr] items-start gap-5 sm:grid-cols-[120px_64px_1fr]">
              <time className="pt-1 font-mono text-xs sm:text-[13px] text-neutral-400">{certificate.date}</time>
              <CertificateThumbnail src={certificate.image} title={certificate.title} width={64} height={52} className="h-13 w-16" />
              <div className="text-sm sm:text-[15px] leading-relaxed">
                <h3 className="text-base sm:text-lg font-semibold text-neutral-100">{certificate.title}</h3>
                <p className="mt-0.5 text-sm sm:text-[15px] text-neutral-300">{certificate.issuer}</p>
                <a href={certificate.image} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-block text-xs sm:text-sm text-neutral-400 underline-offset-4 transition hover:text-white hover:underline">View certificate</a>
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
        <div className="grid grid-cols-[110px_1fr] gap-6 text-sm sm:text-[15px] leading-relaxed sm:grid-cols-[140px_1fr]">
          <time className="pt-0.5 font-mono text-xs sm:text-[13px] text-neutral-400">2023–Present</time>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-neutral-100">Bachelor of Engineering in Computer Engineering</h3>
            <p className="mt-0.5 text-sm sm:text-[15px] text-neutral-300">Pibulsongkram Rajabhat University</p>
            <p className="text-xs sm:text-sm text-neutral-400">Phitsanulok</p>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
