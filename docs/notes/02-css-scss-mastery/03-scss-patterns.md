# Section 07: SCSS Patterns and Architecture - Notes

## Lessons 01-06
**Date**: 2026-02-06

### SCSS Basics (07-01)
- Variables: `$name: value;` — compile-time only, disappear in CSS output.
- Nesting: nest selectors to mirror HTML structure. Keep shallow (max 3 levels).
- Parent selector `&`: represents the outer selector string. Key uses:
  - `&:hover`, `&:focus` — pseudo-classes
  - `&::before`, `&::after` — pseudo-elements
  - `&.active` — modifier classes
  - `&--large` — BEM naming
- `& .child` with space = same as just nesting `.child` (redundant).

### Mixins and Functions (07-02)
- **Mixin**: reusable block of CSS. `@mixin name { }` → `@include name;`
- **Function**: returns a single value. `@function name() { @return value; }`
- Mixins can take parameters: `@mixin respond-to($breakpoint) { }`
- `@content`: placeholder inside a mixin for caller-provided CSS. Used for wrapper patterns like media query mixins.
- Mixin = "give me CSS rules." Function = "give me a value."

### Modules and Partials (07-03)
- Partials: files starting with `_` (e.g., `_variables.scss`). Don't compile to own CSS.
- `@use 'file'` — loads a file, members available under a namespace. **Private** to that file.
- `@forward 'file'` — re-exports members so others can access them through you. **Pass-through.**
- `@use` = "I need this for my work." `@forward` = "Pass this along to my consumers."
- `as *` drops namespace: `@use 'abstracts' as *;` — use names directly.
- **Never use `@import`** — deprecated, no namespacing, global scope pollution.

### 7-1 Architecture (07-04)
- 7 folders + 1 main entry file:
  - `abstracts/` — variables, mixins, functions (no CSS output, used by other files)
  - `base/` — reset, typography, global defaults
  - `components/` — button, card, nav styles
  - `layout/` — header, footer, page grid
  - `pages/` — page-specific overrides
  - `themes/` — color schemes (C64 palette)
  - `vendors/` — third-party CSS
- `main.scss` @use's all folders except abstracts.
- Start with abstracts + base + themes, add others as needed.

### Design Tokens (07-05)
- Two layers: **palette tokens** (raw colors) and **semantic tokens** (purpose-mapped).
- Palette: `$c64-blue: #0000aa;` — the actual C64 16-color palette.
- Semantic: `$color-bg: $c64-blue;` — what colors are used for.
- Change one semantic token → every component updates. No hunting through files.
- Spacing scale on 8px base: `$space-1: 8px`, `$space-2: 16px`, etc.
- SCSS variables for build-time (mixins, functions, breakpoints). CSS custom properties for runtime (theme switching, cascading).

### Placeholder Selectors and Extend (07-06)
- `%placeholder { }` — never outputs on its own. Only exists to be @extended.
- `@extend %placeholder` — merges selectors (comma-separated in output).
- Mixin duplicates CSS in each location. Extend merges selectors into one rule.
- Prefer mixins when output varies. Use extend when output is always identical.
- In practice, mixins are more common and safer. Extend can produce unexpected selector chains.

### Ready For
- Section 08: Responsive Design and Animations.
