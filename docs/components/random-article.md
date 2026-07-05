# RandomArticle Component

**File:** `app/components/RandomArticle.vue`

## Purpose

Displays a 5×3 grid of 15 random article thumbnails on the homepage. When clicked, runs a slot-machine highlight animation that lands on a pre-selected article, then expands that card via FLIP animation to fill the component and navigates to the article page.

## Animation Flow

1. `getRandomArticle()` called on click — pre-selects `randomArticleId`, hides label, starts animation
2. `animateCards()` — highlight sweeps left-to-right across all 15 cards, loops `maxAnimationPlays` times (1–3, random)
3. Animation lands on `randomArticleId` → `animateSelectedCard()` fires:
   - t=200ms: soft dim overlay fades in (`showBackground`)
   - t=800ms: selected card scales to 120% (`scaleSelectedCard`)
   - t=1600ms: FLIP expansion — card smoothly fills container (`expandCardToFullscreen`)
   - t=2400ms: label changes to article name (`selectedLabel` ref updated)
   - t=3400ms: `navigateTo(targetItem.to)` — page navigation

## FLIP Technique (`expandCardToFullscreen`)

1. Read `card.getBoundingClientRect()` and `container.getBoundingClientRect()` (while `scale-[120%]` is applied)
2. Remove `scale-[120%]` class — restore `overflow-hidden`
3. Set `position: absolute` + `top/left/width/height` matching the visual rect (with `transition: none`)
4. Force reflow: `void card.getBoundingClientRect()`
5. Set transition + animate to `top=0, left=0, width=100%, height=100%`
6. `containerRef` (outer `div.group`) is the positioned ancestor — cards in the `article.grid` (static) resolve absolute positioning relative to it

## Reactive Label

- `selectedLabel: ref<string | null>(null)` — null shows debug counter `Випадкова стаття [randomArticleId]`, string shows actual article name
- `animateSelectedCard` snapshots `targetItem` at call time (prevents live-ref mutation bug if user clicks mid-animation)
- Resets to `null` in `resetAllToDefaultState`

## Timeout Safety

All `setTimeout` IDs are pushed to `animationTimeouts` ref; all `setInterval` IDs are pushed to `animationIntervals` ref. `onUnmounted` calls `clearAnimationTimeouts()` to clear both and prevent stale callbacks after component teardown.

## Data Source

Items built at component mount via the `useContentArticles()` composable (line 10):

```ts
const { allArticles } = useContentArticles();
```

- All articles are pooled, Fisher-Yates shuffled, first 15 taken
- `picturePath` constructed as `/images/{sectionName}/{categoryName}/{categoryName}.jpg`
- Missing images (non-ovochi sections) fall back to `/images/fallback/fallback-200x200.jpg` via `handleImageError`

## State

| Ref | Purpose |
|---|---|
| `randomArticleId` | Currently selected article index (0–14); also shown as debug counter |
| `previousRandomArticleId` | Last selected index — used for cleanup on next click |
| `selectedLabel` | null = debug mode; string = shows article name after animation |
| `isAnimationInProgress` | Guard to prevent re-triggering mid-animation |
| `animationTimeouts` | Collected setTimeout IDs for cleanup on unmount |
| `containerRef` | Outer div ref needed for FLIP rect calculation |
| `cardsRefs` | Array of card div refs (one per grid item) |

## Reset

`resetAllToDefaultState()` — called at start of each click:
- Resets animation count
- Removes highlight from **all 15 cards** (not just previous — defensive cleanup)
- Restores `overflow-hidden`, removes scale class (`unscaleSelectedCard`)
- Clears all FLIP inline styles (`clearCardInlineStyles`)
- Resets background overlay (`resetDarkBackground`)
- Clears `selectedLabel`

## Footer Random-Article Link

`app/components/Footer.vue` uses the `useContentArticles()` composable:

```ts
const { getRandomArticlePath } = useContentArticles();
const goToRandomArticle = () => navigateTo(getRandomArticlePath());
```

The "Випадкова сторінка" button picks a random article path on each click — no animation, just immediate navigation. Each click produces a fresh random article independently of the `RandomArticle` component.
