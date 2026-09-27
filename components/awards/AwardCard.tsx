import { ArrowUpRight } from "lucide-react";
import type { Award } from "@/lib/types";

type AwardCardProps = Readonly<{
  award: Award;
}>;

export function AwardCard({ award }: AwardCardProps) {
  return (
    <article className="rounded-lg border border-neutral-800 bg-panel p-5 transition-colors hover:border-neutral-700 sm:p-6">
      <div className="flex flex-col">
        <h3 className="text-base sm:text-[17px] font-semibold text-neutral-100 leading-tight">
          {award.title}
        </h3>
        <p className="mt-1 font-mono text-xs sm:text-[13px] font-medium text-sky-400">
          {award.category}
        </p>

        <p className="mt-2.5 text-sm sm:text-base font-light leading-relaxed text-neutral-400">
          {award.description}
        </p>

        {award.writeupUrl && (
          <div className="mt-3.5">
            <a
              href={award.writeupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-neutral-400 transition hover:text-white"
            >
              <span>{award.writeupLabel || "Read write-up"}</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
