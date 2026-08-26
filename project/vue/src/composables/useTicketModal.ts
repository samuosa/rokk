import { computed, ref } from 'vue'

/** Shared ticket-modal state so every page (not just the home page) can open checkout. */
export function useTicketModal(soldOut = false) {
  const modalOpen = ref(false)
  const ctaLabel = computed(() => (soldOut ? 'WAITLIST' : 'TICKETS'))
  const checkoutLabel = computed(() => (soldOut ? 'JOIN WAITLIST' : 'GO TO CHECKOUT'))

  return {
    modalOpen,
    ctaLabel,
    checkoutLabel,
    open: () => { modalOpen.value = true },
    close: () => { modalOpen.value = false },
  }
}
