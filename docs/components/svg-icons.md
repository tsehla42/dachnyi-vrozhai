# SVG Icon Components

**Directory:** `app/components/svg/`

## File Structure

Each SVG icon is a Vue single-file component following the naming convention `Icon<Name>.vue`. The component wraps raw SVG markup in `<template>` tags. Empty `<script>` and `<style>` blocks should be removed.

### Export Barrel

`app/components/svg/index.ts` re-exports all icons with a `SvgIcon` prefix:

```ts
export { default as SvgIconTomato } from './IconTomato.vue';
export { default as SvgIconLogoDachniy } from './IconLogoDachniy.vue';
```

Nuxt auto-imports these as `<SvgIconTomato>`, `<SvgIconLogoDachniy>`, etc.

### Static SVG Assets

Some SVGs live in `app/assets/svg/` (e.g., `logo-letters-dv.svg`) and are used as CSS `background: url(...)` in components like `Footer.vue`. These are separate from the Vue component icons.

### Section Icons

`app/constants/SvgIconComponentsMap.ts` maps section names to SVG components for dynamic rendering in `Accordion.vue`, `MobileBurgerMenu.vue`, and `sitemap.vue`.

## SVG Masks and Clip-Paths

SVGs exported from Figma often use `<mask>` and `<clipPath>` elements to clip parts of the design.

### What They Do

- **`<mask>`** — A grayscale image that controls visibility. White = visible, black = hidden, gray = semi-transparent. Used in the logo SVGs to clip letter outlines so they only appear inside letter shapes.
- **`<clipPath>`** — Binary clipping: everything inside the path is visible, everything outside is hidden. Used to clip illustrations to stay within bounds.

### How They Are Referenced

Masks and clip-paths are defined in one place but referenced elsewhere via `url(#id)`:

```svg
<mask id="my-mask">
  <!-- mask content -->
</mask>

<path mask="url(#my-mask)" ... />
```

The `id` is the link between definition and usage.

### The Duplicate ID Problem

**SVG `id` attributes must be unique within a document.** When the same Vue SVG component is rendered multiple times on a page, each instance generates the same hardcoded IDs. The browser resolves all `url(#id)` references to the **first** matching element in the DOM, causing masks and clip-paths to apply to the wrong paths.

**Example:** `IconLogoDachniy` was used in both the mobile and desktop headers. Both instances defined `<mask id="path-1-outside-1_307_7467">`. The desktop logo's paths got the mobile logo's mask, corrupting the rendering with thick black strokes.

### The Fix: `useId()`

Use Vue 3.5+'s `useId()` composable to generate unique IDs per component instance:

```vue
<script setup lang="ts">
const uid = useId();
const maskId = `mask-${uid}`;
const clipId = `clip-${uid}`;
</script>

<template>
  <svg>
    <mask :id="maskId">...</mask>
    <path :mask="`url(#${maskId})`" ... />
    <g :clip-path="`url(#${clipId})`">...</g>
    <clipPath :id="clipId">...</clipPath>
  </svg>
</template>
```

### When to Apply This Fix

Apply `useId()` to any SVG component that:
1. Uses `<mask>` or `<clipPath>` with `id` attributes, **AND**
2. Is rendered more than once on the same page (e.g., mobile + desktop layouts, or used in multiple components)

Components that are only ever rendered once do not need this fix, but using `useId()` defensively is harmless and prevents future bugs.

### Currently Affected Components

| Component | Uses masks/clipPath | Uses `useId()` | Rendered multiple times |
|---|---|---|---|
| `IconLogoDachniy.vue` | Yes | Yes | Yes (mobile + desktop header) |
| `IconLogoVrozhai.vue` | Yes | Yes | Yes (mobile + desktop header) |
| `IconLogoLettersOverlappedDV.vue` | Yes | No | No (footer only) |
| `IconLogoLettersDV.vue` | Yes | No | No |
| `IconLogoLetterD.vue` | Yes | No | No |
| `IconLogoLetterV.vue` | Yes | No | No |
| `IconTomato.vue` | Yes | No | Possibly (footer links) |
| `IconBug.vue` | Yes | No | No |
| `IconFlower.vue` | Yes | No | No |
| `IconPickaxe.vue` | Yes | No | No |
| `IconHorizontalCarrotBig.vue` | Yes | No | No |
| `IconVerticalCarrotBig.vue` | Yes | No | No |
| `IconVerticalCarrotSmall.vue` | Yes | No | No |
| `IconBittenHorizontalCarrot.vue` | Yes | No | No |

**Recommendation:** Add `useId()` defensively to all components in the "Yes" column for masks/clipPath, even if they are currently rendered only once. This prevents bugs if the component is reused later.

## Adding New SVG Icons

1. Export from Figma as SVG
2. Save to `app/components/svg/Icon<Name>.vue`
3. Wrap raw SVG in `<template>` tags
4. Remove empty `<script>` and `<style>` blocks
5. Add export to `app/components/svg/index.ts`
6. If the SVG uses `<mask>` or `<clipPath>`, add `useId()` as described above
7. Add section icon mapping to `SvgIconComponentsMap.ts` if needed
