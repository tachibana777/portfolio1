import type { IconType } from "react-icons";
import { FaNetworkWired, FaRobot, FaShieldHalved } from "react-icons/fa6";
import {
  SiBurpsuite,
  SiCss,
  SiDocker,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiKalilinux,
  SiLinux,
  SiMetasploit,
  SiMysql,
  SiNextdotjs,
  SiOwasp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRust,
  SiSqlite,
  SiSupabase,
  SiTailwindcss,
  SiTauri,
  SiTypescript,
  SiVite,
  SiWireshark,
} from "react-icons/si";

export type Technology = {
  name: string;
  icon: IconType;
  color: string;
};

export const technologies: Technology[] = [
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38bdf8" },
  { name: "Vite", icon: SiVite, color: "#a855f7" },
  { name: "Next.js", icon: SiNextdotjs, color: "#e5e5e5" },
  { name: "React", icon: SiReact, color: "#61dafb" },
  { name: "CSS", icon: SiCss, color: "#1572b6" },
  { name: "HTML5", icon: SiHtml5, color: "#e34f26" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  { name: "Python", icon: SiPython, color: "#3776ab" },
  { name: "Rust", icon: SiRust, color: "#ce412b" },
  { name: "MySQL", icon: SiMysql, color: "#4479a1" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
  { name: "SQLite", icon: SiSqlite, color: "#44a2c7" },
  { name: "Supabase", icon: SiSupabase, color: "#3ecf8e" },
  { name: "Docker", icon: SiDocker, color: "#2496ed" },
  { name: "Linux", icon: SiLinux, color: "#f5c400" },
  { name: "Tauri", icon: SiTauri, color: "#ffc131" },
  { name: "AI APIs", icon: FaRobot, color: "#10a37f" },
  { name: "Git", icon: SiGit, color: "#f05032" },
  { name: "GitHub", icon: SiGithub, color: "#e5e7eb" },
  { name: "Kali Linux", icon: SiKalilinux, color: "#557c94" },
  { name: "Burp Suite", icon: SiBurpsuite, color: "#ff6633" },
  { name: "OWASP", icon: SiOwasp, color: "#5f91c7" },
  { name: "Wireshark", icon: SiWireshark, color: "#1679a7" },
  { name: "Metasploit", icon: SiMetasploit, color: "#2596cd" },
  { name: "Network Security", icon: FaNetworkWired, color: "#22c55e" },
  { name: "Penetration Testing", icon: FaShieldHalved, color: "#ef4444" },
];
