<script setup lang="ts">
import { eventMeta } from '~/data/lineup'

const { ctaLabel, open } = useTicketModal()

const {
  stageFilter, activeGenres, genres, acts, visibleActs,
  isVisible, slotsByStage, timeAxis, cellAt, toggleGenre,
} = useLineupFilter()

const slotsFor = (id: 'punk' | 'tekk') => slotsByStage(id)

const title = `${eventMeta.title} — ${eventMeta.claim}`
const description = `${eventMeta.title}: outdoor punk concert and tekk rave. ${eventMeta.date}, ${eventMeta.venue}.`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  twitterTitle: title,
  twitterDescription: description,
})

// Structured data via nuxt-schema-org. Hand-written JSON-LD alongside the
// module would put two MusicEvent nodes in the graph.
useSchemaOrg([musicEventNode()])
</script>

<template>
  <main class="mx-auto w-full max-w-[1200px]">
    <HeroSection @open-tickets="open">
      <template #cta>{{ ctaLabel }}</template>
    </HeroSection>

    <AwarenessBar />

    <BandGrid
      :slots="visibleActs"
      :total="acts.length"
      :genres="genres"
      :stage-filter="stageFilter"
      :active-genres="activeGenres"
      @update:stage-filter="stageFilter = $event"
      @toggle-genre="toggleGenre"
    />

    <Timetable
      :time-axis="timeAxis"
      :cell-at="cellAt"
      :is-visible="isVisible"
      :slots-for="slotsFor"
    />

    <AwarenessPanel />
    <CollaboratorList />
    <TicketCta :label="ctaLabel" @open-tickets="open" />
  </main>
</template>
