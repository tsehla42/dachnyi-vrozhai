# Architecture

## Project Structure

dachnyi-vrozhai is a Ukrainian gardening static site built with **Nuxt 4** (app directory convention). It uses `@nuxt/content` for Markdown rendering, Nuxt UI v4 for components, Tailwind CSS v4 for styling, and Pinia for state management.

### Directory Layout

```
├── app/                        # Nuxt 4 app directory
│   ├── components/             # Vue components
│   │   ├── dv/                 # Custom wrappers (Dv prefix)
│   │   ├── svg/                # SVG icon components (Icon<Name>.vue)
│   │   ├── item/               # Generic card/list components
│   │   ├── header/             # Header subcomponents
│   │   ├── content/            # Prose renderer overrides
│   │   └── advices/            # Advice cards
│   ├── composables/            # Vue composables
│   ├── constants/content/      # JSON metadata per section
│   ├── stores/                 # Pinia stores
│   ├── utils/                  # Utility functions and types
│   ├── pages/                  # File-based routing
│   ├── layouts/                # Layout wrappers
│   └── assets/                 # CSS, SCSS, SVG sources
├── content/                    # Markdown articles by section
├── public/                     # Static assets (images, fonts, favicon)
├── nuxt.config.ts              # Nuxt configuration
├── content.config.ts           # Nuxt Content collection schema
└── wrangler.toml               # Cloudflare Workers deploy config
```

### Sections

Six content sections, defined in `SectionsEnum` (`app/utils/types/SectionsTypes.ts`):

| Enum key | Ukrainian label | Transliterated slug |
|---|---|---|
| `ovochi` | Овочі | `ovochi` |
| `yahidniRoslyny` | Ягідні рослини | `yahidni-roslyny` |
| `kvity` | Квіти | `kvity` |
| `shkidnykyIKhvoroby` | Шкідники і хвороби | `shkidnyky-i-khvoroby` |
| `dobryva` | Добрива | `dobryva` |
| `inventar` | Інвентар | `inventar` |

### Routing

- **Catch-all route:** `app/pages/[...slug].vue` handles all content pages
- **Home page:** `app/pages/index.vue` — shows sections accordion, advices list, random article
- **Sitemap:** `app/pages/sitemap.vue` — interactive collapsible tree
- **Prerender seeds:** Section index pages (`/ovochi`, `/kvity`, etc.) are listed in `nuxt.config.ts` → `nitro.prerender.routes`

The `[...slug].vue` page uses `queryCollection('content').path(route.path).first()` to fetch the matching Markdown document. The content collection is defined in `content.config.ts` with optional `section`, `category`, and `article` frontmatter fields.

### Data Flow

JSON metadata → `useSections` composable → Pinia `sectionsStore` → components.

1. **Static JSON files** (`app/constants/content/*.json`) define categories and articles for each section
2. **`useSections()`** (`app/composables/useSections.ts`) lazily imports all 6 JSON files, maps them through `SectionsEnum` + `transliterate()` to build a `sectionsMap` keyed by English section names
3. **`sectionsStore`** (`app/stores/sectionsStore.ts`) holds `sectionsMap` (Record<enumKey, Category[]>) and `contentSections` (ContentSection[])
4. **Components** call `useSections()` to get reactive `sectionsMap` and `contentSections` refs

### Type System

| Type | File | Purpose |
|---|---|---|
| `SectionsEnum` | `app/utils/types/SectionsTypes.ts` | Enum mapping English keys to Ukrainian labels |
| `SectionsMapEN<T>` | same | Record keyed by enum keys |
| `ContentSection` | same | `{ sectionName, sectionLabel, categories }` |
| `Category` | `app/utils/types/CategoryTypes.ts` | `{ categoryName, sectionName, label, to, articles }` |
| `Article` | same | `{ categoryName, sectionName, label, to, articleName }` |

### Composables

| Composable | File | Purpose |
|---|---|---|
| `useSections` | `app/composables/useSections.ts` | Populates Pinia store from JSON, returns reactive refs |
| `useContentArticles` | `app/composables/useContentArticles.ts` | Flattens all articles, provides `getRandomArticlePath()` |
| `useRandom` | `app/composables/useRandom.ts` | Mersenne Twister wrapper, `getRandomInteger()` |
| `useTransliteration` | `app/composables/useTransliteration.ts` | Thin re-export of `transliterate()` |

### Utilities

| File | Exports | Purpose |
|---|---|---|
| `transliteration.utils.ts` | `transliterate()` | Ukrainian → Latin URL slug conversion |
| `image.utils.ts` | `getSectionImageSrc()`, `getCategoryImageSrc()`, `getArticleImageSrc()`, `getImageSrc()` | Build image paths from section/category/article names |
| `randomizer.utils.ts` | `Random` class | Mersenne Twister PRNG implementation |
| `file.utils.ts` | `createFolder()`, `createFile()` | Node.js file system helpers (used in build scripts) |
| `serialize-non-pojos.utils.ts` | `serializeNonPOJOs()` | Deep clone via `structuredClone()` |
| `index.ts` | Barrel re-exports | Import from `~/utils` instead of deep paths |

### Content Pipeline

Content files are committed directly — no generator submodule or build step:
- Markdown articles: `content/{section}/{category}/*.md`
- Category/section descriptions: `content/{section}/index.md`
- JSON metadata: `app/constants/content/*.json` (hand-edited)

See [Content Pipeline](../content/README.md) for the full guide.

### Image Convention

Images live in `public/images/` mirroring the content structure:
- Section images: `public/images/{section}/{section}.jpg`
- Category images: `public/images/{section}/{category}/{category}.jpg`
- Article images: `public/images/{section}/{category}/{article}.jpg`
- Fallback: `public/images/fallback/fallback-200x200.jpg`

Image path construction uses `app/utils/image.utils.ts` helpers.
