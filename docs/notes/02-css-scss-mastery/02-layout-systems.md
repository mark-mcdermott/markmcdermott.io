# Section 06: Layout Systems - Notes

## Lessons 01-05
**Date**: 2026-02-06

### Flexbox (06-01)
- Two players: container (parent) and items (children). Properties split between them.
- Two axes: main axis (default horizontal) and cross axis (default vertical). `flex-direction: column` flips them.
- Container properties:
  - `justify-content` — spacing along main axis (flex-start, center, space-between, space-evenly)
  - `align-items` — alignment along cross axis (stretch default, center, flex-start, flex-end)
  - `flex-wrap` — let items wrap to new lines
  - `gap` — space between items
- Item properties:
  - `flex-basis` — starting size before grow/shrink (like width for flex items)
  - `flex-grow` — how much extra space to absorb (0 = don't grow, 1 = take available space)
  - `flex-shrink` — whether item can shrink below basis (0 = never shrink)
- Classic pattern: fixed sidebar (`flex-basis: 200px; flex-grow: 0; flex-shrink: 0`) + fluid main (`flex-grow: 1`).

### CSS Grid (06-02)
- Two-dimensional: control rows AND columns simultaneously.
- `fr` unit = fraction of available space. `1fr 1fr 1fr` = 3 equal columns.
- `repeat(3, 1fr)` = shorthand for repeating column definitions.
- `repeat(auto-fit, minmax(150px, 1fr))` = responsive grid with no media queries. Columns auto-wrap based on available space.
- `auto-fit` collapses empty tracks (columns stretch). `auto-fill` keeps empty tracks.
- `grid-template-areas` = visual ASCII map of your layout. Each string is a row, each word is a cell. Repeat a name to span multiple columns.

### Flexbox vs Grid (06-03)
- Not about size — about dimensions.
- Flexbox: one direction at a time (row OR column).
- Grid: two directions simultaneously (rows AND columns).
- They compose: grid for page layout, flexbox inside grid cells for internal content.
- Nav links = flexbox. Card grid = grid. Page layout = grid. Centering = flexbox.

### Positioning (06-04)
- `static` — default, normal flow. top/left have no effect.
- `relative` — in flow, but nudgeable. Also serves as anchor for absolute children.
- `absolute` — out of flow. Positioned relative to nearest positioned ancestor.
- `fixed` — out of flow. Positioned relative to viewport. Stays on scroll.
- `sticky` — hybrid. Normal until scroll threshold, then sticks.
- `relative` + `absolute` pair: parent is relative (anchor), child is absolute (positioned within parent).
- `z-index` only works on positioned elements. Creates stacking contexts — children are trapped inside parent's context.

### Float (06-05)
- Legacy layout technique. Only modern use: wrapping text around images.
- Everything else floats were used for, flexbox and grid do better.

### Ready For
- Section 07: SCSS Patterns and Architecture.
