"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  function toggleTheme() {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    const viewTransitionDocument = document as ViewTransitionDocument;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!viewTransitionDocument.startViewTransition || reduceMotion) {
      setTheme(nextTheme);
      return;
    }

    viewTransitionDocument.startViewTransition(() => {
      flushSync(() => setTheme(nextTheme));
    });
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      disabled={!mounted}
      aria-label={mounted ? `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode` : "Toggle color theme"}
      className="theme-toggle grid h-8 w-8 place-items-center rounded-lg text-neutral-400 transition hover:bg-neutral-800/60 hover:text-white disabled:opacity-50"
    >
      {mounted && resolvedTheme === "light" ? <Moon size={15} /> : <Sun size={15} />}
    </button>
  );
}
