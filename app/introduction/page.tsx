"use client";

import Link from "next/link";
import { LocaleProvider, useLocale } from "@/src/components/LocaleProvider";
import { locales, translations } from "@/src/content/translations";

function IntroductionContent() {
  const { copy, locale, setLocale } = useLocale();
  return (
    <main className="intro-page">
      <header className="intro-toolbar">
        <Link href={`/?lang=${locale}`}>← {copy.intro.back}</Link>
        <div className="intro-languages" role="group" aria-label={copy.form.fields.preferredLanguage.label}>
          {locales.map((item) => <button type="button" key={item} className={locale === item ? "is-active" : ""} onClick={() => setLocale(item)}>{translations[item].localeName}</button>)}
        </div>
        <button type="button" onClick={() => window.print()}>{copy.intro.print}</button>
      </header>

      <article className="intro-sheet">
        <div className="intro-sheet__top">
          <div><p className="intro-kicker">{copy.intro.generated}</p><h1>{copy.common.brandName}</h1><p className="intro-descriptor">{copy.common.descriptor}</p><p className="intro-owner">{copy.hero.byline}</p></div>
          <div className="intro-monogram" aria-hidden="true">△</div>
        </div>
        <div className="intro-route"><span>{copy.hero.diagramLabels[0]}</span><i /><span>{copy.hero.diagramLabels[1]}</span><i /><span>{copy.hero.diagramLabels[2]}</span></div>
        <p className="intro-regions">{copy.common.regions}</p>
        <h2>{copy.intro.title}</h2>
        <p className="intro-subtitle">{copy.intro.subtitle}</p>
        <p className="intro-snapshot">{copy.intro.snapshot}</p>

        <div className="intro-columns">
          <section><h3>{copy.intro.valueTitle}</h3><ul>{copy.intro.valueItems.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><h3>{copy.intro.areasTitle}</h3><ul>{copy.intro.areas.map((item) => <li key={item}>{item}</li>)}</ul></section>
        </div>
        <div className="intro-facts">
          <section><h3>{copy.intro.marketsTitle}</h3><p>{copy.intro.markets}</p></section>
          <section><h3>{copy.intro.languagesTitle}</h3><p>{copy.intro.languages}</p></section>
          <section><h3>{copy.intro.sectorsTitle}</h3><p>{copy.focus.industries.join(" · ")}</p></section>
          <section><h3>{copy.intro.contactTitle}</h3><p>{copy.intro.contactText}</p></section>
        </div>
        <footer className="intro-footer"><span>{copy.common.status}</span><span>{copy.footer.rights}</span></footer>
      </article>
    </main>
  );
}

export default function IntroductionPage() {
  return <LocaleProvider><IntroductionContent /></LocaleProvider>;
}
