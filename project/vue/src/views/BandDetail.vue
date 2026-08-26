<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import TicketModal from '@/components/TicketModal.vue'
import { eventMeta, findActBySlug, resolveActs } from '@/data/lineup'
import { useTicketModal } from '@/composables/useTicketModal'
import { canonicalUrl } from '@/lib/site'
import { musicEventJsonLd } from '@/lib/seo'

const route = useRoute()
const { modalOpen, ctaLabel, checkoutLabel, open, close } = useTicketModal()

// route.params is reactive — Vue Router reuses this component instance when
// navigating between two /lineup/:slug pages, so slug/act must stay derived
// (not snapshotted once) or the page would keep showing the previous act.
const slug = computed(() => String(route.params.slug))
const act = computed(() => findActBySlug(slug.value))
const otherActsOnStage = computed(() => {
  const current = act.value
  if (!current) return []
  return resolveActs().filter((a) => a.stageId === current.stageId && a.slug !== current.slug)
})

useHead(() => {
  const a = act.value
  const pageUrl = canonicalUrl(`/lineup/${slug.value}`)

  if (!a) {
    return {
      title: 'Act not found — PUNK X TEKK',
      meta: [{ name: 'robots', content: 'noindex' }],
    }
  }

  const title = a.band.tba
    ? `${a.role} · ${a.stage.label} — PUNK X TEKK Line-up`
    : `${a.band.name} — PUNK X TEKK Line-up`
  const description = `${a.band.blurb} ${a.stage.label}, ${a.window}, ${eventMeta.date}.`

  return {
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'profile' },
      { property: 'og:url', content: pageUrl },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
    link: [{ rel: 'canonical', href: pageUrl }],
    script: a.band.tba
      ? []
      : [{
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MusicGroup',
            name: a.band.name,
            genre: a.band.genre,
            url: pageUrl,
            performerIn: musicEventJsonLd(),
          }),
        }],
  }
})
</script>

<template>
  <SiteHeader :cta-label="ctaLabel" @open-tickets="open" />

  <main class="mx-auto w-full max-w-[1200px] px-margin-mobile py-12 md:px-margin-desktop md:py-[72px]">
    <template v-if="act">
      <RouterLink
        :to="{ path: '/', hash: '#lineup' }"
        class="btn-brutal mb-8 inline-block bg-white px-4 py-2.5 text-primary hover:bg-primary hover:text-on-primary"
      >&larr; BACK TO LINE-UP</RouterLink>

      <header class="border-brutal mb-10 flex flex-col gap-4 bg-white p-6 md:p-10">
        <div class="flex flex-wrap items-center justify-between gap-3 font-mono text-label-caps uppercase text-secondary">
          <span>{{ act.stage.label }}</span>
          <span>{{ act.window }}</span>
        </div>
        <h1 class="m-0 font-display text-display-lg-mobile uppercase [text-wrap:balance] md:text-display-lg">
          {{ act.band.name }}
        </h1>
        <div class="flex flex-wrap gap-2">
          <span class="chip !border-primary">{{ act.band.genre }}</span>
          <span class="chip !border-primary">{{ act.role }}</span>
          <span v-if="act.band.tba" class="chip !border-primary">TBA — ANNOUNCED SOON</span>
        </div>
      </header>

      <p class="mb-12 max-w-[720px] text-body-lg">{{ act.band.blurb }}</p>

      <section v-if="otherActsOnStage.length" aria-labelledby="more-on-stage">
        <h2 id="more-on-stage" class="m-0 mb-6 font-display text-headline-lg uppercase text-primary">
          MORE ON {{ act.stage.label }}
        </h2>
        <ul class="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-gutter p-0">
          <li v-for="other in otherActsOnStage" :key="other.id">
            <RouterLink
              :to="`/lineup/${other.slug}`"
              class="border-brutal block bg-white p-5 transition-colors duration-150 hover:bg-primary hover:text-on-primary"
            >
              <p class="m-0 font-mono text-[11px] font-bold uppercase tracking-[0.1em] opacity-70">{{ other.start }}</p>
              <p class="m-0 mt-1.5 font-display text-xl font-extrabold uppercase">{{ other.band.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </section>
    </template>

    <template v-else>
      <h1 class="m-0 mb-6 font-display text-display-lg-mobile uppercase md:text-display-lg">ACT NOT FOUND</h1>
      <p class="mb-8 text-body-lg">This slot isn't in the line-up. It may have moved — check the full running order.</p>
      <RouterLink :to="{ path: '/', hash: '#lineup' }" class="btn-brutal btn-brutal--primary inline-block px-6 py-3">BACK TO LINE-UP</RouterLink>
    </template>
  </main>

  <SiteFooter />
  <TicketModal :open="modalOpen" :checkout-label="checkoutLabel" @close="close" />
</template>
