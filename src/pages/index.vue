<template>
    <main class="antialiased transform-gpu w-full min-h-screen flex items-start justify-center select-none p-4">
        <div class="w-full h-full flex items-center justify-center max-w-mw">
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <ImageItem
                    v-for="image in images"
                    :key="image.idx"
                    :loading="image.idx < 7 ? 'eager' : 'lazy'"
                    :preload="image.idx < 7"
                    :image="image"
                />
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import ImageItem from "@/components/image-item.vue";
import { getImages } from "@/composables";

const images = getImages();
</script>
