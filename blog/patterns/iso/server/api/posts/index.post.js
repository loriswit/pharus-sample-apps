const db = useDbClient()

export default defineEventHandler(async event => {
    const body = await readBody(event)

    const keys = ["title", "author", "content", "categoryid"]
    for (const key of keys) {
        const value = body[key]
        if (!value || (typeof (value) === "string" && !value.length))
            throw createError({
                statusCode: 422,
                statusMessage: `${key} cannot be empty!`,
            })
    }

    const { rows } = await db.query(
        "insert into post (title, author, content, categoryid) values ($1, $2, $3, $4) returning id",
        keys.map(key => body[key]))

    setResponseStatus(event, 201)
    setResponseHeader(event, "Location", "/posts/" + rows[0].id);
    return { id: rows[0].id }
})
