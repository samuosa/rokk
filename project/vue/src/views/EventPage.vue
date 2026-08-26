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
import { musicEventJsonLd } from '@/lib/seo'

const { modalOpen, ctaLabel, checkoutLabel, open, close } = useTicketModal()

const {
  stageFilter, activeGenres, genres, acts, visibleActs,
  isVisible, slotsByStage, timeAxis, cellAt, toggleGenre,
} = useLineupFilter()

const slotsFor = (id: 'punk' | 'tekk') => slotsByStage(id)

const pageUrl = canonicalUrl('/')

const title = `${eventMeta.title} — ${eventMeta.claim}`
const description = `${eventMeta.title}: outdoor punk concert and tekk rave. ${eventMeta.date}, ${eventMeta.venue}.`

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: pageUrl },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ],
  link: [{ rel: 'canonical', href: pageUrl }],
  script: [{
    type: 'application/ld+json',
    // Prerendered structured data — crawlable without JS.
    children: JSON.stringify({ '@context': 'https://schema.org', ...musicEventJsonLd() }),
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
