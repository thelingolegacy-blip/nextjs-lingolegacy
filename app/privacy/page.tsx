import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-[#f5f2eb]">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[#d4af37]/30 bg-[#111] p-8">
        <h1 className="text-4xl font-black uppercase text-white">Privacy Policy</h1>
        <p className="mt-4 leading-8 text-[#f5f2eb]/75">
          This storefront scaffold collects no personal data until Shopify checkout or approved forms are configured. Shopify checkout data is handled by Shopify. Do not add analytics, form capture, or session replay without consent and approval.
        </p>
        <Link className="mt-8 inline-block text-[#d4af37]" href="/">Back home</Link>
      </section>
    </main>
  );
}
