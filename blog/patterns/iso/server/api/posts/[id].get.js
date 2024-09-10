const db = useDbClient()

export default defineEventHandler(async event => {
    const id = getRouterParam(event, "id")

    const { rows } = await db.query(
        `select post.id,
                title,
                author,
                content,
                post.created,
                post.modified,
                categoryid,
                category.name as category
         from post
                  join category on post.categoryid = category.id
         where post.id = $1`, [id])

    if (!rows.length) throw createError({
        statusCode: 404,
        statusMessage: "Not found",
    })

    const post = rows[0]

    const { rows: comments } = await db.query(
        `select id, author, content, created, modified
         from Comment
         where postid = $1
         order by created`, [id])

    return { ...post, comments };
})
