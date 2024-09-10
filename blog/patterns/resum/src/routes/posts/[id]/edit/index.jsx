import { component$, useStylesScoped$ } from "@builder.io/qwik"
import style from "./index.css?inline"
import PostForm from "~/components/post-form.jsx"
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city"
import { db } from "~/utils/db.js"

export const usePost = routeLoader$(async event => {
    const { rows } = await db.query(
        `select post.id,
                title,
                author,
                content,
                post.created,
                post.modified,
                categoryid,
                category.name as category
         from post
                  join category on post.categoryid = category.id
         where post.id = $1`, [event.params.id])

    return rows[0]
})

export const useEditPost = routeAction$(async (post, { fail, params }) => {
    const keys = ["title", "author", "content", "categoryid"]
    for (const key of keys) {
        const value = post[key]
        if (!value || (typeof (value) === "string" && !value.length))
            return fail(422, {
                error: `${key} cannot be empty!`,
            })
    }

    await db.query(
        `update post
         set modified   = now(),
             ${keys[0]} = $1,
             ${keys[1]} = $2,
             ${keys[2]} = $3,
             ${keys[3]} = $4
         where id = $5`,
        [...keys.map(key => post[key]), params.id])

    return { id: params.id, ok: true }
})

export default component$(() => {
    useStylesScoped$(style)

    const editPost = useEditPost()
    const post = usePost()

    return (
        <div class="container">
            <h1>Edit post</h1>

            <PostForm newPost={false} post={post} action={editPost}></PostForm>
        </div>
    )
})
