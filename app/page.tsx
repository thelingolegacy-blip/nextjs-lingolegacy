export default function Home() {
  return (
    <main className="theme-loyalty-lane min-h-screen bg-[#050505] px-6 py-16 text-[#f5f2eb] studio-enter">
      <section className="mx-auto flex min-h-[70vh] max-w-5xl flex-col justify-center">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#d4af37]">Loyalty Lane storefront</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-black uppercase tracking-[-0.07em] text-white md:text-8xl">
          Commerce backend refreshed for controlled drops.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#f5f2eb]/75">
          Shopify owns checkout, Tapstitch POD items route by vendor, and bulk inventory products stay flagged for physical fulfillment workflows. The code path stays inert until required environment variables are configured.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a className="rounded-full bg-[#d4af37] px-6 py-3 font-black uppercase tracking-[0.16em] text-black" href="/merch">
            Open merch drops
          </a>
          <a className="rounded-full border border-[#d4af37]/40 px-6 py-3 font-black uppercase tracking-[0.16em] text-[#d4af37]" href="/merch">
            Review storefront
          </a>
        </div>
      </section>
    </main>
  );
}
