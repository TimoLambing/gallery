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

const useImages = (): Image[] => {
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

export default useImages;
