import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type PageIntroProps = Readonly<{
  title: string;
  description: string;
}>;

export function PageIntro({ title, description }: PageIntroProps) {
  return (
    <header>
      <Link href="/" className="flex items-center gap-2 text-xs text-neutral-400 transition hover:text-white">
        <ChevronLeft size={14} />
        Back to Home
      </Link>
      <h1 className="mt-8 text-3xl font-normal tracking-tight">{title}</h1>
      <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-400">{description}</p>
    </header>
  );
}
