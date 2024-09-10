import { makeResponse, useDbClient } from "@/utils/server.js"

const db = useDbClient()

export async function GET() {
    const { rows } = await db.query(
        `select category.id, name, count(post.id) as postcount
         from category
                  left join post on post.categoryid = category.id
         group by category.id, name
         order by postcount desc, name`
    )

    return makeResponse(rows)
}
