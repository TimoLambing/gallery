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
              "alt": "Finding nemo",
              "filename": "Finding-nemo.jpg",
              "filepath": "/images/Finding-nemo.jpg",
              "idx": 1,
              "src": "/src/public/images/Finding-nemo.jpg",
            },
            {
              "alt": "Hallstatter See Austria",
              "filename": "Hallstatter-See-Austria.jpg",
              "filepath": "/images/Hallstatter-See-Austria.jpg",
              "idx": 2,
              "src": "/src/public/images/Hallstatter-See-Austria.jpg",
            },
            {
              "alt": "Night sky Italy",
              "filename": "Night-sky-Italy.jpg",
              "filepath": "/images/Night-sky-Italy.jpg",
              "idx": 3,
              "src": "/src/public/images/Night-sky-Italy.jpg",
            },
            {
              "alt": "Wadi Rum Village Jordan Sunset",
              "filename": "Wadi-Rum-Village-Jordan-Sunset.jpg",
              "filepath": "/images/Wadi-Rum-Village-Jordan-Sunset.jpg",
              "idx": 4,
              "src": "/src/public/images/Wadi-Rum-Village-Jordan-Sunset.jpg",
            },
            {
              "alt": "ebeltoft denmark",
              "filename": "ebeltoft-denmark.jpg",
              "filepath": "/images/ebeltoft-denmark.jpg",
              "idx": 5,
              "src": "/src/public/images/ebeltoft-denmark.jpg",
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
        const mLink = {
            href: "",
            click: vi.fn(),
            download: "",
            setAttribute: vi.fn(),
        } as any;

        const createElementSpy = vi.spyOn(document, "createElement").mockReturnValueOnce(mLink);
        document.body.appendChild = vi.fn();
        document.body.removeChild = vi.fn();

        downloadImage(exampleImage);

        expect(createElementSpy).toBeCalledWith("a");

        expect(mLink.setAttribute.mock.calls.length).toBe(2);

        expect(mLink.setAttribute.mock.calls[0]).toEqual(["href", exampleImage.src]);
        expect(mLink.setAttribute.mock.calls[1]).toEqual(["download", exampleImage.filename]);

        expect(document.body.appendChild).toBeCalledWith(mLink);

        expect(mLink.click).toBeCalled();

        expect(document.body.removeChild).toBeCalledWith(mLink);
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
