import { db } from "../db.js"

export const categories = {
    async index(ctx) {
        const { rows } = await db.query(
            `select category.id, name, count(post.id) as postcount
             from category
                      left join post on post.categoryid = category.id
             group by category.id, name
             order by postcount desc, name`
        )
        ctx.body = rows
    },

    async create(ctx) {
        const { name } = ctx.request.body
        if (!name || !name.length)
            ctx.throw(422, "name cannot be empty!")

        const { rows } = await db.query(
            "insert into category (name) values ($1) returning id", [name])

        ctx.set("Location", "/categories/" + rows[0].id)
        ctx.body = { id: rows[0].id }
        ctx.status = 201
    },

    async read(ctx) {
        const { rows } = await db.query(
            `select id, name
             from category
             where id = $1`, [ctx.params.id])

        if (!rows.length) return
        const category = rows[0]

        const { rows: posts } = await db.query(
            `select id, title, author, created
             from post
             where post.categoryid = $1
             order by created desc`,
            [ctx.params.id])

        ctx.body = { ...category, posts };
    },

    async update(ctx) {
        const { name } = ctx.request.body
        if (!name || !name.length)
            ctx.throw(422, "name cannot be empty!")

        await db.query(
            `update category set modified = now(), name = $1 where id = $2`,
            [name, ctx.params.id])

        ctx.status = 204
    },

    async delete(ctx) {
        db.query("delete from category where id = $1", [ctx.params.id])
        ctx.status = 204
    },
}
