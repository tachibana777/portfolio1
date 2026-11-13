import type { ReactNode } from "react";
import Link from "next/link";
import { ZoomImage } from "@/components/ui/ZoomImage";

type Props = {
  part: string;
  intro: [string, ReactNode][];
  image?: { src: string; alt: string; width: number; height: number };
  afterImage: [string, ReactNode][];
  checklist: string[];
  learn: ReactNode;
  limits?: ReactNode;
};

const label = "font-semibold text-neutral-100";

export function ReadFirst({ part, intro, image, afterImage, checklist, learn, limits }: Props) {
  return (
    <section className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 sm:p-6">
      <h2 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">Read this first ({part})</h2>
      <div className="space-y-3 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
        {intro.map(([k, v]) => <p key={k}><strong className={label}>{k}.</strong> {v}</p>)}
      </div>
      {image && (
        <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
          <ZoomImage src={image.src} alt={image.alt} width={image.width} height={image.height} className="h-auto w-full object-contain" />
        </div>
      )}
      <div className="space-y-3 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
        {afterImage.map(([k, v]) => <p key={k}><strong className={label}>{k}.</strong> {v}</p>)}
        <div>
          <strong className={label}>Checklist.</strong>
          <ul className="mt-2 space-y-1.5">
            {checklist.map((c) => <li key={c} className="flex items-start gap-2"><span aria-hidden className="mt-1 inline-block h-3.5 w-3.5 shrink-0 rounded border border-neutral-600" /><span>{c}</span></li>)}
          </ul>
        </div>
        <p><strong className={label}>What you learn.</strong> {learn}</p>
        {limits && <p><strong className={label}>{part === "MISP" ? "Limit" : "Limits"}.</strong> {limits}</p>}
      </div>
    </section>
  );
}

const links = [
  ["/projects/start-here", "Start here"],
  ["/projects/misp-threat-intel-lab", "MISP"],
  ["/projects/wazuh-edr-lab", "EDR"],
  ["/projects/wazuh-xdr-lab", "XDR"],
  ["/projects/wazuh-soar-lab", "SOAR"],
] as const;

export function SeriesNav({ current }: { current?: string }) {
  return (
    <nav aria-label="Lab series" className="flex flex-wrap items-center gap-2 text-xs font-mono">
      <span className="uppercase tracking-widest text-neutral-500">Series</span>
      {links.map(([href, text]) => href === current
        ? <span key={href} className="rounded-full border border-sky-700 bg-sky-950/40 px-3 py-1 text-sky-300">{text}</span>
        : <Link key={href} href={href} className="rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-neutral-300 transition hover:text-white">{text}</Link>)}
    </nav>
  );
}
