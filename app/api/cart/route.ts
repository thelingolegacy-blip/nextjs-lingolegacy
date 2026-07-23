import { NextResponse } from "next/server";
import { createCart } from "@/lib/shopify";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { variantId?: unknown; quantity?: unknown };
    const variantId = typeof body.variantId === "string" ? body.variantId : "";
    const quantity = typeof body.quantity === "number" && body.quantity > 0 ? body.quantity : 1;

    if (!variantId.startsWith("gid://shopify/ProductVariant/")) {
      return NextResponse.json({ error: "A valid Shopify variantId is required." }, { status: 400 });
    }

    const data = await createCart(variantId, quantity);
    const userErrors = data.cartCreate.userErrors;

    if (userErrors.length > 0 || !data.cartCreate.cart) {
      return NextResponse.json(
        { error: userErrors.map((error) => error.message).join("; ") || "Cart creation failed." },
        { status: 400 },
      );
    }

    return NextResponse.json({ checkoutUrl: data.cartCreate.cart.checkoutUrl });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create cart." },
      { status: 500 },
    );
  }
}
