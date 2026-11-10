"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { MotionConfig } from "framer-motion";

function ResetToLightOnOpen() {
  const { setTheme } = useTheme();

  useEffect(() => {
    // Reset only once when the app opens; do not override the user's toggle.
    setTheme("light");
    // next-themes exposes a stable setter, and this effect intentionally runs once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <ResetToLightOnOpen />
      <MotionConfig reducedMotion="never">
        {children}
      </MotionConfig>
    </NextThemesProvider>
  );
}
