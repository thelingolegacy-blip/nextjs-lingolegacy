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

## Studio look and feel

The storefront includes CSS-only theme tokens, heritage scan overlays, gold shimmer claim buttons, and a user-triggered Web Audio controller. See `docs/studio-look-and-feel.md`.

## Security and safety guardrails

This branch adds Vercel/Next response headers, advisory AI crawler rules in `public/robots.txt`, same-origin POST checks for cart APIs, quantity caps, legal/safety placeholder routes, and UI-layer tokens. See `docs/studio-safety-guardrails.md`.
