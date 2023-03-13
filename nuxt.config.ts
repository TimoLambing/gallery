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
        resolve: {
            alias: {
                "@/*": "src/*",
            },
        },
    },
    modules: ["@nuxtjs/tailwindcss", "@nuxt/image-edge", "vite-plugin-vue-type-imports/nuxt", "@kevinmarrec/nuxt-pwa"],
    image: {
        provider: "vercel",
        screens: {
            xxxs: 30,
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
    pwa: {
        workbox: {
            //set to false if PWA functionality is unwanted
            enabled: process.env.NODE_ENV !== "development",
        },
    },
    app: {
        layoutTransition: {
            name: "layout",
            mode: "out-in",
            duration: 350,
        },
    },
    tailwindcss: {
        cssPath: "@/assets/css/tailwind.css",
    },
});
