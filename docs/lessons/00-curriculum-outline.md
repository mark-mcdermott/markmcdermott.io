# Curriculum Outline

> **Progress**: Phase 1 - Understanding Astro (not started)
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
| 01 | Astro Project Structure | `[ ]` | src/, pages/, components/, layouts/, content/. How files map to output. Why this structure. |
| 02 | The .astro File Format | `[ ]` | Frontmatter fence (---), template section, `<style>`, `<script>`. How it differs from JSX/HTML. |
| 03 | Component Props and Slots | `[ ]` | Astro.props, typed props with TypeScript, `<slot />` for composition, named slots. |
| 04 | Layouts and Composition | `[ ]` | Layout components, nested layouts, passing data to layouts. The layout chain in the portfolio. |
| 05 | Scoped Styles in Astro | `[ ]` | How `<style>` scoping works. Global vs scoped. When to use each. Integration with SCSS. |

### Section 02: Content Collections

How the blog and projects are managed. Type-safe content with Zod schemas.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Content Collection Basics | `[ ]` | Defining collections in config.ts. Zod schemas for frontmatter. Type safety for content. |
| 02 | Querying Collections | `[ ]` | getCollection(), getEntry(). Filtering, sorting, type inference. |
| 03 | Rendering Markdown Content | `[ ]` | The `<Content />` component. Markdown processing pipeline. Custom components in markdown. |
| 04 | Blog Post Migration | `[ ]` | Migrating posts from previous setup. Frontmatter design. Image handling in content. |

### Section 03: Routing and Pages

File-based routing, dynamic routes, and how URLs map to files.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | File-Based Routing | `[ ]` | pages/ directory -> URLs. Index routes. Nested routes. How Astro resolves paths. |
| 02 | Dynamic Routes | `[ ]` | [slug].astro, [...slug].astro. getStaticPaths(). Generating pages from content collections. |
| 03 | Pagination | `[ ]` | paginate() helper. Blog listing pages. Navigation between pages. |
| 04 | RSS and Sitemap | `[ ]` | @astrojs/rss integration. Sitemap generation. SEO foundations. |

### Section 04: Astro Internals and Features

Build process, islands architecture, and advanced Astro features.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | The Build Process | `[ ]` | What happens during `astro build`. Vite under the hood. Output structure in dist/. |
| 02 | Islands Architecture | `[ ]` | Partial hydration concept. client:load, client:idle, client:visible, client:media. When to use. |
| 03 | Integrations | `[ ]` | How Astro integrations work. Adding SCSS support, sitemap, image optimization. |
| 04 | Image Optimization | `[ ]` | Astro's `<Image>` component. Format conversion. Responsive images. Performance benefits. |
| 05 | Configuration Deep Dive | `[ ]` | astro.config.mjs decoded. Vite config, integrations, output options, deploy adapters. |

---

## PART 2: CSS3 and SCSS Mastery

The primary skill-building section. CSS is a core skill gap - fill it thoroughly.

### Section 05: CSS3 Fundamentals

The foundation. Understand HOW CSS works, not just what properties to use.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | The Box Model | `[ ]` | Content, padding, border, margin. box-sizing. Collapsing margins. How the browser calculates size. |
| 02 | Specificity and the Cascade | `[ ]` | How CSS resolves conflicts. Specificity calculation. Inheritance. The !important escape hatch. |
| 03 | Selectors Deep Dive | `[ ]` | Type, class, ID, attribute, pseudo-class, pseudo-element. Combinators. :is(), :where(), :has(). |
| 04 | Display and Normal Flow | `[ ]` | Block vs inline vs inline-block. Normal document flow. How elements stack naturally. |
| 05 | Units and Values | `[ ]` | px, em, rem, %, vw, vh, ch. When to use each. Computed values. calc(). |
| 06 | Colors and Backgrounds | `[ ]` | Color spaces (hex, rgb, hsl, oklch). Gradients. Background properties. Opacity and transparency. |
| 07 | Typography | `[ ]` | font-family, font-size, line-height, letter-spacing. @font-face. System font stacks. Web fonts. |

### Section 06: Layout Systems

The most practical CSS skills. Master layout from scratch.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Flexbox Deep Dive | `[ ]` | Main axis, cross axis. flex-grow, flex-shrink, flex-basis. Alignment. Wrapping. Common patterns. |
| 02 | CSS Grid Deep Dive | `[ ]` | Grid template, areas, auto-flow. Explicit vs implicit grid. minmax(), repeat(), auto-fill/auto-fit. |
| 03 | Flexbox vs Grid | `[ ]` | When to use each. Combining them. Practical decision framework with portfolio examples. |
| 04 | Positioning | `[ ]` | Static, relative, absolute, fixed, sticky. Containing blocks. z-index and stacking contexts. |
| 05 | Multi-Column and Float | `[ ]` | Legacy layout context. columns property. Float for text wrapping. Clearfix (historical). |

### Section 07: SCSS Patterns and Architecture

Structure your stylesheets for maintainability and reuse.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | SCSS Basics | `[ ]` | Variables ($), nesting, parent selector (&). How SCSS compiles to CSS. |
| 02 | Mixins and Functions | `[ ]` | @mixin, @include. @function. Parameters, defaults. When to use each. |
| 03 | Modules and Partials | `[ ]` | @use, @forward (not @import). Namespacing. Partial files (_name.scss). Module system. |
| 04 | The 7-1 Architecture | `[ ]` | abstracts/, base/, components/, layout/, pages/, themes/, vendors/. Adapted for project size. |
| 05 | Design Tokens in SCSS | `[ ]` | Color palettes as variables. Spacing scales. Typography scales. The C64 color system. |
| 06 | Placeholder Selectors and Extend | `[ ]` | %placeholders, @extend. When to use extend vs mixin. Output differences. |

### Section 08: Responsive Design and Animations

Making it work everywhere and making it move.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Media Queries | `[ ]` | min-width vs max-width. Mobile-first approach. Breakpoint strategy. SCSS mixin for breakpoints. |
| 02 | Fluid Typography and Spacing | `[ ]` | clamp(), min(), max(). Viewport-relative sizing. Fluid scales without breakpoints. |
| 03 | Responsive Images | `[ ]` | srcset, sizes, picture element. Art direction. Integration with Astro's Image component. |
| 04 | Container Queries | `[ ]` | @container. Component-level responsive design. When container queries vs media queries. |
| 05 | CSS Transitions | `[ ]` | transition property. Timing functions (ease, cubic-bezier). What properties to animate. Performance. |
| 06 | CSS Animations | `[ ]` | @keyframes. animation property. Multi-step animations. Performance (compositor vs main thread). |
| 07 | Transforms | `[ ]` | translate, rotate, scale, skew. transform-origin. 3D transforms. GPU acceleration. |
| 08 | The C64 Aesthetic | `[ ]` | CRT scanline effect. Phosphor glow. Cursor blink. Retro color palette. Balancing retro with usability. |

---

## PART 3: JavaScript, TypeScript, and Web Fundamentals

Fill the gaps between "I can use it" and "I deeply understand it."

### Section 09: JavaScript and TypeScript Essentials

The language underneath everything.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | The Event Loop | `[ ]` | Call stack, task queue, microtasks. Why async works the way it does. |
| 02 | Closures and Scope | `[ ]` | Lexical scope, closures in practice. Module patterns. |
| 03 | Async Patterns | `[ ]` | Callbacks -> Promises -> async/await. Error handling. Promise combinators. |
| 04 | ES Modules | `[ ]` | import/export, dynamic imports, tree shaking. How bundlers use this. |
| 05 | TypeScript Fundamentals | `[ ]` | Type annotations, interfaces, type aliases. Strict mode. tsconfig decoded. |
| 06 | TypeScript Advanced Patterns | `[ ]` | Generics, conditional types, utility types. Zod and type inference. |
| 07 | DOM Manipulation | `[ ]` | querySelector, events, event delegation. When vanilla JS is the right choice. |

### Section 10: Browser Internals

How the platform works underneath.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | How Browsers Render | `[ ]` | Parse -> Style -> Layout -> Paint -> Composite. Critical rendering path. |
| 02 | The DOM and CSSOM | `[ ]` | Document Object Model. How HTML becomes a tree. How CSS is applied. Render tree. |
| 03 | Web APIs | `[ ]` | Storage, fetch, Intersection Observer, Mutation Observer. Navigator API. |
| 04 | Browser DevTools Mastery | `[ ]` | Elements panel, computed styles, network waterfall, Lighthouse, coverage. |
| 05 | Performance Fundamentals | `[ ]` | Core Web Vitals. Lighthouse. Performance budgets. What to measure and why. |

### Section 11: HTML Semantics and Accessibility

Build for everyone. Accessibility is a professional requirement.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Semantic HTML | `[ ]` | Landmarks (header, nav, main, footer). Headings hierarchy. Article, section, aside. |
| 02 | WCAG Fundamentals | `[ ]` | Perceivable, operable, understandable, robust. A/AA/AAA levels. Audit tools. |
| 03 | ARIA Attributes | `[ ]` | Roles, states, properties. When to use ARIA vs semantic HTML. Common patterns. |
| 04 | Keyboard Navigation | `[ ]` | Focus management. Tab order. Skip links. Focus traps for modals. |
| 05 | Accessible Styling | `[ ]` | Color contrast (WCAG ratios). Focus indicators. prefers-reduced-motion. prefers-color-scheme. |

---

## PART 4: Building the Portfolio

Apply everything learned. Build and polish the c64 portfolio site.

### Section 12: Site Implementation

Build out the portfolio using Astro, SCSS, and everything learned so far.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Component Architecture | `[ ]` | Plan the component tree. Header, footer, navigation, card, post layout. Reusability principles. |
| 02 | SCSS Architecture Implementation | `[ ]` | Set up 7-1 structure. Define design tokens. Create base styles and mixins. |
| 03 | Page Layouts | `[ ]` | Home page, blog listing, blog post, project page, about page. Responsive layouts for each. |
| 04 | Content Migration | `[ ]` | Move blog posts into content collections. Set up frontmatter schemas. Validate content. |
| 05 | Navigation and Interactivity | `[ ]` | Site navigation. Mobile menu (minimal JS). Active page indicators. Smooth scrolling. |
| 06 | The C64 Theme | `[ ]` | Implementing the retro aesthetic. Color system. Typography choices. CRT effects in CSS. |

### Section 13: Polish and Production

Get the site deployment-ready and professional.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | SEO Fundamentals | `[ ]` | Meta tags, Open Graph, Twitter cards. Structured data. Canonical URLs. |
| 02 | Performance Optimization | `[ ]` | Image optimization, font loading, critical CSS. Lighthouse 100 score target. |
| 03 | Cloudflare Pages Deployment | `[ ]` | Build configuration. Environment variables. Preview deployments. Custom domain. |
| 04 | Analytics and Monitoring | `[ ]` | Privacy-friendly analytics options. Error monitoring. Uptime checks. |

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
| | | | |

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
