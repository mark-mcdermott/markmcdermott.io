# Section 11: HTML Semantics and Accessibility - Notes

## Lessons 01-05
**Date**: 2026-02-06

### Semantic HTML (11-01)
- Use landmarks: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`.
- Screen readers let users jump between landmarks.
- Headings must be sequential (h1 → h2 → h3). Don't skip levels for styling — use CSS instead.
- `<div>` is for grouping when no semantic element fits. Not as default.

### WCAG (11-02)
- Four principles: Perceivable, Operable, Understandable, Robust (POUR).
- Three levels: A (minimum), AA (standard target), AAA (enhanced).
- Target AA for the portfolio: 4.5:1 contrast ratio, keyboard accessible, alt text.

### ARIA (11-03)
- Roles, states, and properties for assistive technology.
- First rule: don't use ARIA if native HTML does the job. `<button>` > `<div role="button">`.
- Use ARIA for custom widgets: dropdowns, tab panels, modals, live regions.

### Keyboard Navigation (11-04)
- Tab moves focus. Enter/Space activates. Escape closes. Arrows navigate within components.
- Skip link: hidden link at page top, jumps to `<main>`.
- Focus trap: Tab cycles within modals, doesn't escape behind.
- Never remove focus outlines without providing an alternative.

### Accessible Styling (11-05)
- `prefers-reduced-motion: reduce` — disable animations for sensitive users.
- `prefers-color-scheme` — respect dark/light mode preference.
- `:focus-visible` — shows focus ring for keyboard users, not mouse clicks.
- C64 aesthetic must still meet WCAG contrast ratios.

### Connection to QA Experience
- Accessibility testing is a natural extension of QA. Tools like axe-core and Lighthouse automate audits.
- "Can every user access this?" is the same question QA always asks, just for a different audience.

### Ready For
- Part 4: Building the Portfolio — applying everything learned.
