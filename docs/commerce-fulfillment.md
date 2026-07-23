# Commerce and fulfillment guardrails

This repo contains storefront/backend scaffolding only. It does not install Shopify apps, write Shopify Admin products, call Tapstitch APIs, or deploy to Vercel.

## Vendor split

- `Tapstitch` vendor → print-on-demand fulfillment handled by the Tapstitch Shopify app after checkout.
- `Loyalty Lane Bulk` vendor → physical inventory workflow for jerseys, jewelry, backpacks, socks, and other limited drops.

## Required environment variables

- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` — Shopify storefront domain, for example `loyaltylane.myshopify.com`.
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` — Storefront API token used only on the server.
- `CART_JWT_SECRET` — signing secret for the cart verification cookie.

No fallback secret is provided. Missing values return configuration errors instead of silently using unsafe defaults.

## No-cost line

- Do not run Shopify Admin seed scripts from this repo.
- Do not add Web Analytics, Speed Insights, Blob, Redis, Neon, or other usage-generating services without explicit approval.
- Do not manually run `vercel --prod` for this change; deployment should remain tied to the normal merge flow.
