import { getBody, makeError, makeResponse, useDbClient } from "@/utils/server.js"

const db = useDbClient()

export async function GET({ params }) {
    const id = params.id

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

    if (!rows.length)
        return makeError(404, "Not found")

    const post = rows[0]

    const { rows: comments } = await db.query(
        `select id, author, content, created, modified
         from Comment
         where postid = $1
         order by created`, [id])

    return makeResponse({ ...post, comments })
}

export async function PATCH({ params, request }) {
    const id = params.id
    const body = await getBody(request)

    const keys = ["title", "author", "content", "categoryid"]
    for (const key of keys) {
        const value = body[key]
        if (!value || (typeof (value) === "string" && !value.length))
            makeError(422, `${key} cannot be empty!`)
    }

    await db.query(
        `update post
         set modified   = now(),
             title      = $1,
             author     = $2,
             content    = $3,
             categoryid = $4
         where id = $5`,
        [...keys.map(key => body[key]), id])

    return makeResponse()
}

export async function DELETE({ params }) {
    const id = params.id

    db.query("delete from post where id = $1", [id])
    return makeResponse()
}
