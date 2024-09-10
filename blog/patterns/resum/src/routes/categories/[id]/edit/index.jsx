import { component$, useStylesScoped$ } from "@builder.io/qwik"
import style from "./index.css?inline"
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city"
import { db } from "~/utils/db.js"
import CategoryForm from "~/components/category-form.jsx"

export const useCategory = routeLoader$(async ({ params, status }) => {
    const { rows } = await db.query(
        `select id, name
         from category
         where id = $1`, [params.id])

    if (!rows.length)
        status(404)

    return rows[0]
})

export const useEditCategory = routeAction$(async (category, { fail, params }) => {
    if (!category.name || !category.name.length)
        return fail(422, {
            error: `name cannot be empty!`,
        })

    await db.query(
        `update category
         set modified = now(),
             name     = $1
         where id = $2`,
        [category.name, params.id])

    return { id: params.id, ok: true }
})

export default component$(() => {
    useStylesScoped$(style)

    const editCategory = useEditCategory()
    const category = useCategory()

    return (
        <div class="container">
            <h1>Edit category</h1>

            <CategoryForm newCategory={false} category={category} action={editCategory}/>
        </div>
    )
})
