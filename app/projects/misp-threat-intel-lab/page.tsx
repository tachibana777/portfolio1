import Image from "next/image";
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
} from "lucide-react";
import { SiUbuntu, SiVmware } from "react-icons/si";
import { PageShell } from "@/components/layout";
import { Reveal } from "@/components/ui";

export const metadata = {
  title: "MISP Threat Intelligence Sharing Lab | Kritsada Hongpatsa",
  description:
    "Multi-node MISP lab for threat intelligence sharing, user and organization management, server synchronization, feed configuration, and TLP classification.",
};

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
              Multi-Node Threat Intelligence Platform — Deployment, Synchronization &amp; Feed Management
            </p>

            {/* Tech Badges Row */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-panel px-2.5 py-1 text-xs font-medium text-neutral-200">
                <Shield className="text-[#2596cd]" size={14} />
                MISP 2.5.51
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-panel px-2.5 py-1 text-xs font-medium text-neutral-200">
                <SiUbuntu className="text-[#e95420]" size={14} />
                Ubuntu 24.04 LTS
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-panel px-2.5 py-1 text-xs font-medium text-neutral-200">
                <SiVmware className="text-[#0284c7]" size={14} />
                VMware
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-panel px-2.5 py-1 text-xs font-medium text-neutral-200">
                <Rss className="text-[#f97316]" size={13} />
                OSINT Feeds
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-panel px-2.5 py-1 text-xs font-medium text-neutral-200">
                <Network className="text-emerald-400" size={13} />
                Push &amp; Pull Sync
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
                Server 1 (NCSA)
              </span>
              <p className="mt-1 text-sm font-medium text-neutral-200">
                Ubuntu 24.04.5 (192.168.136.142)
              </p>
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                Server 2 (ORGNAME)
              </span>
              <p className="mt-1 text-sm font-medium text-neutral-200">
                Ubuntu 24.04.5 (192.168.136.143)
              </p>
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                Platform
              </span>
              <p className="mt-1 text-sm font-medium text-neutral-200">
                MISP 2.5.51
              </p>
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                Sync Mode
              </span>
              <p className="mt-1 text-sm font-medium text-neutral-200">
                Bidirectional Push &amp; Pull
              </p>
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                Key Features
              </span>
              <p className="mt-1 text-sm font-medium text-neutral-200">
                RBAC · TLP · OSINT Feeds · MITRE ATT&amp;CK
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
                This project deploys two MISP (Malware Information Sharing Platform &amp; Threat Sharing) nodes to practice threat intelligence operations, including event sharing, server synchronization, organization-based access control, and feed management.
              </p>
              <p>
                Two MISP 2.5.51 instances were installed on Ubuntu 24.04.5 virtual machines in VMware. The lab uses NCSA and ORGNAME as separate organizations and configures authenticated synchronization between the nodes. Screenshots document user and server settings, job queues, the feed catalog, and event data.
              </p>
              <p>The project focuses on several key operational areas:</p>
              <ul className="list-disc space-y-2 pl-5 text-neutral-300">
                <li>
                  <strong className="font-semibold text-neutral-100">Role-Based Access Control (RBAC):</strong> Managing user roles (Admin, Sync User, Org Admin) and organization-level permissions.
                </li>
                <li>
                  <strong className="font-semibold text-neutral-100">Server Synchronization:</strong> Establishing Push &amp; Pull sync between nodes using API key authentication and Sync User accounts.
                </li>
                <li>
                  <strong className="font-semibold text-neutral-100">Feed Management:</strong> Reviewing available OSINT sources and their enablement and caching states before using them in the lab.
                </li>
                <li>
                  <strong className="font-semibold text-neutral-100">TLP Classification:</strong> Understanding Traffic Light Protocol (TLP) levels for data sharing boundaries — RED, AMBER, GREEN, and CLEAR.
                </li>
                <li>
                  <strong className="font-semibold text-neutral-100">Event Management:</strong> Browsing, creating, and tagging threat events with MITRE ATT&amp;CK techniques, galaxy clusters, and OSINT tags.
                </li>
              </ul>
              <p>
                The goal is to understand the end-to-end workflow of a threat intelligence analyst: deploying and configuring a sharing platform, managing organizations and users, synchronizing intelligence between nodes, ingesting open-source feeds, and classifying data using standardized protocols.
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
                "Deploy MISP on two separate Ubuntu 24.04.5 virtual machines.",
                "Configure RBAC with Admin, Sync User, and Org Admin roles.",
                "Set up organization management for multi-org sharing.",
                "Create Sync User accounts with API key authentication.",
                "Establish bidirectional server synchronization (Push & Pull).",
                "Verify connection status and monitor sync job execution.",
                "Review feed sources and verify enablement and cache status.",
                "Understand TLP classification levels for data sharing.",
                "Browse and manage threat events with MITRE ATT&CK tags.",
                "Practice audit log monitoring and system diagnostics.",
              ].map((obj, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-3"
                >
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-sky-400"
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
              The lab consists of two MISP nodes simulating inter-organization threat intelligence sharing:
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-dashed border-neutral-800 bg-panel p-4">
                <div className="flex items-center gap-2">
                  <Server className="text-sky-400" size={18} />
                  <h3 className="font-semibold text-neutral-100">3.1 Server 1 — NCSA</h3>
                </div>
                <span className="mt-1 block font-mono text-[11px] text-neutral-500">
                  MISP Node · 192.168.136.142
                </span>
                <p className="mt-2.5 text-xs sm:text-[13px] font-light text-neutral-300">
                  Primary MISP instance running on Ubuntu 24.04. Hosts the NCSA organization with admin and sync user accounts. Configured to push and pull threat intelligence data to/from Server 2.
                </p>
              </div>

              <div className="rounded-2xl border border-dashed border-neutral-800 bg-panel p-4">
                <div className="flex items-center gap-2">
                  <Server className="text-emerald-400" size={18} />
                  <h3 className="font-semibold text-neutral-100">3.2 Server 2 — ORGNAME</h3>
                </div>
                <span className="mt-1 block font-mono text-[11px] text-neutral-500">
                  MISP Node · 192.168.136.143
                </span>
                <p className="mt-2.5 text-xs sm:text-[13px] font-light text-neutral-300">
                  Secondary MISP instance for the ORGNAME organization. Receives synced events from Server 1 and can push its own threat intelligence back. Contains sync and admin user accounts.
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
          </section>

          {/* 4. Tools and Technologies */}
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
                        <Shield className="text-[#2596cd]" size={16} />
                        <span>MISP 2.5.51</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">Open-source threat intelligence sharing platform</td>
                  </tr>
                  <tr className="hover:bg-neutral-900/30">
                    <td className="px-4 py-2.5 font-medium text-neutral-200">
                      <div className="flex items-center gap-2">
                        <SiUbuntu className="text-[#e95420]" size={16} />
                        <span>Ubuntu 24.04 LTS</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">Host operating system for both MISP nodes</td>
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
                        <Rss className="text-[#f97316]" size={16} />
                        <span>OSINT Feeds</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">CIRCL, Phishtank, Tor nodes, Snort, cybercrime-tracker, and more</td>
                  </tr>
                  <tr className="hover:bg-neutral-900/30">
                    <td className="px-4 py-2.5 font-medium text-neutral-200">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="text-[#ef4444]" size={16} />
                        <span>MITRE ATT&amp;CK</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">Adversary technique tagging and galaxy cluster classification</td>
                  </tr>
                  <tr className="hover:bg-neutral-900/30">
                    <td className="px-4 py-2.5 font-medium text-neutral-200">
                      <div className="flex items-center gap-2">
                        <Lock className="text-[#eab308]" size={16} />
                        <span>TLP (Traffic Light Protocol)</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">Data classification for sharing boundaries</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Installation & Setup */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">
              5. Installation &amp; Setup
            </h2>
            <div className="space-y-4 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <div>
                <h3 className="font-semibold text-neutral-100">5.1 Virtual Machine Setup</h3>
                <p className="mt-1">
                  Deployed two Ubuntu 24.04.5 virtual machines on VMware. Server 1 was assigned <code className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-amber-400">192.168.136.142</code> (NCSA) and Server 2 was assigned <code className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-amber-400">192.168.136.143</code> (ORGNAME).
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-100">5.2 MISP Installation</h3>
                <p className="mt-1">
                  Installed MISP on both servers using the official installation script:
                </p>
                <div className="mt-2 rounded-lg border border-neutral-800 bg-neutral-950 p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <code>curl -fsSL https://raw.githubusercontent.com/MISP/MISP/refs/heads/2.5/INSTALL/INSTALL.ubuntu2404.sh | bash -s</code>
                </div>
                <p className="mt-2">
                  After installation, default admin credentials were generated and saved to <code className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-amber-400">/root/misp_settings.txt</code>. Accessed the web interface at <code className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-amber-400">https://&lt;server_ip&gt;/users/login</code>.
                </p>
              </div>
            </div>
          </section>

          {/* 6. User & Organization Management */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">
              6. User &amp; Organization Management
            </h2>
            <div className="space-y-4 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <div>
                <h3 className="font-semibold text-neutral-100">6.1 Role-Based Access Control (RBAC)</h3>
                <p className="mt-1">
                  MISP supports granular RBAC with roles such as Admin, Org Admin, Sync User, Publisher, and User. Roles are managed via <code className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-amber-400">Administration → List Roles</code> to control permissions for event creation, synchronization, tagging, and administrative tasks.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-100">6.2 Organization Management</h3>
                <p className="mt-1">
                  Organizations are managed via <code className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-amber-400">Administration → List Organisations</code>. Each MISP node has its own local organization, and remote organizations are created when synchronization is established.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-100">6.3 User Management</h3>
                <p className="mt-1">
                  Created users via <code className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-amber-400">Administration → Add User</code>, assigning email, password, organization, and role. Sync User accounts were created specifically for inter-node synchronization with API key (Authkey) authentication.
                </p>
              </div>
            </div>

            {/* Server 1 Users Screenshot */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                Server 1 (NCSA) — User Management
              </span>
              <div className="overflow-hidden rounded-xl border border-neutral-800">
                <Image
                  src="/events/misp-users-server1.png"
                  alt="MISP Users Index on Server 1 showing admin and sync user accounts"
                  width={1440}
                  height={800}
                  className="w-full object-cover"
                />
              </div>
            </div>

            {/* Server 2 Users Screenshot */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                Server 2 (ORGNAME) — User Management
              </span>
              <div className="overflow-hidden rounded-xl border border-neutral-800">
                <Image
                  src="/events/misp-users-server2.png"
                  alt="MISP Users Index on Server 2 showing admin and sync user accounts"
                  width={1440}
                  height={800}
                  className="w-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* 7. Server Synchronization */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">
              7. Server Synchronization
            </h2>
            <div className="space-y-4 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <p>
                Server synchronization was configured via <code className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-amber-400">Sync Actions → Remote Servers → New Servers</code>. The setup process involved:
              </p>
              <ol className="list-decimal space-y-2 pl-5 text-neutral-300">
                <li>Entering the Base URL of the remote MISP node</li>
                <li>Setting an Instance Name for identification</li>
                <li>Selecting the Organisation Type</li>
                <li>Providing the Authkey from the remote node&apos;s Sync User account</li>
                <li>Configuring sharing rules (Push &amp; Pull enabled)</li>
                <li>Enabling &quot;Publish Without Email&quot; and &quot;Allow self-signed certificates&quot;</li>
                <li>Verifying connection status by clicking Run</li>
              </ol>
              <p>
                Both servers showed <code className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-emerald-400">Status: OK</code> and <code className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-emerald-400">Compatibility: Compatible</code> with POST test confirming &quot;Received sent package&quot;.
              </p>
            </div>

            {/* Server 1 Sync Config */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                Server 1 (NCSA) — Remote Server Configuration
              </span>
              <div className="overflow-hidden rounded-xl border border-neutral-800">
                <Image
                  src="/events/misp-servers-server1.png"
                  alt="MISP Servers page on Server 1 showing sync configuration with node"
                  width={1440}
                  height={800}
                  className="w-full object-cover"
                />
              </div>
            </div>

            {/* Server 2 Sync Config */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                Server 2 (ORGNAME) — Remote Server Configuration
              </span>
              <div className="overflow-hidden rounded-xl border border-neutral-800">
                <Image
                  src="/events/misp-servers-server2.png"
                  alt="MISP Servers page on Server 2 showing sync configuration with main"
                  width={1440}
                  height={800}
                  className="w-full object-cover"
                />
              </div>
            </div>

            {/* Pull Queued */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                Pull Execution — Job Queued
              </span>
              <div className="overflow-hidden rounded-xl border border-neutral-800">
                <Image
                  src="/events/misp-pull-queued.png"
                  alt="MISP Pull queued for background execution"
                  width={1440}
                  height={800}
                  className="w-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* 8. Jobs & Sync Monitoring */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">
              8. Jobs &amp; Sync Monitoring
            </h2>
            <div className="space-y-3.5 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <p>
                MISP provides a Jobs queue (<code className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-amber-400">Administration → Jobs</code>) for monitoring background tasks including event publishing, feed caching, and server synchronization (pull/push operations).
              </p>
              <p>
                Both servers showed completed publish_event and pull jobs, confirming successful bidirectional synchronization between the NCSA and ORGNAME nodes.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                  Server 1 (NCSA) — Jobs Queue
                </span>
                <div className="overflow-hidden rounded-xl border border-neutral-800">
                  <Image
                    src="/events/misp-jobs-server1.png"
                    alt="MISP Jobs page on Server 1 showing completed publish events"
                    width={1440}
                    height={800}
                    className="w-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                  Server 2 (ORGNAME) — Jobs Queue
                </span>
                <div className="overflow-hidden rounded-xl border border-neutral-800">
                  <Image
                    src="/events/misp-jobs-server2.png"
                    alt="MISP Jobs page on Server 2 showing completed pull jobs"
                    width={1440}
                    height={800}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 9. OSINT Threat Feeds */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">
              9. OSINT Threat Feeds
            </h2>
            <div className="space-y-3.5 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <p>
                MISP includes built-in support for OSINT threat intelligence feeds accessible via <code className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-amber-400">Sync Actions → Feeds</code>. The captured configuration shows CIRCL OSINT Feed enabled, while the other listed sources are disabled; caching is off for the displayed feeds. This section records the lab configuration and available sources, rather than claiming that every feed was fetched.
              </p>
              <p>Sources visible in the captured feed catalog include:</p>
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

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                MISP Feeds Management Interface
              </span>
              <div className="overflow-hidden rounded-xl border border-neutral-800">
                <Image
                  src="/events/misp-feeds.png"
                  alt="MISP Feeds page showing available OSINT threat intelligence feeds"
                  width={1440}
                  height={800}
                  className="w-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* 10. TLP Classification */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">
              10. TLP Classification
            </h2>
            <div className="space-y-3.5 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <p>
                The Traffic Light Protocol (TLP) is used in MISP to classify threat intelligence data based on sharing boundaries. Understanding TLP levels is critical for proper information handling in a multi-organization sharing environment.
              </p>
            </div>

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
                    <td className="px-4 py-2.5 text-neutral-200">Confidential — eyes only</td>
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
                    <td className="px-4 py-2.5">Within organization and partners on a need-to-know basis</td>
                  </tr>
                  <tr className="hover:bg-neutral-900/30">
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center gap-2 font-medium">
                        <span className="h-3 w-3 rounded-full bg-green-500" />
                        <span className="text-green-400">TLP:GREEN</span>
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-neutral-200">Community sharing</td>
                    <td className="px-4 py-2.5">Shareable within the CTI community network, not publicly</td>
                  </tr>
                  <tr className="hover:bg-neutral-900/30">
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center gap-2 font-medium">
                        <span className="h-3 w-3 rounded-full border border-neutral-600 bg-neutral-800" />
                        <span className="text-neutral-300">TLP:CLEAR</span>
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-neutral-200">Public information</td>
                    <td className="px-4 py-2.5">No restrictions — can be disclosed publicly</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </section>

          {/* 11. Threat Events & MITRE ATT&CK */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">
              11. Threat Events &amp; MITRE ATT&amp;CK
            </h2>
            <div className="space-y-3.5 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <p>
                The MISP Events page displays threat intelligence events enriched with MITRE ATT&amp;CK techniques, galaxy clusters (including IRIDIUM/Sandworm), OSINT tags, and TLP classifications. The event list provides evidence of structured threat data and organization sharing in the lab.
              </p>
              <p>
                Events are organized by creator organization and tagged with structured taxonomies. The captured list includes MITRE ATT&amp;CK technique IDs such as T1041 (Exfiltration Over C2 Channel) and T1438 (Exfiltration Over Other Network Medium), alongside TLP and OSINT tags.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                MISP Events List — Synchronized Threat Intelligence
              </span>
              <div className="overflow-hidden rounded-xl border border-neutral-800">
                <Image
                  src="/events/misp-events-list.png"
                  alt="MISP Events list showing MITRE ATT&CK tagged threat events with TLP classifications"
                  width={1440}
                  height={800}
                  className="w-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* 12. Example Workflows from the MISP Guide */}
          <section className="space-y-5">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">
                12. IOC Search &amp; Event Correlation
              </h2>
              <p className="text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
                The NCSA MISP 2026 guide demonstrates searching for an IOC, opening the matching event, and reviewing its correlation graph. These are example screenshots extracted from the guide to illustrate the investigation workflow; they are reference material, separate from the lab screenshots above.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                {
                  src: "/events/misp-guide-p42-img3.png",
                  alt: "MISP Search Attributes form with an example SHA-256 IOC",
                  title: "1. Search for an IOC",
                  desc: "Enter an indicator such as a file hash in Event Actions → Search Attributes to locate matching attributes.",
                },
                {
                  src: "/events/misp-guide-p43-img3.png",
                  alt: "MISP search results showing an event and matching SHA-256 attribute",
                  title: "2. Review matching results",
                  desc: "Inspect the matching attribute and open its event to review the surrounding threat context.",
                },
                {
                  src: "/events/misp-guide-p43-img4.png",
                  alt: "MISP sample ransomware event with creator organization, owner organization, tags, and distribution",
                  title: "3. Inspect event context",
                  desc: "Review creator and owner organizations, tags, threat level, analysis state, and distribution before sharing or acting on the event.",
                },
                {
                  src: "/events/misp-guide-p44-img3.png",
                  alt: "MISP correlation graph linking an event with its tags",
                  title: "4. Explore correlations",
                  desc: "Use the correlation graph to examine relationships between the event and associated attributes or tags.",
                },
              ].map((figure) => (
                <figure key={figure.src} className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
                  <div className="border-b border-neutral-800 px-4 py-3">
                    <h3 className="text-sm font-semibold text-neutral-100">{figure.title}</h3>
                    <p className="mt-1 text-xs font-light text-neutral-400">{figure.desc}</p>
                  </div>
                  <Image
                    src={figure.src}
                    alt={figure.alt}
                    width={1456}
                    height={982}
                    className="h-auto w-full object-contain"
                  />
                </figure>
              ))}
            </div>
          </section>

          {/* 13. Key Takeaways */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">
              13. Key Takeaways
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                {
                  icon: <Database size={16} className="text-sky-400" />,
                  title: "Threat Intelligence Platform Deployment",
                  desc: "Gained hands-on experience deploying and configuring MISP from scratch on Ubuntu, including database setup, web interface access, and initial admin configuration.",
                },
                {
                  icon: <Users size={16} className="text-emerald-400" />,
                  title: "RBAC & Multi-Org Management",
                  desc: "Practiced creating organizations, assigning user roles (Admin, Sync User), and controlling permissions for data sharing across organizational boundaries.",
                },
                {
                  icon: <RefreshCw size={16} className="text-amber-400" />,
                  title: "Server Synchronization",
                  desc: "Configured bidirectional Push & Pull sync between two MISP nodes using API key authentication, verified connection status, and monitored job execution.",
                },
                {
                  icon: <Rss size={16} className="text-orange-400" />,
                  title: "Feed Configuration Review",
                  desc: "Reviewed feed providers and formats, then checked enabled and caching states. In the captured catalog, CIRCL is enabled and caching is off.",
                },
                {
                  icon: <Lock size={16} className="text-red-400" />,
                  title: "TLP Data Classification",
                  desc: "Applied Traffic Light Protocol levels to classify data sharing boundaries, essential for proper threat intelligence handling in multi-organization environments.",
                },
                {
                  icon: <AlertTriangle size={16} className="text-purple-400" />,
                  title: "MITRE ATT&CK Integration",
                  desc: "Explored threat events tagged with MITRE ATT&CK techniques and galaxy clusters, supporting structured threat analysis and adversary tracking.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-4"
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <h3 className="text-sm font-semibold text-neutral-100">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-xs sm:text-[13px] font-light leading-relaxed text-neutral-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-3 rounded-2xl border border-neutral-800 bg-panel p-5">
              <h2 className="text-xl font-semibold text-neutral-100 sm:text-2xl">
                14. Scope &amp; Limitations
              </h2>
              <p className="text-xs font-light leading-relaxed text-neutral-300 sm:text-sm">
                This is a two-node learning lab for MISP administration and threat intelligence sharing. Feed configuration was reviewed, but the captured feed page shows caching disabled, so feed ingestion is not presented as a verified outcome. The setup also uses self-signed certificates in a private VMware network.
              </p>
            </div>
            <div className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
              <h2 className="text-xl font-semibold text-neutral-100 sm:text-2xl">
                Conclusion
              </h2>
              <p className="text-xs font-light leading-relaxed text-neutral-300 sm:text-sm">
                The lab demonstrates deploying two MISP nodes, managing users and organizations, configuring Push and Pull synchronization, and reviewing shared events, feed settings, and TLP classifications. It provides a practical foundation for threat intelligence platform administration and controlled information sharing.
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

