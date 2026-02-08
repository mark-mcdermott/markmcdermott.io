# Sections 14-15: Testing and Engineering Practices - Notes

## Lessons 14-01 through 15-05
**Date**: 2026-02-06

### Playwright Fundamentals (14-01)
- Playwright runs a real browser (Chromium, Firefox, WebKit) — not a simulated DOM.
- Selectors: `getByRole()`, `getByText()`, `getByTestId()`. Prefer role-based (accessible by default).
- Assertions: `expect(locator).toBeVisible()`, `.toHaveText()`, `.toHaveAttribute()`.
- `test.describe()` groups related tests. Each `test()` gets a fresh browser context.

### Testing Static Sites (14-02)
- For SSG sites like Astro, tests verify the *built output* — no API mocking needed.
- Navigation testing: click links, verify URL changes, check page content loads.
- Content validation: verify blog posts render, pagination works, dates display correctly.
- Link checking: crawl all internal links, assert no 404s. This is pure QA instinct translated to code.

### Visual Regression Testing (14-03)
- `expect(page).toHaveScreenshot()` captures and compares screenshots.
- Threshold config: pixel diff tolerance to avoid flaky tests from anti-aliasing.
- Responsive screenshots: set viewport size, capture at each breakpoint.
- CI integration: screenshots committed as baseline, PRs show visual diffs.
- This is where my QA background shines — I already think in terms of visual verification.

### Accessibility Testing (14-04)
- `@axe-core/playwright` for automated WCAG audits inside Playwright tests.
- `await checkA11y(page)` runs a full audit and fails on violations.
- Tests keyboard navigation: Tab through page, verify focus order, test skip links.
- Can't replace manual testing — automated tools catch ~30-50% of a11y issues. The rest needs human judgment.

### Test Architecture (14-05)
- Page Object Model: classes that encapsulate page interactions (`BlogPage.navigateToPost(slug)`).
- Fixtures: shared setup code. Playwright's built-in fixture system > beforeEach for reuse.
- Parallel execution: Playwright runs tests in parallel by default. Tests must be independent.
- Organization: mirror site structure (`tests/blog.spec.ts`, `tests/navigation.spec.ts`).

### Git Advanced Workflows (15-01)
- **Rebase vs merge**: rebase = linear history (cleaner), merge = preserves branch topology (more context).
- **Cherry-pick**: grab a single commit from another branch. Useful for hotfixes.
- **Bisect**: binary search through commits to find where a bug was introduced. `git bisect start`, `git bisect good/bad`.
- **Reflog**: safety net — every HEAD movement is logged. Can recover "lost" commits.

### GitHub Actions CI (15-02)
- Workflow file: `.github/workflows/ci.yml`. Triggers on push/PR.
- Pipeline: install deps → build → run tests → deploy (on main only).
- Caching: `actions/cache` for node_modules speeds up CI.
- Status checks: require CI pass before PR merge. Enforces quality gate.

### Code Quality (15-03)
- **ESLint**: catches code issues (unused vars, missing returns, accessibility problems).
- **Prettier**: consistent formatting (tabs vs spaces, quotes, semicolons). No debates.
- **Pre-commit hooks** (husky + lint-staged): run lint/format before every commit. Catches issues early.
- These tools are non-negotiable on professional teams. Set them up early, not as an afterthought.

### Clean Code Principles (15-04)
- **Naming**: functions should say what they do. Variables should say what they hold. If you need a comment to explain a name, the name is wrong.
- **Functions**: do one thing. If a function has "and" in its description, split it.
- **Comments**: explain *why*, not *what*. Good code is self-documenting for the "what."
- **Code as communication**: you write code once, it gets read hundreds of times. Optimize for the reader.

### Technical Communication (15-05)
- **PR descriptions**: what changed, why, how to test. Reviewers aren't mind readers.
- **Explaining decisions**: "I chose X over Y because Z" — show you evaluated alternatives.
- **Documentation**: write for someone who joins the project tomorrow. That someone is future you.
- This connects directly to the portfolio — being able to explain every architectural decision is the interview differentiator.

### Connection to QA Experience
- Testing is my home turf. Playwright is just formalizing what I already do mentally.
- The key shift: as a dev, I write the tests *and* the code. No handoff, no waiting.
- QA instincts for edge cases, visual bugs, and accessibility are a genuine competitive advantage.
- Code quality tools are the automated version of the QA checklist — catching the predictable stuff so humans focus on the creative stuff.

### Ready For
- Actual site implementation — applying everything learned across all 15 sections.
