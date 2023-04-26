import { filename as getFileName } from "pathe/utils";
import slugify from "slugify";
import type { Image } from "@/types";

export type ImageData = {
    default: {
        src: string;
        width: number;
        height: number;
    };
};

const imageGlob = import.meta.glob("../../images/*.{jpg,jpeg,png,webp}", {
    eager: true,
    //use vite-imagetools metadata
    query: {
        metadata: "",
    },
});

export const getImages = (): Image[] => {
    const images: Image[] = Object.entries(imageGlob).map(([key, value], index) => {
        const filename: string = getFileName(key);

        const { default: imageData } = value as unknown as ImageData;

        return {
            idx: index,
            src: imageData.src,
            filename: key.split("/").pop()!,
            alt: slugify(filename).replaceAll("-", " "),
            width: imageData.width,
            height: imageData.height,
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
