# Curriculum Outline

> **Progress**: Phase 1 - Understanding Astro (in progress)
> **Last Updated**: 2026-02-03

## Learning Philosophy

- **Template-first**: Understand the Astro site you started from before building new things
- **Theory-to-practice bridge**: Leverage MS in SE theory, connect to real implementation
- **QA-informed learning**: Use testing instincts as a superpower for understanding systems
- **Career-oriented**: Every topic connects to what dev roles expect
- **Project-driven**: Learn through the portfolio site you're building, not abstract exercises
- **Progressive depth**: Understand -> fundamentals -> patterns -> build -> test

## How to Use This Document

- **Status markers**: `[ ]` Planned | `[>]` In Progress | `[x]` Complete
- **Lesson requests**: Add to appropriate section with `[?]` marker for review
- **Tangents**: Curiosity-driven explorations go in `tangents-queue.md`

---

## PART 1: Understanding Astro

The goal: be able to explain every piece of your portfolio site and justify every architectural decision.

### Section 01: Astro Fundamentals

How Astro works as a static site generator. Project structure, components, and the .astro file format.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Astro Project Structure | `[x]` | src/, pages/, components/, layouts/, content/. How files map to output. Why this structure. |
| 02 | The .astro File Format | `[x]` | Frontmatter fence (---), template section, `<style>`, `<script>`. How it differs from JSX/HTML. |
| 03 | Component Props and Slots | `[x]` | Astro.props, typed props with TypeScript, `<slot />` for composition, named slots. |
| 04 | Layouts and Composition | `[x]` | Layout components, nested layouts, passing data to layouts. The layout chain in the portfolio. |
| 05 | Scoped Styles in Astro | `[x]` | How `<style>` scoping works. Global vs scoped. When to use each. Integration with SCSS. |

### Section 02: Content Collections

How the blog and projects are managed. Type-safe content with Zod schemas.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Content Collection Basics | `[x]` | Defining collections in config.ts. Zod schemas for frontmatter. Type safety for content. |
| 02 | Querying Collections | `[x]` | getCollection(), getEntry(). Filtering, sorting, type inference. |
| 03 | Rendering Markdown Content | `[x]` | The `<Content />` component. Markdown processing pipeline. Custom components in markdown. |
| 04 | Blog Post Migration | `[ ]` | Migrating posts from previous setup. Frontmatter design. Image handling in content. |

### Section 03: Routing and Pages

File-based routing, dynamic routes, and how URLs map to files.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | File-Based Routing | `[x]` | pages/ directory -> URLs. Index routes. Nested routes. How Astro resolves paths. |
| 02 | Dynamic Routes | `[x]` | [slug].astro, [...slug].astro. getStaticPaths(). Generating pages from content collections. |
| 03 | Pagination | `[x]` | paginate() helper. Blog listing pages. Navigation between pages. |
| 04 | RSS and Sitemap | `[ ]` | @astrojs/rss integration. Sitemap generation. SEO foundations. |

### Section 04: Astro Internals and Features

Build process, islands architecture, and advanced Astro features.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | The Build Process | `[x]` | What happens during `astro build`. Vite under the hood. Output structure in dist/. |
| 02 | Islands Architecture | `[x]` | Partial hydration concept. client:load, client:idle, client:visible, client:media. When to use. |
| 03 | Integrations | `[x]` | How Astro integrations work. Adding SCSS support, sitemap, image optimization. |
| 04 | Image Optimization | `[ ]` | Astro's `<Image>` component. Format conversion. Responsive images. Performance benefits. |
| 05 | Configuration Deep Dive | `[ ]` | astro.config.mjs decoded. Vite config, integrations, output options, deploy adapters. |

---

## PART 2: CSS3 and SCSS Mastery

The primary skill-building section. CSS is a core skill gap - fill it thoroughly.

### Section 05: CSS3 Fundamentals

The foundation. Understand HOW CSS works, not just what properties to use.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | The Box Model | `[x]` | Content, padding, border, margin. box-sizing. Collapsing margins. How the browser calculates size. |
| 02 | Specificity and the Cascade | `[x]` | How CSS resolves conflicts. Specificity calculation. Inheritance. The !important escape hatch. |
| 03 | Selectors Deep Dive | `[x]` | Type, class, ID, attribute, pseudo-class, pseudo-element. Combinators. :is(), :where(), :has(). |
| 04 | Display and Normal Flow | `[x]` | Block vs inline vs inline-block. Normal document flow. How elements stack naturally. |
| 05 | Units and Values | `[x]` | px, em, rem, %, vw, vh, ch. When to use each. Computed values. calc(). |
| 06 | Colors and Backgrounds | `[x]` | Color spaces (hex, rgb, hsl, oklch). Gradients. Background properties. Opacity and transparency. |
| 07 | Typography | `[x]` | font-family, font-size, line-height, letter-spacing. @font-face. System font stacks. Web fonts. |

### Section 06: Layout Systems

The most practical CSS skills. Master layout from scratch.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Flexbox Deep Dive | `[x]` | Main axis, cross axis. flex-grow, flex-shrink, flex-basis. Alignment. Wrapping. Common patterns. |
| 02 | CSS Grid Deep Dive | `[x]` | Grid template, areas, auto-flow. Explicit vs implicit grid. minmax(), repeat(), auto-fill/auto-fit. |
| 03 | Flexbox vs Grid | `[x]` | When to use each. Combining them. Practical decision framework with portfolio examples. |
| 04 | Positioning | `[x]` | Static, relative, absolute, fixed, sticky. Containing blocks. z-index and stacking contexts. |
| 05 | Multi-Column and Float | `[x]` | Legacy layout context. columns property. Float for text wrapping. Clearfix (historical). |

### Section 07: SCSS Patterns and Architecture

Structure your stylesheets for maintainability and reuse.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | SCSS Basics | `[x]` | Variables ($), nesting, parent selector (&). How SCSS compiles to CSS. |
| 02 | Mixins and Functions | `[x]` | @mixin, @include. @function. Parameters, defaults. When to use each. |
| 03 | Modules and Partials | `[x]` | @use, @forward (not @import). Namespacing. Partial files (_name.scss). Module system. |
| 04 | The 7-1 Architecture | `[x]` | abstracts/, base/, components/, layout/, pages/, themes/, vendors/. Adapted for project size. |
| 05 | Design Tokens in SCSS | `[x]` | Color palettes as variables. Spacing scales. Typography scales. The C64 color system. |
| 06 | Placeholder Selectors and Extend | `[x]` | %placeholders, @extend. When to use extend vs mixin. Output differences. |

### Section 08: Responsive Design and Animations

Making it work everywhere and making it move.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Media Queries | `[x]` | min-width vs max-width. Mobile-first approach. Breakpoint strategy. SCSS mixin for breakpoints. |
| 02 | Fluid Typography and Spacing | `[x]` | clamp(), min(), max(). Viewport-relative sizing. Fluid scales without breakpoints. |
| 03 | Responsive Images | `[ ]` | srcset, sizes, picture element. Art direction. Integration with Astro's Image component. |
| 04 | Container Queries | `[x]` | @container. Component-level responsive design. When container queries vs media queries. |
| 05 | CSS Transitions | `[x]` | transition property. Timing functions (ease, cubic-bezier). What properties to animate. Performance. |
| 06 | CSS Animations | `[x]` | @keyframes. animation property. Multi-step animations. Performance (compositor vs main thread). |
| 07 | Transforms | `[x]` | translate, rotate, scale, skew. transform-origin. 3D transforms. GPU acceleration. |
| 08 | The C64 Aesthetic | `[x]` | CRT scanline effect. Phosphor glow. Cursor blink. Retro color palette. Balancing retro with usability. |

---

## PART 3: JavaScript, TypeScript, and Web Fundamentals

Fill the gaps between "I can use it" and "I deeply understand it."

### Section 09: JavaScript and TypeScript Essentials

The language underneath everything.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | The Event Loop | `[x]` | Call stack, task queue, microtasks. Why async works the way it does. |
| 02 | Closures and Scope | `[x]` | Lexical scope, closures in practice. Module patterns. |
| 03 | Async Patterns | `[x]` | Callbacks -> Promises -> async/await. Error handling. Promise combinators. |
| 04 | ES Modules | `[x]` | import/export, dynamic imports, tree shaking. How bundlers use this. |
| 05 | TypeScript Fundamentals | `[x]` | Type annotations, interfaces, type aliases. Strict mode. tsconfig decoded. |
| 06 | TypeScript Advanced Patterns | `[x]` | Generics, conditional types, utility types. Zod and type inference. |
| 07 | DOM Manipulation | `[x]` | querySelector, events, event delegation. When vanilla JS is the right choice. |

### Section 10: Browser Internals

How the platform works underneath.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | How Browsers Render | `[x]` | Parse -> Style -> Layout -> Paint -> Composite. Critical rendering path. |
| 02 | The DOM and CSSOM | `[x]` | Document Object Model. How HTML becomes a tree. How CSS is applied. Render tree. |
| 03 | Web APIs | `[x]` | Storage, fetch, Intersection Observer, Mutation Observer. Navigator API. |
| 04 | Browser DevTools Mastery | `[x]` | Elements panel, computed styles, network waterfall, Lighthouse, coverage. |
| 05 | Performance Fundamentals | `[x]` | Core Web Vitals. Lighthouse. Performance budgets. What to measure and why. |

### Section 11: HTML Semantics and Accessibility

Build for everyone. Accessibility is a professional requirement.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Semantic HTML | `[x]` | Landmarks (header, nav, main, footer). Headings hierarchy. Article, section, aside. |
| 02 | WCAG Fundamentals | `[x]` | Perceivable, operable, understandable, robust. A/AA/AAA levels. Audit tools. |
| 03 | ARIA Attributes | `[x]` | Roles, states, properties. When to use ARIA vs semantic HTML. Common patterns. |
| 04 | Keyboard Navigation | `[x]` | Focus management. Tab order. Skip links. Focus traps for modals. |
| 05 | Accessible Styling | `[x]` | Color contrast (WCAG ratios). Focus indicators. prefers-reduced-motion. prefers-color-scheme. |

---

## PART 4: Building the Portfolio

Apply everything learned. Build and polish the c64 portfolio site.

### Section 12: Site Implementation

Build out the portfolio using Astro, SCSS, and everything learned so far.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Component Architecture | `[x]` | Plan the component tree. Header, footer, navigation, card, post layout. Reusability principles. |
| 02 | SCSS Architecture Implementation | `[x]` | Set up 7-1 structure. Define design tokens. Create base styles and mixins. |
| 03 | Page Layouts | `[x]` | Home page, blog listing, blog post, project page, about page. Responsive layouts for each. |
| 04 | Content Migration | `[x]` | Move blog posts into content collections. Set up frontmatter schemas. Validate content. |
| 05 | Navigation and Interactivity | `[x]` | Site navigation. Mobile menu (minimal JS). Active page indicators. Smooth scrolling. |
| 06 | The C64 Theme | `[x]` | Implementing the retro aesthetic. Color system. Typography choices. CRT effects in CSS. |

### Section 13: Polish and Production

Get the site deployment-ready and professional.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | SEO Fundamentals | `[x]` | Meta tags, Open Graph, Twitter cards. Structured data. Canonical URLs. |
| 02 | Performance Optimization | `[x]` | Image optimization, font loading, critical CSS. Lighthouse 100 score target. |
| 03 | Cloudflare Pages Deployment | `[x]` | Build configuration. Environment variables. Preview deployments. Custom domain. |
| 04 | Analytics and Monitoring | `[x]` | Privacy-friendly analytics options. Error monitoring. Uptime checks. |

---

## PART 5: Testing and Engineering Practices

Leverage QA expertise and formalize it as engineering practice.

### Section 14: Playwright Testing

E2E testing for the portfolio site.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Playwright Fundamentals | `[ ]` | Selectors, assertions, page model. How E2E testing works. Test runner config. |
| 02 | Testing Static Sites | `[ ]` | Testing Astro output. Navigation testing. Content validation. Link checking. |
| 03 | Visual Regression Testing | `[ ]` | Screenshot comparison. Responsive screenshots. Threshold configuration. CI integration. |
| 04 | Accessibility Testing | `[ ]` | axe-core integration. Automated a11y audits. Testing keyboard navigation. |
| 05 | Test Architecture | `[ ]` | Page objects. Fixtures. Parallel execution. Test organization for a portfolio site. |

### Section 15: Engineering Practices

What separates a coder from an engineer.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Git Advanced Workflows | `[ ]` | Rebase vs merge. Cherry-pick. Bisect. Reflog. Branch strategy for the portfolio. |
| 02 | GitHub Actions CI | `[ ]` | Workflow syntax. Build + test + deploy pipeline. Caching. Status checks on PRs. |
| 03 | Code Quality | `[ ]` | ESLint configuration. Prettier setup. Pre-commit hooks. Consistent code style. |
| 04 | Clean Code Principles | `[ ]` | Naming, functions, comments, formatting. Code as communication. |
| 05 | Technical Communication | `[ ]` | Explaining decisions in plain English. Writing good PR descriptions. Documentation. |

---

## Lesson Request Queue

Lessons suggested during learning that need to be placed in the outline.

| Topic | Suggested Placement | Status |
|-------|---------------------|--------|
| *(none yet)* | | |

---

## Progress Log

| Date | Section | Lesson | Notes |
|------|---------|--------|-------|
| 2026-02-06 | 01: Astro Fundamentals | 01 - Astro Project Structure | Completed |
| 2026-02-06 | 01: Astro Fundamentals | 02 - The .astro File Format | Completed |
| 2026-02-06 | 01: Astro Fundamentals | 03 - Component Props and Slots | Completed |
| 2026-02-06 | 01: Astro Fundamentals | 04 - Layouts and Composition | Completed |
| 2026-02-06 | 01: Astro Fundamentals | 05 - Scoped Styles in Astro | Completed |
| 2026-02-06 | 02: Content Collections | 01 - Content Collection Basics | Completed |
| 2026-02-06 | 02: Content Collections | 02 - Querying Collections | Completed |
| 2026-02-06 | 02: Content Collections | 03 - Rendering Markdown Content | Completed |
| 2026-02-06 | 03: Routing and Pages | 01 - File-Based Routing | Completed |
| 2026-02-06 | 03: Routing and Pages | 02 - Dynamic Routes | Completed |
| 2026-02-06 | 03: Routing and Pages | 03 - Pagination | Completed |
| 2026-02-06 | 04: Astro Internals | 01 - The Build Process | Completed |
| 2026-02-06 | 04: Astro Internals | 02 - Islands Architecture | Completed |
| 2026-02-06 | 04: Astro Internals | 03 - Integrations | Completed |
| 2026-02-06 | 05: CSS3 Fundamentals | 01 - The Box Model | Completed |
| 2026-02-06 | 05: CSS3 Fundamentals | 02 - Specificity and the Cascade | Completed |
| 2026-02-06 | 05: CSS3 Fundamentals | 03 - Selectors Deep Dive | Completed |
| 2026-02-06 | 05: CSS3 Fundamentals | 04 - Display and Normal Flow | Completed |
| 2026-02-06 | 05: CSS3 Fundamentals | 05 - Units and Values | Completed |
| 2026-02-06 | 05: CSS3 Fundamentals | 06 - Colors and Backgrounds | Completed |
| 2026-02-06 | 05: CSS3 Fundamentals | 07 - Typography | Completed |
| 2026-02-06 | 06: Layout Systems | 01 - Flexbox Deep Dive | Completed |
| 2026-02-06 | 06: Layout Systems | 02 - CSS Grid Deep Dive | Completed |
| 2026-02-06 | 06: Layout Systems | 03 - Flexbox vs Grid | Completed |
| 2026-02-06 | 06: Layout Systems | 04 - Positioning | Completed |
| 2026-02-06 | 06: Layout Systems | 05 - Multi-Column and Float | Completed |
| 2026-02-06 | 07: SCSS Patterns | 01 - SCSS Basics | Completed |
| 2026-02-06 | 07: SCSS Patterns | 02 - Mixins and Functions | Completed |
| 2026-02-06 | 07: SCSS Patterns | 03 - Modules and Partials | Completed |
| 2026-02-06 | 07: SCSS Patterns | 04 - The 7-1 Architecture | Completed |
| 2026-02-06 | 07: SCSS Patterns | 05 - Design Tokens in SCSS | Completed |
| 2026-02-06 | 07: SCSS Patterns | 06 - Placeholder Selectors and Extend | Completed |
| 2026-02-06 | 08: Responsive & Animations | 01 - Media Queries | Completed |
| 2026-02-06 | 08: Responsive & Animations | 02 - Fluid Typography and Spacing | Completed |
| 2026-02-06 | 08: Responsive & Animations | 04 - Container Queries | Completed |
| 2026-02-06 | 08: Responsive & Animations | 05 - CSS Transitions | Completed |
| 2026-02-06 | 08: Responsive & Animations | 06 - CSS Animations | Completed |
| 2026-02-06 | 08: Responsive & Animations | 07 - Transforms | Completed |
| 2026-02-06 | 08: Responsive & Animations | 08 - The C64 Aesthetic | Completed |

---

## Appendix A: Recommended Resources

### Books
- **Eloquent JavaScript** (Marijn Haverbeke) - JS fundamentals, free online
- **CSS: The Definitive Guide** (Eric Meyer & Estelle Weyl) - CSS deep reference
- **Every Layout** (Andy Bell & Heydon Pickering) - Layout patterns with CSS
- **The Pragmatic Programmer** (Hunt & Thomas) - Software engineering mindset

### Courses & Platforms
- **Kevin Powell** (YouTube) - CSS deep dives, responsive design, modern CSS
- **Frontend Masters** - Deep dive courses (CSS, TypeScript, Astro)
- **Josh Comeau** - CSS for JavaScript Developers
- **web.dev** (Google) - Web fundamentals, performance, accessibility

### Practice
- **The c64 Portfolio Codebase** - The best learning tool is the site you're building
- **CSS Battle** - CSS puzzle challenges for layout practice
- **a11y project** - Accessibility learning and checklists

## Appendix B: Complexity Ratings

- Level 1: Concept review, mental model building
- Level 2: Hands-on with guidance, following patterns
- Level 3: Independent implementation, applied understanding
- Level 4: Architecture decisions, tradeoff analysis
- Level 5: Teaching others, professional-quality output

## Appendix C: Dev Role Readiness Checklist

### Technical Skills
- [ ] Can explain every piece of the portfolio site's architecture
- [ ] Can build responsive layouts from a design mockup using CSS/SCSS
- [ ] Can write clean TypeScript without AI assistance
- [ ] Can debug any frontend issue systematically
- [ ] Can explain CSS specificity, cascade, and box model from memory
- [ ] Can set up an Astro project from scratch with content collections
- [ ] Can write comprehensive Playwright tests
- [ ] Can deploy and manage a static site on Cloudflare Pages
- [ ] Can implement accessible HTML with proper ARIA attributes
- [ ] Can explain the browser rendering pipeline

### Soft Skills
- [ ] Can explain technical decisions in plain English
- [ ] Can write clear PR descriptions and documentation
- [ ] Can discuss past projects with concrete examples
- [ ] Can ask clarifying questions in ambiguous situations
- [ ] Can give and receive code review feedback constructively
