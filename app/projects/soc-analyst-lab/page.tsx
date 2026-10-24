import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Shield,
  Terminal,
  Activity,
  AlertTriangle,
  Server,
  Layers,
  CheckCircle2,
  Search,
  ExternalLink,
  Code2,
} from "lucide-react";
import {
  SiKalilinux,
  SiSplunk,
  SiUbuntu,
  SiVmware,
} from "react-icons/si";
import { FaNetworkWired } from "react-icons/fa6";
import { PageShell } from "@/components/layout";
import { Reveal } from "@/components/ui";

export const metadata = {
  title: "SOC Analyst Incident Investigation Lab | Kritsada Hongpatsa",
  description:
    "Linux Security Monitoring, SIEM Detection & Incident Investigation using Splunk Enterprise, Ubuntu Server, and Kali Linux.",
};

export default function SocAnalystLabPage() {
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
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-900/90 px-3 py-1 text-xs font-mono font-medium text-emerald-400">
                <Shield size={12} />
                Blue Team &amp; SIEM
              </span>
              <span className="rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs font-mono text-neutral-400">
                Personal Cybersecurity Home Lab
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl md:text-5xl">
              SOC Analyst Incident Investigation Lab
            </h1>
            <p className="text-lg font-light text-neutral-300 sm:text-xl">
              Linux Security Monitoring, SIEM Detection &amp; Incident Investigation
            </p>

            {/* Tech Badges Row */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-panel px-2.5 py-1 text-xs font-medium text-neutral-200">
                <SiSplunk className="text-[#f58220]" size={14} />
                Splunk Enterprise
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-panel px-2.5 py-1 text-xs font-medium text-neutral-200">
                <SiUbuntu className="text-[#e95420]" size={14} />
                Ubuntu Server
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-panel px-2.5 py-1 text-xs font-medium text-neutral-200">
                <SiKalilinux className="text-[#557c94]" size={14} />
                Kali Linux
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-panel px-2.5 py-1 text-xs font-medium text-neutral-200">
                <FaNetworkWired className="text-[#22c55e]" size={13} />
                Nmap
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-panel px-2.5 py-1 text-xs font-medium text-neutral-200">
                <Shield className="text-emerald-400" size={13} />
                SIEM &amp; Detection
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-panel px-2.5 py-1 text-xs font-medium text-neutral-200">
                <SiVmware className="text-[#0284c7]" size={14} />
                VMware
              </span>
            </div>
          </header>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-1 gap-3 rounded-2xl border border-dashed border-neutral-800 bg-panel p-5 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                Environment
              </span>
              <p className="mt-1 text-sm font-medium text-neutral-200">
                VMware Virtualization
              </p>
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                Target &amp; SIEM Host
              </span>
              <p className="mt-1 text-sm font-medium text-neutral-200">
                Ubuntu Server (192.168.136.138)
              </p>
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                Testing Machine
              </span>
              <p className="mt-1 text-sm font-medium text-neutral-200">
                Kali Linux (192.168.136.136)
              </p>
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                SIEM Platform
              </span>
              <p className="mt-1 text-sm font-medium text-neutral-200">
                Splunk Enterprise
              </p>
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                Log Sources
              </span>
              <p className="mt-1 text-sm font-medium text-neutral-200">
                /var/log/auth.log · /var/log/ufw.log
              </p>
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                Key Scenarios
              </span>
              <p className="mt-1 text-sm font-medium text-neutral-200">
                SSH Brute-Force &amp; Port Scan Detection
              </p>
            </div>
          </div>

          <div className="h-px w-full bg-neutral-800/80" />

          {/* 1. Project Overview */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">
              1. Project Overview
            </h2>
            <div className="space-y-3.5 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <p>
                This project involves building a virtualized Security Operations Center (SOC) lab to practice security monitoring, threat detection, log analysis, and incident investigation.
              </p>
              <p>
                The lab uses Kali Linux to generate controlled security-testing activity against an Ubuntu Server environment. Splunk Enterprise is deployed on Ubuntu Server to collect and analyze authentication and firewall logs, identify suspicious behavior, and support security event investigation.
              </p>
              <p>The project focuses on two detection scenarios:</p>
              <ul className="list-disc space-y-2 pl-5 text-neutral-300">
                <li>
                  <strong className="font-semibold text-neutral-100">Repeated SSH authentication failures:</strong> that may indicate password guessing or brute-force activity.
                </li>
                <li>
                  <strong className="font-semibold text-neutral-100">Firewall events involving connections to multiple destination ports:</strong> that may indicate network reconnaissance or port scanning.
                </li>
              </ul>
              <p>
                Splunk Search Processing Language (SPL) is used to extract relevant fields, aggregate events within time windows, and identify activity that meets predefined detection thresholds.
              </p>
              <p>
                A Splunk dashboard is also developed to consolidate monitoring information, while alert rules have been configured for the two detection scenarios.
              </p>
              <p>
                The goal is to understand the complete workflow of a junior SOC analyst: collecting telemetry, identifying suspicious activity, validating evidence, investigating events, and documenting findings.
              </p>
            </div>
          </section>

          {/* 2. Project Objectives */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">
              2. Project Objectives
            </h2>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {[
                "Build a virtualized Linux security monitoring environment.",
                "Deploy Splunk Enterprise as the SIEM platform.",
                "Collect Ubuntu authentication and firewall logs.",
                "Generate controlled SSH authentication failures and network scanning activity.",
                "Analyze security events using SPL.",
                "Develop basic behavioral detection rules.",
                "Create a dashboard for security event monitoring.",
                "Configure alerts for suspicious authentication and firewall activity.",
                "Practice investigating security events and documenting evidence.",
                "Identify limitations in detection coverage and opportunities for improvement.",
              ].map((obj, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-3"
                >
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-emerald-400"
                  />
                  <span className="text-xs sm:text-sm font-light text-neutral-300">
                    {obj}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Lab Architecture */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">
              3. Lab Architecture
            </h2>
            <p className="text-sm font-light text-neutral-300 sm:text-base">
              The lab consists of three main components:
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-dashed border-neutral-800 bg-panel p-4">
                <div className="flex items-center gap-2">
                  <SiKalilinux className="text-[#557c94]" size={18} />
                  <h3 className="font-semibold text-neutral-100">3.1 Kali Linux</h3>
                </div>
                <span className="mt-1 block font-mono text-[11px] text-neutral-500">
                  Testing Machine · 192.168.136.136
                </span>
                <p className="mt-2.5 text-xs sm:text-[13px] font-light text-neutral-300">
                  Generates controlled security-testing activity including network connectivity tests, SSH authentication failures, and Nmap port scanning.
                </p>
              </div>

              <div className="rounded-2xl border border-dashed border-neutral-800 bg-panel p-4">
                <div className="flex items-center gap-2">
                  <SiUbuntu className="text-[#e95420]" size={18} />
                  <h3 className="font-semibold text-neutral-100">3.2 Ubuntu Server</h3>
                </div>
                <span className="mt-1 block font-mono text-[11px] text-neutral-500">
                  Target &amp; SIEM Host · 192.168.136.138
                </span>
                <p className="mt-2.5 text-xs sm:text-[13px] font-light text-neutral-300">
                  Acts as both the monitored target and host for Splunk Enterprise. Emits /var/log/auth.log and /var/log/ufw.log.
                </p>
              </div>

              <div className="rounded-2xl border border-dashed border-neutral-800 bg-panel p-4">
                <div className="flex items-center gap-2">
                  <SiSplunk className="text-[#f58220]" size={18} />
                  <h3 className="font-semibold text-neutral-100">3.3 Splunk Enterprise</h3>
                </div>
                <span className="mt-1 block font-mono text-[11px] text-neutral-500">
                  SIEM &amp; Analytics Platform
                </span>
                <p className="mt-2.5 text-xs sm:text-[13px] font-light text-neutral-300">
                  Ingests logs, provides SPL detection rules, correlates events, visualizes findings on dashboards, and fires real-time alerts.
                </p>
              </div>
            </div>

            {/* Architecture Flow Box */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
              <span className="text-xs font-mono font-medium uppercase tracking-wider text-neutral-400">
                Architecture Flow
              </span>
              <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs text-neutral-200">
                <span className="rounded bg-neutral-800 px-2 py-1 flex items-center gap-1.5">
                  <SiKalilinux className="text-[#557c94]" size={13} /> Kali Linux
                </span>
                <span className="text-neutral-500">→</span>
                <span className="rounded bg-neutral-800 px-2 py-1">Test Activity</span>
                <span className="text-neutral-500">→</span>
                <span className="rounded bg-neutral-800 px-2 py-1 flex items-center gap-1.5">
                  <SiUbuntu className="text-[#e95420]" size={13} /> Ubuntu Server
                </span>
                <span className="text-neutral-500">→</span>
                <span className="rounded bg-neutral-800 px-2 py-1">Auth &amp; Firewall Logs</span>
                <span className="text-neutral-500">→</span>
                <span className="rounded bg-neutral-800 px-2 py-1 flex items-center gap-1.5">
                  <SiSplunk className="text-[#f58220]" size={13} /> Splunk Enterprise
                </span>
                <span className="text-neutral-500">→</span>
                <span className="rounded bg-neutral-800 px-2 py-1">SPL Detection</span>
                <span className="text-neutral-500">→</span>
                <span className="rounded bg-emerald-950/70 text-emerald-300 border border-emerald-800/60 px-2 py-1 flex items-center gap-1.5">
                  <Shield size={13} /> Dashboard &amp; Alerts
                </span>
              </div>
            </div>
          </section>

          {/* 4. Tools and Technologies Table */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">
              4. Tools and Technologies
            </h2>
            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-neutral-800 bg-neutral-900/80 font-mono text-xs uppercase tracking-wider text-neutral-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Tool / Technology</th>
                    <th className="px-4 py-3 font-medium">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80 text-neutral-300 font-light">
                  <tr className="hover:bg-neutral-900/30">
                    <td className="px-4 py-2.5 font-medium text-neutral-200">
                      <div className="flex items-center gap-2">
                        <SiUbuntu className="text-[#e95420]" size={16} />
                        <span>Ubuntu Server</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">Target system, log source, and Splunk host</td>
                  </tr>
                  <tr className="hover:bg-neutral-900/30">
                    <td className="px-4 py-2.5 font-medium text-neutral-200">
                      <div className="flex items-center gap-2">
                        <SiKalilinux className="text-[#557c94]" size={16} />
                        <span>Kali Linux</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">Controlled security testing and network scanning</td>
                  </tr>
                  <tr className="hover:bg-neutral-900/30">
                    <td className="px-4 py-2.5 font-medium text-neutral-200">
                      <div className="flex items-center gap-2">
                        <SiSplunk className="text-[#f58220]" size={16} />
                        <span>Splunk Enterprise</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">SIEM, log searching, analysis, visualization, and alert configuration</td>
                  </tr>
                  <tr className="hover:bg-neutral-900/30">
                    <td className="px-4 py-2.5 font-medium text-neutral-200">
                      <div className="flex items-center gap-2">
                        <Shield className="text-[#f97316]" size={16} />
                        <span>UFW</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">Linux firewall and blocked-traffic logging</td>
                  </tr>
                  <tr className="hover:bg-neutral-900/30">
                    <td className="px-4 py-2.5 font-medium text-neutral-200">
                      <div className="flex items-center gap-2">
                        <Code2 className="text-[#10b981]" size={16} />
                        <span>SPL</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">Search, field extraction, event aggregation, and detection logic</td>
                  </tr>
                  <tr className="hover:bg-neutral-900/30">
                    <td className="px-4 py-2.5 font-medium text-neutral-200">
                      <div className="flex items-center gap-2">
                        <SiVmware className="text-[#0284c7]" size={16} />
                        <span>VMware</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">Virtualized lab environment</td>
                  </tr>
                  <tr className="hover:bg-neutral-900/30">
                    <td className="px-4 py-2.5 font-medium text-neutral-200">
                      <div className="flex items-center gap-2">
                        <Terminal className="text-neutral-400" size={16} />
                        <span>SSH</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">Remote access and authentication testing</td>
                  </tr>
                  <tr className="hover:bg-neutral-900/30">
                    <td className="px-4 py-2.5 font-medium text-neutral-200">
                      <div className="flex items-center gap-2">
                        <FaNetworkWired className="text-[#22c55e]" size={16} />
                        <span>Nmap</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">Network and port scanning</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Environment Setup and Log Collection */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">
              5. Environment Setup and Log Collection
            </h2>
            <div className="space-y-4 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <div>
                <h3 className="font-semibold text-neutral-100">5.1 Virtual Machine Networking</h3>
                <p className="mt-1">
                  Configured virtual machines to communicate within the home lab network. Kali Linux was assigned <code className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-amber-400">192.168.136.136</code>, and Ubuntu Server was assigned <code className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-amber-400">192.168.136.138</code>. Verified connectivity with ICMP ping and SSH handshakes.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-100">5.2 Splunk Enterprise Deployment</h3>
                <p className="mt-1">
                  Installed Splunk Enterprise on Ubuntu Server and managed it via the Splunk Web interface over port 8000. Configured inputs to monitor and ingest local security logs into the main index.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-100">5.3 Authentication Log Ingestion</h3>
                <p className="mt-1">
                  Monitored <code className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-emerald-400">/var/log/auth.log</code> to track SSH login failures, targeted usernames, and source IP addresses.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-100">5.4 Firewall Log Ingestion</h3>
                <p className="mt-1">
                  Monitored <code className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-emerald-400">/var/log/ufw.log</code> to capture blocked packet telemetry, including source IPs, destination IPs, and destination ports.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-100">5.5 Log Verification</h3>
                <p className="mt-1">
                  Verified with SPL queries that events from both log files were successfully indexed and immediately searchable with zero ingestion latency.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Controlled Security Activity */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">
              6. Controlled Security Activity
            </h2>
            <div className="space-y-4 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <div>
                <h3 className="font-semibold text-neutral-100">6.1 SSH Authentication Failure Testing</h3>
                <p className="mt-1">
                  Simulated repeated failed SSH logins against Ubuntu Server targeting existing and invalid user accounts (e.g., <code className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-neutral-300">ubuntu</code>, <code className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-neutral-300">tset1</code>, <code className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-neutral-300">wronguser</code>) to generate authentic brute-force event patterns.
                </p>
                {/* Simulation Screenshot */}
                <div className="mt-3 space-y-2">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
                    <Image
                      src="/events/splunk-ssh-powershell-test.png"
                      alt="Controlled SSH brute-force simulation in terminal captured by Splunk event logs"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-center text-xs font-mono text-neutral-400">
                    Figure 1: Live authentication failure testing via terminal overlay against the target, successfully ingested and correlated by Splunk Enterprise.
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-100">6.2 Network Scanning</h3>
                <p className="mt-1">
                  Executed Nmap port scans from Kali Linux against Ubuntu Server. The UFW firewall blocked packets destined for closed ports, generating distinct log trails with multiple destination ports contacted in rapid succession.
                </p>
              </div>
            </div>
          </section>

          {/* 7. SPL-Based Detection Engineering */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Code2 className="text-emerald-400" size={24} />
              <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">
                7. SPL-Based Detection Engineering
              </h2>
            </div>
            <p className="text-sm font-light text-neutral-300 sm:text-base">
              Developed custom SPL searches to extract fields and pinpoint activity that exceeds operational threat thresholds.
            </p>

            {/* Rule 7.1 */}
            <div className="space-y-3 rounded-2xl border border-neutral-800 bg-panel p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-neutral-100">
                  7.1 Detection Rule: SSH — Multiple Failed Login Attempts
                </h3>
                <span className="font-mono text-xs text-amber-400">Threshold: &gt;= 3 failures in 5m</span>
              </div>
              <p className="text-xs sm:text-sm font-light text-neutral-300">
                <strong className="font-medium text-neutral-200">Objective:</strong> Identify source IP addresses associated with repeated failed SSH authentication attempts.
              </p>

              <pre className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs text-neutral-200">
                <code>{`index=main source="/var/log/auth.log" "Failed password"
| rex field=_raw "from (?<src_ip>\\d{1,3}(?:\\.\\d{1,3}){3})"
| rex field=_raw "Failed password for (invalid user )?(?<target_user>\\S+)"
| bin _time span=5m
| stats count as failed_attempts
    values(target_user) as targeted_users
    by _time src_ip
| where failed_attempts >= 3
| sort - failed_attempts`}</code>
              </pre>

              {/* Screenshot 1 */}
              <div className="mt-4 space-y-2">
                <div className="relative aspect-[16/8] w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
                  <Image
                    src="/events/splunk-ssh-failed-search.png"
                    alt="Splunk search extracting failed password events and targeted users"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-center text-xs font-mono text-neutral-400">
                  Figure 2: Splunk Search validating regular expression field extraction for SSH failed logins and target users.
                </p>
              </div>

              <div className="mt-4 space-y-2 text-xs sm:text-sm font-light text-neutral-300">
                <p><strong className="font-medium text-neutral-200">Detection logic:</strong> Search auth logs for <code className="text-emerald-400">Failed password</code>, extract IP and username via regex, bucket into 5-minute spans, and alert when failures per IP reach 3 or more.</p>
                <p><strong className="font-medium text-neutral-200">Investigation value:</strong> Pinpoints targeted usernames and brute-force origin IPs to prioritize host containment and account lockout analysis.</p>
              </div>
            </div>

            {/* Rule 7.2 */}
            <div className="space-y-3 rounded-2xl border border-neutral-800 bg-panel p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-neutral-100">
                  7.2 Detection Rule: Firewall — Possible Port Scan
                </h3>
                <span className="font-mono text-xs text-amber-400">Threshold: &gt;= 4 unique ports in 1m</span>
              </div>
              <p className="text-xs sm:text-sm font-light text-neutral-300">
                <strong className="font-medium text-neutral-200">Objective:</strong> Identify source IP addresses associated with blocked traffic to multiple destination ports within a short time window.
              </p>

              <pre className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs text-neutral-200">
                <code>{`index=main source="/var/log/ufw.log" "UFW BLOCK"
| rex field=_raw "SRC=(?<src_ip>\\d{1,3}(?:\\.\\d{1,3}){3})"
| rex field=_raw "DST=(?<dst_ip>\\d{1,3}(?:\\.\\d{1,3}){3})"
| rex field=_raw "DPT=(?<dst_port>\\d+)"
| bin _time span=1m
| stats count as blocked_packets
    dc(dst_port) as unique_ports
    values(dst_port) as ports
    values(dst_ip) as targets
    by _time src_ip
| where unique_ports >= 4
| sort - unique_ports`}</code>
              </pre>

              {/* Screenshot 2 */}
              <div className="mt-4 space-y-2">
                <div className="relative aspect-[16/8] w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
                  <Image
                    src="/events/splunk-ssh-correlation-search.png"
                    alt="Splunk search tracking authentication outcomes (SUCCESS and FAILURE) by source IP"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-center text-xs font-mono text-neutral-400">
                  Figure 3: Splunk Correlation Query evaluating both Accepted and Failed attempts to distinguish persistent guessing from successful logins.
                </p>
              </div>

              <div className="mt-4 space-y-2 text-xs sm:text-sm font-light text-neutral-300">
                <p><strong className="font-medium text-neutral-200">Detection logic:</strong> Search UFW blocked events, extract SRC, DST, and DPT, aggregate over 1-minute time windows, and flag sources contacting 4 or more distinct ports.</p>
                <p><strong className="font-medium text-neutral-200">Investigation value:</strong> Rapidly detects hostile reconnaissance sweeps and vulnerability discovery attempts before an adversary finds exposed services.</p>
              </div>
            </div>
          </section>

          {/* 8. Security Monitoring Dashboard */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Activity className="text-emerald-400" size={24} />
              <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">
                8. Security Monitoring Dashboard
              </h2>
            </div>
            <p className="text-sm font-light text-neutral-300 sm:text-base">
              Created a central Splunk dashboard named <strong className="font-semibold text-neutral-100">SOC Lab - Security Overview</strong> to consolidate telemetry into actionable visual cards and time-series charts.
            </p>

            {/* Dashboard Screenshot */}
            <div className="space-y-2">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
                <Image
                  src="/events/splunk-soc-dashboard.png"
                  alt="Splunk SOC Lab Security Overview Dashboard"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-center text-xs font-mono text-neutral-400">
                Figure 4: SOC Lab - Security Overview dashboard featuring real-time Single Values (20 SSH Failures, 72 Blocked Packets), Timeline Charts, Top Attacker IPs, and Port Scan Activity.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-neutral-800 bg-panel p-3.5">
                <h4 className="font-semibold text-neutral-200 text-xs sm:text-sm">SSH Failed Logins (24h) &amp; Timeline</h4>
                <p className="mt-1 text-xs font-light text-neutral-400">
                  Displays cumulative login failures (20 attempts recorded) alongside a chronological spike chart to identify targeted brute-force waves.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-800 bg-panel p-3.5">
                <h4 className="font-semibold text-neutral-200 text-xs sm:text-sm">Blocked Packets &amp; Targeted Ports</h4>
                <p className="mt-1 text-xs font-light text-neutral-400">
                  Visualizes 72 blocked packets, ranking targeted ports (Port 8000, 443, 80, 8080, 23, 3306, 53, 110, 25, 21) from Nmap sweeps.
                </p>
              </div>
            </div>
          </section>

          {/* 9. Alert Configuration */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-amber-400" size={24} />
              <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">
                9. Alert Configuration
              </h2>
            </div>
            <p className="text-sm font-light text-neutral-300 sm:text-base">
              Configured automated Splunk alert rules scheduled via cron to proactively flag high-severity activity without requiring manual query execution.
            </p>

            {/* Alert Screenshot */}
            <div className="space-y-2">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
                <Image
                  src="/events/splunk-alerts-config.png"
                  alt="Splunk Alerts configuration panel"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-center text-xs font-mono text-neutral-400">
                Figure 5: Splunk Alert Manager showing active automated alerts for Firewall Port Scans and SSH Multiple Failed Login Attempts.
              </p>
            </div>

            <ul className="list-disc space-y-2 pl-5 text-xs sm:text-sm font-light text-neutral-300">
              <li>
                <strong className="font-medium text-neutral-200">Firewall - Possible Port Scan:</strong> Evaluated every 2 minutes (<code className="rounded bg-neutral-900 px-1 py-0.5 font-mono text-xs text-amber-300">*/2 * * * *</code>). Triggers when events &gt; 0. Configured to add to Triggered Alerts and dispatch email notifications.
              </li>
              <li>
                <strong className="font-medium text-neutral-200">SSH - Multiple Failed Login Attempts:</strong> Periodically checks authentication logs for brute-force patterns meeting the threshold.
              </li>
            </ul>
          </section>

          {/* 10. Incident Investigation Methodology */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">
              10. Incident Investigation Methodology
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {[
                {
                  step: "Step 1 — Identify",
                  desc: "Spot suspicious patterns from SPL results or dashboard panels. Note event type, source IP, affected host, and time window.",
                },
                {
                  step: "Step 2 — Validate",
                  desc: "Inspect raw log entries to verify whether events satisfy detection criteria. Check extracted fields and timestamps.",
                },
                {
                  step: "Step 3 — Correlate",
                  desc: "Cross-examine authentication and firewall logs to determine if the same IP engaged in both scanning and brute force.",
                },
                {
                  step: "Step 4 — Investigate",
                  desc: "Determine targeted accounts, contacted ports, authentication success, and whether lateral movement or compromise took place.",
                },
                {
                  step: "Step 5 — Assess",
                  desc: "Classify findings based on empirical evidence. Distinguish confirmed observations from unverified assumptions.",
                },
                {
                  step: "Step 6 — Document",
                  desc: "Draft a formal incident record detailing timeline, indicators, analysis, limitations, and containment recommendations.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-neutral-800 bg-panel p-4"
                >
                  <span className="font-mono text-xs font-semibold text-emerald-400">
                    {item.step}
                  </span>
                  <p className="mt-2 text-xs sm:text-[13px] font-light leading-relaxed text-neutral-300">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 11. Incident Report Format */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">
              11. Incident Report Format
            </h2>
            <div className="space-y-3 rounded-2xl border border-dashed border-neutral-800 bg-panel p-5 text-xs sm:text-sm font-light text-neutral-300">
              <p>Each investigated scenario is documented using a standardized enterprise incident structure:</p>
              <div className="space-y-3 pl-2">
                <div>
                  <h4 className="font-semibold text-neutral-100">Executive Summary</h4>
                  <p className="text-neutral-400">High-level overview of observed activity, reason for investigation, and final threat assessment.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-100">Timeline</h4>
                  <p className="text-neutral-400">Chronological ledger of key timestamps, requests, and associated detection milestones.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-100">Evidence and Observed Indicators</h4>
                  <p className="text-neutral-400">Documented source IPs, targeted accounts, destination ports, event counts, and raw log samples.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-100">Findings &amp; Impact Assessment</h4>
                  <p className="text-neutral-400">Explicit differentiation between blocked attempts vs. confirmed compromise to avoid false positives.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-100">Response &amp; Recommendations</h4>
                  <p className="text-neutral-400">Actionable remediation steps: disabling password authentication, enforcing fail2ban, firewall hardening, and logging enhancement.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 12. Key Learning Outcomes & Scope */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <section className="space-y-3 rounded-2xl border border-neutral-800 bg-panel p-5">
              <h2 className="text-xl font-semibold text-neutral-100 sm:text-2xl">
                12. Key Learning Outcomes
              </h2>
              <ul className="list-disc space-y-1.5 pl-4 text-xs sm:text-sm font-light text-neutral-300">
                <li>SIEM deployment and ingestion pipeline setup.</li>
                <li>Linux authentication and firewall log analysis.</li>
                <li>SPL search construction, regex extraction, and aggregation.</li>
                <li>Behavioral threat detection rule engineering.</li>
                <li>Dashboard development and security visualization.</li>
                <li>Automated alert configuration with cron scheduling.</li>
                <li>Structured incident investigation and evidence documentation.</li>
              </ul>
            </section>

            <section className="space-y-3 rounded-2xl border border-neutral-800 bg-panel p-5">
              <h2 className="text-xl font-semibold text-neutral-100 sm:text-2xl">
                13. Scope &amp; Limitations
              </h2>
              <div className="space-y-2 text-xs sm:text-sm font-light text-neutral-300">
                <p>
                  This personal learning lab focuses on Linux security monitoring and foundational SOC workflows.
                </p>
                <p>
                  Detection coverage currently centers on SSH authentication and UFW traffic. It does not provide full endpoint visibility (e.g. process execution trees, file integrity monitoring, or persistence mechanisms).
                </p>
                <p className="text-neutral-400">
                  Future enhancements will incorporate auditd/Sysmon for Linux, expanded correlation rules, and threshold tuning.
                </p>
              </div>
            </section>
          </div>

          {/* Conclusion */}
          <section className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <h2 className="text-xl font-semibold text-neutral-100 sm:text-2xl">
              Conclusion
            </h2>
            <p className="mt-3 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              The SOC Analyst Incident Investigation Lab demonstrates a practical approach to security monitoring using Ubuntu Server, Kali Linux, and Splunk Enterprise. By generating controlled activity, collecting authentication and firewall logs, developing SPL detection rules, building a monitoring dashboard, and configuring alerts, the project applies foundational SOC concepts to a virtualized Linux environment.
            </p>
            <p className="mt-2 text-sm font-light text-neutral-300 sm:text-base">
              It provides a solid foundation for continuous learning in Blue Team operations, SIEM monitoring, threat detection, and incident response.
            </p>
          </section>

          {/* Footer Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-neutral-800/80">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-400 transition hover:text-white"
            >
              <ChevronLeft size={14} />
              All Projects
            </Link>
            <Link
              href="/"
              className="text-xs font-mono uppercase tracking-widest text-neutral-400 transition hover:text-white"
            >
              Home
            </Link>
          </div>
        </div>
      </Reveal>
    </PageShell>
  );
}
