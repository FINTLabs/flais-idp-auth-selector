import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";

import "./tailwind.css";
import "@navikt/ds-css/dist/index.css";
import {Page} from "@navikt/ds-react";

export function Layout() {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <title>Flais IDP Auth Selector</title>
            <Meta/>
            <Links/>
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
                rel="stylesheet"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            />
        </head>
        <body>
        <Page>
            <Page.Block as="main" width="xl" gutters>
                <Outlet/>
            </Page.Block>
        </Page>
        <ScrollRestoration/>
        <Scripts/>
        </body>
        </html>
    );
}

export default function App() {
    return <Outlet/>;
}
