# Documentation

## Topics

- [Architecture](architecture/) — Project structure, data flow, routing, type system, composables
- [Styles](styles/) — CSS/SCSS/Tailwind organization, migration status, conventions
- [Components](components/) — Vue component architecture, naming conventions, inventory
- [Content](content/) — Markdown content pipeline, JSON metadata, adding articles
- [Deployment](deployment/) — Cloudflare Workers static deployment
- [Patterns](patterns/) — Reusable patterns and pitfalls

## Component Docs

| File | Component | Topics |
|---|---|---|
| [components/header-section-dropdown.md](components/header-section-dropdown.md) | `SectionDropdown.vue` | Hover mechanics, gap-bridging, Tailwind styling, data shape |
| [components/prose-h1.md](components/prose-h1.md) | `ProseH1.vue` | Hero images, provide/inject, responsive layout, image fallbacks |
| [components/random-article.md](components/random-article.md) | `RandomArticle.vue` | FLIP animation, slot-machine highlight, data source |
| [components/svg-icons.md](components/svg-icons.md) | SVG icons (`app/components/svg/`) | mask/clip-path ID collision, `useId()` fix, file structure, adding new icons |
