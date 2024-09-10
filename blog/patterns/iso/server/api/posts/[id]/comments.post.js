const db = useDbClient()

export default defineEventHandler(async event => {
    const body = await readBody(event)
    const postId = getRouterParam(event, "id")

    const keys = ["author", "content"]
    for (const key of keys)
        if (!body[key] || !body[key].length)
            throw createError({
                statusCode: 422,
                statusMessage: `${key} cannot be empty!`,
            })

    const { rows } = await db.query(
        "insert into comment (postid, author, content) values ($1, $2, $3) returning id",
        [postId, ...keys.map(key => body[key])])

    setResponseStatus(event, 201)
    setResponseHeader(event, "Location", "/posts/" + postId);
    return { id: rows[0].id }
})
