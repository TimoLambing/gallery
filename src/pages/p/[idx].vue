<template>
    <main class="antialiased transform-gpu w-full h-full absolute inset-0 select-none bg-background">
        <ImageGallery :image="image" v-if="image" />
    </main>
</template>

<script setup lang="ts">
import ImageGallery from "@/components/image-gallery.vue";
import { getImages } from "@/composables";
import { useRoute } from "vue-router";
import type { Image } from "@/types";

definePageMeta({
    pageTransition: { name: "page", mode: "out-in", duration: 250 },
});

const route = useRoute();
const currentImage = useCurrentImage();
const images = getImages();

const image = ref<Image | undefined>(images.find((image) => image.idx == (route.params.idx as unknown as number)));

if (!image.value) {
    throw createError({
        statusCode: 404,
        message: "Image not found",
    });
}

currentImage.value = image.value;

useHead({
    meta: [
        { name: "twitter:image", content: `${image.value.src}` },
        { property: "og:image", content: `${image.value.src}` },
    ],
});
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
    transition: all 250ms;
}
.page-enter-from,
.page-leave-to {
    opacity: 0.1;
    filter: blur(0.5rem);
}
</style>
