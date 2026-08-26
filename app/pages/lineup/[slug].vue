<script setup lang="ts">
import { eventMeta, findActBySlug, resolveActs } from '~/data/lineup'

const route = useRoute()

// route.params stays reactive: Vue Router reuses this component when moving
// between two /lineup/:slug pages, so slug/act must remain derived or the page
// would keep showing the previous act.
const slug = computed(() => String(route.params.slug))
const act = computed(() => findActBySlug(slug.value))
const otherActsOnStage = computed(() => {
  const current = act.value
  if (!current) return []
  return resolveActs().filter((a) => a.stageId === current.stageId && a.slug !== current.slug)
})

// A slug with no act is a real 404, not a page that renders empty. Under
// `failOnError: true` this can only happen at runtime, never during prerender,
// because the route list is generated from the same data.
if (!act.value) {
  throw createError({ statusCode: 404, statusMessage: 'Act not found', fatal: true })
}

const title = computed(() => (act.value!.band.tba
  ? `${act.value!.role} · ${act.value!.stage.label} — PUNK X TEKK Line-up`
  : `${act.value!.band.name} — PUNK X TEKK Line-up`))
const description = computed(() =>
  `${act.value!.band.blurb} ${act.value!.stage.label}, ${act.value!.window}, ${eventMeta.date}.`)

useSeoMeta({
  title: () => title.value,
  description: () => description.value,
  ogTitle: () => title.value,
  ogDescription: () => description.value,
  ogType: 'profile',
  twitterTitle: () => title.value,
  twitterDescription: () => description.value,
})

// An unconfirmed act has no name to attach a MusicGroup to, so only real
// acts get one.
if (!act.value!.band.tba) {
  useSchemaOrg([
    // No dedicated define* helper ships for MusicGroup, so this is a raw node.
    { '@type': 'MusicGroup', name: act.value!.band.name, genre: act.value!.band.genre },
    defineEvent(musicEvent()),
  ])
}
</script>

<template>
  <main class="mx-auto w-full max-w-[1200px] px-margin-mobile py-12 md:px-margin-desktop md:py-[72px]">
    <template v-if="act">
      <NuxtLink
        :to="{ path: '/', hash: '#lineup' }"
        class="btn-brutal mb-8 inline-block bg-white px-4 py-2.5 text-primary hover:bg-primary hover:text-on-primary"
      >&larr; BACK TO LINE-UP</NuxtLink>

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
            <NuxtLink
              :to="`/lineup/${other.slug}`"
              class="border-brutal block bg-white p-5 transition-colors duration-150 hover:bg-primary hover:text-on-primary"
            >
              <p class="m-0 font-mono text-[11px] font-bold uppercase tracking-[0.1em] opacity-70">{{ other.start }}</p>
              <p class="m-0 mt-1.5 font-display text-xl font-extrabold uppercase">{{ other.band.name }}</p>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </template>

    <template v-else>
      <h1 class="m-0 mb-6 font-display text-display-lg-mobile uppercase md:text-display-lg">ACT NOT FOUND</h1>
      <p class="mb-8 text-body-lg">This slot isn't in the line-up. It may have moved — check the full running order.</p>
      <NuxtLink :to="{ path: '/', hash: '#lineup' }" class="btn-brutal btn-brutal--primary inline-block px-6 py-3">BACK TO LINE-UP</NuxtLink>
    </template>
  </main>
</template>
