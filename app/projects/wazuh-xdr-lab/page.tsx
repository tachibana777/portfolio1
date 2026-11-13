import { ZoomImage } from "@/components/ui/ZoomImage";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, ChevronLeft, Globe2, KeyRound, Network, Shield, Terminal } from "lucide-react";
import { PageShell } from "@/components/layout";
import { Reveal } from "@/components/ui";
import { ReadFirst, SeriesNav } from "@/components/projects/ReadFirst";

export const metadata = {
  title: "Wazuh XDR-style Correlation Lab | Kritsada Hongpatsa",
  description:
    "Six rules that link network, endpoint and login signals so one alert tells one stage of an attack.",
};

const sources = [
  { title: "Network", icon: Network, detail: "Suricata records flows and DNS queries. Rules 100100 (inbound listed IP) and 100300 (listed domain) come from earlier parts, and this part adds outbound rule 100110." },
  { title: "Endpoint", icon: Terminal, detail: "auditd and FIM record programs executed and files changed: rules 100400 and 100410 to 100413." },
  { title: "Authentication", icon: KeyRound, detail: "sshd via journald records failed and successful SSH logins: rules 5760, 5763, 5715 and 40101." },
];

const objectives = [
  "Add an outbound IOC rule so command-and-control callbacks can be recognised.",
  "Build correlation rules that cross source types (network, endpoint, authentication).",
  "Test every rule with wazuh-logtest first, then with real traffic.",
  "Tag each rule with a MITRE ATT&CK technique.",
  "Document where Wazuh correlation does and does not work.",
];

const rules = [
  ["100110", "Suricata event whose destination is an IP in misp_badip (known false positive: it matches the destination of any Suricata event, so a DHCP reply from the gateway to Kali raised 100530; fired 31 times, 11 Nov 06:23 to 12 Nov 09:18)", "12", "T1071"],
  ["100500", "SSH login succeeded from an IP in misp_badip", "15", "T1078"],
  ["100510 / 100511", "A persistence change within 10 minutes of a successful SSH login. 100511 has never fired in the lab (0 alerts, 6 to 13 November 2026); it was not exercised because the lab account is a system-type user.", "14", "T1078"],
  ["100520", "SSH login succeeded within 10 minutes of a brute-force alert from the same IP (IP not in the list). It is tested from the Manager (192.168.136.144), not from Kali, because Kali is in the MISP list and 100520 is for an IP that is not.", "15", "T1110"],
  ["100521", "The same, when the IP is in the MISP list", "15", "T1110"],
  ["100530", "An event toward a listed IP within 10 minutes of a program run from a temp folder", "15", "T1071"],
  ["100540", "A program run from a temp folder within 10 minutes of a DNS query for a listed domain", "14", "T1204"],
];

const blocks = [
  ["if_sid", "This rule is a child of another rule and only runs after it matched.", "The parent must match the same event"],
  ["if_matched_sid", "Look back: an earlier event matched this rule.", "Only works inside timeframe"],
  ["frequency + timeframe", "Count matches within N seconds.", "Counting is per Manager, not per process"],
  ["same_source_ip", "The earlier and the current event must share the source address.", "Compares srcip only, so Suricata's src_ip cannot be matched"],
  ["<list>", "Look a field up in a CDB list.", "One field against one list"],
  ["ignore", "After firing, stay silent for N seconds.", "Applies to the whole rule, not per IP"],
];

const joins = [
  ["SSH failure and SSH success", "Both use srcip", "Joined by IP (same_source_ip works)"],
  ["Suricata flow and SSH login", "src_ip versus srcip", "Cannot be joined by IP; the SSH address is checked against the list directly"],
  ["auditd and Suricata", "Nothing in common", "Joined only by host and time, not by the same program"],
  ["auditd and a DNS query", "Nothing in common", "Same: host and time"],
];

const stages = [
  ["1. Guess passwords", "8 wrong SSH passwords against the endpoint (KALI)", "5760 eight times, then 5763 at 07:56:36", "10 (5763, Wazuh built-in)"],
  ["2. Get in", "A correct SSH login (KALI)", "100521 at 07:57:12", "15"],
  ["3. Settle in", "Create a cron file (ENDPOINT)", "100510 at 07:58:18", "14"],
  ["4. Run a payload", "Run a script from /tmp (ENDPOINT)", "100400 at 07:59:36", "10"],
  ["5. Call home", "The script connects to Kali (ENDPOINT)", "100530 at 08:00:46", "15"],
  ["6. Download", "getent hosts qouv.fr, then run another script", "100300 at 08:04:20, 100540 at 08:04:44", "12 (100300), 14 (100540)"],
];

const mitre = [
  ["100400", "Program run from a temp folder", "Execution", "T1059"],
  ["100410 / 100411 / 100413", "Cron, authorized_keys, account database change", "Persistence", "T1053.003 / T1098.004 / T1136.001"],
  ["100412", "sudoers change", "Privilege Escalation", "T1548.003"],
  ["100110 / 100530", "Contact with a listed IP, then C2 callback", "Command and Control", "T1071"],
  ["100500 / 100510", "SSH success from a listed IP; persistence after login", "Initial Access / Persistence", "T1078"],
  ["100520 / 100521", "SSH success after brute force", "Credential Access", "T1110"],
  ["100540", "Listed domain then exec", "Execution", "T1204"],
];

const results = [
  ["100110", "logtest flow endpoint → .145 and endpoint → .2", "100110 level 12 / generic level 0"],
  ["100500", "Real SSH from Kali after a temporary allowlist exception", "alert at 03:49:38, level 15, srcip 192.168.136.145"],
  ["100510", "SSH login at 04:29:46, then a cron file", "alert at 04:29:54, path /etc/cron.d/edr_test"],
  ["100520", "Manager sent 8 wrong passwords, then logged in correctly", "5763 at 06:01:58, 100520 at 06:02:30"],
  ["100530", "Script from /tmp that opens a TCP connection to Kali", "100110 at 06:23:00, 100400 at 06:23:30, 100530 at 06:25:10"],
  ["100540", "getent hosts qouv.fr, then a script from /tmp", "100300 at 07:13:29, 100540 at 07:13:49"],
  ["All", "Negative cases in logtest (unlisted IP, normal login, PAM line, exec or outbound alone)", "none of the correlation rules fired"],
  ["100521", "Kali (a listed IP) sent 8 wrong passwords, then logged in (this single alert is both the test of the new rule and stage 2 of the final exercise)", "5763 at 07:56:36, 100521 at 07:57:12"],
  ["All", "Final exercise: six stages from Kali in about 8 minutes", "5763 → 100521 → 100510 → 100400 → 100530 → 100300 → 100540"],
  ["Dashboard", "Filter on the exercise rules, 14:55 to 15:06 local time", "12 hits, 10 of level 12 or higher; MITRE chart shows five techniques"],
];

const code = "text-sky-300";

export default function WazuhXdrLabPage() {
  return (
    <PageShell>
      <Reveal>
        <div className="space-y-12 pb-16">
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-400 transition hover:text-white"><ChevronLeft size={14} /> Back to Projects</Link>

          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-900/90 px-3 py-1 text-xs font-mono font-medium text-rose-400"><Shield size={12} /> Blue Team &amp; XDR</span>
              <span className="rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs font-mono text-neutral-400">Personal Cybersecurity Home Lab</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl md:text-5xl">Wazuh XDR-style Correlation Lab</h1>
            <p className="text-lg font-light text-neutral-300 sm:text-xl">Six rules that link network, endpoint and login signals so one alert tells one stage of an attack</p>
            <div className="flex flex-wrap gap-2 pt-1">{["Wazuh 4.14.9", "Suricata 8.0.8", "auditd", "journald", "Kali Linux", "MITRE ATT&CK"].map((tech) => <span key={tech} className="rounded-lg border border-neutral-800 bg-panel px-2.5 py-1 text-xs font-medium text-neutral-200">{tech}</span>)}</div>
          </header>

          <div className="grid grid-cols-1 gap-3 rounded-2xl border border-dashed border-neutral-800 bg-panel p-5 sm:grid-cols-2 md:grid-cols-4">{[{ label: "MISP", value: "IOC source · .142" }, { label: "Wazuh Manager", value: "Correlation rules · .144" }, { label: "Endpoint", value: "Agent, Suricata, auditd · .143" }, { label: "Kali Linux", value: "Simulated attacker · .145" }].map(({ label, value }) => <div key={label}><span className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500">{label}</span><p className="mt-1 text-sm font-medium text-neutral-200">{value}</p></div>)}</div>

          <SeriesNav current="/projects/wazuh-xdr-lab" />

          <ReadFirst
            part="XDR"
            intro={[
              ["What this part is", "XDR links different kinds of evidence into one story. A listed IP, a successful login and a new cron job are each minor alone; together they describe an attack. In this lab it is done with Wazuh correlation rules on the Manager (frequency 2, timeframe 600 s): a second event within ten minutes of the first."],
              ["The plan", "Learn what Wazuh can join (shared fields such as the source IP, the agent), then add rules one at a time: outbound to a listed IP (100110), SSH login from a listed IP (100500), persistence after login (100510, 100511), brute force then success (100520, 100521), program from /tmp then contact with a listed IP (100530), listed domain then execution (100540). Finish with one attack from Kali that touches several rules."],
            ]}
            image={{ src: "/events/diagram-04-xdr-chain.png", alt: "The final exercise chain, 11 Nov 2026 UTC", width: 1568, height: 124 }}
            afterImage={[
              ["How it differs", "EDR looks deeply at one host; XDR looks across sources (network, logins, endpoint). XDR here detects but does not act, on purpose: acting is SOAR's job."],
              ["How it works with the others", <>It needs MISP lists (IPs, domains; see the <Link href="/projects/misp-threat-intel-lab" className="text-sky-300 hover:underline">MISP page</Link>) and EDR events (/tmp execution, persistence; see the <Link href="/projects/wazuh-edr-lab" className="text-sky-300 hover:underline">EDR page</Link>). Seven of its rules (100500, 100510, 100511, 100520, 100521, 100530, 100540) are sent to Shuffle (<Link href="/projects/wazuh-soar-lab" className="text-sky-300 hover:underline">SOAR page</Link>).</>],
              ["Prepare", "Everything from the MISP and EDR parts working; test events ready for wazuh-logtest; Kali for the exercise."],
            ]}
            checklist={[
              "Each rule passes wazuh-logtest before a live test",
              "100520 tested from the Manager, because Kali is in the list and 100520 is for an IP that is not",
              "The final exercise yields the chain above (levels 10, 15, 14, 10, 15, 12, 14; not a straight climb)",
            ]}
            learn="Rule order matters: 100500 matched first and hid 100520, which is why 100521 was added. Alert counts: 100500 ×3, 100510 ×3, 100520 ×1, 100521 ×1, 100530 ×6, 100540 ×2."
            limits="Rule 100511 never fired (untested). Rule 100110 can false-alert on a DHCP reply from the gateway (31 alerts). Correlation is by host and time only."
          />
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">1. Project Overview</h2>
            <div className="space-y-3.5 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <p>A single alert says that one thing happened: &quot;a program ran from /tmp&quot;. A <strong className="font-semibold text-neutral-100">correlation</strong> says that several things happened in a meaningful order: &quot;a listed domain was queried, then a program ran from /tmp&quot;. That is much stronger evidence, and it is the core idea of XDR in this lab.</p>
              <p>This part adds the outbound rule 100110 and six correlation rules (100500, 100510, 100520, 100521, 100530, 100540; rule 100521 is the child rule added to close a gap that the final exercise exposed; see the timeline in section 7). It is an XDR-style pipeline, not a commercial XDR: one Manager, one endpoint, Linux only, correlation by host and time (not by process).</p>
            </div>
          </section>

          <section className="space-y-4"><h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">2. Three Signal Sources</h2><div className="grid gap-4 md:grid-cols-3">{sources.map(({ title, icon: Icon, detail }) => <div key={title} className="rounded-2xl border border-neutral-800 bg-panel p-5"><Icon size={20} className="text-rose-400" /><h3 className="mt-3 font-semibold text-neutral-100">{title}</h3><p className="mt-3 text-sm leading-relaxed text-neutral-300">{detail}</p></div>)}</div></section>

          <section className="space-y-4"><h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">3. Objectives</h2><div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">{objectives.map((objective) => <div key={objective} className="flex items-start gap-2.5 rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-3"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-sky-400" /><span className="text-sm font-light text-neutral-300">{objective}</span></div>)}</div></section>

          <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">4. How Correlation Works in Wazuh</h2>
            <p className="text-sm font-light leading-relaxed text-neutral-300 sm:text-base">Field names decide what can be joined. The network source says <code className={code}>src_ip</code> while the SSH source says <code className={code}>srcip</code>; that one difference decides what can and cannot be correlated.</p>
            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-neutral-800 bg-neutral-900/80 font-mono text-xs uppercase tracking-wider text-neutral-400"><tr><th className="px-4 py-3 font-medium">Option</th><th className="px-4 py-3 font-medium">What it does</th><th className="px-4 py-3 font-medium">Limit</th></tr></thead>
                <tbody className="divide-y divide-neutral-800/80 font-light text-neutral-300">{blocks.map(([a, b, c]) => <tr key={a} className="hover:bg-neutral-900/30"><td className="px-4 py-2.5 font-mono text-sky-300">{a}</td><td className="px-4 py-2.5">{b}</td><td className="px-4 py-2.5">{c}</td></tr>)}</tbody>
              </table>
            </div>
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5 font-mono text-xs leading-8 text-neutral-300 sm:text-sm">
              <p>1. First event (program run from /tmp) fires its own rule; Wazuh remembers it for <span className="text-sky-400">timeframe</span> seconds</p>
              <p>2. Second event (outbound connection to a listed IP) checks whether the remembered event exists</p>
              <p>3. If yes, the correlation rule fires with a higher level</p>
              <p>4. The correlation rule is written so that the <span className="text-sky-400">second</span> event is the trigger</p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-neutral-800 bg-neutral-900/80 font-mono text-xs uppercase tracking-wider text-neutral-400"><tr><th className="px-4 py-3 font-medium">Pair of sources</th><th className="px-4 py-3 font-medium">Shared value</th><th className="px-4 py-3 font-medium">Result</th></tr></thead>
                <tbody className="divide-y divide-neutral-800/80 font-light text-neutral-300">{joins.map(([a, b, c]) => <tr key={a} className="hover:bg-neutral-900/30"><td className="px-4 py-2.5 font-medium text-neutral-200">{a}</td><td className="px-4 py-2.5">{b}</td><td className="px-4 py-2.5">{c}</td></tr>)}</tbody>
              </table>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <li><strong className="font-semibold text-neutral-100">One event, one alert.</strong> The most specific rule that matched is the one logged; its parents do not appear separately.</li>
              <li><strong className="font-semibold text-neutral-100">One login, two log lines.</strong> sshd writes <code className={code}>Accepted password ... from &lt;ip&gt;</code> and a PAM line with no source IP.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">5. The Rules</h2>
            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-neutral-800 bg-neutral-900/80 font-mono text-xs uppercase tracking-wider text-neutral-400"><tr><th className="px-4 py-3 font-medium">Rule</th><th className="px-4 py-3 font-medium">Meaning</th><th className="px-4 py-3 font-medium">Level</th><th className="px-4 py-3 font-medium">MITRE</th></tr></thead>
                <tbody className="divide-y divide-neutral-800/80 font-light text-neutral-300">{rules.map(([id, m, l, t]) => <tr key={id} className="hover:bg-neutral-900/30"><td className="px-4 py-2.5 font-mono text-sky-300">{id}</td><td className="px-4 py-2.5">{m}</td><td className="px-4 py-2.5">{l}</td><td className="px-4 py-2.5 font-mono">{t}</td></tr>)}</tbody>
              </table>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-neutral-800 bg-panel p-5"><h3 className="font-semibold text-neutral-100">100500: login from a listed IP</h3><p className="mt-3 text-sm leading-relaxed text-neutral-300">The first design (a flow from a listed IP, then an SSH success with <code className={code}>same_source_ip</code>) never fired because the two events name the address differently. Final design: check <code className={code}>srcip</code> of the SSH success directly against the list, on rules 5715 and 40101.</p></div>
              <div className="rounded-2xl border border-neutral-800 bg-panel p-5"><h3 className="font-semibold text-neutral-100">100520 and 100521: brute force, then success</h3><p className="mt-3 text-sm leading-relaxed text-neutral-300">Rule 5763 means 8 failures within 120 seconds. For a listed IP, rule 100500 won and hid 100520, so 100521 was added as a child of 100500. Listed plus brute force gives 100521, unlisted gives 100520, listed without brute force gives 100500.</p></div>
              <div className="rounded-2xl border border-neutral-800 bg-panel p-5"><h3 className="font-semibold text-neutral-100">100530: /tmp program, then listed IP</h3><p className="mt-3 text-sm leading-relaxed text-neutral-300">Malware that has just started often phones home. auditd has no IP and Suricata has no program name, so the rule proves both happened on this machine within 10 minutes, not that one program did both.</p></div>
              <div className="rounded-2xl border border-neutral-800 bg-panel p-5"><h3 className="font-semibold text-neutral-100">100540: listed domain, then execution</h3><p className="mt-3 text-sm leading-relaxed text-neutral-300">A payload is often downloaded from a bad domain and run straight away. The rule needs a 100300 domain alert before the 100400 execution alert.</p></div>
            </div>
            <div className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950 p-3 font-mono text-xs text-emerald-400"><pre>{`<rule id="100530" level="15" frequency="2" timeframe="600">
  <if_sid>100110</if_sid>
  <if_matched_sid>100400</if_matched_sid>
  <description>XDR: outbound connection to a MISP-listed IP ($(dest_ip)) within 10 minutes of a program executed from a temp directory (possible C2 callback)</description>
  <mitre><id>T1071</id></mitre>
</rule>`}</pre></div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">6. Build &amp; Test Method</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-neutral-800 bg-panel p-5"><h3 className="font-semibold text-neutral-100">Four moves per rule</h3><p className="mt-3 text-sm leading-relaxed text-neutral-300">Add the rule, check the configuration with <code className={code}>wazuh-analysisd -t</code>, replay events in <code className={code}>wazuh-logtest</code> (including the case that must not fire), then generate real events. The local rules file is backed up before each rule.</p></div>
              <div className="rounded-2xl border border-neutral-800 bg-panel p-5"><h3 className="font-semibold text-neutral-100">Replay helpers</h3><p className="mt-3 text-sm leading-relaxed text-neutral-300">Shell functions build a Suricata flow, a Suricata DNS query and an auditd execution record, so correlations can be replayed without touching the network. <code className={code}>wazuh-logtest -v</code> shows every decoded field, which is how all field names were found.</p></div>
              <div className="rounded-2xl border border-neutral-800 bg-panel p-5"><h3 className="font-semibold text-neutral-100">Temporary exception for Kali</h3><p className="mt-3 text-sm leading-relaxed text-neutral-300">Kali is in the IP list, so block-ip.sh would drop it before SSH completes. A temporary allowlist entry was added for the test and removed afterwards, with a check that the count of the Kali address in the script is 0.</p></div>
              <div className="rounded-2xl border border-neutral-800 bg-panel p-5"><h3 className="font-semibold text-neutral-100">Duplicate rule IDs</h3><p className="mt-3 text-sm leading-relaxed text-neutral-300">A rule block was once appended twice and <code className={code}>wazuh-analysisd -t</code> warned that 100521 was duplicated. Each rule is checked with <code className={code}>grep -c</code> and must appear exactly once.</p></div>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">7. Final Exercise: One Attack, Several Stages</h2>
            <p className="text-sm font-light leading-relaxed text-neutral-300 sm:text-base">One continuous multi-step attack from Kali, run on 11 November 2026. Every stage fired, in order, from 07:56:36 to 08:04:44 UTC (about eight minutes), and the alert levels range from 10 to 15; the correlation rules sit at 14 and 15.</p>
            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-neutral-800 bg-neutral-900/80 font-mono text-xs uppercase tracking-wider text-neutral-400"><tr><th className="px-4 py-3 font-medium">Stage</th><th className="px-4 py-3 font-medium">Action</th><th className="px-4 py-3 font-medium">Alert (UTC)</th><th className="px-4 py-3 font-medium">Level</th></tr></thead>
                <tbody className="divide-y divide-neutral-800/80 font-light text-neutral-300">{stages.map(([a, b, c, d]) => <tr key={a} className="hover:bg-neutral-900/30"><td className="px-4 py-2.5 font-medium text-neutral-200">{a}</td><td className="px-4 py-2.5">{b}</td><td className="px-4 py-2.5 font-mono text-sky-300">{c}</td><td className="px-4 py-2.5">{d}</td></tr>)}</tbody>
              </table>
            </div>
            <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
              <ZoomImage src="/events/xdr-01-events-exercise.png" alt="Wazuh Events view of the final exercise alerts: 5763, 100521, 100510, 100400, 100530, 100300 and 100540" width={1919} height={1079} className="h-auto w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
              <ZoomImage src="/events/xdr-02-dashboard-exercise.png" alt="Wazuh Threat Hunting dashboard for the exercise: 12 alerts, 10 of level 12 or above, MITRE ATT&CK chart" width={1919} height={1079} className="h-auto w-full object-cover" />
            </div>
            <ul className="list-disc space-y-2 pl-5 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <li>Only the most specific alert is logged: no separate 100500 before 100521, no 100410 before 100510, no 100110 before 100530.</li>
              <li>The first attempt (07:48:34, from Kali, a listed IP) gave only 100500, because 100500 matches first and hides 100520. That led to the new rule 100521, a child of 100500 for a listed IP that guessed passwords first.</li><li>Timeline: 07:48:34 first attempt, only 100500 fires; rule 100521 is added; 07:56:36 5763 (brute force) from Kali; 07:57:12 <strong className="font-semibold text-neutral-100">100521</strong> fires. Rule 100521 fired once in the whole lab, so that one alert is both the test of the new rule and stage 2 of the final exercise.</li>
              <li>Each correlation fired within 10 minutes of its trigger, and none fired when its trigger was missing.</li>
              <li>The alerts were copied to a file before clean-up, because deleting the test files creates alerts of its own.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">8. MITRE ATT&amp;CK Mapping</h2>
            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-neutral-800 bg-neutral-900/80 font-mono text-xs uppercase tracking-wider text-neutral-400"><tr><th className="px-4 py-3 font-medium">Rule</th><th className="px-4 py-3 font-medium">Detects</th><th className="px-4 py-3 font-medium">Tactic</th><th className="px-4 py-3 font-medium">Technique</th></tr></thead>
                <tbody className="divide-y divide-neutral-800/80 font-light text-neutral-300">{mitre.map(([a, b, c, d]) => <tr key={a} className="hover:bg-neutral-900/30"><td className="px-4 py-2.5 font-mono text-sky-300">{a}</td><td className="px-4 py-2.5">{b}</td><td className="px-4 py-2.5">{c}</td><td className="px-4 py-2.5 font-mono">{d}</td></tr>)}</tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">9. Results &amp; Evidence</h2>
            <p className="text-sm font-light text-neutral-400">Times are UTC from alerts.json; the dashboard shows Thai time (UTC+7).</p>
            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-neutral-800 bg-neutral-900/80 font-mono text-xs uppercase tracking-wider text-neutral-400"><tr><th className="px-4 py-3 font-medium">Rule</th><th className="px-4 py-3 font-medium">Test</th><th className="px-4 py-3 font-medium">Result</th></tr></thead>
                <tbody className="divide-y divide-neutral-800/80 font-light text-neutral-300">{results.map(([a, b, c], i) => <tr key={i} className="hover:bg-neutral-900/30"><td className="px-4 py-2.5 font-mono text-sky-300">{a}</td><td className="px-4 py-2.5">{b}</td><td className="px-4 py-2.5">{c}</td></tr>)}</tbody>
              </table>
            </div>
            <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
              <ZoomImage src="/events/xdr-04-rule-100530-details.png" alt="Document details of a rule 100530 alert: outbound connection from 192.168.136.143 to 192.168.136.145 port 22, MITRE T1071" width={1919} height={1079} className="h-auto w-full object-cover" />
            </div>
            <p className="flex items-start gap-2 text-sm font-light leading-relaxed text-neutral-300"><Globe2 size={16} className="mt-0.5 shrink-0 text-sky-400" />The opened 100530 alert shows <code className={code}>data.event_type</code> ssh, 192.168.136.143:50458 to 192.168.136.145:22, which is the test script&apos;s own connection to Kali.</p>
          </section>

          <section className="rounded-2xl border border-amber-900/50 bg-amber-950/20 p-5"><h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-100"><AlertTriangle size={18} className="text-amber-400" /> Scope &amp; Limitations</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-300"><li>This is an XDR-style pipeline, not a commercial XDR: one Manager, one endpoint, Linux only.</li><li>Correlation between auditd and Suricata is by host and time, not by process, so it does not prove the same program did both.</li><li>Rule 100110 matches the destination of any Suricata event: a DHCP reply from the gateway to Kali raised 100530. Alert order is also not event order, because sources are processed at different speeds.</li><li>Rule 100530 appeared five times after the script had finished; only one was opened, and the causes of the other four were not checked.</li><li>Persistence correlation (100510) cannot be tested in logtest because it comes from file monitoring, not a log line.</li></ul></section>

          <div className="flex items-center justify-between border-t border-neutral-800/80 pt-6"><Link href="/projects" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-400 transition hover:text-white"><ChevronLeft size={14} /> All Projects</Link><Link href="/" className="text-xs font-mono uppercase tracking-widest text-neutral-400 transition hover:text-white">Home</Link></div>
        </div>
      </Reveal>
    </PageShell>
  );
}
