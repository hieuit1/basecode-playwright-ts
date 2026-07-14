import { test, expect } from '@playwright/test';

// Gắn cả 2 tag để cân mọi điều kiện lọc của CI/CD
test('Kịch bản Test Chống Đạn @smoke @regression', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
});