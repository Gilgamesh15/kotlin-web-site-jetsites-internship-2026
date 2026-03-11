# Kotlin Homepage — React Router 7 Migration

Migrated from a Flask/Jinja2 SSR stack to React Router 7 Framework Mode with full SSR (`ssr: true` in `react-router.config.ts`).

---

## Jinja2 Templates → React Router Layout + Pages

Jinja2's template inheritance model — `base.html` defining the shell with `{% block %}` slots filled by child templates — maps cleanly onto React Router 7's architecture. `app/root.tsx` exports a `Layout` function that owns `<html>`, `<head>`, the global `<Header>`, `<Footer>`, and the `<Outlet />` slot. Routes in `app/routes/` render into that outlet, the direct equivalent of `{% block content %}`.

---

## Per-Route HTML Class (`page__index-new`)

The original `base.html` applied per-page HTML-level classes via `{% block body_class %}`. React Router has no built-in equivalent, so `useMatches()` in the root `Layout` collects a `handle.htmlClass` value exported from each route module and merges it onto `<html className={...}>`. The index route exports:

```ts
export const handle = { htmlClass: "page__index-new" };
```

This produces `<html class="page_restyled_v2 page__index-new">` in SSR output, preserving exact parity with the original.

---

## Meta Export

Each route exports a `meta()` function returning Open Graph title, description, and image tags, replacing Flask's per-page `<head>` block overrides. A shared `getMeta()` utility in `app/lib/utils.ts` centralises defaults.

---

## Assets → `public/`

All static assets (fonts, images, favicons) were moved from `static/` to `public/`. Vite serves `public/` at `/`, so all asset paths are unchanged from the original.

---

## TypeScript

The original codebase used plain JSX. React Router 7 ships typed route conventions (`Route.MetaArgs`, `Route.LinksFunction`, etc.) and the migration adopts TypeScript throughout to take full advantage of them. Run `yarn typecheck` (`react-router typegen && tsc`) to validate types.

---

## Dependency Versions

`react` and `react-dom` were updated from `^17` to `18` — required for React Router 7 compatibility — and intentionally held at **18, not 19** to limit migration scope and avoid unvetted breaking changes.

All other dependencies were pinned to their original exact versions to prevent visual regressions from component updates:

| Package                             | Version  |
| ----------------------------------- | -------- |
| `@jetbrains/kotlin-web-site-ui`     | `3.1.0`  |
| `@jetbrains/babel-preset-jetbrains` | `^2.3.1` |
| `@rescui/button`                    | `0.4.0`  |
| `@rescui/card`                      | `0.3.0`  |
| `@rescui/checkbox`                  | `0.1.0`  |
| `@rescui/colors`                    | `0.0.4`  |
| `@rescui/icons`                     | `0.3.0`  |
| `@rescui/input`                     | `0.1.1`  |
| `@rescui/tab-list`                  | `0.3.0`  |
| `@rescui/tooltip`                   | `0.1.3`  |
| `@rescui/typography`                | `0.3.0`  |
| `@rescui/ui-contexts`               | `0.1.3`  |

---

## Lazy-Loading `@jetbrains/kotlin-web-site-ui` Components

The global Header and Footer from `@jetbrains/kotlin-web-site-ui` are loaded via `React.lazy()`. These components carry significant JS weight and contain side effects that assume a browser environment. Lazy-loading excludes them from the SSR bundle entirely — preventing crashes from browser-only APIs during server render — and defers their execution until after hydration.

```tsx
// app/components/header/index.tsx
const LazyGlobalHeader = React.lazy(
  () => import("@jetbrains/kotlin-web-site-ui/dist/header.js"),
) as unknown as React.ComponentType<GlobalHeaderProps>;

const Header = ({ productWebUrl, hasSearch, dropdownTheme, currentUrl, ...props }: GlobalHeaderProps) => {
  const isClient = useIsClient();
  if (!isClient) return null;
  return (
    <React.Suspense fallback={null}>
      <ThemeProvider theme="dark">
        <LazyGlobalHeader productWebUrl={productWebUrl} hasSearch={hasSearch} ... />
      </ThemeProvider>
    </React.Suspense>
  );
};
```

---

## SSR-Safe Hooks

Three hooks bridge the gap between server and client environments:

- **`useIsClient`** — returns `false` on the server, `true` after first render on the client. Gates any render that requires browser APIs — the lazy Header/Footer are not rendered at all until `isClient` is true.
- **`useIsMobile`** — checks `window.matchMedia` and user agent after mount. Returns `isLoading: true` on the server so mobile-conditional UI avoids a hydration mismatch flash.
- **`useLocalStorage`** — typed wrapper around `localStorage` with silent error fallback. Used in `UsageSection` to persist the testimonials sort order (`kotlin-testimonials-order`) across page loads.

```ts
// app/hooks/use-is-client.ts
export function useIsClient() {
  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  return isClient;
}
```

---

## `highlight.js` via `useEffect`

`highlight.js` accesses `document` internally, which is undefined on the server. Running `hljs.highlightBlock()` at module or render time would crash SSR. The `ProgrammingLanguage` component runs highlighting inside a `useEffect`, scoping execution to the client after hydration.

```tsx
// app/routes/index/why-kotlin-section/programming-language/index.tsx
React.useEffect(() => {
  if (highlightedRef.current) {
    const el = document.createElement("code");
    el.className = "language-kotlin";
    el.textContent = tabs[activeIndex].code;
    hljs.highlightBlock(el);
    highlightedRef.current.innerHTML = el.innerHTML;
  }
}, [highlightedRef, activeIndex]);
```

---

## Internal vs External Links

React Router's `<Link>` is used for all internal navigation; plain `<a>` for all external links (docs, blog, GitHub, etc.). The original site used `<a>` everywhere since Flask had no client-side router — this migration makes the distinction explicit.

---

## Vendored Hooks

Single-hook utilities were vendored into `app/hooks/` rather than pulling in full packages as dependencies:

| File                   | Source                                                                | Reason                                    |
| ---------------------- | --------------------------------------------------------------------- | ----------------------------------------- |
| `use-is-client.ts`     | [usehooks-ts](https://usehooks-ts.com/react-hook/use-is-client) (MIT) | Single hook, no need for the full package |
| `use-is-mobile.ts`     | [usehooks.io](https://usehooks.io/useismobile)                        | Single hook, no need for the full package |
| `use-local-storage.ts` | Generated by Claude AI                                                | Simple utility                            |

---

## Setup

```bash
yarn install
yarn dev        # development server with HMR
yarn build      # production SSR build
yarn start      # serve production build
```
