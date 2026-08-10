"use client";

import { useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, CalendarDays, Camera, Download, FileText, Mail, MessageCircle, type LucideIcon } from "lucide-react";
import { LocaleProvider, useLocale } from "@/src/components/LocaleProvider";
import { locales, translations } from "@/src/content/translations";
import { siteConfig, type SocialKey } from "@/src/content/site";

type SubmitState = "idle" | "loading" | "success" | "fallback" | "error";
type FormErrors = Record<string, string>;

const requiredFields = ["name", "company", "email", "collaboration", "description", "acknowledgement"];

const CinematicStage = dynamic(() => import("@/src/components/CinematicStage"), {
  ssr: false,
  loading: () => <div className="cinematic-stage cinematic-stage--loading" aria-hidden="true"><div className="cinematic-stage__fallback" /></div>,
});

const socialIcons: Record<SocialKey, LucideIcon> = {
  instagram: Camera,
  linkedin: BriefcaseBusiness,
  email: Mail,
  wechat: MessageCircle,
  booking: CalendarDays,
};

function TrineGlyph({ large = false }: { large?: boolean }) {
  return (
    <span className={`trine-glyph ${large ? "trine-glyph--large" : ""}`} aria-hidden="true">
      <i className="trine-glyph__edge trine-glyph__edge--left" />
      <i className="trine-glyph__edge trine-glyph__edge--right" />
      <i className="trine-glyph__edge trine-glyph__edge--base" />
      <b className="trine-glyph__node trine-glyph__node--top" />
      <b className="trine-glyph__node trine-glyph__node--left" />
      <b className="trine-glyph__node trine-glyph__node--right" />
    </span>
  );
}

function LanguageSelector({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLocale();
  return (
    <div className={`language-selector ${compact ? "language-selector--compact" : ""}`} role="group" aria-label={translations[locale].form.fields.preferredLanguage.label}>
      {locales.map((item) => (
        <button
          type="button"
          className={item === locale ? "is-active" : ""}
          aria-pressed={item === locale}
          onClick={() => setLocale(item)}
          key={item}
        >
          {translations[item].localeName}
        </button>
      ))}
    </div>
  );
}

function SocialAction({ social, label, prominent = false }: { social: SocialKey; label: string; prominent?: boolean }) {
  const url = siteConfig.socialLinks[social];
  const Icon = socialIcons[social];
  const className = `action-link ${prominent ? "action-link--prominent" : ""} ${!url ? "is-placeholder" : ""}`;
  if (!url) {
    return (
      <span className={className} aria-disabled="true" title={label}>
        <span className="action-link__label"><Icon size={15} strokeWidth={1.7} aria-hidden="true" />{label}</span><small>•••</small>
      </span>
    );
  }
  return <a className={className} href={url} target={url.startsWith("http") ? "_blank" : undefined} rel="noreferrer"><span className="action-link__label"><Icon size={15} strokeWidth={1.7} aria-hidden="true" />{label}</span><ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" /></a>;
}

function Header() {
  const { copy } = useLocale();
  const [open, setOpen] = useState(false);
  const navItems = [["bring", copy.nav.bring], ["work", copy.nav.work], ["focus", copy.nav.focus], ["about", copy.nav.about]];
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label={copy.common.brandName}>
        <TrineGlyph />{copy.common.brandName}
      </a>
      <nav className={`desktop-nav ${open ? "is-open" : ""}`} aria-label={copy.nav.menu}>
        {navItems.map(([href, label]) => <a key={href} href={`#${href}`} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>{copy.nav.contact}<span>↗</span></a>
      </nav>
      <LanguageSelector compact />
      <button className="menu-button" type="button" aria-expanded={open} aria-label={open ? copy.nav.close : copy.nav.menu} onClick={() => setOpen(!open)}>
        <span /><span />
      </button>
    </header>
  );
}

function Hero({ compactMode, setCompactMode }: { compactMode: boolean; setCompactMode: (value: boolean) => void }) {
  const { copy, locale } = useLocale();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-trine" aria-hidden="true">
        <span className="trine-shell trine-shell--outer" />
        <span className="trine-vertex trine-vertex--top"><b>{copy.hero.diagramLabels[0]}</b><i /></span>
        <span className="trine-vertex trine-vertex--left"><b>{copy.hero.diagramLabels[1]}</b><i /></span>
        <span className="trine-vertex trine-vertex--right"><b>{copy.hero.diagramLabels[2]}</b><i /></span>
        <span className="trine-core"><i /><em>{copy.hero.coreLabel}</em></span>
      </div>
      <div className="hero-topline">
        <span className="eyebrow"><span className="live-dot" />{copy.hero.eyebrow}</span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-name">{copy.common.brandName}</p>
          <p className="hero-descriptor">{copy.common.descriptor}</p>
          <p className="hero-byline">{copy.hero.byline}</p>
          <h1 id="hero-title">{copy.hero.headline}</h1>
          <p className="hero-body">{copy.hero.body}</p>
          <div className="hero-actions">
            <a className="button button--light" href="#contact">{copy.hero.primary}<span>↗</span></a>
            <a className="button button--ghost" href="#work">{copy.hero.explore}<span>↓</span></a>
          </div>
        </div>
        <aside className="route-panel" aria-label={copy.common.regions}>
          <div className="route-panel__head"><span>{copy.hero.signal}</span><span>{copy.common.brandName}</span></div>
          <div className="route-map" aria-hidden="true">
            <span className="route-triangle route-triangle--outer" />
            <span className="route-point point--one" /><span className="route-point point--two" /><span className="route-point point--three" />
            <span className="route-label label--one">{copy.hero.diagramLabels[0]}</span><span className="route-label label--two">{copy.hero.diagramLabels[1]}</span><span className="route-label label--three">{copy.hero.diagramLabels[2]}</span><span className="route-trine"><TrineGlyph large /></span>
          </div>
          <p className="region-line">{copy.common.regions}</p>
          <div className="city-list"><span>{copy.hero.cityLabel}</span><p>{copy.hero.cities.join(" · ")}</p></div>
          <p className="availability">{copy.common.status}</p>
        </aside>
      </div>
      <div className="quick-actions" aria-label={copy.hero.linkMode}>
        <SocialAction social="instagram" label={copy.links.instagram} />
        <SocialAction social="linkedin" label={copy.links.linkedin} />
        <SocialAction social="wechat" label={copy.links.wechat} />
        <SocialAction social="email" label={copy.links.email} />
        <Link className="action-link action-link--prominent" href={`/introduction?lang=${locale}`}><span className="action-link__label"><Download size={15} strokeWidth={1.7} aria-hidden="true" />{copy.links.introduction}</span><ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" /></Link>
        <Link className="action-link action-link--prominent" href={`/resume?lang=${locale}`}><span className="action-link__label"><FileText size={15} strokeWidth={1.7} aria-hidden="true" />{copy.links.stevenResume}</span><ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" /></Link>
      </div>
      <div className="hero-view-controls">
        <button className="mode-toggle" type="button" onClick={() => setCompactMode(!compactMode)} aria-pressed={compactMode}>
          <span>{compactMode ? copy.hero.fullMode : copy.hero.linkMode}</span><span aria-hidden="true">{compactMode ? "+" : "−"}</span>
        </button>
      </div>
    </section>
  );
}

function BringSection() {
  const { copy } = useLocale();
  return (
    <section className="section deep-section" id="bring" aria-labelledby="bring-title">
      <div className="section-heading"><p className="eyebrow">{copy.bring.eyebrow}</p><div><h2 id="bring-title">{copy.bring.title}</h2><p>{copy.bring.intro}</p></div></div>
      <div className="capability-grid">
        {copy.bring.capabilities.map((item, index) => (
          <article className="capability-card" key={item.title} style={{ "--delay": `${index * 50}ms` } as React.CSSProperties}>
            <span className="card-code">{item.code}</span><h3>{item.title}</h3><p>{item.text}</p><span className="card-index">0{index + 1}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProfileSection() {
  const { copy } = useLocale();
  return (
    <section className="profile-section deep-section" id="profile" aria-labelledby="profile-title">
      <div className="profile-intro">
        <p className="eyebrow">{copy.profile.eyebrow}</p>
        <h2 id="profile-title">{copy.profile.title}</h2>
        <p>{copy.profile.intro}</p>
      </div>
      <div className="profile-lanes">
        {copy.profile.lanes.map((lane, index) => (
          <article key={lane.title}>
            <div className="profile-lane__head"><span>{lane.code}</span><small>{String(index + 1).padStart(2, "0")}</small></div>
            <h3>{lane.title}</h3>
            <ul>{lane.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </div>
      <aside className="proof-strip"><span>△</span><div><strong>{copy.profile.proofTitle}</strong><p>{copy.profile.proofText}</p></div></aside>
    </section>
  );
}

function WorkSection() {
  const { copy } = useLocale();
  return (
    <section className="section section--bone deep-section" id="work" aria-labelledby="work-title">
      <div className="section-heading section-heading--dark"><p className="eyebrow">{copy.work.eyebrow}</p><div><h2 id="work-title">{copy.work.title}</h2><p>{copy.work.intro}</p></div></div>
      <div className="collaboration-list">
        {copy.work.collaborations.map((item) => (
          <details className="collaboration-row" key={item.code}>
            <summary>
              <span className="collab-code">{item.code}</span><span className="collab-copy"><strong>{item.title}</strong><small>{item.intro}</small></span>
              <span className="summary-label"><span className="when-closed">{copy.work.open}</span><span className="when-open">{copy.work.close}</span><b aria-hidden="true">+</b></span>
            </summary>
            <div className="collaboration-detail"><ul>{item.items.map((point) => <li key={point}>{point}</li>)}</ul></div>
          </details>
        ))}
      </div>
      <div className="due-diligence"><span>06 / —</span><p>{copy.work.dueDiligence}</p></div>
    </section>
  );
}

function FocusSection() {
  const { copy } = useLocale();
  return (
    <section className="section deep-section" id="focus" aria-labelledby="focus-title">
      <div className="section-heading"><p className="eyebrow">{copy.focus.eyebrow}</p><div><h2 id="focus-title">{copy.focus.title}</h2><p>{copy.focus.intro}</p></div></div>
      <div className="industry-cloud">{copy.focus.industries.map((industry, index) => <span key={industry}><small>{String(index + 1).padStart(2, "0")}</small>{industry}</span>)}</div>
      <p className="compliance-note"><span aria-hidden="true">✦</span>{copy.focus.notice}</p>
      <div className="market-split"><article><p>{copy.focus.b2bTitle}</p><h3>B2B</h3><span>{copy.focus.b2bText}</span></article><article><p>{copy.focus.b2cTitle}</p><h3>B2C</h3><span>{copy.focus.b2cText}</span></article></div>
    </section>
  );
}

function MeetSection() {
  const { copy } = useLocale();
  return (
    <section className="meet-section deep-section" aria-labelledby="meet-title">
      <div className="meet-copy"><p className="eyebrow">{copy.meet.eyebrow}</p><h2 id="meet-title">{copy.meet.title}</h2><p>{copy.meet.body}</p></div>
      <div className="meet-list">{copy.meet.people.map((person, index) => <div key={person}><span>{String(index + 1).padStart(2, "0")}</span><p>{person}</p></div>)}</div>
    </section>
  );
}

function AboutSection() {
  const { copy } = useLocale();
  return (
    <section className="section section--about deep-section" id="about" aria-labelledby="about-title">
      <div className="about-layout">
        <div className="about-title"><p className="eyebrow">{copy.about.eyebrow}</p><h2 id="about-title">{copy.about.title}</h2><div className="portrait-mark" aria-hidden="true"><span>SA</span><i /></div></div>
        <div className="about-copy">{copy.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="fact-grid">{copy.about.facts.map((fact) => <div key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong></div>)}</div>
          <div className="interests"><span>{copy.about.interestsLabel}</span><p>{copy.about.interests.join(" · ")}</p></div>
          <p className="language-note">{copy.common.languageNote}</p>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const { copy, locale } = useLocale();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [fallbackHref, setFallbackHref] = useState(siteConfig.socialLinks.email);
  const startedAt = useMemo(() => Date.now(), []);
  const fields = copy.form.fields;

  function validate(form: HTMLFormElement) {
    const data = new FormData(form);
    const next: FormErrors = {};
    requiredFields.forEach((field) => { if (!data.get(field)) next[field] = copy.form.required; });
    const email = String(data.get("email") || "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = copy.form.invalidEmail;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!validate(form)) return;
    setSubmitState("loading");
    const payload = Object.fromEntries(new FormData(form));
    const mailSubject = `Trine introduction — ${String(payload.company || "New opportunity")}`;
    const mailBody = Object.entries(payload)
      .filter(([key]) => key !== "acknowledgement")
      .map(([key, value]) => `${key}: ${String(value)}`)
      .join("\n\n");
    const preparedEmail = `${siteConfig.socialLinks.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    try {
      const response = await fetch(siteConfig.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, locale, startedAt }) });
      if (!response.ok) {
        setFallbackHref(preparedEmail);
        setSubmitState("fallback");
        return;
      }
      form.reset();
      setSubmitState("success");
    } catch {
      setFallbackHref(preparedEmail);
      setSubmitState("fallback");
    }
  }

  const input = (name: string, type = "text", required = false) => (
    <label className="field" key={name}><span>{fields[name].label}{required && <b aria-hidden="true"> *</b>}</span><input name={name} type={type} placeholder={fields[name].placeholder} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-error` : undefined} />{errors[name] && <small className="field-error" id={`${name}-error`} role="alert">{errors[name]}</small>}</label>
  );
  const select = (name: string, options: string[], required = false) => (
    <label className="field" key={name}><span>{fields[name].label}{required && <b aria-hidden="true"> *</b>}</span><select name={name} defaultValue="" aria-invalid={!!errors[name]}><option value="" disabled>{fields[name].placeholder}</option>{options.map((option) => <option key={option}>{option}</option>)}</select>{errors[name] && <small className="field-error" role="alert">{errors[name]}</small>}</label>
  );

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-heading">
        <p className="eyebrow">{copy.form.eyebrow}</p><h2 id="contact-title">{copy.form.title}</h2><p>{copy.form.intro}</p>
        <div className="direct-contact" aria-label="Direct contact links">
          <SocialAction social="email" label={siteConfig.contactEmail} />
          <SocialAction social="instagram" label="@tr1negod" />
          <SocialAction social="linkedin" label="/in/kidpluto" />
        </div>
      </div>
      <div className="contact-stack">
        <aside className="wechat-card" id="wechat">
          <div className="wechat-card__copy"><span><MessageCircle size={16} strokeWidth={1.7} /> WeChat</span><h3>Steven Adkins</h3><p>{siteConfig.wechatId}</p><small>Scan to connect directly.</small></div>
          <a className="wechat-card__qr" href={siteConfig.wechatQr} target="_blank" rel="noreferrer" aria-label="Open Steven Adkins WeChat QR code">
            <Image src={siteConfig.wechatQr} width={888} height={1191} alt="Steven Adkins WeChat QR code" sizes="(max-width: 720px) 44vw, 220px" unoptimized />
          </a>
        </aside>
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <fieldset><legend>{copy.form.basicGroup}</legend><div className="form-grid">{input("name", "text", true)}{input("company", "text", true)}{input("role")}{input("location")}{input("profile", "url")}{select("preferredLanguage", fields.preferredLanguage.options || [])}{input("email", "email", true)}{input("wechat")}{select("contactMethod", copy.form.contactOptions)}</div></fieldset>
        <fieldset><legend>{copy.form.projectGroup}</legend><div className="form-grid">{select("collaboration", copy.form.collaborationOptions, true)}{select("market", copy.form.marketOptions)}{select("stage", copy.form.stageOptions)}{input("timeline")}{input("budget")}{input("referral")}<label className="field field--wide"><span>{fields.description.label}<b aria-hidden="true"> *</b></span><textarea name="description" placeholder={fields.description.placeholder} rows={5} aria-invalid={!!errors.description} />{errors.description && <small className="field-error" role="alert">{errors.description}</small>}</label></div></fieldset>
        <label className="checkbox-field"><input type="checkbox" name="acknowledgement" value="accepted" /><span>{copy.form.acknowledgement}</span></label>{errors.acknowledgement && <small className="field-error standalone" role="alert">{errors.acknowledgement}</small>}
        <p className="privacy-copy">{copy.form.privacy}</p>
        <button className="form-submit" type="submit" disabled={submitState === "loading"}>{submitState === "loading" ? copy.form.submitting : copy.form.submit}<span>↗</span></button>
        {submitState === "success" && <div className="form-status is-success" role="status"><strong>{copy.form.successTitle}</strong><p>{copy.form.successText}</p></div>}
        {submitState === "fallback" && <div className="form-status is-fallback" role="status"><strong>{copy.form.fallbackTitle}</strong><p>{copy.form.fallbackText}</p><a href={fallbackHref}>{copy.form.fallbackAction}<ArrowUpRight size={14} aria-hidden="true" /></a></div>}
        {submitState === "error" && <div className="form-status is-error" role="alert"><strong>{copy.form.failureTitle}</strong><p>{copy.form.failureText}</p><button type="button" onClick={() => setSubmitState("idle")}>{copy.form.retry}</button></div>}
        </form>
      </div>
    </section>
  );
}

function FinalSection() {
  const { copy } = useLocale();
  return (
    <section className="final-cta" aria-labelledby="final-title"><div><p className="eyebrow">{copy.finalCta.eyebrow}</p><h2 id="final-title">{copy.finalCta.title}</h2><p>{copy.finalCta.text}</p></div><div className="final-actions"><a className="button button--light" href="#contact">{copy.finalCta.introduce}<span>↗</span></a><SocialAction social="wechat" label={copy.finalCta.wechat} /><SocialAction social="instagram" label={copy.finalCta.instagram} /><SocialAction social="email" label={copy.finalCta.email} /></div></section>
  );
}

function Footer() {
  const { copy } = useLocale();
  return <footer><div className="footer-top"><p>{copy.common.brandName}</p><span>{copy.footer.note}</span><a href="#top">{copy.footer.top} ↑</a></div><p className="footer-disclaimer">{copy.footer.disclaimer}</p><div className="footer-bottom"><span>{copy.footer.rights}</span><span>{copy.common.regions}</span></div></footer>;
}

function Site() {
  const { copy } = useLocale();
  const [compactMode, setCompactMode] = useState(false);
  return (
    <main id="top" data-compact={compactMode ? "true" : "false"}>
      <CinematicStage />
      <Header /><Hero compactMode={compactMode} setCompactMode={setCompactMode} /><BringSection /><ProfileSection /><WorkSection /><FocusSection /><MeetSection /><AboutSection /><ContactForm /><FinalSection /><Footer />
      <a className="mobile-contact" href="#contact">{copy.hero.primary}<span>↗</span></a>
    </main>
  );
}

export default function Home() {
  return <LocaleProvider><Site /></LocaleProvider>;
}
