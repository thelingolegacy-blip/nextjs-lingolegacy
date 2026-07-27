# Studio look and feel layer

This layer implements the Loyalty Lane / Lingo Legacy visual direction without adding paid services, packages, or uploaded audio assets.

## Brand themes

- Loyalty Lane: matte black, metallic gold, cream.
- Kotton's Code: dark indigo, neon violet, electric gold.
- That's My Lingo: deep burgundy, champagne gold, cream, glass-lounge panels.

Theme classes live in `app/globals.css`:

- `.theme-loyalty-lane`
- `.theme-kottons-code`
- `.theme-thats-my-lingo`

## No-cost motion and overlays

- `.studio-enter` gives page sections a reduced-motion-safe fade/slide entrance.
- `.drop-card` gives product cards CSS-only hover lift, gold glow, and 3D tilt.
- `.heritage-scan` adds a CSS-only scanline overlay for 1990s product imagery.
- `.glass-lounge` adds a frosted lounge panel without JavaScript.
- `.gold-shimmer` and `.claimed-stamp` power the claim button shimmer and claimed state.

No Framer Motion dependency is installed.

## Audio guardrail

`components/AudioController.tsx` uses the Web Audio API after a user click. It does not reference or load audio files. The claim button uses a short generated tone after a successful cart response.

## Commerce guardrail

This visual layer does not change the backend safety rules:

- Shopify Storefront calls run only through existing server/client routes.
- Shopify Admin product seeding remains data-only.
- Tapstitch API calls are not added.
- Paid telemetry, Blob, database, and production deploy steps remain out of scope.
