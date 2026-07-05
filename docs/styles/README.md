# Styles

## Overview

The project uses **Tailwind CSS v4** as the primary styling system. A small SCSS layer remains for features Tailwind cannot handle (custom scrollbar, asset URL resolution).

## Tailwind Configuration

Entry point: `app/assets/css/tailwind.css`

Loaded via `nuxt.config.ts` `css` array (first entry). Uses `@tailwindcss/vite` plugin.

### Theme (`@theme`)

| Token | CSS Variable | Purpose |
|---|---|---|
| `font-primary` | `--font-primary` | Anime Ace v05 + fallbacks — headings, section labels |
| `font-secondary` | `--font-secondary` | Montserrat + fallbacks — body text |
| `font-tertiary` | `--font-tertiary` | Calibri + fallbacks — not currently used |
| `green-50`..`green-950` | `--color-green-*` | Secondary palette |
| `orange-50`..`orange-900` | `--color-orange-*` | Primary palette |
| `gray-200`..`gray-950` | `--color-gray-*` | Grayscale |

### Custom Utilities

- `border-3` — 3px border width (via `@utility border-3`)
- `animate-slide-off` / `animate-horizontal-bounce` — custom animations

### Accordion Keyframes

`accordion-down` / `accordion-up` are defined in `tailwind.css` for Reka UI `CollapsibleContent` compatibility.

## SCSS Files

4 files remain in `app/assets/scss/`:

| File | Purpose | Can remove? |
|---|---|---|
| `abstracts/_colors.scss` | SCSS color vars (`$green-600`, etc.) | Only used by `_mixins.scss` internally |
| `abstracts/_mixins.scss` | `custom-scrollbar()` mixin | No — WebKit pseudo-elements have no Tailwind equivalent |
| `main.scss` | Injects mixins globally via `additionalData` | No — provides `custom-scrollbar` to all components |
| `styles.scss` | Global base styles in `@layer base` | No — global element defaults |

### `additionalData` (nuxt.config.ts)

Prepended to every SCSS file processed by Vite:

```scss
@use "@/assets/scss/abstracts/mixins" as *;
```

This makes `custom-scrollbar()` available in any `<style lang="scss">` block without importing.

### Global Base Styles (`styles.scss`)

All wrapped in `@layer base` so Tailwind utilities always win the cascade:

- `body` — font-primary, bg-orange-50, custom-scrollbar
- `page h1-h6` — font-primary, font-weight 400, uppercase
- `h1` / `h2` — font-size 2.5em / 2em
- `a` — text-decoration none
- `p, span, a` — font-secondary
- `.page > p` — margin 1em 0

## CSS Layers

Tailwind v4 uses `@layer` for cascade control:

```
@layer base      ← global resets, element defaults (styles.scss)
@layer components ← component-level styles (not used)
@layer utilities  ← Tailwind utility classes
```

Unlayered CSS beats all layers. Our global styles are in `@layer base` so Tailwind utilities always override them at equal specificity.

## What Cannot Be Tailwind

| Pattern | Reason | Location |
|---|---|---|
| `custom-scrollbar()` | WebKit `::-webkit-scrollbar-*` pseudo-elements | `_mixins.scss`, applied to `body` |
| `background: url(...)` with local assets | Vite resolves asset paths in CSS/SCSS, not in Tailwind class output | `Footer.vue` |
| `-webkit-text-stroke` | No Tailwind equivalent | `Carousel.vue` |
| `.section-body h1 { display: none }` | Targets rendered `ContentRenderer` output | `[...slug].vue` |

## SCSS → Tailwind Mapping (completed)

| SCSS | Tailwind |
|---|---|
| `$green-*` / `$orange-*` / `$gray-*` | `green-*` / `orange-*` / `gray-*` classes |
| `$font-family-primary` | `font-primary` class or `var(--font-primary)` |
| `$font-family-secondary` | `font-secondary` class or `var(--font-secondary)` |
| `@include flex-center` | `flex items-center justify-center` |
| `@include dropdown-style` | `flex flex-col gap-1` |
| `@include section-category-dropdown-link` | Tailwind classes in `dropdownUi` object |
| `router-link-active` color | `[&.router-link-active]:text-orange-300` |
| `font: inherit` | `font-[inherit]` |
| `appearance: none` | `appearance-none` |

## Conventions for New Code

1. **Use Tailwind classes** for all new styling
2. **Do not add new SCSS files** — only `_mixins.scss` should grow (for WebKit pseudo-elements)
3. **Use CSS custom properties** (`var(--color-*)`, `var(--font-*)`) when you need CSS values in `<style>` blocks
4. **Keep `url()` in `<style>`** — Vite resolves asset paths in CSS/SCSS, not in Tailwind arbitrary values
5. **Use `@layer base`** for any new global styles in `styles.scss`
6. **Prefer arbitrary variants** over CSS for pseudo-class targeting: `[&.router-link-active]:`, `[&.is-open]:`
