import pg from "pg"

let db = null

export function useDbClient() {
    if (!db) {
        db = new pg.Client()
        db.connect()
    }
    return db
}
