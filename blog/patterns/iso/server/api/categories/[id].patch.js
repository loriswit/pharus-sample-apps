const db = useDbClient()

export default defineEventHandler(async event => {
    const { name } = await readBody(event)
    const id = getRouterParam(event, "id")

    if (!name || !name.length)
        throw createError({
            statusCode: 422,
            statusMessage: `name cannot be empty!`,
        })

    await db.query(
        `update category set modified = now(), name = $1 where id = $2`,
        [name, id])

    setResponseStatus(event, 204)
})
