import { component$, Slot } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"

export const onGet = async ({ cacheControl }) => {
    if (!!process.env.CACHE_CONTROL) {
        cacheControl({
            staleWhileRevalidate: 60 * 60 * 24 * 7,
            maxAge: 5,
        })
    }
}

export default component$(() => <>
    <header class="site-header">
        <div class="title">My Blog</div>
        <nav>
            <Link href="/posts">All posts</Link>
            <Link href="/categories">Categories</Link>
        </nav>
    </header>
    <main>
        <Slot/>
    </main>
</>)
