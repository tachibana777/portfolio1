"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const GitHubCalendar = dynamic(() => import("react-github-calendar"), { ssr: false });

const activityTheme = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#14201c", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

export function GitHubActivity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "200px" });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Refetch when the tab regains focus after 5+ minutes, or every 10 minutes while open.
  useEffect(() => {
    if (!isVisible) return;
    let last = Date.now();
    const refresh = () => { last = Date.now(); setRefreshKey((k) => k + 1); };
    const onVisible = () => {
      if (document.visibilityState === "visible" && Date.now() - last > 5 * 60 * 1000) refresh();
    };
    const timer = window.setInterval(() => { if (document.visibilityState === "visible") refresh(); }, 10 * 60 * 1000);
    document.addEventListener("visibilitychange", onVisible);
    return () => { window.clearInterval(timer); document.removeEventListener("visibilitychange", onVisible); };
  }, [isVisible]);

  return (
    <div ref={containerRef} className="min-h-40 overflow-x-auto rounded-lg border border-line p-4 text-xs text-neutral-400">
      {isVisible
        ? <GitHubCalendar key={refreshKey} username="tachibana777" blockSize={9} blockMargin={3} fontSize={11} colorScheme={mounted && resolvedTheme === "dark" ? "dark" : "light"} theme={activityTheme} />
        : <div className="h-28 animate-pulse rounded bg-neutral-900/50" role="status" aria-label="Loading GitHub activity" />}
    </div>
  );
}
