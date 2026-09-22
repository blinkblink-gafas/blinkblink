import en from "../locales/en.json";
import type { LocaleStrings } from "@/types/locales";

/**
 * The typed default locale. Keeping this access point framework-agnostic
 * makes a future i18n provider or library a drop-in replacement.
 */
const defaultLocale: LocaleStrings = en;

export function useTranslation(): LocaleStrings {
  return defaultLocale;
}

/** Interpolates data values without placing dynamic content in locale files. */
export function formatTranslation(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match
  );
}
