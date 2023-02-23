import type { Image } from "@/types";

export default function () {
    return useState<Image>("currentImage", () => ({} as Image));
}
