# Raw media

`raw/` is **gitignored**. Originals live in Google Drive; only the processed
output in `public/img/` is committed.

## Getting the originals in

Export the Drive folder `1fJ3byxtV4VOSASJVBiu2HUUTOzeiIZIb` and unzip it into
`assets/media/raw/`, then:

```bash
npm run media
```

`scripts/process-media.mjs` writes WebP + AVIF at 480/960/1440/1920 into
`public/img/`, never upscaling past an original's own width, plus a
`manifest.json` so a `<picture>` can build its `srcset` without hardcoding
which widths exist.

The four brand images tracked in `app/assets/img/` are picked up automatically
and run through the same pipeline — they do not need copying into `raw/`.

## Expected files

As of the last listing the folder held 22 images. Filenames become slugs, so
`SOUNDSYSTEM_ALT_01.png` is emitted as `soundsystem-alt-01-{width}.{format}`.

| Drive title | Type |
|---|---|
| `LOGO_main` | brand mark — identical to the tracked `rokk-logo.jpeg` |
| `LOGO_mask`, `LOGO_MASK_02`, `LOGO_MASK_03` | logo variants |
| `MASK_black`, `MASK_white`, `MASK_simple` | mask motif |
| `FLYER_01`, `FLYER_02` | flyer artwork |
| `LAYOUT_GRENADE`, `LAYOUT_GRENADE_02`, `LAYOUT_GRENADE_TRANSPARENT` | layout artwork |
| `IMAGE_BW_01`, `IMAGE_BW_02` | black-and-white photography |
| `IMAGE_COLOR_01` | colour photography |
| `IMAGE_CAR`, `IMAGE_MASK_02`, `IMAGE_MASK_3D` | photography |
| `SOUNDSYSTEM`, `SOUNDSYSTEM_ALT_01/02/03` | rig photography |

Two files in that folder are **not** media and must not be copied here or
committed anywhere: `Two-factor authentication - Hetzner Online.pdf` and a
Google Doc named `Pat`. They look credential-adjacent; they belong somewhere
other than an asset folder.

## Using them

No `@nuxt/image`. Its IPX runtime transforms on request and needs a server,
which neither GitHub Pages nor Hetzner Webhosting provides. Use a plain
`<picture>` against the pre-generated files:

```html
<picture>
  <source type="image/avif" srcset="/img/soundsystem-480.avif 480w, /img/soundsystem-960.avif 960w" sizes="100vw">
  <source type="image/webp" srcset="/img/soundsystem-480.webp 480w, /img/soundsystem-960.webp 960w" sizes="100vw">
  <img src="/img/soundsystem-960.webp" width="1024" height="1024" alt="…" loading="lazy" decoding="async">
</picture>
```

Every image needs a meaningful `alt`. Purely decorative ones — the soundsystem
backdrop behind the hero card, for instance — take `alt=""` plus
`aria-hidden="true"`, which is what the existing markup already does.

Note that `src`/`srcset` here are root-absolute. Under the GitHub Pages
sub-path deploy they need the base prefix, so build them through
`useRuntimeConfig().app.baseURL` rather than hardcoding a leading `/`.
