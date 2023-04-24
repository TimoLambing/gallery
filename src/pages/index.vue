<template>
    <main class="antialiased transform-gpu w-full min-h-screen flex flex-col items-center select-none p-4">
        <div class="mx-auto max-w-mw w-full h-full">
            <div class="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
                <NuxtLink
                    v-for="image in images"
                    :key="image.idx"
                    :href="`/p/${image.idx}`"
                    class="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                >
                    <NuxtImg
                        format="webp"
                        :src="image.filepath"
                        loading="lazy"
                        :width="10"
                        :quality="1"
                        class="w-full h-full rounded-lg object-cover blur-lg saturate-[2] absolute inset-0"
                        alt=""
                    />
                    <NuxtImg
                        :id="image.idx"
                        sizes="lg:640px"
                        :width="640"
                        :height="320"
                        format="webp"
                        decoding="async"
                        :src="image.filepath"
                        :preload="image.idx < 16"
                        :loading="image.idx < 16 ? 'eager' : 'lazy'"
                        placeholder
                        :quality="75"
                        :alt="image.alt"
                        class="w-full h-full rounded-lg object-cover relative z-10 text-[0px] duration-200"
                    />
                    <span class="sr-only">{{ image.alt }}</span>
                </NuxtLink>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { getImages } from "@/composables";

const images = getImages();
</script>
