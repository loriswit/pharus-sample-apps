import { getBody, makeError, makeResponse, useDbClient } from "@/utils/server.js"

const db = useDbClient()

export async function GET() {
    const { rows } = await db.query(
        `select post.id,
                title,
                author,
                post.created,
                to_char(post.created, 'YYYY') as year,
                category.name                 as category
         from post
         join category on post.categoryid = category.id
         order by created desc`,
    )

    return makeResponse(rows)
}

export async function POST({ request }) {
    const body = await getBody(request)

    const keys = ["title", "author", "content", "categoryid"]
    for (const key of keys) {
        const value = body[key]
        if (!value || (typeof (value) === "string" && !value.length))
            makeError(422, `${key} cannot be empty!`)
    }

    const { rows } = await db.query(
        "insert into post (title, author, content, categoryid) values ($1, $2, $3, $4) returning id",
        keys.map(key => body[key]))

    return makeResponse({ id: rows[0].id }, 201, [{ "Location": "/posts/" + rows[0].id }])
}
