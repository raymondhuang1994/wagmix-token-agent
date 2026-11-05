# WAGMIx · Dark landing page

This is a bilingual WAGMIx landing page built with Next.js App Router, Tailwind CSS, and a CSS variable theme. It redesigns the V17 landing experience while retaining the approved V17 copy, product states, files, and deep content.

The V17 materials describe an institutional tokenization platform and two tokenized products. They do not describe AI agent capabilities. The repository name reflects the intended future direction; the published page does not add unapproved agent claims.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open `http://localhost:3000/zh` or `http://localhost:3000/en`. The root route redirects to Traditional Chinese. For a production build:

```sh
npm run typecheck
npm run build
npm run start
```

## Information architecture

1. Header: About WAGMIx, products, ecosystem, contact, language switch.
2. Hero: approved V17 slogan and introduction, capability and product CTAs.
3. Five capabilities, including the SKHY2Lw-specific T0 qualification.
4. Two 7709 product entries with their original names, networks, states, and routes.
5. Team experience and expertise.
6. Ecosystem operating model.
7. Contact channels and legal footer.

The full V17 product catalogue, two product detail experiences, ecosystem directory, document hub, bilingual white paper reader, and three PDFs remain accessible under `/legacy/` and `/downloads/`. The archived pages receive a dark theme override through `public/legacy-theme.css`; their long financial disclosures retain light reading panels.

## Structure

```text
app/                 App Router language routes and metadata
components/          Landing page and scroll reveal observer
data/                V17 data snapshots and view copy
styles/              CSS variables, page design, responsive and motion rules
public/assets/       Original WAGMIx and product assets
public/downloads/    Original PDFs
public/legacy/       Complete V17 bilingual site with deep routes
public/legacy-theme.css  Theme override for the preserved site
reference-v17/       Original V17 source and release documentation
scripts/sync-v17.mjs Rebuild and sync the preserved V17 pages
```

Run `npm run sync:v17` after changes to `reference-v17/`; it rebuilds the bilingual original pages and copies their assets and PDFs into `public/`. Content in the native landing page is sourced from the same V17 configuration and content map where possible; the remaining approved homepage copy is in `data/home.ts`.

The V17 geolocation restriction is still a labeled demonstration, as described in `reference-v17/GEO_ACCESS.md`. Public source and files remain accessible; production enforcement requires server-side integration.
