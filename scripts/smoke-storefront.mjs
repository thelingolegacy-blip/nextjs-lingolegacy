import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2] || process.cwd();
const errors = [];
const requiredFiles = [
  'app/healthz/route.ts',
  'app/privacy/page.tsx',
  'app/terms/page.tsx',
  'app/safety/page.tsx',
  'public/robots.txt',
  'next.config.ts',
  'lib/request-guards.ts',
  'lib/cart-token.ts',
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    errors.push(`missing required launch file: ${file}`);
  }
}

const nextConfig = fs.readFileSync(path.join(root, 'next.config.ts'), 'utf8');
for (const header of [
  'Strict-Transport-Security',
  'Content-Security-Policy',
  'X-Frame-Options',
  'X-Content-Type-Options',
  'Referrer-Policy',
]) {
  if (!nextConfig.includes(header)) errors.push(`missing security header: ${header}`);
}

const robots = fs.readFileSync(path.join(root, 'public/robots.txt'), 'utf8');
for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Bytespider']) {
  if (!robots.includes(`User-agent: ${bot}`)) errors.push(`robots.txt missing AI crawler guard: ${bot}`);
}

const combined = requiredFiles
  .filter((file) => fs.existsSync(path.join(root, file)))
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n');

for (const forbidden of [
  'loyalty_lane_secret',
  'AUTH0_CART_SECRET',
  'SHOPIFY_ADMIN_API_ACCESS_TOKEN',
  'productCreate',
  'vercel --prod',
  '@vercel/analytics',
  '@vercel/speed-insights',
]) {
  if (combined.includes(forbidden)) errors.push(`forbidden token found: ${forbidden}`);
}

console.log(JSON.stringify({ ok: errors.length === 0, errors }, null, 2));
if (errors.length) process.exit(1);
