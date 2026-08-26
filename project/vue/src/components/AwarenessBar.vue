<script setup lang="ts">
import { computed } from 'vue'
import { eventMeta } from '@/data/lineup'

// Doubled so the -50% keyframe loops seamlessly.
const ticker = computed(() => [...eventMeta.awarenessTicker, ...eventMeta.awarenessTicker].join(' • ') + ' • ')
</script>

<template>
  <aside id="awareness" class="marquee border-b-thick border-primary bg-primary py-3.5 text-on-primary">
    <p class="marquee__content m-0 font-display text-headline-sm uppercase">{{ ticker }}</p>
  </aside>
</template>
