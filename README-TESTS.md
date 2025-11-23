# Playwright Test Suite

This project includes comprehensive Playwright tests to ensure the website functions correctly across different browsers and theme modes.

## Running Tests

```bash
# Run all tests headless
npm test

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed
```

## Test Coverage

### Homepage Tests (`tests/homepage-about.spec.ts`)

1. **Load Test**: Verifies the homepage loads without 400/500 errors
2. **Dark Text in Light Mode**: Ensures main heading and banner text are dark (black/dark-gray) in light mode
3. **Light Text in Dark Mode**: Ensures main heading and banner text are light (white) in dark mode
4. **Theme Toggle**: Verifies the light/dark mode toggle switches correctly

### About Page Tests (`tests/homepage-about.spec.ts`)

1. **Load Test**: Verifies the about page loads without 400/500 errors
2. **Dark Text in Light Mode**: Ensures headings and tech badges are dark in light mode
3. **Light Text in Dark Mode**: Ensures headings and tech badges are light in dark mode
4. **Theme Toggle**: Verifies the light/dark mode toggle switches correctly

### Blog Index Tests (`tests/blog.spec.ts`)

1. **Load Test**: Verifies the blog index page loads without 400/500 errors
2. **Blog Posts Display**: Ensures blog post cards are present
3. **Dark Text in Light Mode**: Checks headings and card titles are dark in light mode
4. **Light Text in Dark Mode**: Checks headings and card titles are light in dark mode
5. **Theme Toggle**: Verifies the light/dark mode toggle works

### Single Blog Post Tests (`tests/blog.spec.ts`)

1. **Load Test**: Verifies a blog post page loads without 400/500 errors
2. **Content Display**: Ensures article content and headings are visible
3. **Dark Text in Light Mode**: Checks article headings and paragraphs are dark in light mode
4. **Light Text in Dark Mode**: Checks article headings and paragraphs are light in dark mode
5. **Theme Toggle**: Verifies the light/dark mode toggle works

## Test Configuration

- Tests run on **Chromium**, **Firefox**, and **WebKit** (Safari)
- Base URL: `http://localhost:4321`
- Dev server automatically starts before tests
- Retries: 2 on CI, 0 locally
- Reporter: HTML (viewable in `playwright-report/`)

## Known Issues

Some tests may have issues with:
1. **Theme toggle clicks**: The SVG overlay on the theme toggle button can interfere with clicks in headless mode
2. **Color detection on blog pages**: Some pages may have different text colors than expected due to DaisyUI defaults

These issues don't affect manual usage but may cause automated test failures. They can be addressed by:
- Using `force: true` on toggle clicks
- Adjusting the color threshold values in the helper functions
- Adding more specific selectors for text elements

## Color Detection Logic

Tests use helper functions to determine if colors are "dark" or "light":
- **Dark colors**: RGB luminance < 0.3 (black, dark gray)
- **Light colors**: RGB luminance > 0.6 (white, light gray)
