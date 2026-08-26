/** Stage of the event — the two parallel programmes. */
export interface Stage {
  id: StageId
  /** Full display name, e.g. "OUTDOOR PUNK". */
  label: string
  /** Compact label for mobile tabs. */
  short: string
  description: string
}

export type StageId = 'punk' | 'tekk'

/** A performing act. `tba: true` = placeholder slot, name not yet public. */
export interface Band {
  id: string
  name: string
  genre: Genre
  stage: StageId
  blurb: string
  tba: boolean
  links?: { label: string; href: string }[]
}

export type Genre =
  | 'HARDCORE PUNK' | 'STREETPUNK' | 'PUNK ROCK' | 'CRUST'
  | 'TEKK' | 'HARDTEKK' | 'SCHRANZ' | 'HARDTECHNO' | 'DOWNTEMPO' | 'AMBIENT'

/** Role of a slot in the running order. */
export type SlotRole =
  | 'OPENING' | 'LOCAL SUPPORT' | 'SUPPORT' | 'HEADLINER' | 'SPECIAL GUEST'
  | 'RAVE START' | 'B2B SET' | 'PEAK TIME' | 'AFTER PEAK' | 'CLOSING'

/** One entry in the timetable. Times are "HH:mm" local, event-day relative. */
export interface TimeSlot {
  id: string
  /** URL slug for this slot's detail page, e.g. "outdoor-punk-headliner". Unique across all slots. */
  slug: string
  stageId: StageId
  bandId: Band['id']
  start: string
  end: string
  role: SlotRole
}

/** A slot joined with its band + stage — what components actually render. */
export interface ResolvedSlot extends TimeSlot {
  band: Band
  stage: Stage
  /** "21:15–22:15" */
  window: string
}

export interface TicketTier {
  id: string
  name: string
  price: string
  note: string
  soldOut?: boolean
}

export interface EventMeta {
  title: string
  claim: string
  date: string
  doors: string
  venue: string
  awarenessTicker: string[]
}
