import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type PageIntroProps = Readonly<{
  title: string;
  description: string;
}>;

export function PageIntro({ title, description }: PageIntroProps) {
  return (
    <header>
      <Link href="/" className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-400 transition hover:text-white">
        <ChevronLeft size={14} />
        Back to Home
      </Link>
      <h1 className="mt-7 text-3xl font-normal tracking-tight text-neutral-100 sm:text-4xl">{title}</h1>
      <p className="mt-2.5 max-w-xl text-base font-light leading-7 text-neutral-400 sm:text-lg sm:leading-8">{description}</p>
    </header>
  );
}
