# Studio safety guardrails

This storefront keeps safety controls no-cost and code-based until traffic, forms, or paid services are deliberately approved.

## Implemented controls

- Security headers in `next.config.ts`: HSTS, CSP, `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `nosniff`, strict referrer policy, and locked-down permissions.
- Advisory AI crawler rules in `public/robots.txt`.
- Cart API routes reject cross-origin POST requests and cap cart quantity at 10.
- Cart signing requires `CART_JWT_SECRET`; there is no fallback secret.
- Privacy, Terms, and Safety placeholder routes are linked from the global footer.

## UI layer rules

- Use layer tokens only: content `0`, nav `100`, backdrop `400`, modal `500`, toast `600`, floating action `700`.
- Decorative overlays must be pointer-safe and use accessible hiding rules.
- Never render restricted data and hide it with CSS; omit restricted data before rendering.
- Future modals must include focus trap, body scroll lock, Escape close, explicit close, and backdrop close.

## Cost guardrails

- No paid telemetry, Blob, database, BotID Deep Analysis, WAF rate-limit metering, Shopify Admin writes, or Tapstitch API calls are added by this branch.
- If public bot traffic becomes measurable in `vercel usage`, use Vercel Firewall rules as the enforcement layer after approval.
- For refunds or credits, use https://vercel.com/help with `vercel usage` evidence.
