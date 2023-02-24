import { test, expect } from "@playwright/test";

test.describe("Image Gallery", () => {
    const exampleImage = {
        idx: 1,
        filename: "Finding-nemo.jpg",
        filepath: "/images/Finding-nemo.jpg",
        alt: "Finding nemo",
        src: "/_nuxt/public/images/Finding-nemo.jpg",
    };

    test("it returns to home on click of close button", async ({ page }) => {
        await page.goto(`/p/${exampleImage.idx}`, { waitUntil: "networkidle" });

        await page.getByTestId("close").click();

        await page.waitForURL("/");

        await expect(page).toHaveURL("/");
    });

    test("it downloads image on click of download button", async ({ page, baseURL }) => {
        await page.goto(`/p/${exampleImage.idx}`, { waitUntil: "networkidle" });

        const downloadPromise = page.waitForEvent("download");

        await page.getByTestId("download").click();

        const download = await downloadPromise;

        const info = await download;

        expect(info.url()).toContain(exampleImage.src);
    });

    test("it opens original unoptimised image in new tab on click of source button", async ({
        page,
        context,
        baseURL,
    }) => {
        await page.goto(`/p/${exampleImage.idx}`, { waitUntil: "networkidle" });

        const pagePromise = context.waitForEvent("page");

        await page.getByTestId("source").click();

        const newPage = await pagePromise;
        await newPage.waitForLoadState();

        expect(newPage.url()).toContain(exampleImage.src);
    });

    //navigation with keypress and touch swipe
    test("it navigates to index page on Escape keypress", async ({ page }) => {
        await page.goto(`/p/${exampleImage.idx}`, { waitUntil: "networkidle" });

        await page.keyboard.down("Escape");

        await page.waitForURL("/");

        await expect(page).toHaveURL("/");
    });
    for (const k of ["ArrowLeft", "a", "A", "w", "W"]) {
        test(`it navigates on ${k} keypress to previous image`, async ({ page }) => {
            await page.goto(`/p/${exampleImage.idx}`, { waitUntil: "networkidle" });

            await page.keyboard.down(k);

            await page.waitForURL("/p/0");

            await expect(page).toHaveURL("/p/0");
        });
    }
    for (const k of ["ArrowRight", "d", "D", "s", "S"]) {
        test(`it navigates on ${k} keypress to next image`, async ({ page }) => {
            await page.goto("/p/0", { waitUntil: "networkidle" });

            await page.keyboard.down(k);

            await page.waitForURL("/p/1");

            await expect(page).toHaveURL("/p/1");
        });
    }
});
