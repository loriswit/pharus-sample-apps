const db = useDbClient()

export default defineEventHandler(async event => {
    const id = getRouterParam(event, "id")

    const { rows } = await db.query(
        `select id, name
         from category
         where id = $1`, [id])

    if (!rows.length) return
    const category = rows[0]

    const { rows: posts } = await db.query(
        `select id, title, author, created
         from post
         where post.categoryid = $1
         order by created desc`, [id])

    return { ...category, posts };
})
