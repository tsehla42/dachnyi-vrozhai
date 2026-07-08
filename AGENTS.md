# Project Overview

This is a gardening website, providing comprehensive information about vegetables, flowers, pests, diseases, fertilizers, and gardening tools. 
It was firstly built with Nuxt 4 to use SSR.
In this project I have a Markdown files in content folder, that represent article or category of website.
In progress of building this website, I understood that SSR is not necessary for this project, 
so I decided to migrate it to a static website.

There are sections, each section has categories, each category has articles.
Sections are represented in the header dropdown menu.

Basic project structure that user sees is like this:

Main page at / shows list of categories (represented by folders in content folder).
When user clicks on category, they are taken to /category/[category-name] page 
that shows list of articles in that category.
When user clicks on article, they are taken to /article/[article-slug] page that shows the article content.


### What was done:
See in `docs/` for project documentation.

## Instructions for AI agents

### Context & Orientation
- Ukrainian gardening static site built with **Nuxt 4** (app directory convention), Nuxt UI v4, Tailwind CSS v4, Pinia, `@nuxt/content`.
- Use `docs/` to understand the project architecture and conventions.
- For generated HTML/CSS/JS output, check `.output/` folder.
- When explaining changes, write in chat — **do not create `.md` files** unless explicitly asked.
- Use **Context7 MCP tools** (`resolve-library-id` → `query-docs`) to get actual information from documentation. Do this when working with '@nuxt/ui', '@nuxt/image', '@nuxt/content' and other libs.
- Use **SearXNG MCP tools** to browse the web efficiently.
- If you need to clarify intent or ask user a question, use the `AskUserQuestion` tool.
- When using `superpowers` skillset, always use `AskUserQuestion` tool instead of asking questions in plaintext as instructed in `brainstorming` skill. This is a user request and it has higher priority over skills instructions.
- When using `superpowers:writing-plans` at the end, ask user which approach he wants via `AskUserQuestion` tool and never breaking the answer.


### Architecture: Content Pipeline
Content files are committed directly to the repository — there is no generator submodule or build step:
- Markdown articles live in `content/{section}/*.md` and category descriptions in `content/{section}/index.md`.
- JSON metadata lives in `app/constants/content/*.json` and is hand-edited when adding or updating content.
- Edit these files directly and commit the changes.

### Utils
- `app/utils/` files follow `*.utils.ts` naming (`file.utils.ts`, `image.utils.ts`, `randomizer.utils.ts`, `transliteration.utils.ts`, etc.).
- Import from the barrel: `import { transliterate } from '~/utils'` instead of deep paths.
- `ItemCard` (`app/components/item/Card.vue`) and `ItemList` (`app/components/item/List.vue`) are the generic card/grid components used for both categories and article links.

### Architecture: Runtime Data Flow
JSON files → `useSections` composable (`app/composables/useSections.ts`) → Pinia `sectionsStore` (`app/stores/sectionsStore.ts`) → components.
- The six sections are: `ovochi`, `yahidni-roslyny`, `kvity`, `shkidnyky-i-khvoroby`, `dobryva`, `inventar` (keys are English transliterations of Ukrainian names).
- `SectionsEnum` in `app/utils/types/SectionsTypes.ts` is the single source of truth for section names.
- `useSections()` lazily populates the store from statically imported JSON (guarded by `if (!store.sectionsMap)`) — safe to call in any component that needs sections data (currently: `Header`, `Accordion`, sections list).

### UI Conventions
- **Nuxt UI v4 API** — `UDropdownMenu` (not `UDropdown`); slots renamed: `content/viewport/group/item` (not `wrapper/trigger/container`). Check CHANGELOG for migration notes before using old patterns.
- Custom wrappers live in `app/components/dv/` with a `Dv` prefix (e.g., `DvDropdown`, `DvButton`). Prefer these over raw Nuxt UI components.
- **SCSS abstracts** (`app/assets/scss/abstracts/`) are globally auto-injected via `vite.css.preprocessorOptions.scss.additionalData` in `nuxt.config.ts` — colors, fonts, and mixins are available in every component without importing.
- **Declarative classes** — Always add descriptive classes to major layout elements for quick identification in devtools and code review. Examples: `mobile-header`, `desktop-footer`, `sitemap-page-logo`, `burger-menu-overlay`. Use kebab-case, prefix with context (e.g., `mobile-`, `desktop-`, page name).
- **SVG icons** — Export from Figma as SVG, save to `app/components/svg/Icon<Name>.vue`. Wrap raw SVG in `<template>` tags. Follow naming convention: `Icon<Name>.vue` (e.g., `IconHamburger.vue`, `IconLogoLetterD.vue`). Remove empty `<script>` and `<style>` blocks.

### Component Documentation

Architecture docs live in `docs/` — see [`docs/README.md`](docs/README.md) for the full index. Always check there before modifying a component.

### Deployment

The site is deployed to **Cloudflare Workers**. See [`docs/deployment/README.md`](docs/deployment/README.md) for the full setup, `wrangler.toml` explanation, why `nitro.preset: 'static'` is required, and custom domain instructions.

### Key Commands
```bash
npm run dev       # Dev server at http://localhost:3000
npm run generate  # Build static site → .output/public/
npm run lint      # ESLint --fix
```

### Transliteration
Ukrainian slugs are converted to Latin URL paths via `app/utils/transliteration.utils.ts`. Always use `transliterate()` when constructing paths from Ukrainian strings. Parentheses are stripped from slugs but kept in display labels.

### Additional available CLI tools:
- fd
- rg

### Git / Commit / Push Rules
- **Never add docs/superpowers content to git.** It is internal knowledge only and must not be commited.
- Never use `git add -f` to force-add any file under `.github/` as `.github/` is in `.gitignore`.
- **Never `git push` immediately after making changes.** Always ask the user first via the `AskUserQuestion` tool before pushing to any remote.

 Update your agent memory as you discover codepaths, patterns, library
 locations, and key architectural decisions. This builds up institutional
 knowledge across conversations. Write concise notes about what you found
 and where. Keep those notes in .github/notes/*.md
