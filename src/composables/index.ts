import { filename as getFileName } from "pathe/utils";
import slugify from "slugify";
import type { Image } from "@/types";

const imageGlob = import.meta.glob("../../images/*.{jpg,jpeg,png,webp}", {
    eager: true,
});

export const getImages = (): Image[] => {
    const images: Image[] = Object.entries(imageGlob).map(([key, value], index) => {
        const filename: string = getFileName(key);
        return {
            idx: index,
            filename: key.split("/").pop()!,
            alt: slugify(filename).replaceAll("-", " "),
            src: (value as unknown as { default: string }).default,
        };
    });
    return images;
};

export const downloadImage = (image: Image) => {
    const a = document.createElement("a");
    a.setAttribute("href", image.src);
    a.setAttribute("download", image.filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

export const getNextImageIndex = (images: Image[], currentIndex: number, direction: "PREV" | "NEXT") => {
    const delta = direction === "PREV" ? -1 : 1;
    const nextIndex = (currentIndex + delta + images.length) % images.length;
    return nextIndex;
};

/**
 * @description Returns the image source based on the provider. Currently supported providers are vercel and ipx.
 */
export const getImageSrc = (image: Image) => {
    const $img = useImage();

    switch ($img.options.provider) {
        case "vercel":
            return image.src;
        case "ipx":
            return image.filename;
        default:
            return image.src;
    }
};
