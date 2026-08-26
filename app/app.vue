<script setup lang="ts">
// Site-wide head. @nuxtjs/seo supplies canonical, og:url, og:site_name and
// og:locale from `site` in nuxt.config, so only the parts it cannot know
// live here: the icon set and the social card.
//
// Paths go through useRuntimeConfig().app.baseURL because a GitHub Pages
// project site serves from "/<repo>/" — a bare "/favicon.svg" would 404 there.
const base = useRuntimeConfig().app.baseURL
const asset = (p: string) => `${base.replace(/\/$/, '')}${p}`

const ogImage = () => {
  const { url } = useSiteConfig()
  return `${String(url).replace(/\/$/, '')}${asset('/og-image.jpg')}`
}
const OG_ALT = 'ROKK — spray-painted wordmark with an anarchy circle-A'

useHead({
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: asset('/favicon.svg') },
    { rel: 'icon', type: 'image/x-icon', href: asset('/favicon.ico'), sizes: '16x16 32x32 48x48' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: asset('/apple-touch-icon.png') },
    { rel: 'manifest', href: asset('/site.webmanifest') },
  ],
  meta: [{ name: 'theme-color', content: '#000000' }],
})

useSeoMeta({
  ogImage: ogImage(),
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: OG_ALT,
  twitterCard: 'summary_large_image',
  twitterImage: ogImage(),
  twitterImageAlt: OG_ALT,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
