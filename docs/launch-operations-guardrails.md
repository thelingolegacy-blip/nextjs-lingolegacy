# Launch operations guardrails

This branch is deployment-ready scaffolding only. It should merge through the normal Git-connected Vercel flow after review; do not manually run a production deploy from this branch.

## Pre-merge gates

Run locally when dependencies are installed:

```bash
npm run lint
npm run build
node scripts/smoke-storefront.mjs
```

In restricted clones without dependencies, `node scripts/smoke-storefront.mjs` still verifies launch-critical files, security headers, robots guardrails, legal/safety pages, and forbidden paid-service tokens.

## Health check

- `/healthz` returns `ok`.
- After merge, verify the production URL returns `200 OK` for `/healthz`, `/`, `/merch`, `/privacy`, `/terms`, and `/safety`.

## Rollback

Use Vercel deployment history to promote the previous stable production deployment if a launch check fails. Prefer rollback over rushed hotfix deploys.

## Vercel-native production checklist

1. PR reviewed and merged through Git.
2. Lint/build pass in a dependency-complete environment.
3. Smoke script passes.
4. Required env vars are present: `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_ACCESS_TOKEN`, `CART_JWT_SECRET`.
5. No Shopify Admin write token is required for this storefront path.
6. No paid telemetry, Blob, database, BotID Deep Analysis, WAF metered rate limiting, or external CI/CD was added.
7. Use Vercel deployment status, `vercel usage`, and manual health checks as the first post-launch monitoring layer.
8. If a deployment regresses, rollback from Vercel deployment history.

## Migration policy

No database migrations are included. If Neon or another relational database is approved later, use expand/contract migrations and verify backups before production changes. Vercel Postgres is no longer first-party; existing databases were migrated to Neon via Vercel Marketplace in December 2024.
