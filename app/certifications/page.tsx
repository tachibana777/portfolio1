import Image from "next/image";
import { PageShell } from "@/components/layout";
import { PageIntro, Reveal } from "@/components/ui";
import { certificates } from "@/lib/data";

export default function CertificationsPage() {
  return (
    <PageShell><Reveal><PageIntro title="Certifications" description="Professional credentials and specialized training in Cybersecurity, CTF, and offensive security." />
      <div className="mt-10 space-y-9">{certificates.map((certificate) => <article key={certificate.title} className="grid grid-cols-[90px_1fr] gap-5 text-xs leading-relaxed sm:grid-cols-[150px_1fr]"><time className="font-mono text-[10px] text-neutral-500">{certificate.date}</time><div><h2 className="text-base font-semibold">{certificate.title}</h2><p className="text-neutral-400">{certificate.issuer}</p><Image src={certificate.image} alt={certificate.title} width={70} height={48} className="mt-3 h-12 w-[70px] object-cover" /></div></article>)}</div>
    </Reveal></PageShell>
  );
}
