# Section 02: Content Collections - Notes

## Lessons 01-03: Basics, Querying, and Rendering
**Date**: 2026-02-06

### Key Insights
- Content collections are Astro's way of managing structured content (blog posts, projects) with type safety. The schema acts as a contract — if frontmatter is missing or malformed, the build fails before anything reaches production.
- Two collection types: `'content'` (markdown with a body to render) and `'data'` (JSON/YAML, just structured data, no body).
- Zod schemas validate frontmatter at build time. `z.coerce.date()` converts date strings to Date objects. `.default(false)` makes fields optional with a fallback.

### Mental Model
```
src/content.config.ts     → defines the contract (schema)
src/content/blog/*.md     → content files that must satisfy the contract
getCollection('blog')     → returns all entries (typed array)
getEntry('blog', 'slug')  → returns one specific entry
render(post)              → compiles markdown body into <Content /> component
```

### Querying Pattern
- `getCollection('blog')` → array of all posts. Use for listing pages.
- `getCollection('blog', filterFn)` → filtered array. Used to exclude drafts.
- `getEntry('blog', 'slug')` → single post. Use when you know exactly which one.
- After getCollection, it's just a JavaScript array — .filter(), .sort(), .map() all work.

### The SSG Mental Shift
- `[slug].astro` doesn't run per-request. It's a template that stamps out every page at build time.
- `getStaticPaths()` must return every possible page because there's no server at runtime.
- This felt weird at first — a "single post" template fetching ALL posts. But it makes sense: Astro needs to know every page upfront to generate static HTML.

### Schema Validation in Action
- Created an intentionally broken post (missing description, invalid date).
- Build failed with clear errors: "description: Required" and "pubDate: Invalid date".
- This is like having a test suite for your content — catches problems before deployment.

### Connection to QA Experience
- Schema validation is essentially a test contract for content. Every post is validated before build completes — same principle as failing a build on test failures.
- The "broken post" demo was basically a negative test case.

### JS Knowledge Gap Noted
- Array methods (.filter, .sort, .slice, .map) — I know they exist but don't have them in muscle memory yet. Covered properly in Part 3, Section 09.

### Ready For
- Section 03: Routing and Pages — file-based routing, dynamic routes, pagination.
