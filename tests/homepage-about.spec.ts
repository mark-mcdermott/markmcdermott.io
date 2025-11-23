import { test, expect } from '@playwright/test';

/**
 * Helper function to check if a color is dark (black or dark gray)
 * Dark colors have low lightness values in RGB
 */
function isDarkColor(rgbColor: string): boolean {
  const matches = rgbColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!matches) return false;

  const [, r, g, b] = matches.map(Number);
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  // Dark colors have luminance < 0.3
  return luminance < 0.3;
}

/**
 * Helper function to check if a color is light (white or light gray)
 */
function isLightColor(rgbColor: string): boolean {
  const matches = rgbColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!matches) return false;

  const [, r, g, b] = matches.map(Number);
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  // Light colors have luminance > 0.6
  return luminance > 0.6;
}

test.describe('Homepage Tests', () => {
  test('should load without errors', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(400);
  });

  test('should display dark text in light mode', async ({ page }) => {
    await page.goto('/');

    // Set to light mode via localStorage
    await page.evaluate(() => {
      localStorage.setItem('theme-mode', 'light');
    });
    await page.reload();
    await page.waitForTimeout(300);

    // Check main heading color
    const heading = page.locator('.landing-hero h1.hero-title');
    const headingColor = await heading.evaluate(el =>
      window.getComputedStyle(el).color
    );
    // In light mode, text should be dark
    expect(isDarkColor(headingColor)).toBe(true);

    // Check banner text color
    const bannerText = page.locator('.landing-banner').first();
    const bannerColor = await bannerText.evaluate(el =>
      window.getComputedStyle(el).color
    );
    // Banner text should be dark in light mode
    expect(isDarkColor(bannerColor)).toBe(true);
  });

  test('should display light text in dark mode', async ({ page }) => {
    await page.goto('/');

    // Set to dark mode via localStorage
    await page.evaluate(() => {
      localStorage.setItem('theme-mode', 'dark');
    });
    await page.reload();
    await page.waitForTimeout(300);

    // Check main heading color
    const heading = page.locator('.landing-hero h1.hero-title');
    const headingColor = await heading.evaluate(el =>
      window.getComputedStyle(el).color
    );
    // In dark mode, text should be light
    expect(isLightColor(headingColor)).toBe(true);

    // Check banner text color
    const bannerText = page.locator('.landing-banner').first();
    const bannerColor = await bannerText.evaluate(el =>
      window.getComputedStyle(el).color
    );
    // Banner text should be light in dark mode
    expect(isLightColor(bannerColor)).toBe(true);
  });

  test('theme toggle should cycle through modes', async ({ page }) => {
    await page.goto('/');

    // Start with light mode
    await page.evaluate(() => {
      localStorage.setItem('theme-mode', 'light');
    });
    await page.reload();
    await page.waitForTimeout(300);

    const themeToggle = page.locator('.theme-toggle');
    const htmlElement = page.locator('html');

    // Click once: light -> dark
    await themeToggle.click();
    await page.waitForTimeout(300);
    let theme = await htmlElement.getAttribute('data-theme');
    expect(theme).toBe('dark');

    // Click twice: dark -> system (could be light or dark depending on OS)
    await themeToggle.click();
    await page.waitForTimeout(300);
    theme = await htmlElement.getAttribute('data-theme');
    expect(['light', 'dark']).toContain(theme);

    // Click three times: system -> light
    await themeToggle.click();
    await page.waitForTimeout(300);
    theme = await htmlElement.getAttribute('data-theme');
    expect(theme).toBe('light');
  });
});

test.describe('About Page Tests', () => {
  test('should load without errors', async ({ page }) => {
    const response = await page.goto('/about');
    expect(response?.status()).toBeLessThan(400);
  });

  test('should display dark text in light mode', async ({ page }) => {
    await page.goto('/about');

    // Set to light mode via localStorage
    await page.evaluate(() => {
      localStorage.setItem('theme-mode', 'light');
    });
    await page.reload();
    await page.waitForTimeout(300);

    // Check heading color
    const heading = page.locator('h2.text-white').first();
    const headingColor = await heading.evaluate(el =>
      window.getComputedStyle(el).color
    );
    // In light mode, text should be dark
    expect(isDarkColor(headingColor)).toBe(true);

    // Check tech badge text color
    const techBadge = page.locator('.text-white.rounded-full').first();
    const badgeColor = await techBadge.evaluate(el =>
      window.getComputedStyle(el).color
    );
    // Tech badge text should be dark in light mode
    expect(isDarkColor(badgeColor)).toBe(true);
  });

  test('should display light text in dark mode', async ({ page }) => {
    await page.goto('/about');

    // Set to dark mode via localStorage
    await page.evaluate(() => {
      localStorage.setItem('theme-mode', 'dark');
    });
    await page.reload();
    await page.waitForTimeout(300);

    // Check heading color
    const heading = page.locator('h2.text-white').first();
    const headingColor = await heading.evaluate(el =>
      window.getComputedStyle(el).color
    );
    // In dark mode, text should be light
    expect(isLightColor(headingColor)).toBe(true);

    // Check tech badge text color
    const techBadge = page.locator('.text-white.rounded-full').first();
    const badgeColor = await techBadge.evaluate(el =>
      window.getComputedStyle(el).color
    );
    // Tech badge text should be light in dark mode
    expect(isLightColor(badgeColor)).toBe(true);
  });

  test('theme toggle should cycle through modes', async ({ page }) => {
    await page.goto('/about');

    // Start with light mode
    await page.evaluate(() => {
      localStorage.setItem('theme-mode', 'light');
    });
    await page.reload();
    await page.waitForTimeout(300);

    const themeToggle = page.locator('.theme-toggle');
    const htmlElement = page.locator('html');

    // Click once: light -> dark
    await themeToggle.click();
    await page.waitForTimeout(300);
    let theme = await htmlElement.getAttribute('data-theme');
    expect(theme).toBe('dark');

    // Click twice: dark -> system (could be light or dark depending on OS)
    await themeToggle.click();
    await page.waitForTimeout(300);
    theme = await htmlElement.getAttribute('data-theme');
    expect(['light', 'dark']).toContain(theme);

    // Click three times: system -> light
    await themeToggle.click();
    await page.waitForTimeout(300);
    theme = await htmlElement.getAttribute('data-theme');
    expect(theme).toBe('light');
  });
});
