import { component$, useStylesScoped$ } from "@builder.io/qwik"
import { db } from "~/utils/db.js"
import { Form, server$, useNavigate } from "@builder.io/qwik-city"
import style from "./post-form.css?inline"

const fetchCategories = server$(async () => {
    const { rows } = await db.query("select category.id, name from category")
    return rows
})

export default component$(({ post, newPost = false, action }) => {
    useStylesScoped$(style)
    const nav = useNavigate()

    return <Form action={action}
                 onSubmitCompleted$={() => action.value?.ok && nav("/posts/" + action.value.id)}>
        {action.value?.failed && <p class="error">{action.value.error}</p>}
        <label>
            Post title
            <input type="text" required minLength="1" autofocus name="title" value={post.value.title}/>
        </label>
        <label>
            Author name
            <input type="text" required minLength="1" name="author" value={post.value.author}/>
        </label>
        <label>
            Category
            <select name="categoryid" required>
                {newPost &&
                    <option disabled selected value> -- please select --</option>}
                {fetchCategories().then(categories => categories.map(category =>
                    <option value={category.id} key={category.id} selected={category.id === post.value.categoryid}>
                        {category.name}
                    </option>))}
            </select>
        </label>
        <label>
            Body
            <textarea rows="16" required minLength="1" name="content">{post.value.content}</textarea>
        </label>
        <button type="submit">{newPost ? "Create" : "Update"}</button>
    </Form>
})
