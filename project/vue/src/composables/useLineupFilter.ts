import { computed, ref } from 'vue'
import { resolveSlots, stages } from '@/data/lineup'
import type { Genre, ResolvedSlot, StageId } from '@/types/event'

export type StageFilter = StageId | 'all'

/** Joins slots with bands + stages and exposes reactive stage/genre filtering. */
export function useLineupFilter() {
  const stageFilter = ref<StageFilter>('all')
  const activeGenres = ref<Genre[]>([])

  const resolved = computed<ResolvedSlot[]>(() => resolveSlots())

  /** Everything that is an actual set (the DOORS slot is not an act). */
  const acts = computed(() => resolved.value.filter((s) => s.role !== 'OPENING'))

  const genres = computed<Genre[]>(() => [...new Set(acts.value.map((s) => s.band.genre))])

  const isVisible = (slot: ResolvedSlot) => {
    if (stageFilter.value !== 'all' && slot.stageId !== stageFilter.value) return false
    if (activeGenres.value.length && !activeGenres.value.includes(slot.band.genre)) return false
    return true
  }

  const visibleActs = computed(() => acts.value.filter(isVisible))

  const slotsByStage = (id: StageId) => resolved.value.filter((s) => s.stageId === id)

  /** Distinct start times, sorted across the night (after-midnight slots last). */
  const timeAxis = computed(() => {
    const norm = (t: string) => {
      const h = Number(t.slice(0, 2))
      return (h < 12 ? h + 24 : h) * 60 + Number(t.slice(3, 5))
    }
    return [...new Set(resolved.value.map((s) => s.start))].sort((a, b) => norm(a) - norm(b))
  })

  const cellAt = (stageId: StageId, time: string) =>
    resolved.value.find((s) => s.stageId === stageId && s.start === time)

  const toggleGenre = (g: Genre) => {
    activeGenres.value = activeGenres.value.includes(g)
      ? activeGenres.value.filter((x) => x !== g)
      : [...activeGenres.value, g]
  }

  const resetFilters = () => { stageFilter.value = 'all'; activeGenres.value = [] }

  return {
    stageFilter, activeGenres, genres, acts, visibleActs, isVisible,
    slotsByStage, timeAxis, cellAt, toggleGenre, resetFilters, stages,
  }
}
