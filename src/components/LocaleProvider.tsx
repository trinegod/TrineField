"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { locales, translations, type Locale, type SiteCopy } from "@/src/content/translations";

const STORAGE_KEY = "steven-site-locale";

type LocaleContextValue = {
  locale: Locale;
  copy: SiteCopy;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function resolveLocale(): Locale {
  const params = new URLSearchParams(window.location.search);
  const queryLocale = params.get("lang") as Locale | null;
  if (queryLocale && locales.includes(queryLocale)) return queryLocale;

  const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored && locales.includes(stored)) return stored;

  const browser = window.navigator.language.toLowerCase();
  if (browser.startsWith("zh")) return "zh-CN";
  if (browser.startsWith("ja")) return "ja";
  if (browser.startsWith("es")) return "es";
  return "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  const applyLocale = useCallback((nextLocale: Locale, updateUrl = true) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    document.documentElement.lang = nextLocale;
    const copy = translations[nextLocale];
    document.title = copy.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", copy.meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", copy.meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", copy.meta.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", copy.meta.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", copy.meta.description);
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", nextLocale);
      window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => applyLocale(resolveLocale(), false), 0);
    return () => window.clearTimeout(timer);
  }, [applyLocale]);

  const value = useMemo(
    () => ({ locale, copy: translations[locale], setLocale: (next: Locale) => applyLocale(next) }),
    [applyLocale, locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("LocaleProvider is required");
  return context;
}
