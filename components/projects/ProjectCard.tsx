"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: Readonly<{ project: Project }>) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${mouseX}px ${mouseY}px, var(--spotlight-color), transparent 70%)`;

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
  }

  return (
    <motion.article onMouseMove={handleMouseMove} whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-dashed border-neutral-800 bg-panel">
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: spotlight }} />
      <div className="relative m-2.5 aspect-[16/8] overflow-hidden rounded-md bg-neutral-100">
        <Image src={project.image} alt={project.title} fill sizes="(min-width: 768px) 350px, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" />
      </div>
      <div className="relative z-20 flex flex-1 flex-col px-4 pb-4">
        <div className="flex items-center gap-2"><h3 className="text-[15px] font-semibold leading-snug text-neutral-100">{project.title}</h3>{project.status && <span className="rounded-full border border-neutral-700 px-2 py-0.5 text-[8px] text-neutral-400">{project.status}</span>}</div>
        <p className="mt-1 text-[11px] font-medium text-neutral-300">{project.role}</p>
        <p className="mt-2 text-xs leading-5 text-neutral-400">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">{project.technologies.map((technology) => <span key={technology} title={technology} className="grid h-5 min-w-5 place-items-center rounded bg-neutral-900 px-1.5 text-[9px] text-neutral-400">{technology.slice(0, 2).toUpperCase()}</span>)}</div>
        <Link href={project.href} className="mt-auto flex items-center justify-end border-t border-neutral-800 pt-3 text-[9px] font-medium tracking-[.1em] text-neutral-400 transition hover:text-white">{project.action}<ArrowUpRight size={12} className="ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
      </div>
    </motion.article>
  );
}
