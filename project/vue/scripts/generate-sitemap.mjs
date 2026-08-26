// Runs as a `postbuild` step (after `vite-ssg build`). Scans the built dist/
// for prerendered pages and writes sitemap.xml + a Sitemap: line in
// robots.txt, using the same env vars the app reads for canonical URLs.
import { writeFileSync, readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(here, '../dist')

const siteUrl = (process.env.VITE_SITE_URL ?? 'https://rokk.xyz').replace(/\/$/, '')
const basePath = (process.env.VITE_BASE_PATH ?? '/').replace(/\/$/, '')

/** Every "<route>/index.html" under dist, as a route path ("/", "/lights", "/lineup/giftgrube"). */
function findRoutePaths(dir) {
  const routes = []
  for (const entry of readdirSync(dir)) {
    const full = resolve(dir, entry)
    if (statSync(full).isDirectory()) {
      routes.push(...findRoutePaths(full))
    } else if (entry === 'index.html') {
      const rel = relative(distDir, dir).split(sep).filter(Boolean).join('/')
      routes.push(rel ? `/${rel}` : '/')
    }
  }
  return routes
}

// /template is a working internal boilerplate page (see TemplatePage.vue),
// intentionally kept out of the sitemap and out of search results. 404s
// (the router's catch-all is never in includedRoutes) never appear here.
const paths = findRoutePaths(distDir)
  .filter((p) => p !== '/template')
  .sort()

const urlEntries = paths
  .map((p) => {
    const loc = `${siteUrl}${basePath}${p === '/' ? '/' : p}`.replace(/([^:])\/\/+/g, '$1/')
    return `  <url><loc>${loc}</loc></url>`
  })
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`

writeFileSync(resolve(distDir, 'sitemap.xml'), sitemap)

// robots.txt rules are origin-relative, so every Disallow has to carry the
// deploy sub-path too ("/template" is at "/rokk/template" on a project site).
// Note a project-site robots.txt sits at "/<repo>/robots.txt", which crawlers
// do not read — only the origin root counts. The /template `noindex` meta tag
// is what actually keeps it out of the index; this file is for the root deploy.
const robotsPath = resolve(distDir, 'robots.txt')
const existing = existsSync(robotsPath) ? readFileSync(robotsPath, 'utf-8').trimEnd() : 'User-agent: *\nDisallow: /template'
const scoped = existing.replace(/^(Disallow:\s*)(\/\S*)$/gm, (_m, key, path) => `${key}${basePath}${path}`)
writeFileSync(robotsPath, `${scoped}\nSitemap: ${siteUrl}${basePath}/sitemap.xml\n`.replace(/([^:])\/\/+/g, '$1/'))

// eslint-disable-next-line no-console
console.log(`[sitemap] wrote ${paths.length} URLs to dist/sitemap.xml (site: ${siteUrl}${basePath}/)`)
