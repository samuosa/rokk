/**
 * Absolute site origin (protocol + host ONLY — no path) used for canonical
 * URLs, Open Graph tags and JSON-LD. BASE_PATH below supplies the sub-path,
 * so VITE_SITE_URL must never itself include "/<repo-name>" or it gets
 * duplicated (e.g. ".../rokk/rokk/..."). Set per build (GitHub Pages test vs.
 * the Ionos production domain) — see project/vue/README.md. Falls back to the
 * brand's own domain (already referenced in the ticket copy as crew@rokk.xyz).
 */
export const SITE_URL = ((import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://rokk.xyz').replace(/\/$/, '')

/** Base path the app is served under (e.g. "/repo-name/" on GitHub Pages, "/" on Ionos). */
export const BASE_PATH = (import.meta.env.BASE_URL as string | undefined) ?? '/'

/** Absolute canonical URL for a route path such as "/lineup/giftgrube". */
export function canonicalUrl(routePath: string): string {
  const base = BASE_PATH.replace(/\/$/, '')
  const path = routePath === '/' ? '/' : routePath.replace(/^\//, '/')
  return `${SITE_URL}${base}${path}`.replace(/([^:])\/\/+/g, '$1/')
}

/**
 * Absolute URL for a file in `public/` (favicons, the Open Graph image).
 * Open Graph and Twitter consumers reject relative image paths, and the
 * sub-path differs per deploy, so both parts have to come from the build.
 */
export function assetUrl(publicPath: string): string {
  return canonicalUrl(publicPath)
}
