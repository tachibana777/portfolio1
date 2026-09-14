import { CertificateList } from "@/components/certifications";
import { PageShell } from "@/components/layout";
import { PageIntro, Reveal } from "@/components/ui";
import { certificates } from "@/lib/data";

export default function CertificationsPage() {
  return (
    <PageShell><Reveal><PageIntro title="Certifications" description="Professional credentials and specialized training in Cybersecurity, CTF, and offensive security." />
      <CertificateList certificates={certificates} />
    </Reveal></PageShell>
  );
}
