export type Locale = "en" | "es" | "zh-CN" | "ja";

export type Capability = { title: string; text: string; code: string };
export type Collaboration = {
  title: string;
  intro: string;
  items: string[];
  code: string;
};
export type FormField = {
  label: string;
  placeholder: string;
  options?: string[];
};

export interface SiteCopy {
  localeName: string;
  htmlLang: Locale;
  meta: { title: string; description: string };
  common: {
    brandName: string;
    ownerName: string;
    descriptor: string;
    regions: string;
    status: string;
    languageNote: string;
  };
  nav: {
    bring: string;
    work: string;
    focus: string;
    about: string;
    contact: string;
    menu: string;
    close: string;
  };
  hero: {
    eyebrow: string;
    eyebrowParts: [string, string, string];
    byline: string;
    headline: string;
    body: string;
    primary: string;
    explore: string;
    background: string;
    linkMode: string;
    fullMode: string;
    diagramLabels: [string, string, string];
    coreLabel: string;
    cityLabel: string;
    cities: string[];
  };
  profile: {
    eyebrow: string;
    title: string;
    intro: string;
    lanes: { code: string; title: string; items: string[] }[];
    proofTitle: string;
    proofText: string;
  };
  links: {
    instagram: string;
    linkedin: string;
    github: string;
    whatsapp: string;
    nodeine: string;
    email: string;
    wechat: string;
    introduction: string;
    stevenResume: string;
    book: string;
    placeholder: string;
  };
  bring: {
    eyebrow: string;
    title: string;
    intro: string;
    capabilities: Capability[];
  };
  work: {
    eyebrow: string;
    title: string;
    intro: string;
    open: string;
    close: string;
    dueDiligenceLabel: string;
    dueDiligence: string;
    collaborations: Collaboration[];
  };
  focus: {
    eyebrow: string;
    title: string;
    intro: string;
    industries: string[];
    notice: string;
    b2bTitle: string;
    b2bText: string;
    b2cTitle: string;
    b2cText: string;
  };
  meet: {
    eyebrow: string;
    title: string;
    body: string;
    people: string[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    facts: { label: string; value: string }[];
    interestsLabel: string;
    interests: string[];
  };
  form: {
    eyebrow: string;
    title: string;
    intro: string;
    basicGroup: string;
    projectGroup: string;
    fields: Record<string, FormField>;
    collaborationOptions: string[];
    contactOptions: string[];
    marketOptions: string[];
    stageOptions: string[];
    acknowledgement: string;
    privacy: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successText: string;
    failureTitle: string;
    failureText: string;
    fallbackTitle: string;
    fallbackText: string;
    fallbackAction: string;
    required: string;
    invalidEmail: string;
    retry: string;
  };
  finalCta: {
    eyebrow: string;
    title: string;
    text: string;
    introduce: string;
    wechat: string;
    instagram: string;
    github: string;
    whatsapp: string;
    email: string;
  };
  footer: {
    note: string;
    disclaimer: string;
    rights: string;
    top: string;
  };
  intro: {
    title: string;
    subtitle: string;
    print: string;
    back: string;
    snapshot: string;
    valueTitle: string;
    valueItems: string[];
    areasTitle: string;
    areas: string[];
    marketsTitle: string;
    markets: string;
    languagesTitle: string;
    languages: string;
    sectorsTitle: string;
    contactTitle: string;
    contactText: string;
    generated: string;
  };
}
