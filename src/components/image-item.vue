<template>
    <NuxtLink
        :href="`/p/${image.idx}`"
        class="w-full h-full aspect-[3/2] relative outline-gray-100 outline-2 hover:cursor-zoom-in brightness-90 md:focus:brightness-100 md:hover:brightness-100 rounded-lg will-change-auto transition duration-200"
    >
        <NuxtImg
            :src="image.filepath"
            :width="30"
            :loading="loading"
            :preload="preload"
            :quality="1"
            class="w-full h-full rounded-lg object-cover blur-lg saturate-[2] absolute inset-0"
            alt=""
        />
        <NuxtPicture
            :id="image.idx"
            sizes="sm:640px md:768px lg:1024px"
            :src="image.filepath"
            :loading="loading"
            :preload="preload"
            placeholder
            :alt="image.alt"
            :img-attrs="{ class: 'w-full h-full rounded-lg object-cover relative z-10 text-[0px]' }"
        />
        <span class="sr-only">{{ image.alt }}</span>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { ImageItemProps } from "@/types";

defineProps<ImageItemProps>();
</script>
