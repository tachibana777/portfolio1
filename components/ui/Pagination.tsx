"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = Readonly<{ currentPage: number; totalPages: number; onPageChange: (page: number) => void }>;

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-between border-t border-dashed border-neutral-800 pt-6">
      <button type="button" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} className="flex items-center gap-1.5 text-[10px] text-neutral-400 transition hover:text-white disabled:pointer-events-none disabled:text-neutral-700"><ChevronLeft size={12} />Previous</button>
      <div className="flex items-center gap-2">
        {pages.map((page) => <button key={page} type="button" aria-current={page === currentPage ? "page" : undefined} aria-label={`Go to page ${page}`} onClick={() => onPageChange(page)} className={`grid h-7 min-w-7 place-items-center rounded-lg border px-2 font-mono text-[10px] transition ${page === currentPage ? "border-neutral-100 bg-neutral-100 text-neutral-950" : "border-dashed border-neutral-700 text-neutral-500 hover:border-neutral-500 hover:text-white"}`}>{page}</button>)}
      </div>
      <button type="button" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} className="flex items-center gap-1.5 text-[10px] text-neutral-400 transition hover:text-white disabled:pointer-events-none disabled:text-neutral-700">Next<ChevronRight size={12} /></button>
    </nav>
  );
}
