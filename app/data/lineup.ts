import type { Band, EventMeta, ResolvedSlot, Stage, TicketTier, TimeSlot } from '~/types/event'

export const eventMeta: EventMeta = {
  title: 'PUNK X TEKK',
  claim: 'COLLISION OF SUBCULTURES',
  date: 'SAT / OCT 26',
  // NOTE: 2026-10-26 is a Monday, so this contradicts the "SAT" in `date`
  // above. Oct 26 last fell on a Saturday in 2024 and next does in 2030 —
  // set the real year here and the JSON-LD follows automatically.
  startIso: '2026-10-26T18:00:00+02:00',
  endIso: '2026-10-27T08:00:00+02:00',
  doors: '18:00 — 08:00',
  venue: 'SECRET LOCATION',
  awarenessTicker: [
    'NO RACISM', 'NO SEXISM', 'NO HOMOPHOBIA',
    'OPEN SPACE', 'MERGING SUBCULTURES', 'RESPECT THE VIBE',
  ],
}

export const stages: Stage[] = [
  {
    id: 'punk',
    label: 'OUTDOOR PUNK',
    short: 'PUNK',
    description: 'Raw, unfiltered punk energy in an open-air setting. Mosh pits, distorted guitars, unapologetic attitude.',
  },
  {
    id: 'tekk',
    label: 'TEKK RAVE',
    short: 'TEKK',
    description: 'Relentless BPM, industrial sounds and heavy basslines moving into the night.',
  },
]

/** Placeholder acts keep the final data shape — swap `name`/`tba` on confirmation. */
export const bands: Band[] = [
  { id: 'b-doors', name: 'DOORS', genre: 'AMBIENT', stage: 'punk', tba: false, blurb: 'Gates open, soundcheck bleeds into the field. Merch and awareness desk are already staffed.' },
  { id: 'b-p1', name: 'TBA', genre: 'HARDCORE PUNK', stage: 'punk', tba: true, blurb: 'Local support slot. Confirmed act announced four weeks before doors.' },
  { id: 'b-p2', name: 'TBA', genre: 'STREETPUNK', stage: 'punk', tba: true, blurb: 'Second support slot, reserved for a touring band from the regional DIY circuit.' },
  { id: 'b-p3', name: 'TBA', genre: 'PUNK ROCK', stage: 'punk', tba: true, blurb: 'Headline slot. The one name we are not allowed to print yet.' },
  { id: 'b-p4', name: 'TBA', genre: 'CRUST', stage: 'punk', tba: true, blurb: 'Late outdoor set before the field closes and everything moves inside.' },
  { id: 'b-t1', name: 'SDWA5 SOUNDSYSTEM', genre: 'TEKK', stage: 'tekk', tba: false, blurb: 'Own rig, own rules. Sixteen stacks aimed at the concrete, warming the room from the floor up.' },
  { id: 'b-t2', name: 'TBA', genre: 'HARDTEKK', stage: 'tekk', tba: true, blurb: 'Back-to-back slot. Two names, one deck, announced with the second lineup drop.' },
  { id: 'b-t3', name: 'GIFTGRUBE', genre: 'SCHRANZ', stage: 'tekk', tba: false, blurb: 'Peak time. Relentless kicks, industrial loops, no melodic escape route.' },
  { id: 'b-t4', name: 'BPM BERLIN', genre: 'HARDTECHNO', stage: 'tekk', tba: false, blurb: 'The stretch where the room thins out and the regulars take over the front.' },
  { id: 'b-t5', name: 'TBA', genre: 'DOWNTEMPO', stage: 'tekk', tba: true, blurb: 'Closing set into daylight. Slow, dubby, forgiving.' },
]

export const timeSlots: TimeSlot[] = [
  { id: 's1', slug: 'doors', stageId: 'punk', bandId: 'b-doors', start: '18:00', end: '19:00', role: 'OPENING' },
  { id: 's2', slug: 'outdoor-punk-local-support', stageId: 'punk', bandId: 'b-p1', start: '19:00', end: '19:45', role: 'LOCAL SUPPORT' },
  { id: 's3', slug: 'outdoor-punk-support', stageId: 'punk', bandId: 'b-p2', start: '20:00', end: '20:45', role: 'SUPPORT' },
  { id: 's4', slug: 'outdoor-punk-headliner', stageId: 'punk', bandId: 'b-p3', start: '21:15', end: '22:15', role: 'HEADLINER' },
  { id: 's5', slug: 'outdoor-punk-special-guest', stageId: 'punk', bandId: 'b-p4', start: '22:30', end: '23:15', role: 'SPECIAL GUEST' },
  { id: 's6', slug: 'sdwa5-soundsystem', stageId: 'tekk', bandId: 'b-t1', start: '23:00', end: '00:30', role: 'RAVE START' },
  { id: 's7', slug: 'tekk-rave-b2b-set', stageId: 'tekk', bandId: 'b-t2', start: '00:30', end: '02:00', role: 'B2B SET' },
  { id: 's8', slug: 'giftgrube', stageId: 'tekk', bandId: 'b-t3', start: '02:00', end: '04:00', role: 'PEAK TIME' },
  { id: 's9', slug: 'bpm-berlin', stageId: 'tekk', bandId: 'b-t4', start: '04:00', end: '06:00', role: 'AFTER PEAK' },
  { id: 's10', slug: 'tekk-rave-closing', stageId: 'tekk', bandId: 'b-t5', start: '06:00', end: '08:00', role: 'CLOSING' },
]

/** Joins a slot with its band + stage. Pure data, safe to call from vite.config.ts too. */
export function resolveSlots(): ResolvedSlot[] {
  return timeSlots.map((slot) => {
    const band = bands.find((b) => b.id === slot.bandId)!
    const stage = stages.find((s) => s.id === slot.stageId)!
    return { ...slot, band, stage, window: `${slot.start}–${slot.end}` }
  })
}

/** Every slot that is an actual performance (excludes the DOORS/opening slot). */
export function resolveActs(): ResolvedSlot[] {
  return resolveSlots().filter((s) => s.role !== 'OPENING')
}

export function findActBySlug(slug: string): ResolvedSlot | undefined {
  return resolveActs().find((a) => a.slug === slug)
}

export const ticketTiers: TicketTier[] = [
  { id: 'early', name: 'EARLY RIOT', price: '€22', note: 'LIMITED / 200 ONLY' },
  { id: 'regular', name: 'REGULAR', price: '€32', note: 'PRESALE UNTIL OCT 20' },
  { id: 'solidarity', name: 'SOLIDARITY', price: '€45', note: 'FUNDS A FREE TICKET' },
]
