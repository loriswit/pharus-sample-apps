const db = useDbClient()

export default defineEventHandler(async event => {
    const body = await readBody(event)
    const id = getRouterParam(event, "id")

    const keys = ["title", "author", "content", "categoryid"]
    for (const key of keys) {
        const value = body[key]
        if (!value || (typeof (value) === "string" && !value.length))
            throw createError({
                statusCode: 422,
                statusMessage: `${key} cannot be empty!`,
            })
    }

    await db.query(
        `update post
             set modified = now(),
                 title = $1,
                 author = $2,
                 content = $3,
                 categoryid = $4
             where id = $5`,
        [...keys.map(key => body[key]), id])

    setResponseStatus(event, 204)
})
