import { en } from "./en";
import { es } from "./es";
import { zhCN } from "./zh-CN";
import type { Locale, SiteCopy } from "./types";

export const translations: Record<Locale, SiteCopy> = {
  en,
  es,
  "zh-CN": zhCN,
};

export const locales = Object.keys(translations) as Locale[];
export type { Locale, SiteCopy } from "./types";
