---
name: Starks Moto
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#bcc9ce'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#869398'
  outline-variant: '#3d494d'
  surface-tint: '#F61212'
  primary: '#F61212'
  primary-dark: '#b30d0d'
  on-primary: '#ffffff'
  primary-container: '#F61212'
  on-primary-container: '#ffffff'
  inverse-primary: '#F61212'
  secondary: '#c8c6c9'
  on-secondary: '#303033'
  secondary-container: '#47464a'
  on-secondary-container: '#b6b4b8'
  tertiary: '#50d7f3'
  on-tertiary: '#00363f'
  tertiary-container: '#12b5d0'
  on-tertiary-container: '#00414d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#F61212'
  primary-fixed-dim: '#F61212'
  on-primary-fixed: '#ffffff'
  on-primary-fixed-variant: '#ffffff'
  secondary-fixed: '#e4e1e5'
  secondary-fixed-dim: '#c8c6c9'
  on-secondary-fixed: '#1b1b1e'
  on-secondary-fixed-variant: '#47464a'
  tertiary-fixed: '#a8edff'
  tertiary-fixed-dim: '#50d7f3'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5b'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
  surface-card: '#1C1C1C'
  text-high-emphasis: '#FFFFFF'
  text-low-emphasis: '#EDEDED'
typography:
  display-xl:
    fontFamily: Montserrat
    fontSize: 84px
    fontWeight: '900'
    lineHeight: 90px
    letterSpacing: -0.04em
  display-xl-mobile:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '900'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
  headline-md:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-technical:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  cta-text:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 20px
spacing:
  grid-margin: 4rem
  grid-gutter: 1.5rem
  section-gap: 8rem
  content-stack: 1rem
  mobile-margin: 1.25rem
---

## Brand & Style

The design system is engineered for a high-performance motorcycle rental experience under the **STARKS** brand. The brand personality is aggressive, technical, and premium, targeting enthusiasts who value speed, precision, and modern engineering. 

The design style is **High-Contrast / Bold** with a focus on technical precision. It leverages large-scale typography, a dark-mode first aesthetic, and sharp geometric forms to mirror the industrial design of high-end motorcycles. Visuals should prioritize high-action photography with deep shadows and specular highlights, creating a sense of motion even in static layouts.

## Colors

This design system utilizes a "Midnight & Fury Red" palette. The foundation is built on absolute blacks (`#0E0E0E`) and deep slate grays to create a cinematic, immersive environment. 

The primary accent is **Fury Red** (`#F61212`), used exclusively for interactive elements, data visualization, and critical calls to action. This high-chroma red creates an aggressive "power" effect against the dark backgrounds with a secondary darker shade (`#B30D0D`) for hover states. Secondary surfaces use a slightly lighter slate (`#1C1C1C`) to define containers without breaking the dark-mode immersion. Typography is kept to pure white or high-light grays for maximum legibility in high-speed scanning.

## Typography

The typographic hierarchy is designed to be "loud" and efficient. 

- **Headlines:** Use **Montserrat** in ExtraBold or Black weights. Large display sizes should use negative letter-spacing to create a compact, heavy-duty appearance.
- **Body:** **Hanken Grotesk** provides a clean, modern, and highly legible counterpoint to the aggressive headlines.
- **Technical Specs:** **JetBrains Mono** is used for bike specifications (e.g., CC, HP, Torque) to evoke an engineering and telemetry aesthetic.

All Spanish headers should be kept concise. Use uppercase for primary navigation and button labels to reinforce the sporty, authoritative tone.

## Layout & Spacing

The design system employs a **12-column Fluid Grid** for desktop and a **4-column Fluid Grid** for mobile. 

The spacing rhythm is aggressive. Large vertical gaps (`section-gap`) are used between major content blocks to allow the motorcycle photography to "breathe" and maintain a premium feel. Elements within cards or technical blocks use a tight, mathematical 8px-based spacing system. 

Layouts should often be asymmetrical, with text overlays cutting across high-quality product imagery. Bleed layouts (where images touch the edge of the screen) are encouraged for hero sections to maximize the sense of scale.

## Elevation & Depth

Depth is conveyed through **Tonal Layers** and **Subtle Gradients** rather than traditional shadows.

- **Base Layer:** The deepest black (`#0E0E0E`).
- **Mid Layer:** Cards and interactive containers use `#1C1C1C`.
- **Accents:** Inner glows (1px strokes) using a low-opacity version of the Primary Cyan are used to define the edges of active components, mimicking the LED lighting found on modern bikes.
- **Glassmorphism:** Use sparingly for navigation overlays or technical spec overlays on top of imagery, with a `blur` of 20px and 10% opacity white fill. This maintains a high-tech, cockpit-inspired interface.

## Shapes

The shape language is strictly **Sharp (0)**. 

To reflect the aggressive angles of fairings and chassis components, avoid rounded corners. All buttons, image containers, and input fields should utilize 90-degree angles. To add visual interest, "clipped corners" (dog-ear or chamfered cuts) can be used on primary UI elements to reinforce the technical, aerodynamic theme.

## Components

- **Buttons:** Primary buttons are large, sharp-edged blocks of Fury Red (`#F61212`) with white uppercase text. Hover states transition to darker red (`#B30D0D`) with enhanced glow effect `0 0 20px rgba(179, 13, 13, 0.6)` for visual feedback and accessibility.
- **Technical Chips:** Use monospaced labels within thin 1px white borders for motorcycle specs. These should look like data readouts.
- **Cards:** No borders or shadows. Depth is achieved by the `#1C1C1C` background against the `#0E0E0E` canvas.
- **Inputs:** Underlined or fully enclosed in a 1px slate border. Focus state should highlight the border in Fury Red (`#F61212`).
- **Selection/Dates:** For the rental calendar, use high-contrast selection states where the chosen range is a solid red block.
- **Interactive Specs:** Hoverable hotspots on motorcycle images that reveal technical details in a glassmorphic popover.