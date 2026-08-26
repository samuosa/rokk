import { eventMeta } from '~/data/lineup'

/**
 * The MusicEvent node, shared by the home page and every act detail page so
 * the two cannot describe the same event differently. Dates come from
 * `eventMeta.startIso`/`endIso` — never inlined at a call site.
 *
 * defineEvent() is called here rather than at the call sites: its generic only
 * infers from an inline object literal, so passing a pre-built object in would
 * not typecheck.
 */
export function musicEventNode() {
  return defineEvent({
    // defineEvent defaults to the generic Event; MusicEvent is the narrower
    // type this actually is, and what the old site emitted.
    '@type': 'MusicEvent',
    name: `${eventMeta.title} — ${eventMeta.claim}`,
    description: `${eventMeta.title}: an outdoor punk concert colliding with a tekk rave. ${eventMeta.date}, doors ${eventMeta.doors}, ${eventMeta.venue}.`,
    startDate: eventMeta.startIso,
    endDate: eventMeta.endIso,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: { '@type': 'Place', name: eventMeta.venue },
    organizer: { '@type': 'Organization', name: 'ROKK' },
  })
}
