# Progress Review Skill

Spaced repetition review for reinforcing learned concepts.

## Review Session Structure

1. **Load progress** from @docs/context-modules/progress-tracking.md
2. **Identify review candidates** based on spaced repetition schedule
3. **Generate questions** at appropriate depth level
4. **Conduct review** interactively
5. **Update tracking** with new confidence levels and review dates

## Spaced Repetition Schedule

| Review # | Interval | Purpose |
|----------|----------|---------|
| 1 | Day 1 | Immediate reinforcement |
| 2 | Day 3 | Short-term retention |
| 3 | Day 7 | Week-level retention |
| 4 | Day 14 | Consolidation |
| 5 | Day 30 | Long-term retention |
| 6 | Day 90 | Mastery verification |

## Focus Areas

### Astro
- Project structure and file conventions
- Content collections and Zod schemas
- File-based routing and dynamic routes
- Islands architecture and client directives
- Build process and Vite integration

### CSS3
- Box model (content, padding, border, margin)
- Specificity calculation and cascade rules
- Selectors (pseudo-classes, pseudo-elements, combinators)
- Display types (block, inline, flex, grid)
- Units (px, em, rem, vw, vh, %)

### SCSS
- Variables and nesting
- Mixins and functions
- @use and @forward module system
- 7-1 architecture pattern
- Design tokens and color systems

### Responsive Design
- Media queries (mobile-first approach)
- Fluid typography (clamp, min, max)
- Flexbox and grid responsive patterns
- Container queries
- Responsive images

### JavaScript/TypeScript
- Event loop and async model
- Closures and scope
- TypeScript generics and utility types
- ES modules
- DOM manipulation

### Testing
- Playwright selectors and assertions
- Visual regression testing
- Accessibility testing with axe-core
- Test organization and page objects

## Question Types

| Level | Purpose | Example |
|-------|---------|---------|
| **L1: Recall** | Can you name it? | "What are the parts of the CSS box model?" |
| **L2: Explain** | Can you describe it? | "Why does Astro ship zero JS by default?" |
| **L3: Apply** | Can you use it? | "Write a media query for mobile-first responsive layout" |
| **L4: Analyze** | Can you compare? | "When would you use flexbox vs grid for this layout?" |
| **L5: Create** | Can you build it? | "Design the SCSS architecture for a new component" |
