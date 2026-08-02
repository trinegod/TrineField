# Trine — Cross-Border Product, Market & Creative Operations

A mobile-first, three-language professional business portal for **Trine**, the independent cross-border platform of **Steven Adkins**. It is designed for link-in-bio use and international business introductions across China, the United States, and Latin America.

## Brand system

Trine is the single public brand association: three regions aligned around one operating point. Steven Adkins is always identified as the person behind the platform. The content architecture follows four checks from the personal-brand knowledge system:

- **Useful:** every section points to a concrete collaboration or next action.
- **Trust-building:** current experience, collaboration interests, and future ambitions are clearly separated.
- **Distinctive:** product, market, operations, and creative work all reinforce the same three-region positioning.
- **Sustainable:** the core profile remains compact and can expand later through verified projects, writing, and case studies.

## Local setup

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open the local address shown in the terminal. Run `npm run build` before deployment.

## Content and translations

All public-facing copy is centralized in:

- `src/content/translations/en.ts`
- `src/content/translations/es.ts`
- `src/content/translations/zh-CN.ts`
- `src/content/site.ts`

The Chinese file is intentionally standalone so a native speaker can review every line without searching through interface components. Keep the same keys and array structure in all three files when editing.

To update industries, cities, collaboration categories, service descriptions, form options, or disclaimers, edit the corresponding arrays in each translation file. Site-wide links and contact settings live in `src/content/site.ts`.

## Social and contact links

Public contact information is centralized in `src/content/site.ts`:

- Instagram: `@tr1negod`
- LinkedIn: `/in/kidpluto`
- Email: `Stevenadkins917@gmail.com`
- WeChat: `wxid_1d9o3v999oi712`, with the supplied QR card
- Booking: intentionally remains unavailable until a scheduling URL is selected

Empty links display as clearly disabled “coming soon” actions, so the site never ships broken or invented contact information.

## Contact form

The form uses a privacy-conscious server endpoint, a hidden spam trap, minimum completion time, payload limits, server validation, and Resend delivery. Configure these environment variables in the hosting dashboard:

```text
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=
```

`CONTACT_FROM_EMAIL` must be a sender authorized by the connected Resend account. `CONTACT_TO_EMAIL` is optional because the public contact address is the default destination. Until a Resend key is configured, the form preserves the visitor’s answers and gives them a prepared email draft to review and send; it does not pretend a failed message was delivered.

No advertising analytics or trackers are enabled. A deliberately disabled analytics placeholder is in `src/content/site.ts`.

## WeChat QR code

The supplied QR card is stored at `public/wechat-steven-adkins.jpg` and displayed in the contact section. Test scanning it from a second phone before launch and replace only with a newly exported official QR if Steven changes WeChat accounts.

## Printable introduction

The `/introduction` route has complete English, Spanish, and Simplified Chinese versions. Use its **Print / Save as PDF** action and choose “Save as PDF” in the browser. The print stylesheet is formatted as a one-page professional introduction rather than a résumé.

## Vercel deployment

1. Import this repository into Vercel.
2. Keep the detected framework as Next.js and the build command as `npm run build`.
3. Add the contact-form environment variables above.
4. Set `NEXT_PUBLIC_SITE_URL` to the final production URL, without a trailing slash.
5. Deploy and verify all three languages, the contact form, `/introduction`, `/sitemap.xml`, and `/robots.txt`.

This project also includes Sites hosting configuration and can be deployed through OpenAI Sites.

## Connect a custom domain

In Vercel, open the project’s **Settings → Domains**, add the domain, then copy the exact DNS records Vercel provides into the DNS provider. Use a CNAME for a typical `www` subdomain and follow the provider’s apex-domain instructions for the root domain. After DNS verification, set the preferred domain as primary and update `NEXT_PUBLIC_SITE_URL`.

For OpenAI Sites, add the hostname from the site’s domain settings and apply the provided CNAME, A, and validation records at the DNS provider.

## Create a public QR code

After the final URL is live, use a reputable static QR generator, choose the exact canonical HTTPS URL, use high contrast with a generous white border, and export SVG plus a 1024px PNG. Test the code on iPhone, Android, WeChat, and Instagram’s in-app browser before printing it on a business card.

## Assumptions made

- The public platform is **Trine**, operated by **Steven Adkins**; no additional company or agency identity has been invented.
- Instagram, LinkedIn, email, WeChat ID, and the WeChat QR card are public by request. Only the booking link and custom domain remain unresolved.
- English and Spanish are Steven Adkins’ direct conversation languages. Chinese content is for accessibility and may use translation assistance.
- The site presents collaboration interests honestly and does not claim a China office, Mandarin fluency, licenses, established market-entry results, buyer networks, or guaranteed outcomes.
- B2B collaboration is primary; B2C projects are selective.
- The contact form sends email only after private environment variables are configured and does not persist submissions.
- The displayed 2027 availability reflects the supplied brief and should be updated if plans change.

## Pre-launch checklist

- [ ] Add a booking link if one is wanted.
- [ ] Scan-test the supplied WeChat QR from a second phone.
- [ ] Configure Resend and submit test forms in all three languages.
- [ ] Ask a native Simplified Chinese speaker to review `zh-CN.ts`.
- [ ] Confirm the 2027 availability statement.
- [ ] Replace the temporary hosting URL with the chosen custom domain.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production HTTPS URL.
- [ ] Review the mobile opening screen inside Instagram, LinkedIn, and WeChat.
- [ ] Test keyboard navigation, visible focus, reduced motion, and screen-reader labels.
- [ ] Verify social preview, favicon, sitemap, robots file, and the printable introduction.
- [ ] Generate and scan the final public QR code on multiple phones.
- [ ] Conduct independent legal review before adding regulated products, investment offers, or market-entry claims.
