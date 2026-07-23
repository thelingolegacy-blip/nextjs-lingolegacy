const encoder = new TextEncoder();

export type CartTokenPayload = {
  items: string[];
  exp: number;
};

function base64UrlEncode(value: string | ArrayBuffer) {
  const bytes =
    typeof value === "string" ? encoder.encode(value) : new Uint8Array(value);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function base64UrlDecode(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function signingKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function getCartSecret() {
  const secret = process.env.CART_JWT_SECRET;
  if (!secret) {
    throw new Error("CART_JWT_SECRET is not configured.");
  }
  return secret;
}

export async function signCartToken(items: string[]) {
  const secret = getCartSecret();
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64UrlEncode(
    JSON.stringify({ items, exp: Math.floor(Date.now() / 1000) + 60 * 60 }),
  );
  const data = `${header}.${payload}`;
  const signature = await crypto.subtle.sign(
    "HMAC",
    await signingKey(secret),
    encoder.encode(data),
  );

  return `${data}.${base64UrlEncode(signature)}`;
}

export async function verifyCartToken(token: string): Promise<CartTokenPayload | null> {
  const secret = getCartSecret();
  const [header, payload, signature] = token.split(".");
  if (!header || !payload || !signature) return null;

  const expected = Uint8Array.from(
    atob(signature.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(signature.length / 4) * 4, "=")),
    (char) => char.charCodeAt(0),
  );

  const verified = await crypto.subtle.verify(
    "HMAC",
    await signingKey(secret),
    expected,
    encoder.encode(`${header}.${payload}`),
  );

  if (!verified) return null;

  const decoded = JSON.parse(base64UrlDecode(payload)) as CartTokenPayload;
  if (!Array.isArray(decoded.items) || decoded.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return decoded;
}
