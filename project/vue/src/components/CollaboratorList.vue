<script setup lang="ts">
const collaborators = ['SDWA5 SOUNDSYSTEM', 'GIFTGRUBE', 'BPM BERLIN']
</script>

<template>
  <section class="border-b-thick border-primary bg-surface-container px-margin-mobile py-12 md:px-margin-desktop md:py-[72px]">
    <h2 class="m-0 mb-8 text-center font-display text-headline-lg uppercase text-primary">COLLABORATORS</h2>
    <ul class="m-0 flex list-none flex-wrap justify-center gap-gutter p-0">
      <li
        v-for="(name, i) in collaborators"
        :key="name"
        class="border-brutal px-8 py-[22px] font-display text-[22px] font-extrabold uppercase transition-colors duration-150"
        :class="i % 2 === 0
          ? 'bg-primary text-on-primary hover:bg-white hover:text-primary'
          : 'bg-white text-primary hover:bg-primary hover:text-on-primary'"
      >{{ name }}</li>
    </ul>
  </section>
</template>
