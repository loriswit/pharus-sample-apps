import { defineConfig } from "vite"
import { qwikVite } from "@builder.io/qwik/optimizer"
import { qwikCity } from "@builder.io/qwik-city/vite"
import tsconfigPaths from "vite-tsconfig-paths"
import pkg from "./package.json"

const { dependencies = {}, devDependencies = {} } = pkg
errorOnDuplicatesPkgDeps(devDependencies, dependencies)

export default defineConfig(({ command, mode }) => {
    return {
        plugins: [
            qwikCity({ trailingSlash: false }),
            qwikVite(),
            tsconfigPaths(),
        ],
        optimizeDeps: {
            exclude: [],
        },
        ssr:
            command === "build" && mode === "production"
                ? {
                    noExternal: Object.keys(devDependencies),
                    external: Object.keys(dependencies),
                }
                : undefined,
        server: {
            headers: {
                "Cache-Control": "public, max-age=0",
            },
        },
        preview: {
            headers: {
                "Cache-Control": "public, max-age=600",
            },
        },
    }
})

/**
 * Function to identify duplicate dependencies and throw an error
 * @param {Object} devDependencies - List of development dependencies
 * @param {Object} dependencies - List of production dependencies
 */
function errorOnDuplicatesPkgDeps(devDependencies, dependencies) {
    const duplicateDeps = Object.keys(devDependencies).filter(dep => dependencies[dep])

    const msg = `
    Warning: The dependency "${duplicateDeps.join(", ")}" is listed in both "devDependencies" and "dependencies".
    Please move the duplicated dependencies to "devDependencies" only and remove it from "dependencies"`

    if (duplicateDeps.length > 0)
        throw new Error(msg)
}
