"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MotionConfig } from "framer-motion";

export function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <MotionConfig reducedMotion="never">
        {children}
      </MotionConfig>
    </NextThemesProvider>
  );
}
