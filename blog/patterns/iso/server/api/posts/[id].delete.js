const db = useDbClient()

export default defineEventHandler(async event => {
    const id = getRouterParam(event, "id")

    db.query("delete from post where id = $1", [id])
    setResponseStatus(event, 204)
})
