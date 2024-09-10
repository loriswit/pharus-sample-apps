import { db } from "../db.js"

export const posts = {
    async index(ctx) {
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
        ctx.body = rows
    },

    async create(ctx) {
        const keys = ["title", "author", "content", "categoryid"]
        for (const key of keys) {
            const value = ctx.request.body[key]
            if (!value || (typeof (value) === "string" && !value.length))
                ctx.throw(422, `${key} cannot be empty!`)
        }

        const { rows } = await db.query(
            "insert into post (title, author, content, categoryid) values ($1, $2, $3, $4) returning id",
            keys.map(key => ctx.request.body[key]))

        ctx.set("Location", "/posts/" + rows[0].id)
        ctx.body = { id: rows[0].id }
        ctx.status = 201
    },

    async read(ctx) {
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
             where post.id = $1`, [ctx.params.id])

        if (!rows.length) return
        const post = rows[0]

        const { rows: comments } = await db.query(
            `select id, author, content, created, modified
             from Comment
             where postid = $1
             order by created`, [ctx.params.id])

        ctx.body = { ...post, comments };
    },

    async update(ctx) {
        const keys = ["title", "author", "content", "categoryid"]
        for (const key of keys) {
            const value = ctx.request.body[key]
            if (!value || (typeof (value) === "string" && !value.length))
                ctx.throw(422, `${key} cannot be empty!`)
        }

        await db.query(
            `update post
             set modified = now(),
                 title = $1,
                 author = $2,
                 content = $3,
                 categoryid = $4
             where id = $5`,
            [...keys.map(key => ctx.request.body[key]), ctx.params.id])

        ctx.status = 204
    },

    async delete(ctx) {
        db.query("delete from post where id = $1", [ctx.params.id])
        ctx.status = 204
    },
}
