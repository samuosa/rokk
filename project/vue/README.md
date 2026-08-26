# PUNK X TEKK — Vue 3 Frontend

Prerendered (SSG) site for the ROKK event **Punk X Tekk**.
Design tokens are a 1:1 port of the Stitch export (`../uploads/*/DESIGN.md` / `code.html`)
and the Claude Design handoff (`../Punk X Tekk Event Page.dc.html`).

## Stack
- Vue 3 + `<script setup lang="ts">` + Vue Router 4
- Tailwind CSS (tokens in `tailwind.config.ts`) + SCSS token layer (`src/styles/`)
- `vite-ssg` for HTML pre-rendering — every route below is emitted as static HTML at build time; interactive bits (filters, timetable tabs, ticket modal) hydrate on top of that same markup, hydration-safe by construction

## Commands
```bash
npm i
npm run dev        # dev server
npm run build      # vite-ssg build -> static HTML in dist/, then postbuild generates sitemap.xml
npm run typecheck
```

## Pages
| Route              | Purpose                                                                 | Indexed |
|---------------------|--------------------------------------------------------------------------|---------|
| `/`                 | Main page — the event one-pager (manifesto, line-up, timetable, awareness, tickets) | yes |
| `/lineup/:slug`     | One detail page per act, generated from `src/data/lineup.ts`            | yes |
| `/lights`           | Sound & light production page                                           | yes |
| `/template`         | Internal boilerplate for scaffolding future ROKK event pages            | no (`noindex`) |

All routes are listed by `src/data/routes.ts` (`staticSitePaths()`), which both `vite.config.ts`
(`ssgOptions.includedRoutes`) and the sitemap generator read from — add a page once, it's
pre-rendered and in the sitemap automatically (`/template` is filtered out of the sitemap
explicitly).

## Structure
```
src/
  types/event.ts          Band | Stage | TimeSlot | ResolvedSlot | TicketTier interfaces
  data/
    lineup.ts              event data + resolveSlots()/resolveActs()/findActBySlug()
    routes.ts               staticSitePaths() — single source of truth for prerendered routes
  lib/site.ts              SITE_URL / canonicalUrl() for SEO tags
  composables/
    useLineupFilter.ts      reactive stage + genre filtering
    useTicketModal.ts        shared ticket-modal open/close state, used on every page
  components/               HeroSection, AwarenessBar, BandGrid, Timetable, TicketCta,
                             TicketModal, SiteHeader, SiteFooter, ...
  views/
    EventPage.vue            "/" — the main page
    BandDetail.vue           "/lineup/:slug" — one act's detail page
    LightsPage.vue           "/lights"
    TemplatePage.vue         "/template"
    NotFound.vue             client-side 404 (not prerendered)
scripts/generate-sitemap.mjs  postbuild: scans dist/ for prerendered pages -> sitemap.xml + robots.txt
```

## SEO
- Per-page `<title>`, meta description, Open Graph tags, canonical link and (where applicable)
  JSON-LD (`MusicEvent` on the home page, `MusicGroup` on confirmed acts' detail pages) — all
  set via `@unhead/vue` in each view's `setup()` (the head implementation `vite-ssg` wires up
  automatically), so they're in the prerendered HTML, not injected client-side.
- `scripts/generate-sitemap.mjs` runs as `postbuild` and writes `dist/sitemap.xml` +
  `dist/robots.txt` from the actual built output, using `VITE_SITE_URL`/`VITE_BASE_PATH`.

## Hydration notes
- No `window`/`document` access in `setup()`; all of it lives in `onMounted`
  (see `TicketModal`'s keydown listener).
- `main.ts` passes `base: import.meta.env.BASE_URL` into the router — required so client-side
  routing matches under a deploy sub-path (GitHub Pages' `/<repo>/`), not just at `/`.
- Both timetable variants are rendered and switched by CSS breakpoints, so the
  prerendered markup matches the client render on first paint.
- Smooth scroll uses `scroll-behavior: smooth` in CSS, not JS.

## Environment variables
See `.env.example`. `VITE_SITE_URL` (absolute origin) and `VITE_BASE_PATH` (deploy sub-path)
control canonical URLs, Open Graph tags, the sitemap and the app's own routing base.

## Deployment

### GitHub Pages (test)
`.github/workflows/deploy.yml` (repo root) builds this app on every push to `main` and deploys
`dist/` to GitHub Pages via `actions/deploy-pages`.

No manual setup is needed: `actions/configure-pages` runs with `enablement: true`, so the
workflow points the repo's Pages site at GitHub Actions itself using its `pages: write`
permission (equivalent to setting **Settings → Pages → Source** to **GitHub Actions** by hand).
A fork or a fresh clone deploys on its first push to `main`.

That step runs *before* the build, and the build takes `VITE_BASE_PATH`/`VITE_SITE_URL` from
its outputs rather than from the repo name — so the same workflow is correct whether Pages
serves a project site or a custom domain:

| Pages configuration                | `base_path` | `origin`                   | site served at                |
|------------------------------------|-------------|----------------------------|-------------------------------|
| project site (no custom domain)    | `/rokk`     | `https://samuosa.github.io`| `https://samuosa.github.io/rokk/` |
| custom domain (Settings → Pages)   | `""`        | `https://<your-domain>`    | `https://<your-domain>/`      |

**Setting or removing a custom domain changes the correct base path**, so re-run this workflow
after either — the previously deployed build still has the old prefix baked into every asset
URL. `origin` also reflects the scheme Pages reports, so enable **Enforce HTTPS** (available
once the domain's certificate is issued) before relying on canonical URLs.

### Ionos (production)
Build locally or in your own pipeline with the real domain and root base path, then upload
`dist/` (e.g. via SFTP) to the Ionos webspace:
```bash
VITE_SITE_URL=https://rokk.xyz VITE_BASE_PATH=/ npm run build
```
