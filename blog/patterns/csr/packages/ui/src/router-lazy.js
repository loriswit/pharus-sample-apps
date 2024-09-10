import { createRouter, createWebHistory } from "vue-router"

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/posts",
            name: "posts",
            component: () => import("./views/PostsIndex.vue"),
            alias: "/",
        },
        {
            path: "/posts/:id",
            name: "post",
            component: () => import("./views/Post.vue"),
        },
        {
            path: "/posts/new",
            name: "new-post",
            component: () => import("./views/PostNew.vue"),
        },
        {
            path: "/posts/:id/edit",
            name: "edit-post",
            component: () => import("./views/PostEdit.vue"),
        },

        {
            path: "/categories",
            name: "categories",
            component: () => import("./views/CategoriesIndex.vue"),
        },
        {
            path: "/categories/new",
            name: "new-category",
            component: () => import("./views/CategoryNew.vue"),
        },
        {
            path: "/categories/:id",
            name: "category",
            component: () => import("./views/Category.vue"),
        },
        {
            path: "/categories/:id/edit",
            name: "edit-category",
            component: () => import("./views/CategoryEdit.vue"),
        },

        {
            path: "/:path(.*)*",
            name: "NotFound",
            component: () => import("./views/NotFound.vue"),
        },
    ],
})
