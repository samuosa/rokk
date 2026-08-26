<script setup lang="ts">
import type { Genre, ResolvedSlot } from '@/types/event'
import type { StageFilter } from '@/composables/useLineupFilter'
import { stages } from '@/data/lineup'
import comingSoon from '@/assets/coming-soon.png'

const props = defineProps<{
  slots: ResolvedSlot[]
  total: number
  genres: Genre[]
  stageFilter: StageFilter
  activeGenres: Genre[]
}>()

const emit = defineEmits<{
  (e: 'update:stageFilter', value: StageFilter): void
  (e: 'toggle-genre', value: Genre): void
}>()

const stageOptions: { id: StageFilter; label: string }[] = [
  { id: 'all', label: 'ALL STAGES' },
  ...stages.map((s) => ({ id: s.id as StageFilter, label: s.label })),
]
</script>

<template>
  <section id="lineup" class="border-b-thick border-primary px-margin-mobile py-12 md:px-margin-desktop md:py-[72px]">
    <div class="mb-8 flex flex-wrap items-end justify-between gap-5">
      <h2 class="m-0 font-display text-display-lg-mobile uppercase text-primary md:text-display-lg">LINE-UP</h2>
      <p class="m-0 font-mono text-label-caps uppercase text-secondary">
        {{ props.slots.length }} / {{ props.total }} SETS SHOWN
      </p>
    </div>

    <div class="mb-4 flex flex-wrap gap-2.5" role="group" aria-label="Filter by stage">
      <button
        v-for="opt in stageOptions"
        :key="opt.id"
        type="button"
        :aria-pressed="props.stageFilter === opt.id"
        class="btn-brutal px-5 py-3"
        :class="props.stageFilter === opt.id ? 'bg-primary text-on-primary' : 'bg-white text-primary'"
        @click="emit('update:stageFilter', opt.id)"
      >{{ opt.label }}</button>
    </div>

    <div class="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by genre">
      <button
        v-for="genre in props.genres"
        :key="genre"
        type="button"
        :aria-pressed="props.activeGenres.includes(genre)"
        class="chip !border-primary cursor-pointer px-3 py-1.5 text-[11px]"
        :class="props.activeGenres.includes(genre) ? 'bg-primary text-on-primary' : 'bg-transparent text-on-surface'"
        @click="emit('toggle-genre', genre)"
      >{{ genre }}</button>
    </div>

    <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-gutter">
      <RouterLink
        v-for="slot in props.slots"
        :key="slot.id"
        :to="`/lineup/${slot.slug}`"
        class="border-brutal group flex min-h-[260px] flex-col gap-3.5 bg-white p-[22px] transition-colors duration-200 hover:bg-primary hover:text-on-primary"
      >
        <header class="flex items-center justify-between gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em]">
          <span>{{ slot.stage.label }}</span>
          <span>{{ slot.window }}</span>
        </header>
        <h3 class="m-0 border-b-thick border-current pb-3 font-display text-headline-lg uppercase [text-wrap:balance]">
          {{ slot.band.name }}
        </h3>
        <p class="m-0 flex-1 text-body-lg">{{ slot.band.blurb }}</p>
        <footer class="flex flex-wrap items-center justify-between gap-2">
          <span class="flex flex-wrap gap-2">
            <span class="chip">{{ slot.band.genre }}</span>
            <span class="chip">{{ slot.role }}</span>
          </span>
          <span class="chip opacity-0 transition-opacity group-hover:opacity-100">DETAILS &rarr;</span>
        </footer>
      </RouterLink>
    </div>

    <p
      v-if="!props.slots.length"
      class="border-brutal m-0 p-10 text-center font-display text-headline-sm uppercase"
    >NOTHING MATCHES. LOOSEN THE FILTER.</p>

    <figure class="border-brutal mt-10 overflow-hidden">
      <img
        :src="comingSoon"
        alt="More acts coming soon"
        class="block max-h-[420px] w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
      >
    </figure>
  </section>
</template>
