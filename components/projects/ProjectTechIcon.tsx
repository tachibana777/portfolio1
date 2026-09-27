import type { IconType } from "react-icons";
import {
  SiBurpsuite,
  SiCss,
  SiDocker,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiKalilinux,
  SiLaravel,
  SiLinux,
  SiMetasploit,
  SiNextdotjs,
  SiNodedotjs,
  SiOwasp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiWireshark,
  SiWordpress,
} from "react-icons/si";

type TechConfig = {
  icon: IconType;
  color: string;
};

const techMap: Record<string, TechConfig> = {
  nextjs: { icon: SiNextdotjs, color: "currentColor" },
  "next.js": { icon: SiNextdotjs, color: "currentColor" },
  next: { icon: SiNextdotjs, color: "currentColor" },
  react: { icon: SiReact, color: "#61dafb" },
  css: { icon: SiCss, color: "#1572b6" },
  css3: { icon: SiCss, color: "#1572b6" },
  html: { icon: SiHtml5, color: "#e34f26" },
  html5: { icon: SiHtml5, color: "#e34f26" },
  javascript: { icon: SiJavascript, color: "#f7df1e" },
  js: { icon: SiJavascript, color: "#f7df1e" },
  typescript: { icon: SiTypescript, color: "#3178c6" },
  ts: { icon: SiTypescript, color: "#3178c6" },
  node: { icon: SiNodedotjs, color: "#5fa04e" },
  "node.js": { icon: SiNodedotjs, color: "#5fa04e" },
  nodejs: { icon: SiNodedotjs, color: "#5fa04e" },
  python: { icon: SiPython, color: "#3776ab" },
  linux: { icon: SiLinux, color: "#fcc624" },
  postgres: { icon: SiPostgresql, color: "#4169e1" },
  postgresql: { icon: SiPostgresql, color: "#4169e1" },
  burpsuite: { icon: SiBurpsuite, color: "#ff6633" },
  "burp suite": { icon: SiBurpsuite, color: "#ff6633" },
  owasp: { icon: SiOwasp, color: "#5f91c7" },
  docker: { icon: SiDocker, color: "#2496ed" },
  tailwind: { icon: SiTailwindcss, color: "#38bdf8" },
  tailwindcss: { icon: SiTailwindcss, color: "#38bdf8" },
  git: { icon: SiGit, color: "#f05032" },
  github: { icon: SiGithub, color: "currentColor" },
  kalilinux: { icon: SiKalilinux, color: "#557c94" },
  "kali linux": { icon: SiKalilinux, color: "#557c94" },
  wireshark: { icon: SiWireshark, color: "#1679a7" },
  metasploit: { icon: SiMetasploit, color: "#2596cd" },
  laravel: { icon: SiLaravel, color: "#ff2d20" },
  wordpress: { icon: SiWordpress, color: "#21759b" },
  vite: { icon: SiVite, color: "#bd34fe" },
  supabase: { icon: SiSupabase, color: "#3ecf8e" },
};

export function ProjectTechIcon({ name }: Readonly<{ name: string }>) {
  const key = name.trim().toLowerCase();
  const config = techMap[key];

  if (!config) {
    return (
      <span
        title={name}
        className="inline-block rounded bg-neutral-800/80 px-1.5 py-0.5 font-mono text-[10px] text-neutral-400"
      >
        {name.slice(0, 3).toUpperCase()}
      </span>
    );
  }

  const Icon = config.icon;

  return (
    <span
      title={name}
      className="inline-flex items-center justify-center opacity-75 transition-all hover:opacity-100 hover:-translate-y-0.5"
    >
      <Icon size={16} style={{ color: config.color }} aria-hidden="true" />
    </span>
  );
}
