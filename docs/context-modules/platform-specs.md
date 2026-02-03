# Platform Architecture & Specs

## Technology Stack

### Static Site Framework
- **Astro 5** - Content-focused static site generator
- **SSG output** - Pre-rendered HTML, zero JS by default
- **Content Collections** - Type-safe content management with Zod schemas

### Styling
- **SCSS** - CSS preprocessor with variables, mixins, nesting, modules
- **CSS3** - Modern CSS features (grid, flexbox, custom properties, animations)
- **C64 aesthetic** - Commodore 64-inspired retro design (pixel fonts, 16-color palette, CRT effects)

### Language
- **TypeScript 5** - Type-safe scripting for utilities and build logic
- **Vanilla JS** - Minimal client-side interactivity (no framework)

### Content
- **Markdown** - Blog posts and project descriptions
- **Frontmatter** - YAML metadata for content collections
- **MDX** (optional) - Markdown with component support

### Testing
- **Playwright** - E2E testing and visual regression
- **@playwright/test** - Test runner

### Build & Dev Tools
- **Vite** (via Astro) - Dev server with HMR
- **ESLint** - Linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing (autoprefixer)

### Deployment
- **Cloudflare Pages** - Static site hosting
- **GitHub** - Source control and CI triggers

## Project Structure

```
c64/
|-- src/
|   |-- components/        # Astro components (.astro)
|   |-- content/           # Content collections
|   |   |-- blog/          # Blog posts (markdown)
|   |   |-- projects/      # Portfolio projects (markdown)
|   |   |-- config.ts      # Collection schemas
|   |-- layouts/           # Page layouts (.astro)
|   |-- pages/             # File-based routing (.astro)
|   |   |-- index.astro    # Home page
|   |   |-- blog/          # Blog routes
|   |   |-- projects/      # Project routes
|   |   |-- about.astro    # About page
|   |-- styles/            # SCSS files
|   |   |-- abstracts/     # Variables, mixins, functions
|   |   |-- base/          # Reset, typography, global styles
|   |   |-- components/    # Component-specific styles
|   |   |-- layout/        # Layout styles (header, footer, grid)
|   |   |-- pages/         # Page-specific styles
|   |   |-- themes/        # C64 theme, color palette
|   |   |-- main.scss      # Main entry point
|   |-- scripts/           # Client-side TypeScript (minimal)
|   |-- assets/            # Images, fonts
|-- public/                # Static assets (favicon, robots.txt)
|-- tests/                 # Playwright E2E tests
|-- .claude/               # Claude Code configuration
|-- docs/                  # Learning documentation
|-- astro.config.mjs       # Astro configuration
|-- tsconfig.json          # TypeScript configuration
```

## Key Commands

```bash
npm run dev          # Astro dev server with HMR
npm run build        # Build static site to dist/
npm run preview      # Preview built site locally
npx astro check      # Astro diagnostics (type checking)
npm run test:e2e     # Playwright E2E tests
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier formatting
```

## Architecture Notes

### Astro Rendering Model
- **Build time**: Pages are pre-rendered to static HTML at build time
- **Zero JS default**: No JavaScript shipped unless explicitly opted in
- **Islands**: Interactive components hydrated independently (client:* directives)
- **Content collections**: Type-safe content with Zod schema validation

### Styling Architecture
- **SCSS modules**: Organized with 7-1 pattern (adapted for project size)
- **CSS custom properties**: Used for theming (C64 color palette)
- **Scoped styles**: Astro's built-in `<style>` scoping per component
- **Global styles**: SCSS partials for base typography, reset, layout

### Content Pipeline
- Blog posts: Markdown files in `src/content/blog/` with frontmatter
- Projects: Markdown files in `src/content/projects/` with frontmatter
- Schemas: Zod validation in `src/content/config.ts`
- Rendering: Astro's built-in markdown processing

### Deployment Flow
1. Push to GitHub (main branch or PR)
2. Cloudflare Pages detects push, runs `npm run build`
3. Static `dist/` directory deployed to CDN
4. Preview URLs for PR branches
