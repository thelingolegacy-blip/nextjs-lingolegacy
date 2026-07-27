export const dynamic = "force-static";

export function GET() {
  return new Response("ok\n", {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
