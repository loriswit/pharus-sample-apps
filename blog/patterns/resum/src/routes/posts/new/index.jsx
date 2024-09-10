import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik"
import style from "./index.css?inline"
import PostForm from "~/components/post-form.jsx"
import { routeAction$, useLocation } from "@builder.io/qwik-city"
import { db } from "~/utils/db.js"

export const useCreatePost = routeAction$(async (post, { fail }) => {
    const keys = ["title", "author", "content", "categoryid"]
    for (const key of keys) {
        const value = post[key]
        if (!value || (typeof (value) === "string" && !value.length))
            return fail(422, {
                error: `${key} cannot be empty!`,
            })
    }

    const { rows } = await db.query(
        `insert into post (title, author, content, categoryid)
         values ($1, $2, $3, $4)
         returning id`,
        keys.map(key => post[key]))

    return { ok: true, id: rows[0].id }
})

export default component$(() => {
    useStylesScoped$(style)

    const createPost = useCreatePost()
    const location = useLocation()

    const post = useSignal({
        title: null,
        author: null,
        categoryid: Number(location.url.searchParams.get("category")) ?? "",
        content: null,
    })

    return (
        <div class="container">
            <h1>New post</h1>

            <PostForm newPost={true} post={post} action={createPost}></PostForm>
        </div>
    )
})
