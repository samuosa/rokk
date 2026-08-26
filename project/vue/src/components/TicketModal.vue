<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ticketTiers } from '@/data/lineup'

const props = defineProps<{ open: boolean; checkoutLabel: string }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const selected = ref(ticketTiers[1]!.id)

// Client-only listener — registered in onMounted, never during setup/SSG.
const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && props.open) emit('close') }
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport v-if="props.open" to="body">
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tickets"
      class="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-black/70 p-4"
      @click.self="emit('close')"
    >
      <div class="border-brutal flex w-full max-w-[620px] flex-col bg-white">
        <header class="flex items-center justify-between gap-4 border-b-thick border-primary px-[22px] py-4">
          <h2 class="m-0 font-display text-[32px] font-black uppercase tracking-tight">TICKETS</h2>
          <button
            type="button"
            aria-label="Close"
            class="btn-brutal h-11 w-11 bg-white text-primary hover:bg-primary hover:text-on-primary"
            @click="emit('close')"
          >X</button>
        </header>

        <div class="flex flex-col gap-3.5 p-[22px]">
          <button
            v-for="tier in ticketTiers"
            :key="tier.id"
            type="button"
            class="border-brutal flex items-center justify-between gap-4 p-[18px] text-left"
            :class="selected === tier.id ? 'bg-primary text-on-primary' : 'bg-white text-primary'"
            @click="selected = tier.id"
          >
            <span class="flex flex-col gap-1.5">
              <span class="font-display text-[22px] font-extrabold uppercase">{{ tier.name }}</span>
              <span class="font-mono text-[11px] font-bold uppercase tracking-[0.1em] opacity-75">{{ tier.note }}</span>
            </span>
            <span class="font-display text-[28px] font-black tracking-tight">{{ tier.price }}</span>
          </button>

          <p class="m-0 text-[15px] leading-[23px] text-on-surface-variant">
            Solidarity tickets are available without proof — write to crew@rokk.xyz. Nobody is turned away for money.
          </p>

          <button type="button" class="btn-brutal btn-brutal--primary py-[18px] text-[13px] tracking-[0.14em]" @click="emit('close')">
            {{ props.checkoutLabel }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
