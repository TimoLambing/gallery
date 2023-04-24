import { describe, it, expect, vi } from "vitest";
import { getImages, downloadImage, getNextImageIndex } from ".";
import type { Image } from "@/types";

describe("getImages", () => {
    it("should return correct images and format", () => {
        const result = getImages();

        expect(result).toMatchInlineSnapshot(`
          [
            {
              "alt": "Atacama Desert Chile",
              "filename": "Atacama-Desert-Chile.jpg",
              "filepath": "/images/Atacama-Desert-Chile.jpg",
              "idx": 0,
              "src": "/src/public/images/Atacama-Desert-Chile.jpg",
            },
            {
              "alt": "Hallstatter See Austria",
              "filename": "Hallstatter-See-Austria.jpg",
              "filepath": "/images/Hallstatter-See-Austria.jpg",
              "idx": 1,
              "src": "/src/public/images/Hallstatter-See-Austria.jpg",
            },
            {
              "alt": "Night sky Italy",
              "filename": "Night-sky-Italy.jpg",
              "filepath": "/images/Night-sky-Italy.jpg",
              "idx": 2,
              "src": "/src/public/images/Night-sky-Italy.jpg",
            },
            {
              "alt": "Wadi Rum Village Jordan Sunset",
              "filename": "Wadi-Rum-Village-Jordan-Sunset.jpg",
              "filepath": "/images/Wadi-Rum-Village-Jordan-Sunset.jpg",
              "idx": 3,
              "src": "/src/public/images/Wadi-Rum-Village-Jordan-Sunset.jpg",
            },
            {
              "alt": "a red panda",
              "filename": "a-red-panda.jpg",
              "filepath": "/images/a-red-panda.jpg",
              "idx": 4,
              "src": "/src/public/images/a-red-panda.jpg",
            },
            {
              "alt": "coon",
              "filename": "coon.jpg",
              "filepath": "/images/coon.jpg",
              "idx": 5,
              "src": "/src/public/images/coon.jpg",
            },
            {
              "alt": "ebeltoft denmark",
              "filename": "ebeltoft-denmark.jpg",
              "filepath": "/images/ebeltoft-denmark.jpg",
              "idx": 6,
              "src": "/src/public/images/ebeltoft-denmark.jpg",
            },
            {
              "alt": "iceland aurora borealis",
              "filename": "iceland-aurora-borealis.jpg",
              "filepath": "/images/iceland-aurora-borealis.jpg",
              "idx": 7,
              "src": "/src/public/images/iceland-aurora-borealis.jpg",
            },
            {
              "alt": "kitteh",
              "filename": "kitteh.jpg",
              "filepath": "/images/kitteh.jpg",
              "idx": 8,
              "src": "/src/public/images/kitteh.jpg",
            },
            {
              "alt": "llama",
              "filename": "llama.jpg",
              "filepath": "/images/llama.jpg",
              "idx": 9,
              "src": "/src/public/images/llama.jpg",
            },
            {
              "alt": "victoria peak",
              "filename": "victoria-peak.jpg",
              "filepath": "/images/victoria-peak.jpg",
              "idx": 10,
              "src": "/src/public/images/victoria-peak.jpg",
            },
          ]
        `);
    });
});

describe("downloadImage", () => {
    const exampleImage: Image = {
        idx: 0,
        filename: "Atacama-Desert-Chile.jpg",
        filepath: "/images/Atacama-Desert-Chile.jpg",
        alt: "Atacama Desert Chile",
        src: "/_nuxt/public/images/Atacama-Desert-Chile.jpg",
    };
    it("should download correctly", () => {
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        const mockLink = {
            href: "",
            click: vi.fn(),
            download: "",
            setAttribute: vi.fn(),
        } as any;

        const createElementSpy = vi.spyOn(document, "createElement").mockReturnValueOnce(mockLink);
        document.body.appendChild = vi.fn();
        document.body.removeChild = vi.fn();

        downloadImage(exampleImage);

        expect(createElementSpy).toBeCalledWith("a");

        expect(mockLink.setAttribute.mock.calls.length).toBe(2);

        expect(mockLink.setAttribute.mock.calls[0]).toEqual(["href", exampleImage.filepath]);
        expect(mockLink.setAttribute.mock.calls[1]).toEqual(["download", exampleImage.filename]);

        expect(document.body.appendChild).toBeCalledWith(mockLink);

        expect(mockLink.click).toBeCalled();

        expect(document.body.removeChild).toBeCalledWith(mockLink);
    });
});

describe("getNextImageIndex", () => {
    it("should give correct next index from zero in LEFT direction", () => {
        const nextIndex = getNextImageIndex(Array(5).fill(0), 0, "PREV");
        expect(nextIndex).toEqual(Array(5).fill(0).length - 1);
    });

    it("should give correct next index from highest index in RIGHT direction", () => {
        const nextIndex = getNextImageIndex(Array(5).fill(0), 4, "NEXT");
        expect(nextIndex).toEqual(0);
    });
});
