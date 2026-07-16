# Portfolio Redesign Summary

## Design Thesis

The new site is an Astro static portfolio with an austere academic direction: Spectral for editorial headings, IBM Plex Sans for body/UI text, neutral surfaces, quiet archive-like indexes, and compact scholarly details. The structure is meant to feel more writerly and intellectual than the old Jekyll site while still preserving the practical developer portfolio surface.

The visual model is a superset of the old site: the old blog, portfolio, about, contact, resume PDF, project media, and miscellaneous static assets remain reachable, while new sections add photos, creative artifacts, stronger SEO, responsive layouts, and a light/dark theme switcher.

## Stack

- Astro static site with content collections for writing.
- GitHub Pages deployment through `.github/workflows/pages.yml`.
- `public/` pass-through for preserved assets, downloads, misc pages, CNAME, favicon, and media.
- Playwright visual smoke tests for desktop and mobile.

## Primary Routes

- `/` - relaxed personal index with a short bio, primary section links, current focus, selected work, and recent writing.
- `/work/` - selected products, hackathons, side projects, and creative systems.
- `/work/<slug>/` - generated work detail pages.
- `/writing/` - migrated blog archive.
- `/writing/<slug>/` - migrated post pages with article OG metadata and BlogPosting JSON-LD.
- `/photos/` - curated profile and creative images, ready for Costa Rica/Niagara additions.
- `/about/`, `/resume/`, `/contact/`, `/404.html`.

## Redirects And Compatibility

Static HTML redirects preserve legacy GitHub Pages compatibility:

- `/blog/` -> `/writing/`
- `/portfolio/` -> `/work/`
- `/categories/`, `/tags/` -> `/writing/`
- legacy post category URLs -> `/writing/<slug>/`
- `/projects/life-calendar-tutorial.html` and `/projects/life-calendar-tutorial/` -> `/work/life-calendar/`

Redirect pages include meta refresh, canonical links, `noindex, follow`, visible fallback links, and JavaScript hash preservation for old anchor URLs.

Public article pages do not display migration notes, legacy source paths, or old comment-status notices. Those details remain only in frontmatter, redirect data, tests, and this internal summary.

## Content Migration

- 18 legacy Jekyll posts are migrated into `src/content/writing`.
- Legacy post images, excerpts, categories, tags, and legacy paths are preserved.
- 15 legacy portfolio projects are represented in `src/data/work.ts`.
- Eloquence and Watershed Script are added as privacy-safe creative work entries.
- Profile data is centralized in `src/data/profile.ts` with updated Cornell, Google, Monarcha, Lingofable, Locadapt, HSK 6, and language/founder-builder framing.

## Media And Privacy

Real/public assets are preferred over generated decoration. Curated media lives in `public/media` and is described in `src/data/media.ts`.

Current creative safeguards:

- Eloquence uses visual concept material only.
- Watershed Script uses a safe writing-desk representation only.
- No raw manuscript drafts, PDFs, notes, or full private writing files are published.

Pending media:

- Add approved Costa Rica and Niagara photos under `public/media/photos/`.
- Register each photo in `src/data/media.ts` with title, alt text, dimensions, source note, and privacy note.
- Keep EXIF/GPS metadata stripped before publishing.

## SEO And Social

- Canonicals, OG, Twitter cards, JSON-LD, RSS, robots, sitemap index, and `/sitemap.xml` compatibility are included.
- Writing pages emit `og:type=article`, `article:published_time`, tags, post-specific images, and BlogPosting JSON-LD.
- Work detail pages use project-specific images for social cards.
- Redirect pages are `noindex, follow`.

## Theme And Mobile

- Light/dark theme switcher in the sticky header.
- Theme persists in `localStorage`, initializes from OS preference, updates `aria-pressed`, and syncs `theme-color`.
- The theme initializer runs before CSS to avoid light/dark flicker on page navigation.
- Home, work, and writing indexes use single-column mobile-first structures to avoid crowding and overlap.
- The local Astro dev toolbar is disabled so visual review is not polluted by framework UI.
- Primary controls are tested for 24px minimum touch targets.

## Deployment

GitHub Pages deploys from `master` through `.github/workflows/pages.yml`.

The workflow runs:

- `npm ci`
- `npm run build`
- `npm run test:content`
- `npm run test:design`
- `npm run test:routes`
- `npm run test:seo`
- `node scripts/media-audit.mjs`

## Local Verification

Recommended final local pass:

```sh
npm run build
npm run test:content
npm run test:design
npm run test:routes
npm run test:seo
node scripts/media-audit.mjs
PLAYWRIGHT_BASE_URL=http://127.0.0.1:4321 npm run test:visual
```

For visual checks, run `npm run preview`, then open the preview URL and inspect `/`, `/work/`, `/writing/`, `/photos/`, `/about/`, `/resume/`, `/contact/`, a work detail page, a writing detail page, a redirect page, and `/404.html` on mobile and desktop.
