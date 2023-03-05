import { onKeyStroke, useSwipe } from "@vueuse/core";
import { getImages, getNextImageIndex } from "@/composables";

export const PREV_NAVIGATION_KEYS = ["ArrowLeft", "ArrowUp", "a", "A", "w", "W"];
export const NEXT_NAVIGATION_KEYS = ["ArrowRight", "ArrowDown", "d", "D", "s", "S"];

export const useGalleryNavigation = (swipeableRef: Ref<HTMLElement>) => {
    const show = useShow();
    const currentImage = useCurrentImage();
    const router = useRouter();
    const images = getImages();

    const navigateWithTransition = (direction: "PREV" | "NEXT") => {
        if (currentImage.value) {
            show.value = false;
            const nextIdx = getNextImageIndex(images, currentImage.value.idx, direction);
            currentImage.value = images[nextIdx];
            router.push(`/p/${nextIdx}`);
            setTimeout(() => {
                show.value = true;
            }, 250);
        }
    };

    const { direction } = useSwipe(swipeableRef, {
        onSwipeEnd() {
            if (direction.value === "RIGHT") {
                navigateWithTransition("PREV");
            }
            if (direction.value === "LEFT") {
                navigateWithTransition("NEXT");
            }
        },
    });

    onKeyStroke(PREV_NAVIGATION_KEYS, () => {
        navigateWithTransition("PREV");
    });
    onKeyStroke(NEXT_NAVIGATION_KEYS, () => {
        navigateWithTransition("NEXT");
    });
    onKeyStroke("Escape", () => router.push("/"));
};

export default useGalleryNavigation;
