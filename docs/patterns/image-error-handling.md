# Image Error Handling — NuxtImg Fallback Pattern

## The Bug (and Why It Loops)

When a `NuxtImg` component fails to load (404), the browser fires the `error` event.
A naïve handler looks like:

```ts
// ❌ BROKEN — causes infinite loop
img.src = '/images/fallback/fallback-200x200.jpg';
```

This loops infinitely because:

1. NuxtImg always renders a `srcset` attribute pointing to the original broken URL.
2. The handler sets `src` to fallback.
3. The browser re-evaluates `srcset` (which takes priority over `src`) → fetches the broken URL again → 404 → `@error` fires again.
4. Repeat forever — visible as rapid flashing images in the browser.

## The Fix

Always apply two guards inside any `@error` / `onerror` handler on an `<img>`:

```ts
// ✅ CORRECT
const handleImageError = (e: string | Event) => {
  if (!(e instanceof Event)) return;
  const img = e.target as HTMLImageElement;
  if (img.src.includes('fallback')) return; // already fallback → stop, don't loop
  img.srcset = '';                           // clear srcset so browser won't re-fetch the broken url
  img.src = '/images/fallback/fallback-200x200.jpg';
};
```

**Rule**: `srcset = ''` must come BEFORE setting `src`, and the "already fallback" guard must be first.

## Where This Pattern Is Applied

| File | Handler name | SSR guard |
|---|---|---|
| `app/components/item/Card.vue` | `onImageError` | `onMounted` check |
| `app/components/RandomArticle.vue` | `handleImageError` | `<ClientOnly>` wrapper |
| `app/pages/[...slug].vue` | `onHeroImageError` | `onMounted` check |
| `app/components/content/ProseH1.vue` | `onImageError` | `onMounted` check |

> **Note**: `RandomArticle.vue`'s `handleImageError` is missing the `img.src.includes('fallback')` early-return guard. This is safe because the component is always wrapped in `<ClientOnly>` and never SSR-rendered, so the infinite-refetch loop cannot occur. However, adding the guard would still be good practice for defense in depth.

## When Adding a New Image Component

Any `NuxtImg` (or plain `<img>`) that uses `@error` for fallback **must** follow the pattern above.
Missing either step (`srcset = ''` or the early-return guard) will cause the infinite-refetch loop.

## Why NuxtImg Makes This Tricky

`NuxtImg` always emits a `srcset` attribute on the rendered `<img>` element, even if you only set `src` on the Vue component. The component's `@error` event does fire, but the underlying `<img>` still has `srcset`. Setting `img.src` inside the handler is not enough on its own.

## SSR Hydration Race Condition

On a full page load (SSR), the browser parses server-rendered HTML and starts fetching images **before** Vue hydrates. A missing image fires the `error` event during this pre-hydration window — **before** `@error` listeners are attached — so the handler is never called and the card shows a broken image icon.

On client-side navigation, Vue creates the DOM and attaches listeners before the image fetch completes, so `@error` fires correctly.

**Two strategies to fix this:**

### Option A: `onMounted` check (for SSR components)

Used in `item/Card.vue`. After hydration, check if the image already failed:

```ts
const imgRef = ref<ComponentPublicInstance | null>(null);

onMounted(() => {
  const img = imgRef.value?.$el as HTMLImageElement | undefined;
  if (img?.complete && img.naturalWidth === 0) {
    applyFallback(img); // same function as the @error handler
  }
});
```

In the template: `<NuxtImg ref="imgRef" @error="onImageError" ... />`

### Option B: `<ClientOnly>` wrapper (skip SSR entirely)

Used for `RandomArticle`. The component is not server-rendered at all, so the race condition cannot occur. Suitable for components where SSR is not needed.

```html
<ClientOnly>
  <RandomArticle />
</ClientOnly>
```

**Rule**: Any SSR component with `NuxtImg` and an `@error` fallback **must** use Option A. Option B is only appropriate when the whole component can be deferred to client-side rendering.
