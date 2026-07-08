# Content Pipeline

## Overview

Content is stored as Markdown files in `content/` and hand-edited JSON metadata in `app/constants/content/`. There is no generator submodule or external build step — files are committed directly to the repository.

## File Structure

content/
├── ovochi/                          # Section: Овочі
│   ├── index.md                     # Section description
│   ├── kapustiani/                  # Category
│   │   ├── index.md                 # Category description
│   │   ├── kapusta-bilokachanna.md  # Article
│   │   └── ...
│   ├── bobovi/
│   └── ...
├── kvity/
├── yahidni-roslyny/                 # Flat section (no subcategories)
├── shkidnyky-i-khvoroby/
├── dobryva/
└── inventar/                        # Flat section (articles at top level)

### Naming Convention

- Sections use transliterated Ukrainian names: `ovochi`, `kvity`, `yahidni-roslyny`
- Categories use transliterated names: `kapustiani`, `bobovi`, `harbuzovi`
- Articles use transliterated names: `kapusta-bilokachanna`, `pomidor`
- All slugs are generated via `transliterate()` from `app/utils/transliteration.utils.ts`

## Markdown Frontmatter

The Nuxt Content collection schema (`content.config.ts`) defines three optional fields:

```yaml
---
section: ovochi              # Transliterated section name
category: kapustiani         # Transliterated category name (absent for section index)
article: kapusta-bilokachanna # Transliterated article name (absent for category/section pages)
---
```

The `[...slug].vue` page uses these fields to determine page type (section listing, category listing, or article) and to construct image paths.

## JSON Metadata

Each section has a JSON file at `app/constants/content/{section}.json`:

```json
[
  {
    "categoryName": "kapustiani",
    "sectionName": "ovochi",
    "label": "Капустяні",
    "to": "/ovochi/kapustiani",
    "articles": [
      {
        "categoryName": "kapustiani",
        "sectionName": "ovochi",
        "label": "Капуста білокачанна",
        "to": "/ovochi/kapustiani/kapusta-bilokachanna",
        "articleName": "kapusta-bilokachanna"
      }
    ]
  }
]
```

These JSON files are imported statically by `useSections` and `useContentArticles` composables. They define the navigation structure (category cards, article links, dropdown menus).

## Adding New Content

### New Article

1. Create Markdown file: `content/{section}/{category}/{article-name}.md`
2. Add frontmatter with `section`, `category`, `article` fields
3. Add article entry to the category's array in `app/constants/content/{section}.json`
4. Add image to `public/images/{section}/{category}/{article-name}.jpg`
5. Run `npm run generate` to verify prerendering

### New Category

1. Create directory: `content/{section}/{category-name}/`
2. Create `index.md` with frontmatter `section` and `category` fields
3. Add category entry to `app/constants/content/{section}.json`
4. Add category image to `public/images/{section}/{category-name}/{category-name}.jpg`
5. Add route to `nuxt.config.ts` → `nitro.prerender.routes` if needed

### New Section

1. Create directory: `content/{section-name}/`
2. Add section to `SectionsEnum` in `app/utils/types/SectionsTypes.ts`
3. Create JSON file at `app/constants/content/{section-name}.json`
4. Add static import in `app/composables/useSections.ts` and `app/composables/useContentArticles.ts`
5. Add route to `nuxt.config.ts` → `nitro.prerender.routes`
6. Add section image to `public/images/{section-name}/{section-name}.jpg`

## Image Convention

Images mirror the content structure under `public/images/`:

| Content | Image path |
|---|---|
| Section page | `public/images/{section}/{section}.jpg` |
| Category page | `public/images/{section}/{category}/{category}.jpg` |
| Article page | `public/images/{section}/{category}/{article}.jpg` |

Fallback image: `public/images/fallback/fallback-200x200.jpg`

Image paths are constructed by `app/utils/image.utils.ts` helpers.
