# Punk X Tech Event Frontend

_Started 2026-08-26 01:12 UTC_

---

## User

Kopierfertiger AIDA-Prompt für Claude.ai
> [PROMPT START]
> Rolle & Kontext (Attention)
> Du bist ein leitender Frontend-Architekt und Spezialist für Vue 3, Performance-Optimierung und Pre-Rendering. Deine Aufgabe ist es, aus dem beigefügten HTML-/Design-Code eines Google-Stitch-Exports eine modulare, produktionsreife Vue-3-Frontend-Anwendung für das Event Punk X Tech der Marke Rock zu entwickeln.
> Projekt & Input (Interest)
> Ich übergebe dir den Quellcode der Desktop- und Mobil-Variante (code.html / DESIGN.md).
>  * Event-DNA: Raues, kontrastreiches "Punk X Tech"-Branding – Kombination aus energiegeladenem Punk-Design und präziser Tech-Ästhetik.
>  * Kerninhalte: Hero-Bereich, interaktives Band-Line-up, Stage-/Timetable-Slots, Ticket-Call-to-Action und Footer.
>  * Ziel: Die statische Vorlage soll in saubere, reaktive Vue-3-Komponenten überführt werden, die sowohl für HTML Pre-Rendering (SSG) als auch für schnelle Client-Side-Hydration optimiert sind.
> Architektur & Qualitätsstandards (Desire)
> Achte bei der Umsetzung auf folgende Spezifikationen:
>  * Vue 3 Composition API & TypeScript: Verwendung von <script setup lang="ts"> mit getrennten Datenmodellen (Band, Stage, TimeSlot).
>  * Design-Treue & Responsiveness:
>    * Exakte Übernahme der Farbwerte, Typografie und visuellen Hierarchien aus dem beigefügten Code.
>    * Desktop: Paralleles Multi-Column-Grid für Band-Sets und Stages.
>    * Mobil: Touch-optimierte Accordion-/Tab-Struktur für Timetables.
>  * Pre-Rendering & SEO-Fokus:
>    * Semantisches HTML5 (Header, Main, Section, Article) für Crawlbarkeit.
>    * Hydration-sichere Struktur (keine ungeprüften window/document-Aufrufe im Setup).
>  * Interaktivität:
>    * Reaktive Filterung nach Stages/Genres.
>    * Ticket-Modal oder Smooth-Scroll-Logik.
> Handlungsanweisung & Ausgabe (Action)
> Generiere die vollständige Implementierung in dieser Struktur:
>  * TypeScript Interfaces & Mock-Data: Typdefinitionen für Bands, Sets und Timetable.
>  * Vue-Komponenten: Hauptansicht (EventPage.vue) sowie modularisierte Subkomponenten (HeroSection.vue, BandGrid.vue, Timetable.vue, TicketCta.vue).
>  * Styles: Saubere Scoped CSS/SCSS- oder Tailwind-Klassen, die den Stitch-Designvorgaben 1:1 entsprechen.
> Hier ist der Code aus der HTML-Datei:
> [HIER DEN INHALT VON CODE.HTML EINFÜGEN]
> 
> [PROMPT ENDE]
> 
Möchtest du, dass der Prompt direkt auf Tailwind CSS oder Scoped SCSS fokussiert wird, oder soll Claude dir auch das Konfigurationsskript für das Pre-Rendering-Build-Tool (z. B. vite-plugin-prerender) miterstellen?

## Assistant



## Assistant

_[tool: list_files]_

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

Der Stitch-Export enthält kein echtes Line-up und keine Timetable — nur "COMING SOON" und drei Collaborators. Für ein interaktives Band-Grid mit Stage-Filter und Timetable muss ich also Datenstruktur + Inhalte festlegen. Und: dein Prompt zielt auf Vue-3-Quellcode; ich baue hier zuerst die lauffähige, interaktive Seite (Design + Verhalten, 1:1 nach deinen Tokens) und kann daraus das Vue-Paket als Dateien ableiten.

Kurz zu deiner Frage: **Tailwind**, weil dein Stitch-Export bereits eine vollständige Tailwind-Config mit deinen Tokens mitbringt — SCSS wäre eine Neuübersetzung. Prerender-Config würde ich mitliefern, aber als `vite-ssg` statt `vite-plugin-prerender` (letzteres ist Vue-2-Ära/unmaintained).

_[tool: ask_user]_

Warte auf deine Antworten — vor allem Line-up-Daten und Stage-Struktur, damit Filter und Timetable echte Inhalte bekommen.

## User

Answered — deliverable: Beides in einem Zug: Seite + Vue-3-Dateipaket zum Download; lineup_data: Ich liefere die Daten nachträglich — nutze erstmal Platzhalter-Slots mit echter Struktur; stages: 2 Stages: Outdoor Punk + Tekk Rave; styling: Beides: Tailwind + SCSS-Token-Layer; prerender: Ja, vite-ssg

## User

<system-info comment="Only acknowledge these if relevant">
Project title is now "Punk X Tech Frontend-Architektur"
Project currently has 3 file(s)
User is viewing file: Punk X Tekk Event Page.dc.html
Current date is now August 26, 2026
</system-info>

<attached_files>
- uploads/IMG_3765.jpeg
- uploads/IMG_3767.jpeg
- uploads/IMG_3769.jpeg
- uploads/IMG_3755.png
</attached_files>

<!-- The user explicitly selected the following skills for this project, as attachments to their message. These are not optional context — they define how you work. Use them. -->
<attached-skill name="Design System (design system)">
[Design System] This project uses the **Design System** design system. This is a binding choice for visual style — every visual must follow it. Don't invent colors, type, spacing, or components not grounded here.

Scope: the design system is a visual style reference only. Its guide may describe example products, brands, or people that are unrelated to the user and unrelated to the subject of this conversation. Never treat anything in the design system as a fact about the user, their work, or the topic they asked about.

    Explore it to find what you need:
    - Always copy out the fonts and colors you need
    - For prototypes and designs, always copy out any relevant components
    - If the design system contains existing mocks of products, and you were asked to design or prototype something similar, copy and fork those mocks to start your design. This helps you make high-quality designs.

    Explore it quickly to find relevant UI kits (e.g. mocks of existing products you can copy and fork)

Full system at `/projects/b94e4e14-743d-4818-8f0a-6e1827305079/`. Before producing any visuals, explore it: call `list_files("/projects/b94e4e14-743d-4818-8f0a-6e1827305079/")` to see the structure, then `read_file` the README/base.md or whatever index file it has. Don't guess at the design system's contents.

CSS tokens: the guide may describe tokens in prose, but the exact `--*` names are defined in the design system's stylesheet(s). Before writing any `var(--*)`, look up the real name in the design system's `.css` files (`list_files` + `read_file` under `/projects/b94e4e14-743d-4818-8f0a-6e1827305079/`). Never guess a token name — an unresolved `var()` silently falls back to the browser default.

For assets and UI kits beyond the guide: `read_file("/projects/b94e4e14-743d-4818-8f0a-6e1827305079/<path>")` and `copy_files` to bring them into the current project.
</attached-skill>

## Assistant

_[tool: read_file]_

_[tool: read_file]_

_[tool: list_files]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: image_metadata]_

_[tool: image_metadata]_

_[tool: image_metadata]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: copy_files]_

_[tool: update_todos]_

_[tool: dc_write]_

Jetzt das Vue-3-Paket.

_[tool: run_script]_

Jetzt die Komponenten.

_[tool: run_script]_

_[tool: run_script]_

_[tool: copy_files]_

_[tool: present_fs_item_for_download]_

_[tool: update_todos]_

_[tool: ready_for_verification]_

Live-Seite plus Vue-Paket (Zip oben) sind da.

Enthalten: `types/event.ts` (Band, Stage, TimeSlot, ResolvedSlot, TicketTier), `data/lineup.ts` mit TBA-Platzhaltern in Endstruktur, `useLineupFilter` (Stage + Genre reaktiv), `useMediaQuery` (SSG-sicher), Komponenten HeroSection/AwarenessBar/BandGrid/Timetable/AwarenessPanel/CollaboratorList/TicketCta/TicketModal/SiteFooter unter `EventPage.vue`, Tailwind-Config als 1:1-Token-Port plus SCSS-Layer für Keyframes/Brutal-Primitives, `vite.config.ts` mit `ssgOptions` und JSON-LD im Head.

Zwei Punkte für dich:
- Timetable schaltet per CSS-Breakpoint (901px), nicht per JS — deshalb hydratisiert die vorgerenderte Variante ohne Mismatch.
- Line-up-Namen und Zeiten stehen nur in `data/lineup.ts` — echte Bands eintragen, `tba: false` setzen, fertig.

## User

Found issues — fixing…

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Farbe explizit gesetzt: Modal-Close-Button auf `#000`, Accordion-Toggles auf `#1b1b1b`. Die Vue-Komponenten sind davon nicht betroffen (`btn-brutal` und die Accordion-Buttons erben dort aus dem SCSS-Layer).

## User

Erstelle jetzt einen vollständigen proto Typ mit mobil und Desktop Version, Homepage und Ticket Page Specials und lineup Page

## Assistant

_[tool: dc_write]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

Prototyp liegt in `Punk X Tekk Prototype.dc.html` — die alte Einzelseite bleibt unangetastet.

Oben eine Prototyp-Leiste: vier Seiten (HOME / LINE-UP / SPECIALS / TICKETS) und der Umschalter DESKTOP ↔ MOBILE. Beide Modi rendern denselben Markup-Baum in einem 1200px- bzw. 390px-Rahmen — der Layoutwechsel läuft über Container-Queries, also exakt so, wie es im Vue-Build per Breakpoint funktioniert.

Was drin steckt:
- **Home** — Brand-Block, Event-Hero, Awareness-Ticker, Stage-Teaser mit Running Order, Specials-Teaser, Schluss-CTA
- **Line-up** — Stage- und Genre-Filter, Act-Grid, Timetable als Parallel-Grid (Desktop) bzw. Tabs + Accordion (Mobil)
- **Specials** — 8 Programmpunkte mit Kategorie-Filter und Detail-Modal, plus Dresscode-/Consent-Block
- **Tickets** — Mengen-Stepper pro Tier, Add-ons (Shuttle, Camping, Locker, skaliert mit Ticketanzahl), Live-Summary und Bestätigungs-State

Mobil zusätzlich: Statusleiste, Burger-Drawer, sticky Ticket-Bar unten, alle Touch-Targets ≥48px.

Sag mir, welche Seiten du im Vue-Paket als eigene Routen brauchst — dann ziehe ich Specials und Tickets als `/specials` und `/tickets` ins Prerendering.

