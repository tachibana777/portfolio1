import Link from "next/link";
import { ThemeToggle } from "@/components/theme";
import { LanguageToggle } from "@/components/i18n";

const navigation = [
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Awards", href: "/awards" },
  { label: "Events", href: "/events" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-line/80 bg-ink/85 backdrop-blur-xl">
      <div className="mx-auto flex h-full w-[min(100%-2rem,720px)] items-center justify-between">
        <Link href="/" className="text-sm font-bold tracking-wide text-neutral-100">
          KH
        </Link>

        <nav aria-label="Primary navigation" className="flex items-center gap-2 text-xs font-medium text-neutral-300 sm:gap-6 sm:text-sm">
          {navigation.map(({ label, href }) => (
            <Link key={href} href={href} className="transition hover:text-white">
              {label}
            </Link>
          ))}
          <span aria-hidden className="hidden h-4 w-px bg-neutral-700 sm:block" />
          <LanguageToggle />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
