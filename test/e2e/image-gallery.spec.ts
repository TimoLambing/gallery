import { test, expect } from "@playwright/test";

test.describe("Image Gallery", () => {
    const exampleImage = {
        idx: 1,
        filename: "Hallstatter-See-Austria.jpg",
        alt: "Hallstatter See Austria",
        src: "/_nuxt/.../Hallstatter-See-Austria.jpg",
    };

    test("it returns to home on click of close button", async ({ page }) => {
        await page.goto(`/p/${exampleImage.idx}`, { waitUntil: "networkidle" });

        await page.getByTestId("close").click();

        await page.waitForURL("/");

        await expect(page).toHaveURL("/");
    });

    //navigation with keypress and touch swipe
    test("it navigates to index page on Escape keypress", async ({ page }) => {
        await page.goto(`/p/${exampleImage.idx}`, { waitUntil: "networkidle" });

        await page.keyboard.down("Escape");

        await page.waitForURL("/");

        await expect(page).toHaveURL("/");
    });
    for (const k of ["ArrowLeft", "ArrowUp", "a", "A", "w", "W"]) {
        test(`it navigates on ${k} keypress to previous image`, async ({ page }) => {
            await page.goto(`/p/${exampleImage.idx}`, { waitUntil: "networkidle" });

            await page.keyboard.down(k);

            await page.waitForURL(`/p/${exampleImage.idx - 1}`);

            await expect(page).toHaveURL(`/p/${exampleImage.idx - 1}`);
        });
    }
    for (const k of ["ArrowRight", "ArrowDown", "d", "D", "s", "S"]) {
        test(`it navigates on ${k} keypress to next image`, async ({ page }) => {
            await page.goto(`/p/${exampleImage.idx}`, { waitUntil: "networkidle" });

            await page.keyboard.down(k);

            await page.waitForURL(`/p/${exampleImage.idx + 1}`);

            await expect(page).toHaveURL(`/p/${exampleImage.idx + 1}`);
        });
    }
});
