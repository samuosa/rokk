<script setup lang="ts">
import { eventMeta } from '~/data/lineup'
import soundsystem from '~/assets/img/soundsystem.jpeg'

const title = `Sound & Light — ${eventMeta.title}`
const description = 'The rig behind PUNK X TEKK: SDWA5 Soundsystem\u2019s stacked rig outdoors, a stripped industrial light show indoors, and a strobe warning for anyone sensitive to it.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  twitterTitle: title,
  twitterDescription: description,
})

const specs = [
  { label: 'OUTDOOR RIG', value: '16 STACKS / SDWA5' },
  { label: 'INDOOR RIG', value: 'HOUSE SYSTEM / TEKK RAVE' },
  { label: 'LIGHT SHOW', value: 'STROBE + HAZE, NO PYRO' },
  { label: 'FLOOR', value: 'CONCRETE, NO CARPET' },
]
</script>

<template>
  <main class="mx-auto w-full max-w-[1200px]">
    <section class="border-b-4 border-primary px-margin-mobile py-12 md:px-margin-desktop md:py-[72px]">
      <h1 class="m-0 mb-6 font-display text-display-lg-mobile uppercase [text-wrap:balance] md:text-display-lg">
        SOUND & LIGHT
      </h1>
      <p class="m-0 max-w-[720px] text-body-lg">
        No LED walls, no confetti cannons. PUNK X TEKK runs on one honest rig outdoors and a stripped
        industrial light show indoors — built to move air and shake concrete, not to look good in a reel.
      </p>
    </section>

    <section class="relative flex items-center justify-center overflow-hidden border-b-4 border-primary bg-[#111] px-margin-mobile py-16 md:px-margin-desktop md:py-24">
      <img
        :src="soundsystem"
        alt=""
        aria-hidden="true"
        class="absolute inset-0 h-full w-full object-cover opacity-35 [filter:grayscale(1)_contrast(1.4)]"
      >
      <div class="border-brutal relative z-10 flex max-w-[820px] flex-col items-center gap-6 bg-white p-6 text-center md:p-10">
        <span class="font-mono text-label-caps uppercase text-secondary">SDWA5 SOUNDSYSTEM</span>
        <h2 class="m-0 font-display text-headline-lg uppercase md:text-display-lg-mobile">OWN RIG. OWN RULES.</h2>
        <p class="m-0 text-body-lg">
          Sixteen stacks aimed at the concrete, warming the room from the floor up. SDWA5 build and tune
          the outdoor stage themselves — what you hear at doors is what you hear at close.
        </p>
      </div>
    </section>

    <section class="border-b-4 border-primary bg-surface-container px-margin-mobile py-12 md:px-margin-desktop md:py-[72px]">
      <h2 class="m-0 mb-8 font-display text-headline-lg uppercase text-primary">THE SPECS</h2>
      <dl class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-gutter">
        <div v-for="spec in specs" :key="spec.label" class="border-brutal bg-white p-5">
          <dt class="m-0 font-mono text-label-caps uppercase text-secondary">{{ spec.label }}</dt>
          <dd class="m-0 mt-2 font-display text-xl font-extrabold uppercase">{{ spec.value }}</dd>
        </div>
      </dl>
    </section>

    <section class="border-b-4 border-primary px-margin-mobile py-12 md:px-margin-desktop md:py-[72px]">
      <div class="border-brutal flex flex-col gap-4 bg-primary p-6 text-on-primary md:p-9">
        <h2 class="m-0 font-display text-headline-lg uppercase">STROBE WARNING</h2>
        <p class="m-0 text-body-lg">
          The Tekk Rave stage uses strobe lighting and rapid flashing effects for extended periods.
          If you have photosensitive epilepsy or are otherwise sensitive to strobe, talk to the awareness
          team at the door — they'll point you to a viewing spot outside the strobe throw.
        </p>
        <div class="flex flex-wrap gap-2">
          <span class="chip">STROBE / HAZE</span>
          <span class="chip">AWARENESS TEAM ON SITE</span>
          <span class="chip">NO PHOTOS ON FLOOR</span>
        </div>
      </div>
    </section>
  </main>
</template>
