# Section 10: Browser Internals - Notes

## Lessons 01-05
**Date**: 2026-02-06

### Rendering Pipeline (10-01)
- HTML → DOM, CSS → CSSOM → combined into Render tree → Layout → Paint → Composite.
- Different CSS changes trigger different stages:
  - transform/opacity → Composite only (cheap, GPU)
  - color/background → Paint + Composite
  - width/margin/top → Layout + Paint + Composite (expensive)
- This is why we animate transform/opacity, not layout properties.

### DOM and CSSOM (10-02)
- DOM is a tree of nodes mirroring HTML structure.
- CSSOM is the style equivalent.
- Render tree = DOM + CSSOM, minus invisible elements.
- `display: none` removes from render tree. `visibility: hidden` keeps in tree but doesn't paint.

### Web APIs (10-03)
- localStorage/sessionStorage for persisting user preferences (theme toggle).
- Intersection Observer for scroll-triggered behavior (lazy loading, animations).
- For static Astro site, minimal Web API usage needed.

### DevTools (10-04)
- Elements: inspect DOM, edit styles live, box model visualization.
- Network: request waterfall, file sizes, timing.
- Lighthouse: automated audits (performance, accessibility, SEO).
- Run Lighthouse on the portfolio when built.

### Performance (10-05)
- Core Web Vitals: LCP (< 2.5s), FID (< 100ms), CLS (< 0.1).
- Static Astro site with zero JS naturally scores well.
- Watch for: image optimization, font loading (layout shift), render-blocking resources.

### Ready For
- Section 11: HTML Semantics and Accessibility.
