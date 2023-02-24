<template>
    <div class="w-full h-full fixed inset-0 overflow-auto flex items-center justify-center" @click="close">
        <NuxtImg
            :src="image.filepath"
            :quality="1"
            :width="240"
            :preload="true"
            alt="background"
            class="absolute inset-0 w-full h-full object-cover blur-xl brightness-[0.25]"
        />
        <div class="max-w-mw w-full h-full flex justify-center items-center">
            <div ref="swipeableRef" class="relative cursor-default" @click.stop="">
                <div class="absolute top-0 right-0 z-10 p-6 inline-flex gap-4">
                    <ImageAction action="download" :image="image" />
                    <ImageAction action="source" :image="image" />
                </div>
                <div class="absolute top-0 left-0 z-10 p-6">
                    <ImageAction action="close" :image="image" />
                </div>
                <NuxtPicture
                    :src="image.filepath"
                    class="cover"
                    :alt="image.alt"
                    :quality="75"
                    :preload="true"
                    :img-attrs="{
                        class: 'max-h-[40rem] h-auto aspect-auto brightness-110 text-[0px]',
                    }"
                />
            </div>
        </div>
        <ImageCarousel :image="image" />
    </div>
</template>

<script setup lang="ts">
import type { Image } from "@/types";
import ImageCarousel from "@/components/image-carousel.vue";
import { onKeyStroke, useSwipe } from "@vueuse/core";
import { getImages, getNextImageIndex } from "@/composables";
import { useRouter } from "vue-router";

const currentImage = useCurrentImage();
const images = getImages();
const router = useRouter();
const close = () => router.push("/");
const swipeableRef = ref();

const props = defineProps<{
    image: Image;
}>();

const navigate = (direction: "LEFT" | "RIGHT") => {
    const nextIdx = getNextImageIndex(images, props.image.idx, direction);
    currentImage.value = images[nextIdx];
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

onKeyStroke(["ArrowLeft", "a", "A", "w", "W"], () => {
    navigate("LEFT");
});
onKeyStroke(["ArrowRight", "d", "D", "s", "S"], () => {
    navigate("RIGHT");
});
onKeyStroke("Escape", () => close());
</script>
