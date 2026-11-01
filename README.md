# Kazi Nahid — Portfolio

Personal portfolio built with Next.js, TypeScript and Tailwind CSS, exported as a static site.

## Edit content

All text lives in `src/content.ts`. Update it there; the layout reads from it.

- Resume download: replace `public/Kazi_Nahid_Resume.pdf`
- Terra Audit case study: `src/app/projects/terra-audit/page.tsx`
- Site URL (for SEO and link previews): `site.url` in `src/content.ts`

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run lint
npm run build      # static site in out/
```

## Deploy

Push to GitHub and import the repo in Vercel. No settings needed; Vercel detects Next.js.
