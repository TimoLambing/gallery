<template>
    <main class="antialiased transform-gpu w-full min-h-screen flex items-start justify-center select-none">
        <div class="w-full h-full flex items-center justify-center p-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full max-w-mw">
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
