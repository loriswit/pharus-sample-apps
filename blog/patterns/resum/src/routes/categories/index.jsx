import { component$, useStylesScoped$ } from "@builder.io/qwik"
import style from "./index.css?inline"
import { Link, routeLoader$ } from "@builder.io/qwik-city"
import { db } from "~/utils/db.js"

export const useCategories = routeLoader$(async () => {
    const { rows } = await db.query(
        `select category.id, name, count(post.id) as postcount
         from category
                  left join post on post.categoryid = category.id
         group by category.id, name
         order by postcount desc, name`,
    )
    return rows
})

export default component$(() => {
    useStylesScoped$(style)

    const categories = useCategories()

    return (
        <div class="container">
            <header>
                <h1>Categories</h1>
                <Link class="button" href="/categories/new">New category</Link>
            </header>

            <div class="categories">
                {categories.value.map(category =>
                    <Link class="category" href={`/categories/${category.id}`} key={category.id}>
                        <h2>{category.name}</h2>
                        <p>{category.postcount} posts</p>
                    </Link>)}
            </div>
        </div>
    )
})
