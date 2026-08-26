# PUNK X TEKK

Static site for the ROKK event **PUNK X TEKK**. Nuxt 4, prerendered to plain
HTML, deployed to two targets from two branches.

```bash
npm ci --legacy-peer-deps   # see "Why --legacy-peer-deps" below
npm run dev                 # dev server
npm run generate            # prerender -> .output/public/
npm run typecheck
npm run media               # regenerate responsive images (occasional)
```

## Rendering: prerendering, not `ssr: false`

`ssr` stays on its **default `true`**. Read this before changing it — "no SSR"
and `ssr: false` are not the same thing in Nuxt, and the naive reading breaks
the site's whole reason for existing.

| Configuration | Result | Fit |
|---|---|---|
| `ssr: false` + `nuxt generate` | HTML containing an empty `<div id="__nuxt">`; content appears only once JS runs | **No** — destroys SEO |
| `ssr: true` (default) + `nuxt generate` | Every route written as finished HTML, no server at runtime | **Yes** |

What we want is **prerendering**: `nuxt generate` renders each route once at
*build* time into `.output/public/`. At *runtime* there is no Node process,
which is precisely the constraint — GitHub Pages and Hetzner Webhosting cannot
host one.

`nitro.prerender.failOnError` is `true` on purpose: a route that cannot render
should turn the build red rather than quietly ship a broken page.

To check a build really did prerender:

```bash
grep -c "COLLISION OF SUBCULTURES" .output/public/index.html   # must be > 0
```

`0` means the build came out in SPA mode. Both deploy workflows assert this,
so it cannot reach either target unnoticed.

## Stack

- **Nuxt 4** with `srcDir: app/`, file-based routing
- **Tailwind CSS v4** via `@tailwindcss/vite`, CSS-first — tokens live in an
  `@theme` block in `app/assets/css/main.css`. There is no `tailwind.config.ts`
  and no SCSS layer.
- **`@nuxtjs/seo`** — robots, sitemap, schema-org, seo-utils, link-checker

## Pages

| Route | Purpose | Indexed |
|---|---|---|
| `/` | Event one-pager (manifesto, line-up, timetable, awareness, tickets) | yes |
| `/lineup/:slug` | One detail page per act, generated from `app/data/lineup.ts` | yes |
| `/lights` | Sound & light production | yes |
| `/template` | Internal boilerplate for scaffolding future ROKK events | no (`noindex`) |

`app/data/routes.ts` (`staticSitePaths()`) is the single source of truth for
what gets prerendered — `nuxt.config.ts` reads it directly. Add a page once and
it is built and in the sitemap.

## Structure

```
app/
  types/event.ts        Band | Stage | TimeSlot | ResolvedSlot | TicketTier | EventMeta
  data/
    lineup.ts           event data + resolveSlots()/resolveActs()/findActBySlug()
    routes.ts           staticSitePaths() — the prerender list
  utils/schema.ts       musicEventNode() — the shared MusicEvent node
  composables/          useLineupFilter, useTicketModal (auto-imported)
  components/           HeroSection, AwarenessBar, BandGrid, Timetable, ...
  layouts/default.vue   SiteHeader + SiteFooter + TicketModal
  pages/                index, lights, template, lineup/[slug]
  error.vue             404
scripts/
  generate-favicons.py  icon set + social card (manual, occasional)
  process-media.mjs     responsive image variants (manual, occasional)
```

Header, footer and the ticket modal live in the layout rather than on each
page, and the modal's open state goes through `useState` so the header and the
page body share it without prop drilling.

## SEO

- **Per page** via `useSeoMeta` in each page's `setup()`, so it lands in the
  prerendered HTML rather than being injected client-side.
- **Site-wide** in `app/app.vue`: icons, manifest, `theme-color` and the social
  card. These are here and not in a static template because each needs the
  deploy's base path baked in. `unhead` dedupes by name, so a page-level tag
  always wins.
- **Structured data**: `MusicEvent` on the home page, `MusicGroup` on confirmed
  acts. Both build the event from `musicEventNode()`, so the two cannot
  describe it differently. Dates come from `eventMeta.startIso`/`endIso`.
- `nuxt-og-image` is **disabled**. It renders cards at build time and needs a
  native renderer this project has no other use for; `public/og-image.jpg` is a
  designed 1200×630 card wired up in `app.vue` instead.

> **Open:** `eventMeta.startIso` says `2026-10-26`, which is a **Monday**, while
> the copy says `SAT / OCT 26`. Oct 26 was last a Saturday in 2024 and next is
> in 2030. Search engines flag an event whose structured date contradicts its
> visible copy. Set the real year in `app/data/lineup.ts` and everything else
> follows.

## Deployment

One build command, two targets, two branches — because a single artifact cannot
serve both. With the wrong `baseURL` every `_nuxt/*` asset 404s.

| Branch | Target | `NUXT_APP_BASE_URL` | Indexable |
|---|---|---|---|
| `develop` | GitHub Pages (staging) | from the live Pages config | **no** |
| `main` | Hetzner (production) | `/` | yes |

Staging is built with `NUXT_SITE_INDEXABLE=false` so it cannot compete with the
production domain as duplicate content.

**The Pages base path is read from the live Pages configuration**, never derived
from the repository name. `actions/configure-pages` runs *before* the build and
the build takes `steps.pages.outputs.base_path` and `.origin` from it. A custom
domain serves from the domain root, and assuming `/<repo>/` has already broken
this site once. Setting or removing a custom domain therefore requires a re-run:
the deployed build has the old prefix baked into every asset URL.

`NUXT_SITE_URL` is the **bare origin**. It must never also contain the sub-path
or it gets duplicated into `.../rokk/rokk/`.

### Hetzner

Repository secrets: `HETZNER_FTP_HOSTNAME`, `HETZNER_FTP_LOGIN`,
`HETZNER_FTP_PASSWORD`, `HETZNER_SFTP_PORT`. Repository *variables* (not
secrets, so they appear in the Actions log where you need them when a deploy
lands in the wrong place): `HETZNER_SERVER_DIR`, `SITE_URL`. SFTP on port 22.

The deploy action **synchronises** `server-dir`: files on the server that are
absent locally are deleted, so a wrong path wipes unrelated content. `dry-run`
therefore defaults to **true** on a push — only a manual **Run workflow** with
the box unticked writes to the live domain. Read one dry-run log and confirm the
target directory before doing that.

`public/.htaccess` ships with the build (Apache: 404 mapping, compression,
immutable caching for fingerprinted assets, no caching for HTML). Confirm it
actually landed on the server after the first real deploy — some deploy actions
filter dotfiles.

## Why `--legacy-peer-deps`

npm 10.9's dependency resolver crashes with `Cannot read properties of null
(reading 'edgesOut')` while walking Nuxt 4's devtools peer set. The flag is
required, not cosmetic, and the lockfile is generated the same way — so `npm ci`
needs it too. Drop it once the toolchain moves to npm 11+.

## Media

Originals live in Google Drive and are **not** committed. See
`assets/media/README.md`. `npm run media` writes WebP + AVIF at four widths into
`public/img/`. Deliberately not `@nuxt/image` — IPX needs a server neither host
provides.
