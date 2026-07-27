import { NextResponse } from "next/server";
import { assertSameOriginPost } from "@/lib/request-guards";
import { signCartToken, verifyCartToken } from "@/lib/cart-token";

function readCookie(header: string | null, name: string) {
  if (!header) return undefined;
  const cookies = header.split(";").map((cookie) => cookie.trim());
  const match = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  return match?.slice(name.length + 1);
}

export async function POST(req: Request) {
  try {
    assertSameOriginPost(req);
    const body = (await req.json()) as { cartToken?: unknown; newItem?: unknown };
    const suppliedToken = typeof body.cartToken === "string" ? body.cartToken : undefined;
    const cookieToken = readCookie(req.headers.get("cookie"), "cart");
    const decoded = suppliedToken || cookieToken ? await verifyCartToken(suppliedToken || cookieToken || "") : null;
    const items = decoded?.items ? [...decoded.items] : [];

    if (typeof body.newItem === "string" && body.newItem.length <= 120) {
      items.push(body.newItem);
    }

    const cartToken = await signCartToken(items);
    const response = NextResponse.json({ success: true, items });
    response.cookies.set("cart", cartToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to verify cart." },
      { status: 500 },
    );
  }
}
