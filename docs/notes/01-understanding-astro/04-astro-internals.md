# Section 04: Astro Internals and Features - Notes

## Lessons 01-03: Build Process, Islands, Integrations
**Date**: 2026-02-06

### Key Insights - Build Process
- Build has three phases: (1) content sync — validate Zod schemas, process markdown, (2) Vite build — compile .astro files, process styles, bundle assets, (3) static generation — run getStaticPaths, render every page to HTML files.
- Output goes to `dist/` — just HTML files and static assets. Zero JS by default.
- Every page becomes a `folder/index.html` for clean URLs (directory-style routing).
- `public/` directory contents are copied to `dist/` as-is — no processing. That's for favicons, robots.txt, anything needing a fixed URL.
- Vite is the engine under the hood for both the dev server (HMR) and production builds.

### Key Insights - Islands Architecture
- The page is static HTML. Interactive components are "islands" that get their own JavaScript.
- Without a `client:*` directive, even framework components (React, Svelte) render to HTML with zero JS.
- Four directives control WHEN JS loads:
  - `client:load` — immediately (dark mode toggle)
  - `client:idle` — after page loads (comment form)
  - `client:visible` — when scrolled into view (below-fold content)
  - `client:media` — on CSS media query match (mobile menu)
- Each island is independent — no shared state between islands by default.
- No client-side navigation — every link is a full page load (fine for static sites on a CDN).

### Key Insights - Integrations
- Integrations extend Astro — sitemap, RSS, MDX, framework support.
- They go in `astro.config.mjs` in the `integrations` array.
- SCSS doesn't need an integration — Vite handles it natively with just the `sass` package.

### Astro's Sweet Spot
- Content-driven sites: portfolios, blogs, docs, marketing pages.
- Tradeoff vs Next.js/SPAs: no shared state across pages, no client-side navigation. But zero JS shipped, fastest possible page loads, cheapest hosting.

### Deferred
- Lesson 04-04 (Image Optimization) and 04-05 (Configuration) — more useful when actually building out the site with real images and deployment config.

### Ready For
- Part 2: CSS3 and SCSS Mastery — the main skill-building phase.
