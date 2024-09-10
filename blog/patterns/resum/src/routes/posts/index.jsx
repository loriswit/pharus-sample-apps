import { component$, useComputed$, useSignal, useStylesScoped$ } from "@builder.io/qwik"
import { Link, routeLoader$ } from "@builder.io/qwik-city"
import PostTile from "~/components/post-tile.jsx"
import style from "./index.css?inline"
import { db } from "~/utils/db.js"

export const usePosts = routeLoader$(async () => {
    const { rows: posts } = await db.query(
        `select post.id,
                title,
                author,
                post.created,
                to_char(post.created, 'YYYY') as year,
                category.name                 as category
         from post
         join category on post.categoryid = category.id
         order by created desc`,
    )
    return posts
})

export default component$(() => {
    useStylesScoped$(style)
    const posts = usePosts()

    const years = useComputed$(() => [...new Set(posts.value.map(post => post.year))])
    const authors = useComputed$(() => [...new Set(posts.value.map(post => post.author))].sort())

    const yearFilter = useSignal("")
    const authorFilter = useSignal("")

    const filteredPosts = useComputed$(() => posts.value.filter(post =>
        (!yearFilter.value || post.year === yearFilter.value) &&
        (!authorFilter.value || post.author === authorFilter.value)))

    return (
        <>
            <div class="container">
                <header>
                    <h1>Posts</h1>
                    <Link class="button" href="/posts/new">New post</Link>
                </header>

                <form>
                    <label>Filter by&nbsp;
                        <select name="year" onInput$={(_, e) => yearFilter.value = e.value}>
                            <option value="">any year</option>
                            {years.value.map(year =>
                                <option value={year} selected={year === yearFilter.value} key={year}>
                                    {year}
                                </option>)}
                        </select>&nbsp;
                        <select name="author" onInput$={(_, e) => authorFilter.value = e.value}>
                            <option value="">any author</option>
                            {authors.value.map(author =>
                                <option value={author} selected={author === authorFilter.value} key={author}>
                                    {author}
                                </option>)}
                        </select>
                    </label>
                </form>

                {filteredPosts.value.length > 0 ?
                    filteredPosts.value.map(post =>
                        <div class="posts" key={post.id}>
                            <PostTile v-for="post in filteredPosts" post={post}></PostTile>
                        </div>)
                    :
                    <p>No posts found</p>
                }
            </div>
        </>
    )
})
