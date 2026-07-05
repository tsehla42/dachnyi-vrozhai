# Header Section Dropdown — `HeaderSectionDropdown` / `SectionDropdown.vue`

**File:** `app/components/header/SectionDropdown.vue`
**Used by:** `app/components/Header.vue` — one instance per section.

---

## Overview

Each section in the site (Овочі, Квіти, etc.) gets its own `SectionDropdown` in the sticky header bar. The component renders a pill-shaped activator button that drops down a two-level nested menu on hover:

```
[ Овочі ]          ← activator button (NuxtLink to /ovochi)
  ├ Капустяні →    ← category item with sub-menu trigger
  │   ├ Капуста білокачанна
  │   └ …
  ├ Пасльонові →
  └ …
```

---

## Hover Mechanics

Open/close state is controlled by `isOpen` (a `ref<boolean>`), toggled via `@mouseenter` / `@mouseleave` on the outer `.header-section` wrapper div. Because `portal: false` is passed to `DvDropdown`, **all dropdown content (both levels) is rendered inside `.header-section`'s DOM subtree**. This means `mouseleave` on the wrapper only fires when the pointer truly leaves the entire section zone — not when moving between button and dropdown, or between 1st and 2nd level.

### Gap bridging (no dead zones)

**1st level gap** (button → categories):
- `sideOffset: 0` is passed via `:content` so the dropdown container starts immediately at the button's bottom edge.
- `pt-3` (12 px transparent top-padding) on the container creates visual breathing room; the padding area is still inside the container so the pointer stays "in zone".

**2nd level gap** (categories → articles, horizontal):
- `padding-left: 8px` on `[data-side="right"]` containers creates visual spacing to the right without physical gap.
- No `margin-left` is used — that would create a dead zone where `mouseleave` fires.

---

## Stateful Activator Styling

Three visual states for the activator button (`.activator-first-level`):

| State | Classes | Color |
|---|---|---|
| Default | `bg-green-400 border-green-800` | @theme green-400 |
| Hovered / open | `hover:bg-[#FFC793] hover:border-[#2F1701]` / `[&.is-open]:bg-[#FFC793] [&.is-open]:border-[#2F1701]` | Arbitrary hex (#FFC793 = ~orange-300) |
| Active | `[&.active]:bg-[#FFA859] [&.active]:border-[#FD6B15]` | Arbitrary hex (#FFA859 = ~orange-400) |

`.is-open` is applied via `:class="{ 'is-open': isOpen }"` so the button keeps its hover appearance while the cursor is anywhere inside the section zone (even over the dropdown items). `.active` is declared last in CSS so it always wins over `.is-open`.

---

## Data Shape

Items are built in the `sectionCategories` computed from the Pinia store (`sectionsStore` → `contentSections`):

```ts
// First level: categories
[{
  label: 'Капустяні',
  to: '/ovochi/kapustiani',
  children: [[         // Second level: articles (undefined if empty)
    { label: 'Капуста білокачанна', to: '/ovochi/kapustiani/kapusta-bilokachanna' },
    …
  ]],
}]
```

Sections with no articles in a category (e.g. `inventar`) get `children: undefined` so no sub-menu trigger is rendered.

---

## Styling

| Selector / Key | Location | Purpose |
|---|---|---|
| `.activator-first-level` | Template `class=""` | Pill-shaped section button — all Tailwind inline |
| `.category-dropdown-container` | `dropdownUi.content` Tailwind | Outer `UDropdownMenu` content wrapper (both levels) |
| `.category-dropdown-container[data-side="right"]` | `<style>` SCSS | Sub-menu containers only — resets `pt-3`, adds `pl-8` gap |
| `dropdownUi.item` | Tailwind utility string | Each menu item — green bg/border, hover/active states, rounded corners, full-width `<a>` |

Font family for all text is `font-primary` (Anime Ace), applied to the item element and all children via `[&_*]:font-primary` in the `dropdownUi.item` Tailwind string.

### `dropdownUi.item` breakdown

```
bg-green-400 border-3 border-green-800         → default green bg + border
transition-all duration-100                    → smooth state transitions
first-of-type:rounded-tr-[18px]                → top-right radius on first item
last-of-type:rounded-b-[18px]                  → bottom radius on last item
hover:bg-orange-300 hover:border-orange-900    → hover state
has-[.active]:bg-orange-400 has-[.active]:border-orange-700  → router-active child
[&_a]:w-full                                   → <a> fills full button width (makes whole row clickable)
[&_*]:font-primary                             → enforce font on all children
```

`dropdownUi.item` uses `@theme` tokens from `app/assets/css/tailwind.css` — `--color-green-400`, `--color-orange-300`, etc. — which generate standard Tailwind utilities automatically. The activator button (`.activator-first-level`) uses arbitrary hex values for hover/active states because those specific shades are not defined in `@theme`.

---

## SCSS → Tailwind migration guide

This project uses **Tailwind v4** with `@theme` for all custom colors and fonts. When migrating SCSS from `<style>` blocks or mixins to `dropdownUi` Tailwind strings, use this pattern:

| SCSS | Tailwind |
|---|---|
| `background-color: $green-400` | `bg-green-400` |
| `border: 3px solid $green-800` | `border-3 border-green-800` |
| `transition: all 0.1s` | `transition-all duration-100` |
| `border-radius: 0 18px 0 0` (top-right only) | `rounded-tr-[18px]` |
| `border-radius: 0 0 18px 18px` (bottom) | `rounded-b-[18px]` |
| `&:first-of-type { ... }` | `first-of-type:...` |
| `&:last-of-type { ... }` | `last-of-type:...` |
| `&:hover { bg; border }` | `hover:bg-* hover:border-*` |
| `&:has(.active) { ... }` | `has-[.active]:...` |
| `& a { width: 100% }` | `[&_a]:w-full` |
| `& * { font-family: ... }` | `[&_*]:font-primary` |
| `font-family: $font-family-primary` | `font-primary` |
| `font-size: clamp(...)` | `text-[clamp(...)]` |

**SCSS must remain** for:
- Pseudo-elements (`&::before`, `&::after`)
- Complex selectors that Tailwind can't express (e.g. `[data-side="right"]` attribute selectors)

---

## `dropdownUi` object

Passed as `:ui` to `DvDropdown` → `UDropdownMenu`. Keys map to Nuxt UI v4 slot names:

```ts
const dropdownUi = {
  content: '…',          // outer positioned container
  viewport: '…',         // scrollable list container
  group: '…',            // item group wrapper
  item: '…',             // <li> per item
  itemWrapper: '…',      // inner clickable element
};
```
