const db = useDbClient()

export default defineEventHandler(async () => {
    const { rows } = await db.query(
        `select category.id, name, count(post.id) as postcount
         from category
                  left join post on post.categoryid = category.id
         group by category.id, name
         order by postcount desc, name`
    )
    return rows
})
