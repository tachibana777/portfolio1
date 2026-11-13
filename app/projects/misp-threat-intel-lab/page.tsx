import { ZoomImage } from "@/components/ui/ZoomImage";
import Link from "next/link";
import {
  ChevronLeft,
  Shield,
  Server,
  Users,
  Network,
  CheckCircle2,
  AlertTriangle,
  Key,
  Globe,
  Database,
  Lock,
  RefreshCw,
  Rss,
  Radar,
} from "lucide-react";
import { SiUbuntu, SiVmware } from "react-icons/si";
import { PageShell } from "@/components/layout";
import { Reveal } from "@/components/ui";
import { ReadFirst, SeriesNav } from "@/components/projects/ReadFirst";

export const metadata = {
  title: "MISP Threat Intelligence Sharing Lab | Kritsada Hongpatsa",
  description:
    "Two MISP nodes that share indicators, then feed Wazuh to detect a known-bad IP from Suricata data.",
};

const code = "rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-amber-400";
const pre =
  "mt-2 overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950 p-3 font-mono text-xs text-emerald-400";

function Shot({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <div className="space-y-2">
      <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">{label}</span>
      <div className="overflow-hidden rounded-xl border border-neutral-800">
        <ZoomImage src={src} alt={alt} width={1440} height={800} className="w-full object-cover" />
      </div>
    </div>
  );
}

export default function MispLabPage() {
  return (
    <PageShell>
      <Reveal>
        <div className="space-y-12 pb-16">
          {/* Top Navigation */}
          <div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-400 transition hover:text-white"
            >
              <ChevronLeft size={14} />
              Back to Projects
            </Link>
          </div>

          {/* Header Title & Badges */}
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-900/90 px-3 py-1 text-xs font-mono font-medium text-sky-400">
                <Shield size={12} />
                Blue Team &amp; Threat Intelligence
              </span>
              <span className="rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs font-mono text-neutral-400">
                Personal Cybersecurity Home Lab
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl md:text-5xl">
              MISP Threat Intelligence Sharing Lab
            </h1>
            <p className="text-lg font-light text-neutral-300 sm:text-xl">
              Two MISP nodes that share indicators, then feed Wazuh to detect a known-bad IP from Suricata data
            </p>

            {/* Tech Badges Row */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-panel px-2.5 py-1 text-xs font-medium text-neutral-200">
                <Shield className="text-[#2596cd]" size={14} />
                MISP 2.5.51
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-panel px-2.5 py-1 text-xs font-medium text-neutral-200">
                <Radar className="text-sky-400" size={14} />
                Wazuh 4.14.9
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-panel px-2.5 py-1 text-xs font-medium text-neutral-200">
                <Network className="text-emerald-400" size={13} />
                Suricata 8.0.8
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-panel px-2.5 py-1 text-xs font-medium text-neutral-200">
                <SiUbuntu className="text-[#e95420]" size={14} />
                Ubuntu 24.04 · Kali
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-panel px-2.5 py-1 text-xs font-medium text-neutral-200">
                <SiVmware className="text-[#0284c7]" size={14} />
                VMware
              </span>
            </div>
          </header>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-1 gap-3 rounded-2xl border border-dashed border-neutral-800 bg-panel p-5 sm:grid-cols-2 md:grid-cols-3">
            {[
              ["Environment", "VMware (private lab)"],
              ["Server 1 (NCSA)", "Ubuntu 24.04.5 (192.168.136.142)"],
              ["Server 2 (ORGNAME)", "Ubuntu 24.04.5 (192.168.136.143)"],
              ["Platform", "MISP 2.5.51"],
              ["Detection Stack", "Wazuh 4.14.9 · Suricata 8.0.8"],
              ["Key Features", "RBAC · Sync · TLP · MITRE ATT&CK · IOC Detection"],
            ].map(([label, value]) => (
              <div key={label}>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">{label}</span>
                <p className="mt-1 text-sm font-medium text-neutral-200">{value}</p>
              </div>
            ))}
          </div>

          <p className="-mt-6 text-xs font-light text-neutral-400 sm:text-sm">
            The VM at 192.168.136.143 was a second MISP server (organisation ORGNAME) in Lab 1 and became the protected endpoint (<code className={code}>misp-endpoint</code>) in Lab 2.
          </p>

          <SeriesNav current="/projects/misp-threat-intel-lab" />

          <ReadFirst
            part="MISP"
            intro={[
              ["What this part is", "MISP is the intelligence layer. It stores indicators of compromise (bad IPs, domains, file hashes) with context, and shares them between organisations. It never looks at your hosts or traffic, so on its own it detects nothing."],
              ["The plan", "Two halves. Lab 1: two MISP servers (organisations NCSA and ORGNAME) share events, so you learn organisations, roles, sync, feeds, TLP and MITRE tags. Lab 2: a script pulls IPs out of MISP, cleans them, and loads them into Wazuh as a list. Suricata on the endpoint supplies traffic; a rule matches it against the list."],
            ]}
            image={{ src: "/events/diagram-02-misp-pipeline.png", alt: "MISP to alert pipeline", width: 1568, height: 318 }}
            afterImage={[
              ["How it differs from the other parts", "MISP knows what is bad; Wazuh (this part's second half) sees what happens; EDR acts on one host; XDR correlates; SOAR decides. Without MISP the later parts have nothing to match against."],
              ["How it works with them", <>The same MISP also feeds the hash list (<Link href="/projects/wazuh-edr-lab" className="text-sky-300 hover:underline">EDR page</Link>), the domain list and the correlation rules (<Link href="/projects/wazuh-xdr-lab" className="text-sky-300 hover:underline">XDR page</Link>), and answers Shuffle&apos;s &quot;is this IP known?&quot; question (<Link href="/projects/wazuh-soar-lab" className="text-sky-300 hover:underline">SOAR page</Link>).</>],
              ["Note", "The VM at 192.168.136.143 was the second MISP server in Lab 1 and became the protected endpoint in Lab 2 (it still runs apache2, mariadb and redis from that time)."],
              ["Prepare", "misp-intel: Ubuntu 24.04.5, 2 vCPU, 1.9 GB RAM, 96 GB disk, MISP 2.5.51 (1,682 events on 13 Nov 2026). Plus wazuh-manager, misp-endpoint and Kali."],
            ]}
            checklist={[
              "Two MISP nodes synchronise",
              "A script pulls IPs (to_ids, published, warning list on, last 30 days) and cleans them",
              "misp_badip list exists on the Manager (1,000 sampled IPs + one test IP)",
              "Ping from Kali raises rule 100100 (level 12) on the dashboard",
            ]}
            learn={'Filtering matters: 39,785 IP attributes were flagged in MISP, 37,005 survived the script\'s filters, and only a random 1,000 went into the list. Rule 100100 fired 1,115 times between 6 and 12 Nov; it now has ignore="300" (one alert per five minutes, all IPs together).'}
            limits="Lists are scheduled every six hours by cron; the hash log shows one run per day at 06:00 UTC."
          />

          <div className="h-px w-full bg-neutral-800/80" />

          {/* 1. Project Overview */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">1. Project Overview</h2>
            <div className="space-y-3.5 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <p>
                MISP (Malware Information Sharing Platform) is the intelligence layer of the whole MISP → Wazuh Threat Intelligence, EDR and XDR home lab (private VMware lab; nodes: MISP .142, Wazuh Manager .144, Endpoint .143, Kali .145). Secrets are never printed.
              </p>
              <p>This part has two halves:</p>
              <ul className="list-disc space-y-2 pl-5 text-neutral-300">
                <li>
                  <strong className="font-semibold text-neutral-100">Lab 1 (sections 5 to 11):</strong> deploy two MISP nodes and make them share events, to learn organisations, roles, synchronisation, feeds and classification.
                </li>
                <li>
                  <strong className="font-semibold text-neutral-100">Lab 2 (section 12):</strong> pull indicators out of MISP, clean them, and let Wazuh match them against live network data from Suricata.
                </li>
              </ul>
              <p>
                The rest of the series: <Link href="/projects/wazuh-edr-lab" className="text-sky-300 hover:underline">the EDR page</Link>, <Link href="/projects/wazuh-xdr-lab" className="text-sky-300 hover:underline">the XDR page</Link> and <Link href="/projects/wazuh-soar-lab" className="text-sky-300 hover:underline">the SOAR page</Link>, or <Link href="/projects/start-here" className="text-sky-300 hover:underline">start here</Link>.
              </p>
              <h3 className="pt-2 font-semibold text-neutral-100">What to prepare</h3>
              <div className="overflow-x-auto rounded-xl border border-neutral-800">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="border-b border-neutral-800 bg-neutral-900/80 font-mono text-xs uppercase tracking-wider text-neutral-400">
                    <tr><th className="px-4 py-3 font-medium">VM</th><th className="px-4 py-3 font-medium">Role</th><th className="px-4 py-3 font-medium">OS</th><th className="px-4 py-3 font-medium">vCPU</th><th className="px-4 py-3 font-medium">RAM</th><th className="px-4 py-3 font-medium">Disk</th></tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80 text-neutral-300 font-light">
                    {[
                      ["misp-intel", "MISP", "Ubuntu 24.04.5", "2", "1.9 GB", "96 GB"],
                      ["wazuh-manager", "Wazuh server, rules, API, dashboard", "Ubuntu 24.04.5", "4", "7.7 GB", "77 GB"],
                      ["misp-endpoint", "Protected host: agent, Suricata, auditd, scripts", "Ubuntu 24.04.5", "2", "1.9 GB", "96 GB"],
                      ["Kali", "Attacker", "Kali Linux", "not recorded", "not recorded", "not recorded"],
                    ].map((row) => (
                      <tr key={row[0]} className="hover:bg-neutral-900/30">
                        <td className="px-4 py-2.5 font-mono text-sky-300">{row[0]}</td>
                        {row.slice(1).map((c, i) => <td key={i} className="px-4 py-2.5">{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>MISP 2.5.51 held 1,682 events on 13 November 2026. MISP ran on 1.9 GB RAM, which is small; give it more if it is slow.</p>
              <h3 className="pt-2 font-semibold text-neutral-100">Why this design</h3>
              <p>MISP stores intelligence and detects nothing; the Manager turns it into lists; Suricata and the agent supply the events that the lists are matched against. Both lists (hashes and IPs) are rebuilt by cron, scheduled every six hours (<code className={code}>0 */6</code> for hashes, <code className={code}>10 */6</code> for IPs). The hash log (<code className={code}>/var/log/misp-hashes.log</code>) shows one run per day, at 06:00 UTC, on 11, 12 and 13 November; why the other runs are absent was not checked.</p>
              <Shot
                src="/events/misp-hash-cron.png"
                alt="Manager terminal: the last three hash import runs at 06:00 UTC on 11, 12 and 13 November and the two cron lines scheduled every six hours"
                label="Hash import log and cron lines, 13 November 2026"
              />
            </div>

            <h3 className="pt-2 font-semibold text-neutral-100">What MISP is, and what it is not</h3>
            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-neutral-800 bg-neutral-900/80 font-mono text-xs uppercase tracking-wider text-neutral-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">MISP is</th>
                    <th className="px-4 py-3 font-medium">MISP is not</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80 text-neutral-300 font-light">
                  {[
                    ["A store and sharing hub for indicators (IPs, domains, hashes, URLs) with context: tags, TLP, threat level", "A detector. It never looks at your hosts or your traffic"],
                    ["Able to push and pull events between organisations", "An alerting system. Alerts come from Wazuh once the indicators are loaded there"],
                    ["Searchable through a REST API (restSearch)", "A response tool. Blocking and deleting are done by the EDR part"],
                  ].map(([a, b]) => (
                    <tr key={a} className="hover:bg-neutral-900/30">
                      <td className="px-4 py-2.5">{a}</td>
                      <td className="px-4 py-2.5">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 2. Project Objectives */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">2. Project Objectives</h2>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {[
                "Deploy MISP on two Ubuntu 24.04.5 virtual machines.",
                "Configure role-based access control (Admin, Sync User, Org Admin).",
                "Set up organisations for multi-organisation sharing.",
                "Create Sync User accounts with API-key authentication.",
                "Establish bidirectional server synchronisation (push and pull).",
                "Verify the connection and monitor sync jobs.",
                "Review feed sources and their enabled and cache status.",
                "Understand TLP classification.",
                "Browse and manage events tagged with MITRE ATT&CK.",
                "Pull indicators through the REST API (restSearch) and clean them before use.",
                "Build a Wazuh CDB list and a rule that matches it.",
                "Use Suricata as the network sensor and confirm the alert after a simulated attack from Kali.",
              ].map((obj, i) => (
                <div key={i} className="flex items-start gap-2.5 rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-3">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-sky-400" />
                  <span className="text-xs sm:text-sm font-light text-neutral-300">{obj}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Lab Architecture */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">3. Lab Architecture</h2>
            <p className="text-sm font-light text-neutral-300 sm:text-base">
              Lab 1 uses two MISP nodes simulating inter-organisation threat intelligence sharing:
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-dashed border-neutral-800 bg-panel p-4">
                <div className="flex items-center gap-2">
                  <Server className="text-sky-400" size={18} />
                  <h3 className="font-semibold text-neutral-100">3.1 Server 1 — NCSA</h3>
                </div>
                <span className="mt-1 block font-mono text-[11px] text-neutral-500">MISP Node · 192.168.136.142</span>
                <p className="mt-2.5 text-xs sm:text-[13px] font-light text-neutral-300">
                  Primary MISP. Later also the indicator source for Wazuh.
                </p>
              </div>

              <div className="rounded-2xl border border-dashed border-neutral-800 bg-panel p-4">
                <div className="flex items-center gap-2">
                  <Server className="text-emerald-400" size={18} />
                  <h3 className="font-semibold text-neutral-100">3.2 Server 2 — ORGNAME</h3>
                </div>
                <span className="mt-1 block font-mono text-[11px] text-neutral-500">MISP Node · 192.168.136.143</span>
                <p className="mt-2.5 text-xs sm:text-[13px] font-light text-neutral-300">
                  Secondary MISP. This VM later became the Wazuh endpoint.
                </p>
              </div>
            </div>

            {/* Architecture Flow Box */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
              <span className="text-xs font-mono font-medium uppercase tracking-wider text-neutral-400">
                Synchronization Flow
              </span>
              <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs text-neutral-200">
                <span className="rounded bg-neutral-800 px-2 py-1 flex items-center gap-1.5">
                  <Server className="text-sky-400" size={13} /> Server 1 (NCSA)
                </span>
                <span className="text-neutral-500">⇄</span>
                <span className="rounded bg-neutral-800 px-2 py-1 flex items-center gap-1.5">
                  <Key className="text-amber-400" size={13} /> API Key Auth
                </span>
                <span className="text-neutral-500">⇄</span>
                <span className="rounded bg-neutral-800 px-2 py-1 flex items-center gap-1.5">
                  <Server className="text-emerald-400" size={13} /> Server 2 (ORGNAME)
                </span>
                <span className="text-neutral-500">→</span>
                <span className="rounded bg-neutral-800 px-2 py-1">Push &amp; Pull Sync</span>
                <span className="text-neutral-500">→</span>
                <span className="rounded bg-sky-950/70 text-sky-300 border border-sky-800/60 px-2 py-1 flex items-center gap-1.5">
                  <Globe size={13} /> Shared Threat Events
                </span>
              </div>
            </div>

            {/* Lab 2 flow */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
              <span className="text-xs font-mono font-medium uppercase tracking-wider text-neutral-400">
                Lab 2 Detection Flow
              </span>
              <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs text-neutral-200">
                <span className="rounded bg-neutral-800 px-2 py-1 flex items-center gap-1.5">
                  <Shield className="text-sky-400" size={13} /> MISP (.142)
                </span>
                <span className="text-neutral-500">→ restSearch →</span>
                <span className="rounded bg-neutral-800 px-2 py-1 flex items-center gap-1.5">
                  <Radar className="text-amber-400" size={13} /> Wazuh Manager (.144)
                </span>
                <span className="text-neutral-500">→</span>
                <span className="rounded bg-neutral-800 px-2 py-1">CDB misp_badip</span>
                <span className="text-neutral-500">→</span>
                <span className="rounded bg-neutral-800 px-2 py-1">Rule 100100</span>
                <span className="text-neutral-500">→</span>
                <span className="rounded bg-sky-950/70 text-sky-300 border border-sky-800/60 px-2 py-1">Alert</span>
              </div>
              <p className="mt-3 font-mono text-[11px] text-neutral-500">
                Endpoint (.143): Suricata eve.json → Wazuh agent ◄ ping / nmap ◄ Kali (.145)
              </p>
            </div>
          </section>

          {/* 4. Tools and Technologies */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">4. Tools and Technologies</h2>
            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-neutral-800 bg-neutral-900/80 font-mono text-xs uppercase tracking-wider text-neutral-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Tool / Technology</th>
                    <th className="px-4 py-3 font-medium">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80 text-neutral-300 font-light">
                  {[
                    [<Shield key="i" className="text-[#2596cd]" size={16} />, "MISP 2.5.51", "Threat intelligence sharing platform and IOC source"],
                    [<Radar key="i" className="text-sky-400" size={16} />, "Wazuh 4.14.9", "Manager that loads the CDB list and raises alerts (rule 100100)"],
                    [<Network key="i" className="text-emerald-400" size={16} />, "Suricata 8.0.8", "Network sensor on the endpoint, 53,376 Emerging Threats Open rules loaded"],
                    [<SiUbuntu key="i" className="text-[#e95420]" size={16} />, "Ubuntu 24.04 · Kali", "Host operating systems; Kali is the attack simulator"],
                    [<SiVmware key="i" className="text-[#0284c7]" size={16} />, "VMware", "Virtualized lab environment"],
                    [<Rss key="i" className="text-[#f97316]" size={16} />, "OSINT Feeds", "CIRCL, Phishtank, Tor nodes, Snort, cybercrime-tracker, and more"],
                    [<AlertTriangle key="i" className="text-[#ef4444]" size={16} />, "MITRE ATT&CK", "Adversary technique tagging and galaxy cluster classification"],
                    [<Lock key="i" className="text-[#eab308]" size={16} />, "TLP (Traffic Light Protocol)", "Data classification for sharing boundaries"],
                  ].map(([icon, name, role]) => (
                    <tr key={name as string} className="hover:bg-neutral-900/30">
                      <td className="px-4 py-2.5 font-medium text-neutral-200">
                        <div className="flex items-center gap-2">
                          {icon}
                          <span>{name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5">{role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Installation & Setup */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">5. Installation &amp; Setup</h2>
            <div className="space-y-4 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <div>
                <h3 className="font-semibold text-neutral-100">5.1 Virtual Machine Setup</h3>
                <p className="mt-1">
                  Deploy two Ubuntu 24.04.5 VMs in VMware. Give them <code className={code}>192.168.136.142</code> and <code className={code}>192.168.136.143</code>.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-100">5.2 MISP Installation</h3>
                <p className="mt-1">On each one run the official installer:</p>
                <div className={pre}>
                  <code>curl -fsSL https://raw.githubusercontent.com/MISP/MISP/refs/heads/2.5/INSTALL/INSTALL.ubuntu2404.sh | bash -s</code>
                </div>
                <p className="mt-2">
                  The installer writes the default admin credentials to <code className={code}>/root/misp_settings.txt</code>. Open <code className={code}>https://&lt;server_ip&gt;/users/login</code>. The certificate is self-signed, so the browser warns; that is expected in a private lab.
                </p>
              </div>
            </div>
          </section>

          {/* 6. User & Organization Management */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">6. User &amp; Organization Management</h2>
            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-neutral-800 bg-neutral-900/80 font-mono text-xs uppercase tracking-wider text-neutral-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Task</th>
                    <th className="px-4 py-3 font-medium">Where in MISP</th>
                    <th className="px-4 py-3 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80 text-neutral-300 font-light">
                  {[
                    ["List roles", "Administration → List Roles", "Roles control who can create events, sync, tag and administer"],
                    ["List organisations", "Administration → List Organisations", "Each node has a local organisation; remote ones appear when sync is set up"],
                    ["Add a user", "Administration → Add User", "Email, password, organisation, role"],
                    ["Sync user", 'Same page, role "Sync user"', "Used only for node-to-node sync; its Authkey is what the other node needs"],
                  ].map(([a, b, c]) => (
                    <tr key={a} className="hover:bg-neutral-900/30">
                      <td className="px-4 py-2.5 font-medium text-neutral-200">{a}</td>
                      <td className="px-4 py-2.5"><code className={code}>{b}</code></td>
                      <td className="px-4 py-2.5">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Shot
              src="/events/misp-users-server1.png"
              alt="MISP Users Index on Server 1 showing admin and sync user accounts"
              label="Server 1 (NCSA) — User Management"
            />
            <Shot
              src="/events/misp-users-server2.png"
              alt="MISP Users Index on Server 2 showing admin and sync user accounts"
              label="Server 2 (ORGNAME) — User Management"
            />
          </section>

          {/* 7. Server Synchronization */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">7. Server Synchronization</h2>
            <div className="space-y-4 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <p>
                On each node open <code className={code}>Sync Actions → Remote Servers → New Servers</code> and enter:
              </p>
              <ol className="list-decimal space-y-2 pl-5 text-neutral-300">
                <li>The Base URL of the remote node</li>
                <li>An Instance Name</li>
                <li>The Organisation Type</li>
                <li>The Authkey of the Sync User account on the remote node</li>
                <li>Sharing rules: Push and Pull enabled</li>
                <li>&quot;Publish Without Email&quot; and &quot;Allow self-signed certificates&quot; (lab only)</li>
                <li>Press Run to test the connection</li>
              </ol>
              <p>
                <strong className="font-semibold text-neutral-100">Expected:</strong>{" "}
                <code className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-emerald-400">Status: OK</code>,{" "}
                <code className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-emerald-400">Compatibility: Compatible</code>, and a POST test that reports &quot;Received sent package&quot;.
              </p>
            </div>

            <Shot
              src="/events/misp-servers-server1.png"
              alt="MISP Servers page on Server 1 showing sync configuration with node"
              label="Server 1 (NCSA) — Remote Server Configuration"
            />
            <Shot
              src="/events/misp-servers-server2.png"
              alt="MISP Servers page on Server 2 showing sync configuration with main"
              label="Server 2 (ORGNAME) — Remote Server Configuration"
            />
            <Shot
              src="/events/misp-pull-queued.png"
              alt="MISP Pull queued for background execution"
              label="Pull Execution — Job Queued"
            />
          </section>

          {/* 8. Jobs & Sync Monitoring */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">8. Jobs &amp; Sync Monitoring</h2>
            <p className="text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <code className={code}>Administration → Jobs</code> shows background work: publishing events, caching feeds, pull and push. Both servers showed completed <code className={code}>publish_event</code> and pull jobs, which confirms the bidirectional sync.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Shot
                src="/events/misp-jobs-server1.png"
                alt="MISP Jobs page on Server 1 showing completed publish events"
                label="Server 1 (NCSA) — Jobs Queue"
              />
              <Shot
                src="/events/misp-jobs-server2.png"
                alt="MISP Jobs page on Server 2 showing completed pull jobs"
                label="Server 2 (ORGNAME) — Jobs Queue"
              />
            </div>
          </section>

          {/* 9. OSINT Threat Feeds */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">9. OSINT Threat Feeds</h2>
            <div className="space-y-3.5 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <p>
                <code className={code}>Sync Actions → Feeds</code> lists the built-in sources. In the captured configuration <strong className="font-semibold text-neutral-100">CIRCL is enabled, the others are disabled, and caching is off.</strong> Feed ingestion is therefore documented as a configuration review, not as a verified result.
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  { name: "CIRCL OSINT Feed", format: "misp", provider: "CIRCL" },
                  { name: "The Botvrij.eu Data", format: "misp", provider: "Botvrij.eu" },
                  { name: "ELLIO: IP Feed", format: "freetext", provider: "ellio.tech" },
                  { name: "Tor exit nodes", format: "csv", provider: "dan.me.uk" },
                  { name: "Phishtank online valid phishing", format: "csv", provider: "Phishtank" },
                  { name: "ip-block-list - snort.org", format: "freetext", provider: "snort.org" },
                  { name: "cybercrime-tracker.net", format: "freetext", provider: "cybercrime-tracker.net" },
                  { name: "diamondfox_panels", format: "freetext", provider: "pan-unit42" },
                ].map((feed, i) => (
                  <div key={i} className="flex items-start gap-2.5 rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-3">
                    <Rss size={14} className="mt-0.5 shrink-0 text-orange-400" />
                    <div>
                      <span className="text-xs sm:text-sm font-medium text-neutral-200">{feed.name}</span>
                      <span className="ml-2 text-[10px] font-mono text-neutral-500">{feed.format}</span>
                      <p className="text-[11px] text-neutral-500">{feed.provider}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Shot
              src="/events/misp-feeds.png"
              alt="MISP Feeds page showing available OSINT threat intelligence feeds"
              label="MISP Feeds Management Interface"
            />
          </section>

          {/* 10. TLP Classification */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">10. TLP Classification</h2>

            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-neutral-800 bg-neutral-900/80 font-mono text-xs uppercase tracking-wider text-neutral-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">TLP Level</th>
                    <th className="px-4 py-3 font-medium">Scope</th>
                    <th className="px-4 py-3 font-medium">Distribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80 text-neutral-300 font-light">
                  <tr className="hover:bg-neutral-900/30">
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center gap-2 font-medium">
                        <span className="h-3 w-3 rounded-full bg-red-500" />
                        <span className="text-red-400">TLP:RED</span>
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-neutral-200">Confidential, eyes only</td>
                    <td className="px-4 py-2.5">Not for disclosure beyond immediate recipients</td>
                  </tr>
                  <tr className="hover:bg-neutral-900/30">
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center gap-2 font-medium">
                        <span className="h-3 w-3 rounded-full bg-orange-500" />
                        <span className="text-orange-400">TLP:AMBER</span>
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-neutral-200">Limited distribution</td>
                    <td className="px-4 py-2.5">Within the organisation and partners on a need-to-know basis</td>
                  </tr>
                  <tr className="hover:bg-neutral-900/30">
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center gap-2 font-medium">
                        <span className="h-3 w-3 rounded-full bg-green-500" />
                        <span className="text-green-400">TLP:GREEN</span>
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-neutral-200">Community sharing</td>
                    <td className="px-4 py-2.5">Shareable within the CTI community, not publicly</td>
                  </tr>
                  <tr className="hover:bg-neutral-900/30">
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center gap-2 font-medium">
                        <span className="h-3 w-3 rounded-full border border-neutral-600 bg-neutral-800" />
                        <span className="text-neutral-300">TLP:CLEAR</span>
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-neutral-200">Public information</td>
                    <td className="px-4 py-2.5">No restrictions</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 11. Threat Events & MITRE ATT&CK */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">11. Threat Events &amp; MITRE ATT&amp;CK</h2>
            <div className="space-y-3.5 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <p>
                The Events page shows events tagged with MITRE ATT&amp;CK techniques (for example T1041 Exfiltration Over C2 Channel, T1438 Exfiltration Over Other Network Medium), galaxy clusters (IRIDIUM/Sandworm), OSINT tags and TLP.
              </p>
              <p>
                To investigate an indicator: <code className={code}>Event Actions → Search Attributes</code>, enter a hash or IP, open the matching event, and read the creator organisation, tags, threat level and the correlation graph before acting.
              </p>
            </div>

            <Shot
              src="/events/misp-events-list.png"
              alt="MISP Events list showing MITRE ATT&CK tagged threat events with TLP classifications"
              label="MISP Events List — Synchronized Threat Intelligence"
            />

            <Shot
              src="/events/misp-events-overview.png"
              alt="MISP 2.5.51 Events list on 13 November 2026 with creator and owner organisation NCSA, MITRE ATT&CK tagged events and TLP tags"
              label="MISP 2.5.51 Events List, 13 November 2026"
            />

            <figure className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
              <div className="border-b border-neutral-800 px-4 py-3">
                <h3 className="text-sm font-semibold text-neutral-100">Event context</h3>
                <p className="mt-1 text-xs font-light text-neutral-400">
                  Creator and owner organisations, tags, threat level, analysis state and distribution of an event.
                </p>
              </div>
              <ZoomImage
                src="/events/misp-event-context.png"
                alt="MISP event view of an OSINT feed event with creator organisation CIRCL, owner organisation NCSA, tags and distribution"
                width={1898}
                height={887}
                className="h-auto w-full object-contain"
              />
              <figcaption className="border-t border-neutral-800 px-4 py-3 text-xs font-light text-neutral-400">
                An OSINT feed event (created by CIRCL, owner NCSA) imported into the lab MISP, showing creator organisation, tags and distribution.
              </figcaption>
            </figure>

            <p className="text-sm font-light text-neutral-400">
              Lab 1 key points: RBAC and multi-organisation management, authenticated push and pull sync, feed review, TLP, and MITRE-tagged events.
            </p>
          </section>

          {/* 12. Lab 2 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">12. Lab 2: MISP → Wazuh IOC Detection</h2>

            <div className="space-y-4 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <div>
                <h3 className="font-semibold text-neutral-100">12.1 Pulling and cleaning IOCs (MANAGER)</h3>
                <p className="mt-1">
                  Create <code className={code}>/opt/misp-sync/fetch_and_clean.sh</code>. The script asks MISP for IP indicators that are meant for detection (<code className={code}>to_ids=1</code>), published, not on a warninglist, from the last 30 days, then filters them.
                </p>
                <pre className={pre}>
                  <code>{`#!/bin/bash
MISP_URL="https://192.168.136.142"
API_KEY=$(cat /opt/misp-sync/misp.key)   # root-only file
LIMIT=1000
RAW=/tmp/misp_ips_raw.txt
CLEAN=/tmp/misp_ips_clean.txt
WHITELIST=/opt/misp-sync/whitelist.txt
LAB_IPS=/opt/misp-sync/lab_ips.txt
OUT=/var/ossec/etc/lists/misp_badip

curl -k -s -X POST "$MISP_URL/attributes/restSearch" \\
  -H "Authorization: $API_KEY" -H "Accept: application/json" -H "Content-Type: application/json" \\
  -d '{"returnFormat":"text","type":["ip-src","ip-dst"],"to_ids":1,"enforceWarninglist":1,"published":1,"deleted":0,"last":"30d"}' \\
  -o "$RAW"

# keep valid IPv4, drop private/loopback/link-local/multicast/reserved (first octet 224 to 255), drop the whitelist, dedupe, sample
grep -E '^([0-9]{1,3}\\.){3}[0-9]{1,3}$' "$RAW" > "$CLEAN"
grep -Ev '^(10\\.|127\\.|169\\.254\\.|192\\.168\\.|172\\.(1[6-9]|2[0-9]|3[0-1])\\.|0\\.|2(2[4-9]|[3-5][0-9])\\.)' "$CLEAN" > "$CLEAN.pub"
grep -vxFf "$WHITELIST" "$CLEAN.pub" | sort -u | shuf -n "$LIMIT" > "$CLEAN.final"

# lab-only addresses are added AFTER filtering
[ -f "$LAB_IPS" ] && cat "$LAB_IPS" >> "$CLEAN.final"
sort -u "$CLEAN.final" -o "$CLEAN.final"

sed 's/$/:/' "$CLEAN.final" > "$OUT.tmp"
if [ -s "$OUT.tmp" ]; then
  mv "$OUT.tmp" "$OUT"
  chown wazuh:wazuh "$OUT"
  /var/ossec/bin/wazuh-control reload >/dev/null 2>&1
  echo "$(date) updated: $(wc -l < $OUT) IOCs"
else
  echo "$(date) ABORT: list is empty"
fi`}</code>
                </pre>
                <p className="mt-3">
                  Supporting files: <code className={code}>/opt/misp-sync/whitelist.txt</code> (public DNS servers and similar, one IP per line) and <code className={code}>/opt/misp-sync/lab_ips.txt</code> (contains <code className={code}>192.168.136.145</code>). The API key is stored root-only with <code className={code}>chmod 600</code>.
                </p>
                <p className="mt-3">
                  <strong className="font-semibold text-neutral-100">Result:</strong> 37,005 indicators pulled. The raw count of IP attributes flagged for detection in MISP on 13 November 2026 was 39,785 (29,738 destination plus 10,047 source); 37,005 is the number left after the script&apos;s filters (30 days, published, warning list on). 1,000 randomly sampled plus the test IP gives 1,001 lines in <code className={code}>misp_badip</code>. The sampling was for the demo; it did not rank indicators by quality.
                </p>
                <p className="mt-3">
                  <strong className="font-semibold text-neutral-100">Weakness (not tested):</strong> because the lab IP is appended after the filter, a MISP outage would leave a list containing only that address and the &quot;empty list&quot; check would not trigger. The hash feed script on the <Link href="/projects/wazuh-edr-lab" className="text-sky-300 hover:underline">EDR page</Link> (Step 7) checks the HTTP status first, which avoids this.
                </p>
                <p className="mt-3">
                  <strong className="font-semibold text-neutral-100">Scheduling:</strong> the first write-up said &quot;cron every 6 hours&quot;, but <code className={code}>crontab</code> did not exist on this minimal system, so the job never ran. Fixed on the <Link href="/projects/wazuh-edr-lab" className="text-sky-300 hover:underline">EDR page</Link>: install <code className={code}>cron</code>, then <code className={code}>10 */6 * * * /opt/misp-sync/fetch_and_clean.sh &gt;&gt; /var/log/misp-ips.log 2&gt;&amp;1</code>. The script now calls <code className={code}>wazuh-control reload</code> instead of restarting the Manager.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-100">12.2 CDB list and rule 100100</h3>
                <p className="mt-1">
                  Register the list in <code className={code}>/var/ossec/etc/ossec.conf</code> inside <code className={code}>&lt;ruleset&gt;</code>: <code className={code}>&lt;list&gt;etc/lists/misp_badip&lt;/list&gt;</code>. Then add the rule to <code className={code}>/var/ossec/etc/rules/local_rules.xml</code>:
                </p>
                <pre className={pre}>
                  <code>{`<group name="misp,threat_intel,">
  <rule id="100100" level="12" ignore="300">
    <if_sid>86600</if_sid>
    <list field="src_ip" lookup="address_match_key">etc/lists/misp_badip</list>
    <description>MISP IOC match: connection from known bad IP $(src_ip)</description>
  </rule>
</group>`}</code>
                </pre>
                <p className="mt-3">
                  Rule 86600 is Wazuh&apos;s built-in parent for Suricata events. <code className={code}>ignore=&quot;300&quot;</code> was added later to stop one connection from raising hundreds of alerts. Validate before any live traffic:
                </p>
                <pre className={pre}>
                  <code>{`/var/ossec/bin/wazuh-analysisd -t; echo "exit code: $?"`}</code>
                </pre>
                <p className="mt-2">Expected: rule 100100, level 12, &quot;Alert to be generated&quot; in <code className={code}>wazuh-logtest</code>.</p>
                <div className="mt-3">
                  <Shot
                    src="/events/misp-logtest-rule-100100.png"
                    alt="wazuh-logtest output: rule 86600 matched, then rule 100100 matched with level 12 and the description MISP IOC match for 192.168.136.145"
                    label="wazuh-logtest: rule 100100 matches"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-100">12.3 Network sensor on the endpoint</h3>
                <p className="mt-1">
                  Suricata 8.0.8 (upgraded from 7.0.3 through the OISF PPA) on interface <code className={code}>ens33</code>, with 53,376 Emerging Threats Open rules loaded and 0 failed. The Wazuh agent reads its JSON log:
                </p>
                <pre className={pre}>
                  <code>{`<localfile>
  <log_format>json</log_format>
  <location>/var/log/suricata/eve.json</location>
</localfile>`}</code>
                </pre>
                <p className="mt-2">
                  The installation commands were not recorded. To reproduce it (proposed, not tested here): add the OISF Suricata PPA, install <code className={code}>suricata</code>, set <code className={code}>af-packet: - interface: ens33</code> in <code className={code}>/etc/suricata/suricata.yaml</code>, enable the <code className={code}>eve-log</code> output, run <code className={code}>suricata-update</code>, then restart the service. Check with <code className={code}>suricata -V</code> (8.0.8 in this lab) and by counting loaded rules (<code className={code}>grep -c &apos;^alert&apos; /var/lib/suricata/rules/suricata.rules</code> gave 53,375 on 13 November 2026). Check afterwards with <code className={code}>systemctl is-active suricata</code> and <code className={code}>tail -1 /var/log/suricata/eve.json</code>.
                </p>
                <div className="mt-3">
                  <Shot
                    src="/events/misp-suricata-version.png"
                    alt="Terminal on the endpoint: suricata -V reports 8.0.8 RELEASE and grep -c of the alert rules gives 53375"
                    label="Suricata version and number of loaded rules, 13 November 2026"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-100">12.4 Attack simulation (KALI)</h3>
                <pre className={pre}>
                  <code>{`ping -c 4 192.168.136.143
nmap -sS -p 1-1000 192.168.136.143`}</code>
                </pre>
                <p className="mt-2">
                  Nmap found ports 22, 80 and 443 open. Use <code className={code}>ping</code> alone when you only need an alert; a scan produced about 1,000 alerts because the rule fires per flow. The rule now carries <code className={code}>ignore=&quot;300&quot;</code>, so it fires at most once every five minutes. This applies to all IPs together, not per IP.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-neutral-100">12.5 Results</h3>
              <div className="overflow-x-auto rounded-xl border border-neutral-800">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="border-b border-neutral-800 bg-neutral-900/80 font-mono text-xs uppercase tracking-wider text-neutral-400">
                    <tr>
                      <th className="px-4 py-3 font-medium">#</th>
                      <th className="px-4 py-3 font-medium">Evidence</th>
                      <th className="px-4 py-3 font-medium">What it shows</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80 text-neutral-300 font-light">
                    {[
                      ["1", "wazuh-logtest output", "Rule 100100 fires, level 12"],
                      ["2", "wc -l misp_badip gives 1,001; grep -c of the test IP gives 1", "The CDB loaded and holds the test IP"],
                      ["3", "Suricata eve.json", "event_type: flow, src_ip 192.168.136.145 → 192.168.136.143, many destination ports"],
                      ["4", "alerts.json", "Rule 100100, agent misp-endpoint, location /var/log/suricata/eve.json. In total this rule fired 1,115 times between 6 and 12 November 2026."],
                      ["5", "Wazuh Overview dashboard", "High severity (level 12 to 14) = 1,001; Agents Active (1) (time range of the screenshot: not recorded)"],
                    ].map(([n, e, w]) => (
                      <tr key={n} className="hover:bg-neutral-900/30">
                        <td className="px-4 py-2.5 font-mono text-neutral-500">{n}</td>
                        <td className="px-4 py-2.5">{e}</td>
                        <td className="px-4 py-2.5">{w}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm font-light text-neutral-300 sm:text-base">
                The full chain worked: MISP → CDB → Suricata → Wazuh agent → Manager → rule 100100 → dashboard alert.
              </p>
            </div>
          </section>

          {/* 13. Troubleshooting */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">13. Troubleshooting</h2>
            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-neutral-800 bg-neutral-900/80 font-mono text-xs uppercase tracking-wider text-neutral-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Problem</th>
                    <th className="px-4 py-3 font-medium">Cause</th>
                    <th className="px-4 py-3 font-medium">Fix</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80 text-neutral-300 font-light">
                  {[
                    ["Authentication failed from MISP", "curl header missed the Authorization: prefix; the script held a placeholder key", "Corrected the header and key; checked with servers/getVersion"],
                    ["Test IP missing from the CDB", "The Kali address is private, so the cleaning step removed it", "Lab-only allowlist file appended after filtering"],
                    ["Rule 100100 never fired in logtest", "Duplicate rule ID in local_rules.xml from a paste error", "Rewrote the file with one rule; used if_sid 86600"],
                    ["Suricata upgrade failed", "File conflict with the separate suricata-update package", "Removed the old package and reinstalled"],
                    ["One nmap scan gave about 1,000 alerts", "The rule fires per flow", 'ignore="300"; a per-IP throttle is still open'],
                    ['The "cron every 6 hours" never ran', "crontab was not installed on Ubuntu minimal", "Installed cron and created the job (EDR page, Step 7)"],
                  ].map(([a, b, c]) => (
                    <tr key={a} className="hover:bg-neutral-900/30">
                      <td className="px-4 py-2.5 font-medium text-neutral-200">{a}</td>
                      <td className="px-4 py-2.5">{b}</td>
                      <td className="px-4 py-2.5">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 14. Key Takeaways */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">14. Key Takeaways</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                {
                  icon: <Database size={16} className="text-sky-400" />,
                  title: "Threat Intelligence Platform Deployment",
                  desc: "Deployed MISP on two Ubuntu 24.04.5 VMs with the official installer and set up the web interface and initial admin access.",
                },
                {
                  icon: <Users size={16} className="text-emerald-400" />,
                  title: "RBAC & Multi-Org Management",
                  desc: "Created organisations and Sync User accounts, and controlled permissions for data sharing across organisational boundaries.",
                },
                {
                  icon: <RefreshCw size={16} className="text-amber-400" />,
                  title: "Server Synchronization",
                  desc: "Configured authenticated push and pull sync between two MISP nodes, verified the connection, and monitored jobs.",
                },
                {
                  icon: <Rss size={16} className="text-orange-400" />,
                  title: "Feed, TLP & MITRE Review",
                  desc: "Reviewed feed status (CIRCL enabled, caching off), TLP levels, and events tagged with MITRE ATT&CK.",
                },
                {
                  icon: <Radar size={16} className="text-purple-400" />,
                  title: "IOC Pipeline to Wazuh",
                  desc: "Pulled indicators through restSearch, cleaned them, built a CDB list and rule 100100, and matched Suricata flow data.",
                },
                {
                  icon: <AlertTriangle size={16} className="text-red-400" />,
                  title: "Troubleshooting",
                  desc: "Resolved API authentication, private-IP filtering, duplicate rule IDs, Suricata upgrade conflicts, alert volume and missing cron.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-4">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <h3 className="text-sm font-semibold text-neutral-100">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-xs sm:text-[13px] font-light leading-relaxed text-neutral-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-3 rounded-2xl border border-neutral-800 bg-panel p-5">
              <h2 className="text-xl font-semibold text-neutral-100 sm:text-2xl">15. Scope &amp; Limitations</h2>
              <ul className="list-disc space-y-1.5 pl-5 text-xs font-light leading-relaxed text-neutral-300 sm:text-sm">
                <li>The detected IP was a private lab address (Kali) added by hand to simulate a bad IP; it was not a real threat actor&apos;s indicator from a MISP feed.</li>
                <li>The demo list is a random sample of 1,000 from 37,005, not selected by quality or confidence.</li>
                <li>Alerts came from Suricata flow events matched against the list, not from Suricata signature alerts (a SYN scan did not trigger the ET rules).</li>
                <li>Rule 100100 checks <code className={code}>src_ip</code> only; the outbound rule came later (<Link href="/projects/wazuh-xdr-lab" className="text-sky-300 hover:underline">XDR page</Link>).</li>
                <li>Feed ingestion was not verified (caching off); private VMware network; self-signed certificates.</li>
              </ul>
            </div>
            <div className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
              <h2 className="text-xl font-semibold text-neutral-100 sm:text-2xl">Conclusion</h2>
              <p className="text-xs font-light leading-relaxed text-neutral-300 sm:text-sm">
                The lab deploys two MISP nodes that share events, then uses MISP as the indicator source for Wazuh. The full chain MISP → CDB → Suricata → Wazuh agent → Manager → rule 100100 → dashboard alert was demonstrated end to end with a simulated attacker.
              </p>
            </div>
          </section>

          <div className="h-px w-full bg-neutral-800/80" />

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-400 transition hover:text-white"
            >
              <ChevronLeft size={14} />
              Back to Projects
            </Link>
            <Link
              href="/projects/soc-analyst-lab"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-400 transition hover:text-white"
            >
              View SOC Lab →
            </Link>
          </div>
        </div>
      </Reveal>
    </PageShell>
  );
}
