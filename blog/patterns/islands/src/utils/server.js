import pg from "pg"

let db = null

export function useDbClient() {
    if (!db) {
        db = new pg.Client()
        db.connect()
    }
    return db
}

export function makeResponse(body, status, headers) {
    return new Response(
        body ? JSON.stringify(body) : null, {
            status: status ?? (body ? 200 : 204),
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
        },
    )
}

export function makeError(status, statusText) {
    return new Response(null, { status, statusText })
}

export async function getBody(request) {
    if (request.headers.get("Content-Type") === "application/json")
        return await request.json();
    else
        return null
}
