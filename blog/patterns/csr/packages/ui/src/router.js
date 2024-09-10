import { createRouter, createWebHistory } from "vue-router"
import PostsIndex from "@/views/PostsIndex.vue"
import Post from "@/views/Post.vue";
import NotFound from "@/views/NotFound.vue"
import PostEdit from "@/views/PostEdit.vue";
import PostNew from "@/views/PostNew.vue";
import CategoriesIndex from "@/views/CategoriesIndex.vue";
import Category from "@/views/Category.vue";
import CategoryNew from "@/views/CategoryNew.vue";
import CategoryEdit from "@/views/CategoryEdit.vue";

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/posts",
            name: "posts",
            component: PostsIndex,
            alias: "/",
        },
        {
            path: "/posts/:id",
            name: "post",
            component: Post,
        },
        {
            path: "/posts/new",
            name: "new-post",
            component: PostNew,
        },
        {
            path: "/posts/:id/edit",
            name: "edit-post",
            component: PostEdit,
        },

        {
            path: "/categories",
            name: "categories",
            component: CategoriesIndex,
        },
        {
            path: "/categories/new",
            name: "new-category",
            component: CategoryNew,
        },
        {
            path: "/categories/:id",
            name: "category",
            component: Category,
        },
        {
            path: "/categories/:id/edit",
            name: "edit-category",
            component: CategoryEdit,
        },

        {
            path: "/:path(.*)*",
            name: "NotFound",
            component: NotFound,
        },
    ],
})
