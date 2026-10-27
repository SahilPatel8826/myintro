---
name: Cosmic Odyssey HUD
colors:
  surface: '#11131d'
  surface-dim: '#11131d'
  surface-bright: '#373944'
  surface-container-lowest: '#0b0e18'
  surface-container-low: '#191b26'
  surface-container: '#1d1f2a'
  surface-container-high: '#272935'
  surface-container-highest: '#323440'
  on-surface: '#e1e1f1'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#e1e1f1'
  inverse-on-surface: '#2e303b'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#fbabff'
  on-tertiary: '#580065'
  tertiary-container: '#e14ef6'
  on-tertiary-container: '#4d0059'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#ffd6fd'
  tertiary-fixed-dim: '#fbabff'
  on-tertiary-fixed: '#36003e'
  on-tertiary-fixed-variant: '#7c008e'
  background: '#11131d'
  on-background: '#e1e1f1'
  surface-variant: '#323440'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.03em
  display-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  title-lg:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-hud:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.15em
  label-code:
    fontFamily: Space Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
---

## Brand & Style
The design system positions the developer portfolio as an interactive interstellar expedition. Designed for forward-thinking tech leads, Web3 founders, and high-impact design engineering recruiters, the experience evokes wonder, precision, and technical mastery. 

The aesthetic fuses **Refined Sci-Fi Glassmorphism** with **Avionic Mission HUD Elements**. Visual weight is achieved through deep-space volumetric darkness offset by focused photon bursts, orbital geometries, and ultra-thin light-piped boundaries. Content layers simulate high-precision flight telemetry—tactile, clean, and highly legible without degenerating into chaotic retro-arcade tropes.

## Colors
The palette is built directly from the void of deep space and illuminated by atmospheric ionized radiation:

- **Void Neutrals (`#070913`, `#0b0f1d`, `#161b30`):** Pure near-blacks and midnight navy bases serve as infinite backgrounds, absorbing ambient light and letting 3D models float effortlessly.
- **Electric Violet (`#8b5cf6` / `#7c3aed`):** The primary interaction hue, representing warp energy, high-priority actions, active tabs, and primary navigational paths.
- **Neon Cyan (`#06b6d4` / `#22d3ee`):** The telemetry secondary color, employed for system readiness, live data points, target reticles, and numeric telemetry.
- **Cosmic Magenta (`#d946ef` / `#ec4899`):** Accent energy utilized for critical milestones, rare portfolio items, and orbital highlights.
- **Starlight Highlights (`#ffffff`, `rgba(255, 255, 255, 0.7)`): Pure white core bursts and high-contrast typography ensuring maximum WCAG AA readability over dark canvases.

## Typography
Typography creates a stark balance between human readability and mechanical precision:

- **Headline Display (`Space Grotesk`):** Confident, geometric, with slight optical quirks reminiscent of mid-century aeronautics and modern astrophysics journals.
- **Body & Editorial (`Plus Jakarta Sans`):** Soft, balanced, and exceptionally readable across prolonged dark-mode reading sessions.
- **Telemetry & Labels (`Space Mono`):** Monospaced, all-caps metadata designating coordinates, telemetry stats, terminal commands, and tactical indices.

## Layout & Spacing
The layout follows a 12-column fluid grid system on desktop (`max-width: 1440px`), collapsing to 8 columns on tablet, and 4 columns on mobile. 

Generous canvas margins preserve celestial breathing room, allowing central 3D viewports and orbital planetary canvas elements to anchor the user's focus. Content reflow prioritizes fixed HUD rails (such as coordinate tickers, vertical section anchors, and mission status chips) anchored to the viewport frame, while primary portfolio modules scroll effortlessly over the ambient cosmos.

## Shapes
Surfaces use a curated **Rounded (`8px` base, `16px` for cards, `24px` for HUD capsules)** contour geometry to soften technical harshness into a futuristic consumer experience. Buttons, interactive pills, and filter chips utilize full capsule pill shapes (`9999px`) to emphasize aerospace ergonomic cockpit switchgear.

## Components

- **Buttons:**
  - *Primary Warp CTA:* Electric violet background (`#8b5cf6`), white label, pill radius, accompanied by an interior radial highlight and soft ambient aura (`box-shadow: 0 0 20px rgba(139, 92, 246, 0.45)`).
  - *HUD Secondary:* Frosted translucent slate surface (`rgba(255, 255, 255, 0.05)`), border `1px solid rgba(255, 255, 255, 0.15)`, transitioning to neon cyan border and text glow upon hover.
- **Glassmorphic Cards:**
  - Double-layered glass container with subtle gradient border tracing. Features chamfered HUD ticks or orbital alignment lines in upper corner modules.
- **Input Fields & Search Modules:**
  - Flat base with translucent background (`rgba(11, 15, 29, 0.8)`), subtle bottom glowing track, Space Mono metadata prefix (e.g., `// INPUT_QUERY`), and a circular gradient search lens trigger.
- **Chips & Status Indicators:**
  - Micro-capsules containing blinking status pulses (e.g., green/cyan for `SYSTEM: ONLINE`, violet for `STAGE: ACTIVE`).
- **Telemetry HUD Metric Blocks:**
  - High-contrast stat counters paired with mono-spaced coordinate indices, angled slash delimiters (`///`), and orbital ring progress indicators.