import { test, expect } from "@playwright/test";

test.describe("Image Page", () => {
    test("it matches snapshot", async ({ page }) => {
        await page.goto("/p/0");

        const selector = '[data-testid="close"]';
        await page.waitForSelector(selector, { timeout: 5000 });

        expect(await page.screenshot()).toMatchSnapshot();
    });
});
