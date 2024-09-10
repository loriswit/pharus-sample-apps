import { createReadStream, existsSync } from "node:fs"
import { resolve } from "node:path"

export default defineEventHandler(event => {
    const filename = getRouterParam(event, "filename")

    const path = resolve(".output", "public", "images", filename)
    if (!existsSync(path)) {
        setResponseStatus(event, 404)
        return "Not found"
    }

    setResponseHeaders(event, { "Content-Type": "image/webp" })
    return sendStream(event, createReadStream(path))
})
