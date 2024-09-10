import pg from "pg"

export const db = new pg.Client()
await db.connect()
