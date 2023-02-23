<template>
    <NuxtLink
        :href="`/p/${image.idx}`"
        class="relative outline-gray-100 outline-2 hover:cursor-zoom-in brightness-90 md:focus:brightness-100 md:hover:brightness-100 rounded-lg will-change-auto transition duration-200"
    >
        <NuxtPicture
            :src="image.filepath"
            v-bind="dimensions"
            :loading="loading"
            :preload="preload"
            :quality="1"
            alt=""
            :img-attrs="{ class: 'w-full h-full rounded-lg object-cover blur-lg saturate-[2] absolute inset-0' }"
        />
        <NuxtPicture
            v-bind="dimensions"
            :id="image.idx"
            :src="image.filepath"
            :loading="loading"
            :preload="preload"
            :alt="image.alt"
            :img-attrs="{ class: 'w-full h-full rounded-lg object-cover relative z-10' }"
        />
        <span class="sr-only">{{ image.alt }}</span>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { ImageItemProps } from "@/types";

const dimensions = {
    width: 900,
    height: 600,
};

defineProps<ImageItemProps>();
</script>
