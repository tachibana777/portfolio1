import type { ReactNode } from "react";
import Link from "next/link";
import { AlertTriangle, ChevronLeft, Shield } from "lucide-react";
import { PageShell } from "@/components/layout";
import { Reveal } from "@/components/ui";
import { ReadFirst, SeriesNav } from "@/components/projects/ReadFirst";
import { ZoomImage } from "@/components/ui/ZoomImage";

export const metadata = {
  title: "Wazuh SOAR Lab: Shuffle, MISP Check, Approval and Auto-Block | Kritsada Hongpatsa",
  description:
    "Turn a correlated Wazuh alert into a response: ask MISP, block automatically when the indicator is confirmed, ask a person when it is not, release the block, and show the case on the dashboard.",
};

const code = "text-sky-300";
const h2 = "text-2xl font-semibold text-neutral-100 sm:text-3xl";
const p = "text-sm font-light leading-relaxed text-neutral-300 sm:text-base";
const a = "text-sky-300 hover:underline";

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
              {r.map((c, j) => <td key={j} className={`px-4 py-2.5 ${j === mono ? "font-mono text-sky-300" : ""}`}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Shot({ src, alt, w, h }: { src: string; alt: string; w: number; h: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
      <ZoomImage src={src} alt={alt} width={w} height={h} className="h-auto w-full object-contain" />
    </div>
  );
}

function Pre({ children }: { children: string }) {
  return <div className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950 p-3 font-mono text-xs text-emerald-400"><pre>{children}</pre></div>;
}

function Step({ title, where, children }: { title: string; where?: string; children: ReactNode }) {
  return (
    <div className="space-y-3 rounded-2xl border border-neutral-800 bg-panel p-5">
      <h3 className="font-semibold text-neutral-100">{title}</h3>
      {where && <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">Where: {where}</p>}
      <div className="space-y-3 text-sm font-light leading-relaxed text-neutral-300">{children}</div>
    </div>
  );
}

const overview = [
  ["Platform", "Shuffle on soar-shuffle (192.168.136.146), UI on port 3443 (HTTPS, self-signed); Shuffle version not recorded"],
  ["Workflow", "wazuh-alert-intake"],
  ["Input", "Wazuh integration sends rules 100500, 100510, 100511, 100520, 100521, 100530, 100540 to a webhook"],
  ["Decision", "Ask MISP whether the source IP is a known indicator"],
  ["Response", "Wazuh API → Active Response → block-ip.sh / unblock-ip.sh on the endpoint"],
  ["Feedback", "Three SOAR rules (100601 to 100603) put the case status on the Wazuh dashboard"],
];

const prepare = [
  ["soar-shuffle", "Shuffle (Docker)", "Ubuntu 24.04.5", "4", "7.7 GB", "77 GB"],
  ["wazuh-manager", "Wazuh server, API, rules", "Ubuntu 24.04.5", "4", "7.7 GB", "77 GB"],
  ["misp-intel", "MISP", "Ubuntu 24.04.5", "2", "1.9 GB", "96 GB"],
  ["misp-endpoint", "Protected host (agent 001, Suricata, auditd)", "Ubuntu 24.04.5", "2", "1.9 GB", "96 GB"],
];

const design = `Wazuh alert → webhook → pick_ip → Http 1 (MISP restSearch)
   ├─ MISP found the IP (X-Result-Count > 0 and the IP is well formed)
   │     → Wazuh login → Wazuh block ──► notify_blocked   (rule 100601)
   │                          └─► Wait 60s → Wazuh unblock ─► notify_unblocked (rule 100603)
   └─ MISP did not find it (X-Result-Count < 1)
         → notify_pending (rule 100602) and Approval (a person approves or declines)
              approve → Wazuh login → Wazuh block (same chain)
              decline → the run stops`;

const results = [
  ["1", "Replay of a rule 100500 alert, source IP listed in MISP, IP on the allowlist", "Run reached Wazuh block; API reply total_affected_items: 1; script refused (allowlisted)"],
  ["2", "Same, allowlist entry removed for the test", "07:15:30 BLOCKED, DROP rule present; rule 100601 fired"],
  ["3", "Delay node and unblock", "07:16:32 UNBLOCKED, 62 seconds after the block; rule 100603 at 07:16:33"],
  ["4", "IP not in MISP (192.0.2.99), approved", "Run paused at Approval; after approval BLOCKED 192.0.2.99; released by hand at 06:37:39"],
  ["5", "IP not in MISP, declined", "Run stopped (\"User declined the input\"); no DROP rule; rule 100602 at 07:23:25"],
  ["6", "New read-only MISP key", "HTTP 200 from servers/getVersion; replay reached the block and unblock nodes"],
  ["7", "Manual block and unblock through the API (192.0.2.77)", "BLOCKED then UNBLOCKED"],
];

const troubleshooting = [
  ["Shuffle UI slow or OpenSearch down", "Not enough RAM, vm.max_map_count too low", "8 GB RAM and sysctl vm.max_map_count=262144"],
  ["Webhook receives nothing", "Workflow saved but webhook not started", "Press Start on the trigger"],
  ["Apps cannot reach each other", "Containers not on the execution network", "Add them to shuffle_swarm_executions"],
  ["Approval form stuck on \"Loading Details...\"", "Mixed content: HTTPS page calling an HTTP backend", "Use the api_continue / api_abort links on port 3443"],
  ["API: Invalid field found {'custom'}", "Wazuh 4.14 does not accept custom", "Remove the field"],
  ["Run ends in Approval although MISP knows the IP", "A contains condition on a structured body did not match", "Use $http_1.headers.X-Result-Count"],
  ["Condition with .#0 rejected", "Conditions cannot index lists", "Use the header, or a Filter List action"],
  ["Wazuh unblock has no Delay field", "The Http node only has a request Timeout", "Add a Wait 60s Execute-python node"],
  ["Duplicate syslog listener", "The sed command was run twice", "Count blocks, remove the extra, validate, restart"],
];

export default function WazuhSoarLabPage() {
  return (
    <PageShell>
      <Reveal>
        <div className="space-y-12 pb-16">
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-400 transition hover:text-white"><ChevronLeft size={14} /> Back to Projects</Link>

          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-900/90 px-3 py-1 text-xs font-mono font-medium text-emerald-400"><Shield size={12} /> Blue Team &amp; SOAR</span>
              <span className="rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs font-mono text-neutral-400">Personal Cybersecurity Home Lab</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl md:text-5xl">Wazuh SOAR Lab: Shuffle, MISP Check, Approval and Auto-Block</h1>
            <p className="text-lg font-light text-neutral-300 sm:text-xl">Turn a correlated Wazuh alert into a response: ask MISP, block automatically when the indicator is confirmed, ask a person when it is not, release the block, and show the case on the dashboard</p>
            <div className="flex flex-wrap gap-2 pt-1">{["Shuffle (Docker)", "Wazuh 4.14.9", "MISP 2.5.51", "iptables", "Bash", "Ubuntu 24.04"].map((tech) => <span key={tech} className="rounded-lg border border-neutral-800 bg-panel px-2.5 py-1 text-xs font-medium text-neutral-200">{tech}</span>)}</div>
            <p className="text-xs font-light text-neutral-400 sm:text-sm">Part 4 of the MISP → Wazuh Threat Intelligence, EDR, XDR and SOAR home lab. Tested 13 November 2026. Secrets (API keys, passwords, webhook URL, approval links) are never printed.</p>
          </header>

          <SeriesNav current="/projects/wazuh-soar-lab" />

          <ReadFirst
            part="SOAR"
            intro={[
              ["What this part is", "SOAR (security orchestration, automation and response) decides what happens next after a detection, and who must approve it. It detects nothing itself."],
              ["Why I added it", "After XDR the lab could raise \"a listed IP logged in and changed cron\", but a person still had to type the block command. The mentor's model is a national CERT working with a customer: the centre sees the threat; either the customer approves the response, or the system acts first when the case is clear."],
              ["How the plan changed while building", <>The first version only asked for approval every time. Then came the question: if MISP already confirms the IP, why wait? So the playbook became: <strong className="font-semibold text-neutral-100">confirmed by MISP → block at once; not confirmed → ask a person.</strong> Two more additions followed: a 60-second release (because Wazuh&apos;s own 600 s timeout did not release blocks) and dashboard notices (so the case is visible in Wazuh).</>],
            ]}
            image={{ src: "/events/diagram-05-soar-decision.png", alt: "Decision flow of the playbook", width: 1568, height: 3146 }}
            afterImage={[
              ["How it differs from the others", <>MISP knows, EDR acts on one host, XDR links evidence, <strong className="font-semibold text-neutral-100">SOAR chooses the action</strong> and calls the scripts the EDR part built, through the Wazuh API.</>],
              ["Prepare", <>The <Link href="/projects/misp-threat-intel-lab" className={a}>MISP</Link>, <Link href="/projects/wazuh-edr-lab" className={a}>EDR</Link> and <Link href="/projects/wazuh-xdr-lab" className={a}>XDR</Link> pages working; a soar-shuffle VM with 4 vCPU / 8 GB RAM.</>],
            ]}
            checklist={[
              "Replay of a listed-IP alert gives BLOCKED, and about 60 s later UNBLOCKED, in the endpoint log",
              "An unlisted IP stops at Approval; approve blocks, decline stops",
              "Rules 100601, 100602, 100603 appear on the dashboard (rule.groups: soar)",
            ]}
            learn="Least privilege (a Wazuh API user that may only run active-response on agent 001, and a read-only MISP key); allowlists in the script, not in the workflow; Shuffle quirks (conditions cannot index lists; use the X-Result-Count header)."
          />

          <section className="space-y-4">
            <h2 className={h2}>1. Part 4 Overview</h2>
            <Table head={["Item", "Value"]} rows={overview} mono={-1} />
            <h3 className="pt-2 font-semibold text-neutral-100">What to prepare</h3>
            <Table head={["Machine", "Role", "OS", "vCPU", "RAM", "Disk"]} rows={prepare} />
            <p className={p}>The MISP, EDR and XDR parts must already work (MISP list synced, agent connected, correlation rules fire). Shuffle needs the 4 vCPU / 8 GB class of machine; OpenSearch inside Shuffle needs memory and <code className={code}>vm.max_map_count=262144</code>.</p>
          </section>

          <section className="space-y-4">
            <h2 className={h2}>2. Design</h2>
            <Pre>{design}</Pre>
            <Shot src="/events/soar-01-canvas.png" alt="Shuffle workflow canvas wazuh-alert-intake: Pick ip, Http 1, Approval, Wazuh login, Wazuh block, Wait, Wazuh unblock and the notify nodes" w={1220} h={785} />
            <Shot src="/events/soar-07-final-workflow.png" alt="Finished Shuffle workflow wazuh-alert-intake: Notify pending, Http 1, Approval, Approved note, Wazuh login, Wazuh block, Wait 60s, a second Wazuh node and Notify unblocked" w={1008} h={638} />
            <p className="text-xs font-light text-neutral-400">The finished workflow in Shuffle (13 November 2026): the delay node is labelled <strong className="font-semibold text-neutral-200">Wait 60s</strong> and <strong className="font-semibold text-neutral-200">Notify pending</strong> covers the case where MISP does not know the IP.</p>
            <ul className="list-disc space-y-2 pl-5 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <li><strong className="font-semibold text-neutral-100">Auto-block only for a confirmed indicator.</strong> A source IP that MISP lists (to_ids, published, not on a warning list) is blocked without waiting. Anything else waits for a person.</li>
              <li><strong className="font-semibold text-neutral-100">The allowlist stays in the script.</strong> <code className={code}>block-ip.sh</code> refuses the gateway and the lab hosts, so a wrong decision in Shuffle cannot cut the lab off.</li>
              <li><strong className="font-semibold text-neutral-100">Short, automatic release (60 seconds in the lab).</strong> Wazuh&apos;s own 600-second timeout did not release blocks in this lab (see Findings), so Shuffle releases the block itself with a delay node.</li>
              <li><strong className="font-semibold text-neutral-100">Least privilege.</strong> Shuffle logs in to the Wazuh API as <code className={code}>shuffle-soar</code>, a user whose role may only run active-response commands on agent 001. The MISP key it uses is read-only.</li>
            </ul>
            <p className={p}>Only rules 100500, 100510, 100511, 100520, 100521, 100530 and 100540 go to Shuffle. Rule 100100 (a listed IP touching the endpoint) is handled by Wazuh Active Response alone.</p>
          </section>

          <section className="space-y-5">
            <h2 className={h2}>3. Steps</h2>

            <Step title="Step 1. Deploy Shuffle and send alerts to it" where="SOAR, then MANAGER">
              <p>Run Shuffle with Docker. In the workflow add a Webhook trigger, press <strong className="font-semibold text-neutral-100">Start</strong> after saving, and copy its URL. On the Manager add an <code className={code}>&lt;integration&gt;</code> block to <code className={code}>ossec.conf</code> with <code className={code}>&lt;name&gt;shuffle&lt;/name&gt;</code>, the webhook as <code className={code}>&lt;hook_url&gt;</code>, and <code className={code}>&lt;rule_id&gt;</code> listing the rules above. The webhook is plain HTTP with no authentication, which is acceptable only in a private lab.</p>
              <p>Replay a saved alert instead of attacking again each time (<code className={code}>$HOOK</code> holds your own webhook URL; do not paste it into a chat or a page):</p>
              <Pre>{`# MANAGER: send a saved alert file to the webhook in debug mode
/var/ossec/integrations/shuffle /root/replay-100500.json "" "$HOOK" debug`}</Pre>
              <Shot src="/events/soar-replay-notfound.png" alt="Manager terminal replaying an alert for an IP that is not in MISP: the webhook variable is loaded and unset without being printed, and the Shuffle server answers 200" w={1919} h={420} />
            </Step>

            <Step title="Step 2. Pick the IP, ask MISP">
              <p>Node <code className={code}>pick_ip</code> (Execute python) takes the IP from <code className={code}>data.srcip</code> and falls back to <code className={code}>data.dest_ip</code>. Node <code className={code}>Http 1</code> calls <code className={code}>POST /attributes/restSearch</code> with a <strong className="font-semibold text-neutral-100">read-only</strong> MISP key in the <code className={code}>Authorization</code> header and the body:</p>
              <Pre>{`{"returnFormat":"json","value":"<ip>","to_ids":1,"published":1,"deleted":0,"enforceWarninglist":1}`}</Pre>
              <p>What MISP answered for a listed IP (source: SOAR lab test, 13 November 2026; only these two values were recorded):</p>
              <Pre>{`HTTP status: 200
X-Result-Count: 1`}</Pre>
              <p>The reply header <code className={code}>X-Result-Count</code> says how many attributes matched. Conditions in Shuffle cannot index into lists (<code className={code}>.#0</code> is rejected) and <code className={code}>contains</code> on a structured body did not match, but a scalar header works:</p>
              <Table head={["Edge", "Conditions"]} mono={-1} rows={[
                ["Http 1 → Wazuh login (auto-block)", <><code className={code}>$http_1.headers.X-Result-Count</code> larger than <code className={code}>0</code> <strong className="font-semibold text-neutral-100">and</strong> <code className={code}>$pick_ip.message.ip</code> matches <code className={code}>{"^\\d+\\.\\d+\\.\\d+\\.\\d+$"}</code> (an empty value can make MISP return everything)</>],
                ["Http 1 → Approval and notify_pending", <><code className={code}>$http_1.headers.X-Result-Count</code> less than <code className={code}>1</code></>],
              ]} />
              <Shot src="/events/soar-02-conditions.png" alt="Shuffle edge conditions for the auto-block branch: X-Result-Count larger than 0 and the pick_ip value matches the IPv4 regex" w={1325} h={805} />
              <Shot src="/events/soar-02-conditions-no-match.png" alt="Shuffle edge condition for the approval branch: X-Result-Count less than 1" w={1355} h={805} />
            </Step>

            <Step title="Step 3. Human approval">
              <p>The <code className={code}>Approval</code> node (User Input) pauses the run and shows the alert, rule, agent and IP. The form links failed from an HTTPS page (the browser blocks mixed content), so the lab uses the two API links from the node&apos;s result on <code className={code}>https://192.168.136.146:3443</code>: <code className={code}>api_continue</code> approves and <code className={code}>api_abort</code> declines. These links carry a token per run, so treat them as secrets. Opening an approve link twice runs the chain twice: in the test, <code className={code}>192.0.2.99</code> was blocked twice (06:36:03 and 06:36:50 UTC). The script checks before adding, so no duplicate rule is created.</p>
            </Step>

            <Step title="Step 4. A restricted Wazuh API user" where="MANAGER (Wazuh API RBAC)">
              <p>Create a policy that allows <code className={code}>active-response:command</code> only on <code className={code}>agent:id:001</code>, a role that uses it, and a user (<code className={code}>shuffle-soar</code>) with that role. The password is typed into the Shuffle node, never into a script or chat. The block call (Wazuh 4.14 rejects a <code className={code}>custom</code> field):</p>
              <Pre>{`# Run with a valid API token in $TOKEN; "!" runs a custom script from active-response/bin
curl -sk -X PUT "https://192.168.136.144:55000/active-response?agents_list=001" \\
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \\
  -d '{"command":"!block-ip.sh","alert":{"data":{"src_ip":"192.0.2.77"}}}'`}</Pre>
            </Step>

            <Step title="Step 5. Block and unblock scripts" where="ENDPOINT, in /var/ossec/active-response/bin (mode 750, owner root:wazuh)">
              <p><code className={code}>block-ip.sh</code> reads JSON on stdin, takes the IP from <code className={code}>.parameters.alert.data.src_ip</code>, refuses anything that is not a plain IPv4 address or is on the allowlist, and adds <code className={code}>iptables -I INPUT -s &lt;ip&gt; -j DROP</code>. <code className={code}>unblock-ip.sh</code> deletes the rule if it exists and logs <code className={code}>UNBLOCKED</code>, <code className={code}>NOT BLOCKED</code> or <code className={code}>invalid ip</code>. Both write to <code className={code}>/var/ossec/logs/active-responses.log</code>.</p>
              <Shot src="/events/soar-05-unblock-script.png" alt="Source of unblock-ip.sh: reads the IP from the alert JSON, accepts only a plain IPv4 address, deletes the DROP rule and logs UNBLOCKED or NOT BLOCKED" w={760} h={274} />
            </Step>

            <Step title="Step 6. Release after 60 seconds">
              <p>Copy node <code className={code}>Wazuh block</code>, change the command to <code className={code}>!unblock-ip.sh</code>, and put a delay node between them: <code className={code}>Wait 60s</code>, an Execute python node running <code className={code}>time.sleep(60)</code>. The Http node&apos;s own Timeout field is a request timeout, not a delay.</p>
            </Step>

            <Step title="Step 7. Put the case on the dashboard" where="MANAGER, then SOAR">
              <p>Open a syslog listener on the Manager for the Shuffle server only, and add three rules:</p>
              <Pre>{`<remote>
  <connection>syslog</connection>
  <port>514</port>
  <protocol>udp</protocol>
  <allowed-ips>192.168.136.146</allowed-ips>
</remote>`}</Pre>
              <Pre>{`<group name="soar,">
  <rule id="100601" level="12"><match>SOAR-NOTICE action=blocked</match><description>SOAR: IP blocked automatically (matched MISP IOC)</description></rule>
  <rule id="100602" level="10"><match>SOAR-NOTICE action=pending</match><description>SOAR: IP not in MISP, waiting for customer approval to block</description></rule>
  <rule id="100603" level="8"><match>SOAR-NOTICE action=unblocked</match><description>SOAR: IP block released</description></rule>
</group>`}</Pre>
              <p>In Shuffle, three Execute python nodes send one UDP line, for example <code className={code}>SOAR-NOTICE action=blocked ip=&lt;ip&gt; rule=&lt;id&gt; customer=&lt;agent&gt;</code>. A manual test from the Shuffle host:</p>
              <Pre>{`# SOAR: send one test notice to the Manager's syslog listener
logger -n 192.168.136.144 -P 514 -d "SOAR-NOTICE action=blocked ip=192.0.2.50 rule=100500 customer=misp-endpoint"`}</Pre>
              <p>Warning from the lab: adding the <code className={code}>&lt;remote&gt;</code> block twice (two pastes) gave two identical listeners. Count with <code className={code}>grep -c &quot;&lt;connection&gt;syslog&lt;/connection&gt;&quot; /var/ossec/etc/ossec.conf</code> (expect 1) and validate with <code className={code}>wazuh-analysisd -t</code> before restarting.</p>
              <p>In the dashboard, open Threat Hunting → Events and filter <code className={code}>rule.groups: soar</code>. The dashboard shows the case; it cannot block or unblock. Control stays in Shuffle, the Wazuh API and the endpoint scripts.</p>
              <Shot src="/events/soar-04-dashboard.png" alt="Wazuh Threat Hunting events filtered on rule.groups:soar: six hits from rules 100601, 100602 and 100603 on 13 November 2026" w={1919} h={775} />
            </Step>

            <Step title="Step 8. Rotate the credentials SOAR uses">
              <p>Create a new read-only MISP key, put it in the <code className={code}>Http 1</code> header, test it, then delete the old key. Change the <code className={code}>shuffle-soar</code> password in the Wazuh API and in the <code className={code}>Wazuh login</code> node. Do both after any lab session in which a key or password was visible.</p>
            </Step>
          </section>

          <section className="space-y-4">
            <h2 className={h2}>4. Results &amp; Evidence</h2>
            <p className="text-sm font-light text-neutral-400">Times are UTC from the endpoint log and alerts.json on 13 November 2026 (Thailand = UTC+7).</p>
            <Table head={["#", "Test", "Result"]} rows={results} mono={-1} />
            <Shot src="/events/soar-05-endpoint-log.png" alt="Endpoint log: block-ip BLOCKED at 07:15:30 and unblock-ip UNBLOCKED at 07:16:32 UTC on 13 November, the IP address hidden" w={900} h={100} />
            <p className={p}>Alerts produced by the SOAR rules in the whole lab log: rule 100601 ×3, 100602 ×1, 100603 ×2. In the screenshots the public IP address of the listed test indicator is covered by a black box.</p>
          </section>

          <section className="space-y-4">
            <h2 className={h2}>5. Troubleshooting</h2>
            <Table head={["Problem", "Cause", "Fix"]} rows={troubleshooting} mono={-1} />
          </section>

          <section className="rounded-2xl border border-amber-900/50 bg-amber-950/20 p-5">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-100"><AlertTriangle size={18} className="text-amber-400" /> Findings &amp; Limits</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-300">
              <li><strong className="font-semibold text-neutral-100">Wazuh&apos;s own timeout did not release blocks.</strong> Rule 100100 triggers Active Response <code className="text-amber-300">block-ip</code> with <code className="text-amber-300">&lt;timeout&gt;600&lt;/timeout&gt;</code>. After the last such block (192.168.136.145, 12 Nov 09:18:46 UTC) the log shows no <code className="text-amber-300">UNBLOCKED</code> line during the next 17 hours 43 minutes, until the endpoint rebooted. The command definition has <code className="text-amber-300">timeout_allowed=yes</code> and the live script has a <code className="text-amber-300">delete</code> branch, so the cause was not found. Shuffle&apos;s delay node is the working release path for SOAR blocks; the 100100 path has no release.</li>
              <li><strong className="font-semibold text-neutral-100">Rule 100100 has a throttle.</strong> <code className="text-amber-300">ignore=&quot;300&quot;</code> makes Wazuh ignore the rule for five minutes after it fires, so alerts (and blocks) from a steady stream of traffic come at most every five minutes.</li>
              <li><strong className="font-semibold text-neutral-100">Blocks are not persistent.</strong> iptables rules and the lab&apos;s extra routes are lost on reboot (the endpoint rebooted on 13 Nov at 03:01 UTC and the rules were gone).</li>
              <li>Plain HTTP webhook with no authentication; self-signed certificates</li>
              <li>No customer notification channel yet (email, chat); the case appears on the Wazuh dashboard, the analyst&apos;s view</li>
              <li>If MISP is unreachable the run stops after <code className="text-amber-300">Http 1</code>; the original alert stays on the dashboard</li>
              <li>The allowlist is a hand-written list of lab addresses. During normal operation the spoofed test IP used by the lab is allowlisted; remove it to demonstrate a real block, and restore it afterwards</li>
              <li>Case management and feedback to MISP (sightings) are not built</li>
              <li>Source-IP lookups only: domains, hashes and file indicators in alerts are not checked by this workflow</li>
            </ul>
          </section>

          <div className="flex items-center justify-between border-t border-neutral-800/80 pt-6"><Link href="/projects" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-400 transition hover:text-white"><ChevronLeft size={14} /> All Projects</Link><Link href="/projects/start-here" className="text-xs font-mono uppercase tracking-widest text-neutral-400 transition hover:text-white">Start here</Link></div>
        </div>
      </Reveal>
    </PageShell>
  );
}
