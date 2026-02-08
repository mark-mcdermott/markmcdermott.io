# Learning Progress

## Current Status
- **Phase**: Part 1 - Understanding Astro
- **Branch**: `main` or `learn/[topic]` (for learning branches)
- **Focus**: Deep dive into Astro 5 static site architecture
- **Pattern**: Understand the template you started from, then build outward

## Immediate Next Steps
1. **Lesson 04-04**: Image Optimization (Astro Image component, format conversion)
2. **Lesson 04-05**: Configuration Deep Dive (astro.config.mjs, Vite, deploy adapters)
3. **Part 2 begins**: CSS3 and SCSS Mastery (Section 05: CSS3 Fundamentals)

## Curriculum Location
**Full outline**: `docs/lessons/00-curriculum-outline.md`

## Skills Status

### Core Technologies
- [ ] Astro 5 (project structure, content collections, routing, islands)
- [ ] CSS3 deep understanding (box model, specificity, cascade, layout)
- [ ] SCSS architecture (variables, mixins, modules, 7-1 pattern)
- [ ] Responsive design (media queries, fluid typography, mobile-first)
- [ ] TypeScript patterns (generics, utility types, strict mode)
- [ ] Playwright E2E testing (selectors, assertions, visual regression)
- [ ] HTML semantics and accessibility (landmarks, ARIA, keyboard nav)
- [ ] Cloudflare Pages deployment (builds, preview URLs, configuration)

### Web Fundamentals
- [ ] JavaScript essentials (event loop, closures, async, promises)
- [ ] Browser internals (rendering pipeline, CSSOM, critical path)
- [ ] Web APIs (DOM, fetch, storage, Intersection Observer)

### Professional
- [ ] Portfolio quality (polished, demonstrating real skills)
- [ ] Technical communication (explaining decisions clearly)
- [ ] Testing practices (E2E, visual regression, accessibility)
- [ ] CI/CD (GitHub Actions, automated deployment)

---

## Project Essence

**Mission**: Deeply understand every piece of the portfolio site, fill CSS/web knowledge gaps, transition from QA to dev role
**Student**: ~15yr QA, ~5yr frontend, MS in SE, started from Astro template, wants to internalize everything
**Pattern**: Understand template -> CSS/SCSS mastery -> web fundamentals -> polish -> testing

### Core Rules
- Build understanding through the actual codebase, not abstract examples
- Simple commits -> `/commit` skill; complex git -> git-manager agent
- Subagents preserve context
- Never rush lessons - understanding over timeline
- One sentence gitmoji commit messages, no AI attribution

### Critical Agents
- **Git**: @.claude/agents/git-manager.md
- **Docs**: @.claude/agents/documentation.md

---

## Decisions Log

### Learning Architecture

**Template-First Approach**
- Start by understanding the Astro template that was used
- More engaging than starting from scratch
- Provides immediate context for all concepts
- Builds confidence: "I already have a working site"

**Dev Role Transition Focus**
- Every topic connects to real-world dev expectations
- CSS/SCSS emphasized since it's a key skill gap
- Portfolio serves double duty: learning project and job application tool
- Testing practices leverage QA background as a strength

### Technology Stack (c64 Portfolio)

**Astro for Static Site**
- Content-focused SSG with zero JS by default
- Content collections for type-safe blog/project management
- File-based routing for simple, predictable URLs
- Islands architecture available when interactivity is needed

**SCSS over Tailwind**
- Learning CSS deeply requires writing CSS, not utility classes
- SCSS adds structure (variables, mixins, modules) without hiding CSS
- Understanding CSS fundamentals transfers to any project
- C64 aesthetic benefits from custom, handcrafted styles

**Cloudflare Pages for Deployment**
- Free hosting for static sites
- Automatic deployments from GitHub
- Preview URLs for branches
- Fast global CDN

---

## Agent Context
**Ready for Phase 1: Understanding the Astro site structure.**

**Detailed progression**: @docs/context-modules/learning-phases.md
**Platform architecture**: @docs/context-modules/platform-specs.md
**Success metrics**: @docs/context-modules/progress-tracking.md

*Updated*: 2026-02-06
