// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: "src",
    alias: {
        "@/": "/src/",
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    vite: {
        build: {
            target: "esnext",
        },
    },
    modules: ["@nuxtjs/tailwindcss", "@nuxt/image-edge", "vite-plugin-vue-type-imports/nuxt"],
    image: {
        provider: "vercel",
        screens: {
            xxs: 240,
            xs: 320,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1536,
            "2xl": 1536,
        },
    },
    app: {
        pageTransition: { name: "page", mode: "out-in", duration: 350 },
    },
});
