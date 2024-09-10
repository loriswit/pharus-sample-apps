import { component$ } from "@builder.io/qwik"
import Posts from "~/routes/posts/index.jsx"

export { usePosts } from "~/routes/posts/index.jsx"

export default component$(() => {
    return <Posts></Posts>
})
