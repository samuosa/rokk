<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'Page not found — PUNK X TEKK',
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>

<template>
  <main class="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-margin-mobile py-24 text-center md:px-margin-desktop">
    <h1 class="m-0 font-display text-display-lg-mobile uppercase md:text-display-lg">404</h1>
    <p class="text-body-lg">This page doesn't exist. It might have moved, or never did.</p>
    <RouterLink to="/" class="btn-brutal btn-brutal--primary inline-block px-6 py-3">BACK TO PUNK X TEKK</RouterLink>
  </main>
</template>
