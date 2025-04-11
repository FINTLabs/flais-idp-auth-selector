import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration
} from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";

import "@navikt/ds-css/dist/index.css";
import "./tailwind.css";
import "./styles/fonts.css";
import {Page} from "@navikt/ds-react";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://fonts.cdnfonts.com/css/brockmann",
  }
];

export function Layout() {
    return (
        <html lang="en" className="font-sans">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <title>Flais IDP Auth Selector</title>
            <Meta/>
            <Links/>
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
