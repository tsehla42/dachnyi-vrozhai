# Dachniy Vrozhai 🌱

A Ukrainian gardening website built with Nuxt 3, providing comprehensive information about vegetables, flowers, pests, diseases, fertilizers, and gardening tools.

## Quick Setup

### Automated Installation (Recommended)

Clone the repository and run the setup script:

```bash
git clone <repository-url> dachniy-vrozhai
cd dachniy-vrozhai
./setup.sh
```

The setup script will:
- Install all dependencies

### Manual Setup

If you prefer to set up manually:

```bash
# Clone the repository
git clone <repository-url> dachniy-vrozhai
cd dachniy-vrozhai

# Install dependencies
npm install
```

## Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Content

Content markdown files are committed directly to the `content/` directory. JSON metadata lives in `app/constants/content/*.json`. Edit these files directly when adding or updating content.

## Production

Build and serve the static site:

```bash
# Generate static site
npm run generate

# Serve locally
npm run serve

# Or combine both
npm start
```

## Project Structure

```
├── assets/          # SCSS styles and SVG assets
├── components/      # Vue components
├── composables/     # Vue composables
├── constants/       # Generated JSON content files
├── content/         # Nuxt Content markdown files
├── layouts/         # Nuxt layouts
├── pages/           # Nuxt pages
├── plugins/         # Nuxt plugins
├── public/          # Static assets (images, fonts)
├── scripts/         # Build and generation scripts
├── stores/          # Pinia stores
├── templates/       # Content templates (legacy, now in generator)
└── utils/           # Utility functions
```

## Development on Multiple Machines

When cloning to a new machine, simply run:

```bash
git clone <repository-url>
cd dachniy-vrozhai
./setup.sh
```

## Updating Content

Edit markdown files in `content/` and JSON metadata in `app/constants/content/*.json` directly, then commit the changes.

## Technologies

- **Nuxt 4** - Vue.js framework
- **Nuxt Content** - Content management
- **Nuxt UI** - UI components
- **Pinia** - State management
- **TypeScript** - Type safety
- **SCSS** - Styling

## License

MIT

