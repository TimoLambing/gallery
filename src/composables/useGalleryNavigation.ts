import { onKeyStroke, useSwipe } from "@vueuse/core";
import { getImages, getNextImageIndex } from "@/composables";

export const prevNavigationKeys = ["ArrowLeft", "ArrowUp", "a", "A", "w", "W"];
export const nextNavigationKeys = ["ArrowRight", "ArrowDown", "d", "D", "s", "S"];

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
            if (direction.value !== "UP") {
                navigateWithTransition("PREV");
            }
            if (direction.value === "LEFT") {
                navigateWithTransition("NEXT");
            }
        },
    });

    onKeyStroke(prevNavigationKeys, () => {
        navigateWithTransition("PREV");
    });
    onKeyStroke(nextNavigationKeys, () => {
        navigateWithTransition("NEXT");
    });
    onKeyStroke("Escape", () => router.push("/"));
};

export default useGalleryNavigation;
