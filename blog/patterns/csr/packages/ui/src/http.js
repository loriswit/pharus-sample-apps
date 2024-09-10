const apiBase = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000"

export const http = {
    get(url) {
        return this.sendRequest("GET", url)
    },

    post(url, body) {
        return this.sendRequest("POST", url, body)
    },

    patch(url, body) {
        return this.sendRequest("PATCH", url, body)
    },

    delete(url) {
        return this.sendRequest("DELETE", url)
    },

    async sendRequest(method, url, body = undefined) {
        const res = await fetch(apiBase + url, {
            method,
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
        })
        if (res.status >= 400) {
            const body = await res.text();
            const error = new Error(`Request failed (${res.status}): ${body}`)
            error.status = res.status;
            error.body = body;
            throw error;
        }

        if (res.headers.get("Content-Type")?.includes("json"))
            return await res.json()
    },
}
