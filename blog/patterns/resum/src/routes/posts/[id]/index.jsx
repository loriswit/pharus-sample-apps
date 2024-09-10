import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik"
import { Link, routeAction$, routeLoader$, useLocation, useNavigate } from "@builder.io/qwik-city"
import { db } from "~/utils/db.js"
import MarkdownIt from "markdown-it"
import style from "./index.css?inline"
import Comments from "~/routes/posts/[id]/comments.jsx"

export const usePost = routeLoader$(async ({ params, status }) => {
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
         where post.id = $1`, [params.id])

    if (rows.length === 0)
        status(404)

    return rows[0]
})

export const useComments = routeLoader$(async event => {
    const { rows } = await db.query(
        `select id, author, content, created, modified
         from Comment
         where postid = $1
         order by created`, [event.params.id])
    return rows
})

export const useDeletePost = routeAction$(async (_, { params }) => {
    db.query("delete from post where id = $1", [params.id])
    return { ok: true }
})

export const useCreateComment = routeAction$(async (comment, { params, fail }) => {
    const keys = ["author", "content"]
    for (const key of keys)
        if (!comment[key] || !comment[key].length)
            return fail(422, {
                error: `${key} cannot be empty!`,
            })

    const { rows } = await db.query(
        "insert into comment (postid, author, content) values ($1, $2, $3) returning id",
        [params.id, ...keys.map(key => comment[key])])

    return { id: rows[0].id, ok: true }
})

export default component$(() => {
    useStylesScoped$(style)

    const { params } = useLocation()

    const post = usePost()
    const comments = useComments()

    const md = new MarkdownIt({ linkify: true })

    function formatDate1(dateStr) {
        return new Date(dateStr).toLocaleDateString("en-UK",
            { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    }

    function formatDate2(dateStr) {
        return new Date(dateStr).toLocaleString("en-GB",
            { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "2-digit" })
    }

    const createComment = useCreateComment()
    const formRef = useSignal()

    const deletePost = useDeletePost()
    const nav = useNavigate()

    return (
        <>
            <div class="container">
                {post.value ? <>
                        <header class="post-header">
                            <h1>{post.value.title}</h1>

                            <Link class="button" href={`/categories/${post.value.categoryid}`}>
                                #{post.value.category}
                            </Link>
                            <p class="author">by <span class="name">{post.value.author}</span></p>
                            <p class="date">
                                {formatDate1(post.value.created)}
                                {post.value.created.getTime() !== post.value.modified.getTime() &&
                                    <span>(last modified {formatDate2(post.value.modified)})</span>}
                            </p>
                            <div class="actions">
                                <Link class="button" href={`/posts/${params.id}/edit`}>Edit post</Link>
                                &nbsp;
                                <button onClick$={async () => {
                                    if (confirm("Are you sure you want to delete this post? (No undo)")) {
                                        const { value: { ok } } = await deletePost.submit()
                                        if (ok) nav("/posts")
                                    }
                                }}>
                                    Delete post
                                </button>
                            </div>
                        </header>

                        <div class="content" dangerouslySetInnerHTML={md.render(post.value.content)}></div>

                        <footer class="post-footer">
                            <Comments comments={comments} action={createComment}/>
                        </footer>
                    </>
                    : <p>Post not found.</p>}
            </div>
        </>
    )
})
