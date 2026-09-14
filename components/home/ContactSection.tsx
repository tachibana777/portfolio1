import { Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/ui";

const contactLinks = [
  { href: "mailto:kritsada1324@gmail.com", label: "kritsada1324@gmail.com", icon: Mail },
  { href: "tel:+66821493025", label: "+66 82 149 3025", icon: Phone },
] as const;

export function ContactSection() {
  return (
    <Reveal>
      <section id="contact" className="grid gap-8 py-10 sm:grid-cols-[1fr_280px]">
        <div><h2 className="section-title">Let&apos;s work together.</h2><p className="mt-3 text-xs leading-6 text-neutral-400">Available for a Penetration Testing internship or co-op program. Focused on Web & API Security, Vulnerability Assessments, and Offensive Security.</p></div>
        <div className="space-y-2">
          {contactLinks.map(({ href, label, icon: Icon }) => <a key={href} href={href} className="flex items-center gap-3 rounded-lg border border-blue-950 bg-blue-950/20 p-3 text-[11px] text-blue-200 transition hover:border-blue-800"><Icon size={15} /><span>{label}</span></a>)}
        </div>
      </section>
    </Reveal>
  );
}
