"use client";

import { useLanguage } from "./LanguageProvider";

/** EN | TH switch shown in the header. Not translated itself. */
export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const option = (value: "en" | "th", label: string, name: string) => (
    <button
      type="button"
      lang={value}
      aria-pressed={lang === value}
      aria-label={name}
      onClick={() => setLang(value)}
      className={`lang-toggle-btn rounded-md px-1.5 py-1 text-xs sm:px-2 font-mono font-medium transition ${lang === value ? "lang-toggle-active" : "text-neutral-400 hover:text-white"}`}
    >
      {label}
    </button>
  );
  return (
    <div data-no-i18n role="group" aria-label="Language" className="lang-toggle flex items-center rounded-lg border border-neutral-800 p-0.5">
      {option("en", "EN", "English")}
      {option("th", "TH", "ภาษาไทย")}
    </div>
  );
}
