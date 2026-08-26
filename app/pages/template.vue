<script setup lang="ts">
// Internal boilerplate — never meant to rank, so it stays out of the index
// even though it is fully prerendered and reachable like every other page.
useSeoMeta({
  title: 'ROKK Event Page Template — internal',
  robots: 'noindex, nofollow',
})

const ticketTiers = [
  { name: '[TIER 1 NAME]', price: '[€PRICE]', note: '[e.g. LIMITED / N ONLY]' },
  { name: '[TIER 2 NAME]', price: '[€PRICE]', note: '[e.g. PRESALE UNTIL DATE]' },
  { name: '[TIER 3 NAME]', price: '[€PRICE]', note: '[e.g. FUNDS A FREE TICKET]' },
]
</script>

<template>
  <div class="border-b-4 border-primary bg-primary px-margin-mobile py-4 text-center font-mono text-label-caps uppercase text-on-primary md:px-margin-desktop">
    INTERNAL TEMPLATE — copy this page to scaffold a new ROKK event. Not indexed, not for sharing.
  </div>

  <header class="sticky top-0 z-50 flex items-center justify-between gap-4 border-b-4 border-primary bg-background px-margin-mobile py-4 md:px-margin-desktop">
    <span class="font-display text-2xl font-black uppercase tracking-tighter text-primary md:text-headline-lg">
      [EVENT NAME]
    </span>
    <nav class="hidden gap-1 md:flex">
      <a class="px-2 py-1 font-headline text-[15px] font-extrabold uppercase text-secondary">[NAV 1]</a>
      <a class="px-2 py-1 font-headline text-[15px] font-extrabold uppercase text-secondary">[NAV 2]</a>
      <a class="px-2 py-1 font-headline text-[15px] font-extrabold uppercase text-secondary">[NAV 3]</a>
    </nav>
    <button type="button" class="btn-brutal btn-brutal--primary px-6 py-2.5">[CTA LABEL]</button>
  </header>

  <main class="mx-auto w-full max-w-[1200px]">
    <section class="flex flex-wrap items-center gap-8 border-b-4 border-primary px-margin-mobile py-12 md:px-margin-desktop md:py-[72px]">
      <div class="flex flex-1 justify-center" style="flex-basis: 300px;">
        <div class="border-brutal flex aspect-square w-full max-w-[440px] items-center justify-center bg-white font-mono text-label-caps text-secondary">
          [LOGO / KEY ART — 1:1]
        </div>
      </div>
      <div class="flex flex-col gap-6" style="flex: 1 1 340px;">
        <h1 class="m-0 font-display text-display-lg-mobile uppercase [text-wrap:balance] md:text-display-lg">
          [HEADLINE — the one-line pitch for this event]
        </h1>
        <div class="flex flex-wrap gap-3 font-mono text-label-caps uppercase">
          <span class="border-2 border-primary bg-primary px-3.5 py-2 text-on-primary">[DATE]</span>
          <span class="border-2 border-primary px-3.5 py-2">[VENUE]</span>
          <span class="border-2 border-primary px-3.5 py-2">[DOORS — END]</span>
        </div>
      </div>
    </section>

    <section class="border-b-4 border-primary bg-surface-container px-margin-mobile py-12 md:px-margin-desktop md:py-[72px]">
      <h2 class="m-0 mb-6 font-display text-headline-lg uppercase text-primary">[SECTION TITLE — e.g. LINE-UP / PROGRAMME]</h2>
      <p class="m-0 mb-8 max-w-[720px] text-body-lg">
        [Section intro copy. Reuse BandGrid.vue / a new grid component for repeating items — cards inherit
        .border-brutal + hover-invert from the design tokens automatically.]
      </p>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-gutter">
        <article
          v-for="n in 3"
          :key="n"
          class="border-brutal flex min-h-[200px] flex-col justify-between gap-3.5 bg-white p-[22px] transition-colors duration-200 hover:bg-primary hover:text-on-primary"
        >
          <span class="font-mono text-[11px] font-bold uppercase tracking-[0.1em]">[META LABEL]</span>
          <h3 class="m-0 border-b-4 border-current pb-3 font-display text-headline-sm uppercase">[ITEM NAME]</h3>
          <p class="m-0 text-body-md">[Short description.]</p>
        </article>
      </div>
    </section>

    <section class="border-b-4 border-primary px-margin-mobile py-12 md:px-margin-desktop md:py-[72px]">
      <div class="border-brutal flex flex-col gap-4 bg-primary p-6 text-on-primary md:p-9">
        <h2 class="m-0 font-display text-headline-lg uppercase">[POLICY BLOCK TITLE — e.g. DRESSCODE / SAFETY]</h2>
        <p class="m-0 text-body-lg">[Policy copy — reuse AwarenessPanel.vue as a starting point.]</p>
        <div class="flex flex-wrap gap-2">
          <span class="chip">[TAG]</span>
          <span class="chip">[TAG]</span>
        </div>
      </div>
    </section>

    <section class="border-b-4 border-primary bg-surface-container px-margin-mobile py-12 md:px-margin-desktop md:py-[72px]">
      <h2 class="m-0 mb-8 text-center font-display text-headline-lg uppercase text-primary">[TICKETS SECTION TITLE]</h2>
      <div class="mx-auto flex max-w-[620px] flex-col gap-3.5">
        <div v-for="tier in ticketTiers" :key="tier.name" class="border-brutal flex items-center justify-between gap-4 bg-white p-[18px]">
          <span class="flex flex-col gap-1.5">
            <span class="font-display text-[22px] font-extrabold uppercase">{{ tier.name }}</span>
            <span class="font-mono text-[11px] font-bold uppercase tracking-[0.1em] opacity-75">{{ tier.note }}</span>
          </span>
          <span class="font-display text-[28px] font-black tracking-tight">{{ tier.price }}</span>
        </div>
      </div>
      <p class="mx-auto mt-6 max-w-[620px] text-center text-body-md text-on-surface-variant">
        [Reuse TicketModal.vue for checkout — swap ticketTiers in src/data/lineup.ts, or fork a per-event data file.]
      </p>
    </section>

    <section class="flex flex-col items-center gap-7 px-margin-mobile py-14 text-center md:px-margin-desktop md:py-[88px]">
      <h2 class="m-0 font-display text-display-lg-mobile uppercase md:text-display-lg">[CLOSING CTA HEADLINE]</h2>
      <p class="m-0 max-w-[620px] text-body-lg">[One or two sentences that push toward the ticket link.]</p>
      <button type="button" class="btn-brutal btn-brutal--primary px-11 py-5 text-sm tracking-[0.16em]">[CTA LABEL]</button>
    </section>
  </main>

  <footer class="flex flex-wrap items-center justify-between gap-4 border-t-4 border-primary bg-primary px-margin-mobile py-gutter font-mono text-label-caps uppercase text-on-primary md:px-margin-desktop">
    <p class="m-0 font-display text-[22px] font-extrabold tracking-tight">[EVENT NAME]</p>
    <nav class="flex flex-wrap gap-5">
      <a class="text-on-primary">[NAV 1]</a>
      <a class="text-on-primary">[NAV 2]</a>
    </nav>
    <p class="m-0 opacity-70">©[YEAR] ROKK — NO RACISM. NO SEXISM. NO HOMOPHOBIA.</p>
  </footer>
</template>
