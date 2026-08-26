<script setup lang="ts">
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
  <footer
    class="flex flex-wrap items-center justify-between gap-4 border-t-thick border-primary bg-primary px-margin-mobile py-gutter font-mono text-label-caps uppercase text-on-primary md:px-margin-desktop"
  >
    <p class="m-0 font-display text-[22px] font-extrabold tracking-tight">PUNK X TEKK</p>
    <nav class="flex flex-wrap gap-5">
      <RouterLink
        v-for="item in nav"
        :key="item.label"
        :to="item.to"
        class="text-on-primary transition-all duration-100 hover:text-tertiary-fixed-dim active:scale-95"
      >{{ item.label }}</RouterLink>
    </nav>
    <p class="m-0 opacity-70">©2026 ROKK — NO RACISM. NO SEXISM. NO HOMOPHOBIA.</p>
  </footer>
</template>
