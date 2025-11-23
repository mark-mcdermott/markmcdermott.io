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

    // Ensure we're in light mode
    const themeToggle = page.locator('.theme-controller');
    const isChecked = await themeToggle.isChecked();
    if (isChecked) {
      await themeToggle.click();
      await page.waitForTimeout(500);
    }

    // Check main heading color
    const heading = page.locator('.landing-hero h1.hero-title');
    const headingColor = await heading.evaluate(el =>
      window.getComputedStyle(el).color
    );
    expect(isDarkColor(headingColor)).toBe(true);

    // Check banner text color
    const bannerText = page.locator('.landing-banner').first();
    const bannerColor = await bannerText.evaluate(el =>
      window.getComputedStyle(el).color
    );
    expect(isDarkColor(bannerColor)).toBe(true);
  });

  test('should display light text in dark mode', async ({ page }) => {
    await page.goto('/');

    // Switch to dark mode
    const themeToggle = page.locator('.theme-controller');
    const isChecked = await themeToggle.isChecked();
    if (!isChecked) {
      await themeToggle.click();
      await page.waitForTimeout(500);
    }

    // Check main heading color
    const heading = page.locator('.landing-hero h1.hero-title');
    const headingColor = await heading.evaluate(el =>
      window.getComputedStyle(el).color
    );
    expect(isLightColor(headingColor)).toBe(true);

    // Check banner text color
    const bannerText = page.locator('.landing-banner').first();
    const bannerColor = await bannerText.evaluate(el =>
      window.getComputedStyle(el).color
    );
    expect(isLightColor(bannerColor)).toBe(true);
  });

  test('theme toggle should work', async ({ page }) => {
    await page.goto('/');

    const themeToggle = page.locator('.theme-controller');
    const htmlElement = page.locator('html');

    // Test toggle to dark mode
    await themeToggle.click();
    await page.waitForTimeout(300);
    let theme = await htmlElement.getAttribute('data-theme');
    expect(theme).toBe('dark');

    // Test toggle back to light mode
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

    // Ensure we're in light mode
    const themeToggle = page.locator('.theme-controller');
    const isChecked = await themeToggle.isChecked();
    if (isChecked) {
      await themeToggle.click();
      await page.waitForTimeout(500);
    }

    // Check heading color
    const heading = page.locator('h2.text-white').first();
    const headingColor = await heading.evaluate(el =>
      window.getComputedStyle(el).color
    );
    expect(isDarkColor(headingColor)).toBe(true);

    // Check tech badge text color
    const techBadge = page.locator('.text-white.rounded-full').first();
    const badgeColor = await techBadge.evaluate(el =>
      window.getComputedStyle(el).color
    );
    expect(isDarkColor(badgeColor)).toBe(true);
  });

  test('should display light text in dark mode', async ({ page }) => {
    await page.goto('/about');

    // Switch to dark mode
    const themeToggle = page.locator('.theme-controller');
    const isChecked = await themeToggle.isChecked();
    if (!isChecked) {
      await themeToggle.click();
      await page.waitForTimeout(500);
    }

    // Check heading color
    const heading = page.locator('h2.text-white').first();
    const headingColor = await heading.evaluate(el =>
      window.getComputedStyle(el).color
    );
    expect(isLightColor(headingColor)).toBe(true);

    // Check tech badge text color
    const techBadge = page.locator('.text-white.rounded-full').first();
    const badgeColor = await techBadge.evaluate(el =>
      window.getComputedStyle(el).color
    );
    expect(isLightColor(badgeColor)).toBe(true);
  });

  test('theme toggle should work', async ({ page }) => {
    await page.goto('/about');

    const themeToggle = page.locator('.theme-controller');
    const htmlElement = page.locator('html');

    // Test toggle to dark mode
    await themeToggle.click();
    await page.waitForTimeout(300);
    let theme = await htmlElement.getAttribute('data-theme');
    expect(theme).toBe('dark');

    // Test toggle back to light mode
    await themeToggle.click();
    await page.waitForTimeout(300);
    theme = await htmlElement.getAttribute('data-theme');
    expect(theme).toBe('light');
  });
});
