import { component$, useStylesScoped$ } from "@builder.io/qwik"
import { Form, useNavigate } from "@builder.io/qwik-city"
import style from "./category-form.css?inline"

export default component$(({ category, newCategory = false, action }) => {
    useStylesScoped$(style)
    const nav = useNavigate()

    return <Form action={action}
                 onSubmitCompleted$={() => action.value?.ok && nav("/categories/" + action.value.id)}>
        {action.value?.failed && <p class="error">{action.value.error}</p>}
        <label>
            Category name
            <input type="text" id="textInput" name="name" required minLength="1" autofocus
                   value={category.value.name}/>
        </label>
        <button type="submit">{newCategory ? "Create" : "Update"}</button>
    </Form>
})
