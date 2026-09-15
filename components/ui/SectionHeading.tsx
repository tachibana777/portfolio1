import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SectionHeadingProps = Readonly<{
  title: string;
  href?: string;
  linkLabel?: string;
}>;

export function SectionHeading({ title, href, linkLabel = "View All" }: SectionHeadingProps) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="section-title">{title}</h2>
      {href && (
        <Link href={href} className="flex items-center gap-2 text-xs text-neutral-400 transition hover:text-white">
          {linkLabel}
          <ArrowRight size={11} />
        </Link>
      )}
    </div>
  );
}
