/**
 * Shared ticket-modal state. Backed by `useState` rather than a local `ref`
 * so the header (rendered by the layout) and the page body address the same
 * instance — without either one prop-drilling through the other.
 */
export function useTicketModal(soldOut = false) {
  const modalOpen = useState('ticketModalOpen', () => false)
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
