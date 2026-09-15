import type { IconType } from "react-icons";
import { FaDatabase, FaFolderTree, FaKey, FaLock, FaNetworkWired, FaRobot, FaShieldHalved, FaTerminal } from "react-icons/fa6";
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
  category: TechnologyCategory;
};

export type TechnologyCategory = "web" | "development" | "security";

export const technologies: Technology[] = [
  { name: "HTML5", icon: SiHtml5, color: "#e34f26", category: "web" },
  { name: "CSS", icon: SiCss, color: "#1572b6", category: "web" },
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e", category: "web" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6", category: "web" },
  { name: "React", icon: SiReact, color: "#61dafb", category: "web" },
  { name: "Next.js", icon: SiNextdotjs, color: "currentColor", category: "web" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38bdf8", category: "web" },
  { name: "Vite", icon: SiVite, color: "#a855f7", category: "web" },
  { name: "Python", icon: SiPython, color: "#3776ab", category: "development" },
  { name: "Rust", icon: SiRust, color: "#ce412b", category: "development" },
  { name: "MySQL", icon: SiMysql, color: "#4479a1", category: "development" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1", category: "development" },
  { name: "SQLite", icon: SiSqlite, color: "#44a2c7", category: "development" },
  { name: "Supabase", icon: SiSupabase, color: "#3ecf8e", category: "development" },
  { name: "Docker", icon: SiDocker, color: "#2496ed", category: "development" },
  { name: "Linux", icon: SiLinux, color: "#f5c400", category: "development" },
  { name: "Tauri", icon: SiTauri, color: "#ffc131", category: "development" },
  { name: "AI APIs", icon: FaRobot, color: "#10a37f", category: "development" },
  { name: "Git", icon: SiGit, color: "#f05032", category: "development" },
  { name: "GitHub", icon: SiGithub, color: "currentColor", category: "development" },
  { name: "Kali Linux", icon: SiKalilinux, color: "#557c94", category: "security" },
  { name: "Burp Suite", icon: SiBurpsuite, color: "#ff6633", category: "security" },
  { name: "OWASP Top 10", icon: SiOwasp, color: "#5f91c7", category: "security" },
  { name: "Wireshark", icon: SiWireshark, color: "#1679a7", category: "security" },
  { name: "Metasploit", icon: SiMetasploit, color: "#2596cd", category: "security" },
  { name: "Nmap", icon: FaNetworkWired, color: "#22c55e", category: "security" },
  { name: "SQLmap", icon: FaDatabase, color: "#f59e0b", category: "security" },
  { name: "Gobuster", icon: FaFolderTree, color: "#a78bfa", category: "security" },
  { name: "John the Ripper", icon: FaKey, color: "#f97316", category: "security" },
  { name: "Hydra", icon: FaLock, color: "#ef4444", category: "security" },
  { name: "Terminal", icon: FaTerminal, color: "#94a3b8", category: "security" },
  { name: "Penetration Testing", icon: FaShieldHalved, color: "#ef4444", category: "security" },
];
