import { getBody, makeResponse, useDbClient } from "@/utils/server.js"

const db = useDbClient()

export async function POST({ params, request }) {
    const body = await getBody(request)
    const postId = params.id

    const keys = ["author", "content"]
    for (const key of keys)
        if (!body[key] || !body[key].length)
            return makeError(422, `${key} cannot be empty!`)

    const { rows } = await db.query(
        "insert into comment (postid, author, content) values ($1, $2, $3) returning id",
        [postId, ...keys.map(key => body[key])])

    return makeResponse({ id: rows[0].id }, 201, [{ "Location": "/posts/" + postId }])
}
