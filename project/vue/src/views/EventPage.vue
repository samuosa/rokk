<script setup lang="ts">
import { useHead } from '@unhead/vue'
import SiteHeader from '@/components/SiteHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import AwarenessBar from '@/components/AwarenessBar.vue'
import BandGrid from '@/components/BandGrid.vue'
import Timetable from '@/components/Timetable.vue'
import AwarenessPanel from '@/components/AwarenessPanel.vue'
import CollaboratorList from '@/components/CollaboratorList.vue'
import TicketCta from '@/components/TicketCta.vue'
import TicketModal from '@/components/TicketModal.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { useLineupFilter } from '@/composables/useLineupFilter'
import { useTicketModal } from '@/composables/useTicketModal'
import { eventMeta } from '@/data/lineup'
import { canonicalUrl } from '@/lib/site'

const { modalOpen, ctaLabel, checkoutLabel, open, close } = useTicketModal()

const {
  stageFilter, activeGenres, genres, acts, visibleActs,
  isVisible, slotsByStage, timeAxis, cellAt, toggleGenre,
} = useLineupFilter()

const slotsFor = (id: 'punk' | 'tekk') => slotsByStage(id)

const pageUrl = canonicalUrl('/')

useHead({
  title: `${eventMeta.title} — ${eventMeta.claim}`,
  meta: [
    { name: 'description', content: `${eventMeta.title}: outdoor punk concert and tekk rave. ${eventMeta.date}, ${eventMeta.venue}.` },
    { property: 'og:title', content: `${eventMeta.title} — ${eventMeta.claim}` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: pageUrl },
  ],
  link: [{ rel: 'canonical', href: pageUrl }],
  script: [{
    type: 'application/ld+json',
    // Prerendered structured data — crawlable without JS.
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'MusicEvent',
      name: `${eventMeta.title} — ${eventMeta.claim}`,
      startDate: '2026-10-26T18:00',
      eventStatus: 'https://schema.org/EventScheduled',
      location: { '@type': 'Place', name: eventMeta.venue },
      organizer: { '@type': 'Organization', name: 'ROKK' },
    }),
  }],
})
</script>

<template>
  <SiteHeader :cta-label="ctaLabel" @open-tickets="open" />

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

  <SiteFooter />
  <TicketModal :open="modalOpen" :checkout-label="checkoutLabel" @close="close" />
</template>
