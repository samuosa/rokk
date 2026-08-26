<script setup lang="ts">
// Header, footer and the ticket modal are chrome, not page content — they sit
// in the layout so Phase 2's pages inherit them instead of repeating them.
const { modalOpen, ctaLabel, checkoutLabel, open, close } = useTicketModal()
</script>

<template>
  <SiteHeader :cta-label="ctaLabel" @open-tickets="open" />

  <slot />

  <SiteFooter />
  <TicketModal :open="modalOpen" :checkout-label="checkoutLabel" @close="close" />
</template>
