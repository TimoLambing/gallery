import { test, expect } from "@playwright/test";

test.describe("Image Page", () => {
    test("it matches snapshot", async ({ page }) => {
        await page.goto("/p/0");

        await page.getByTestId("close");

        //wait for transition of buttons (max 250ms)
        await page.waitForTimeout(500);

        expect(await page.screenshot()).toMatchSnapshot();
    });
});
