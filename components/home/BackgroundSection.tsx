import Image from "next/image";
import { certificates } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/ui";

export function CertificationsSection() {
  return (
    <Reveal delay={0.22}>
      <section className="py-8">
        <SectionHeading title="Certifications" href="/certifications" />
        <div className="space-y-6">
          {certificates.slice(0, 2).map((certificate) => (
            <article key={certificate.title} className="grid grid-cols-[100px_46px_1fr] items-start gap-4">
              <time className="font-mono text-[9px] text-neutral-500">{certificate.date}</time>
              <Image src={certificate.image} alt="" width={42} height={34} className="h-9 w-11 object-cover" />
              <div className="text-xs leading-relaxed">
                <h3 className="font-semibold text-neutral-200">{certificate.title}</h3>
                <p className="text-neutral-400">{certificate.issuer}</p>
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
      <section className="py-8">
        <SectionHeading title="Education" />
        <div className="grid grid-cols-[115px_1fr] gap-4 text-xs leading-relaxed">
          <time className="font-mono text-[9px] text-neutral-500">2023–Present</time>
          <div>
            <h3 className="text-[13px] font-semibold text-neutral-200">Bachelor of Engineering in Computer Engineering</h3>
            <p className="text-neutral-400">Pibulsongkram Rajabhat University</p>
            <p className="text-neutral-500">Phitsanulok</p>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
