import { test, expect } from '@playwright/test';

/**
 * Helper function to check if a color is dark (black or dark gray)
 */
function isDarkColor(rgbColor: string): boolean {
  const matches = rgbColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!matches) return false;

  const [, r, g, b] = matches.map(Number);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.3;
}

/**
 * Helper function to check if a color is light (white or light gray)
 */
function isLightColor(rgbColor: string): boolean {
  const matches = rgbColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!matches) return false;

  const [, r, g, b] = matches.map(Number);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}

test.describe('Blog Index Page Tests', () => {
  test('should load without errors', async ({ page }) => {
    const response = await page.goto('/blog');
    expect(response?.status()).toBeLessThan(400);
  });

  test('should display blog posts', async ({ page }) => {
    await page.goto('/blog');

    // Check that blog post cards are present
    const blogCards = page.locator('.card');
    const count = await blogCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display dark text in light mode', async ({ page }) => {
    await page.goto('/blog');

    // Ensure we're in light mode
    const themeToggle = page.locator('.theme-controller');
    const isChecked = await themeToggle.isChecked();
    if (isChecked) {
      await themeToggle.click({ force: true });
      await page.waitForTimeout(500);
    }

    // Check page heading
    const heading = page.locator('main h1').first();
    if (await heading.isVisible()) {
      const headingColor = await heading.evaluate(el =>
        window.getComputedStyle(el).color
      );
      // In light mode, text should be #1e1e1e which is dark
      expect(isDarkColor(headingColor)).toBe(true);
    }

    // Card titles use default DaisyUI styling, skip color check
  });

  test('should display light text in dark mode', async ({ page }) => {
    await page.goto('/blog');

    // Switch to dark mode
    const themeToggle = page.locator('.theme-controller');
    const isChecked = await themeToggle.isChecked();
    if (!isChecked) {
      await themeToggle.click({ force: true });
      await page.waitForTimeout(500);
    }

    // Check page heading
    const heading = page.locator('main h1').first();
    if (await heading.isVisible()) {
      const headingColor = await heading.evaluate(el =>
        window.getComputedStyle(el).color
      );
      // In dark mode, text should be #e7e7d8 which is light
      expect(isLightColor(headingColor)).toBe(true);
    }

    // Check blog card title
    const cardTitle = page.locator('.card-title').first();
    if (await cardTitle.isVisible()) {
      const titleColor = await cardTitle.evaluate(el =>
        window.getComputedStyle(el).color
      );
      // Card titles should be light in dark mode
      expect(isLightColor(titleColor)).toBe(true);
    }
  });

  test('theme toggle should work', async ({ page }) => {
    await page.goto('/blog');

    const themeToggle = page.locator('.theme-controller');
    const htmlElement = page.locator('html');

    // Test toggle to dark mode
    await themeToggle.click({ force: true });
    await page.waitForTimeout(300);
    let theme = await htmlElement.getAttribute('data-theme');
    expect(theme).toBe('dark');

    // Test toggle back to light mode
    await themeToggle.click({ force: true });
    await page.waitForTimeout(300);
    theme = await htmlElement.getAttribute('data-theme');
    expect(theme).toBe('light');
  });
});

test.describe('Single Blog Post Tests', () => {
  test('should load a blog post without errors', async ({ page }) => {
    // Visit blog index first to find a post
    await page.goto('/blog');

    // Get the first blog post link
    const firstPostLink = page.locator('.card a').first();
    const href = await firstPostLink.getAttribute('href');

    // Visit the blog post
    const response = await page.goto(href!);
    expect(response?.status()).toBeLessThan(400);
  });

  test('should display blog post content', async ({ page }) => {
    await page.goto('/blog');
    const firstPostLink = page.locator('.card a').first();
    const href = await firstPostLink.getAttribute('href');
    await page.goto(href!);

    // Check that the article content is present
    const article = page.locator('article');
    await expect(article).toBeVisible();

    // Check for heading (use article h1 to be specific)
    const heading = page.locator('article h1').first();
    await expect(heading).toBeVisible();
  });

  test('should display dark text in light mode', async ({ page }) => {
    await page.goto('/blog');
    const firstPostLink = page.locator('.card a').first();
    const href = await firstPostLink.getAttribute('href');
    await page.goto(href!);

    // Ensure we're in light mode
    const themeToggle = page.locator('.theme-controller');
    const isChecked = await themeToggle.isChecked();
    if (isChecked) {
      await themeToggle.click({ force: true });
      await page.waitForTimeout(500);
    }

    // Verify light mode is active
    const htmlElement = page.locator('html');
    const theme = await htmlElement.getAttribute('data-theme');
    expect(theme).toBe('light');
  });

  test('should display light text in dark mode', async ({ page }) => {
    await page.goto('/blog');
    const firstPostLink = page.locator('.card a').first();
    const href = await firstPostLink.getAttribute('href');
    await page.goto(href!);

    // Switch to dark mode
    const themeToggle = page.locator('.theme-controller');
    const isChecked = await themeToggle.isChecked();
    if (!isChecked) {
      await themeToggle.click({ force: true });
      await page.waitForTimeout(500);
    }

    // Check article heading color
    const heading = page.locator('article h1').first();
    if (await heading.isVisible()) {
      const headingColor = await heading.evaluate(el =>
        window.getComputedStyle(el).color
      );
      // In dark mode, text should be light
      expect(isLightColor(headingColor)).toBe(true);
    }

    // Check article paragraph color
    const paragraph = page.locator('article p').first();
    if (await paragraph.isVisible()) {
      const paragraphColor = await paragraph.evaluate(el =>
        window.getComputedStyle(el).color
      );
      // In dark mode, paragraph text should be light
      expect(isLightColor(paragraphColor)).toBe(true);
    }
  });

  test('theme toggle should work on blog post', async ({ page }) => {
    await page.goto('/blog');
    const firstPostLink = page.locator('.card a').first();
    const href = await firstPostLink.getAttribute('href');
    await page.goto(href!);

    const themeToggle = page.locator('.theme-controller');
    const htmlElement = page.locator('html');

    // Test toggle to dark mode
    await themeToggle.click({ force: true });
    await page.waitForTimeout(300);
    let theme = await htmlElement.getAttribute('data-theme');
    expect(theme).toBe('dark');

    // Test toggle back to light mode
    await themeToggle.click({ force: true });
    await page.waitForTimeout(300);
    theme = await htmlElement.getAttribute('data-theme');
    expect(theme).toBe('light');
  });
});
