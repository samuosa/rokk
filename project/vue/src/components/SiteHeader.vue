<script setup lang="ts">
import { eventMeta } from '@/data/lineup'

defineProps<{ ctaLabel: string }>()
const emit = defineEmits<{ (e: 'open-tickets'): void }>()

// RouterLink (not plain <a href>) so every link resolves through the
// router's base — required on GitHub Pages, which serves from "/<repo>/".
const nav: { to: string | { path: string; hash: string }; label: string }[] = [
  { to: { path: '/', hash: '#manifesto' }, label: 'MANIFESTO' },
  { to: { path: '/', hash: '#lineup' }, label: 'LINEUP' },
  { to: { path: '/', hash: '#timetable' }, label: 'TIMETABLE' },
  { to: { path: '/', hash: '#awareness' }, label: 'AWARENESS' },
  { to: '/lights', label: 'LIGHTS' },
]
</script>

<template>
  <header
    class="sticky top-0 z-50 flex items-center justify-between gap-4 border-b-thick border-primary bg-background px-margin-mobile py-4 md:px-margin-desktop"
  >
    <RouterLink
      to="/"
      class="font-display text-2xl font-black uppercase tracking-tighter text-primary md:text-headline-lg"
    >{{ eventMeta.title }}</RouterLink>

    <nav class="hidden gap-1 md:flex">
      <RouterLink
        v-for="item in nav"
        :key="item.label"
        :to="item.to"
        class="px-2 py-1 font-headline text-[15px] font-extrabold uppercase text-secondary transition-colors duration-150 hover:bg-primary hover:text-on-primary"
      >{{ item.label }}</RouterLink>
    </nav>

    <button type="button" class="btn-brutal btn-brutal--primary px-6 py-2.5" @click="emit('open-tickets')">
      {{ ctaLabel }}
    </button>
  </header>
</template>
