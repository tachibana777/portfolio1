"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { Project } from "@/lib/types";
import { ProjectTechIcon } from "./ProjectTechIcon";

export function ProjectCard({ project }: Readonly<{ project: Project }>) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, var(--spotlight-color), transparent 70%)`;

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
  }

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-dashed border-neutral-800 bg-panel p-3 transition-[border-color,box-shadow] duration-300 hover:border-neutral-600 hover:shadow-[0_12px_30px_-24px_rgba(255,255,255,0.25)]"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-neutral-800/80 bg-neutral-950">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 260px, (min-width: 640px) 340px, 100vw"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-3 flex flex-1 flex-col px-1.5">
        {project.status && (
          <div className="mb-2 flex items-center">
            <span className="inline-flex w-fit whitespace-nowrap rounded-full border border-dashed border-neutral-700 bg-neutral-900/90 px-2 py-0.5 text-[9px] font-mono font-medium uppercase tracking-wider text-neutral-400">
              {project.status}
            </span>
          </div>
        )}

        <div className="flex min-h-0 flex-1 flex-col">
          <h3 className="text-base sm:text-[17px] font-semibold text-neutral-100 leading-snug sm:min-h-[44px]">
            {project.title}
          </h3>

          {project.role && (
            <p className="mt-1 text-xs font-semibold text-neutral-300">
              {project.role}
            </p>
          )}

          {project.description && (
            <p className="mt-1.5 text-xs sm:text-[13px] font-light leading-relaxed text-neutral-400">
              {project.description}
            </p>
          )}

          {project.technologies?.length > 0 && (
            <div className="mt-auto pt-3">
              <div className="flex items-center gap-2.5">
                {project.technologies.map((tech) => (
                  <ProjectTechIcon key={tech} name={tech} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto">
        <div className="w-full h-px bg-neutral-800/90 mt-3 mb-1" />
        <div className="flex min-h-[32px] items-center justify-end px-1 pt-1">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-neutral-400 transition-colors hover:text-white"
          >
            <span>{project.action || "VISIT SITE"}</span>
            <ArrowUpRight
              size={13}
              className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
