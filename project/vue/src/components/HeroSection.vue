<script setup lang="ts">
import { eventMeta } from '@/data/lineup'
import logo from '@/assets/rokk-logo.jpeg'
import backdrop from '@/assets/soundsystem.jpeg'

const emit = defineEmits<{ (e: 'open-tickets'): void }>()
</script>

<template>
  <!-- Brand block -->
  <section
    id="manifesto"
    class="flex flex-wrap items-center gap-8 border-b-thick border-primary px-margin-mobile py-12 md:gap-14 md:px-margin-desktop md:py-[72px]"
  >
    <div class="flex flex-1 basis-[300px] justify-center">
      <img
        :src="logo"
        alt="ROKK"
        width="440"
        height="440"
        class="border-brutal aspect-square w-full max-w-[440px] bg-white object-cover"
      >
    </div>

    <div class="flex flex-1 basis-[340px] flex-col gap-6">
      <h1 class="m-0 font-display text-display-lg-mobile uppercase text-primary [text-wrap:balance] md:text-display-lg">
        RECLAIMING THE UNDERGROUND. BOLD SOUNDS, RAW ENERGY, NO COMPROMISE.
      </h1>
      <ul class="m-0 flex list-none flex-wrap gap-3 p-0">
        <li class="chip !border-primary bg-primary px-3.5 py-2 text-on-primary">{{ eventMeta.date }}</li>
        <li class="chip !border-primary px-3.5 py-2">{{ eventMeta.venue }}</li>
        <li class="chip !border-primary px-3.5 py-2">{{ eventMeta.doors }}</li>
      </ul>
    </div>
  </section>

  <!-- Event block -->
  <section
    class="relative flex items-center justify-center overflow-hidden border-b-thick border-primary bg-[#111] px-margin-mobile py-16 md:px-margin-desktop md:py-24"
  >
    <img
      :src="backdrop"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 h-full w-full object-cover opacity-35 [filter:grayscale(1)_contrast(1.4)]"
    >
    <div
      class="border-brutal relative z-10 flex max-w-3xl -rotate-2 flex-col items-center gap-6 bg-white p-6 text-center transition-transform duration-300 hover:rotate-0 md:p-12"
    >
      <span class="font-mono text-label-caps uppercase tracking-[0.24em] text-secondary">ROKK PRESENTS</span>
      <h2 class="m-0 font-display text-display-lg-mobile leading-[0.86] text-primary md:text-display-lg">
        {{ eventMeta.claim }}
      </h2>
      <div class="flex gap-3">
        <span class="chip !border-primary bg-primary px-4 py-2 text-on-primary">PUNK</span>
        <span class="chip !border-primary bg-white px-4 py-2 text-primary">TEKK</span>
      </div>
      <button type="button" class="btn-brutal btn-brutal--primary px-8 py-4 text-[13px]" @click="emit('open-tickets')">
        <slot name="cta">TICKETS</slot>
      </button>
    </div>
  </section>
</template>
