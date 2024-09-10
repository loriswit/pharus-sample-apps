import { component$, useStylesScoped$ } from "@builder.io/qwik"
import style from "./index.css?inline"
import { Link, routeAction$, routeLoader$, useNavigate } from "@builder.io/qwik-city"
import { db } from "~/utils/db.js"
import PostTile from "~/components/post-tile.jsx"

export const useCategory = routeLoader$(async ({ params, status }) => {
    const { rows } = await db.query(
        `select id, name
         from category
         where id = $1`, [params.id])

    if (rows.length === 0)
        status(404)

    return rows[0]
})

export const usePosts = routeLoader$(async ({ params }) => {
    const { rows } = await db.query(
        `select id, title, author, created
         from post
         where post.categoryid = $1
         order by created desc`, [params.id])

    return rows
})

export const useDeleteCategory = routeAction$(async (_, { params }) => {
    db.query("delete from category where id = $1", [params.id])
    return { ok: true }
})

export default component$(() => {
    useStylesScoped$(style)

    const category = useCategory()
    const posts = usePosts()

    const deleteCategory = useDeleteCategory()
    const nav = useNavigate()

    return <>
        {category.value ?
            <div class="container">
                <header>
                    <h1>Category: {category.value.name}</h1>
                    <div class="actions">
                        <Link class="button" href={`/posts/new?category=${category.value.id}`}>New post</Link>
                        <Link class="button" href={`/categories/${category.value.id}/edit`}>Edit category</Link>
                        <button onClick$={async () => {
                            if (confirm("Are you sure you want to delete this category and all its posts? (No undo)")) {
                                const { value: { ok } } = await deleteCategory.submit()
                                if (ok) nav("/categories")
                            }
                        }}>
                            Delete category
                        </button>
                    </div>
                </header>

                {posts.value.length > 0 ?
                    <div class="posts">
                        {posts.value.map(post =>
                            <PostTile post={post} key={post.id}></PostTile>)}
                    </div>
                    : <p>No posts in this category yet</p>}
            </div>
            : <p>Category not found</p>}
    </>
})
