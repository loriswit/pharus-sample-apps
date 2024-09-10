export default defineNuxtConfig({
    devtools: { enabled: true },
    app: {
        head: {
            title: "My Blog",
            htmlAttrs: { lang: "en" },
        },
    },
    vite: {
        vue: {
            template: { compilerOptions: { whitespace: "preserve" } }
        },
    },
    css: ["~/assets/style.css"]
})
