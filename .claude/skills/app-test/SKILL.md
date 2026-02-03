# App Test Skill

Playwright-based testing for the c64 portfolio site.

## Workflow

1. **Build the site**: `npm run build`
2. **Run existing E2E tests**: `npm run test:e2e`
3. **Check test results**: Review pass/fail and console output
4. **If tests pass**: Report success
5. **If tests fail**: Analyze failure, suggest fix

## Testing Standards

### Pass Criteria
- All Playwright tests pass
- Astro build completes without errors
- No broken links or missing pages
- Core pages render correctly (home, blog listing, blog post, about)

### Common Issues to Check
- Broken content collection schemas (Zod validation errors)
- Missing markdown frontmatter fields
- SCSS compilation errors
- Responsive layout breakage at common breakpoints
- Missing images or assets
- Broken internal links

### What to Test Manually (Playwright MCP)
If E2E tests are insufficient, use Playwright MCP to verify:
1. Home page loads and shows content
2. Blog listing page renders posts correctly
3. Individual blog posts render markdown content
4. Navigation works between all pages
5. Responsive layout works at mobile, tablet, desktop widths
6. C64 theme styling renders correctly
7. Images load with proper optimization

## Integration
- Run after any code changes that affect pages, components, or styles
- Run before committing (part of pre-commit workflow)
- Use `/commit` skill after tests pass
