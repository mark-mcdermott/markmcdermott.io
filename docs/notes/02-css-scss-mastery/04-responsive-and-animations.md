# Section 08: Responsive Design and Animations - Notes

## Lessons 01-08
**Date**: 2026-02-06

### Media Queries (08-01)
- Mobile-first: base styles are mobile, use `min-width` to add complexity going up.
- Industry standard because simpler layouts are the default, complexity is additive.
- If CSS fails to load, users get the simple layout (graceful degradation).
- SCSS breakpoint mixin with `@content` keeps breakpoint values in one place.

### Fluid Typography (08-02)
- `clamp(min, preferred, max)` — fluid scaling without breakpoint jumps.
- `clamp(1rem, 1rem + 2vw, 2rem)` — font scales smoothly between 1rem and 2rem.
- `min()` / `max()` for simpler cases: `width: min(90%, 800px)`.
- These reduce the need for media queries significantly.

### Container Queries (08-04)
- Media queries respond to viewport. Container queries respond to parent element width.
- `container-type: inline-size` on parent, then `@container (min-width: 400px) { }`.
- Makes components truly reusable — they adapt to wherever they're placed.
- Media queries for page-level responsive. Container queries for component-level responsive.

### CSS Transitions (08-05)
- `transition: property duration timing-function` — animates between states.
- Only animate `transform` and `opacity` for performance (GPU-accelerated).
- Animating width/height/margin/left triggers layout recalculation (janky).

### CSS Animations (08-06)
- `@keyframes name { 0% { } 50% { } 100% { } }` — multi-step animations.
- `animation: name duration timing delay count direction`.
- `infinite` for looping (cursor blink).
- Always respect `prefers-reduced-motion: reduce` — disable/simplify animations for sensitive users.

### Transforms (08-07)
- `translate`, `scale`, `rotate`, `skew` — visual changes without affecting layout.
- GPU-accelerated — the right way to animate movement (not top/left).
- Can chain: `transform: translateY(-4px) scale(1.02)`.

### C64 Aesthetic (08-08)
- Scanlines: `repeating-linear-gradient` overlay with `pointer-events: none`.
- Phosphor glow: `text-shadow` with a translucent color.
- Cursor blink: `@keyframes` with opacity toggle.
- **My vision**: clean, professional, black and white with subtle C64 character. Modern terminal feel, not a gimmick.
- Key concerns: WCAG contrast ratios, readability on small screens, font loading fallbacks, reduced-motion support.

### Deferred
- Lesson 08-03 (Responsive Images) — tied to Astro's Image component, will cover during site build.

### Ready For
- Part 3: JavaScript, TypeScript, and Web Fundamentals.
