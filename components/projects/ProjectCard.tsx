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
        <div className="flex items-start justify-between gap-2 min-h-[44px]">
          <h3 className="text-lg font-semibold leading-snug text-neutral-100 flex-1">
            {project.title}
          </h3>
          {project.status && (
            <span className="shrink-0 whitespace-nowrap rounded-full border border-neutral-700/80 bg-neutral-900/60 px-2.5 py-0.5 text-xs font-medium text-neutral-300">
              {project.status}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm font-medium text-neutral-300">{project.role}</p>
        <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-neutral-300 sm:min-h-[120px]">{project.description}</p>
        <div className="mt-auto pt-4">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                title={technology}
                className="grid h-7 min-w-7 place-items-center rounded bg-neutral-900 px-2.5 text-xs text-neutral-300"
              >
                {technology.slice(0, 2).toUpperCase()}
              </span>
            ))}
          </div>
          <Link
            href={project.href}
            className="flex items-center justify-end border-t border-neutral-800 pt-3.5 text-xs sm:text-[13px] font-semibold tracking-[.08em] text-neutral-400 transition hover:text-white"
          >
            {project.action}
            <ArrowUpRight size={14} className="ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
