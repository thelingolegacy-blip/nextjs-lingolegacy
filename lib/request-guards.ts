export function assertSameOriginPost(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return;

  const expectedOrigin = new URL(req.url).origin;
  if (origin !== expectedOrigin) {
    throw new Error("Cross-origin POST rejected.");
  }
}
