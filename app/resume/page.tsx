"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Code2, Download, Mail, MapPin, Phone, Printer } from "lucide-react";
import { LocaleProvider, useLocale } from "@/src/components/LocaleProvider";
import { locales, translations } from "@/src/content/translations";
import { resumeProfile, resumeTranslations } from "@/src/content/resume";

function ResumeContent() {
  const { locale, setLocale } = useLocale();
  const resume = resumeTranslations[locale];

  useEffect(() => {
    document.title = resume.pageTitle;
  }, [resume.pageTitle]);

  return (
    <main className="resume-page">
      <header className="resume-toolbar">
        <Link href={`/?lang=${locale}`}>← {resume.back}</Link>
        <div className="resume-languages" role="group" aria-label={translations[locale].form.fields.preferredLanguage.label}>
          {locales.map((item) => <button type="button" key={item} className={locale === item ? "is-active" : ""} onClick={() => setLocale(item)}>{translations[item].localeName}</button>)}
        </div>
        <div className="resume-toolbar__actions">
          <a href={resumeProfile.originalPdf} target="_blank" rel="noreferrer"><Download size={14} aria-hidden="true" />{resume.originalPdf}</a>
          <button type="button" onClick={() => window.print()}><Printer size={14} aria-hidden="true" />{resume.print}</button>
        </div>
      </header>

      <article className="resume-sheet">
        <header className="resume-masthead">
          <div>
            <p className="resume-kicker">{resume.kicker}</p>
            <h1>{resumeProfile.name}</h1>
            <p className="resume-headline">{resume.headline}</p>
          </div>
          <div className="resume-mark" aria-hidden="true"><span>SA</span><i /></div>
        </header>

        <nav className="resume-contact" aria-label="Steven Adkins contact information">
          <span><MapPin size={14} aria-hidden="true" />{resumeProfile.location}</span>
          <a href={resumeProfile.phoneHref}><Phone size={14} aria-hidden="true" />{resumeProfile.phoneDisplay}</a>
          <a href={resumeProfile.emailHref}><Mail size={14} aria-hidden="true" />{resumeProfile.email}</a>
          <a href={resumeProfile.linkedin} target="_blank" rel="noreferrer"><BriefcaseBusiness size={14} aria-hidden="true" />LinkedIn</a>
          <a href={resumeProfile.github} target="_blank" rel="noreferrer"><Code2 size={14} aria-hidden="true" />GitHub</a>
          <a href={resumeProfile.portfolio} target="_blank" rel="noreferrer">NODEINE<ArrowUpRight size={13} aria-hidden="true" /></a>
        </nav>

        <p className="resume-translation-note">{resume.translationNote}</p>

        <section className="resume-section resume-summary">
          <h2>{resume.summaryLabel}</h2>
          <p>{resume.summary}</p>
        </section>

        <section className="resume-section">
          <h2>{resume.expertiseLabel}</h2>
          <div className="resume-tags">{resume.expertise.map((item) => <span key={item}>{item}</span>)}</div>
        </section>

        <section className="resume-section">
          <h2>{resume.experienceLabel}</h2>
          <div className="resume-timeline">
            {resume.experience.map((role, index) => (
              <article className="resume-role" key={`${role.company}-${role.dates}`}>
                <span className="resume-role__index">{String(index + 1).padStart(2, "0")}</span>
                <div className="resume-role__body">
                  <header><div><h3>{role.company}</h3><p>{role.title} <span>/ {role.location}</span></p></div><time>{role.dates}</time></header>
                  <ul>{role.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <h2>{resume.projectsLabel}</h2>
          <div className="resume-projects">
            {resume.projects.map((project) => (
              <article key={project.title}>
                <p>{project.meta}</p><h3>{project.title}</h3><span>{project.description}</span>
                {project.links && <div>{project.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label}<ArrowUpRight size={13} aria-hidden="true" /></a>)}</div>}
              </article>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <h2>{resume.additionalLabel}</h2>
          <div className="resume-additional">
            {resume.additional.map((role) => <article key={`${role.company}-${role.dates}`}><header><h3>{role.company} <span>/ {role.title}</span></h3><time>{role.dates}</time></header><p>{role.location} / {role.description}</p></article>)}
          </div>
        </section>

        <section className="resume-section resume-closing-grid">
          <article><h2>{resume.technologyLabel}</h2><p>{resume.technology}</p></article>
          <article><h2>{resume.educationLabel}</h2><ul>{resume.education.map((item) => <li key={item}>{item}</li>)}</ul></article>
        </section>

        <footer className="resume-footer"><span>{resume.sourceLabel}</span><a href={resumeProfile.originalPdf} target="_blank" rel="noreferrer">{resume.originalPdf}<ArrowUpRight size={12} aria-hidden="true" /></a></footer>
      </article>
    </main>
  );
}

export default function ResumePage() {
  return <LocaleProvider><ResumeContent /></LocaleProvider>;
}
