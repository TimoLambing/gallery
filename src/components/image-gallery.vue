<template>
    <div class="w-full h-full fixed inset-0 overflow-auto flex items-center justify-center" @click="close">
        <NuxtPicture
            :src="image.filepath"
            :quality="1"
            :preload="true"
            alt="background"
            :img-attrs="{
                class: 'absolute inset-0 w-full h-full object-cover blur-xl brightness-[0.25]',
            }"
        />
        <div class="max-w-mw w-full h-full flex justify-center items-center">
            <div ref="swipeableRef" class="relative cursor-default" @click.stop="">
                <div v-if="showActionButtons" class="absolute top-0 right-0 z-10 p-4 inline-flex gap-4">
                    <ImageAction action="download" :image="image" />
                    <ImageAction action="source" :image="image" />
                </div>
                <div v-if="showActionButtons" class="absolute top-0 left-0 z-10 p-4">
                    <ImageAction action="close" :image="image" />
                </div>
                <NuxtPicture
                    :src="image.filepath"
                    :alt="image.alt"
                    :quality="75"
                    :preload="true"
                    :img-attrs="{
                        id: image.filename,
                        class: 'max-h-[40rem] h-auto aspect-auto brightness-110 text-[0px]',
                    }"
                    @load="handleImageLoad"
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

const props = defineProps<{
    image: Image;
}>();

const images = getImages();

const showActionButtons = ref(false);

const handleImageLoad = () => {
    showActionButtons.value = true;
};

onMounted(() => {
    const imageElement = document.getElementById(props.image.filename) as HTMLImageElement;
    if (imageElement) {
        if (imageElement.complete) {
            handleImageLoad();
        }
    }
});

const router = useRouter();
const close = () => router.push("/");

const swipeableRef = ref();

const navigate = (direction: "LEFT" | "RIGHT") => {
    const nextIdx = getNextImageIndex(images, props.image.idx, direction);
    currentImage.value = images[nextIdx];
    setTimeout(() => {
        router.push(`/p/${nextIdx}`);
    }, 150);
};

const { direction } = useSwipe(swipeableRef, {
    onSwipeEnd() {
        if (direction.value !== "UP") {
            router.push(`/p/${getNextImageIndex(images, props.image.idx, "LEFT")}`);
        }
        if (direction.value === "LEFT") {
            router.push(`/p/${getNextImageIndex(images, props.image.idx, "RIGHT")}`);
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
