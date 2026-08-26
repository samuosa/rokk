<script setup lang="ts">
import { ref } from 'vue'
import type { ResolvedSlot, StageId } from '~/types/event'
import { stages } from '~/data/lineup'

const props = defineProps<{
  timeAxis: string[]
  cellAt: (stageId: StageId, time: string) => ResolvedSlot | undefined
  isVisible: (slot: ResolvedSlot) => boolean
  slotsFor: (stageId: StageId) => ResolvedSlot[]
}>()

/**
 * Both variants are rendered; CSS breakpoints decide which one is shown.
 * That keeps the prerendered HTML identical to the first client render
 * (no window access during setup, no hydration mismatch).
 */
const activeTab = ref<StageId>('punk')
const openSlot = ref<string | null>(null)

const selectTab = (id: StageId) => { activeTab.value = id; openSlot.value = null }
const toggle = (id: string) => { openSlot.value = openSlot.value === id ? null : id }
const highlighted = (slot?: ResolvedSlot) => !!slot && props.isVisible(slot)
</script>

<template>
  <section
    id="timetable"
    class="border-b-4 border-primary bg-surface-container px-margin-mobile py-12 md:px-margin-desktop md:py-[72px]"
  >
    <h2 class="m-0 mb-8 font-display text-display-lg-mobile uppercase text-primary md:text-display-lg">TIMETABLE</h2>

    <!-- Desktop: parallel multi-column grid, one column per stage -->
    <div class="border-brutal hidden bg-white md:block">
      <div class="grid grid-cols-[108px_1fr_1fr] border-b-4 border-primary">
        <div class="border-r-2 border-primary p-3.5 font-mono text-label-caps uppercase text-secondary">TIME</div>
        <div
          v-for="(stage, i) in stages"
          :key="stage.id"
          class="p-3.5 font-display text-[22px] font-extrabold uppercase"
          :class="i === 0 ? 'border-r-2 border-primary' : ''"
        >{{ stage.label }}</div>
      </div>

      <div
        v-for="time in props.timeAxis"
        :key="time"
        class="grid grid-cols-[108px_1fr_1fr] border-t-2 border-outline-variant"
      >
        <div class="border-r-2 border-primary p-4 font-mono text-[13px] font-bold tracking-[0.08em]">{{ time }}</div>
        <template v-for="(stage, i) in stages" :key="stage.id">
          <div
            class="p-4 transition-colors"
            :class="[
              i === 0 ? 'border-r-2 border-primary' : '',
              highlighted(props.cellAt(stage.id, time))
                ? 'bg-primary text-on-primary'
                : props.cellAt(stage.id, time) ? 'bg-white text-on-surface' : 'bg-white text-outline-variant',
            ]"
          >
            <p class="m-0 font-display text-[20px] font-extrabold uppercase leading-[1.05]">
              {{ props.cellAt(stage.id, time)?.band.name ?? '—' }}
            </p>
            <p
              v-if="props.cellAt(stage.id, time)"
              class="m-0 mt-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] opacity-70"
            >
              {{ props.cellAt(stage.id, time)!.role }} / {{ props.cellAt(stage.id, time)!.band.genre }}
            </p>
          </div>
        </template>
      </div>
    </div>

    <!-- Mobile: touch tabs + accordion (44px+ targets) -->
    <div class="md:hidden">
      <div role="tablist" class="border-brutal mb-5 flex">
        <button
          v-for="(stage, i) in stages"
          :key="stage.id"
          type="button"
          role="tab"
          :aria-selected="activeTab === stage.id"
          class="min-h-[56px] flex-1 border-0 font-display text-base font-extrabold uppercase"
          :class="[
            i === 0 ? 'border-r-2 border-primary' : '',
            activeTab === stage.id ? 'bg-primary text-on-primary' : 'bg-white text-primary',
          ]"
          @click="selectTab(stage.id)"
        >{{ stage.label }}</button>
      </div>

      <div class="flex flex-col gap-3">
        <article v-for="slot in props.slotsFor(activeTab)" :key="slot.id" class="border-brutal bg-white">
          <button
            type="button"
            :aria-expanded="openSlot === slot.id"
            :aria-controls="`panel-` + slot.id"
            class="flex min-h-[64px] w-full items-center gap-3.5 border-0 bg-transparent p-4 text-left"
            @click="toggle(slot.id)"
          >
            <span class="min-w-[52px] font-mono text-[13px] font-bold tracking-[0.08em]">{{ slot.start }}</span>
            <span class="flex-1 font-display text-[20px] font-extrabold uppercase leading-[1.05]">{{ slot.band.name }}</span>
            <span class="font-mono text-[20px] font-bold leading-none">{{ openSlot === slot.id ? '–' : '+' }}</span>
          </button>
          <div v-if="openSlot === slot.id" :id="`panel-` + slot.id" class="flex flex-col gap-3 border-t-2 border-primary p-4">
            <p class="m-0 text-body-md">{{ slot.band.blurb }}</p>
            <div class="flex flex-wrap gap-2">
              <span class="chip !border-primary">{{ slot.band.genre }}</span>
              <span class="chip !border-primary">{{ slot.role }}</span>
              <span class="chip !border-primary">{{ slot.window }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
