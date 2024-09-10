import { DatabaseError } from "pg-protocol"

export function errorHandler() {
    return async function (ctx, next) {
        try {
            await next();
        } catch (err) {
            if (err instanceof DatabaseError && err.code === "23503") {
                ctx.status = 400;
                ctx.body = err.message;
            } else throw err
        }
    }
}
