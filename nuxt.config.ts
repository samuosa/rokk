import tailwindcss from '@tailwindcss/vite'
import { withBase } from 'ufo'
import { staticSitePaths } from './app/data/routes'

// Nitro serves prerendered routes under app.baseURL, so an explicit route
// list has to carry that prefix too — "/lights" 404s on a "/rokk/" build.
// Crawled links already come through prefixed; only this list needs it.
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

// Rendering model — read this before changing anything below.
//
// `ssr` stays on its default `true`. That is deliberate and is NOT the same as
// running a server: `nuxt generate` renders every route once at BUILD time and
// writes finished HTML into .output/public/. At RUNTIME there is no Node
// process, which is exactly what GitHub Pages and Hetzner Webhosting can host.
//
// Setting `ssr: false` would also produce static files, but each one would be
// an empty <div id="__nuxt"></div> with the content arriving only after JS —
// which would destroy the SEO this site is built around. See README.md.
export default defineNuxtConfig({
  compatibilityDate: '2026-08-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/seo'],
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },

  app: {
    // Overridden per deploy target via NUXT_APP_BASE_URL. On a GitHub Pages
    // project site that is "/<repo>/"; on a custom domain or Hetzner it stays
    // "/". The workflow reads the real value from the live Pages config rather
    // than deriving it from the repo name — see .github/workflows/.
    baseURL,
    head: {
      // Every page title already carries the event name, so the module's
      // default "%s | <site.name>" template would print it twice.
      titleTemplate: '%s',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Anybody:ital,wght@0,100..900;1,100..900&family=Hanken+Grotesk:ital,wght@0,100..900&family=JetBrains+Mono:wght@400..800&display=swap',
        },
      ],
    },
  },

  site: {
    // Overridden per target via NUXT_SITE_URL / NUXT_SITE_INDEXABLE. The
    // GitHub Pages build sets indexable=false so the staging URL cannot
    // compete with the production domain as duplicate content.
    url: 'https://rokk-fm.de',
    name: 'PUNK X TEKK',
    description: 'PUNK X TEKK by ROKK — outdoor punk concert and tekk rave.',
    // The site copy is English throughout, so this is `en`, not `de`.
    defaultLocale: 'en',
  },

  // nuxt-og-image renders cards at build time and needs a native renderer
  // (@takumi-rs/core or satori) that this project has no other use for. The
  // repo already ships a designed, proven 1200x630 card at public/og-image.jpg,
  // wired up site-wide in app.vue — so the module is off rather than half-set-up.
  // §1.4 of the brief explicitly allows this trade.
  ogImage: { enabled: false },

  // Fully prerendered with no dynamic sources: drop the sitemap runtime.
  sitemap: { zeroRuntime: true },

  // The header's section links are { path: '/', hash: '#manifesto' }, which
  // renders as "/rokk/#manifesto" under a sub-path deploy. The trailing-slash
  // rule reads that as a defect; it isn't, and the noise buried 137 warnings
  // that would otherwise be worth reading.
  linkChecker: { skipInspections: ['trailing-slash'] },

  nitro: {
    prerender: {
      crawlLinks: true,
      // crawlLinks only finds what is linked. The act detail pages are
      // enumerated from the data instead, so a page that loses its last
      // inbound link still gets built.
      routes: staticSitePaths().map((p) => withBase(p, baseURL)),
      failOnError: true,
    },
  },
})
