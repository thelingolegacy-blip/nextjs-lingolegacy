import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-[#f5f2eb]">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[#d4af37]/30 bg-[#111] p-8">
        <h1 className="text-4xl font-black uppercase text-white">Terms of Service</h1>
        <p className="mt-4 leading-8 text-[#f5f2eb]/75">
          This is a launch placeholder. Products, pre-orders, refunds, fulfillment timing, and limited-drop rules must be finalized before collecting payments outside Shopify checkout.
        </p>
        <Link className="mt-8 inline-block text-[#d4af37]" href="/">Back home</Link>
      </section>
    </main>
  );
}
