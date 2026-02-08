# Section 01: Astro Fundamentals - Notes

## Lesson 05: Scoped Styles in Astro
**Date**: 2026-02-06

### Key Insights
- .astro files are NOT HTML files — they're templates that compile to HTML. Astro's compiler processes everything, including `<style>` tags, before the browser sees it.
- `<style>` placement doesn't matter in .astro files. I put one outside the `<html>` tag and Astro still extracted it, scoped it, and injected it into the `<head>`.
- Scoping works by generating a unique hash attribute (like `data-astro-cid-j7pv25f6`) and adding it to both the HTML elements AND the CSS selectors. That's how styles stay isolated per component.

### Mental Model
Astro's style system is a spectrum from fully scoped to fully global:

```
Most scoped                                          Most global
    |                                                      |
<style>    :global()    define:vars    is:global    is:inline
 (default)  (escape     (JS->CSS      (no scope    (no processing
             hatch)      bridge)       at all)      at all)
```

### The Five Approaches
1. **`<style>`** — Default. Scoped to the component via data attributes. Use almost always.
2. **`:global()` inside `<style>`** — Escape hatch for one rule. Use when a component needs to style something outside itself (modal overlay, markdown content).
3. **`define:vars={{ }}`** — Passes frontmatter JS values into CSS as custom properties. Use for data-driven styles (props, computed values), NOT for design tokens.
4. **`<style is:global>`** — Entire block is global. Use for resets, base typography, design tokens.
5. **`<style is:inline>`** — No processing at all, output verbatim. Rarely used.

### Misconception Corrected
- I initially assumed putting `<style>` in the `<head>` would make it behave like normal HTML. Wrong — Astro processes ALL style tags regardless of placement.
- I thought `define:vars` would be good for a color palette. It's actually for values that originate in JS logic (props, computed values). Color palettes belong in SCSS variables or CSS custom properties.

### SCSS Integration
- `<style lang="scss">` gives you SCSS features + Astro scoping. They compose.
- Global SCSS (7-1 architecture) lives in `src/styles/` and is imported in layouts.
- Component `<style>` blocks need `@use` to access shared SCSS variables — no implicit globals.

### Connection to QA Experience
- Scoped styles prevent the classic regression: "fixed a style on page A, broke page B three pages away." Each component is isolated by default.

### Questions Generated
- How does Astro's scoping compare to CSS Modules or Shadow DOM? (different mechanisms, similar goal)
- What happens to scoped styles during the production build — are they inlined or extracted to files?

### Ready For
- Section 02: Content Collections — how Astro manages blog posts and projects with type-safe schemas.
