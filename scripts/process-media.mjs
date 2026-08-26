/**
 * Turns raw brand photography into responsive, pre-generated variants.
 *
 *   npm run media
 *
 * Reads every image in assets/media/raw/ (gitignored) plus the brand images
 * already tracked in app/assets/img/, and writes WebP + AVIF at four widths
 * into public/img/. Only the processed output is committed.
 *
 * Deliberately NOT @nuxt/image: its IPX runtime transforms images on request
 * and needs a server. Neither GitHub Pages nor Hetzner Webhosting runs one,
 * so the work happens here at build time and the markup uses a plain
 * <picture> with srcset/sizes against these files.
 */
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { basename, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = resolve(fileURLToPath(import.meta.url), '../..')
const SOURCES = [join(ROOT, 'assets/media/raw'), join(ROOT, 'app/assets/img')]
const OUT = join(ROOT, 'public/img')

const WIDTHS = [480, 960, 1440, 1920]
const INPUT_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff'])

/** kebab-case, so "SOUNDSYSTEM_ALT_01.png" becomes "soundsystem-alt-01". */
const slugify = (name) =>
  basename(name, extname(name))
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .replace(/-+/g, '-')
    .toLowerCase()

async function collect() {
  const files = []
  for (const dir of SOURCES) {
    if (!existsSync(dir)) continue
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      if (entry.isFile() && INPUT_EXT.has(extname(entry.name).toLowerCase())) {
        files.push(join(dir, entry.name))
      }
    }
  }
  return files
}

async function main() {
  await mkdir(OUT, { recursive: true })
  const files = await collect()

  if (!files.length) {
    console.log('[media] nothing to process. Drop originals into assets/media/raw/ — see its README.')
    return
  }

  const manifest = {}
  let written = 0

  for (const file of files) {
    const slug = slugify(file)
    const img = sharp(file, { failOn: 'error' })
    const { width: srcWidth, height: srcHeight } = await img.metadata()

    // Never upscale: a 900px original has no business being served at 1920.
    const widths = WIDTHS.filter((w) => w <= srcWidth)
    if (!widths.length) widths.push(srcWidth)

    const entry = { width: srcWidth, height: srcHeight, widths, formats: {} }

    for (const format of ['avif', 'webp']) {
      entry.formats[format] = []
      for (const w of widths) {
        const name = `${slug}-${w}.${format}`
        const pipeline = sharp(file).resize({ width: w, withoutEnlargement: true })
        await (format === 'avif'
          ? pipeline.avif({ quality: 55 })
          : pipeline.webp({ quality: 78 })
        ).toFile(join(OUT, name))
        entry.formats[format].push(name)
        written++
      }
    }

    manifest[slug] = entry
    console.log(`[media] ${slug.padEnd(28)} ${srcWidth}x${srcHeight} -> ${widths.join('/')}`)
  }

  // Lets a <picture> build its srcset without hardcoding which widths exist
  // for a given image.
  await writeFile(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
  console.log(`[media] wrote ${written} files + manifest.json to public/img/`)
}

main().catch((err) => {
  console.error('[media]', err.message)
  process.exit(1)
})
