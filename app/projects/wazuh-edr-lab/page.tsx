import { ZoomImage } from "@/components/ui/ZoomImage";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, ChevronLeft, Database, Network, Shield, Terminal } from "lucide-react";
import { PageShell } from "@/components/layout";
import { Reveal } from "@/components/ui";
import { ReadFirst, SeriesNav } from "@/components/projects/ReadFirst";

export const metadata = {
  title: "Wazuh EDR Lab | Kritsada Hongpatsa",
  description:
    "Detect known malware by hash, keep evidence off the host, quarantine or delete, block IPs and domains, watch persistence, triage and isolate.",
};

const objectives = [
  "Detect known malware by file hash, not by path.",
  "Preserve evidence before touching a file: hash, metadata, password-protected zip, copy on a separate host.",
  "Delete only if every earlier step succeeded; quarantine everywhere else.",
  "Block listed IPs and domains with an allowlist, a configured timeout (not working, see Limitations) and a five-minute rule-wide throttle.",
  "Record process execution and persistence changes.",
  "Provide a read-only triage script and a reversible isolation script.",
  "Log every automated action.",
];

const capabilities = [
  ["Detect a known-bad file by SHA256", "FIM + CDB list of about 26,600 SHA256 hashes from MISP (26,617 from MISP plus one EICAR test hash, 26,618 lines; the same on 11, 12 and 13 November 2026) + rule 100200"],
  ["Preserve evidence, then delete or quarantine", "collect-and-remove.sh, an evidence user and a restricted SSH key"],
  ["Block listed IPs and domains", "block-ip.sh, block-domain.sh with allowlists and timeouts"],
  ["See which program ran from a risky folder", "auditd + rule 100400"],
  ["Detect persistence (cron, SSH keys, sudoers, accounts)", "FIM + rules 100410 to 100413"],
  ["Read SSH logins, rootcheck and SCA", "journald localfile, rootcheck, SCA"],
  ["Produce a triage report", "investigate.sh (read-only)"],
  ["Cut the host off from the network, and undo it", "isolate.sh with a mandatory automatic release"],
];

const steps = [
  ["1", "Hash list and rule 100200", "CDB list malware_hashes (hash:label) registered in ossec.conf, plus rule 100200 (level 14) on FIM rules 554 and 550. The field name is sha256; syscheck.sha256_after did not work inside a rule."],
  ["2", "Watch folders (FIM)", "Realtime syscheck on /opt/malware_test (delete mode) and /tmp, /var/tmp, /home (quarantine mode). Verified that rule 554 arrives with a sha256_after value before building anything on top."],
  ["3", "Evidence channel", "An evidence user on the Manager with /srv/evidence (mode 700) and a dedicated ed25519 key on the endpoint. The full public key line is required, and the private key must be mode 600."],
  ["4", "Lock the key down", "authorized_keys forces evidence-gate.sh with restrict: only scp into /srv/evidence and sha256sum of an evidence zip are allowed. ssh ... \"ls /\" returns denied."],
  ["5", "Evidence and response script", "collect-and-remove.sh refuses path traversal, symlinks, missing files and the empty-file hash, then hashes, writes metadata.json, builds sample.zip (password infected), copies it to the Manager, compares SHA256 there, and only then deletes or quarantines."],
  ["6", "Active Response wiring", "command and active-response blocks for rule 100200 added before the last </ossec_config>. The default example in an XML comment does nothing, which is exactly why the first run never fired."],
  ["7", "MISP hash feed", "fetch_hashes.sh pulls sha256 attributes (to_ids=1, published, 90d), aborts on a non-200 response, backs up the old list, removes the empty-file hash, always keeps EICAR, and runs from cron every 6 hours."],
  ["8", "Block IPs and domains", "block-ip.sh (iptables DROP) on rule 100100 and block-domain.sh (/etc/hosts 0.0.0.0) on rule 100300, both with allowlists. Wazuh is configured with a 600 s timeout, but in this lab the automatic release did not run (see Scope & Limitations). Release a block with unblock-ip.sh or through the SOAR playbook."],
  ["9", "auditd and persistence rules", "auditd watches /tmp, /var/tmp and /dev/shm for execution (key tmp_exec) feeding rule 100400; rules 100410 to 100413 raise FIM events for cron, authorized_keys, sudoers and account files."],
  ["10", "SSH logins, rootcheck, SCA", "sshd logs to journald on this minimal Ubuntu, which the agent already read. Three failed logins as a fake user produced rule 5710 three times (T1110.001)."],
  ["11", "Triage script", "investigate.sh is read-only and writes a 13-section report: logins, ports, connections, processes, temp-dir executables, recent files, cron, sudoers, keys, firewall, quarantine and last responses."],
  ["12", "Isolation", "isolate.sh puts the host behind EDR_IN and EDR_OUT chains that only allow the Manager, with a mandatory automatic release through a systemd timer. Deliberately not tied to any rule."],
];

const rules = [
  ["100200", "14", "Known malware hash detected (sha256 in CDB malware_hashes)", "-"],
  ["100400", "10", "Program executed from a temp directory (auditd key tmp_exec)", "T1059"],
  ["100410", "10", "Cron job created or changed", "T1053.003"],
  ["100411", "12", "SSH authorized_keys created or changed", "T1098.004"],
  ["100412", "12", "sudoers created or changed", "T1548.003"],
  ["100413", "10", "Account database changed (/etc/passwd, shadow, group)", "T1136.001"],
];

const results = [
  ["safe.txt and EICAR dropped into /opt/malware_test", "safe.txt kept; EICAR removed; log OK case=... transferred=192.168.136.144 ... local_copy_removed"],
  ["Evidence on the Manager", "metadata.json, sample.zip, sample.zip.sha256; the zip SHA256 equals the stored value; unzip -l lists eicar.com.txt (68 bytes); eight case folders after the tests"],
  ["MISP hash import", "updated: MISP sha256=26618, total in list=26619 (an earlier output; the list had 26,618 lines on 11, 12 and 13 November 2026); the .cdb was recompiled by wazuh-control reload"],
  ["Evidence key abuse test", "ssh ... \"ls /\" returns denied; sha256sum of a case zip works; scp -O works"],
  ["EICAR in /tmp", "alert 100200; file moved to quarantine (mode ----------); .info written; evidence on the Manager; log QUARANTINED ... transfer_ok=1"],
  ["Empty file, symlink and a normal file in /tmp", "no 100200 alert for any of them"],
  ["Listed domain (qouv.fr) versus a normal one (example.org)", "qouv.fr sinkholed in /etc/hosts; example.org untouched"],
  ["Script run from /tmp", "rule 100400, level 10, MITRE T1059"],
  ["cron file, sudoers file, authorized_keys change", "100410 (level 10), 100412 (level 12), 100411 (level 12)"],
  ["Test account add and delete", "100413 account database changed; the test account was removed"],
  ["Three failed SSH logins as a fake user", "rule 5710 three times, MITRE T1110.001"],
  ["SCA and rootcheck", "102 SCA alerts at the Manager; rootcheck scans with no findings"],
  ["Triage report", "13 sections; temp-dir processes and changed files correctly empty on a clean host"],
  ["Isolation, 60 s, from a session coming from the Manager", "Session survived; internet blocked; released at 06:56:50 (30 s late before the accuracy fix)"],
  ["Isolation, 40 s, after the accuracy fix", "Released at 06:58:49, exactly on time"],
  ["Block IP and block domain log", "SINKHOLED qouv.fr and repeated BLOCKED 192.168.136.145 whenever Kali produced new traffic"],
];

const checklist = [
  ["Agent connected", "agent_control -l", "misp-endpoint ... Active"],
  ["Rules valid", "wazuh-analysisd -t; echo $?", "prints 0"],
  ["Hash list size", "wc -l /var/ossec/etc/lists/malware_hashes", "26,000 or more"],
  ["Malware delete mode", "drop EICAR in /opt/malware_test", "file gone, log OK ... removed"],
  ["Quarantine mode", "drop EICAR in /tmp", "file in /var/ossec/quarantine/, log QUARANTINED"],
  ["Evidence key locked", "ssh -i evidence_key evidence@... \"ls /\"", "denied"],
  ["auditd running", "auditctl -l", "three tmp_exec rules"],
  ["Isolation", "isolate.sh isolate 60 (from the Manager)", "blocked, then released automatically"],
];

const code = "text-sky-300";

export default function WazuhEdrLabPage() {
  return (
    <PageShell>
      <Reveal>
        <div className="space-y-12 pb-16">
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-400 transition hover:text-white">
            <ChevronLeft size={14} /> Back to Projects
          </Link>

          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-900/90 px-3 py-1 text-xs font-mono font-medium text-sky-400"><Shield size={12} /> Blue Team &amp; EDR</span>
              <span className="rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs font-mono text-neutral-400">Personal Cybersecurity Home Lab</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl md:text-5xl">Wazuh EDR Lab</h1>
            <p className="text-lg font-light text-neutral-300 sm:text-xl">Detect known malware by hash, keep evidence off the host, quarantine or delete, block IPs and domains, watch persistence, triage and isolate</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Wazuh 4.14.9", "auditd", "iptables", "OpenSSH", "Bash", "Ubuntu 24.04", "Active Response", "FIM"].map((tech) => <span key={tech} className="rounded-lg border border-neutral-800 bg-panel px-2.5 py-1 text-xs font-medium text-neutral-200">{tech}</span>)}
            </div>
          </header>

          <div className="grid grid-cols-1 gap-3 rounded-2xl border border-dashed border-neutral-800 bg-panel p-5 sm:grid-cols-2 md:grid-cols-4">
            {[{ label: "MISP-intel", value: "Hash source · .142", icon: Database }, { label: "Wazuh Manager", value: "Rules + evidence store · .144", icon: Shield }, { label: "MISP-Endpoint", value: "Agent, auditd, scripts · .143", icon: Network }, { label: "Kali Linux", value: "Simulated attacker · .145", icon: Terminal }].map(({ label, value, icon: Icon }) => <div key={label}><Icon size={16} className="text-sky-400" /><span className="mt-2 block text-[11px] font-mono uppercase tracking-wider text-neutral-500">{label}</span><p className="mt-1 text-sm font-medium text-neutral-200">{value}</p></div>)}
          </div>

          <SeriesNav current="/projects/wazuh-edr-lab" />

          <ReadFirst
            part="EDR"
            intro={[
              ["What this part is", "EDR (endpoint detection and response) means software on a host that records what happens (files, programs, logins, persistence) and can act: collect evidence, delete or quarantine, block, isolate. Here the endpoint is misp-endpoint (Wazuh agent, Suricata, auditd) and the Manager runs the rules."],
              ["The plan", "Start with the simplest case (a known-bad file hash) and add one capability at a time: hash list and rule 100200 → file monitoring → evidence channel → collect-and-remove script → hash feed from MISP → block IPs and domains → auditd and persistence rules → SSH/rootcheck/SCA → triage script → host isolation."],
            ]}
            image={{ src: "/events/diagram-03-edr-evidence-flow.png", alt: "Evidence flow for a known-bad file", width: 1342, height: 3428 }}
            afterImage={[
              ["How it differs", "MISP only knows; EDR sees one host closely and can change it. It is blind to what happens between hosts, which is the XDR part's job. It also acts only by fixed scripts; deciding whether to act automatically is the SOAR part's job."],
              ["How it works with the others", <>MISP supplies the hash list (26,617 hashes + one EICAR line). The block and isolate scripts written here are the same ones Shuffle calls later through the Wazuh API (<Link href="/projects/wazuh-soar-lab" className="text-sky-300 hover:underline">SOAR page</Link>). The hash list comes from the <Link href="/projects/misp-threat-intel-lab" className="text-sky-300 hover:underline">MISP page</Link>; the <Link href="/projects/wazuh-xdr-lab" className="text-sky-300 hover:underline">XDR page</Link> builds on these events.</>],
              ["Prepare", "misp-endpoint (2 vCPU, 1.9 GB, 96 GB) and wazuh-manager. Use EICAR as the test file; never real malware."],
            ]}
            checklist={[
              "EICAR detected (rule 100200, level 14) and removed or quarantined; the file is touched only after the Manager's SHA256 matches",
              "auditctl -l shows three tmp_exec rules",
              "Program run from /tmp raises 100400; persistence changes raise 100410 to 100413",
              "Isolation releases by itself after its timer",
            ]}
            learn="A safeguard chain protects you: allowlists, hash verification, quarantine outside the test folder. Rule 100200 fired 19 times; EDR rules 100400 to 100413 fired 18 times in total."
            limits="Wazuh's configured 600 s block timeout did not release blocks in this lab (17 h 43 min without UNBLOCKED; cause unknown). Domain release is unverified. iptables rules vanish on reboot. An unknown file is not caught by hash."
          />
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">1. Project Overview</h2>
            <div className="space-y-3.5 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <p>EDR (endpoint detection and response) means software on the host that records what happens there, raises alerts, and can act. In this lab the endpoint is <code className={code}>misp-endpoint</code> and the &quot;EDR&quot; is built from open-source parts: the Wazuh agent (file monitoring, log collection, rootcheck, SCA), auditd (program execution records), iptables (blocking and isolation) and shell scripts that Wazuh runs as Active Response.</p>
              <p>It is part of the MISP → Wazuh Threat Intelligence, EDR and XDR home lab (private VMware lab). Part 1 only <strong className="font-semibold text-neutral-100">alerts</strong> when a listed IP touches the network. This part looks <strong className="font-semibold text-neutral-100">inside the host</strong> and <strong className="font-semibold text-neutral-100">acts</strong>. All malware tests use EICAR or empty test files.</p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-neutral-800 bg-neutral-900/80 font-mono text-xs uppercase tracking-wider text-neutral-400"><tr><th className="px-4 py-3 font-medium">Capability</th><th className="px-4 py-3 font-medium">Built from</th></tr></thead>
                <tbody className="divide-y divide-neutral-800/80 font-light text-neutral-300">{capabilities.map(([a, b]) => <tr key={a} className="hover:bg-neutral-900/30"><td className="px-4 py-2.5 font-medium text-neutral-200">{a}</td><td className="px-4 py-2.5">{b}</td></tr>)}</tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4"><h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">2. Objectives</h2><div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">{objectives.map((objective) => <div key={objective} className="flex items-start gap-2.5 rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-3"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-sky-400" /><span className="text-sm font-light text-neutral-300">{objective}</span></div>)}</div></section>

          <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">3. Response Flow</h2>
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5 font-mono text-xs leading-8 text-neutral-300 sm:text-sm">
              <p><span className="text-sky-400">A. Malware</span> FIM (realtime) <span className="text-sky-400">-&gt;</span> rule 100200 (sha256 in CDB malware_hashes) <span className="text-sky-400">-&gt;</span> collect-and-remove.sh</p>
              <p className="pl-4">/opt/malware_test: evidence <span className="text-sky-400">-&gt;</span> copy to Manager <span className="text-sky-400">-&gt;</span> verify hash <span className="text-sky-400">-&gt;</span> DELETE</p>
              <p className="pl-4">/tmp /var/tmp /home: evidence <span className="text-sky-400">-&gt;</span> copy to Manager <span className="text-sky-400">-&gt;</span> verify hash <span className="text-sky-400">-&gt;</span> QUARANTINE</p>
              <p><span className="text-sky-400">B. IP</span> Suricata flow <span className="text-sky-400">-&gt;</span> rule 100100 <span className="text-sky-400">-&gt;</span> block-ip.sh <span className="text-sky-400">-&gt;</span> iptables DROP (timeout configured as 600 s; not working in this lab)</p>
              <p><span className="text-sky-400">C. Domain</span> Suricata DNS <span className="text-sky-400">-&gt;</span> rule 100300 <span className="text-sky-400">-&gt;</span> block-domain.sh <span className="text-sky-400">-&gt;</span> /etc/hosts 0.0.0.0 (timeout configured as 600 s; release not verified)</p>
              <p><span className="text-sky-400">D. Telemetry</span> auditd (tmp_exec) <span className="text-sky-400">-&gt;</span> 100400; FIM on cron, sudoers, authorized_keys, passwd <span className="text-sky-400">-&gt;</span> 100410-100413</p>
              <p><span className="text-sky-400">E. Analyst</span> investigate.sh (read-only report), isolate.sh (manager-only network, auto release)</p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
              <ZoomImage src="/events/edr-01-overview.png" alt="Wazuh overview dashboard after the EDR tests, with one active agent" width={1919} height={1079} className="h-auto w-full object-cover" />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">4. Step-by-Step Build</h2>
            <p className="text-sm font-light leading-relaxed text-neutral-300 sm:text-base">Each step has a reason, a location (MANAGER or ENDPOINT), an expected result and an undo.</p>
            <div className="grid gap-4 md:grid-cols-2">
              {steps.map(([n, title, desc]) => (
                <div key={n} className="rounded-2xl border border-neutral-800 bg-panel p-5">
                  <h3 className="font-semibold text-neutral-100"><span className="mr-2 font-mono text-sky-400">Step {n}</span>{" "}{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-300">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">5. Detection Rules</h2>
            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-neutral-800 bg-neutral-900/80 font-mono text-xs uppercase tracking-wider text-neutral-400"><tr><th className="px-4 py-3 font-medium">Rule</th><th className="px-4 py-3 font-medium">Level</th><th className="px-4 py-3 font-medium">Detects</th><th className="px-4 py-3 font-medium">MITRE</th></tr></thead>
                <tbody className="divide-y divide-neutral-800/80 font-light text-neutral-300">{rules.map(([id, lvl, d, m]) => <tr key={id} className="hover:bg-neutral-900/30"><td className="px-4 py-2.5 font-mono text-sky-300">{id}</td><td className="px-4 py-2.5">{lvl}</td><td className="px-4 py-2.5">{d}</td><td className="px-4 py-2.5 font-mono">{m}</td></tr>)}</tbody>
              </table>
            </div>
            <div className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950 p-3 font-mono text-xs text-emerald-400"><pre>{`<group name="malware,">
  <rule id="100200" level="14">
    <if_sid>554,550</if_sid>
    <list field="sha256" lookup="match_key">etc/lists/malware_hashes</list>
    <description>Known malware hash detected: $(file)</description>
  </rule>
</group>`}</pre></div>
            <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
              <ZoomImage src="/events/edr-02-events-edr-rules.png" alt="Wazuh Threat Hunting events for EDR rules 100200, 100400, 100410, 100411 and 100412" width={1919} height={1079} className="h-auto w-full object-cover" />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">6. Safeguards</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-neutral-800 bg-panel p-5"><h3 className="font-semibold text-neutral-100">Evidence before action</h3><p className="mt-3 text-sm leading-relaxed text-neutral-300">The original is touched only after the zip exists, the copy reached the Manager, and the remote <code className={code}>sha256sum</code> matches the local value. Any failure leaves the original in place.</p></div>
              <div className="rounded-2xl border border-neutral-800 bg-panel p-5"><h3 className="font-semibold text-neutral-100">Restricted key</h3><p className="mt-3 text-sm leading-relaxed text-neutral-300">If the endpoint is compromised the attacker holds the evidence key, so it can only deliver files and hash them. Shell commands such as <code className={code}>ls /</code> return <code className={code}>denied</code>.</p></div>
              <div className="rounded-2xl border border-neutral-800 bg-panel p-5"><h3 className="font-semibold text-neutral-100">Allowlists and timeouts</h3><p className="mt-3 text-sm leading-relaxed text-neutral-300">Infrastructure IPs and major domains are never blocked, and a 600 s timeout is configured, so Wazuh should call the script again with <code className={code}>delete</code>. In this lab it did not: after the last block of 192.168.136.145 (12 Nov 09:18:46 UTC) no <code className={code}>UNBLOCKED</code> line appeared for 17 h 43 min, until the endpoint rebooted. The command definition has <code className={code}>timeout_allowed=yes</code> and the script has a <code className={code}>delete</code> branch; the cause was not found. Domain release was not verified.</p></div>
              <div className="rounded-2xl border border-neutral-800 bg-panel p-5"><h3 className="font-semibold text-neutral-100">Reversible isolation</h3><p className="mt-3 text-sm leading-relaxed text-neutral-300">Isolation keeps the Manager reachable and always releases itself (30 to 3600 s). It is not tied to a rule, so automation can never lock the analyst out.</p></div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
                <ZoomImage src="/events/edr-03-evidence-folder.png" alt="Evidence case folders on the Manager with matching sample.zip SHA256 values" width={706} height={580} className="h-auto w-full object-contain" />
              </div>
              <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
                <ZoomImage src="/events/edr-04-active-responses-log.png" alt="Active Response log showing SINKHOLED qouv.fr and BLOCKED 192.168.136.145" width={498} height={254} className="h-auto w-full object-contain" />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">7. Results &amp; Evidence</h2>
            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-neutral-800 bg-neutral-900/80 font-mono text-xs uppercase tracking-wider text-neutral-400"><tr><th className="px-4 py-3 font-medium">#</th><th className="px-4 py-3 font-medium">Test</th><th className="px-4 py-3 font-medium">Result</th></tr></thead>
                <tbody className="divide-y divide-neutral-800/80 font-light text-neutral-300">{results.map(([t, r], i) => <tr key={t} className="hover:bg-neutral-900/30"><td className="px-4 py-2.5 font-mono text-neutral-500">{i + 1}</td><td className="px-4 py-2.5 text-neutral-200">{t}</td><td className="px-4 py-2.5">{r}</td></tr>)}</tbody>
              </table>
            </div>
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
              <h3 className="font-semibold text-neutral-100">False positive found in the dashboard</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">Rule 100200 fired for <code className={code}>/etc/systemd/system/multi-user.target.wants/auditd.service</code>. That file is a symlink, FIM does not follow it and so hashed empty data, and the SHA256 of &quot;nothing&quot; was inside the MISP list. The fix has two layers: the empty-file hash is removed from the list, and the response script refuses symlinks and the empty-file hash.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">8. Final Checklist</h2>
            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-neutral-800 bg-neutral-900/80 font-mono text-xs uppercase tracking-wider text-neutral-400"><tr><th className="px-4 py-3 font-medium">Feature</th><th className="px-4 py-3 font-medium">Command</th><th className="px-4 py-3 font-medium">Expected</th></tr></thead>
                <tbody className="divide-y divide-neutral-800/80 font-light text-neutral-300">{checklist.map(([a, b, c]) => <tr key={a} className="hover:bg-neutral-900/30"><td className="px-4 py-2.5 font-medium text-neutral-200">{a}</td><td className="px-4 py-2.5 font-mono text-xs text-sky-300">{b}</td><td className="px-4 py-2.5">{c}</td></tr>)}</tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-amber-900/50 bg-amber-950/20 p-5"><h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-100"><AlertTriangle size={18} className="text-amber-400" /> Scope &amp; Limitations</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-300"><li>All malware tests use the EICAR test file or empty files; no real malware was handled.</li><li>Rule 100100 has a rule-wide throttle (<code className="text-amber-300">ignore=&quot;300&quot;</code>: five minutes, all IPs together) but no per-IP throttle. A full nmap scan creates many events; ping was used instead.</li><li>Block rules and routes are not persistent: the endpoint rebooted on 13 November at 03:01 UTC and every DROP rule was gone.</li><li>The endpoint is a former MISP node and still runs apache2, mariadb and redis (visible in the triage report). Web-shell detection was not built in this lab.</li><li>The lab uses <code className="text-amber-300">chmod 777</code> on the test folder and self-signed certificates in a private VMware network.</li><li>Isolation is manual by design; it is not triggered by any rule.</li></ul></section>

          <div className="flex items-center justify-between border-t border-neutral-800/80 pt-6"><Link href="/projects" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-400 transition hover:text-white"><ChevronLeft size={14} /> All Projects</Link><Link href="/" className="text-xs font-mono uppercase tracking-widest text-neutral-400 transition hover:text-white">Home</Link></div>
        </div>
      </Reveal>
    </PageShell>
  );
}
