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

    test("it downloads image on click of download button", async ({ page }) => {
        await page.goto(`/p/${exampleImage.idx}`, { waitUntil: "networkidle" });

        const downloadPromise = page.waitForEvent("download");

        await page.getByTestId("download").click();

        const download = await downloadPromise;

        const info = await download;

        expect(info.url()).toContain(exampleImage.filename);
    });

    test("it opens original image in new tab on click of source button", async ({ page, context }) => {
        await page.goto(`/p/${exampleImage.idx}`, { waitUntil: "networkidle" });

        const pagePromise = context.waitForEvent("page");

        await page.getByTestId("source").click();

        const newPage = await pagePromise;
        await newPage.waitForLoadState();

        expect(newPage.url()).toContain(exampleImage.filename);
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
