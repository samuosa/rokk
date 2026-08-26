<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { assetUrl } from '@/lib/site'
import { OG_IMAGE } from '@/lib/seo'

// Site-wide head. These live here rather than in index.html because every one
// of them needs the deploy's base path baked in (GitHub Pages serves this from
// "/<repo>/", Ionos from "/"), and index.html is a static template. Views layer
// their own title/description/og:title on top; unhead dedupes by name/property,
// so a page-level tag always wins over the default set here.
const icon = (p: string) => assetUrl(p)

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    // SVG first: modern browsers prefer it and it inverts on dark tab bars.
    { rel: 'icon', type: 'image/svg+xml', href: icon('/favicon.svg') },
    { rel: 'icon', type: 'image/x-icon', href: icon('/favicon.ico'), sizes: '16x16 32x32 48x48' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: icon('/apple-touch-icon.png') },
    { rel: 'manifest', href: icon('/site.webmanifest') },
  ],
  meta: [
    { name: 'theme-color', content: '#000000' },
    { property: 'og:site_name', content: 'ROKK' },
    { property: 'og:locale', content: 'en' },
    { property: 'og:image', content: OG_IMAGE.url() },
    { property: 'og:image:width', content: OG_IMAGE.width },
    { property: 'og:image:height', content: OG_IMAGE.height },
    { property: 'og:image:alt', content: OG_IMAGE.alt },
    // summary_large_image renders the 1200x630 card instead of a thumbnail.
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: OG_IMAGE.url() },
    { name: 'twitter:image:alt', content: OG_IMAGE.alt },
  ],
})
</script>

<template>
  <RouterView />
</template>
