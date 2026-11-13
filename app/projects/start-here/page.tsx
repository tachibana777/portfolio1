import type { ReactNode } from "react";
import Link from "next/link";
import { AlertTriangle, ChevronLeft, Shield } from "lucide-react";
import { PageShell } from "@/components/layout";
import { Reveal } from "@/components/ui";
import { ZoomImage } from "@/components/ui/ZoomImage";
import { SeriesNav } from "@/components/projects/ReadFirst";

export const metadata = {
  title: "Start Here: Build a Threat Intelligence, EDR, XDR and SOAR Lab at Home | Kritsada Hongpatsa",
  description:
    "One small VMware lab, four layers. Why each one exists, how they differ, how they work together, and the order to build them so nothing surprises you.",
};

const code = "text-sky-300";
const h2 = "text-2xl font-semibold text-neutral-100 sm:text-3xl";
const p = "text-sm font-light leading-relaxed text-neutral-300 sm:text-base";
const a = "text-sky-300 hover:underline";
const strong = "font-semibold text-neutral-100";

function Table({ head, rows, mono = 0 }: { head: string[]; rows: ReactNode[][]; mono?: number }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-800">
      <table className="w-full text-left text-xs sm:text-sm">
        <thead className="border-b border-neutral-800 bg-neutral-900/80 font-mono text-xs uppercase tracking-wider text-neutral-400">
          <tr>{head.map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-neutral-800/80 font-light text-neutral-300">
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-neutral-900/30">
              {r.map((c, j) => <td key={j} className={`px-4 py-2.5 ${j === mono ? "font-medium text-neutral-200" : ""}`}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const terms = [
  ["EDR", "Records and acts on one host: processes, files, logins, persistence; can contain a host", "File monitoring, a hash list, block scripts", "auditd, persistence rules, quarantine, a triage script, host isolation"],
  ["XDR", "Several kinds of source, correlated", "One rule at a time", "Correlation rules linking network, login and endpoint signals"],
  ["SOAR", "A playbook that enriches, decides, acts and asks a human", "Nothing", "Shuffle: MISP check, approval, block and timed release"],
];

const parts = [
  [<Link key="m" href="/projects/misp-threat-intel-lab" className={a}>MISP</Link>, "A threat-intelligence platform: a database and sharing hub for IOCs", "Lists of bad IPs, domains and hashes that Wazuh can match", "It stores intelligence; it detects nothing on your hosts", "misp-intel"],
  [<Link key="e" href="/projects/wazuh-edr-lab" className={a}>EDR</Link>, "Software on the host that records what happens and can respond", "Alerts for known-bad files, programs run from /tmp, persistence changes; evidence, blocking, quarantine, isolation", "Sees one host in depth; weak on the wider picture", "misp-endpoint, wazuh-manager"],
  [<Link key="x" href="/projects/wazuh-xdr-lab" className={a}>XDR</Link>, "EDR plus other sources, with correlation", "Alerts like \"a listed IP, then a login, then a persistence change\"", "Needs good sources; detects but does not act (on purpose)", "wazuh-manager"],
  [<Link key="s" href="/projects/wazuh-soar-lab" className={a}>SOAR</Link>, "Automation that runs a playbook when an alert arrives", "A decision after the alert: ask MISP, block if confirmed, ask a person if not, release", "Detects nothing itself; it acts on what the others found", "soar-shuffle"],
];

const vms = [
  ["misp-intel", "MISP", "Ubuntu 24.04.5", "2", "1.9 GB", "96 GB"],
  ["wazuh-manager", "Wazuh server, rules, API, dashboard", "Ubuntu 24.04.5", "4", "7.7 GB", "77 GB"],
  ["misp-endpoint", "Protected host: agent, Suricata, auditd, scripts", "Ubuntu 24.04.5", "2", "1.9 GB", "96 GB"],
  ["soar-shuffle", "Shuffle (Docker)", "Ubuntu 24.04.5", "4", "7.7 GB", "77 GB"],
  ["Kali", "Attacker", "Kali Linux", "not recorded", "not recorded", "not recorded"],
];

const stages = [
  ["0. Foundation", "Five VMs, fixed IPs, snapshots", "Every VM reaches the others; you have a snapshot"],
  ["1. MISP", "Share IOCs; pull IPs by script; build a Wazuh list; detect with Suricata", "Kali pings the endpoint and rule 100100 appears on the dashboard"],
  ["2. EDR", "Hash detection, evidence, delete or quarantine, block IP/domain, auditd, persistence rules, triage, isolation", "EICAR is detected and removed; auditctl -l shows three tmp_exec rules"],
  ["3. XDR", "Correlation rules and a final exercise", "A multi-step attack from Kali gives a readable story of alerts"],
  ["4. SOAR", "Shuffle playbook", "A listed IP is blocked, then released about 60 seconds later; the case shows on the dashboard"],
];

const numbers = [
  ["MISP events", "1,682"],
  ["IP attributes flagged for detection in MISP", "39,785 (29,738 destination + 10,047 source)"],
  ["Lines in misp_badip", "1,001 (1,000 random sample + one test IP)"],
  ["Lines in malware_hashes", "26,618 (26,617 from MISP + one EICAR test hash)"],
  ["Rule 100100 alerts, 6 to 12 Nov", "1,115"],
  ["Rule 100200 (known-bad hash)", "19"],
  ["EDR rules 100400 to 100413", "18 alerts (100400 ×3, 100410 ×3, 100411 ×3, 100412 ×1, 100413 ×8)"],
  ["XDR rules", <>100500 ×3, 100510 ×3, 100520 ×1, 100521 ×1, 100530 ×6, 100540 ×2; <strong className={strong}>100511 never fired</strong></>],
  ["SOAR rules 100601 / 100602 / 100603", "3 / 1 / 2"],
];

export default function StartHerePage() {
  return (
    <PageShell>
      <Reveal>
        <div className="space-y-12 pb-16">
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-400 transition hover:text-white"><ChevronLeft size={14} /> Back to Projects</Link>

          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-900/90 px-3 py-1 text-xs font-mono font-medium text-sky-400"><Shield size={12} /> Blue Team</span>
              <span className="rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs font-mono text-neutral-400">Personal Cybersecurity Home Lab</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl md:text-5xl">Start Here: Build a Threat Intelligence, EDR, XDR and SOAR Lab at Home</h1>
            <p className="text-lg font-light text-neutral-300 sm:text-xl">One small VMware lab, four layers. Why each one exists, how they differ, how they work together, and the order to build them so nothing surprises you</p>
            <div className="flex flex-wrap gap-2 pt-1">{["Threat Intelligence", "SIEM", "EDR", "XDR", "SOAR", "MISP 2.5.51", "Wazuh 4.14.9", "Suricata 8.0.8", "auditd", "iptables", "Shuffle", "Ubuntu 24.04", "Kali Linux", "VMware"].map((tech) => <span key={tech} className="rounded-lg border border-neutral-800 bg-panel px-2.5 py-1 text-xs font-medium text-neutral-200">{tech}</span>)}</div>
            <p className="text-xs font-light text-neutral-400 sm:text-sm">Built and tested on a private VMware lab between 5 and 13 November 2026. Commands, IPs and outputs are shown as they were. Secrets (API keys, passwords, tokens, webhook URL) are never printed.</p>
          </header>

          <SeriesNav current="/projects/start-here" />

          <section className="space-y-4">
            <h2 className={h2}>1. Why I built this</h2>
            <p className={p}>The lab started as a three-step assignment from a mentor, modelled on how a national cyber agency works with its customers: the central team collects threat intelligence and shares it, and the customer&apos;s systems act on it.</p>
            <ol className="list-decimal space-y-2 pl-5 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <li><strong className={strong}>MISP to MISP.</strong> Two MISP servers exchange indicators of compromise (IOCs).</li>
              <li><strong className={strong}>MISP → Wazuh Manager → Endpoint ← Attacker.</strong> Turn the indicators into a list and raise an alert whenever a listed IP touches the endpoint.</li>
              <li><strong className={strong}>Simulated malware download.</strong> Collect the evidence as a zip, ship it to the Manager, delete the malware automatically, and block bad IPs and domains.</li>
            </ol>
            <p className={p}>After step 3 I had a SIEM with threat intelligence and scripted response. Then an honest question: <strong className={strong}>&quot;is this EDR, XDR or SOAR yet, and if not, what is missing?&quot;</strong> Each term was compared with what already existed, and the gaps became the plan:</p>
            <Table head={["Term", "What it needs", "What the lab had after step 3", "What I added"]} rows={terms} />
          </section>

          <section className="space-y-4">
            <h2 className={h2}>2. The big picture</h2>
            <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
              <ZoomImage src="/events/diagram-01-big-picture.png" alt="How the five machines and four layers connect" width={1568} height={556} className="h-auto w-full object-contain" />
            </div>
            <p className={p}>Read it from the left:</p>
            <ul className="list-disc space-y-2 pl-5 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <li><strong className={strong}>MISP</strong> (<code className={code}>misp-intel</code>) holds the intelligence: bad IPs, domains and file hashes.</li>
              <li>A cron script turns that into <strong className={strong}>lists</strong> on the Wazuh Manager. <strong className={strong}>Rules</strong> compare live events to the lists.</li>
              <li>The <strong className={strong}>endpoint</strong> (<code className={code}>misp-endpoint</code>) produces the events: Suricata sees the network, auditd and file monitoring see the host, and the Wazuh agent ships it all to the Manager.</li>
              <li><strong className={strong}>Kali</strong> attacks the endpoint so there is something to detect.</li>
              <li>When a correlation rule fires, the Manager sends the alert to <strong className={strong}>Shuffle</strong> (SOAR). Shuffle asks MISP &quot;is this IP known?&quot;, then blocks, or asks a person.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className={h2}>3. The four parts: what each is, what it gives you, how it differs</h2>
            <Table head={["Part", "What it is", "What you get", "How it differs", "Runs on"]} rows={parts} />
            <p className={p}>One line each: <strong className={strong}>MISP knows, Wazuh sees, EDR protects a host, XDR connects the dots, SOAR decides and acts.</strong> They are layers, not rivals. Remove one and the next layer has less to work with.</p>
          </section>

          <section className="space-y-4">
            <h2 className={h2}>4. How they work together: one story</h2>
            <ol className="list-decimal space-y-2 pl-5 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <li>MISP has a list of IPs that are known to be bad.</li>
              <li>Every six hours (scheduled) a script rebuilds the Wazuh lists from MISP.</li>
              <li>Kali, whose address matches a listed IP, touches the endpoint. Suricata logs it; rule 100100 matches the list and raises a level-12 alert.</li>
              <li>The attacker then guesses SSH passwords and logs in. Several single alerts now exist, each small. The XDR rules join them: &quot;listed IP logs in&quot; (100500), &quot;brute force then success&quot; (100521), &quot;persistence after login&quot; (100510) and so on.</li>
              <li>A correlation alert reaches Shuffle. Shuffle asks MISP. MISP says yes, so Shuffle asks the Wazuh API to run the block script on the endpoint. A minute later it releases the block. If MISP had said no, a person would be asked first.</li>
              <li>Three small SOAR rules put &quot;blocked / waiting / released&quot; on the Wazuh dashboard so the case is visible.</li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className={h2}>5. What to prepare</h2>
            <p className={p}>Five VMs on one private VMware network (the lab used 192.168.136.0/24):</p>
            <Table head={["VM", "Role", "OS", "vCPU", "RAM", "Disk"]} rows={vms} />
            <p className={p}>About 19 GB of RAM for the four Ubuntu VMs plus Kali. MISP ran on 1.9 GB, which is small; give it more if it is slow. Shuffle needs the 4 vCPU / 8 GB class, and its OpenSearch needs <code className={code}>vm.max_map_count=262144</code>.</p>
            <p className={p}><strong className={strong}>Versions:</strong> MISP 2.5.51, Wazuh 4.14.9 (server and agent), Suricata 8.0.8 with Emerging Threats Open rules (about 53,000 loaded), auditd, iptables, Shuffle in Docker.</p>
            <p className={p}><strong className={strong}>Skills:</strong> basic Linux and SSH, reading a log, editing XML. Each page explains its own vocabulary (IOC, decoder, rule, CDB list, Active Response).</p>
            <p className={p}><strong className={strong}>Time:</strong> not measured. Plan several evenings; the lab log covers about nine days including mistakes.</p>
          </section>

          <section className="space-y-4">
            <h2 className={h2}>6. The order to build it</h2>
            <p className={p}>Each stage depends on the one before it, and each has a check that proves it works.</p>
            <Table head={["Stage", "Goal", "Done when"]} rows={stages} />
            <p className={p}>Take a <strong className={strong}>VMware snapshot</strong> before risky tests: isolation and rule edits can lock you out.</p>
          </section>

          <section className="space-y-4">
            <h2 className={h2}>7. Habits that keep the lab safe</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <li><strong className={strong}>Private lab only.</strong> Never point these scripts at a network you do not own.</li>
              <li><strong className={strong}>Secrets stay out of chats and pages.</strong> Keep keys in root-only files; use read-only keys where a tool only reads.</li>
              <li><strong className={strong}>Allowlists first.</strong> Block scripts refuse the gateway and lab hosts, so a mistake cannot cut you off.</li>
              <li><strong className={strong}>A human approves anything not clear-cut.</strong> Only an indicator MISP confirms is blocked automatically.</li>
              <li><strong className={strong}>Harmless tests.</strong> EICAR is the test file; <code className={code}>192.0.2.x</code> addresses are for tests.</li>
              <li><strong className={strong}>Check a rule before a live test</strong> with <code className={code}>wazuh-logtest</code>; it has no side effects.</li>
              <li><strong className={strong}>Undo what you added.</strong> Remove test routes, extra IPs, test allowlist entries and spare backups when finished.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className={h2}>8. Numbers from the lab (checked 13 November 2026)</h2>
            <Table head={["Item", "Value"]} rows={numbers} />
            <p className="text-sm font-light text-neutral-400">Times in alerts.json are UTC; the dashboard shows Thai time (UTC+7).</p>
          </section>

          <section className="rounded-2xl border border-amber-900/50 bg-amber-950/20 p-5">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-100"><AlertTriangle size={18} className="text-amber-400" /> 9. What this lab cannot do (read before you copy it)</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-300">
              <li>It is an <strong className={strong}>EDR-lite and XDR-style pipeline</strong>, not a commercial product: one Manager, one Linux endpoint, correlation by host and time.</li>
              <li>An unknown new file is not caught by hash; only behaviour rules (programs run from /tmp, persistence changes) can catch it.</li>
              <li><strong className={strong}>Wazuh&apos;s built-in 600-second block timeout did not release blocks.</strong> After the last such block no <code className="text-amber-300">UNBLOCKED</code> line appeared for 17 h 43 min, until a reboot. Shuffle releases SOAR blocks instead; the cause is unknown.</li>
              <li>Blocks are lost on reboot (iptables is not persistent).</li>
              <li>Rule 100511 was never exercised; rule 100110 can false-alert on a DHCP reply from the gateway.</li>
              <li>SOAR has no email or chat notification and no case management. The webhook is plain HTTP with no authentication.</li>
              <li>The endpoint is a former MISP node and still runs apache2, mariadb and redis; no web-shell detection was built.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className={h2}>10. Read next</h2>
            <ol className="list-decimal space-y-2 pl-5 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <li><Link href="/projects/misp-threat-intel-lab" className={a}>MISP page</Link>: sharing, the IP list, detection with Suricata</li>
              <li><Link href="/projects/wazuh-edr-lab" className={a}>EDR page</Link>: hashes, evidence, blocking, auditd, isolation</li>
              <li><Link href="/projects/wazuh-xdr-lab" className={a}>XDR page</Link>: correlation rules and the final exercise</li>
              <li><Link href="/projects/wazuh-soar-lab" className={a}>SOAR page</Link>: the Shuffle playbook, approval and release</li>
            </ol>
          </section>

          <div className="flex items-center justify-between border-t border-neutral-800/80 pt-6"><Link href="/projects" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-400 transition hover:text-white"><ChevronLeft size={14} /> All Projects</Link><Link href="/" className="text-xs font-mono uppercase tracking-widest text-neutral-400 transition hover:text-white">Home</Link></div>
        </div>
      </Reveal>
    </PageShell>
  );
}
