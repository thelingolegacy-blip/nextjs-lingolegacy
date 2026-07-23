"use client";

import { useState } from "react";

export default function AddToCartButton({
  variantId,
  trackingId,
}: {
  variantId?: string;
  trackingId?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAddToCart() {
    if (!variantId) {
      setError("This item is not available yet.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (trackingId) {
        const verifyResponse = await fetch("/api/cart/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newItem: trackingId }),
        });

        if (!verifyResponse.ok) {
          throw new Error("Cart verification failed.");
        }
      }

      const cartResponse = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId, quantity: 1 }),
      });
      const data = (await cartResponse.json()) as { checkoutUrl?: string; error?: string };

      if (!cartResponse.ok || !data.checkoutUrl) {
        throw new Error(data.error || "Checkout is unavailable.");
      }

      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to add item to cart.");
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        onClick={handleAddToCart}
        disabled={loading || !variantId}
        className="w-full rounded-full bg-[#d4af37] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-[#f5d46b] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Processing..." : "Claim Piece"}
      </button>
      {error ? <p className="mt-2 text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
