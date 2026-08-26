<script setup lang="ts">
defineProps<{ label: string }>()
const emit = defineEmits<{ (e: 'open-tickets'): void }>()
</script>

<template>
  <section class="flex flex-col items-center gap-7 px-margin-mobile py-14 text-center md:px-margin-desktop md:py-[88px]">
    <h2 class="m-0 font-display text-display-lg-mobile uppercase md:text-display-lg">DON'T WAIT FOR THE DOOR LIST.</h2>
    <p class="m-0 max-w-[620px] text-body-lg">
      Capacity is hard-capped by the soundsystem, not by hype. Presale closes when the last riser is sold.
    </p>
    <button type="button" class="btn-brutal btn-brutal--primary px-11 py-5 text-sm tracking-[0.16em]" @click="emit('open-tickets')">
      {{ label }}
    </button>
  </section>
</template>
