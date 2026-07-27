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
  const [claimed, setClaimed] = useState(false);

  function playClaimTone() {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContextCtor();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(880, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1320, context.currentTime + 0.12);
    gain.gain.setValueAtTime(0.025, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.18);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.2);
    window.setTimeout(() => context.close(), 260);
  }

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

      setClaimed(true);
      playClaimTone();
      window.setTimeout(() => {
        window.location.href = data.checkoutUrl!;
      }, 420);
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
        className={`gold-shimmer relative w-full rounded-full bg-[#d4af37] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-[#f5d46b] disabled:cursor-not-allowed disabled:opacity-50 ${claimed ? "claimed-stamp" : ""}`}
      >
        {claimed ? "Claimed" : loading ? "Processing..." : "Claim Piece"}
      </button>
      {error ? <p className="mt-2 text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
