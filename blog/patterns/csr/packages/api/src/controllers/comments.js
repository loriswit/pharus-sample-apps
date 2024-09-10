import { db } from "../db.js"

export const comments = {
    async create(ctx) {
        const keys = ["author", "content"]
        for (const key of keys)
            if (!ctx.request.body[key] || !ctx.request.body[key].length)
                ctx.throw(422, `${key} cannot be empty!`)

        const { rows } = await db.query(
            "insert into comment (postid, author, content) values ($1, $2, $3) returning id",
            [ctx.params.postId, ...keys.map(key => ctx.request.body[key])])

        ctx.set("Location", "/posts/" + ctx.params.postId)
        ctx.body = { id: rows[0].id }
        ctx.status = 201
    },
}
