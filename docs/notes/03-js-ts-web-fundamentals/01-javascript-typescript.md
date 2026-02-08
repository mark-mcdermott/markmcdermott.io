# Section 09: JavaScript and TypeScript Essentials - Notes

## Lessons 01-07
**Date**: 2026-02-06

### Event Loop (09-01)
- JS is single-threaded: one call stack, one thing at a time.
- Concurrency through Web APIs (browser threads for timers, network, DOM events).
- When async work completes, callback goes to a queue. Event loop moves it to stack when stack is empty.
- `setTimeout(fn, 0)` doesn't run immediately — it goes through the queue. Stack must clear first.
- **Microtask queue** (Promises) has priority over regular task queue (setTimeout).
- Promise callbacks always run before setTimeout callbacks, regardless of order queued.

### Closures (09-02)
- A function that remembers variables from the scope where it was created.
- Happens automatically when inner functions reference outer variables.
- Event handlers and callbacks are closures — they "close over" outer variables.

### Async Patterns (09-03)
- Evolution: callbacks (nested, hard to read) → Promises (chainable) → async/await (reads like sync).
- async/await is sugar over Promises — same event loop mechanism underneath.
- Error handling: `try/catch` with async/await.
- Already used `await` in Astro frontmatter: `await getCollection('blog')`.

### ES Modules (09-04)
- `import { name } from './file'` — named imports.
- `export default` — one default export per file.
- Tree shaking: bundler drops unused exports. Only works with ES modules (import/export), not require().
- Everything in Astro uses ES modules.

### TypeScript (09-05, 09-06)
- Type annotations: `let name: string`, function return types, optional properties (`?`).
- `interface` for object shapes (extendable). `type` for everything else (unions, primitives).
- Generics: `function first<T>(arr: T[]): T` — type placeholder filled in at usage.
- Utility types: `Partial<T>`, `Required<T>`, `Pick<T, keys>`, `Omit<T, keys>`.
- Zod does at runtime what TypeScript does at compile time.

### DOM Manipulation (09-07)
- `document.querySelector()`, `.addEventListener()`, `.classList.toggle()`.
- Event delegation: one listener on parent, check `e.target.matches()`. Better performance.
- In Astro, DOM code goes in `<script>` tags (ships to browser, unlike frontmatter).

### JS Knowledge Gaps Identified
- Array methods (.filter, .sort, .slice, .map) — know they exist but not in muscle memory yet.
- Will build fluency through practice during site implementation.

### Ready For
- Section 10: Browser Internals.
