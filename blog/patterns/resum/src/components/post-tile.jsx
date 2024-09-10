import { component$, useStylesScoped$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import style from "./post-tile.css?inline"

export default component$(({ post }) => {
    const { scopeId } = useStylesScoped$(style)

    function formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString("en-UK",
            { day: "numeric", month: "long", year: "numeric" })
    }

    return (
        <Link href={"/posts/" + post.id} class={`${scopeId} post`}>
            <h2>{post.title}</h2>
            {post.category && <p class="category">#{post.category}</p>}
            <p class="author">By <span class="name">{post.author}</span></p>
            <p class="date">{formatDate(post.created)}</p>
        </Link>
    )
})
