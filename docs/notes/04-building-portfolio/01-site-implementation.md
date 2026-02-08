# Sections 12-13: Building the Portfolio - Notes

## Lessons 12-01 through 13-04 (Planning Phase)
**Date**: 2026-02-06

### Component Architecture (12-01)
**Layouts:**
- `BaseLayout.astro` — html/head/meta/global styles. Every page uses this.
- `BlogPostLayout.astro` — wraps individual posts.

**Components:**
- `Nav.astro` — site navigation (uses class:list for active page)
- `Footer.astro`
- `MobileMenu.astro` — drawer nav, needs small JS script
- `ThemeToggle.astro` — light/dark toggle (island with client-side JS)
- `Hero.astro` — home page hero
- `BlogCard.astro` — blog listing excerpt card
- `ProjectCard.astro` — project listing card
- `PhotoGrid.astro` — about page photos
- `TravelMap.astro` — about page map (potential island)

**Pages:**
- `index.astro`, `blog/[...page].astro`, `blog/[slug].astro`, `projects/index.astro`, `about.astro`

**Only ThemeToggle and TravelMap need client-side JS (islands). Everything else is static.**

### SCSS Architecture (12-02)
- 7-1 structure in `src/styles/`: abstracts, base, layout, components, themes + main.scss
- `BaseLayout.astro` imports `main.scss` in frontmatter
- Component scoped styles use `<style lang="scss">` with `@use 'abstracts'`

### Page Layouts (12-03)
- BaseLayout: Nav + slot + Footer. Each page wraps content in BaseLayout.
- Grid areas for page structure. Composition pattern: layouts wrap pages, components slot in.

### Navigation (12-05)
- `Astro.url.pathname` for active page detection — build time, no JS.
- `class:list` directive for conditional classes.
- Mobile menu: simple classList.toggle in a `<script>` tag.

### C64 Theme Vision (12-06)
- **My direction**: clean, professional, black and white with subtle C64 character.
- Dark bg + light text (terminal feel), monospace font, one accent color from C64 palette.
- Subtle scanlines (low opacity, maybe hero only). No glow on body text.
- Light mode variant via CSS custom properties on `[data-theme="light"]`.
- Toggle saves to localStorage.

### SEO (13-01)
- Description meta, Open Graph tags, canonical URL — all from page props in BaseLayout.
- OG tags critical for sharing portfolio links with employers.

### Performance (13-02)
- Astro Image component for WebP/AVIF conversion and responsive sizes.
- `font-display: swap` for font loading.
- Target: Lighthouse 100 across all categories.

### Deployment (13-03)
- GitHub → Cloudflare Pages. Build: `pnpm run build`, output: `dist/`.
- Auto-deploy on push to main. Preview URLs for PRs.

### Analytics (13-04)
- Privacy-friendly: Plausible, Fathom, or Cloudflare Web Analytics (free).

### Note
These sections were covered as architectural planning. The actual implementation will be done in hands-on building sessions.

### Ready For
- Part 5: Testing and Engineering Practices.
