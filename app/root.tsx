import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";

import "@navikt/ds-css/dist/index.css";
import "./tailwind.css";
import {Page} from "@navikt/ds-react";

export function Layout() {
    return (
        <html lang="en" className="font-sans">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <title>Flais IDP Auth Selector</title>
            <Meta/>
            <Links/>
            <link
                href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;900&display=swap"
                rel="stylesheet"
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
