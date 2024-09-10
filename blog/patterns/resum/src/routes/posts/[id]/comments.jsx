import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik"
import { Form } from "@builder.io/qwik-city"
import style from "./comments.css?inline"

export default component$(({ comments, action }) => {
    useStylesScoped$(style)

    function formatDate1(dateStr) {
        return new Date(dateStr).toLocaleDateString("en-UK",
            { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    }

    const formRef = useSignal()

    return (
        <>
            {comments.value.length > 0 ?
                <>
                    <h2>Comments</h2>
                    <div class="comments">
                        {comments.value.map(comment =>
                            <div class="comment" key={comment.id}>
                                <header>
                                    <div class="author">{comment.author}</div>
                                    <div class="date">{formatDate1(comment.created)}</div>
                                </header>
                                <div class="message">{comment.content}</div>
                            </div>)}
                    </div>
                </>
                : <p>No comments yet</p>}

            <Form action={action} ref={formRef}
                  onSubmitCompleted$={() => action.value?.ok && formRef.value.reset()}>
                <h3>Leave a comment</h3>

                {action.value?.failed && <p class="error">{action.value.error}</p>}

                <label for="name">Your name</label>
                <input id="name" minLength="1" required name="author"/>
                <label for="message">Message</label>
                <textarea id="message" rows="4" minLength="1" name="content"></textarea>
                <div class="actions">
                    <button type="submit">Send</button>
                </div>
            </Form>
        </>)
})
