// Relative import (not the "@/" alias): this module is also read directly by
// vite.config.ts to build ssgOptions.includedRoutes, before Vite's aliasing
// is available.
import { resolveActs } from './lineup'

/** Every path that gets pre-rendered as static HTML at build time. */
export function staticSitePaths(): string[] {
  const actPaths = resolveActs().map((a) => `/lineup/${a.slug}`)
  return ['/', '/lights', '/template', ...actPaths]
}
