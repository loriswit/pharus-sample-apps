import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik"
import style from "./index.css?inline"
import { routeAction$ } from "@builder.io/qwik-city"
import { db } from "~/utils/db.js"
import CategoryForm from "~/components/category-form.jsx"

export const useCreateCategory = routeAction$(async (category, { fail }) => {
    if (!category.name || !category.name.length)
        return fail(422, {
            error: `name cannot be empty!`,
        })

    const { rows } = await db.query(
        "insert into category (name) values ($1) returning id", [category.name])

    return { ok: true, id: rows[0].id }
})

export default component$(() => {
    useStylesScoped$(style)

    const createCategory = useCreateCategory()
    const category = useSignal({ name: null })

    return (
        <div class="container">
            <h1>New category</h1>

            <CategoryForm newCategory={true} category={category} action={createCategory}/>
        </div>
    )
})
