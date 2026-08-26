> **Historical.** This plan describes the original Vue 3 + `vite-ssg` build
> that lived in `project/vue/`. That app was migrated to Nuxt 4 and the
> directory removed; paths, commands and the `VITE_*` environment variables
> below no longer exist. Kept as a record of the Vue-phase decisions — see
> [README.md](README.md) for the current architecture.

# PUNK X TEKK (ROKK) — Project Plan

Brand: **ROKK**. Event: **PUNK X TEKK — Collision of Subcultures**. Source design: the Claude
Design handoff bundle in this repo (`README.md`, `chats/`, `project/*.dc.html`) — see those
first for the design intent and iteration history.

## 1. Goal

A fully server-side pre-rendered (SSG), SEO-optimized site for the PUNK X TEKK event, with
interactive detail pages that are themselves pre-rendered (not client-only). Production target
is Ionos hosting; GitHub Pages is the test/staging deployment, wired up with CI/CD via GitHub
Actions.

## 2. Architecture

- **Framework**: Vue 3 (`<script setup lang="ts">`) + Vue Router 4, built with `vite-ssg`.
  Every route is rendered to static HTML at build time; Vue hydrates on top of that same
  markup client-side for the interactive bits (line-up filters, timetable tabs/accordion,
  ticket modal). No content depends on JS to be visible or crawlable.
- **Styling**: Tailwind CSS with the design's token set ported 1:1 into `tailwind.config.ts`,
  plus a small SCSS layer for things Tailwind can't express inline (keyframes, `::selection`).
- **Data model**: a single typed dataset (`project/vue/src/data/lineup.ts`) — `Band`, `Stage`,
  `TimeSlot` — drives the home page, the timetable, and every act's detail page. One list of
  routes (`project/vue/src/data/routes.ts`) is the single source of truth for what gets
  pre-rendered and what goes into the sitemap.
- **App location**: `project/vue/` (this repo also holds the original Claude Design handoff —
  `README.md`, `chats/`, `project/*.dc.html`, `assets/` — kept as design history/reference).

## 3. Pages

| Page | Route | What it is |
|---|---|---|
| Main page | `/` | The event one-pager: manifesto/hero, collision banner, awareness ticker, line-up with stage/genre filters, timetable (desktop parallel grid / mobile tabs+accordion), dresscode & consent, collaborators, closing CTA, ticket modal |
| Act detail | `/lineup/:slug` | One pre-rendered page per line-up slot (9 acts), linked from every line-up card; cross-links to other acts on the same stage |
| Lights | `/lights` | Sound & light production page — the SDWA5 outdoor rig, indoor light show, strobe/photosensitivity warning |
| Template | `/template` | Internal, `noindex`ed boilerplate version of the page other future ROKK events can copy to scaffold a new event page from the same design system |

## 4. SEO approach

- Fully pre-rendered HTML per route — nothing depends on client JS for crawlability.
- Per-page `<title>`, meta description, Open Graph tags and canonical `<link>`, set in each
  view via `@vueuse/head` at build time.
- `MusicEvent` JSON-LD on the home page; `MusicGroup` JSON-LD on confirmed acts' detail pages.
- Generated `sitemap.xml` (from the actual built output) and `robots.txt`, both environment
  aware (`VITE_SITE_URL` / `VITE_BASE_PATH`), `/template` deliberately excluded from both.

## 5. CI/CD

- **`.github/workflows/ci.yml`** — on every PR and non-`main` push touching `project/vue/**`:
  install, typecheck (`vue-tsc`), build. Catches breakage before merge.
- **`.github/workflows/deploy.yml`** — on push to `main`: build with `VITE_BASE_PATH`/
  `VITE_SITE_URL` derived automatically from the repo name (`/<repo>/`,
  `https://<owner>.github.io/<repo>/`), then deploy `dist/` to GitHub Pages via
  `actions/deploy-pages`.

## 6. Deployment targets

- **Test — GitHub Pages**: fully automated by `deploy.yml` above. One manual step required
  once per repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
- **Production — Ionos**: build locally/in your own pipeline with the real domain and root base
  path (`VITE_SITE_URL=https://<domain> VITE_BASE_PATH=/ npm run build` in `project/vue/`), then
  upload `dist/` via SFTP/FTP to the Ionos webspace. Not automated here — no Ionos credentials
  are available to this session; hook it into GitHub Actions later with an SFTP-deploy action
  and repo secrets once you're ready to automate it.

## 7. Status

- [x] Data model extended with per-act `slug`s and detail-page resolution
- [x] `/lineup/:slug`, `/lights`, `/template` views built
- [x] Router + `vite-ssg` `includedRoutes` wired to the shared route list
- [x] Nav/footer/line-up cards updated to link the new pages
- [x] Sitemap/robots generation, canonical tags on every page
- [x] GitHub Actions CI + Pages deploy workflow
- [ ] Push to a real GitHub repo and confirm the live GitHub Pages deploy (needs a repo URL)
- [ ] Real line-up names replacing `TBA` placeholders, once confirmed
- [ ] Ionos production deploy (manual/separate pipeline)
