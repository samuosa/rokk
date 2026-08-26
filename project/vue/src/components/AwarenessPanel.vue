<script setup lang="ts">
import dresscode from '@/assets/dresscode.jpeg'
</script>

<template>
  <section
    class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-stretch gap-gutter border-b-thick border-primary px-margin-mobile py-12 md:px-margin-desktop md:py-[72px]"
  >
    <div class="border-brutal flex flex-col gap-4 bg-primary p-6 text-on-primary md:p-9">
      <h2 class="m-0 font-display text-headline-lg uppercase">DRESSCODE: NONE. CONSENT: MANDATORY.</h2>
      <p class="m-0 text-body-lg">
        Wear what makes you unstoppable. Latex, leather, patches, sweat. Our awareness team is on site all night,
        wearing white armbands — talk to them any time.
      </p>
      <ul class="m-0 flex list-none flex-wrap gap-2 p-0">
        <li class="chip">AWARENESS TEAM</li>
        <li class="chip">SAFER SPACE</li>
        <li class="chip">NO PHOTOS ON FLOOR</li>
      </ul>
    </div>
    <figure class="border-brutal m-0 min-h-[320px] overflow-hidden">
      <img :src="dresscode" alt="Dresscode" class="block h-full w-full object-cover [filter:grayscale(1)_contrast(1.2)]">
    </figure>
  </section>
</template>
