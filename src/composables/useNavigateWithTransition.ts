import { getImages, getNextImageIndex } from "@/composables";
import { Image } from "@/types";

const useNavigateWithTransition = (direction?: "PREV" | "NEXT", image?: Image) => {
    const show = useShow();
    const currentImage = useCurrentImage();
    const router = useRouter();
    const images = getImages();
    if (currentImage.value) {
        show.value = false;

        if (direction) {
            currentImage.value = images[getNextImageIndex(images, currentImage.value.idx, direction)];
        }

        if (image) {
            currentImage.value = image;
        }

        router.push(`/p/${currentImage.value.idx}`);

        setTimeout(() => {
            show.value = true;
        }, 250);
    }
};

export default useNavigateWithTransition;
