import Link from "next/link";
import { ThemeToggle } from "@/components/theme";

const navigation = [
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Events", href: "/events" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-line/80 bg-ink/85 backdrop-blur-xl">
      <div className="mx-auto flex h-full w-[min(100%-2rem,720px)] items-center justify-between">
        <Link href="/" className="text-xs font-bold tracking-wide text-neutral-100">
          MEOW
        </Link>

        <nav aria-label="Primary navigation" className="flex items-center gap-4 text-xs text-neutral-400 sm:gap-6">
          {navigation.map(({ label, href }) => (
            <Link key={href} href={href} className="transition hover:text-white">
              {label}
            </Link>
          ))}
          <span aria-hidden className="h-4 w-px bg-neutral-700" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
