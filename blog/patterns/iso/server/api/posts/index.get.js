const db = useDbClient()

export default defineEventHandler(async () => {
    const { rows } = await db.query(
        `select post.id,
                title,
                author,
                post.created,
                to_char(post.created, 'YYYY') as year,
                category.name                 as category
         from post
         join category on post.categoryid = category.id
         order by created desc`
    )
    return rows
})
