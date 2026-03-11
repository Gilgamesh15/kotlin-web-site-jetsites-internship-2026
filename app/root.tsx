import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useMatches,
} from "react-router";

import "./styles/styles-v2.scss";
import Footer from "./components/footer";
import Header from "./components/header";
import { releases } from "~/lib/data/releases";
import classNames from "classnames";
import React from "react";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Open+Sans:300,300italic,400,400italic,600,600italic,700,700italic&display=swap",
  },
];

function loadGTM() {
  (function (w: any, d: any, s: any, l: any, i: any) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", "GTM-5P98");
}

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const matches = useMatches();

  const routeHtmlClasses = matches
    .map((m) => (m.handle as { htmlClass?: string })?.htmlClass)
    .filter((htmlClass): htmlClass is string => typeof htmlClass === "string");

  React.useEffect(() => {
    loadGTM();
  }, []);

  return (
    <html
      lang="en"
      className={classNames("page_restyled_v2", routeHtmlClasses)}
    >
      <head>
        <meta charSet="utf-8" />

        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//resources.jetbrains.com" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />

        {/* Open Graph data */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kotlin" />

        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kotlin" />

        <Links />
        <Meta />

        <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
        <link rel="alternate icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/images/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/images/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/images/apple-touch-icon-144x144.png"
        />
      </head>
      <body>
        <div className="global-layout">
          <Header
            productWebUrl={releases.latest.url}
            hasSearch={false}
            dropdownTheme="dark"
            currentUrl={location.pathname}
          />
          <div id="react-app">{children}</div>
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return (
    <html lang="en" className="page_restyled_v2">
      <head>
        <meta charSet="utf-8" />
        <title>Error — Kotlin Programming Language</title>
      </head>
      <body>
        <p>An unexpected error occurred. Please try refreshing the page.</p>
      </body>
    </html>
  );
}
