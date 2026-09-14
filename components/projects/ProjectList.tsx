"use client";

import { useState } from "react";
import type { Project } from "@/lib/types";
import { Pagination } from "@/components/ui";
import { ProjectCard } from "./ProjectCard";

const ITEMS_PER_PAGE = 2;

export function ProjectList({ projects }: Readonly<{ projects: Project[] }>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;

  return <><div className="mt-10 grid min-h-[370px] auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2">{projects.slice(start, start + ITEMS_PER_PAGE).map((project) => <ProjectCard key={project.title} project={project} />)}</div><Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /></>;
}
