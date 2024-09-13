import { createReadStream, existsSync } from "node:fs"
import { resolve } from "node:path"
import { Readable } from "node:stream"

export const onGet = (async requestEvent => {
    const filename = requestEvent.params.filename

    const path = resolve("dist", "images", filename)
    if (!existsSync(path)) {
        requestEvent.status(404)
        return "Not found"
    }

    requestEvent.headers.set("Content-Type", "image/webp")

    const writableStream = requestEvent.getWritableStream()
    const readableStream = Readable.toWeb(createReadStream(path))

    await readableStream.pipeTo(writableStream)
})
