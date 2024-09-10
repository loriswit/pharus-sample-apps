import Koa from "koa"
import { bodyParser } from "@koa/bodyparser"
import Router from "@koa/router"
import cors from "@koa/cors"
import { posts } from "./controllers/posts.js"
import { categories } from "./controllers/categories.js"
import { comments } from "./controllers/comments.js"
import { errorHandler } from "./error-handler.js";

const app = new Koa()

if (!process.env.NO_CORS)
    app.use(cors())

const router = new Router()
    .get("/posts", posts.index)
    .post("/posts", posts.create)
    .get("/posts/:id", posts.read)
    .patch("/posts/:id", posts.update)
    .delete("/posts/:id", posts.delete)

    .post("/posts/:postId/comments", comments.create)

    .get("/categories", categories.index)
    .post("/categories", categories.create)
    .get("/categories/:id", categories.read)
    .patch("/categories/:id", categories.update)
    .delete("/categories/:id", categories.delete)

app.use(errorHandler())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())

const port = process.env.PORT ?? 3000

app.listen(port)
console.log("Listening on http://localhost:" + port)
