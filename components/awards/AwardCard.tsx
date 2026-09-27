import { ArrowUpRight, BookOpen, FileText } from "lucide-react";
import type { Award } from "@/lib/types";

type AwardCardProps = Readonly<{
  award: Award;
}>;

export function AwardCard({ award }: AwardCardProps) {
  return (
    <article className="award-card group relative overflow-hidden rounded-xl border border-sky-950/60 bg-[#0b101b]/90 p-5 transition-all duration-300 hover:border-sky-500/35 hover:shadow-lg hover:shadow-sky-950/30 sm:p-6 before:pointer-events-none before:absolute before:-right-12 before:-top-12 before:h-28 before:w-28 before:rounded-full before:bg-sky-500/5 before:blur-2xl before:transition-opacity hover:before:bg-sky-500/10">
      <div className="relative z-10 flex flex-col">
        <h3 className="text-base font-bold tracking-tight text-neutral-100 sm:text-lg">
          {award.title}
        </h3>
        <p className="award-card-category mt-1 font-mono text-xs font-medium text-sky-400 sm:text-[13px]">
          {award.category}
        </p>

        <p className="mt-2.5 text-xs leading-relaxed text-neutral-400 sm:text-[13px]">
          {award.description}
        </p>

        {(award.writeupUrl || award.certificateUrl) && (
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            {award.writeupUrl && (
              <a
                href={award.writeupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="award-card-btn-writeup inline-flex items-center gap-2 rounded-md border border-sky-900/60 bg-sky-950/30 px-3.5 py-1.5 font-mono text-xs font-medium text-sky-400 transition hover:border-sky-700 hover:bg-sky-900/40 hover:text-sky-300"
              >
                <BookOpen size={13} />
                <span>{award.writeupLabel || "Read Write-up"}</span>
                <ArrowUpRight size={12} />
              </a>
            )}
            {award.certificateUrl && (
              <a
                href={award.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="award-card-btn-cert inline-flex items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-900/60 px-3 py-1.5 text-xs text-neutral-400 transition hover:border-neutral-700 hover:bg-neutral-800 hover:text-neutral-200"
              >
                <FileText size={12} />
                <span>View Certificate</span>
                <ArrowUpRight size={11} />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
