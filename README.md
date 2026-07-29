# Loyalty Lane Next.js Storefront

Next.js storefront scaffolding for Loyalty Lane, Shopify checkout, Tapstitch POD vendor routing, and bulk inventory drop planning.

## Development

```bash
npm run dev
```

## Commerce environment variables

- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `CART_JWT_SECRET`

Missing values produce configuration errors. No fallback secrets are used.

## No-cost guardrails

- This repo does not execute Shopify Admin product writes.
- `scripts/commerce-catalog.ts` is a data-only catalog reference.
- Do not add paid telemetry, storage, database, or manual Vercel deploy steps without explicit approval.


## Studio UI v2

The storefront keeps the current Next.js 16, React 19, and Tailwind 4 stack while refreshing the global Studio skin, responsive hero, production metrics, and launch-system cards.
