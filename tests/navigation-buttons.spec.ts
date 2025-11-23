import { test, expect } from '@playwright/test';

/**
 * Helper function to get computed styles of an element
 */
async function getComputedStyles(page: any, selector: string) {
  return await page.locator(selector).evaluate((el: HTMLElement) => {
    const styles = window.getComputedStyle(el);
    return {
      paddingTop: styles.paddingTop,
      paddingRight: styles.paddingRight,
      paddingBottom: styles.paddingBottom,
      paddingLeft: styles.paddingLeft,
      color: styles.color,
      backgroundColor: styles.backgroundColor,
      borderTopWidth: styles.borderTopWidth,
      borderRightWidth: styles.borderRightWidth,
      borderBottomWidth: styles.borderBottomWidth,
      borderLeftWidth: styles.borderLeftWidth,
      borderTopColor: styles.borderTopColor,
      borderRightColor: styles.borderRightColor,
      borderBottomColor: styles.borderBottomColor,
      borderLeftColor: styles.borderLeftColor,
      borderTopStyle: styles.borderTopStyle,
      borderRightStyle: styles.borderRightStyle,
      borderBottomStyle: styles.borderBottomStyle,
      borderLeftStyle: styles.borderLeftStyle,
    };
  });
}

test.describe('Navigation Buttons - Light Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Ensure we're in light mode
    const themeToggle = page.locator('.theme-controller');
    const isChecked = await themeToggle.isChecked();
    if (isChecked) {
      await themeToggle.click();
      await page.waitForTimeout(500);
    }
  });

  test('About button - default state in light mode', async ({ page }) => {
    const styles = await getComputedStyles(page, 'a[href="/about"]');

    // Text color should be dark (#1e1e1e)
    expect(styles.color).toBe('rgb(30, 30, 30)');

    // Background should be white
    expect(styles.backgroundColor).toBe('rgb(255, 255, 255)');

    // Border should be 1px solid #999 on desktop (md+)
    // Note: These tests run on desktop viewport by default
    expect(styles.borderTopWidth).toBe('0px');
    expect(styles.borderRightWidth).toBe('1px');
    expect(styles.borderBottomWidth).toBe('1px');
    expect(styles.borderLeftWidth).toBe('1px');

    expect(styles.borderTopColor).toBe('rgb(153, 153, 153)');
    expect(styles.borderRightColor).toBe('rgb(153, 153, 153)');
    expect(styles.borderBottomColor).toBe('rgb(153, 153, 153)');
    expect(styles.borderLeftColor).toBe('rgb(153, 153, 153)');

    expect(styles.borderTopStyle).toBe('solid');
    expect(styles.borderRightStyle).toBe('solid');
    expect(styles.borderBottomStyle).toBe('solid');
    expect(styles.borderLeftStyle).toBe('solid');
  });

  test('Blog button - default state in light mode', async ({ page }) => {
    const styles = await getComputedStyles(page, 'a[href="/blog"]');

    expect(styles.color).toBe('rgb(30, 30, 30)');
    expect(styles.backgroundColor).toBe('rgb(255, 255, 255)');

    expect(styles.borderTopWidth).toBe('0px');
    expect(styles.borderRightWidth).toBe('1px');
    expect(styles.borderBottomWidth).toBe('1px');
    expect(styles.borderLeftWidth).toBe('1px');

    expect(styles.borderRightColor).toBe('rgb(153, 153, 153)');
    expect(styles.borderBottomColor).toBe('rgb(153, 153, 153)');
    expect(styles.borderLeftColor).toBe('rgb(153, 153, 153)');
  });

  test('Github button - default state in light mode', async ({ page }) => {
    const styles = await getComputedStyles(page, 'a[href="https://github.com/mark-mcdermott"]');

    // Github button should have black text initially, then white on hover
    expect(styles.color).toBe('rgb(0, 0, 0)');

    // Background should be orange (#ea4125)
    expect(styles.backgroundColor).toBe('rgb(234, 65, 37)');

    expect(styles.borderTopWidth).toBe('0px');
    expect(styles.borderRightWidth).toBe('1px');
    expect(styles.borderBottomWidth).toBe('1px');
    expect(styles.borderLeftWidth).toBe('1px');

    expect(styles.borderRightColor).toBe('rgb(153, 153, 153)');
    expect(styles.borderBottomColor).toBe('rgb(153, 153, 153)');
    expect(styles.borderLeftColor).toBe('rgb(153, 153, 153)');
  });

  test('About button - hover state in light mode', async ({ page }) => {
    const button = page.locator('a[href="/about"]');
    await button.hover();
    await page.waitForTimeout(100);

    const styles = await getComputedStyles(page, 'a[href="/about"]');

    // Text color should remain dark
    expect(styles.color).toBe('rgb(30, 30, 30)');

    // Background should change to gray on hover
    expect(styles.backgroundColor).toBe('rgb(229, 231, 235)'); // gray-200
  });

  test('Blog button - hover state in light mode', async ({ page }) => {
    const button = page.locator('a[href="/blog"]');
    await button.hover();
    await page.waitForTimeout(100);

    const styles = await getComputedStyles(page, 'a[href="/blog"]');

    expect(styles.color).toBe('rgb(30, 30, 30)');
    expect(styles.backgroundColor).toBe('rgb(229, 231, 235)');
  });

  test('Github button - hover state in light mode', async ({ page }) => {
    const button = page.locator('a[href="https://github.com/mark-mcdermott"]');
    await button.hover();
    await page.waitForTimeout(100);

    const styles = await getComputedStyles(page, 'a[href="https://github.com/mark-mcdermott"]');

    // Text should be white on hover
    expect(styles.color).toBe('rgb(255, 255, 255)');

    // Background should darken on hover
    expect(styles.backgroundColor).toBe('rgb(220, 38, 38)'); // orange-600
  });
});

test.describe('Navigation Buttons - Dark Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Switch to dark mode
    const themeToggle = page.locator('.theme-controller');
    const isChecked = await themeToggle.isChecked();
    if (!isChecked) {
      await themeToggle.click();
      await page.waitForTimeout(500);
    }
  });

  test('About button - default state in dark mode', async ({ page }) => {
    const styles = await getComputedStyles(page, 'a[href="/about"]');

    // Text color should still be dark (background is white)
    expect(styles.color).toBe('rgb(30, 30, 30)');

    // Background should be white
    expect(styles.backgroundColor).toBe('rgb(255, 255, 255)');

    // Borders should still be #999
    expect(styles.borderRightColor).toBe('rgb(153, 153, 153)');
    expect(styles.borderBottomColor).toBe('rgb(153, 153, 153)');
    expect(styles.borderLeftColor).toBe('rgb(153, 153, 153)');
  });

  test('Blog button - default state in dark mode', async ({ page }) => {
    const styles = await getComputedStyles(page, 'a[href="/blog"]');

    expect(styles.color).toBe('rgb(30, 30, 30)');
    expect(styles.backgroundColor).toBe('rgb(255, 255, 255)');
    expect(styles.borderRightColor).toBe('rgb(153, 153, 153)');
  });

  test('Github button - default state in dark mode', async ({ page }) => {
    const styles = await getComputedStyles(page, 'a[href="https://github.com/mark-mcdermott"]');

    expect(styles.color).toBe('rgb(0, 0, 0)');
    expect(styles.backgroundColor).toBe('rgb(234, 65, 37)');
    expect(styles.borderRightColor).toBe('rgb(153, 153, 153)');
  });

  test('About button - hover state in dark mode', async ({ page }) => {
    const button = page.locator('a[href="/about"]');
    await button.hover();
    await page.waitForTimeout(100);

    const styles = await getComputedStyles(page, 'a[href="/about"]');

    expect(styles.color).toBe('rgb(30, 30, 30)');
    expect(styles.backgroundColor).toBe('rgb(229, 231, 235)');
  });

  test('Blog button - hover state in dark mode', async ({ page }) => {
    const button = page.locator('a[href="/blog"]');
    await button.hover();
    await page.waitForTimeout(100);

    const styles = await getComputedStyles(page, 'a[href="/blog"]');

    expect(styles.color).toBe('rgb(30, 30, 30)');
    expect(styles.backgroundColor).toBe('rgb(229, 231, 235)');
  });

  test('Github button - hover state in dark mode', async ({ page }) => {
    const button = page.locator('a[href="https://github.com/mark-mcdermott"]');
    await button.hover();
    await page.waitForTimeout(100);

    const styles = await getComputedStyles(page, 'a[href="https://github.com/mark-mcdermott"]');

    expect(styles.color).toBe('rgb(255, 255, 255)');
    expect(styles.backgroundColor).toBe('rgb(220, 38, 38)');
  });
});
