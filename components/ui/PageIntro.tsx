import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type PageIntroProps = Readonly<{
  title: string;
  description: string;
}>;

export function PageIntro({ title, description }: PageIntroProps) {
  return (
    <header>
      <Link href="/" className="flex items-center gap-2 text-sm font-medium text-neutral-400 transition hover:text-white">
        <ChevronLeft size={16} />
        Back to Home
      </Link>
      <h1 className="mt-8 text-3xl font-semibold tracking-tight text-neutral-100 sm:text-4xl">{title}</h1>
      <p className="mt-2.5 max-w-xl text-base leading-relaxed text-neutral-300">{description}</p>
    </header>
  );
}
