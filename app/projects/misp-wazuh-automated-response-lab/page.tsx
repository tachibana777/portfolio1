import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, ChevronLeft, FileArchive, Globe2, LockKeyhole, Shield, Timer } from "lucide-react";
import { PageShell } from "@/components/layout";
import { Reveal } from "@/components/ui";

export const metadata = {
  title: "MISP to Wazuh Endpoint Automated Response Lab | Kritsada Hongpatsa",
  description: "Wazuh Active Response lab for hash-based malware handling, IP blocking, evidence transfer, and DNS sinkholing.",
};

const responseTracks = [
  { title: "A. Malware response", icon: FileArchive, detail: "FIM detects a known SHA256, collects metadata and a password-protected archive, transfers evidence to the manager, verifies the archive hash, then removes the original." },
  { title: "B. Malicious IP blocking", icon: LockKeyhole, detail: "A MISP-listed source IP triggers an allowlist-aware iptables DROP rule on the endpoint with idempotency and a 600-second timeout." },
  { title: "C. Malicious domain sinkholing", icon: Globe2, detail: "A Suricata DNS request matching the response rule is written to /etc/hosts as 0.0.0.0 and removed after the timeout." },
];

export default function MispWazuhAutomatedResponseLabPage() {
  return (
    <PageShell>
      <Reveal>
        <div className="space-y-12 pb-16">
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-400 transition hover:text-white"><ChevronLeft size={14} /> Back to Projects</Link>

          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2"><span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-900/90 px-3 py-1 text-xs font-mono font-medium text-rose-400"><Shield size={12} /> Blue Team &amp; Automated Response</span><span className="rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs font-mono text-neutral-400">Personal Cybersecurity Home Lab</span></div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl md:text-5xl">MISP to Wazuh Endpoint Automated Response Lab</h1>
            <p className="text-lg font-light text-neutral-300 sm:text-xl">Hash-based Malware Response, Evidence Collection &amp; Transfer, IP Blocking and Domain Sinkholing</p>
            <div className="flex flex-wrap gap-2 pt-1">{["MISP 2.5.51", "Wazuh 4.14.9", "Suricata 8.0.8", "Active Response", "Ubuntu 24.04", "VMware"].map((tech) => <span key={tech} className="rounded-lg border border-neutral-800 bg-panel px-2.5 py-1 text-xs font-medium text-neutral-200">{tech}</span>)}</div>
          </header>

          <div className="grid grid-cols-1 gap-3 rounded-2xl border border-dashed border-neutral-800 bg-panel p-5 sm:grid-cols-2 md:grid-cols-4">{[{ label: "Manager", value: "CDB + response control · .144" }, { label: "Endpoint", value: "FIM + Suricata + response · .143" }, { label: "MISP", value: "IOC source · .142" }, { label: "Kali", value: "Controlled attacker · .145" }].map((item) => <div key={item.label}><span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">{item.label}</span><p className="mt-1 text-sm font-medium text-neutral-200">{item.value}</p></div>)}</div>

          <section className="space-y-4"><h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">1. Project Overview</h2><div className="space-y-3.5 text-sm font-light leading-relaxed text-neutral-300 sm:text-base"><p>This v2 lab builds on the MISP to Wazuh IOC detection project. The earlier version stopped at alerting; this version connects alerts to controlled, auditable response actions through Wazuh Active Response.</p><p>EICAR was used as the malware test sample instead of real malware. Every response has a scope limit, an allowlist or validation step, and a timeout where appropriate so the lab demonstrates automation without treating destructive actions as the default.</p></div></section>

          <section className="space-y-4"><h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">2. Response Workflows</h2><div className="grid gap-4 md:grid-cols-3">{responseTracks.map(({ title, icon: Icon, detail }) => <article key={title} className="rounded-2xl border border-neutral-800 bg-panel p-5"><Icon size={20} className="text-rose-400" /><h3 className="mt-4 font-semibold text-neutral-100">{title}</h3><p className="mt-3 text-sm leading-relaxed text-neutral-300">{detail}</p></article>)}</div></section>

          <section className="space-y-5"><h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">3. Malware Evidence Chain</h2><div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5 font-mono text-xs leading-8 text-neutral-300 sm:text-sm"><p>FIM <span className="text-rose-400">-&gt;</span> rule 100200 <span className="text-rose-400">-&gt;</span> collect-and-remove.sh</p><p>SHA256 <span className="text-rose-400">-&gt;</span> metadata.json + sample.zip <span className="text-rose-400">-&gt;</span> SCP to manager</p><p>remote hash verification <span className="text-rose-400">-&gt;</span> delete original only after success</p></div><div className="grid gap-3 sm:grid-cols-2"><div className="flex gap-2 rounded-xl border border-neutral-800 bg-panel p-4 text-sm text-neutral-300"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-400" size={16} />EICAR was detected by SHA256, not by filename or path.</div><div className="flex gap-2 rounded-xl border border-neutral-800 bg-panel p-4 text-sm text-neutral-300"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-400" size={16} />Evidence was verified on the separate manager before removal.</div></div></section>

          <section className="space-y-4"><h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">4. Results &amp; Evidence</h2><div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]"><div className="space-y-3 text-sm leading-relaxed text-neutral-300"><p className="flex gap-2"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-400" size={16} />The EICAR sample was archived, transferred, hash-checked, and removed while a benign file remained in place.</p><p className="flex gap-2"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-400" size={16} />The MISP-listed Kali IP was blocked with an iptables DROP rule and repeated flows were throttled with <code className="text-rose-300">ignore=&quot;300&quot;</code>.</p><p className="flex gap-2"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-400" size={16} />The test domain was sinkholed to <code className="text-rose-300">0.0.0.0</code> and the hosts entry was removed after the timeout.</p></div><div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950"><Image src="/events/misp-jobs-server1.png" alt="MISP and Wazuh lab evidence" width={1200} height={700} className="h-full w-full object-cover" /></div></div></section>

          <section className="space-y-4"><h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">5. Safety Controls</h2><div className="grid gap-3 sm:grid-cols-3">{[{ title: "Scope", text: "Refuse paths outside the monitored malware directory and validate IPv4/domain input." }, { title: "Allowlist", text: "Protect infrastructure, manager, endpoint, MISP, gateway, and other lab addresses." }, { title: "Timeout", text: "Remove temporary blocks and sinkhole entries after 600 seconds." }].map((item) => <div key={item.title} className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-4"><Timer size={17} className="text-amber-400" /><h3 className="mt-3 font-semibold text-neutral-100">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-neutral-300">{item.text}</p></div>)}</div></section>

          <section className="rounded-2xl border border-amber-900/50 bg-amber-950/20 p-5"><h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-100"><AlertTriangle size={18} className="text-amber-400" /> Scope &amp; Limitations</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-300"><li>The hash list contains the EICAR test hash; real malware was not used.</li><li>Domain sinkholing is a lab demonstration using one test domain; production should use DNS RPZ or a dedicated resolver.</li><li>The evidence SSH key and local evidence copy still need production hardening and lifecycle controls.</li><li>Shuffle was installed but paused, so approval workflows and enrichment remain future work.</li></ul></section>

          <div className="flex items-center justify-between border-t border-neutral-800/80 pt-6"><Link href="/projects" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-400 transition hover:text-white"><ChevronLeft size={14} /> All Projects</Link><Link href="/" className="text-xs font-mono uppercase tracking-widest text-neutral-400 transition hover:text-white">Home</Link></div>
        </div>
      </Reveal>
    </PageShell>
  );
}
