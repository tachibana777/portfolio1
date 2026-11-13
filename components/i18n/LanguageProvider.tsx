"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { applyThai, collect, restoreEnglish, type Dict, type Lang } from "@/lib/i18n/core";

const STORAGE_KEY = "lang";

type LanguageContextValue = { lang: Lang; setLang: (lang: Lang) => void };
const LanguageContext = createContext<LanguageContextValue>({ lang: "en", setLang: () => {} });

export const useLanguage = () => useContext(LanguageContext);

function readSavedLang(): Lang {
  try {
    return localStorage.getItem(STORAGE_KEY) === "th" ? "th" : "en";
  } catch {
    return "en";
  }
}

/**
 * Keeps the chosen language (EN or TH), sets <html lang>, and runs the Thai translation over the page.
 * English is the source in the JSX; Thai is applied after hydration and re-applied when React adds nodes (route changes, pagination).
 */
export function LanguageProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [lang, setLangState] = useState<Lang>("en");
  const dictRef = useRef<Dict | null>(null);

  useEffect(() => {
    setLangState(readSavedLang());
    // Dev helper used to build the Thai dictionary.
    (window as unknown as { __i18n?: unknown }).__i18n = { collect: () => collect(document.body) };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.setAttribute("data-lang", lang);

    if (lang === "en") {
      restoreEnglish();
      html.classList.remove("i18n-pending");
      return;
    }

    let cancelled = false;
    let observer: MutationObserver | null = null;
    let frame = 0;

    const run = () => {
      if (cancelled || !dictRef.current) return;
      observer?.disconnect();
      applyThai(document.body, dictRef.current);
      observer?.takeRecords();
      observer?.observe(document.body, { childList: true, subtree: true });
    };

    (async () => {
      if (!dictRef.current) dictRef.current = (await import("@/lib/i18n/th")).default;
      if (cancelled) return;
      observer = new MutationObserver(() => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(run);
      });
      run();
      html.classList.remove("i18n-pending");
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage may be blocked; the choice then lasts for this visit only */
    }
    setLangState(next);
  }, []);

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}
