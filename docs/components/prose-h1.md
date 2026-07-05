# ProseH1 Component

Nuxt Content prose component override that injects hero images below article h1 elements.

## What It Does

`ProseH1.vue` is placed in `app/components/content/` to override `@nuxt/content`'s default h1 rendering. Instead of rendering just the heading, it:

1. Renders the h1 element (with any content passed via slot)
2. Conditionally renders a `NuxtImg` below the h1 if `heroImageSrc` is provided via inject
3. Applies responsive styling: floated left (~400px wide) on desktop, full-width block on mobile
4. Handles missing/broken images with fallback to `fallback-200x200.jpg`

## Architecture

### Provide/Inject Pattern

The component uses Vue's provide/inject to receive the hero image source:

- **Provided by**: `app/pages/[...slug].vue` (only for article pages)
- **Key**: `'heroImageSrc'`
- **Type**: `Ref<string | null>` (ComputedRef)
- **When**: Only article pages (not section/category pages)

```ts
// In [...]slug].vue
const heroImageSrc = computed<string | null>(() => {
  const d = doc.value;
  if (!d?.section) return null;
  if (d.article && d.category) return getArticleImageSrc(d.section, d.category, d.article);
  return null;
});
provide('heroImageSrc', heroImageSrc);
```

### Image Error Handling

The component implements a two-step error handler with a shared `applyFallback` helper (see [image-error-handling.md](../image-error-handling.md)):

```ts
const applyFallback = (img: HTMLImageElement) => {
  img.srcset = '';
  img.src = '/images/fallback/fallback-200x200.jpg';
};

const onImageError = (e: string | Event) => {
  if (!(e instanceof Event)) return;
  const img = e.target as HTMLImageElement | null;
  if (!img || img.src.includes('fallback')) return;
  applyFallback(img);
};
```

### onMounted Pre-hydration Check

Images that fail before Vue hydrates won't fire the `@error` handler. The component catches these in `onMounted`:

```ts
onMounted(() => {
  const img = heroImgRef.value?.$el as HTMLImageElement | undefined;
  if (img?.complete && img.naturalWidth === 0) {
    applyFallback(img);
  }
});
```

## Styling

All styling is done via Tailwind utility classes — there is no `<style>` block.

### Desktop

`float-left w-[400px] max-w-full mr-6 rounded-lg aspect-[4/3]`

### Mobile (max-sm breakpoint)

`max-sm:float-none max-sm:block max-sm:w-full max-sm:max-h-[300px] max-sm:mb-4`

### Fallback state

`:class="isHeroFallback ? 'object-contain bg-[#c8d979]' : 'object-cover'"`

## Image Path Convention

Image sources are derived via utility functions in `app/utils/image.utils.ts`:

- **Article images**: `/images/{section}/{category}/{article}.jpg`
- **Category images**: `/images/{section}/{category}/{category}.jpg`
- **Section images**: `/images/{section}/{section}.jpg`
- **Fallback**: `/images/fallback/fallback-200x200.jpg`

## Related Files

- `app/utils/image.utils.ts` — image path derivers
- `app/pages/[...slug].vue` — provides `heroImageSrc` for articles
- `app/components/content/` — Nuxt Content prose override directory
