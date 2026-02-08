# Section 05: CSS3 Fundamentals - Notes

## Lessons 01-07
**Date**: 2026-02-06

### Box Model (05-01)
- Four layers inside out: content, padding, border, margin.
- `content-box` (default): `width` sets content only. Total = content + padding + border.
- `border-box`: `width` sets the whole box. Browser subtracts padding/border to get content width.
- Always use `*, *::before, *::after { box-sizing: border-box; }` in resets.
- Vertical margins collapse — adjacent top/bottom margins become the larger of the two, not the sum. Doesn't happen in flexbox/grid.

### Specificity and the Cascade (05-02)
- Three-column scoring: (IDs, Classes, Elements). Columns never overflow.
- 100 classes still lose to 1 ID.
- Cascade order: (1) !important, (2) specificity, (3) source order (last wins).
- Some properties inherit (color, font-family). Others don't (padding, border).
- `!important` creates arms races — avoid it. Fix specificity instead.

### Selectors (05-03)
- Combinators: descendant (space), child (>), adjacent sibling (+), general sibling (~).
- Child combinator (>) prevents styles from leaking into nested elements.
- `:is()` — matches any selector inside, takes specificity of the highest one.
- `:where()` — same as :is() but zero specificity. Good for overridable defaults/resets.
- `:has()` — the "parent selector." Select elements based on what they contain.

### Display and Normal Flow (05-04)
- Block: full width, new line, respects all box model properties.
- Inline: content width, flows horizontally, IGNORES width/height/vertical margin.
- Inline-block: hybrid — flows inline but respects all box model properties.

### Units and Values (05-05)
- `rem` for font sizes — predictable, no compounding.
- `em` for padding/margin that should scale with the element's font size.
- `px` for borders, shadows, small fixed values.
- `%` for widths relative to parent.
- `vw`/`vh` for viewport-sized elements.
- `ch` for character-width sizing (great for monospace/C64 terminal aesthetic).
- `calc()` mixes units: `calc(100% - 250px)`.
- `em` compounds when nested — 1.2em × 1.2em × 1.2em snowballs. Use rem instead.

### Colors (05-06)
- Hex (#ff0000), RGB (rgb(255, 0, 0)), HSL (hsl(0, 100%, 50%)).
- HSL is human-readable: hue = color wheel degree, saturation = vividness, lightness = light/dark.
- Alpha channel (`/ 0.5`) makes one color transparent. `opacity` makes the entire element + children transparent.
- Use alpha channel for selective transparency, not opacity.

### Typography (05-07)
- `font-family` is a fallback chain. End with a generic family (monospace for C64).
- Always use unitless `line-height` (e.g., `1.6` not `1.6em`). With em, the computed pixel value passes to children and can cause overlapping lines on larger text.
- `font-weight`: 400 = normal, 700 = bold, 100-900 scale.

### Connection to QA Experience
- Collapsing margins and specificity battles are common sources of visual bugs. Now I know what to check first.

### Ready For
- Section 06: Layout Systems — flexbox and grid deep dives.
