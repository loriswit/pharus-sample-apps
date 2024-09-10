import { component$ } from "@builder.io/qwik"
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city"

import "./global.css"

export default component$(() => {
    /**
     * The root of a QwikCity site always start with the <QwikCityProvider> component,
     * immediately followed by the document's <head> and <body>.
     *
     * Don't remove the `<head>` and `<body>` elements.
     */

    return (
        <QwikCityProvider>
            <head>
                <title>My Blog</title>
                <meta charSet="UTF-8"/>
                <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
            </head>
            <body>
            <RouterOutlet/>
            <ServiceWorkerRegister/>
            </body>
        </QwikCityProvider>
    )
})
