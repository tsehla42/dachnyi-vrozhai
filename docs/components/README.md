# Components

## Organization

Components live in `app/components/` and are auto-imported by Nuxt. Subdirectories group related components.

### Directory Layout

components/
├── dv/                    # Custom Nuxt UI wrappers (Dv prefix)
│   ├── Button.vue         # DvButton — styled button wrapper
│   └── Dropdown.vue       # DvDropdown — UDropdownMenu wrapper
├── svg/                   # SVG icon components
│   ├── Icon<Name>.vue     # One component per icon (e.g., IconHamburger.vue)
│   └── index.ts           # Barrel export with SvgIconComponentsMap
├── item/                  # Generic content display
│   ├── Card.vue           # ItemCard — single category/article card
│   └── List.vue           # ItemList — grid of ItemCards
├── header/                # Header subcomponents
│   ├── SectionDropdown.vue   # Dropdown menu for one section
│   ├── CategoryLink.vue      # Category link within dropdown
│   └── ReadingProgressBar.vue # Scroll progress indicator
├── content/               # Prose renderer overrides
│   ├── ProseH1.vue        # Custom h1 with hero image injection
│   └── ProseH2.vue        # Custom h2 override
├── advices/               # Advice/tip cards
│   ├── Card.vue           # Single advice card
│   └── List.vue           # Grid of advice cards
├── Accordion.vue          # Sections accordion on homepage
├── Carousel.vue           # Image carousel
├── Footer.vue             # Site footer
├── Header.vue             # Sticky header with section dropdowns
├── MobileBurgerMenu.vue   # Mobile navigation overlay
├── NotFoundContent.vue    # 404 page content
└── RandomArticle.vue      # Random article grid with FLIP animation

## Naming Conventions

| Pattern | Convention | Example |
|---|---|---|
| Custom wrappers | `Dv` prefix | `DvButton`, `DvDropdown` |
| SVG icons | `Icon<Name>` | `IconHamburger`, `IconLogoLetterD` |
| Content prose | `Prose<Tag>` | `ProseH1`, `ProseH2` |
| Everything else | Descriptive name | `Header`, `Footer`, `Accordion` |

## Generic Components

**`ItemCard`** (`app/components/item/Card.vue`) — Renders a single category or article card with image, label, and link. Used on section pages, category pages, and the sitemap.

**`ItemList`** (`app/components/item/List.vue`) — Renders a grid of `ItemCard` components for a given section and optional category. Consumes data from `useSections()`.

## Detailed Component Docs

| File | Component | Topics |
|---|---|---|
| [header-section-dropdown.md](header-section-dropdown.md) | `SectionDropdown.vue` | Hover mechanics, gap-bridging, Tailwind styling, data shape |
| [prose-h1.md](prose-h1.md) | `ProseH1.vue` | Hero images, provide/inject, responsive layout, image fallbacks |
| [random-article.md](random-article.md) | `RandomArticle.vue` | FLIP animation, slot-machine highlight, data source |
| [svg-icons.md](svg-icons.md) | SVG icons (`app/components/svg/`) | mask/clip-path ID collision, `useId()` fix, file structure |

## Adding a New Component

1. Create `app/components/YourComponent.vue`
2. Auto-imported by Nuxt — no registration needed
3. If it's a wrapper for a Nuxt UI component, prefix with `Dv` and place in `dv/`
4. If it's an SVG icon, follow the `Icon<Name>.vue` convention in `svg/`
5. Add descriptive CSS classes to major layout elements (e.g., `mobile-header`, `desktop-footer`)
