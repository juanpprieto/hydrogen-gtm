# Hydrogen + Google GTM with Content Security Policy

This example repository demonstrates how to integrate Google Tag Manager and Hydrogen
while preserving Content Security Policy.

- [Google Tag Manager](https://tagmanager.google.com/)
- [Google Tag Manager CSP instructions](https://developers.google.com/tag-platform/security/guides/csp)

## Instructions

### 1. Add Google Tag Manager container ID environment variable

Add `PUBLIC_GOOGLE_GTM_ID` to your .env and your storefront environment variables

### 2. Create the GoogleGTM component

Copy the GoogleGTM component found at `/app/components/GoogleGTM.tsx`

### 3. Import and implement GoogleGTM in the root.tsx

In your `app/root.tsx`

```ts
import {GoogleGTM} from '~/components/GoogleGTM';
```

Return the google `PUBLIC_GOOGLE_GTM_ID` env variable from the root loader as `googleGtmId`

```ts
export async function loader({context}: LoaderArgs) {
  // ...
  const googleGtmID = context.env.PUBLIC_GOOGLE_GTM_ID;

  return defer(
    {
      // ...
      googleGtmID,
    },
    {headers},
  );
}
```

Render the google GTM component inside the App

```ts
export default function App() {
  const nonce = useNonce();
  const data = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout {...data}>
          <Outlet />
        </Layout>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
        <GoogleGTM id={data.googleGtmID} />
      </body>
    </html>
  );
}
```

## Hydrogen

Hydrogen is Shopify’s stack for headless commerce. Hydrogen is designed to dovetail with [Remix](https://remix.run/), Shopify’s full stack web framework. This template contains a **minimal setup** of components, queries and tooling to get started with Hydrogen.

[Check out Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)
[Get familiar with Remix](https://remix.run/docs/en/v1)

## What's included

- Remix
- Hydrogen
- Oxygen
- Shopify CLI
- ESLint
- Prettier
- GraphQL generator
- TypeScript and JavaScript flavors
- Minimal setup of components and routes

## Getting started

**Requirements:**

- Node.js version 16.14.0 or higher

```bash
npm create @shopify/hydrogen@latest
```

## Building for production

```bash
npm run build
```

## Local development

```bash
npm run dev
```
