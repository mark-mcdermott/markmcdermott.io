# Section 03: Routing and Pages - Notes

## Lessons 01-03: File-Based Routing, Dynamic Routes, Pagination
**Date**: 2026-02-06

### Key Insights
- File-based routing is dead simple: file path minus `src/pages/` minus extension = URL. `index` files become the directory root.
- Two styles: `about.astro` (standalone page) vs `about/index.astro` (when the route has children). Same URL, different organizational purpose.
- Dynamic routes (`[slug].astro`) require `getStaticPaths()` because Astro needs to know every page at build time — there's no server to handle requests dynamically.
- Rest parameters (`[...slug].astro`) catch any number of URL segments. Used for catch-all routes and pagination.

### Pagination Mental Model
- `paginate(posts, { pageSize: 2 })` is just a convenience function that builds the `getStaticPaths` return array for you.
- Each entry has `{ params, props }` — same shape as any dynamic route.
- Page 1 has `params: {}` (undefined) so it matches the bare URL `/blog/` — that's why pagination uses `[...page]` not `[page]`.
- The `page` prop gives you everything: `.data` (posts for this page), `.currentPage`, `.lastPage`, `.url.prev`, `.url.next`.

### Connection to QA Experience
- The file system IS the router — no hidden configuration. Easy to audit, easy to test. You can look at `src/pages/` and know every URL on the site.

### Ready For
- Section 04: Astro Internals — build process, islands, integrations.
