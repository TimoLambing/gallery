<template>
    <Head>
        <Title>Gallery</Title>
        <Link rel="icon" href="/icon.png" type="image/png" />
        <Meta name="description" content="An image gallery built with Nuxt 3" />
    </Head>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
useHead({
    htmlAttrs: {
        lang: "en",
    },
});
</script>

<style>
html,
body {
    @apply bg-background h-full;
}

.page-enter-active,
.page-leave-active {
    transition: all 350ms;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>
