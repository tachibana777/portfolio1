"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(() => import("react-github-calendar"), { ssr: false });

const activityTheme = {
  dark: ["#14201c", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

export function GitHubActivity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <div ref={containerRef} className="min-h-40 overflow-x-auto rounded-lg border border-line p-4 text-xs text-neutral-400">
      {isVisible
        ? <GitHubCalendar username="tachibana777" blockSize={9} blockMargin={3} fontSize={11} colorScheme="dark" theme={activityTheme} />
        : <div className="h-28 animate-pulse rounded bg-neutral-900/50" role="status" aria-label="Loading GitHub activity" />}
    </div>
  );
}
