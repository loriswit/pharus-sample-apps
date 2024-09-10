const db = useDbClient()

export default defineEventHandler(async event => {
    const { name } = await readBody(event)

    if (!name || !name.length)
        throw createError({
            statusCode: 422,
            statusMessage: `name cannot be empty!`,
        })

    const { rows } = await db.query(
        "insert into category (name) values ($1) returning id", [name])

    setResponseStatus(event, 201)
    setResponseHeader(event, "Location", "/categories/" + rows[0].id)
    return { id: rows[0].id }
})
