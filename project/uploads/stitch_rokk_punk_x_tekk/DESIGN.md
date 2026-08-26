---
name: Rokk Punk X Tekk
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1b1b1b'
  on-surface-variant: '#4c4546'
  inverse-surface: '#303030'
  inverse-on-surface: '#f1f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dfe0e0'
  on-secondary-container: '#616363'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#410000'
  on-tertiary-container: '#ff291a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#ffdad4'
  tertiary-fixed-dim: '#ffb4a8'
  on-tertiary-fixed: '#410000'
  on-tertiary-fixed-variant: '#930100'
  background: '#f9f9f9'
  on-background: '#1b1b1b'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Anybody
    fontSize: 80px
    fontWeight: '900'
    lineHeight: 72px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Anybody
    fontSize: 48px
    fontWeight: '900'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Anybody
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Anybody
    fontSize: 24px
    fontWeight: '800'
    lineHeight: 28px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  border-thick: 4px
  border-thin: 2px
---

## Brand & Style

The design system is a manifestation of industrial rebellion meeting sophisticated "Achsamkeit" (awareness). It bridges the raw, unrefined energy of underground punk with the precision of modern techno culture. The aesthetic is rooted in **Refined Brutalism**: a high-contrast, stark environment that prioritizes structural integrity and aggressive clarity.

The target audience consists of inclusive, high-energy individuals who value both the intensity of the subculture and the deliberate focus of a minimalist lifestyle. The UI should evoke a sense of urgency and power through heavy ink-traps and thick borders, while maintaining a premium feel through expansive whitespace and razor-sharp alignment.

## Colors

This design system utilizes a binary palette of **Deep Black (#000000)** and **Stark White (#FFFFFF)**. This 100% contrast ratio is non-negotiable to maintain the industrial authority of the brand.

- **Primary Black:** Used for all structural elements, borders, and typography. It represents the "Tekk" precision.
- **Secondary White:** The canvas. Heavy whitespace is used to emphasize the "Achsamkeit" (awareness) aspect, giving the aggressive elements room to breathe.
- **Accent (Optional):** Pure Red (#FF0000) may be used sparingly for high-alert "Awareness" (Achsamkeit) notifications or critical call-to-actions, maintaining the punk urgency.

## Typography

The typography system is a clash of two worlds. **Anybody** provides a variable, aggressive display presence with ultra-bold weights that mimic stencil-like impact. This is contrasted by **Hanken Grotesk**, a sharp, contemporary sans-serif used for body information to ensure sophistication and readability.

For technical details and metadata, **JetBrains Mono** is utilized to reinforce the "Tekk" industrial influence. All display type should be set with tight leading and negative tracking to create dense "blocks" of text that feel like physical objects.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy with a rigid 12-column structure on desktop. Spacing is strictly mathematical, based on a 4px baseline unit. 

- **Margins:** Generous outer margins (64px+) are required to contrast with the dense internal content.
- **Gutters:** 24px gutters ensure that even with heavy 4px borders, elements do not visually merge.
- **Alignment:** Elements should be "hard-aligned" to the grid. There are no soft offsets. Content blocks should feel like heavy slabs stacked within the viewport.

## Elevation & Depth

This design system rejects shadows and gradients entirely. Depth is achieved through **Bold Borders** and **Inversion**.

1.  **Structural Borders:** Use 4px black borders for primary containers and 2px for internal dividers.
2.  **High-Contrast Layering:** Overlapping elements should use a "stark white" fill with a "thick black" border to cut through the background.
3.  **Active States:** Depth is simulated by inverting the color of the element (e.g., a white button with black text becomes a black button with white text on hover). This "flash" effect mimics the strobe lighting of a techno event.

## Shapes

The shape language is strictly **Sharp (0px)**. There are no rounded corners in the design system. Every button, input field, card, and image container must have 90-degree angles. This reinforces the industrial, brutalist aesthetic and the uncompromising nature of the brand.

## Components

- **Buttons:** Rectangular with a 4px solid black border. Text is centered, uppercase JetBrains Mono. Primary buttons utilize a black fill with white text; secondary buttons utilize a white fill with black text.
- **Input Fields:** A 2px bottom border only for a minimalist look, or a full 2px border for a more industrial feel. Labels must be uppercase and positioned above the field.
- **Cards:** Heavy 4px borders with no padding on image containers—images should bleed to the edge of the border.
- **Chips/Tags:** Small rectangular boxes with 2px borders. Use these for music genres (e.g., TEKK, PUNK) or event tags.
- **Awareness (Achsamkeit) Bar:** A persistent, high-contrast footer or header bar with 4px borders containing scrolling ticker-tape text (using Anybody font) for vital event safety information.
- **Checkboxes:** Square boxes with a thick "X" used as the checked state, reinforcing the punk aesthetic over a standard checkmark.