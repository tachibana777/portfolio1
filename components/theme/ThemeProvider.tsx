"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { MotionConfig } from "framer-motion";

function ResetToLightOnOpen() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

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
