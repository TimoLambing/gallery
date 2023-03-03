<template>
    <div class="w-full h-full fixed inset-0 overflow-auto flex items-center justify-center" @click="close">
        <Transition>
            <NuxtImg
                v-if="show"
                :key="currentImage.idx"
                :src="currentImage.filepath"
                :quality="1"
                :width="240"
                :preload="true"
                alt="background"
                class="absolute inset-0 w-full h-full object-cover blur-xl brightness-[0.25]"
            />
        </Transition>
        <div class="max-w-mw w-full h-full flex justify-center items-center">
            <Transition name="image">
                <div v-if="show" ref="swipeableRef" class="relative cursor-default" @click.stop="">
                    <Transition>
                        <div
                            v-if="showButtons"
                            class="absolute top-0 left-0 w-full inline-flex justify-between p-4 z-10"
                        >
                            <ImageAction action="close" :image="currentImage" />
                            <div class="inline-flex gap-4">
                                <ImageAction action="download" :image="currentImage" />
                                <ImageAction action="source" :image="currentImage" />
                            </div>
                        </div>
                    </Transition>
                    <NuxtPicture
                        :src="currentImage.filepath"
                        class="cover"
                        :alt="currentImage.alt"
                        :quality="75"
                        :preload="true"
                        :img-attrs="{
                            class: 'max-h-[40rem] h-auto aspect-auto brightness-110 text-[0px]',
                        }"
                    />
                </div>
            </Transition>
        </div>
        <ImageCarousel />
    </div>
</template>

<script setup lang="ts">
import ImageCarousel from "@/components/image-carousel.vue";
import { onKeyStroke, useSwipe, useElementSize } from "@vueuse/core";
import { getImages, getNextImageIndex } from "@/composables";
import { useRouter } from "vue-router";

const currentImage = useCurrentImage();
const images = getImages();
const router = useRouter();
const close = () => router.push("/");
const swipeableRef = ref<HTMLDivElement>();
const show = useShow();

const { width, height } = useElementSize(swipeableRef);

const showButtons = computed(() => {
    //prevents buttons showing/shifting if parent hasn't reached full size.
    return width.value > 100 && height.value > 40;
});

const navigate = (direction: "LEFT" | "RIGHT") => {
    const nextIdx = getNextImageIndex(images, currentImage.value.idx, direction);
    show.value = false;
    currentImage.value = images[nextIdx];
    setTimeout(() => {
        show.value = true;
    }, 250);
};

const { direction } = useSwipe(swipeableRef, {
    onSwipeEnd() {
        if (direction.value !== "UP") {
            navigate("LEFT");
        }
        if (direction.value === "LEFT") {
            navigate("RIGHT");
        }
    },
});

onKeyStroke(["ArrowLeft", "ArrowUp", "a", "A", "w", "W"], () => {
    navigate("LEFT");
});
onKeyStroke(["ArrowRight", "ArrowDown", "d", "D", "s", "S"], () => {
    navigate("RIGHT");
});
onKeyStroke("Escape", () => close());

const navigatePages = () => {
    window.history.pushState(window.history.state, "", `/p/${currentImage.value.idx}`);
};
watch(currentImage, navigatePages);
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.25s ease;
}
.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.image-enter-active,
.image-leave-active {
    transition: all 0.25s ease;
}
.image-enter-from,
.image-leave-to {
    opacity: 0;
}
</style>
